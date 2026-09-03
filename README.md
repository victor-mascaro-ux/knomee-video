# Knomee conversion video

A review prototype: the conversion film plus an overlay for leaving timestamped
comments on it.

| | |
| --- | --- |
| `index.html` | the review wrapper — loads `video.html` in an iframe and drives it through `window.KnomeePlayer` |
| `video.html` | **generated.** The film, self-contained. Don't hand-edit — see below |
| `voiceover/knomee-soundtrack.wav` | **generated.** The 168s mixed track: narration over a music bed — see *Re-mixing* |

## Source

The film is authored in Claude Design; `video.html` is its standalone export,
and the `.dc.html` / `support.js` pair is that project's own runtime.

`video.html` is built from two files:

| | |
| --- | --- |
| `animations.jsx` | the timeline engine — `Stage`, `Sprite`, easings, the playback bar |
| `scenes.jsx` | the 12 scenes, the brand tokens, the `Soundtrack` component, and the `KnomeePlayer` bridge |

Plus two supporting files, straight from the export and unmodified:

| | |
| --- | --- |
| `support.js` | the dc-runtime — transpiles JSX in the browser |
| `Knomee Conversion Video.dc.html` | the project entry point, for running from source |

### Images

Not everything on screen is drawn in code. `scenes.jsx` loads ten photographs
by relative path, and they are not carried inside `video.html` — they are
fetched at play time and have to exist in the tree:

| | |
| --- | --- |
| `assets/values/` | six 150×150 tiles — `choice`, `comfort`, `independence`, `moment`, `security`, `family`. Captions are drawn in code, so these carry no text |
| `assets/goals/` | four 308×373 swipe cards — `work`, `family`, `travel`, `health`. No separate caption is drawn, so the text is part of the image |

A missing one fails silently: the film plays, the console shows a 404, and a
blank box sits where the photo should be. After any change to `scenes.jsx`,
step through the whole timeline and watch for failed requests rather than
trusting that it loaded. `assets/goals/` also holds `hobbies`, `home` and
`planning`, which nothing currently references.

## Rebuilding

**This happens automatically.** Push a change to `scenes.jsx` or
`animations.jsx` on `main` — through GitHub's web upload or any other way —
and the *Rebuild video* action regenerates `video.html` and commits it back,
usually within a minute. Refresh once the run finishes.

It also runs `build/check-video.py`, which fails the run if an image
`scenes.jsx` asks for is missing, or if the soundtrack no longer matches
`VIDEO_DURATION`. Both are silent in the browser, so a red mark on the run is
the only warning you get. The rebuild is still committed either way, so
`video.html` always reflects the sources.

To do it by hand:

```sh
python3 build/build-video.py   # regenerate video.html
python3 build/check-video.py   # verify assets and soundtrack length
```

`video.html` is an export: an HTML shell plus a manifest of gzipped, base64'd
assets — React, react-dom, Babel, the dc-runtime, fonts — and one entry holding
the app itself. That app entry is `animations.jsx` and `scenes.jsx`
concatenated inside an IIFE, with the JSX left raw for `support.js` to
transpile. The build script replaces only that entry and carries everything
else over untouched, so the result stays a drop-in replacement for the
exported file. Same sources in, byte-identical file out.

**Why this script exists.** The app entry inside the export went stale once and
did it silently — it kept shipping a build from an older `scenes.jsx` long
after the sources had moved on, through several re-exports, while looking
completely normal. Rebuilding from source is the only way to be certain the two
agree. After any re-export from Claude Design, treat the exported `.html` as
suspect and regenerate it with the script.

## Rendering a master

```sh
pip install imageio-ffmpeg
npm  install playwright
python3 build/render-film.py          # -> knomee-conversion-intelligence.mp4
python3 build/render-film.py --to 3   # same pipeline, three seconds of it
```

A true 1920×1080 h264 file with sound, stepped frame by frame rather than
recorded. Takes 25–50 minutes: a browser screenshot per frame is the floor, and
there are five thousand of them.

Use this for anything that leaves the building. The download button in the
player (below) records the tab in real time, which is all a web page can do —
its resolution is whoever's window and it drops frames if the tab is
backgrounded. This has neither problem.

