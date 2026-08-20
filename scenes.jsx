// Knomee Conversion Intelligence — scene library
// Reads timeline globals (Stage, Sprite, useTime, Easing, interpolate, clamp) from window.
const { Stage, Sprite, useTime, useSprite, Easing, interpolate, animate, clamp } = window;

// ── Brand tokens ─────────────────────────────────────────────────────────────
const BRAND = {
  purpleDeep: '#240446',
  purpleHead: '#2b0a52',
  violet: '#7C3AED',
  teal: '#086375',
  aqua: '#2DD2B0',
  ink: '#1b1230',
  paper: '#ffffff',
};
// Cold / generic competitor palette
const COLD = {
  bg: '#eef1f5',
  card: '#ffffff',
  navy: '#26313f',
  slate: '#5b6675',
  line: '#dbe0e7',
  field: '#f4f6f9',
  accent: '#3d566e',
};
const DISPLAY = "'Poppins', system-ui, sans-serif";
const SERIF = DISPLAY;   // Sedan retired — the film is Poppins throughout
const GENERIC = DISPLAY;
const MONO = DISPLAY;

// Exact Knomee Design System tokens (hand-matched for the timeline)
const KDS = {
  plum: '#240446', plumInk: '#1a0433', grape: '#7639a1', grapeBar: '#7538b2',
  grapeLight: '#e9d9f4', teal: '#3dbdaa', tealDeep: '#2fa896', tealLight: '#e6f7f5',
  mint: '#c0ffe7', ocean: '#086375', steel: '#6ba1ac', lilac: '#b98ddc', bolt: '#9b51e0',
  tangerine: '#ff9525', lime: '#affc41',
  ink: '#1a1a1a', body: '#364153', muted: '#6a7282', slate: '#757575', ash: '#afafaf',
  stone: '#cccccc', pearl: '#eeeeee', border: '#e0e0e0', borderSoft: '#e8e8e8',
  cloud: '#fafafa', appBg: '#f5f5f7', white: '#ffffff', tray: 'rgba(36,4,70,0.05)',
};
function kqTier(s) { return s >= 70 ? 1 : s >= 40 ? 2 : 3; }
function tierColor(t) { return { 1: KDS.ocean, 2: KDS.steel, 3: KDS.lilac }[t]; }
function tierTint(t) { return { 1: 'rgba(8,99,117,0.12)', 2: 'rgba(107,161,172,0.18)', 3: 'rgba(185,141,220,0.20)' }[t]; }

// ── Small helpers ─────────────────────────────────────────────────────────────
function useT() { return useTime(); }

// Placeholder box the user will swap for a real asset
function Placeholder({ label, w, h, tone = 'cold', style }) {
  const pal = tone === 'cold'
    ? { a: '#d3dae3', b: '#c3ccd8', fg: '#67788c' }
    : { a: 'rgba(255,255,255,0.14)', b: 'rgba(255,255,255,0.06)', fg: 'rgba(255,255,255,0.7)' };
  return (
    <div style={{
      width: w, height: h, borderRadius: 8, overflow: 'hidden',
      background: `repeating-linear-gradient(135deg, ${pal.a} 0 12px, ${pal.b} 12px 24px)`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: pal.fg, fontFamily: MONO, fontSize: 12, letterSpacing: '0.08em',
      textTransform: 'uppercase', textAlign: 'center', padding: 8, boxSizing: 'border-box',
      ...style,
    }}>{label}</div>
  );
}

// Smooth gradient "stock photo" fill — reads as imagery, no stripes (kills scaling shimmer)
function StockFill({ kind = 'neutral', w = '100%', h = '100%', style }) {
  const bg = {
    handshake: 'linear-gradient(135deg,#3f4a5c 0%,#6b7a8e 55%,#aeb8c4 100%)',
    skyline:   'linear-gradient(180deg,#1e2c4a 0%,#3b4c73 40%,#a86a63 74%,#f0b878 100%)',
    estate:    'linear-gradient(160deg,#324a34 0%,#5f7f4e 52%,#b9caa0 100%)',
    family:    'linear-gradient(150deg,#6e4f42 0%,#a9806a 52%,#e6cbb2 100%)',
    neutral:   'linear-gradient(135deg,#5b6675 0%,#8a97a6 60%,#c2cad4 100%)',
  }[kind] || 'linear-gradient(135deg,#8a97a6,#c7ced6)';
  const overlay = kind === 'skyline'
    ? 'radial-gradient(300px 210px at 74% 32%, rgba(255,214,150,0.75), rgba(255,214,150,0) 68%)'
    : 'radial-gradient(140% 90% at 28% 18%, rgba(255,255,255,0.22), rgba(0,0,0,0) 60%)';
  return (
    <div style={{ width: w, height: h, borderRadius: 8, overflow: 'hidden', position: 'relative', background: bg, ...style }}>
      <div style={{ position: 'absolute', inset: 0, background: overlay }} />
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '36%',
        background: 'linear-gradient(to top, rgba(0,0,0,0.30), rgba(0,0,0,0))' }} />
    </div>
  );
}

// Light product-UI mock fill (chart / app screenshot)
function UIMock({ kind = 'chart', w = '100%', h = '100%', style }) {
  return (
    <div style={{ width: w, height: h, borderRadius: 8, overflow: 'hidden', background: '#fff',
      border: '1px solid #e2e7ee', position: 'relative', ...style }}>
      <div style={{ height: '22%', background: '#eef2f7', borderBottom: '1px solid #e2e7ee' }} />
      {kind === 'chart' ? (
        <div style={{ position: 'absolute', left: 14, right: 14, bottom: 14, display: 'flex', alignItems: 'flex-end', gap: 8, height: '52%' }}>
          {[0.5, 0.82, 0.4, 0.96, 0.64, 0.86].map((b, i) => (
            <div key={i} style={{ flex: 1, height: `${b * 100}%`, borderRadius: 3, background: 'linear-gradient(180deg,#8fa1b5,#b9c3cf)' }} />
          ))}
        </div>
      ) : (
        <div style={{ position: 'absolute', left: 14, right: 14, top: '32%', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[1, 0.8, 0.6].map((wd, i) => (
            <div key={i} style={{ height: 11, width: `${wd * 100}%`, borderRadius: 6, background: '#e6ebf1' }} />
          ))}
          <div style={{ height: 30, width: 108, borderRadius: 8, background: 'linear-gradient(135deg,#9aa8ba,#c3ccd6)', marginTop: 6 }} />
        </div>
      )}
    </div>
  );
}

// Page shatter for the "momentum breaks" beat.
// The web page itself fractures: the frame is drawn once per shard, each copy clipped
// to its polygon, then tipped, spun and dropped under gravity.
const FRAME_W = 1360, FRAME_H = 812;
const CX = FRAME_W / 2, CY = FRAME_H * 0.5;
const SHARD_SPOKES = 7;
const jit = (i, k) => {
  const x = Math.sin(i * 12.9898 + k * 78.233) * 43758.5453;
  return x - Math.floor(x);
};
const PAGE_SHARDS = (() => {
  const out = [];
  const ang = [], rIn = [];
  for (let i = 0; i < SHARD_SPOKES; i++) {
    ang.push((i / SHARD_SPOKES) * Math.PI * 2 + (jit(i, 1) - 0.5) * 0.42);
    rIn.push(190 + jit(i, 2) * 230);
  }
  const pt = (a, r) => [CX + Math.cos(a) * r, CY + Math.sin(a) * r];
  const R_OUT = 1900;
  // Sutherland–Hodgman clip against the page rect so every shard is real page area
  const clipRect = (poly) => {
    const edges = [
      { in: (p) => p[0] >= 0, x: 0, axis: 0 },
      { in: (p) => p[0] <= FRAME_W, x: FRAME_W, axis: 0 },
      { in: (p) => p[1] >= 0, x: 0, axis: 1 },
      { in: (p) => p[1] <= FRAME_H, x: FRAME_H, axis: 1 },
    ];
    let out = poly;
    for (const e of edges) {
      const src = out; out = [];
      for (let i = 0; i < src.length; i++) {
        const a = src[i], b = src[(i + 1) % src.length];
        const ain = e.in(a), bin = e.in(b);
        const isect = () => {
          const d = b[e.axis] - a[e.axis];
          const tt = d === 0 ? 0 : (e.x - a[e.axis]) / d;
          return [a[0] + (b[0] - a[0]) * tt, a[1] + (b[1] - a[1]) * tt];
        };
        if (ain) { out.push(a); if (!bin) out.push(isect()); }
        else if (bin) out.push(isect());
      }
      if (!out.length) return [];
    }
    return out;
  };
  const area = (p) => Math.abs(p.reduce((a, c, i) => {
    const n = p[(i + 1) % p.length];
    return a + (c[0] * n[1] - n[0] * c[1]);
  }, 0) / 2);
  for (let i = 0; i < SHARD_SPOKES; i++) {
    const j = (i + 1) % SHARD_SPOKES;
    const a0 = ang[i], a1 = ang[j] + (j === 0 ? Math.PI * 2 : 0);
    out.push({ pts: [[CX, CY], pt(a0, rIn[i]), pt(a1, rIn[j])] });
    const am = (a0 + a1) / 2;
    const rm = ((rIn[i] + rIn[j]) / 2) * (0.84 + jit(i, 5) * 0.36);
    out.push({ pts: [pt(a0, rIn[i]), pt(am, rm), pt(am, R_OUT), pt(a0, R_OUT)] });
    out.push({ pts: [pt(am, rm), pt(a1, rIn[j]), pt(a1, R_OUT), pt(am, R_OUT)] });
  }
  return out
    .map((sh) => clipRect(sh.pts))
    .filter((pts) => pts.length >= 3 && area(pts) > 2200)
    .map((pts) => {
      const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]);
      const bx = Math.floor(Math.min(...xs)), by = Math.floor(Math.min(...ys));
      const bw = Math.ceil(Math.max(...xs)) - bx, bh = Math.ceil(Math.max(...ys)) - by;
      return {
        pts, bx, by, bw, bh,
        clip: 'polygon(' + pts.map((p) => (p[0] - bx).toFixed(1) + 'px ' + (p[1] - by).toFixed(1) + 'px').join(',') + ')',
        cx: pts.reduce((a, p) => a + p[0], 0) / pts.length,
        cy: pts.reduce((a, p) => a + p[1], 0) / pts.length,
      };
    });
})();

// Hairline fracture seams that race out along the shard edges just before the break
const SEAMS = (() => {
  const seen = new Set(), out = [];
  PAGE_SHARDS.forEach((sh) => {
    for (let k = 0; k < sh.pts.length; k++) {
      const a = sh.pts[k], b = sh.pts[(k + 1) % sh.pts.length];
      const onEdge = (p, q, ax, v) => Math.abs(p[ax] - v) < 0.6 && Math.abs(q[ax] - v) < 0.6;
      if (onEdge(a, b, 0, 0) || onEdge(a, b, 0, FRAME_W) || onEdge(a, b, 1, 0) || onEdge(a, b, 1, FRAME_H)) continue;
      const key = [a, b].map((p) => p.map((v) => v.toFixed(0)).join()).sort().join('|');
      if (seen.has(key)) continue;
      seen.add(key);
      out.push('M' + a[0].toFixed(0) + ',' + a[1].toFixed(0) + ' L' + b[0].toFixed(0) + ',' + b[1].toFixed(0));
    }
  });
  return out;
})();

const FrozenPage = React.memo(function FrozenPage({ node }) { return node; }, () => true);

function PageShatter({ t, start = 16.4, children }) {
  const l = t - start;
  if (l < 0) {
    return <div style={{ position: 'relative', width: FRAME_W, height: FRAME_H }}>{children}</div>;
  }
  const crack = Easing.easeOutCubic(clamp(l / 0.34, 0, 1));
  const flash = interpolate([0, 0.08, 0.5], [0, 1, 0], Easing.linear)(l);
  const intact = l < 0.26;

  return (
    <div style={{ position: 'relative', width: FRAME_W, height: FRAME_H }}>
      {intact ? (
        <div style={{ position: 'absolute', inset: 0 }}>{children}</div>
      ) : (
        PAGE_SHARDS.map((sh, k) => {
          const dx0 = sh.cx - CX, dy0 = sh.cy - CY;
          const dist = Math.hypot(dx0, dy0) || 1;
          const delay = 0.26 + (dist / 1500) * 0.42 + jit(k, 3) * 0.14;
          const f = clamp(l - delay, 0, 99);
          const push = (jit(k, 4) * 24 + 30) * f;
          const tx = (dx0 / dist) * push + (jit(k, 6) - 0.5) * 80 * f;
          const ty = (dy0 / dist) * push * 0.5 + 540 * f * f;
          const rot = (jit(k, 7) - 0.5) * 130 * f;
          const sc = 1 - 0.1 * clamp(f, 0, 1);
          const op = clamp(1 - f / 1.5, 0, 1);
          if (op <= 0) return null;
          return (
            <div key={k} style={{ position: 'absolute', left: sh.bx, top: sh.by, width: sh.bw, height: sh.bh,
              clipPath: sh.clip, overflow: 'hidden',
              transformOrigin: (sh.cx - sh.bx).toFixed(0) + 'px ' + (sh.cy - sh.by).toFixed(0) + 'px',
              transform: 'translate(' + tx.toFixed(1) + 'px,' + ty.toFixed(1) + 'px) rotate(' + rot.toFixed(1) + 'deg) scale(' + sc.toFixed(3) + ')',
              opacity: op, backfaceVisibility: 'hidden' }}>
              <div style={{ position: 'absolute', left: -sh.bx, top: -sh.by, width: FRAME_W, height: FRAME_H }}>
                <FrozenPage node={children} />
              </div>
            </div>
          );
        })
      )}
      {/* fracture seams + impact flash */}
      {l < 0.7 && (
        <svg viewBox={'0 0 ' + FRAME_W + ' ' + FRAME_H}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          <g fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="2" strokeLinecap="round"
            opacity={1 - Easing.easeInCubic(clamp((l - 0.34) / 0.36, 0, 1))}>
            {SEAMS.map((d, k) => (
              <path key={k} d={d} pathLength="1" strokeDasharray="1"
                strokeDashoffset={1 - clamp(crack * (1.05 + jit(k, 9) * 0.5), 0, 1)} />
            ))}
          </g>
          <circle cx={CX} cy={CY} r={10 + flash * 46} fill={'rgba(255,255,255,' + (0.8 * flash).toFixed(2) + ')'} />
        </svg>
      )}
    </div>
  );
}

