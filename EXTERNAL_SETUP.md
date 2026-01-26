# External Setup Checklist

This document lists **ALL** actions you need to take **OUTSIDE of VS Code** to fully set up and deploy the SDX24 project.

---

## 1. Accounts You Need to Create

### ✅ GitHub Account

- **Status**: Already have (username: `lonelyhope`)
- **Purpose**: Source code hosting
- **Action**: None needed

### ✅ Vercel Account

- **URL**: https://vercel.com
- **Purpose**: Production hosting, environment variable management, automatic deployments
- **Action**:
  1. Sign up with GitHub account
  2. Connect to GitHub repository

### 🔒 Optional: Security & Monitoring Accounts

#### Socket.dev (Dependency Security)

- **URL**: https://socket.dev
- **Purpose**: Real-time dependency security monitoring
- **Action**: Sign up with GitHub, enable for SDX24 repo

#### GitGuardian (Secret Scanning)

- **URL**: https://www.gitguardian.com
- **Purpose**: Scan for accidentally committed secrets
- **Action**: Sign up with GitHub, enable for SDX24 repo

---

## 2. GitHub Repository Configuration

### A. Branch Protection Rules

**Navigate to**: `https://github.com/lonelyhope/SDX24/settings/branches`

**Click**: "Add branch protection rule"

**Settings**:

```
Branch name pattern: main

☑ Require a pull request before merging
  ☑ Require approvals: 1 (skip for solo project)
  ☑ Dismiss stale pull request approvals when new commits are pushed

☑ Require status checks to pass before merging
  ☑ Require branches to be up to date before merging
  Required status checks:
    - build
    - lint
    - type-check
    - test-e2e
    - security-scan

☑ Require conversation resolution before merging

☑ Require linear history

☑ Include administrators (recommended for strict enforcement)
```

### B. Enable Dependabot

**Navigate to**: `https://github.com/lonelyhope/SDX24/settings/security_analysis`

**Enable**:

- ☑ Dependabot alerts
- ☑ Dependabot security updates
- ☑ Dependabot version updates

**Note**: `.github/dependabot.yml` is already configured in the repo.

### C. Add GitHub Secrets

**Navigate to**: `https://github.com/lonelyhope/SDX24/settings/secrets/actions`

**Click**: "New repository secret"

**🔒 Security Note**: GitHub Secrets are encrypted and NEVER exposed to the public or to pull requests from forks. Even though this is a public repo, your secrets remain private and secure. Only you (repo owner) can view or use them.

**Required Secrets**:

| Secret Name    | Purpose                  | How to Get                                |
| -------------- | ------------------------ | ----------------------------------------- |
| `VERCEL_TOKEN` | Deploy to Vercel from CI | Vercel → Settings → Tokens → Create Token |

### D. Enable GitHub Actions

**Navigate to**: `https://github.com/lonelyhope/SDX24/actions`

**Verify**: CI workflow runs automatically on push

---

## 3. Vercel Deployment

### Initial Deployment

1. **Go to**: https://vercel.com/new
2. **Import**: Select `lonelyhope/SDX24` repository
3. **Configure Project**:
   ```
   Framework Preset: Next.js
   Root Directory: apps/web
   Build Command: cd ../.. && bun install && cd apps/web && bun run build
   Output Directory: .next (auto-detected)
   Install Command: bun install
   ```
4. **Click**: "Deploy"
5. **Wait**: First deployment (2-3 minutes)

### Post-Deployment

After first deployment succeeds:

1. **Get Project ID**:
   - Go to Vercel dashboard → Project Settings
   - Copy "Project ID"

2. **Get Org ID**:
   - Vercel dashboard → Account Settings
   - Copy "Team ID" or "Personal Account ID"

3. **Create Vercel Token**:
   - Settings → Tokens → Create Token
   - Name: `SDX24 Local Development`
   - Scope: Full Access
   - Copy token immediately (shown only once)

---

## 4. Environment Variables Setup

### Strategy Overview

**Primary Storage**: Vercel Dashboard  
**Local Access**: Via `vercel env pull` command  
**CI/CD**: Automatically synced from Vercel

