/* @ds-bundle: {"format":4,"namespace":"KnomeeDesignSystem_0c2355","components":[{"name":"Avatar","sourcePath":"components/core/Avatar.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Chip","sourcePath":"components/core/Chip.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Input","sourcePath":"components/core/Input.jsx"},{"name":"Dialog","sourcePath":"components/feedback/Dialog.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"Accordion","sourcePath":"components/navigation/Accordion.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"},{"name":"FeatureCard","sourcePath":"components/product/FeatureCard.jsx"},{"name":"KQBadge","sourcePath":"components/product/KQBadge.jsx"},{"name":"SentimentDots","sourcePath":"components/product/SentimentDots.jsx"},{"name":"StatusBadge","sourcePath":"components/product/StatusBadge.jsx"}],"sourceHashes":{"components/core/Avatar.jsx":"c31bd786151c","components/core/Badge.jsx":"6105c67f1f01","components/core/Button.jsx":"8c9a5b514993","components/core/Card.jsx":"12c51f459b13","components/core/Chip.jsx":"023f6c94609f","components/core/IconButton.jsx":"300150b42e24","components/core/Input.jsx":"1edddd24a2f8","components/feedback/Dialog.jsx":"bade1d83cd90","components/feedback/Toast.jsx":"0430ed4594a6","components/navigation/Accordion.jsx":"f7e67632dc91","components/navigation/Tabs.jsx":"1a9e983676e6","components/product/FeatureCard.jsx":"60ce14d55590","components/product/KQBadge.jsx":"4d6bfd722849","components/product/SentimentDots.jsx":"58a55aa17bb8","components/product/StatusBadge.jsx":"9d1eb7c8ebba","ui_kits/advisor/AdvisorApp.jsx":"126b17e08407","ui_kits/advisor/data.js":"148a27804876","ui_kits/onboarding/OnboardingApp.jsx":"4c2ec184c442"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.KnomeeDesignSystem_0c2355 = window.KnomeeDesignSystem_0c2355 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Avatar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SZ = {
  sm: 32,
  md: 40,
  lg: 56
};

/**
 * Circular initials avatar. Default is a pearl/slate chip; 'gradient'
 * tones mimic the product's photo-placeholder fills.
 */
function Avatar({
  initials = '',
  size = 'md',
  tone = 'default',
  src,
  style = {},
  ...rest
}) {
  const d = typeof size === 'number' ? size : SZ[size];
  const tones = {
    default: {
      background: 'var(--k-pearl)',
      color: 'var(--k-slate)'
    },
    plum: {
      background: 'var(--k-plum)',
      color: 'var(--k-white)'
    },
    grape: {
      background: 'linear-gradient(135deg,#e0c3fc,#c084fc)',
      color: 'var(--k-white)'
    },
    peach: {
      background: 'linear-gradient(135deg,#f4d4ba,#e8b990)',
      color: 'var(--k-white)'
    }
  };
  const base = {
    width: d,
    height: d,
    borderRadius: 'var(--radius-round)',
    flexShrink: 0,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'var(--font-sans)',
    fontWeight: 600,
    fontSize: Math.round(d * 0.4),
    overflow: 'hidden',
    ...tones[tone],
    ...style
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: base
  }, rest), src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: initials,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }) : initials);
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Small pill label. tone 'new' is the lime tag; 'soft' the grape-light
 * chip; 'outline' a bordered status pill.
 */
function Badge({
  tone = 'soft',
  children,
  style = {},
  ...rest
}) {
  const tones = {
    new: {
      background: 'var(--k-lime)',
      color: 'var(--k-black)',
      border: 'none'
    },
    soft: {
      background: 'var(--k-grape-light)',
      color: 'var(--k-plum)',
      border: 'none'
    },
    plum: {
      background: 'var(--k-plum)',
      color: 'var(--k-white)',
      border: 'none'
    },
    outline: {
      background: 'transparent',
      color: 'var(--k-body)',
      border: '1.5px solid var(--k-stone)'
    },
    warning: {
      background: 'transparent',
      color: 'var(--k-amber-ink)',
      border: '1.5px solid var(--k-amber)'
    }
  };
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    padding: '3px 10px',
    borderRadius: 'var(--radius-pill)',
    fontFamily: 'var(--font-sans)',
    fontSize: '12px',
    fontWeight: 500,
    lineHeight: 1.4,
    whiteSpace: 'nowrap',
    ...tones[tone],
    ...style
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: base
  }, rest), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const PAD = {
  sm: '0 16px',
  md: '0 22px',
  lg: '0 40px'
};
const H = {
  sm: '36px',
  md: '44px',
  lg: '52px'
};
const FS = {
  sm: '14px',
  md: '14px',
  lg: '17px'
};

/**
 * Knomee primary button. Plum by default; pill shape for consumer
 * surfaces, rounded (8px) for the advisor app.
 */
function Button({
  variant = 'primary',
  shape = 'rounded',
  size = 'md',
  icon = null,
  iconRight = null,
  disabled = false,
  full = false,
  children,
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const base = {
    display: full ? 'flex' : 'inline-flex',
    width: full ? '100%' : undefined,
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    height: H[size],
    padding: PAD[size],
    fontFamily: 'var(--font-sans)',
    fontSize: FS[size],
    fontWeight: 600,
    lineHeight: 1,
    borderRadius: shape === 'pill' ? 'var(--radius-pill)' : 'var(--radius-md)',
    border: '1px solid transparent',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.4 : 1,
    whiteSpace: 'nowrap',
    transition: 'background .2s, color .2s, border-color .2s, transform .1s, box-shadow .2s'
  };
  const V = {
    primary: {
      background: 'var(--action-primary)',
      color: 'var(--text-inverse)',
      borderColor: 'var(--action-primary)'
    },
    secondary: {
      background: 'var(--surface-card)',
      color: 'var(--k-plum)',
      border: (shape === 'pill' ? '2px' : '1px') + ' solid var(--k-plum)'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--k-plum)'
    },
    accent: {
      background: 'var(--action-accent)',
      color: 'var(--text-inverse)',
      borderColor: 'var(--action-accent)'
    }
  };
  const HV = {
    primary: {
      background: 'var(--action-primary-hover)',
      borderColor: 'var(--action-primary-hover)',
      transform: 'var(--lift)'
    },
    secondary: {
      borderColor: 'var(--k-grape)',
      color: 'var(--k-grape)'
    },
    ghost: {
      background: 'var(--k-plum-050)'
    },
    accent: {
      background: 'var(--action-accent-hover)',
      borderColor: 'var(--action-accent-hover)',
      transform: 'var(--lift)'
    }
  };
  const s = {
    ...base,
    ...V[variant],
    ...(hover && !disabled ? HV[variant] : {}),
    ...style
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    style: s,
    disabled: disabled,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false)
  }, rest), icon, children, iconRight);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Base Knomee surface: white, hairline border, soft radius. Optional
 * colored accent bar along the bottom (the grape bar on feature cards).
 */
function Card({
  accentBar = false,
  radius = 'xl',
  pad = 24,
  elevated = false,
  children,
  style = {},
  ...rest
}) {
  const R = {
    lg: 'var(--radius-lg)',
    xl: 'var(--radius-xl)',
    '2xl': 'var(--radius-2xl)'
  };
  const barColor = accentBar === true ? 'var(--k-grape-bar)' : accentBar;
  const base = {
    position: 'relative',
    overflow: 'hidden',
    background: 'var(--surface-card)',
    border: '1px solid var(--border-soft, var(--k-border-soft))',
    borderRadius: R[radius] || radius,
    padding: typeof pad === 'number' ? pad + 'px' : pad,
    paddingBottom: accentBar ? 'calc(' + (typeof pad === 'number' ? pad + 'px' : pad) + ' + 6px)' : undefined,
    boxShadow: elevated ? 'var(--shadow-card)' : 'var(--shadow-sm)',
    ...style
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    style: base
  }, rest), children, accentBar && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      height: 'var(--accent-bar-h)',
      background: barColor,
      borderBottomLeftRadius: 'inherit',
      borderBottomRightRadius: 'inherit'
    }
  }));
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Chip.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Selectable pill chip. On the plum brand panel use tone="onDark";
 * on light adventure screens use tone="plum". Static info chips: selectable={false}.
 */
function Chip({
  selected = false,
  tone = 'plum',
  selectable = true,
  children,
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '9px 18px',
    borderRadius: 'var(--radius-pill)',
    fontFamily: 'var(--font-sans)',
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: 1,
    cursor: selectable ? 'pointer' : 'default',
    userSelect: 'none',
    border: '1.5px solid',
    transition: 'background .15s, color .15s, border-color .15s, transform .15s, box-shadow .15s'
  };
  const tones = {
    plum: {
      rest: {
        background: 'var(--surface-card)',
        color: 'var(--k-plum)',
        borderColor: 'var(--k-plum)'
      },
      hover: {
        background: 'var(--k-plum-050)'
      },
      on: {
        background: 'var(--k-plum)',
        color: 'var(--k-white)',
        borderColor: 'var(--k-plum)',
        boxShadow: '0 4px 16px rgba(36,4,70,0.25)'
      }
    },
    onDark: {
      rest: {
        background: 'rgba(255,255,255,0.1)',
        color: 'rgba(255,255,255,0.8)',
        borderColor: 'rgba(255,255,255,0.3)'
      },
      hover: {
        background: 'rgba(255,255,255,0.18)',
        color: '#fff',
        borderColor: 'rgba(255,255,255,0.55)',
        transform: 'translateY(-2px)'
      },
      on: {
        background: '#fff',
        color: '#3d1a65',
        borderColor: '#fff',
        transform: 'scale(1.03)',
        boxShadow: '0 4px 16px rgba(0,0,0,0.15)'
      }
    },
    soft: {
      rest: {
        background: 'var(--surface-card)',
        color: 'var(--k-body)',
        borderColor: 'var(--k-stone)'
      },
      hover: {
        borderColor: 'var(--k-slate)'
      },
      on: {
        background: 'var(--k-plum)',
        color: '#fff',
        borderColor: 'var(--k-plum)'
      }
    }
  };
  const t = tones[tone] || tones.plum;
  const s = {
    ...base,
    ...t.rest,
    ...(selected ? t.on : hover && selectable ? t.hover : {}),
    ...style
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    style: s,
    role: selectable ? 'button' : undefined,
    "aria-pressed": selectable ? selected : undefined,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false)
  }, rest), children);
}
Object.assign(__ds_scope, { Chip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Chip.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SZ = {
  sm: 36,
  md: 40,
  lg: 44
};

/**
 * Square/round icon-only button. 'bolt' is the violet convert action,
 * 'kebab' the round overflow control, 'ghost' a bare icon.
 */
function IconButton({
  variant = 'ghost',
  size = 'md',
  disabled = false,
  round = false,
  label,
  children,
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const d = SZ[size];
  const base = {
    width: d,
    height: d,
    flexShrink: 0,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    borderRadius: round || variant === 'kebab' ? 'var(--radius-round)' : 'var(--radius-md)',
    transition: 'background .15s, color .15s, transform .1s'
  };
  const V = {
    bolt: {
      background: disabled ? 'var(--k-pearl)' : 'var(--action-bolt)',
      color: disabled ? 'var(--k-ash)' : 'var(--k-white)'
    },
    kebab: {
      background: 'transparent',
      color: 'var(--k-ash)'
    },
    ghost: {
      background: 'transparent',
      color: 'currentColor'
    },
    brand: {
      background: 'transparent',
      color: 'var(--k-white)'
    }
  };
  const HV = {
    bolt: disabled ? {} : {
      background: 'var(--action-bolt-hover)'
    },
    kebab: {
      background: 'var(--k-pearl)',
      color: 'var(--k-slate)'
    },
    ghost: {
      background: 'var(--k-plum-050)'
    },
    brand: {
      background: 'rgba(255,255,255,0.12)'
    }
  };
  const s = {
    ...base,
    ...V[variant],
    ...(hover && !disabled ? HV[variant] : {}),
    ...style
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    style: s,
    disabled: disabled,
    "aria-label": label,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false)
  }, rest), children);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Text input with Knomee styling. Optional label, leading icon, and a
 * built-in search-magnifier affordance.
 */
function Input({
  label,
  search = false,
  icon = null,
  radius = 'md',
  style = {},
  wrapStyle = {},
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const R = {
    md: 'var(--radius-md)',
    lg: 'var(--radius-lg)',
    pill: 'var(--radius-pill)'
  };
  const field = {
    width: '100%',
    height: 'var(--control-h)',
    padding: '0 14px',
    paddingLeft: icon ? '42px' : '14px',
    paddingRight: search ? '42px' : '14px',
    border: '1.5px solid ' + (focus ? 'var(--k-grape)' : 'var(--border-default)'),
    borderRadius: R[radius],
    background: 'var(--surface-card)',
    fontFamily: 'var(--font-sans)',
    fontSize: '14px',
    color: 'var(--k-ink)',
    outline: 'none',
    transition: 'border-color .15s',
    ...style
  };
  const mag = "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23afafaf' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><circle cx='11' cy='11' r='8'/><path d='m21 21-4.3-4.3'/></svg>\")";
  const bg = search ? {
    backgroundImage: mag,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 14px center',
    backgroundSize: '18px'
  } : {};
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '6px',
      ...wrapStyle
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-label)',
      color: 'var(--k-body)'
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      display: 'block'
    }
  }, icon && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: '14px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: 'var(--k-ash)',
      display: 'inline-flex'
    }
  }, icon), /*#__PURE__*/React.createElement("input", _extends({
    style: {
      ...field,
      ...bg
    },
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false)
  }, rest))));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Input.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Dialog.jsx
