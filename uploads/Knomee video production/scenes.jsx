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
const SERIF = "'Sedan', Georgia, 'Times New Roman', serif"; // firm-name accent
const GENERIC = "Arial, 'Helvetica Neue', sans-serif";
const MONO = "'JetBrains Mono', ui-monospace, monospace";

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

// Dramatic shatter overlay for the "momentum breaks" beat (aligns to a 1360x812 frame)
function BrokenGlass({ t, start = 16.4 }) {
  if (t < start) return null;
  const l = t - start;
  const draw = Easing.easeOutCubic(clamp(l / 0.5, 0, 1));
  const flash = interpolate([0, 0.1, 0.5], [0, 1, 0], Easing.linear)(l);
  const cracks = [
    'M700,400 L560,300 L470,150 L360,60',
    'M700,400 L860,320 L980,200 L1130,110',
    'M700,400 L920,470 L1060,560 L1210,660',
    'M700,400 L560,520 L430,640 L300,760',
    'M700,400 L690,250 L710,150 L700,40',
    'M700,400 L470,410 L300,382 L110,410',
    'M700,400 L960,405 L1130,432 L1330,414',
    'M700,400 L820,560 L760,700 L845,806',
    'M700,400 L545,470 L360,700 L250,780',
    // shard connectors
    'M470,150 L690,250 L860,320',
    'M920,470 L820,560 L560,520',
    'M470,410 L545,470 L560,520',
    'M960,405 L920,470',
  ];
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 5 }}>
      <div style={{ position: 'absolute', inset: 0, mixBlendMode: 'screen',
        background: `radial-gradient(620px 520px at 51% 49%, rgba(242,101,91,${0.55 * flash}), rgba(242,101,91,0) 70%)` }} />
      <svg viewBox="0 0 1360 812" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          {cracks.map((d, i) => (
            <g key={i}>
              <path d={d} stroke="#f2655b" strokeWidth={7} pathLength="1" strokeDasharray="1" strokeDashoffset={1 - draw}
                style={{ filter: 'drop-shadow(0 0 9px rgba(242,101,91,0.9))' }} />
              <path d={d} stroke="#ffffff" strokeWidth={2.2} pathLength="1" strokeDasharray="1" strokeDashoffset={1 - draw} />
            </g>
          ))}
        </g>
        <circle cx="700" cy="400" r={9 + flash * 34} fill={`rgba(255,255,255,${0.85 * flash})`} />
      </svg>
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
function ColdLandingPage({ formHi = 0, dim = 0, name = 'MERIDIAN WEALTH', btnHi = 0 }) {
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
        <div style={{ position: 'relative' }}>
          <BrowserFrame url="meridianwealthpartners.com">
            <ColdLandingPage formHi={formHi} dim={dim} />
          </BrowserFrame>
          <BrokenGlass t={t} start={16.4} />
        </div>
      </div>

      {/* cursor */}
      <Cursor x={cx} y={cy} opacity={curOpacity} />

      {/* bottom scrim for captions */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 320,
        background: 'linear-gradient(to top, rgba(233,237,243,0.97), rgba(233,237,243,0))' }} />

      {/* captions */}
      <Sprite start={0.5} end={3.4}><Caption tone="light" text="Most wealth firms don't have a pipeline problem." /></Sprite>
      <Sprite start={3.4} end={5.9}><Caption tone="light" text="They have a conversion problem." /></Sprite>
      <Sprite start={5.9} end={7.9}><Caption tone="light" text="You have target lists." /></Sprite>
      <Sprite start={7.9} end={10.3}><Caption tone="light" text="But you're not converting new clients." /></Sprite>
      <Sprite start={10.3} end={13.2}><Caption tone="light" text="You start with what you offer —" /></Sprite>
      <Sprite start={13.2} end={16.3}><Caption tone="light" text="before understanding what wealth means to them." /></Sprite>
      <Sprite start={16.3} end={19.8}><Caption tone="light" text="And that's where momentum breaks." /></Sprite>
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
  { id: 'aspen',  name: 'ASPEN RIDGE',        url: 'aspenridgeprivate.com',    variant: 'serif-centered',
    theme: { bg: '#f3f1ec', card: '#fff', ink: '#1f2a24', sub: '#6a7269', line: '#e0ddd3', accent: '#2f5d4a', field: '#f7f6f1' },
    font: "'Georgia', 'Times New Roman', serif", tag: 'PRIVATE WEALTH', heroA: 'Wealth,', heroB: 'quietly stewarded.', mark: 'square' },
  { id: 'north',  name: 'NORTHBRIDGE',        url: 'northbridge-partners.com', variant: 'photo-left',
    theme: { bg: '#0f1c2e', card: '#16283f', ink: '#eaf1f9', sub: '#93a6bd', line: '#25384f', accent: '#3f7cc4', field: '#1c3149' },
    font: "'Helvetica Neue', Arial, sans-serif", tag: 'INSTITUTIONAL ADVISORY', heroA: 'Capital with', heroB: 'conviction.', mark: 'circle', dark: true },
  { id: 'beacon', name: 'Beacon Wealth',      url: 'beaconwealth.co',          variant: 'split-warm',
    theme: { bg: '#faf6f0', card: '#fff', ink: '#3a2318', sub: '#8a7161', line: '#ece2d6', accent: '#a8632c', field: '#f6efe6' },
    font: "'Palatino Linotype', 'Book Antiqua', serif", tag: 'FAMILY OFFICE', heroA: 'A steady hand', heroB: 'for what you build.', mark: 'diamond' },
  { id: 'halcyon',name: 'Halcyon Capital',    url: 'halcyoncapital.io',        variant: 'minimal-mono',
    theme: { bg: '#eef1f0', card: '#fff', ink: '#1a2b2b', sub: '#5e7373', line: '#dbe4e2', accent: '#0d8f8f', field: '#f2f6f5' },
    font: "'Inter', 'Segoe UI', sans-serif", tag: 'MODERN PORTFOLIO MGMT', heroA: 'Invest with', heroB: 'clarity.', mark: 'pill' },
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
  const S = 20;
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

      {/* SHOT 1 — single firm (Northbridge) + form friction */}
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
      <Sprite start={29.9} end={44}>
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

      {/* bottom scrim + captions */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 320,
        background: 'linear-gradient(to top, rgba(6,10,18,0.92), rgba(6,10,18,0))' }} />
      <Sprite start={20.4} end={23.4}><Caption text="At first touch, every wealth firm feels the same." /></Sprite>
      <Sprite start={23.4} end={25.6}><Caption text="A click leads to a form." /></Sprite>
      <Sprite start={25.6} end={28.8}><Caption text="Questions. Data requests." /></Sprite>
      <Sprite start={28.8} end={31.0}><Caption text="No signal. No differentiation." /></Sprite>
      <Sprite start={31.2} end={34.3}><Caption text="No way to know if you're right for them." /></Sprite>
      <Sprite start={34.4} end={36.4}><Caption text="So they hesitate." /></Sprite>
      <Sprite start={36.4} end={38.5}><Caption text="They compare —" /></Sprite>
      <Sprite start={38.6} end={41.3}><Caption text="but everything looks interchangeable." /></Sprite>
      <Sprite start={41.4} end={43.9}><Caption text="And most just leave." /></Sprite>
    </div>
  );
}

