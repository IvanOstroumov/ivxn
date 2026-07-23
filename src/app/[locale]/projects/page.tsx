import { getTranslations } from "next-intl/server";
import { getProjects } from "@/lib/content-store";
import { ProjectsGrid } from "@/components/ProjectsGrid";

export const dynamic = "force-dynamic";

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
