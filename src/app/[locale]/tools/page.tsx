import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getTools } from "@/lib/content-store";
import { getLocalized } from "@/lib/localized";
import { Link } from "@/i18n/navigation";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const [toolsPage, seo] = await Promise.all([
    getTranslations({ locale, namespace: "toolsPage" }),
    getTranslations({ locale, namespace: "seo" }),
  ]);
  return buildMetadata({
    locale,
    path: "/tools",
    title: `${toolsPage("title")} — Ivan Ostroumov`,
    description: seo("toolsDescription"),
  });
}

export default async function ToolsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("toolsPage");
  const tools = await getTools();
  return (
    <main className="mx-auto max-w-4xl px-6 py-24">
      <h1 className="text-3xl font-semibold">{t("title")}</h1>
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {tools.map((tool) => (
          <Link
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            className="block rounded-[var(--radius-theme)] border border-[var(--border)] bg-[var(--surface)] p-5 transition-transform hover:scale-[1.01]"
          >
            <h2 className="font-medium">{tool.name}</h2>
            <p className="mt-2 text-sm text-[var(--text-muted)]">
              {getLocalized(tool.description, locale)}
            </p>
            <p className="mt-3 text-xs text-[var(--text-muted)]">
              {tool.platforms.join(", ")}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
