import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";
import { Callout } from "@/components/blog/Callout";

// Dual light/dark Shiki themes emitted as CSS variables (--shiki-light /
// --shiki-dark) on each token span. We switch between them per-theme (not
// prefers-color-scheme) with CSS rules in globals.css, since the site's 4
// themes are picked via a data-theme attribute, not the OS color scheme.
const prettyCodeOptions = {
  theme: { dark: "github-dark", light: "github-light" },
  keepBackground: false,
};

const mdxComponents = {
  Callout,
};

export function MdxContent({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      components={mdxComponents}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [
            rehypeSlug,
            [rehypeAutolinkHeadings, { behavior: "wrap" }],
            [rehypePrettyCode, prettyCodeOptions],
          ],
        },
      }}
    />
  );
}
