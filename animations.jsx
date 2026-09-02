// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)

/* BEGIN USAGE */
// animations.jsx — timeline engine. Exports (on window): Stage, Sprite,
//   TextSprite, ImageSprite, RectSprite, VideoSprite, PlaybackBar,
//   useTime, useTimeline, useSprite, Easing, interpolate, animate, clamp.
//
//   <Stage width={1280} height={720} duration={10} background="#f6f4ef">
//     <Sprite start={0} end={3}>
//       <TextSprite text="Hello" x={100} y={300} size={72} color="#111" />
//     </Sprite>
//     <Sprite start={2} end={8}>
//       <ImageSprite src="hero.png" x={200} y={120} width={640} height={360} kenBurns />
//     </Sprite>
//   </Stage>
//
// Stage({width,height,duration,background,fps,loop,autoplay}) — auto-scales to
//   viewport; scrubber + play/pause + ←/→ seek + space + 0-reset; persists
//   playhead. The canvas is an <svg><foreignObject>. The PlaybackBar's
//   download button exports it: it records the tab through getDisplayMedia,
//   cropped to the canvas, and MediaRecorder writes the mp4 — see "Video
//   export" further down for why it records rather than renders.
//   Screenshot tools DOM-rerender (not pixel-capture) and unwrap this wrapper
//   so captures should work — but if one comes back black, that's a capture
//   artifact, not a render bug; trust the live preview.
// Sprite({start,end,keepMounted}) — mounts children only while playhead is in
//   [start,end]. Children read {localTime, progress, duration} via useSprite().
// useTime() → seconds; useTimeline() → {time,duration,playing,setTime,setPlaying}.
// TextSprite({text,x,y,size,color,font,weight,align,entryDur,exitDur}) — fades/scales in+out.
// ImageSprite({src,x,y,width,height,fit,radius,kenBurns,placeholder}) — same, with optional ken-burns.
// RectSprite({x,y,width,height,color,radius}) — solid box with entry/exit.
// VideoSprite({src,start,end,speed,style}) — looped <video> clip synced to the
//   timeline; its audio is mixed into the exported video.
// Easing.{linear,easeIn/Out/InOut Quad/Cubic/Quart/Quint/Expo/Back, …}
// interpolate([t0,t1,…],[v0,v1,…],ease?) → (t)=>v  — piecewise tween.
// animate({from,to,start,end,ease}) → (t)=>v  — single tween.
//
// Build scenes by composing Sprites inside Stage. Absolutely-position elements.
//
// In a .dc.html project, put your scene in a sibling my-scene.jsx (reading
// {Stage, Sprite, useTime, Easing, …} from window is safe) and mount BOTH:
//   <x-import component-from-global-scope="MyScene"
//             from="./animations.jsx ./my-scene.jsx"></x-import>
// The two files in from= load in order, so my-scene.jsx can use the globals
// animations.jsx set.
/* END USAGE */
// ─────────────────────────────────────────────────────────────────────────────

// ── Easing functions (hand-rolled, Popmotion-style) ─────────────────────────
// All easings take t ∈ [0,1] and return eased t ∈ [0,1] (may overshoot for back/elastic).
const Easing = {
  linear: (t) => t,

  // Quad
  easeInQuad:    (t) => t * t,
  easeOutQuad:   (t) => t * (2 - t),
  easeInOutQuad: (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),

  // Cubic
  easeInCubic:    (t) => t * t * t,
  easeOutCubic:   (t) => (--t) * t * t + 1,
  easeInOutCubic: (t) => (t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1),

  // Quart
  easeInQuart:    (t) => t * t * t * t,
  easeOutQuart:   (t) => 1 - (--t) * t * t * t,
  easeInOutQuart: (t) => (t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t),

  // Expo
  easeInExpo:  (t) => (t === 0 ? 0 : Math.pow(2, 10 * (t - 1))),
  easeOutExpo: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
  easeInOutExpo: (t) => {
    if (t === 0) return 0;
    if (t === 1) return 1;
    if (t < 0.5) return 0.5 * Math.pow(2, 20 * t - 10);
    return 1 - 0.5 * Math.pow(2, -20 * t + 10);
  },

  // Sine
  easeInSine:    (t) => 1 - Math.cos((t * Math.PI) / 2),
  easeOutSine:   (t) => Math.sin((t * Math.PI) / 2),
  easeInOutSine: (t) => -(Math.cos(Math.PI * t) - 1) / 2,

  // Back (overshoot)
  easeOutBack: (t) => {
    const c1 = 1.70158, c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  },
  easeInBack: (t) => {
    const c1 = 1.70158, c3 = c1 + 1;
    return c3 * t * t * t - c1 * t * t;
  },
  easeInOutBack: (t) => {
    const c1 = 1.70158, c2 = c1 * 1.525;
    return t < 0.5
      ? (Math.pow(2 * t, 2) * ((c2 + 1) * 2 * t - c2)) / 2
      : (Math.pow(2 * t - 2, 2) * ((c2 + 1) * (t * 2 - 2) + c2) + 2) / 2;
  },

  // Elastic
  easeOutElastic: (t) => {
    const c4 = (2 * Math.PI) / 3;
    if (t === 0) return 0;
    if (t === 1) return 1;
    return Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
  },
};

// ── Core interpolation helpers ──────────────────────────────────────────────

