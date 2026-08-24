#!/usr/bin/env python3
"""Render voiceover/knomee-soundtrack.wav from the cue sheet and the music bed.

The film plays one pre-mixed track and reads its clock from it, so this file is
the edit: move a cue here and the picture has to move with it. Nothing warns
you if they disagree — build/check-video.py only compares total length.

Run build/decode-audio.mjs first; it puts the decoded sources in build/pcm/.

The mix, in order:

  * one contiguous slice of the bed at BASE. Contiguous matters — an earlier
    version spliced the bed around the narration and the melody jumped
    mid-phrase, which is audible even when the splice itself is silent.
  * the bed lifted by LIFT wherever nobody speaks for GAPMIN or longer, eased
    in and out over RAMP with a linear ramp.
  * the bed ducked by DUCK across MARLA. Her voice comes from the mp4 the
    picture plays, not from this file, so those windows are bed alone and
    without the duck the music sits on top of her.
  * each cue at unity, `off` seconds into its clip for `len` seconds, with any
    `cuts` spans spliced out — that is how a pause inside a take is shortened.
    Cut only where the clip is actually silent or it will click.
  * FADEI in at the head, FADEO out at the tail.
"""
import numpy as np, os, re, sys, wave

SR      = 44100
ROOT    = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PCM     = os.path.join(ROOT, 'build/pcm')
OUT     = os.path.join(ROOT, 'voiceover/knomee-soundtrack.wav')

BASE    = 0.075
LIFT    = 1.7778    # +5 dB where nobody is speaking
DUCK    = 0.5623    # -5 dB under Marla
RAMP    = 0.4
GAPMIN  = 1.2
FADEI   = 2.5
FADEO   = 4.0
MARLA   = [(84.82, 107.27), (126.64, 132.64), (160.12, 165.00)]
NFRAMES = 7414136   # 168.121s — must match VIDEO_DURATION in scenes.jsx


def raw(p):
    f = os.path.join(PCM, re.sub(r'[^A-Za-z0-9]', '_', p) + '.raw')
    if not os.path.exists(f):
        sys.exit(f'missing {f} — run build/decode-audio.mjs first')
    return np.fromfile(f, dtype='<i2').astype(np.float64) / 32768


def cues():
    src = open(os.path.join(ROOT, 'voiceover/vo-cues.js')).read()
    out = []
    for m in re.finditer(r'\{[^{}]*\}', src):
        o = m.group(0)
        g = lambda k: re.search(r'"%s":\s*("?)([^,"}]+)\1' % k, o).group(2)
        cuts = re.search(r'"cuts":\s*\[\[(.*?)\]\]', o)
        out.append(dict(
            n=int(g('n')), src=g('src'), at=float(g('at')),
            off=float(g('off')), len=float(g('len')),
            cuts=[tuple(float(x) for x in pair.split(','))
                  for pair in cuts.group(1).split('],[')] if cuts else []))
    return out


def clip(c):
    """The clip as it plays: off..off+len, with any `cuts` spans removed."""
    v, keep, pos = raw(c['src']), [], c['off']
    for a, b in c['cuts']:
        keep.append((pos, a))
        pos = b
    keep.append((pos, None))
    parts = [v[int(a * SR): int(b * SR)] if b is not None else v[int(a * SR):]
             for a, b in keep]
    return np.concatenate(parts)[:int(round(c['len'] * SR))]


def ramp_to(env, a, b, value):
    ia, ib = max(int(a * SR), 0), min(int(b * SR), len(env))
    if ib <= ia:
        return
    r = min(int(RAMP * SR), (ib - ia) // 2)
    prof = np.full(ib - ia, float(value))
    if r:
        e = np.linspace(0, 1, r)
        prof[:r] = 1 + (value - 1) * e
        prof[-r:] = value + (1 - value) * e
    env[ia:ib] *= prof


def build(cs, n):
    env = np.ones(n)
    spans = sorted((c['at'], c['at'] + c['len']) for c in cs)
    gaps = ([(0.0, spans[0][0])]
            + [(spans[i][1], spans[i + 1][0]) for i in range(len(spans) - 1)]
            + [(spans[-1][1], n / SR)])
    for a, b in gaps:
        if b - a < GAPMIN:
            continue
        pieces = [(a, b)]
        for ma, mb in MARLA:                       # never lift the bed over her
            nxt = []
            for pa, pb in pieces:
                if mb <= pa or ma >= pb:
                    nxt.append((pa, pb)); continue
                if pa < ma: nxt.append((pa, ma))
                if mb < pb: nxt.append((mb, pb))
            pieces = nxt
        for pa, pb in pieces:
            if pb - pa >= GAPMIN:
                ramp_to(env, pa, pb, LIFT)
    for a, b in MARLA:
        ramp_to(env, a, b, DUCK)

    out = raw('uploads/music-bed.mp3')[:n].copy() * BASE * env
    for c in cs:
        seg, a = clip(c), int(c['at'] * SR)
        m = min(len(seg), n - a)
        out[a:a + m] += seg[:m]
    fi, fo = int(FADEI * SR), int(FADEO * SR)
    out[:fi] *= np.linspace(0, 1, fi)
    out[-fo:] *= np.linspace(1, 0, fo)
    return out


if __name__ == '__main__':
    mix = build(cues(), NFRAMES)
    peak = float(np.abs(mix).max())
    print(f'{NFRAMES} frames = {NFRAMES / SR:.3f}s   peak {peak:.3f}')
    if peak >= 0.99:
        sys.exit('clipping — lower BASE or check a cue for a hot clip')
    w = wave.open(OUT, 'wb')
    w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes((np.clip(mix, -1, 1) * 32767).astype('<i2').tobytes())
    w.close()
    print('wrote', os.path.relpath(OUT, ROOT))
