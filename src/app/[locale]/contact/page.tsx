import { useTranslations } from "next-intl";

export default function ContactPage() {
  const t = useTranslations("nav");
  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="text-3xl font-semibold">{t("contact")}</h1>
      <p className="mt-4 text-[var(--text-muted)]">Coming in Phase 3.</p>
    </main>
  );
}
