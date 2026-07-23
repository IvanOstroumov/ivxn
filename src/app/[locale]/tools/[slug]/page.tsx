import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getToolBySlug } from "@/lib/content-store";
import { Link } from "@/i18n/navigation";
import { buildMetadata, SITE_URL } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const tool = await getToolBySlug(slug);
  if (!tool) return {};

  return buildMetadata({
    locale,
    path: `/tools/${slug}`,
    title: `${tool.name} — Ivan Ostroumov`,
    description: tool.description,
  });
}

export default async function ToolDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const tool = await getToolBySlug(slug);
  if (!tool) notFound();

  const t = await getTranslations("toolsPage");
  const nav = await getTranslations("nav");

  const toolUrl = `${SITE_URL}/${locale}/tools/${slug}`;

  // SoftwareApplication structured data — eligible for app-style rich results
  // (rating/price/platform badges) once the tool actually has a real download.
  const toolJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    description: tool.description,
    url: toolUrl,
    operatingSystem: tool.platforms.join(", "),
    applicationCategory: "UtilitiesApplication",
    author: { "@type": "Person", name: "Ivan Ostroumov", url: SITE_URL },
    ...(tool.downloadUrl ? { downloadUrl: tool.downloadUrl } : {}),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: nav("home"), item: `${SITE_URL}/${locale}` },
      {
        "@type": "ListItem",
        position: 2,
        name: nav("tools"),
        item: `${SITE_URL}/${locale}/tools`,
      },
      { "@type": "ListItem", position: 3, name: tool.name, item: toolUrl },
    ],
  };

  return (
    <main className="mx-auto max-w-2xl px-6 py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <Link href="/tools" className="text-sm text-[var(--text-muted)] hover:text-[var(--text)]">
        ← {t("backToTools")}
      </Link>

      <h1 className="mt-4 text-3xl font-semibold">{tool.name}</h1>
      <p className="mt-3 text-[var(--text)]">{tool.description}</p>

      <dl className="mt-8 grid grid-cols-2 gap-4 text-sm">
        <div>
          <dt className="text-[var(--text-muted)]">{t("version")}</dt>
          <dd>{tool.version}</dd>
        </div>
        <div>
          <dt className="text-[var(--text-muted)]">{t("platforms")}</dt>
          <dd>{tool.platforms.join(", ")}</dd>
        </div>
      </dl>

      {tool.unavailableNote && (
        <p className="mt-6 rounded-[var(--radius-theme)] border border-[var(--border)] bg-[var(--surface)] p-3 text-sm text-[var(--text-muted)]">
          {tool.unavailableNote}
        </p>
      )}

      <div className="mt-8 flex flex-wrap gap-3">
        {tool.downloadUrl ? (
          <a
            href={tool.downloadUrl}
            className="rounded-[var(--radius-theme)] px-4 py-2 text-sm font-medium"
            style={{ backgroundColor: "var(--accent)", color: "var(--bg)" }}
          >
            {t("download")}
          </a>
        ) : (
          <span className="rounded-[var(--radius-theme)] border border-[var(--border)] px-4 py-2 text-sm text-[var(--text-muted)] opacity-60">
            {t("unavailable")}
          </span>
        )}
        {tool.sourceUrl && (
          <a
            href={tool.sourceUrl}
            className="rounded-[var(--radius-theme)] border border-[var(--border)] px-4 py-2 text-sm hover:border-[var(--accent)]"
          >
            {t("sourceCode")}
          </a>
        )}
      </div>
    </main>
  );
}
