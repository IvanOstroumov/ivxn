import { ImageResponse } from "next/og";
import { getPost } from "@/lib/blog";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Always rendered in the Cyber palette regardless of the viewer's active
// site theme — OG previews are consumed by social platforms, not by someone
// with a theme preference set, so a single consistent style is the right
// call here (agreed with Ivan rather than generating 4 theme variants).
export default async function BlogOpengraphImage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = await getPost(locale, slug);
  const title = post?.frontmatter.ogImageTitle ?? post?.frontmatter.title ?? "Blog";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0a121e",
          color: "#ffffff",
          fontFamily: "sans-serif",
          padding: 64,
        }}
      >
        <div style={{ display: "flex", fontSize: 32, color: "#2e9fd9", fontWeight: 700 }}>
          IO — Ivan Labs / Blog
        </div>
        <div style={{ display: "flex", fontSize: 56, fontWeight: 700, lineHeight: 1.2, maxWidth: 1000 }}>
          {title}
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#93a4b8" }}>ivxn.dev</div>
      </div>
    ),
    { ...size }
  );
}
