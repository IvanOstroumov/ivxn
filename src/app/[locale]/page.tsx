import { useTranslations } from "next-intl";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { CTAButton } from "@/components/CTAButton";
import { AvatarPlaceholder } from "@/components/AvatarPlaceholder";
import { buildMetadata, SITE_URL } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const [hero, seo] = await Promise.all([
    getTranslations({ locale, namespace: "hero" }),
    getTranslations({ locale, namespace: "seo" }),
  ]);
  return buildMetadata({
    locale,
    path: "",
    title: `${hero("name")} — ${hero("brand")}`,
    description: seo("homeDescription"),
  });
}

export default function Home() {
  const t = useTranslations("hero");
  const tCta = useTranslations("cta");

  // Person structured data — the single highest-value schema for personal-brand
  // SEO/knowledge-panel eligibility. `sameAs` only lists profiles that are real,
  // working links right now; add Telegram/WhatsApp/LinkedIn here once those are
  // real (see PROJECT_SPEC.md open items).
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Ivan Ostroumov",
    alternateName: "Ivan Labs",
    url: SITE_URL,
    jobTitle: "Software Developer",
    description: t("tagline"),
    sameAs: ["https://github.com/IvanOstroumov"],
    knowsAbout: [
      "Software Development",
      "Android Development",
      "Unity",
      "C#",
      "Web Development",
      "Automation",
      "Data Recovery",
      "Digital Forensics",
    ],
  };

  return (
    <main className="flex min-h-[calc(100vh-4.5rem)] flex-col items-center justify-center gap-6 px-6 text-center">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <AvatarPlaceholder />
      <h1 className="text-4xl font-semibold">{t("name")}</h1>
      <p className="text-[var(--text-muted)]">{t("brand")}</p>
      <p className="max-w-md text-[var(--text-muted)]">{t("tagline")}</p>
      <CTAButton>{tCta("contact")}</CTAButton>
    </main>
  );
}
