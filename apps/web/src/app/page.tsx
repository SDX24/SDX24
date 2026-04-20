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
    { label: "Live", href: "https://tandem-app.com" },
    { label: "Repo", href: "https://github.com/IDSP-TRADECARE/Tandem" },
    { label: "Blog", href: "https://tandem-blog.vercel.app" },
    { label: "Figma (Placeholder)", href: "https://placeholder.example/tandem-figma" },
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
    "Tandem is a mobile web application designed for parents in the trades who need to coordinate childcare around changing work schedules. The case study documents problem framing, challenge constraints, implementation strategy, and delivery outcomes from a 16-week team cycle.",
  caseStudyRole:
    "Role: Lead Full-Stack Developer. Responsible for core application architecture, real-time synchronized sessions, live messaging, profile system implementation, guest access architecture, and key nanny-sharing flows.",
  caseStudyTimeline: "Sep 2025 - Dec 2025 (16 weeks)",
  caseStudyTeam: "3 developers + 5 designers",
  caseStudyStack: [
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "PostgreSQL",
    "Drizzle ORM",
    "Real-time Messaging",
    "Mobile-first Web",
  ],
  caseStudySections: [
    {
      title: "Project Context and Problem",
      paragraphs: [
        "Tandem was created to support parents in the trades who manage unpredictable shifts, early starts, overtime, and last-minute schedule changes. Existing scheduling products are mostly optimized for stable routines, which creates a gap for families that need flexible childcare coordination in real time.",
        "The project objective was to build a mobile-first web product that makes childcare scheduling, nanny sharing, and communication easier to manage without requiring complex setup steps. The core requirement was clear: reduce coordination friction while preserving privacy and trust for family-related information.",
      ],
      highlights: [
        "Primary user need: fast, clear childcare coordination around variable work schedules.",
        "Product direction: combine scheduling, messaging, and profile context in one flow.",
        "Assignment alignment: present practical problem framing before technical implementation details.",
      ],
      assets: [
        {
          title: "Tandem product overview screen",
          caption:
            "Replace with the strongest product-level screenshot that shows childcare scheduling context at a glance.",
          placeholder: true,
          href: "https://placeholder.example/tandem-overview-screen",
        },
      ],
    },
    {
      title: "Role and Scope",
      paragraphs: [
        "The lead full-stack role covered architecture decisions and delivery across multiple feature areas, with direct ownership over profile systems, guest-mode behavior, and major nanny-sharing logic. Work also included integration support across navigation, schedule transfer behavior, and system-level feature linking.",
        "The profile section was implemented end-to-end, including user schema and data-layer structures tied to identity and app state. Collaboration followed an Agile team workflow with regular iteration and integration checkpoints across design and development.",
      ],
      highlights: [
        "Owned feature surfaces: profile, guest mode, nanny-sharing system flow, and linked integrations.",
        "Architecture responsibilities included real-time session synchronization and live messaging continuity.",
        "Data responsibilities included user schemas and related persistence structures.",
      ],
      assets: [
        {
          title: "Profile implementation evidence",
          caption:
            "Replace with profile UI + schema evidence pair (screen + diagram or code snapshot export).",
          placeholder: true,
          href: "https://placeholder.example/tandem-profile-evidence",
        },
      ],
    },
    {
      title: "Challenge Breakdown",
      paragraphs: [
        "One major challenge was delivering a mobile-first experience that still functioned reliably on desktop contexts. Layout and interaction behavior required repeated tuning to maintain clarity across viewport sizes without fragmenting feature behavior.",
        "Another challenge was privacy-safe guest access. The product needed guest usability for demos and embeds while preserving privacy boundaries for child-related and family scheduling data. This required authentication rewiring and a controlled temporary guest-user model that stayed compatible with app-level chat and feature flows.",
        "Nanny-sharing integration introduced additional complexity around acceptance behavior, cross-connection state handling, calendar timing, and overlap logic. Reliable date generation, transfer, and persistence required rigorous handling of async states and timing dependencies.",
      ],
      highlights: [
        "Cross-device consistency challenge solved through responsive relative layout strategy.",
        "Privacy challenge solved through guest-user architecture integrated with auth boundaries.",
        "Date overlap challenge solved through strict date generation and transfer logic controls.",
        "Integration challenge solved by separating high-coupling flows into stable service boundaries.",
      ],
      assets: [
        {
          title: "Responsive behavior comparison",
          caption:
            "Replace with mobile vs desktop comparison set that demonstrates consistent scheduling flow.",
          placeholder: true,
          href: "https://placeholder.example/tandem-responsive-compare",
        },
        {
          title: "Guest-mode privacy flow",
          caption:
            "Replace with authentication flow diagram showing guest-entry boundary and temporary user lifecycle.",
          placeholder: true,
          href: "https://placeholder.example/tandem-guest-privacy-flow",
        },
      ],
    },
    {
      title: "Solution Strategy and Implementation",
      paragraphs: [
        "The delivery strategy prioritized cohesive system behavior over isolated feature launches. Nanny-sharing logic, messaging behavior, async group joins, and calendar transfer operations were designed to work as a single flow rather than disconnected modules.",
        "Messaging and synchronization logic were structured to keep users aligned across active sessions. Calendar form handling was designed to transfer and persist schedule information cleanly so users could access shared data without repeated manual reconstruction.",
        "Where integration risk was high, service boundaries were separated to improve reliability. This architecture reduced coupling issues and protected the main app experience from instability in complex group logic scenarios.",
      ],
      highlights: [
        "Implemented nanny-sharing calendar form flow with persistence into app-visible schedule state.",
        "Implemented async group-join behavior with privacy-aware connection handling.",
        "Implemented automatic nanny-share creation and related navigation/system flow.",
        "Delivered real-time synchronized sessions and live messaging continuity.",
      ],
      assets: [
        {
          title: "Nanny-sharing feature walkthrough",
          caption:
            "Replace with sequence screenshots showing create -> join -> schedule transfer -> persisted view.",
          placeholder: true,
          href: "https://placeholder.example/tandem-nanny-sharing-sequence",
        },
        {
          title: "System integration map",
          caption:
            "Replace with diagram that links profile, guest mode, messaging, and scheduling subsystems.",
          placeholder: true,
          href: "https://placeholder.example/tandem-system-map",
        },
      ],
    },
    {
      title: "Process Evidence and Iteration",
      paragraphs: [
        "The project followed iterative Agile delivery with cross-functional collaboration between development and design. Implementation decisions were continuously reviewed against practical user flow clarity, especially for schedule and navigation transitions.",
        "Process artifacts such as user flow references, design iterations, and implementation checkpoints were used to keep product behavior aligned with the core use case: fast, intuitive childcare coordination under time pressure.",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer facilisis augue at risus ullamcorper, id tincidunt lectus posuere. Morbi interdum leo ac sem posuere, nec condimentum nunc varius.",
      ],
      highlights: [
        "Agile delivery cadence used for cross-team coordination and integration quality.",
        "Flow-level validation emphasized practical path clarity over feature count.",
        "Placeholder paragraph included pending final research notes and iteration logs.",
      ],
      assets: [
        {
          title: "Figma user flow",
          caption: "Replace with final approved user-flow board.",
          placeholder: true,
          href: "https://placeholder.example/tandem-user-flow-figma",
        },
        {
          title: "Figma high-fidelity screens",
          caption: "Replace with final high-fidelity screen set used for implementation.",
          placeholder: true,
          href: "https://placeholder.example/tandem-hifi-figma",
        },
      ],
      citations: [
        {
          label: "Case-study structure reference",
          href: "https://www.casestudy.club/case-studies",
        },
        {
          label: "Research source placeholder",
          href: "https://placeholder.example/tandem-research-source-01",
          placeholder: true,
        },
      ],
    },
    {
      title: "Outcomes and Delivery Impact",
      paragraphs: [
        "Measured impact in this phase was primarily qualitative. The final product became more concise, easier to navigate, and more predictable for users moving between scheduling tasks and related feature pages.",
        "Flow complexity was reduced by removing unnecessary navigation steps and clarifying system transitions. Users can identify destination pages and relevant actions with less friction, improving practical usability without heavy tutorial dependency.",
      ],
      highlights: [
        "Reduced interaction clutter and improved navigation clarity.",
        "Improved flow predictability across scheduling, profile, and shared-feature transitions.",
        "Maintained privacy-conscious behavior while supporting guest-mode usability.",
      ],
      assets: [
        {
          title: "Before/after flow map",
          caption:
            "Replace with side-by-side flow complexity comparison that visualizes simplification outcomes.",
          placeholder: true,
          href: "https://placeholder.example/tandem-before-after-flow",
        },
      ],
    },
  ],
  caseStudyOutcomes: [
    "Core navigation became more concise and easier to understand without onboarding tutorials.",
    "Scheduling and related pages were reorganized into clearer pathways with reduced interaction clutter.",
    "Guest mode made product sharing and embedding practical while preserving privacy boundaries.",
    "Nanny-sharing flow achieved reliable transfer and persistence behavior across async connections.",
  ],
  caseStudyTeamCredits: [
    {
      name: "Design Team Member 01",
      role: "UI/UX Designer",
      linkedin: "https://placeholder.example/linkedin-designer-01",
      placeholder: true,
    },
    {
      name: "Design Team Member 02",
      role: "UI/UX Designer",
      linkedin: "https://placeholder.example/linkedin-designer-02",
      placeholder: true,
    },
    {
      name: "Design Team Member 03",
      role: "UI/UX Designer",
      linkedin: "https://placeholder.example/linkedin-designer-03",
      placeholder: true,
    },
    {
      name: "Design Team Member 04",
      role: "UI/UX Designer",
      linkedin: "https://placeholder.example/linkedin-designer-04",
      placeholder: true,
    },
    {
      name: "Design Team Member 05",
      role: "UI/UX Designer",
      linkedin: "https://placeholder.example/linkedin-designer-05",
      placeholder: true,
    },
  ],
  caseStudyReferences: [
    { label: "Tandem live application", href: "https://tandem-app.com" },
    { label: "Tandem repository", href: "https://github.com/IDSP-TRADECARE/Tandem" },
    { label: "Tandem development blog", href: "https://tandem-blog.vercel.app" },
    {
      label: "Figma case-study board",
      href: "https://placeholder.example/tandem-figma-case-study",
      placeholder: true,
    },
    {
      label: "Research citation placeholder",
      href: "https://placeholder.example/tandem-research-source-02",
      placeholder: true,
    },
  ],
  caseStudyPreview: {
    title: "Tandem Embedded Product Preview",
    summary:
      "This embedded preview mirrors the live interaction style tested in the sandbox route and lets reviewers quickly experience scheduling UI behavior without leaving the case study narrative.",
    iframeUrl: process.env.NEXT_PUBLIC_TANDEM_URL || "https://tandem-app.com",
    liveUrl: "https://tandem-app.com",
    sandboxHref: "/test",
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
