import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  /** Mono kicker, the smallest step of the type scale, used to label the section. */
  eyebrow: string;
  title: string;
  lead?: string;
  className?: string;
};

/**
 * One heading pattern for every section, so hierarchy reads consistently:
 * eyebrow (mono, apricot) → h2 (display) → lead (sans, muted, max 68ch).
 */
export const SectionHeading = ({ eyebrow, title, lead, className }: SectionHeadingProps) => (
  <div className={cn("max-w-prose space-y-3", className)}>
    <p className="font-mono-label text-gray-500">{eyebrow}</p>
    <h2 className="text-display-sm font-bold text-white sm:text-display-md">{title}</h2>
    {lead ? <p className="text-pretty text-lg leading-relaxed text-gray-400">{lead}</p> : null}
  </div>
);
