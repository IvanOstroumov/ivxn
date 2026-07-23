import { ThemeSwitcher } from "@/components/ThemeSwitcher";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex items-center justify-between border-b border-[var(--border)] px-6 py-4">
        <span className="font-semibold">IO — Ivan Labs</span>
        <ThemeSwitcher />
      </header>
      <main className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
        <h1 className="text-4xl font-semibold">Ivan Ostroumov</h1>
        <p className="max-w-md text-[var(--text-muted)]">
          Theme system scaffold — switch themes above to preview Cyber, Minimal, Glass, and
          Experimental token sets.
        </p>
        <button
          type="button"
          className="rounded-[var(--radius-theme)] px-5 py-2.5 font-medium"
          style={{ backgroundColor: "var(--accent)", color: "var(--bg)" }}
        >
          Contact Me
        </button>
      </main>
    </div>
  );
}