try { (() => {
/**
 * Centered modal with the plum title bar, blurred backdrop, and a
 * footer action row. Advisor "Convert to Client" confirmation pattern.
 */
function Dialog({
  open,
  title,
  onClose,
  footer = null,
  children,
  width = 500
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    onClick: e => {
      if (e.target === e.currentTarget) onClose && onClose();
    },
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 100,
      padding: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--backdrop)',
      backdropFilter: 'blur(var(--backdrop-blur))',
      WebkitBackdropFilter: 'blur(var(--backdrop-blur))'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width,
      maxWidth: '100%',
      background: 'var(--surface-card)',
      borderRadius: '9px',
      overflow: 'hidden',
      boxShadow: 'var(--shadow-lg)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '60px',
      padding: '0 24px',
      background: 'var(--k-plum)'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      font: '700 24px var(--font-sans)',
      color: 'var(--k-white)'
    }
  }, title), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Close",
    style: {
      width: 32,
      height: 32,
      border: 'none',
      background: 'none',
      cursor: 'pointer',
      color: '#fff',
      opacity: 0.9,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "18",
    y1: "6",
    x2: "6",
    y2: "18"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "6",
    y1: "6",
    x2: "18",
    y2: "18"
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '24px',
      color: 'var(--k-ink)',
      fontFamily: 'var(--font-sans)',
      fontSize: '14px',
      lineHeight: 1.5
    }
  }, children), footer && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '12px',
      justifyContent: 'flex-end',
      alignItems: 'center',
      padding: '16px 24px 24px'
    }
  }, footer)));
}
Object.assign(__ds_scope, { Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Dialog.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Toast.jsx
try { (() => {
/**
 * Confirmation toast. 'dark' is the pill that slides up bottom-right on
 * the Clients screen; 'light' is the bordered top-right variant.
 */
function Toast({
  show = true,
  tone = 'dark',
  children,
  style = {}
}) {
  const dark = tone === 'dark';
  const base = dark ? {
    position: 'fixed',
    bottom: '32px',
    right: '32px',
    zIndex: 600,
    background: '#1c1c1e',
    color: '#fff',
    borderRadius: '14px',
    padding: '16px 22px',
    boxShadow: 'var(--shadow-pop)',
    transform: show ? 'translateY(0)' : 'translateY(calc(100% + 48px))',
    opacity: show ? 1 : 0,
    transition: 'transform .38s var(--ease-standard), opacity .3s ease'
  } : {
    position: 'fixed',
    top: '20px',
    right: '20px',
    zIndex: 200,
    background: 'var(--surface-card)',
    border: '1px solid var(--border-hairline)',
    borderRadius: 'var(--radius-md)',
    padding: '14px 18px',
    boxShadow: 'var(--shadow-md)',
    color: 'var(--k-ink)',
    opacity: show ? 1 : 0,
    transition: 'opacity .25s'
  };
  const dot = {
    width: dark ? 26 : 20,
    height: dark ? 26 : 20,
    borderRadius: '50%',
    flexShrink: 0,
    background: 'var(--k-green-lime)',
    color: '#fff',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center'
  };
  return /*#__PURE__*/React.createElement("div", {
    role: "status",
    "aria-live": "polite",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: dark ? '14px' : '10px',
      fontFamily: 'var(--font-sans)',
      fontSize: dark ? '15px' : '14px',
      fontWeight: 600,
      whiteSpace: 'nowrap',
      ...base,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: dot
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#fff",
    strokeWidth: "3",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "20 6 9 17 4 12"
  }))), children);
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Toast.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Accordion.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Collapsible section header (advisor "Top Line Metrics" / "Actionable
 * Insights"). Icon + title on the left, SHOW MORE/LESS + chevron on the right.
 */
function Accordion({
  icon = null,
  title,
  defaultOpen = false,
  children,
  style = {},
  ...rest
}) {
  const [open, setOpen] = React.useState(defaultOpen);
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      marginBottom: '12px',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    onClick: () => setOpen(o => !o),
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      border: '1px solid var(--border-hairline)',
      borderRadius: 'var(--radius-md)',
      padding: '14px 20px',
      background: 'var(--surface-sunken)',
      cursor: 'pointer',
      userSelect: 'none'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      fontWeight: 600,
      fontSize: '15px',
      color: 'var(--k-ink)'
    }
  }, icon, title), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      color: 'var(--k-slate)',
      fontSize: '12px',
      letterSpacing: '1px'
    }
  }, open ? 'SHOW LESS' : 'SHOW MORE', /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      transform: open ? 'rotate(180deg)' : 'none',
      transition: 'transform .2s'
    }
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "6 9 12 15 18 9"
  })))), open && children && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '16px 4px 4px'
    }
  }, children));
}
Object.assign(__ds_scope, { Accordion });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Accordion.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Underline tab bar (advisor Prospects / Clients). Controlled via
 * value + onChange; each tab is { value, label }.
 */
function Tabs({
  tabs = [],
  value,
  onChange,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      borderBottom: '1px solid var(--border-hairline)',
      ...style
    }
  }, rest), tabs.map(t => {
    const active = t.value === value;
    return /*#__PURE__*/React.createElement("button", {
      key: t.value,
      onClick: () => onChange && onChange(t.value),
      style: {
        padding: '14px 24px',
        marginBottom: '-1px',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        fontFamily: 'var(--font-sans)',
        fontSize: '16px',
        fontWeight: 600,
        letterSpacing: '0.5px',
        color: active ? 'var(--k-plum)' : 'var(--k-slate)',
        borderBottom: '2px solid ' + (active ? 'var(--k-plum)' : 'transparent'),
        transition: 'color .15s'
      }
    }, t.label);
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// components/product/FeatureCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * "What you'll get" onboarding card: an icon, a title, a short body,
 * and the grape accent bar. Built on Card.
 */
function FeatureCard({
  icon = null,
  title,
  children,
  accent = true,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement(__ds_scope.Card, _extends({
    accentBar: accent,
    radius: "xl",
    pad: 20,
    style: {
      display: 'flex',
      flexDirection: 'column',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '12px',
      marginBottom: '10px'
    }
  }, icon && /*#__PURE__*/React.createElement("span", {
    style: {
      flexShrink: 0,
      display: 'inline-flex',
      marginTop: '1px'
    }
  }, icon), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: '16px',
      fontWeight: 600,
      color: 'var(--k-body)',
      lineHeight: 1.3
    }
  }, title)), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-sans)',
      fontSize: '14px',
      color: 'var(--k-body)',
      lineHeight: 1.55
    }
  }, children));
}
Object.assign(__ds_scope, { FeatureCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/product/FeatureCard.jsx", error: String((e && e.message) || e) }); }

// components/product/KQBadge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Knomee Quotient score badge. Tier is derived from the score
 * (70+ = tier 1 ocean, 40–69 = tier 2 steel, <40 = tier 3 lilac)
 * unless you pass an explicit tier.
 */
function KQBadge({
  score,
  tier,
  style = {},
  ...rest
}) {
  const t = tier || (score >= 70 ? 1 : score >= 40 ? 2 : 3);
  const bg = {
    1: 'var(--tier-1)',
    2: 'var(--tier-2)',
    3: 'var(--tier-3)'
  }[t];
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '50px',
    height: '36px',
    padding: '0 14px',
    borderRadius: 'var(--radius-md)',
    fontFamily: 'var(--font-sans)',
    fontWeight: 700,
    fontSize: '18px',
    color: 'var(--k-white)',
    background: bg,
    ...style
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: base
  }, rest), score);
}
Object.assign(__ds_scope, { KQBadge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/product/KQBadge.jsx", error: String((e && e.message) || e) }); }

// components/product/SentimentDots.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * 5-dot sentiment meter (violet filled / hollow) with an optional
 * amber warning triangle.
 */
function SentimentDots({
  value = 0,
  total = 5,
  warn = false,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '4px',
      ...style
    }
  }, rest), Array.from({
    length: total
  }).map((_, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      width: 12,
      height: 12,
      borderRadius: '50%',
      background: i < value ? 'var(--action-bolt)' : 'var(--k-pearl)',
      border: i < value ? 'none' : '1.5px solid var(--k-stone)'
    }
  })), warn && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      marginLeft: '4px'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "var(--k-amber)"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "9",
    x2: "12",
    y2: "13",
    stroke: "#fff",
    strokeWidth: "2",
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "17",
    x2: "12.01",
    y2: "17",
    stroke: "#fff",
    strokeWidth: "2",
    strokeLinecap: "round"
  }))));
}
Object.assign(__ds_scope, { SentimentDots });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/product/SentimentDots.jsx", error: String((e && e.message) || e) }); }

// components/product/StatusBadge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Lead / profile status pill used in the Clients table.
 */
