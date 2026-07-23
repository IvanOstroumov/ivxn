import type { Metadata } from "next";
import { routing } from "@/i18n/routing";

export const SITE_URL = "https://ivxn.dev";

/**
 * Builds correct per-page metadata: unique title/description, a canonical URL
 * that actually points at *this* page (not a blanket site-wide one), and
 * hreflang alternates pointing at the equivalent page in every other locale.
 */
export function buildMetadata({
  locale,
  path = "",
  title,
  description,
}: {
  locale: string;
  path?: string;
  title: string;
  description: string;
}): Metadata {
  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, `${SITE_URL}/${l}${path}`])
  );
  const url = `${SITE_URL}/${locale}${path}`;

  return {
    title,
    description,
    alternates: { canonical: url, languages },
    openGraph: { title, description, url, locale, siteName: "Ivan Labs" },
    twitter: { card: "summary_large_image", title, description },
  };
}
