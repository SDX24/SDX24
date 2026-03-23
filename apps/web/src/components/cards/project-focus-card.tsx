"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

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

const toCardId = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const ProjectFocusCard = ({
  project,
  featured = false,
  enableFullscreen = false,
  openDelayMs = 2200,
  showCompactLinks = false,
}: ProjectFocusCardProps) => {
  const prefersReducedMotion = useReducedMotion();
  const cardId = useMemo(() => toCardId(project.title), [project.title]);
  const layoutId = useMemo(() => `project-focus-shell-${cardId}`, [cardId]);
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
    document.body.style.overflow = "hidden";
    document.body.style.overscrollBehavior = "none";

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.overscrollBehavior = originalOverscroll;
    };
  }, [phase]);

  const showFeaturedDecoration = featured && phase !== "open";
  const animateFeaturedDecoration = showFeaturedDecoration && !prefersReducedMotion;
  const showPriming = interactionEnabled && phase === "priming";
  const showFullscreen = interactionEnabled && phase === "open";
  const showCompact = !showFullscreen;

  return (
    <LayoutGroup id={`project-focus-${cardId}`}>
      <div data-focus-card={cardId} data-focus-phase={phase} className="relative">
        {showCompact ? (
          <motion.div
            className="relative"
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
              />

              <AnimatePresence>
                {showPriming ? (
                  <motion.div
                    data-focus-priming-overlay={cardId}
                    className="pointer-events-none absolute inset-0 z-30"
                    initial={{ opacity: 0.15, scale: 0.05, borderRadius: 999 }}
                    animate={{ opacity: 0.55, scale: 1, borderRadius: 26 }}
                    exit={{ opacity: 0, scale: 0.08, borderRadius: 999 }}
                    transition={{
                      scale: { duration: openDelayMs / 1000, ease: [0.2, 0.9, 0.25, 1] },
                      borderRadius: { duration: openDelayMs / 1000, ease: "easeInOut" },
                      opacity: { duration: 0.3, ease: "easeOut" },
                    }}
                    style={{
                      background:
                        "radial-gradient(circle at center, rgba(239,111,108,0.75) 0%, rgba(0,169,145,0.52) 58%, rgba(0,0,0,0.1) 100%)",
                    }}
                  >
                    <motion.div
                      className="absolute inset-0"
                      animate={prefersReducedMotion ? undefined : { opacity: [0.4, 0.7, 0.4] }}
                      transition={
                        prefersReducedMotion
                          ? undefined
                          : { duration: 0.85, repeat: Infinity, ease: "easeInOut" }
                      }
                      style={{
                        background:
                          "radial-gradient(circle at center, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 68%)",
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
            className="fixed inset-0 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <motion.div
              layoutId={layoutId}
              transition={CARD_MORPH_TRANSITION}
              className="relative h-full w-full overflow-hidden bg-black"
              style={{ borderRadius: 0 }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_15%,rgba(239,111,108,0.25),transparent_45%),radial-gradient(circle_at_85%_20%,rgba(0,169,145,0.22),transparent_40%),linear-gradient(135deg,rgba(0,36,31,0.94),rgba(0,0,0,0.98))]" />
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
                  <p className="text-xs font-bold uppercase tracking-[0.28em] text-brand-apricot">
                    {project.slogan}
                  </p>
                  <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                    {project.title}
                  </h2>
                  <p className="text-base leading-relaxed text-gray-200 sm:text-lg">
                    {project.description}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </LayoutGroup>
  );
};
