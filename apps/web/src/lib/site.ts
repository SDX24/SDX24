/**
 * Single source of truth for identity, contact, and résumé-derived content.
 *
 * Mirrors contexts/resumes/Stefan_Dorosh_Resume_Source.txt. When the resume changes,
 * change it here too so the site and the PDF never drift apart.
 */

export const SITE = {
  name: "Stefan Dorosh",
  role: "Full-Stack Web Developer",
  url: "https://stefandorosh.com",
  email: "stefandorosh24@gmail.com",
  location: "Burnaby, BC",
  description:
    "Full-stack developer in Burnaby (Metro Vancouver) building TypeScript and Next.js products, focused on auth and session security, relational data modeling, and real-time systems.",
  resumePath: "/assets/resume/Resume-Stefan-Dorosh.pdf",
  links: {
    github: "https://github.com/SDX24",
    linkedin: "https://linkedin.com/in/stefan-dorosh",
    source: "https://github.com/SDX24/SDX24",
  },
} as const;

export const NAV_SECTIONS = [
  { id: "work", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
] as const;

export type ExperienceEntry = {
  company: string;
  role: string;
  period: string;
  /** Present roles sort first and get a live indicator. */
  current?: boolean;
  href?: string;
  summary: string;
  highlights: string[];
  stack: string[];
};

export const EXPERIENCE: ExperienceEntry[] = [
  {
    company: "W3rlds",
    role: "UI/UX Web Designer Intern",
    period: "Aug 2024",
    summary:
      "Remote design engagement: layouts in Figma and Framer, refined from user feedback, plus SEO-oriented content structure.",
    highlights: [],
    stack: ["Figma", "Framer", "SEO"],
  },
];

export const SKILL_GROUPS = [
  {
    title: "Languages",
    items: ["TypeScript", "JavaScript", "SQL", "C#", "PHP", "HTML", "CSS/Sass"],
  },
  {
    title: "Frameworks & UI",
    items: [
      "React",
      "Next.js",
      "Node.js",
      "Express",
      "Tailwind CSS",
      "Radix UI",
      "Framer Motion",
      "GSAP",
    ],
  },
  {
    title: "Data & Backend",
    items: [
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "Drizzle ORM",
      "Prisma",
      "REST APIs",
      "Zod validation",
      "Schema design & migrations",
      "S3-style storage",
    ],
  },
  {
    title: "Auth & Real-time",
    items: [
      "NextAuth",
      "Clerk",
      "better-auth",
      "Session & cookie security",
      "Socket.IO",
      "SSE streaming",
    ],
  },
  {
    title: "AI integration",
    items: [
      "OpenAI APIs",
      "Groq SDK",
      "IBM watsonx",
      "Streaming assistants",
      "Voice/PDF to structured data",
    ],
  },
  {
    title: "DevOps & Quality",
    items: [
      "GitHub Actions",
      "CI/CD",
      "Vercel",
      "Render",
      "AWS",
      "Docker",
      "Playwright E2E",
      "Sentry",
      "PostHog",
      "Turborepo",
    ],
  },
  {
    title: "Engineering",
    items: [
      "Multi-tenant SaaS",
      "i18n localization",
      "Feature-Sliced Design",
      "SEO strategy",
      "Lighthouse optimization",
      "Agile & code review",
    ],
  },
  {
    title: "Tools",
    items: ["Git", "GitHub", "GitLab", "VS Code", "Linux", "Figma", "Jira", "Trello"],
  },
] as const;

export const EDUCATION = [
  {
    school: "British Columbia Institute of Technology",
    credential: "Diploma, Full-Stack Web Development",
    period: "Sep 2024 – May 2026",
  },
  {
    school: "Canggu Community School",
    credential: "International Baccalaureate Diploma Programme",
    period: "Sep 2021 – May 2024",
  },
] as const;
