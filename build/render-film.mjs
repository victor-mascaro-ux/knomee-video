// Steps the film one frame at a time and pipes PNGs into ffmpeg.
//
// Driven by build/render-film.py, which sets up the servers and the founder
// frames first. Run that, not this.
//
// Why frames rather than a recording: the download button in the player records
// the tab, because that is all a web page can do — see the "Video export" note
// in animations.jsx. Here there is no such limit, so the film is stepped
// frame-accurately at a true 1920x1080 and the result does not depend on
// anyone's window size or on the machine keeping up in real time.
//
// The one thing headless Chromium cannot do is decode h264, so the founder's
// clip plays black. It is pre-extracted to jpegs and painted as the <video>
// element's own background, which leaves the browser doing the compositing:
// the corner radius, every ancestor fade and the name plate over the top all
// come out right without any of it being reimplemented here.
import { chromium } from 'playwright';
import { spawn } from 'child_process';
import fs from 'fs';

const arg = (k, d) => { const i = process.argv.indexOf('--' + k); return i > 0 ? process.argv[i + 1] : d; };
const FROM   = parseFloat(arg('from', '0'));
const TO     = parseFloat(arg('to', '0'));
const FPS    = parseInt(arg('fps', '30'), 10);
const OUT    = arg('out', 'film-video.mp4');
const FF     = arg('ffmpeg', 'ffmpeg');
const FILM   = arg('film', 'http://localhost:8899/video.html');
const FRAMES = arg('frames', 'http://localhost:8898/marla');
const NCLIP  = parseInt(arg('clip-frames', '0'), 10);
const CRF    = arg('crf', '16');

const total = Math.round((TO - FROM) * FPS);
console.log(`rendering ${total} frames  ${FROM}s..${TO}s  @${FPS}fps -> ${OUT}`);

const ff = spawn(FF, [
  '-hide_banner', '-loglevel', 'error', '-y',
  '-f', 'image2pipe', '-framerate', String(FPS), '-i', 'pipe:0',
  '-c:v', 'libx264', '-preset', 'slow', '-crf', CRF,
  '-profile:v', 'high', '-level', '4.2', '-pix_fmt', 'yuv420p',
  '-x264-params', `keyint=${FPS * 2}:min-keyint=${FPS}`,
  OUT,
], { stdio: ['pipe', 'inherit', 'inherit'] });

const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  args: ['--no-sandbox', '--force-device-scale-factor=1', '--hide-scrollbars'],
});
// Taller than 1080 on purpose. The Stage fits itself to the viewport minus 44px
// for the playback bar, so at exactly 1080 it would settle at scale 0.96 — and
// the founder's clip, which is portalled onto a layer beside the svg rather
// than into it, would land off the canvas.
const page = await browser.newPage({ viewport: { width: 1920, height: 1180 }, deviceScaleFactor: 1 });
page.on('pageerror', (e) => console.log('PAGEERROR:', e.message));
await page.goto(FILM, { waitUntil: 'load' });
await page.waitForFunction(() => window.KnomeePlayer, null, { timeout: 90000 });
await page.addStyleTag({ content: '[data-omelette-chrome]{display:none!important}' });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(1200);

const clip = await page.evaluate(() => {
  const r = document.querySelector('svg[data-om-exportable-video-with-duration-secs]').getBoundingClientRect();
  return { x: Math.round(r.left), y: Math.round(r.top), width: Math.round(r.width), height: Math.round(r.height) };
});
console.log('clip:', JSON.stringify(clip));
if (clip.width !== 1920 || clip.height !== 1080) {
  console.error('canvas is not 1920x1080 — check the viewport height'); process.exit(1);
}

// Nothing injects Poppins here: video.html carries it. But it did not always,
// and a run that renders the whole film in a fallback face looks fine until
// someone puts it beside the real thing. Refuse rather than spend the hour.
await page.evaluate((t) => window.KnomeePlayer.seekTo(t), 90);
await page.waitForTimeout(500);
await page.evaluate(() => {
  const el = [...document.querySelectorAll('span')].find((s) =>
    /Wealth managers/.test(s.textContent) &&
    [...s.childNodes].some((n) => n.nodeType === 3 && n.nodeValue.trim()));
  if (el) el.setAttribute('data-probe', '');
});
const cdp = await page.context().newCDPSession(page);
await cdp.send('DOM.enable'); await cdp.send('CSS.enable');
const doc = await cdp.send('DOM.getDocument', { depth: -1, pierce: true });
const probe = await cdp.send('DOM.querySelector', { nodeId: doc.root.nodeId, selector: '[data-probe]' });
const used = (await cdp.send('CSS.getPlatformFontsForNode', { nodeId: probe.nodeId })).fonts;
console.log('font in use:', JSON.stringify(used.map((f) => f.familyName)));
if (!used.some((f) => /Poppins/i.test(f.familyName))) {
  console.error('not rendering in Poppins — run build/build-video.py'); process.exit(1);
}

const write = (buf) => new Promise((res) => { if (!ff.stdin.write(buf)) ff.stdin.once('drain', res); else res(); });

// Land on the first frame and let it mount: the probe above left the playhead
// at 90s, so frame one is a scene change.
await page.evaluate((t) => window.KnomeePlayer.seekTo(t), FROM);
await page.waitForTimeout(1000);

const t0 = Date.now();
for (let i = 0; i < total; i++) {
  const t = FROM + i / FPS;
  await page.evaluate((t) => window.KnomeePlayer.seekTo(t), t);
  const frame = await page.evaluate(({ n }) => new Promise((done) => {
    // Two rAFs is enough for React to commit, but not for a scene that has just
    // mounted to have its photographs decoded — the first frame of one would
    // come out with holes where they go. Give those a bounded wait.
    const settled = () => [...document.images].every((im) => im.complete && im.naturalWidth > 0);
    let tries = 0;
    const wait = () => requestAnimationFrame(() => requestAnimationFrame(() => {
      if (!settled() && tries++ < 30) return wait();
      go();
    }));
    const go = () => {
      const svg = document.querySelector('svg[data-om-exportable-video-with-duration-secs]');
      // The play-button overlay exists below t=0.05 and sits beside the svg
      // rather than inside it, so it would land in the clip.
      for (const c of svg.parentElement.children)
        if (c !== svg && !c.hasAttribute('data-omelette-overlay')) c.style.display = 'none';
      const v = document.querySelector('video[src*="marla"]');
      if (!v) return done(null);
      done(Math.max(1, Math.min(n, Math.round(v.currentTime * 30) + 1)));
    };
    wait();
  }), { n: NCLIP });

  if (frame) {
    await page.evaluate(async ({ url }) => {
      const v = document.querySelector('video[src*="marla"]');
      const img = new Image();
      img.src = url;
      try { await img.decode(); } catch (e) {}
      v.style.setProperty('background-image', `url(${url})`, 'important');
      v.style.setProperty('background-size', 'cover', 'important');
      v.style.setProperty('background-position', 'center', 'important');
    }, { url: `${FRAMES}/f_${String(frame).padStart(5, '0')}.jpg` });
  }

  await write(await page.screenshot({ clip, type: 'png' }));
  if (i % 300 === 0 || i === total - 1) {
    const el = (Date.now() - t0) / 1000;
    console.log(`  ${i + 1}/${total}  ${el.toFixed(0)}s elapsed  eta ${((el / (i + 1)) * (total - i - 1) / 60).toFixed(1)}min`);
  }
}

ff.stdin.end();
await browser.close();
await new Promise((r) => ff.on('close', r));
console.log('wrote', OUT, fs.statSync(OUT).size.toLocaleString(), 'bytes');