// Animated pointer cursor
function Cursor({ x, y, opacity = 1, pressed = false }) {
  return (
    <div style={{ position: 'absolute', left: x, top: y, opacity, transform: `scale(${pressed ? 0.86 : 1})`,
      transformOrigin: 'top left', transition: 'none', zIndex: 60, willChange: 'left, top, transform, opacity',
      filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.35))' }}>
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
        <path d="M4 2l6.5 16 2.3-6.7L19.5 9 4 2z" fill="#fff" stroke="#1b1230" strokeWidth="1.4" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}

// Lower-third kinetic caption. tone 'dark' = white on plum/dark; 'light' = plum on light.
function Caption({ text, tone = 'dark' }) {
  const { localTime, duration } = useSprite();
  const inT = Easing.easeOutCubic(clamp(localTime / 0.42, 0, 1));
  const outStart = duration - 0.34;
  const outT = localTime > outStart ? Easing.easeInCubic(clamp((localTime - outStart) / 0.34, 0, 1)) : 0;
  const opacity = inT * (1 - outT);
  const ty = (1 - inT) * 22 + outT * -10;
  const light = tone === 'light';
  return (
    <div style={{ position: 'absolute', left: 0, right: 0, bottom: 96, display: 'flex',
      justifyContent: 'center', opacity, transform: `translateY(${ty}px)`, willChange: 'transform, opacity' }}>
      <div style={{ maxWidth: 1180, textAlign: 'center', fontFamily: DISPLAY, fontWeight: 600,
        fontSize: 52, lineHeight: 1.15, letterSpacing: '-1px', color: light ? KDS.plum : '#fff',
        textShadow: light ? '0 1px 0 rgba(255,255,255,0.55)' : '0 2px 30px rgba(0,0,0,0.55), 0 1px 3px rgba(0,0,0,0.4)',
        padding: '0 60px' }}>
        {text}
      </div>
    </div>
  );
}

// Browser chrome wrapper
function BrowserFrame({ url, children, w = 1360, h = 812 }) {
  return (
    <div style={{ width: w, height: h, borderRadius: 16, overflow: 'hidden', background: '#fff',
      boxShadow: '0 40px 120px rgba(15,23,42,0.45), 0 8px 30px rgba(15,23,42,0.25)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ height: 46, background: '#e3e7ec', display: 'flex', alignItems: 'center', gap: 8, padding: '0 16px', flexShrink: 0 }}>
        <div style={{ display: 'flex', gap: 7 }}>
          {['#f2655b', '#f5bd4f', '#61c554'].map((c, i) => (
            <div key={i} style={{ width: 12, height: 12, borderRadius: 6, background: c }} />
          ))}
        </div>
        <div style={{ flex: 1, margin: '0 18px', height: 26, background: '#fff', borderRadius: 13,
          display: 'flex', alignItems: 'center', padding: '0 14px', color: '#8b96a4', fontFamily: MONO, fontSize: 12 }}>
          <span style={{ marginRight: 8, fontSize: 11 }}>🔒</span>{url}
        </div>
      </div>
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>{children}</div>
    </div>
  );
}

// ── The generic / cold competitor landing page ────────────────────────────────
function ColdLandingPage({ formHi = 0, dim = 0, name = 'TARNBECK WEALTH', btnHi = 0 }) {
  const Field = ({ label, hi }) => (
    <div style={{ marginBottom: 14 }}>
      <div style={{ fontSize: 12, color: COLD.slate, marginBottom: 6, fontFamily: GENERIC }}>{label}</div>
      <div style={{ height: 40, borderRadius: 6, background: COLD.field,
        border: `1px solid ${hi ? COLD.accent : COLD.line}`, boxShadow: hi ? `0 0 0 3px rgba(61,86,110,0.15)` : 'none' }} />
    </div>
  );
  return (
    <div style={{ position: 'absolute', inset: 0, background: COLD.bg, fontFamily: GENERIC,
      filter: `grayscale(${dim}) brightness(${1 - dim * 0.12})`, transition: 'none' }}>
      {/* top nav */}
      <div style={{ height: 62, background: '#fff', borderBottom: `1px solid ${COLD.line}`, display: 'flex',
        alignItems: 'center', padding: '0 40px', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 26, height: 26, borderRadius: 5, background: COLD.navy }} />
          <div style={{ fontWeight: 700, color: COLD.navy, letterSpacing: '0.14em', fontSize: 16 }}>{name}</div>
        </div>
        <div style={{ display: 'flex', gap: 30, alignItems: 'center', color: COLD.slate, fontSize: 14 }}>
          <span>Services</span><span>About</span><span>Insights</span>
          <div style={{ padding: '9px 18px', border: `1px solid ${COLD.line}`, borderRadius: 6, color: COLD.navy, fontWeight: 600 }}>Client Login</div>
        </div>
      </div>
      {/* hero */}
      <div style={{ display: 'flex', padding: '56px 40px 0', gap: 44 }}>
        <div style={{ flex: 1.15 }}>
          <div style={{ display: 'inline-block', fontSize: 12, letterSpacing: '0.16em', color: COLD.slate,
            border: `1px solid ${COLD.line}`, borderRadius: 20, padding: '5px 14px', marginBottom: 22 }}>WEALTH MANAGEMENT</div>
          <div style={{ fontSize: 52, lineHeight: 1.08, fontWeight: 800, color: COLD.navy, letterSpacing: '-0.02em' }}>
            Building wealth<br/>that lasts generations.
          </div>
          <div style={{ fontSize: 17, color: COLD.slate, marginTop: 20, maxWidth: 460, lineHeight: 1.6 }}>
            Comprehensive portfolio management and financial planning tailored to institutions and families.
          </div>
          <div style={{ marginTop: 28 }}>
            <StockFill kind="handshake" w={560} h={220} />
          </div>
        </div>
        {/* the friction form */}
        <div style={{ width: 380, background: COLD.card, borderRadius: 12, border: `1px solid ${COLD.line}`,
          boxShadow: '0 20px 50px rgba(38,49,63,0.10)', padding: 26,
          outline: formHi > 0 ? `2px solid rgba(61,86,110,${0.4 * formHi})` : 'none' }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: COLD.navy, marginBottom: 4 }}>Get started</div>
          <div style={{ fontSize: 13, color: COLD.slate, marginBottom: 18 }}>Complete the form and an advisor will reach out.</div>
          <Field label="Full name" />
          <Field label="Email address" />
          <Field label="Phone number" hi={formHi > 0.5} />
          <Field label="Investable assets" />
          <Field label="How did you hear about us?" />
          <div style={{ height: 44, borderRadius: 6, background: COLD.accent, color: '#fff', display: 'flex',
            alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 15, marginTop: 6,
            boxShadow: btnHi > 0 ? `0 0 0 ${4 * btnHi}px rgba(61,86,110,0.25)` : 'none' }}>Request a consultation</div>
        </div>
      </div>
    </div>
  );
}

// ── SCENE 1 — the conversion problem ───────────────────────────────────────────
// ~0–20s. Cold landing page, camera drifts to the form, cursor hesitates then leaves.
function Scene1() {
  const t = useT();
  // camera: slow push toward the form on the right
  const camScale = interpolate([0, 3, 16, 20], [1.02, 1.06, 1.16, 1.2], Easing.easeInOutQuad)(t);
  const camX = interpolate([0, 3, 16, 20], [0, -20, -230, -250], Easing.easeInOutQuad)(t);
  const camY = interpolate([0, 3, 16, 20], [0, -10, -70, -80], Easing.easeInOutQuad)(t);

  // cursor path (coords in stage space)
  const cx = interpolate([5, 8.5, 11, 13, 14.5, 16.5], [980, 1250, 1270, 1265, 1180, 1500], Easing.easeInOutCubic)(t);
  const cy = interpolate([5, 8.5, 11, 13, 14.5, 16.5], [760, 470, 505, 505, 250, -80], Easing.easeInOutCubic)(t);
  const curOpacity = interpolate([4.6, 5, 15.8, 16.5], [0, 1, 1, 0], Easing.linear)(t);
  const formHi = interpolate([9, 11, 14, 15], [0, 1, 1, 0], Easing.easeInOutQuad)(t);
  const dim = interpolate([15.5, 18.5], [0, 0.85], Easing.easeInOutQuad)(t);
  // violent screen shake on impact
  const shakeAmp = interpolate([16.35, 16.55, 18.4], [0, 30, 0], Easing.easeOutCubic)(t);
  const shakeX = shakeAmp * Math.sin((t - 16.35) * 66);
  const shakeY = shakeAmp * 0.55 * Math.cos((t - 16.35) * 58);
  // parallax float + entry
  const floatX = Math.sin(t * 0.5) * 8;
  const floatY = Math.cos(t * 0.42) * 6;
  const tilt = Math.sin(t * 0.35) * 0.5;
  const intro = Easing.easeOutCubic(clamp(t / 0.7, 0, 1));

  return (
    <div style={{ position: 'absolute', inset: 0, background: '#eef1f5' }}>
      {/* clean light backdrop */}
      <div style={{ position: 'absolute', inset: 0,
        background: 'radial-gradient(1300px 820px at 50% 30%, #ffffff 0%, #e9edf3 58%, #dde3ec 100%)' }} />
      {/* browser on stage */}
      <div style={{ position: 'absolute', left: '50%', top: '50%',
        transform: `translate(-50%,-50%) translate(${camX + shakeX + floatX}px, ${camY + shakeY + floatY}px) rotate(${tilt}deg) scale(${camScale * (0.97 + 0.03 * intro)})`,
        opacity: intro, willChange: 'transform, opacity' }}>
        <PageShatter t={t} start={16.4}>
          <BrowserFrame url="tarnbeckwealth.com">
            <ColdLandingPage formHi={formHi} dim={dim} />
          </BrowserFrame>
        </PageShatter>
      </div>

      {/* cursor */}
      <Cursor x={cx} y={cy} opacity={curOpacity} />


    </div>
  );
}

// A stamped friction label (red, rotated) that pops in
function StampLabel({ text, x, y, rot = -8, delay = 0 }) {
  const { localTime } = useSprite();
  const p = Easing.easeOutBack(clamp((localTime - delay) / 0.4, 0, 1));
  if (p <= 0) return null;
  return (
    <div style={{ position: 'absolute', left: x, top: y, transform: `translate(-50%,-50%) rotate(${rot}deg) scale(${0.6 + 0.4 * p})`,
      opacity: clamp((localTime - delay) / 0.3, 0, 1), zIndex: 40,
      border: '3px solid #e0463c', color: '#e0463c', fontFamily: DISPLAY, fontWeight: 800,
      fontSize: 26, letterSpacing: '0.04em', textTransform: 'uppercase', padding: '6px 16px', borderRadius: 8,
      background: 'rgba(255,255,255,0.9)', boxShadow: '0 8px 26px rgba(224,70,60,0.3)' }}>{text}</div>
  );
}

// A scaled-down firm site card for the "interchangeable" grid
function FirmCard({ firm, scale = 0.315, dim = 0, delay = 0 }) {
  const { localTime } = useSprite();
  const p = Easing.easeOutCubic(clamp((localTime - delay) / 0.5, 0, 1));
  return (
    <div style={{ width: 1360 * scale, height: 812 * scale, position: 'relative',
      opacity: p, transform: `translateY(${(1 - p) * 30}px)` }}>
      <div style={{ position: 'absolute', top: 0, left: 0, width: 1360, height: 812, transformOrigin: 'top left',
        transform: `scale(${scale})` }}>
        <BrowserFrame url={firm.url}>
          <CompanyPage firm={firm} dim={dim} />
        </BrowserFrame>
      </div>
    </div>
  );
}

// ── Distinct competitor firms (each its own brand + layout) ────────────────────
const FIRMS = [
  { id: 'verrowyn',  name: 'VERROWYN',           url: 'verrowynprivate.com',    variant: 'serif-centered',
    theme: { bg: '#f3f1ec', card: '#fff', ink: '#1f2a24', sub: '#6a7269', line: '#e0ddd3', accent: '#2f5d4a', field: '#f7f6f1' },
    font: DISPLAY, tag: 'PRIVATE WEALTH', heroA: 'Wealth,', heroB: 'quietly stewarded.', mark: 'square' },
  { id: 'halbrook',  name: 'HALBROOK',           url: 'halbrook-partners.com', variant: 'photo-left',
    theme: { bg: '#0f1c2e', card: '#16283f', ink: '#eaf1f9', sub: '#93a6bd', line: '#25384f', accent: '#3f7cc4', field: '#1c3149' },
    font: DISPLAY, tag: 'INSTITUTIONAL ADVISORY', heroA: 'Capital with', heroB: 'conviction.', mark: 'circle', dark: true },
  { id: 'quillane', name: 'Quillane Wealth',    url: 'quillanewealth.co',          variant: 'split-warm',
    theme: { bg: '#faf6f0', card: '#fff', ink: '#3a2318', sub: '#8a7161', line: '#ece2d6', accent: '#a8632c', field: '#f6efe6' },
    font: DISPLAY, tag: 'FAMILY OFFICE', heroA: 'A steady hand', heroB: 'for what you build.', mark: 'diamond' },
  { id: 'merrowfield',name: 'Merrowfield Capital',url: 'merrowfieldcapital.io',        variant: 'minimal-mono',
    theme: { bg: '#eef1f0', card: '#fff', ink: '#1a2b2b', sub: '#5e7373', line: '#dbe4e2', accent: '#0d8f8f', field: '#f2f6f5' },
    font: DISPLAY, tag: 'MODERN PORTFOLIO MGMT', heroA: 'Invest with', heroB: 'clarity.', mark: 'pill' },
];

function firmMark(shape, color) {
  const base = { width: 26, height: 26, background: color, flexShrink: 0 };
  if (shape === 'circle') return { ...base, borderRadius: '50%' };
  if (shape === 'diamond') return { ...base, borderRadius: 4, transform: 'rotate(45deg)' };
  if (shape === 'pill') return { ...base, width: 34, borderRadius: 13 };
  return { ...base, borderRadius: 5 };
}

// One competitor company page. Layout + palette driven by `firm`.
function CompanyPage({ firm, formHi = 0, dim = 0, btnHi = 0 }) {
  const { theme: c, font, variant } = firm;
  const Field = ({ label, hi }) => (
    <div style={{ marginBottom: 12 }}>
      <div style={{ fontSize: 11.5, color: c.sub, marginBottom: 5, fontFamily: font }}>{label}</div>
      <div style={{ height: 38, borderRadius: 5, background: c.field,
        border: `1px solid ${hi ? c.accent : c.line}`, boxShadow: hi ? `0 0 0 3px ${c.accent}22` : 'none' }} />
    </div>
  );
  const Form = ({ compact }) => (
    <div style={{ width: compact ? 340 : 380, background: c.card, borderRadius: 12, border: `1px solid ${c.line}`,
      boxShadow: c.dark ? '0 20px 50px rgba(0,0,0,0.35)' : '0 20px 50px rgba(38,49,63,0.12)', padding: 24,
      outline: formHi > 0 ? `2px solid ${c.accent}${Math.round(formHi * 120).toString(16).padStart(2, '0')}` : 'none' }}>
      <div style={{ fontSize: 19, fontWeight: 700, color: c.ink, marginBottom: 3, fontFamily: font }}>Get started</div>
      <div style={{ fontSize: 12.5, color: c.sub, marginBottom: 16, fontFamily: font }}>Complete the form and an advisor will reach out.</div>
      <Field label="Full name" />
      <Field label="Email address" />
      <Field label="Phone number" hi={formHi > 0.5} />
      <Field label="Investable assets" />
      <Field label="How did you hear about us?" />
      <div style={{ height: 42, borderRadius: 5, background: c.accent, color: '#fff', display: 'flex',
        alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14, marginTop: 4, fontFamily: font,
        boxShadow: btnHi > 0 ? `0 0 0 ${4 * btnHi}px ${c.accent}33` : 'none' }}>Request a consultation</div>
    </div>
  );
  const Nav = () => (
    <div style={{ height: 60, background: c.dark ? c.card : '#fff', borderBottom: `1px solid ${c.line}`, display: 'flex',
      alignItems: 'center', padding: '0 38px', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
        <div style={firmMark(firm.mark, c.accent)} />
        <div style={{ fontWeight: 700, color: c.ink, letterSpacing: variant === 'minimal-mono' ? '0.02em' : '0.12em',
          fontSize: 16, fontFamily: font }}>{firm.name}</div>
      </div>
      <div style={{ display: 'flex', gap: 26, alignItems: 'center', color: c.sub, fontSize: 13.5, fontFamily: font }}>
        <span>Services</span><span>About</span><span>Insights</span>
        <div style={{ padding: '8px 16px', border: `1px solid ${c.line}`, borderRadius: 5, color: c.ink, fontWeight: 600 }}>Client Login</div>
      </div>
    </div>
  );
  const Badge = () => (
    <div style={{ display: 'inline-block', fontSize: 11.5, letterSpacing: '0.16em', color: c.sub,
      border: `1px solid ${c.line}`, borderRadius: 20, padding: '5px 13px', marginBottom: 20, fontFamily: font }}>{firm.tag}</div>
  );
  const Heading = ({ size = 50 }) => (
    <div style={{ fontSize: size, lineHeight: 1.06, fontWeight: variant === 'minimal-mono' ? 800 : 700,
      color: c.ink, letterSpacing: variant === 'minimal-mono' ? '-0.03em' : '0', fontFamily: font }}>
      {firm.heroA}<br/>{firm.heroB}
    </div>
  );
  const sub = { fontSize: 16, color: c.sub, marginTop: 18, maxWidth: 440, lineHeight: 1.6, fontFamily: font };

  let body;
  if (variant === 'serif-centered') {
    body = (
      <div style={{ padding: '46px 40px 0', textAlign: 'center' }}>
        <Badge />
        <div style={{ display: 'flex', justifyContent: 'center' }}><Heading size={54} /></div>
        <div style={{ ...sub, margin: '18px auto 0' }}>Discretionary portfolio management and estate planning for private families.</div>
        <div style={{ display: 'flex', gap: 36, marginTop: 30, alignItems: 'flex-start', justifyContent: 'center', textAlign: 'left' }}>
          <StockFill kind="estate" w={430} h={300} />
          <Form compact />
        </div>
      </div>
    );
  } else if (variant === 'photo-left') {
    body = (
      <div style={{ display: 'flex', height: '100%' }}>
        <div style={{ flex: 1.05, position: 'relative' }}>
          <StockFill kind="skyline" w={'100%'} h={'100%'} style={{ borderRadius: 0 }} />
          <div style={{ position: 'absolute', left: 40, bottom: 46, right: 40 }}>
            <Badge /><Heading size={50} />
            <div style={sub}>Advisory built for endowments, foundations and institutional mandates.</div>
          </div>
        </div>
        <div style={{ width: 420, padding: '40px 34px', display: 'flex', alignItems: 'center' }}><Form /></div>
      </div>
    );
  } else if (variant === 'split-warm') {
    body = (
      <div style={{ display: 'flex', padding: '52px 40px 0', gap: 42 }}>
        <div style={{ flex: 1.1 }}>
          <Badge /><Heading size={48} />
          <div style={sub}>Multi-generational planning, trust services and philanthropy — under one roof.</div>
          <div style={{ marginTop: 26 }}><StockFill kind="family" w={520} h={210} /></div>
        </div>
        <Form />
      </div>
    );
  } else { // minimal-mono
    body = (
      <div style={{ padding: '52px 40px 0' }}>
        <div style={{ display: 'flex', gap: 44 }}>
          <div style={{ flex: 1.15 }}>
            <Badge /><Heading size={56} />
            <div style={sub}>Low-fee, index-driven portfolios managed by a modern advisory team.</div>
            <div style={{ display: 'flex', gap: 14, marginTop: 26 }}>
              <UIMock kind="chart" w={250} h={150} />
              <UIMock kind="app" w={250} h={150} />
            </div>
          </div>
          <Form />
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: 'absolute', inset: 0, background: c.bg, fontFamily: font,
      filter: `grayscale(${dim}) brightness(${1 - dim * 0.12})`, color: c.ink }}>
      <Nav />
      {body}
    </div>
  );
}

// ── SCENE 2 — every firm feels the same ────────────────────────────────────────
// 20–44s. Single site + form friction stamps, then pull back to interchangeable firms, then they leave.
function Scene2() {
  const t = useT();
  const S = 20.0;
  // Shot 1 camera: push toward form
  const camScale = interpolate([S, S + 4, S + 9.6], [1.02, 1.08, 1.16], Easing.easeInOutQuad)(t);
  const camX = interpolate([S, S + 4, S + 9.6], [0, -60, -240], Easing.easeInOutQuad)(t);
  const camY = interpolate([S, S + 4, S + 9.6], [0, -20, -70], Easing.easeInOutQuad)(t);
  // cursor to the CTA button then form
  const cx = interpolate([S + 1, S + 3.6, S + 4.2, S + 6], [820, 1245, 1245, 1250], Easing.easeInOutCubic)(t);
  const cy = interpolate([S + 1, S + 3.6, S + 4.2, S + 6], [720, 690, 690, 470], Easing.easeInOutCubic)(t);
  const curOp = interpolate([S + 0.6, S + 1, S + 9.4, S + 9.9], [0, 1, 1, 0], Easing.linear)(t);
  const pressed = t > S + 3.9 && t < S + 4.4;
  const btnHi = interpolate([S + 3.8, S + 4.3, S + 6], [0, 1, 0.4], Easing.easeOutQuad)(t);
  const formHi = interpolate([S + 4.4, S + 5.4], [0, 1], Easing.easeOutQuad)(t);
  const s2op = interpolate([S - 0.1, S + 0.4], [0, 1], Easing.linear)(t);

  return (
    <div style={{ position: 'absolute', inset: 0, background: '#0c1524', opacity: s2op }}>
      <div style={{ position: 'absolute', inset: 0,
        background: 'radial-gradient(1300px 760px at 50% 34%, #17263c 0%, #0c1524 72%)' }} />

      {/* SHOT 1 — single firm (Halbrook) + form friction */}
      <Sprite start={19.9} end={30.15}>
        <div style={{ position: 'absolute', left: '50%', top: '50%',
          transform: `translate(-50%,-50%) translate(${camX}px, ${camY}px) scale(${camScale})`, willChange: 'transform' }}>
          <BrowserFrame url={FIRMS[1].url}>
            <CompanyPage firm={FIRMS[1]} formHi={formHi} btnHi={btnHi} />
          </BrowserFrame>
        </div>
        <Cursor x={cx} y={cy} opacity={curOp} pressed={pressed} />
        {/* stamps over the form area */}
        <Sprite start={25.6} end={30.15}>
          <StampLabel text="Questions" x={1180} y={430} rot={-7} delay={0} />
          <StampLabel text="Data requests" x={1330} y={560} rot={6} delay={0.5} />
          <StampLabel text="No signal" x={1150} y={640} rot={-5} delay={1.4} />
          <StampLabel text="No differentiation" x={1330} y={330} rot={8} delay={2.0} />
        </Sprite>
      </Sprite>

      {/* SHOT 2 — interchangeable grid */}
      <Sprite start={29.9} end={41.59}>
        {({ localTime }) => {
          const drift = interpolate([0, 10], [0, -26], Easing.linear)(localTime);
          // fade firms one by one near the end ("most just leave") — local ~11.5+
          const gone = (i) => interpolate([11.4 + i * 0.5, 12.2 + i * 0.5], [0, 0.9], Easing.easeInOutQuad)(localTime);
          const firms = FIRMS;
          return (
            <div style={{ position: 'absolute', inset: 0 }}>
              <div style={{ position: 'absolute', left: 0, right: 0, top: '50%',
                transform: `translateY(calc(-50% + ${drift}px))`, display: 'flex', gap: 26, justifyContent: 'center', padding: '0 40px' }}>
                {firms.map((f, i) => (
                  <div key={f.id} style={{ opacity: 1 - gone(i), transform: `translateY(${gone(i) * 40}px)` }}>
                    <FirmCard firm={f} scale={0.315} delay={i * 0.14} dim={0.15 + gone(i) * 0.7} />
                  </div>
                ))}
              </div>
            </div>
          );
        }}
      </Sprite>

    </div>
  );
}

// ── Scene manifest — the STABLE contract your app codes against ────────────────
// Each new video version keeps these fields; ids never change once shipped.
// (start/end/title may shift as scenes are refined — always read them live via
//  window.KnomeePlayer.getScenes(), don't hardcode timings in your app.)
const SCENES = [
  { id: 'problem',       n: 1, title: 'The conversion problem', start: 0.0,  end: 20.0 },
  { id: 'sameness',      n: 2, title: 'Every firm feels the same', start: 20.0, end: 41.59 },
  { id: 'transition',    n: 3, title: 'Knomee changes the starting point', start: 41.59, end: 44.95 },
  { id: 'value',         n: 4, title: 'Knomee creates value immediately', start: 44.95, end: 65.26 },
  { id: 'signals',       n: 5, title: 'Signals advisors can act on', start: 65.26, end: 85.27 },
  { id: 'founder-1',     n: 6, title: 'Founder POV — clarity changes everything', start: 85.27, end: 107.75 },
  { id: 'meeting-prep',  n: 7, title: 'Meeting prep', start: 107.75, end: 118.3 },
  { id: 'different',     n: 8, title: 'Show up different', start: 118.3, end: 127.09 },
  { id: 'founder-2',     n: 9, title: 'Founder POV — build trust faster', start: 127.09, end: 133.09 },
  { id: 'lifecycle',     n: 10, title: 'The lifecycle', start: 133.09, end: 148.57 },
  { id: 'close',         n: 11, title: 'Better beginnings', start: 148.57, end: 160.57 },
  { id: 'final',         n: 12, title: 'Making advice stronger', start: 160.57, end: 168.57 },
];
const VIDEO_DURATION = 168.57;

// Bridges the internal timeline to a stable global API + postMessage stream.
// Mounted once inside <Stage>. Your embedding page uses window.KnomeePlayer
// and/or listens for 'knomee:*' messages from the iframe.
function PlayerBridge() {
  const tl = useTimeline(); // { time, duration, playing, setTime, setPlaying }
  const tlRef = React.useRef(tl);
  tlRef.current = tl; // always latest
  const lastScene = React.useRef(-1);
  const post = (msg) => { try { window.parent.postMessage({ source: 'knomee-video', ...msg }, '*'); } catch {} };
  const sceneAt = (t) => {
    for (let i = SCENES.length - 1; i >= 0; i--) if (t >= SCENES[i].start) return SCENES[i];
    return SCENES[0];
  };

  // Publish the control API (stable across video versions)
  React.useEffect(() => {
    const T = () => tlRef.current;
    window.KnomeePlayer = {
      version: 1,
      play: () => T().setPlaying(true),
      pause: () => T().setPlaying(false),
      toggle: () => T().setPlaying(p => !p),
      seekTo: (sec) => { T().setPlaying(false); T().setTime(clamp(sec, 0, T().duration)); },
      goToScene: (idOrN) => {
        const s = SCENES.find(x => x.id === idOrN || x.n === idOrN);
        if (s) { T().setPlaying(false); T().setTime(s.start); }
        return !!s;
      },
      getScenes: () => SCENES.map(s => ({ ...s })),
      getState: () => { const t = T().time; return { time: t, duration: T().duration, playing: T().playing, scene: sceneAt(t) }; },
    };
    post({ type: 'knomee:ready', duration: T().duration, scenes: SCENES });
    return () => { if (window.KnomeePlayer && window.KnomeePlayer.version === 1) delete window.KnomeePlayer; };
  }, []);

  // Emit tick + scene-change + play-state events
  React.useEffect(() => {
    const cur = sceneAt(tl.time);
    post({ type: 'knomee:tick', time: tl.time, duration: tl.duration, playing: tl.playing, sceneId: cur.id, sceneN: cur.n });
    if (cur.n !== lastScene.current) {
      lastScene.current = cur.n;
      post({ type: 'knomee:scene', scene: cur });
    }
  }, [tl.time, tl.playing]);

  return null;
}

// ── Inline Knomee brand marks (no external asset → clean bundling + recolor) ────
const KNOMEE_ICON_PATHS = [
  "M165.378 198.685C164.99 198.685 164.537 198.685 164.149 198.62C110.711 192.518 93.0496 170.8 87.2917 158.466C78.8167 140.224 83.2159 121.394 98.5487 110.372C112.523 100.333 130.766 101.12 141.895 112.274C146.229 116.605 146.294 123.757 142.024 128.152C137.753 132.548 130.703 132.614 126.367 128.283C122.356 124.281 115.757 125.462 111.358 128.677C108.318 130.843 101.913 137.206 107.347 148.886C110.258 155.119 121.063 169.62 159.815 175.393C180.064 141.34 175.859 123.691 173.012 117.458C170.619 112.34 167.319 109.125 163.179 107.813C159.298 106.632 154.704 107.222 150.951 109.453C145.711 112.602 138.918 110.831 135.813 105.516C132.707 100.202 134.455 93.3125 139.695 90.1632C148.817 84.6517 159.815 83.2739 169.648 86.3577C176.764 88.5885 186.598 94.0998 193.003 107.878C198.761 120.279 204.066 147.836 174.695 193.567C172.624 196.783 169.13 198.685 165.443 198.685H165.378Z",
  "M182.923 284.948C177.554 284.948 172.572 281.405 170.89 275.893C168.884 269.136 172.636 261.984 179.235 259.95C221.093 246.959 252.6 211.922 261.398 168.487C267.803 136.796 261.656 104.515 244.124 77.5489C226.592 50.5825 199.744 32.1456 168.496 25.5844C161.703 24.1409 157.304 17.383 158.727 10.4937C160.151 3.60443 166.75 -0.85719 173.607 0.586272C211.389 8.45969 243.93 30.8333 265.15 63.508C286.37 96.1828 293.81 135.288 286.046 173.67C275.372 226.291 237.266 268.742 186.611 284.423C185.382 284.816 184.152 285.014 182.923 285.014V284.948Z",
  "M117.96 288C117.119 288 116.278 287.934 115.437 287.737C77.6551 279.864 45.1137 257.556 23.8938 224.815C2.67386 192.142 -4.76604 153.036 2.99733 114.653C14.7718 56.39 59.6054 11.446 117.184 0.226364C124.041 -1.08587 130.64 3.4413 131.935 10.3305C133.228 17.2854 128.764 23.9778 121.971 25.2901C74.4204 34.6069 37.415 71.6777 27.6461 119.837C21.2413 151.528 27.3872 183.809 44.9196 210.775C62.4518 237.742 89.3002 256.178 120.547 262.739C127.341 264.182 131.741 270.941 130.317 277.83C129.088 283.866 123.847 288 118.025 288H117.96Z",
  "M58.8323 136.393C57.9266 136.393 57.0208 136.262 56.1152 136.066C49.5809 134.556 45.5052 127.93 47.0578 121.303C53.0745 94.861 68.86 72.4218 91.5679 58.0527C114.211 43.6838 141.059 39.1566 167.132 45.2584C202.843 53.6568 231.179 81.0825 241.013 116.972C242.824 123.534 239.072 130.291 232.602 132.128C226.134 133.966 219.47 130.094 217.658 123.599C210.218 96.4357 188.74 75.6367 161.632 69.2724C141.901 64.614 121.586 68.0914 104.378 78.983C87.2334 89.8746 75.2648 106.868 70.6715 126.88C69.3775 132.588 64.3961 136.393 58.8323 136.393Z",
  "M144.457 245.68C137.018 245.68 129.448 244.828 121.944 243.055C82.3504 233.804 52.4614 201.523 45.7331 160.909C44.6333 154.217 49.0973 147.853 55.6961 146.737C62.295 145.622 68.5704 150.149 69.6702 156.841C74.7811 187.614 97.4243 212.021 127.378 219.042C168.136 228.556 208.893 202.704 218.339 161.435C219.826 154.807 226.361 150.674 232.895 152.249C239.429 153.758 243.505 160.385 241.953 167.011C231.278 213.858 190.003 245.68 144.457 245.68Z",
];
const KNOMEE_WORD_PATHS = [
  "M436.702 188.382H420.788V259.505H378.607V12.0173H420.788V155.38H441.167L488.2 94.0321H536.267L472.349 172.897L543.191 259.44H491.693L436.767 188.316L436.702 188.382Z",
  "M720.165 152.598V254.231H677.984V158.57C677.984 137.18 666.921 123.14 646.219 123.14C619.241 123.14 607.143 147.678 607.143 168.346V254.231H564.962V88.824L597.439 87.4462C600.544 98.9939 602.615 116.184 602.615 123.533H603.65C611.93 103.587 628.557 86.7245 658.252 86.7245C698.362 86.7245 720.101 114.413 720.101 152.598H720.165Z",
  "M921.586 171.888C921.586 221.688 887.75 256.331 836.252 256.331C784.756 256.331 750.92 221.622 750.92 171.888C750.92 122.154 785.144 86.7245 836.252 86.7245C887.362 86.7245 921.586 122.154 921.586 171.888ZM878.758 171.888C878.758 142.428 862.196 121.761 836.252 121.761C810.31 121.761 793.748 142.428 793.748 171.888C793.748 201.348 810.31 221.295 836.252 221.295C862.196 221.295 878.758 200.955 878.758 171.888Z",
  "M1217.1 153.402V254.378H1174.92V159.044C1174.92 137.654 1164.18 124.007 1143.48 124.007C1117.92 124.007 1106.47 148.218 1106.47 168.492V254.378H1064.29V159.044C1064.29 137.654 1053.55 124.007 1032.85 124.007C1007.3 124.007 996.232 148.218 996.232 168.492V254.378H954.052V88.9705L986.529 87.5926C989.634 98.4842 991.704 116.331 991.704 123.679H992.028C999.986 103.34 1016.22 87.199 1044.88 87.199C1073.54 87.199 1093.6 101.896 1101.88 125.057C1109.51 103.996 1126.08 87.199 1155.45 87.199C1194.85 87.199 1216.97 114.887 1216.97 153.467L1217.1 153.402Z",
  "M1382.9 203.382L1404.32 226.871C1391.89 243.34 1368.02 256.331 1335.22 256.331C1280.94 256.331 1248.14 221.622 1248.14 171.888C1248.14 122.154 1280.62 86.7245 1330.76 86.7245C1380.9 86.7245 1405.74 119.99 1405.74 164.54C1405.74 175.038 1403.99 181.731 1403.99 181.731H1290.64C1294.47 206.27 1311.02 223.066 1339.75 223.066C1363.24 223.066 1376.04 211.846 1382.96 203.448L1382.9 203.382ZM1290.64 157.454H1366.02C1365.7 135.736 1352.17 119.924 1330.76 119.924C1309.34 119.924 1294.47 134.294 1290.64 157.454Z",
  "M1564.72 203.382L1586.13 226.871C1573.71 243.34 1549.84 256.331 1517.03 256.331C1462.76 256.331 1429.96 221.622 1429.96 171.888C1429.96 122.154 1462.44 86.7245 1512.57 86.7245C1562.72 86.7245 1587.55 119.99 1587.55 164.54C1587.55 175.038 1585.81 181.731 1585.81 181.731H1472.46C1476.28 206.27 1492.85 223.066 1521.56 223.066C1545.05 223.066 1557.86 211.846 1564.79 203.448L1564.72 203.382ZM1472.46 157.454H1547.83C1547.51 135.736 1533.99 119.924 1512.57 119.924C1491.15 119.924 1476.28 134.294 1472.46 157.454Z",
];
function KnomeeIcon({ color = '#2DD2B0', size = 120, style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 293 288" fill="none" style={style}>
      {KNOMEE_ICON_PATHS.map((d, i) => <path key={i} d={d} fill={color} />)}
    </svg>
  );
}
// Tight bounds of the drawn glyphs (the raw viewBox has dead space on the right),
// so lockups centre optically instead of needing marginLeft nudges.
const WORD_X0 = 378.6, WORD_X1 = 1587.6, MARK_H = 288;
function RegMark({ color = '#fff', cx = WORD_X1 + 74, cy = 50, r = 38 }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth={13} />
      <text x={cx} y={cy + 1} fill={color} fontFamily="Poppins, sans-serif" fontWeight={600}
        fontSize={50} textAnchor="middle" dominantBaseline="central">R</text>
    </g>
  );
}
// Word only, tightly cropped so it centres on its own. The ® overhangs to the right
// (overflow visible) so the word itself stays optically centred under the icon.
function KnomeeWord({ color = '#fff', height = 46, showR = true, style }) {
  const w = WORD_X1 - WORD_X0;
  return (
    <svg height={height} width={height * w / MARK_H} viewBox={`${WORD_X0} 0 ${w} ${MARK_H}`} fill="none"
      style={{ display: 'block', overflow: 'visible', ...style }}>
      {KNOMEE_WORD_PATHS.map((d, i) => <path key={'w' + i} d={d} fill={color} />)}
      {showR ? <RegMark color={color} /> : null}
    </svg>
  );
}
function KnomeeWordmark({ iconColor = '#2DD2B0', textColor = '#fff', height = 46, showR = true, style }) {
  const w = WORD_X1 + (showR ? 118 : 0);
  return (
    <svg height={height} width={height * w / MARK_H} viewBox={`0 0 ${w} ${MARK_H}`} fill="none"
      style={{ display: 'block', ...style }}>
      {KNOMEE_ICON_PATHS.map((d, i) => <path key={'i' + i} d={d} fill={iconColor} />)}
      {KNOMEE_WORD_PATHS.map((d, i) => <path key={'w' + i} d={d} fill={textColor} />)}
      {showR ? <RegMark color={textColor} /> : null}
    </svg>
  );
}

// ── SCENE 3 — the transition into Knomee ───────────────────────────────────────
// 44–45s. Cold world washes away; warm Knomee brand arrives. "Knomee changes the starting point."
function Scene3() {
  const t = useT();
  const S = 41.59;
  const l = t - S; // local time
  // warm purple wipe sweeps in over the cold backdrop
  const wipe = interpolate([0, 1.4], [0, 140], Easing.easeInOutCubic)(l); // % across
  // icon: fade + settle scale + gentle rotation ease
  const iconP = Easing.easeOutCubic(clamp((l - 0.84) / 0.9, 0, 1));
  const iconScale = 0.7 + iconP * 0.3;
  const iconRot = (1 - iconP) * -22;
  const glow = 0.2 + 0.8 * iconP;
  // wordmark reveal
  const wordP = Easing.easeOutCubic(clamp((l - 1.51) / 0.8, 0, 1));
  // soft floating accents
  const orb = (ph, amp) => Math.sin((l + ph) * 0.7) * amp;

  return (
    <div style={{ position: 'absolute', inset: 0, background: '#0c1524', overflow: 'hidden' }}>
      {/* warm brand field revealed by diagonal wipe */}
      <div style={{ position: 'absolute', inset: 0,
        clipPath: `polygon(0 0, ${wipe}% 0, ${wipe - 40}% 100%, 0 100%)`,
        background: 'radial-gradient(1200px 900px at 42% 44%, #3a1170 0%, #240446 58%, #190232 100%)' }}>
        {/* soft aqua/teal glows */}
        <div style={{ position: 'absolute', left: `calc(30% + ${orb(0, 26)}px)`, top: `calc(30% + ${orb(2, 20)}px)`,
          width: 520, height: 520, borderRadius: '50%', filter: 'blur(90px)',
          background: 'radial-gradient(circle, rgba(45,210,176,0.22), rgba(45,210,176,0))' }} />
        <div style={{ position: 'absolute', right: `calc(24% + ${orb(3, 22)}px)`, bottom: `calc(26% + ${orb(1, 18)}px)`,
          width: 460, height: 460, borderRadius: '50%', filter: 'blur(90px)',
          background: 'radial-gradient(circle, rgba(8,99,117,0.5), rgba(8,99,117,0))' }} />
      </div>

      {/* brand lockup */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: 30 }}>
        <div style={{ opacity: iconP, transform: `scale(${iconScale}) rotate(${iconRot}deg)`,
          filter: `drop-shadow(0 0 ${40 * glow}px rgba(45,210,176,${0.55 * glow}))`, willChange: 'transform, opacity' }}>
          <KnomeeIcon color="#2DD2B0" size={150} />
        </div>
        <div style={{ opacity: wordP, transform: `translateY(${(1 - wordP) * 14}px)` }}>
          <KnomeeWord color="#fff" height={62} />
        </div>
      </div>

      {/* caption */}
      <Sprite start={42.85} end={44.95}>
        {() => {
          const { localTime, duration } = useSprite();
          const inT = Easing.easeOutCubic(clamp(localTime / 0.5, 0, 1));
          const outT = localTime > duration - 0.4 ? clamp((localTime - (duration - 0.4)) / 0.4, 0, 1) : 0;
          return (
            <div style={{ position: 'absolute', left: 0, right: 0, bottom: 150, display: 'flex', justifyContent: 'center',
              opacity: inT * (1 - outT), transform: `translateY(${(1 - inT) * 18}px)` }}>
              <div style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 54, letterSpacing: '-0.02em', color: '#fff',
                textShadow: '0 2px 30px rgba(0,0,0,0.5)' }}>
                Knomee changes the <span style={{ color: '#2DD2B0' }}>starting point.</span>
              </div>
            </div>
          );
        }}
      </Sprite>
    </div>
  );
}

