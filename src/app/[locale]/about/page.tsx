import { useTranslations } from "next-intl";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { CTAButton } from "@/components/CTAButton";
import { buildMetadata } from "@/lib/seo";
import { Reveal } from "@/components/Reveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const [about, seo] = await Promise.all([
    getTranslations({ locale, namespace: "about" }),
    getTranslations({ locale, namespace: "seo" }),
  ]);
  return buildMetadata({
    locale,
    path: "/about",
    title: `${about("title")} — Ivan Ostroumov`,
    description: seo("aboutDescription"),
  });
}

export default function AboutPage() {
  const t = useTranslations("about");
  return (
    <main className="mx-auto max-w-2xl px-6 py-24">
      <h1 className="text-3xl font-semibold">{t("title")}</h1>
      <div className="mt-6 space-y-4 text-[var(--text-muted)]">
        <Reveal>
          <p>{t("body1")}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <p>{t("body2")}</p>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="italic text-[var(--text)]">&ldquo;{t("body3")}&rdquo;</p>
        </Reveal>
      </div>
      <Reveal delay={0.3} className="mt-8">
        <CTAButton href="/contact" className="opacity-60 pointer-events-none">
          {t("downloadCv")}
        </CTAButton>
        <p className="mt-2 text-xs text-[var(--text-muted)]">
          CV PDF not uploaded yet — button will activate once available.
        </p>
      </Reveal>

      <Reveal delay={0.4} className="card mt-10 p-5">
        <h2 className="font-medium">{t("setupTitle")}</h2>
        <ul className="mt-2 space-y-1 text-sm text-[var(--text-muted)]">
          <li>{t("setupOs")}</li>
          <li>{t("setupEditor")}</li>
          <li>{t("setupTools")}</li>
        </ul>
        <p className="mt-3 text-xs text-[var(--text-muted)] opacity-70">{t("setupNote")}</p>
      </Reveal>
    </main>
  );
}
