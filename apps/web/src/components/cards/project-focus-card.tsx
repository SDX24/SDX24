"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import Image from "next/image";

import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { createPortal } from "react-dom";
import {
  LuArrowLeft,
  LuExternalLink,
  LuLayoutTemplate,
  LuScrollText,
  LuSmartphone,
} from "react-icons/lu";

import { HeroBackHoverCard } from "./hero-back-hover-card";

type CaseStudyCitation = {
  label: string;
  href: string;
  placeholder?: boolean;
};

type CaseStudyAsset = {
  title: string;
  caption: string;
  src?: string;
  href?: string;
  placeholder?: boolean;
};

type CaseStudySection = {
  title: string;
  paragraphs: string[];
  highlights?: string[];
  assets?: CaseStudyAsset[];
  citations?: CaseStudyCitation[];
};

type CaseStudyTeamCredit = {
  name: string;
  role?: string;
  linkedin?: string;
  placeholder?: boolean;
};

type CaseStudyPreview = {
  title: string;
  summary: string;
  iframeUrl: string;
  liveUrl: string;
  sandboxHref?: string;
};

export type ProjectData = {
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
  caseStudyHeading?: string;
  caseStudySummary?: string;
  caseStudyRole?: string;
  caseStudyDraft?: string[];
  caseStudyTimeline?: string;
  caseStudyTeam?: string;
  caseStudyStack?: string[];
  caseStudySections?: CaseStudySection[];
  caseStudyOutcomes?: string[];
  caseStudyTeamCredits?: CaseStudyTeamCredit[];
  caseStudyReferences?: CaseStudyCitation[];
  caseStudyPreview?: CaseStudyPreview;
};

type ProjectFocusCardProps = {
  project: ProjectData;
  featured?: boolean;
  enableFullscreen?: boolean;
  openDelayMs?: number;
  showCompactLinks?: boolean;
  enableSharedLayoutMorph?: boolean;
  interactionArmDelayMs?: number;
  renderFullscreenInPortal?: boolean;
  openViewLabel?: "fullscreen" | "case-study";
};

type FocusPhase = "idle" | "priming" | "open";

const CARD_MORPH_TRANSITION = {
  type: "spring",
  stiffness: 170,
  damping: 26,
  mass: 0.9,
} as const;

const PRIMING_BLOB_RADIUS = "42% 58% 57% 43% / 36% 39% 61% 64%";
const GLASS_BACKGROUND = "rgba(2, 6, 23, 0.34)";
const INSURFLOW_FOCUS_ID = "insurflow";
const TANDEM_FOCUS_ID = "tandem";
const TANDEM_GLASS_BACKGROUND = "rgba(7, 20, 36, 0.24)";
const CASE_STUDY_LINK_CLASS =
  "text-sm font-semibold text-blue-300 underline decoration-blue-300/70 underline-offset-4 transition hover:text-blue-200";

const toCardId = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const toSectionId = (title: string) => `case-study-${toCardId(title)}`;

const getCaseStudySectionIcon = (title: string) => {
  const normalized = title.toLowerCase();
  if (normalized.includes("context") || normalized.includes("problem")) {
    return LuScrollText;
  }
  if (normalized.includes("challenge")) {
    return LuLayoutTemplate;
  }
  if (normalized.includes("solution") || normalized.includes("implementation")) {
    return LuSmartphone;
  }
  return LuScrollText;
};

const FullscreenHeader = ({
  cardId,
  title,
  logoSrc,
  wordmarkSrc,
  onBack,
  viewLabel,
}: {
  cardId: string;
  title: string;
  logoSrc: string;
  wordmarkSrc?: string;
  onBack: () => void;
  viewLabel: "fullscreen" | "case-study";
}) => (
  <div className="sticky top-0 z-30 mb-6 border-b border-white/10 bg-black/75 px-6 py-3 backdrop-blur-xl sm:px-10">
    <div className="mx-auto grid w-full max-w-6xl grid-cols-[40px_1fr_40px] items-center gap-3">
      <button
        type="button"
        data-focus-back={cardId}
        data-case-study-back={viewLabel === "case-study" ? cardId : undefined}
        aria-label={`Back from ${title} ${viewLabel}`}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-black/70 text-white transition hover:border-brand-apricot hover:text-brand-apricot"
        onClick={onBack}
      >
        <LuArrowLeft className="h-5 w-5" aria-hidden="true" />
      </button>

      <div className="pointer-events-none flex -translate-x-14 items-center justify-center gap-3 sm:-translate-x-[4.25rem]">
        <div className="relative h-8 w-8 overflow-hidden rounded-lg border border-white/20 bg-black/40">
          <Image
            src={logoSrc}
            alt={`${title} logo`}
            fill
            className="object-contain p-1"
            sizes="32px"
          />
        </div>
        {wordmarkSrc ? (
          <div className="relative h-5 w-28">
            <Image
              src={wordmarkSrc}
              alt={`${title} wordmark`}
              fill
              className="object-contain"
              sizes="112px"
            />
          </div>
        ) : (
          <span className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-apricot">
            {title}
          </span>
        )}
      </div>

      <div aria-hidden="true" className="h-10 w-10" />
    </div>
  </div>
);

