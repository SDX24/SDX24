import { IBM_Plex_Mono, IBM_Plex_Sans, Space_Grotesk } from "next/font/google";

/**
 * Type system: three roles, three faces.
 *
 * Space Grotesk stays the brand display face (contexts/branding.md). Body text moves to
 * IBM Plex Sans so long-form copy is readable at small sizes, and IBM Plex Mono carries
 * eyebrows, metrics, and technical labels. Self-hosted by next/font at build time. The
 * previous /public/fonts/*.woff2 files were HTML error pages and never decoded.
 */

export const fontDisplay = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

export const fontSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

export const fontMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

export const fontVariables = `${fontDisplay.variable} ${fontSans.variable} ${fontMono.variable}`;
