# Project Structure

Complete file tree and organization for the SDX24 portfolio monorepo.

## 📁 Root Directory Structure

```
SDX24/
├── .context/                    # AI context files (READ FIRST!)
│   ├── README.md               # Context directory guide
│   ├── branding.md             # Brand guidelines (STRICT)
│   ├── devops-rules.md         # DevOps standards (ENFORCED)
│   ├── project-structure.md    # This file
│   ├── tech-stack.md           # All packages and tools
│   └── commit-guidelines.md    # Commit and documentation rules
├── .github/                     # GitHub configuration
│   ├── workflows/              # CI/CD pipelines
│   │   ├── ci.yml             # Main CI pipeline
│   │   └── security-scan.yml  # Security scanning
│   └── dependabot.yml         # Automated dependency updates
├── .husky/                      # Git hooks
│   ├── pre-commit             # Runs lint-staged
│   └── commit-msg             # Validates commit message
├── apps/                        # Applications
│   └── web/                    # Next.js portfolio app
│       ├── e2e/               # Playwright E2E tests
│       │   └── home.spec.ts   # Homepage test
│       ├── public/            # Static assets
│       │   ├── fonts/         # Web fonts
│       │   │   ├── SpaceGrotesk-Regular.woff2
│       │   │   └── SpaceGrotesk-Bold.woff2
│       │   ├── logo.svg       # Primary brand logo
│       │   ├── logo-expanded.svg # Expanded logo variant
│       │   └── logo-bw.svg    # Black & white logo
│       ├── src/               # Source code
│       │   ├── app/           # Next.js App Router
│       │   │   ├── layout.tsx # Root layout
│       │   │   ├── page.tsx   # Landing page
│       │   │   └── globals.css # Global styles + fonts
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
│   └── dev-setup.sh           # Automated development setup
├── .eslintrc.json              # ESLint configuration
├── .gitignore                   # Git ignore rules
├── commitlint.config.js        # Commit message rules
├── knip.config.ts              # Dead code detection
├── lint-staged.config.js       # Pre-commit linting
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

#### Adding New Pages

```
apps/web/src/app/
├── page.tsx              → /
├── about/
│   └── page.tsx          → /about
└── projects/
    ├── page.tsx          → /projects
    └── [slug]/
        └── page.tsx      → /projects/:slug
```

#### Component Organization

```
apps/web/src/
├── app/                  # Pages (routes)
├── components/           # Reusable components
│   ├── ui/              # UI primitives
│   └── features/        # Feature-specific components
├── lib/                 # Utilities and helpers
└── types/               # TypeScript type definitions
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
6. E2E tests (Playwright)
7. Dead code check (Knip)

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
├── home.spec.ts          # Homepage tests
├── navigation.spec.ts    # Navigation tests
└── projects.spec.ts      # Projects page tests
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
