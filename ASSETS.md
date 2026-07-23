# Assets — visual identity, themes, logo, photo

Companion to PROJECT_SPEC.md. This is where the *actual design values* live — colors, logo files, photo treatment specifics.

## Theme palettes — v2, redesigned per Ivan's explicit request

Ivan rejected the original proposal as "just colors" and asked for genuinely distinct themes, with Cyber specifically modeled on **nesen.ch's dark mode** (a real reference site — a fellow developer's portfolio). Values below for Cyber were extracted live from that site (computed styles, not eyeballed) rather than invented. Each theme now differs in more than color: font family, corner radius (cards vs. buttons separately), shadow style, and blur.

### 1. Cyber (default theme) — grounded in nesen.ch's dark mode
- `--bg: #0A121E` / `--surface: #111E30` / `--surface-2: #0D1828`
- `--text: #FFFFFF` / `--text-muted: #93A4B8`
- `--accent: #2E9FD9` (sky blue) / `--accent-2: #28CA41` (green, sparing use)
- `--border: rgba(46,159,217,0.18)`
- Card radius `18px`, **button radius `999px` (full pill)** — matches nesen.ch exactly
- Font: DM Sans (`--font-dm-sans`, loaded via next/font/google)
- Shadow: soft dark drop shadow on cards (`0 8px 24px rgba(0,0,0,.35)`), soft blue glow under the primary CTA
- Feel: professional developer/agency — the one meant to make the best first impression

### 2. Minimal — stark black/white, deliberately restrained
- `--bg: #FFFFFF` / `--surface: #FFFFFF` / `--surface-2: #F5F5F5`
- `--text: #0A0A0A` / `--text-muted: #6B6B6B`
- `--accent: #0A0A0A` (no color at all — pure black on white is the point)
- `--border: #E5E5E5`
- Card radius `4px`, **button radius `4px` (sharp, not pill)** — deliberately the opposite of Cyber's pills
- Font: Geist Sans (the app's default)
- Shadow: none, blur: none — totally flat

### 3. Glass — frosted, pastel, dreamy
- `--bg: #EEF1FF` (soft lavender)
- `--surface: rgba(255,255,255,0.55)` / `--surface-2: rgba(255,255,255,0.35)` — translucent, paired with `backdrop-filter: blur(16px)` on the shared `.card` class
- `--text: #1C1A2E` / `--text-muted: #5B5875`
- `--accent: #7C6CFF` (purple) / `--accent-2: #FF8BD6` (pink)
- Card radius `24px`, button radius `999px` (pill)
- Font: Geist Sans
- Shadow: soft purple-tinted glow (`0 8px 32px rgba(124,108,255,.15)`)

### 4. Experimental — near-black, acid neon, brutalist
- `--bg: #060606` / `--surface: #121212` / `--surface-2: #1A1A1A`
- `--text: #F5F5F0` / `--text-muted: #8C8C86`
- `--accent: #C6FF3D` (acid lime) / `--accent-2: #FF3D6E` (hot pink)
- `--border: #262626`
- Card radius `0px` (hard edges), button radius `2px` (sharp, not pill)
- Font: Space Mono (`--font-space-mono`) — the only monospace theme, reads as "underground/hacker" rather than Cyber's clean corporate-dev feel
- Shadow: hard offset "sticker" shadows (`4px 4px 0 rgba(198,255,61,.15)` on cards, `3px 3px 0 rgba(255,61,110,.6)` under the CTA) — a print-misregistration/glitch look, no blur at all

**Architecture:** all of this lives as CSS custom properties per `[data-theme="..."]` block in `globals.css`, plus a shared `.card` utility class (background/border/radius/shadow/blur) used by every card-like surface across the site (project/tool cards, service cards, gallery frame, status-note callouts, the contact email box) — so the distinct per-theme treatment applies automatically everywhere without touching component code.

## Logo

- Concept (decided): "IO" monogram — the "O" rendered as a digital core/ring rather than a plain letterform.
- Implemented: `src/app/icon.svg` (favicon) and `src/app/apple-icon.tsx` (iOS home-screen icon, generated via `next/og` `ImageResponse` from the same design). Fixed single design, not yet re-colored per theme — favicons can't respond to `data-theme` anyway since they're requested independently of any page load.

## Photo treatment — resolved, changed from original plan

- Original plan called for a grayscale/duotone stylized treatment. **Ivan asked for the photo in full color instead** — implemented in `AvatarPhoto.tsx` as the real photo with just a themed accent-color ring border, no filter.
- File: `/public/photo/ivan.jpg` (provided by Ivan).
- Known issue flagged to Ivan (not fixed by Claude, his call): the current photo is a dim, candid nighttime selfie — not particularly "premium/professional" for a portfolio meant to impress clients. Swap the file whenever a better one exists; nothing else needs to change.

## Still open
- Real screenshots for Parserize and Reflux (Ivan doesn't have them yet — the gallery already has a clean text placeholder fallback for this case)
- A distinct logo lockup/wordmark beyond the small monogram, if ever wanted