// ── Shared Knomee-experience atoms (warm brand world) ─────────────────────────
function WarmField({ l = 0 }) {
  const orb = (ph, amp) => Math.sin((l + ph) * 0.6) * amp;
  return (
    <div style={{ position: 'absolute', inset: 0,
      background: 'radial-gradient(1300px 950px at 46% 42%, #3a1170 0%, #240446 60%, #190232 100%)' }}>
      <div style={{ position: 'absolute', left: `calc(24% + ${orb(0, 30)}px)`, top: `calc(24% + ${orb(2, 24)}px)`,
        width: 580, height: 580, borderRadius: '50%', filter: 'blur(100px)',
        background: 'radial-gradient(circle, rgba(45,210,176,0.22), rgba(45,210,176,0))' }} />
      <div style={{ position: 'absolute', right: `calc(18% + ${orb(3, 26)}px)`, bottom: `calc(20% + ${orb(1, 22)}px)`,
        width: 540, height: 540, borderRadius: '50%', filter: 'blur(100px)',
        background: 'radial-gradient(circle, rgba(124,58,237,0.30), rgba(124,58,237,0))' }} />
    </div>
  );
}

// Selectable value/goal pill (DS consumer style). sel: 0..1 selection progress.
function Chip({ label, sel = 0 }) {
  const on = sel > 0.02;
  const ripple = clamp(sel * 1.4, 0, 1);
  return (
    <div style={{ position: 'relative', padding: '14px 26px', borderRadius: 999, fontFamily: DISPLAY,
      fontWeight: 600, fontSize: 23, letterSpacing: '-0.3px',
      border: `1.5px solid ${on ? 'transparent' : KDS.stone}`, color: on ? '#fff' : KDS.body,
      background: on ? KDS.plum : '#ffffff',
      boxShadow: on ? `0 12px 30px rgba(36,4,70,${0.24 * sel})` : '0 1px 6px rgba(0,0,0,0.05)',
      transform: `scale(${1 + 0.06 * Math.sin(clamp(sel, 0, 1) * Math.PI)})`, willChange: 'transform' }}>
      {label}
      {on && ripple < 1 && (
        <span style={{ position: 'absolute', inset: -3, borderRadius: 999, border: `2.5px solid ${KDS.teal}`,
          opacity: 1 - ripple, transform: `scale(${1 + ripple * 0.32})` }} />
      )}
    </div>
  );
}

