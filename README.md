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

## Running from source

Serve the directory and open `Knomee Conversion Video.dc.html`. This is slower
to load than `video.html` — it fetches React and Babel from unpkg at runtime
and transpiles the JSX in the browser — but it picks up source edits on
refresh, with no build step.

`video.html` is the one to review against: it needs the network only for
Google Fonts, and it's what `index.html` embeds.

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
