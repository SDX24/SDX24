"use client";

import { useLayoutEffect, useRef } from "react";

import { gsap } from "@/lib/motion";
import { cn } from "@/lib/utils";

type LineRevealProps = {
  /** Each string is one rendered line; line breaks are authored, not measured. */
  lines: string[];
  className?: string;
  lineClassName?: string;
  as?: "h1" | "h2" | "p";
};

/**
 * Masked line-by-line reveal for a single headline. Each line sits in an
 * `overflow: hidden` track and slides up from below it, so the text appears to be uncovered
 * rather than to fly in.
 *
 * Used once, on the hero. Repeating it down the page would turn a deliberate opening into a
 * tic, the exact "every element gets the same fade-in" tell we're avoiding.
 */
export const LineReveal = ({
  lines,
  className,
  lineClassName,
  as: Tag = "h1",
}: LineRevealProps) => {
  const ref = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const context = gsap.context(() => {
      const targets = element.querySelectorAll("[data-line-inner]");
      if (targets.length === 0) return;

      gsap.set(targets, { yPercent: 110 });
      gsap.to(targets, {
        yPercent: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.08,
        // Above the fold: play on load, not on scroll.
        delay: 0.1,
      });
    }, element);

    return () => context.revert();
  }, []);

  return (
    <Tag ref={ref as React.Ref<never>} className={cn(className)}>
      {lines.map((line) => (
        <span key={line} className="block overflow-hidden pb-[0.08em]">
          <span data-line-inner className={cn("block", lineClassName)}>
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
};
