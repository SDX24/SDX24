import Image from "next/image";

import { MainTealCard } from "@/components";

const heroDescription =
  "BCIT Full-Stack Web Development diploma candidate shipping Tandem's real-time childcare scheduler, leading InsurFlow's AI InsurTech stack, and shaping W3rlds UI with dependable delivery.";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="pointer-events-none absolute inset-0 bg-grid-dot opacity-60" />
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center justify-center gap-10 px-4 py-16 lg:py-24">
        <section className="grid w-full items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)]">
          <div className="space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-4 rounded-full border border-brand-teal-light/30 bg-white/5 px-4 py-2">
              <Image
                src="/logos/sdx24/logo-main-inverse.svg"
                alt="SDX24 Logo"
                width={56}
                height={56}
                priority
                quality={85}
                className="rounded-2xl bg-white/10 p-2"
              />
              <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-clay">
                  SDX24
                </p>
                <p className="text-sm font-semibold text-gray-300">Full-Stack Web Developer</p>
              </div>
            </div>
            <div className="space-y-3">
              <h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
                Stefan Dorosh
              </h1>
              <p className="text-xl font-semibold text-brand-apricot">
                Product-minded shipping with polish, clarity, and calm.
              </p>
            </div>
            <p className="mx-auto max-w-xl text-xl leading-relaxed text-gray-300 lg:mx-0">
              {heroDescription}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 lg:justify-start">
              <a
                href="https://github.com/SDX24"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-brand-teal-light px-8 py-3 font-bold text-white transition-colors hover:bg-brand-teal"
              >
                View GitHub
              </a>
              <a
                href="https://linkedin.com/in/stefan-dorosh-19b946323"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border-2 border-brand-teal-light px-8 py-3 font-bold text-brand-clay transition-colors hover:bg-brand-teal-light/10"
              >
                LinkedIn
              </a>
              <a
                href="mailto:stefandorosh24@gmail.com"
                className="rounded-lg border-2 border-gray-500 px-8 py-3 font-bold text-gray-300 transition-colors hover:border-gray-400 hover:text-gray-200"
              >
                Contact
              </a>
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400 lg:justify-start">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
                <span className="h-2 w-2 rounded-full bg-brand-coral" />
                Open to fall 2026 internships
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
                Vancouver, BC
              </span>
            </div>
          </div>
          <div className="flex w-full flex-col items-center gap-6 lg:items-end">
            <MainTealCard className="max-w-[380px]" contentClassName="p-4">
              <div className="relative h-0 w-full overflow-hidden rounded-[18px] pb-[120%]">
                <Image
                  src="/images/profile.jpg"
                  alt="Stefan Dorosh profile"
                  fill
                  className="absolute inset-0 h-full w-full rounded-[18px] border border-white/10 object-cover"
                  sizes="(max-width: 640px) 100vw, 360px"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-4 pb-4 pt-12">
                  <p className="text-lg font-semibold text-white">Stefan Dorosh</p>
                  <p className="text-sm text-gray-200">Full-stack web developer</p>
                </div>
              </div>
            </MainTealCard>
          </div>
        </section>

        <footer className="mt-10 text-center text-sm text-gray-500">
          <p>© 2026 Stefan Dorosh (SDX24) • BCIT Full-Stack Web Development</p>
        </footer>
      </div>
    </main>
  );
}
