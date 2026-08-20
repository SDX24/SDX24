/**
 * Tandem case study content.
 *
 * Previously this lived inside a hover-triggered fullscreen overlay, which meant it had no
 * URL, could not be linked in an application, and could not be indexed. It is now a route.
 */

export type CaseStudyAsset = {
  title: string;
  caption: string;
  src: string;
  alt: string;
};

export type CaseStudySection = {
  id: string;
  title: string;
  paragraphs: string[];
  highlights?: string[];
  assets?: CaseStudyAsset[];
};

export const TANDEM_CASE_STUDY = {
  title: "Tandem",
  tagline: "Childcare scheduling for families working shift work",
  summary:
    "A mobile web app that helps parents in the skilled trades coordinate childcare around changing shifts. This covers my full-stack ownership across the 16-week build: privacy-aware guest auth, typed real-time architecture, and the data models behind shared scheduling.",
  role: "Lead Full-Stack Developer",
  timeline: "Sep – Dec 2025 (16 weeks)",
  team: "3 developers, 5 designers",
  stack: [
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Drizzle ORM",
    "Neon Postgres",
    "Clerk Auth",
    "Socket.IO",
    "FullCalendar",
    "IBM watsonx",
    "Groq SDK",
  ],
  links: [
    { label: "Live app", href: "https://tandem-app.com" },
    { label: "Source", href: "https://github.com/IDSP-TRADECARE/Tandem" },
    { label: "Build blog", href: "https://tandem-blog.vercel.app" },
  ],
  metrics: [
    { value: "6–7 → 3–4", label: "Steps in the core scheduling path" },
    { value: "16 weeks", label: "Concept to deployed product" },
    { value: "8", label: "People on the team" },
  ],
  sections: [
    {
      id: "problem",
      title: "The problem",
      paragraphs: [
        "Tandem was built for parents in the skilled trades, who deal with early starts, overtime, and shift changes that land with little notice. Competitive analysis showed scheduling tools and childcare platforms exist separately, but nothing supported shared childcare coordination between families in one place.",
        "Persona research confirmed the recurring pain points in shift-based households: sudden schedule changes, fragmented communication, and very little time to evaluate childcare options when plans break.",
      ],
      highlights: [
        "Users needed to plan childcare fast, around work schedules that move.",
        "No single tool combined scheduling, childcare, and shared responsibility.",
      ],
      assets: [
        {
          title: "Primary user persona",
          caption:
            "The persona used to define goals, behaviour patterns, and childcare pain points for shift-based families.",
          src: "/case-study/tandem/context/tandem-user-persona.png",
          alt: "Tandem user persona showing behaviour, goals, frustrations, scenarios, and key tasks",
        },
        {
          title: "Dashboard on mobile",
          caption: "Daily schedule context and childcare coordination in the shipped app.",
          src: "/case-study/tandem/context/tandem-dashboard-mobile.png",
          alt: "Tandem mobile dashboard showing a childcare schedule overview",
        },
      ],
    },
    {
      id: "ownership",
      title: "What I owned",
      paragraphs: [
        "I owned guest access, the real-time collaboration layer, and the profile-linked sharing data models behind multi-user coordination.",
        "Guest auth needed a full lifecycle (create, consume, clear) with cookies tuned for cross-origin iframe embedding: HttpOnly, Secure, SameSite=None. The Socket.IO layer uses centralized typed event contracts and room-scoped handlers rather than global broadcast, paired with persist-first messaging: save over HTTP before the WebSocket fanout, so a refresh or a dropped packet never costs state.",
      ],
      highlights: [
        "Cross-origin guest auth with hardened cookies and a complete session lifecycle.",
        "Typed Socket.IO contracts enforced across every handler and hook.",
        "Room-scoped channels, not global broadcast; persist-first messaging for durability.",
      ],
      assets: [
        {
          title: "Guest auth cookie lifecycle",
          caption:
            "The guest auth route: anonymous user creation plus the hardened cookie settings that make iframe embedding safe.",
          src: "/case-study/tandem/role/tandem-guest-auth-cookie-flow.png",
          alt: "Code for the Tandem guest auth route and its cookie configuration",
        },
        {
          title: "Typed room handlers",
          caption:
            "Socket handlers implementing typed event wiring and room-based join/leave for share channels and direct messages.",
          src: "/case-study/tandem/role/tandem-socket-room-handlers.png",
          alt: "Code for typed Socket.IO room handlers covering share and direct message rooms",
        },
        {
          title: "Shared-care schema",
          caption:
            "The coordination schema: timing, price, capacity, and JSONB members and messages for an active share.",
          src: "/case-study/tandem/role/tandem-schema-nanny-shares.png",
          alt: "Database schema for the shared-care table",
        },
      ],
    },
    {
      id: "outcome",
      title: "The outcome",
      paragraphs: [
        "Consolidating scheduling and sharing into one flow cut the common scheduling path from roughly 6–7 interactions to 3–4 focused actions, which matters most exactly when a shift changes at short notice.",
        "Shared availability and group status became readable at a glance, removing the need to switch between a separate calendar and chat for the core coordination loop.",
      ],
      highlights: [
        "Core scheduling reduced from ~6–7 steps to ~3–4 actions.",
        "Availability and participation status unified into a single view.",
        "No dependency on external calendar or chat tools for core coordination.",
      ],
      assets: [
        {
          title: "Scheduling",
          caption: "The delivered scheduling view in the live app.",
          src: "/case-study/tandem/outcomes/tandem-outcome-scheduling.png",
          alt: "Tandem scheduling screen",
        },
        {
          title: "Shared care",
          caption: "Availability and participation status brought into one place.",
          src: "/case-study/tandem/outcomes/tandem-outcome-sharing.png",
          alt: "Tandem shared care screen",
        },
        {
          title: "Dashboard",
          caption: "The final dashboard combining daily schedule context and coordination.",
          src: "/case-study/tandem/outcomes/tandem-outcome-dashboard.png",
          alt: "Tandem dashboard screen",
        },
      ],
    },
  ] satisfies CaseStudySection[],
  credits: [
    { name: "Stefan Dorosh", team: "Development", href: "https://linkedin.com/in/stefan-dorosh" },
    {
      name: "Matheus Demeis",
      team: "Development",
      href: "https://www.linkedin.com/in/matheus-demeis/",
    },
    { name: "Lam Thai", team: "Development", href: "https://www.linkedin.com/in/tuoclamthai/" },
    { name: "Thea Calaquian", team: "Design", href: "https://www.linkedin.com/in/thea-c/" },
    { name: "Angie Duong", team: "Design", href: "https://www.linkedin.com/in/angie-duong-vk/" },
    { name: "Sandy Chow", team: "Design", href: "https://www.linkedin.com/in/chowminkyiu/" },
    { name: "Bonnie Wan", team: "Design", href: "https://www.linkedin.com/in/bonniewan1998/" },
    { name: "Alyssa Huggins", team: "Design", href: "https://www.linkedin.com/in/alyssa-huggins/" },
  ],
} as const;
