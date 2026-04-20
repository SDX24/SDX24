"use client";

import {
  type KeyboardEvent as ReactKeyboardEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import Image from "next/image";

import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { createPortal } from "react-dom";
import {
  LuArrowLeft,
  LuChevronDown,
  LuChevronUp,
  LuExternalLink,
  LuLayoutTemplate,
  LuPencilRuler,
  LuScrollText,
  LuSmartphone,
  LuUser,
} from "react-icons/lu";

import { HeroBackHoverCard } from "./hero-back-hover-card";

type CaseStudyCitation = {
  label: string;
  href: string;
};

type CaseStudyAsset = {
  title: string;
  caption: string;
  src?: string;
  href?: string;
  figmaEmbedUrl?: string;
  imageAlt?: string;
};

type CaseStudySection = {
  title: string;
  paragraphs: string[];
  highlights?: string[];
  assets?: CaseStudyAsset[];
  citations?: CaseStudyCitation[];
  gradientVariant?: "sky" | "mint" | "teal" | "slate" | "amber";
};

type CaseStudyTeamCredit = {
  name: string;
  role?: string;
  linkedin?: string;
  portfolio?: string;
  github?: string;
  avatarSrc?: string;
  team?: "Design" | "Development";
};

type CaseStudyPreview = {
  title: string;
  summary: string;
  iframeUrl: string;
  liveUrl: string;
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
  caseStudyRoleResponsibilities?: string[];
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
const PHONE_ASPECT_RATIO = 301.5 / 655.5;
const CASE_STUDY_LINK_CLASS =
  "text-sm font-semibold text-blue-300 underline decoration-blue-300/70 underline-offset-4 transition hover:text-blue-200";

const CASE_STUDY_GRADIENTS = {
  sky: "bg-[radial-gradient(circle_at_18%_15%,rgba(104,213,255,0.22),transparent_42%),radial-gradient(circle_at_86%_6%,rgba(51,115,204,0.2),transparent_40%),linear-gradient(160deg,rgba(9,19,34,0.86),rgba(5,13,25,0.9))]",
  mint: "bg-[radial-gradient(circle_at_14%_14%,rgba(146,241,137,0.18),transparent_40%),radial-gradient(circle_at_80%_10%,rgba(104,213,255,0.16),transparent_38%),linear-gradient(160deg,rgba(8,26,26,0.86),rgba(6,17,20,0.9))]",
  teal: "bg-[radial-gradient(circle_at_20%_15%,rgba(51,115,204,0.18),transparent_40%),radial-gradient(circle_at_84%_14%,rgba(146,241,137,0.14),transparent_36%),linear-gradient(165deg,rgba(7,24,28,0.86),rgba(4,14,19,0.9))]",
  slate:
    "bg-[radial-gradient(circle_at_14%_14%,rgba(124,151,189,0.16),transparent_40%),radial-gradient(circle_at_82%_10%,rgba(107,131,166,0.16),transparent_38%),linear-gradient(160deg,rgba(13,20,31,0.9),rgba(8,12,20,0.94))]",
  amber:
    "bg-[radial-gradient(circle_at_14%_14%,rgba(242,197,124,0.2),transparent_40%),radial-gradient(circle_at_80%_10%,rgba(239,111,108,0.16),transparent_38%),linear-gradient(160deg,rgba(24,16,14,0.9),rgba(14,9,11,0.92))]",
};

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

const GRADIENT_VARIANT_ORDER: Array<keyof typeof CASE_STUDY_GRADIENTS> = [
  "sky",
  "mint",
  "teal",
  "slate",
  "amber",
];

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
  <div
    className={`sticky top-0 z-30 mb-6 border-b border-white/10 px-6 py-3 backdrop-blur-xl sm:px-10 ${
      viewLabel === "case-study"
        ? "bg-[radial-gradient(circle_at_18%_-40%,rgba(51,115,204,0.5),transparent_55%),linear-gradient(165deg,rgba(4,11,21,0.94),rgba(3,9,18,0.94))]"
        : "bg-black/75"
    }`}
  >
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

const CaseStudyPlaceholderAsset = ({
  asset,
  sectionTitle,
  isExpanded,
  onToggle,
}: {
  asset: CaseStudyAsset;
  sectionTitle: string;
  isExpanded: boolean;
  onToggle: () => void;
}) => {
  const isContextSection = /context|problem/i.test(sectionTitle);
  const hasFigmaEmbed = Boolean(asset.figmaEmbedUrl);
  const hasImageAsset = Boolean(asset.src);

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    onToggle();
  };

  return (
    <motion.button
      layout
      type="button"
      onClick={onToggle}
      onKeyDown={handleKeyDown}
      whileTap={{ scale: 0.997 }}
      transition={{
        layout: { duration: 0.18, ease: "easeOut" },
        duration: 0.15,
        ease: "easeOut",
      }}
      className={`w-full cursor-pointer space-y-3 rounded-2xl border bg-black/20 p-4 text-left transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-apricot/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
        isExpanded
          ? "border-brand-apricot/55 shadow-[0_16px_30px_rgba(242,197,124,0.16)]"
          : "border-white/10"
      }`}
      aria-label={`Toggle preview for ${asset.title}`}
      aria-pressed={isExpanded}
    >
      <div
        className={`relative overflow-hidden rounded-xl border transition-all duration-300 ${
          isExpanded
            ? "min-h-[520px] sm:min-h-[620px] lg:min-h-[680px] border-brand-apricot/45 bg-black/35"
            : `${isContextSection ? "min-h-[260px] sm:min-h-[300px]" : "min-h-[210px] sm:min-h-[240px]"} border-dashed border-white/20 bg-black/25`
        }`}
      >
        {hasFigmaEmbed ? (
          <div
            className={`w-full overflow-hidden rounded-xl border border-white/15 bg-black/30 ${
              isExpanded ? "h-[700px]" : "h-[480px]"
            }`}
          >
            <iframe
              src={asset.figmaEmbedUrl}
              title={`${asset.title} Figma embed`}
              className="h-full w-full"
              allowFullScreen
              loading="lazy"
            />
          </div>
        ) : hasImageAsset ? (
          <div
            className={`w-full overflow-hidden rounded-xl border border-white/15 bg-black/30 ${
              isExpanded ? "h-[700px]" : "h-[480px]"
            }`}
          >
            <Image
              src={asset.src ?? ""}
              alt={asset.imageAlt ?? asset.title}
              width={1600}
              height={900}
              className="h-full w-full object-contain"
              loading="lazy"
            />
          </div>
        ) : (
          <>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_10%,rgba(51,115,204,0.28),transparent_44%),radial-gradient(circle_at_84%_4%,rgba(242,197,124,0.18),transparent_38%),linear-gradient(170deg,rgba(255,255,255,0.08),rgba(255,255,255,0))]" />
            <div className="absolute right-3 top-3 rounded-full border border-white/20 bg-black/45 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-brand-clay">
              {isExpanded ? "Preview Zoomed" : "Preview"}
            </div>
            <div className="relative z-10 flex h-full flex-col items-center justify-center gap-2 px-4 text-center">
              <LuLayoutTemplate className="h-6 w-6 text-brand-apricot" aria-hidden="true" />
              <p className="text-sm font-semibold text-gray-100">Visual preview</p>
              <p className="text-xs text-gray-300">{asset.title}</p>
            </div>
          </>
        )}
      </div>
      <p className="text-sm font-semibold text-white">{asset.title}</p>
      <p className="text-sm leading-relaxed text-gray-300">{asset.caption}</p>
    </motion.button>
  );
};

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
  const caseStudySections = project.caseStudySections ?? [];
  const caseStudyHeading = project.caseStudyHeading ?? `${project.title} Case Study`;
  const caseStudySummary = project.caseStudySummary ?? fullscreenDescription;
  const caseStudyStack = project.caseStudyStack ?? project.stack;
  const caseStudyRoleResponsibilities = project.caseStudyRoleResponsibilities ?? [];
  const hasCaseStudyLinks = Boolean(project.links?.length);
  const caseStudyPreview = project.caseStudyPreview;
  const caseStudyPreviewHost = caseStudyPreview?.liveUrl
    .replace(/^https?:\/\//, "")
    .replace(/\/$/, "");
  const [isStackExpanded, setIsStackExpanded] = useState(false);
  const [expandedAssetBySection, setExpandedAssetBySection] = useState<
    Record<string, string | null>
  >({});
  const [activeSection, setActiveSection] = useState(caseStudySections[0]?.title ?? "Case Study");
  const isTandemCaseStudy = cardId === TANDEM_FOCUS_ID;
  const hasOutcomeNarrativeSection = caseStudySections.some((section) =>
    /outcome|impact/i.test(section.title)
  );
  const stackChipClass =
    "rounded-xl border border-white/15 bg-black/35 px-3 py-2 text-center text-xs font-semibold uppercase tracking-[0.12em] text-gray-200";

  const scrollWithinCaseStudy = useCallback(
    (elementId: string, align: "start" | "center" = "start") => {
      const element = document.getElementById(elementId);
      if (!element) return;

      const scrollRoot = element.closest('[data-focus-scroll-root="true"]');
      if (!(scrollRoot instanceof HTMLElement)) {
        element.scrollIntoView({ behavior: "smooth", block: align });
        return;
      }

      const rootRect = scrollRoot.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();
      const elementOffsetTop = scrollRoot.scrollTop + (elementRect.top - rootRect.top);
      const targetTop =
        align === "center"
          ? elementOffsetTop - (rootRect.height - elementRect.height) / 2
          : elementOffsetTop - 16;

      scrollRoot.scrollTo({
        top: Math.max(targetTop, 0),
        behavior: "smooth",
      });
    },
    []
  );

  useEffect(() => {
    setActiveSection(caseStudySections[0]?.title ?? "Case Study");
  }, [caseStudySections]);

  useEffect(() => {
    const nextState: Record<string, string | null> = {};
    caseStudySections.forEach((section) => {
      nextState[section.title] = null;
    });
    setExpandedAssetBySection(nextState);
  }, [caseStudySections]);

  useEffect(() => {
    if (!caseStudySections.length) return;

    const observers: IntersectionObserver[] = [];
    caseStudySections.forEach((section) => {
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
  }, [caseStudySections]);

  return (
    <div className="mx-auto w-full max-w-[90rem] px-4 pb-10 sm:px-8 lg:px-10">
      {hasStructuredCaseStudy ? (
        <div className="sticky top-[4.5rem] z-30 mb-6 flex items-center justify-center">
          <div className="w-full max-w-[84rem] rounded-2xl border border-white/25 bg-[radial-gradient(circle_at_50%_-30%,rgba(51,115,204,0.42),transparent_48%),linear-gradient(165deg,rgba(8,14,26,0.92),rgba(6,11,22,0.94))] px-3 py-2.5 shadow-[0_18px_48px_rgba(0,0,0,0.5)] backdrop-blur-2xl">
            <div className="mb-1.5 flex items-center justify-between gap-3">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-clay">
                Narrative Map
              </span>
              <span className="rounded-full border border-brand-apricot/40 bg-brand-apricot/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-brand-apricot shadow-[0_0_16px_rgba(242,197,124,0.32)]">
                {activeSection}
              </span>
            </div>
            <div className="overflow-x-auto pb-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="flex min-w-max gap-2">
                {caseStudySections.map((section) => {
                  const isActive = activeSection === section.title;
                  return (
                    <button
                      type="button"
                      key={section.title}
                      onClick={() => {
                        setActiveSection(section.title);
                        scrollWithinCaseStudy(toSectionId(section.title));
                      }}
                      className={`whitespace-nowrap rounded-full border px-3 py-1 text-[11px] font-semibold transition ${
                        isActive
                          ? "border-brand-apricot/55 bg-[linear-gradient(120deg,rgba(242,197,124,0.42),rgba(221,174,126,0.32))] text-white shadow-[0_0_20px_rgba(242,197,124,0.35)]"
                          : "border-white/15 bg-white/5 text-gray-300 hover:border-white/30 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {section.title}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <div
        className={`mx-auto mt-8 max-w-[84rem] space-y-6 rounded-[2rem] border border-white/15 p-6 shadow-[0_24px_54px_rgba(0,0,0,0.35)] sm:p-8 ${
          isTandemCaseStudy ? CASE_STUDY_GRADIENTS.sky : CASE_STUDY_GRADIENTS.slate
        }`}
      >
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

            <div className="grid gap-3 lg:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)] lg:items-stretch">
              <div className="rounded-2xl border border-white/10 bg-black/35 p-5 shadow-[0_12px_26px_rgba(0,0,0,0.28)] sm:p-6">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-clay">
                  Role
                </p>
                <p className="mt-2 text-xl font-bold tracking-tight text-white sm:text-2xl">
                  {project.caseStudyRole ?? "Role pending"}
                </p>
                {caseStudyRoleResponsibilities.length ? (
                  <ul className="mt-4 grid gap-2">
                    {caseStudyRoleResponsibilities.map((item) => (
                      <li
                        key={item}
                        className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm leading-relaxed text-gray-100"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-4 rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm leading-relaxed text-gray-100">
                    Responsibility details pending.
                  </p>
                )}
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                <div className="rounded-xl border border-white/10 bg-black/30 px-4 py-3">
                  <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-brand-clay">
                    Timeline
                  </p>
                  <p className="mt-1 text-base font-semibold text-gray-100 sm:text-lg">
                    {project.caseStudyTimeline ?? "Timeline"}
                  </p>
                  <div className="mt-3.5">
                    <div className="relative h-8">
                      <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-white/25" />
                      <div className="absolute left-0 right-0 top-1/2 flex -translate-y-1/2 justify-between px-[2px]">
                        {[4, 8, 12, 16].map((week) => (
                          <span
                            key={week}
                            className="inline-flex h-3.5 w-3.5 rounded-full border border-brand-apricot/60 bg-brand-apricot/80"
                            aria-hidden="true"
                          />
                        ))}
                      </div>
                    </div>
                    <div className="mt-1 flex justify-between text-sm font-semibold tracking-[0.08em] text-gray-300">
                      <span>4</span>
                      <span>8</span>
                      <span>12</span>
                      <span>16 (weeks)</span>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    scrollWithinCaseStudy("case-study-team-credits", "center");
                  }}
                  className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-left transition hover:border-brand-apricot/50"
                >
                  <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-brand-clay">
                    Team
                  </p>
                  <p className="mt-1 text-base font-semibold text-gray-100 sm:text-lg">
                    {project.caseStudyTeam ?? "Team details"}
                  </p>
                  <div className="mt-2.5 flex items-center gap-2.5">
                    <span className="inline-flex gap-2">
                      {Array.from({ length: 3 }).map((_, index) => (
                        <span
                          key={`dev-${index}`}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-brand-apricot/45 bg-black/30 text-brand-apricot"
                        >
                          <LuUser className="h-4.5 w-4.5" aria-hidden="true" />
                        </span>
                      ))}
                    </span>
                    <span className="inline-flex gap-2">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <span
                          key={`design-${index}`}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-brand-clay/45 bg-black/30 text-brand-clay"
                        >
                          <LuPencilRuler className="h-4.5 w-4.5" aria-hidden="true" />
                        </span>
                      ))}
                    </span>
                  </div>
                </button>
              </div>
            </div>

            {hasCaseStudyLinks ? (
              <div className="space-y-2">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-clay">
                  Project Links
                </p>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {project.links?.map((link) => (
                    <a
                      key={`${link.label}-${link.href}`}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex min-h-[64px] items-center justify-center rounded-2xl border border-brand-apricot/30 bg-black/35 px-4 py-3 text-center text-sm font-semibold text-gray-100 shadow-[0_10px_24px_rgba(0,0,0,0.25)] transition hover:-translate-y-0.5 hover:border-brand-apricot hover:text-brand-apricot"
                      data-stop-card-click="true"
                    >
                      <span className="flex flex-col items-center justify-center gap-1">
                        <span className="inline-flex items-center justify-center gap-2">
                          <span>{link.label}</span>
                          <LuExternalLink
                            className="h-4 w-4 text-brand-clay transition group-hover:text-brand-apricot"
                            aria-hidden="true"
                          />
                        </span>
                        {link.label === "App Link" ? (
                          <span className="rounded-full border border-emerald-300/50 bg-emerald-400/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-emerald-300">
                            Currently Live
                          </span>
                        ) : null}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            ) : null}

            {caseStudyStack.length ? (
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => setIsStackExpanded((current) => !current)}
                  className="flex w-full items-center justify-between rounded-2xl border border-white/15 bg-black/25 px-4 py-3 text-left transition hover:border-brand-apricot/60"
                >
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-clay">
                      Tech Stack
                    </p>
                    {!isStackExpanded && caseStudyStack.length ? (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {caseStudyStack.slice(0, 6).map((item) => (
                          <span key={`collapsed-${item}`} className={stackChipClass}>
                            {item}
                          </span>
                        ))}
                        {caseStudyStack.length > 6 ? (
                          <span className={stackChipClass}>+{caseStudyStack.length - 6}</span>
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                  {isStackExpanded ? (
                    <LuChevronUp className="h-4.5 w-4.5 text-brand-apricot" aria-hidden="true" />
                  ) : (
                    <LuChevronDown className="h-4.5 w-4.5 text-brand-apricot" aria-hidden="true" />
                  )}
                </button>
                <AnimatePresence initial={false}>
                  {isStackExpanded ? (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.24, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <div className="grid gap-2 pt-2 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
                        {caseStudyStack.map((item) => (
                          <span key={item} className={stackChipClass}>
                            {item}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            ) : null}

            {caseStudyPreview ? (
              <section className="space-y-3">
                <div className="mx-auto w-full max-w-[760px] overflow-hidden rounded-[1.4rem] border border-white/20 bg-black/45 shadow-[0_20px_40px_rgba(0,0,0,0.38)]">
                  <div className="flex items-center gap-3 border-b border-white/10 bg-black/55 px-3 py-2.5 text-xs text-gray-300 sm:text-sm">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                      <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
                      <a
                        href={caseStudyPreview.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-3.5 w-3.5 items-center justify-center rounded-full border border-emerald-300/60 bg-emerald-400 text-[9px] text-emerald-950"
                        aria-label="Open Tandem live app in a new tab"
                        data-stop-card-click="true"
                      >
                        +
                      </a>
                    </div>
                    <div className="flex min-w-0 flex-1 items-center justify-center gap-2 overflow-hidden text-center font-semibold text-gray-100">
                      <span className="whitespace-nowrap">Live Interaction</span>
                      <span className="truncate rounded-full border border-white/15 bg-white/5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-brand-clay sm:text-[11px]">
                        {caseStudyPreviewHost ?? "tandem-app.com"}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-center bg-[radial-gradient(circle_at_10%_0%,rgba(51,115,204,0.2),transparent_38%),radial-gradient(circle_at_88%_8%,rgba(146,241,137,0.16),transparent_32%)] px-3 py-5 sm:px-4 sm:py-6">
                    <div className="w-full max-w-[328px] rounded-[2.35rem] border-[12px] border-[#1c2433] bg-[#0d1424] p-2 shadow-[0_24px_44px_rgba(0,0,0,0.38)]">
                      <div className="relative">
                        <div className="absolute left-1/2 top-0 z-10 h-4 w-24 -translate-x-1/2 rounded-b-full bg-black/40" />
                        <div className="overflow-hidden rounded-[2rem] border border-black/35 bg-white">
                          <iframe
                            src={caseStudyPreview.iframeUrl}
                            title="Tandem interactive preview"
                            style={{ aspectRatio: `${PHONE_ASPECT_RATIO}` }}
                            className="w-full bg-white"
                            loading="lazy"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
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
        <div className="mx-auto mt-10 max-w-[84rem] space-y-6">
          {caseStudySections.map((section, index) => {
            const gradientKey: keyof typeof CASE_STUDY_GRADIENTS =
              section.gradientVariant ??
              GRADIENT_VARIANT_ORDER[index % GRADIENT_VARIANT_ORDER.length]!;
            const sectionGradient = CASE_STUDY_GRADIENTS[gradientKey];
            const isOutcomeSection = /outcome|impact/i.test(section.title);
            return (
              <section
                key={section.title}
                id={toSectionId(section.title)}
                className={`space-y-4 rounded-3xl border border-white/15 p-6 shadow-[0_18px_40px_rgba(0,0,0,0.34)] sm:p-8 ${sectionGradient}`}
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {(() => {
                      const SectionIcon = getCaseStudySectionIcon(section.title);
                      return (
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-brand-apricot">
                          <SectionIcon className="h-4.5 w-4.5" aria-hidden="true" />
                        </span>
                      );
                    })()}
                    <h3 className="text-2xl font-semibold text-white sm:text-3xl">
                      {section.title}
                    </h3>
                  </div>
                </div>

                {section.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 72)}
                    className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm leading-relaxed text-gray-100 sm:text-base"
                  >
                    {paragraph}
                  </p>
                ))}

                {section.highlights?.length ? (
                  <ul className="grid gap-2 sm:grid-cols-2">
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

                {section.assets?.length
                  ? (() => {
                      const sectionAssets = section.assets;
                      if (!sectionAssets?.length) return null;

                      const expandedAssetTitle = expandedAssetBySection[section.title] ?? null;
                      if (!expandedAssetTitle) {
                        return (
                          <div className="grid gap-4 md:grid-cols-2">
                            {sectionAssets.map((asset) => (
                              <CaseStudyPlaceholderAsset
                                key={`${asset.title}-${asset.caption}`}
                                asset={asset}
                                sectionTitle={section.title}
                                isExpanded={false}
                                onToggle={() => {
                                  setExpandedAssetBySection((current) => ({
                                    ...current,
                                    [section.title]: asset.title,
                                  }));
                                }}
                              />
                            ))}
                          </div>
                        );
                      }

                      const expandedAsset =
                        sectionAssets.find((asset) => asset.title === expandedAssetTitle) ??
                        sectionAssets[0];

                      if (!expandedAsset) return null;

                      return (
                        <div className="relative">
                          <CaseStudyPlaceholderAsset
                            key={`${expandedAsset.title}-${expandedAsset.caption}`}
                            asset={expandedAsset}
                            sectionTitle={section.title}
                            isExpanded
                            onToggle={() => {
                              setExpandedAssetBySection((current) => ({
                                ...current,
                                [section.title]: null,
                              }));
                            }}
                          />

                          {sectionAssets.length > 1
                            ? sectionAssets
                                .filter((asset) => asset.title !== expandedAsset.title)
                                .map((asset) => {
                                  const originalIndex = sectionAssets.findIndex(
                                    (candidate) => candidate.title === asset.title
                                  );
                                  const sideClass = originalIndex === 0 ? "right-3" : "left-3";

                                  return (
                                    <button
                                      key={`switch-${section.title}-${asset.title}`}
                                      type="button"
                                      onClick={() => {
                                        setExpandedAssetBySection((current) => ({
                                          ...current,
                                          [section.title]: asset.title,
                                        }));
                                      }}
                                      className={`absolute top-1/2 z-20 -translate-y-1/2 rounded-xl border border-brand-apricot/45 bg-black/65 px-3 py-2 text-left shadow-[0_10px_24px_rgba(0,0,0,0.35)] backdrop-blur ${sideClass}`}
                                      aria-label={`Switch to ${asset.title} preview`}
                                    >
                                      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-brand-clay">
                                        Switch Preview
                                      </p>
                                      <p className="max-w-[150px] text-xs font-semibold text-white">
                                        {asset.title}
                                      </p>
                                    </button>
                                  );
                                })
                            : null}
                        </div>
                      );
                    })()
                  : null}

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
                          data-stop-card-click="true"
                        >
                          {citation.label}
                        </a>
                      ))}
                    </div>
                  </div>
                ) : null}

                {isOutcomeSection && project.caseStudyOutcomes?.length ? (
                  <div className="space-y-3">
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-clay">
                      Measured Results
                    </p>
                    <ul className="grid gap-2 sm:grid-cols-2">
                      {project.caseStudyOutcomes.map((outcome) => (
                        <li
                          key={outcome}
                          className="rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm text-gray-100"
                        >
                          {outcome}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </section>
            );
          })}

          {project.caseStudyOutcomes?.length && !hasOutcomeNarrativeSection ? (
            <section
              className={`space-y-4 rounded-3xl border border-white/15 p-6 sm:p-8 ${CASE_STUDY_GRADIENTS.amber}`}
            >
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
            <section
              id="case-study-team-credits"
              className={`space-y-4 rounded-3xl border border-white/15 p-6 sm:p-8 ${CASE_STUDY_GRADIENTS.mint}`}
            >
              <h3 className="text-2xl font-semibold text-white sm:text-3xl">Team Credits</h3>
              <ul className="grid gap-3 md:grid-cols-2">
                {project.caseStudyTeamCredits.map((credit) => (
                  <li
                    key={`${credit.name}-${credit.linkedin ?? "no-link"}`}
                    className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-gray-200 sm:text-base"
                  >
                    {credit.avatarSrc ? (
                      <Image
                        src={credit.avatarSrc}
                        alt={`${credit.name} avatar`}
                        width={40}
                        height={40}
                        className="mr-2 inline-flex h-10 w-10 rounded-full border border-white/15 object-cover align-middle"
                        loading="lazy"
                      />
                    ) : null}
                    <span className="font-semibold text-white">{credit.name}</span>
                    {credit.team ? (
                      <span className="ml-2 rounded-full border border-brand-apricot/45 bg-brand-apricot/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-brand-apricot">
                        {credit.team}
                      </span>
                    ) : null}
                    {credit.linkedin ? (
                      <a
                        href={credit.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`ml-2 ${CASE_STUDY_LINK_CLASS}`}
                        data-stop-card-click="true"
                      >
                        LinkedIn
                      </a>
                    ) : null}
                    {credit.portfolio ? (
                      <a
                        href={credit.portfolio}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`ml-2 ${CASE_STUDY_LINK_CLASS}`}
                        data-stop-card-click="true"
                      >
                        Portfolio
                      </a>
                    ) : null}
                    {credit.github ? (
                      <a
                        href={credit.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`ml-2 ${CASE_STUDY_LINK_CLASS}`}
                        data-stop-card-click="true"
                      >
                        GitHub
                      </a>
                    ) : null}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {project.caseStudyReferences?.length ? (
            <section
              className={`space-y-4 rounded-3xl border border-white/15 p-6 sm:p-8 ${CASE_STUDY_GRADIENTS.slate}`}
            >
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
                      data-stop-card-click="true"
                    >
                      {reference.label}
                    </a>
                  </li>
                ))}
              </ol>
            </section>
          ) : null}
        </div>
      ) : project.caseStudyDraft?.length ? (
        <div className="mx-auto mt-10 max-w-4xl space-y-6 rounded-3xl border border-white/10 bg-black/25 p-6 sm:p-8">
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
        <div className="mx-auto mt-10 grid max-w-5xl gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
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
                    <div
                      data-focus-scroll-root="true"
                      className="relative z-10 flex h-full flex-col overflow-y-auto"
                    >
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
                <div
                  data-focus-scroll-root="true"
                  className="relative z-10 flex h-full flex-col overflow-y-auto"
                >
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
