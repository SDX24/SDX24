"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import Image from "next/image";

import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";

import { MainTealCard } from "./ui/main-teal-card";
import { ProjectCardCompact } from "./ui/project-card-compact";

type ProjectCompactData = {
  title: string;
  slogan: string;
  description: string;
  stack: string[];
  logoSrc: string;
  wordmarkSrc?: string;
};

type HeroFlipCardProps = {
  imageSrc: string;
  imageAlt: string;
  name: string;
  role: string;
  project: ProjectCompactData;
};

export const HeroFlipCard = ({ imageSrc, imageAlt, name, role, project }: HeroFlipCardProps) => {
  const { scrollYProgress } = useScroll();
  const prefersReducedMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);

  const [travelX, setTravelX] = useState(0);
  const [travelY, setTravelY] = useState(0);
  const [arcDrop, setArcDrop] = useState(0);
  const [isMoving, setIsMoving] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const [isLanded, setIsLanded] = useState(false);
  const [showBack, setShowBack] = useState(false);
  const [targetPosition, setTargetPosition] = useState<{
    top: number;
    left: number;
    width: number;
  } | null>(null);

  const updateTravel = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    const leftAnchor = document.querySelector("[data-hero-left]");
    const rect = card.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const rightMargin = viewportWidth - rect.right;
    const anchorRect =
      leftAnchor instanceof HTMLElement ? leftAnchor.getBoundingClientRect() : null;
    const targetLeft = anchorRect ? anchorRect.left : rightMargin;
    setTravelX(targetLeft - rect.left);
    const targetTopBase = anchorRect
      ? anchorRect.top + (anchorRect.height - rect.height) / 2
      : (window.innerHeight - rect.height) / 2;
    const targetTop = targetTopBase;
    setTravelY(Math.round(targetTop - rect.top));
    setArcDrop(Math.round(window.innerHeight * 0.896));
    setTargetPosition({
      top: Math.round(targetTop),
      left: Math.round(targetLeft),
      width: rect.width,
    });
  }, []);

  useEffect(() => {
    updateTravel();
    const observer = new ResizeObserver(() => updateTravel());
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    window.addEventListener("resize", updateTravel);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateTravel);
    };
  }, [updateTravel]);

  const moveX = useTransform(scrollYProgress, [0, 0.7], [0, travelX]);
  const moveYBase = useTransform(scrollYProgress, [0, 0.7], [0, travelY]);
  const arcY = useTransform(scrollYProgress, [0, 0.7], [0, arcDrop]);
  const moveY = useTransform([moveYBase, arcY], ([base, arc]) => {
    const baseValue = typeof base === "number" ? base : 0;
    const arcValue = typeof arc === "number" ? arc : 0;
    return baseValue + arcValue;
  });
  const flipProgress = useTransform(scrollYProgress, [0.1, 0.35], [0, 1]);
  const flipRotation = useTransform(flipProgress, [0, 1], [0, 180]);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setIsMoving(value > 0.02 && value < 0.7);
    setIsLanded(value >= 0.7);
  });

  useMotionValueEvent(flipProgress, "change", (value) => {
    const clamped = Math.min(Math.max(value, 0), 1);
    const flipping = clamped > 0.05 && clamped < 0.95;
    setIsFlipping(flipping);
    setShowBack(clamped >= 0.5);
  });

  const shouldPin = isLanded && targetPosition;
  const translateX = prefersReducedMotion || shouldPin ? 0 : moveX;
  const translateY = prefersReducedMotion || shouldPin ? 0 : moveY;
  const rotateY = prefersReducedMotion ? 0 : flipRotation;
  const disableMotion = isMoving || isFlipping;

  return (
    <motion.div
      ref={cardRef}
      style={{
        x: translateX,
        y: translateY,
        position: shouldPin ? "fixed" : undefined,
        top: shouldPin ? targetPosition?.top : undefined,
        left: shouldPin ? targetPosition?.left : undefined,
        width: shouldPin ? targetPosition?.width : undefined,
      }}
      className={disableMotion ? "pointer-events-none" : undefined}
    >
      <div style={{ perspective: "1200px" }}>
        <motion.div className="relative" style={{ rotateY, transformStyle: "preserve-3d" }}>
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
              contentClassName="p-4"
              interactive={!disableMotion}
              showGlare
              hoverScale={disableMotion ? 1 : undefined}
              hoverScaleX={disableMotion ? 1 : undefined}
              hoverScaleY={disableMotion ? 1 : undefined}
            >
              <div className="relative h-0 w-full overflow-hidden rounded-[18px] pb-[120%]">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  className="absolute inset-0 h-full w-full rounded-[18px] border border-white/10 object-cover"
                  sizes="(max-width: 640px) 100vw, 360px"
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
                ? "absolute inset-0 opacity-100 [transform:rotateY(180deg)]"
                : "pointer-events-none absolute inset-0 opacity-0 [transform:rotateY(180deg)]"
            }
            style={{ backfaceVisibility: "hidden" }}
          >
            <ProjectCardCompact
              className="max-w-[380px]"
              title={project.title}
              slogan={project.slogan}
              description={project.description}
              stack={project.stack}
              logoSrc={project.logoSrc}
              wordmarkSrc={project.wordmarkSrc}
              interactive={isLanded}
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
        </motion.div>
      </div>
    </motion.div>
  );
};
