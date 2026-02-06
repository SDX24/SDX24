import React from "react";

import Image from "next/image";

import { cn } from "@/lib/utils";

import { CometCard } from "./comet-card";

type ProjectCardCompactProps = {
  title: string;
  slogan: string;
  description: string;
  stack: string[];
  logoSrc: string;
  wordmarkSrc?: string;
  className?: string;
  interactive?: boolean;
};

export const ProjectCardCompact = ({
  title,
  slogan,
  description,
  stack,
  logoSrc,
  wordmarkSrc,
  className,
  interactive = false,
}: ProjectCardCompactProps) => (
  <CometCard
    className={cn("w-full", className)}
    surfaceClassName="border-white/15 bg-white/5"
    contentClassName="space-y-4 p-5 min-h-[320px]"
    glareOpacity={0.2}
    glareClassName="mix-blend-screen"
    glareColor="rgba(104, 213, 255, 0.35)"
    glareMidColor="rgba(145, 179, 227, 0.25)"
    interactive={interactive}
  >
    <div className="space-y-4 text-gray-100">
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
    </div>
  </CometCard>
);
