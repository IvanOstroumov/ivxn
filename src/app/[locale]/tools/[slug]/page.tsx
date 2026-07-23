import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getToolBySlug, tools } from "@/content/tools";
import { Link } from "@/i18n/navigation";

export function generateStaticParams() {
  return tools.map((t) => ({ slug: t.slug }));
}

export default async function ToolDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  const t = await getTranslations("toolsPage");

  return (
    <main className="mx-auto max-w-2xl px-6 py-24">
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
