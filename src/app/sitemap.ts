import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getProjects, getTools } from "@/lib/content-store";

const SITE_URL = "https://ivxn.dev";
const STATIC_PATHS = ["", "/about", "/services", "/projects", "/tools", "/skills", "/contact"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, tools] = await Promise.all([getProjects(), getTools()]);

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const path of STATIC_PATHS) {
      entries.push({ url: `${SITE_URL}/${locale}${path}` });
    }
    for (const project of projects) {
      entries.push({ url: `${SITE_URL}/${locale}/projects/${project.slug}` });
    }
    for (const tool of tools) {
      entries.push({ url: `${SITE_URL}/${locale}/tools/${tool.slug}` });
    }
  }

  return entries;
}
