# Assets — visual identity, themes, logo, photo

Companion to PROJECT_SPEC.md. This is where the *actual design values* live once decided — colors, logo files, photo treatment specifics — so Phase 1 (theme system) has concrete numbers to build against instead of vague direction.

## Theme palettes (proposed by Claude — pending Ivan's approval per PROJECT_SPEC.md §3)

These are starting proposals, not final. Each theme needs: background, surface, primary text, muted text, accent, and a secondary accent. Exact hex values will be tuned visually once built and previewed live — listing directional values here as a starting point so the build isn't blocked.

### 1. Minimal
- Background: near-white (`#FAFAFA`) / near-black (`#0A0A0A`) in dark mode
- Surface: very subtle off-white/off-black, barely-there contrast
- Text: near-black / near-white, high contrast, no color tint
- Accent: single restrained accent color (candidate: a muted blue or plain black-on-white with no accent at all — "restraint" is the point)
- Feel: Apple-like, lots of whitespace, thin type weights, minimal color

### 2. Cyber (default theme for first-time visitors)
- Background: deep near-black with a cool undertone (`#08090C`)
- Surface: dark slate panels, subtle glow edges
- Accent: electric cyan or magenta (candidate: `#00F0FF` / `#FF2D8A`) — used sparingly for CTAs, links, active states
- Typography: slightly more geometric/technical feel
- Feel: futuristic, high-tech, confident — first impression should feel deliberate, not gaudy

### 3. Glass
- Background: soft gradient (candidate: pale violet-to-blue or warm neutral gradient)
- Surface: frosted glass panels — `backdrop-filter: blur()`, translucent white/dark overlays, soft drop shadows
- Accent: soft pastel accent, low saturation
- Feel: modern, airy, trendy — most "designed" feeling of the four

### 4. Experimental
- Background: bold, potentially asymmetric or animated gradient/pattern
- Surface: less rigid grid, more overlapping/layered elements
- Accent: high-contrast or unexpected color pairing (candidate: acid green + near-black, or duotone split)
- Feel: the one theme allowed to break "clean minimalism" a bit and show personality/artistic risk

**Build note:** implement as a token system (CSS custom properties per theme, swapped via a `data-theme` attribute), not hardcoded classes per component — makes future palette tuning trivial without touching component code.

## Logo

- Concept (decided): "IO" monogram — the "O" rendered as a digital core/ring rather than a plain letterform.
- Must scale cleanly from favicon (16×16, 32×32) up to a larger wordmark/lockup use.
- Needs a version per theme (or a single flexible version using `currentColor`/CSS variables so it inherits the active theme's accent automatically) — simplest approach: build it as an SVG using theme CSS variables for its stroke/fill, so one asset works across all 4 themes without four separate exports.
- Not yet drawn — do during Phase 1/5 alongside theme finalization.

## Photo treatment

- Decided: **stylized**, not a plain photo — duotone/grayscale/theme-tinted.
- Should re-tint per active theme (e.g. cyan/magenta duotone in Cyber, soft pastel in Glass, pure grayscale in Minimal, bolder/high-contrast treatment in Experimental) so it doesn't clash when the visitor switches themes.
- Placement: hero section (see PROJECT_SPEC.md §4).
- File: not yet provided — Ivan will send later. Once received, needs: reasonably high resolution, decent lighting/plain-ish background preferred (easier to treat consistently across 4 themes), but Claude/Ivan can adjust the treatment approach once the actual photo is in hand.

## Still needed
- Ivan's approval/tweaks on the 4 palette directions above once previewed live in the build
- The actual photo
- Final logo SVG
