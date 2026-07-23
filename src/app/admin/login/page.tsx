import { loginAction } from "../actions";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; minutes?: string }>;
}) {
  const { error, minutes } = await searchParams;

  return (
    <main className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-6">
      <h1 className="text-xl font-semibold">Admin login</h1>
      <form action={loginAction} className="mt-6 flex flex-col gap-3">
        <input
          type="password"
          name="password"
          placeholder="Password"
          autoFocus
          required
          className="rounded-[var(--radius-theme)] border border-[var(--border)] bg-[var(--surface)] px-3 py-2"
        />
        {error === "locked" && (
          <p className="text-sm text-red-500">
            Too many wrong attempts — try again in {minutes ?? "a few"} minute
            {minutes === "1" ? "" : "s"}.
          </p>
        )}
        {error === "1" && <p className="text-sm text-red-500">Wrong password.</p>}
        <button
          type="submit"
          className="rounded-[var(--radius-theme)] px-4 py-2 font-medium"
          style={{ backgroundColor: "var(--accent)", color: "var(--bg)" }}
        >
          Log in
        </button>
      </form>
    </main>
  );
}
