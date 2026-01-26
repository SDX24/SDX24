import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "SDX24 Portfolio",
  description: "Personal portfolio showcasing projects and achievements",
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
