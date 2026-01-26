import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "SDX24 Portfolio",
  description: "Personal portfolio showcasing projects and achievements",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
