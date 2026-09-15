# Re-recorded lines — drop the new clips in this folder

Three lines from take 3 need re-recording. They go **here**, not in
`uploads/vo-take-3/`, because ElevenLabs exports start numbering at 1 and would
collide with clips 1, 2 and 3 of the existing take.

## Record these three, in this order

Paste into ElevenLabs as three separate lines, **same voice and settings as take
3** — if the voice drifts, these three will not match the other sixteen.

```
Before the meeting, Knomee guides prospects through an experience designed to help them clarify what they want their wealth to make possible —
Advisors walk into the meeting with context they wouldn't otherwise have —
Know more, grow more — with Knomee.
```

## Then rename the exports

ElevenLabs will name them `1_`, `2_`, `3_`. Rename to the cue each one replaces:

| ElevenLabs export | rename to | replaces | must fit in |
| --- | --- | --- | --- |
| 1st line | `7_Chapter_1.mp3` | cue 7 | 8.0s |
| 2nd line | `13_Chapter_1.mp3` | cue 13 | 4.7s |
| 3rd line | `19_Chapter_1.mp3` | cue 19 | 2.3s |

Those limits are the gap to the next line, not a target — all three are shorter
than what they replace, so there is room. Nothing needs trimming by hand; the
build shaves the silence ElevenLabs pads each clip with.

## What changes and why

| cue | was | now | who asked |
| --- | --- | --- | --- |
| 7 | "Before the **first** meeting…" | "Before the meeting…" | Marla, 11 Sep |
| 13 | "Advisors walk into the **first** meeting…" | "Advisors walk into the meeting…" | Marla, 11 Sep |
| 19 | "Knomee helps you make more of it." | "Know more, grow more — with Knomee." | Marla, 11 Sep |

The on-screen label "Preparing for the first meeting" in the meeting-prep scene
changes in the same pass, so the screen and the voice agree.

## After the files land

Nothing needs doing by hand. The cue sheet `src` paths get repointed at this
folder, the soundtrack is re-mixed, the picture is retimed to the new lengths
and the film stays 90.000s.
