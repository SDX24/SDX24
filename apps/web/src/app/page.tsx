import Image from "next/image";

import { HeroPhotoCard } from "@/components";
import { ProjectsScrollSection } from "@/components/cards/projects-scroll-section";

const heroDescription =
  "BCIT Full-Stack Web Development graduate proficient in building reliable web applications, collaborating across teams, following established codebase structure, and finding practical solutions when requirements are unclear or complex. I bring a friendly, supportive working style with clear communication and strong ownership from planning to delivery.";

const caseStudyProject = {
  title: "Tandem",
  slogan: "Bridging work and childcare",
  description:
    "Tandem helps trade families plan childcare around changing shifts through one clear flow for scheduling, care sharing, and real-time status visibility.",
  stack: ["Realtime Sync", "Socket.IO Messaging", "Neon + Drizzle"],
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
    "Tandem is built for trade parents who need dependable childcare and smart scheduling. It blends AI planning, trusted care networks, and community sharing to reduce stress and keep families supported.",
  caseStudyHeading: "Tandem: Case Study",
  caseStudySummary:
    "Tandem is a mobile web application designed for parents in the trades who need to coordinate childcare around changing work schedules. The case study follows a clear beginning-to-end narrative across problem context, implementation decisions, and delivery outcomes from a 16-week team cycle.",
  caseStudyRole: "Lead Full-Stack Developer",
  caseStudyRoleResponsibilities: [
    "Independently implemented guest authentication for iframe embedding with hardened HttpOnly, SameSite=None, and Secure cookies.",
    "Designed typed Socket.IO event contracts and room routing for group collaboration and direct communication.",
    "Built profile and nanny-sharing data models in Postgres and integrated persistence with Drizzle + Neon.",
    "Added end-to-end reliability checks for guest session creation, cookie cleanup, and real-time flow behavior.",
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
    "Radix UI",
    "date-fns",
    "react-dropzone",
    "uuid",
    "IBM watsonx AI",
    "Groq SDK",
  ],
  caseStudySections: [
    {
      title: "Project Context and Problem",
      paragraphs: [
        "Tandem was created for parents in the trades who often deal with early starts, overtime, and sudden schedule changes. Competitive analysis revealed that while scheduling tools and childcare platforms exist, none effectively support shared childcare coordination between multiple families.",
        "Most existing products solve only one side of the problem. Calendar tools handle dates but not shared care responsibility, and childcare tools help with provider search but not ongoing schedule coordination. Tandem was designed to combine both in one mobile-first flow so families can plan, share, and adjust in the same place.",
        "Primary persona research reinforced this direction by documenting recurring stress points in shift-based households, including sudden schedule changes, fragmented communication channels, and limited time to evaluate childcare options.",
      ],
      highlights: [
        "Primary user need: fast childcare planning around variable work schedules.",
        "Competitive gap: no unified tool for scheduling + childcare + shared responsibility.",
        "Product direction: one flow for availability, requests, and family coordination.",
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
            "Live app dashboard view showing daily schedule context and childcare coordination on mobile.",
          src: "/case-study/tandem/context/tandem-dashboard-mobile.png",
          imageAlt: "Tandem mobile dashboard showing childcare schedule overview",
        },
        {
          title: "Tandem dashboard on desktop",
          caption:
            "Desktop dashboard layout used to keep planning, visibility, and updates clear on larger screens.",
          src: "/case-study/tandem/context/tandem-dashboard-desktop.png",
          imageAlt: "Tandem desktop dashboard showing scheduling and coordination view",
        },
        {
          title: "Tandem dashboard mobile variant",
          caption:
            "Additional mobile state confirming readability and hierarchy during active schedule management.",
          src: "/case-study/tandem/context/tandem-dashboard-mobile-alt.png",
          imageAlt: "Tandem mobile screen with schedule cards and controls",
        },
        {
          title: "Primary user persona",
          caption:
            "Primary persona profile used to define goals, behavior patterns, and childcare pain points for shift-based families.",
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
        "This part of Tandem was implemented 100% by me: I owned guest access, real-time collaboration plumbing, and profile-linked nanny-sharing data foundations that support multi-user coordination.",
        "For guest authentication, I implemented the full lifecycle: create session in `/api/auth/guest`, consume identity through `guestSession` utilities, and clear cookies plus user data in `/api/auth/clear-data`. Cookie settings were tuned for cross-origin iframe behavior with `HttpOnly`, `Secure`, and `SameSite=None`.",
        "I also built the typed Socket.IO layer with centralized event contracts and room-scoped handlers for shared groups and direct messages, then paired it with persistence-first messaging (save over HTTP before WebSocket fanout) so refreshes and dropped packets do not lose message state.",
      ],
      highlights: [
        "Security constraint solved: cross-origin iframe guest auth with hardened cookie settings.",
        "Architecture choice: typed Socket.IO contracts in one place, enforced across handlers and hooks.",
        "Scalability pattern: room-scoped channels for group rooms and direct rooms instead of global broadcast.",
        "Reliability: full guest session lifecycle plus E2E checks for session persistence and cleanup.",
      ],
      assets: [
        {
          title: "Profile system implementation",
          caption:
            "Profile screen implemented by me and connected to the underlying `users` schema for identity, account context, and reusable preferences.",
          src: "/case-study/tandem/role/tandem-profile-screen.png",
          imageAlt: "Tandem profile screen used in the live app",
        },
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
          title: "Users table schema",
          caption:
            "Schema supporting account identity, profile attributes, and guest-user flags that power authenticated and anonymous flows.",
          src: "/case-study/tandem/role/tandem-schema-users.png",
          imageAlt: "Database schema view for Tandem users table",
        },
        {
          title: "Pending nanny requests schema",
          caption:
            "Request-state schema used to track user request lifecycle and enforce per-user/per-date uniqueness constraints.",
          src: "/case-study/tandem/role/tandem-schema-pending-nanny-requests.png",
          imageAlt: "Database schema view for pending nanny requests table",
        },
        {
          title: "Nanny shares schema",
          caption:
            "Shared coordination schema storing timing, price, capacity, and JSONB members/messages for active nanny-share collaboration.",
          src: "/case-study/tandem/role/tandem-schema-nanny-shares.png",
          imageAlt: "Database schema view for nanny shares table",
        },
      ],
      gradientVariant: "teal",
    },
    {
      title: "Challenge Breakdown",
      paragraphs: [
        "A core challenge was making one experience work clearly on both mobile and desktop without changing how key flows behave. Early layouts created uneven hierarchy across screens, so users needed more visual guidance to understand current status and next actions.",
        "Existing tools also failed to solve shared childcare coordination in one place. Families had to switch between calendars, messaging apps, and service platforms, which made responsibility and availability harder to track during schedule changes.",
        "Hi-fi scheduling passes exposed concrete friction points in monthly planning: unclear pending-work states, repetitive month switching, and weak visual feedback when users added or adjusted work blocks.",
      ],
      highlights: [
        "Problem: mobile and desktop hierarchy drifted -> Decision: switched to relative layout stacking -> Result: clearer cross-device readability.",
        "Problem: shared status was fragmented -> Decision: unified request and participation states -> Result: faster understanding of who is responsible.",
        "Problem: schedule transfer mismatches -> Decision: structured date handling and persistence rules -> Result: more reliable shared updates.",
      ],
      assets: [
        {
          title: "Hi-fi monthly scheduling board",
          caption:
            "High-fidelity monthly planning surface used to validate day density, readability, and action hierarchy before implementation tuning.",
          src: "/case-study/tandem/challenge/tandem-hifi-monthly-schedule.png",
          imageAlt: "Tandem high-fidelity monthly scheduling board view",
        },
        {
          title: "Hi-fi pending work state",
          caption:
            "Pending-work state used during design QA to ensure in-progress schedule edits remained visible and understandable.",
          src: "/case-study/tandem/challenge/tandem-hifi-add-work-pending.png",
          imageAlt: "Tandem high-fidelity pending work scheduling state",
        },
      ],
      gradientVariant: "amber",
    },
    {
      title: "Solution Strategy and Implementation",
      paragraphs: [
        "The solution combined scheduling and childcare coordination into one system so parents did not need multiple apps to manage the same task. The nanny-sharing feature was structured as one continuous journey: request, review, join, and schedule visibility.",
        "Flow states were designed to keep responsibility clear at each step. Parents can see open requests, member status, and shared availability without leaving the core schedule context.",
        "Features were separated into stable modules so updates to one part of the flow did not break other interactions. This kept the experience consistent while the sharing logic expanded.",
        "Implementation evidence in this section focuses on setup and transition states: first entry, participant review, schedule upload, month creation, and confirmation messaging.",
      ],
      highlights: [
        "Competitive gap solved: scheduling and childcare coordination now happen in one place.",
        "Nanny-sharing introduced as a structured feature, not a separate disconnected tool.",
        "Group participation states show availability and responsibility clearly.",
        "Hybrid delivery model (persist first, then socket fanout) keeps shared schedules responsive and durable.",
      ],
      assets: [
        {
          title: "Nanny-sharing empty state",
          caption:
            "Starting state where no requests exist yet, used to guide first-time user action.",
          src: "/case-study/tandem/solution/tandem-nanny-empty-state.png",
          imageAlt: "Tandem nanny sharing empty state",
        },
        {
          title: "Nanny request user details",
          caption:
            "Detailed request view used to review participant context before joining a shared plan.",
          src: "/case-study/tandem/solution/tandem-nanny-user-details.png",
          imageAlt: "Tandem nanny request user details screen",
        },
        {
          title: "Schedule upload flow (hi-fi)",
          caption:
            "Upload pathway used to transfer schedule inputs into the monthly planning experience with clear progression feedback.",
          src: "/case-study/tandem/solution/tandem-hifi-upload-schedule.png",
          imageAlt: "Tandem high-fidelity upload schedule flow",
        },
        {
          title: "New monthly schedule state (hi-fi)",
          caption:
            "Hi-fi month-creation view used to validate faster transition between planning cycles and cleaner initial setup.",
          src: "/case-study/tandem/solution/tandem-hifi-new-monthly.png",
          imageAlt: "Tandem high-fidelity new monthly schedule state",
        },
        {
          title: "Single-message confirmation state (hi-fi)",
          caption:
            "Targeted messaging state used to keep confirmations concise and reduce ambiguity during coordination handoff.",
          src: "/case-study/tandem/solution/tandem-hifi-apply-single-message.png",
          imageAlt: "Tandem high-fidelity single message confirmation state",
        },
      ],
      gradientVariant: "mint",
    },
    {
      title: "Outcomes & Delivery Impact",
      paragraphs: [
        "The final experience reduced the main scheduling path from approximately 6 to 7 interactions down to 3 to 4 focused actions for common planning tasks. This made fast updates easier during time-sensitive schedule changes.",
        "Availability and group status became easier to interpret after shared states were consolidated into one visible flow. The final system also removed repeated switching between external calendar and chat tools for core coordination steps.",
        "Final hi-fi validation screens confirmed that monthly childcare edits and scheduling confirmations were readable at a glance, helping preserve confidence during rapid plan changes.",
      ],
      highlights: [
        "Reduced core scheduling flow from ~6-7 steps to ~3-4 actions for common tasks.",
        "Improved clarity of availability and group participation status in shared care flows.",
        "Reduced navigation confusion between scheduling and sharing through unified flow states.",
        "Removed dependency on external coordination tools for core schedule + share actions.",
      ],
      assets: [
        {
          title: "Final request queue state",
          caption:
            "Delivered request-list state that made open sharing opportunities easier to scan and act on quickly.",
          src: "/case-study/tandem/solution/tandem-nanny-request-cards.png",
          imageAlt: "Final Tandem request queue state for nanny sharing",
        },
        {
          title: "Final group join state",
          caption:
            "Delivered join-confirmed state showing clear transition from request acceptance to shared coordination.",
          src: "/case-study/tandem/solution/tandem-nanny-group-join.png",
          imageAlt: "Final Tandem group join outcome state",
        },
        {
          title: "Final availability quality snapshot (hi-fi)",
          caption:
            "Finalized availability-focused state showing improved visibility of childcare readiness during decision-making.",
          src: "/case-study/tandem/solution/tandem-hifi-nanny-available.png",
          imageAlt: "Final Tandem high-fidelity nanny availability outcome screen",
        },
        {
          title: "Final childcare edit success state (hi-fi)",
          caption:
            "Completed monthly childcare edit state showing explicit success feedback after user updates were saved.",
          src: "/case-study/tandem/outcomes/tandem-hifi-childcare-edit-success.png",
          imageAlt: "Tandem high-fidelity monthly childcare edit success state",
        },
      ],
      gradientVariant: "teal",
    },
    {
      title: "Process Evidence and Iteration",
      paragraphs: [
        "This section compares the same core flows in mid-fi and hi-fi component files to show the iteration path from rough structure to production-ready interaction quality.",
        "The mid-fi pass exposed weak hierarchy, fragmented transitions, and unclear status visibility in dense scheduling states.",
        "The hi-fi pass applied those findings into clearer action order, stronger state communication, and more reliable request-to-join continuity.",
        "Together, the two files document the full process loop: diagnose in mid-fi, refine through implementation, and validate in hi-fi.",
      ],
      highlights: [
        "Mid-fi evidence: surfaced unclear hierarchy and fragmented state transitions in scheduling + sharing flows.",
        "Hi-fi outcome: delivered clearer visual hierarchy and stronger continuity from request review to group participation.",
        "Process result: improved responsive consistency and faster user understanding under time pressure.",
      ],
      assets: [
        {
          title: "Mid-fi component flow",
          caption:
            "Left preview shows the mid-fi component-file pass used to map structure and expose weak interaction points before refinement.",
          figmaEmbedUrl:
            "https://embed.figma.com/design/iTXfQJ6RyLxkGQFTo1kA4i/Tandem-Mid-fi?node-id=2533-3139&embed-host=share",
        },
        {
          title: "Hi-fi component flow",
          caption:
            "Right preview shows the hi-fi component-file pass that documents the improved path from rough, confusing states to clearer production-ready behavior.",
          figmaEmbedUrl:
            "https://embed.figma.com/design/98OrmiJpKUOwDCuckMRcah/Tandem-High-fi?node-id=2533-3139&embed-host=share",
        },
      ],
      gradientVariant: "slate",
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
      linkedin: "https://linkedin.com/in/stefan-dorosh-19b946323",
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
    {
      label: "Government of Canada: Federal early learning and child care overview",
      href: "https://www.canada.ca/en/employment-social-development/programs/early-learning-child-care.html",
    },
    {
      label: "Statistics Canada: Canadian Income Survey (2020)",
      href: "https://www150.statcan.gc.ca/n1/daily-quotidien/220323/dq220323a-eng.htm",
    },
    {
      label: "CDC NIOSH: Shift work and long work hours training",
      href: "https://www.cdc.gov/niosh/work-hour-training-for-nurses/longhours/mod2/08.html",
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
                  href="https://gitlab.com/SDX24"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-brand-teal-light px-8 py-3 font-bold text-white transition-colors hover:bg-brand-teal"
                >
                  View GitLab
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
                  className="rounded-lg border-2 border-brand-teal-light px-8 py-3 font-bold text-brand-clay transition-colors hover:bg-brand-teal-light/10"
                >
                  Contact
                </a>
                <a
                  href="/assets/resume/Stefan_Dorosh_Resume.txt"
                  download="Stefan_Dorosh_Resume.txt"
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
                  <span>Open to work from May 2026</span>
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
