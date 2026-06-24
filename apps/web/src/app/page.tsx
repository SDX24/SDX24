import Image from "next/image";

import { HeroPhotoCard } from "@/components";
import { ProjectsScrollSection } from "@/components/cards/projects-scroll-section";

const heroDescription =
  "Full-stack developer working in TypeScript/Next.js - auth/session security, relational data modeling, real-time systems, and AI-integrated product flows. I build end-to-end across frontend, backend, data, and deployment: live company platforms, a client InsurTech SaaS, and a real-time scheduling app I led.";

const heroCareerNote =
  "2026 BCIT Full-Stack Web Development graduate, currently building across the stack on RUDI (an AI-native real-estate platform) and open to a role where I can keep growing.";

const caseStudyProject = {
  title: "Tandem",
  slogan: "Bridging work and childcare",
  description:
    "Tandem helps skilled-trades families plan childcare around changing shifts through one clear flow for scheduling, care sharing, and real-time status visibility.",
  stack: ["Auth + Session Security", "Typed Socket.IO", "Neon + Drizzle"],
  logoSrc: "/logos/tandem/tandem-logo.svg",
  wordmarkSrc: "/logos/tandem/wordmark.svg",
  links: [
    { label: "App Link", href: "https://tandem-app.com" },
    { label: "Repository Link", href: "https://github.com/IDSP-TRADECARE/Tandem" },
    { label: "Blog Link", href: "https://tandem-blog.vercel.app" },
  ],
  achievements: ["Trust", "Balance", "Support"],
  caseStudyBadge: "Case Study",
  coverSrc: "/logos/tandem/cover.png",
  brand: {
    primary: "#3373CC",
    primaryLight: "#91B3E3",
    secondary: "#92F189",
    analogous: "#68D5FF",
  },
  expandedDescription:
    "Tandem is a collaborative scheduling platform for skilled-trades families, built with secure authentication, typed real-time architecture, and AI-assisted scheduling workflows.",
  caseStudyHeading: "Tandem: Case Study",
  caseStudySummary:
    "Tandem is a mobile web app that helps parents in the skilled trades coordinate childcare around changing shifts. This case study covers my full-stack ownership across the 16-week build: privacy-aware guest auth, typed real-time architecture, and the data models behind shared scheduling.",
  caseStudyRole: "Lead Full-Stack Developer",
  caseStudyRoleResponsibilities: [
    "Built privacy-aware guest auth for iframe embedding with hardened HttpOnly, Secure, SameSite=None cookies and a full session lifecycle.",
    "Designed typed Socket.IO event contracts and room routing for group and direct real-time messaging.",
    "Owned profile and nanny-sharing data models on Drizzle + Neon Postgres, backed by end-to-end reliability checks.",
    "Implemented AI-assisted pipelines turning voice, text, and PDF input into structured scheduling data.",
  ],
  caseStudyTimeline: "Sep 2025 - Dec 2025 (16 weeks)",
  caseStudyTeam: "3 developers + 5 designers",
  caseStudyStack: [
    "Next.js 16",
    "React 19",
    "TypeScript",
    "Tailwind CSS",
    "Drizzle ORM",
    "Neon Postgres",
    "Clerk Auth",
    "Socket.IO",
    "FullCalendar",
    "IBM watsonx AI",
    "Groq SDK",
  ],
  caseStudySections: [
    {
      title: "Project Context and Problem",
      paragraphs: [
        "Tandem was built for parents in the skilled trades, who deal with early starts, overtime, and sudden shift changes. Competitive analysis showed that scheduling tools and childcare platforms exist separately, but none support shared childcare coordination between families in one place.",
        "Persona research confirmed the recurring pain points in shift-based households: sudden schedule changes, fragmented communication, and little time to evaluate childcare. Tandem combines scheduling and care coordination in a single mobile-first flow.",
      ],
      highlights: [
        "User need: fast childcare planning around variable work schedules.",
        "Gap: no unified tool for scheduling + childcare + shared responsibility.",
      ],
      citations: [
        {
          label: "CCOHS: Shiftwork impacts on family life and childcare",
          href: "https://www.ccohs.ca/oshanswers/ergonomics/shiftwrk.html",
        },
        {
          label: "Government of Canada: Early learning and childcare system overview",
          href: "https://www.canada.ca/en/employment-social-development/programs/early-learning-child-care.html",
        },
      ],
      assets: [
        {
          title: "Tandem dashboard on mobile",
          caption:
            "Live app dashboard showing daily schedule context and childcare coordination on mobile.",
          src: "/case-study/tandem/context/tandem-dashboard-mobile.png",
          imageAlt: "Tandem mobile dashboard showing childcare schedule overview",
        },
        {
          title: "Primary user persona",
          caption:
            "Primary persona used to define goals, behavior patterns, and childcare pain points for shift-based families.",
          src: "/case-study/tandem/context/tandem-user-persona.png",
          imageAlt:
            "Primary Tandem user persona showing behavior, goals, frustrations, scenarios, and key tasks.",
        },
      ],
      gradientVariant: "sky",
    },
    {
      title: "Role and Technical Ownership",
      paragraphs: [
        "I owned guest access, the real-time collaboration layer, and the profile-linked nanny-sharing data models that support multi-user coordination.",
        "For guest auth I built the full lifecycle (create, consume, clear) with cookies tuned for cross-origin iframe embedding (`HttpOnly`, `Secure`, `SameSite=None`). The typed Socket.IO layer uses centralized event contracts and room-scoped handlers for group and direct messages, paired with persist-first messaging (save over HTTP before WebSocket fanout) so refreshes and dropped packets never lose state.",
      ],
      highlights: [
        "Cross-origin iframe guest auth with hardened cookie settings and a full session lifecycle.",
        "Typed Socket.IO contracts enforced across handlers and hooks.",
        "Room-scoped channels instead of global broadcast; persist-first messaging for durability.",
      ],
      assets: [
        {
          title: "Guest auth cookie lifecycle (API route snippet)",
          caption:
            "Guest auth route showing anonymous user creation plus hardened cookie settings (`HttpOnly`, `Secure`, `SameSite=None`) for cross-origin iframe embedding.",
          src: "/case-study/tandem/role/tandem-guest-auth-cookie-flow.png",
          imageAlt: "Code snippet of Tandem guest auth route and cookie configuration",
        },
        {
          title: "Typed room handlers for share and direct chat",
          caption:
            "Socket handlers implementing typed event wiring and room-based join/leave behavior for nanny-share channels and direct messaging.",
          src: "/case-study/tandem/role/tandem-socket-room-handlers.png",
          imageAlt:
            "Code snippet of typed Socket.IO room handlers for share and direct message rooms",
        },
        {
          title: "Nanny shares schema",
          caption:
            "Shared coordination schema storing timing, price, capacity, and JSONB members/messages for active nanny-share collaboration.",
          src: "/case-study/tandem/role/tandem-schema-nanny-shares.png",
          imageAlt: "Database schema view for nanny shares table",
        },
        {
          title: "Profile system implementation",
          caption:
            "Profile screen connected to the `users` schema for identity, account context, and reusable preferences.",
          src: "/case-study/tandem/role/tandem-profile-screen.png",
          imageAlt: "Tandem profile screen used in the live app",
        },
      ],
      gradientVariant: "teal",
    },
    {
      title: "Outcomes & Delivery Impact",
      paragraphs: [
        "Consolidating scheduling and sharing into one flow cut the common scheduling path from ~6-7 interactions to ~3-4 focused actions, making fast updates easier during time-sensitive changes.",
        "Shared availability and group status became readable at a glance, removing the need to switch between separate calendar and chat tools for core coordination.",
      ],
      highlights: [
        "Core scheduling flow reduced from ~6-7 steps to ~3-4 actions.",
        "Shared availability and participation status unified into one view.",
        "Removed dependency on external calendar/chat tools for core coordination.",
      ],
      assets: [
        {
          title: "Scheduling outcome",
          caption:
            "Delivered scheduling view showing the streamlined planning flow in the live app.",
          src: "/case-study/tandem/outcomes/tandem-outcome-scheduling.png",
          imageAlt: "Tandem scheduling outcome screen",
        },
        {
          title: "Care-sharing outcome",
          caption:
            "Shared care coordination view bringing availability and participation status into one place.",
          src: "/case-study/tandem/outcomes/tandem-outcome-sharing.png",
          imageAlt: "Tandem care sharing outcome screen",
        },
        {
          title: "Dashboard outcome",
          caption:
            "Final dashboard combining daily schedule context and coordination in a single view.",
          src: "/case-study/tandem/outcomes/tandem-outcome-dashboard.png",
          imageAlt: "Tandem dashboard outcome screen",
        },
      ],
      gradientVariant: "mint",
    },
  ],
  caseStudyOutcomes: [
    "Core scheduling tasks now complete in about 3-4 focused actions instead of 6-7 scattered steps.",
    "Shared availability and participation status are visible in one place, reducing coordination ambiguity.",
    "Families can complete core planning without switching between separate calendar and chat tools.",
  ],
  caseStudyTeamCredits: [
    {
      name: "Stefan Dorosh",
      team: "Development",
      avatarSrc: "/case-study/members/Stefan.PNG",
      linkedin: "https://linkedin.com/in/stefan-dorosh",
      isSelf: true,
    },
    {
      name: "Matheus Demeis",
      team: "Development",
      avatarSrc: "/case-study/members/Matheus.PNG",
      linkedin: "https://www.linkedin.com/in/matheus-demeis/",
      portfolio: "https://www.matheusdemeis.com/projects/tandem",
    },
    {
      name: "Lam Thai",
      team: "Development",
      avatarSrc: "/case-study/members/Lam.PNG",
      linkedin: "https://www.linkedin.com/in/tuoclamthai/",
      portfolio: "https://lam-thai.com/work/tandem",
    },
    {
      name: "Thea Calaquian",
      team: "Design",
      avatarSrc: "/case-study/members/Thea.PNG",
      linkedin: "https://www.linkedin.com/in/thea-c/",
    },
    {
      name: "Angie Duong",
      team: "Design",
      avatarSrc: "/case-study/members/Angie.PNG",
      linkedin: "https://www.linkedin.com/in/angie-duong-vk/",
    },
    {
      name: "Sandy Chow",
      team: "Design",
      avatarSrc: "/case-study/members/Sandy.PNG",
      linkedin: "https://www.linkedin.com/in/chowminkyiu/",
    },
    {
      name: "Bonnie Wan",
      team: "Design",
      avatarSrc: "/case-study/members/Bonnie.PNG",
      linkedin: "https://www.linkedin.com/in/bonniewan1998/",
    },
    {
      name: "Alyssa Huggins",
      team: "Design",
      avatarSrc: "/case-study/members/Alyssa.PNG",
      linkedin: "https://www.linkedin.com/in/alyssa-huggins/",
    },
  ],
  caseStudyReferences: [
    { label: "Tandem live application", href: "https://tandem-app.com" },
    { label: "Tandem repository", href: "https://github.com/IDSP-TRADECARE/Tandem" },
    { label: "Tandem development blog", href: "https://tandem-blog.vercel.app" },
    {
      label: "CCOHS: Rotational shiftwork effects on family and childcare",
      href: "https://www.ccohs.ca/oshanswers/ergonomics/shiftwrk.html",
    },
  ],
  caseStudyPreview: {
    title: "Tandem Embedded Product Preview",
    summary:
      "This embedded preview lets reviewers quickly experience Tandem's live scheduling interactions without leaving the case study narrative.",
    iframeUrl: process.env.NEXT_PUBLIC_TANDEM_URL || "https://tandem-app.com",
    liveUrl: "https://tandem-app.com",
  },
};

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-black text-white">
      <div className="pointer-events-none fixed inset-0 bg-grid-dot opacity-60" />
      <div className="relative z-10">
        <section
          data-hero-sequence
          className="mx-auto flex min-h-screen w-full max-w-6xl items-center px-4 py-16 lg:py-24"
        >
          <div className="grid w-full items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)]">
            <div className="space-y-8 text-center lg:text-left" data-hero-left>
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
                  Full-stack developer working in TypeScript/Next.js
                </p>
              </div>
              <p className="mx-auto max-w-xl text-xl leading-relaxed text-gray-300 lg:mx-0">
                {heroDescription}
              </p>
              <p className="mx-auto max-w-xl text-lg leading-relaxed text-gray-400 lg:mx-0">
                {heroCareerNote}
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
                  href="https://gitlab.com/SDX24"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-brand-teal-light px-8 py-3 font-bold text-white transition-colors hover:bg-brand-teal"
                >
                  View GitLab
                </a>
                <a
                  href="https://linkedin.com/in/stefan-dorosh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border-2 border-brand-teal-light px-8 py-3 font-bold text-brand-clay transition-colors hover:bg-brand-teal-light/10"
                >
                  LinkedIn
                </a>
                <a
                  href="mailto:stefandorosh24@gmail.com"
                  className="rounded-lg border-2 border-brand-teal-light px-8 py-3 font-bold text-brand-clay transition-colors hover:bg-brand-teal-light/10"
                >
                  Contact
                </a>
                <a
                  href="/assets/resume/Resume-Stefan-Dorosh.pdf"
                  download="Resume-Stefan-Dorosh.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border-2 border-brand-teal-light px-8 py-3 font-bold text-brand-clay transition-colors hover:bg-brand-teal-light/10"
                >
                  Resume
                </a>
              </div>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400 lg:justify-start">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
                  <span className="h-2 w-2 rounded-full bg-brand-coral" />
                  <span>Open to full-stack opportunities</span>
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
                  Vancouver, BC
                </span>
              </div>
            </div>
            <div className="grid gap-10 lg:gap-12">
              <div className="hidden lg:block" aria-hidden="true" />
              <div className="flex w-full flex-col items-center lg:items-end">
                <HeroPhotoCard
                  contentClassName="p-4"
                  project={caseStudyProject}
                  enableBackHoverExpand={false}
                  enableLandedFocusEffect
                />
              </div>
            </div>
          </div>
        </section>

        <ProjectsScrollSection />

        <footer className="mx-auto w-full max-w-6xl px-4 pb-16 text-center text-sm text-gray-500">
          <p>© 2026 Stefan Dorosh (SDX24) • BCIT Full-Stack Web Development</p>
        </footer>
      </div>
    </main>
  );
}
