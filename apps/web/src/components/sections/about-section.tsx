import Image from "next/image";

import { Reveal } from "@/components/motion/reveal";
import { SITE } from "@/lib/site";

import { SectionHeading } from "./section-heading";

/**
 * The site had no prose about the person behind it. Copy is deliberately plain and
 * first-person, because specifics and a real voice are what separate this from filler.
 */
export const AboutSection = () => (
  <section id="about" className="mx-auto w-full max-w-5xl scroll-mt-24 px-4 py-20">
    <Reveal>
      <SectionHeading eyebrow="About" title="Background" />
    </Reveal>

    <Reveal className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-16">
      <div className="max-w-prose space-y-5 text-lg leading-relaxed text-gray-300">
        <p className="text-pretty">
          I finished the IB programme in Bali, moved to Vancouver, and went straight into
          BCIT&apos;s Full-Stack Web Development diploma, graduating in May 2026.
        </p>
        <p className="text-pretty">
          I got my first computer at six and have been tinkering with them since. I&apos;ve built my
          own PC twice, spent a lot of time optimizing it and digging through internal settings,
          writing small automations, and reading forums.
        </p>
        <p className="text-pretty">
          I&apos;m currently building across the stack at RUDI and looking for a full-stack role.
        </p>
      </div>

      <div className="lg:pt-2">
        <div className="relative mx-auto w-full max-w-[320px] overflow-hidden rounded-2xl border border-white/10">
          <Image
            src="/images/profile.jpg"
            alt={`${SITE.name}, ${SITE.role}`}
            width={640}
            height={800}
            sizes="(max-width: 1024px) 320px, 380px"
            className="h-auto w-full object-cover"
          />
        </div>
        <p className="font-mono-label mt-4 text-center text-gray-500">
          {SITE.location} · Open to relocation
        </p>
      </div>
    </Reveal>
  </section>
);
