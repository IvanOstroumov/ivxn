# Status Report — what's not integrated yet, and what's an easy add

Snapshot as of end of Phase 5/6 planning. Companion to PLAN.md (which tracks phase-by-phase progress) — this file is specifically about gaps and low-effort opportunities, so it'll go stale faster; treat it as a point-in-time read, not a living doc.

## 1. Not integrated yet — blocked on something only Ivan can provide

These aren't bugs or oversights — the code is built to take them, there's just nothing to plug in yet.

| Item | What's built | What's missing |
|---|---|---|
| Photo | `AvatarPlaceholder` component, themed placeholder | The actual photo file |
| Project screenshots | `ProjectGallery` — real thumbnail-swap UI, 4 slots | Real screenshots for all 4 projects (currently shows "screenshot N" placeholder text) |
| Tool downloads | Tools pages/admin fully wired to Vercel Blob | Actual APK builds for Rhyme Studio and World Travel Tracker |
| Contact email | Contact page has a slot for it | A real email address (Ivan hasn't picked one — `hello@ivxn.dev` or similar, per PROJECT_SPEC.md open items) |
| Telegram / WhatsApp / LinkedIn | Links present in Footer/Contact | Currently point to `#` — need real handles/URLs |
| CV/resume | "Download CV" button exists, drafted text reuses About copy | No actual PDF generated/uploaded yet |
| GitHub push | Remote `origin` wired locally | Repo has never been pushed — still local-only |
| Vercel deployment | Project builds clean, ready to import | No Vercel account connected yet — site isn't live anywhere |
| `BLOB_READ_WRITE_TOKEN` | Admin panel/content-store already use it when present | Not set — production uploads/content edits will silently fall back to (non-persistent) local files until this exists |
| Domain DNS | `ivxn.dev` decided and used everywhere in code (metadata, sitemap, etc.) | DNS not pointed at Vercel — domain isn't serving the site |
| Analytics account | `Analytics` component ready, just needs an env var | No Plausible/Umami account created yet |
| Real Lighthouse 100 run | All the groundwork (SEO, structured data, fast stack) is in place | Can only be meaningfully run against a deployed URL, not `next dev` |
| Search Console / Bing Webmaster | Sitemap + robots.txt ready to submit | Needs a live domain to verify against |
| `parserize.site` | Project entry links to it | Site itself is down (cause unknown per Ivan) — either fix hosting or update the status note if it'll stay down |
| Theme color approval | All 4 palettes implemented and switchable | Ivan hasn't seen/approved the actual colors live yet (proposed values in ASSETS.md are a starting point, not final) |
| Non-English project/tool copy | ~~UI chrome only~~ — **done**: project/tool descriptions are now translated into all 5 languages (see PLAN.md "Post-Phase-5 polish batch") | Nothing — resolved |

## 2. Could be added easily — no new external input needed

Reasonably low effort, code-only, would meaningfully improve the site. None of these were in the original spec, so treat this as a menu to pick from, not a to-do list.

**Done (see PLAN.md "Post-Phase-5 polish batch" for details):**
- ~~Apple touch icon (PNG)~~ — done, generated via `next/og`, also fixed a real routing bug found along the way (middleware wasn't excluding it)
- ~~Visible breadcrumb navigation~~ — done, on all project/tool detail pages
- ~~Custom 404 page~~ — done, themed and translated
- ~~Loading skeletons~~ — done, for Projects/Tools list and detail pages
- ~~Basic login rate-limiting on `/admin`~~ — done, 5-attempt/15-minute in-memory lockout
- ~~`rel="me"` links~~ — done on the GitHub link (Telegram/WhatsApp/LinkedIn still pending real URLs)

**Still open:**
- **Web app manifest** (`manifest.json` / `site.webmanifest`) — makes the site installable to a phone home screen with the IO icon. A few minutes of work; pairs naturally with the icon.svg that already exists.
- **Per-project/per-tool OG images** — right now every page shares one generic site-wide social preview image. The same `ImageResponse` pattern already used for the default OG image and apple-icon could generate a distinct preview per project/tool (showing its name + category), which makes individual project links look better when shared.
- **GitHub Actions CI** — a workflow that runs `npm run lint` and `npm run build` on every push, so a broken commit gets flagged automatically instead of only being caught by manually running the same commands (as done throughout this build).
- **Alt text pass** — once real photo/screenshots exist, every image needs descriptive `alt` text. Not needed today (nothing but placeholders exists yet), but worth doing in the same pass as adding the real assets rather than as an afterthought.

## Explicitly not a gap (deliberate decisions, not missing work)
- No easter eggs, no timeline section, no background audio — all explicitly rejected by Ivan (see PROJECT_SPEC.md §8)
- No automated test suite — reasonable for a personal portfolio at this size; would only become worth it if the admin panel/content model grows significantly more complex
