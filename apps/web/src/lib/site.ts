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
  location: "Vancouver, BC",
  description:
    "Full-stack developer in Vancouver building TypeScript and Next.js products, focused on auth and session security, relational data modeling, and real-time systems.",
  resumePath: "/assets/resume/Resume-Stefan-Dorosh.pdf",
  links: {
    github: "https://github.com/SDX24",
    gitlab: "https://gitlab.com/SDX24",
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
    title: "Frameworks",
    items: ["React", "Next.js", "Node.js", "Express", "Socket.IO", "Tailwind CSS"],
  },
  {
    title: "Data & Infra",
    items: [
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "Drizzle ORM",
      "Prisma",
      "REST APIs",
      "S3-style storage",
    ],
  },
  {
    title: "Engineering",
    items: [
      "Auth & session security",
      "Multi-tenant SaaS",
      "i18n localization",
      "SEO strategy",
      "Lighthouse optimization",
      "AI API integration",
    ],
  },
  {
    title: "Tooling",
    items: ["Git", "GitHub Actions", "GitLab", "AWS", "Vercel", "Render", "Linux", "Figma"],
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
