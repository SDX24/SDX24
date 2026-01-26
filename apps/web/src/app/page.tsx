import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black px-4">
      <div className="container flex max-w-4xl flex-col items-center justify-center gap-8 py-16">
        {/* Logo */}
        <div className="mb-4">
          <Image
            src="/logo-main-inverse.svg"
            alt="SDX24 Logo"
            width={120}
            height={120}
            priority
            quality={100}
          />
        </div>

        {/* Name & Title */}
        <div className="text-center">
          <h1 className="mb-3 text-5xl font-bold tracking-tight text-white sm:text-6xl">
            Stefan Dorosh
          </h1>
          <p className="text-2xl font-medium text-brand-teal-light sm:text-3xl">
            Full Stack Web Developer
          </p>
        </div>

        {/* Bio */}
        <p className="max-w-2xl text-center text-lg leading-relaxed text-gray-300">
          Building modern web applications with cutting-edge technologies. Specialized in React,
          Next.js, and TypeScript with a focus on clean code, automated DevOps, and scalable
          architecture.
        </p>

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
