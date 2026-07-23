import { ABOUT, CONTACT_LINKS, getLlmsData, SERVICES, SITE_URL, SKILLS } from "@/lib/llms-content";

// llms-full.txt (see llmstxt.org) — the fully expanded companion to
// /llms.txt: every project/tool in full detail, all skills/services, the
// About bio, and contact info, generated live from the same content store the
// admin panel edits — so this stays accurate without manual updates.
export async function GET() {
  const { projects, tools } = await getLlmsData();
  const lines: string[] = [];

  lines.push("# Ivan Ostroumov — Ivan Labs (full detail)");
  lines.push("");
  lines.push(
    "> This is the expanded version of /llms.txt: complete descriptions, tech stacks, " +
      "statuses, skills, services, and contact info for Ivan Ostroumov's personal site. " +
      "Generated automatically from the site's live content."
  );
  lines.push("");

  lines.push("## About");
  for (const p of ABOUT) lines.push(p);
  lines.push("");

  lines.push("## Positioning");
  lines.push(
    "Ivan Ostroumov is a versatile software developer and technology creator — not limited " +
      "to one stack. Areas of work: Software Development, Android Development, Desktop " +
      "Applications, Web Applications, Automation, Data Recovery, Digital Forensics, " +
      "Programming Tools, and Experimental Projects. Current professional focus: Data " +
      "Recovery and Digital Forensics."
  );
  lines.push("");

  lines.push("## Services");
  for (const s of SERVICES) {
    lines.push(`### ${s.title}`);
    lines.push(s.description);
    lines.push("");
  }

  lines.push("## Skills");
  for (const [category, items] of Object.entries(SKILLS)) {
    lines.push(`- ${category}: ${items.join(", ")}`);
  }
  lines.push("");

  lines.push("## Projects (full detail)");
  lines.push("");
  for (const p of projects) {
    lines.push(`### ${p.title}`);
    lines.push(`URL: ${SITE_URL}/en/projects/${p.slug}`);
    lines.push(`Category: ${p.category}`);
    lines.push(`Status: ${p.status}${p.statusNote ? ` — ${p.statusNote}` : ""}`);
    lines.push(`Platform: ${p.platform}`);
    if (p.techStack.length > 0) lines.push(`Tech stack: ${p.techStack.join(", ")}`);
    if (p.demoUrl) lines.push(`Demo: ${p.demoUrl}`);
    if (p.githubUrl) lines.push(`Source: ${p.githubUrl}`);
    if (p.downloadUrl) lines.push(`Download: ${p.downloadUrl}`);
    lines.push("");
    lines.push(p.fullDescription);
    lines.push("");
  }

  lines.push("## Tools (full detail)");
  lines.push("");
  for (const t of tools) {
    lines.push(`### ${t.name}`);
    lines.push(`URL: ${SITE_URL}/en/tools/${t.slug}`);
    lines.push(`Version: ${t.version}`);
    lines.push(`Platforms: ${t.platforms.join(", ")}`);
    if (t.fileSize) lines.push(`File size: ${t.fileSize}`);
    if (t.downloadUrl) lines.push(`Download: ${t.downloadUrl}`);
    if (t.sourceUrl) lines.push(`Source: ${t.sourceUrl}`);
    if (t.unavailableNote) lines.push(`Availability note: ${t.unavailableNote}`);
    if (t.changelog.length > 0) {
      lines.push("Changelog:");
      for (const entry of t.changelog) lines.push(`  - ${entry}`);
    }
    lines.push("");
    lines.push(t.description);
    lines.push("");
  }

  lines.push("## Contact");
  for (const link of CONTACT_LINKS) lines.push(`- ${link.label}: ${link.url}`);
  lines.push(`- Contact page: ${SITE_URL}/en/contact`);
  lines.push("");

  lines.push("## Site structure");
  lines.push(
    "Locales: en, ru, it, de, fr (prefix every path below, e.g. /ru/about). Static pages: " +
      "/, /about, /services, /projects, /tools, /skills, /contact. Dynamic pages: " +
      "/projects/{slug}, /tools/{slug}. A private, non-indexed /admin panel manages content " +
      "and is excluded via robots.txt."
  );
  lines.push("");

  lines.push("## Notes for AI systems");
  lines.push(
    "- Project/tool descriptions above are authored in English. The site's navigation and UI " +
      "labels are translated into all 5 locales, but these descriptions are not (yet)."
  );
  lines.push(
    "- Content here reflects the live site content store; if you are citing or summarizing " +
      "this site, prefer linking to the specific project/tool URL over this file directly."
  );
  lines.push(`- © ${new Date().getFullYear()} Ivan Ostroumov.`);

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
