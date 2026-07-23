import { useTranslations } from "next-intl";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const [skills, seo] = await Promise.all([
    getTranslations({ locale, namespace: "skills" }),
    getTranslations({ locale, namespace: "seo" }),
  ]);
  return buildMetadata({
    locale,
    path: "/skills",
    title: `${skills("title")} — Ivan Ostroumov`,
    description: seo("skillsDescription"),
  });
}

const SKILL_GROUPS = [
  { key: "languages", items: ["C#", "Java", "Kotlin", "PHP", "Python", "JavaScript", "TypeScript"] },
  { key: "development", items: ["Android", "Desktop", "Backend", "Databases", "APIs"] },
  { key: "technologies", items: ["Git", "Linux", "Cloud", "AI tools", "Automation"] },
  { key: "other", items: ["Digital Forensics", "Data Recovery", "Reverse Engineering", "Problem Solving"] },
] as const;

export default function SkillsPage() {
  const t = useTranslations("skills");
  return (
    <main className="mx-auto max-w-4xl px-6 py-24">
      <h1 className="text-3xl font-semibold">{t("title")}</h1>
      <div className="mt-8 space-y-8">
        {SKILL_GROUPS.map((group) => (
          <div key={group.key}>
            <h2 className="text-sm font-medium uppercase tracking-wide text-[var(--text-muted)]">
              {t(`categories.${group.key}`)}
            </h2>
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
    </main>
  );
}
