import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getProjects, getTools } from "@/lib/content-store";
import { getAllPosts, getAllTags } from "@/lib/blog";

const SITE_URL = "https://ivxn.dev";
const STATIC_PATHS = ["", "/about", "/services", "/projects", "/tools", "/blog", "/contact"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, tools, tags] = await Promise.all([getProjects(), getTools(), getAllTags()]);

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    const posts = await getAllPosts(locale);

    for (const path of STATIC_PATHS) {
      entries.push({
        url: `${SITE_URL}/${locale}${path}`,
        priority: path === "" ? 1.0 : path === "/blog" ? 0.9 : 0.7,
      });
    }
    for (const project of projects) {
      entries.push({ url: `${SITE_URL}/${locale}/projects/${project.slug}` });
    }
    for (const tool of tools) {
      entries.push({ url: `${SITE_URL}/${locale}/tools/${tool.slug}` });
    }
    for (const post of posts) {
      entries.push({
        url: `${SITE_URL}/${locale}/blog/${post.frontmatter.slug}`,
        lastModified: post.frontmatter.updated,
        priority: 0.8,
      });
    }
    for (const tag of tags) {
      entries.push({ url: `${SITE_URL}/${locale}/blog/tag/${tag}`, priority: 0.5 });
    }
  }

  return entries;
}
