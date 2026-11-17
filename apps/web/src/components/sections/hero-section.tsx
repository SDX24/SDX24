import Image from "next/image";

import { LuArrowRight, LuGithub, LuLinkedin } from "react-icons/lu";

import { LineReveal } from "@/components/motion/line-reveal";
import { Reveal } from "@/components/motion/reveal";
import { SITE } from "@/lib/site";

/** Checkable facts, each tied to something further down the page. */
const PROOF_POINTS = [
  { value: "3", label: "Products shipped to real users" },
  { value: "8-person", label: "Team I led development on" },
  { value: "2 yrs", label: "Shipping TypeScript" },
];

const SOCIAL_LINKS = [
  { label: "GitHub", href: SITE.links.github, Icon: LuGithub },
  { label: "LinkedIn", href: SITE.links.linkedin, Icon: LuLinkedin },
];

export const HeroSection = () => (
  <section id="top" className="mx-auto w-full max-w-5xl px-4 pb-20 pt-32 sm:pt-36">
    <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,0.85fr)] lg:gap-14">
      <div>
        <LineReveal
          lines={["Full-stack developer", "working in TypeScript", "and Next.js."]}
          className="text-[2.5rem] font-bold leading-[1.05] tracking-tight text-white sm:text-display-md"
        />

        <Reveal delay={0.45} className="mt-7 max-w-prose space-y-4">
          <p className="text-pretty text-xl leading-relaxed text-gray-300">
            I&apos;m Stefan Dorosh. I build across the frontend, backend, and infrastructure at
            RUDI, an AI-native real-estate platform serving a 2,000+ villa marketplace.
          </p>
          <p className="text-pretty text-lg leading-relaxed text-gray-400">
            Before that I rebuilt a Canadian InsurTech SaaS at Vero Ventures, and led development on
            Tandem, a real-time scheduling platform where I owned guest auth, the socket layer, and
            the shared data models.
          </p>
        </Reveal>

        <Reveal delay={0.6} className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href="#work"
            className="group inline-flex items-center gap-2 rounded-lg bg-brand-teal-light px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-teal"
          >
            View my work
            <LuArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </a>
          <a
            href={`mailto:${SITE.email}`}
            className="inline-flex items-center rounded-lg border border-white/15 px-6 py-3 font-semibold text-white transition-colors hover:border-white/30 hover:bg-white/5"
          >
            Get in touch
          </a>
          <div className="flex items-center gap-1.5 sm:ml-1">
            {SOCIAL_LINKS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/[0.07] text-gray-500 transition-colors hover:border-white/20 hover:text-white"
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal
          delay={0.75}
          className="mt-11 grid max-w-lg grid-cols-3 gap-5 border-t border-white/[0.07] pt-6"
        >
          {PROOF_POINTS.map(({ value, label }) => (
            <div key={label}>
              <p className="font-display text-xl font-bold text-white sm:text-2xl">{value}</p>
              <p className="font-mono-label mt-1.5 text-gray-600">{label}</p>
            </div>
          ))}
        </Reveal>
      </div>

      <Reveal delay={0.3} className="lg:pt-2">
        <div className="relative mx-auto w-full max-w-[280px] overflow-hidden rounded-xl border border-white/[0.07] lg:ml-auto lg:mr-0">
          <Image
            src="/images/profile.jpg"
            alt={`${SITE.name}, ${SITE.role}`}
            width={620}
            height={775}
            priority
            sizes="(max-width: 1024px) 280px, 320px"
            className="h-auto w-full object-cover"
          />
        </div>
        <p className="mt-3 text-center text-sm text-gray-500 lg:text-right">{SITE.location}</p>
      </Reveal>
    </div>
  </section>
);