// ── Scene manifest — the STABLE contract your app codes against ────────────────
// Each new video version keeps these fields; ids never change once shipped.
// (start/end/title may shift as scenes are refined — always read them live via
//  window.KnomeePlayer.getScenes(), don't hardcode timings in your app.)
const SCENES = [
  { id: 'problem',       n: 1, title: 'The conversion problem', start: 0,  end: 20 },
  { id: 'sameness',      n: 2, title: 'Every firm feels the same', start: 20, end: 44 },
  { id: 'transition',    n: 3, title: 'Knomee changes the starting point', start: 44, end: 51 },
  { id: 'value',         n: 4, title: 'Knomee creates value immediately', start: 51, end: 73 },
  { id: 'intelligence',  n: 5, title: 'Behavioral intelligence', start: 73, end: 91 },
  { id: 'signals',       n: 6, title: 'Signals advisors can act on', start: 91, end: 111 },
  { id: 'founder-1',     n: 7, title: 'Founder POV — clarity changes everything', start: 111, end: 125 },
  { id: 'meeting-prep',  n: 8, title: 'Meeting prep', start: 125, end: 135 },
  { id: 'different',     n: 9, title: 'Show up different', start: 135, end: 144 },
  { id: 'founder-2',     n: 10, title: 'Founder POV — build trust faster', start: 144, end: 153 },
  { id: 'lifecycle',     n: 11, title: 'The lifecycle', start: 153, end: 169 },
  { id: 'close',         n: 12, title: 'Better beginnings', start: 169, end: 181 },
  { id: 'final',         n: 13, title: 'Making advice stronger', start: 181, end: 189 },
];
const VIDEO_DURATION = 189;

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
function KnomeeWordmark({ iconColor = '#2DD2B0', textColor = '#fff', height = 46, showR = false, style }) {
  return (
    <svg height={height} viewBox="0 0 1702 288" fill="none" style={{ display: 'block', ...style }}>
      {KNOMEE_ICON_PATHS.map((d, i) => <path key={'i' + i} d={d} fill={iconColor} />)}
      {KNOMEE_WORD_PATHS.map((d, i) => <path key={'w' + i} d={d} fill={textColor} />)}
    </svg>
  );
}

