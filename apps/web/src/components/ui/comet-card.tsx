"use client";

import React, { useCallback, useEffect, useMemo, useRef } from "react";

import {
  type MotionProps,
  type MotionValue,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";

import { cn } from "@/lib/utils";

type SpringConfig = {
  stiffness?: number;
  damping?: number;
  mass?: number;
};

export type CometCardProps = {
  rotateDepth?: number;
  translateDepth?: number;
  hoverScale?: number;
  hoverScaleX?: number;
  hoverScaleY?: number;
  hoverDuration?: number;
  hoverSpringConfig?: SpringConfig;
  fluidStrength?: number;
  fluidMax?: number;
  springConfig?: SpringConfig;
  glareSpringConfig?: SpringConfig;
  flipSpringConfig?: SpringConfig;
  flipAxis?: "x" | "y";
  flipped?: boolean;
  flipProgress?: MotionValue<number>;
  front?: React.ReactNode;
  back?: React.ReactNode;
  className?: string;
  surfaceClassName?: string;
  contentClassName?: string;
  glareClassName?: string;
  glareOpacity?: number;
  glareColor?: string;
  glareMidColor?: string;
  glareDuration?: number;
  showGlare?: boolean;
  interactive?: boolean;
  shadow?: string;
  containerClassName?: string;
  containerMotionProps?: MotionProps;
  children: React.ReactNode;
};

export const CometCard = React.memo(
  ({
    rotateDepth = 15,
    translateDepth = 18,
    hoverScale = 1.04,
    hoverScaleX,
    hoverScaleY,
    hoverDuration = 0.2,
    hoverSpringConfig,
    fluidStrength = 0,
    fluidMax = 0,
    springConfig,
    glareSpringConfig,
    flipSpringConfig,
    flipAxis = "y",
    flipped = false,
    flipProgress,
    front,
    back,
    className,
    surfaceClassName,
    contentClassName,
    glareClassName,
    glareOpacity = 0.55,
    glareColor = "rgba(255, 255, 255, 0.9)",
    glareMidColor = "rgba(255, 255, 255, 0.65)",
    glareDuration = 0.2,
    showGlare = true,
    interactive = true,
    shadow = "rgba(0, 0, 0, 0.02) 0px 320px 140px 0px, rgba(0, 0, 0, 0.08) 0px 180px 120px 0px, rgba(0, 0, 0, 0.3) 0px 80px 80px 0px, rgba(0, 0, 0, 0.35) 0px 30px 50px 0px",
    containerClassName,
    containerMotionProps,
    children,
  }: CometCardProps) => {
    const prefersReducedMotion = useReducedMotion();
    const isInteractive = interactive && !prefersReducedMotion;
    const glareEnabled = showGlare && !prefersReducedMotion;

    const ref = useRef<HTMLDivElement>(null);
    const rectRef = useRef<DOMRect | null>(null);
    const rafRef = useRef<number | null>(null);
    const pointerRef = useRef({ x: 0, y: 0 });

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const hoverTargetX = useMotionValue(1);
    const hoverTargetY = useMotionValue(1);
    const hoverTargetZ = useMotionValue(0);

    const hoverSpringBase = useMemo(() => {
      const hoverDurationRatio = hoverDuration > 0 ? 0.2 / hoverDuration : 1;
      return {
        stiffness: hoverSpringConfig?.stiffness ?? 260 * hoverDurationRatio,
        damping: hoverSpringConfig?.damping ?? 22 * hoverDurationRatio,
        mass: hoverSpringConfig?.mass ?? 0.6,
      };
    }, [
      hoverDuration,
      hoverSpringConfig?.damping,
      hoverSpringConfig?.mass,
      hoverSpringConfig?.stiffness,
    ]);

    const mouseXSpring = useSpring(x, springConfig);
    const mouseYSpring = useSpring(y, springConfig);

    const glareXSpring = useSpring(x, glareSpringConfig ?? springConfig);
    const glareYSpring = useSpring(y, glareSpringConfig ?? springConfig);

    const hoverSpringX = useSpring(hoverTargetX, hoverSpringBase);
    const hoverSpringY = useSpring(hoverTargetY, hoverSpringBase);
    const hoverSpringZ = useSpring(hoverTargetZ, hoverSpringBase);

    const rotateX = useTransform(
      mouseYSpring,
      [-0.5, 0.5],
      [`-${rotateDepth}deg`, `${rotateDepth}deg`]
    );
    const rotateY = useTransform(
      mouseXSpring,
      [-0.5, 0.5],
      [`${rotateDepth}deg`, `-${rotateDepth}deg`]
    );

    const translateX = useTransform(
      mouseXSpring,
      [-0.5, 0.5],
      [`-${translateDepth}px`, `${translateDepth}px`]
    );
    const translateY = useTransform(
      mouseYSpring,
      [-0.5, 0.5],
      [`${translateDepth}px`, `-${translateDepth}px`]
    );

    const glareX = useTransform(glareXSpring, [-0.5, 0.5], [0, 100]);
    const glareY = useTransform(glareYSpring, [-0.5, 0.5], [0, 100]);

    const velocityX = useVelocity(x);
    const velocityY = useVelocity(y);

    const stretchX = useTransform(velocityX, (v) => {
      if (fluidStrength <= 0) return 0;
      return Math.min(Math.abs(v) * fluidStrength, fluidMax);
    });
    const stretchY = useTransform(velocityY, (v) => {
      if (fluidStrength <= 0) return 0;
      return Math.min(Math.abs(v) * fluidStrength, fluidMax);
    });

    const scaleX = useTransform([hoverSpringX, stretchX], ([base, stretch]) => {
      const baseScale = typeof base === "number" ? base : 1;
      const stretchValue = typeof stretch === "number" ? stretch : 0;
      return baseScale * (1 + stretchValue);
    });
    const scaleY = useTransform([hoverSpringY, stretchY], ([base, stretch]) => {
      const baseScale = typeof base === "number" ? base : 1;
      const stretchValue = typeof stretch === "number" ? stretch : 0;
      return baseScale * (1 + stretchValue);
    });

    const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, ${glareColor} 10%, ${glareMidColor} 22%, rgba(255, 255, 255, 0) 80%)`;

    const flipValue = useMotionValue(flipped ? 1 : 0);
    useEffect(() => {
      if (flipProgress) return;
      flipValue.set(flipped ? 1 : 0);
    }, [flipped, flipProgress, flipValue]);

    const flipSpring = useSpring(flipValue, {
      stiffness: 180,
      damping: 22,
      mass: 0.8,
      ...flipSpringConfig,
    });

    const flipDriver = flipProgress ?? flipSpring;
    const flipRotation = useTransform(flipDriver, [0, 1], [0, 180]);

    const updateRect = useCallback(() => {
      if (ref.current) {
        rectRef.current = ref.current.getBoundingClientRect();
      }
    }, []);

    const schedulePointerUpdate = useCallback(() => {
      if (rafRef.current) return;
      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null;
        const rect = rectRef.current;
        if (!rect) return;
        const xPct = pointerRef.current.x / rect.width - 0.5;
        const yPct = pointerRef.current.y / rect.height - 0.5;
        x.set(xPct);
        y.set(yPct);
      });
    }, [x, y]);

    const handlePointerMove = useCallback(
      (e: React.PointerEvent<HTMLDivElement>) => {
        if (!isInteractive || e.pointerType === "touch") return;
        if (!rectRef.current) updateRect();
        const rect = rectRef.current;
        if (!rect) return;
        pointerRef.current = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        };
        schedulePointerUpdate();
      },
      [isInteractive, schedulePointerUpdate, updateRect]
    );

    const handlePointerEnter = useCallback(
      (e: React.PointerEvent<HTMLDivElement>) => {
        if (!isInteractive || e.pointerType === "touch") return;
        updateRect();
        const rect = rectRef.current;
        if (!rect) return;
        pointerRef.current = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        };
        const nextScaleX = hoverScaleX ?? hoverScale;
        const nextScaleY = hoverScaleY ?? hoverScale;
        hoverTargetX.set(nextScaleX);
        hoverTargetY.set(nextScaleY);
        hoverTargetZ.set(60);
        schedulePointerUpdate();
      },
      [
        hoverScale,
        hoverScaleX,
        hoverScaleY,
        hoverTargetX,
        hoverTargetY,
        hoverTargetZ,
        isInteractive,
        schedulePointerUpdate,
        updateRect,
      ]
    );

    const handlePointerLeave = useCallback(() => {
      if (!isInteractive) return;
      hoverTargetX.set(1);
      hoverTargetY.set(1);
      hoverTargetZ.set(0);
      x.set(0);
      y.set(0);
    }, [hoverTargetX, hoverTargetY, hoverTargetZ, isInteractive, x, y]);

    useEffect(() => {
      if (!isInteractive || !ref.current) return undefined;
      updateRect();
      const element = ref.current;
      const observer = new ResizeObserver(() => updateRect());
      observer.observe(element);
      window.addEventListener("resize", updateRect);
      window.addEventListener("scroll", updateRect, true);
      return () => {
        observer.disconnect();
        window.removeEventListener("resize", updateRect);
        window.removeEventListener("scroll", updateRect, true);
        if (rafRef.current) {
          window.cancelAnimationFrame(rafRef.current);
        }
      };
    }, [isInteractive, updateRect]);

    useEffect(() => {
      if (isInteractive) return;
      hoverTargetX.set(1);
      hoverTargetY.set(1);
      hoverTargetZ.set(0);
      x.set(0);
      y.set(0);
    }, [hoverTargetX, hoverTargetY, hoverTargetZ, isInteractive, x, y]);

    const outerClassName = useMemo(
      () => cn("perspective-distant transform-3d", className, containerClassName),
      [className, containerClassName]
    );

    const frontContent = front ?? children;
    const flipStyle = flipAxis === "x" ? { rotateX: flipRotation } : { rotateY: flipRotation };

    return (
      <motion.div
        {...containerMotionProps}
        className={outerClassName}
        style={containerMotionProps?.style}
      >
        <motion.div
          ref={ref}
          onPointerMove={isInteractive ? handlePointerMove : undefined}
          onPointerEnter={isInteractive ? handlePointerEnter : undefined}
          onPointerLeave={isInteractive ? handlePointerLeave : undefined}
          style={{
            rotateX,
            rotateY,
            translateX,
            translateY,
            scaleX,
            scaleY,
            z: hoverSpringZ,
            boxShadow: shadow,
            transformStyle: "preserve-3d",
            willChange: isInteractive ? "transform" : undefined,
          }}
          className="relative"
        >
          <motion.div
            className={cn(
              "relative rounded-[28px] border border-white/20 bg-white/5",
              surfaceClassName
            )}
            style={{
              transformStyle: "preserve-3d",
              willChange: back ? "transform" : undefined,
              ...flipStyle,
            }}
          >
            <div
              className={cn("relative w-full overflow-hidden rounded-[inherit]", contentClassName)}
              style={{ backfaceVisibility: "hidden" }}
            >
              {frontContent}
            </div>
            {back ? (
              <div
                className="absolute inset-0 w-full"
                style={{
                  backfaceVisibility: "hidden",
                  transform: flipAxis === "x" ? "rotateX(180deg)" : "rotateY(180deg)",
                }}
              >
                {back}
              </div>
            ) : null}
            {glareEnabled ? (
              <motion.div
                className={cn(
                  "pointer-events-none absolute inset-0 z-20 w-full rounded-[inherit] mix-blend-overlay",
                  glareClassName
                )}
                style={{
                  background: glareBackground,
                  opacity: glareOpacity,
                  willChange: isInteractive ? "opacity" : undefined,
                }}
                transition={{ duration: glareDuration }}
              />
            ) : null}
          </motion.div>
        </motion.div>
      </motion.div>
    );
  }
);

CometCard.displayName = "CometCard";
