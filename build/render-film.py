#!/usr/bin/env python3
"""Render the film to a 1920x1080 h264 mp4 with sound.

    pip install imageio-ffmpeg
    npm  install playwright
    python3 build/render-film.py            # -> knomee-conversion-intelligence.mp4

This is the master. The download button in the player produces a file too, but
it records the tab in real time, so what it captures is the size of whoever's
window and it drops frames if the tab goes to the background. That is all a web
page can do. Here the film is stepped frame by frame at a true 1920x1080 and
the result does not depend on any of that.

Roughly 25-50 minutes for the 168s film: a browser screenshot per frame is the
floor, and there are five thousand of them.

How it fits together:

  * the founder's clip is pre-extracted to jpegs, because headless Chromium has
    no h264 decoder and plays it black. render-film.mjs paints each one as the
    <video> element's own background, so the browser still does the compositing
    and the rounded corners, the fades and the name plate come out right.
  * two local servers: one for the film, one for those frames. The second sends
    CORS headers because the film is on a different port and a cross-origin
    font fetch without them fails.
  * the picture is silent. The soundtrack already holds narration and music;
    the founder's voice lives in her mp4 and is laid back in at the three
    points the cut puts her, read out of scenes.jsx rather than repeated here.
"""

import argparse
import http.server
import os
import pathlib
import re
import shutil
import socketserver
import subprocess
import sys
import tempfile
import threading

ROOT = pathlib.Path(__file__).resolve().parent.parent
SCENES = ROOT / "scenes.jsx"
FILM_PORT, FRAME_PORT = 8899, 8898


def find_ffmpeg(explicit: str | None) -> str:
    if explicit:
        return explicit
    try:
        import imageio_ffmpeg
        return imageio_ffmpeg.get_ffmpeg_exe()
    except ImportError:
        pass
    found = shutil.which("ffmpeg")
    if not found:
        sys.exit("no ffmpeg — pip install imageio-ffmpeg, or pass --ffmpeg")
    return found


def check_ffmpeg(ff: str) -> None:
    """Refuse early if this build cannot make an mp4.

    The ffmpeg that ships with Playwright is configured --disable-everything and
    carries VP8 and PNG only. It will happily run and produce nothing usable.
    """
    out = subprocess.run([ff, "-hide_banner", "-encoders"], capture_output=True, text=True).stdout
    missing = [n for n in ("libx264", " aac ") if n not in out]
    if missing:
        sys.exit(f"{ff} has no {', '.join(m.strip() for m in missing)} — "
                 f"pip install imageio-ffmpeg gives a build that does")


def read_cut() -> dict:
    """Pull the film's shape out of scenes.jsx rather than repeating it here."""
    src = SCENES.read_text(encoding="utf-8")

    def one(pattern, what):
        m = re.search(pattern, src)
        if not m:
            sys.exit(f"scenes.jsx: {what} not found")
        return m.group(1)

    duration = float(one(r"const VIDEO_DURATION = ([\d.]+)", "VIDEO_DURATION"))
    soundtrack = one(r'const SOUNDTRACK = "([^"]+)"', "SOUNDTRACK")
    marla = one(r"const MARLA_SRC = '([^']+)'", "MARLA_SRC")

    # Each founder shot is a MarlaShot inside a scene; its clip range is on the
    # shot and its place in the film is the enclosing scene's S.
    starts = [(m.start(), float(m.group(1))) for m in re.finditer(r"const S = ([\d.]+);", src)]
    shots = []
    for m in re.finditer(r"clipStart=\{([\d.]+)\}\s+clipEnd=\{([\d.]+)\}", src):
        before = [s for s in starts if s[0] < m.start()]
        if not before:
            sys.exit("scenes.jsx: a MarlaShot appears before any scene's const S")
        at = max(before, key=lambda s: s[0])[1]
        shots.append((at, float(m.group(1)), float(m.group(2))))
    if not shots:
        sys.exit("scenes.jsx: no MarlaShot clip ranges found")
    return dict(duration=duration, soundtrack=soundtrack, marla=marla, shots=shots)


