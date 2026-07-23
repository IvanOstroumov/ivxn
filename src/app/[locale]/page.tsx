import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { HeroContent } from "@/components/HeroContent";
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

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "hero" });

  // Person structured data — the single highest-value schema for personal-brand
  // SEO/knowledge-panel eligibility.
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Ivan Ostroumov",
    alternateName: "Ivan Labs",
    url: SITE_URL,
    image: `${SITE_URL}/photo/ivan.jpg`,
    jobTitle: "Software Developer",
    description: t("tagline"),
    email: "mailto:ivan2ostroumov@gmail.com",
    sameAs: ["https://github.com/IvanOstroumov", "https://t.me/+41767249412"],
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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <HeroContent />
    </>
  );
}
