import { ImageResponse } from "next/og";
import { SITE_NAME, THEME_COLOR } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
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
            width: 140,
            height: 140,
            borderRadius: 28,
            backgroundColor: "rgba(255,255,255,0.12)",
            marginBottom: 40,
          }}
        >
          <svg width="80" height="80" viewBox="0 0 32 32">
            <path
              d="M4 18 L16 8 L28 18 L25 18 L25 26 L19 26 L19 20 L13 20 L13 26 L7 26 L7 18 Z"
              fill="#fff"
            />
            <path
              d="M22 4c1.8 2.1 3 3.8 3 5.3a3 3 0 1 1-6 0C19 7.8 20.2 6.1 22 4z"
              fill="#fff"
              opacity="0.85"
            />
          </svg>
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            color: "#fff",
            textAlign: "center",
            padding: "0 80px",
            lineHeight: 1.15,
          }}
        >
          {SITE_NAME}
        </div>
        <div
          style={{
            fontSize: 32,
            fontWeight: 600,
            color: "#EA580C",
            marginTop: 24,
          }}
        >
          Free Estimate · Insured Local Contractor
        </div>
      </div>
    ),
    { ...size }
  );
}