// Financial Joy mark — the thumbs up / thumbs down pair from the app
function FinancialJoyIcon({ size = 42 }) {
  const thumb = 'M9 21V10.5H6.8A1.8 1.8 0 0 0 5 12.3v6.9A1.8 1.8 0 0 0 6.8 21H9z M10.5 10.4l3.1-6.6c.5-1.05 2.05-.8 2.3.3l.9 3.4h3.4c1.4 0 2.4 1.3 2.05 2.6l-2.05 7.4c-.3 1-1.2 1.7-2.2 1.7H10.5z';
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="24" fill={KDS.white} />
      <circle cx="19" cy="20" r="11.5" fill="#34c759" />
      <g transform="translate(6.5 7.5) scale(0.79)" fill={KDS.white}><path d={thumb} /></g>
      <circle cx="30" cy="29" r="11.5" fill="#f4566f" stroke={KDS.white} strokeWidth="2" />
      <g transform="translate(41.5 40.5) scale(-0.79)" fill={KDS.white}><path d={thumb} /></g>
    </svg>
  );
}

// Future You mark — the telescope from the app's Adventures list
function FutureYouIcon({ size = 42 }) {
  const dark = '#240446', lilac = '#b49ad0';
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" style={{ display: 'block' }}>
      <path d="M22 31 L16.5 44" stroke={dark} strokeWidth={3.2} strokeLinecap="round" />
      <path d="M22 31 L27.5 44" stroke={dark} strokeWidth={3.2} strokeLinecap="round" />
      <g transform="rotate(-24 24 22)">
        <rect x="4" y="17.5" width="7" height="9.5" rx="1.8" fill={dark} />
        <rect x="10" y="18.5" width="4.5" height="7.5" fill={lilac} />
        <rect x="13.5" y="13.5" width="21" height="17.5" rx="2.4" fill={lilac} />
        <rect x="33.5" y="12" width="5.5" height="20.5" rx="1.8" fill={dark} />
      </g>
    </svg>
  );
}

// Value tile, app-style: photo at native 150px, caption, lime selection ring. sel: 0..1.
function ValueTile({ src, label, sel = 0 }) {
  const on = sel > 0.02;
  const p = clamp(sel, 0, 1);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ width: 150, height: 150, borderRadius: 22,
        transform: `scale(${1 + 0.03 * p})`, willChange: 'transform',
        boxShadow: on ? `0 0 0 ${(4 * p).toFixed(2)}px ${KDS.lime}, 0 6px 18px rgba(36,4,70,0.14)` : 'none' }}>
        <img src={src} alt={label} width={150} height={150} style={{ display: 'block', borderRadius: 22 }} />
      </div>
      <div style={{ marginTop: 8, height: 48, fontSize: 20, lineHeight: 1.2, textAlign: 'center',
        fontWeight: on ? 700 : 500, color: on ? KDS.plum : KDS.body }}>{label}</div>
    </div>
  );
}

