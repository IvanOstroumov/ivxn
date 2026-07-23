# Ivan Ostroumov — Personal Portfolio ("Ivan Labs") — Project Spec

Status: pre-build. This file is the source of truth for the project. Update it as decisions change; don't let it drift from reality.

## 1. Identity & positioning

- Real name shown on site: **Ivan Ostroumov**
- Sub-brand: **Ivan Labs** (feeling: technology lab / experimentation / engineering, not a "studio" or freelancer template)
- Positioning statement: a versatile software developer and technology creator — people should contact him when they have a hard technical problem. Not boxed into one stack.
- Areas to represent: Software Development, Android Development, Desktop Apps, Web Apps, Automation, Data Recovery, Digital Forensics, AI-powered tools, Programming Tools, Experimental Projects, Technical Consulting.
- Current focus mentioned by Ivan: Data Forensics and Recovery (present it as current professional focus, not the whole identity).
- Tone of copy: ~70% professional / 30% personality. Example register: "I build software, experiment with technology, and turn ideas into working products." Avoid corporate-bland AND avoid try-hard bravado. No fabricated credentials (no fake NASA-style claims, etc.).
- Visual reference for vibe: nesen.ch (Swiss portfolio site, friend's site) — premium, non-templated feel.
- Explicitly reject: generic AI-template look, stock portfolio layouts, anything that screams "built from a theme."

## 2. Tech stack (decided)

- **Next.js + TypeScript + Tailwind CSS + Framer Motion**
- Package manager: **npm**.
- Hosting: **Vercel** (needed for the admin panel's server-side routes; GitHub Pages was ruled out as static-only).
- File/image/tool-download storage: **Vercel Blob**.
- Domain: **ivxn.dev**.
- Multi-language i18n: English, Russian, Italian, German, French — animated language switcher. Default: **auto-detect browser language, fallback English**.
- Analytics: **privacy-friendly, cookie-less** (Plausible or Umami — pick at build time based on free-tier terms).
- Performance target: Lighthouse 100 across Performance/Accessibility/Best Practices/SEO. Optimize images, lazy-load, minimal JS on first paint, no heavy unused animation libs on critical path.
- Fully responsive: desktop, tablet, mobile. Mobile nav: fullscreen animated menu on hamburger tap.
- Git: repo initialized locally now; Ivan will create the GitHub remote and hand over the URL when ready to connect/push.

## 3. Visual style system

Four switchable themes, same underlying structure/content, switched via an animated dropdown (no page reload):

1. **Minimal** — clean, light/dark neutral, Apple-like restraint.
2. **Cyber** — dark, futuristic, tech-forward.
3. **Glass** — glassmorphism panels, soft gradients.
4. **Experimental** — more artistic, unconventional motion/layout accents.

Implementation approach: theme = a CSS variable set / Tailwind theme token swap + Framer Motion transition, persisted via localStorage. Structure and content stay identical across themes — only look/feel changes.

Animation philosophy: smooth, "clean," confidence-inspiring — not flashy/attention-grabbing. Should read as polished, not gimmicky.

- **Default theme for first-time visitors: Cyber.**
- Color palettes: Claude proposes all 4, presents previews, Ivan approves/tweaks before lock-in. Not yet designed — do this before/during scaffold's styling phase.

## 4. Site structure / navigation

Sticky, animated nav. Pages/sections:

- **Home / Hero** — name "Ivan Ostroumov", sub-brand "Ivan Labs", short non-exaggerated tagline, persistent prominent CTA ("Contact Me" / "Hire Me") visible in hero + nav + project pages + tools pages. Ivan's photo appears here, stylized (duotone/grayscale/theme-tinted, not a plain photo) — treatment should adapt per active theme.
- **About** — who he is, what he builds, interests, problem-solving approach. Professional with personality. Bio copy: Claude drafts a first version from this spec, Ivan edits/approves.
- **Services** — Software Development, Mobile (Android), Custom Tools, Automation, Technical Consulting, Data Recovery / Digital Forensics.
- **Skills** — visually presented (not a boring bullet list), categorized: Languages (C#, Java, Kotlin, PHP, Python, JS/TS), Development (Android, Desktop, Backend, DBs, APIs), Technologies (Git, Linux, Cloud, AI tools, Automation), Other (Digital Forensics, Data Recovery, Reverse Engineering, Problem Solving).
- **Projects** — filterable grid. Categories: **Android, AI, Web, Tools, Experiments, Desktop, Automation** (build the filter system generically so categories can be added/renamed without code changes). Each project page: large main image + 3+ thumbnails (click thumbnail → swap main image, animated), name, short + full description, date, status, tech stack, platform, GitHub link, demo link, download link if applicable. Reusable template, editable via the admin panel. Launch content: Ivan has real projects/tools and will provide details (not placeholders).
- **Tools** — downloads page. Each tool entry: name, icon, description, screenshots, version, supported platforms, file size, changelog, download button, source link. Supports EXE/APK/other files, stored in Vercel Blob.
- **Contact** — primary: email (address TBD — Ivan doesn't have one picked yet, likely `something@ivxn.dev`, confirm before launch). Secondary: **GitHub, Telegram, WhatsApp, LinkedIn**. (Gag idea from transcript — show GitHub first, click to reveal more contacts — dropped, not doing easter eggs in v1.)
- **CV** — a "Download CV" button (About/Contact). Content drafted by Claude from this spec alongside About/Services copy, Ivan edits/approves; exported as PDF.
- **Footer** — contact info repeated, minimal links, plain copyright line (e.g. "© 2026 Ivan Ostroumov").

No timeline section (explicitly rejected). No easter eggs for now (explicitly rejected — revisit later if wanted).

## 5. Logo & branding assets

- Concept: "IO" monogram, the "O" styled as a digital core/ring element.
- Must work at favicon size (32×32) down to social avatar up to full logo usage.
- Color direction: not yet chosen — decide once a theme (from the 4) is prototyped, since it needs to work across all 4 themes or have per-theme variants.

## 6. Content admin

- **Lightweight custom admin panel** (decided): password-protected page where Ivan can add/edit a Project or Tool via a form (title, description, images, links, technologies, status, date for projects; name, version, platforms, changelog, files for tools) and publish — no code edits required.
- Auth: **single shared password via environment variable** (single-user site, no need for accounts).
- File/image uploads: **Vercel Blob**.
- Content storage: decide at build time (flat JSON/Markdown files in repo vs small DB) — leaning simple given single-admin, low-write-frequency use case.

## 7. Open items (not yet decided — do not assume, ask before building)

- Exact contact email address (Ivan doesn't have one yet — needs to set up something@ivxn.dev or similar before launch).
- Exact color palette per theme (Claude proposes, Ivan approves).
- Photo of Ivan — to be provided later.
- Real project/tool content — Ivan will provide.
- Whether easter eggs get revisited for a later version (explicitly off for v1).
- GitHub remote URL (Ivan will create the repo and share it when ready to push/connect Vercel).

## 8. Explicit non-goals

- No background music or sound effects.
- No fake timeline/CV gimmick.
- No fabricated work history/credentials.
- No explicit/NSFW content anywhere, including as a joke/easter egg.
- No easter eggs in v1 at all (per Ivan's decision).
