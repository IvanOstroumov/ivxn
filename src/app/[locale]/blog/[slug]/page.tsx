import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { getAllSlugs, getPost, getRelatedPosts } from "@/lib/blog";
import { extractHeadings } from "@/lib/extract-headings";
import { MdxContent } from "@/components/blog/MdxContent";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { FaqSection } from "@/components/blog/FaqSection";
import { RelatedArticles } from "@/components/blog/RelatedArticles";
import { ShareButtons } from "@/components/blog/ShareButtons";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTAButton } from "@/components/CTAButton";
import { SITE_URL } from "@/lib/seo";

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return routing.locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getPost(locale, slug);
  if (!post) return {};

  const { frontmatter, availableLocales } = post;
  const url = `${SITE_URL}/${locale}/blog/${slug}`;
  const languages = Object.fromEntries(
    availableLocales.map((l) => [l, `${SITE_URL}/${l}/blog/${slug}`])
  );
  languages["x-default"] = `${SITE_URL}/en/blog/${slug}`;

  return {
    title: `${frontmatter.title} — Ivan Ostroumov`,
    description: frontmatter.description,
    keywords: frontmatter.keywords,
    alternates: { canonical: url, languages },
    openGraph: {
      type: "article",
      title: frontmatter.title,
      description: frontmatter.description,
      url,
      siteName: "Ivan Labs",
      locale,
      publishedTime: frontmatter.date,
      modifiedTime: frontmatter.updated,
      authors: [frontmatter.author],
      tags: frontmatter.tags,
    },
    twitter: { card: "summary_large_image", title: frontmatter.title, description: frontmatter.description },
    robots: {
      index: true,
      follow: true,
      googleBot: { "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
    },
  };
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = await getPost(locale, slug);
  if (!post) notFound();

  const [t, nav] = await Promise.all([
    getTranslations({ locale, namespace: "blogPage" }),
    getTranslations({ locale, namespace: "nav" }),
  ]);

  const { frontmatter, content, readingMinutes, translated } = post;
  const url = `${SITE_URL}/${locale}/blog/${slug}`;
  const headings = extractHeadings(content);
  const relatedPosts = await getRelatedPosts(locale, slug, frontmatter.tags);
  const dateFormatter = new Intl.DateTimeFormat(locale, { dateStyle: "long" });
  const tagLabels = frontmatter.tags.map((tag) => (t.has(`tags.${tag}`) ? t(`tags.${tag}`) : tag));

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: frontmatter.title,
    description: frontmatter.description,
    image: `${url}/opengraph-image`,
    datePublished: frontmatter.date,
    dateModified: frontmatter.updated,
    author: { "@type": "Person", name: frontmatter.author, url: `${SITE_URL}/en/about` },
    publisher: { "@type": "Organization", name: "Ivan Labs", url: SITE_URL },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    keywords: frontmatter.keywords.join(", "),
    inLanguage: locale,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: nav("home"), item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: nav("blog"), item: `${SITE_URL}/${locale}/blog` },
      { "@type": "ListItem", position: 3, name: frontmatter.title, item: url },
    ],
  };

  const faqJsonLd = frontmatter.faq
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: frontmatter.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      }
    : null;

  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {faqJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      )}

      <Breadcrumbs
        items={[
          { label: nav("home"), href: "/" },
          { label: nav("blog"), href: "/blog" },
          { label: frontmatter.title },
        ]}
      />

      <article>
        <h1 className="text-3xl font-semibold">{frontmatter.title}</h1>
        <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-[var(--text-muted)]">
          <time dateTime={frontmatter.date}>{t("publishedOn", { date: dateFormatter.format(new Date(frontmatter.date)) })}</time>
          {frontmatter.updated !== frontmatter.date && (
            <time dateTime={frontmatter.updated}>{t("updatedOn", { date: dateFormatter.format(new Date(frontmatter.updated)) })}</time>
          )}
          <span>{t("readingTime", { minutes: readingMinutes })}</span>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {tagLabels.map((tag) => (
            <span key={tag} className="rounded-[var(--radius-pill)] border border-[var(--border)] px-2 py-0.5 text-xs">
              {tag}
            </span>
          ))}
        </div>

        {!translated && (
          <p className="card mt-4 p-3 text-sm text-[var(--text-muted)]">{t("notTranslatedNote")}</p>
        )}

        {headings.length > 1 && (
          <div className="mt-6">
            <TableOfContents headings={headings} title={t("tableOfContents")} />
          </div>
        )}

        <div className="prose-article mt-8">
          <MdxContent source={content} />
        </div>

        <FaqSection title={t("faqTitle")} items={frontmatter.faq ?? []} />

        <div className="card mt-12 p-6">
          <h2 className="text-lg font-semibold">{t("ctaTitle")}</h2>
          <p className="mt-1 text-sm text-[var(--text-muted)]">{t("ctaBody")}</p>
          <CTAButton className="mt-4">{t("ctaButton")}</CTAButton>
        </div>

        <RelatedArticles
          title={t("relatedArticles")}
          items={relatedPosts.map((p) => ({ slug: p.frontmatter.slug, title: p.frontmatter.title }))}
        />

        <ShareButtons url={url} title={frontmatter.title} label={t("share")} />
      </article>
    </main>
  );
}
