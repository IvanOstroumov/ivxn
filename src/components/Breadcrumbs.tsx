import { Link } from "@/i18n/navigation";

export type Crumb = { label: string; href?: string };

// Visible counterpart to the BreadcrumbList JSON-LD already present on
// project/tool detail pages — same hierarchy, just rendered for people
// instead of only for search engines.
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4 flex flex-wrap items-center gap-1.5 text-sm text-[var(--text-muted)]">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <span aria-hidden="true">/</span>}
          {item.href ? (
            <Link href={item.href} className="hover:text-[var(--text)]">
              {item.label}
            </Link>
          ) : (
            <span className="text-[var(--text)]">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