// ── SCENE 3 — the transition into Knomee ───────────────────────────────────────
// 44–51s. Cold world washes away; warm Knomee brand arrives. "Knomee changes the starting point."
function Scene3() {
  const t = useT();
  const S = 44;
  const l = t - S; // local time
  // warm purple wipe sweeps in over the cold backdrop
  const wipe = interpolate([0, 1.4], [0, 140], Easing.easeInOutCubic)(l); // % across
  // icon: fade + settle scale + gentle rotation ease
  const iconP = Easing.easeOutCubic(clamp((l - 1.0) / 0.9, 0, 1));
  const iconScale = 0.7 + iconP * 0.3;
  const iconRot = (1 - iconP) * -22;
  const glow = 0.2 + 0.8 * iconP;
  // wordmark reveal
  const wordP = Easing.easeOutCubic(clamp((l - 1.8) / 0.8, 0, 1));
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
          <KnomeeWordmark iconColor="transparent" textColor="#fff" height={62}
            style={{ marginLeft: -160 }} />
        </div>
      </div>

      {/* caption */}
      <Sprite start={45.9} end={51}>
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
// 51–73s. A warm, guided card: reflect on Values → Goals → Vision.
function Scene4() {
  const t = useT();
  const S = 51;
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

  const content = {
    0: { kicker: 'VALUES', prompt: 'I want money to help me with…',
      chips: [['Family', 2.0], ['Freedom', 3.4], ['Legacy', 5.2], ['Security', -1], ['Growth', -1], ['Purpose', -1]] },
    1: { kicker: 'GOALS', prompt: 'What do you want your wealth to make possible?',
      chips: [['Launch a startup', 9.0], ['Visit Italy', 10.6], ['Donate to the humane society', -1], ['Kids\u2019 advanced degrees', 12.0]] },
  }[step];

  // Vision typewriter
  const visionFull = 'I want to feel confident traveling for a month, support local pets, and see my children pursue meaningful work in medicine and architecture.';
  const vShown = visionFull.slice(0, Math.floor(clamp((l - 15.2) / 4.6, 0, 1) * visionFull.length));
  const caret = Math.floor(l * 2) % 2 === 0;

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
        <div style={{ width: 720, minHeight: 560, background: KDS.white, borderRadius: 28,
          boxShadow: '0 40px 110px rgba(12,4,30,0.5), 0 8px 30px rgba(12,4,30,0.3)', padding: 44, boxSizing: 'border-box',
          display: 'flex', flexDirection: 'column', fontFamily: DISPLAY, position: 'relative', overflow: 'hidden' }}>
          {/* grape accent bar */}
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 6, background: KDS.grapeBar }} />
          {/* header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <KnomeeIcon color={KDS.teal} size={36} />
              <div style={{ fontSize: 14, fontWeight: 600, letterSpacing: '1px', color: KDS.grape }}>{content ? content.kicker : 'VISION'}</div>
            </div>
            <ProgressDots active={step} total={3} />
          </div>
          {/* prompt + body swap by step */}
          <div style={{ marginTop: 34, opacity: stepEnter, transform: `translateY(${(1 - stepEnter) * 14}px)`, flex: 1 }}>
            {step < 2 ? (
              <div>
                <div style={{ fontSize: 40, fontWeight: 600, lineHeight: 1.15, letterSpacing: '-0.5px', color: KDS.plum, maxWidth: 560 }}>
                  {content.prompt}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginTop: 38 }}>
                  {content.chips.map(([label, at]) => (
                    <Chip key={label} label={label} sel={at < 0 ? 0 : sel(at)} />
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <div style={{ fontSize: 40, fontWeight: 600, lineHeight: 1.15, letterSpacing: '-0.5px', color: KDS.plum, maxWidth: 580 }}>
                  Picture ten years from now. What's different?
                </div>
                <div style={{ marginTop: 32, background: KDS.tealLight, border: `1.5px solid ${KDS.mint}`, borderRadius: 20,
                  padding: '28px 30px', minHeight: 170 }}>
                  <div style={{ fontSize: 28, lineHeight: 1.5, color: KDS.body, fontWeight: 500 }}>
                    {vShown}<span style={{ opacity: caret ? 1 : 0, color: KDS.teal, fontWeight: 700 }}>|</span>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 24, color: KDS.tealDeep, fontSize: 19, fontWeight: 600 }}>
                  <KnomeeIcon color={KDS.teal} size={22} /> In your own words — no forms, no scores yet.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* bottom scrim + captions */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 300,
        background: 'linear-gradient(to top, rgba(20,3,40,0.82), rgba(20,3,40,0))' }} />
      <Sprite start={51.4} end={54.4}><Caption text="Instead of asking for information —" /></Sprite>
      <Sprite start={54.4} end={57.2}><Caption text="Knomee creates value immediately." /></Sprite>
      <Sprite start={57.2} end={61.4}><Caption text="A guided experience to reflect on what truly matters." /></Sprite>
      <Sprite start={61.4} end={64.6}><Caption text="Their goals. Their values. Their vision." /></Sprite>
      <Sprite start={64.8} end={67.4}><Caption text="It doesn't feel like intake." /></Sprite>
      <Sprite start={67.4} end={69.6}><Caption text="It feels personal." /></Sprite>
      <Sprite start={69.6} end={73}><Caption text="Like someone is finally asking the right questions." /></Sprite>
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
  { name: 'Elena R.', q: 82, status: 'Ready to move', tone: 'ready', drivers: ['Legacy', 'Family'] },
  { name: 'Marcus T.', q: 63, status: 'Needs clarity', tone: 'clarity', drivers: ['Security'] },
  { name: 'Priya N.', q: 45, status: 'Exploring', tone: 'explore', drivers: ['Growth'] },
];
function toneStyle(tone) {
  if (tone === 'ready') return { bg: 'rgba(45,210,176,0.16)', fg: '#0e9b7c', bar: 'linear-gradient(90deg,#7C3AED,#2DD2B0)' };
  if (tone === 'clarity') return { bg: 'rgba(124,58,237,0.14)', fg: '#7C3AED', bar: 'linear-gradient(90deg,#7C3AED,#a06bf0)' };
  return { bg: 'rgba(120,102,150,0.14)', fg: '#8a7ba6', bar: 'linear-gradient(90deg,#b9a9d9,#cdbfe6)' };
}

