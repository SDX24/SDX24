import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { LuArrowLeft, LuArrowUpRight } from "react-icons/lu";

import { Reveal } from "@/components/motion/reveal";
import { TANDEM_CASE_STUDY as CS } from "@/lib/case-study-tandem";

export const metadata: Metadata = {
  title: "Tandem case study",
  description: CS.summary,
  alternates: { canonical: "/work/tandem" },
  openGraph: {
    type: "article",
    title: `Tandem case study · ${CS.tagline}`,
    description: CS.summary,
  },
};

export default function TandemCaseStudy() {
  return (
    <main id="main" className="relative min-h-screen bg-surface text-white">
      <article className="relative z-10 mx-auto w-full max-w-4xl px-4 pb-24 pt-32 sm:pt-36">
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white"
        >
          <LuArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          All work
        </Link>

        <header className="mt-10">
          <p className="font-mono-label text-gray-500">Case study</p>
          <h1 className="mt-3 text-display-md font-bold tracking-tight text-white sm:text-display-lg">
            {CS.title}
          </h1>
          <p className="mt-4 text-pretty text-xl text-gray-300">{CS.tagline}</p>
          <p className="mt-6 max-w-prose text-pretty text-lg leading-relaxed text-gray-400">
            {CS.summary}
          </p>

          <dl className="mt-10 grid gap-6 border-y border-white/10 py-7 sm:grid-cols-3">
            {(
              [
                ["Role", CS.role],
                ["Timeline", CS.timeline],
                ["Team", CS.team],
              ] as const
            ).map(([label, value]) => (
              <div key={label}>
                <dt className="font-mono-label text-gray-600">{label}</dt>
                <dd className="mt-1.5 text-gray-200">{value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2">
            {CS.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-400 transition-colors hover:text-white"
              >
                {link.label}
                <LuArrowUpRight className="h-3 w-3" aria-hidden="true" />
              </a>
            ))}
          </div>
        </header>

        <Reveal stagger className="mt-14 grid gap-6 sm:grid-cols-3">
          {CS.metrics.map((metric) => (
            <div key={metric.label} className="rounded-xl border border-white/10 p-5">
              <p className="font-display text-2xl font-bold text-white">{metric.value}</p>
              <p className="font-mono-label mt-2 text-gray-500">{metric.label}</p>
            </div>
          ))}
        </Reveal>

        {CS.sections.map((section) => (
          <section key={section.id} id={section.id} className="mt-20 scroll-mt-28">
            <Reveal>
              <h2 className="text-display-sm font-bold text-white">{section.title}</h2>
            </Reveal>

            <Reveal className="mt-6 max-w-prose space-y-5">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-pretty text-lg leading-relaxed text-gray-300">
                  {paragraph}
                </p>
              ))}
            </Reveal>

            {section.highlights ? (
              <Reveal className="mt-8 max-w-prose rounded-xl border border-white/10 bg-surface-raised p-6">
                <ul className="space-y-3">
                  {section.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-3 text-gray-300">
                      <span
                        aria-hidden="true"
                        className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-gray-600"
                      />
                      <span className="text-pretty leading-relaxed">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ) : null}

            {section.assets ? (
              <div className="mt-10 space-y-10">
                {section.assets.map((asset) => (
                  <Reveal key={asset.src} as="figure">
                    <div className="overflow-hidden rounded-xl border border-white/10 bg-surface-raised">
                      <Image
                        src={asset.src}
                        alt={asset.alt}
                        width={1400}
                        height={900}
                        sizes="(max-width: 896px) 100vw, 896px"
                        className="h-auto w-full object-contain"
                      />
                    </div>
                    <figcaption className="mt-3 text-sm text-gray-500">
                      <span className="text-gray-300">{asset.title}</span>. {asset.caption}
                    </figcaption>
                  </Reveal>
                ))}
              </div>
            ) : null}
          </section>
        ))}

        <section className="mt-20">
          <Reveal>
            <h2 className="text-display-sm font-bold text-white">Stack</h2>
          </Reveal>
          <Reveal className="mt-6">
            <ul className="flex flex-wrap gap-2">
              {CS.stack.map((tech) => (
                <li
                  key={tech}
                  className="rounded-md border border-white/10 bg-surface-raised px-2.5 py-1.5 font-mono text-xs text-gray-300"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </Reveal>
        </section>

        <section className="mt-20">
          <Reveal>
            <h2 className="text-display-sm font-bold text-white">Team</h2>
          </Reveal>
          <Reveal stagger className="mt-6 grid gap-3 sm:grid-cols-2">
            {CS.credits.map((credit) => (
              <a
                key={credit.name}
                href={credit.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-lg border border-white/10 px-4 py-3 transition-colors hover:border-white/25"
              >
                <span className="text-sm text-gray-200">{credit.name}</span>
                <span className="font-mono-label text-gray-600">{credit.team}</span>
              </a>
            ))}
          </Reveal>
        </section>

        <Reveal className="mt-20 border-t border-white/10 pt-10">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 text-gray-400 transition-colors hover:text-white"
          >
            <LuArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to all work
          </Link>
        </Reveal>
      </article>
    </main>
  );
}
