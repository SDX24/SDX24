# Technology Stack

Complete list of all packages, tools, and technologies used in the SDX24 portfolio.

## 🎯 Core Technologies

### Runtime & Package Manager

- **Bun** `1.0.25+` - JavaScript runtime and package manager
  - Why: 5-10x faster than npm/yarn
  - Usage: `bun install`, `bun run`, `bun test`

### Frontend Framework

- **Next.js** `16.1.6` - React framework
  - App Router (RSC)
  - Server-side rendering
  - Static generation
  - API routes

- **React** `19.0.0` - UI library
  - Server Components
  - Client Components
  - Hooks

### Language

- **TypeScript** `5.x` - Type-safe JavaScript
  - Strict mode enabled
  - No `any` types allowed
  - Full type coverage

### Styling

- **Tailwind CSS** `3.3.0+` - Utility-first CSS
  - JIT compiler
  - Custom configuration
  - PostCSS integration

- **PostCSS** `8.x` - CSS processing
- **Autoprefixer** `10.x` - CSS vendor prefixing

### UI Utilities

- **clsx** `2.1.1` - Conditional className utility
- **tailwind-merge** `3.4.0` - Tailwind class merging

### Animation

- **Motion** `12.30.0` - Animation library for interactive UI

## 🏗️ Monorepo & Build Tools

### Monorepo Management

- **Turborepo** `1.11.3+` - Build system
  - Parallel execution
  - Smart caching
  - Pipeline orchestration

### Build & Bundling

- **Next.js Compiler** - Built-in Rust compiler (SWC)
- **Webpack** - Module bundler (Next.js internal)

## 🧪 Testing

### E2E Testing

- **Playwright** `1.41.0+` - End-to-end testing
  - Cross-browser testing
  - Parallel execution
  - Visual regression (future)
  - API testing capabilities

### Unit Testing

- **Bun Test** - Built-in test runner
  - Jest-compatible API
  - Fast execution
  - Native TypeScript support

## 🛠️ Code Quality & Formatting

### Linting

- **ESLint** `9.x` - JavaScript/TypeScript linter
  - `eslint-config-next` - Next.js rules
  - TypeScript integration

### Formatting

- **Prettier** `3.2.4+` - Code formatter
  - **@trivago/prettier-plugin-sort-imports** `4.3.0` - Auto-sort imports
  - Enforced via pre-commit hooks

### Type Checking

- **TypeScript Compiler** - Static type checking
  - Strict mode
  - Path aliases (`@/*`)

## 🔒 DevOps & Automation

### Git Hooks

- **Husky** `9.0.6+` - Git hooks manager
  - Pre-commit: lint-staged
  - Commit-msg: commitlint

- **Lint-staged** `15.2.0+` - Run linters on staged files
  - Prettier formatting
  - ESLint fixing

### Commit Standards

- **Commitlint** `18.6.0+` - Commit message linter
  - **@commitlint/config-conventional** - Conventional commits

### Dead Code Detection

- **Knip** `4.0.0+` - Find unused files, dependencies, exports
  - Automatic detection
  - CI integration

## 🔐 Security & Validation

### Environment Variables

- **@t3-oss/env-nextjs** `0.9.2+` - Type-safe environment variables
  - **Zod** `3.22.4+` - Schema validation
  - Build-time validation
  - Runtime type safety

### Security Scanning

- **Trivy** - Vulnerability scanner (GitHub Actions)
  - Dependency scanning
  - Filesystem scanning
  - CVE detection

### Secrets Detection

- **GitGuardian** - Secrets scanning (External service)
  - Real-time scanning
  - High accuracy validation

### Supply Chain Security

- **Socket.dev** - Package analysis (External service)
  - Malware detection
  - Supply chain attacks
  - Dependency health

## 📊 Monitoring & Observability (To Be Integrated)

### Error Tracking

- **Sentry** - Error and performance monitoring
  - Source maps
  - Release tracking
  - Performance monitoring

### Logging

- **Axiom** - Structured logging platform
  - Vercel integration
  - JSON event inspection
  - Fast queries

### Analytics

- **PostHog** - Product analytics
  - User journeys
  - Feature flags
  - A/B testing
  - Session replay

## 🚀 Deployment & Hosting

### Hosting Platform

- **Vercel** - Next.js hosting
  - Automatic deployments
  - Preview environments
  - Edge functions
  - CDN

### CI/CD

- **GitHub Actions** - Continuous integration
  - Automated testing
  - Security scanning
  - Quality checks

### Dependency Management