class CORS(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        super().end_headers()

    def log_message(self, *a):
        pass


def serve(directory: pathlib.Path, port: int) -> socketserver.TCPServer:
    handler = lambda *a, **kw: CORS(*a, directory=str(directory), **kw)  # noqa: E731
    socketserver.TCPServer.allow_reuse_address = True
    srv = socketserver.TCPServer(("127.0.0.1", port), handler)
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    return srv


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--out", default="knomee-conversion-intelligence.mp4")
    ap.add_argument("--fps", type=int, default=30)
    ap.add_argument("--crf", default="16", help="lower is better; 16 is near-transparent")
    ap.add_argument("--ffmpeg")
    ap.add_argument("--to", type=float, help="stop early, for a quick check of the pipeline")
    args = ap.parse_args()

    ff = find_ffmpeg(args.ffmpeg)
    check_ffmpeg(ff)
    cut = read_cut()
    end = args.to if args.to else cut["duration"]
    print(f"ffmpeg     {ff}")
    print(f"film       {cut['duration']:g}s, rendering to {end:g}s @{args.fps}fps")
    for at, a, b in cut["shots"]:
        print(f"  founder  clip {a:g}-{b:g} at {at:g}s")

    work = pathlib.Path(tempfile.mkdtemp(prefix="knomee-render-"))
    try:
        frames = work / "marla"
        frames.mkdir()
        print("extracting the founder's clip...")
        subprocess.run([ff, "-hide_banner", "-loglevel", "error", "-i", str(ROOT / cut["marla"]),
                        "-vf", "fps=30,scale=620:392:flags=lanczos", "-q:v", "2",
                        str(frames / "f_%05d.jpg")], check=True)
        n_clip = len(list(frames.glob("*.jpg")))
        print(f"  {n_clip} frames")

        film_srv, frame_srv = serve(ROOT, FILM_PORT), serve(work, FRAME_PORT)
        try:
            silent = work / "video.mp4"
            subprocess.run(["node", str(ROOT / "build" / "render-film.mjs"),
                            "--from", "0", "--to", str(end), "--fps", str(args.fps),
                            "--crf", args.crf, "--out", str(silent), "--ffmpeg", ff,
                            "--clip-frames", str(n_clip),
                            "--film", f"http://localhost:{FILM_PORT}/video.html",
                            "--frames", f"http://localhost:{FRAME_PORT}/marla"], check=True)
        finally:
            film_srv.shutdown(); frame_srv.shutdown()

        print("building the audio...")
        audio = work / "audio.wav"
        chains, mixes = [], ["[0:a]"]
        chains.append(f"[1:a]asplit={len(cut['shots'])}" + "".join(f"[s{i}]" for i in range(len(cut["shots"]))))
        for i, (at, a, b) in enumerate(cut["shots"]):
            chains.append(f"[s{i}]atrim={a}:{b},asetpts=PTS-STARTPTS,adelay={round(at * 1000)}[m{i}]")
            mixes.append(f"[m{i}]")
        chains.append("".join(mixes) + f"amix=inputs={len(mixes)}:duration=first:normalize=0,"
                                       f"alimiter=limit=0.98[a]")
        subprocess.run([ff, "-hide_banner", "-loglevel", "error", "-y",
                        "-i", str(ROOT / cut["soundtrack"]), "-i", str(ROOT / cut["marla"]),
                        "-filter_complex", ";".join(chains), "-map", "[a]",
                        "-c:a", "pcm_s16le", "-ar", "44100", "-ac", "1", str(audio)], check=True)

        print("muxing...")
        out = pathlib.Path(args.out).resolve()
        subprocess.run([ff, "-hide_banner", "-loglevel", "error", "-y",
                        "-i", str(silent), "-i", str(audio),
                        "-map", "0:v:0", "-map", "1:a:0", "-c:v", "copy",
                        "-c:a", "aac", "-b:a", "192k", "-shortest",
                        "-movflags", "+faststart", str(out)], check=True)
        size = out.stat().st_size
        print(f"\n{out}  {size / 1e6:.1f} MB")
    finally:
        shutil.rmtree(work, ignore_errors=True)


if __name__ == "__main__":
    main()
