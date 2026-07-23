import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { ToolForm } from "@/components/admin/ToolForm";

export default async function NewToolPage() {
  if (!(await isAuthenticated())) redirect("/admin/login");
  return (
    <main className="mx-auto max-w-xl px-6 py-12">
      <h1 className="text-xl font-semibold">Add tool</h1>
      <div className="mt-6">
        <ToolForm />
      </div>
    </main>
  );
}
