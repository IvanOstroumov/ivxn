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
  const [contactPage, seo] = await Promise.all([
    getTranslations({ locale, namespace: "contactPage" }),
    getTranslations({ locale, namespace: "seo" }),
  ]);
  return buildMetadata({
    locale,
    path: "/contact",
    title: `${contactPage("title")} — Ivan Ostroumov`,
    description: seo("contactDescription"),
  });
}

const LINKS = [
  { key: "github", href: "https://github.com/IvanOstroumov" },
  { key: "telegram", href: "#" },
  { key: "whatsapp", href: "#" },
  { key: "linkedin", href: "#" },
] as const;

export default function ContactPage() {
  const t = useTranslations("contactPage");
  return (
    <main className="mx-auto max-w-xl px-6 py-24 text-center">
      <h1 className="text-3xl font-semibold">{t("title")}</h1>
      <p className="mt-4 text-[var(--text-muted)]">{t("intro")}</p>

      <p className="mt-8 rounded-[var(--radius-theme)] border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--text-muted)]">
        {t("emailPending")}
      </p>

      <div className="mt-6 flex flex-wrap justify-center gap-3">
        {LINKS.map((link) => (
          <a
            key={link.key}
            href={link.href}
            className="rounded-[var(--radius-theme)] border border-[var(--border)] px-4 py-2 text-sm hover:border-[var(--accent)]"
          >
            {t(link.key)}
          </a>
        ))}
      </div>
    </main>
  );
}
