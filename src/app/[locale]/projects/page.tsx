import { useTranslations } from "next-intl";
import { projects } from "@/content/projects";
import { ProjectsGrid } from "@/components/ProjectsGrid";

export default function ProjectsPage() {
  const t = useTranslations("projectsPage");
  return (
    <main className="mx-auto max-w-4xl px-6 py-24">
      <h1 className="text-3xl font-semibold">{t("title")}</h1>
      <div className="mt-8">
        <ProjectsGrid projects={projects} />
      </div>
    </main>
  );
}
