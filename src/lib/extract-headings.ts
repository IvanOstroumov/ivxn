import GithubSlugger from "github-slugger";

export type Heading = { depth: 2 | 3; text: string; id: string };

/** Mirrors rehype-slug's id generation (also backed by github-slugger) so TOC links match the rendered anchors. */
export function extractHeadings(markdown: string): Heading[] {
  const slugger = new GithubSlugger();
  const headings: Heading[] = [];
  const lines = markdown.split("\n");
  let inCodeBlock = false;

  for (const line of lines) {
    if (line.trim().startsWith("```")) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) continue;

    const match = line.match(/^(#{2,3})\s+(.+)$/);
    if (!match) continue;
    const depth = match[1].length as 2 | 3;
    const text = match[2].trim();
    headings.push({ depth, text, id: slugger.slug(text) });
  }

  return headings;
}
