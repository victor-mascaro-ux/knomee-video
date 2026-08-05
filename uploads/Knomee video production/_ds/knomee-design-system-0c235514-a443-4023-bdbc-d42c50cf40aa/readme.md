# Knomee Design System

**Knomee** helps financial advisors understand what their clients and prospects actually *want money for* — before the numbers. The consumer answers a short, guided "Financial Joy / Confidence" experience that surfaces their values, goals and concerns and produces a **Financial ID** and their **3 most important money questions**. Advisors see prospects and clients scored by a **KQ (Knomee Quotient)**, tiered by readiness, with an "actionable insight" and a one-click **convert to client** flow.

The brand voice is warm, human and optimistic: *"Wealth is about experiencing life fully."* Deep plum anchors the brand; teal and lime bring the "joy" energy.

## Products represented
1. **Advisor app** — the practice-facing dashboard: **My Prospects** and **My Clients** tables with KQ scores, readiness tiers, sentiment, top actions, and the convert-to-client modal + confetti.
2. **Consumer onboarding** — the prospect-facing "Financial Joy / Confidence" adventure: welcome, value chips, a more/same/less priorities matrix, a loading build, the Financial-ID **reveal**, and a save/login step.
3. **Sign-up** — advisor-branded account creation and personalized-insights summary.

## Sources (for the reader — you may not have access)
- **GitHub (primary source of truth):**
  - `victor-mascaro-ux/knomee-converting-v1` — advisor Prospects/Clients screens, convert modal, confetti. https://github.com/victor-mascaro-ux/knomee-converting-v1
  - `victor-mascaro-ux/landing-page` — the consumer Financial-Joy onboarding flow. https://github.com/victor-mascaro-ux/landing-page
  - `victor-mascaro-ux/sign-up-page` — advisor-branded sign-up + insight summary. https://github.com/victor-mascaro-ux/sign-up-page
  - Related Knomee repos worth exploring: `knomee-demo`, `reporting-dashboard`, `organization-settings`, `customization-modal`, `save-progress`, `loading-insights`, `billing-analytics` (all under `victor-mascaro-ux` / `KnomeeID`). Explore these to build richer, more accurate Knomee designs.
- **Figma:** "Ready for Development.fig" was in scope but the Figma virtual filesystem was **not mounted** in this session (see Caveats). Everything here is grounded in the GitHub code and the uploaded brand assets, which are the authoritative source.
- **Uploaded brand assets:** knomee wordmark + concentric-heart mark in plum/white/teal/aqua/black; "Knomee Advisor" lockups.

---

## VISUAL FOUNDATIONS

**Color.** The spine is **plum `#240446`** — every nav bar, headline, and primary button. Interactive purple is **grape `#7639a1`** (button/link hover). The "joy" side of the brand is **teal `#3dbdaa`** (consumer save CTA, question numbers) with washes `#e6f7f5`/`#c0ffe7`, plus deep **ocean `#086375`** and **steel `#6ba1ac`** for advisor readiness tiers, and **lilac `#b98ddc`** for the lowest tier. Signal accents are sparing and bright: **tangerine `#ff9525`** (energy/lightning), **lime `#affc41`** ("new" tag/sparkle), amber `#f59e0b` (warnings), and a violet **bolt `#a855f7`** for the convert action. Neutrals run a warm-cool gray ramp (`#1a1a1a` → `#364153` → `#757575` → `#afafaf` → `#cccccc` → `#eeeeee`) on an off-white app canvas `#f5f5f7`.

**Type.** **Poppins** does everything — headlines at medium/semibold with tight negative tracking (`-0.5px` to `-1px`), body at regular. **Sedan** (serif) is a single accent, used only for the advisory-firm name in the product nav (uppercase, letter-spaced). **Roboto** appears *only* inside Google auth buttons. Page titles ~36px, hero/display up to 48px, body 14–15px.

**Shape & radius.** Two radius languages coexist: **soft rounded rectangles** (8–20px) for cards, inputs and the advisor app; and **full pills (999px)** for consumer buttons, chips, badges and status tags. Avatars and radio dots are circles.

**Cards.** White surface, 1px hairline border (`#e8e8e8`), soft radius (12–20px), and a very light resting shadow. The signature move is a **6px grape accent bar along the bottom edge** of feature cards. Card groups sit in a faint plum wash tray (`rgba(36,4,70,0.05)`).

**Elevation.** Restrained — most cards rely on the hairline border. Real shadow appears on modals (`0 4px 24px rgba(0,0,0,.25)`), the dark toast (`0 8px 40px`), floating CTAs, and the plum "door" brand panel on the welcome screen.

**Backgrounds.** Mostly flat white / off-white. The one recurring gradient is the plum "door/window" panel (`linear-gradient(145deg,#5a2d8a,#3d1a65)`) with a soft radial glow at its top — used to frame the first onboarding question. No textures, no photography baked into the system (photo areas are circular placeholders).