// ── SCENE 5 — Behavioral intelligence (advisor dashboard) ─────────────────────
// 73–91s. The Knomee Quotient + readiness signals most firms never see.
function Scene5() {
  const t = useT();
  const S = 73;
  const l = t - S;
  const s5op = interpolate([S - 0.1, S + 0.5], [0, 1], Easing.linear)(t);
  const intro = Easing.easeOutCubic(clamp(l / 0.8, 0, 1));
  const cardScale = 0.95 + 0.05 * intro;
  const floatY = Math.cos(l * 0.5) * 6;
  const ringVal = interpolate([1.0, 3.4], [0, 82], Easing.easeOutCubic)(l);
  const rowP = (i) => Easing.easeOutCubic(clamp((l - (2.6 + i * 0.55)) / 0.6, 0, 1));
  const activeRow = l >= 6.3 && l < 9 ? 0 : l >= 9 && l < 11.6 ? 1 : -1;
  const driverGlow = Easing.easeOutCubic(clamp((l - 11.6) / 0.6, 0, 1));
  const sentiment = { 1: 5, 2: 3, 3: 2 };

  return (
    <div style={{ position: 'absolute', inset: 0, opacity: s5op, background: KDS.appBg }}>
      <div style={{ position: 'absolute', inset: 0,
        background: 'radial-gradient(1200px 820px at 50% 0%, rgba(36,4,70,0.07), rgba(36,4,70,0) 58%)' }} />
      <div style={{ position: 'absolute', left: '50%', top: '50%',
        transform: `translate(-50%,-50%) translate(0, ${-30 + floatY}px) scale(${cardScale})`, opacity: intro, willChange: 'transform, opacity' }}>
        <div style={{ width: 1280, background: KDS.white, borderRadius: 20,
          boxShadow: '0 30px 90px rgba(36,4,70,0.16), 0 4px 20px rgba(36,4,70,0.08)', border: `1px solid ${KDS.borderSoft}`,
          padding: 40, boxSizing: 'border-box', fontFamily: DISPLAY, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 6, background: KDS.grapeBar }} />
          {/* header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <KnomeeIcon color={KDS.teal} size={40} />
              <div>
                <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: '-0.5px', color: KDS.plum }}>Behavioral Intelligence</div>
                <div style={{ fontSize: 14, color: KDS.muted, fontWeight: 500 }}>Advisor view · new prospects</div>
              </div>
            </div>
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '1px', color: KDS.tealDeep,
              background: KDS.tealLight, padding: '9px 16px', borderRadius: 999 }}>LIVE SIGNAL</div>
          </div>

          <div style={{ display: 'flex', gap: 30 }}>
            {/* left — quotient ring */}
            <div style={{ width: 360, flexShrink: 0, background: KDS.tray, border: `1px solid ${KDS.borderSoft}`,
              borderRadius: 16, padding: 30, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: '1px', color: KDS.grape, alignSelf: 'flex-start' }}>KNOMEE QUOTIENT</div>
              <div style={{ position: 'relative', marginTop: 18 }}>
                <QuotientRing value={ringVal} size={250} />
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ fontSize: 72, fontWeight: 700, letterSpacing: '-1px', color: KDS.plum, lineHeight: 1 }}>{Math.round(ringVal)}</div>
                  <div style={{ fontSize: 15, color: KDS.muted, fontWeight: 500, marginTop: 4 }}>/ 100 readiness</div>
                </div>
              </div>
              <div style={{ marginTop: 20, fontSize: 16, fontWeight: 600, color: KDS.ocean,
                background: tierTint(1), padding: '9px 18px', borderRadius: 999 }}>Tier 1 · Ready now</div>
            </div>

            {/* right — segmented prospect list */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: '1px', color: KDS.grape }}>WHO'S READY · WHO NEEDS CLARITY</div>
              {PROSPECTS.map((p, i) => {
                const ti = kqTier(p.q);
                const tc = tierColor(ti);
                const hot = activeRow === i;
                const pr = rowP(i);
                return (
                  <div key={p.name} style={{ opacity: pr, transform: `translateX(${(1 - pr) * 26}px)`,
                    background: '#fff', border: `1.5px solid ${hot ? KDS.teal : KDS.borderSoft}`, borderRadius: 14,
                    padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 18,
                    boxShadow: hot ? '0 12px 30px rgba(61,189,170,0.22)' : '0 1px 6px rgba(36,4,70,0.05)',
                    willChange: 'transform, opacity' }}>
                    <div style={{ width: 48, height: 48, borderRadius: '50%', flexShrink: 0,
                      background: `linear-gradient(135deg, ${KDS.plum}, ${KDS.grape})`, color: '#fff', fontWeight: 700, fontSize: 20,
                      display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{p.name[0]}</div>
                    <div style={{ width: 140, flexShrink: 0 }}>
                      <div style={{ fontSize: 19, fontWeight: 600, color: KDS.plum }}>{p.name}</div>
                      <div style={{ fontSize: 13, color: KDS.muted }}>New prospect</div>
                    </div>
                    {/* KQ badge */}
                    <span style={{ minWidth: 52, height: 36, padding: '0 14px', borderRadius: 8, display: 'inline-flex',
                      alignItems: 'center', justifyContent: 'center', fontFamily: DISPLAY, fontWeight: 700, fontSize: 18,
                      color: '#fff', background: tc, flexShrink: 0 }}>{Math.round(pr * p.q)}</span>
                    {/* drivers */}
                    <div style={{ flex: 1, display: 'flex', gap: 8, opacity: 0.5 + 0.5 * driverGlow }}>
                      {p.drivers.map((d) => (
                        <div key={d} style={{ fontSize: 14, fontWeight: 600, color: KDS.grape, background: KDS.grapeLight,
                          padding: '7px 14px', borderRadius: 999,
                          boxShadow: driverGlow > 0.5 ? '0 6px 16px rgba(118,57,161,0.16)' : 'none' }}>{d}</div>
                      ))}
                    </div>
                    {/* sentiment dots */}
                    <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
                      {[0, 1, 2, 3, 4].map((di) => {
                        const filled = di < sentiment[ti];
                        return <span key={di} style={{ width: 11, height: 11, borderRadius: '50%',
                          background: filled ? KDS.bolt : KDS.pearl, border: filled ? 'none' : `1.5px solid ${KDS.stone}` }} />;
                      })}
                    </div>
                    <div style={{ flexShrink: 0, textAlign: 'right' }}>
                      <span style={{ fontSize: 14, fontWeight: 600, color: tc, background: tierTint(ti),
                        padding: '8px 14px', borderRadius: 999, whiteSpace: 'nowrap' }}>{p.status}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* bottom scrim + captions */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 280,
        background: 'linear-gradient(to top, rgba(245,245,247,0.96), rgba(245,245,247,0))' }} />
      <Sprite start={73.4} end={77.0}><Caption tone="light" text="Knomee reveals what most firms never see." /></Sprite>
      <Sprite start={77.0} end={79.3}><Caption tone="light" text="Behavioral intelligence." /></Sprite>
      <Sprite start={79.3} end={82.0}><Caption tone="light" text="Who's ready to move." /></Sprite>
      <Sprite start={82.0} end={84.6}><Caption tone="light" text="Who needs clarity." /></Sprite>
      <Sprite start={84.6} end={91}><Caption tone="light" text="And what's driving their decisions." /></Sprite>
    </div>
  );
}

// Reusable founder-interview shot (scenes 7, 10, 13). Warm bg, video placeholder + rising quote.
function MarlaShot({ l = 0, quoteLines = [], quoteStart = 1.0 }) {
  const intro = Easing.easeOutCubic(clamp(l / 0.7, 0, 1));
  return (
    <React.Fragment>
      <WarmField l={l} />
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 1240, display: 'flex', gap: 52, alignItems: 'center',
          opacity: intro, transform: `translateY(${(1 - intro) * 22}px)`, willChange: 'transform, opacity' }}>
          <div style={{ width: 620, flexShrink: 0, position: 'relative' }}>
            <div style={{ borderRadius: 26, overflow: 'hidden', boxShadow: '0 44px 120px rgba(12,4,30,0.6)',
              border: '1px solid rgba(255,255,255,0.10)' }}>
              <Placeholder label="Founder interview — Marla to camera (16:9)" w={620} h={392} tone="warm" style={{ borderRadius: 0 }} />
            </div>
            <div style={{ position: 'absolute', left: 24, bottom: 24, background: 'rgba(16,3,34,0.74)',
              backdropFilter: 'blur(6px)', borderRadius: 14, padding: '13px 20px', borderLeft: '4px solid #2DD2B0' }}>
              <div style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 25, color: '#fff', letterSpacing: '-0.01em' }}>Marla</div>
              <div style={{ fontFamily: DISPLAY, fontSize: 16, color: '#2DD2B0', fontWeight: 600 }}>Founder &amp; CEO, Knomee</div>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: DISPLAY, fontSize: 40, lineHeight: 1.34, color: '#fff', fontWeight: 500, letterSpacing: '-0.01em' }}>
              <span style={{ color: '#2DD2B0', fontSize: 64, fontWeight: 800, verticalAlign: '-0.18em', marginRight: 6 }}>&ldquo;</span>
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
// 91–111s. Quotient → conversation starters, grounded in behavioral science.
function Scene6() {
  const t = useT();
  const S = 91;
  const l = t - S;
  const op = interpolate([S - 0.1, S + 0.5], [0, 1], Easing.linear)(t);
  const intro = Easing.easeOutCubic(clamp(l / 0.8, 0, 1));
  const scale = 0.94 + 0.06 * intro;
  const starters = [
    { hi: 'Legacy', text: 'Open with the next generation — her strongest driver.' },
    { hi: 'Freedom', text: 'Frame the plan around time, not just returns.' },
    { hi: 'High readiness', text: 'Bring one concrete first step to the meeting.' },
  ];
  const rowP = (i) => Easing.easeOutCubic(clamp((l - (4.4 + i * 0.7)) / 0.6, 0, 1));
  const footP = Easing.easeOutCubic(clamp((l - 8.4) / 0.7, 0, 1));

  return (
    <div style={{ position: 'absolute', inset: 0, opacity: op }}>
      <WarmField l={l} />
      <div style={{ position: 'absolute', left: '50%', top: '50%',
        transform: `translate(-50%,-50%) translateY(-34px) scale(${scale})`, opacity: intro, willChange: 'transform, opacity' }}>
        <div style={{ width: 1220, background: '#fff', borderRadius: 30, padding: 40, boxSizing: 'border-box',
          boxShadow: '0 50px 130px rgba(12,4,30,0.55)', fontFamily: DISPLAY }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
            <KnomeeIcon color="#2DD2B0" size={40} />
            <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.02em', color: '#1b1230' }}>Signals you can act on</div>
          </div>
          <div style={{ display: 'flex', gap: 34 }}>
            {/* readiness summary */}
            <div style={{ width: 340, flexShrink: 0, background: '#faf7ff', border: '1.5px solid #f0e8fc', borderRadius: 22,
              padding: 30, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 56, height: 56, borderRadius: 16, background: 'linear-gradient(135deg,#7C3AED,#2DD2B0)',
                  color: '#fff', fontWeight: 800, fontSize: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>E</div>
                <div>
                  <div style={{ fontSize: 22, fontWeight: 700, color: '#1b1230' }}>Elena R.</div>
                  <div style={{ fontSize: 15, color: '#9a8bbd' }}>New prospect</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
                <div style={{ fontSize: 60, fontWeight: 800, letterSpacing: '-0.03em', color: '#1b1230', lineHeight: 1 }}>82</div>
                <div style={{ fontSize: 16, color: '#9a8bbd', fontWeight: 600 }}>Knomee Quotient</div>
              </div>
              <div style={{ fontSize: 18, fontWeight: 600, color: '#0e9b7c', background: 'rgba(45,210,176,0.14)',
                padding: '10px 18px', borderRadius: 999, alignSelf: 'flex-start' }}>Ready to move</div>
            </div>
            {/* conversation starters */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: '0.16em', color: '#a08fc4' }}>CONVERSATION STARTERS</div>
              {starters.map((s, i) => {
                const pr = rowP(i);
                return (
                  <div key={i} style={{ opacity: pr, transform: `translateX(${(1 - pr) * 24}px)`,
                    display: 'flex', alignItems: 'center', gap: 18, background: '#fff', border: '1.5px solid #eee6f8',
                    borderRadius: 18, padding: '20px 22px', boxShadow: '0 2px 12px rgba(36,4,70,0.04)', willChange: 'transform, opacity' }}>
                    <div style={{ width: 12, height: 12, borderRadius: 6, background: 'linear-gradient(135deg,#7C3AED,#2DD2B0)', flexShrink: 0 }} />
                    <div style={{ fontSize: 24, color: '#2b1f47', fontWeight: 500, lineHeight: 1.35, flex: 1 }}>{s.text}</div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#7C3AED', background: '#f5f0fc',
                      border: '1.5px solid #ece2fb', padding: '7px 14px', borderRadius: 999, flexShrink: 0 }}>{s.hi}</div>
                  </div>
                );
              })}
            </div>
          </div>
          {/* science footer */}
          <div style={{ opacity: footP, marginTop: 26, paddingTop: 24, borderTop: '1.5px solid #f0e8fc',
            display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
            <div style={{ fontSize: 16, color: '#9a8bbd', fontWeight: 600 }}>Grounded in</div>
            {['Behavioral science', 'Decision research', 'Momentum modeling'].map((x) => (
              <div key={x} style={{ fontSize: 16, fontWeight: 700, color: '#3a2b57', background: '#faf7ff',
                border: '1.5px solid #ece2fb', padding: '9px 16px', borderRadius: 999 }}>{x}</div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 300,
        background: 'linear-gradient(to top, rgba(16,3,34,0.85), rgba(16,3,34,0))' }} />
      <Sprite start={91.4} end={95.0}><Caption text="We turn insight into clear signals advisors can act on." /></Sprite>
      <Sprite start={95.0} end={98.2}><Caption text="A Knomee Quotient that shows readiness." /></Sprite>
      <Sprite start={98.2} end={102.6}><Caption text="Conversation starters grounded in what matters to them." /></Sprite>
      <Sprite start={102.6} end={107.0}><Caption text="Powered by behavioral science and leading research." /></Sprite>
      <Sprite start={107.0} end={111.0}><Caption text="So advisors don't have to guess what moves someone forward." /></Sprite>
    </div>
  );
}

// ── SCENE 7 — founder POV (Marla) ─────────────────────────────────────────────
// 111–125s.
function Scene7() {
  const t = useT();
  const S = 111;
  const l = t - S;
  const op = interpolate([S - 0.1, S + 0.5], [0, 1], Easing.linear)(t);
  return (
    <div style={{ position: 'absolute', inset: 0, opacity: op }}>
      <MarlaShot l={l} quoteStart={0.8} quoteLines={[
        'Wealth managers want to improve their clients\u2019 lives.',
        'When prospects start with Knomee, advisors understand what matters, where they are, and how to help them move forward.',
        'That clarity changes everything.',
      ]} />
    </div>
  );
}

// ── SCENE 8 — meeting prep ────────────────────────────────────────────────────
// 125–135s. Context, emotional insight, a clear path in.
function Scene8() {
  const t = useT();
  const S = 125;
  const l = t - S;
  const op = interpolate([S - 0.1, S + 0.5], [0, 1], Easing.linear)(t);
  const intro = Easing.easeOutCubic(clamp(l / 0.8, 0, 1));
  const scale = 0.94 + 0.06 * intro;
  const cards = [
    { k: 'CONTEXT', icon: '#7C3AED', text: 'Second-generation family business. Exploring succession.' },
    { k: 'EMOTIONAL INSIGHT', icon: '#2DD2B0', text: 'Wants to feel her family is secure before chasing growth.' },
    { k: 'A CLEAR PATH IN', icon: '#a06bf0', text: 'Open with legacy. Introduce a next-generation plan.' },
  ];
  const cP = (i) => Easing.easeOutCubic(clamp((l - (1.6 + i * 0.7)) / 0.6, 0, 1));
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
              <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.02em', color: '#1b1230' }}>Elena R.</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 20 }}>
            {cards.map((c, i) => {
              const p = cP(i);
              return (
                <div key={i} style={{ flex: 1, opacity: p, transform: `translateY(${(1 - p) * 26}px)`,
                  background: '#faf7ff', border: '1.5px solid #f0e8fc', borderRadius: 22, padding: 28, willChange: 'transform, opacity' }}>
                  <div style={{ width: 46, height: 46, borderRadius: 14, background: c.icon, marginBottom: 20,
                    display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <KnomeeIcon color="#fff" size={26} />
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: '0.14em', color: '#a08fc4', marginBottom: 12 }}>{c.k}</div>
                  <div style={{ fontSize: 25, fontWeight: 600, lineHeight: 1.35, color: '#2b1f47' }}>{c.text}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 300,
        background: 'linear-gradient(to top, rgba(16,3,34,0.85), rgba(16,3,34,0))' }} />
      <Sprite start={125.3} end={129.0}><Caption text="Before the first meeting even happens, advisors have:" /></Sprite>
      <Sprite start={129.0} end={130.9}><Caption text="Context." /></Sprite>
      <Sprite start={130.9} end={132.7}><Caption text="Emotional insight." /></Sprite>
      <Sprite start={132.7} end={135.0}><Caption text="A clear path into the conversation." /></Sprite>
    </div>
  );
}

// ── SCENE 9 — show up different ────────────────────────────────────────────────
// 135–144s. Default portfolio recedes; prepared / relevant / different stamp in.
function Scene9() {
  const t = useT();
  const S = 135;
  const l = t - S;
  const op = interpolate([S - 0.1, S + 0.5], [0, 1], Easing.linear)(t);
  // cold portfolio card recedes
  const recede = Easing.easeInOutCubic(clamp((l - 2.6) / 1.0, 0, 1));
  const words = [
    { w: 'Prepared.', at: 3.5, c: '#fff' },
    { w: 'Relevant.', at: 5.3, c: '#2DD2B0' },
    { w: 'Different.', at: 7.0, c: '#a06bf0' },
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
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 300,
        background: 'linear-gradient(to top, rgba(16,3,34,0.85), rgba(16,3,34,0))' }} />
      <Sprite start={135.3} end={138.4}><Caption text="So instead of defaulting to portfolios —" /></Sprite>
    </div>
  );
}

// ── SCENE 10 — founder POV (Marla) ────────────────────────────────────────────
// 144–153s.
function Scene10() {
  const t = useT();
  const S = 144;
  const l = t - S;
  const op = interpolate([S - 0.1, S + 0.5], [0, 1], Easing.linear)(t);
  return (
    <div style={{ position: 'absolute', inset: 0, opacity: op }}>
      <MarlaShot l={l} quoteStart={0.8} quoteLines={[
        'This is how you build trust faster.',
        'People want to feel understood — and confident in their decisions.',
      ]} />
    </div>
  );
}

// ── SCENE 11 — the lifecycle ──────────────────────────────────────────────────
// 153–169s. Understanding grows across life stages and generations.
function Scene11() {
  const t = useT();
  const S = 153;
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
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 300,
        background: 'linear-gradient(to top, rgba(16,3,34,0.85), rgba(16,3,34,0))' }} />
      <Sprite start={153.3} end={156.6}><Caption text="And it doesn't stop at the first interaction." /></Sprite>
      <Sprite start={156.6} end={161.0}><Caption text="Knomee translates deep understanding over time —" /></Sprite>
      <Sprite start={161.0} end={165.0}><Caption text="so firms engage, adapt, and grow relationships" /></Sprite>
      <Sprite start={165.0} end={169.0}><Caption text="as clients evolve across life stages and generations." /></Sprite>
    </div>
  );
}