// Clamp a value to [min, max]
const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

// interpolate([0, 0.5, 1], [0, 100, 50], ease?) -> fn(t)
// Popmotion-style: linearly maps t across input keyframes to output values,
// with optional easing per segment (single fn or array of fns).
function interpolate(input, output, ease = Easing.linear) {
  return (t) => {
    if (t <= input[0]) return output[0];
    if (t >= input[input.length - 1]) return output[output.length - 1];
    for (let i = 0; i < input.length - 1; i++) {
      if (t >= input[i] && t <= input[i + 1]) {
        const span = input[i + 1] - input[i];
        const local = span === 0 ? 0 : (t - input[i]) / span;
        const easeFn = Array.isArray(ease) ? (ease[i] || Easing.linear) : ease;
        const eased = easeFn(local);
        return output[i] + (output[i + 1] - output[i]) * eased;
      }
    }
    return output[output.length - 1];
  };
}

// animate({from, to, start, end, ease})(t) — simpler single-segment tween.
// Returns `from` before `start`, `to` after `end`.
function animate({ from = 0, to = 1, start = 0, end = 1, ease = Easing.easeInOutCubic }) {
  return (t) => {
    if (t <= start) return from;
    if (t >= end) return to;
    const local = (t - start) / (end - start);
    return from + (to - from) * ease(local);
  };
}

// ── Timeline context ────────────────────────────────────────────────────────

const TimelineContext = React.createContext({ time: 0, duration: 10, playing: false });

const useTime = () => React.useContext(TimelineContext).time;
const useTimeline = () => React.useContext(TimelineContext);

// ── Sprite ──────────────────────────────────────────────────────────────────
// Renders children only when the playhead is inside [start, end]. Provides
// a sub-context with `localTime` (seconds since start) and `progress` (0..1).
//
//   <Sprite start={2} end={5}>
//     {({ localTime, progress }) => <Thing x={progress * 100} />}
//   </Sprite>
//
// Or as a plain wrapper — children can call useSprite() themselves.

const SpriteContext = React.createContext({ localTime: 0, progress: 0, duration: 0 });
const useSprite = () => React.useContext(SpriteContext);

// A layer that sits over the canvas but OUTSIDE the svg. Anything a browser
// refuses to hardware-composite inside an <svg><foreignObject> — video, in
// practice — can be portalled here and drawn on the normal path instead, while
// keeping a placeholder in the flow so layout is unaffected. Carries the same
// size and scale as the canvas, so stage coordinates mean the same thing in both.
const StageOverlayContext = React.createContext(null);
const useStageOverlay = () => React.useContext(StageOverlayContext);

function Sprite({ start = 0, end = Infinity, children, keepMounted = false }) {
  const { time } = useTimeline();
  const visible = time >= start && time <= end;
  if (!visible && !keepMounted) return null;

  const duration = end - start;
  const localTime = Math.max(0, time - start);
  const progress = duration > 0 && isFinite(duration)
    ? clamp(localTime / duration, 0, 1)
    : 0;

  const value = { localTime, progress, duration, visible };

  return (
    <SpriteContext.Provider value={value}>
      {typeof children === 'function' ? children(value) : children}
    </SpriteContext.Provider>
  );
}

// ── Sample sprite components ────────────────────────────────────────────────

// TextSprite: fades/slides text in on entry, holds, then fades out on exit.
// Props: text, x, y, size, color, font, entryDur, exitDur, align
function TextSprite({
  text,
  x = 0, y = 0,
  size = 48,
  color = '#111',
  font = 'Inter, system-ui, sans-serif',
  weight = 600,
  entryDur = 0.45,
  exitDur = 0.35,
  entryEase = Easing.easeOutBack,
  exitEase = Easing.easeInCubic,
  align = 'left',
  letterSpacing = '-0.01em',
}) {
  const { localTime, duration } = useSprite();
  const exitStart = Math.max(0, duration - exitDur);

  let opacity = 1;
  let ty = 0;

  if (localTime < entryDur) {
    const t = entryEase(clamp(localTime / entryDur, 0, 1));
    opacity = t;
    ty = (1 - t) * 16;
  } else if (localTime > exitStart) {
    const t = exitEase(clamp((localTime - exitStart) / exitDur, 0, 1));
    opacity = 1 - t;
    ty = -t * 8;
  }

  const translateX = align === 'center' ? '-50%' : align === 'right' ? '-100%' : '0';

  return (
    <div style={{
      position: 'absolute',
      left: x, top: y,
      transform: `translate(${translateX}, ${ty}px)`,
      opacity,
      fontFamily: font,
      fontSize: size,
      fontWeight: weight,
      color,
      letterSpacing,
      whiteSpace: 'pre',
      lineHeight: 1.1,
      willChange: 'transform, opacity',
    }}>
      {text}
    </div>
  );
}