const SWIPE_COLOR = { less: '#e05e3c', same: '#5aa9e6', more: KDS.teal };

// The more / the same / less controls under the swipe deck
function SwipeBtn({ kind, pulse = 0 }) {
  const col = SWIPE_COLOR[kind];
  const hot = pulse > 0.5;
  const glyph = kind === 'less'
    ? <line x1="9" y1="16" x2="23" y2="16" />
    : kind === 'same'
      ? <g><line x1="9" y1="12.5" x2="23" y2="12.5" /><line x1="9" y1="19.5" x2="23" y2="19.5" /></g>
      : <g><line x1="16" y1="8" x2="16" y2="24" /><line x1="8" y1="16" x2="24" y2="16" /></g>;
  return (
    <div style={{ width: 62, height: 62, borderRadius: '50%', border: `2.5px solid ${col}`,
      background: hot ? col : KDS.white, transform: `scale(${1 + 0.16 * pulse})`, willChange: 'transform',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: hot ? `0 0 0 ${(9 * pulse).toFixed(1)}px ${col}26` : '0 2px 8px rgba(36,4,70,0.08)' }}>
      <svg width="32" height="32" viewBox="0 0 32 32" stroke={hot ? KDS.white : col}
        strokeWidth="5" strokeLinecap="round" fill="none">{glyph}</svg>
    </div>
  );
}

function ProgressDots({ active = 0, total = 3 }) {
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{ width: i === active ? 30 : 9, height: 9, borderRadius: 5,
          background: i < active ? KDS.teal : i === active ? KDS.plum : KDS.pearl }} />
      ))}
    </div>
  );
}

// ── SCENE 4 — Knomee creates value immediately (gamified experience) ───────────
// 48–70s. A warm, guided card: reflect on Values → Goals → Vision.
function Scene4() {
  const t = useT();
  const S = 44.95;
  const l = t - S;
  const s4op = interpolate([S - 0.1, S + 0.5], [0, 1], Easing.linear)(t);
  const intro = Easing.easeOutCubic(clamp(l / 0.8, 0, 1));
  const cardScale = 0.94 + 0.06 * intro;
  const floatX = Math.sin(l * 0.4) * 6;
  const floatY = Math.cos(l * 0.5) * 7;

  // step: 0 values, 1 goals, 2 vision
  const step = l < 8 ? 0 : l < 14.5 ? 1 : 2;
  const stepEnter = Easing.easeOutCubic(clamp((l - (step === 0 ? 0.8 : step === 1 ? 8.2 : 14.7)) / 0.5, 0, 1));
  const sel = (start) => Easing.easeOutBack(clamp((l - start) / 0.55, 0, 1));

  // Values step mirrors the app's Financial Joy question: overline, prompt, "Choose up to 3."
  const tiles = [
    ['assets/values/choice.png', 'Choice', -1],
    ['assets/values/comfort.png', 'Comfort', 2.0],
    ['assets/values/independence.png', 'Independence', 5.2],
    ['assets/values/moment.png', 'Enjoying the moment', -1],
    ['assets/values/security.png', 'Security', -1],
    ['assets/values/family.png', 'Supporting my family', 3.4],
  ];

  const content = {
    0: { kicker: 'Financial Joy' },
    1: { kicker: 'GOALS' },
  }[step];

  // Goals step: the app's swipe deck — left = less, right = more, down = the same.
  const GOAL_CARDS = [
    { src: 'assets/goals/work.png', label: 'Work and career', at: 9.3, dir: 'less' },
    { src: 'assets/goals/family.png', label: 'Family and relationships', at: 10.9, dir: 'more' },
    { src: 'assets/goals/travel.png', label: 'Travel and adventure', at: 12.5, dir: 'same' },
    { src: 'assets/goals/health.png', label: 'Health and wellness', at: -1, dir: null },
  ];
  const swipeP = GOAL_CARDS.map((c) => (c.at < 0 ? 0 : clamp((l - c.at) / 0.6, 0, 1)));
  const swiped = swipeP.filter((p) => p > 0.25).length;
  const btnPulse = (kind) => GOAL_CARDS.reduce((m, c) => (c.dir === kind && c.at > 0
    ? Math.max(m, 1 - clamp(Math.abs(l - c.at) / 0.3, 0, 1)) : m), 0);

  // Vision typewriter
  const visionIntro = 'Dear Me,';
  const visionFull = 'You took the month in Italy. The business is in Sofia’s hands and it still feels like ours. You gave the shelter what you always meant to. You stopped waiting.';
  const vShown = visionFull.slice(0, Math.floor(clamp((l - 13.79) / 4.6, 0, 1) * visionFull.length));
  const caret = Math.floor(l * 2) % 2 === 0;
  const sigIn = Easing.easeOutCubic(clamp((l - 18.69) / 0.6, 0, 1));

  return (
    <div style={{ position: 'absolute', inset: 0, opacity: s4op, background: KDS.plum }}>
      {/* plum "door" brand field */}
      <div style={{ position: 'absolute', inset: 0,
        background: 'radial-gradient(1050px 720px at 50% 20%, #5a2d8a 0%, #34106a 46%, #240446 100%)' }} />
      <div style={{ position: 'absolute', left: '18%', top: '14%', width: 520, height: 520, borderRadius: '50%',
        filter: 'blur(110px)', background: 'radial-gradient(circle, rgba(61,189,170,0.20), rgba(61,189,170,0))' }} />
      {/* app card */}
      <div style={{ position: 'absolute', left: '50%', top: '50%',
        transform: `translate(-50%,-50%) translate(${floatX}px, ${-40 + floatY}px) scale(${cardScale})`, opacity: intro, willChange: 'transform, opacity' }}>
        <div style={{ width: 720, height: 720, background: '#F8FAFA', borderRadius: 28,
          boxShadow: '0 40px 110px rgba(12,4,30,0.5), 0 8px 30px rgba(12,4,30,0.3)', padding: 44, boxSizing: 'border-box',
          display: 'flex', flexDirection: 'column', fontFamily: DISPLAY, position: 'relative', overflow: 'hidden' }}>
          {/* grape accent bar */}
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 6, background: KDS.grapeBar }} />
          {/* header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            {step < 2 ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <FinancialJoyIcon size={42} />
                <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: '-0.4px', color: KDS.plum }}>Financial Joy</div>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <FutureYouIcon size={42} />
                <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: '-0.4px', color: KDS.plum }}>Future You</div>
              </div>
            )}
            <ProgressDots active={step} total={3} />
          </div>
          {/* prompt + body swap by step */}
          <div style={{ marginTop: step === 0 ? 34 : 24, opacity: stepEnter, transform: `translateY(${(1 - stepEnter) * 14}px)`, flex: 1 }}>
            {step === 0 ? (
              <div>
                <div style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.3px', color: KDS.plum }}>
                  Money is a tool!
                </div>
                <div style={{ fontSize: 28, fontWeight: 400, lineHeight: 1.2, letterSpacing: '-0.3px', color: KDS.plum, marginTop: 2 }}>
                  I want money to help me with…
                </div>
                <div style={{ fontSize: 20, fontStyle: 'italic', color: KDS.slate, marginTop: 5 }}>Choose up to 3.</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 150px)', justifyContent: 'center',
                  gap: '14px 26px', marginTop: 20 }}>
                  {tiles.map(([src, label, at]) => (
                    <ValueTile key={label} src={src} label={label} sel={at < 0 ? 0 : sel(at)} />
                  ))}
                </div>
              </div>
            ) : step === 1 ? (
              <div>
                <div style={{ fontSize: 20, fontWeight: 500, color: KDS.slate }}>{Math.min(swiped + 1, 7)} / 7</div>
                <div style={{ fontSize: 26, fontWeight: 400, lineHeight: 1.25, letterSpacing: '-0.2px', color: KDS.plum, marginTop: 4 }}>
                  Would you like to direct <span style={{ color: SWIPE_COLOR.more, fontWeight: 600 }}>more</span>,{' '}
                  <span style={{ color: SWIPE_COLOR.same, fontWeight: 600 }}>the same</span>, or{' '}
                  <span style={{ color: SWIPE_COLOR.less, fontWeight: 600 }}>less</span> of your attention to…
                </div>
                <div style={{ position: 'relative', height: 373, marginTop: 10 }}>
                  {GOAL_CARDS.map((c, i) => {
                    const p = swipeP[i];
                    if (p >= 1) return null;
                    const d = p > 0 ? 0 : i - swiped;
                    if (d > 2) return null;
                    const e = Easing.easeOutCubic(p);
                    const tx = c.dir === 'less' ? -880 * e : c.dir === 'more' ? 880 * e : 0;
                    const ty = c.dir === 'same' ? 700 * e : d * 11;
                    const rot = c.dir === 'same' ? 4 * e : (c.dir === 'less' ? -20 : 20) * e;
                    const sc = 1 - 0.045 * d;
                    return (
                      <div key={c.src} style={{ position: 'absolute', left: '50%', top: 0, zIndex: 10 - i,
                        transform: `translateX(-50%) translate(${tx}px, ${ty}px) rotate(${rot}deg) scale(${sc})`,
                        opacity: 1 - clamp((p - 0.55) / 0.45, 0, 1), willChange: 'transform, opacity' }}>
                        <img src={c.src} alt={c.label} width={308} height={373}
                          style={{ display: 'block', filter: 'drop-shadow(0 12px 22px rgba(36,4,70,0.18))' }} />
                      </div>
                    );
                  })}
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 44, marginTop: 16 }}>
                  <SwipeBtn kind="less" pulse={btnPulse('less')} />
                  <SwipeBtn kind="same" pulse={btnPulse('same')} />
                  <SwipeBtn kind="more" pulse={btnPulse('more')} />
                </div>
              </div>
            ) : (
              <div>
                <div style={{ fontSize: 26, fontWeight: 400, lineHeight: 1.3, letterSpacing: '-0.2px', color: KDS.plum }}>
                  Now step into the shoes of Future You. Write a postcard to yourself right now from Future You.
                </div>
                <div style={{ fontSize: 22, fontStyle: 'italic', lineHeight: 1.4, color: KDS.slate, marginTop: 10 }}>
                  Consider: location, people, activities, hobbies and interests, feelings, age…
                </div>
                {/* airmail frame */}
                <div style={{ marginTop: 22, padding: 18, borderRadius: 6,
                  background: 'repeating-linear-gradient(45deg, #e8412c 0 44px, #ffffff 44px 62px, #2f6fe0 62px 106px, #ffffff 106px 124px)' }}>
                  <div style={{ background: KDS.white, border: `1px solid ${KDS.stone}`, borderRadius: 10, padding: '30px 34px' }}>
                    <div style={{ fontSize: 26, lineHeight: 1.55, color: KDS.plum }}>{visionIntro}</div>
                    <div style={{ fontSize: 26, lineHeight: 1.55, color: KDS.plum, marginTop: 16, minHeight: 124 }}>
                      {vShown}<span style={{ opacity: caret ? 1 : 0, color: KDS.grape, fontWeight: 700 }}>|</span>
                    </div>
                    <div style={{ fontSize: 26, lineHeight: 1.55, color: KDS.plum, marginTop: 16, opacity: sigIn }}>
                      With love and pride,
                      <div>Future You</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}

// Knomee Quotient radial gauge
function QuotientRing({ value = 0, size = 250 }) {
  const r = size / 2 - 17;
  const c = 2 * Math.PI * r;
  const off = c * (1 - clamp(value, 0, 100) / 100);
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <defs>
        <linearGradient id="knomee-qg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#240446" /><stop offset="1" stopColor="#3dbdaa" />
        </linearGradient>
      </defs>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#efe9f8" strokeWidth={15} />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="url(#knomee-qg)" strokeWidth={15}
        strokeLinecap="round" strokeDasharray={c} strokeDashoffset={off}
        transform={`rotate(-90 ${size / 2} ${size / 2})`} style={{ filter: 'drop-shadow(0 4px 14px rgba(61,189,170,0.35))' }} />
    </svg>
  );
}

// One prospect row in the advisor dashboard
const PROSPECTS = [
  { name: 'Elena R.', q: 82, status: 'Ready to take action', tone: 'ready', drivers: ['Legacy', 'Family'] },
  { name: 'Marcus T.', q: 63, status: 'Needs clarity', tone: 'clarity', drivers: ['Security'] },
  { name: 'Priya N.', q: 45, status: 'Exploring', tone: 'explore', drivers: ['Growth'] },
];
function toneStyle(tone) {
  if (tone === 'ready') return { bg: 'rgba(45,210,176,0.16)', fg: '#0e9b7c', bar: 'linear-gradient(90deg,#7C3AED,#2DD2B0)' };
  if (tone === 'clarity') return { bg: 'rgba(124,58,237,0.14)', fg: '#7C3AED', bar: 'linear-gradient(90deg,#7C3AED,#a06bf0)' };
  return { bg: 'rgba(120,102,150,0.14)', fg: '#8a7ba6', bar: 'linear-gradient(90deg,#b9a9d9,#cdbfe6)' };
}

