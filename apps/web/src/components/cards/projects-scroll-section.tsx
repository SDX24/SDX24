"use client";

import { HeroBackHoverCard } from "./hero-back-hover-card";

type ProjectData = {
  title: string;
  slogan: string;
  description: string;
  stack: string[];
  logoSrc: string;
  wordmarkSrc?: string;
  links?: Array<{ label: string; href: string }>;
  achievements?: string[];
  coverSrc?: string;
  brand?: {
    primary: string;
    primaryLight: string;
    secondary: string;
    analogous: string;
  };
  expandedDescription?: string;
};

type ProjectsScrollSectionProps = {
  project: ProjectData;
};

export const ProjectsScrollSection = ({ project }: ProjectsScrollSectionProps) => {
  const insurFlowProject: ProjectData = {
    title: "InsurFlow",
    slogan: "AI-powered advisor workflow platform",
    description:
      "Greenfield InsurTech SaaS for life insurance advisors, replacing legacy spreadsheet workflows with a scalable product experience.",
    stack: ["Next.js", "TypeScript", "CI/CD"],
    logoSrc: "/logos/insurflow/insurflow-logo_no_bg.png",
    links: [{ label: "Live", href: "https://insurflow.biz" }],
    achievements: ["Scalability", "Security", "Standards"],
    expandedDescription:
      "Built as a greenfield InsurTech platform for life insurance advisors, InsurFlow modernizes financial modeling workflows while enforcing production engineering standards across linting, formatting, commits, and CI checks.",
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
        {projects.map((projectCard) => (
          <HeroBackHoverCard
            key={projectCard.title}
            title={projectCard.title}
            slogan={projectCard.slogan}
            description={projectCard.description}
            stack={projectCard.stack}
            logoSrc={projectCard.logoSrc}
            wordmarkSrc={projectCard.wordmarkSrc}
            links={projectCard.links}
            achievements={projectCard.achievements}
            coverSrc={projectCard.coverSrc}
            brand={projectCard.brand}
            expandedDescription={projectCard.expandedDescription}
            interactive={false}
          />
        ))}
      </div>
    </section>
  );
};
