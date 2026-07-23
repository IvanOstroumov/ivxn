import { useTranslations } from "next-intl";
import { CTAButton } from "@/components/CTAButton";

export default function AboutPage() {
  const t = useTranslations("about");
  return (
    <main className="mx-auto max-w-2xl px-6 py-24">
      <h1 className="text-3xl font-semibold">{t("title")}</h1>
      <div className="mt-6 space-y-4 text-[var(--text-muted)]">
        <p>{t("body1")}</p>
        <p>{t("body2")}</p>
        <p className="italic text-[var(--text)]">&ldquo;{t("body3")}&rdquo;</p>
      </div>
      <div className="mt-8">
        <CTAButton href="/contact" className="opacity-60 pointer-events-none">
          {t("downloadCv")}
        </CTAButton>
        <p className="mt-2 text-xs text-[var(--text-muted)]">
          CV PDF not uploaded yet — button will activate once available.
        </p>
      </div>
    </main>
  );
}
