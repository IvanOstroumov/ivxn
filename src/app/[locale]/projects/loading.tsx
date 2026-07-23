export default function ProjectsLoading() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-24">
      <div className="h-9 w-40 animate-pulse rounded-[var(--radius-theme)] bg-[var(--surface-2)]" />
      <div className="mt-8 flex flex-wrap gap-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="h-8 w-20 animate-pulse rounded-[var(--radius-theme)] bg-[var(--surface-2)]"
          />
        ))}
      </div>
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-28 animate-pulse rounded-[var(--radius-theme)] border border-[var(--border)] bg-[var(--surface)]"
          />
        ))}
      </div>
    </main>
  );
}
