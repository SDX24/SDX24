import { ImageResponse } from "next/og";

import { SITE } from "@/lib/site";

export const alt = `${SITE.name} · ${SITE.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Generated at build time so shared links render a real card instead of a blank preview.
 * Uses system fonts, because next/font faces aren't available inside the OG runtime.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#000000",
        backgroundImage:
          "radial-gradient(circle at 20% 20%, rgba(0,169,145,0.22), transparent 45%), radial-gradient(circle at 85% 80%, rgba(242,197,124,0.14), transparent 45%)",
        padding: "72px",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 22,
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          color: "#DDAE7E",
          fontWeight: 600,
        }}
      >
        SDX24
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <div
          style={{
            display: "flex",
            fontSize: 84,
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
          }}
        >
          {SITE.name}
        </div>
        <div style={{ display: "flex", fontSize: 36, color: "#F2C57C", fontWeight: 600 }}>
          {SITE.role}
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#9CA3AF", maxWidth: 900 }}>
          TypeScript · Next.js · Auth &amp; sessions · Real-time systems
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 24,
          color: "#6B7280",
          borderTop: "1px solid rgba(255,255,255,0.12)",
          paddingTop: "28px",
        }}
      >
        <span>{SITE.location}</span>
        <span>stefandorosh.com</span>
      </div>
    </div>,
    size
  );
}
