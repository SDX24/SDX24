"use client";

import { useEffect, useRef, useState } from "react";

import Image from "next/image";

import { motion, useDragControls, useMotionValue, useSpring, useTransform } from "framer-motion";
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
  const dragControls = useDragControls();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const bumpRef = useRef<HTMLDivElement>(null);
  const bumpAbsX = useMotionValue(0);
  const bumpAbsY = useMotionValue(0);
  const [maxDragX, setMaxDragX] = useState(320);
  const [isSnapped, setIsSnapped] = useState(false);
  const [cueAbsX, setCueAbsX] = useState(0);
  const [cueAbsY, setCueAbsY] = useState(0);
  const isDraggingRef = useRef(false);
  const isSnappedRef = useRef(false);
  const snapTargetXRef = useRef<number | null>(null);
  const snapTargetYRef = useRef<number | null>(null);
  const pointerXRef = useRef<number>(0);
  const pointerYRef = useRef<number>(0);
  const cardX = useTransform(springX, (value) => (value - baseLength) * 0.65);
  const cardY = useTransform(springY, (value) => value * 0.25);
  const cardRotate = useTransform(springY, (value) => value * 0.04);

  // Reset snap state when showCue changes
  useEffect(() => {
    if (!showCue) {
      isSnappedRef.current = false;
      snapTargetXRef.current = null;
      snapTargetYRef.current = null;
      setIsSnapped(false);
    }
  }, [showCue]);

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
      const cueY = rect.top + rect.height / 2;
      setCueAbsX(cueX);
      setCueAbsY(cueY);
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
      // Reset snap state when cue is hidden
      console.log("❌ Cue hidden, resetting snap");
      setIsSnapped(false);
      return;
    }

    console.log(
      `🔄 Snap effect initialized: showCue=${showCue}, cueAbsX=${cueAbsX}, cueAbsY=${cueAbsY}, isSnapped=${isSnapped}`
    );

    // Delay snap detection to allow card expansion animation to complete
    const initDelay = setTimeout(() => {
      console.log("✅ Snap detection ready");
    }, 350);

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

      // Debug logging (throttled)
      if (Math.random() < 0.05) {
        // Only log 5% of frames
        console.log(
          `[SNAP DEBUG] lineLength=${lineLength.toFixed(1)}, isSnapped=${isSnappedRef.current}, bumpY=${currentBumpY.toFixed(1)}, cueY=${dynamicCueY.toFixed(1)}, targetDragY=${targetDragY.toFixed(1)}`
        );
      }

      if (lineLength < SNAP_LINE_LENGTH && lineLength > -30 && !isSnappedRef.current) {
        console.log(
          `🧲 SNAPPING! lineLength=${lineLength.toFixed(1)} (${lineLength > 0 ? "approaching" : "overshot"}), bumpY=${currentBumpY.toFixed(1)}, snap target=(${targetDragX.toFixed(1)}, ${targetDragY.toFixed(1)})`
        );
        // Use ref for synchronous check
        isSnappedRef.current = true;
        snapTargetXRef.current = targetDragX;
        snapTargetYRef.current = targetDragY;
        // Set position immediately
        dragX.set(targetDragX);
        dragY.set(targetDragY);
        console.log(
          `✅ Snap engaged, position locked at: (${targetDragX.toFixed(1)}, ${targetDragY.toFixed(1)})`
        );
        // Update state for UI
        setIsSnapped(true);
      } else if (
        isSnappedRef.current &&
        (lineLength > RELEASE_LINE_LENGTH || lineLength < RELEASE_PULLBACK)
      ) {
        console.log(
          `🔓 RELEASING SNAP: lineLength=${lineLength.toFixed(1)}, reason=${lineLength > RELEASE_LINE_LENGTH ? "dragged far" : "pulled back past cue"}`
        );
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
      clearTimeout(initDelay);
    };
  }, [showCue, cueAbsX, cueAbsY, isSnapped, dragX, dragY, baseLength]);

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
          dragControls={dragControls}
          dragConstraints={{ left: baseLength, right: maxDragX }}
          dragElastic={0.2}
          dragMomentum={false}
          onDrag={(_, info) => {
            // Track pointer position for release detection
            pointerXRef.current = info.point.x;
            pointerYRef.current = info.point.y;

            // When snapped, override position to stay locked
            if (
              isSnappedRef.current &&
              snapTargetXRef.current !== null &&
              snapTargetYRef.current !== null
            ) {
              dragX.set(snapTargetXRef.current);
              dragY.set(snapTargetYRef.current);
              if (Math.random() < 0.1) {
                console.log("🔒 Drag override - forcing snap position");
              }
            }
          }}
          className={cn(
            "relative flex h-12 w-12 items-center justify-center rounded-full border transition-colors duration-200",
            isSnapped
              ? "border-[#92F189]/60 bg-black/70 shadow-[0_0_32px_rgba(146,241,137,0.4)]"
              : "border-white/15 bg-black/60 shadow-[0_0_24px_rgba(104,213,255,0.25)]"
          )}
          style={{ x: dragX, y: dragY }}
          ref={bumpRef}
          onPointerEnter={onHoldStart}
          onPointerDown={() => {
            console.log("🖱️ POINTER DOWN - Starting drag");
            isDraggingRef.current = true;
            onHoldStart?.();
          }}
          onPointerUp={() => {
            console.log("🖱️ POINTER UP - Ending drag");
            isDraggingRef.current = false;
            isSnappedRef.current = false;
            snapTargetXRef.current = null;
            snapTargetYRef.current = null;
            setIsSnapped(false);
            dragX.set(baseLength);
            dragY.set(0);
            onHoldEnd?.();
          }}
          onDragEnd={() => {
            console.log("🖱️ DRAG END");
            isDraggingRef.current = false;
            isSnappedRef.current = false;
            snapTargetXRef.current = null;
            snapTargetYRef.current = null;
            setIsSnapped(false);
            dragX.set(baseLength);
            dragY.set(0);
            onDragRelease?.();
          }}
        >
          <span
            className={cn(
              "absolute inset-0 rounded-full border transition-colors duration-200",
              isSnapped ? "border-[#92F189]/50" : "border-brand-teal-light/40"
            )}
          />
          <motion.span
            className="absolute inset-0 rounded-full bg-[#92F189]"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: isSnapped ? 1 : 0,
              opacity: isSnapped ? 0.25 : 0,
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
          <span
            className={cn(
              "absolute inset-0 rounded-full opacity-70 animate-ping transition-colors duration-200",
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
      <HandEmbed visible={showCue} y={bumpAbsY} bumpX={bumpAbsX} isSnapped={isSnapped} />
    </div>
  );
};
