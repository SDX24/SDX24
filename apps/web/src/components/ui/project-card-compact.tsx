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
  logoSrc?: string;
  wordmarkSrc?: string;
  links?: ProjectLink[];
  className?: string;
  contentClassName?: string;
  interactive?: boolean;
  logoContainerClassName?: string;
  logoImageClassName?: string;
  logoPixelSize?: number;
  showLogo?: boolean;
  caseStudyBadge?: string;
  onRationaleToggle?: () => void;
  isRationaleOpen?: boolean;
  rationaleBadgeClassName?: string;
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
  logoPixelSize = 64,
  showLogo = true,
  caseStudyBadge,
  onRationaleToggle,
  isRationaleOpen = false,
  rationaleBadgeClassName,
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
    <div className="relative flex flex-col gap-4 text-gray-100 flex-1">
      {onRationaleToggle ? (
        <button
          type="button"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            onRationaleToggle();
          }}
          className={cn(
            "absolute right-0 -top-1 z-20 flex h-7 w-24 items-center justify-end [clip-path:polygon(22%_0,100%_0,100%_100%,0_100%)] rounded-bl-[1rem] border pr-2 text-right text-[9px] font-bold uppercase leading-none tracking-[0.13em] text-white shadow-[0_0_18px_rgba(239,111,108,0.28)] transition hover:brightness-110",
            isRationaleOpen
              ? "border-brand-coral/70 bg-[linear-gradient(130deg,rgba(239,111,108,0.9),rgba(127,182,133,0.72))]"
              : (rationaleBadgeClassName ??
                  "border-brand-coral/55 bg-[linear-gradient(130deg,rgba(66,106,90,0.86),rgba(0,169,145,0.78))]")
          )}
          aria-label={`Toggle rationale for ${title}`}
          aria-pressed={isRationaleOpen}
        >
          Rationale
        </button>
      ) : null}
      <div className="flex items-center gap-4">
        {showLogo && logoSrc ? (
          <div className={cn("relative h-16 w-16 overflow-hidden", logoContainerClassName)}>
            <Image
              src={logoSrc}
              alt={`${title} logo`}
              fill
              className={cn("object-contain", logoImageClassName)}
              sizes={`${logoPixelSize}px`}
            />
          </div>
        ) : null}
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
          {caseStudyBadge ? (
            <span className="mt-1.5 inline-flex rounded-full border border-brand-apricot/60 bg-brand-apricot/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-brand-apricot shadow-[0_0_14px_rgba(242,197,124,0.28)]">
              {caseStudyBadge}
            </span>
          ) : null}
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
