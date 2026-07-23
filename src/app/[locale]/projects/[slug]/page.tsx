import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getProjectBySlug, projects } from "@/content/projects";
import { ProjectGallery } from "@/components/ProjectGallery";
import { Link } from "@/i18n/navigation";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const t = await getTranslations("projectsPage");

  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <Link href="/projects" className="text-sm text-[var(--text-muted)] hover:text-[var(--text)]">
        ← {t("backToProjects")}
      </Link>

      <h1 className="mt-4 text-3xl font-semibold">{project.title}</h1>
      <p className="mt-2 text-[var(--text-muted)]">{project.shortDescription}</p>

      <div className="mt-6">
        <ProjectGallery title={project.title} />
      </div>

      <p className="mt-6 text-[var(--text)]">{project.fullDescription}</p>

      {project.statusNote && (
        <p className="mt-4 rounded-[var(--radius-theme)] border border-[var(--border)] bg-[var(--surface)] p-3 text-sm text-[var(--text-muted)]">
          {project.statusNote}
        </p>
      )}

      <dl className="mt-8 grid grid-cols-2 gap-4 text-sm sm:grid-cols-3">
        <div>
          <dt className="text-[var(--text-muted)]">{t("status")}</dt>
          <dd>{project.status}</dd>
        </div>
        <div>
          <dt className="text-[var(--text-muted)]">{t("platform")}</dt>
          <dd>{project.platform}</dd>
        </div>
        {project.techStack.length > 0 && (
          <div>
            <dt className="text-[var(--text-muted)]">{t("techStack")}</dt>
            <dd>{project.techStack.join(", ")}</dd>
          </div>
        )}
      </dl>

      <div className="mt-8 flex flex-wrap gap-3">
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            className="rounded-[var(--radius-theme)] border border-[var(--border)] px-4 py-2 text-sm hover:border-[var(--accent)]"
          >
            {t("visitDemo")}
          </a>
        )}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            className="rounded-[var(--radius-theme)] border border-[var(--border)] px-4 py-2 text-sm hover:border-[var(--accent)]"
          >
            {t("sourceCode")}
          </a>
        )}
        {project.downloadUrl && (
          <a
            href={project.downloadUrl}
            className="rounded-[var(--radius-theme)] border border-[var(--border)] px-4 py-2 text-sm hover:border-[var(--accent)]"
          >
            {t("download")}
          </a>
        )}
      </div>
    </main>
  );
}
