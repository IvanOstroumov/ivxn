import { redirect, notFound } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { getToolBySlug } from "@/lib/content-store";
import { ToolForm } from "@/components/admin/ToolForm";

export const dynamic = "force-dynamic";

export default async function EditToolPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  if (!(await isAuthenticated())) redirect("/admin/login");
  const { slug } = await params;
  const tool = await getToolBySlug(slug);
  if (!tool) notFound();

  return (
    <main className="mx-auto max-w-xl px-6 py-12">
      <h1 className="text-xl font-semibold">Edit tool</h1>
      <div className="mt-6">
        <ToolForm tool={tool} />
      </div>
    </main>
  );
}
