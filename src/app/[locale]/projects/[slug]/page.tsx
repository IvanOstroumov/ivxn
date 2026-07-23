import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getProjectBySlug } from "@/lib/content-store";
import { getLocalized } from "@/lib/localized";
import { ProjectGallery } from "@/components/ProjectGallery";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Link } from "@/i18n/navigation";
import { buildMetadata, SITE_URL } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};

  return buildMetadata({
    locale,
    path: `/projects/${slug}`,
    title: `${project.title} — Ivan Ostroumov`,
    description: getLocalized(project.shortDescription, locale),
  });
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const t = await getTranslations("projectsPage");
  const nav = await getTranslations("nav");

  const projectUrl = `${SITE_URL}/${locale}/projects/${slug}`;
  const shortDescription = getLocalized(project.shortDescription, locale);
  const fullDescription = getLocalized(project.fullDescription, locale);
  const statusNote = project.statusNote ? getLocalized(project.statusNote, locale) : undefined;

  // CreativeWork + BreadcrumbList structured data — makes individual projects
  // eligible for rich results and gives search engines an explicit site
  // hierarchy (Home > Projects > this project) instead of inferring it.
  const projectJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: fullDescription,
    url: projectUrl,
    creator: { "@type": "Person", name: "Ivan Ostroumov", url: SITE_URL },
    keywords: project.techStack.join(", ") || undefined,
    ...(project.demoUrl ? { sameAs: [project.demoUrl] } : {}),
  };

  const breadcrumbItems = [
    { label: nav("home"), href: "/" },
    { label: nav("projects"), href: "/projects" },
    { label: project.title },
  ];

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: nav("home"), item: `${SITE_URL}/${locale}` },
      {
        "@type": "ListItem",
        position: 2,
        name: nav("projects"),
        item: `${SITE_URL}/${locale}/projects`,
      },
      { "@type": "ListItem", position: 3, name: project.title, item: projectUrl },
    ],
  };

  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <Breadcrumbs items={breadcrumbItems} />

      <Link href="/projects" className="text-sm text-[var(--text-muted)] hover:text-[var(--text)]">
        ← {t("backToProjects")}
      </Link>

      <h1 className="mt-4 text-3xl font-semibold">{project.title}</h1>
      <p className="mt-2 text-[var(--text-muted)]">{shortDescription}</p>

      <div className="mt-6">
        <ProjectGallery title={project.title} />
      </div>

      <p className="mt-6 text-[var(--text)]">{fullDescription}</p>

      {statusNote && (
        <p className="mt-4 rounded-[var(--radius-theme)] border border-[var(--border)] bg-[var(--surface)] p-3 text-sm text-[var(--text-muted)]">
          {statusNote}
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