// ── SCENE 12 — close (kinetic type) ───────────────────────────────────────────
// 169–181s. Better beginnings → better everything.
function Scene12() {
  const t = useT();
  const S = 169;
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
// 181–189s.
function Scene13() {
  const t = useT();
  const S = 181;
  const l = t - S;
  const op = interpolate([S - 0.1, S + 0.5], [0, 1], Easing.linear)(t);
  const marlaFade = 1 - Easing.easeInOutCubic(clamp((l - 5.6) / 0.7, 0, 1));
  const endP = Easing.easeOutCubic(clamp((l - 6.0) / 0.8, 0, 1));
  return (
    <div style={{ position: 'absolute', inset: 0, opacity: op }}>
      <div style={{ position: 'absolute', inset: 0, opacity: marlaFade }}>
        <MarlaShot l={l} quoteStart={0.8} quoteLines={[
          'We\u2019re not replacing the human side of advice.',
          'We\u2019re making it stronger.',
        ]} />
      </div>
      {/* brand end card */}
      <div style={{ position: 'absolute', inset: 0, opacity: endP, pointerEvents: 'none' }}>
        <WarmField l={l} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: 28, transform: `scale(${0.96 + 0.04 * endP})` }}>
          <KnomeeWordmark iconColor="#2DD2B0" textColor="#fff" height={78} style={{ marginLeft: -40 }} />
          <div style={{ fontFamily: DISPLAY, fontWeight: 500, fontSize: 34, color: '#2DD2B0', letterSpacing: '-0.01em' }}>Know more, grow more.</div>
        </div>
      </div>
    </div>
  );
}

