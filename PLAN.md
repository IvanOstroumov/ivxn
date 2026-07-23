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
- [x] Sticky animated nav (desktop) + fullscreen animated mobile menu — `src/components/Nav.tsx`, verified in browser at desktop + mobile viewport
- [x] i18n setup: EN/RU/IT/DE/FR via next-intl, `/[locale]` routing, auto-detect with English fallback (`src/i18n/`, `src/proxy.ts`, `messages/*.json`) — verified locale switch (EN↔RU) works live
- [x] Footer (contact recap + plain copyright line) — `src/components/Footer.tsx`
- [x] Persistent CTA component — `src/components/CTAButton.tsx`, used in Nav (desktop+mobile) and Hero
- Note: nav links to About/Services/Projects/Tools/Skills/Contact currently point to placeholder stub pages ("Coming in Phase 3") so links don't 404 — real content lands in Phase 3

## Phase 3 — Page builds
- [x] Hero: name, "Ivan Labs", tagline, avatar placeholder (real photo pending), CTA — verified in EN/RU/DE/FR
- [x] About: drafted bio copy (Claude draft, needs Ivan's approval/edits) — `messages/*.json` "about" namespace
- [x] Services section — 6 service cards from spec
- [x] Skills section (categorized tag groups: Languages/Development/Technologies/Other)
- [x] Projects: filterable grid (category filter verified live — clicking "Web" correctly narrows to Parserize), project detail template with main image + thumbnail swap (verified swap works after fixing an AnimatePresence bug, see below)
- [x] Tools: downloads page + tool detail template — shows "Not available yet" correctly when no download URL is set; real Vercel Blob wiring deferred to Phase 4 (admin panel) since there's nothing to upload yet
- [x] Contact: "email coming soon" placeholder + GitHub (real)/Telegram/WhatsApp/LinkedIn (placeholder hrefs, pending Ivan's actual handles)
- [x] CV: drafted content reuses About copy; "Download CV" button present but disabled with a note — no PDF uploaded yet
- **Bug found + fixed during verification:** `ProjectGallery`'s `AnimatePresence mode="wait"` got stuck mid-exit (frozen at opacity 0), so thumbnail clicks updated state but the visible image label never changed. Fixed by dropping AnimatePresence for a simpler enter-only fade keyed by `active`. Confirmed working after the fix.
- Content (project/tool descriptions) is English-only for now — translating the real copy into all 5 languages is deferred; UI chrome (nav/buttons/labels) is fully translated in all 5

## Phase 4 — Admin panel
- [x] Single-password auth (env var) gate — `src/lib/auth.ts`, cookie holds a hash not the raw password. Verified: wrong password rejected, correct password logs in, logout destroys session and re-protects `/admin`
- [x] Add/Edit Project form → writes to content store — verified end-to-end (added "Test Project" via the real form/server action, confirmed it appeared on the public `/en/projects` page, then deleted it and confirmed `content/projects.json` matched git's committed version exactly)
- [x] Add/Edit Tool form → writes to content store; upload wired to Vercel Blob via `/api/admin/upload`, with a clear "not configured yet" error until `BLOB_READ_WRITE_TOKEN` is set (Ivan hasn't connected Vercel yet — every URL field also accepts a pasted URL directly so the panel is usable before that's set up)
- [x] Basic listing/edit/delete UI for existing entries — `/admin` dashboard
- Architecture note: content moved from static `.ts` arrays (Phase 3) to `content/projects.json` + `content/tools.json`, read/written through `src/lib/content-store.ts`. That module uses Vercel Blob when `BLOB_READ_WRITE_TOKEN` is set (required in production — Vercel's filesystem is read-only/ephemeral) and falls back to writing the local JSON files directly otherwise (dev-only). Projects/Tools list + detail pages became `force-dynamic` (previously static) since content can now change without a rebuild.
- `/admin` is a standalone, non-localized route tree (excluded from the i18n proxy matcher) with its own root layout fixed to the Minimal theme — it's a single-user tool, not public content, so it was left untranslated.
- **Bug found + fixed during verification:** async Server Components calling next-intl's synchronous `useTranslations` (rather than the async `getTranslations`) threw "Expected a suspended thenable" once those routes became `force-dynamic`. Fixed in `projects/page.tsx` and `tools/page.tsx` by switching to `getTranslations`.

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
