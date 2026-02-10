"use client";

import { useEffect, useRef, useState } from "react";

import Image from "next/image";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { CircleChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { CometCard } from "./comet-card";
import { HandEmbed } from "./hand-embed";

type ProjectLink = {
  label: string;
  href: string;
};

type ProjectCardExpandedProps = {
  title: string;
  slogan: string;
  description: string;
  links: ProjectLink[];
  stack: string[];
  achievements: string[];
  logoSrc: string;
  wordmarkSrc?: string;
  coverSrc: string;
  className?: string;
  brand: {
    primary: string;
    primaryLight: string;
    secondary: string;
    analogous: string;
  };
  onHoldStart?: () => void;
  onHoldEnd?: () => void;
  onDragRelease?: () => void;
  showCue?: boolean;
};

export const ProjectCardExpanded = ({
  title,
  slogan,
  description,
  links,
  stack,
  achievements,
  logoSrc,
  wordmarkSrc,
  coverSrc,
  className,
  brand,
  onHoldStart,
  onHoldEnd,
  onDragRelease,
  showCue = false,
}: ProjectCardExpandedProps) => {
  const baseLength = 24;
  const dragX = useMotionValue(baseLength);
  const dragY = useMotionValue(0);
  const springX = useSpring(dragX, { stiffness: 220, damping: 18 });
  const springY = useSpring(dragY, { stiffness: 220, damping: 18 });
  const wrapperRef = useRef<HTMLDivElement>(null);
  const bumpRef = useRef<HTMLDivElement>(null);
  const bumpAbsX = useMotionValue(0);
  const bumpAbsY = useMotionValue(0);
  const [maxDragX, setMaxDragX] = useState(320);
  const cardX = useTransform(springX, (value) => (value - baseLength) * 0.65);
  const cardY = useTransform(springY, (value) => value * 0.25);
  const cardRotate = useTransform(springY, (value) => value * 0.04);

  useEffect(() => {
    const updateDragBounds = () => {
      const rect = wrapperRef.current?.getBoundingClientRect();
      if (!rect) return;
      const bumpSize = 48;
      const available = window.innerWidth - rect.left - bumpSize;
      const maxX = Math.max(baseLength + 120, available);
      setMaxDragX(maxX);
    };

    updateDragBounds();
    window.addEventListener("resize", updateDragBounds);
    window.addEventListener("scroll", updateDragBounds, { passive: true });
    const observer = new ResizeObserver(() => updateDragBounds());
    if (wrapperRef.current) {
      observer.observe(wrapperRef.current);
    }
    return () => {
      window.removeEventListener("resize", updateDragBounds);
      window.removeEventListener("scroll", updateDragBounds);
      observer.disconnect();
    };
  }, []);

  // Continuous bump position sync using RAF loop
  useEffect(() => {
    if (!showCue) {
      bumpAbsX.set(0);
      bumpAbsY.set(0);
      return;
    }

    let rafId: number;
    const syncBump = () => {
      const rect = bumpRef.current?.getBoundingClientRect();
      if (rect) {
        bumpAbsX.set(rect.right);
        bumpAbsY.set(rect.top + rect.height / 2);
      }
      rafId = requestAnimationFrame(syncBump);
    };

    // Start RAF loop
    rafId = requestAnimationFrame(syncBump);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [showCue, bumpAbsX, bumpAbsY]);

  return (
    <div ref={wrapperRef} className="relative w-full">
      <motion.div style={{ x: cardX, y: cardY, rotateZ: cardRotate }}>
        <CometCard
          className={cn("w-full", className)}
          surfaceClassName="border-white/15 bg-transparent"
          contentClassName="relative overflow-hidden p-7"
          glareOpacity={0.15}
          rotateDepth={8}
          translateDepth={10}
          hoverScale={1.02}
          hoverScaleX={1.03}
          hoverScaleY={1.01}
          glareClassName="mix-blend-screen"
          glareColor="rgba(104, 213, 255, 0.25)"
          glareMidColor="rgba(145, 179, 227, 0.2)"
        >
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${brand.primary} 0%, ${brand.analogous} 48%, ${brand.secondary} 100%)`,
              opacity: 0.18,
            }}
          />
          <div className="relative grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-stretch">
            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <div className="relative h-12 w-12 overflow-hidden rounded-2xl bg-white/10">
                  <Image
                    src={logoSrc}
                    alt={`${title} logo`}
                    fill
                    className="object-contain p-2"
                    sizes="48px"
                  />
                </div>
                <div>
                  {wordmarkSrc ? (
                    <Image
                      src={wordmarkSrc}
                      alt={`${title} wordmark`}
                      width={160}
                      height={32}
                      className="h-6 w-auto"
                    />
                  ) : (
                    <h2 className="text-2xl font-semibold font-alan text-white">{title}</h2>
                  )}
                  <p
                    className="mt-2 text-xs font-alan uppercase tracking-[0.3em]"
                    style={{ color: brand.analogous }}
                  >
                    {slogan}
                  </p>
                </div>
              </div>

              <p className="text-base font-omnes leading-relaxed text-gray-200">{description}</p>

              <div className="flex flex-wrap gap-2">
                {stack.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs"
                    style={{ color: brand.primaryLight }}
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                {achievements.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs"
                    style={{ color: brand.secondary }}
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                {/* TODO: Fix link hover handoff/focus behavior in expanded card. */}
                {links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition"
                    style={{
                      borderColor: brand.primaryLight,
                      color: brand.primaryLight,
                      backgroundColor: "rgba(51, 115, 204, 0.12)",
                    }}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="relative h-full min-h-[260px] overflow-hidden rounded-2xl border border-white/10 bg-white/5 lg:min-h-[320px]">
              <Image
                src={coverSrc}
                alt={`${title} cover`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 520px"
              />
            </div>
          </div>
        </CometCard>
      </motion.div>
      <div className="absolute left-full top-1/2 z-30 -translate-y-1/2">
        <motion.div
          drag
          dragConstraints={{ left: baseLength, right: maxDragX }}
          dragElastic={0.2}
          dragMomentum={false}
          className="relative flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-black/60 shadow-[0_0_24px_rgba(104,213,255,0.25)]"
          style={{ x: dragX, y: dragY }}
          ref={bumpRef}
          onPointerEnter={onHoldStart}
          onPointerDown={onHoldStart}
          onPointerUp={() => {
            dragX.set(baseLength);
            dragY.set(0);
            onHoldEnd?.();
          }}
          onDragEnd={() => {
            dragX.set(baseLength);
            dragY.set(0);
            onDragRelease?.();
          }}
        >
          <span className="absolute inset-0 rounded-full border border-brand-teal-light/40" />
          <span className="absolute inset-0 rounded-full bg-brand-teal-light/20 opacity-70 animate-ping" />
          <CircleChevronRight className="relative h-5 w-5 text-brand-teal-light" />
        </motion.div>
      </div>
      <HandEmbed visible={showCue} y={bumpAbsY} bumpX={bumpAbsX} />
    </div>
  );
};
