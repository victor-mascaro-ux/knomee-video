#!/usr/bin/env python3
"""Check video.html against the things it needs at play time.

Two failures have shipped unnoticed, both silent in the browser:

  * an image scenes.jsx references was not in the tree, so the film played
    with blank boxes where photographs belong;
  * the soundtrack was left at its old length after a scene was cut, so from
    the cut point onward the narration ran against the wrong picture.

Neither raises an error — the film plays either way. This checks both.

    python3 build/check-video.py

Exits non-zero and prints what's wrong if anything doesn't line up.
"""

import pathlib
import re
import struct
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
SCENES = ROOT / "scenes.jsx"


def wav_seconds(path: pathlib.Path) -> float | None:
    """Length of a PCM wav, read from its header. None if unparseable."""
    with path.open("rb") as fh:
        head = fh.read(64)
    if head[:4] != b"RIFF" or head[8:12] != b"WAVE":
        return None
    channels = struct.unpack("<H", head[22:24])[0]
    rate = struct.unpack("<I", head[24:28])[0]
    bits = struct.unpack("<H", head[34:36])[0]
    if not (channels and rate and bits):
        return None
    return (path.stat().st_size - 44) / (rate * channels * (bits // 8))


def main() -> None:
    source = SCENES.read_text(encoding="utf-8")
    problems: list[str] = []

    # Every relative path scenes.jsx hands to an <img> or fetches at runtime.
    referenced = sorted(set(re.findall(r"['\"]((?:assets|voiceover)/[\w./-]+)['\"]", source)))
    if not referenced:
        problems.append("no asset paths found in scenes.jsx — has the reference style changed?")

    missing = [p for p in referenced if not (ROOT / p).is_file()]
    for path in missing:
        problems.append(f"missing file: {path}")

    print(f"referenced files: {len(referenced)}, missing: {len(missing)}")
    for path in referenced:
        print(f"  {'ok ' if (ROOT / path).is_file() else 'GONE'}  {path}")

    # The film's length and the soundtrack's have to agree, or the voice
    # drifts from the picture.
    duration = re.search(r"const VIDEO_DURATION = ([\d.]+)", source)
    track = re.search(r'const SOUNDTRACK = "([^"]+)"', source)
    if not duration:
        problems.append("VIDEO_DURATION not found in scenes.jsx")
    elif track:
        wav = ROOT / track.group(1)
        if wav.is_file():
            film = float(duration.group(1))
            audio = wav_seconds(wav)
            if audio is None:
                print(f"\nsoundtrack: {wav.name} is not readable PCM — length unchecked")
            else:
                print(f"\nfilm {film:g}s vs soundtrack {audio:.2f}s")
                if abs(film - audio) > 0.5:
                    problems.append(
                        f"length mismatch: VIDEO_DURATION is {film:g}s but "
                        f"{track.group(1)} is {audio:.2f}s — re-render the mix "
                        f"against the current cut"
                    )

    # Every family the film declares has to be in video.html. For a long time
    # none of them were: the export left preconnect hints to Google Fonts and no
    # stylesheet, so viewers read the film in whatever system-ui resolved to.
    # Nothing about that looks broken on screen, which is why it lasted.
    video = (ROOT / "video.html").read_text(encoding="utf-8")
    families = re.findall(r"^const [A-Z_]+ *= *\"'([^']+)'", source, re.M)
    if not families:
        problems.append("no font families found in scenes.jsx — has the declaration style changed?")
    print()
    for name in sorted(set(families)):
        faces = video.count(f"@font-face{{font-family:{name};")
        print(f"  {'ok  ' if faces else 'GONE'}  {name}: {faces} faces in video.html")
        if not faces:
            problems.append(
                f"video.html has no embedded {name} — that text would fall back "
                f"to system-ui. Run build/build-video.py"
            )
    blobs = video.count("src:url(data:font/woff2;base64,")
    total = sum(video.count(f"@font-face{{font-family:{n};") for n in set(families))
    if blobs < total:
        problems.append(f"{total - blobs} face(s) declared with no font data")

    # A stale copy in the shell head is dead weight: the dc-runtime rewrites the
    # document, so only the one inside <helmet> ever applies.
    if '<style id="knomee-poppins">' in video:
        problems.append(
            "a knomee-poppins style is sitting in the shell <head>, where the "
            "dc-runtime discards it. Re-run build/build-video.py"
        )

    if problems:
        print("\nFAILED")
        for problem in problems:
            print(f"  - {problem}")
        sys.exit(1)
    print("\nall good")


if __name__ == "__main__":
    main()
