# DevOps Rules & Quality Standards

> **CRITICAL**: These rules are **ENFORCED** by automated tooling. Commits will be **BLOCKED** if violated.

## ⚠️ NEVER BYPASS COMMIT CHECKS

**RULE**: Do NOT disable, skip, or bypass any commit checks (Husky hooks, lint-staged, ESLint, TypeScript, Prettier) unless the user **EXPLICITLY** instructs you to do so.

- ❌ DO NOT use `git commit --no-verify`
- ❌ DO NOT modify lint-staged to remove checks
- ❌ DO NOT add `@ts-ignore` or `eslint-disable` comments
- ❌ DO NOT simplify configurations to make commits "easier"
- ✅ ALWAYS fix the underlying issue that's blocking the commit
- ✅ ONLY bypass if user explicitly says "skip the checks" or "bypass the hooks"

**The guardrails exist to prevent AI from going off-task. Respect them.**

## 🛡️ Pre-Commit Requirements

### 1. Code Quality Gates (Enforced by Husky)

- ✅ **Prettier formatting** - All code must be formatted
- ✅ **ESLint passing** - No linting errors allowed
- ✅ **TypeScript compilation** - No type errors allowed
- ✅ **Conventional Commits** - Commit messages must follow format
- ✅ **Context documentation** - New features must update context

### 2. TypeScript Strict Mode (Non-Negotiable)

```json
{
  "strict": true,
  "noImplicitAny": true,
  "strictNullChecks": true,
  "noUncheckedIndexedAccess": true
}
```

- **NEVER** use `any` type
- **NEVER** use `@ts-ignore` without explanation
- **ALWAYS** handle null/undefined cases

### 3. Import Organization (Auto-enforced)

```typescript
// 1. React imports
import React from "react";

// 2. Next.js imports
import { NextPage } from "next";

// 3. Third-party packages
import axios from "axios";

// 4. Internal absolute imports
import { Component } from "@/components";

// 5. Relative imports
import { helper } from "./utils";
```

## 🔒 CI/CD Pipeline

### Required Status Checks (Must Pass)

1. **Build** - Production build must succeed
2. **Lint** - ESLint must pass
3. **Type Check** - TypeScript must compile
4. **E2E Tests** - Playwright tests must pass
5. **Security Scan** - Trivy vulnerability scan
6. **Dead Code** - Knip detection (warning only)

### Branch Protection (GitHub)

- ❌ No direct pushes to `main`
- ✅ Must pass all status checks
- ✅ Must resolve all conversations
- ✅ Required: Linear history

## 📦 Dependency Management

### Adding Dependencies

```bash
# Always use Bun
bun add <package>        # Production
bun add -d <package>     # Development

# Update tech-stack.md after adding
```

### Dependency Rules

- ✅ Automated updates via Dependabot
- ✅ Review security advisories before merging
- ❌ No unmaintained packages (abandoned >1 year)
- ❌ No packages with known CVEs

## 🧪 Testing Requirements

### E2E Tests (Playwright)

- **Required** for all user-facing features
- Must test happy path + error states
- Must run in CI before merge

### Unit Tests (Bun Test)

- Required for utility functions
- Required for business logic
- Coverage target: 70%+

## 🔐 Security Requirements

### Environment Variables

- ✅ Validated at build time (T3 Env)
- ✅ Never commit `.env` files
- ✅ Use `.env.example` as template
- ❌ No secrets in code

### Secrets Scanning

- GitGuardian scans all commits
- Socket.dev scans all dependencies
- Trivy scans for CVEs

## 📝 Code Review Standards

### Before Committing

1. Run `bun type-check` - No errors
2. Run `bun lint` - No errors
3. Run `bun format` - Auto-formats
4. Run `bun test:e2e` - Tests pass
5. Update context if feature added

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:** feat, fix, docs, style, refactor, perf, test, build, ci, chore

**Examples:**

```bash
feat(portfolio): add project showcase section
fix(nav): resolve mobile menu not closing
docs(context): update tech-stack with new packages
```

## 🚫 Prohibited Practices

### Code Quality

- ❌ `any` types
- ❌ `console.log` in production code
- ❌ Commented-out code
- ❌ Unused imports/variables
- ❌ Hardcoded credentials/secrets

### Git Practices

- ❌ Force pushing to `main`
- ❌ Large binary files in repo
- ❌ Merge commits (use rebase)
- ❌ Non-conventional commit messages

### Dependencies

- ❌ Committing `node_modules`
- ❌ Mixed package managers (use Bun only)
- ❌ Unpinned versions in critical deps

## 🎯 Performance Standards

### Build Times

- Development: < 5s first load
- Production build: < 2min
- E2E test suite: < 5min

### Bundle Size

- Initial JS: < 200KB gzipped
- Each route: < 100KB additional
- Monitor with Vercel Analytics

## 🔄 Deployment Pipeline

### Preview Deployments

- Every PR gets preview URL
- Must pass CI before deployment
- Must be reviewed before merging

### Production Deployments

- Auto-deploy on merge to `main`
- Must pass all quality gates
- Rollback on error spike in Sentry

## 📊 Monitoring Requirements

### Error Tracking (Sentry)

- All errors must be reported
- Set up source maps
- Configure performance monitoring

### Logging (Axiom)

- Use structured logging
- One canonical event per request
- Include context: user_id, endpoint, status

### Analytics (PostHog)

- Track user journeys
- Monitor feature adoption
- A/B test new features

## ✅ Pre-Commit Checklist

Run automatically by Husky:

- [ ] Code formatted (Prettier)
- [ ] No linting errors (ESLint)
- [ ] Types valid (TypeScript)
- [ ] Commit message valid (Commitlint)
- [ ] Context updated if feature added

Manual checks recommended:

- [ ] Tests pass (`bun test:e2e`)
- [ ] No console logs
- [ ] No commented code
- [ ] Documentation updated

## 🆘 Emergency Procedures

### Hotfix Process

1. Create `hotfix/` branch from `main`
2. Make minimal fix
3. Fast-track through CI
4. Deploy immediately
5. Follow up with proper fix

### Rollback Process

1. Identify last good deployment
2. Revert in Vercel dashboard
3. Create fix in new branch
4. Follow normal process

---

**Remember**: These rules exist to maintain code quality and prevent issues. The automated tooling will enforce most of these - violations will **BLOCK** your commit.
