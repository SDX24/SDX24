import type { Metadata } from "next";

import { ScrollToTopOnLoad } from "@/components";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { fontVariables } from "@/lib/fonts";
import { SITE } from "@/lib/site";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} · ${SITE.role}`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "full-stack developer",
    "TypeScript",
    "Next.js",
    "React",
    "Vancouver",
    "Stefan Dorosh",
    "SDX24",
  ],
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: SITE.url,
    siteName: `${SITE.name} · ${SITE.role}`,
    title: `${SITE.name} · ${SITE.role}`,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} · ${SITE.role}`,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: {
    icon: "/logos/sdx24/logo-main-inverse.svg",
    apple: "/logos/sdx24/logo-main-inverse.svg",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE.name,
  alternateName: "SDX24",
  url: SITE.url,
  email: `mailto:${SITE.email}`,
  jobTitle: SITE.role,
  address: { "@type": "PostalAddress", addressLocality: "Vancouver", addressRegion: "BC" },
  alumniOf: {
    "@type": "EducationalOrganization",
    name: "British Columbia Institute of Technology",
  },
  sameAs: [SITE.links.github, SITE.links.gitlab, SITE.links.linkedin],
  knowsAbout: ["TypeScript", "Next.js", "React", "PostgreSQL", "Node.js", "Web Security"],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={fontVariables}>
      <body className="bg-surface text-white antialiased">
        <script
          type="application/ld+json"
          // Static, author-controlled object; no user input reaches this string.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-brand-teal-light focus:px-4 focus:py-2 focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <ScrollToTopOnLoad />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
