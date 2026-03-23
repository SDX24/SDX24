"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import Image from "next/image";

import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "framer-motion";

import { HeroBackHoverCard } from "./hero-back-hover-card";

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
};

type ProjectFocusCardProps = {
  project: ProjectData;
  featured?: boolean;
  enableFullscreen?: boolean;
  openDelayMs?: number;
  showCompactLinks?: boolean;
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

const toCardId = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const ProjectFocusCard = ({
  project,
  featured = false,
  enableFullscreen = false,
  openDelayMs = 1800,
  showCompactLinks = false,
}: ProjectFocusCardProps) => {
  const prefersReducedMotion = useReducedMotion();
  const cardId = useMemo(() => toCardId(project.title), [project.title]);
  const layoutId = useMemo(() => `project-focus-shell-${cardId}`, [cardId]);
  const isInsurFlow = cardId === INSURFLOW_FOCUS_ID;
  const interactionEnabled = featured && enableFullscreen;
  const [phase, setPhase] = useState<FocusPhase>("idle");
  const [canHover, setCanHover] = useState(true);
  const primingTimeoutRef = useRef<number | null>(null);

  const clearPrimingTimeout = useCallback(() => {
    if (primingTimeoutRef.current) {
      window.clearTimeout(primingTimeoutRef.current);
      primingTimeoutRef.current = null;
    }
  }, []);

  const startPriming = useCallback(() => {
    if (!interactionEnabled || phase !== "idle") return;

    setPhase("priming");
    clearPrimingTimeout();
    primingTimeoutRef.current = window.setTimeout(() => {
      setPhase("open");
    }, openDelayMs);
  }, [clearPrimingTimeout, interactionEnabled, openDelayMs, phase]);

  const cancelPriming = useCallback(() => {
    if (phase !== "priming") return;
    clearPrimingTimeout();
    setPhase("idle");
  }, [clearPrimingTimeout, phase]);

  const closeFullscreen = useCallback(() => {
    clearPrimingTimeout();
    setPhase("idle");
  }, [clearPrimingTimeout]);

  useEffect(() => {
    if (!interactionEnabled) {
      setPhase("idle");
      clearPrimingTimeout();
    }
  }, [clearPrimingTimeout, interactionEnabled]);

  useEffect(
    () => () => {
      clearPrimingTimeout();
    },
    [clearPrimingTimeout]
  );

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
  const primingDurationSeconds = openDelayMs / 1000;
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
              layoutId={layoutId}
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
                  type="button"
                  className="absolute inset-0 z-40 cursor-pointer bg-transparent"
                  aria-label={`Open ${project.title} project`}
                  onPointerEnter={() => {
                    if (canHover) startPriming();
                  }}
                  onPointerLeave={() => {
                    if (canHover) cancelPriming();
                  }}
                  onPointerDown={(event) => {
                    const isTouchLike =
                      event.pointerType === "touch" || event.pointerType === "pen";
                    if (!isTouchLike || canHover) return;
                    event.preventDefault();
                    startPriming();
                  }}
                  onClick={(event) => {
                    if (canHover) {
                      event.preventDefault();
                    }
                  }}
                />
              ) : null}
            </motion.div>
          </motion.div>
        ) : null}
      </div>

      <AnimatePresence>
        {showFullscreen ? (
          <motion.div
            data-focus-fullscreen={cardId}
            data-focus-glass="medium"
            className="fixed inset-0 z-50 backdrop-blur-md"
            style={{ backgroundColor: GLASS_BACKGROUND, willChange: "opacity" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
          >
            <motion.div
              layoutId={layoutId}
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
              <div className="relative z-10 flex h-full flex-col p-6 sm:p-10">
                <button
                  type="button"
                  data-focus-back={cardId}
                  aria-label={`Back from ${project.title} fullscreen`}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-black/40 text-2xl font-bold text-white transition hover:border-brand-apricot hover:text-brand-apricot"
                  onClick={closeFullscreen}
                >
                  {"<"}
                </button>

                <div className="mt-8 max-w-2xl space-y-4">
                  <div className="relative h-16 w-16 overflow-hidden rounded-2xl border border-white/20 bg-black/30">
                    <Image
                      src={project.logoSrc}
                      alt={`${project.title} logo`}
                      fill
                      className="object-contain p-2"
                      sizes="64px"
                    />
                  </div>
                  <p className="text-xs font-bold uppercase tracking-[0.28em] text-brand-apricot">
                    {fullscreenSlogan}
                  </p>
                  <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                    {project.title}
                  </h2>
                  <p className="text-base leading-relaxed text-gray-200 sm:text-lg">
                    {fullscreenDescription}
                  </p>
                </div>

                {isInsurFlow ? (
                  <div className="mt-10 grid max-w-5xl gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
                    <section className="space-y-4">
                      <h3 className="text-sm font-bold uppercase tracking-[0.22em] text-brand-clay">
                        Technical Architecture
                      </h3>
                      <ol className="space-y-3 text-sm text-gray-200 sm:text-base">
                        <li className="rounded-2xl border border-white/10 bg-black/25 px-4 py-3">
                          <strong className="text-brand-apricot">Next.js 16 + React 19:</strong> App
                          Router architecture with client/server boundaries optimized for a fast
                          guided flow.
                        </li>
                        <li className="rounded-2xl border border-white/10 bg-black/25 px-4 py-3">
                          <strong className="text-brand-apricot">TypeScript strict mode:</strong>{" "}
                          End-to-end typed domain models with safer refactors and clearer API
                          contracts.
                        </li>
                        <li className="rounded-2xl border border-white/10 bg-black/25 px-4 py-3">
                          <strong className="text-brand-apricot">PostgreSQL + Drizzle:</strong>{" "}
                          Structured application state and event persistence with migration-first
                          workflow hygiene.
                        </li>
                      </ol>
                    </section>

                    <section className="space-y-4">
                      <h3 className="text-sm font-bold uppercase tracking-[0.22em] text-brand-clay">
                        Engineering Highlights
                      </h3>
                      <ul className="space-y-3 text-sm text-gray-200 sm:text-base">
                        <li className="rounded-2xl border border-white/10 bg-black/25 px-4 py-3">
                          Better Auth integration with guarded route handlers and secure identity
                          boundaries.
                        </li>
                        <li className="rounded-2xl border border-white/10 bg-black/25 px-4 py-3">
                          CI + lint + strict typing + Playwright coverage to keep production quality
                          stable.
                        </li>
                        <li className="rounded-2xl border border-white/10 bg-black/25 px-4 py-3">
                          Modular feature surfaces built for fast iteration without weakening code
                          standards.
                        </li>
                      </ul>
                    </section>
                  </div>
                ) : null}
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </LayoutGroup>
  );
};
