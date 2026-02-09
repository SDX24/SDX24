"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import Image from "next/image";

import { ScrollTrigger, gsap } from "@/lib/motion";
import { cn } from "@/lib/utils";

import { MainTealCard } from "../ui/main-teal-card";
import { ProjectCardCompact } from "../ui/project-card-compact";
import { HeroBackHoverCard } from "./hero-back-hover-card";

type HeroPhotoCardProps = {
  className?: string;
  contentClassName?: string;
  imageSrc?: string;
  imageAlt?: string;
  name?: string;
  role?: string;
  sizes?: string;
  project?: {
    title: string;
    slogan: string;
    description: string;
    stack: string[];
    logoSrc: string;
    wordmarkSrc?: string;
    status?: string;
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
};

export const HeroPhotoCard = ({
  className,
  contentClassName,
  imageSrc = "/images/profile.jpg",
  imageAlt = "Stefan Dorosh profile",
  name = "Stefan Dorosh",
  role = "Full-stack web developer",
  sizes = "(max-width: 640px) 100vw, 360px",
  project = {
    title: "Tandem",
    slogan: "Bridging work and childcare",
    description:
      "Tandem helps parents in the trades balance work and childcare with AI scheduling, trusted care, and shared support.",
    stack: ["AI Scheduling", "Nanny Booking", "Care Sharing"],
    logoSrc: "/logos/tandem/tandem-logo.svg",
    wordmarkSrc: "/logos/tandem/wordmark.svg",
    status: "Live",
    links: [
      { label: "Blog", href: "https://tandem-blog.vercel.app" },
      { label: "Repo", href: "https://github.com/IDSP-TRADECARE/Tandem" },
    ],
    achievements: ["Trust", "Balance", "Support"],
    coverSrc: "/logos/tandem/cover.png",
    brand: {
      primary: "#3373CC",
      primaryLight: "#91B3E3",
      secondary: "#92F189",
      analogous: "#68D5FF",
    },
    expandedDescription:
      "Tandem is built for trade parents who need dependable childcare and smart scheduling. It blends AI planning, trusted care networks, and community sharing to reduce stress and keep families supported.",
  },
}: HeroPhotoCardProps) => (
  <HeroPhotoCardInner
    className={className}
    contentClassName={contentClassName}
    imageSrc={imageSrc}
    imageAlt={imageAlt}
    name={name}
    role={role}
    sizes={sizes}
    project={project}
  />
);

type HeroPhotoCardInnerProps = Required<
  Omit<HeroPhotoCardProps, "className" | "contentClassName">
> & {
  className?: string;
  contentClassName?: string;
};

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const mapRange = (value: number, inMin: number, inMax: number, outMin: number, outMax: number) => {
  if (inMax === inMin) return outMin;
  return outMin + ((value - inMin) / (inMax - inMin)) * (outMax - outMin);
};

const computeFlipAngle = (progress: number) => {
  if (progress <= 0.15) {
    return mapRange(progress, 0, 0.15, 0, -40);
  }
  if (progress <= 0.85) {
    return mapRange(progress, 0.15, 0.85, -40, -140);
  }
  return mapRange(progress, 0.85, 1, -140, -180);
};

const HeroPhotoCardInner = ({
  className,
  contentClassName,
  imageSrc,
  imageAlt,
  name,
  role,
  sizes,
  project,
}: HeroPhotoCardInnerProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const flipRef = useRef<HTMLDivElement>(null);
  const travelRef = useRef({ x: 0, y: 0, arc: 0 });
  const stateRef = useRef({ showBack: false, isFlipping: false, isLanded: false, isMoving: false });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [showBack, setShowBack] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const [isLanded, setIsLanded] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [targetPosition, setTargetPosition] = useState<{
    top: number;
    left: number;
    width: number;
  } | null>(null);

  const updateTarget = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    const leftAnchor = document.querySelector("[data-hero-left]");
    const rect = card.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const rightMargin = viewportWidth - rect.right;
    const anchorRect =
      leftAnchor instanceof HTMLElement ? leftAnchor.getBoundingClientRect() : null;
    const targetLeft = anchorRect ? anchorRect.left : rightMargin;
    const targetTopBase = anchorRect
      ? anchorRect.top + (anchorRect.height - rect.height) / 2
      : (window.innerHeight - rect.height) / 2;
    const targetTop = targetTopBase;

    travelRef.current = {
      x: Math.round(targetLeft - rect.left),
      y: Math.round(targetTop - rect.top),
      arc: Math.round(window.innerHeight * 0.896),
    };

    setTargetPosition({
      top: Math.round(targetTop),
      left: Math.round(targetLeft),
      width: rect.width,
    });
    ScrollTrigger.refresh();
  }, []);

  useEffect(() => {
    updateTarget();
    const observer = new ResizeObserver(() => updateTarget());
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    window.addEventListener("resize", updateTarget);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateTarget);
    };
  }, [updateTarget]);

  useEffect(() => {
    if (!cardRef.current || !flipRef.current) return;

    const context = gsap.context(() => {
      const setX = gsap.quickSetter(cardRef.current, "x", "px");
      const setY = gsap.quickSetter(cardRef.current, "y", "px");
      const flipElement = flipRef.current;

      const updateState = (
        key: keyof typeof stateRef.current,
        value: boolean,
        setter: (next: boolean) => void
      ) => {
        if (stateRef.current[key] === value) return;
        stateRef.current[key] = value;
        setter(value);
      };

      const trigger = ScrollTrigger.create({
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          const progress = self.progress;
          const moveProgress = clamp(progress / 0.7, 0, 1);
          const flipProgress = clamp((progress - 0.02) / 0.68, 0, 1);

          const moving = progress > 0.02 && progress < 0.7;
          const landed = progress >= 0.7;
          const flipping = flipProgress > 0.05 && flipProgress < 0.95;
          const back = flipProgress >= 0.5;

          const { x, y, arc } = travelRef.current;
          const translateX = x * moveProgress;
          const translateY = y * moveProgress + arc * moveProgress;
          const angle = prefersReducedMotion ? 0 : computeFlipAngle(flipProgress);

          if (prefersReducedMotion || landed) {
            setX(0);
            setY(0);
          } else {
            setX(translateX);
            setY(translateY);
          }

          if (flipElement) {
            flipElement.style.transform = `rotate3d(1, 1, 0, ${angle}deg)`;
          }

          updateState("isMoving", moving, setIsMoving);
          updateState("isLanded", landed, setIsLanded);
          updateState("isFlipping", flipping, setIsFlipping);
          updateState("showBack", back, setShowBack);
        },
      });

      return () => {
        trigger.kill();
      };
    }, cardRef);

    return () => context.revert();
  }, [prefersReducedMotion]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setPrefersReducedMotion(mediaQuery.matches);
    updateMotion();
    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", updateMotion);
      return () => mediaQuery.removeEventListener("change", updateMotion);
    }
    mediaQuery.addListener(updateMotion);
    return () => mediaQuery.removeListener(updateMotion);
  }, []);

  const shouldPin = isLanded && targetPosition;
  const disableMotion = isMoving || isFlipping;

  return (
    <div
      ref={cardRef}
      style={{
        position: shouldPin ? "fixed" : undefined,
        top: shouldPin ? targetPosition?.top : undefined,
        left: shouldPin ? targetPosition?.left : undefined,
        width: shouldPin ? targetPosition?.width : undefined,
      }}
      className={cn(
        "w-full min-w-[300px] max-w-[380px] will-change-transform",
        disableMotion ? "pointer-events-none" : undefined,
        className
      )}
    >
      <div style={{ perspective: "1200px" }}>
        <div ref={flipRef} className="relative" style={{ transformStyle: "preserve-3d" }}>
          <div
            className={
              showBack
                ? "pointer-events-none absolute inset-0 opacity-0"
                : "absolute inset-0 opacity-100"
            }
            style={{ backfaceVisibility: "hidden" }}
          >
            <MainTealCard
              className="max-w-[380px]"
              contentClassName={contentClassName}
              interactive={!disableMotion}
            >
              <div className="relative h-0 w-full overflow-hidden rounded-[18px] pb-[120%]">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  className="absolute inset-0 h-full w-full rounded-[18px] border border-white/10 object-cover"
                  sizes={sizes}
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-4 pb-4 pt-12">
                  <p className="text-lg font-semibold text-white">{name}</p>
                  <p className="text-sm text-gray-200">{role}</p>
                </div>
              </div>
            </MainTealCard>
          </div>
          <div
            className={
              showBack
                ? "absolute inset-0 opacity-100"
                : "pointer-events-none absolute inset-0 opacity-0"
            }
            style={{
              backfaceVisibility: "hidden",
              transform: "rotate3d(1, 1, 0, 180deg)",
            }}
          >
            <HeroBackHoverCard
              title={project.title}
              slogan={project.slogan}
              description={project.description}
              stack={project.stack}
              logoSrc={project.logoSrc}
              wordmarkSrc={project.wordmarkSrc}
              status={project.status}
              links={project.links}
              achievements={project.achievements}
              coverSrc={project.coverSrc}
              brand={project.brand}
              expandedDescription={project.expandedDescription}
              interactive={isLanded && showBack}
            />
          </div>
          <div className="invisible">
            <ProjectCardCompact
              className="max-w-[380px]"
              title={project.title}
              slogan={project.slogan}
              description={project.description}
              stack={project.stack}
              logoSrc={project.logoSrc}
              wordmarkSrc={project.wordmarkSrc}
              interactive={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
