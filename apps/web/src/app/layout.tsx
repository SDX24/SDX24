import type { Metadata } from "next";

import { ScrollToTopOnLoad } from "@/components";

import "./globals.css";

export const metadata: Metadata = {
  title: "Stefan Dorosh Portfolio | SDX24",
  description:
    "Product-minded full-stack developer focused on TypeScript/Next.js applications, secure auth/session workflows, and relational data design.",
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
