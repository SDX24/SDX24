"use client";

import { type ProjectData, ProjectFocusCard } from "./project-focus-card";

type ProjectsScrollSectionProps = {
  project: ProjectData;
};

const FEATURED_FOCUS_TITLE = "InsurFlow";

export const ProjectsScrollSection = ({ project }: ProjectsScrollSectionProps) => {
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

  const projects = [project, insurFlowProject, adultProject];

  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-24 pt-[140vh]">
      <h2
        data-projects-title
        className="mb-12 text-center text-8xl font-bold tracking-tight sm:text-[9rem]"
      >
        <span className="bg-gradient-to-b from-brand-apricot via-brand-apricot to-brand-apricot/10 bg-clip-text text-transparent">
          Projects
        </span>
      </h2>
      <div className="grid justify-items-center gap-14 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((projectCard) => {
          const isFeaturedFocus = projectCard.title === FEATURED_FOCUS_TITLE;

          return (
            <ProjectFocusCard
              key={projectCard.title}
              project={projectCard}
              featured={isFeaturedFocus}
              enableFullscreen={isFeaturedFocus}
              showCompactLinks
            />
          );
        })}
      </div>
    </section>
  );
};
