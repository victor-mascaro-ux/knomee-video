// Decodes every mp3 the cue sheet points at, plus the music bed, into raw
// 16-bit mono PCM under build/pcm/ for mix-soundtrack.py to work from.
//
// There is no mp3 decoder in this repo's toolchain — no ffmpeg build here
// carries one — so the decoding is done by a browser, which has one and gives
// back exactly the samples the film itself would hear.
//
//   npm i -D playwright && node build/decode-audio.mjs
//
// Needs the repo served on http://localhost:8899 (python3 -m http.server 8899).
import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const cueSrc = fs.readFileSync(path.join(ROOT, 'voiceover/vo-cues.js'), 'utf8');
const files = [...new Set([...cueSrc.matchAll(/"src":\s*"([^"]+)"/g)].map(m => m[1]))];
files.push('uploads/music-bed.mp3');

const exe = process.env.CHROMIUM || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const b = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
const p = await b.newPage();
await p.goto('http://localhost:8899/video.html');

const out = path.join(ROOT, 'build/pcm');
fs.mkdirSync(out, { recursive: true });
for (const f of files) {
  const r = await p.evaluate(async (url) => {
    const buf = await (await fetch(url)).arrayBuffer();
    const ab = await new AudioContext({ sampleRate: 44100 }).decodeAudioData(buf);
    let d = ab.getChannelData(0);
    if (ab.numberOfChannels > 1) {
      const r = ab.getChannelData(1), o = new Float32Array(d.length);
      for (let i = 0; i < d.length; i++) o[i] = (d[i] + r[i]) / 2;
      d = o;
    }
    const i16 = new Int16Array(d.length);
    for (let i = 0; i < d.length; i++) i16[i] = Math.max(-1, Math.min(1, d[i])) * 32767;
    const u8 = new Uint8Array(i16.buffer);
    let s = '';
    for (let i = 0; i < u8.length; i += 8192) s += String.fromCharCode.apply(null, u8.subarray(i, i + 8192));
    return { rate: ab.sampleRate, n: d.length, b64: btoa(s) };
  }, encodeURI(f));
  const name = f.replace(/[^A-Za-z0-9]/g, '_') + '.raw';
  fs.writeFileSync(path.join(out, name), Buffer.from(r.b64, 'base64'));
  console.log(name.padEnd(52), (r.n / r.rate).toFixed(3) + 's');
}
await b.close();
