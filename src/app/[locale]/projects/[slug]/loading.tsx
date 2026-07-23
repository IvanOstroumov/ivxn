export default function ProjectDetailLoading() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <div className="h-4 w-28 animate-pulse rounded bg-[var(--surface-2)]" />
      <div className="mt-4 h-9 w-64 animate-pulse rounded-[var(--radius-theme)] bg-[var(--surface-2)]" />
      <div className="mt-2 h-4 w-full max-w-md animate-pulse rounded bg-[var(--surface-2)]" />
      <div className="mt-6 aspect-video animate-pulse rounded-[var(--radius-theme)] border border-[var(--border)] bg-[var(--surface)]" />
      <div className="mt-3 grid grid-cols-4 gap-3">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="aspect-video animate-pulse rounded-[var(--radius-theme)] bg-[var(--surface-2)]"
          />
        ))}
      </div>
      <div className="mt-6 space-y-2">
        <div className="h-4 w-full animate-pulse rounded bg-[var(--surface-2)]" />
        <div className="h-4 w-5/6 animate-pulse rounded bg-[var(--surface-2)]" />
      </div>
    </main>
  );
}
