import React from "react";

import Image from "next/image";

import { cn } from "@/lib/utils";

import { CometCard } from "./comet-card";

type ProjectLink = {
  label: string;
  href: string;
};

type ProjectCardExpandedProps = {
  title: string;
  slogan: string;
  description: string;
  status?: string;
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
};

export const ProjectCardExpanded = ({
  title,
  slogan,
  description,
  status,
  links,
  stack,
  achievements,
  logoSrc,
  wordmarkSrc,
  coverSrc,
  className,
  brand,
}: ProjectCardExpandedProps) => (
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
          {status ? (
            <span
              className="ml-auto rounded-full border px-3 py-1 text-xs"
              style={{ borderColor: brand.primaryLight, color: brand.primaryLight }}
            >
              {status}
            </span>
          ) : null}
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
);
