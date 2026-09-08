# Voice-over recording sheet — 90s cut

Generated from `SUBS` in `scenes.jsx`, which is what the film actually plays.
If a timing changes there, regenerate this rather than editing it by hand.

Text is Marla’s tightened script verbatim. Lines are split only where one is
too long to sit on screen at once — a split is a subtitle break, not necessarily
a breath. **Read 3 and 4 as one sentence; likewise 7+8, 10+11, and 12+13.**

`window` is how long the line has on screen. `w/s` is the words-per-second that
implies. Nothing here is above 3.3 w/s, which is brisk but unhurried. If a line
feels tight in the booth, take the time from the gap after it — the gaps hold the
slack, and moving a line’s **out** is cheaper than rushing the read.

| # | in | out | window | words | w/s | line |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | 0.80 | 4.00 | 3.20s | 9 | 2.81 | Most wealth firms don't have a problem attracting prospects. |
| 2 | 4.25 | 7.60 | 3.35s | 8 | 2.39 | They have a problem turning them into clients. |
| 3 | 8.40 | 12.60 | 4.20s | 12 | 2.86 | Too often, every wealth firm feels the same at first touch — |
| 4 | 12.75 | 16.60 | 3.85s | 13 | 3.38 | asking prospects for information before helping them think about what matters to them. |
| 5 | 17.30 | 19.20 | 1.90s | 5 | 2.63 | That's where Knomee comes in. |
| 6 | 19.40 | 22.60 | 3.20s | 8 | 2.50 | A behavioral intelligence platform built for financial services. |
| 7 | 23.30 | 31.60 | 8.30s | 24 | 2.89 | Before the first meeting, Knomee guides prospects through an experience designed to help them clarify what they want their wealth to make possible — |
| 8 | 31.75 | 35.10 | 3.35s | 9 | 2.69 | from family and security to freedom, purpose, and adventure. |
| 9 | 35.30 | 39.90 | 4.60s | 13 | 2.83 | So instead of feeling like intake, the experience delivers value from the start. |
| 10 | 40.60 | 45.60 | 5.00s | 14 | 2.80 | Grounded in behavioral science, Knomee turns that reflection into actionable insight for advisors — |
| 11 | 45.75 | 52.40 | 6.65s | 19 | 2.86 | revealing what motivates each prospect, how ready they are to act, and how to start a conversation that matters. |
| 12 | 52.80 | 57.10 | 4.30s | 13 | 3.02 | Advisors walk into the first meeting with context they wouldn't otherwise have — |
| 13 | 57.25 | 61.20 | 3.95s | 12 | 3.04 | ready to make the conversation more personal and relevant from the start. |
| 14 | 61.90 | 67.90 | 6.00s | 17 | 2.83 | Prospects feel understood. Advisors stand out. And firms have a better opportunity to turn interest into relationships. |
| 15 | 68.80 | 75.60 | 6.80s | 18 | 2.65 | As those relationships grow, Knomee helps advisors stay connected to what matters as clients' lives and priorities evolve. |
| 16 | 76.50 | 80.50 | 4.00s | 11 | 2.75 | Because the human side of wealth management is what matters most. |
| 17 | 87.00 | 89.50 | 2.50s | 7 | 2.80 | Knomee helps you make more of it. |

**Totals** — 212 words across 75.2s of speaking, in a 90.0s film. 
Average 2.82 w/s while speaking; 14.8s is silence, 
music bed, or Marla on camera.

## Where each line sits

| Scene | span | lines |
| --- | --- | --- |
| 1 · The conversion problem | 0.0–8.0s | 1, 2 |
| 2 · Every firm feels the same | 8.0–16.9s | 3, 4 |
| 3 · Knomee changes the starting point | 16.9–20.6s | 5, 6 |
| 4 · Knomee creates value immediately | 20.6–36.5s | 7, 8, 9 |
| 5 · Signals advisors can act on | 36.5–52.0s | 10, 11 |
| 6 · Meeting prep | 52.0–61.4s | 12, 13 |
| 7 · Show up different | 61.4–68.3s | 14 |
| 8 · The lifecycle | 68.3–76.0s | 15 |
| 9 · Better beginnings | 76.0–82.0s | 16 |
| 10 · Marla, then the close | 82.0–90.0s | 17 |

## Notes for the session

- **82.0–86.7s is Marla on camera.** Her line comes from `assets/marla-founder.mp4`,
  not from this session. Line 17 lands after she finishes — do not read over her.
- **Line 6 is the one the reviewer asked for.** “A behavioral intelligence platform
  built for financial services” is the category orientation the old cut never said
  out loud. It wants to land cleanly, not be thrown away.
- **The Knomee Quotient is gone from the script** and should stay gone — it is a
  proprietary term the viewer would have to learn first.
- Once the takes exist, put them in `voiceover/vo-cues.js`, flip `USE_VO = True` in
  `build/mix-soundtrack.py`, re-run the mixer, and delete `SUBS`/`Subtitles` from
  `scenes.jsx`. The subtitles are scaffolding, not a feature.