const CaseStudyLongForm = ({
  project,
  cardId,
  fullscreenSlogan,
  fullscreenDescription,
  isInsurFlow,
}: {
  project: ProjectData;
  cardId: string;
  fullscreenSlogan: string;
  fullscreenDescription: string;
  isInsurFlow: boolean;
}) => {
  const hasStructuredCaseStudy = Boolean(project.caseStudySections?.length);
  const caseStudyHeading = project.caseStudyHeading ?? `${project.title} Case Study`;
  const caseStudySummary = project.caseStudySummary ?? fullscreenDescription;
  const caseStudyStack = project.caseStudyStack ?? project.stack;
  const hasCaseStudyLinks = Boolean(project.links?.length);
  const caseStudyPreview = project.caseStudyPreview;
  const [activeSection, setActiveSection] = useState(
    project.caseStudySections?.[0]?.title ?? "Case Study"
  );
  const isTandemCaseStudy = cardId === TANDEM_FOCUS_ID;

  useEffect(() => {
    if (!project.caseStudySections?.length) return;

    const observers: IntersectionObserver[] = [];
    project.caseStudySections.forEach((section) => {
      const element = document.getElementById(toSectionId(section.title));
      if (!element) return;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(section.title);
            }
          });
        },
        {
          root: null,
          threshold: 0.35,
          rootMargin: "-80px 0px -40% 0px",
        }
      );
      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [project.caseStudySections]);

  return (
    <div className="px-6 pb-6 sm:px-10 sm:pb-10">
      {hasStructuredCaseStudy ? (
        <div className="sticky top-20 z-20 mb-6 flex items-center justify-center sm:justify-start">
          <div className="inline-flex flex-wrap items-center gap-2 rounded-full border border-white/20 bg-black/45 px-3 py-2 text-xs font-semibold text-gray-200 backdrop-blur">
            <span className="uppercase tracking-[0.18em] text-brand-clay">Narrative Map</span>
            {project.caseStudySections?.map((section) => {
              const isActive = activeSection === section.title;
              return (
                <a
                  key={section.title}
                  href={`#${toSectionId(section.title)}`}
                  className={`rounded-full px-3 py-1 transition ${
                    isActive
                      ? "bg-brand-apricot/25 text-brand-apricot"
                      : "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {section.title}
                </a>
              );
            })}
          </div>
        </div>
      ) : null}

      <div className="mt-8 max-w-4xl space-y-4">
        <div className="relative h-16 w-16 overflow-hidden rounded-2xl border border-white/20 bg-black/30">
          <Image
            src={project.logoSrc}
            alt={`${project.title} logo`}
            fill
            className="object-contain p-2"
            sizes="64px"
          />
        </div>

        {hasStructuredCaseStudy ? (
          <>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-brand-apricot">
              Case Study
            </p>
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              {caseStudyHeading}
            </h2>
            <p className="text-base leading-relaxed text-gray-200 sm:text-lg">{caseStudySummary}</p>

            <div className="grid max-w-3xl gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-black/25 px-4 py-3">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-clay">
                  Role
                </p>
                <p className="mt-1 text-sm font-medium text-gray-100 sm:text-base">
                  {project.caseStudyRole ?? "Role pending"}
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/25 px-4 py-3">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-clay">
                  Timeline
                </p>
                <p className="mt-1 text-sm font-medium text-gray-100 sm:text-base">
                  {project.caseStudyTimeline ?? "Timeline placeholder"}
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/25 px-4 py-3">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-clay">
                  Team
                </p>
                <p className="mt-1 text-sm font-medium text-gray-100 sm:text-base">
                  {project.caseStudyTeam ?? "Team placeholder"}
                </p>
              </div>
            </div>

            {hasCaseStudyLinks ? (
              <div className="space-y-2">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-clay">
                  Project Links
                </p>
                <div className="flex flex-wrap gap-3">
                  {project.links?.map((link) => (
                    <a
                      key={`${link.label}-${link.href}`}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center rounded-full border border-white/20 bg-black/25 px-4 py-2 text-sm font-semibold text-gray-100 transition hover:border-brand-apricot hover:text-brand-apricot"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            ) : null}

            {caseStudyStack.length ? (
              <div className="space-y-2">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-clay">
                  Stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {caseStudyStack.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/15 bg-black/30 px-3 py-1 text-xs font-medium text-gray-200"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}

            {caseStudyPreview ? (
              <section className="space-y-4 rounded-3xl border border-brand-apricot/30 bg-black/20 p-5 sm:p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-clay">
                      Live Interactive Preview
                    </p>
                    <h3 className="mt-1 text-xl font-semibold text-white">
                      {caseStudyPreview.title}
                    </h3>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <a
                      href={caseStudyPreview.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-black/30 px-3 py-1.5 text-sm font-semibold text-gray-100 transition hover:border-brand-apricot hover:text-brand-apricot"
                    >
                      Open Live <LuExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                    {caseStudyPreview.sandboxHref ? (
                      <a
                        href={caseStudyPreview.sandboxHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-black/30 px-3 py-1.5 text-sm font-semibold text-gray-100 transition hover:border-brand-apricot hover:text-brand-apricot"
                      >
                        Open Sandbox <LuExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                      </a>
                    ) : null}
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-gray-200">{caseStudyPreview.summary}</p>
                <div className="overflow-hidden rounded-[1.4rem] border border-white/15 bg-black/35">
                  <div className="grid grid-cols-[auto_1fr_auto] items-center gap-2 border-b border-white/10 bg-black/35 px-3 py-2 text-xs text-gray-300">
                    <span className="h-2.5 w-2.5 rounded-full bg-brand-coral" />
                    <span className="truncate">{caseStudyPreview.iframeUrl}</span>
                    <span className="text-brand-clay">Embedded</span>
                  </div>
                  <iframe
                    src={caseStudyPreview.iframeUrl}
                    title="Tandem interactive preview"
                    className="h-[460px] w-full bg-white"
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                  />
                </div>
              </section>
            ) : null}
          </>
        ) : (
          <>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-brand-apricot">
              {fullscreenSlogan}
            </p>
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              {project.title}
            </h2>
            <p className="text-base leading-relaxed text-gray-200 sm:text-lg">
              {fullscreenDescription}
            </p>
          </>
        )}
      </div>

      {hasStructuredCaseStudy ? (
        <div
          className={`mt-10 max-w-5xl space-y-8 ${
            isTandemCaseStudy
              ? "rounded-[2rem] border border-brand-apricot/10 bg-[radial-gradient(circle_at_20%_20%,rgba(51,115,204,0.2),transparent_48%),radial-gradient(circle_at_75%_10%,rgba(104,213,255,0.15),transparent_45%),radial-gradient(circle_at_50%_90%,rgba(146,241,137,0.14),transparent_45%)] p-3 sm:p-4"
              : ""
          }`}
        >
          {project.caseStudySections?.map((section) => (
            <section
              key={section.title}
              id={toSectionId(section.title)}
              className="space-y-4 rounded-3xl border border-white/10 bg-black/25 p-6 sm:p-8"
            >
              <div className="flex items-center gap-3">
                {(() => {
                  const SectionIcon = getCaseStudySectionIcon(section.title);
                  return (
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-brand-apricot">
                      <SectionIcon className="h-4.5 w-4.5" aria-hidden="true" />
                    </span>
                  );
                })()}
                <h3 className="text-2xl font-semibold text-white sm:text-3xl">{section.title}</h3>
              </div>

              {section.paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 72)}
                  className="text-sm leading-relaxed text-gray-200 sm:text-base"
                >
                  {paragraph}
                </p>
              ))}

              {section.highlights?.length ? (
                <ul className="space-y-2">
                  {section.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-gray-200 sm:text-base"
                    >
                      {highlight}
                    </li>
                  ))}
                </ul>
              ) : null}

              {section.assets?.length ? (
                <div className="grid gap-4 md:grid-cols-2">
                  {section.assets.map((asset) => (
                    <article
                      key={`${asset.title}-${asset.caption}`}
                      className="space-y-3 rounded-2xl border border-white/10 bg-black/20 p-4"
                    >
                      <div className="flex min-h-[180px] items-center justify-center rounded-xl border border-dashed border-white/20 bg-gradient-to-b from-white/10 to-white/0 p-4 text-center">
                        <p className="text-sm font-medium text-gray-300">
                          {asset.placeholder ? "Placeholder visual" : "Visual preview"}
                          <span className="mt-1 block text-xs text-gray-400">{asset.title}</span>
                        </p>
                      </div>
                      <p className="text-sm font-semibold text-white">{asset.title}</p>
                      <p className="text-sm leading-relaxed text-gray-300">{asset.caption}</p>
                      {asset.href ? (
                        <a
                          href={asset.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={CASE_STUDY_LINK_CLASS}
                        >
                          {asset.placeholder ? "Open placeholder resource" : "Open resource"}
                        </a>
                      ) : null}
                    </article>
                  ))}
                </div>
              ) : null}

              {section.citations?.length ? (
                <div className="space-y-2">
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-clay">
                    Citations
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {section.citations.map((citation) => (
                      <a
                        key={`${citation.label}-${citation.href}`}
                        href={citation.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={CASE_STUDY_LINK_CLASS}
                      >
                        {citation.label}
                        {citation.placeholder ? " (placeholder)" : ""}
                      </a>
                    ))}
                  </div>
                </div>
              ) : null}
            </section>
          ))}

          {project.caseStudyOutcomes?.length ? (
            <section className="space-y-4 rounded-3xl border border-white/10 bg-black/25 p-6 sm:p-8">
              <h3 className="text-2xl font-semibold text-white sm:text-3xl">Outcomes</h3>
              <ul className="space-y-2">
                {project.caseStudyOutcomes.map((outcome) => (
                  <li
                    key={outcome}
                    className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-gray-200 sm:text-base"
                  >
                    {outcome}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {project.caseStudyTeamCredits?.length ? (
            <section className="space-y-4 rounded-3xl border border-white/10 bg-black/25 p-6 sm:p-8">
              <h3 className="text-2xl font-semibold text-white sm:text-3xl">Team Credits</h3>
              <ul className="space-y-3">
                {project.caseStudyTeamCredits.map((credit) => (
                  <li
                    key={`${credit.name}-${credit.linkedin ?? "no-link"}`}
                    className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-gray-200 sm:text-base"
                  >
                    <span className="font-semibold text-white">{credit.name}</span>
                    {credit.role ? <span className="text-gray-300"> - {credit.role}</span> : null}
                    {credit.linkedin ? (
                      <a
                        href={credit.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`ml-2 ${CASE_STUDY_LINK_CLASS}`}
                      >
                        LinkedIn
                        {credit.placeholder ? " (placeholder)" : ""}
                      </a>
                    ) : null}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {project.caseStudyReferences?.length ? (
            <section className="space-y-4 rounded-3xl border border-white/10 bg-black/25 p-6 sm:p-8">
              <h3 className="text-2xl font-semibold text-white sm:text-3xl">References</h3>
              <ol className="list-decimal space-y-2 pl-5">
                {project.caseStudyReferences.map((reference) => (
                  <li
                    key={`${reference.label}-${reference.href}`}
                    className="text-sm text-gray-200 sm:text-base"
                  >
                    <a
                      href={reference.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={CASE_STUDY_LINK_CLASS}
                    >
                      {reference.label}
                      {reference.placeholder ? " (placeholder)" : ""}
                    </a>
                  </li>
                ))}
              </ol>
            </section>
          ) : null}
        </div>
      ) : project.caseStudyDraft?.length ? (
        <div className="mt-10 max-w-4xl space-y-6 rounded-3xl border border-white/10 bg-black/25 p-6 sm:p-8">
          <h3 className="text-2xl font-semibold text-white">
            {project.caseStudyHeading ?? "Case Study Draft"}
          </h3>
          {project.caseStudyRole ? (
            <p className="text-sm font-medium leading-relaxed text-brand-clay sm:text-base">
              {project.caseStudyRole}
            </p>
          ) : null}
          {project.caseStudyDraft.map((paragraph) => (
            <p
              key={paragraph.slice(0, 72)}
              className="text-sm leading-relaxed text-gray-200 sm:text-base"
            >
              {paragraph}
            </p>
          ))}
        </div>
      ) : isInsurFlow ? (
        <div className="mt-10 grid max-w-5xl gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <section className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-[0.22em] text-brand-clay">
              Technical Architecture
            </h3>
            <ol className="space-y-3 text-sm text-gray-200 sm:text-base">
              <li className="rounded-2xl border border-white/10 bg-black/25 px-4 py-3">
                <strong className="text-brand-apricot">Next.js 16 + React 19:</strong> App Router
                architecture with client/server boundaries optimized for a fast guided flow.
              </li>
              <li className="rounded-2xl border border-white/10 bg-black/25 px-4 py-3">
                <strong className="text-brand-apricot">TypeScript strict mode:</strong> End-to-end
                typed domain models with safer refactors and clearer API contracts.
              </li>
              <li className="rounded-2xl border border-white/10 bg-black/25 px-4 py-3">
                <strong className="text-brand-apricot">PostgreSQL + Drizzle:</strong> Structured
                application state and event persistence with migration-first workflow hygiene.
              </li>
            </ol>
          </section>

          <section className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-[0.22em] text-brand-clay">
              Engineering Highlights
            </h3>
            <ul className="space-y-3 text-sm text-gray-200 sm:text-base">
              <li className="rounded-2xl border border-white/10 bg-black/25 px-4 py-3">
                Better Auth integration with guarded route handlers and secure identity boundaries.
              </li>
              <li className="rounded-2xl border border-white/10 bg-black/25 px-4 py-3">
                CI + lint + strict typing + Playwright coverage to keep production quality stable.
              </li>
              <li className="rounded-2xl border border-white/10 bg-black/25 px-4 py-3">
                Modular feature surfaces built for fast iteration without weakening code standards.
              </li>
            </ul>
          </section>
        </div>
      ) : null}

      {hasStructuredCaseStudy ? (
        <p className="mt-8 text-xs text-gray-400" data-case-study-id={cardId}>
          Some visual assets and citations are placeholders and will be replaced during final
          content packaging.
        </p>
      ) : null}
    </div>
  );
};

export const ProjectFocusCard = ({
  project,
  featured = false,
  enableFullscreen = false,
  openDelayMs = 1800,
  showCompactLinks = false,
  enableSharedLayoutMorph = true,
  interactionArmDelayMs = 0,
  renderFullscreenInPortal = false,
  openViewLabel = "fullscreen",
}: ProjectFocusCardProps) => {
  const prefersReducedMotion = useReducedMotion();
  const cardId = useMemo(() => toCardId(project.title), [project.title]);
  const layoutId = useMemo(() => `project-focus-shell-${cardId}`, [cardId]);
  const sharedLayoutId = enableSharedLayoutMorph ? layoutId : undefined;
  const isInsurFlow = cardId === INSURFLOW_FOCUS_ID;
  const interactionEnabled = featured && enableFullscreen;
  const [phase, setPhase] = useState<FocusPhase>("idle");
  const [canHover, setCanHover] = useState(true);
  const [isInteractionArmed, setIsInteractionArmed] = useState(interactionArmDelayMs === 0);
  const [canInstantArmOnEnter, setCanInstantArmOnEnter] = useState(true);
  const [hasMounted, setHasMounted] = useState(false);
  const primingTimeoutRef = useRef<number | null>(null);
  const armTimeoutRef = useRef<number | null>(null);
  const hitboxRef = useRef<HTMLButtonElement>(null);
  const pointerRef = useRef<{ x: number; y: number } | null>(null);

  const clearPrimingTimeout = useCallback(() => {
    if (primingTimeoutRef.current) {
      window.clearTimeout(primingTimeoutRef.current);
      primingTimeoutRef.current = null;
    }
  }, []);

  const clearArmTimeout = useCallback(() => {
    if (armTimeoutRef.current) {
      window.clearTimeout(armTimeoutRef.current);
      armTimeoutRef.current = null;
    }
  }, []);

  const beginPriming = useCallback(() => {
    if (phase !== "idle") return;

    setPhase("priming");
    clearPrimingTimeout();
    primingTimeoutRef.current = window.setTimeout(() => {
      setPhase("open");
    }, openDelayMs);
  }, [clearPrimingTimeout, openDelayMs, phase]);

  const startPriming = useCallback(() => {
    if (!interactionEnabled || !isInteractionArmed || phase !== "idle") return;

    beginPriming();
  }, [beginPriming, interactionEnabled, isInteractionArmed, phase]);

  const activateHoverIntent = useCallback(() => {
    if (!canHover) return;

    if (!isInteractionArmed) {
      if (!canInstantArmOnEnter) return;
      clearArmTimeout();
      setIsInteractionArmed(true);
      beginPriming();
      return;
    }

    startPriming();
  }, [
    beginPriming,
    canHover,
    canInstantArmOnEnter,
    clearArmTimeout,
    isInteractionArmed,
    startPriming,
  ]);

  const cancelPriming = useCallback(() => {
    if (phase !== "priming") return;
    clearPrimingTimeout();
    setPhase("idle");
  }, [clearPrimingTimeout, phase]);

  const closeFullscreen = useCallback(() => {
    clearPrimingTimeout();
    setPhase("idle");
  }, [clearPrimingTimeout]);

  const activateClickIntent = useCallback(() => {
    if (!interactionEnabled || phase === "open") return;
    clearPrimingTimeout();
    clearArmTimeout();
    setIsInteractionArmed(true);
    setCanInstantArmOnEnter(true);
    setPhase("open");
  }, [clearArmTimeout, clearPrimingTimeout, interactionEnabled, phase]);

  useEffect(() => {
    if (!interactionEnabled) {
      setPhase("idle");
      clearPrimingTimeout();
      clearArmTimeout();
      setIsInteractionArmed(interactionArmDelayMs === 0);
      setCanInstantArmOnEnter(true);
      return;
    }

    if (interactionArmDelayMs === 0) {
      setIsInteractionArmed(true);
      setCanInstantArmOnEnter(true);
      return;
    }

    if (!canHover) {
      setIsInteractionArmed(true);
      setCanInstantArmOnEnter(true);
      return;
    }

    const rect = hitboxRef.current?.getBoundingClientRect();
    const pointer = pointerRef.current;
    const pointerStartsInsideByPosition =
      !!rect &&
      !!pointer &&
      pointer.x >= rect.left &&
      pointer.x <= rect.right &&
      pointer.y >= rect.top &&
      pointer.y <= rect.bottom;
    const pointerStartsInsideByHover = hitboxRef.current?.matches(":hover") ?? false;
    const pointerStartsInside = pointerStartsInsideByPosition || pointerStartsInsideByHover;

    if (!pointerStartsInside) {
      setIsInteractionArmed(true);
      setCanInstantArmOnEnter(true);
      return;
    }

    setIsInteractionArmed(false);
    setCanInstantArmOnEnter(false);
    clearArmTimeout();
    armTimeoutRef.current = window.setTimeout(() => {
      setIsInteractionArmed(true);
      if (hitboxRef.current?.matches(":hover")) {
        beginPriming();
      }
    }, interactionArmDelayMs);
  }, [
    beginPriming,
    canHover,
    clearArmTimeout,
    clearPrimingTimeout,
    interactionArmDelayMs,
    interactionEnabled,
  ]);

  useEffect(
    () => () => {
      clearPrimingTimeout();
      clearArmTimeout();
    },
    [clearArmTimeout, clearPrimingTimeout]
  );

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      pointerRef.current = { x: event.clientX, y: event.clientY };
    };

    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const updateCanHover = () => setCanHover(mediaQuery.matches);
    updateCanHover();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", updateCanHover);
      return () => mediaQuery.removeEventListener("change", updateCanHover);
    }

    mediaQuery.addListener(updateCanHover);
    return () => mediaQuery.removeListener(updateCanHover);
  }, []);

  useEffect(() => {
    if (phase !== "open") return;

    const originalOverflow = document.body.style.overflow;
    const originalOverscroll = document.body.style.overscrollBehavior;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    document.body.style.overflow = "hidden";
    document.body.style.overscrollBehavior = "none";

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.overscrollBehavior = originalOverscroll;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [phase]);

  const showFeaturedDecoration = featured && phase === "idle";
  const animateFeaturedDecoration = showFeaturedDecoration && !prefersReducedMotion;
  const showPriming = interactionEnabled && phase === "priming";
  const showFullscreen = interactionEnabled && phase === "open";
  const showCompact = !showFullscreen;
  const isCaseStudyView = openViewLabel === "case-study";
  const primingDurationSeconds = openDelayMs / 1000;
  const fullscreenBackdrop =
    isCaseStudyView && cardId === TANDEM_FOCUS_ID ? TANDEM_GLASS_BACKGROUND : GLASS_BACKGROUND;
  const fullscreenSlogan = isInsurFlow
    ? "Production-grade engineering for InsurFlow"
    : project.slogan;
  const fullscreenDescription = isInsurFlow
    ? "Built as a portfolio-grade InsurTech system using a modern TypeScript stack with strong reliability, testing, and deployment standards."
    : project.description;

  return (
    <LayoutGroup id={`project-focus-${cardId}`}>
      <div data-focus-card={cardId} data-focus-phase={phase} className="relative">
        {showCompact ? (
          <motion.div
            className="relative will-change-transform"
            animate={
              animateFeaturedDecoration ? { rotate: [0, -1.2, 1.2, 0], y: [0, -2, 0] } : undefined
            }
            transition={
              animateFeaturedDecoration
                ? { duration: 4.2, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.1 }
                : undefined
            }
          >
            {showFeaturedDecoration ? (
              <>
                <motion.div
                  className="pointer-events-none absolute -inset-3 rounded-[1.9rem] bg-brand-coral/20 blur-xl"
                  animate={
                    animateFeaturedDecoration
                      ? { opacity: [0.3, 0.65, 0.3], scale: [1, 1.04, 1] }
                      : undefined
                  }
                  transition={
                    animateFeaturedDecoration
                      ? { duration: 3.6, repeat: Infinity, ease: "easeInOut" }
                      : undefined
                  }
                />
                <motion.div
                  className="pointer-events-none absolute -inset-2 rounded-[1.7rem] border border-brand-apricot/70"
                  animate={animateFeaturedDecoration ? { opacity: [0.45, 0.95, 0.45] } : undefined}
                  transition={
                    animateFeaturedDecoration
                      ? { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
                      : undefined
                  }
                />
                <div className="pointer-events-none absolute -right-2 -top-3 z-30 rounded-full border border-brand-coral/70 bg-black/80 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-brand-apricot shadow-[0_0_18px_rgba(239,111,108,0.35)]">
                  Hover
                </div>
              </>
            ) : null}

            <motion.div
              layoutId={sharedLayoutId}
              transition={CARD_MORPH_TRANSITION}
              className="relative overflow-hidden"
              style={{ borderRadius: 26 }}
            >
              <HeroBackHoverCard
                title={project.title}
                slogan={project.slogan}
                description={project.description}
                stack={project.stack}
                logoSrc={project.logoSrc}
                wordmarkSrc={project.wordmarkSrc}
                links={project.links}
                achievements={project.achievements}
                coverSrc={project.coverSrc}
                brand={project.brand}
                expandedDescription={project.expandedDescription}
                interactive={false}
                showLinksOnCompact={showCompactLinks}
                compactLogoContainerClassName={isInsurFlow ? "h-14 w-14" : undefined}
                compactLogoImageClassName={isInsurFlow ? "p-1.5" : undefined}
                compactLogoPixelSize={isInsurFlow ? 56 : undefined}
              />

              <AnimatePresence>
                {showPriming ? (
                  <motion.div
                    data-focus-priming-overlay={cardId}
                    className="pointer-events-none absolute inset-0 z-30"
                    initial={{
                      opacity: 0.2,
                      scale: 0.06,
                    }}
                    animate={{
                      opacity: 0.56,
                      scale: 1.14,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.08,
                    }}
                    transition={{
                      scale: { duration: primingDurationSeconds * 0.9, ease: "linear" },
                      opacity: { duration: primingDurationSeconds * 0.85, ease: "linear" },
                    }}
                    style={{
                      transformOrigin: "50% 50%",
                      borderRadius: PRIMING_BLOB_RADIUS,
                      background:
                        "radial-gradient(circle at center, rgba(242,197,124,0.8) 0%, rgba(221,174,126,0.62) 46%, rgba(17,24,39,0.86) 100%)",
                    }}
                  >
                    <motion.div
                      className="absolute inset-0"
                      animate={prefersReducedMotion ? undefined : { opacity: [0.18, 0.3, 0.2] }}
                      transition={
                        prefersReducedMotion
                          ? undefined
                          : { duration: 0.9, repeat: Infinity, ease: "easeInOut" }
                      }
                      style={{
                        background:
                          "radial-gradient(circle at center, rgba(255,238,211,0.24) 0%, rgba(242,197,124,0.08) 56%, rgba(255,255,255,0) 74%)",
                      }}
                    />
                  </motion.div>
                ) : null}
              </AnimatePresence>

              {interactionEnabled ? (
                <button
                  ref={hitboxRef}
                  type="button"
                  className="absolute inset-0 z-40 cursor-pointer bg-transparent"
                  aria-label={`Open ${project.title} ${openViewLabel}`}
                  onPointerEnter={() => {
                    activateHoverIntent();
                  }}
                  onPointerLeave={() => {
                    clearArmTimeout();
                    setIsInteractionArmed(true);
                    setCanInstantArmOnEnter(true);
                    if (canHover) cancelPriming();
                  }}
                  onPointerDown={(event) => {
                    const isTouchLike =
                      event.pointerType === "touch" || event.pointerType === "pen";
                    if (!isTouchLike || canHover || !isInteractionArmed) return;
                    event.preventDefault();
                    startPriming();
                  }}
                  onClick={(event) => {
                    event.preventDefault();
                    activateClickIntent();
                  }}
                />
              ) : null}
            </motion.div>
          </motion.div>
        ) : null}
      </div>

      {renderFullscreenInPortal && hasMounted
        ? createPortal(
            <AnimatePresence>
              {showFullscreen ? (
                <motion.div
                  data-focus-fullscreen={cardId}
                  data-case-study-fullscreen={isCaseStudyView ? cardId : undefined}
                  data-focus-glass="medium"
                  className="fixed inset-0 z-50 backdrop-blur-md"
                  style={{ backgroundColor: fullscreenBackdrop, willChange: "opacity" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                >
                  <motion.div
                    layoutId={sharedLayoutId}
                    transition={CARD_MORPH_TRANSITION}
                    className="relative h-full w-full overflow-hidden border border-white/10 bg-black/30 backdrop-blur-xl"
                    style={{ borderRadius: 0, willChange: "transform, opacity" }}
                  >
                    <div className="absolute inset-0 z-[1] bg-black/24" />
                    <div
                      data-focus-dots={cardId}
                      className="absolute inset-0 z-[2] bg-grid-dot opacity-45 mix-blend-screen"
                    />
                    <motion.div
                      className="pointer-events-none absolute inset-0 z-[3]"
                      initial={{ opacity: 0.26 }}
                      animate={{ opacity: 0.12 }}
                      exit={{ opacity: 0.22 }}
                      transition={{ duration: 0.34, ease: "easeOut" }}
                      style={{
                        background:
                          "radial-gradient(circle at 50% 42%, rgba(242,197,124,0.18) 0%, rgba(221,174,126,0.1) 46%, rgba(17,24,39,0) 78%)",
                      }}
                    />
                    <div className="relative z-10 flex h-full flex-col overflow-y-auto">
                      <FullscreenHeader
                        cardId={cardId}
                        title={project.title}
                        logoSrc={project.logoSrc}
                        wordmarkSrc={project.wordmarkSrc}
                        onBack={closeFullscreen}
                        viewLabel={openViewLabel}
                      />
                      <CaseStudyLongForm
                        project={project}
                        cardId={cardId}
                        fullscreenSlogan={fullscreenSlogan}
                        fullscreenDescription={fullscreenDescription}
                        isInsurFlow={isInsurFlow}
                      />
                    </div>
                  </motion.div>
                </motion.div>
              ) : null}
            </AnimatePresence>,
            document.body
          )
        : null}

      {!renderFullscreenInPortal ? (
        <AnimatePresence>
          {showFullscreen ? (
            <motion.div
              data-focus-fullscreen={cardId}
              data-case-study-fullscreen={isCaseStudyView ? cardId : undefined}
              data-focus-glass="medium"
              className="fixed inset-0 z-50 backdrop-blur-md"
              style={{ backgroundColor: fullscreenBackdrop, willChange: "opacity" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
            >
              <motion.div
                layoutId={sharedLayoutId}
                transition={CARD_MORPH_TRANSITION}
                className="relative h-full w-full overflow-hidden border border-white/10 bg-black/30 backdrop-blur-xl"
                style={{ borderRadius: 0, willChange: "transform, opacity" }}
              >
                <div className="absolute inset-0 z-[1] bg-black/24" />
                <div
                  data-focus-dots={cardId}
                  className="absolute inset-0 z-[2] bg-grid-dot opacity-45 mix-blend-screen"
                />
                <motion.div
                  className="pointer-events-none absolute inset-0 z-[3]"
                  initial={{ opacity: 0.26 }}
                  animate={{ opacity: 0.12 }}
                  exit={{ opacity: 0.22 }}
                  transition={{ duration: 0.34, ease: "easeOut" }}
                  style={{
                    background:
                      "radial-gradient(circle at 50% 42%, rgba(242,197,124,0.18) 0%, rgba(221,174,126,0.1) 46%, rgba(17,24,39,0) 78%)",
                  }}
                />
                <div className="relative z-10 flex h-full flex-col overflow-y-auto">
                  <FullscreenHeader
                    cardId={cardId}
                    title={project.title}
                    logoSrc={project.logoSrc}
                    wordmarkSrc={project.wordmarkSrc}
                    onBack={closeFullscreen}
                    viewLabel={openViewLabel}
                  />
                  <CaseStudyLongForm
                    project={project}
                    cardId={cardId}
                    fullscreenSlogan={fullscreenSlogan}
                    fullscreenDescription={fullscreenDescription}
                    isInsurFlow={isInsurFlow}
                  />
                </div>
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      ) : null}
    </LayoutGroup>
  );
};
