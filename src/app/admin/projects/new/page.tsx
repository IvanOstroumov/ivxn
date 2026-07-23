import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { ProjectForm } from "@/components/admin/ProjectForm";

export default async function NewProjectPage() {
  if (!(await isAuthenticated())) redirect("/admin/login");
  return (
    <main className="mx-auto max-w-xl px-6 py-12">
      <h1 className="text-xl font-semibold">Add project</h1>
      <div className="mt-6">
        <ProjectForm />
      </div>
    </main>
  );
}
