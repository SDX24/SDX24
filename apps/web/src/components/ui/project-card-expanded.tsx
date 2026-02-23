"use client";

import { useEffect, useRef, useState } from "react";

import Image from "next/image";

import {
  animate,
  motion,
  useDragControls,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
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
  onCardDismiss?: () => void;
  showCue?: boolean;
  showDragCue?: boolean;
  interactive?: boolean;
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
  onCardDismiss,
  showCue = false,
  showDragCue = true,
  interactive = true,
}: ProjectCardExpandedProps) => {
  const baseLength = 24;
  const dragX = useMotionValue(baseLength);
  const dragY = useMotionValue(0);
  const bumpFlyX = useMotionValue(0);
  const bumpFlyOpacity = useMotionValue(1);
  const springX = useSpring(dragX, { stiffness: 220, damping: 18 });
  const springY = useSpring(dragY, { stiffness: 220, damping: 18 });
  const cardFlyX = useMotionValue(0);
  const cardFlyY = useMotionValue(0);
  const cardFlyRotate = useMotionValue(0);
  const cardFlyOpacity = useMotionValue(1);
  const dragControls = useDragControls();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const bumpRef = useRef<HTMLDivElement>(null);
  const bumpAbsX = useMotionValue(0);
  const bumpAbsY = useMotionValue(0);
  const [maxDragX, setMaxDragX] = useState(320);
  const [isSnapped, setIsSnapped] = useState(false);
  const [isFlyingAway, setIsFlyingAway] = useState(false);
  const [cueAbsX, setCueAbsX] = useState(0);
  const isDraggingRef = useRef(false);
  const isFlyingAwayRef = useRef(false);
  const isSnappedRef = useRef(false);
  const snapTargetXRef = useRef<number | null>(null);
  const snapTargetYRef = useRef<number | null>(null);
  const pointerXRef = useRef<number>(0);
  const cardX = useTransform(springX, (value) => (value - baseLength) * 0.65);
  const cardY = useTransform(springY, (value) => value * 0.25);
  const cardRotate = useTransform(springY, (value) => value * 0.04);

  const triggerFlyAway = () => {
    if (isFlyingAwayRef.current) return;

    const currentSpringX = springX.get();
    const currentSpringY = springY.get();
    const currentCardX = (currentSpringX - baseLength) * 0.65;
    const currentCardY = currentSpringY * 0.25;
    const currentCardRotate = currentSpringY * 0.04;

    cardFlyX.set(currentCardX);
    cardFlyY.set(currentCardY);
    cardFlyRotate.set(currentCardRotate);

    isFlyingAwayRef.current = true;
    setIsFlyingAway(true);

    const currentDragX = dragX.get();
    bumpFlyX.set(currentDragX);

    // Card flies left
    animate(cardFlyX, currentCardX - 800, { duration: 0.8, ease: "easeInOut" });
    animate(cardFlyY, currentCardY + (Math.random() * 200 - 100), {
      duration: 0.8,
      ease: "easeInOut",
    });
    animate(cardFlyRotate, 0, { duration: 0.6, ease: "easeOut" });
    animate(cardFlyOpacity, 0, { duration: 0.6, delay: 0.2 }).then(() => {
      setTimeout(() => {
        onCardDismiss?.();
      }, 100);
    });

    // Bump exits to the right
    animate(bumpFlyX, currentDragX + 240, { duration: 0.55, ease: "easeInOut" });
    animate(bumpFlyOpacity, 0, { duration: 0.45, ease: "easeOut" });
  };

  const handleRelease = () => {
    const releasedWhileSnapped = isSnappedRef.current;

    isDraggingRef.current = false;
    isSnappedRef.current = false;
    snapTargetXRef.current = null;
    snapTargetYRef.current = null;
    setIsSnapped(false);

    if (releasedWhileSnapped) {
      triggerFlyAway();
      return;
    }

    if (!isFlyingAwayRef.current) {
      dragX.set(baseLength);
      dragY.set(0);
    }
  };

  // Reset snap state when showCue changes
  useEffect(() => {
    if (!showCue) {
      isSnappedRef.current = false;
      snapTargetXRef.current = null;
      snapTargetYRef.current = null;
      isFlyingAwayRef.current = false;
      setIsFlyingAway(false);
      setIsSnapped(false);
      cardFlyX.set(0);
      cardFlyY.set(0);
      cardFlyRotate.set(0);
      cardFlyOpacity.set(1);
      bumpFlyOpacity.set(1);
    }
  }, [showCue, bumpFlyOpacity, cardFlyOpacity, cardFlyRotate, cardFlyX, cardFlyY]);

  useEffect(() => {
    const updateDragBounds = () => {
      const rect = wrapperRef.current?.getBoundingClientRect();
      if (!rect) return;
      const bumpSize = 48;
      const available = window.innerWidth - rect.left - bumpSize;
      const maxX = Math.max(baseLength + 120, available);
      setMaxDragX(maxX);

      // Update cue absolute position
      const cueX = window.innerWidth - 40; // 16px inset + 24px (half cue size)
      setCueAbsX(cueX);
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

  // Track pointer position and handle magnetic snap
  useEffect(() => {
    if (!showCue) {
      setIsSnapped(false);
      return;
    }

    let rafId: number;
    const loop = () => {
      if (!isDraggingRef.current) {
        rafId = requestAnimationFrame(loop);
        return;
      }

      const bumpRect = bumpRef.current?.getBoundingClientRect();
      const wrapperRect = wrapperRef.current?.getBoundingClientRect();
      if (!bumpRect || !wrapperRect) {
        rafId = requestAnimationFrame(loop);
        return;
      }

      const originX = wrapperRect.right + baseLength;
      const originY = wrapperRect.top + wrapperRect.height / 2;

      // Calculate current cue Y position based on bump's Y position
      const currentBumpY = bumpRect.top + bumpRect.height / 2;
      const dynamicCueY = currentBumpY; // Cue follows bump vertically

      // When snapped, calculate line length based on pointer position
      // When not snapped, use actual bump position
      let lineLength: number;
      if (isSnappedRef.current) {
        // Calculate distance from pointer to cue (for release detection)
        const pointerToCueDistance = cueAbsX - pointerXRef.current;
        lineLength = pointerToCueDistance;
      } else {
        lineLength = cueAbsX - bumpRect.right;
      }

      const SNAP_LINE_LENGTH = 30; // Snap when line is this short
      const RELEASE_LINE_LENGTH = 120; // Release when line grows beyond this (dragged far away)
      const RELEASE_PULLBACK = -150; // Release when pulled back past cue (negative = behind cue)

      const targetDragX = cueAbsX - originX;
      const targetDragY = dynamicCueY - originY;

      if (lineLength < SNAP_LINE_LENGTH && lineLength > -30 && !isSnappedRef.current) {
        isSnappedRef.current = true;
        snapTargetXRef.current = targetDragX;
        snapTargetYRef.current = targetDragY;
        dragX.set(targetDragX);
        dragY.set(targetDragY);
        setIsSnapped(true);
      } else if (
        isSnappedRef.current &&
        (lineLength > RELEASE_LINE_LENGTH || lineLength < RELEASE_PULLBACK)
      ) {
        isSnappedRef.current = false;
        snapTargetXRef.current = null;
        snapTargetYRef.current = null;
        setIsSnapped(false);
      }

      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [showCue, cueAbsX, isSnapped, dragX, dragY, baseLength]);

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
      <motion.div
        style={{
          x: isFlyingAway ? cardFlyX : cardX,
          y: isFlyingAway ? cardFlyY : cardY,
          rotateZ: isFlyingAway ? cardFlyRotate : cardRotate,
          opacity: cardFlyOpacity,
        }}
      >
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
          interactive={interactive}
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
      {showDragCue ? (
        <>
          <div className="absolute left-full top-1/2 z-30 -translate-y-1/2">
            <motion.div
              drag
              dragControls={dragControls}
              dragConstraints={{ left: baseLength, right: maxDragX }}
              dragElastic={0.2}
              dragMomentum={false}
              onDrag={(_, info) => {
                pointerXRef.current = info.point.x;

                if (
                  isSnappedRef.current &&
                  snapTargetXRef.current !== null &&
                  snapTargetYRef.current !== null
                ) {
                  dragX.set(snapTargetXRef.current);
                  dragY.set(snapTargetYRef.current);
                }
              }}
              className={cn(
                "relative flex h-12 w-12 items-center justify-center rounded-full border transition-colors duration-200",
                isSnapped
                  ? "border-[#92F189]/60 bg-black/70 shadow-[0_0_32px_rgba(146,241,137,0.4)]"
                  : "border-white/15 bg-black/60 shadow-[0_0_24px_rgba(104,213,255,0.25)]"
              )}
              style={{
                x: isFlyingAway ? bumpFlyX : dragX,
                y: dragY,
                opacity: isFlyingAway ? bumpFlyOpacity : 1,
              }}
              ref={bumpRef}
              onPointerEnter={onHoldStart}
              onPointerDown={() => {
                isDraggingRef.current = true;
                onHoldStart?.();
              }}
              onPointerUp={() => {
                handleRelease();
                onHoldEnd?.();
              }}
              onDragEnd={() => {
                handleRelease();
                onDragRelease?.();
              }}
            >
              <span
                className={cn(
                  "absolute inset-0 rounded-full border transition-colors duration-200",
                  isSnapped ? "border-[#92F189]/50" : "border-brand-teal-light/40"
                )}
              />

              <span
                className={cn(
                  "absolute inset-0 rounded-full opacity-70 transition-colors duration-200",
                  isSnapped ? "bg-[#92F189]/30" : "bg-brand-teal-light/20"
                )}
              />
              <CircleChevronRight
                className={cn(
                  "relative h-5 w-5 transition-colors duration-200",
                  isSnapped ? "text-[#92F189]" : "text-brand-teal-light"
                )}
              />
            </motion.div>
          </div>
          <HandEmbed
            visible={showCue}
            y={bumpAbsY}
            bumpX={bumpAbsX}
            isSnapped={isSnapped}
            isFlyingAway={isFlyingAway}
          />
        </>
      ) : null}
    </div>
  );
};
