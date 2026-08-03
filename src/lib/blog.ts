import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { routing } from "@/i18n/routing";

export type BlogFrontmatter = {
  title: string;
  description: string;
  slug: string;
  date: string;
  updated: string;
  tags: string[];
  category: string;
  featured?: boolean;
  author: string;
  keywords: string[];
  ogImageTitle?: string;
  faq?: { question: string; answer: string }[];
};

export type BlogPost = {
  frontmatter: BlogFrontmatter;
  content: string;
  readingMinutes: number;
  /** Locale actually rendered — differs from the requested locale when we fell back to English. */
  resolvedLocale: string;
  /** False when this post has no translation for the requested locale and English was used instead. */
  translated: boolean;
  /** Locales that have a real translated file for this slug (used for hreflang). */
  availableLocales: string[];
};

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");
const DEFAULT_LOCALE = "en";

async function listMdxFiles(locale: string): Promise<string[]> {
  const dir = path.join(CONTENT_DIR, locale);
  try {
    const files = await fs.readdir(dir);
    return files.filter((f) => f.endsWith(".mdx"));
  } catch {
    return [];
  }
}

async function readPostFile(locale: string, slug: string): Promise<{ frontmatter: BlogFrontmatter; content: string } | null> {
  const filePath = path.join(CONTENT_DIR, locale, `${slug}.mdx`);
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    const { data, content } = matter(raw);
    return { frontmatter: data as BlogFrontmatter, content };
  } catch {
    return null;
  }
}

/** The master slug list — English is the source of truth for which articles exist at all. */
export async function getAllSlugs(): Promise<string[]> {
  const files = await listMdxFiles(DEFAULT_LOCALE);
  return files.map((f) => f.replace(/\.mdx$/, ""));
}

export async function getAvailableLocalesForSlug(slug: string): Promise<string[]> {
  const results: (string | null)[] = await Promise.all(
    routing.locales.map(async (l) => ((await readPostFile(l, slug)) ? l : null))
  );
  return results.filter((l): l is string => l !== null);
}

export async function getPost(locale: string, slug: string): Promise<BlogPost | null> {
  const availableLocales = await getAvailableLocalesForSlug(slug);
  if (availableLocales.length === 0) return null;

  const translated = availableLocales.includes(locale);
  const resolvedLocale = translated ? locale : DEFAULT_LOCALE;
  const file = await readPostFile(resolvedLocale, slug);
  if (!file) return null;

  return {
    frontmatter: file.frontmatter,
    content: file.content,
    readingMinutes: Math.max(1, Math.ceil(readingTime(file.content).minutes)),
    resolvedLocale,
    translated,
    availableLocales,
  };
}

export async function getAllPosts(locale: string): Promise<BlogPost[]> {
  const slugs = await getAllSlugs();
  const posts = await Promise.all(slugs.map((slug) => getPost(locale, slug)));
  return posts
    .filter((p): p is BlogPost => p !== null)
    .sort((a, b) => (a.frontmatter.date < b.frontmatter.date ? 1 : -1));
}

export async function getPostsByTag(locale: string, tag: string): Promise<BlogPost[]> {
  const all = await getAllPosts(locale);
  return all.filter((p) => p.frontmatter.tags.includes(tag));
}

export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPosts(DEFAULT_LOCALE);
  const tags = new Set<string>();
  for (const post of posts) {
    for (const tag of post.frontmatter.tags) tags.add(tag);
  }
  return Array.from(tags);
}

export async function getRelatedPosts(locale: string, slug: string, tags: string[], limit = 3): Promise<BlogPost[]> {
  const all = await getAllPosts(locale);
  return all
    .filter((p) => p.frontmatter.slug !== slug)
    .map((p) => ({ post: p, score: p.frontmatter.tags.filter((t) => tags.includes(t)).length }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.post);
}
