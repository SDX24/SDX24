"use client";

import { useEffect, useState } from "react";

import { LuArrowUpRight, LuCheck, LuCopy, LuGithub, LuLinkedin } from "react-icons/lu";

import { Reveal } from "@/components/motion/reveal";
import { SITE } from "@/lib/site";

/**
 * A real closing section. Previously the only contact route was one of five identical
 * hero buttons, and the footer was a single copyright line.
 */
export const ContactSection = () => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(SITE.email);
      setCopied(true);
    } catch {
      // Clipboard can be blocked by permissions; the mailto link below still works.
      setCopied(false);
    }
  };

  return (
    <section id="contact" className="mx-auto w-full max-w-5xl scroll-mt-24 px-4 py-20">
      <Reveal className="rounded-3xl border border-white/10 bg-surface-raised p-8 sm:p-14">
        <p className="font-mono-label text-gray-500">Contact</p>
        <h2 className="mt-3 max-w-2xl text-display-sm font-bold text-white sm:text-display-md">
          Looking for a full-stack developer?
        </h2>
        <p className="mt-4 max-w-prose text-pretty text-lg leading-relaxed text-gray-400">
          I&apos;m open to full-stack roles in Vancouver or remote. The fastest way to reach me is
          email, and I reply to everything.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href={`mailto:${SITE.email}`}
            className="inline-flex items-center gap-2 rounded-lg bg-brand-teal-light px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-teal"
          >
            {SITE.email}
          </a>
          <button
            type="button"
            onClick={copyEmail}
            className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-4 py-3 text-sm font-semibold text-gray-300 transition-colors hover:border-white/20 hover:text-white"
          >
            {copied ? (
              <LuCheck className="h-4 w-4 text-gray-400" aria-hidden="true" />
            ) : (
              <LuCopy className="h-4 w-4" aria-hidden="true" />
            )}
            {copied ? "Copied" : "Copy address"}
          </button>
          {/* Politeness so the state change is announced without stealing focus. */}
          <span aria-live="polite" className="sr-only">
            {copied ? "Email address copied to clipboard" : ""}
          </span>
        </div>

        <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/10 pt-6 text-sm">
          <a
            href={SITE.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-gray-400 transition-colors hover:text-white"
          >
            <LuLinkedin className="h-4 w-4" aria-hidden="true" />
            LinkedIn
            <LuArrowUpRight className="h-3 w-3" aria-hidden="true" />
          </a>
          <a
            href={SITE.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-gray-400 transition-colors hover:text-white"
          >
            <LuGithub className="h-4 w-4" aria-hidden="true" />
            GitHub
            <LuArrowUpRight className="h-3 w-3" aria-hidden="true" />
          </a>
          <a
            href={SITE.resumePath}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-gray-400 transition-colors hover:text-white"
          >
            Resume (PDF)
            <LuArrowUpRight className="h-3 w-3" aria-hidden="true" />
          </a>
        </div>
      </Reveal>
    </section>
  );
};