// ImageSprite: scales + fades in; optional Ken Burns drift during hold.
function ImageSprite({
  src,
  x = 0, y = 0,
  width = 400, height = 300,
  entryDur = 0.6,
  exitDur = 0.4,
  kenBurns = false,
  kenBurnsScale = 1.08,
  radius = 12,
  fit = 'cover',
  placeholder = null, // {label: string} for striped placeholder
}) {
  const { localTime, duration } = useSprite();
  const exitStart = Math.max(0, duration - exitDur);

  let opacity = 1;
  let scale = 1;

  if (localTime < entryDur) {
    const t = Easing.easeOutCubic(clamp(localTime / entryDur, 0, 1));
    opacity = t;
    scale = 0.96 + 0.04 * t;
  } else if (localTime > exitStart) {
    const t = Easing.easeInCubic(clamp((localTime - exitStart) / exitDur, 0, 1));
    opacity = 1 - t;
    scale = (kenBurns ? kenBurnsScale : 1) + 0.02 * t;
  } else if (kenBurns) {
    const holdSpan = exitStart - entryDur;
    const holdT = holdSpan > 0 ? (localTime - entryDur) / holdSpan : 0;
    scale = 1 + (kenBurnsScale - 1) * holdT;
  }

  const content = placeholder ? (
    <div style={{
      width: '100%', height: '100%',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'repeating-linear-gradient(135deg, #e9e6df 0 10px, #dcd8cf 10px 20px)',
      color: '#6b6458',
      fontFamily: 'JetBrains Mono, ui-monospace, monospace',
      fontSize: 13,
      letterSpacing: '0.04em',
      textTransform: 'uppercase',
    }}>
      {placeholder.label || 'image'}
    </div>
  ) : (
    <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: fit, display: 'block' }} />
  );

  return (
    <div style={{
      position: 'absolute',
      left: x, top: y,
      width, height,
      opacity,
      transform: `scale(${scale})`,
      transformOrigin: 'center',
      borderRadius: radius,
      overflow: 'hidden',
      willChange: 'transform, opacity',
    }}>
      {content}
    </div>
  );
}

// RectSprite: simple rectangle that animates position/size/color via props.
// Useful demo primitive — takes a `render` fn for per-frame customization.
function RectSprite({
  x = 0, y = 0,
  width = 100, height = 100,
  color = '#111',
  radius = 8,
  entryDur = 0.4,
  exitDur = 0.3,
  render, // optional: (ctx) => style overrides
}) {
  const spriteCtx = useSprite();
  const { localTime, duration } = spriteCtx;
  const exitStart = Math.max(0, duration - exitDur);

  let opacity = 1;
  let scale = 1;

  if (localTime < entryDur) {
    const t = Easing.easeOutBack(clamp(localTime / entryDur, 0, 1));
    opacity = clamp(localTime / entryDur, 0, 1);
    scale = 0.4 + 0.6 * t;
  } else if (localTime > exitStart) {
    const t = Easing.easeInQuad(clamp((localTime - exitStart) / exitDur, 0, 1));
    opacity = 1 - t;
    scale = 1 - 0.15 * t;
  }

  const overrides = render ? render(spriteCtx) : {};

  return (
    <div style={{
      position: 'absolute',
      left: x, top: y,
      width, height,
      background: color,
      borderRadius: radius,
      opacity,
      transform: `scale(${scale})`,
      transformOrigin: 'center',
      willChange: 'transform, opacity',
      ...overrides,
    }} />
  );
}


// ── Font inlining ───────────────────────────────────────────────────────────
// Copy every @font-face rule from the page into a <style> inside the svg's
// foreignObject, with font URLs rewritten to data: URLs. Makes the svg
// self-describing so serializing it alone (video export fast path) still
// renders with the right fonts. Sets data-om-fonts-inlined on the svg when
// done so the exporter can wait for it.

