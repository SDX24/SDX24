# Project Structure

Complete file tree and organization for the SDX24 portfolio monorepo.

## 📁 Root Directory Structure

```
SDX24/
├── .context/                    # AI context files (READ FIRST!)
│   ├── README.md               # Context directory guide
│   ├── branding.md             # Brand guidelines (STRICT)
│   ├── components.md           # Component architecture and behavior
│   ├── devops-rules.md         # DevOps standards (ENFORCED)
│   ├── monorepo-structure-explained.md # Monorepo rationale and conventions
│   ├── project-structure.md    # This file
│   ├── tech-stack.md           # All packages and tools
│   └── commit-guidelines.md    # Commit and documentation rules
├── .e2e-tracker                 # Local E2E reminder state (gitignored)
├── .github/                     # GitHub configuration
│   ├── workflows/              # CI/CD pipelines
│   │   ├── ci.yml             # Main CI pipeline
│   │   └── security-scan.yml  # Security scanning
│   └── dependabot.yml         # Automated dependency updates
├── .husky/                      # Git hooks
│   ├── pre-commit             # Runs lint-staged
│   └── commit-msg             # Validates commit message
├── .turbo/                      # Turborepo cache (gitignored)
├── apps/                        # Applications
│   └── web/                    # Next.js portfolio app
│       ├── e2e/               # Playwright E2E tests
│       │   └── home.spec.ts   # Homepage test
│       ├── public/            # Static assets
│       │   ├── fonts/         # Web fonts
│       │   │   ├── SpaceGrotesk-Regular.woff2
│       │   │   └── SpaceGrotesk-Bold.woff2
│       │   ├── images/
│       │   │   └── profile.jpg # Profile photo (hero card)
│       │   └── logos/
│       │       ├── sdx24/
│       │       │   ├── sdx24-logo.svg
│       │       │   ├── logo-main-inverse.svg
│       │       │   ├── logo-expanded.svg
│       │       │   ├── logo-expanded-inverse.svg
│       │       │   ├── logo-bw.svg
│       │       │   └── logo-bw-inverse.svg
│       │       └── tandem/
│       │           ├── cover.png
│       │           ├── tandem-logo.svg
│       │           └── wordmark.svg
│       ├── src/               # Source code
│       │   ├── app/           # Next.js App Router
│       │   │   ├── api/       # API routes
│       │   │   │   └── health/ # Health check endpoint
│       │   │   ├── test/      # Test page - Tandem app iframe embed
│       │   │   │   └── page.tsx # Phone-shaped iframe display (402x874)
│       │   │   ├── layout.tsx # Root layout
│       │   │   ├── page.tsx   # Landing page
│       │   │   ├── not-found.tsx # 404 page
│       │   │   └── globals.css # Global styles + fonts
│       │   ├── components/    # Reusable UI components
│       │   │   ├── cards/     # Hero card variants
│       │   │   │   ├── hero-back-hover-card.tsx # Hero back compact+expanded hover pair
│       │   │   │   └── hero-photo-card.tsx # Landing hero scroll + flip card
│       │   │   ├── ui/        # UI primitives
│       │   │   │   ├── comet-card.tsx # Core 3D card primitive
│       │   │   │   ├── main-teal-card.tsx # Teal-styled CometCard preset
│       │   │   │   ├── project-card-compact.tsx # Compact project preview card
│       │   │   │   ├── project-card-expanded.tsx # Expanded card with magnetic drag cue
│       │   │   │   └── hand-embed.tsx # Right-edge drag cue portal overlay
│       │   │   ├── scroll-to-top-on-load.tsx # Force refreshes to start at top
│       │   │   └── index.ts   # Barrel export
│       │   ├── lib/           # Utilities and configurations
│       │   │   ├── utils.ts   # cn() className utility
│       │   │   ├── motion.ts  # GSAP plugin registry (ScrollTrigger, ScrollToPlugin)
│       │   │   └── index.ts   # Barrel export
│       │   ├── utils/         # Helper functions
│       │   │   └── index.ts   # Barrel export
│       │   ├── types/         # TypeScript type definitions
│       │   │   └── index.ts   # Barrel export
│       │   └── env.ts         # Environment validation
│       ├── .env.example       # Environment template
│       ├── next.config.js     # Next.js configuration
│       ├── package.json       # App dependencies
│       ├── postcss.config.js  # PostCSS config
│       ├── tailwind.config.ts # Tailwind configuration
│       ├── tsconfig.json      # TypeScript config
│       └── vercel.json        # Vercel deployment config
├── packages/                    # Shared packages
│   └── config/                 # Shared configurations
│       ├── index.ts           # TypeScript placeholder
│       ├── package.json       # Config package metadata
│       ├── prettier.config.js # Prettier settings
│       └── tsconfig.json      # Base TypeScript config
├── scripts/                     # Utility scripts
│   ├── dev-setup.sh           # Automated development setup
│   └── optimization-advisory.sh # Non-blocking staged-file optimization advisory
├── eslint.config.cjs           # ESLint flat config
├── .gitignore                   # Git ignore rules
├── commitlint.config.js        # Commit message rules
├── knip.config.ts              # Dead code detection
├── lint-staged.config.js       # Pre-commit linting
├── bun.lock                     # Bun lockfile
├── package.json                # Root workspace config
├── playwright.config.ts        # E2E test configuration
├── prettier.config.js          # Prettier configuration
├── README.md                   # GitHub profile README
└── turbo.json                  # Turborepo configuration
```

