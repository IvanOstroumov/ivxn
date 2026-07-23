export default function ToolDetailLoading() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-24">
      <div className="h-4 w-24 animate-pulse rounded bg-[var(--surface-2)]" />
      <div className="mt-4 h-9 w-56 animate-pulse rounded-[var(--radius-theme)] bg-[var(--surface-2)]" />
      <div className="mt-3 h-4 w-full animate-pulse rounded bg-[var(--surface-2)]" />
      <div className="mt-8 grid grid-cols-2 gap-4">
        <div className="h-10 animate-pulse rounded bg-[var(--surface-2)]" />
        <div className="h-10 animate-pulse rounded bg-[var(--surface-2)]" />
      </div>
      <div className="mt-8 h-10 w-32 animate-pulse rounded-[var(--radius-theme)] bg-[var(--surface-2)]" />
    </main>
  );
}