### A. Add Environment Variables to Vercel

**Navigate to**: `https://vercel.com/lonelyhope/sdx24/settings/environment-variables`

#### Example Variables to Add:

**Production**:

```bash
# Database (when you add one)
DATABASE_URL=postgresql://user:pass@host:5432/db

# Next.js
NEXT_PUBLIC_APP_URL=https://sdx24.vercel.app
NEXT_PUBLIC_API_URL=https://sdx24.vercel.app/api

# Authentication (when you add it)
NEXTAUTH_URL=https://sdx24.vercel.app
NEXTAUTH_SECRET=<generate-with: openssl rand -base64 32>
```

**For Each Variable**:

- Set environments: Production, Preview, Development
- Click "Save"

### B. Sync Variables Locally

**In VS Code Terminal**:

```bash
# First time - link project to Vercel
vercel link

# Pull environment variables
bun run env:sync

# Verify .env.local was created
cat apps/web/.env.local
```

### C. Update Environment Validation

**Edit**: `apps/web/src/env.ts`

Add validation for any new variables:

```typescript
export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    NEXTAUTH_SECRET: z.string().min(32),
  },
  client: {
    NEXT_PUBLIC_APP_URL: z.string().url(),
    NEXT_PUBLIC_API_URL: z.string().url(),
  },
  // ...rest of config
});
```

---

## 5. Push Latest Changes

```bash
# Verify status
git status

# Push to GitHub
git push origin main
```

This will trigger:

- ✅ GitHub Actions CI workflow
- ✅ Vercel automatic deployment
- ✅ Security scans

---

## 6. Verification Checklist

### GitHub

- [ ] Repository visible at `https://github.com/lonelyhope/SDX24`
- [ ] Branch protection enabled on `main`
- [ ] Dependabot enabled
- [ ] GitHub Actions running successfully
- [ ] Secrets added (if using Vercel CI/CD)

### Vercel

- [ ] Project deployed successfully
- [ ] Custom domain connected (optional)
- [ ] Environment variables configured
- [ ] Automatic deployments enabled
- [ ] Preview deployments working

### Local Development

- [ ] `.env.local` exists with synced variables
- [ ] `bun run dev` starts successfully
- [ ] Can access `http://localhost:3000`
- [ ] Pre-commit hooks working
- [ ] Type checking passing

### CI/CD

- [ ] Push triggers GitHub Actions
- [ ] All status checks passing
- [ ] Vercel deploys on merge to main
- [ ] Security scans completing

---

## 7. Optional Enhancements

### Custom Domain (Vercel)

1. Go to Vercel → Project → Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Update `NEXT_PUBLIC_APP_URL` environment variable

### Monitoring & Analytics

**Vercel Analytics**:

- Enable in Vercel dashboard → Analytics
- Zero configuration needed

**Sentry (Error Tracking)**:

```bash
bun add @sentry/nextjs
# Follow setup guide: https://docs.sentry.io/platforms/javascript/guides/nextjs/
```

**Posthog (Product Analytics)**:

```bash
bun add posthog-js
# Follow setup guide: https://posthog.com/docs/libraries/next-js
```

---

## 8. Maintenance Tasks

### Weekly

- [ ] Review Dependabot PRs
- [ ] Check security scan results
- [ ] Review Vercel deployment logs

### Monthly

- [ ] Audit dependencies with `bun run audit`
- [ ] Review dead code with `bun run audit:unused`
- [ ] Check for outdated packages

### Per Feature

- [ ] Update `.context/` files
- [ ] Add E2E tests
- [ ] Update environment variables if needed

---

## Quick Reference

**Vercel Dashboard**: https://vercel.com/lonelyhope/sdx24  
**GitHub Repository**: https://github.com/lonelyhope/SDX24  
**Production URL**: https://sdx24.vercel.app ✅  
**Full Setup Guide**: See `MASTER_SETUP.md` in repository

---

## Need Help?

- **Vercel Issues**: https://vercel.com/support
- **GitHub Issues**: https://support.github.com
- **Bun Issues**: https://bun.sh/docs
- **Next.js Issues**: https://nextjs.org/docs

**All done!** 🎉