// Founder interview footage — ONE source file, three trims. The clip is driven off the
// timeline clock rather than its own playback, so scrubbing, pausing and replaying all
// land on the right frame and the picture cannot drift from the voice.
const MARLA_SRC = 'assets/marla-founder.mp4';
function MarlaVideo({ clipStart = 0, clipEnd = 0, l = 0, w = 620, h = 392 }) {
  const ref = React.useRef(null);
  const { playing } = useTimeline();
  const target = clamp(clipStart + Math.max(l, 0), clipStart, clipEnd);
  const targetRef = React.useRef(target);
  targetRef.current = target;
  // Land the trim as soon as the media is seekable. While the timeline is paused no further
  // render happens, so a seek skipped for "not ready yet" would never be retried and the shot
  // would sit on frame 0 — these listeners apply the position independently of React.
  // ...once, and then stop listening. canplay does not fire only at load: it
  // fires again every time the element recovers from starving for data. Left
  // attached, it seeks on each one, and a seek discards the buffer, so the clip
  // starves again immediately and fires canplay again. The loop sustains itself:
  // readyState never climbs back past 1, the audio stream never runs long enough
  // to be heard, and the picture updates only in fits. Measured in a browser
  // during the shot it decoded roughly fifteen times more frames than playing
  // once needs, with readyState pinned at 1 and no error of any kind.
  React.useEffect(() => {
    const v = ref.current;
    if (!v) return;
    let landed = false;
    const apply = () => {
      if (landed || v.readyState < 1) return;
      landed = true;
      try { v.currentTime = targetRef.current; } catch (e) {}
      v.removeEventListener('loadedmetadata', apply);
      v.removeEventListener('canplay', apply);
    };
    v.addEventListener('loadedmetadata', apply);
    v.addEventListener('canplay', apply);
    apply();
    return () => { v.removeEventListener('loadedmetadata', apply); v.removeEventListener('canplay', apply); };
  }, []);
  // Whether the shot should be running, kept as a boolean so the effect below
  // fires only when it actually flips. The timeline re-renders every frame, so
  // the unguarded version called play() on every one of them — measured at 148
  // calls in five seconds of this scene, against none once settled. Each returns
  // a fresh promise on an element that is already playing, while the drift
  // correction seeks the same element underneath, and the two together keep the
  // decode pipeline from ever settling.
  const shouldPlay = playing && l >= 0 && target < clipEnd - 0.05;
  // ?debug=1 in the url draws what this element is actually doing over the shot.
  // Reports only — it changes nothing about playback, and is off otherwise.
  const DEBUG = typeof location !== 'undefined' && /[?&]debug=1/.test(location.search);
  const [diag, setDiag] = React.useState({});
  React.useEffect(() => {
    if (!DEBUG) return;
    const id = setInterval(() => {
      const v = ref.current;
      if (!v) return;
      setDiag((d) => ({ ...d,
        paused: v.paused, muted: v.muted, volume: v.volume,
        readyState: v.readyState, networkState: v.networkState,
        clipTime: +v.currentTime.toFixed(2), dims: v.videoWidth + 'x' + v.videoHeight,
        mediaError: v.error ? (v.error.code + ': ' + v.error.message) : 'none',
        frames: v.getVideoPlaybackQuality
          ? (() => { const q = v.getVideoPlaybackQuality();
              return q.totalVideoFrames + ' decoded, ' + q.droppedVideoFrames + ' dropped'; })()
          : 'n/a',
      }));
    }, 400);
    return () => clearInterval(id);
  }, [DEBUG]);

  // Autoplay policy rejects play() on an audible element until the page has been
  // interacted with, and the film starts itself. A single attempt when the shot
  // begins is therefore free to fail silently and never be retried, which leaves
  // the clip paused for good: no sound, and a picture that only moves when the
  // drift correction drags it — indistinguishable from a broken frame rate.
  //
  // The soundtrack survives this because it resumes its AudioContext on the first
  // pointer or key event. This element needs the same, plus a slow watchdog for
  // the case where playback is refused or stalls for any other reason. Half a
  // second is far too coarse to be the per-frame churn removed earlier, and the
  // call is skipped entirely unless the element is actually paused.
  React.useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (!shouldPlay) { v.pause(); return; }
    let dead = false;
    const attempt = () => {
      if (dead || !v.paused) return;
      v.volume = 1;
      const r = v.play();
      if (r && r.catch) r.catch((e) => setDiag((d) => ({ ...d,
        playError: ((e && e.name) || 'Error') + ': ' + ((e && e.message) || String(e)) })));
    };
    attempt();
    const id = setInterval(attempt, 500);
    window.addEventListener('pointerdown', attempt);
    window.addEventListener('keydown', attempt);
    return () => {
      dead = true;
      clearInterval(id);
      window.removeEventListener('pointerdown', attempt);
      window.removeEventListener('keydown', attempt);
    };
  }, [shouldPlay]);
  // Drift correction, but never while the shot is running.
  //
  // The clip draws on a slow path: a <video> inside the transformed svg
  // foreignObject the whole film renders into, which browsers will not
  // hardware-composite. So it falls behind the timeline, the old 0.34s threshold
  // tripped, the seek flushed the decode pipeline, and that cost it more time
  // than it was behind — tripping the threshold again. The loop feeds itself and
  // shows up as a picture that stutters rather than plays.
  //
  // While the shot runs, the clip is left alone at its own rate. Each is a single
  // continuous take of at most 22s and its own audio carries the moment, so small
  // drift against the timeline is not worth chasing. Seeks still apply when the
  // timeline is parked or genuinely jumped, which is what scrubbing needs.
  React.useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const drift = Math.abs(v.currentTime - target);
    if (drift < 0.05) return;
    if (!shouldPlay || drift > 1.5) { try { v.currentTime = target; } catch (e) {} }
  }, [target, shouldPlay]);
  const el = (
    <video ref={ref} src={MARLA_SRC} playsInline preload="auto"
      style={{ width: w, height: h, objectFit: 'cover', display: 'block', background: '#1b0a2e' }} />
  );
  if (!DEBUG) return el;
  const rows = [
    ['paused', String(diag.paused)],
    ['muted / volume', diag.muted + ' / ' + diag.volume],
    ['readyState', diag.readyState + '  (4 = can play through)'],
    ['networkState', String(diag.networkState)],
    ['video dims', String(diag.dims)],
    ['clip time', diag.clipTime + '   target ' + target.toFixed(2)],
    ['frames', String(diag.frames)],
    ['media error', String(diag.mediaError)],
    ['play() error', String(diag.playError || 'none')],
  ];
  return (
    <React.Fragment>
      {el}
      <div style={{ position: 'absolute', left: 0, top: 0, right: 0, background: 'rgba(0,0,0,0.88)',
        color: '#9ff0e0', font: '12px/1.55 ui-monospace, SFMono-Regular, monospace', padding: '10px 12px', zIndex: 5 }}>
        {rows.map(([k, v]) => (
          <div key={k} style={{ display: 'flex', gap: 10 }}>
            <span style={{ opacity: 0.6, width: 116, flexShrink: 0 }}>{k}</span>
            <span style={{ color: '#fff' }}>{v}</span>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
}

// The framed shot — footage plus name card — rendered on the stage overlay
// instead of inside the svg. A <video> in an <svg><foreignObject> is not
// hardware-composited, so it stutters and its audio is unreliable; the same
// element on the normal path is not. A placeholder of identical size stays in
// the flex row so the quote column still lays out against it, and its measured
// position is where the portalled copy is drawn, in stage coordinates.
function MarlaFrame({ l = 0, clipStart = 0, clipEnd = 0, w = 620, h = 392, intro = 1 }) {
  const overlay = (typeof useStageOverlay === 'function') ? useStageOverlay() : null;
  const slotRef = React.useRef(null);
  const [box, setBox] = React.useState(null);

  // Portalling the clip out of the svg also took it out of reach of every
  // opacity its scene sets on the way down — the entry fade each shot uses, and
  // the fade that hands the closing shot to the end card. Left alone the clip
  // never disappears and sits on top of the logo.
  //
  // The placeholder is still inside that subtree, so the product of the inline
  // opacities above it is exactly what the clip should be wearing. Walking a
  // handful of nodes per frame is cheaper than threading a fade prop through
  // every scene, and it picks up any wrapper added later without being told.
  const [inherited, setInherited] = React.useState(1);
  React.useLayoutEffect(() => {
    const slot = slotRef.current;
    if (!slot) return;
    let o = 1;
    for (let el = slot; el && el !== document.body; el = el.parentElement) {
      const v = el.style && el.style.opacity;
      if (v !== '' && v != null) {
        const f = parseFloat(v);
        if (!isNaN(f)) o *= f;
      }
    }
    setInherited((prev) => (Math.abs(prev - o) > 0.004 ? o : prev));
  });

  React.useLayoutEffect(() => {
    const canvas = overlay && overlay.canvasRef && overlay.canvasRef.current;
    const slot = slotRef.current;
    if (!overlay || !overlay.el || !canvas || !slot) return;
    const measure = () => {
      const c = canvas.getBoundingClientRect();
      const s = slot.getBoundingClientRect();
      const scale = c.width / (overlay.width || 1280);
      if (!scale) return;
      setBox({ x: (s.left - c.left) / scale, y: (s.top - c.top) / scale });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(canvas);
    ro.observe(slot);
    window.addEventListener('resize', measure);
    return () => { ro.disconnect(); window.removeEventListener('resize', measure); };
  }, [overlay]);

  const shot = (
    <React.Fragment>
      <div style={{ borderRadius: 26, overflow: 'hidden', boxShadow: '0 44px 120px rgba(12,4,30,0.6)',
        border: '1px solid rgba(255,255,255,0.10)' }}>
        <MarlaVideo l={l} clipStart={clipStart} clipEnd={clipEnd} w={w} h={h} />
      </div>
      <div style={{ position: 'absolute', left: 24, bottom: 24, background: 'rgba(16,3,34,0.74)',
        backdropFilter: 'blur(6px)', borderRadius: 14, padding: '13px 20px', borderLeft: '4px solid #2DD2B0' }}>
        <div style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 25, color: '#fff', letterSpacing: '-0.01em' }}>Marla</div>
        <div style={{ fontFamily: DISPLAY, fontSize: 16, color: '#2DD2B0', fontWeight: 600 }}>Founder &amp; CEO, Knomee</div>
      </div>
    </React.Fragment>
  );

  // Until the overlay is measured — and if this ever renders without a Stage
  // around it — fall back to drawing in place rather than not at all.
  const portalReady = overlay && overlay.el && box && typeof ReactDOM !== 'undefined' && ReactDOM.createPortal;

  return (
    <React.Fragment>
      <div ref={slotRef} style={{ width: w, height: h, position: 'relative' }}>
        {portalReady ? null : shot}
      </div>
      {portalReady ? ReactDOM.createPortal(
        <div style={{ position: 'absolute', left: box.x, top: box.y, width: w, height: h,
          opacity: intro * inherited, transform: `translateY(${(1 - intro) * 22}px)`,
          willChange: 'transform, opacity', display: intro * inherited < 0.005 ? 'none' : 'block' }}>
          {shot}
        </div>, overlay.el) : null}
    </React.Fragment>
  );
}

// Reusable founder-interview shot (scenes 7, 10, 13). Warm bg, footage + rising quote.
function MarlaShot({ l = 0, quoteLines = [], quoteStart = 1.0, clipStart = 0, clipEnd = 0 }) {
  const intro = Easing.easeOutCubic(clamp(l / 0.7, 0, 1));
  return (
    <React.Fragment>
      <WarmField l={l} />
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 1240, display: 'flex', gap: 52, alignItems: 'center' }}>
          <div style={{ width: 620, flexShrink: 0 }}>
            <MarlaFrame l={l} clipStart={clipStart} clipEnd={clipEnd} w={620} h={392} intro={intro} />
          </div>
          <div style={{ flex: 1, opacity: intro, transform: `translateY(${(1 - intro) * 22}px)`,
            willChange: 'transform, opacity' }}>
            <div style={{ fontFamily: DISPLAY, fontSize: 40, lineHeight: 1.34, color: '#fff', fontWeight: 500, letterSpacing: '-0.01em',
              position: 'relative', paddingLeft: 46 }}>
              <span style={{ position: 'absolute', left: 0, top: 3, color: '#2DD2B0', fontSize: 64, fontWeight: 800,
                lineHeight: 1 }}>&ldquo;</span>
              {quoteLines.map((ln, i) => {
                const p = Easing.easeOutCubic(clamp((l - (quoteStart + i * 1.0)) / 0.7, 0, 1));
                return <span key={i} style={{ opacity: p }}>{ln} </span>;
              })}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

// ── SCENE 6 — signals advisors can act on ─────────────────────────────────────
// 70–90s. Prospect Readiness (KQ + breakdown, tier) crossfades to Prospect
// Playbook (top action, conversation starters, communication guidance).
const KQ_BREAKDOWN = [
  { k: 'Intent', q: 'Are they actively working toward a goal?', v: 83, note: 'Actively pursuing a meaningful goal' },
  { k: 'Clarity', q: 'Can they articulate what they want?', v: 62, note: 'Vision present, not fully formed' },
  { k: 'Receptivity', q: 'Are they open to guidance?', v: 100, note: 'Explicitly open, support-seeking' },
];
const TAG_STYLE = {
  'Positive Talk': { bg: '#fdf1d4', fg: '#8a6210' },
  'Demonstrate Curiosity': { bg: '#e2f6e9', fg: '#1f7a45' },
  'Acknowledge and Validate': { bg: '#fde6eb', fg: '#b0234a' },
  'Self-Reinforcement': { bg: '#e5eeff', fg: '#2a5cad' },
};
const STARTERS = [
  { q: '\u201CYou mentioned wanting to leave a lasting legacy for your child. I\u2019d love to hear more about what that means to you.\u201D',
    why: 'Get Sarah talking positively about her future and what\u2019s possible.', tags: ['Positive Talk'] },
  { q: '\u201CYou said you feel guilty enjoying things you\u2019ve earned. What if we built a plan that gave you full permission to enjoy life?\u201D',
    why: 'Curiosity is a predictor of likeability.', tags: ['Demonstrate Curiosity', 'Acknowledge and Validate'] },
];
const WORDS_USE = ['Security', 'Independence', 'Simplicity', 'Confidence', 'Enjoy', 'Future', 'Health', 'Family'];

function Tag({ label }) {
  const st = TAG_STYLE[label] || { bg: '#f0edf6', fg: '#5b4d78' };
  return (
    <div style={{ fontSize: 15, fontWeight: 600, color: st.fg, background: st.bg,
      padding: '5px 13px', borderRadius: 999, whiteSpace: 'nowrap' }}>{label}</div>
  );
}

function KQRing({ value = 81, p = 1, size = 196 }) {
  const r = size / 2 - 14;
  const c = 2 * Math.PI * r;
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <defs>
          <linearGradient id="kq-violet" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#7C3AED" /><stop offset="1" stopColor="#c084fc" />
          </linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e9e7ee" strokeWidth={17} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="url(#kq-violet)" strokeWidth={17}
          strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - (value / 100) * p)}
          transform={`rotate(-90 ${size / 2} ${size / 2})`} />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 62, fontWeight: 800, letterSpacing: '-0.03em', color: '#1a1f36' }}>{Math.round(value * p)}</div>
    </div>
  );
}

