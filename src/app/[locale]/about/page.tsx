import { useTranslations } from "next-intl";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { CTAButton } from "@/components/CTAButton";
import { buildMetadata, SITE_URL } from "@/lib/seo";
import { Reveal } from "@/components/Reveal";

const SKILL_GROUPS = [
  { key: "languages", items: ["C#", "Java", "Kotlin", "PHP", "Python", "JavaScript", "TypeScript"] },
  { key: "development", items: ["Android", "Desktop", "Backend", "Databases", "APIs"] },
  { key: "technologies", items: ["Git", "Linux", "Cloud", "AI tools", "Automation"] },
  { key: "other", items: ["Digital Forensics", "Data Recovery", "Reverse Engineering", "Problem Solving"] },
] as const;

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
  const tSkills = useTranslations("skills");

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Ivan Ostroumov",
    alternateName: "Ivan Labs",
    url: `${SITE_URL}/about`,
    jobTitle: "Software Developer",
    description: t("body1"),
    knowsAbout: SKILL_GROUPS.flatMap((group) => group.items),
  };

  return (
    <main className="mx-auto max-w-2xl px-6 py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
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

      <Reveal delay={0.5} className="mt-10">
        <h2 className="text-xl font-semibold">{tSkills("title")}</h2>
        <div className="mt-6 space-y-8">
          {SKILL_GROUPS.map((group) => (
            <div key={group.key}>
              <h3 className="text-sm font-medium uppercase tracking-wide text-[var(--text-muted)]">
                {tSkills(`categories.${group.key}`)}
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-[var(--radius-theme)] border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </main>
  );
}
