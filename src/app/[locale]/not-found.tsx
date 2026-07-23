import { useTranslations } from "next-intl";
import { CTAButton } from "@/components/CTAButton";

// Themed 404 — inherits the active theme's CSS variables like every other
// page (Next renders this inside the matched [locale] layout), instead of
// falling back to Next's unstyled default.
export default function NotFound() {
  const t = useTranslations("notFound");
  return (
    <main className="flex min-h-[calc(100vh-4.5rem)] flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="text-6xl font-semibold" style={{ color: "var(--accent)" }}>
        404
      </p>
      <h1 className="text-2xl font-semibold">{t("title")}</h1>
      <p className="max-w-md text-[var(--text-muted)]">{t("message")}</p>
      <CTAButton href="/">{t("cta")}</CTAButton>
    </main>
  );
}