function useInlineFontsInto(svgRef) {
  React.useEffect(() => {
    const svg = svgRef.current;
    const host = svg && svg.querySelector('foreignObject > div');
    if (!svg || !host) return;
    let cancelled = false;
    (async () => {
      const rules = [];
      for (const ss of document.styleSheets) {
        let cssRules;
        try { cssRules = ss.cssRules; } catch {
          // Cross-origin sheet without crossorigin attr (e.g. the standard
          // fonts.googleapis.com <link>) — fetch the CSS text directly and
          // regex-extract the @font-face blocks.
          if (ss.href) {
            try {
              const txt = await fetch(ss.href).then(r => { if (!r.ok) throw 0; return r.text(); });
              for (const ff of (txt.match(/@font-face\s*{[^}]*}/g) || []))
                rules.push({ css: ff, base: ss.href });
            } catch {}
          }
          continue;
        }
        if (!cssRules) continue;
        for (const r of cssRules) {
          if (r.type === CSSRule.FONT_FACE_RULE) {
            rules.push({ css: r.cssText, base: ss.href || location.href });
          }
        }
      }
      const toDataURL = (url) => fetch(url)
        .then(r => { if (!r.ok) throw 0; return r.blob(); })
        .then(b => new Promise(res => {
          const fr = new FileReader();
          fr.onload = () => res(fr.result);
          fr.onerror = () => res(url);
          fr.readAsDataURL(b);
        }))
        .catch(() => url);
      const parts = await Promise.all(rules.map(async ({ css, base }) => {
        const re = /url\((['"]?)([^'")]+)\1\)/g;
        let out = css, m;
        while ((m = re.exec(css))) {
          const u = m[2];
          if (u.startsWith('data:')) continue;
          let abs; try { abs = new URL(u, base).href; } catch { continue; }
          out = out.split(m[0]).join(`url("${await toDataURL(abs)}")`);
        }
        return out;
      }));
      if (cancelled || !parts.length) {
        svg.setAttribute('data-om-fonts-inlined', 'true');
        return;
      }
      const style = document.createElement('style');
      style.textContent = parts.join('\n');
      host.insertBefore(style, host.firstChild);
      svg.setAttribute('data-om-fonts-inlined', 'true');
    })();
    return () => { cancelled = true; };
  }, []);
}


function Stage({
  width = 1280,
  height = 720,
  duration = 10,
  background = '#f6f4ef',
  fps = 60,
  loop = true,
  autoplay = true,
  persistKey = 'animstage',
  children,
}) {
  // Props arrive as strings when Stage is mounted via <x-import> (DC
  // projects) — coerce so style={{width}} gets a number React can px-ify.
  width = +width || 1280; height = +height || 720;
  duration = +duration || 10; fps = +fps || 60;
  if (typeof loop === 'string') loop = loop !== 'false';
  if (typeof autoplay === 'string') autoplay = autoplay !== 'false';

  // Always open at the beginning. The playhead used to be written to
  // localStorage on every frame and restored on load, which is right for
  // authoring — reload and carry on where you were — and wrong for anyone
  // opening a link to watch the film. They landed at whatever second the last
  // visit happened to stop at, apparently at random, and with the picture
  // frozen there: the soundtrack owns the clock and its AudioContext stays
  // suspended until the page is interacted with, so nothing advanced until
  // they pressed play themselves.
  const [time, setTime] = React.useState(0);
  const [playing, setPlaying] = React.useState(autoplay);
  const [scale, setScale] = React.useState(1);
  // bumped by an external clock owner so the loop effect re-evaluates
  const [externalClockTick, setExternalClockTick] = React.useState(0);
  React.useEffect(() => {
    const onClaim = () => setExternalClockTick((n) => n + 1);
    window.addEventListener('om-clock-claim', onClaim);
    return () => window.removeEventListener('om-clock-claim', onClaim);
  }, []);

  const stageRef = React.useRef(null);
  const canvasRef = React.useRef(null);
  const [overlayEl, setOverlayEl] = React.useState(null);
  const rafRef = React.useRef(null);
  const lastTsRef = React.useRef(null);

  // Clear any playhead left behind by the version that persisted one, so a
  // returning viewer is not held at an old position by stale storage.
  React.useEffect(() => {
    try { localStorage.removeItem(persistKey + ':t'); } catch {}
  }, [persistKey]);

  // Auto-scale to fit viewport
  React.useEffect(() => {
    if (!stageRef.current) return;
    const el = stageRef.current;
    const measure = () => {
      const barH = 44; // playback bar height
      const s = Math.min(
        el.clientWidth / width,
        (el.clientHeight - barH) / height
      );
      setScale(Math.max(0.05, s));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [width, height]);

  // Animation loop. Skipped when something else owns the clock (e.g. an audio-driven
  // voice-over calling setTime); window.__OM_EXTERNAL_CLOCK is that handshake.
  React.useEffect(() => {
    if (!playing || window.__OM_EXTERNAL_CLOCK) {
      lastTsRef.current = null;
      return;
    }
    const step = (ts) => {
      if (lastTsRef.current == null) lastTsRef.current = ts;
      const dt = (ts - lastTsRef.current) / 1000;
      lastTsRef.current = ts;
      setTime((t) => {
        let next = t + dt;
        if (next >= duration) {
          if (loop) next = next % duration;
          else { next = duration; setPlaying(false); }
        }
        return next;
      });
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastTsRef.current = null;
    };
  }, [playing, duration, loop, externalClockTick]);

  // Keyboard: space = play/pause, ← → = seek
  React.useEffect(() => {
    const onKey = (e) => {
      if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;
      if (e.code === 'Space') {
        e.preventDefault();
        setPlaying(p => !p);
      } else if (e.code === 'ArrowLeft') {
        setTime(t => clamp(t - (e.shiftKey ? 1 : 0.1), 0, duration));
      } else if (e.code === 'ArrowRight') {
        setTime(t => clamp(t + (e.shiftKey ? 1 : 0.1), 0, duration));
      } else if (e.key === '0' || e.code === 'Home') {
        setTime(0);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [duration]);

  // Video-export protocol: the exporter dispatches this event per frame;
  // pause + sync the playhead so the capture sees exactly that timestamp.
  React.useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const onSeek = (e) => {
      setPlaying(false);
      setTime(clamp(e.detail.time, 0, duration));
    };
    el.addEventListener('data-om-seek-to-time-frame', onSeek);
    return () => el.removeEventListener('data-om-seek-to-time-frame', onSeek);
  }, [duration]);

  // Inline @font-face rules into the svg's foreignObject so the svg is
  // self-describing — serializing it alone (for video export) then renders
  // with the right fonts. Sets data-om-fonts-inlined once done.
  useInlineFontsInto(canvasRef);

  // The export loop reads the playhead every 200ms from outside React's render,
  // so it needs the live values rather than the ones closed over at setup.
  const timeRef = React.useRef(time);
  const playingRef = React.useRef(playing);
  timeRef.current = time;
  playingRef.current = playing;
  const exporter = useFilmExport({ duration, canvasRef, timeRef, playingRef, setTime, setPlaying });

  const ctxValue = React.useMemo(
    () => ({ time, duration, playing, setTime, setPlaying }),
    [time, duration, playing]
  );

  const overlayValue = React.useMemo(
    () => ({ el: overlayEl, canvasRef, width, height }),
    [overlayEl, width, height]
  );

  return (
    <div
      ref={stageRef}
      style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center',
        background: '#0a0a0a',
        fontFamily: 'Inter, system-ui, sans-serif',
      }}
    >
      {/* Canvas area — vertically centered in remaining space */}
      <div
        onClick={() => setPlaying(p => !p)}
        style={{
          flex: 1,
          width: '100%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          overflow: 'hidden',
          minHeight: 0,
          position: 'relative',
          cursor: 'pointer',
        }}>
        <svg
          ref={canvasRef}
          width={width} height={height}
          data-om-exportable-video-with-duration-secs={duration}
          style={{
            transform: `scale(${scale})`,
            transformOrigin: 'center',
            flexShrink: 0,
            boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
            display: 'block',
          }}
        >
          <foreignObject x="0" y="0" width="100%" height="100%">
            <div
              xmlns="http://www.w3.org/1999/xhtml"
              style={{
                width, height,
                background,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <TimelineContext.Provider value={ctxValue}>
                <StageOverlayContext.Provider value={overlayValue}>
                  {children}
                </StageOverlayContext.Provider>
              </TimelineContext.Provider>
            </div>
          </foreignObject>
        </svg>

        {/* Parked on the first frame, nothing has happened yet and the film is
            waiting on a click it cannot ask for any other way — a browser will
            not start audible media unhinted. Once it is running, or once anyone
            has scrubbed, the playback bar carries the state and this would only
            be in the way, so it appears at zero and nowhere else. */}
        {!playing && time < 0.05 && !exporter.exporting && (
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            pointerEvents: 'none',
          }}>
            <div style={{
              width: 96, height: 96, borderRadius: '50%',
              background: 'rgba(12,4,30,0.55)',
              backdropFilter: 'blur(6px)',
              border: '1.5px solid rgba(255,255,255,0.5)',
              boxShadow: '0 10px 40px rgba(0,0,0,0.45)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="34" height="34" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8 5.5l11 6.5-11 6.5V5.5z" fill="#fff" />
              </svg>
            </div>
          </div>
        )}

        {/* Same box and scale as the canvas, painted after it. Portalled media
            lands here in stage coordinates and composites normally. */}
        <div
          ref={setOverlayEl}
          data-omelette-overlay
          style={{
            position: 'absolute', left: '50%', top: '50%',
            width, height,
            transform: `translate(-50%, -50%) scale(${scale})`,
            transformOrigin: 'center',
            overflow: 'hidden',
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* Playback bar — stacked below canvas, never overlapping. Region Capture
          crops the recording to the canvas, so this stays out of the file. */}
      <PlaybackBar
        time={time}
        duration={duration}
        playing={playing}
        onPlayPause={() => setPlaying(p => !p)}
        onReset={() => { setTime(0); }}
        onSeek={(t) => setTime(t)}
        exportStatus={exporter.status}
        onExport={exporter.start}
        onCancelExport={exporter.cancel}
      />
    </div>
  );
}

// ── Video export ────────────────────────────────────────────────────────────
// The download button used to post `omelette:request-video-export` at
// window.parent, which is the Claude Design editor and nothing else. Served
// from anywhere but that editor it was a button that did nothing.
//
// This records rather than renders, and the reason is worth stating. The film
// is DOM inside an <svg><foreignObject>, a Web Audio graph with no media
// element behind it, and one h264 <video> portalled on top of the svg rather
// than inside it. Serialising the svg — the route the export scaffolding in
// this file was built for — loses the founder's shot entirely, along with every
// backdrop-filter, and there is no second path from that tree to a canvas. So
// the tab is captured while the film plays and the browser's own h264 and aac
// encoders make the mp4, which is also the only way this page produces a real
// mp4 without carrying an encoder inside it.
//
// What that costs, which the UI also says: it runs in real time, and the tab
// has to stay in front, because a backgrounded tab is throttled and the capture
// drops frames with it.
//
// Region Capture crops the stream to the canvas element, so the playback bar,
// the recording readout and anything the host page draws around the iframe stay
// out of the file. Without it (Safari, Firefox) the whole tab lands in the
// frame, so the UI says that too.

// mp4 first, most specific first: h264 high@5.1 with aac.
//
// Every candidate names its codecs, and bare 'video/mp4' is deliberately not on
// the list. A browser with no h264 encoder still answers true to it and then
// writes vp9 and opus into an mp4 container — a legal ISO file that QuickTime,
// Premiere and most things that are not Chrome will not open. Asking for the
// codecs is what makes the answer mean something; where it comes back no, webm
// is the honest extension for what that browser can actually produce.
const EXPORT_TYPES = [
  'video/mp4;codecs="avc1.640033,mp4a.40.2"',
  'video/mp4;codecs="avc1.4d0028,mp4a.40.2"',
  'video/mp4;codecs="avc1,mp4a.40.2"',
  'video/mp4;codecs=avc1',
  // Chrome only grew mp4 recording in 130. Older builds still get a file.
  'video/webm;codecs="vp9,opus"',
  'video/webm;codecs="vp8,opus"',
  'video/webm',
];

function pickExportType() {
  if (typeof MediaRecorder === 'undefined') return null;
  for (const t of EXPORT_TYPES) {
    try { if (MediaRecorder.isTypeSupported(t)) return t; } catch (e) {}
  }
  return null;
}

const canExport = () => (
  typeof MediaRecorder !== 'undefined' &&
  typeof navigator !== 'undefined' &&
  !!(navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) &&
  pickExportType() !== null
);

// Reports {phase, ...} through `status`: 'arming' | 'recording' | 'saving' |
// 'done' | 'error'. Cleared by cancel(), or a few seconds after it finishes.
function useFilmExport({ duration, canvasRef, timeRef, playingRef, setTime, setPlaying }) {
  const [status, setStatus] = React.useState(null);
  const jobRef = React.useRef(null);

  const teardown = React.useCallback(() => {
    const job = jobRef.current;
    if (!job) return;
    jobRef.current = null;
    clearInterval(job.watch);
    try { if (job.rec && job.rec.state !== 'inactive') job.rec.stop(); } catch (e) {}
    if (job.stream) job.stream.getTracks().forEach((t) => { try { t.stop(); } catch (e) {} });
    try { window.parent.postMessage({ source: 'knomee-video', type: 'knomee:export-end' }, '*'); } catch (e) {}
  }, []);

  const cancel = React.useCallback(() => {
    const job = jobRef.current;
    if (job) job.cancelled = true;
    teardown();
    setPlaying(false);
    setStatus(null);
  }, [teardown, setPlaying]);

  const start = React.useCallback(async () => {
    if (jobRef.current) return;
    const mime = pickExportType();
    if (!mime) {
      setStatus({ phase: 'error', note: 'This browser cannot record video.' });
      return;
    }

    // getDisplayMedia has to be the first thing the click does — anything
    // awaited before it spends the user gesture and the call is rejected.
    let stream;
    try {
      stream = await navigator.mediaDevices.getDisplayMedia({
        preferCurrentTab: true,
        video: { frameRate: 30, width: { ideal: 1920 }, height: { ideal: 1080 } },
        audio: { channelCount: 2, echoCancellation: false, noiseSuppression: false, autoGainControl: false },
      });
    } catch (e) {
      // The picker was dismissed. Not an error worth a message.
      return;
    }

    const job = { stream, rec: null, chunks: [], watch: null, cancelled: false, cropped: false };
    jobRef.current = job;
    setStatus({ phase: 'arming' });
    try { window.parent.postMessage({ source: 'knomee-video', type: 'knomee:export-start' }, '*'); } catch (e) {}

    const track = stream.getVideoTracks()[0];
    // Stopping the share from the browser's own bar ends the export.
    if (track) track.addEventListener('ended', () => finish());

    // Crop to the canvas so none of the chrome is in the file.
    try {
      const CT = window.CropTarget || window.RestrictionTarget;
      if (CT && CT.fromElement && track && track.cropTo && canvasRef.current) {
        await track.cropTo(await CT.fromElement(canvasRef.current));
        job.cropped = true;
      }
    } catch (e) { job.cropped = false; }

    const hasAudio = stream.getAudioTracks().length > 0;

    // What the file will actually be. A cropped capture is the canvas at its
    // rendered size in device pixels, so the answer is the window: on a HiDPI
    // screen a maximised one is already past 1080p, on a small one it is not,
    // and there is no upscaling to be had. Better to say the number than to
    // promise "highest quality" and hand back 900p.
    const dpr = window.devicePixelRatio || 1;
    const src = job.cropped && canvasRef.current
      ? canvasRef.current.getBoundingClientRect()
      : { width: window.innerWidth, height: window.innerHeight };
    const fit = Math.min(1, 1920 / (src.width * dpr), 1080 / (src.height * dpr));
    const outW = Math.round(src.width * dpr * fit);
    const outH = Math.round(src.height * dpr * fit);

    let rec;
    try {
      rec = new MediaRecorder(stream, {
        mimeType: mime,
        videoBitsPerSecond: 24000000,
        audioBitsPerSecond: 192000,
      });
    } catch (e) {
      teardown();
      setStatus({ phase: 'error', note: 'This browser refused to record: ' + e.message });
      return;
    }
    job.rec = rec;

    rec.ondataavailable = (e) => { if (e.data && e.data.size) job.chunks.push(e.data); };
    rec.onerror = () => {
      teardown();
      setStatus({ phase: 'error', note: 'Recording stopped early.' });
    };
    rec.onstop = () => {
      if (job.cancelled) return;
      // What the recorder settled on, not what was asked for.
      const actual = rec.mimeType || mime;
      const ext = actual.indexOf('mp4') >= 0 ? 'mp4' : 'webm';
      const blob = new Blob(job.chunks, { type: actual.split(';')[0] });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'knomee-conversion-intelligence.' + ext;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(a.href), 60000);
      setStatus({
        phase: 'done', ext,
        mb: Math.round(blob.size / 1e5) / 10,
        note: !hasAudio ? 'No audio — "Share tab audio" was left unticked.'
            : ext === 'mp4' ? null
            : 'This browser has no h264 encoder, so the file is WebM.',
      });
      setTimeout(() => setStatus((s) => (s && s.phase === 'done' ? null : s)), 9000);
    };

    const finish = () => {
      const j = jobRef.current;
      if (!j || j.cancelled) return;
      setStatus({ phase: 'saving' });
      setPlaying(false);
      teardown();
    };

    // Park on the first frame and let it settle — the founder's clip lands its
    // trim on a media event, so starting the recorder in the same tick as the
    // seek can catch the shot mid-load.
    setPlaying(false);
    setTime(0);
    await new Promise((r) => setTimeout(r, 900));
    if (job.cancelled) return;

    rec.start(2000);
    setPlaying(true);

    let started = false;
    job.watch = setInterval(() => {
      const t = timeRef.current;
      if (!started && (playingRef.current || t > 0.2)) started = true;
      setStatus((s) => (s && s.phase === 'recording'
        ? { ...s, t }
        : { phase: 'recording', t, cropped: job.cropped, w: outW, h: outH }));
      // The soundtrack owns the clock and parks the playhead on the last frame,
      // so the film ending is playing going false at the end, not at zero.
      if (started && (t >= duration - 0.05 || !playingRef.current)) {
        clearInterval(job.watch);
        job.watch = null;
        setTimeout(finish, 600);   // let the tail frames reach the encoder
      }
    }, 200);
  }, [duration, canvasRef, timeRef, playingRef, setTime, setPlaying, teardown]);

  React.useEffect(() => teardown, [teardown]);

  return { status, start, cancel, exporting: !!status && status.phase !== 'done' && status.phase !== 'error' };
}

// ── Playback bar ────────────────────────────────────────────────────────────
// Play/pause, return-to-begin, scrub track, time display.
// Uses fixed-width time fields so layout doesn't thrash.

function PlaybackBar({ time, duration, playing, onPlayPause, onReset, onSeek,
                       exportStatus, onExport, onCancelExport }) {
  const trackRef = React.useRef(null);
  const [dragging, setDragging] = React.useState(false);

  const timeFromEvent = React.useCallback((e) => {
    const rect = trackRef.current.getBoundingClientRect();
    const x = clamp((e.clientX - rect.left) / rect.width, 0, 1);
    return x * duration;
  }, [duration]);

  // Scrubbing only follows the pointer while the track is held down —
  // moving across it without pressing leaves the playhead where it is.
  const onTrackMove = (e) => {
    if (!dragging || !trackRef.current) return;
    onSeek(timeFromEvent(e));
  };

  const onTrackDown = (e) => {
    setDragging(true);
    onSeek(timeFromEvent(e));
  };

  React.useEffect(() => {
    if (!dragging) return;
    const onUp = () => setDragging(false);
    const onMove = (e) => {
      if (!trackRef.current) return;
      const t = timeFromEvent(e);
      onSeek(t);
    };
    window.addEventListener('mouseup', onUp);
    window.addEventListener('mousemove', onMove);
    return () => {
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('mousemove', onMove);
    };
  }, [dragging, timeFromEvent, onSeek]);

  const pct = duration > 0 ? (time / duration) * 100 : 0;
  const fmt = (t) => {
    const total = Math.max(0, t);
    const m = Math.floor(total / 60);
    const s = Math.floor(total % 60);
    const cs = Math.floor((total * 100) % 100);
    return `${String(m).padStart(1, '0')}:${String(s).padStart(2, '0')}.${String(cs).padStart(2, '0')}`;
  };

  const mono = 'JetBrains Mono, ui-monospace, SFMono-Regular, monospace';

  const shell = {
    display: 'flex', alignItems: 'center', gap: 12,
    padding: '8px 16px',
    background: 'rgba(20,20,20,0.92)',
    borderTop: '1px solid rgba(255,255,255,0.08)',
    width: '100%',
    maxWidth: 680,
    alignSelf: 'center',
    borderRadius: 8,
    color: '#f6f4ef',
    fontFamily: 'Inter, system-ui, sans-serif',
    userSelect: 'none',
    flexShrink: 0,
  };

  // While a recording is running the bar becomes the readout, because the
  // transport is not usable during one — seeking would seek the recording.
  if (exportStatus) {
    const s = exportStatus;
    const line =
      s.phase === 'arming'    ? 'Getting ready…'
    : s.phase === 'recording' ? `Recording  ${fmt(s.t || 0)} / ${fmt(duration)}   ${s.w}×${s.h}`
    : s.phase === 'saving'    ? 'Encoding…'
    : s.phase === 'done'      ? `Saved  ${s.ext.toUpperCase()}  ·  ${s.mb} MB`
    : s.note || 'Export failed.';
    const hint =
      s.phase !== 'recording' ? s.note
      // The capture is the canvas at its rendered size, so a small window is a
      // small file and saying it now beats finding out in three minutes.
      : (s.w < 1900 ? 'Cancel and make the window bigger for a larger file. ' : '')
        + (s.cropped ? 'Keep this tab in front — a background tab drops frames.'
                     : 'Keep this tab in front. This browser cannot crop the capture, so everything on screen is in the file.');
    const dot = s.phase === 'error' ? '#ff6b6b' : s.phase === 'done' ? '#2DD2B0' : '#ff5f57';
    return (
      <div data-omelette-chrome style={{ ...shell, alignItems: 'flex-start' }}>
        <div style={{ width: 9, height: 9, borderRadius: '50%', background: dot, flexShrink: 0, marginTop: 5 }} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 12, fontFamily: mono, fontVariantNumeric: 'tabular-nums' }}>{line}</div>
          {hint && <div style={{ fontSize: 11, color: 'rgba(246,244,239,0.5)', marginTop: 3 }}>{hint}</div>}
        </div>
        {(s.phase === 'arming' || s.phase === 'recording') && (
          <button
            onClick={onCancelExport}
            style={{ background: 'none', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 6,
              color: 'rgba(246,244,239,0.75)', fontSize: 11, padding: '4px 10px', cursor: 'pointer',
              fontFamily: 'inherit', flexShrink: 0 }}
          >Cancel</button>
        )}
      </div>
    );
  }

  return (
    <div data-omelette-chrome style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '8px 16px',
      background: 'rgba(20,20,20,0.92)',
      borderTop: '1px solid rgba(255,255,255,0.08)',
      width: '100%',
      maxWidth: 680,
      alignSelf: 'center',

      borderRadius: 8,
      color: '#f6f4ef',
      fontFamily: 'Inter, system-ui, sans-serif',
      userSelect: 'none',
      flexShrink: 0,
    }}>
      <IconButton onClick={onReset} title="Return to start (0)">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M3 2v10M12 2L5 7l7 5V2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round"/>
        </svg>
      </IconButton>
      <IconButton onClick={onPlayPause} title="Play/pause (space)">
        {playing ? (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <rect x="3" y="2" width="3" height="10" fill="currentColor"/>
            <rect x="8" y="2" width="3" height="10" fill="currentColor"/>
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 2l9 5-9 5V2z" fill="currentColor"/>
          </svg>
        )}
      </IconButton>

      {/* Current time: fixed width so it doesn't thrash */}
      <div style={{
        fontFamily: mono,
        fontSize: 12,
        fontVariantNumeric: 'tabular-nums',
        width: 64, textAlign: 'right',
        color: '#f6f4ef',
      }}>
        {fmt(time)}
      </div>

      {/* Scrub track */}
      <div
        ref={trackRef}
        onMouseMove={onTrackMove}
        onMouseDown={onTrackDown}
        style={{
          flex: 1,
          height: 22,
          position: 'relative',
          cursor: 'pointer',
          display: 'flex', alignItems: 'center',
        }}
      >
        <div style={{
          position: 'absolute',
          left: 0, right: 0, height: 4,
          background: 'rgba(255,255,255,0.12)',
          borderRadius: 2,
        }}/>
        <div style={{
          position: 'absolute',
          left: 0, width: `${pct}%`, height: 4,
          background: 'oklch(72% 0.12 250)',
          borderRadius: 2,
        }}/>
        <div style={{
          position: 'absolute',
          left: `${pct}%`, top: '50%',
          width: 12, height: 12,
          marginLeft: -6, marginTop: -6,
          background: '#fff',
          borderRadius: 6,
          boxShadow: '0 2px 4px rgba(0,0,0,0.4)',
        }}/>
      </div>

      {/* Duration: fixed width */}
      <div style={{
        fontFamily: mono,
        fontSize: 12,
        fontVariantNumeric: 'tabular-nums',
        width: 64, textAlign: 'left',
        color: 'rgba(246,244,239,0.55)',
      }}>
        {fmt(duration)}
      </div>

      {canExport() && (
        <IconButton
          title="Export video — records this tab while the film plays, in real time"
          onClick={onExport}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 2v7m0 0L4 6m3 3l3-3M2 12h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </IconButton>
      )}
    </div>
  );
}

function IconButton({ children, onClick, title }) {
  const [hover, setHover] = React.useState(false);
  return (
    <button
      onClick={onClick}
      title={title}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: 28, height: 28,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: hover ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 6,
        color: '#f6f4ef',
        cursor: 'pointer',
        padding: 0,
        transition: 'background 120ms',
      }}
    >
      {children}
    </button>
  );
}


