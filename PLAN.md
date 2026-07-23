# Build Plan — Ivan Labs Portfolio

Reference PROJECT_SPEC.md for all decisions this plan executes against. Update checkboxes as work completes; don't let this drift from reality either.

## Post-Phase-5 polish batch (from STATUS_REPORT.md "easy to add" list)
- [x] Apple touch icon (PNG) — `src/app/apple-icon.tsx`, generated via `next/og` `ImageResponse` from the same IO monogram as `icon.svg`, 180×180. **Bug found + fixed:** it 307→404'd at first because the i18n middleware didn't exclude it (no file extension in the URL, so the "has a dot" bypass rule didn't catch it, unlike `/icon.svg`) — added `apple-icon` to the proxy matcher exclusions alongside `admin`. Verified 200 and renders correctly after the fix.
- [x] Visible breadcrumb navigation — `src/components/Breadcrumbs.tsx`, matches the existing `BreadcrumbList` JSON-LD hierarchy (Home / Projects or Tools / item), on both project and tool detail pages, translated, verified in EN/RU/DE.
- [x] Custom themed 404 page — `src/app/[locale]/not-found.tsx`, translated in all 5 locales, inherits the active theme automatically (renders inside the matched `[locale]` layout). Verified live.
- [x] Loading skeletons — `loading.tsx` for Projects list/detail and Tools list/detail, theme-token-based pulse placeholders matching each page's real layout.
- [x] Admin login rate-limiting — `src/lib/rate-limit.ts`, in-memory per-IP cooldown (5 failures → 15 min lockout), per Ivan's choice of the simple approach over an external store. Verified live: 6th wrong attempt in a row correctly locks out, and the *correct* password is also rejected during lockout.
- [x] `rel="me"` on the GitHub link (Footer + Contact page) — reinforces the `Person` JSON-LD. Telegram/WhatsApp/LinkedIn will get it once they're real links.
- [x] **Project/tool content translated into all 5 languages**, per Ivan's approval. This required restructuring the content model: `Project`/`Tool` text fields (`shortDescription`, `fullDescription`, `statusNote`, `description`, `unavailableNote`) became `LocalizedText` objects (`{en, ru, it, de, fr}`) instead of plain strings — product names (`title`/`name`) stay untranslated on purpose. Added `src/lib/localized.ts` (`getLocalized`, falls back to English), updated every consuming page (list + detail, metadata, JSON-LD) to resolve text for the current locale, and rebuilt the admin `ProjectForm`/`ToolForm` with a new `LocalizedFields` component (one input/textarea per locale per field). `llms.txt`/`llms-full.txt` stay English-only by design (noted in the file itself). Verified end-to-end: translations render correctly in RU/DE, editing one locale's field via the admin panel leaves the other 4 untouched, and the change is immediately live on the public site.
- Rebuilt, linted, and route-swept clean after every change in this batch (all 65 locale×page combos + all root-level metadata routes return 200).

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
- [x] Image optimization, lazy loading — no real images uploaded yet (only placeholders), so nothing to optimize yet; the gallery/photo components are already structured to take real URLs later
- [x] SEO: per-locale `generateMetadata` (title/description/OG from translations), `alternates.languages` for hreflang, `robots.ts` (disallows `/admin`), `sitemap.ts` (all 5 locales × all static + project + tool pages — 65 URLs, verified)
- [x] Analytics wired — Plausible via `src/components/Analytics.tsx`, conditionally rendered only when `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` is set (no-op until Ivan creates an account)
- [x] Favicon: `src/app/icon.svg`, IO monogram (I + ring-with-core O) per ASSETS.md, verified renders correctly in browser
- [x] `llms.txt` (`src/app/llms.txt/route.ts`) — plain-text site summary for AI crawlers/assistants (same spirit as robots.txt/sitemap.xml), generated live from the content store so it stays in sync with admin edits automatically. Not originally in the spec — added on request, verified renders correctly
- [x] `llms-full.txt` (`src/app/llms-full.txt/route.ts`) — the fully expanded companion: complete project/tool descriptions, tech stacks, statuses, all skills, all services, About bio, contact links, site structure — everything, generated live from the same content store
- [x] **SEO deep pass** (on request, "toptop SEO"): every page now gets its own unique `<title>`/description/canonical/hreflang/OG/Twitter-card tags via `src/lib/seo.ts` + per-page `generateMetadata` — previously every page silently inherited the same title and, worse, the same *incorrect* canonical URL (every page claimed `/en` as canonical, which actively hurts indexing of everything except the homepage). Added JSON-LD structured data: `Person` on the homepage (name, sameAs, knowsAbout), `CreativeWork` + `BreadcrumbList` on every project page, `SoftwareApplication` + `BreadcrumbList` on every tool page. Verified live: unique titles, correct canonicals, valid JSON-LD, all confirmed in-browser across locales.
- [ ] Actual Lighthouse 100/100/100/100 run — needs a deployed URL (Lighthouse doesn't run meaningfully against `next dev`); do this in Phase 6 once deployed to Vercel

## Full QA sweep (end of Phase 5, per Ivan's request to re-verify everything)
Re-tested the entire app end to end, not just the new Phase 5 pieces:
- **HTTP sweep:** all 65 locale×route combinations (5 locales × 13 pages) return 200
- **Edge cases:** unknown project/tool slug → 404, unknown locale → redirects then 404, `/admin` without a session → redirects to login, root `/` → redirects to a locale
- **All 4 themes** verified to resolve distinct, correct `--bg` values live in-browser
- **Mobile menu** re-verified (opens, shows translated links + switchers + CTA, closes on nav)
- **Project gallery thumbnail swap** re-verified on a second project (Parserize) — still correct after Phase 4's data-source change from static arrays to the JSON content store
- **Reflux copy** re-checked word-for-word: "Paused" status, no "Work in Progress" language anywhere, matches Ivan's explicit instruction
- **Admin CRUD** re-run after Phase 5 changes: add → appears on public site → delete → file matches git-committed state exactly; also tested editing an existing tool (Rhyme Studio version field), confirmed it updated live, then reverted
- **`npm run lint`**: found 3 real issues, fixed all — see below
- **`npm run build`**: clean after every fix, zero errors, zero warnings

### Bugs found and fixed this session (in order)
1. **Frozen project gallery (Phase 3):** `AnimatePresence mode="wait"` got stuck mid-exit (element stuck at `opacity: 0`), so thumbnail clicks updated state but the visible label never changed. Fixed by dropping AnimatePresence for a simple enter-only fade.
2. **"Expected a suspended thenable" crash (Phase 4):** calling next-intl's synchronous `useTranslations` inside `async` Server Components crashed once those routes became `force-dynamic`. Fixed by switching to the async `getTranslations` in `projects/page.tsx` and `tools/page.tsx`.
3. **Self-inflicted near-miss (Phase 5):** while fixing an ESLint `set-state-in-effect` warning in `ThemeProvider`, first tried a lazy `useState` initializer reading `data-theme` off the DOM directly. That's actually worse: the server always renders `DEFAULT_THEME`, so on any client with a different stored theme, React hit a genuine **text-content hydration mismatch** in `ThemeSwitcher` ("Cyber" vs "Minimal") and fully crashed/regenerated the tree — caught by reproducing it live (set `minimal` in localStorage, hard-reloaded, saw "Uncaught Error: Hydration failed"). Reverted to the original effect-based sync (server and client both start at `DEFAULT_THEME`, correct to the stored value in a harmless post-mount re-render) and silenced the lint rule for that one line with a comment explaining why — confirmed no crash on re-test of the exact same repro.

## Real content integration (Ivan's media/ drop)
Ivan provided real assets via a `media/` folder (gitignored — contains `data.txt` with contact info + admin password, never committed) and confirmed: no LinkedIn, `parserize.site` stays offline, and the 6 existing projects/tools are the final launch list.
- [x] Real photo — `/public/photo/ivan.jpg`, stylized (grayscale + accent ring per ASSETS.md), wired into Hero + Person JSON-LD (`AvatarPlaceholder.tsx` replaced with `AvatarPhoto.tsx`)
- [x] Real screenshots for Beat the Piano and SAMT: All Stars (4 each) — `Project.images` field added to the content model, `ProjectGallery` now renders real `next/image` when present, falls back to the text placeholder for Parserize/Reflux (no screenshots provided for those two)
- [x] Real APK downloads for Rhyme Studio and World Travel Tracker — served from `/public/downloads/` (simpler than Vercel Blob for two known static files that rarely change; can migrate to Blob later if that changes), verified correct content-type and matching file size
- [x] Real contact info — email, Telegram, WhatsApp live on Contact page, Footer, and Person JSON-LD (`src/lib/contact-info.ts` is the single source); LinkedIn removed rather than left as a dead link
- [x] Real `llms-full.txt` contact section updated to match
- [x] Admin password set to Ivan's real value in `.env.local` — **flagged to Ivan**: this exact string was already pasted in chat earlier as a different account's login, so it should be treated as compromised and ideally changed before relying on it in production
- Verified end-to-end in browser: photo loads via Next's image optimizer, gallery thumbnail-swap still works with real images (re-confirmed after initial flaky false-negative from the browser automation tool, not a real bug), Parserize/Reflux correctly still show placeholders, both APKs download with correct headers, contact links all resolve correctly, admin login works with the real password
- Rebuilt, linted, and route-swept clean (including the two new `/downloads/*.apk` routes)

## Post-launch: mobile bug fix + full theme redesign
Site went live on Vercel + `ivxn.dev` (see below), then Ivan tested on a real phone and reported real problems, plus asked for a full visual direction change.

- [x] **Real bug fixed:** the mobile fullscreen menu didn't actually cover the page — content bled through underneath it. Root cause: the menu's `fixed inset-0` div was nested inside `<header>`, and the header has `backdrop-blur` (`backdrop-filter`), which creates a new CSS containing block for `position: fixed` descendants. That made the "fixed" menu size itself to the header's own box instead of the viewport. Fixed by moving the overlay to be a sibling of `<header>` instead of a child. Verified: overlay now measures the full viewport (375×812 tested) and sits at full opacity, `z-index: 50`, above all page content.
- [x] Photo changed from grayscale to full color, per Ivan's request (`AvatarPhoto.tsx`).
- [x] **Full theme redesign**, per Ivan's explicit "these are just colors, redo everything" feedback:
  - Fetched nesen.ch live (a real reference site Ivan pointed to) and extracted its actual dark-mode computed styles (background, accent, radius, font) rather than guessing — Cyber is now genuinely modeled on that: navy `#0A121E` background, sky-blue `#2E9FD9` accent, pill-shaped (`999px`) buttons, `18px` rounded cards, DM Sans font.
  - Rebuilt Minimal (stark white/black, sharp `4px` corners, zero shadows), Glass (frosted `backdrop-filter: blur(16px)` panels, pastel lavender/purple, pill buttons), and Experimental (near-black + acid-lime/hot-pink, `0px` hard corners, Space Mono font, hard offset "sticker" shadows instead of soft blur) so all 4 are structurally distinct — different fonts, different corner radii (separately tracked for cards vs. buttons via new `--radius`/`--radius-pill` tokens), different shadow/blur treatment — not just recolored copies of the same look.
  - Added a shared `.card` CSS class (background/border/radius/shadow/blur) and applied it across every card-like surface (project/tool grid cards, service cards, the gallery frame, status-note callouts, the contact email box) so the new per-theme distinctiveness shows up everywhere automatically.
  - Added DM Sans and Space Mono via `next/font/google` alongside the existing Geist fonts.
- **Bug found + fixed during this pass:** the `.card` class's `backdrop-filter` declaration was silently stripped by the CSS build tool while the `-webkit-backdrop-filter` line survived (Glass theme showed `backdropFilter: none` instead of `blur(16px)`). Fixed by reordering the two declarations (`-webkit-` prefix first, standard property last) — confirmed `blur(16px)` now actually applies.
- Verified live: all 4 themes resolve genuinely distinct `--bg`/`--accent`/`--radius`/`--radius-pill`/`--font-body` values through the real UI switcher (not just by mutating the DOM attribute directly, which turned out to give a false negative for Minimal due to a React-effect race — confirmed the real switcher path works correctly). Mobile menu re-tested full-viewport after the fix. Full route sweep + lint + build clean afterward.

## Deep motion/interaction pass (Ivan: "just colors isn't enough, everything must change")
Ivan pushed back hard on the first redesign — said it was still just recolored tokens, wanted structural/felt differences and dramatically more animation, specifically citing nesen.ch's cursor-reactive background lighting as an example of the kind of detail missing.

- [x] **Mouse-reactive spotlight** (`src/components/MouseSpotlight.tsx`) — a fixed radial-gradient layer that follows the cursor site-wide, color themed per `--spotlight-color` (off entirely for Minimal — deliberate restraint is that theme's whole identity, not an oversight).
- [x] **Per-theme animated backgrounds** (`src/components/ThemeBackdrop.tsx`), structurally different per theme, not shared:
  - Cyber: a masked, fading grid-line pattern (nesen.ch-style technical backdrop)
  - Glass: two large blurred color blobs slowly drifting on an infinite loop (framer motion)
  - Experimental: a drifting scanline texture
  - Minimal: nothing, on purpose
- [x] **Hero entrance animation** — rebuilt as `HeroContent.tsx`, a staggered fade/slide-in sequence (photo → name → brand → tagline → CTA) instead of everything appearing at once.
- [x] **Scroll-reveal animations** added via a shared `Reveal` component (and inline framer motion for the already-client `ProjectsGrid`) across About, Services, Projects, and Tools — cards/paragraphs fade/slide in as they scroll into view, staggered.
- [x] **Card hover interactions** — every `.card` now lifts (`translateY(-4px)`) and its border tints toward the accent color on hover, verified via the browser's real hover simulation (not synthetic mouse events, which don't trigger `:hover` — confirmed that limitation directly).
- [x] **Animated nav underline** — desktop nav links grow an underline from the accent color on hover (`.nav-link` CSS).
- [x] **Pulsing CTA glow** — the primary CTA button now has a slow breathing box-shadow animation (`.cta-button` / `@keyframes cta-pulse`) instead of a static shadow.
- Verified live: spotlight CSS vars update on mousemove, Glass orbs' transform actually changes over time (confirmed via two `getComputedStyle` reads 1.5s apart), card hover-lift confirmed via a real hover gesture, CTA pulse animation confirmed active, mobile menu re-confirmed still full-viewport after all these additions. Full route sweep, lint, and build clean.

## Feedback pass — Cyber/Experimental approved, fixes for the rest
Ivan's live feedback after seeing the deployed redesign: Cyber and Experimental theme looks are approved ("beautiful"), Minimal is fine, but two real bugs and two polish requests came up.

- [x] **Real bug fixed:** on mobile, opening the theme/language dropdown inside the fullscreen menu only showed the first ~2 options — the rest rendered below the viewport bottom edge with no way to scroll to them (the dropdown opened downward from a trigger sitting near the bottom of the screen). Added an `openUpward` prop to `ThemeSwitcher`/`LanguageSwitcher` (`bottom-full mb-2` instead of `top-full mt-2`), used only in the mobile menu. Verified: dropdown box now sits fully within the 812px viewport (top 500.8 → bottom 654.4), all 4 theme options present and reachable.
- [x] **Real bug fixed:** on mobile with the Experimental theme (Space Mono font), the header logo text appeared vertically misaligned relative to the close button next to it. Cause: the logo had no explicit `line-height`, so Space Mono's larger default line-height gave it a taller box than the `leading-none` close button beside it, shifting the visible glyphs down. Added `leading-none` to both the header and mobile-menu logo. Verified: both elements now share the same vertical center (28px) at the Experimental theme's font metrics.
- [x] Removed the description text ("Dark, futuristic, tech-forward" etc.) under each theme name in the switcher dropdown — just the name now, per Ivan's request.
- [x] Made Glass "more glassy": stronger blur (`24px` → up from `16px`) plus `saturate(180%)` for the classic frosted look, more translucent surfaces (`0.25`/`0.15` alpha, down from `0.55`/`0.35`), brighter border, and an inset highlight line on cards for a real glass-edge look.
- Verified all four in the live browser (not just code review): mobile dropdown fully visible and positioned correctly, logo alignment fixed, description text gone, Glass's `backdropFilter` computed value confirmed as `blur(24px) saturate(1.8)`.

## Phase 6 — Launch + Maximize SEO

This phase has two halves: **getting the site live** (mechanical, one-time) and **maximizing search ranking** (partly one-time setup, partly ongoing habits). Both are laid out as an exact sequence — follow in order, since some steps depend on earlier ones (e.g. you need the site live on the real domain before Search Console verification means anything).

### A. Go live

1. [x] **Push to GitHub** — done, `IvanOstroumov/ivxn` on `master`.
2. [x] **Vercel project created**, imported from GitHub.
3. [x] **Env vars set** — `ADMIN_PASSWORD` (real value) and a Vercel Blob store created (`ivxn-blob`, public access, `BLOB_READ_WRITE_TOKEN` env var added automatically).
4. [x] **Domain purchased and connected** — `ivxn.dev` bought on Porkbun, DNS records added pointing at Vercel.
5. [ ] **Re-verify the deploy after this session's fixes**: the mobile menu bug fix, photo color change, and full theme redesign are committed locally but need `git push` to actually go live — do that next, then re-check `https://ivxn.dev` on both desktop and a real phone.
6. [ ] **Final content pass**: real project/tool screenshots for Parserize/Reflux if they ever become available (Ivan doesn't have them now — placeholder gallery stays), and reconsider the current photo (a dim nighttime selfie — flagged, Ivan's call whether to replace it).

### B. Maximize SEO — ranking for your own name and your projects

The realistic goal for a brand-new personal site is ranking #1 for **your own name** ("Ivan Ostroumov") and your **project/tool names** ("Beat the Piano ivxn", "Rhyme Studio", etc.) reasonably fast — competing for generic terms like "software developer" against millions of established sites is not realistic in the short term. Everything below is aimed at that achievable goal.

**What's already done (Phase 5), so you don't need to redo it:**
- Unique title/description/canonical/hreflang per page, in all 5 languages
- JSON-LD structured data (Person, CreativeWork, SoftwareApplication, BreadcrumbList)
- `robots.txt`, `sitemap.xml` (65 URLs), `llms.txt` + `llms-full.txt`
- Fast, modern stack (Next.js/Vercel) — good baseline Core Web Vitals

**What you need to do once the site is live:**

1. **Google Search Console** (search.google.com/search-console):
   - Add `ivxn.dev` as a property, verify via the DNS TXT record method (works even before/without visiting the site)
   - Submit `https://ivxn.dev/sitemap.xml` under Sitemaps
   - Use "URL Inspection" → "Request Indexing" on your homepage and a couple of key project pages to speed up initial crawling (don't spam this — a handful of important URLs is enough)
2. **Bing Webmaster Tools** (bing.com/webmasters): same idea — verify, submit the sitemap. Bing also powers Yahoo and feeds some AI assistants' web results, so it's worth the 10 minutes.
3. **Validate structured data**: run each page type through Google's Rich Results Test (search.google.com/test/rich-results) — homepage (Person), a project page (CreativeWork), a tool page (SoftwareApplication). Fix anything it flags before relying on it.
4. **Run real Lighthouse** against the deployed URL (Chrome DevTools → Lighthouse, or PageSpeed Insights at pagespeed.web.dev) for both mobile and desktop. Target 100s per PROJECT_SPEC.md; if anything's short, it's almost certainly the AvatarPlaceholder/gallery placeholders — swapping in real, properly-sized images (see #7) usually fixes most of the gap.
5. **Backlinks — the single highest-leverage thing you can do for ranking on your own name.** Search engines trust a site more when other sites (especially ones tied to the same identity) link to it. Add a link to `ivxn.dev` on:
   - Your GitHub profile (profile "Website" field, and ideally your profile README)
   - LinkedIn (if you have/make one), Telegram bio, any other social profile
   - Any existing project repos' READMEs (Beat the Piano, SAMT: All Stars, etc. — if they're public on GitHub, add "portfolio: ivxn.dev" to each README)
   - `parserize.site` itself, once it's back up — should link back to `ivxn.dev`
   - Any dev community profile you use (dev.to, Hashnode, Stack Overflow profile, itch.io if Beat the Piano gets published there)
6. **Add `rel="me"` links** between your site and your social profiles (GitHub, etc.) — this is a lightweight signal search engines and some AI systems use to confirm "these accounts are the same person," reinforcing the Person structured data already in place.
7. **Real images with alt text**, once you have them: your photo, and real screenshots per project/tool (replacing the current placeholders). Every `<img>`/`next/image` needs descriptive `alt` text (e.g. "Beat the Piano gameplay screenshot showing falling note blocks") — this is both an accessibility requirement and a real image-search ranking factor. Update `ProjectGallery`/`AvatarPlaceholder` usage once real assets exist.
8. **Keep content fresh.** Search engines re-crawl more often and rank better when a site visibly updates. Adding a new project/tool through the admin panel, or editing an existing one, naturally does this — no extra work needed beyond actually using the site the way it's built to be used.
9. **Social sharing preview check**: once real content/photo are in, test how the homepage and a project page look when shared on Twitter/X, LinkedIn, Telegram, WhatsApp using their respective debug tools (e.g. Twitter Card Validator) — the Open Graph/Twitter meta tags are already wired, this just confirms the preview image/text looks right (currently there's no dedicated OG image, so shares will show no preview image until one's added — worth generating a proper 1200×630 OG image per page, or at minimum a site-wide default one, as a follow-up).
10. **Monitor**: check Search Console's "Performance" tab every couple of weeks once live — it shows what queries are actually landing people on the site, which tells you whether the SEO work is working and what to adjust.

### What to explicitly NOT do (these hurt more than they help)
- Don't buy backlinks or use link farms — Google penalizes this and it's not worth the risk for a personal brand site
- Don't keyword-stuff descriptions beyond what reads naturally — the descriptions written in Phase 5 are already reasonably keyword-rich without being spammy; don't over-tune them
- Don't duplicate the same content across many low-value pages just to "have more pages" — thin/duplicate content actively hurts rather than helps

## Explicitly deferred (not in v1)
- Easter eggs of any kind
- Timeline/CV gimmick section
- Background audio
