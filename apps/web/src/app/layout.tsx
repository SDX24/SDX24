import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Stefan Dorosh Portfolio | SDX24",
  description:
    "Full Stack Web Developer specializing in React, Next.js, and TypeScript. View my projects and experience.",
  icons: {
    icon: "/logo.svg",
    apple: "/logo.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
