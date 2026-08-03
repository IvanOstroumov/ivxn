import type { Heading } from "@/lib/extract-headings";

export function TableOfContents({ headings, title }: { headings: Heading[]; title: string }) {
  if (headings.length < 2) return null;

  return (
    <nav aria-label={title} className="card p-4">
      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-[var(--text-muted)]">{title}</p>
      {headings.map((h) => (
        <a key={h.id} href={`#${h.id}`} className="toc-link" style={h.depth === 3 ? { paddingLeft: "1em" } : undefined}>
          {h.text}
        </a>
      ))}
    </nav>
  );
}
