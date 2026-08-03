import { getAllPosts } from "@/lib/blog";
import { SITE_URL } from "@/lib/seo";

// RSS 2.0 feed — English only for now, since every post is guaranteed to
// exist in English (the source-of-truth locale), while other locales may
// only have partial translations. Linked from blog pages via
// <link rel="alternate" type="application/rss+xml">.
function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const posts = await getAllPosts("en");

  const items = posts
    .map((post) => {
      const url = `${SITE_URL}/en/blog/${post.frontmatter.slug}`;
      return `
    <item>
      <title>${escapeXml(post.frontmatter.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(post.frontmatter.description)}</description>
      <pubDate>${new Date(post.frontmatter.date).toUTCString()}</pubDate>
      <author>${escapeXml(post.frontmatter.author)}</author>
      ${post.frontmatter.tags.map((tag) => `<category>${escapeXml(tag)}</category>`).join("")}
    </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Ivan Labs Blog</title>
    <link>${SITE_URL}/en/blog</link>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <description>Guides on Android development, data recovery, digital forensics, and hardware — by Ivan Ostroumov.</description>
    <language>en</language>${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
