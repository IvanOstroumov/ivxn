import { Link } from "@/i18n/navigation";

export function RelatedArticles({
  title,
  items,
}: {
  title: string;
  items: { slug: string; title: string }[];
}) {
  if (items.length === 0) return null;

  return (
    <section className="mt-12">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {items.map((item) => (
          <Link key={item.slug} href={`/blog/${item.slug}`} className="card p-4 text-sm font-medium">
            {item.title}
          </Link>
        ))}
      </div>
    </section>
  );
}
