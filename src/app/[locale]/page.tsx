import { useTranslations } from "next-intl";
import { CTAButton } from "@/components/CTAButton";

export default function Home() {
  const t = useTranslations("hero");
  const tCta = useTranslations("cta");

  return (
    <main className="flex min-h-[calc(100vh-4.5rem)] flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-4xl font-semibold">{t("name")}</h1>
      <p className="text-[var(--text-muted)]">{t("brand")}</p>
      <p className="max-w-md text-[var(--text-muted)]">{t("tagline")}</p>
      <CTAButton>{tCta("contact")}</CTAButton>
    </main>
  );
}
