import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { getAllTags, getPostsByTag } from "@/lib/blog";
import { BlogCard } from "@/components/blog/BlogCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { buildMetadata } from "@/lib/seo";

export async function generateStaticParams() {
  const tags = await getAllTags();
  return routing.locales.flatMap((locale) => tags.map((tag) => ({ locale, tag })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; tag: string }>;
}): Promise<Metadata> {
  const { locale, tag } = await params;
  const blog = await getTranslations({ locale, namespace: "blogPage" });
  const tagLabel = blog.has(`tags.${tag}`) ? blog(`tags.${tag}`) : tag;
  return buildMetadata({
    locale,
    path: `/blog/tag/${tag}`,
    title: `${blog("tagPagePrefix")}: ${tagLabel} — Ivan Ostroumov`,
    description: blog("description"),
  });
}

export default async function BlogTagPage({
  params,
}: {
  params: Promise<{ locale: string; tag: string }>;
}) {
  const { locale, tag } = await params;
  const [t, nav, posts] = await Promise.all([
    getTranslations({ locale, namespace: "blogPage" }),
    getTranslations({ locale, namespace: "nav" }),
    getPostsByTag(locale, tag),
  ]);
  if (posts.length === 0) notFound();

  const tagLabel = t.has(`tags.${tag}`) ? t(`tags.${tag}`) : tag;
  const dateFormatter = new Intl.DateTimeFormat(locale, { dateStyle: "medium" });

  return (
    <main className="mx-auto max-w-4xl px-6 py-24">
      <Breadcrumbs
        items={[
          { label: nav("home"), href: "/" },
          { label: nav("blog"), href: "/blog" },
          { label: tagLabel },
        ]}
      />
      <h1 className="text-3xl font-semibold">
        {t("tagPagePrefix")}: {tagLabel}
      </h1>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {posts.map((post) => (
          <BlogCard
            key={post.frontmatter.slug}
            slug={post.frontmatter.slug}
            title={post.frontmatter.title}
            description={post.frontmatter.description}
            dateLabel={dateFormatter.format(new Date(post.frontmatter.date))}
            readingLabel={t("readingTime", { minutes: post.readingMinutes })}
            tagLabels={post.frontmatter.tags.map((tg) => (t.has(`tags.${tg}`) ? t(`tags.${tg}`) : tg))}
            notTranslatedNote={!post.translated ? t("notTranslatedNote") : undefined}
          />
        ))}
      </div>
    </main>
  );
}