**Motion.** Fast and functional. Content **fades up** on entry (opacity + `translateY(22px)`, ~0.55s). CTAs lift 1–2px on hover; press states shrink (`scale(.96)`). Loading uses a teal spinner + progress bar. Success is celebrated with confetti + a slide-up toast (custom easing `cubic-bezier(.22,.81,.28,1.05)`).

**Hover / press.** Primary buttons darken plum→grape and lift; secondary (outline) buttons shift border+text to grape; ghost/kebab controls get a faint plum or pearl wash; the bolt action deepens violet. Inputs move their 1.5px border to grape on focus.

**Layout.** Advisor content maxes at 1500px with 60px desktop gutters; marketing at 1200px. Top nav is fixed plum, 52–60px tall. Tables collapse columns progressively at 1024/900/700/480px breakpoints down to just Name + overflow.

---

## CONTENT FUNDAMENTALS

- **Voice:** warm, encouraging, plain-spoken. Second person ("**you**", "**your** results", "what **your** money is really for"). Advisors are addressed directly too ("**My** Prospects", "**My** Clients").
- **Casing:** Title Case for page titles, tabs and buttons ("Discover Financial Joy", "Convert to Client"). ALL-CAPS with letter-spacing only for structural labels (tier banners "TIER 1 — READY NOW", "SHOW MORE", the Sedan firm name).
- **Tone examples:** "Welcome! Wealth is about experiencing life fully." · "Take a few minutes to get clear on what matters most and what your money is really for." · "Here's what we found." · "Building your Financial ID…" · "Save your Financial ID".
- **Buttons are verbs / outcomes:** "Discover Financial Joy", "Get started", "Save my results →", "Convert", "View My Results". Arrows (→ ↵) suffix forward-motion CTAs.
- **Numbers with meaning only.** KQ scores, tier ranges (70–100 / 40–69 / 0–39) and sentiment dots are real signals, never decoration.
- **Emoji:** used sparingly in the *consumer* flow as friendly section glyphs (🏆 🎯 ⚡ 💡 🛡️ ✨). The advisor app avoids emoji and uses line/solid SVG icons instead. Keep emoji out of dense advisor UI.

---

## ICONOGRAPHY

- **Style:** simple, geometric **line icons** at ~2–2.5px stroke with round caps/joins (hamburger, chevron, search, download, plus, close, clock, warning). Drawn on a 24×24 grid. A few **solid** glyphs appear for emphasis — the lightning **bolt** (the "convert"/insight motif) and the bar-chart. There is **no bundled icon font**; icons are inline SVG.
- **Substitution:** the set closely matches **Lucide** (same 24-grid, 2px round-cap geometry). When you need an icon not present in the code, pull the equivalent from Lucide (https://lucide.dev) and keep stroke-width ~2. *(Flagged as the recommended CDN match — no proprietary icon assets were provided.)*
- **Brand marks:** the **concentric-heart mark** and the **"knomee®" wordmark** live in `assets/logos/` (plum / white / teal / aqua / black, plus the "Knomee Advisor" lockups). `assets/icons/icon-home.svg` is the household badge used on client avatars. Use the white marks on plum, plum/black on light.
- **Emoji:** only in the consumer flow (see Content Fundamentals). Unicode chars used as micro-glyphs: the name-link chevron "›", arrows "→ ↵", the kebab "⋯".

---

## Components (`window.KnomeeDesignSystem_0c2355.*`)
Reusable primitives, grounded in the real product code:
- **core/** — `Button`, `IconButton`, `Input`, `Avatar`, `Card`, `Chip`, `Badge`
- **navigation/** — `Tabs`, `Accordion`
- **feedback/** — `Dialog`, `Toast`
- **product/** — `KQBadge`, `StatusBadge`, `SentimentDots`, `FeatureCard`

Each component has a sibling `.d.ts` (props + adherence) and `.prompt.md` (usage). Load the compiled bundle (`_ds_bundle.js`) and read components off `window.KnomeeDesignSystem_0c2355`.

## Index / manifest
- `styles.css` — global entry point (imports the token layers below only).
- `tokens/` — `fonts.css`, `colors.css`, `typography.css`, `spacing.css`, `effects.css`.
- `components/` — the primitives above (`core/`, `navigation/`, `feedback/`, `product/`).
- `assets/logos/` — wordmarks + concentric-heart marks; `assets/icons/` — household badge; `assets/reference/` — advisor dashboard/modal screenshots.
- `ui_kits/` — full-screen product recreations *(in progress — see Caveats)*.
- `SKILL.md` — Agent-Skills-compatible entry point.

## Caveats
- **Figma not accessible this session** — the "Ready for Development.fig" virtual filesystem was not mounted, so everything is grounded in the GitHub code + uploaded assets (a strong, self-consistent source). If you re-attach the Figma, I can reconcile any component variants or tokens it carries that the code doesn't.
- **Fonts load from Google Fonts CDN** (Poppins/Sedan/Roboto), not self-hosted binaries — so the compiler reports 0 `@font-face` fonts. If you want them self-hosted, share the files and I'll add `@font-face` rules.
- **Icons:** no proprietary icon set was provided; Lucide is the recommended CDN match.
- **UI kits + foundation specimen cards are still to be built** (recorded in the plan).
