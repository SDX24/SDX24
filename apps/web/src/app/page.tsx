import Image from "next/image";

import { HeroPhotoCard } from "@/components";
import { ProjectsScrollSection } from "@/components/cards/projects-scroll-section";

const heroDescription =
  "BCIT Full-Stack Web Development diploma candidate building Tandem's real-time childcare scheduler and InsurFlow's AI-powered InsurTech platform, with UI/UX internship experience at W3rlds.";

const caseStudyProject = {
  title: "Tandem",
  slogan: "Bridging work and childcare",
  description:
    "Tandem helps parents in the trades balance work and childcare with AI scheduling, trusted care, and shared support.",
  stack: ["AI Scheduling", "Nanny Booking", "Care Sharing"],
  logoSrc: "/logos/tandem/tandem-logo.svg",
  wordmarkSrc: "/logos/tandem/wordmark.svg",
  links: [
    { label: "App Link", href: "https://tandem-app.com" },
    { label: "Repository Link", href: "https://github.com/IDSP-TRADECARE/Tandem" },
    { label: "Blog Link", href: "https://tandem-blog.vercel.app" },
  ],
  achievements: ["Trust", "Balance", "Support"],
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
    "Led core application architecture and system integration decisions.",
    "Implemented real-time synchronized sessions and live messaging continuity.",
    "Built the profile system end-to-end, including user schema and persistence layers.",
    "Delivered nanny-sharing flows covering async group joins, calendar transfer, and automatic share creation.",
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
      ],
      gradientVariant: "sky",
    },
    {
      title: "Role and Scope",
      paragraphs: [
        "The role covered full-stack delivery across profile, scheduling, and nanny-sharing features, with direct ownership of profile system behavior and key sharing interactions. Work focused on keeping the product understandable for busy parents while still supporting complex schedule changes.",
        "The profile experience was implemented end-to-end so account details, preferences, and app state stayed consistent across sessions. Development followed weekly design-development checkpoints to keep feature behavior aligned with real usage patterns.",
      ],
      highlights: [
        "Owned surfaces: profile, nanny-sharing flow, and linked schedule interactions.",
        "Built profile behavior to support reliable account and preference state.",
        "Worked with design and development teams through continuous iteration checkpoints.",
      ],
      assets: [
        {
          title: "Profile system implementation",
          caption:
            "Implemented profile screen used to manage identity, account context, and reusable user settings.",
          src: "/case-study/tandem/role/tandem-profile-screen.png",
          imageAlt: "Tandem profile screen used in the live app",
        },
      ],
      gradientVariant: "teal",
    },
    {
      title: "Challenge Breakdown",
      paragraphs: [
        "A core challenge was making one experience work clearly on both mobile and desktop without changing how key flows behave. Early layouts created uneven hierarchy across screens, so users needed more visual guidance to understand current status and next actions.",
        "Existing tools also failed to solve shared childcare coordination in one place. Families had to switch between calendars, messaging apps, and service platforms, which made responsibility and availability harder to track during schedule changes.",
      ],
      highlights: [
        "Problem: mobile and desktop hierarchy drifted -> Decision: switched to relative layout stacking -> Result: clearer cross-device readability.",
        "Problem: shared status was fragmented -> Decision: unified request and participation states -> Result: faster understanding of who is responsible.",
        "Problem: schedule transfer mismatches -> Decision: structured date handling and persistence rules -> Result: more reliable shared updates.",
      ],
      assets: [
        {
          title: "Responsive scheduling desktop layout",
          caption:
            "Desktop layout reference used to maintain hierarchy for scheduling and coordination tasks.",
          src: "/case-study/tandem/challenge/tandem-responsive-desktop.png",
          imageAlt: "Tandem desktop layout used for scheduling and sharing context",
        },
        {
          title: "Responsive scheduling mobile layout",
          caption:
            "Mobile layout reference used to preserve action clarity and card readability on smaller screens.",
          src: "/case-study/tandem/challenge/tandem-responsive-mobile.png",
          imageAlt: "Tandem mobile layout used for scheduling and sharing context",
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
      ],
      highlights: [
        "Competitive gap solved: scheduling and childcare coordination now happen in one place.",
        "Nanny-sharing introduced as a structured feature, not a separate disconnected tool.",
        "Group participation states show availability and responsibility clearly.",
        "Real-time updates keep shared schedules aligned across family members.",
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
          title: "Nanny request cards",
          caption:
            "Request list state showing available sharing requests and quick decision pathways.",
          src: "/case-study/tandem/solution/tandem-nanny-request-cards.png",
          imageAlt: "Tandem nanny request cards view",
        },
        {
          title: "Nanny request user details",
          caption:
            "Detailed request view used to review participant context before joining a shared plan.",
          src: "/case-study/tandem/solution/tandem-nanny-user-details.png",
          imageAlt: "Tandem nanny request user details screen",
        },
        {
          title: "Group join and shared state",
          caption:
            "Joined state showing how users move from request acceptance to active shared coordination.",
          src: "/case-study/tandem/solution/tandem-nanny-group-join.png",
          imageAlt: "Tandem group join and shared schedule state",
        },
      ],
      gradientVariant: "mint",
    },
    {
      title: "Process Evidence and Iteration",
      paragraphs: [
        "The team worked in weekly cycles with design and development review checkpoints. Each iteration focused on making key tasks easier to understand under time pressure.",
        "When users struggled to read schedule state quickly, card hierarchy was updated to make status and action order clearer. This reduced scanning effort across both desktop and mobile screens.",
        "When the sharing path felt fragmented, the flow was consolidated into one request-to-join sequence. This gave users a cleaner path from discovery to shared schedule participation.",
      ],
      highlights: [
        "Problem: users struggled to understand schedule state -> Decision: clearer card hierarchy -> Result: improved readability.",
        "Problem: sharing flow was fragmented -> Decision: unified request-to-join sequence -> Result: reduced confusion.",
        "Problem: mobile structure drifted in dense views -> Decision: relative stacking adjustments -> Result: stronger responsive consistency.",
      ],
      assets: [
        {
          title: "Figma user flow",
          caption:
            "Final approved user-flow board used to align navigation and interaction sequence.",
          figmaEmbedUrl:
            "https://embed.figma.com/design/iTXfQJ6RyLxkGQFTo1kA4i/Tandem-Mid-fi?node-id=2042-349&embed-host=share&hide-ui=1",
        },
        {
          title: "Figma high-fidelity screens",
          caption: "Final high-fidelity screen set used as implementation and QA reference.",
          figmaEmbedUrl:
            "https://embed.figma.com/design/98OrmiJpKUOwDCuckMRcah/Tandem-High-fi?node-id=7483-13237&embed-host=share&hide-ui=1",
        },
      ],
      gradientVariant: "slate",
    },
    {
      title: "Outcomes & Delivery Impact",
      paragraphs: [
        "The final experience reduced the main scheduling path from approximately 6 to 7 interactions down to 3 to 4 focused actions for common planning tasks. This made fast updates easier during time-sensitive schedule changes.",
        "Availability and group status became easier to interpret after shared states were consolidated into one visible flow. The final system also removed repeated switching between external calendar and chat tools for core coordination steps.",
      ],
      highlights: [
        "Reduced core scheduling flow from ~6-7 steps to ~3-4 actions for common tasks.",
        "Improved clarity of availability and group participation status in shared care flows.",
        "Reduced navigation confusion between scheduling and sharing through unified flow states.",
        "Removed dependency on external coordination tools for core schedule + share actions.",
      ],
      assets: [
        {
          title: "Final dashboard quality snapshot",
          caption:
            "Polished dashboard state used to demonstrate final readability and planning clarity.",
          src: "/case-study/tandem/outcomes/tandem-outcome-dashboard.png",
          imageAlt: "Final Tandem dashboard outcome screen",
        },
        {
          title: "Final scheduling quality snapshot",
          caption: "Polished scheduling and request state showing clearer action hierarchy.",
          src: "/case-study/tandem/outcomes/tandem-outcome-scheduling.png",
          imageAlt: "Final Tandem scheduling outcome screen",
        },
        {
          title: "Final sharing quality snapshot",
          caption:
            "Polished shared coordination state showing availability and responsibility visibility.",
          src: "/case-study/tandem/outcomes/tandem-outcome-sharing.png",
          imageAlt: "Final Tandem sharing outcome screen",
        },
      ],
      gradientVariant: "teal",
    },
  ],
  caseStudyOutcomes: [
    "Core scheduling tasks now complete in about 3-4 focused actions instead of 6-7 scattered steps.",
    "Shared availability and participation status are visible in one place, reducing coordination ambiguity.",
    "Families can complete core planning without switching between separate calendar and chat tools.",
  ],
  caseStudyTeamCredits: [
    {
      name: "Matheus Demeis",
      team: "Development",
      linkedin: "https://www.linkedin.com/in/matheus-demeis/",
      portfolio: "https://www.matheusdemeis.com/projects/tandem",
      github: "https://github.com/MatheusDemeis",
      avatarSrc: "/case-study/members/Matheus.PNG",
    },
    {
      name: "Lam Thai",
      team: "Development",
      linkedin: "https://www.linkedin.com/in/tuoclamthai/",
      portfolio: "https://lam-thai.com/work/tandem",
      github: "https://github.com/lamthai",
      avatarSrc: "/case-study/members/Lam.PNG",
    },
    {
      name: "Thea Calaquian",
      team: "Design",
      linkedin: "https://www.linkedin.com/in/thea-c/",
      avatarSrc: "/case-study/members/Thea.PNG",
    },
    {
      name: "Angie Duong",
      team: "Design",
      linkedin: "https://www.linkedin.com/in/angie-duong-vk/",
      avatarSrc: "/case-study/members/Angie.PNG",
    },
    {
      name: "Sandy Chow",
      team: "Design",
      linkedin: "https://www.linkedin.com/in/chowminkyiu/",
      avatarSrc: "/case-study/members/Sandy.PNG",
    },
    {
      name: "Bonnie Wan",
      team: "Design",
      linkedin: "https://www.linkedin.com/in/bonniewan1998/",
      avatarSrc: "/case-study/members/Bonnie.PNG",
    },
    {
      name: "Alyssa Huggins",
      team: "Design",
      linkedin: "https://www.linkedin.com/in/alyssa-huggins/",
      avatarSrc: "/case-study/members/Alyssa.PNG",
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

const rationales = [
  {
    title: "Tandem (Case Study)",
    body: "Tandem is a childcare and scheduling platform designed for trade families with irregular shifts and limited support windows. The project challenge was to reduce planning stress while preserving trust, safety, and transparency in every booking step. The solution combines guided scheduling, care-provider visibility, and clear status communication so families can move from uncertainty to action quickly. Interface decisions prioritize plain language, predictable navigation, and mobile-first readability because most scheduling moments happen under time pressure. The final structure presents process, decisions, and outcomes in sequence, allowing reviewers to understand the project from early framing to delivery without needing technical background.",
  },
  {
    title: "Rudi",
    body: "Rudi is a content-rich production website created to communicate services and brand value with stronger clarity. The core requirement was balancing visual identity with quick information access across desktop and mobile contexts. The design solution uses clear section hierarchy, consistent spacing rhythm, and readable typography so visitors can understand offerings without friction. Navigation and page flow were structured to reduce scanning effort and keep attention on the most important content first. The implementation emphasizes responsive behavior, stable performance, and visual consistency, resulting in a polished platform that supports both discovery and decision-making for first-time and returning visitors.",
  },
  {
    title: "InsurFlow",
    body: "InsurFlow is a direct-to-consumer term life insurance experience tailored for clarity during a high-stakes decision process. The main challenge was simplifying complex eligibility and estimate steps without removing important context. The solution introduces a guided flow with concise prompts, transparent estimate framing, and straightforward progress indicators that reduce confusion. Visual and structural choices support trust by keeping interactions consistent and predictable from intake to submission. Supporting architecture was built with production standards in mind so usability improvements are matched by reliability. The completed project demonstrates how information-heavy financial journeys can remain approachable while preserving quality and technical rigor.",
  },
  {
    title: "Adult",
    body: "Adult is a practical life-skills guide that helps young adults navigate budgeting, taxes, renting, and career preparation with less uncertainty. The key challenge was presenting broad topics without overwhelming users or burying critical next steps. The solution uses focused pathways, regional context, and accessible visual patterns that support quick comprehension. Content hierarchy and interaction design were shaped to keep each section actionable, with language that remains clear for general audiences. The final result is an educational resource that feels structured and supportive, turning complex real-world tasks into manageable sequences and improving confidence during early independent decision-making.",
  },
  {
    title: "Bandit Breakout",
    body: "Bandit Breakout is a browser game project centered on interaction timing, progression, and replay value. The challenge was to create a responsive gameplay loop that feels fair while still rewarding repeated attempts and skill improvement. The solution emphasizes readable state transitions, consistent controls, and pacing that escalates difficulty without breaking flow. Visual feedback and movement rhythm were tuned to make outcomes feel understandable, even during faster moments. Supporting project documentation helps viewers follow design intent and implementation logic at a high level. The completed work demonstrates strong control over mechanics, player guidance, and overall gameplay coherence in a compact format.",
  },
  {
    title: "Express Documentation",
    body: "Express Documentation is an educational reference site built to explain core Express concepts in a clear, structured format. The primary challenge was organizing technical material so it remains useful to beginners while still efficient for quick lookup. The solution uses deliberate sectioning, concise examples, and predictable navigation to improve scanning and retention. Information architecture decisions prioritize concept order and readability so each topic builds naturally on the previous one. The finished site presents implementation guidance in an approachable way, helping learners move from foundational understanding to practical application with less friction and stronger confidence.",
  },
];

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
                <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-amber-300">
                  <span className="h-2 w-2 rounded-full bg-amber-400" />
                  Portfolio WIP
                </span>
              </div>
            </div>
            <div className="grid gap-10 lg:gap-12">
              <div className="hidden lg:block" aria-hidden="true" />
              <div className="flex w-full flex-col items-center gap-6 lg:items-end">
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

        <section className="mx-auto w-full max-w-6xl px-4 pb-16 pt-24">
          <h2 className="mb-10 text-center text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Rationales
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {rationales.map((rationale) => (
              <article
                key={rationale.title}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur"
              >
                <h3 className="mb-3 text-xl font-semibold text-brand-apricot">{rationale.title}</h3>
                <p className="text-sm leading-relaxed text-gray-200">{rationale.body}</p>
              </article>
            ))}
          </div>
        </section>

        <div className="min-h-[260vh]" aria-hidden="true" />

        <footer className="mx-auto w-full max-w-6xl px-4 pb-16 text-center text-sm text-gray-500">
          <p>© 2026 Stefan Dorosh (SDX24) • BCIT Full-Stack Web Development</p>
        </footer>
      </div>
    </main>
  );
}
