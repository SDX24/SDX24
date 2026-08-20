"use client";

import { useEffect, useState } from "react";

import Image from "next/image";

import { LuDownload, LuMenu, LuX } from "react-icons/lu";

import { NAV_SECTIONS, SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Sticky section nav. The page was previously a single unbroken scroll with no way to
 * navigate; reviewers need to reach Work and Contact without scrolling the whole hero.
 */
export const SiteHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /**
   * Scroll-spy. Deliberately a scroll position check rather than an IntersectionObserver:
   * the observer only fired on threshold crossings, so with sections of very different
   * heights the active link could stop updating entirely and stick (it got stuck on
   * "Skills"). Reading positions on every frame-throttled scroll can't go stale.
   */
  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const sections = NAV_SECTIONS.map(({ id }) => document.getElementById(id));

      // At the very bottom, the last section is active even if its top is off-screen.
      const atBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 2;
      if (atBottom) {
        const last = NAV_SECTIONS[NAV_SECTIONS.length - 1];
        if (last) setActiveId(last.id);
        return;
      }

      // The last section whose top has passed the reading line just under the header.
      const READING_LINE = 140;
      let current = "";
      sections.forEach((section, index) => {
        if (!section) return;
        if (section.getBoundingClientRect().top <= READING_LINE) {
          current = NAV_SECTIONS[index]?.id ?? current;
        }
      });
      setActiveId(current);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled ? "border-b border-white/10 bg-surface/85 backdrop-blur-xl" : "bg-transparent"
      )}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <a href="#top" className="flex items-center gap-2.5" aria-label={`${SITE.name}, home`}>
          <Image
            src="/logos/sdx24/logo-main-inverse.svg"
            alt=""
            width={32}
            height={32}
            className="rounded-lg bg-white/10 p-1"
          />
          <span className="font-mono-label text-gray-500">SDX24</span>
        </a>

        <nav aria-label="Sections" className="hidden items-center gap-1 md:flex">
          {NAV_SECTIONS.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={activeId === id ? "true" : undefined}
              className={cn(
                "rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
                activeId === id
                  ? "bg-white/10 text-white"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              )}
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={SITE.resumePath}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full border border-white/15 px-4 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-brand-teal-light/15 sm:inline-flex"
          >
            <LuDownload className="h-3.5 w-3.5 text-gray-400" aria-hidden="true" />
            Resume
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 text-white md:hidden"
          >
            {menuOpen ? <LuX className="h-4 w-4" /> : <LuMenu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <nav
          id="mobile-nav"
          aria-label="Sections"
          className="border-t border-white/10 bg-black/95 px-4 pb-4 pt-2 backdrop-blur-xl md:hidden"
        >
          {NAV_SECTIONS.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={() => setMenuOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-base font-medium text-gray-200 hover:bg-white/5 hover:text-white"
            >
              {label}
            </a>
          ))}
        </nav>
      ) : null}
    </header>
  );
};