## 🎯 Key Directories Explained

### `.context/` - AI Context (CRITICAL)

**Purpose**: Contains all rules, structure, and context AI must follow
**When to update**:

- Adding new features
- Changing project structure
- Adding/removing dependencies
- Modifying DevOps pipeline

### `apps/web/` - Next.js Application

**Purpose**: Main portfolio website
**Entry point**: `src/app/page.tsx`
**Routing**: File-based routing in `src/app/`
**Current pages**:

- `/` - Landing page with portfolio, projects, and contact information
- `/test` - Tandem app embed (iframe) using `NEXT_PUBLIC_TANDEM_URL`
- `not-found.tsx` - Custom 404 page

#### Adding New Pages

```
apps/web/src/app/
├── page.tsx              → / (Landing page: Portfolio with logo, bio, CTAs, projects)
├── not-found.tsx         → Custom 404 page
├── test/
│   └── page.tsx          → /test (Tandem app iframe embed via NEXT_PUBLIC_TANDEM_URL)
├── about/
│   └── page.tsx          → /about (Not yet created)
└── projects/
    ├── page.tsx          → /projects (Not yet created)
    └── [slug]/
        └── page.tsx      → /projects/:slug (Not yet created)
```

#### Component Organization

**Current Structure (Next.js 13+ App Router):**

```
apps/web/src/
├── app/                  # Pages & API routes (Next.js App Router)
│   ├── page.tsx         # / (Landing page)
│   ├── layout.tsx       # Root layout
│   ├── not-found.tsx    # Custom 404 page
│   ├── globals.css      # Global styles
│   ├── test/
│   │   └── page.tsx     # /test (Tandem app embed)
│   └── api/             # API routes
│       └── health/
│           └── route.ts # GET /api/health
├── components/           # Reusable UI components
│   ├── cards/            # Hero card variants
│   │   ├── hero-back-hover-card.tsx # Hero back compact+expanded hover pair
│   │   └── hero-photo-card.tsx # Landing hero scroll + flip card
│   ├── ui/               # UI primitives
│   │   ├── comet-card.tsx # Core 3D card primitive
│   │   ├── main-teal-card.tsx # Teal-styled CometCard preset
│   │   ├── project-card-compact.tsx # Compact project preview card
│   │   ├── project-card-expanded.tsx # Expanded card with magnetic drag cue
│   │   └── hand-embed.tsx # Right-edge drag cue portal overlay
│   ├── scroll-to-top-on-load.tsx # Force refreshes to start at top
│   └── index.ts         # Barrel export for easy imports
├── lib/                 # Utilities, configurations, API clients
│   ├── utils.ts         # cn() for className merging
│   └── index.ts         # Barrel export
├── utils/               # Pure utility functions
│   └── index.ts         # Barrel export
├── types/               # TypeScript type definitions
│   └── index.ts         # Barrel export
└── env.ts               # Environment variable validation (T3 Env)
```

**Why `/apps/web/src/app`?**

This is the **Next.js App Router** (introduced in Next.js 13, default in 14+). It's NOT the old `/pages` directory structure. The `/src/app` pattern is the modern standard:

- `app/` - File-based routing with React Server Components
- `app/layout.tsx` - Root layout wrapping all pages
- `app/page.tsx` - Index route (/)
- `app/api/` - API route handlers
- `app/[dynamic]/` - Dynamic routes

**Old structure (Pages Router, deprecated):**

```
pages/
├── index.tsx           # /
├── about.tsx           # /about
└── api/
    └── hello.ts        # /api/hello
```

**Import Aliases:**

TypeScript is configured with path aliases for clean imports:

```typescript
// Instead of: import { cn } from "../../../lib/utils"
// Instead of: import Button from "../../components/ui/Button"
import { Button } from "@/components";
import { cn } from "@/lib";
```

### `packages/config/` - Shared Configuration

**Purpose**: Centralized configs used across monorepo
**Contents**:

- TypeScript config (strict mode)
- Prettier config (with import sorting)
- ESLint config (future)

### `.github/workflows/` - CI/CD

**Purpose**: Automated quality checks and deployments

#### `ci.yml` - Main Pipeline

Runs on: Every push and PR
Steps:

1. Install dependencies (Bun)
2. Format check (Prettier)
3. Lint (ESLint)
4. Type check (TypeScript)
5. Build (Next.js)
6. Dead code check (Knip)

> Note: Playwright E2E is currently run locally, not in CI.

#### `security-scan.yml` - Security

Runs on: Push, PR, weekly schedule
Tools:

- Trivy (vulnerability scanning)
- Results uploaded to GitHub Security

## 📝 File Naming Conventions

### React/Next.js Components

