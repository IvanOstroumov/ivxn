import { useTranslations } from "next-intl";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { buildMetadata } from "@/lib/seo";

const SERVICE_KEYS = [
  "softwareDev",
  "mobile",
  "customTools",
  "automation",
  "consulting",
  "forensics",
] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const [services, seo] = await Promise.all([
    getTranslations({ locale, namespace: "services" }),
    getTranslations({ locale, namespace: "seo" }),
  ]);
  return buildMetadata({
    locale,
    path: "/services",
    title: `${services("title")} — Ivan Ostroumov`,
    description: seo("servicesDescription"),
  });
}

export default function ServicesPage() {
  const t = useTranslations("services");
  return (
    <main className="mx-auto max-w-4xl px-6 py-24">
      <h1 className="text-3xl font-semibold">{t("title")}</h1>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {SERVICE_KEYS.map((key) => (
          <div key={key} className="card p-5">
            <h2 className="font-medium">{t(`items.${key}.title`)}</h2>
            <p className="mt-2 text-sm text-[var(--text-muted)]">
              {t(`items.${key}.description`)}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