**ffmpeg has to be a real build.** The one that ships with Playwright is
configured `--disable-everything` and carries VP8 and PNG only; it runs happily
and produces nothing usable. `imageio-ffmpeg` gives a static build with
libx264 and AAC, and the script refuses to start without them.

Three things the script does that are worth knowing:

- **The founder's clip is pre-extracted to jpegs.** Headless Chromium has no
  h264 decoder, so it plays black. Each frame is painted as the `<video>`
  element's own background rather than composited afterwards, which leaves the
  browser doing the work — the corner radius, every ancestor fade and the name
  plate over the top come out right without any of it being reimplemented.
- **The window is 1180px tall, not 1080.** The Stage fits itself to the viewport
  minus 44px for the playback bar, so at exactly 1080 it settles at scale 0.96
  and the founder's clip — which is portalled onto a layer beside the svg rather
  than into it — lands off the canvas.
- **Where the founder speaks is read out of `scenes.jsx`,** not repeated in the
  script: each shot's clip range comes off the `MarlaShot`, its place in the
  film from the enclosing scene's `const S`. Retiming the film moves her voice
  with it.

It also refuses to render if the film is not painting in Poppins, rather than
spending the hour and handing back a fallback face.

## Exporting from the player

The download button at the right of the playback bar saves the film as a video.
It **records** rather than renders: it asks to capture this tab, plays the film
once, and `MediaRecorder` encodes what it sees. It is the convenient one, not
the good one — for a master, use `build/render-film.py` above.

That is not the obvious design, and the reason is the picture. The film is DOM
inside an `<svg><foreignObject>`, its audio is a Web Audio graph with no media
element behind it, and the founder's clip is a `<video>` portalled *on top of*
the svg rather than inside it — because a browser will not hardware-composite
video in a `foreignObject`. Serialising the svg, which is what the export
scaffolding in `animations.jsx` was built for, therefore loses her shot
completely, along with every `backdrop-filter`. Recording is the only route
that captures what a viewer actually sees, and the browser's own h264 and aac
encoders are the only way this page produces a real mp4 without carrying an
encoder inside it.

What follows from that:

- **It runs in real time** — 2:48, and the tab has to stay in front. A
  backgrounded tab is throttled and the capture drops frames with it.
- **Resolution is the window.** Region Capture crops the stream to the canvas,
  so the playback bar and the review chrome stay out of the file, but what is
  left is the canvas at its rendered size in device pixels. On a HiDPI screen a
  maximised window is already past 1920×1080; on a small one there is no
  upscaling to be had. The readout shows the number before it starts.
- **Tick "Share tab audio"** in the picker, or the file is silent. It says so
  afterwards if you didn't.
- **mp4 depends on the browser.** Only codec-qualified mime types are offered,
  because a browser with no h264 encoder still answers yes to a bare
  `video/mp4` and then writes vp9 and opus into an mp4 container — a legal file
  that QuickTime and Premiere will not open. Where h264 is missing the export
  falls back to WebM and says so. Chrome 130+, Edge and Safari all give mp4.

Where Region Capture is unavailable (Safari, Firefox) the whole tab lands in
the frame; the readout says that too, and `index.html` hides the comments rail
for the duration either way.

## Running from source

Serve the directory and open `Knomee Conversion Video.dc.html`. This is slower
to load than `video.html` — it fetches React and Babel from unpkg at runtime
and transpiles the JSX in the browser — but it picks up source edits on
refresh, with no build step.

`video.html` is the one to review against: it needs no network at all, and it's
what `index.html` embeds.

### Fonts

The film sets one family — `DISPLAY = "'Poppins', system-ui, sans-serif"` — and
for a long time it never got it. The export inlined `@font-face` for JetBrains
Mono and Plus Jakarta Sans, neither of which the film asks for, and for Poppins
left two `preconnect` hints to Google Fonts with no stylesheet behind them. So
every viewer read the film in whatever `system-ui` resolved to on their machine,
and nothing about that looks broken on screen, which is why it lasted.

