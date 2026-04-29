"use client";

import { useState } from "react";

import { type ProjectData, ProjectFocusCard } from "./project-focus-card";

type ProjectsScrollSectionProps = {
  className?: string;
};

type ProjectWithRationale = ProjectData & {
  rationalePanelClassName: string;
};

type GridItem =
  | { type: "project"; project: ProjectWithRationale }
  | { type: "rationale"; project: ProjectWithRationale };

export const ProjectsScrollSection = ({ className }: ProjectsScrollSectionProps) => {
  const [openRationaleTitles, setOpenRationaleTitles] = useState<string[]>([]);

  const rudiProject: ProjectWithRationale = {
    title: "Rudi",
    slogan: "AI-native real estate operating system for long-term rentals",
    description:
      "An AI-first verified-villa platform that automates listing creation, behavioral matching, and transaction workflows for renters, owners, and agents.",
    stack: [
      "AI Video Processing",
      "AI Listing Generator",
      "SenseMap",
      "Best Offer Engine",
      "Safe Payment",
      "Voice Search",
    ],
    logoSrc: "/logos/rudi/favicon.png",
    compactLogoContainerClassName:
      "h-16 w-16 rounded-full border border-white/25 bg-white/10 p-1.5 shadow-[0_0_16px_rgba(59,130,246,0.2)]",
    compactLogoImageClassName: "rounded-full object-contain p-1.5 scale-75",
    rationaleBadgeClassName:
      "border-blue-300/65 bg-[linear-gradient(130deg,rgba(51,115,204,0.9),rgba(104,213,255,0.68))]",
    rationalePanelClassName:
      "border-blue-200/35 bg-[radial-gradient(circle_at_16%_14%,rgba(104,213,255,0.22),transparent_42%),linear-gradient(155deg,rgba(12,24,45,0.92),rgba(8,16,30,0.94))]",
    links: [{ label: "Live", href: "https://rudi.asia" }],
    achievements: [
      "Up to 70% Process Automation",
      "Faster Listing Operations",
      "Lifestyle-Based Discovery",
      "2,000+ Verified Villas",
      "AI-Assisted Listing Workflows",
    ],
    expandedDescription:
      "RUDI is an AI-powered and AI-native real estate system built for long-term living workflows. The platform combines multilingual video-to-listing pipelines, automated listing generation, lifestyle-first mapping through SenseMap, recommendation logic via the Best Offer Engine, and secure transaction messaging through Safe Payment. It keeps the original goal of making real estate interactions simpler and faster while adding stronger verified-inventory and AI-assisted operations at scale.",
  };

  const insurFlowProject: ProjectWithRationale = {
    title: "InsurFlow",
    slogan: "A simpler way to apply for term life insurance",
    description:
      "A consumer-first D2C broker flow for Canadian term life insurance, rebuilt as a greenfield SaaS to replace spreadsheet-heavy advisor workflows.",
    stack: ["Next.js 16", "TypeScript", "PostgreSQL", "Better Auth", "Drizzle ORM", "CI/CD"],
    logoSrc: "/logos/insurflow/insurflow-logo_no_bg.png",
    compactLogoContainerClassName: "h-20 w-20",
    compactLogoPixelSize: 112,
    rationaleBadgeClassName:
      "border-cyan-300/65 bg-[linear-gradient(130deg,rgba(34,211,238,0.84),rgba(30,64,175,0.72))]",
    rationalePanelClassName:
      "border-cyan-200/30 bg-[radial-gradient(circle_at_10%_8%,rgba(34,211,238,0.2),transparent_40%),linear-gradient(150deg,rgba(8,20,38,0.93),rgba(7,13,26,0.94))]",
    links: [
      { label: "Live", href: "https://insurflow.biz" },
      { label: "Repo", href: "https://github.com/Vero-Ventures/insurflow" },
    ],
    achievements: [
      "5-minute Intake",
      "Clear Estimates",
      "Status Tracking",
      "Advisor Workflow Speedups",
      "Modern Multi-Tenant Foundation",
      "CI/CD Guardrails",
    ],
    expandedDescription:
      "InsurFlow is a Canadian consumer-first D2C broker experience and a greenfield InsurTech rebuild delivered with a modern TypeScript stack. Users move from short eligibility intake to clear non-binding estimates, then continue through guided submission with transparent status updates. On the engineering side, the platform includes advisor-facing calculations, dashboard workflows, AI-assisted product flows, and strong CI/CD guardrails for scalable and secure delivery.",
  };

  const adultProject: ProjectWithRationale = {
    title: "Adult",
    slogan: "Step-by-step life skills guide for young adults",
    description:
      "Web-based guide with region-specific paths for budgeting, taxes, renting, and career prep, designed for clarity and accessibility.",
    stack: ["Next.js", "Dynamic Routing", "Accessibility"],
    logoSrc: "/logos/adult/adult-logo-color.svg",
    rationaleBadgeClassName:
      "border-rose-300/65 bg-[linear-gradient(130deg,rgba(239,111,108,0.85),rgba(221,174,126,0.74))]",
    rationalePanelClassName:
      "border-rose-200/30 bg-[radial-gradient(circle_at_14%_12%,rgba(239,111,108,0.2),transparent_42%),linear-gradient(150deg,rgba(38,16,16,0.92),rgba(27,12,12,0.94))]",
    links: [{ label: "Live", href: "https://design2-rust.vercel.app" }],
    achievements: ["Clarity", "Accessibility", "Practicality"],
    expandedDescription:
      "Adult is a practical web guide that helps young adults navigate core life tasks with clear regional guidance, accessible UI patterns, and focused educational flows.",
  };

  const banditBreakoutProject: ProjectWithRationale = {
    title: "Bandit Breakout",
    slogan: "Arcade mechanics with modern browser delivery",
    description:
      "A browser-based arcade project centered on timing, progression, and replay value, with documented mechanics and implementation notes.",
    stack: ["JavaScript", "Game Logic", "Frontend Architecture"],
    logoSrc: "/logos/bandit/bandit-logo-circle.svg",
    rationaleBadgeClassName:
      "border-amber-300/65 bg-[linear-gradient(130deg,rgba(242,197,124,0.85),rgba(239,111,108,0.72))]",
    rationalePanelClassName:
      "border-amber-200/30 bg-[radial-gradient(circle_at_14%_12%,rgba(242,197,124,0.22),transparent_42%),linear-gradient(150deg,rgba(38,24,9,0.92),rgba(28,17,7,0.95))]",
    links: [
      { label: "Live", href: "http://commandz.gochatus.org:30006" },
      { label: "Repo", href: "https://github.com/SDX24/BanditBreakout" },
    ],
    achievements: ["Gameplay Flow", "State Control", "Replayability"],
    expandedDescription:
      "Bandit Breakout explores interaction pacing and difficulty tuning through a focused arcade loop. The project prioritizes readable game-state transitions and straightforward controls so the experience remains intuitive while still rewarding skill improvement. The implementation is documented, and deployment scope remains constrained by database storage limits in the original hosting setup.",
  };

  const expressDocsProject: ProjectWithRationale = {
    title: "Express Docs",
    slogan: "Developer education with structured examples",
    description:
      "A documentation site that explains Express fundamentals with concise examples, guided sections, and practical reference links.",
    stack: ["Documentation", "Information Architecture", "Frontend"],
    showLogo: false,
    rationaleBadgeClassName:
      "border-emerald-300/65 bg-[linear-gradient(130deg,rgba(16,185,129,0.84),rgba(66,106,90,0.72))]",
    rationalePanelClassName:
      "border-emerald-200/30 bg-[radial-gradient(circle_at_14%_12%,rgba(16,185,129,0.2),transparent_42%),linear-gradient(150deg,rgba(8,29,24,0.92),rgba(8,18,15,0.95))]",
    links: [
      { label: "Live", href: "https://kamilbozz.github.io/Express-Documentation/" },
      { label: "Repo", href: "https://github.com/SDX24/Express-Documentation" },
    ],
    achievements: ["Readable Structure", "Learning Support", "Reference Utility"],
    expandedDescription:
      "Express Documentation is organized to help learners move from setup concepts to implementation patterns without friction. Content hierarchy, section labeling, and example framing are intentionally designed for quick scanning and stronger concept retention.",
  };

  const projects: ProjectWithRationale[] = [
    rudiProject,
    insurFlowProject,
    adultProject,
    banditBreakoutProject,
    expressDocsProject,
  ];

  const gridItems: GridItem[] = projects.flatMap((project) => {
    if (!openRationaleTitles.includes(project.title)) {
      return [{ type: "project", project }];
    }

    return [
      { type: "project", project },
      { type: "rationale", project },
    ];
  });

  return (
    <section className={`mx-auto w-full max-w-6xl px-4 pb-24 pt-[140vh] ${className ?? ""}`}>
      <h2
        data-projects-title
        className="mb-12 text-center text-8xl font-bold tracking-tight sm:text-[9rem]"
      >
        <span className="bg-gradient-to-b from-brand-apricot via-brand-apricot to-brand-apricot/10 bg-clip-text text-transparent">
          Projects
        </span>
      </h2>
      <div className="grid justify-items-center gap-14 md:grid-cols-2 xl:grid-cols-3">
        {gridItems.map((item, index) => {
          if (item.type === "rationale") {
            return (
              <article
                key={`rationale-${item.project.title}`}
                className={`h-full w-full max-w-[360px] rounded-[1.65rem] border p-5 shadow-[0_16px_36px_rgba(0,0,0,0.35)] backdrop-blur ${item.project.rationalePanelClassName}`}
              >
                <span className="inline-flex rounded-full border border-white/30 bg-black/35 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-brand-apricot">
                  Rationale
                </span>
                <h3 className="mt-4 text-2xl font-bold text-white">{item.project.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-200">
                  {item.project.expandedDescription}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setOpenRationaleTitles((current) =>
                      current.filter((title) => title !== item.project.title)
                    );
                  }}
                  className="mt-5 rounded-full border border-white/20 bg-black/35 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-gray-100 transition hover:border-brand-apricot/60 hover:text-brand-apricot"
                >
                  Close Rationale
                </button>
              </article>
            );
          }

          const isRationaleOpen = openRationaleTitles.includes(item.project.title);

          return (
            <ProjectFocusCard
              key={`${item.project.title}-${index}`}
              project={item.project}
              showCompactLinks
              showRationaleToggle
              isRationaleOpen={isRationaleOpen}
              onRationaleToggle={() => {
                setOpenRationaleTitles((current) =>
                  current.includes(item.project.title)
                    ? current.filter((title) => title !== item.project.title)
                    : [...current, item.project.title]
                );
              }}
            />
          );
        })}
      </div>
    </section>
  );
};
