# Status Report — what's not integrated yet, and what's an easy add

Snapshot as of end of Phase 5/6 planning. Companion to PLAN.md (which tracks phase-by-phase progress) — this file is specifically about gaps and low-effort opportunities, so it'll go stale faster; treat it as a point-in-time read, not a living doc.

## 1. Not integrated yet — blocked on something only Ivan can provide

These aren't bugs or oversights — the code is built to take them, there's just nothing to plug in yet.

| Item | Status |
|---|---|
| Photo | **Done** — real photo (`/public/photo/ivan.jpg`), stylized (grayscale + accent ring), wired into the Hero and Person JSON-LD |
| Project screenshots | **Done for 2 of 4** — Beat the Piano and SAMT: All Stars have real 4-screenshot galleries. Parserize and Reflux don't have screenshots (Ivan doesn't have them) — they keep the text placeholder gallery, which still works correctly |
| Tool downloads | **Done** — real APK files for both Rhyme Studio and World Travel Tracker, served from `/public/downloads/`, download buttons live |
| Contact email | **Done** — `ivan2ostroumov@gmail.com`, live on Contact page + Footer + Person JSON-LD |
| Telegram / WhatsApp | **Done** — real links (`t.me/+41767249412`, `wa.me/41767249412`) |
| LinkedIn | **Resolved, not a gap** — Ivan doesn't have one; removed from Footer/Contact rather than left as a dead `#` link |
| `parserize.site` | **Resolved, not a gap** — Ivan confirmed it stays offline; the existing status note already reflects that, no change needed |
| Launch project/tool list | **Confirmed final** — the 6 items already on the site (4 projects, 2 tools) are the complete list, nothing more to add |
| CV/resume | "Download CV" button exists, drafted text reuses About copy | No actual PDF generated/uploaded yet |
| GitHub push | Remote `origin` wired locally | Repo has never been pushed — still local-only |
| Vercel deployment | Project builds clean, ready to import | No Vercel account connected yet — site isn't live anywhere |
| `BLOB_READ_WRITE_TOKEN` | Admin panel/content-store already use it when present | Not set — production uploads/content edits will silently fall back to (non-persistent) local files until this exists |
| Domain DNS | `ivxn.dev` decided and used everywhere in code (metadata, sitemap, etc.) | DNS not pointed at Vercel — domain isn't serving the site |
| Analytics account | `Analytics` component ready, just needs an env var | No Plausible/Umami account created yet |
| Real Lighthouse 100 run | All the groundwork (SEO, structured data, fast stack) is in place | Can only be meaningfully run against a deployed URL, not `next dev` |
| Search Console / Bing Webmaster | Sitemap + robots.txt ready to submit | Needs a live domain to verify against |
| Theme color approval | All 4 palettes implemented and switchable | Ivan said "approve the colors for now" — treating current palettes as approved; can still be revisited later |
| Non-English project/tool copy | **Done** — translated into all 5 languages |

## 2. Could be added easily — no new external input needed

**Done:**
- ~~Apple touch icon, breadcrumbs, 404 page, loading skeletons, admin rate-limiting, `rel="me"`~~ — done (see PLAN.md "Post-Phase-5 polish batch")
- ~~Real photo/screenshots wired in~~ — done, including real `alt` text throughout

**Still open:**
- **Web app manifest** (`manifest.json` / `site.webmanifest`) — makes the site installable to a phone home screen with the IO icon.
- **Per-project/per-tool OG images** — right now every page shares one generic site-wide social preview image. Could generate a distinct preview per project/tool using the same `ImageResponse` pattern, now made more compelling since Beat the Piano and SAMT: All Stars have real screenshots to feature.
- **GitHub Actions CI** — runs `npm run lint` + `npm run build` on every push.
- **Alt text for Parserize/Reflux placeholders and for any future real assets** — not urgent since the placeholder gallery has no `<img>` tags to caption, but worth remembering once those two projects get real screenshots.

## Explicitly not a gap (deliberate decisions, not missing work)
- No easter eggs, no timeline section, no background audio — all explicitly rejected by Ivan (see PROJECT_SPEC.md §8)
- No automated test suite — reasonable for a personal portfolio at this size
- No LinkedIn link — Ivan doesn't have one
