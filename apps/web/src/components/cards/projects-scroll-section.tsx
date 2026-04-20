"use client";

import { type ProjectData, ProjectFocusCard } from "./project-focus-card";

type ProjectsScrollSectionProps = {
  className?: string;
};

export const ProjectsScrollSection = ({ className }: ProjectsScrollSectionProps) => {
  const rudiProject: ProjectData = {
    title: "Rudi",
    slogan: "Community-first production website",
    description:
      "A content-rich website focused on clear storytelling, practical navigation, and a polished responsive experience.",
    stack: ["Next.js", "TypeScript", "Responsive UI"],
    logoSrc: "/logos/sdx24/logo-bw.svg",
    links: [{ label: "Live", href: "https://rudi.asia" }],
    achievements: ["Information Clarity", "Responsive Layout", "Production Polish"],
    expandedDescription:
      "Rudi delivers a structured, content-forward experience that balances branding and readability. The implementation focuses on section rhythm, hierarchy, and mobile-first behavior so visitors can quickly understand offerings and navigate with confidence.",
  };

  const insurFlowProject: ProjectData = {
    title: "InsurFlow",
    slogan: "A simpler way to apply for term life insurance",
    description:
      "Consumer-first D2C broker flow for Canadian term life insurance with guided intake, clear non-binding estimates, and in-app submission tracking.",
    stack: ["Next.js 16", "TypeScript", "PostgreSQL", "Better Auth", "CI/CD"],
    logoSrc: "/logos/insurflow/insurflow-logo_no_bg.png",
    links: [{ label: "Live", href: "https://insurflow.biz" }],
    achievements: [
      "5-minute Intake",
      "Clear Estimates",
      "Status Tracking",
      "Canada-first Guidance",
    ],
    expandedDescription:
      "InsurFlow is now a Canadian consumer-first D2C broker experience for term life insurance. Users move from a short eligibility intake to a clear non-binding estimate, then continue through one guided submission flow with transparent status updates. The product keeps recommendation context understandable while preserving production engineering standards across architecture, security, and CI.",
  };

  const adultProject: ProjectData = {
    title: "Adult",
    slogan: "Step-by-step life skills guide for young adults",
    description:
      "Web-based guide with region-specific paths for budgeting, taxes, renting, and career prep, designed for clarity and accessibility.",
    stack: ["Next.js", "Dynamic Routing", "Accessibility"],
    logoSrc: "/logos/adult/adult-logo-color.svg",
    links: [{ label: "Live", href: "https://design2-rust.vercel.app" }],
    achievements: ["Clarity", "Accessibility", "Practicality"],
    expandedDescription:
      "Adult is a practical web guide that helps young adults navigate core life tasks with clear regional guidance, accessible UI patterns, and focused educational flows.",
  };

  const banditBreakoutProject: ProjectData = {
    title: "Bandit Breakout",
    slogan: "Arcade mechanics with modern browser delivery",
    description:
      "A browser-based game project centered on timing, progression, and replay value, packaged with lightweight project documentation.",
    stack: ["JavaScript", "Game Logic", "Frontend Architecture"],
    logoSrc: "/logos/sdx24/logo-bw.svg",
    links: [{ label: "Repo", href: "https://github.com/SDX24/BanditBreakout" }],
    achievements: ["Gameplay Flow", "State Control", "Replayability"],
    expandedDescription:
      "Bandit Breakout explores interaction pacing and difficulty tuning through a focused arcade loop. The project prioritizes readable game-state transitions and straightforward controls so the experience remains intuitive while still rewarding skill improvement.",
  };

  const expressDocsProject: ProjectData = {
    title: "Express Documentation",
    slogan: "Developer education with structured examples",
    description:
      "A documentation site that explains Express fundamentals with concise examples, guided sections, and practical reference links.",
    stack: ["Documentation", "Information Architecture", "Frontend"],
    logoSrc: "/logos/sdx24/logo-bw.svg",
    links: [
      { label: "Live", href: "https://kamilbozz.github.io/Express-Documentation/" },
      { label: "Repo", href: "https://github.com/SDX24/Express-Documentation" },
    ],
    achievements: ["Readable Structure", "Learning Support", "Reference Utility"],
    expandedDescription:
      "Express Documentation is organized to help learners move from setup concepts to implementation patterns without friction. Content hierarchy, section labeling, and example framing are intentionally designed for quick scanning and stronger concept retention.",
  };

  const projects = [
    rudiProject,
    insurFlowProject,
    adultProject,
    banditBreakoutProject,
    expressDocsProject,
  ];

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
        {projects.map((projectCard) => (
          <ProjectFocusCard key={projectCard.title} project={projectCard} showCompactLinks />
        ))}
      </div>
    </section>
  );
};