// ── VideoSprite ─────────────────────────────────────────────────────────────
// Renders a <video> that loops within [start,end] of its source at `speed`,
// kept in sync with the Stage's playhead. Carries the
// data-om-exportable-video-play-* attrs so video export can mix its audio.
//
//   <VideoSprite src="clip.mp4" start={2} end={5} speed={1}
//     style={{ width: 640, height: 360 }} />

function VideoSprite({ src, start = 0, end, speed = 1, style, ...rest }) {
  start = +start || 0; speed = +speed || 1;
  if (end != null) end = +end || undefined;
  const t = useTime();
  const ref = React.useRef(null);
  const span = Math.max(0.001, ((end ?? start + 1) - start));
  React.useEffect(() => {
    const v = ref.current;
    if (!v || v.readyState < 1) return;
    const target = start + ((t * speed) % span);
    if (Math.abs(v.currentTime - target) > 0.05) v.currentTime = target;
  }, [t, start, span, speed]);
  return (
    <video
      ref={ref}
      src={src}
      muted playsInline preload="auto"
      data-om-exportable-video-play-start={start}
      data-om-exportable-video-play-end={end ?? start + span}
      data-om-exportable-video-play-speed={speed}
      style={{ display: 'block', objectFit: 'cover', ...style }}
      {...rest}
    />
  );
}


Object.assign(window, {
  StageOverlayContext, useStageOverlay,
  Easing, interpolate, animate, clamp,
  TimelineContext, useTime, useTimeline,
  Sprite, SpriteContext, useSprite,
  TextSprite, ImageSprite, RectSprite, VideoSprite,
  Stage, PlaybackBar,
});

