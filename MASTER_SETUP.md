# 🚀 SDX24 Portfolio - Complete Setup Guide

**Everything you need to set up and manage this project in one place.**

---

## 📋 Table of Contents

1. [First Time Setup](#first-time-setup)
2. [Environment Variables](#environment-variables)
3. [Daily Development](#daily-development)
4. [Working Outside VSCode](#working-outside-vscode)
5. [Git Workflow](#git-workflow)
6. [Deployment](#deployment)
7. [GitHub Configuration](#github-configuration)
8. [Troubleshooting](#troubleshooting)

---

## 🎯 First Time Setup

### Prerequisites

Install these tools first:

```bash
# 1. Bun (package manager)
curl -fsSL https://bun.sh/install | bash

# 2. Git (if not installed)
brew install git  # macOS

# 3. GitHub CLI (optional but recommended)
brew install gh
gh auth login

# 4. Vercel CLI (for env management)
npm i -g vercel
vercel login
```

### Project Setup

```bash
# 1. Clone repository
git clone https://github.com/SDX24/SDX24.git
cd SDX24

# 2. Run automated setup
bun run setup
# This will:
# - Install dependencies
# - Link to Vercel
# - Pull environment variables
# - Install Playwright browsers
# - Verify everything works

# 3. Start development
bun dev

# 4. Open browser
# http://localhost:3000
```

**That's it! You're ready to code.**

---

## 🔐 Environment Variables

### Strategy: GitHub-First (No Local .env Files Lost!)

We use:

- **GitHub Secrets** → For CI/CD
- **Vercel** → For deployments + local sync
- **No manual .env management**

### Setup Process

**1. Add to Vercel (via dashboard or CLI):**

```bash
# Via CLI (recommended)
vercel env add NEXT_PUBLIC_POSTHOG_KEY production
vercel env add NEXT_PUBLIC_POSTHOG_KEY preview
vercel env add NEXT_PUBLIC_POSTHOG_KEY development

# Repeat for each variable
```

**2. Add to GitHub Secrets (for CI):**

```bash
gh secret set NEXT_PUBLIC_POSTHOG_KEY
gh secret set NEXT_PUBLIC_SENTRY_DSN
gh secret set DATABASE_URL
```

**3. Sync to local (automatic with `bun run setup`):**

```bash
vercel env pull apps/web/.env.local
```

### When You Need to Add New Env Vars

```bash
# 1. Add to Vercel (all environments)
vercel env add NEW_VAR production
vercel env add NEW_VAR preview
vercel env add NEW_VAR development

# 2. Add to GitHub Secrets (for CI)
gh secret set NEW_VAR

# 3. Update validation in apps/web/src/env.ts
# Add your variable to the schema

# 4. Update .env.example
echo "NEW_VAR=example_value" >> apps/web/.env.example

# 5. Update .github/workflows/ci.yml
# Add to env: section if needed for builds

# 6. Sync locally
vercel env pull apps/web/.env.local

# 7. Update context
# Edit .context/tech-stack.md to document the new variable

# 8. Commit
git add apps/web/src/env.ts apps/web/.env.example .github/workflows/ci.yml .context/tech-stack.md
git commit -m "feat(config): add NEW_VAR environment variable"
```

### Daily Env Sync

```bash
# Re-sync environment variables anytime
bun run env:sync
# or
vercel env pull apps/web/.env.local
```

### Current Environment Variables

**Required:**

- `NODE_ENV` - Environment (auto-set)

**Optional (when features added):**

- `NEXT_PUBLIC_POSTHOG_KEY` - PostHog analytics
- `NEXT_PUBLIC_SENTRY_DSN` - Sentry error tracking
- `SENTRY_AUTH_TOKEN` - Sentry releases
- `DATABASE_URL` - Database connection
- `NEXTAUTH_SECRET` - NextAuth authentication
- `NEXTAUTH_URL` - NextAuth URL

---

## 💻 Daily Development

### Morning Routine

```bash
cd ~/repos/SDX24
git pull
bun run env:sync  # Sync env vars from Vercel
bun install       # If package.json changed
bun dev          # Start dev server
```

### Common Commands

```bash
# Development
bun dev              # Start dev server (http://localhost:3000)
bun run build        # Build for production
bun run type-check   # Check TypeScript
bun run lint         # Lint code
bun run format       # Format code
bun run test:e2e     # Run E2E tests

# Environment
bun run env:sync     # Sync env vars from Vercel
bun run setup        # Re-run full setup

# Utilities
bunx knip            # Check for unused code/deps
vercel env ls        # List all env vars
```

---

## 🛠️ Working Outside VSCode

### Any Text Editor

This project works with:

- **Neovim/Vim** - With LSP setup
- **Sublime Text** - With LSP package
- **Cursor** - AI editor (reads .context/)
- **JetBrains** - WebStorm/IntelliJ
- **Emacs** - With LSP mode
- **Terminal only** - Just use bun commands

### Recommended Extensions (if using VSCode)

- ESLint
- Prettier
- Tailwind CSS IntelliSense
- Playwright Test for VSCode

### Terminal-First Development

```bash
# Edit files with your favorite editor
vim apps/web/src/app/page.tsx
# or
code apps/web/src/app/page.tsx
# or
subl apps/web/src/app/page.tsx

# Run commands
bun dev              # See changes live
bun run type-check   # Verify types
bun run format       # Auto-format

# All quality checks run on commit via hooks!
```

---

## 🔄 Git Workflow

### Creating a Feature

```bash
# 1. Create branch
git checkout -b feat/project-showcase

# 2. Make changes
# Edit files...

# 3. Check what needs context update
# - Did I add files/routes? → Update .context/project-structure.md
# - Did I add packages? → Update .context/tech-stack.md
# - Did I change CI/CD? → Update .context/devops-rules.md

# 4. Stage everything (code + context)
git add .

# 5. Commit (hooks will validate)
git commit -m "feat(portfolio): add project showcase section"
# Hooks will:
# - Format code
# - Lint code
# - Type check
# - Validate commit message
# - Check for required context updates

# 6. Push
git push -u origin feat/project-showcase

# 7. Create PR (with GitHub CLI)
gh pr create --fill

# 8. Merge after approval
gh pr merge --squash
```

### Commit Message Format

**Required format:** `<type>(<scope>): <description>`

**Types:**

- `feat:` - New feature (requires context update)
- `fix:` - Bug fix
- `docs:` - Documentation
- `style:` - Formatting
- `refactor:` - Code restructuring
- `perf:` - Performance
- `test:` - Tests
- `build:` - Build system (requires context update)
- `ci:` - CI/CD (requires context update)
- `chore:` - Maintenance (deps require context update)

**Examples:**

```bash
git commit -m "feat(portfolio): add projects page"
git commit -m "fix(nav): resolve mobile menu z-index"
git commit -m "chore(deps): add framer-motion"
```

### Pre-Commit Hooks

**Automatically run on every commit:**

1. Format code (Prettier)
2. Lint code (ESLint)
3. Type check (TypeScript)
4. Validate commit message (Commitlint)
5. Check for required context updates

**Commit will be BLOCKED if:**

- TypeScript errors exist
- Code isn't formatted
- Commit message doesn't follow format
- `feat:` commit missing context updates
- `chore(deps):` missing tech-stack update
- `ci:` missing devops-rules update

---

## 🚀 Deployment

### Automatic Deployments

**Every push to `main` automatically deploys to production.**

```bash
git push origin main
# → Triggers Vercel production deployment
```

**Every PR automatically creates a preview deployment.**

```bash
gh pr create --fill
# → Creates preview URL for testing
```

### Manual Deployment

```bash
# Deploy preview
vercel

# Deploy to production
vercel --prod

# Check deployment status
gh run list
gh run view

# Rollback deployment
vercel rollback
```

### Vercel Setup (First Time)

```bash
# 1. Connect GitHub repo to Vercel
# Go to vercel.com → Import Project → Select SDX24

# 2. Configure build settings (auto-detected):
# - Framework: Next.js
# - Root Directory: apps/web
# - Build Command: cd ../.. && bun run build --filter=web
# - Output Directory: .next

# 3. Add environment variables (see Environment Variables section)

# 4. Deploy!
```

---

## ⚙️ GitHub Configuration

### Initial Repository Setup

```bash
# 1. Create repository
gh repo create SDX24 --public --source=. --remote=origin

# 2. Push code
git branch -M main
git push -u origin main
```

### Branch Protection (Required)

**Settings → Branches → Add rule:**

- Branch name pattern: `main`
- ✅ Require status checks before merging
  - Required checks: `quality-check`
- ✅ Require conversation resolution before merging
- ❌ Do not allow bypassing

### Enable GitHub Features

**Settings → Code security and analysis:**

```bash
# Enable all these:
- Dependabot alerts
- Dependabot security updates
- Dependabot version updates
```

### GitHub Secrets (Already covered in Environment Variables)

```bash
gh secret set NEXT_PUBLIC_POSTHOG_KEY
gh secret set NEXT_PUBLIC_SENTRY_DSN
gh secret set DATABASE_URL
gh secret set SENTRY_AUTH_TOKEN
```

### CI/CD is Automatic

- `.github/workflows/ci.yml` → Runs on every push/PR
- `.github/workflows/security-scan.yml` → Weekly security scans
- `.github/dependabot.yml` → Weekly dependency updates

**No additional setup needed!**

### Optional External Services

**Socket.dev (Supply Chain Security):**

1. Go to [socket.dev](https://socket.dev)
2. Connect GitHub repository
3. Automatic PR scanning

**GitGuardian (Secrets Detection):**

1. Go to [gitguardian.com](https://www.gitguardian.com)
2. Install GitHub app
3. Automatic secrets scanning

---

## 🔧 Troubleshooting

### Port 3000 Already in Use

```bash
# Find and kill process
lsof -i :3000
kill -9 <PID>

# Or use different port
PORT=3001 bun dev
```

### TypeScript Errors After Pull

```bash
rm -rf apps/web/.next
rm -rf node_modules
bun install
bun run type-check
```

### Git Hooks Not Running

```bash
bunx husky install
chmod +x .husky/pre-commit .husky/commit-msg
```

### Environment Variables Not Loading

```bash
# Re-sync from Vercel
vercel env pull apps/web/.env.local

# Verify file exists
cat apps/web/.env.local

# Check validation
bun run type-check
```

### Commit Blocked by Hooks

**TypeScript errors:**

```bash
bun run type-check
# Fix all errors, then commit again
```

**Missing context:**

```bash
# If feat: commit
git add .context/project-structure.md
git add .context/tech-stack.md
git commit --amend --no-edit
```

**Bad commit message:**

```bash
git commit --amend -m "feat(portfolio): proper message"
```

### Build Failing on Vercel

1. Check Vercel logs
2. Verify environment variables are set
3. Test build locally: `bun run build`
4. Check GitHub Actions: `gh run view`

### Starting Fresh

```bash
# Nuclear reset (keeps your code)
rm -rf node_modules
rm -rf apps/web/.next
rm -rf .turbo
rm bun.lockb

bun install
bun run build
```

---

## 📚 Additional Resources

### Project Documentation

- **README.md** - GitHub profile page
- **.context/** - AI context files (read first!)
  - `devops-rules.md` - Quality standards
  - `project-structure.md` - File organization
  - `tech-stack.md` - Tools and packages
  - `commit-guidelines.md` - How to commit

### Quick Reference

```bash
# Context files location
.context/                    # AI must read before changes
  ├── README.md             # Context guide
  ├── devops-rules.md       # Enforced standards
  ├── project-structure.md  # File tree
  ├── tech-stack.md         # All packages
  └── commit-guidelines.md  # Commit rules

# Important scripts
bun run setup          # Full setup
bun run env:sync       # Sync env vars
bun dev               # Start dev server
bun run type-check    # Check types
bun run build         # Build project
bun run test:e2e      # Run tests

# Git workflow
git checkout -b feat/name
# make changes
git add .
git commit -m "feat: description"
git push
gh pr create --fill
```

---

## 🎯 Checklist for New Machines

Setting up on a new machine? Follow this checklist:

```bash
# 1. Install tools
- [ ] Install Bun (curl -fsSL https://bun.sh/install | bash)
- [ ] Install Git (brew install git)
- [ ] Install GitHub CLI (brew install gh)
- [ ] Install Vercel CLI (npm i -g vercel)

# 2. Authenticate
- [ ] gh auth login
- [ ] vercel login

# 3. Clone and setup
- [ ] git clone https://github.com/SDX24/SDX24.git
- [ ] cd SDX24
- [ ] bun run setup

# 4. Verify
- [ ] bun run type-check (should pass)
- [ ] bun dev (should start on :3000)
- [ ] Open http://localhost:3000 (should show "SDX24")

# Done! 🎉
```

---

## 💡 Pro Tips

1. **Always run `bun run setup` on new machines** - Handles everything automatically
2. **Use `bun run env:sync`** - Never lose environment variables
3. **Read `.context/` before making changes** - Saves time and prevents mistakes
4. **Let pre-commit hooks do their job** - They catch errors before they reach GitHub
5. **Use `gh` CLI for GitHub operations** - Faster than web interface
6. **Keep this guide bookmarked** - Everything you need is here

---

**Last Updated:** Initial setup  
**Maintained by:** SDX24  
**Questions?** Check `.context/` files or open an issue

---

🎉 **You're all set! Happy coding!** 🚀