`build/build-video.py` now embeds the six faces the film actually uses
(400/500/600/700/800 and one italic) from `assets/fonts/`, as base64 inside the
export's own `<helmet>`. Not the shell's `<head>` — the dc-runtime rewrites the
document out of the `<x-dc>` block on boot, so a style put there survives in the
file and does nothing in the browser. `build/check-video.py` fails if the faces
go missing, or if a stale copy turns up in the head.

## Audio

`scenes.jsx` fetches `voiceover/knomee-soundtrack.wav` by that exact relative
path, so the file has to sit next to whichever HTML is being served.

The soundtrack drives the film rather than the other way round. It decodes into
a shared `AudioContext` and the playhead reads the audio clock, so the picture
cannot drift from the voice — `window.__OM_EXTERNAL_CLOCK` is the handshake
that tells the timeline to stop advancing itself.

The track is a 15.8 MB uncompressed WAV, kept in that form because it's what
the export produces. Re-encoding it to AAC would take it to roughly 2 MB, but
that means editing the `SOUNDTRACK` path in `scenes.jsx` and redoing it after
every export.

**Its length has to match `VIDEO_DURATION` in `scenes.jsx`.** Cutting a scene
changes the film and not the mix, and nothing warns you — if the cut was in the
middle, every line after it plays against the wrong picture. When the edit
changes, the track has to be re-rendered, and the two numbers checked against
each other.

### Re-mixing

```sh
python3 -m http.server 8899 &      # the decoder fetches over http
npm i -D playwright
node   build/decode-audio.mjs      # mp3 -> build/pcm/*.raw  (gitignored, ~27 MB)
python3 build/mix-soundtrack.py    # -> voiceover/knomee-soundtrack.wav
```

Nothing in this toolchain can decode an mp3 — the ffmpeg build that ships with
Playwright has no mp3 demuxer — so the first step borrows a browser's decoder.
It is slow and it is the only reason the second step needs a network at all.

`mix-soundtrack.py` carries the whole recipe: the bed level, the +5 dB lift in
every gap where nobody speaks, the −5 dB duck across the three windows where
Marla speaks from the mp4, and the head and tail fades. `NFRAMES` in that file
and `VIDEO_DURATION` in `scenes.jsx` are the same number twice — change one and
change the other.

A cue may carry a `cuts` array of `[from, to]` spans, in clip seconds, that are
spliced out of the take. That is how a pause *inside* a line is shortened
without re-recording. Cut only where the clip is genuinely silent; a cut across
speech clicks.

**Retiming.** Every absolute second in `scenes.jsx` — the `SCENES` manifest,
each scene's `const S`, every `<Sprite start/end>` — is measured against this
track. Shifting the film means shifting all of them together with the cue sheet;
what lives inside a scene is relative to its `S` and comes along for free.

## Voice-over timeline

`Knomee VO Timeline.dc.html` is the tool for aligning the 44 narration clips
against their captions. It reads:

| | |
| --- | --- |
| `voiceover/vo-cues.js` | the cue sheet — where each clip fires, and how much of it plays |
| `voiceover/vo-captions.js` | the caption text and timings |
| `uploads/ElevenLabs_generate_voiceover_for_this_script_/` | the 44 clips the cue sheet points at |
| `_ds/` | design-system CSS for the tool's own chrome |

It edits cue positions and exports a replacement `vo-cues.js`. Note that the
film itself reads none of this — it plays the single pre-mixed
`knomee-soundtrack.wav`. Re-aligning clips here changes nothing on screen until
the track is re-mixed and that WAV replaced.

## What isn't kept

The export folder carries more than the repo needs. Removed, and recoverable
from git history:

- `uploads/Knomee video production/` — a nested snapshot of an older copy of
  this same project, down to its own `_ds/`, `assets/`, and an export
  byte-identical to the stale `video.html`. Superseded by the files at the root.
- 40 duplicate clips in the ElevenLabs folder — each take was uploaded twice,
  once plain and once with a hash suffix. `vo-cues.js` points at the hashed
  ones, so the plain copies were dropped where the two were byte-identical.
  Four pairs genuinely differ; those were left alone.
- `knomee-bundle.jsx` — generated from `animations.jsx` and `scenes.jsx`, and
  the file that went stale. Keeping a copy invites the same confusion back.
