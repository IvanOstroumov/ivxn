import { redirect, notFound } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { getProjectBySlug } from "@/lib/content-store";
import { ProjectForm } from "@/components/admin/ProjectForm";

export const dynamic = "force-dynamic";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  if (!(await isAuthenticated())) redirect("/admin/login");
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <main className="mx-auto max-w-xl px-6 py-12">
      <h1 className="text-xl font-semibold">Edit project</h1>
      <div className="mt-6">
        <ProjectForm project={project} />
      </div>
    </main>
  );
}
