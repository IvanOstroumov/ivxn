# Build Plan — Ivan Labs Portfolio

Reference PROJECT_SPEC.md for all decisions this plan executes against. Update checkboxes as work completes; don't let this drift from reality either.

## Phase 0 — Scaffold
- [x] `git init`, initial commit (repo structure, this doc set)
- [x] Next.js + TypeScript + Tailwind app scaffolded (App Router), build verified, dev server verified in browser
- [x] Framer Motion, next-intl, Vercel Blob SDK installed
- [x] Base folder structure: `src/app/`, `src/components/`, `src/lib/`, `content/`, `public/`
- [x] ESLint baseline (from create-next-app)

## Phase 1 — Theme system
- [x] Define CSS variable tokens (color, spacing, radius, font) per theme (`src/app/globals.css`)
- [x] Propose 4 theme palettes (Minimal, Cyber, Glass, Experimental) — implemented, pending Ivan's visual approval/tweaks (see ASSETS.md)
- [x] Theme switcher dropdown component with animation, localStorage persistence (`src/components/ThemeSwitcher.tsx`)
- [x] Default = Cyber for first-time visitors — verified in browser
- [ ] Verify all page templates render correctly under all 4 themes before moving on — will re-check as real pages are built in Phase 3; demo page confirmed switching/persistence works

## Phase 2 — Core layout & i18n
- [ ] Sticky animated nav (desktop) + fullscreen animated mobile menu
- [ ] i18n setup: EN/RU/IT/DE/FR, browser auto-detect with English fallback
- [ ] Footer (contact recap + plain copyright line)
- [ ] Persistent CTA component ("Contact Me" / "Hire Me") reused across hero/nav/project/tools pages

## Phase 3 — Page builds
- [ ] Hero: name, "Ivan Labs", tagline, stylized/theme-tinted photo, CTA
- [ ] About: drafted bio copy (Claude draft → Ivan approval)
- [ ] Services section
- [ ] Skills section (categorized, visually driven, not a plain list)
- [ ] Projects: filterable grid (Android/AI/Web/Tools/Experiments/Desktop/Automation, extensible), project detail template with main image + thumbnail swap
- [ ] Tools: downloads page + tool detail template, Vercel Blob-backed downloads
- [ ] Contact: email (placeholder until real address confirmed) + GitHub/Telegram/WhatsApp/LinkedIn
- [ ] CV: drafted content (Claude draft → Ivan approval) exported to a downloadable PDF, "Download CV" button wired up

## Phase 4 — Admin panel
- [ ] Single-password auth (env var) gate
- [ ] Add/Edit Project form → writes to content store
- [ ] Add/Edit Tool form → writes to content store + Vercel Blob upload
- [ ] Basic listing/edit/delete UI for existing entries

## Phase 5 — Performance & polish
- [ ] Image optimization, lazy loading pass
- [ ] Lighthouse pass on all 4 themes, all locales — target 100/100/100/100
- [ ] Analytics wired (Plausible or Umami)
- [ ] Favicon/logo (IO monogram) finalized across sizes

## Phase 6 — Launch
- [ ] Ivan creates GitHub repo, shares remote URL → connect + push
- [ ] Connect Vercel project, set env vars (admin password, Blob token, analytics)
- [ ] Point ivxn.dev DNS at Vercel
- [ ] Final content pass: real projects/tools, real email, real photo
- [ ] Go live

## Explicitly deferred (not in v1)
- Easter eggs of any kind
- Timeline/CV gimmick section
- Background audio
