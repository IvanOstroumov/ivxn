import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// iOS home-screen icon — generated from the same IO monogram as icon.svg
// (which covers browser tabs), since iOS still generally expects a PNG
// rather than reading an SVG favicon for "Add to Home Screen".
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#08090c",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 72,
            fontWeight: 700,
            color: "#f2f4f8",
          }}
        >
          I
        </div>
        <div
          style={{
            display: "flex",
            position: "absolute",
            width: 70,
            height: 70,
            borderRadius: "50%",
            border: "8px solid #00f0ff",
            marginLeft: 60,
          }}
        />
        <div
          style={{
            display: "flex",
            position: "absolute",
            width: 20,
            height: 20,
            borderRadius: "50%",
            backgroundColor: "#00f0ff",
            marginLeft: 95,
          }}
        />
      </div>
    ),
    { ...size }
  );
}
