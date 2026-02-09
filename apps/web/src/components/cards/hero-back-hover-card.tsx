"use client";

import { useEffect, useRef, useState } from "react";

import { ProjectCardCompact } from "../ui/project-card-compact";
import { ProjectCardExpanded } from "../ui/project-card-expanded";

type ProjectLink = {
  label: string;
  href: string;
};

type ProjectBrand = {
  primary: string;
  primaryLight: string;
  secondary: string;
  analogous: string;
};

type HeroBackHoverCardProps = {
  title: string;
  slogan: string;
  description: string;
  stack: string[];
  logoSrc: string;
  wordmarkSrc?: string;
  status?: string;
  links?: ProjectLink[];
  achievements?: string[];
  coverSrc?: string;
  brand?: ProjectBrand;
  expandedDescription?: string;
  interactive?: boolean;
};

export const HeroBackHoverCard = ({
  title,
  slogan,
  description,
  stack,
  logoSrc,
  wordmarkSrc,
  status,
  links,
  achievements,
  coverSrc,
  brand,
  expandedDescription,
  interactive = false,
}: HeroBackHoverCardProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef<{ x: number; y: number } | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const closeTimerRef = useRef<number | null>(null);

  const clearCloseTimer = () => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const openExpanded = () => {
    clearCloseTimer();
    setIsExpanded(true);
  };

  const scheduleClose = () => {
    clearCloseTimer();
    closeTimerRef.current = window.setTimeout(() => {
      setIsExpanded(false);
    }, 80);
  };

  useEffect(() => () => clearCloseTimer(), []);
  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      pointerRef.current = { x: event.clientX, y: event.clientY };
    };
    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);
  useEffect(() => {
    if (!interactive) {
      setIsExpanded(false);
      return;
    }

    const rect = wrapperRef.current?.getBoundingClientRect();
    const pointer = pointerRef.current;
    if (!rect || !pointer) return;
    if (
      pointer.x >= rect.left &&
      pointer.x <= rect.right &&
      pointer.y >= rect.top &&
      pointer.y <= rect.bottom
    ) {
      openExpanded();
    }
  }, [interactive]);

  const resolvedBrand =
    brand ??
    ({
      primary: "#3373CC",
      primaryLight: "#91B3E3",
      secondary: "#92F189",
      analogous: "#68D5FF",
    } satisfies ProjectBrand);

  const resolvedLinks = links ?? [];
  const resolvedAchievements = achievements ?? [];
  const resolvedCover = coverSrc ?? "/logos/tandem/cover.png";
  const resolvedDescription = expandedDescription ?? description;

  return (
    <div ref={wrapperRef} className="relative">
      <div
        className={
          isExpanded
            ? "pointer-events-none opacity-0 transition-opacity duration-200"
            : "pointer-events-auto opacity-100 transition-opacity duration-200"
        }
        onPointerEnter={interactive ? openExpanded : undefined}
        onPointerLeave={interactive ? scheduleClose : undefined}
      >
        <ProjectCardCompact
          className="max-w-[380px]"
          title={title}
          slogan={slogan}
          description={description}
          stack={stack}
          logoSrc={logoSrc}
          wordmarkSrc={wordmarkSrc}
          interactive={interactive}
        />
      </div>
      <div
        className={
          isExpanded
            ? "pointer-events-auto absolute left-0 top-0 z-20 w-[720px] origin-top-left scale-100 opacity-100 transition duration-300"
            : "pointer-events-none absolute left-0 top-0 z-20 w-[720px] origin-top-left scale-[0.5] opacity-0 transition duration-300"
        }
        onPointerEnter={isExpanded ? openExpanded : undefined}
        onPointerLeave={isExpanded ? scheduleClose : undefined}
      >
        <ProjectCardExpanded
          className="max-w-none"
          title={title}
          slogan={slogan}
          description={resolvedDescription}
          status={status}
          links={resolvedLinks}
          stack={[...stack, "Realtime", "Trusted Reviews"]}
          achievements={resolvedAchievements}
          logoSrc={logoSrc}
          wordmarkSrc={wordmarkSrc}
          coverSrc={resolvedCover}
          brand={resolvedBrand}
        />
      </div>
    </div>
  );
};
