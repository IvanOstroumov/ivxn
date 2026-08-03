import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { getAllPosts, getAllTags } from "@/lib/blog";
import { BlogCard } from "@/components/blog/BlogCard";
import { Link } from "@/i18n/navigation";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const [blog, seo] = await Promise.all([
    getTranslations({ locale, namespace: "blogPage" }),
    getTranslations({ locale, namespace: "seo" }),
  ]);
  return buildMetadata({
    locale,
    path: "/blog",
    title: `${blog("title")} — Ivan Ostroumov`,
    description: seo("blogDescription"),
  });
}

export default async function BlogIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const [t, posts, tags] = await Promise.all([
    getTranslations({ locale, namespace: "blogPage" }),
    getAllPosts(locale),
    getAllTags(),
  ]);
  const dateFormatter = new Intl.DateTimeFormat(locale, { dateStyle: "medium" });

  return (
    <main className="mx-auto max-w-4xl px-6 py-24">
      <h1 className="text-3xl font-semibold">{t("title")}</h1>
      <p className="mt-3 max-w-2xl text-[var(--text-muted)]">{t("description")}</p>

      {tags.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Link
              key={tag}
              href={`/blog/tag/${tag}`}
              className="rounded-[var(--radius-pill)] border border-[var(--border)] px-3 py-1 text-sm hover:border-[var(--accent)]"
            >
              {t.has(`tags.${tag}`) ? t(`tags.${tag}`) : tag}
            </Link>
          ))}
        </div>
      )}

      {posts.length === 0 ? (
        <p className="mt-10 text-[var(--text-muted)]">{t("emptyState")}</p>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {posts.map((post) => (
            <BlogCard
              key={post.frontmatter.slug}
              slug={post.frontmatter.slug}
              title={post.frontmatter.title}
              description={post.frontmatter.description}
              dateLabel={dateFormatter.format(new Date(post.frontmatter.date))}
              readingLabel={t("readingTime", { minutes: post.readingMinutes })}
              tagLabels={post.frontmatter.tags.map((tag) => (t.has(`tags.${tag}`) ? t(`tags.${tag}`) : tag))}
              notTranslatedNote={!post.translated ? t("notTranslatedNote") : undefined}
            />
          ))}
        </div>
      )}
    </main>
  );
}
