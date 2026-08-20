import { Reveal } from "@/components/motion/reveal";
import { EDUCATION, EXPERIENCE, SKILL_GROUPS } from "@/lib/site";

import { SectionHeading } from "./section-heading";

/**
 * Grouped rather than a flat logo wall, because the grouping itself communicates how the work
 * is organized, and it mirrors the résumé's skill categories.
 */
export const SkillsSection = () => (
  <section id="skills" className="mx-auto w-full max-w-5xl scroll-mt-24 px-4 py-20">
    <Reveal>
      <SectionHeading
        eyebrow="Skills"
        title="What I work with"
        lead="Grouped by what it does, not by how impressive the list looks. Everything here is something I've shipped with."
      />
    </Reveal>

    <Reveal stagger as="div" className="mt-14 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
      {SKILL_GROUPS.map((group) => (
        <div key={group.title} className="border-t border-white/10 pt-5">
          <p className="font-mono-label text-gray-500">{group.title}</p>
          <div className="mt-3">
            <ul className="flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="rounded-md border border-white/10 bg-surface-raised px-2.5 py-1 text-sm text-gray-300"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </Reveal>

    <Reveal className="mt-14 border-t border-white/[0.07] pt-8">
      <h3 className="font-mono-label text-gray-500">Background</h3>
      <div className="mt-5 grid gap-x-10 gap-y-5 sm:grid-cols-2">
        {EXPERIENCE.map((entry) => (
          <div key={entry.company}>
            <p className="text-sm font-medium text-gray-200">
              {entry.company}, {entry.role}
            </p>
            <p className="font-mono-label mt-1 text-gray-600">{entry.period}</p>
          </div>
        ))}
        {EDUCATION.map((entry) => (
          <div key={entry.school}>
            <p className="text-sm font-medium text-gray-200">{entry.school}</p>
            <p className="text-sm text-gray-500">{entry.credential}</p>
            <p className="font-mono-label mt-1 text-gray-600">{entry.period}</p>
          </div>
        ))}
      </div>
    </Reveal>
  </section>
);
