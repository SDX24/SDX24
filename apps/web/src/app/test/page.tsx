import Link from "next/link";

import { HeroCatchScene } from "@/components/cards/hero-catch-scene";

export default function TestPage() {
  const tandemUrl = process.env.NEXT_PUBLIC_TANDEM_URL || "";
  const iframeUrl = tandemUrl;
  const project = {
    title: "Tandem",
    slogan: "Bridging work and childcare",
    description:
      "Tandem helps parents in the trades balance work and childcare with AI scheduling, trusted care, and shared support.",
    stack: ["AI Scheduling", "Nanny Booking", "Care Sharing"],
    logoSrc: "/logos/tandem/tandem-logo.svg",
    wordmarkSrc: "/logos/tandem/wordmark.svg",
    links: [
      { label: "Blog", href: "https://tandem-blog.vercel.app" },
      { label: "Repo", href: "https://github.com/IDSP-TRADECARE/Tandem" },
    ],
    achievements: ["Trust", "Balance", "Support"],
    coverSrc: "/logos/tandem/cover.png",
    brand: {
      primary: "#3373CC",
      primaryLight: "#91B3E3",
      secondary: "#92F189",
      analogous: "#68D5FF",
    },
    expandedDescription:
      "Tandem is built for trade parents who need dependable childcare and smart scheduling. It blends AI planning, trusted care networks, and community sharing to reduce stress and keep families supported.",
  };

  return (
    <main className="min-h-screen bg-gray-900 p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-center text-4xl font-bold text-white">Tandem Hand Objects Test</h1>
        <p className="mb-8 text-center text-gray-400">
          Experimental catch-scene bundle copied from hero work
        </p>

        <div className="relative min-h-[1600px]">
          <HeroCatchScene
            className="absolute left-0 top-[120px]"
            iframeUrl={iframeUrl}
            project={project}
          />
        </div>

        {/* Navigation */}
        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-block rounded-lg bg-brand-teal-light px-6 py-3 font-bold text-white transition-colors hover:bg-brand-teal"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