function Scene6() {
  const t = useT();
  const S = 65.26;
  const l = t - S;
  const op = interpolate([S - 0.1, S + 0.5], [0, 1], Easing.linear)(t);
  const intro = Easing.easeOutCubic(clamp(l / 0.8, 0, 1));
  const scale = 0.94 + 0.06 * intro;

  // shot A = readiness (0–7.6s), shot B = playbook
  const swap = Easing.easeInOutCubic(clamp((l - 7.6) / 0.6, 0, 1));
  const ringP = Easing.easeOutCubic(clamp((l - 4.1) / 1.2, 0, 1));
  const brk = (i) => Easing.easeOutCubic(clamp((l - (4.7 + i * 0.4)) / 0.5, 0, 1));
  const tierP = Easing.easeOutCubic(clamp((l - 6.2) / 0.5, 0, 1));
  const topP = Easing.easeOutCubic(clamp((l - 8.3) / 0.5, 0, 1));
  const stP = (i) => Easing.easeOutCubic(clamp((l - (9.0 + i * 0.9)) / 0.6, 0, 1));
  const tagP = Easing.easeOutCubic(clamp((l - 11.8) / 0.6, 0, 1));
  const wordsP = Easing.easeOutCubic(clamp((l - 12.8) / 0.6, 0, 1));
  const takeP = Easing.easeOutCubic(clamp((l - 14.6) / 0.7, 0, 1));

  const TABS = ['Prospect Readiness', 'Prospect Playbook'];

  return (
    <div style={{ position: 'absolute', inset: 0, opacity: op }}>
      <WarmField l={l} />
      <div style={{ position: 'absolute', left: '50%', top: '50%',
        transform: `translate(-50%,-50%) translateY(-28px) scale(${scale})`, opacity: intro, willChange: 'transform, opacity' }}>
        <div style={{ width: 1260, background: '#fff', borderRadius: 30, padding: 40, boxSizing: 'border-box',
          boxShadow: '0 50px 130px rgba(12,4,30,0.55)', fontFamily: DISPLAY }}>
          {/* prospect header + tabs */}
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 26 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 58, height: 58, borderRadius: '50%', background: '#ededed',
                color: '#8a8a8a', fontWeight: 600, fontSize: 26, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>S</div>
              <div>
                <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em', color: KDS.plum }}>Sarah Mitchell</div>
                <div style={{ fontSize: 16, color: '#9a8bbd' }}>New prospect</div>
              </div>
            </div>
            <div>
              <div style={{ display: 'flex' }}>
                {TABS.map((x, i) => (
                  <div key={x} style={{ width: 250, textAlign: 'center', fontSize: 20, paddingBottom: 12,
                    fontWeight: (i === 0 ? 1 - swap : swap) > 0.5 ? 700 : 500,
                    color: (i === 0 ? 1 - swap : swap) > 0.5 ? KDS.plum : '#9a8bbd' }}>{x}</div>
                ))}
              </div>
              <div style={{ height: 3, background: '#efecf5', position: 'relative' }}>
                <div style={{ position: 'absolute', left: 0, top: 0, width: 250, height: 3, background: KDS.plum,
                  transform: `translateX(${swap * 250}px)`, willChange: 'transform' }} />
              </div>
            </div>
          </div>

          <div style={{ position: 'relative', height: 470 }}>
            {/* ── shot A — prospect readiness ── */}
            <div style={{ position: 'absolute', inset: 0, opacity: 1 - swap,
              transform: `translateY(${swap * -18}px)`, pointerEvents: 'none', willChange: 'transform, opacity' }}>
              <div style={{ display: 'flex', gap: 22 }}>
                <div style={{ width: 330, flexShrink: 0, height: 352, boxSizing: 'border-box', background: '#fff',
                  border: '1.5px solid #ece9f2', borderRadius: 20, padding: '24px 20px', textAlign: 'center' }}>
                  <div style={{ fontSize: 22, fontWeight: 700, color: '#7C3AED' }}>Knomee Quotient (KQ)</div>
                  <div style={{ fontSize: 16, fontStyle: 'italic', color: '#8a8a9a', marginTop: 4 }}>How ready is this prospect to convert?</div>
                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: 22 }}>
                    <KQRing value={81} p={ringP} />
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 19, fontWeight: 600, color: '#4a4a58', marginBottom: 12 }}>KQ Breakdown:</div>
                  <div style={{ display: 'flex', gap: 18 }}>
                    {KQ_BREAKDOWN.map((m, i) => {
                      const p = brk(i);
                      return (
                        <div key={m.k} style={{ flex: 1, height: 308, boxSizing: 'border-box', background: '#fff',
                          border: '1.5px solid #ece9f2', borderRadius: 18, padding: '20px 16px', textAlign: 'center',
                          opacity: p, transform: `translateY(${(1 - p) * 18}px)`, willChange: 'transform, opacity',
                          display: 'flex', flexDirection: 'column' }}>
                          <div style={{ fontSize: 22, fontWeight: 700, color: '#7C3AED' }}>{m.k}</div>
                          <div style={{ fontSize: 15, fontStyle: 'italic', color: '#8a8a9a', marginTop: 4, lineHeight: 1.3 }}>{m.q}</div>
                          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: 64, fontWeight: 800, letterSpacing: '-0.03em', color: '#1a1f36' }}>{Math.round(m.v * p)}</div>
                          <div style={{ fontSize: 17, color: '#4a4a58', lineHeight: 1.3 }}>{m.note}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div style={{ marginTop: 20, background: '#e9f7ee', borderRadius: 14, padding: '18px 24px',
                opacity: tierP, transform: `translateY(${(1 - tierP) * 14}px)`, willChange: 'transform, opacity' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 18, height: 18, borderRadius: 5, background: KDS.ocean }} />
                  <div style={{ fontSize: 19, fontWeight: 700, letterSpacing: '0.08em', color: '#1a1f36' }}>TIER 1 – READY NOW</div>
                </div>
                <div style={{ fontSize: 19, color: '#2f3b34', marginTop: 8 }}>High-readiness prospect — actively seeking guidance and ready to engage.</div>
              </div>
            </div>

            {/* ── shot B — prospect playbook ── */}
            <div style={{ position: 'absolute', inset: 0, opacity: swap,
              transform: `translateY(${(1 - swap) * 18}px)`, pointerEvents: 'none', willChange: 'transform, opacity' }}>
              <div style={{ background: '#f7f0ff', borderRadius: 14, padding: '16px 22px', display: 'flex',
                alignItems: 'center', gap: 14, opacity: topP, transform: `translateY(${(1 - topP) * 12}px)` }}>
                <div style={{ fontSize: 19, fontWeight: 700, color: KDS.plum, whiteSpace: 'nowrap' }}>Top Action</div>
                <div style={{ fontSize: 19, color: '#2b1f47' }}>“Worked since 13, ready for adventures”; lead with Future You vision.</div>
              </div>
              <div style={{ display: 'flex', gap: 22, marginTop: 18 }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: '0.16em', color: '#a08fc4' }}>CONVERSATION STARTERS</div>
                  {STARTERS.map((c, i) => {
                    const p = stP(i);
                    return (
                      <div key={i} style={{ opacity: p, transform: `translateX(${(1 - p) * 22}px)`, willChange: 'transform, opacity',
                        background: '#fff', border: '1.5px solid #eee6f8', borderRadius: 16, padding: '18px 22px',
                        boxShadow: '0 2px 12px rgba(36,4,70,0.04)' }}>
                        <div style={{ fontSize: 20, fontStyle: 'italic', lineHeight: 1.4, color: '#2b1f47' }}>{c.q}</div>
                        <div style={{ fontSize: 16, color: '#8a8a9a', marginTop: 6 }}>{c.why}</div>
                        <div style={{ display: 'flex', gap: 8, marginTop: 10, opacity: 0.35 + 0.65 * tagP }}>
                          {c.tags.map((tg) => <Tag key={tg} label={tg} />)}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div style={{ width: 300, flexShrink: 0 }}>
                  <div style={{ opacity: wordsP, transform: `translateY(${(1 - wordsP) * 14}px)`, willChange: 'transform, opacity' }}>
                    <div style={{ fontSize: 19, fontWeight: 700, color: '#2b1f47', marginBottom: 12 }}>Words to Use</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {WORDS_USE.map((w) => (
                        <div key={w} style={{ fontSize: 16, fontWeight: 500, color: '#7C3AED', background: '#f5edfe',
                          border: '1px solid #ecdefb', padding: '7px 14px', borderRadius: 999 }}>{w}</div>
                      ))}
                    </div>
                  </div>
                  <div style={{ marginTop: 20, background: '#faf7ff', border: '1.5px solid #f0e8fc', borderRadius: 16,
                    padding: '16px 18px', opacity: takeP, transform: `translateY(${(1 - takeP) * 14}px)`, willChange: 'transform, opacity' }}>
                    <div style={{ fontSize: 17, fontWeight: 700, color: '#2b1f47' }}>Advisor takeaway</div>
                    <div style={{ fontSize: 17, color: '#4a4a58', lineHeight: 1.4, marginTop: 6 }}>
                      A direct, purposeful communication style will likely resonate with her.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── SCENE 7 — founder POV (Marla) ─────────────────────────────────────────────
// 90–108.3s.
function Scene7() {
  const t = useT();
  const S = 85.27;
  const l = t - S;
  const op = interpolate([S - 0.1, S + 0.5], [0, 1], Easing.linear)(t);
  return (
    <div style={{ position: 'absolute', inset: 0, opacity: op }}>
      <MarlaShot l={l} quoteStart={0.8} clipStart={0} clipEnd={22.45} quoteLines={[
        'Wealth managers want to improve their clients\u2019 lives.',
        'When prospects start with Knomee, advisors understand what matters, where they are, and how to help them move forward.',
        'That clarity changes everything.',
      ]} />
    </div>
  );
}

// ── SCENE 8 — meeting prep ────────────────────────────────────────────────────
// 108.3–122s. Context, emotional insight, a clear path in.
function Scene8() {
  const t = useT();
  const S = 107.75;
  const l = t - S;
  const op = interpolate([S - 0.1, S + 0.5], [0, 1], Easing.linear)(t);
  const intro = Easing.easeOutCubic(clamp(l / 0.8, 0, 1));
  const scale = 0.94 + 0.06 * intro;
  const cards = [
    { k: 'CONTEXT', icon: '#7C3AED', text: 'Retiring at 55 is her north star. Primary goal has a sub-12-month timeline.' },
    { k: 'EMOTIONAL INSIGHT', icon: '#2DD2B0', text: 'Feels guilty enjoying what she has earned — and it stalls decisions.' },
    { k: 'A CLEAR PATH IN', icon: '#a06bf0', text: '“What would working less in the next five years actually look like for you?”' },
  ];
  const CARD_AT = [4.35, 5.64, 7.26];
  const cP = (i) => Easing.easeOutCubic(clamp((l - CARD_AT[i]) / 0.6, 0, 1));
  return (
    <div style={{ position: 'absolute', inset: 0, opacity: op }}>
      <WarmField l={l} />
      <div style={{ position: 'absolute', left: '50%', top: '50%',
        transform: `translate(-50%,-50%) translateY(-34px) scale(${scale})`, opacity: intro, willChange: 'transform, opacity' }}>
        <div style={{ width: 1120, background: '#fff', borderRadius: 30, padding: 40, boxSizing: 'border-box',
          boxShadow: '0 50px 130px rgba(12,4,30,0.55)', fontFamily: DISPLAY }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 30 }}>
            <KnomeeIcon color="#2DD2B0" size={40} />
            <div>
              <div style={{ fontSize: 15, color: '#9a8bbd', fontWeight: 600, letterSpacing: '0.02em' }}>Preparing for the first meeting</div>
              <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.02em', color: '#1b1230' }}>Sarah Mitchell</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 20 }}>
            {cards.map((c, i) => {
              const p = cP(i);
              return (
                <div key={i} style={{ flex: 1, opacity: p, transform: `translateY(${(1 - p) * 26}px)`,
                  background: '#fff', border: '1.5px solid #eee6f8', borderRadius: 16, padding: '22px 24px',
                  boxShadow: '0 2px 12px rgba(36,4,70,0.04)', willChange: 'transform, opacity' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                    <KnomeeIcon color={c.icon} size={22} />
                    <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: '0.14em', color: '#a08fc4' }}>{c.k}</div>
                  </div>
                  <div style={{ fontSize: 24, fontWeight: 500, lineHeight: 1.4, color: '#2b1f47' }}>{c.text}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── SCENE 9 — show up different ────────────────────────────────────────────────
// 122–131s. Default portfolio recedes; prepared / relevant / different stamp in.
function Scene9() {
  const t = useT();
  const S = 118.3;
  const l = t - S;
  const op = interpolate([S - 0.1, S + 0.5], [0, 1], Easing.linear)(t);
  // cold portfolio card recedes
  const recede = Easing.easeInOutCubic(clamp((l - 2.39) / 1.0, 0, 1));
  const words = [
    { w: 'Prepared.', at: 4.0, c: '#fff' },
    { w: 'Relevant.', at: 4.75, c: '#2DD2B0' },
    { w: 'Different.', at: 5.45, c: '#a06bf0' },
  ];
  return (
    <div style={{ position: 'absolute', inset: 0, opacity: op }}>
      <WarmField l={l} />
      {/* the generic portfolio, defaulted to — dims + slides away */}
      <div style={{ position: 'absolute', left: '50%', top: '50%',
        transform: `translate(-50%,-50%) translate(${-360 - recede * 260}px, -20px)`,
        opacity: (1 - recede) * 0.9, filter: `grayscale(${0.3 + recede * 0.5})`, willChange: 'transform, opacity' }}>
        <div style={{ width: 380, background: '#fff', borderRadius: 24, padding: 32, fontFamily: DISPLAY,
          boxShadow: '0 30px 80px rgba(0,0,0,0.4)' }}>
          <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: '0.12em', color: '#8895a6', marginBottom: 20 }}>STANDARD ALLOCATION</div>
          <div style={{ display: 'flex', justifyContent: 'center', margin: '10px 0 22px' }}>
            <div style={{ width: 190, height: 190, borderRadius: '50%',
              background: 'conic-gradient(#8895a6 0 42%, #aab4c1 42% 68%, #c7cfd8 68% 100%)',
              WebkitMask: 'radial-gradient(circle, transparent 52px, #000 53px)', mask: 'radial-gradient(circle, transparent 52px, #000 53px)' }} />
          </div>
          {['Equities', 'Fixed income', 'Alternatives'].map((x, i) => (
            <div key={x} style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 0',
              borderTop: i ? '1px solid #eef1f4' : 'none', color: '#5b6675', fontSize: 16 }}>
              <span>{x}</span><span style={{ fontFamily: MONO, color: '#8895a6' }}>{['42%', '26%', '32%'][i]}</span>
            </div>
          ))}
        </div>
      </div>
      {/* stamped words */}
      <div style={{ position: 'absolute', left: '54%', top: '50%', transform: 'translateY(-50%)',
        display: 'flex', flexDirection: 'column', gap: 6 }}>
        {words.map((x, i) => {
          const p = Easing.easeOutBack(clamp((l - x.at) / 0.45, 0, 1));
          if (p <= 0) return null;
          return (
            <div key={i} style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 108, letterSpacing: '-0.035em',
              color: x.c, opacity: clamp((l - x.at) / 0.3, 0, 1), transform: `translateX(${(1 - p) * -30}px) scale(${0.8 + 0.2 * p})`,
              textShadow: '0 8px 40px rgba(12,4,30,0.5)', willChange: 'transform, opacity' }}>{x.w}</div>
          );
        })}
      </div>
    </div>
  );
}

// ── SCENE 10 — founder POV (Marla) ────────────────────────────────────────────
// 131–140s.
function Scene10() {
  const t = useT();
  const S = 127.09;
  const l = t - S;
  const op = interpolate([S - 0.1, S + 0.5], [0, 1], Easing.linear)(t);
  return (
    <div style={{ position: 'absolute', inset: 0, opacity: op }}>
      <MarlaShot l={l} quoteStart={0.8} clipStart={24} clipEnd={30} quoteLines={[
        'This is how you build trust faster.',
        'People want to feel understood — and confident in their decisions.',
      ]} />
    </div>
  );
}

// ── SCENE 11 — the lifecycle ──────────────────────────────────────────────────
// 140–156s. Understanding grows across life stages and generations.
function Scene11() {
  const t = useT();
  const S = 133.09;
  const l = t - S;
  const op = interpolate([S - 0.1, S + 0.5], [0, 1], Easing.linear)(t);
  const stages = [
    { title: 'First meeting', sub: 'Values & vision', driver: 'Clarity' },
    { title: 'Building', sub: 'Goals in motion', driver: 'Growth' },
    { title: 'Life transition', sub: 'Priorities shift', driver: 'Security' },
    { title: 'Next generation', sub: 'Legacy in play', driver: 'Legacy' },
  ];
  const draw = Easing.easeInOutCubic(clamp((l - 2.2) / 4.0, 0, 1)); // line progress 0..1
  const nodeP = (i) => Easing.easeOutBack(clamp((l - (2.6 + i * 1.1)) / 0.6, 0, 1));
  const intro = Easing.easeOutCubic(clamp(l / 0.8, 0, 1));
  return (
    <div style={{ position: 'absolute', inset: 0, opacity: op }}>
      <WarmField l={l} />
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ opacity: intro, transform: `translateY(${(1 - intro) * 18}px)`, marginBottom: 60,
          textAlign: 'center', fontFamily: DISPLAY }}>
          <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: '0.18em', color: '#2DD2B0', marginBottom: 12 }}>ONE RELATIONSHIP, OVER TIME</div>
          <div style={{ fontSize: 46, fontWeight: 700, letterSpacing: '-0.02em', color: '#fff' }}>Understanding that grows with them</div>
        </div>
        {/* journey line */}
        <div style={{ position: 'relative', width: 1400, height: 240 }}>
          <div style={{ position: 'absolute', left: 60, right: 60, top: 30, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.12)' }} />
          <div style={{ position: 'absolute', left: 60, top: 30, height: 4, borderRadius: 2,
            width: `calc((100% - 120px) * ${draw})`, background: 'linear-gradient(90deg,#7C3AED,#2DD2B0)',
            boxShadow: '0 0 20px rgba(45,210,176,0.5)' }} />
          <div style={{ position: 'absolute', left: 60, right: 60, top: 0, display: 'flex', justifyContent: 'space-between' }}>
            {stages.map((s, i) => {
              const p = nodeP(i);
              return (
                <div key={i} style={{ width: 260, textAlign: 'center', opacity: p, transform: `translateY(${(1 - p) * 20}px)`, willChange: 'transform, opacity' }}>
                  <div style={{ width: 30, height: 30, borderRadius: '50%', margin: '18px auto 0',
                    background: 'linear-gradient(135deg,#7C3AED,#2DD2B0)', border: '4px solid #190232',
                    boxShadow: '0 0 22px rgba(45,210,176,0.6)' }} />
                  <div style={{ marginTop: 22, fontFamily: DISPLAY, fontWeight: 700, fontSize: 26, color: '#fff' }}>{s.title}</div>
                  <div style={{ fontFamily: DISPLAY, fontSize: 17, color: '#b9a9d9', marginTop: 4 }}>{s.sub}</div>
                  <div style={{ display: 'inline-block', marginTop: 14, fontSize: 14, fontWeight: 700, color: '#2DD2B0',
                    background: 'rgba(45,210,176,0.12)', border: '1.5px solid rgba(45,210,176,0.3)', padding: '6px 14px', borderRadius: 999 }}>{s.driver}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── SCENE 12 — close (kinetic type) ───────────────────────────────────────────
// 156–168s. Better beginnings → better everything.
function Scene12() {
  const t = useT();
  const S = 148.57;
  const l = t - S;
  const op = interpolate([S - 0.1, S + 0.5], [0, 1], Easing.linear)(t);
  const lines = [
    ['Better ', 'beginnings', '.'],
    ['Better ', 'relationships', '.'],
    ['Better ', 'conversations', '.'],
    ['Better ', 'decisions', '.'],
  ];
  const lineP = (i) => Easing.easeOutCubic(clamp((l - (0.8 + i * 0.9)) / 0.6, 0, 1));
  const finalP = Easing.easeOutCubic(clamp((l - 8.4) / 0.9, 0, 1));
  const listFade = 1 - Easing.easeInOutCubic(clamp((l - 8.0) / 0.7, 0, 1));
  return (
    <div style={{ position: 'absolute', inset: 0, opacity: op }}>
      <WarmField l={l} />
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* building list */}
        <div style={{ opacity: listFade, position: 'absolute', display: 'flex', flexDirection: 'column', gap: 4, textAlign: 'center' }}>
          {lines.map((ln, i) => {
            const p = lineP(i);
            return (
              <div key={i} style={{ opacity: p, transform: `translateY(${(1 - p) * 24}px)`,
                fontFamily: DISPLAY, fontWeight: 700, fontSize: 76, letterSpacing: '-0.03em', color: '#fff', lineHeight: 1.12, willChange: 'transform, opacity' }}>
                {ln[0]}<span style={{ color: '#2DD2B0' }}>{ln[1]}</span>{ln[2]}
              </div>
            );
          })}
        </div>
        {/* final line */}
        <div style={{ opacity: finalP, transform: `scale(${0.94 + 0.06 * finalP})`, textAlign: 'center', willChange: 'transform, opacity' }}>
          <KnomeeIcon color="#2DD2B0" size={96} style={{ display: 'block', margin: '0 auto 32px' }} />
          <div style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: 78, letterSpacing: '-0.03em', color: '#fff', lineHeight: 1.15 }}>
            Clients who actually<br /><span style={{ color: '#2DD2B0' }}>move forward.</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── SCENE 13 — final (Marla → brand end card) ─────────────────────────────────
// 168.7–176.7s. 4s of footage, then a 4s brand end card.
function Scene13() {
  const t = useT();
  const S = 160.57;
  const l = t - S;
  const op = interpolate([S - 0.1, S + 0.5], [0, 1], Easing.linear)(t);
  // Her last line runs to about 35.4s in the source and the trim now carries it
  // to 35.6, so the shot has to hold past l = 4.6 or the final word is clipped.
  // The hand-off moves back to match; the end card still gets a little over 3s.
  const marlaFade = 1 - Easing.easeInOutCubic(clamp((l - 4.7) / 0.7, 0, 1));
  const endP = Easing.easeOutCubic(clamp((l - 5.1) / 0.8, 0, 1));
  return (
    <div style={{ position: 'absolute', inset: 0, opacity: op }}>
      <div style={{ position: 'absolute', inset: 0, opacity: marlaFade }}>
        <MarlaShot l={l} quoteStart={0.8} clipStart={31} clipEnd={35.6} quoteLines={[
          'We\u2019re not replacing the human side of advice.',
          'We\u2019re making it stronger.',
        ]} />
      </div>
      {/* brand end card */}
      <div style={{ position: 'absolute', inset: 0, opacity: endP, pointerEvents: 'none' }}>
        <WarmField l={l} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: 28, transform: `scale(${0.96 + 0.04 * endP})` }}>
          <KnomeeWordmark iconColor="#2DD2B0" textColor="#fff" height={78} />
          <div style={{ fontFamily: DISPLAY, fontWeight: 500, fontSize: 34, color: '#2DD2B0', letterSpacing: '-0.01em' }}>Know more, grow more.</div>
        </div>
      </div>
    </div>
  );
}

// ── Soundtrack ────────────────────────────────────────────────────────
// One pre-mixed track carries the whole film: the Peaceful Corporate bed held at a
// constant 7.5% under all 38 narration lines — no ducking, so the music never swells
// (rendered offline in voiceover/knomee-soundtrack.wav). A single <audio> element plays it, and the
// playhead is driven by that element's currentTime — so the film cannot drift from
// the voice, and there is nothing to schedule, overlap or double up.
const SOUNDTRACK = "voiceover/knomee-soundtrack.wav";

// The mixed track is decoded once into a shared AudioContext rather than played through an
// <audio> element: the element reported duration=Infinity for this file and stalled after
// any seek. A decoded buffer has an exact length, starts instantly at any offset, and its
// context clock keeps running while the tab is hidden — so when the picture comes back it
// simply reads the true audio position instead of drifting.
function Soundtrack({ muted = false, volume = 1 }) {
  const { time, duration, playing, setTime, setPlaying } = useTimeline();
  const ctxRef = React.useRef(null);
  const gainRef = React.useRef(null);
  const bufRef = React.useRef(null);
  const srcRef = React.useRef(null);
  const epochRef = React.useRef(0);
  const ownRef = React.useRef(-1);
  const tRef = React.useRef(time);
  const playRef = React.useRef(playing);
  const durRef = React.useRef(duration);
  const setTimeRef = React.useRef(setTime);
  const setPlayingRef = React.useRef(setPlaying);
  tRef.current = time;
  playRef.current = playing;
  durRef.current = duration;
  setTimeRef.current = setTime;
  setPlayingRef.current = setPlaying;
  const [ready, setReady] = React.useState(false);
  const [blocked, setBlocked] = React.useState(false);

  React.useEffect(() => {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    let dead = false;
    let shared = window.__KNOMEE_SOUNDTRACK;
    if (!shared) {
      const ctx = new AC();
      const gain = ctx.createGain();
      gain.connect(ctx.destination);
      shared = window.__KNOMEE_SOUNDTRACK = { ctx, gain, buf: null, loading: null };
    }
    ctxRef.current = shared.ctx;
    gainRef.current = shared.gain;
    if (shared.buf) { bufRef.current = shared.buf; setReady(true); return; }
    shared.loading = shared.loading || fetch(SOUNDTRACK)
      .then((r) => r.arrayBuffer())
      .then((b) => shared.ctx.decodeAudioData(b))
      .then((buf) => { shared.buf = buf; return buf; })
      .catch(() => null);
    shared.loading.then((buf) => { if (!dead && buf) { bufRef.current = buf; setReady(true); } });
    return () => { dead = true; };
  }, []);

  const stop = () => {
    const prev = window.__KNOMEE_SOUNDTRACK_SRC;
    if (prev) { try { prev.stop(); } catch (e) {} }
    window.__KNOMEE_SOUNDTRACK_SRC = null;
    srcRef.current = null;
  };

  const start = (from) => {
    const ctx = ctxRef.current, buf = bufRef.current;
    if (!ctx || !buf) return;
    stop();
    const src = ctx.createBufferSource();
    src.buffer = buf;
    src.connect(gainRef.current || ctx.destination);
    epochRef.current = ctx.currentTime - from;
    src.start(ctx.currentTime, Math.max(0, Math.min(buf.duration - 0.05, from)));
    srcRef.current = src;
    window.__KNOMEE_SOUNDTRACK_SRC = src;
    ownRef.current = from;
  };

  React.useEffect(() => {
    if (!ready) return;
    const ctx = ctxRef.current;
    if (gainRef.current) gainRef.current.gain.value = muted ? 0 : clamp(volume, 0, 1);
    if (!playing) { stop(); ownRef.current = -1; return; }
    ctx.resume().catch(() => {}).then(() => setBlocked(ctx.state !== "running"));
    start(tRef.current >= durRef.current - 0.05 ? 0 : tRef.current);
  }, [ready, playing, muted, volume]);

  // One clock loop for the life of the component — never torn down by a play/pause batch.
  // requestAnimationFrame is suspended while the tab is hidden, so a slow interval keeps
  // the playhead roughly right; rAF takes over the moment the picture is visible again.
  React.useEffect(() => {
    let raf = null;
    const tickClock = () => {
      const ctx = ctxRef.current;
      const src = srcRef.current;
      // Only drive the playhead while the context is genuinely running. A
      // suspended context — which is every context before the page is clicked —
      // has a frozen currentTime, and writing that back each tick fought the
      // Stage's own loop advancing forward: the playhead oscillated over a
      // single frame, visibly flickering between two hundredths of a second.
      const running = !!(ctx && src && playRef.current && ctx.state === "running");
      if (running) {
        if (ownRef.current >= 0 && Math.abs(tRef.current - ownRef.current) > 0.25) {
          start(Math.max(0, Math.min(durRef.current, tRef.current)));   // outside seek
        } else {
          const t = ctx.currentTime - epochRef.current;
          if (t >= durRef.current) {
            ownRef.current = durRef.current;
            setTimeRef.current(durRef.current);
            setPlayingRef.current(false);
            stop();
          } else {
            ownRef.current = t;
            setTimeRef.current(t);
          }
        }
      }
      const own = running;
      if (window.__OM_EXTERNAL_CLOCK !== own) {
        window.__OM_EXTERNAL_CLOCK = own;
        window.dispatchEvent(new Event("om-clock-claim"));
      }
    };
    const step = () => { tickClock(); raf = requestAnimationFrame(step); };
    raf = requestAnimationFrame(step);
    const keepAlive = setInterval(tickClock, 250);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      clearInterval(keepAlive);
      stop();
      window.__OM_EXTERNAL_CLOCK = false;
      window.dispatchEvent(new Event("om-clock-claim"));
    };
  }, []);

  React.useEffect(() => {
    const unlock = () => {
      const ctx = ctxRef.current;
      if (!ctx || ctx.state === "running") return;
      ctx.resume().then(() => {
        setBlocked(ctx.state !== "running");
        if (playRef.current) start(tRef.current);
      }).catch(() => {});
    };
    window.addEventListener("pointerdown", unlock);
    window.addEventListener("keydown", unlock);
    return () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
    };
  }, []);

  // Export carrier: the video exporter only mixes audio it can find on a media element
  // tagged with the data-om-exportable-video-play-* attrs. Web Audio playback is invisible
  // to it, which is why exports came out silent. This muted 1px element is never played
  // in the preview — it exists so the exporter has the soundtrack to mix.
  const carrier = (
    <video
      key="soundtrack-carrier"
      src={SOUNDTRACK}
      muted
      playsInline
      preload="auto"
      data-om-exportable-video-play-start={0}
      data-om-exportable-video-play-end={VIDEO_DURATION}
      data-om-exportable-video-play-speed={1}
      style={{ position: "absolute", left: 0, top: 0, width: 1, height: 1, opacity: 0, pointerEvents: "none" }}
    />
  );

  if (!blocked) return carrier;
  return (
    <>
    {carrier}
    <div style={{ position: "absolute", left: 40, top: 40, zIndex: 40, pointerEvents: "none",
      display: "flex", alignItems: "center", gap: 10, padding: "12px 20px", borderRadius: 999,
      background: "rgba(36,4,70,0.92)", color: "#fff", fontFamily: DISPLAY, fontSize: 15,
      fontWeight: 600, letterSpacing: "-0.2px" }}>
      Click anywhere to enable sound
    </div>
    </>
  );
}

// ── Root ────────────────────────────────────────────────────────────────────
// autoplay is off on purpose. A browser will not let audible media start before
// the page is interacted with, so autoplaying only ever produced a film running
// silently, or stuck, until someone pressed play anyway. Opening parked on the
// first frame says what to do instead of pretending to have started.
function KnomeeVideo() {
  return (
    <Stage width={1920} height={1080} duration={VIDEO_DURATION} background="#0c1524"
      persistKey="knomee-video" autoplay={false}>
      <PlayerBridge />
      <Soundtrack />
      <Sprite start={0.0} end={20.1}><Scene1 /></Sprite>
      <Sprite start={19.9} end={41.63}><Scene2 /></Sprite>
      <Sprite start={41.5} end={45.03}><Scene3 /></Sprite>
      <Sprite start={44.86} end={65.36}><Scene4 /></Sprite>
      <Sprite start={65.21} end={85.37}><Scene6 /></Sprite>
      <Sprite start={85.17} end={107.85}><Scene7 /></Sprite>
      <Sprite start={107.65} end={118.33}><Scene8 /></Sprite>
      <Sprite start={118.27} end={127.19}><Scene9 /></Sprite>
      <Sprite start={126.99} end={133.19}><Scene10 /></Sprite>
      <Sprite start={132.99} end={148.67}><Scene11 /></Sprite>
      <Sprite start={148.47} end={160.67}><Scene12 /></Sprite>
      <Sprite start={160.47} end={168.57}><Scene13 /></Sprite>
    </Stage>
  );
}

Object.assign(window, { MarlaFrame, Tag, KQRing, KnomeeWord, KnomeeWordmark, KnomeeIcon, KnomeeVideo, Soundtrack, Scene1, Scene2, Scene3, Scene4, Scene6, Scene7, Scene8, Scene9, Scene10, Scene11, Scene12, Scene13, MarlaShot, WarmField, Chip, ProgressDots, QuotientRing, PROSPECTS, PlayerBridge, SCENES, KnomeeIcon, KnomeeWordmark, StampLabel, FirmCard, CompanyPage, FIRMS, BRAND, COLD, Placeholder, Cursor, Caption, BrowserFrame, ColdLandingPage });
