import Image from "next/image";

import { HeroPhotoCard } from "@/components";
import { ProjectsScrollSection } from "@/components/cards/projects-scroll-section";

const heroDescription =
  "BCIT Full-Stack Web Development diploma candidate building Tandem's real-time childcare scheduler and InsurFlow's AI-powered InsurTech platform, with UI/UX internship experience at W3rlds.";

const caseStudyPlaceholderParagraphs = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec faucibus lectus non massa feugiat, at porta eros tempus. In eget aliquam sem. Fusce eleifend, massa nec ullamcorper fermentum, metus lectus rhoncus libero, eget gravida velit lorem nec mauris. Integer consequat nibh nec lorem tincidunt, in bibendum nisl pulvinar. Curabitur eu turpis a nisl tempor placerat. Sed suscipit urna id neque lacinia, non consectetur sem sodales. Proin malesuada, augue a interdum aliquet, lectus lectus pulvinar libero, non pretium erat erat et dolor.",
  "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed in congue lectus. Nunc vulputate, leo at ultricies tempus, sem lacus pulvinar augue, et finibus erat urna vel nibh. Cras in tincidunt est. Integer laoreet, turpis non eleifend maximus, libero erat pulvinar lorem, id volutpat magna ipsum in nisl. Nullam semper feugiat nisl, id pretium sem facilisis vel. Suspendisse potenti. Donec rutrum aliquet sapien, ac consectetur lectus mattis sed.",
  "Praesent ac massa sit amet turpis volutpat pulvinar. Nam faucibus dui id orci consequat posuere. In non nisl volutpat, sodales nibh et, consectetur elit. Maecenas vulputate, neque sed euismod finibus, nisl ex malesuada turpis, et faucibus mauris tortor quis dui. Integer ac nisi arcu. Pellentesque a purus a tortor posuere vulputate. Duis vel lectus at orci elementum tincidunt. Nullam euismod, sapien quis volutpat tristique, orci risus maximus dolor, sed semper est mi non lectus.",
  "Morbi finibus, ligula in auctor pharetra, augue enim egestas purus, non varius leo metus eget odio. Aliquam erat volutpat. In hac habitasse platea dictumst. Integer posuere urna at ligula volutpat, vitae posuere est posuere. Quisque congue turpis non odio auctor, nec gravida erat blandit. Suspendisse et faucibus justo. Aliquam non sem et justo placerat iaculis. Aenean dignissim, purus in sodales lacinia, ligula nisl commodo nisi, nec fermentum orci nisl et augue.",
  "Aenean dapibus enim non magna aliquam, id tincidunt eros sagittis. Duis pretium justo at odio congue, sed eleifend nibh rhoncus. Sed vel ex in turpis vulputate congue. Curabitur dictum elementum massa, et efficitur orci pharetra sit amet. Etiam vehicula blandit posuere. Duis eu lacinia lorem. Donec volutpat eros sit amet viverra tincidunt. Nulla facilisi. Donec ullamcorper, mauris at porta vulputate, mauris est dictum est, at posuere enim justo vitae arcu.",
  "Nam euismod augue eu tortor rhoncus porttitor. Vivamus vitae purus sit amet nunc suscipit blandit. Aliquam vestibulum ultrices velit, sed condimentum odio pellentesque at. Integer feugiat molestie tortor at ultrices. Duis sed arcu et lorem porta suscipit. Sed sollicitudin vestibulum sapien, eu vulputate neque tempor nec. Curabitur pretium consectetur magna, ut egestas augue congue eget. Fusce non ultrices metus. Integer dictum sem at turpis eleifend, id fermentum metus congue.",
];

const caseStudyProject = {
  title: "Tandem",
  slogan: "Bridging work and childcare",
  description:
    "Tandem helps parents in the trades balance work and childcare with AI scheduling, trusted care, and shared support.",
  stack: ["AI Scheduling", "Nanny Booking", "Care Sharing"],
  logoSrc: "/logos/tandem/tandem-logo.svg",
  wordmarkSrc: "/logos/tandem/wordmark.svg",
  links: [
    { label: "Live", href: "https://tandem-blog.vercel.app" },
    { label: "Repo", href: "https://github.com/IDSP-TRADECARE/Tandem" },
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
  caseStudyHeading: "Case Study Draft Placeholder",
  caseStudyRole:
    "Role: Front-End Developer. Involved in project structure, responsive interface design, interaction flow, and portfolio presentation of the end-to-end process.",
  caseStudyDraft: caseStudyPlaceholderParagraphs,
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
