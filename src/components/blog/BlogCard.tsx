import { Link } from "@/i18n/navigation";

export function BlogCard({
  slug,
  title,
  description,
  dateLabel,
  readingLabel,
  tagLabels,
  notTranslatedNote,
}: {
  slug: string;
  title: string;
  description: string;
  dateLabel: string;
  readingLabel: string;
  tagLabels: string[];
  notTranslatedNote?: string;
}) {
  return (
    <Link href={`/blog/${slug}`} className="card block p-5">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="mt-2 text-sm text-[var(--text-muted)]">{description}</p>
      <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-[var(--text-muted)]">
        <span>{dateLabel}</span>
        <span aria-hidden="true">·</span>
        <span>{readingLabel}</span>
        {tagLabels.map((tag) => (
          <span key={tag} className="rounded-[var(--radius-pill)] border border-[var(--border)] px-2 py-0.5">
            {tag}
          </span>
        ))}
      </div>
      {notTranslatedNote && (
        <p className="mt-2 text-xs italic text-[var(--text-muted)] opacity-70">{notTranslatedNote}</p>
      )}
    </Link>
  );
}
