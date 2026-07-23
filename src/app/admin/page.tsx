import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { getProjects, getTools } from "@/lib/content-store";
import { deleteProjectAction, deleteToolAction, logoutAction } from "./actions";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  if (!(await isAuthenticated())) {
    redirect("/admin/login");
  }

  const [projects, tools] = await Promise.all([getProjects(), getTools()]);

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Admin</h1>
        <form action={logoutAction}>
          <button type="submit" className="text-sm text-[var(--text-muted)] hover:text-[var(--text)]">
            Log out
          </button>
        </form>
      </div>

      <section className="mt-10">
        <div className="flex items-center justify-between">
          <h2 className="font-medium">Projects</h2>
          <Link
            href="/admin/projects/new"
            className="rounded-[var(--radius-theme)] px-3 py-1.5 text-sm font-medium"
            style={{ backgroundColor: "var(--accent)", color: "var(--bg)" }}
          >
            + Add project
          </Link>
        </div>
        <ul className="mt-4 divide-y divide-[var(--border)] rounded-[var(--radius-theme)] border border-[var(--border)]">
          {projects.map((p) => (
            <li key={p.slug} className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="font-medium">{p.title}</p>
                <p className="text-xs text-[var(--text-muted)]">
                  {p.category} · {p.status}
                </p>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Link href={`/admin/projects/${p.slug}/edit`} className="hover:text-[var(--accent)]">
                  Edit
                </Link>
                <form action={deleteProjectAction}>
                  <input type="hidden" name="slug" value={p.slug} />
                  <button type="submit" className="text-red-500 hover:underline">
                    Delete
                  </button>
                </form>
              </div>
            </li>
          ))}
          {projects.length === 0 && (
            <li className="px-4 py-3 text-sm text-[var(--text-muted)]">No projects yet.</li>
          )}
        </ul>
      </section>

      <section className="mt-10">
        <div className="flex items-center justify-between">
          <h2 className="font-medium">Tools</h2>
          <Link
            href="/admin/tools/new"
            className="rounded-[var(--radius-theme)] px-3 py-1.5 text-sm font-medium"
            style={{ backgroundColor: "var(--accent)", color: "var(--bg)" }}
          >
            + Add tool
          </Link>
        </div>
        <ul className="mt-4 divide-y divide-[var(--border)] rounded-[var(--radius-theme)] border border-[var(--border)]">
          {tools.map((t) => (
            <li key={t.slug} className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="font-medium">{t.name}</p>
                <p className="text-xs text-[var(--text-muted)]">{t.platforms.join(", ")}</p>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Link href={`/admin/tools/${t.slug}/edit`} className="hover:text-[var(--accent)]">
                  Edit
                </Link>
                <form action={deleteToolAction}>
                  <input type="hidden" name="slug" value={t.slug} />
                  <button type="submit" className="text-red-500 hover:underline">
                    Delete
                  </button>
                </form>
              </div>
            </li>
          ))}
          {tools.length === 0 && (
            <li className="px-4 py-3 text-sm text-[var(--text-muted)]">No tools yet.</li>
          )}
        </ul>
      </section>

      {!process.env.BLOB_READ_WRITE_TOKEN && (
        <p className="mt-10 rounded-[var(--radius-theme)] border border-[var(--border)] bg-[var(--surface)] p-3 text-xs text-[var(--text-muted)]">
          BLOB_READ_WRITE_TOKEN isn&apos;t set — content edits are saved to local JSON files
          (fine for dev), and file uploads are disabled until Vercel Blob is connected.
        </p>
      )}
    </main>
  );
}
