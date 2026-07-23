import { useTranslations } from "next-intl";
import { tools } from "@/content/tools";
import { Link } from "@/i18n/navigation";

export default function ToolsPage() {
  const t = useTranslations("toolsPage");
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
            <p className="mt-2 text-sm text-[var(--text-muted)]">{tool.description}</p>
            <p className="mt-3 text-xs text-[var(--text-muted)]">
              {tool.platforms.join(", ")}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
