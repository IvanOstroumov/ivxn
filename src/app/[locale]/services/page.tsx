import { useTranslations } from "next-intl";

const SERVICE_KEYS = [
  "softwareDev",
  "mobile",
  "customTools",
  "automation",
  "consulting",
  "forensics",
] as const;

export default function ServicesPage() {
  const t = useTranslations("services");
  return (
    <main className="mx-auto max-w-4xl px-6 py-24">
      <h1 className="text-3xl font-semibold">{t("title")}</h1>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {SERVICE_KEYS.map((key) => (
          <div
            key={key}
            className="rounded-[var(--radius-theme)] border border-[var(--border)] bg-[var(--surface)] p-5"
          >
            <h2 className="font-medium">{t(`items.${key}.title`)}</h2>
            <p className="mt-2 text-sm text-[var(--text-muted)]">
              {t(`items.${key}.description`)}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
