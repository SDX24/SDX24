/**
 * Project catalogue.
 *
 * Every entry leads with `problem` / `approach` / `outcome` because that is what a reviewer
 * is actually scanning for. A stack list alone says nothing about judgment.
 */

export type ProjectLink = { label: string; href: string };

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  /** Ownership context: what was actually mine, and when. */
  role: string;
  period: string;
  problem: string;
  approach: string;
  outcome: string;
  stack: string[];
  links: ProjectLink[];
  logoSrc?: string;
  /**
   * Presentation weight, and the reason the grid has a hierarchy at all:
   * - `primary`   RUDI. Current work, largest card, full narrative.
   * - `secondary` Tandem and InsurFlow. Equal to each other, full narrative, half width.
   * - `minor`     Everything else. Outcome only.
   */
  tier: "primary" | "secondary" | "minor";
  /** Set when there is a full case-study route to link to. */
  caseStudyHref?: string;
};

export const PROJECTS: Project[] = [
  {
    slug: "rudi",
    title: "RUDI",
    tagline: "AI-native platform for long-term villa rentals",
    role: "Full-Stack Developer",
    period: "Jan 2026 – Present",
    problem:
      "Listing a rental property meant manual data entry against a catalogue of thousands of villas, and renters had no way to search by how a place actually felt to live in.",
    approach:
      'I build across frontend, backend, and infrastructure, including the "Ask RUDI" voice and text assistant with response streaming and durable conversation history, plus catalog, listing, and detail interfaces against the Google Maps API and OAuth.',
    outcome:
      "A 2,000+ verified-villa marketplace in production. The company is a final-round applicant to the a16z Speedrun and HF0 accelerators, where I am named as a developer.",
    stack: ["TypeScript", "Next.js", "Google Maps API", "OAuth", "Streaming AI"],
    links: [{ label: "Live site", href: "https://rudi.asia" }],
    logoSrc: "/logos/rudi/favicon.png",
    tier: "primary",
  },
  {
    slug: "tandem",
    title: "Tandem",
    tagline: "Childcare scheduling for families working shift work",
    role: "Lead Full-Stack Developer",
    period: "Sep – Dec 2025",
    problem:
      "Parents in the skilled trades plan childcare around shifts that move without notice. Scheduling tools and childcare platforms exist separately, so coordination happened across a calendar, a group chat, and a phone call.",
    approach:
      "I owned guest access, the real-time layer, and the shared-care data models: a full guest-session lifecycle with cookies hardened for cross-origin iframe embedding, typed Socket.IO contracts with room-scoped routing, and persist-first messaging so a dropped packet never loses state.",
    outcome:
      "The core scheduling path went from roughly 6–7 scattered interactions to 3–4 focused actions, with shared availability and participation status readable in one view.",
    stack: ["TypeScript", "Next.js", "Socket.IO", "Drizzle ORM", "Neon Postgres", "Clerk"],
    links: [
      { label: "Live app", href: "https://tandem-app.com" },
      { label: "Source", href: "https://github.com/IDSP-TRADECARE/Tandem" },
    ],
    logoSrc: "/logos/tandem/tandem-logo.svg",
    tier: "secondary",
    caseStudyHref: "/work/tandem",
  },
  {
    slug: "insurflow",
    title: "InsurFlow",
    tagline: "Term life insurance without the spreadsheet",
    role: "Full-Stack Developer Intern",
    period: "Jan – Apr 2026",
    problem:
      "A Canadian brokerage ran its advisor workflow on spreadsheets, so applicants had no visibility into where their application stood.",
    approach:
      "Greenfield rebuild in a team of 5 on Next.js, TypeScript, PostgreSQL, and Drizzle. I built advisor-facing calculation and dashboard features and the CI/CD guardrails: GitHub Actions across Vercel preview and production.",
    outcome:
      "Applicants move from a short eligibility intake to a clear estimate and then a tracked submission, on a multi-tenant foundation with deployment checks on every change.",
    stack: ["TypeScript", "Next.js", "PostgreSQL", "Drizzle ORM", "GitHub Actions"],
    links: [
      { label: "Live site", href: "https://insurflow.biz" },
      { label: "Source", href: "https://github.com/Vero-Ventures/insurflow" },
    ],
    logoSrc: "/logos/insurflow/insurflow-logo_no_bg.png",
    tier: "secondary",
  },
  {
    slug: "bandit-breakout",
    title: "Bandit Breakout",
    tagline: "Browser arcade game built on a state machine",
    role: "Developer",
    period: "2025",
    problem:
      "An arcade loop only stays fun if difficulty and pacing are tuned deliberately rather than by feel.",
    approach:
      "Built the game around explicit, readable state transitions so progression and failure conditions could be reasoned about and adjusted independently of rendering.",
    outcome: "A documented, playable game with controls that stay intuitive as difficulty scales.",
    stack: ["JavaScript", "Game state machine", "Canvas"],
    links: [{ label: "Source", href: "https://github.com/SDX24/BanditBreakout" }],
    logoSrc: "/logos/bandit/bandit-logo-circle.svg",
    tier: "minor",
  },
];

export const PRIMARY_PROJECT = PROJECTS.find((project) => project.tier === "primary");
export const SECONDARY_PROJECTS = PROJECTS.filter((project) => project.tier === "secondary");
export const MINOR_PROJECTS = PROJECTS.filter((project) => project.tier === "minor");
