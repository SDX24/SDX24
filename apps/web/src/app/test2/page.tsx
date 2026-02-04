"use client";

import { useEffect, useRef, useState } from "react";

import { ProjectCardCompact, ProjectCardExpanded } from "@/components";

const tandem = {
  title: "Tandem",
  slogan: "Bridging work and childcare",
  description:
    "Tandem helps parents in the trades balance work and childcare with AI scheduling, trusted care, and shared support.",
  status: "Live",
  links: [
    { label: "Try App", href: "https://tandem-blog.vercel.app" },
    { label: "Repo", href: "https://github.com/IDSP-TRADECARE/Tandem" },
  ],
  stack: ["AI Scheduling", "Nanny Booking", "Care Sharing"],
  achievements: ["Trust", "Balance", "Support"],
  logoSrc: "/logos/tandem/logo.svg",
  wordmarkSrc: "/logos/tandem/wordmark.svg",
  coverSrc: "/logos/tandem/cover.png",
  brand: {
    primary: "#3373CC",
    primaryLight: "#91B3E3",
    secondary: "#92F189",
    analogous: "#68D5FF",
  },
};

export default function Test2Page() {
  const [isOpen, setIsOpen] = useState(false);
  const closeTimerRef = useRef<number | null>(null);

  const clearCloseTimer = () => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const openExpanded = () => {
    clearCloseTimer();
    setIsOpen(true);
  };

  const scheduleClose = () => {
    clearCloseTimer();
    closeTimerRef.current = window.setTimeout(() => {
      setIsOpen(false);
    }, 80);
  };

  useEffect(() => () => clearCloseTimer(), []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-black px-4 py-16 text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <div className="space-y-3 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-brand-apricot">
            Project Card Lab
          </p>
          <h1 className="text-3xl font-bold sm:text-4xl">Tandem project card variants.</h1>
          <p className="text-sm text-gray-300 sm:text-base">
            Compact card expands to a larger hover preview with photo, links, and brand styling.
          </p>
        </div>

        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.3em] text-brand-clay">Scale 2x</p>
          <div className="inline-block">
            <div className="relative">
              <div
                className={
                  isOpen
                    ? "pointer-events-none opacity-0 transition-opacity duration-200"
                    : "pointer-events-auto opacity-100 transition-opacity duration-200"
                }
                onPointerEnter={openExpanded}
                onPointerLeave={scheduleClose}
              >
                <ProjectCardCompact
                  className="max-w-[360px]"
                  title={tandem.title}
                  slogan={tandem.slogan}
                  description={tandem.description}
                  stack={tandem.stack}
                  logoSrc={tandem.logoSrc}
                  wordmarkSrc={tandem.wordmarkSrc}
                />
              </div>
              <div
                className={
                  isOpen
                    ? "pointer-events-auto absolute left-0 top-0 z-20 w-[720px] origin-top-left scale-100 opacity-100 transition duration-300"
                    : "pointer-events-none absolute left-0 top-0 z-20 w-[720px] origin-top-left scale-[0.5] opacity-0 transition duration-300"
                }
                onPointerEnter={isOpen ? openExpanded : undefined}
                onPointerLeave={isOpen ? scheduleClose : undefined}
              >
                <ProjectCardExpanded
                  className="max-w-none"
                  title={tandem.title}
                  slogan={tandem.slogan}
                  description={
                    "Tandem is built for trade parents who need dependable childcare and smart scheduling. It blends AI planning, trusted care networks, and community sharing to reduce stress and keep families supported."
                  }
                  status={tandem.status}
                  links={tandem.links}
                  stack={["AI Scheduling", "Care Network", "Realtime", "Trusted Reviews"]}
                  achievements={tandem.achievements}
                  logoSrc={tandem.logoSrc}
                  wordmarkSrc={tandem.wordmarkSrc}
                  coverSrc={tandem.coverSrc}
                  brand={tandem.brand}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
