import { getLlmsData, SITE_URL } from "@/lib/llms-content";

// llms.txt (see llmstxt.org) — a concise, plain-text index of the site for AI
// crawlers/assistants, in the same spirit as robots.txt/sitemap.xml but aimed
// at LLMs rather than search engines or classic bots. For the fully expanded
// version (full descriptions, skills, services, etc.) see /llms-full.txt.
export async function GET() {
  const { projects, tools } = await getLlmsData();

  const lines: string[] = [];
  lines.push("# Ivan Ostroumov — Ivan Labs");
  lines.push("");
  lines.push(
    "> Software developer building tools, applications, and solving technical problems. " +
      "Currently focused on Data Recovery and Digital Forensics, with a broad background " +
      "spanning desktop games, Android apps, web tools, and automation."
  );
  lines.push("");

  lines.push("## Site");
  lines.push(`- [Home](${SITE_URL}/en)`);
  lines.push(`- [About](${SITE_URL}/en/about)`);
  lines.push(`- [Services](${SITE_URL}/en/services)`);
  lines.push(`- [Skills](${SITE_URL}/en/skills)`);
  lines.push(`- [Contact](${SITE_URL}/en/contact)`);
  lines.push(
    "- Available in English, Russian, Italian, German, and French (swap `/en/` for `/ru/`, `/it/`, `/de/`, `/fr/`)."
  );
  lines.push("");

  lines.push("## Projects");
  for (const p of projects) {
    lines.push(
      `- [${p.title}](${SITE_URL}/en/projects/${p.slug}): ${p.shortDescription} (${p.category}, ${p.status})`
    );
  }
  lines.push("");

  lines.push("## Tools");
  for (const t of tools) {
    lines.push(`- [${t.name}](${SITE_URL}/en/tools/${t.slug}): ${t.description}`);
  }
  lines.push("");

  lines.push("## More");
  lines.push(`- Full detail (skills, services, tech stack, changelogs): ${SITE_URL}/llms-full.txt`);
  lines.push(`- Sitemap: ${SITE_URL}/sitemap.xml`);

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