function StatusBadge({
  status = 'complete',
  children,
  style = {},
  ...rest
}) {
  const map = {
    complete: {
      background: 'transparent',
      color: '#444',
      border: '1.5px solid var(--k-stone)'
    },
    incomplete: {
      background: 'transparent',
      color: '#444',
      border: '1.5px solid var(--k-stone)'
    },
    pending: {
      background: 'transparent',
      color: 'var(--k-amber-ink)',
      border: '1.5px solid var(--k-amber)',
      fontWeight: 600
    }
  };
  const base = {
    display: 'inline-block',
    width: 'fit-content',
    padding: '4px 10px',
    borderRadius: '20px',
    fontFamily: 'var(--font-sans)',
    fontSize: '12px',
    fontWeight: 500,
    ...map[status],
    ...style
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: base
  }, rest), children || status);
}
Object.assign(__ds_scope, { StatusBadge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/product/StatusBadge.jsx", error: String((e && e.message) || e) }); }

// ui_kits/advisor/AdvisorApp.jsx
try { (() => {
// Knomee Advisor dashboard — faithful recreation of victor-mascaro-ux/knomee-demo (src/App.tsx).
// Icons inlined from src/components/icons.tsx.
const {
  useState,
  useEffect,
  useRef
} = React;
const D = window.KnomeeData;

/* ---------------- Icons ---------------- */
const ChartIcon = () => /*#__PURE__*/React.createElement("svg", {
  width: "18",
  height: "18",
  viewBox: "0 0 18 18",
  fill: "none"
}, /*#__PURE__*/React.createElement("path", {
  d: "M2 15.5h14",
  stroke: "#086375",
  strokeWidth: "1.6",
  strokeLinecap: "round"
}), /*#__PURE__*/React.createElement("rect", {
  x: "3",
  y: "9",
  width: "2.6",
  height: "5",
  rx: "0.6",
  fill: "#086375"
}), /*#__PURE__*/React.createElement("rect", {
  x: "7.7",
  y: "5.5",
  width: "2.6",
  height: "8.5",
  rx: "0.6",
  fill: "#086375"
}), /*#__PURE__*/React.createElement("rect", {
  x: "12.4",
  y: "2.5",
  width: "2.6",
  height: "11.5",
  rx: "0.6",
  fill: "#086375"
}));
const BoltIcon = () => /*#__PURE__*/React.createElement("svg", {
  width: "18",
  height: "18",
  viewBox: "0 0 18 18",
  fill: "none"
}, /*#__PURE__*/React.createElement("path", {
  d: "M9.8 1.5 3.5 10h4.2l-1.5 6.5L14 7.5H9.3l0.5-6z",
  fill: "#086375"
}));
const ChevronUp = () => /*#__PURE__*/React.createElement("svg", {
  width: "14",
  height: "14",
  viewBox: "0 0 14 14",
  fill: "none"
}, /*#__PURE__*/React.createElement("path", {
  d: "M3 8.5 7 4.5l4 4",
  stroke: "currentColor",
  strokeWidth: "1.5",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}));
const ChevronRight = () => /*#__PURE__*/React.createElement("svg", {
  width: "14",
  height: "14",
  viewBox: "0 0 14 14",
  fill: "none"
}, /*#__PURE__*/React.createElement("path", {
  d: "M5 3 9 7l-4 4",
  stroke: "currentColor",
  strokeWidth: "1.6",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}));
const SearchIcon = () => /*#__PURE__*/React.createElement("svg", {
  width: "18",
  height: "18",
  viewBox: "0 0 18 18",
  fill: "none"
}, /*#__PURE__*/React.createElement("circle", {
  cx: "8",
  cy: "8",
  r: "5.2",
  stroke: "currentColor",
  strokeWidth: "1.5"
}), /*#__PURE__*/React.createElement("path", {
  d: "m12 12 3 3",
  stroke: "currentColor",
  strokeWidth: "1.5",
  strokeLinecap: "round"
}));
const DownloadIcon = () => /*#__PURE__*/React.createElement("svg", {
  width: "18",
  height: "18",
  viewBox: "0 0 18 18",
  fill: "none"
}, /*#__PURE__*/React.createElement("path", {
  d: "M9 2.5v8.5m0 0 3-3m-3 3-3-3",
  stroke: "currentColor",
  strokeWidth: "1.6",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}), /*#__PURE__*/React.createElement("path", {
  d: "M3 13.5h12",
  stroke: "currentColor",
  strokeWidth: "1.6",
  strokeLinecap: "round"
}));
const PlusIcon = () => /*#__PURE__*/React.createElement("svg", {
  width: "16",
  height: "16",
  viewBox: "0 0 16 16",
  fill: "none"
}, /*#__PURE__*/React.createElement("path", {
  d: "M8 3v10M3 8h10",
  stroke: "currentColor",
  strokeWidth: "1.8",
  strokeLinecap: "round"
}));
const LightningIcon = ({
  color = '#ffffff'
}) => /*#__PURE__*/React.createElement("svg", {
  width: "18",
  height: "18",
  viewBox: "0 0 18 18",
  fill: "none"
}, /*#__PURE__*/React.createElement("path", {
  d: "M10 1.5 4 10h3.4l-1 6.5L14 8h-4l0-6.5z",
  fill: color
}));
const DotsIcon = () => /*#__PURE__*/React.createElement("svg", {
  width: "18",
  height: "18",
  viewBox: "0 0 18 18",
  fill: "none"
}, /*#__PURE__*/React.createElement("circle", {
  cx: "4",
  cy: "9",
  r: "1.4",
  fill: "currentColor"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "9",
  cy: "9",
  r: "1.4",
  fill: "currentColor"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "14",
  cy: "9",
  r: "1.4",
  fill: "currentColor"
}));
const InfoIcon = () => /*#__PURE__*/React.createElement("svg", {
  width: "12",
  height: "12",
  viewBox: "0 0 12 12",
  fill: "none"
}, /*#__PURE__*/React.createElement("circle", {
  cx: "6",
  cy: "6",
  r: "5.2",
  stroke: "currentColor",
  strokeWidth: "1"
}), /*#__PURE__*/React.createElement("path", {
  d: "M6 5.2v3",
  stroke: "currentColor",
  strokeWidth: "1.1",
  strokeLinecap: "round"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "6",
  cy: "3.6",
  r: "0.7",
  fill: "currentColor"
}));
const CaretDown = () => /*#__PURE__*/React.createElement("svg", {
  width: "10",
  height: "10",
  viewBox: "0 0 10 10",
  fill: "none"
}, /*#__PURE__*/React.createElement("path", {
  d: "M2.5 4 5 6.5 7.5 4",
  stroke: "currentColor",
  strokeWidth: "1.4",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}));
const BurgerMenu = () => /*#__PURE__*/React.createElement("svg", {
  width: "26",
  height: "26",
  viewBox: "0 0 26 26",
  fill: "none"
}, /*#__PURE__*/React.createElement("path", {
  d: "M4 7.5h18M4 13h18M4 18.5h18",
  stroke: "#ffffff",
  strokeWidth: "2",
  strokeLinecap: "round"
}));
const WarnIcon = () => /*#__PURE__*/React.createElement("svg", {
  width: "16",
  height: "16",
  viewBox: "0 0 24 24",
  fill: "#f59e0b"
}, /*#__PURE__*/React.createElement("path", {
  d: "M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
}), /*#__PURE__*/React.createElement("line", {
  x1: "12",
  y1: "9",
  x2: "12",
  y2: "13",
  stroke: "#fff",
  strokeWidth: "2",
  strokeLinecap: "round"
}), /*#__PURE__*/React.createElement("line", {
  x1: "12",
  y1: "17",
  x2: "12.01",
  y2: "17",
  stroke: "#fff",
  strokeWidth: "2",
  strokeLinecap: "round"
}));
const CheckIcon = () => /*#__PURE__*/React.createElement("svg", {
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "#fff",
  strokeWidth: "3",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, /*#__PURE__*/React.createElement("polyline", {
  points: "20 6 9 17 4 12"
}));
const CloseIcon = () => /*#__PURE__*/React.createElement("svg", {
  width: "20",
  height: "20",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2.5",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, /*#__PURE__*/React.createElement("line", {
  x1: "18",
  y1: "6",
  x2: "6",
  y2: "18"
}), /*#__PURE__*/React.createElement("line", {
  x1: "6",
  y1: "6",
  x2: "18",
  y2: "18"
}));
const LockIcon = () => /*#__PURE__*/React.createElement("svg", {
  width: "16",
  height: "16",
  viewBox: "0 0 24 24",
  fill: "none"
}, /*#__PURE__*/React.createElement("rect", {
  x: "5",
  y: "11",
  width: "14",
  height: "9",
  rx: "2",
  stroke: "currentColor",
  strokeWidth: "1.8"
}), /*#__PURE__*/React.createElement("path", {
  d: "M8 11V8a4 4 0 0 1 8 0v3",
  stroke: "currentColor",
  strokeWidth: "1.8",
  strokeLinecap: "round"
}));
const initial = name => name.trim().charAt(0).toUpperCase();
function NameLink({
  name,
  isNew
}) {
  return /*#__PURE__*/React.createElement("span", {
    className: "name-line"
  }, /*#__PURE__*/React.createElement("span", {
    className: "name-text"
  }, name, /*#__PURE__*/React.createElement("span", {
    className: "name-chevron",
    "aria-hidden": true
  }, "\u203A")), isNew && /*#__PURE__*/React.createElement("span", {
    className: "new-tag"
  }, "new"));
}
function CollapsibleCard({
  icon,
  title,
  bodyClassName,
  className,
  children
}) {
  const [open, setOpen] = useState(true);
  return /*#__PURE__*/React.createElement("section", {
    className: `card ${className || ''}`
  }, /*#__PURE__*/React.createElement("header", {
    className: "card-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-title"
  }, icon, /*#__PURE__*/React.createElement("span", null, title)), /*#__PURE__*/React.createElement("button", {
    className: `show-toggle ${open ? '' : 'collapsed'}`,
    type: "button",
    onClick: () => setOpen(v => !v),
    "aria-expanded": open
  }, open ? 'SHOW LESS' : 'SHOW MORE', " ", /*#__PURE__*/React.createElement(ChevronUp, null))), /*#__PURE__*/React.createElement("div", {
    className: `collapse ${open ? 'open' : ''}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "collapse-inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: bodyClassName
  }, children))));
}
function TopLineMetrics() {
  return /*#__PURE__*/React.createElement(CollapsibleCard, {
    className: "metrics-card",
    icon: /*#__PURE__*/React.createElement(ChartIcon, null),
    title: "Top Line Metrics",
    bodyClassName: "metrics-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "metric-tiles"
  }, /*#__PURE__*/React.createElement("div", {
    className: "metric-tile"
  }, /*#__PURE__*/React.createElement("span", {
    className: "metric-label"
  }, "TOTAL PROSPECTS"), /*#__PURE__*/React.createElement("span", {
    className: "metric-value"
  }, "12")), /*#__PURE__*/React.createElement("div", {
    className: "metric-tile"
  }, /*#__PURE__*/React.createElement("span", {
    className: "metric-label"
  }, "AVG KQ SCORE"), /*#__PURE__*/React.createElement("span", {
    className: "metric-value"
  }, "55.9")), /*#__PURE__*/React.createElement("div", {
    className: "metric-tile distribution"
  }, /*#__PURE__*/React.createElement("span", {
    className: "metric-label"
  }, "TIER DISTRIBUTION"), /*#__PURE__*/React.createElement("div", {
    className: "dist-bar"
  }, /*#__PURE__*/React.createElement("span", {
    className: "seg seg-1"
  }, "3"), /*#__PURE__*/React.createElement("span", {
    className: "seg seg-2"
  }, "5"), /*#__PURE__*/React.createElement("span", {
    className: "seg seg-3"
  }, "3")), /*#__PURE__*/React.createElement("div", {
    className: "dist-legend"
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("i", {
    className: "dot dot-1"
  }), "Tier 1 (25%)"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("i", {
    className: "dot dot-2"
  }), "Tier 2 (42%)"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("i", {
    className: "dot dot-3"
  }), "Tier 3 (25%)")))), /*#__PURE__*/React.createElement("div", {
    className: "tier-cards"
  }, [['sw-1', 'TIER 1 - READY NOW', '70-100', 'KQ', '3', '25%'], ['sw-2', 'TIER 2 - CONSIDERING', '40-69', 'KQ', '5', '42%'], ['sw-3', 'TIER 3 - NURTURE', '0-39', 'KQ', '3', '25%']].map(t => /*#__PURE__*/React.createElement("div", {
    className: "tier-card",
    key: t[1]
  }, /*#__PURE__*/React.createElement("div", {
    className: "tier-card-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: `tier-swatch ${t[0]}`
  }), /*#__PURE__*/React.createElement("span", {
    className: "tier-card-title"
  }, t[1]), /*#__PURE__*/React.createElement("span", {
    className: "tier-info"
  }, /*#__PURE__*/React.createElement(InfoIcon, null)), /*#__PURE__*/React.createElement("span", {
    className: "tier-range"
  }, t[2], /*#__PURE__*/React.createElement("br", null), t[3])), /*#__PURE__*/React.createElement("div", {
    className: "tier-card-value"
  }, /*#__PURE__*/React.createElement("strong", null, t[4]), " ", t[5]))), /*#__PURE__*/React.createElement("div", {
    className: "tier-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tier-card-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "tier-swatch sw-x"
  }), /*#__PURE__*/React.createElement("span", {
    className: "tier-card-title"
  }, "INCOMPLETE PROFILES")), /*#__PURE__*/React.createElement("div", {
    className: "tier-card-value"
  }, /*#__PURE__*/React.createElement("strong", null, "1")))));
}
function ActionableInsights() {
  const cols = [D.insights.slice(0, 4), D.insights.slice(4, 8)];
  return /*#__PURE__*/React.createElement(CollapsibleCard, {
    className: "insights-card",
    icon: /*#__PURE__*/React.createElement(BoltIcon, null),
    title: "Actionable Insights",
    bodyClassName: "insights-body"
  }, cols.map((col, i) => /*#__PURE__*/React.createElement("div", {
    className: "insights-col",
    key: i
  }, col.map(ins => /*#__PURE__*/React.createElement("div", {
    className: "insight",
    key: ins.n
  }, /*#__PURE__*/React.createElement("div", {
    className: "insight-num"
  }, ins.n), /*#__PURE__*/React.createElement("div", {
    className: "insight-text"
  }, /*#__PURE__*/React.createElement("div", {
    className: "insight-title"
  }, ins.title), /*#__PURE__*/React.createElement("p", {
    className: "insight-body"
  }, ins.body)))))));
}
function ScoreBadge({
  tier,
  value
}) {
  if (value === null) return /*#__PURE__*/React.createElement("span", {
    className: "score-badge empty"
  }, "\u2013");
  const map = {
    tier1: 'score-tier1',
    tier2: 'score-tier2',
    tier3: 'score-tier3'
  };
  return /*#__PURE__*/React.createElement("span", {
    className: `score-badge ${map[tier] || ''}`
  }, value);
}
function ProspectAvatar({
  p
}) {
  const [failed, setFailed] = useState(false);
  if (p.avatar && !failed) return /*#__PURE__*/React.createElement("img", {
    className: "avatar",
    src: p.avatar,
    alt: "",
    onError: () => setFailed(true)
  });
  return /*#__PURE__*/React.createElement("span", {
    className: "avatar avatar-initial"
  }, initial(p.name));
}
function RowMenu({
  items
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    if (!open) return;
    const onDoc = e => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('click', onDoc);
    return () => document.removeEventListener('click', onDoc);
  }, [open]);
  return /*#__PURE__*/React.createElement("div", {
    className: "row-menu",
    ref: ref
  }, /*#__PURE__*/React.createElement("button", {
    className: "dots-btn",
    type: "button",
    "aria-label": "Row actions",
    onClick: e => {
      e.stopPropagation();
      setOpen(v => !v);
    }
  }, /*#__PURE__*/React.createElement(DotsIcon, null)), open && /*#__PURE__*/React.createElement("div", {
    className: "row-menu-pop"
  }, items.map(it => /*#__PURE__*/React.createElement("button", {
    key: it.label,
    type: "button",
    className: "row-menu-item",
    disabled: it.disabled,
    onClick: e => {
      e.stopPropagation();
      setOpen(false);
      it.onClick && it.onClick();
    }
  }, it.label))));
}
function ProspectRow({
  p,
  onConvert
}) {
  const incomplete = p.tier === 'incomplete';
  return /*#__PURE__*/React.createElement("tr", {
    className: incomplete ? 'row-incomplete' : undefined
  }, /*#__PURE__*/React.createElement("td", {
    className: "col-check"
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox"
  })), /*#__PURE__*/React.createElement("td", {
    className: "col-name"
  }, /*#__PURE__*/React.createElement("div", {
    className: "name-cell"
  }, /*#__PURE__*/React.createElement(ProspectAvatar, {
    p: p
  }), /*#__PURE__*/React.createElement("div", {
    className: "name-block"
  }, /*#__PURE__*/React.createElement(NameLink, {
    name: p.name
  }), /*#__PURE__*/React.createElement("span", {
    className: "email-line"
  }, p.email)))), /*#__PURE__*/React.createElement("td", {
    className: "col-kq"
  }, /*#__PURE__*/React.createElement(ScoreBadge, {
    tier: p.tier,
    value: p.kq
  })), /*#__PURE__*/React.createElement("td", {
    className: "col-num"
  }, p.intent ?? '–'), /*#__PURE__*/React.createElement("td", {
    className: "col-num"
  }, p.clarity ?? '–'), /*#__PURE__*/React.createElement("td", {
    className: "col-num"
  }, p.receptivity ?? '–'), /*#__PURE__*/React.createElement("td", {
    className: "col-signup"
  }, p.signUpLabel ? /*#__PURE__*/React.createElement("span", {
    className: "signup-invited"
  }, p.signUpLabel, /*#__PURE__*/React.createElement("br", null), p.signUp) : p.signUp), /*#__PURE__*/React.createElement("td", {
    className: "col-action"
  }, p.topAction), /*#__PURE__*/React.createElement("td", {
    className: "col-bolt"
  }, /*#__PURE__*/React.createElement("button", {
    className: `bolt-btn ${incomplete ? 'bolt-disabled' : ''}`,
    type: "button",
    title: incomplete ? undefined : 'Convert to client',
    "aria-label": incomplete ? undefined : 'Convert to client',
    onClick: () => {
      if (!incomplete) onConvert(p);
    }
  }, /*#__PURE__*/React.createElement(LightningIcon, {
    color: incomplete ? '#c9c9c9' : '#ffffff'
  }))), /*#__PURE__*/React.createElement("td", {
    className: "col-dots"
  }, /*#__PURE__*/React.createElement(RowMenu, {
    items: incomplete ? [{
      label: 'View profile',
      disabled: true
    }] : [{
      label: 'Convert to client',
      onClick: () => onConvert(p)
    }, {
      label: 'View profile',
      disabled: true
    }]
  })));
}
function Toolbar({
  disabled
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "toolbar"
  }, /*#__PURE__*/React.createElement("div", {
    className: `search-box ${disabled ? 'is-disabled' : ''}`
  }, /*#__PURE__*/React.createElement(SearchIcon, null), /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "Search name",
    disabled: disabled
  })), /*#__PURE__*/React.createElement("div", {
    className: "toolbar-actions"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-outline",
    type: "button",
    disabled: disabled
  }, /*#__PURE__*/React.createElement(DownloadIcon, null), " Download"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    type: "button"
  }, /*#__PURE__*/React.createElement(PlusIcon, null), " Invite")));
}
function ProspectsScreen({
  onConvert
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h1", {
    className: "page-title"
  }, "My Prospects"), /*#__PURE__*/React.createElement(TopLineMetrics, null), /*#__PURE__*/React.createElement(ActionableInsights, null), /*#__PURE__*/React.createElement(Toolbar, null), /*#__PURE__*/React.createElement("div", {
    className: "table-wrap"
  }, /*#__PURE__*/React.createElement("table", {
    className: "prospects-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
    className: "col-check"
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox"
  })), /*#__PURE__*/React.createElement("th", {
    className: "col-name"
  }, "Name"), /*#__PURE__*/React.createElement("th", {
    className: "col-kq"
  }, /*#__PURE__*/React.createElement("span", {
    className: "th-sort"
  }, "KQ Score ", /*#__PURE__*/React.createElement(CaretDown, null))), /*#__PURE__*/React.createElement("th", {
    className: "col-num"
  }, "Intent"), /*#__PURE__*/React.createElement("th", {
    className: "col-num"
  }, "Clarity"), /*#__PURE__*/React.createElement("th", {
    className: "col-num"
  }, "Receptivity"), /*#__PURE__*/React.createElement("th", {
    className: "col-signup"
  }, "Sign Up"), /*#__PURE__*/React.createElement("th", {
    className: "col-action"
  }, "Top Action"), /*#__PURE__*/React.createElement("th", {
    className: "col-bolt"
  }), /*#__PURE__*/React.createElement("th", {
    className: "col-dots"
  }))), /*#__PURE__*/React.createElement("tbody", null, D.tierGroups.map(group => {
    const rows = D.prospects.filter(p => p.tier === group.id);
    if (!rows.length) return null;
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: group.id
    }, /*#__PURE__*/React.createElement("tr", {
      className: `group-header group-${group.id}`
    }, /*#__PURE__*/React.createElement("td", {
      colSpan: 10
    }, /*#__PURE__*/React.createElement("div", {
      className: "group-header-inner"
    }, /*#__PURE__*/React.createElement("span", null, group.title), group.range && /*#__PURE__*/React.createElement("span", {
      className: "group-range"
    }, group.range)))), rows.map(p => /*#__PURE__*/React.createElement(ProspectRow, {
      p: p,
      key: p.name,
      onConvert: onConvert
    })));
  })))));
}

/* ---- Clients ---- */
function SentimentDots({
  value,
  warn
}) {
  if (value === null) return /*#__PURE__*/React.createElement("span", {
    className: "dash"
  }, "\u2013");
  return /*#__PURE__*/React.createElement("div", {
    className: "sentiment"
  }, Array.from({
    length: 5
  }).map((_, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    className: `sdot ${i < value ? '' : 'empty'}`
  })), warn && /*#__PURE__*/React.createElement("span", {
    className: "sentiment-warn"
  }, /*#__PURE__*/React.createElement(WarnIcon, null)));
}
function ClientRow({
  c
}) {
  return /*#__PURE__*/React.createElement("tr", {
    className: c.isNew ? 'client-new' : undefined
  }, /*#__PURE__*/React.createElement("td", {
    className: "col-check"
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox"
  })), /*#__PURE__*/React.createElement("td", {
    className: "col-name"
  }, /*#__PURE__*/React.createElement("div", {
    className: "name-cell"
  }, /*#__PURE__*/React.createElement("span", {
    className: "avatar avatar-initial"
  }, c.name.charAt(0).toUpperCase()), /*#__PURE__*/React.createElement("div", {
    className: "name-block"
  }, /*#__PURE__*/React.createElement(NameLink, {
    name: c.name,
    isNew: c.isNew
  }), /*#__PURE__*/React.createElement("span", {
    className: "email-line"
  }, c.email)))), /*#__PURE__*/React.createElement("td", {
    className: "col-household"
  }, c.household ? /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "household-link",
    onClick: e => e.preventDefault()
  }, c.household) : /*#__PURE__*/React.createElement("span", {
    className: "dash"
  }, "\u2014")), /*#__PURE__*/React.createElement("td", {
    className: "col-sentiment"
  }, /*#__PURE__*/React.createElement(SentimentDots, {
    value: c.sentiment,
    warn: c.warn
  })), /*#__PURE__*/React.createElement("td", {
    className: "col-status"
  }, c.secondaryStatus ? /*#__PURE__*/React.createElement("div", {
    className: "status-stack"
  }, /*#__PURE__*/React.createElement("span", {
    className: "status-badge status-pending"
  }, c.status), /*#__PURE__*/React.createElement("span", {
    className: "status-badge"
  }, c.secondaryStatus)) : /*#__PURE__*/React.createElement("span", {
    className: `status-badge ${c.status === 'pending' ? 'status-pending' : ''}`
  }, c.status)), /*#__PURE__*/React.createElement("td", {
    className: "col-signin"
  }, c.lastLabel ? /*#__PURE__*/React.createElement("span", {
    className: "signup-invited"
  }, c.lastLabel, /*#__PURE__*/React.createElement("br", null), c.lastSignIn) : c.lastSignIn), /*#__PURE__*/React.createElement("td", {
    className: "col-dots"
  }, /*#__PURE__*/React.createElement(RowMenu, {
    items: [{
      label: 'View profile',
      disabled: true
    }]
  })));
}
function ConfidencePie() {
  const stops = [];
  let acc = 0;
  for (const s of D.confidenceSegments) {
    stops.push(`${s.color} ${acc}% ${acc + s.pct}%`);
    acc += s.pct;
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "confidence"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pie",
    style: {
      background: `conic-gradient(${stops.join(', ')})`
    }
  }), /*#__PURE__*/React.createElement("ul", {
    className: "pie-legend"
  }, D.confidenceSegments.map(s => /*#__PURE__*/React.createElement("li", {
    key: s.label
  }, /*#__PURE__*/React.createElement("span", {
    className: "pie-emoji",
    style: {
      background: s.color
    }
  }, s.emoji), /*#__PURE__*/React.createElement("span", {
    className: "pie-pct"
  }, s.pct, "%")))));
}
function ActiveChart() {
  const w = 560,
    h = 190,
    padL = 34,
    padR = 12,
    padT = 12,
    padB = 26,
    max = 100,
    n = D.activeSeries.length;
  const x = i => padL + i * (w - padL - padR) / (n - 1),
    y = v => padT + (1 - v / max) * (h - padT - padB);
  const pts = D.activeSeries.map((d, i) => `${x(i)},${y(d.value)}`).join(' ');
  return /*#__PURE__*/React.createElement("svg", {
    className: "active-chart",
    viewBox: `0 0 ${w} ${h}`,
    role: "img",
    "aria-label": "Clients active this week"
  }, [20, 40, 60, 80, 100].map(g => /*#__PURE__*/React.createElement("g", {
    key: g
  }, /*#__PURE__*/React.createElement("line", {
    x1: padL,
    y1: y(g),
    x2: w - padR,
    y2: y(g),
    stroke: "#eee",
    strokeWidth: "1"
  }), /*#__PURE__*/React.createElement("text", {
    x: padL - 8,
    y: y(g) + 3,
    textAnchor: "end",
    fontSize: "9",
    fill: "#afafaf"
  }, g, "%"))), /*#__PURE__*/React.createElement("polyline", {
    points: pts,
    fill: "none",
    stroke: "#9b51e0",
    strokeWidth: "2.5",
    strokeLinejoin: "round",
    strokeLinecap: "round"
  }), D.activeSeries.map((d, i) => /*#__PURE__*/React.createElement("circle", {
    key: i,
    cx: x(i),
    cy: y(d.value),
    r: "3",
    fill: "#9b51e0"
  })), D.activeSeries.map((d, i) => /*#__PURE__*/React.createElement("text", {
    key: `l${i}`,
    x: x(i),
    y: h - 8,
    textAnchor: "middle",
    fontSize: "8.5",
    fill: "#afafaf"
  }, d.week)));
}
function ClientsMetrics({
  clients
}) {
  const count = t => clients.filter(c => c.tier === t).length;
  const engaged = count('engaged'),
    attention = count('attention'),
    reconnect = count('reconnect'),
    incomplete = count('incomplete');
  const total = clients.length,
    scored = engaged + attention + reconnect,
    pct = n => scored ? Math.round(n / scored * 100) : 0;
  const tc = [['sw-c1', 'TIER 1 - ENGAGED', '70-100', 'KR', engaged, 'seg-c1', 'dot-c1'], ['sw-c2', 'TIER 2 - ATTENTION', '40-69', 'KR', attention, 'seg-c2', 'dot-c2'], ['sw-c3', 'TIER 3 - RECONNECT', '0-39', 'KR', reconnect, 'seg-c3', 'dot-c3']];
  return /*#__PURE__*/React.createElement(CollapsibleCard, {
    className: "metrics-card",
    icon: /*#__PURE__*/React.createElement(ChartIcon, null),
    title: "Top Line Metrics",
    bodyClassName: "metrics-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "metric-tiles"
  }, /*#__PURE__*/React.createElement("div", {
    className: "metric-tile"
  }, /*#__PURE__*/React.createElement("span", {
    className: "metric-label"
  }, "TOTAL CLIENTS"), /*#__PURE__*/React.createElement("span", {
    className: "metric-value"
  }, total)), /*#__PURE__*/React.createElement("div", {
    className: "metric-tile"
  }, /*#__PURE__*/React.createElement("span", {
    className: "metric-label"
  }, "AVG KR SCORE"), /*#__PURE__*/React.createElement("span", {
    className: "metric-value"
  }, D.AVG_KR_SCORE)), /*#__PURE__*/React.createElement("div", {
    className: "metric-tile distribution"
  }, /*#__PURE__*/React.createElement("span", {
    className: "metric-label"
  }, "TIER DISTRIBUTION"), /*#__PURE__*/React.createElement("div", {
    className: "dist-bar"
  }, /*#__PURE__*/React.createElement("span", {
    className: "seg seg-c1",
    style: {
      flex: engaged || 0.001
    }
  }, engaged), /*#__PURE__*/React.createElement("span", {
    className: "seg seg-c2",
    style: {
      flex: attention || 0.001
    }
  }, attention), /*#__PURE__*/React.createElement("span", {
    className: "seg seg-c3",
    style: {
      flex: reconnect || 0.001
    }
  }, reconnect)), /*#__PURE__*/React.createElement("div", {
    className: "dist-legend"
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("i", {
    className: "dot dot-c1"
  }), "Tier 1 (", pct(engaged), "%)"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("i", {
    className: "dot dot-c2"
  }), "Tier 2 (", pct(attention), "%)"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("i", {
    className: "dot dot-c3"
  }), "Tier 3 (", pct(reconnect), "%)")))), /*#__PURE__*/React.createElement("div", {
    className: "tier-cards"
  }, tc.map(t => /*#__PURE__*/React.createElement("div", {
    className: "tier-card",
    key: t[1]
  }, /*#__PURE__*/React.createElement("div", {
    className: "tier-card-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: `tier-swatch ${t[0]}`
  }), /*#__PURE__*/React.createElement("span", {
    className: "tier-card-title"
  }, t[1]), /*#__PURE__*/React.createElement("span", {
    className: "tier-info"
  }, /*#__PURE__*/React.createElement(InfoIcon, null)), /*#__PURE__*/React.createElement("span", {
    className: "tier-range"
  }, t[2], /*#__PURE__*/React.createElement("br", null), t[3])), /*#__PURE__*/React.createElement("div", {
    className: "tier-card-value"
  }, /*#__PURE__*/React.createElement("strong", null, t[4]), " ", pct(t[4]), "%"))), /*#__PURE__*/React.createElement("div", {
    className: "tier-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tier-card-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "tier-swatch sw-x"
  }), /*#__PURE__*/React.createElement("span", {
    className: "tier-card-title"
  }, "INCOMPLETE PROFILES")), /*#__PURE__*/React.createElement("div", {
    className: "tier-card-value"
  }, /*#__PURE__*/React.createElement("strong", null, incomplete)))), /*#__PURE__*/React.createElement("div", {
    className: "chart-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "chart-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "chart-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "metric-label"
  }, "OVERALL CLIENT CONFIDENCE SCORE"), /*#__PURE__*/React.createElement("span", {
    className: "chart-figure"
  }, D.confidenceScore)), /*#__PURE__*/React.createElement(ConfidencePie, null)), /*#__PURE__*/React.createElement("div", {
    className: "chart-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "chart-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "metric-label"
  }, "CLIENTS ACTIVE THIS WEEK"), /*#__PURE__*/React.createElement("span", {
    className: "chart-figure"
  }, D.activeThisWeek, "%")), /*#__PURE__*/React.createElement(ActiveChart, null))));
}
function ClientInsights() {
  return /*#__PURE__*/React.createElement(CollapsibleCard, {
    className: "insights-card",
    icon: /*#__PURE__*/React.createElement(BoltIcon, null),
    title: "Actionable Insights",
    bodyClassName: "client-insights-body"
  }, D.clientInsights.map(ins => /*#__PURE__*/React.createElement("div", {
    className: "client-insight",
    key: ins.name
  }, /*#__PURE__*/React.createElement("div", {
    className: "client-insight-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ci-warn"
  }, /*#__PURE__*/React.createElement(WarnIcon, null)), /*#__PURE__*/React.createElement("span", {
    className: "ci-name"
  }, ins.name), /*#__PURE__*/React.createElement(ChevronRight, null)), /*#__PURE__*/React.createElement("div", {
    className: "client-insight-body"
  }, ins.lines.map(l => /*#__PURE__*/React.createElement("p", {
    key: l
  }, l))))));
}
function ClientsScreen({
  clients
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h1", {
    className: "page-title"
  }, "My Clients"), /*#__PURE__*/React.createElement(ClientsMetrics, {
    clients: clients
  }), /*#__PURE__*/React.createElement(ClientInsights, null), /*#__PURE__*/React.createElement(Toolbar, null), /*#__PURE__*/React.createElement("div", {
    className: "table-wrap"
  }, /*#__PURE__*/React.createElement("table", {
    className: "prospects-table clients-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
    className: "col-check"
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox"
  })), /*#__PURE__*/React.createElement("th", {
    className: "col-name"
  }, "Name"), /*#__PURE__*/React.createElement("th", {
    className: "col-household"
  }, "Household"), /*#__PURE__*/React.createElement("th", {
    className: "col-sentiment"
  }, "Sentiment"), /*#__PURE__*/React.createElement("th", {
    className: "col-status"
  }, /*#__PURE__*/React.createElement("span", {
    className: "th-sort"
  }, "Status ", /*#__PURE__*/React.createElement(CaretDown, null))), /*#__PURE__*/React.createElement("th", {
    className: "col-signin"
  }, "Last Sign In"), /*#__PURE__*/React.createElement("th", {
    className: "col-dots"
  }))), /*#__PURE__*/React.createElement("tbody", null, D.clientTierGroups.map(group => {
    const rows = clients.filter(c => c.tier === group.id);
    if (!rows.length) return null;
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: group.id
    }, /*#__PURE__*/React.createElement("tr", {
      className: `group-header client-group-${group.id}`
    }, /*#__PURE__*/React.createElement("td", {
      colSpan: 7
    }, /*#__PURE__*/React.createElement("div", {
      className: "group-header-inner"
    }, /*#__PURE__*/React.createElement("span", null, group.title), group.range && /*#__PURE__*/React.createElement("span", {
      className: "group-range"
    }, group.range)))), rows.map(c => /*#__PURE__*/React.createElement(ClientRow, {
      c: c,
      key: c.name
    })));
  })))));
}

/* ---- Empty (Reporting) ---- */
function EmptyScreen({
  variant
}) {
  const cfg = {
    reporting: {
      title: 'Reporting',
      caption: 'Your Reporting Dashboard is empty.',
      subtitle: 'Reports appear here once you have active prospects and clients.',
      columns: []
    }
  }[variant];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h1", {
    className: "page-title"
  }, cfg.title), /*#__PURE__*/React.createElement("div", {
    className: "locked-bar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-title"
  }, /*#__PURE__*/React.createElement(ChartIcon, null), /*#__PURE__*/React.createElement("span", null, "Top Line Metrics")), /*#__PURE__*/React.createElement("span", {
    className: "locked-icon"
  }, /*#__PURE__*/React.createElement(LockIcon, null))), /*#__PURE__*/React.createElement("div", {
    className: "locked-bar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-title"
  }, /*#__PURE__*/React.createElement(BoltIcon, null), /*#__PURE__*/React.createElement("span", null, "Actionable Insights")), /*#__PURE__*/React.createElement("span", {
    className: "locked-icon"
  }, /*#__PURE__*/React.createElement(LockIcon, null))), /*#__PURE__*/React.createElement(Toolbar, {
    disabled: true
  }), /*#__PURE__*/React.createElement("div", {
    className: "empty-state"
  }, /*#__PURE__*/React.createElement("p", {
    className: "empty-caption"
  }, cfg.caption), /*#__PURE__*/React.createElement("div", {
    className: `empty-illus illus-${variant}`,
    "aria-hidden": true
  }, /*#__PURE__*/React.createElement("span", {
    className: "illus-disc"
  }), /*#__PURE__*/React.createElement("span", {
    className: "illus-chip chip-1"
  }, "\uD83E\uDDE9"), /*#__PURE__*/React.createElement("span", {
    className: "illus-chip chip-2"
  }, "\uD83C\uDFD4\uFE0F"), /*#__PURE__*/React.createElement("span", {
    className: "illus-chip chip-3"
  }, "\u2600\uFE0F"), /*#__PURE__*/React.createElement("span", {
    className: "illus-chip chip-4"
  }, "\uD83D\uDD0E"), /*#__PURE__*/React.createElement("i", {
    className: "illus-dot d1"
  }), /*#__PURE__*/React.createElement("i", {
    className: "illus-dot d2"
  }), /*#__PURE__*/React.createElement("i", {
    className: "illus-dot d3"
  }), /*#__PURE__*/React.createElement("i", {
    className: "illus-dot d4"
  }), /*#__PURE__*/React.createElement("i", {
    className: "illus-dot d5"
  })), /*#__PURE__*/React.createElement("p", {
    className: "empty-subtitle"
  }, cfg.subtitle)));
}
function ConvertModal({
  prospect,
  onCancel,
  onConfirm
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "modal-backdrop",
    onClick: onCancel,
    role: "dialog",
    "aria-modal": "true"
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-header"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "modal-title"
  }, "Convert to Client"), /*#__PURE__*/React.createElement("button", {
    className: "modal-close",
    type: "button",
    "aria-label": "Close",
    onClick: onCancel
  }, /*#__PURE__*/React.createElement(CloseIcon, null))), /*#__PURE__*/React.createElement("div", {
    className: "modal-body"
  }, /*#__PURE__*/React.createElement("b", null, prospect.name), " will be sent to your ", /*#__PURE__*/React.createElement("b", null, "Clients"), " Dashboard."), /*#__PURE__*/React.createElement("div", {
    className: "modal-footer"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-outline",
    type: "button",
    onClick: onCancel
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    type: "button",
    onClick: onConfirm
  }, "Convert"))));
}
function Confetti({
  fireRef
}) {
  const canvasRef = useRef(null),
    rafRef = useRef(0);
  useEffect(() => {
    fireRef.current = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      cancelAnimationFrame(rafRef.current);
      const W = canvas.width = window.innerWidth,
        H = canvas.height = window.innerHeight,
        band = Math.min(H, 900);
      canvas.style.display = 'block';
      const COLORS = ['#a855f7', '#7c3aed', '#b98ddc', '#086375', '#c0ffe7', '#240446', '#d4b3eb', '#6ba1ac', '#e879f9', '#67e8f9'],
        SHAPES = ['rect', 'circle', 'ribbon'];
      const pieces = Array.from({
        length: 200
      }, () => ({
        x: Math.random() * W,
        y: Math.random() * band - 60,
        w: 6 + Math.random() * 10,
        h: 4 + Math.random() * 6,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
        rot: Math.random() * Math.PI * 2,
        dRot: (Math.random() - 0.5) * 0.14,
        vx: (Math.random() - 0.5) * 3,
        vy: 2 + Math.random() * 3.5,
        sway: (Math.random() - 0.5) * 0.06,
        alpha: 1
      }));
      const END = Date.now() + 2000;
      let fading = false;
      const draw = () => {
        ctx.clearRect(0, 0, W, H);
        if (Date.now() >= END && !fading) fading = true;
        if (fading) pieces.forEach(p => p.alpha -= 0.025);
        pieces.forEach(p => {
          if (p.alpha <= 0) return;
          ctx.save();
          ctx.globalAlpha = Math.max(0, p.alpha);
          ctx.translate(p.x + p.w / 2, p.y + p.h / 2);
          ctx.rotate(p.rot);
          ctx.fillStyle = p.color;
          if (p.shape === 'circle') {
            ctx.beginPath();
            ctx.arc(0, 0, p.w / 2, 0, Math.PI * 2);
            ctx.fill();
          } else if (p.shape === 'ribbon') {
            ctx.fillRect(-p.w * 0.4, -p.h / 2, p.w * 0.8, p.h);
          } else {
            ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
          }
          ctx.restore();
          p.x += p.vx;
          p.y += p.vy;
          p.vx += p.sway;
          p.rot += p.dRot;
          p.vy += 0.06;
        });
        if (pieces.some(p => p.alpha > 0)) rafRef.current = requestAnimationFrame(draw);else canvas.style.display = 'none';
      };
      rafRef.current = requestAnimationFrame(draw);
    };
    return () => cancelAnimationFrame(rafRef.current);
  }, [fireRef]);
  return /*#__PURE__*/React.createElement("canvas", {
    ref: canvasRef,
    className: "confetti-canvas",
    "aria-hidden": true
  });
}
const TABS = [{
  id: 'prospects',
  label: 'Prospects'
}, {
  id: 'clients',
  label: 'Clients'
}, {
  id: 'reporting',
  label: 'Reporting'
}];
function App() {
  const [screen, setScreen] = useState('prospects');
  const [converted, setConverted] = useState([]);
  const [convertTarget, setConvertTarget] = useState(null);
  const [toast, setToast] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const fireRef = useRef(null),
    menuRef = useRef(null);
  useEffect(() => {
    if (!menuOpen) return;
    const onDoc = e => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener('click', onDoc);
    return () => document.removeEventListener('click', onDoc);
  }, [menuOpen]);
  useEffect(() => {
    if (!convertTarget) return;
    const onKey = e => {
      if (e.key === 'Escape') setConvertTarget(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [convertTarget]);
  const confirmConvert = () => {
    if (!convertTarget) return;
    if (!converted.some(c => c.email === convertTarget.email)) setConverted(prev => [D.convertedClient(convertTarget.name, convertTarget.email), ...prev]);
    fireRef.current && fireRef.current();
    setConvertTarget(null);
    setScreen('clients');
    setToast(true);
    window.setTimeout(() => setToast(false), 3200);
  };
  const clients = [...converted, ...D.baseClients];
  return /*#__PURE__*/React.createElement("div", {
    className: "page"
  }, /*#__PURE__*/React.createElement("header", {
    className: "topbar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "topbar-inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "brand"
  }, /*#__PURE__*/React.createElement("img", {
    className: "brand-logo",
    src: "../../assets/logos/knomee-logo-white.svg",
    alt: "knomee"
  }), /*#__PURE__*/React.createElement("span", {
    className: "brand-sub"
  }, "ADVISOR")), /*#__PURE__*/React.createElement("div", {
    className: "menu-wrap",
    ref: menuRef
  }, /*#__PURE__*/React.createElement("button", {
    className: "menu-btn",
    type: "button",
    "aria-label": "Menu",
    "aria-expanded": menuOpen,
    onClick: e => {
      e.stopPropagation();
      setMenuOpen(v => !v);
    }
  }, /*#__PURE__*/React.createElement(BurgerMenu, null)), menuOpen && /*#__PURE__*/React.createElement("div", {
    className: "menu-pop"
  }, /*#__PURE__*/React.createElement("div", {
    className: "menu-pop-title"
  }, "Demo controls"), /*#__PURE__*/React.createElement("div", {
    className: "menu-hint"
  }, "Prototype recreation of the Knomee Advisor dashboard. Try converting a prospect from the \u26A1 or \u22EF menu."))))), /*#__PURE__*/React.createElement("main", {
    className: "content"
  }, /*#__PURE__*/React.createElement("nav", {
    className: "tabs"
  }, TABS.map(t => /*#__PURE__*/React.createElement("button", {
    key: t.id,
    className: `tab ${screen === t.id ? 'tab-active' : ''}`,
    type: "button",
    onClick: () => setScreen(t.id)
  }, t.label))), screen === 'prospects' && /*#__PURE__*/React.createElement(ProspectsScreen, {
    onConvert: setConvertTarget
  }), screen === 'clients' && /*#__PURE__*/React.createElement(ClientsScreen, {
    clients: clients
  }), screen === 'reporting' && /*#__PURE__*/React.createElement(EmptyScreen, {
    variant: "reporting"
  })), convertTarget && /*#__PURE__*/React.createElement(ConvertModal, {
    prospect: convertTarget,
    onCancel: () => setConvertTarget(null),
    onConfirm: confirmConvert
  }), /*#__PURE__*/React.createElement("div", {
    className: `app-toast ${toast ? 'show' : ''}`,
    role: "status",
    "aria-live": "polite"
  }, /*#__PURE__*/React.createElement("span", {
    className: "app-toast-check"
  }, /*#__PURE__*/React.createElement(CheckIcon, null)), "Converted to Client"), /*#__PURE__*/React.createElement(Confetti, {
    fireRef: fireRef
  }));
}
window.AdvisorApp = App;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/advisor/AdvisorApp.jsx", error: String((e && e.message) || e) }); }

// ui_kits/advisor/data.js
try { (() => {
// Ported verbatim from victor-mascaro-ux/knomee-demo (src/data/*).
window.KnomeeData = function () {
  const tierGroups = [{
    id: 'tier1',
    title: 'TIER 1 - READY NOW',
    range: '70-100 KQ'
  }, {
    id: 'tier2',
    title: 'TIER 2 - CONSIDERING',
    range: '40-69 KQ'
  }, {
    id: 'tier3',
    title: 'TIER 3 - NURTURE',
    range: '0-39 KQ'
  }, {
    id: 'incomplete',
    title: 'INCOMPLETE PROFILES'
  }];
  const prospects = [{
    name: 'Sarah Mitchell',
    email: 'sara.mitchell@email.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&fit=crop&crop=faces',
    kq: 81,
    intent: 83,
    clarity: 62,
    receptivity: 100,
    signUp: '06/05/2025',
    topAction: 'Call now — “worked since 13, ready for adventures”; lead with Future You vision',
    tier: 'tier1'
  }, {
    name: 'Emma Rossi',
    email: 'emma.rossi@beaconplan.co',
    kq: 88,
    intent: 86,
    clarity: 90,
    receptivity: 88,
    signUp: '06/05/2025',
    topAction: 'Urgent personal circumstances (caregiving); call to discuss home & estate plan',
    tier: 'tier1'
  }, {
    name: 'Jorday Ray',
    email: 'jorday.ray@email.com',
    kq: 76,
    intent: 80,
    clarity: 74,
    receptivity: 74,
    signUp: '06/05/2025',
    topAction: 'Family legacy is their stated #1 life goal; lead with generational wealth',
    tier: 'tier1'
  }, {
    name: 'Barbara Dean',
    email: 'barbara.dean@email.com',
    kq: 68,
    intent: 70,
    clarity: 69,
    receptivity: 65,
    signUp: '06/05/2025',
    topAction: 'Hobby goal disconnected from financial vision; needs goal reframe session',
    tier: 'tier2'
  }, {
    name: 'Sophie Dean',
    email: 'sophie.dean@email.com',
    kq: 62,
    intent: 60,
    clarity: 64,
    receptivity: 62,
    signUp: '06/05/2025',
    topAction: 'Travel urgency but self-directed; send value-add travel planning content',
    tier: 'tier2'
  }, {
    name: 'Sebastian Watson',
    email: 'Sebastian.Watson@email.com',
    kq: 58,
    intent: 55,
    clarity: 60,
    receptivity: 59,
    signUp: '06/05/2025',
    topAction: 'Grandkids focus; not thinking about goal; re-engage with legacy content',
    tier: 'tier2'
  }, {
    name: 'Miles Watson',
    email: 'miles.Watson@email.com',
    kq: 49,
    intent: 48,
    clarity: 52,
    receptivity: 47,
    signUp: '06/05/2025',
    topAction: 'Goal driven by partner; involve both partners; relationship-based outreach',
    tier: 'tier2'
  }, {
    name: 'Maya Watson',
    email: 'maya.Watson@email.com',
    kq: 42,
    intent: 40,
    clarity: 45,
    receptivity: 41,
    signUp: '06/05/2025',
    topAction: 'Very terse responses; minimal engagement; low-touch nurture sequence',
    tier: 'tier2'
  }, {
    name: 'Emily Watson',
    email: 'emily.watson@email.com',
    kq: 35,
    intent: 35,
    clarity: 38,
    receptivity: 32,
    signUp: '06/05/2025',
    topAction: 'Hobby-only focus; minimal urgency; quarterly light-touch check-in',
    tier: 'tier3'
  }, {
    name: 'David Watson',
    email: 'david.watson@email.com',
    kq: 28,
    intent: 30,
    clarity: 25,
    receptivity: 29,
    signUp: '06/05/2025',
    topAction: 'Financial reward only; thin Future You; send financial education series',
    tier: 'tier3'
  }, {
    name: 'Janet Murphy',
    email: 'janet.murphy@email.com',
    kq: 28,
    intent: 30,
    clarity: 25,
    receptivity: 29,
    signUp: '06/05/2025',
    topAction: 'Financial reward only; thin Future You; send financial education series',
    tier: 'tier3'
  }, {
    name: 'Anna Abbot',
    email: 'anna.abbot@beaconplan.co',
    kq: null,
    intent: null,
    clarity: null,
    receptivity: null,
    signUp: '06/05/2025',
    signUpLabel: 'Last invited:',
    topAction: 'Complete Knomee Prospect flow.',
    tier: 'incomplete'
  }];
  const insights = [{
    n: 1,
    title: '27% Actionable Now',
    body: '3 of 11 scored prospects (27.3%) fall in Tier 1 (KQ 70–100). Prioritize these first for meetings in the next 2 weeks — they show the strongest near-term readiness.'
  }, {
    n: 2,
    title: 'Intent and Clarity Are Fairly Balanced',
    body: 'Portfolio avg Intent is 56.3 and avg Clarity is 56.5. This suggests interest exists, but many prospects still need help turning general motivation into a more concrete plan.'
  }, {
    n: 3,
    title: 'Receptivity Is the Softest Dimension',
    body: 'Avg Receptivity is 55.2 — slightly below Intent and Clarity. The biggest opportunity is not just explaining products, but showing why working with an advisor is useful right now.'
  }, {
    n: 4,
    title: 'Verbal Engagement Still Signals Momentum',
    body: '7 of the 8 Tier 1 and Tier 2 prospects show Medium or High verbosity. The more engaged prospects are giving you more to work with — use that signal to prioritize outreach and tailor the first conversation.'
  }, {
    n: 5,
    title: 'Family and Legacy Themes Are Strong Hooks',
    body: 'Several top actions center on family, caregiving, partner alignment, estate planning, or legacy. Lead with protection, continuity, and support-for-others themes when opening conversations.'
  }, {
    n: 6,
    title: 'Lifestyle Goals Create Natural Entry Points',
    body: 'Travel, adventure, homeownership, and personal hobbies show up repeatedly across the list. These goals are effective conversation starters because they feel personal first, then connect naturally to planning.'
  }, {
    n: 7,
    title: 'Tier 2 Is the Biggest Opportunity Pool',
    body: '5 of 11 prospects (45.5%) sit in Tier 2 — the largest segment. These are the best “move next” candidates: interested enough to engage, but still needing reframing, confidence, or clearer next steps.'
  }, {
    n: 8,
    title: 'Tier 3 Should Stay in a Low-Touch Nurture Track',
    body: '3 of 11 prospects (27.3%) fall in Tier 3. These prospects are better suited to education, periodic check-ins, and lighter nurture rather than high-effort advisor time.'
  }];
  const clientTierGroups = [{
    id: 'engaged',
    title: 'TIER 1 – ENGAGED',
    range: '70–100 KR'
  }, {
    id: 'attention',
    title: 'TIER 2 – ATTENTION',
    range: '40–69 KR'
  }, {
    id: 'reconnect',
    title: 'TIER 3 – RECONNECT',
    range: '0–39 KR'
  }, {
    id: 'incomplete',
    title: 'INCOMPLETE PROFILES'
  }];
  const AVG_KR_SCORE = 65.6;
  const confidenceScore = 33;
  const confidenceSegments = [{
    label: 'Frustrated',
    emoji: '😠',
    color: '#ef4444',
    pct: 7
  }, {
    label: 'Concerned',
    emoji: '🙁',
    color: '#f59e0b',
    pct: 21
  }, {
    label: 'Neutral',
    emoji: '😐',
    color: '#eab308',
    pct: 18
  }, {
    label: 'Positive',
    emoji: '🙂',
    color: '#a3e635',
    pct: 26
  }, {
    label: 'Delighted',
    emoji: '😄',
    color: '#84cc16',
    pct: 28
  }];
  const activeThisWeek = 72;
  const activeSeries = [{
    week: '04/14 – 04/20',
    value: 42
  }, {
    week: '04/21 – 04/27',
    value: 46
  }, {
    week: '04/28 – 05/04',
    value: 68
  }, {
    week: '05/05 – 05/11',
    value: 40
  }, {
    week: '05/12 – 05/18',
    value: 78
  }, {
    week: '05/19 – 05/25',
    value: 72
  }];
  const clientInsights = [{
    name: 'Emily Watson',
    lines: ['No login in 22 days.', '1/4 goals completed.']
  }, {
    name: 'Miles Dean',
    lines: ['Dropped engagement score (-20).', '0 adventures done.']
  }, {
    name: 'Sophie Dean',
    lines: ['High activity, low advisor reliance (10%).']
  }];
  const baseClients = [{
    name: 'Jennifer Martinez',
    email: 'jennifer.martinez@email.com',
    sentiment: 3,
    status: 'complete',
    lastSignIn: '06/05/2025',
    tier: 'engaged'
  }, {
    name: 'Emily Watson',
    email: 'emily.watson@email.com',
    household: 'Watson Family',
    sentiment: 4,
    status: 'incomplete',
    lastSignIn: '05/30/2025',
    tier: 'engaged'
  }, {
    name: 'Jorday Ray',
    email: 'jorday.ray@email.com',
    sentiment: 4,
    status: 'complete',
    lastSignIn: '05/30/2025',
    tier: 'engaged'
  }, {
    name: 'Barbara Dean',
    email: 'barbara.dean@email.com',
    household: 'Dean Family',
    sentiment: 4,
    warn: true,
    status: 'complete',
    lastSignIn: '06/05/2025',
    tier: 'attention'
  }, {
    name: 'Sophie Dean',
    email: 'sophie.dean@email.com',
    household: 'Dean Family',
    sentiment: 3,
    warn: true,
    status: 'complete',
    lastSignIn: '06/05/2025',
    tier: 'attention'
  }, {
    name: 'Sebastian Watson',
    email: 'sebastian.watson@email.com',
    household: 'Watson Family',
    sentiment: 3,
    status: 'complete',
    lastSignIn: '05/22/2025',
    tier: 'attention'
  }, {
    name: 'Miles Dean',
    email: 'miles.dean@email.com',
    household: 'Dean Family',
    sentiment: 4,
    status: 'complete',
    lastSignIn: '06/05/2025',
    tier: 'reconnect'
  }, {
    name: 'Maya Gomez',
    email: 'maya.gomez@email.com',
    sentiment: 4,
    warn: true,
    status: 'complete',
    lastSignIn: '05/30/2025',
    tier: 'reconnect'
  }, {
    name: 'Emma Rossi',
    email: 'emma.rossi@beaconplan.co',
    sentiment: null,
    status: 'pending',
    secondaryStatus: 'incomplete',
    lastSignIn: '06/05/2025',
    lastLabel: 'Last invited:',
    tier: 'incomplete'
  }, {
    name: 'David Ray',
    email: 'david.ray@email.com',
    sentiment: 5,
    status: 'incomplete',
    lastSignIn: '05/30/2025',
    tier: 'incomplete'
  }];
  const convertedClient = (name, email) => ({
    name,
    email,
    sentiment: 4,
    status: 'complete',
    lastSignIn: new Date().toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    }),
    tier: 'engaged',
    isNew: true
  });
  return {
    tierGroups,
    prospects,
    insights,
    clientTierGroups,
    AVG_KR_SCORE,
    confidenceScore,
    confidenceSegments,
    activeThisWeek,
    activeSeries,
    clientInsights,
    baseClients,
    convertedClient
  };
}();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/advisor/data.js", error: String((e && e.message) || e) }); }

// ui_kits/onboarding/OnboardingApp.jsx
try { (() => {
const {
  FeatureCard,
  Chip,
  Button,
  Card,
  Input
} = window.KnomeeDesignSystem_0c2355;
const Mark = ({
  c = '#fff',
  s = 20
}) => /*#__PURE__*/React.createElement("svg", {
  width: s,
  height: s,
  viewBox: "0 0 32 32",
  fill: "none"
}, /*#__PURE__*/React.createElement("circle", {
  cx: "16",
  cy: "16",
  r: "13",
  stroke: c,
  strokeWidth: "2.2"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "16",
  cy: "16",
  r: "7",
  stroke: c,
  strokeWidth: "2.2"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "16",
  cy: "16",
  r: "2",
  fill: c
}));
const Bolt = () => /*#__PURE__*/React.createElement("svg", {
  width: "22",
  height: "24",
  viewBox: "0 0 25 28",
  fill: "none"
}, /*#__PURE__*/React.createElement("path", {
  d: "M2.5 16.2a1.25 1.25 0 0 1-1-2l12.4-12.7a.5.5 0 0 1 .86.5L12.6 9.6a1.25 1.25 0 0 0 1.2 1.65h8.7a1.25 1.25 0 0 1 .95 2.05L11.1 26.03a.5.5 0 0 1-.87-.5l2.4-7.52a1.25 1.25 0 0 0-1.19-1.63H2.5Z",
  fill: "#FFEAA7",
  stroke: "#FF9525",
  strokeWidth: "2.5",
  strokeLinejoin: "round"
}));
const Bulb = () => /*#__PURE__*/React.createElement("svg", {
  width: "18",
  height: "26",
  viewBox: "0 0 16 25",
  fill: "none"
}, /*#__PURE__*/React.createElement("path", {
  d: "M13.6 8a5.7 5.7 0 1 0-10 3.2c.9.9 1.7 2 2 3.4a1.14 1.14 0 1 1-2.2.5C3.3 14 2.8 13.3 2 12.6A8 8 0 1 1 15.9 8a6.5 6.5 0 0 1-2 4.7c-.9.9-1.3 1.5-1.4 2.3a1.14 1.14 0 1 1-2.2-.5c.3-1.4 1-2.4 2-3.4A5.7 5.7 0 0 0 13.6 8Z",
  fill: "#8200DB"
}), /*#__PURE__*/React.createElement("rect", {
  x: "3.4",
  y: "18.1",
  width: "9.1",
  height: "2.3",
  rx: "1.14",
  fill: "#8200DB"
}), /*#__PURE__*/React.createElement("rect", {
  x: "4.5",
  y: "22.7",
  width: "6.8",
  height: "2.3",
  rx: "1.14",
  fill: "#8200DB"
}));
const Star = () => /*#__PURE__*/React.createElement("svg", {
  width: "22",
  height: "22",
  viewBox: "0 0 25 25",
  fill: "none"
}, /*#__PURE__*/React.createElement("path", {
  d: "M12.5 0a1.7 1.7 0 0 1 1.6 1.25l1.8 7a2 2 0 0 0 1.45 1.45l7 1.8a1.7 1.7 0 0 1 0 3.2l-7 1.8a2 2 0 0 0-1.45 1.45l-1.8 7a1.7 1.7 0 0 1-3.2 0l-1.8-7a2 2 0 0 0-1.45-1.45l-7-1.8a1.7 1.7 0 0 1 0-3.2l7-1.8A2 2 0 0 0 9.2 8.25l1.8-7A1.7 1.7 0 0 1 12.5 0Z",
  fill: "#009966"
}));
const CHIPS = ['Enjoying the moment', 'Comfort', 'Security', 'Philanthropy and giving', 'Supporting my family', 'Choice / Freedom', 'Simplicity', 'Status'];
function Welcome({
  onNext
}) {
  const [sel, setSel] = React.useState([]);
  const toggle = c => setSel(s => s.includes(c) ? s.filter(x => x !== c) : s.length >= 3 ? s : [...s, c]);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '40px',
      maxWidth: 1100,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      font: '500 clamp(28px,3.2vw,44px)/1.3 var(--font-sans)',
      letterSpacing: '-1px',
      color: 'var(--k-plum)',
      textAlign: 'center',
      margin: '0 0 12px'
    }
  }, "Welcome!", /*#__PURE__*/React.createElement("br", null), "Wealth is about experiencing life fully."), /*#__PURE__*/React.createElement("p", {
    style: {
      textAlign: 'center',
      color: 'var(--k-slate)',
      fontSize: 18,
      maxWidth: 700,
      margin: '0 auto 40px',
      lineHeight: 1.5
    }
  }, "Take a few minutes to get clear on what matters most and what your money is really for."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'clamp(32px,5vw,64px)',
      alignItems: 'stretch'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 8,
      color: 'var(--k-body)',
      fontSize: 18
    }
  }, "What you'll get:"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(FeatureCard, {
    icon: /*#__PURE__*/React.createElement(Bolt, null),
    title: "Discover What Matters Most"
  }, "A quick, guided experience that clarifies your values, goals, and priorities."), /*#__PURE__*/React.createElement(FeatureCard, {
    icon: /*#__PURE__*/React.createElement(Bulb, null),
    title: "See Your Personal Insights"
  }, "Receive a personalized summary of what's driving your financial decisions."), /*#__PURE__*/React.createElement(FeatureCard, {
    icon: /*#__PURE__*/React.createElement(Star, null),
    title: "Get Your 3 Most Important Money Questions"
  }, "Walk away with questions to help you think, plan, and prepare for what's next."))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      borderRadius: 'var(--radius-3xl)',
      padding: 'clamp(24px,3vh,40px) clamp(20px,2.5vw,36px)',
      background: 'linear-gradient(145deg,#5a2d8a 0%,#3d1a65 100%)',
      boxShadow: 'var(--shadow-brand)',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      font: '700 22px var(--font-sans)',
      color: '#fff',
      margin: '0 0 4px'
    }
  }, "I want money to help me with\u2026"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'rgba(255,255,255,.65)',
      fontSize: 14,
      margin: '0 0 22px'
    }
  }, "Choose what feels most relevant today. Up to 3."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 10
    }
  }, CHIPS.map(c => /*#__PURE__*/React.createElement(Chip, {
    key: c,
    tone: "onDark",
    selected: sel.includes(c),
    onClick: () => toggle(c)
  }, c))), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 11,
      color: 'rgba(255,255,255,.45)',
      marginTop: 8
    }
  }, sel.length ? 'Up to ' + (3 - sel.length) + ' more · or continue' : 'Select at least one to continue'), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto',
      paddingTop: 24,
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    shape: "pill",
    size: "lg",
    disabled: !sel.length,
    onClick: () => onNext(sel),
    style: {
      background: '#fff',
      color: 'var(--k-plum)',
      border: 'none',
      boxShadow: '0 4px 20px rgba(0,0,0,.2)'
    }
  }, "Discover Financial Joy"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 7,
      fontSize: 13,
      color: 'rgba(255,255,255,.5)'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "12 6 12 12 16 14"
  })), "Est time: 8 min")))));
}
const INSIGHT = {
  'Security': '"You want money to give you a solid foundation — the certainty that things will be okay no matter what."',
  'Supporting my family': '"Your financial life is deeply rooted in the people you love. Money is a way to protect and lift them."',
  'Enjoying the moment': '"You\'re drawn to the fullness of life now, not later. Money is a tool for living richly in the present."'
};
const HEAD = {
  'Security': 'Security & Peace of Mind',
  'Supporting my family': 'Family & Protection',
  'Enjoying the moment': 'Joy & Living Fully'
};
function Reveal({
  picks,
  onSave
}) {
  const top = picks[0] || 'Security';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '40px',
      maxWidth: 980,
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      font: '700 40px var(--font-sans)',
      color: 'var(--k-plum)',
      textAlign: 'center',
      margin: '0 0 8px'
    }
  }, "Here's what we found."), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--k-muted)',
      fontSize: 17,
      marginBottom: 48
    }
  }, "Based on your answers, here's a glimpse of your Financial ID."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 24,
      width: '100%',
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement(Card, {
    radius: "lg",
    pad: 0,
    style: {
      flex: '0 0 300px',
      background: '#f5f5f5',
      border: '1px solid #e0e0e0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '18px 20px 14px',
      borderBottom: '1px solid #e0e0e0'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 20
    }
  }, "\uD83C\uDFC6"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 16,
      color: 'var(--k-body)'
    }
  }, "Key Highlights"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: 'var(--k-muted)'
    }
  }, "Financial Joy"))), /*#__PURE__*/React.createElement("div", {
    style: {
      margin: 16,
      padding: 16,
      background: '#fff',
      borderRadius: 8,
      border: '1px solid #e0e0e0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--k-grape)',
      fontWeight: 600,
      marginBottom: 10
    }
  }, "Your top driver"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '700 20px var(--font-sans)',
      color: 'var(--k-plum)',
      lineHeight: 1.25,
      marginBottom: 12
    }
  }, HEAD[top] || top), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      background: '#e8e8e8',
      margin: '12px 0'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: 'var(--k-muted)',
      textTransform: 'uppercase',
      letterSpacing: '.6px',
      marginBottom: 6
    }
  }, "Insight"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13,
      color: 'var(--k-body)',
      lineHeight: 1.6,
      fontStyle: 'italic',
      margin: 0
    }
  }, INSIGHT[top] || INSIGHT['Security']))), /*#__PURE__*/React.createElement(Card, {
    radius: "lg",
    pad: 0,
    style: {
      flex: 1,
      background: '#f5f5f5',
      border: '1px solid #e0e0e0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '18px 20px 14px',
      borderBottom: '1px solid #e0e0e0'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 20
    }
  }, "\uD83C\uDFAF"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 16,
      color: 'var(--k-body)'
    }
  }, "Financial Joy")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '16px 20px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--k-grape)',
      fontWeight: 600,
      marginBottom: 10
    }
  }, "I want money to help me with"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 8
    }
  }, picks.map(p => /*#__PURE__*/React.createElement(Chip, {
    key: p,
    tone: "soft",
    selectable: false
  }, p)))))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 32,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "accent",
    shape: "pill",
    size: "lg",
    onClick: onSave
  }, "Save my results \u2192")));
}
function SignUp() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: '70vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 40
    }
  }, /*#__PURE__*/React.createElement(Card, {
    radius: "2xl",
    elevated: true,
    pad: 40,
    style: {
      width: 460,
      maxWidth: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement(Mark, {
    c: "#240446",
    s: 22
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '700 15px var(--font-sans)',
      color: 'var(--k-plum)'
    }
  }, "knomee")), /*#__PURE__*/React.createElement("h2", {
    style: {
      font: '700 26px var(--font-sans)',
      color: 'var(--k-plum)',
      margin: '0 0 10px'
    }
  }, "Save your Financial ID"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--k-muted)',
      fontSize: 15,
      lineHeight: 1.55,
      margin: '0 0 24px'
    }
  }, "Create a free account to keep your results and share them with your advisor."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Email address",
    type: "email",
    placeholder: "you@example.com",
    radius: "lg"
  })), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    shape: "pill",
    full: true
  }, "Create account & save \u2192")));
}
function App() {
  const [screen, setScreen] = React.useState('welcome');
  const [picks, setPicks] = React.useState([]);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#fff',
      minHeight: '100vh'
    }
  }, /*#__PURE__*/React.createElement("nav", {
    style: {
      height: 50,
      background: 'var(--k-plum)',
      display: 'flex',
      alignItems: 'center',
      padding: '0 24px',
      gap: 7
    }
  }, /*#__PURE__*/React.createElement(Mark, null), /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#fff',
      fontSize: 13,
      fontWeight: 700
    }
  }, "knomee"), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 'auto',
      width: 30,
      height: 30,
      borderRadius: '50%',
      background: 'rgba(255,255,255,.18)',
      border: '1.5px solid rgba(255,255,255,.3)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
      fontSize: 11,
      fontWeight: 700
    }
  }, "S")), screen === 'welcome' && /*#__PURE__*/React.createElement(Welcome, {
    onNext: s => {
      setPicks(s);
      setScreen('reveal');
    }
  }), screen === 'reveal' && /*#__PURE__*/React.createElement(Reveal, {
    picks: picks,
    onSave: () => setScreen('signup')
  }), screen === 'signup' && /*#__PURE__*/React.createElement(SignUp, null));
}
window.OnboardingApp = App;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/onboarding/OnboardingApp.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Chip = __ds_scope.Chip;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Accordion = __ds_scope.Accordion;

__ds_ns.Tabs = __ds_scope.Tabs;

__ds_ns.FeatureCard = __ds_scope.FeatureCard;

__ds_ns.KQBadge = __ds_scope.KQBadge;

__ds_ns.SentimentDots = __ds_scope.SentimentDots;

__ds_ns.StatusBadge = __ds_scope.StatusBadge;

})();
