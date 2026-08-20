"use client";

import { useLayoutEffect, useRef } from "react";

import { ScrollTrigger, gsap } from "@/lib/motion";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Stagger direct children instead of animating the wrapper as one block. */
  stagger?: boolean;
  /** Seconds to hold before the reveal starts. Keep small; this is punctuation, not spectacle. */
  delay?: number;
  as?: "div" | "section" | "li" | "article" | "header" | "figure";
};

const EASE = "power2.out";
const DISTANCE = 18;

/**
 * Scroll-triggered entrance. GSAP owns scroll-linked motion (AGENTS.md §7).
 *
 * Deliberately restrained: an 18px rise and a fade, once, never replayed. The point is to
 * direct the reader's eye down the page in order, not to perform. Everything animates on
 * transform/opacity only.
 */
export const Reveal = ({
  children,
  className,
  stagger = false,
  delay = 0,
  as: Tag = "div",
}: RevealProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Honour the OS setting: no motion, no hidden content, no ScrollTrigger at all.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const context = gsap.context(() => {
      const targets = stagger ? Array.from(element.children) : [element];
      if (targets.length === 0) return;

      gsap.set(targets, { opacity: 0, y: DISTANCE });

      ScrollTrigger.create({
        trigger: element,
        // Fires a little before the element is fully on screen so content is settled by
        // the time the reader's eye arrives.
        start: "top 88%",
        once: true,
        onEnter: () => {
          gsap.to(targets, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: EASE,
            delay,
            stagger: stagger ? 0.08 : 0,
          });
        },
      });
    }, element);

    return () => context.revert();
  }, [stagger, delay]);

  return (
    <Tag ref={ref as React.Ref<never>} className={cn(className)}>
      {children}
    </Tag>
  );
};
