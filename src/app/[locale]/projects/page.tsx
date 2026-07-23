import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getProjects } from "@/lib/content-store";
import { ProjectsGrid } from "@/components/ProjectsGrid";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const [projectsPage, seo] = await Promise.all([
    getTranslations({ locale, namespace: "projectsPage" }),
    getTranslations({ locale, namespace: "seo" }),
  ]);
  return buildMetadata({
    locale,
    path: "/projects",
    title: `${projectsPage("title")} — Ivan Ostroumov`,
    description: seo("projectsDescription"),
  });
}

export default async function ProjectsPage() {
  const t = await getTranslations("projectsPage");
  const projects = await getProjects();
  return (
    <main className="mx-auto max-w-4xl px-6 py-24">
      <h1 className="text-3xl font-semibold">{t("title")}</h1>
      <div className="mt-8">
        <ProjectsGrid projects={projects} />
      </div>
    </main>
  );
}
