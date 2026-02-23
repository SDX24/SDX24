"use client";

import { ProjectCardCompact } from "../ui/project-card-compact";

type ProjectData = {
  title: string;
  slogan: string;
  description: string;
  stack: string[];
  logoSrc: string;
  wordmarkSrc?: string;
};

type ProjectsScrollSectionProps = {
  project: ProjectData;
};

export const ProjectsScrollSection = ({ project }: ProjectsScrollSectionProps) => {
  const insurFlowProject: ProjectData = {
    title: "InsurFlow",
    slogan: "AI-powered advisor workflow platform",
    description:
      "Greenfield InsurTech SaaS replacing legacy spreadsheet modeling with a scalable, product-grade web workflow.",
    stack: ["Next.js", "TypeScript", "CI/CD"],
    logoSrc: "/logos/sdx24/logo-main-inverse.svg",
  };

  const adultProject: ProjectData = {
    title: "Adult",
    slogan: "Step-by-step life skills guide for young adults",
    description:
      "Web-based guide with region-specific paths for budgeting, taxes, renting, and career prep, designed for clarity and accessibility.",
    stack: ["Next.js", "Dynamic Routing", "Accessibility"],
    logoSrc: "/logos/sdx24/logo-main-inverse.svg",
  };

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
      <div className="grid justify-items-center gap-6 md:grid-cols-2 xl:grid-cols-3">
        <ProjectCardCompact
          className="w-[380px]"
          title={project.title}
          slogan={project.slogan}
          description={project.description}
          stack={project.stack}
          logoSrc={project.logoSrc}
          wordmarkSrc={project.wordmarkSrc}
          interactive={false}
        />
        <ProjectCardCompact
          className="w-[380px]"
          title={insurFlowProject.title}
          slogan={insurFlowProject.slogan}
          description={insurFlowProject.description}
          stack={insurFlowProject.stack}
          logoSrc={insurFlowProject.logoSrc}
          interactive={false}
        />
        <ProjectCardCompact
          className="w-[380px]"
          title={adultProject.title}
          slogan={adultProject.slogan}
          description={adultProject.description}
          stack={adultProject.stack}
          logoSrc={adultProject.logoSrc}
          interactive={false}
        />
      </div>
    </section>
  );
};
