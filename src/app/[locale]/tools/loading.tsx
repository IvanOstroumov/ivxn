export default function ToolsLoading() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-24">
      <div className="h-9 w-32 animate-pulse rounded-[var(--radius-theme)] bg-[var(--surface-2)]" />
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {[0, 1].map((i) => (
          <div
            key={i}
            className="h-32 animate-pulse rounded-[var(--radius-theme)] border border-[var(--border)] bg-[var(--surface)]"
          />
        ))}
      </div>
    </main>
  );
}
