import Image from "next/image";

import { CometCard } from "@/components";

const heroDescription =
  "BCIT Full-Stack Web Development diploma candidate shipping Tandem's realtime childcare scheduler, leading InsurFlow's AI InsurTech stack, and crafting modern UI/UX touches for W3rlds while operating as a dependable web developer.";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-900 via-black to-black px-4 text-white">
      <div className="container flex max-w-6xl flex-col items-center justify-center gap-10 py-16 lg:py-24">
        <div className="grid w-full items-center gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-4 rounded-full border border-white/10 bg-white/5 px-4 py-2">
              <Image
                src="/logo-main-inverse.svg"
                alt="SDX24 Logo"
                width={56}
                height={56}
                priority
                quality={100}
                className="rounded-2xl bg-white/10 p-2"
              />
              <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-teal-light">
                  SDX24
                </p>
                <p className="text-lg font-semibold text-gray-200">Full-Stack Web Developer</p>
              </div>
            </div>
            <div className="space-y-3">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Stefan Dorosh
              </h1>
              <p className="text-lg font-semibold text-brand-teal-light">
                Shipping modern web experiences with clarity and care.
              </p>
            </div>
            <p className="max-w-xl text-lg leading-relaxed text-gray-300">{heroDescription}</p>
          </div>
          <div className="flex w-full justify-center lg:justify-end">
            <div className="w-full max-w-[360px]">
              <CometCard className="w-full">
                <button
                  type="button"
                  className="my-6 flex w-full cursor-pointer flex-col items-stretch rounded-[20px] border border-white/30 bg-white/5 p-2 shadow-[0_40px_80px_rgba(0,0,0,0.6)] backdrop-blur-3xl md:my-10 md:p-4"
                  aria-label="View the Comet-inspired profile"
                  style={{
                    transformStyle: "preserve-3d",
                    transform: "none",
                    opacity: 1,
                  }}
                >
                  <div className="mx-2 flex-1">
                    <div className="relative mt-2 h-0 w-full flex-1 overflow-hidden rounded-[16px] pb-[133%]">
                      <Image
                        src="/profile.jpg"
                        alt="Stefan Dorosh profile"
                        fill
                        className="absolute inset-0 h-full w-full rounded-[16px] border border-white/10 object-cover"
                        sizes="(max-width: 640px) 100vw, 320px"
                      />
                    </div>
                  </div>
                  <div className="mt-4 flex flex-col items-center gap-1 px-4 pb-6 text-center">
                    <p className="text-lg font-semibold">Stefan Dorosh</p>
                    <p className="text-xs text-gray-200">Web Developer</p>
                  </div>
                </button>
              </CometCard>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
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
            className="rounded-lg border-2 border-brand-teal-light px-8 py-3 font-bold text-brand-teal-light transition-colors hover:bg-brand-teal-light/10"
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

        {/* Featured Projects */}
        <div className="mt-8 w-full max-w-3xl">
          <h2 className="mb-6 text-center text-2xl font-bold text-white">Featured Projects</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {/* Tandem */}
            <a
              href="https://tandem-blog.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-xl border border-gray-700 bg-gray-800/50 p-6 transition-all hover:border-brand-teal-light hover:bg-gray-800"
            >
              <h3 className="mb-2 text-xl font-bold text-white group-hover:text-brand-teal-light">
                Tandem
              </h3>
              <p className="mb-3 text-sm font-medium text-brand-teal-light">Lead Developer</p>
              <p className="text-sm leading-relaxed text-gray-400">
                Mobile web app for childcare scheduling with real-time sync and live messaging.
                Built with modern architecture and Agile workflow.
              </p>
            </a>

            {/* InsurFlow */}
            <a
              href="https://github.com/Vero-Ventures/insurflow"
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-xl border border-gray-700 bg-gray-800/50 p-6 transition-all hover:border-brand-teal-light hover:bg-gray-800"
            >
              <h3 className="mb-2 text-xl font-bold text-white group-hover:text-brand-teal-light">
                InsurFlow
              </h3>
              <p className="mb-3 text-sm font-medium text-brand-teal-light">Full Stack Developer</p>
              <p className="text-sm leading-relaxed text-gray-400">
                AI-powered InsurTech SaaS platform with DevOps guardrails, CI/CD, and
                enterprise-grade practices.
              </p>
            </a>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-sm text-gray-500">
          <p>© 2026 Stefan Dorosh (SDX24) • BCIT Full-Stack Web Development</p>
        </footer>
      </div>
    </main>
  );
}
