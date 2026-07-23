import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Generated default social-share preview (Twitter/LinkedIn/Telegram/WhatsApp
// unfurl cards) — no photo/design asset needed yet, so shares don't show a
// blank/broken preview. Swap for a designed image once the real photo and
// final theme colors are locked in (see ASSETS.md).
export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "hero" });

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#08090c",
          color: "#f2f4f8",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 120,
            height: 120,
            borderRadius: 28,
            backgroundColor: "#101218",
            marginBottom: 40,
            fontSize: 56,
            fontWeight: 700,
          }}
        >
          IO
        </div>
        <div style={{ fontSize: 64, fontWeight: 700, display: "flex" }}>{t("name")}</div>
        <div style={{ fontSize: 32, color: "#8a92a6", marginTop: 16, display: "flex" }}>
          {t("brand")}
        </div>
      </div>
    ),
    { ...size }
  );
}