- **Pages**: `page.tsx` (Next.js convention)
- **Layouts**: `layout.tsx` (Next.js convention)
- **Components**: `PascalCase.tsx`
- **Utilities**: `camelCase.ts`
- **Types**: `camelCase.types.ts`

### Configuration Files

- **Root configs**: `lowercase.config.js/ts`
- **Package configs**: `package.json`
- **Environment**: `.env.local`, `.env.example`

### Test Files

- **E2E**: `*.spec.ts` (Playwright)
- **Unit**: `*.test.ts` (Bun Test)

## 🔍 Important File Paths

### Configuration Files

| Purpose           | Path                             |
| ----------------- | -------------------------------- |
| Root package.json | `/package.json`                  |
| Turborepo config  | `/turbo.json`                    |
| TypeScript base   | `/packages/config/tsconfig.json` |
| Prettier config   | `/prettier.config.js`            |
| ESLint config     | (In Next.js app)                 |
| Commitlint        | `/commitlint.config.js`          |
| Lint-staged       | `/lint-staged.config.js`         |
| Knip              | `/knip.config.ts`                |
| Playwright        | `/playwright.config.ts`          |

### Application Files

| Purpose         | Path                            |
| --------------- | ------------------------------- |
| Landing page    | `/apps/web/src/app/page.tsx`    |
| Root layout     | `/apps/web/src/app/layout.tsx`  |
| Global styles   | `/apps/web/src/app/globals.css` |
| Env validation  | `/apps/web/src/env.ts`          |
| Next.js config  | `/apps/web/next.config.js`      |
| Tailwind config | `/apps/web/tailwind.config.ts`  |

### Git & CI/CD

| Purpose         | Path                                   |
| --------------- | -------------------------------------- |
| Pre-commit hook | `/.husky/pre-commit`                   |
| Commit-msg hook | `/.husky/commit-msg`                   |
| CI pipeline     | `/.github/workflows/ci.yml`            |
| Security scan   | `/.github/workflows/security-scan.yml` |
| Dependabot      | `/.github/dependabot.yml`              |

## 🎨 Styling Architecture

### Tailwind CSS

- **Config**: `apps/web/tailwind.config.ts`
- **Globals**: `apps/web/src/app/globals.css`
- **Usage**: Utility classes in JSX

### CSS Modules (if needed)

```
component.tsx
component.module.css
```

## 🧪 Testing Structure

### E2E Tests (Playwright)

```
apps/web/e2e/
└── home.spec.ts          # Homepage tests
```

### Unit Tests (Bun Test)

```
src/lib/
├── utils.ts
└── utils.test.ts
```

## 📦 Package Management

### Workspace Structure

```json
{
  "workspaces": [
    "apps/*", // All apps (currently: web)
    "packages/*" // Shared packages (currently: config)
  ]
}
```

### Adding Packages

**To specific app:**

```bash
cd apps/web
bun add <package>
```

**To root (affects all):**

```bash
bun add -D <package>
```

**To shared package:**

```bash
cd packages/config
bun add <package>
```

## 🔄 Build Outputs

### Development

- Next.js: `.next/` (gitignored)
- Turbo cache: `.turbo/` (gitignored)

### Production

- Next.js build: `apps/web/.next/`
- Static export: `apps/web/out/` (if using)

### Testing

- Playwright report: `playwright-report/` (gitignored)
- Test results: `test-results/` (gitignored)
- Coverage: `coverage/` (gitignored)

## 🚀 Deployment Structure

### Vercel Configuration

- **Config**: `apps/web/vercel.json`
- **Build command**: `cd .. && bun run build --filter=web`
- **Output**: `.next` directory
- **Root**: `apps/web`

### Environment Variables

- **Local**: `.env.local` (gitignored)
- **Template**: `.env.example` (committed)
- **Validation**: `src/env.ts` (T3 Env)
- **Production**: Set in Vercel dashboard

## 📋 Adding New Features

### Checklist

1. Create feature branch
2. Add code in appropriate directory
3. Add tests (`e2e/` or `*.test.ts`)
4. Update `.context/` files:
   - `tech-stack.md` if adding packages
   - `project-structure.md` if adding directories
   - `devops-rules.md` if adding rules
5. Run quality checks
6. Commit with conventional message
7. Create PR

### Example: Adding Projects Page

```bash
# 1. Create page
touch apps/web/src/app/projects/page.tsx

# 2. Create test
touch apps/web/e2e/projects.spec.ts

# 3. Update context
# Edit .context/project-structure.md
# Add: projects/ page structure

# 4. Commit
git add .
git commit -m "feat(portfolio): add projects showcase page"
```

## 🔍 Finding Files

### Common Searches

```bash
# Find all pages
find apps/web/src/app -name "page.tsx"

# Find all tests
find . -name "*.spec.ts" -o -name "*.test.ts"

# Find all config files
find . -name "*.config.*" -maxdepth 2

# Find all TypeScript files
find apps/web/src -name "*.ts" -o -name "*.tsx"
```

---

**Remember**: This structure is designed for scalability. As the project grows, update this file to reflect changes!
