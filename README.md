# Knomee conversion video

A review prototype: the conversion film plus an overlay for leaving timestamped
comments on it.

| | |
| --- | --- |
| `index.html` | the review wrapper — loads `video.html` in an iframe and drives it through `window.KnomeePlayer`. Comments are hidden until you press **C**; **C** or **Esc** puts them away |
| `video.html` | **generated.** The current 90s cut, self-contained. Don't hand-edit — see below |
| `voiceover/knomee-soundtrack-90.wav` | **generated.** The 90s track: take-3 narration over the bed — see *Voice-over* |
| `original.html` | the original 2:48 cut, kept playable. A frozen export: it is **not** rebuilt from the sources and must not be edited |
| `voiceover/knomee-soundtrack.wav` | the original 168s mix, narration over the bed. Belongs to `original.html` |
| `knomee-conversion-intelligence.mp4` | the rendered master of the **original** cut — 2:48, 1920×1080 h264 + aac. See *Rendering a master* |

## Two cuts

The film was re-cut to 90 seconds against a tightened script. Both cuts are live:

| | |
| --- | --- |
| `/` or `/index.html` | the 90s cut, with the comment overlay |
| `/video.html` | the 90s cut on its own |
| `/original.html` | the original 2:48 cut on its own |

`original.html` is a frozen artefact. It is the export as it stood at the tag
`original-168s-cut`, it carries its own copy of the old app bundle, and
`build/build-video.py` does not touch it — only `video.html` is regenerated.
Everything else it needs (`assets/`, its soundtrack) lives at the same paths it
always did, which is why it sits at the repo root rather than in a subfolder.

To recover any other part of the original:

```sh
git show original-168s-cut:scenes.jsx > original-scenes.jsx
```

## Voice-over

Take 3, recorded against Lena Cheng's tightened script and delivered as 19 clips
in `uploads/vo-take-3/`. `voiceover/vo-cues.js` places them; `build/mix-soundtrack.py`
has `USE_VO = True` and mixes them over the bed.

The recording sheet it was read from is `voiceover/RECORDING-SHEET.md`. It listed
18 lines; line 15 came back as two takes, which is why there are 19 clips.

The previous 42-clip take is the old script and is superseded. Its files are still
in `uploads/ElevenLabs_Untitled_project/` but nothing references them, and the
`original-168s-cut` tag holds the cut that used them.

**The film is now voice-led.** 75.8s of the 90s is narration, so the picture is
cut to the audio rather than the other way round: every scene's length is set by
the lines it has to carry, and moving a cue in `vo-cues.js` without moving the
scene with it in `scenes.jsx` will put a line over the wrong picture. Re-run
`build/mix-soundtrack.py` after any cue change — the film reads its clock from
the mixed track.

Two scenes deliberately do not play their full length. Scene 1 starts at its own
6.0s mark, skipping a slow settle written for a voice-over that had six lines
there and now has two. Scene 12 stops at 5.5s of 12.0s, ending on the four
"Better" lines with the "Clients who actually move forward" panel dropped —
Scene 13's end card was closing the film twice.
