import React from "react";

import Image from "next/image";

import { cn } from "@/lib/utils";

import { CometCard } from "./comet-card";

type ProjectLink = {
  label: string;
  href: string;
};

type ProjectCardCompactProps = {
  title: string;
  slogan: string;
  description: string;
  stack: string[];
  logoSrc: string;
  wordmarkSrc?: string;
  links?: ProjectLink[];
  className?: string;
  contentClassName?: string;
  interactive?: boolean;
  logoContainerClassName?: string;
  logoImageClassName?: string;
  logoPixelSize?: number;
};

export const ProjectCardCompact = ({
  title,
  slogan,
  description,
  stack,
  logoSrc,
  wordmarkSrc,
  links,
  className,
  contentClassName,
  interactive = false,
  logoContainerClassName,
  logoImageClassName,
  logoPixelSize = 48,
}: ProjectCardCompactProps) => (
  <CometCard
    className={cn("w-full", className)}
    surfaceClassName="border-white/15 bg-white/5"
    contentClassName={cn("flex flex-col p-5 min-h-[320px]", contentClassName)}
    glareOpacity={0.2}
    glareClassName="mix-blend-screen"
    glareColor="rgba(104, 213, 255, 0.35)"
    glareMidColor="rgba(145, 179, 227, 0.25)"
    interactive={interactive}
  >
    <div className="flex flex-col gap-4 text-gray-100 flex-1">
      <div className="flex items-center gap-4">
        <div
          className={cn(
            "relative h-12 w-12 overflow-hidden rounded-2xl bg-white/10",
            logoContainerClassName
          )}
        >
          <Image
            src={logoSrc}
            alt={`${title} logo`}
            fill
            className={cn("object-contain p-2", logoImageClassName)}
            sizes={`${logoPixelSize}px`}
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
            <h2 className="text-xl font-semibold font-alan">{title}</h2>
          )}
          <p className="mt-2 text-xs uppercase tracking-[0.3em] text-brand-clay">{slogan}</p>
        </div>
      </div>

      <p className="text-sm font-omnes text-gray-300">{description}</p>

      <div className="flex flex-wrap gap-2">
        {stack.map((item) => (
          <span
            key={item}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-200"
          >
            {item}
          </span>
        ))}
      </div>

      {links && links.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-1 mt-auto">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-brand-teal-light/40 bg-brand-teal-light/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-brand-teal-light transition hover:bg-brand-teal-light/20"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </div>
  </CometCard>
);
