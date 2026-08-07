import { ImageResponse } from "next/og";
import { getPageBySlug } from "@/lib/content";
import { SITE_NAME, THEME_COLOR } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let h1 = SITE_NAME;
  try {
    h1 = getPageBySlug(`/${slug}`).h1;
  } catch {
    // Falls back to SITE_NAME if the slug doesn't resolve to a content
    // file (shouldn't happen for a real route, but never throw building
    // an OG image over a genuine 404).
  }

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
          backgroundColor: THEME_COLOR,
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
            borderRadius: 24,
            backgroundColor: "rgba(255,255,255,0.12)",
            marginBottom: 36,
          }}
        >
          <svg width="68" height="68" viewBox="0 0 32 32">
            <path
              d="M16 6c3.5 4.2 6 7.6 6 10.6a6 6 0 1 1-12 0C10 13.6 12.5 10.2 16 6z"
              fill="#fff"
            />
          </svg>
        </div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 800,
            color: "#fff",
            textAlign: "center",
            padding: "0 90px",
            lineHeight: 1.2,
          }}
        >
          {h1}
        </div>
        <div
          style={{
            fontSize: 28,
            fontWeight: 600,
            color: "#EA580C",
            marginTop: 28,
          }}
        >
          {SITE_NAME}
        </div>
      </div>
    ),
    { ...size }
  );
}
