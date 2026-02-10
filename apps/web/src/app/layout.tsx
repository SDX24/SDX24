import type { Metadata } from "next";

import { ScrollToTopOnLoad } from "@/components";

import "./globals.css";

export const metadata: Metadata = {
  title: "Stefan Dorosh Portfolio | SDX24",
  description:
    "Full Stack Web Developer specializing in React, Next.js, and TypeScript. View my projects and experience.",
  icons: {
    icon: "/logos/sdx24/logo-main-inverse.svg",
    apple: "/logos/sdx24/logo-main-inverse.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <ScrollToTopOnLoad />
        {children}
      </body>
    </html>
  );
}