- **Dependabot** - Automated dependency updates
  - Security patches
  - Version updates
  - Auto-merge safe updates

## 📦 Package.json Dependencies

### Production Dependencies (`apps/web`)

```json
{
  "@t3-oss/env-nextjs": "^0.9.2",
  "clsx": "^2.1.1",
  "motion": "^12.30.0",
  "next": "^16.1.6",
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "tailwind-merge": "^3.4.0",
  "zod": "^3.22.4"
}
```

### Development Dependencies (`apps/web`)

```json
{
  "@playwright/test": "^1.41.0",
  "@types/node": "^20",
  "@types/react": "^19",
  "@types/react-dom": "^19",
  "autoprefixer": "^10.0.1",
  "eslint": "^9.0.0",
  "eslint-config-next": "^16.1.6",
  "postcss": "^8",
  "tailwindcss": "^3.3.0",
  "typescript": "^5"
}
```

### Root Development Dependencies

```json
{
  "@commitlint/cli": "^18.6.0",
  "@commitlint/config-conventional": "^18.6.0",
  "@trivago/prettier-plugin-sort-imports": "^4.3.0",
  "husky": "^9.0.6",
  "knip": "^4.0.0",
  "lint-staged": "^15.2.0",
  "prettier": "^3.2.4",
  "turbo": "^1.11.3"
}
```

### Root Dependencies

```json
{
  "next": "^16.1.6"
}
```

## 🔄 Version Management

### Node.js Version

- **Minimum**: Node 18.x
- **Recommended**: Node 20.x
- **Bun**: 1.0.25+

### Package Manager Lock

- Using: `bun.lock`
- **Do not use**: `package-lock.json`, `yarn.lock`, `pnpm-lock.yaml`

## 🎨 UI & Design (Future)

### Component Libraries (Planned)

- **shadcn/ui** - Accessible components
- **Radix UI** - Headless components
- **Lucide React** - Icons

### Animation (Planned)

- **GSAP** - Advanced animations

## 🗄️ Data & Backend (Future)

### Database

- **Neon** - PostgreSQL database
  - Database branching
  - Serverless

### ORM

- **Drizzle ORM** - Type-safe ORM
  - SQL-like API
  - Migration system

### API Layer

- **tRPC** - Type-safe APIs
- **Zod** - Schema validation

## 📝 Content Management (Future)

### CMS Options

- **Sanity** - Headless CMS
- **Contentful** - Content infrastructure
- **Markdown** - Simple content

## 🌐 External Services & Integrations

### Required Setup (Manual)

1. **GitHub**
   - Repository
   - Actions (CI/CD)
   - Dependabot
   - Branch protection

2. **Vercel**
   - Deployment
   - Preview environments
   - Environment variables

3. **Socket.dev**
   - Supply chain security
   - Package scanning

4. **GitGuardian**
   - Secrets scanning
   - GitHub app

### Future Integrations

6. **Sentry**
   - Error tracking
   - Performance monitoring

7. **Axiom**
   - Structured logging
   - Vercel integration

8. **PostHog**
   - Product analytics
   - Feature flags

## 📚 Documentation Tools

### Code Documentation

- **TSDoc** - TypeScript documentation
- **Markdown** - Project documentation

### API Documentation (Future)

- **OpenAPI/Swagger** - API documentation
- **Storybook** - Component documentation

## 🔧 Development Tools

### IDE

- **VS Code** - Recommended
  - ESLint extension
  - Prettier extension
  - Tailwind IntelliSense

### Browser DevTools

- **React DevTools** - React debugging
- **Next.js DevTools** - Next.js debugging

## ⚡ Performance Monitoring

### Build-time

- **Turborepo** - Build caching
- **Next.js** - Incremental builds

### Runtime (Planned)

- **Vercel Analytics** - Web vitals
- **Sentry** - Performance traces

## 🎯 Adding New Packages

### Process

1. Install package:

   ```bash
   cd apps/web  # or appropriate location
   bun add <package>
   ```

2. Update this file:
   - Add to appropriate section
   - Document purpose and usage
   - Note version

3. Update `project-structure.md` if needed

4. Commit:
   ```bash
   git add .
   git commit -m "chore: add <package> for <purpose>"
   ```

### Review Checklist

- [ ] Package is actively maintained
- [ ] No known security vulnerabilities
- [ ] License is compatible (MIT, Apache, etc.)
- [ ] Bundle size is acceptable
- [ ] Has TypeScript types

---

**Last Updated**: Initial setup
**Maintainer**: Review and update when packages change
