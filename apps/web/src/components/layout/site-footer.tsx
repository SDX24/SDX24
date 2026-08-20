import { LuArrowUpRight, LuGithub, LuGitlab, LuLinkedin, LuMail } from "react-icons/lu";

import { SITE } from "@/lib/site";

const SOCIALS = [
  { label: "GitHub", href: SITE.links.github, Icon: LuGithub },
  { label: "GitLab", href: SITE.links.gitlab, Icon: LuGitlab },
  { label: "LinkedIn", href: SITE.links.linkedin, Icon: LuLinkedin },
  { label: "Email", href: `mailto:${SITE.email}`, Icon: LuMail },
];

export const SiteFooter = () => (
  <footer className="border-t border-white/[0.07] bg-surface">
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between">
      <div className="space-y-1">
        <p className="font-display text-base font-semibold text-white">{SITE.name}</p>
        <p className="text-sm text-gray-500">
          {SITE.role} · {SITE.location}
        </p>
      </div>

      <div className="flex items-center gap-2">
        {SOCIALS.map(({ label, href, Icon }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("mailto:") ? undefined : "_blank"}
            rel="noopener noreferrer"
            aria-label={label}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-gray-400 transition-colors hover:border-white/20 hover:text-white"
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
          </a>
        ))}
      </div>
    </div>

    <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 border-t border-white/5 px-4 py-5 text-xs text-gray-600 sm:flex-row sm:items-center sm:justify-between">
      <p>© {new Date().getFullYear()} Stefan Dorosh (SDX24)</p>
      {/* A portfolio's own source is its most honest code sample. */}
      <a
        href={SITE.links.source}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 transition-colors hover:text-brand-clay"
      >
        Built with Next.js. Source on GitHub
        <LuArrowUpRight className="h-3 w-3" aria-hidden="true" />
      </a>
    </div>
  </footer>
);
