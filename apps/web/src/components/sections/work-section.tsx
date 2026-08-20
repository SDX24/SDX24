import Image from "next/image";

import { LuArrowRight, LuArrowUpRight } from "react-icons/lu";

import { Reveal } from "@/components/motion/reveal";
import { MINOR_PROJECTS, PRIMARY_PROJECT, type Project, SECONDARY_PROJECTS } from "@/lib/projects";

import { SectionHeading } from "./section-heading";

const Meta = ({ project }: { project: Project }) => (
  <p className="font-mono-label text-gray-500">
    {project.role} · {project.period}
  </p>
);

const Links = ({ project }: { project: Project }) => (
  <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
    {project.caseStudyHref ? (
      <a
        href={project.caseStudyHref}
        className="group inline-flex items-center gap-1.5 text-sm font-medium text-white underline-offset-4 hover:underline"
      >
        Read the case study
        <LuArrowRight
          className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </a>
    ) : null}
    {project.links.map((link) => (
      <a
        key={link.label}
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-sm text-gray-400 transition-colors hover:text-white"
      >
        {link.label}
        <LuArrowUpRight className="h-3 w-3" aria-hidden="true" />
      </a>
    ))}
  </div>
);

const Stack = ({ stack }: { stack: string[] }) => (
  <ul className="flex flex-wrap gap-1.5">
    {stack.map((tech) => (
      <li
        key={tech}
        className="rounded border border-white/[0.07] px-2 py-1 font-mono text-[11px] text-gray-500"
      >
        {tech}
      </li>
    ))}
  </ul>
);

const Narrative = ({ project }: { project: Project }) => (
  <dl className="space-y-4">
    {(
      [
        ["Problem", project.problem],
        ["Approach", project.approach],
        ["Outcome", project.outcome],
      ] as const
    ).map(([label, body]) => (
      <div key={label}>
        <dt className="font-mono-label text-gray-600">{label}</dt>
        <dd className="mt-1.5 text-pretty text-sm leading-relaxed text-gray-300">{body}</dd>
      </div>
    ))}
  </dl>
);

const Header = ({ project, large }: { project: Project; large?: boolean }) => (
  <div className="flex items-center gap-3">
    {project.logoSrc ? (
      <Image
        src={project.logoSrc}
        alt=""
        width={40}
        height={40}
        className={large ? "h-10 w-10 rounded-lg object-contain" : "h-8 w-8 rounded object-contain"}
      />
    ) : null}
    <div>
      <h3
        className={
          large
            ? "font-display text-2xl font-bold text-white"
            : "font-display text-xl font-semibold text-white"
        }
      >
        {project.title}
      </h3>
      <p className="text-sm text-gray-400">{project.tagline}</p>
    </div>
  </div>
);

export const WorkSection = () => (
  <section id="work" className="mx-auto w-full max-w-5xl scroll-mt-24 px-4 py-20">
    <Reveal>
      <SectionHeading
        eyebrow="Selected work"
        title="What I'm building"
        lead="Each project leads with the problem it solved and what shipped."
      />
    </Reveal>

    {/* RUDI: current work, and the strongest thing to show. Given its own full-width block. */}
    {PRIMARY_PROJECT ? (
      <Reveal
        as="article"
        className="mt-12 rounded-xl border border-white/10 bg-surface-raised p-7 sm:p-8"
      >
        <div className="flex flex-wrap items-start justify-between gap-4">
          <Header project={PRIMARY_PROJECT} large />
          <span className="font-mono-label rounded border border-brand-teal-light/30 px-2 py-1 text-brand-teal-light">
            Current
          </span>
        </div>
        <div className="mt-4">
          <Meta project={PRIMARY_PROJECT} />
        </div>
        <div className="mt-7 max-w-prose">
          <Narrative project={PRIMARY_PROJECT} />
        </div>
        <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.07] pt-5">
          <Stack stack={PRIMARY_PROJECT.stack} />
          <Links project={PRIMARY_PROJECT} />
        </div>
      </Reveal>
    ) : null}

    {/* Tandem and InsurFlow carry equal weight. */}
    <div className="mt-6 grid gap-6 lg:grid-cols-2">
      {SECONDARY_PROJECTS.map((project) => (
        <Reveal
          key={project.slug}
          as="article"
          className="flex flex-col gap-5 rounded-xl border border-white/10 bg-surface-raised p-6 sm:p-7"
        >
          <Header project={project} />
          <Meta project={project} />
          <Narrative project={project} />
          <div className="mt-auto space-y-4 pt-1">
            <Stack stack={project.stack} />
            <Links project={project} />
          </div>
        </Reveal>
      ))}
    </div>

    {MINOR_PROJECTS.length > 0 ? (
      <Reveal stagger className="mt-6 grid gap-4 sm:grid-cols-2">
        {MINOR_PROJECTS.map((project) => (
          <article key={project.slug} className="rounded-xl border border-white/[0.07] p-5">
            <h3 className="font-display text-base font-semibold text-white">{project.title}</h3>
            <p className="mt-1 text-sm text-gray-500">{project.tagline}</p>
            <p className="mt-3 text-pretty text-sm leading-relaxed text-gray-400">
              {project.outcome}
            </p>
            <div className="mt-4">
              <Links project={project} />
            </div>
          </article>
        ))}
      </Reveal>
    ) : null}
  </section>
);