// ── Root ────────────────────────────────────────────────────────────────────
function KnomeeVideo() {
  return (
    <Stage width={1920} height={1080} duration={VIDEO_DURATION} background="#0c1524" persistKey="knomee-video">
      <PlayerBridge />
      <Sprite start={0} end={20.1}><Scene1 /></Sprite>
      <Sprite start={19.9} end={44.05}><Scene2 /></Sprite>
      <Sprite start={43.9} end={51.1}><Scene3 /></Sprite>
      <Sprite start={50.9} end={73.1}><Scene4 /></Sprite>
      <Sprite start={72.9} end={91.1}><Scene5 /></Sprite>
      <Sprite start={90.9} end={111.1}><Scene6 /></Sprite>
      <Sprite start={110.9} end={125.1}><Scene7 /></Sprite>
      <Sprite start={124.9} end={135.1}><Scene8 /></Sprite>
      <Sprite start={134.9} end={144.1}><Scene9 /></Sprite>
      <Sprite start={143.9} end={153.1}><Scene10 /></Sprite>
      <Sprite start={152.9} end={169.1}><Scene11 /></Sprite>
      <Sprite start={168.9} end={181.1}><Scene12 /></Sprite>
      <Sprite start={180.9} end={189}><Scene13 /></Sprite>
    </Stage>
  );
}

Object.assign(window, { KnomeeVideo, Scene1, Scene2, Scene3, Scene4, Scene5, Scene6, Scene7, Scene8, Scene9, Scene10, Scene11, Scene12, Scene13, MarlaShot, WarmField, Chip, ProgressDots, QuotientRing, PROSPECTS, PlayerBridge, SCENES, KnomeeIcon, KnomeeWordmark, StampLabel, FirmCard, CompanyPage, FIRMS, BRAND, COLD, Placeholder, Cursor, Caption, BrowserFrame, ColdLandingPage });
