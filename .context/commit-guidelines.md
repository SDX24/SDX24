# Commit Guidelines & Context Documentation

> **ENFORCED**: Pre-commit hooks validate these requirements. Commits will be **BLOCKED** if violated.

## ⚠️ NEVER BYPASS COMMIT CHECKS

**DO NOT** disable or bypass pre-commit hooks unless explicitly instructed by the user.

- The guardrails exist for a reason: to minimize risk of going off-task
- ALWAYS fix the root cause instead of disabling checks
- ONLY use `--no-verify` if user explicitly requests it

## 🎯 Conventional Commits (Required)

### Format

```
<type>(<scope>): <subject>

[optional body]

[optional footer]
```

### Types

| Type       | When to Use               | Updates Context?        |
| ---------- | ------------------------- | ----------------------- |
| `feat`     | New feature               | ✅ Yes                  |
| `fix`      | Bug fix                   | ❌ No                   |
| `docs`     | Documentation only        | ⚠️ If context changed   |
| `style`    | Formatting, whitespace    | ❌ No                   |
| `refactor` | Code restructuring        | ⚠️ If structure changed |
| `perf`     | Performance improvement   | ❌ No                   |
| `test`     | Add/update tests          | ❌ No                   |
| `build`    | Build system changes      | ⚠️ If tools changed     |
| `ci`       | CI/CD changes             | ✅ Yes                  |
| `chore`    | Dependencies, maintenance | ⚠️ If packages changed  |

### Scopes (Common)

- `portfolio` - Main portfolio features
- `nav` - Navigation
- `projects` - Projects section
- `about` - About page
- `contact` - Contact form
- `deps` - Dependencies
- `devops` - DevOps tooling
- `ci` - CI/CD pipeline

### Examples

```bash
# New feature - MUST update context
feat(portfolio): add project showcase section
feat(nav): implement mobile menu with animations

# Bug fix - No context update needed
fix(nav): resolve menu not closing on mobile
fix(projects): correct image loading issue

# Documentation
docs(context): update tech-stack with framer-motion
docs(readme): add deployment instructions

# Refactoring - Update if structure changed
refactor(components): reorganize into feature folders

# Dependencies - Update tech-stack.md
chore(deps): add framer-motion for animations
chore(deps): update next to 14.2.0

# DevOps - Update devops-rules.md
ci(github): add lighthouse performance checks
build(turborepo): optimize build pipeline
```

## 📝 Context Documentation Rules

### When to Update `.context/` Files

#### 1. Adding New Features (`feat:`)

**REQUIRED**: Update context before committing

**Update:**

- `.context/project-structure.md` - If adding new files/folders
- `.context/tech-stack.md` - If using new packages
- `.context/devops-rules.md` - If adding quality rules

**Example:**

```bash
# 1. Add feature
# 2. Update context files
# 3. Commit everything together

git add apps/web/src/app/projects/page.tsx
git add apps/web/e2e/projects.spec.ts
git add .context/project-structure.md  # Added projects/ route
git commit -m "feat(portfolio): add projects showcase section

- Created projects page with grid layout
- Added E2E tests for projects page
- Updated context with new route structure"
```

#### 2. Adding Dependencies (`chore(deps):`)

**REQUIRED**: Update `tech-stack.md`

**Process:**

```bash
# 1. Install package
bun add framer-motion

# 2. Update .context/tech-stack.md
# Add to "Animation" section:
# - **Framer Motion** - Animation library

# 3. Commit together
git add package.json bun.lockb
git add .context/tech-stack.md
git commit -m "chore(deps): add framer-motion for animations"
```

#### 3. Restructuring (`refactor:`)

**CONDITIONAL**: Update if directory structure changes

**Example:**

```bash
# If moving files to new structure
git add src/components/
git add .context/project-structure.md
git commit -m "refactor(components): organize into feature folders

- Moved components to features/ and ui/ directories
- Updated project-structure.md with new organization"
```

#### 4. DevOps Changes (`ci:`, `build:`)

**REQUIRED**: Update `devops-rules.md`

**Example:**

```bash
# Adding new CI check
git add .github/workflows/lighthouse.yml
git add .context/devops-rules.md
git commit -m "ci(github): add lighthouse performance checks

- Added workflow for performance audits
- Updated devops-rules.md with performance standards"
```

## ⚠️ Hook Validation

### Automatic Checks

The hooks run:

**Pre-commit (`/.husky/pre-commit`)**

1. **Lint-staged** - Format and lint changed files
2. **Type check** - Verify TypeScript compiles
3. **Optimization advisory** - Non-blocking staged-file hints for bundles, media, React patterns, and Next.js usage
4. **Safety checks** - TODO/FIXME context, debugger, hardcoded localhost, large files

**Commit-msg (`/.husky/commit-msg`)**

1. **Commitlint** - Validate conventional commit format
2. **Context validation** - Require `.context/` updates for specific commit types

### Context Validation Logic (Commit-msg)

```bash
# If commit message starts with "feat:", "chore(deps):", or "ci:"
# Hook checks if .context/ files are staged
# If not, commit is BLOCKED with error message
```

### Bypassing (Emergency Only)

```bash
# NOT RECOMMENDED - Only for hotfixes
git commit --no-verify -m "hotfix: critical production bug"

# Follow up immediately with proper commit including context
```

## 📋 Context Update Checklist

### Before Committing Features

- [ ] Feature code written
- [ ] Tests added
- [ ] `.context/project-structure.md` updated (if files added)
- [ ] `.context/tech-stack.md` updated (if packages added)
- [ ] `.context/devops-rules.md` updated (if rules added)
- [ ] All files staged together
- [ ] Conventional commit message written

### Example Workflow

```bash
# 1. Create feature
touch apps/web/src/app/about/page.tsx
touch apps/web/e2e/about.spec.ts

# 2. Update context
# Edit .context/project-structure.md
# Add: about/ → /about route

# 3. Stage everything
git add apps/web/src/app/about/
git add apps/web/e2e/about.spec.ts
git add .context/project-structure.md

# 4. Commit with conventional message
git commit -m "feat(portfolio): add about page

- Created about page with bio and skills
- Added E2E tests for about page navigation
- Updated project structure with new route"

# 5. Push
git push
```

## 🚫 Common Mistakes

### ❌ DON'T: Commit feature without context

```bash
# This will be BLOCKED by pre-commit hook
git add apps/web/src/app/projects/page.tsx
git commit -m "feat(portfolio): add projects page"
# ❌ ERROR: feat: commit must include context updates
```

### ✅ DO: Commit feature with context

```bash
git add apps/web/src/app/projects/page.tsx
git add .context/project-structure.md
git commit -m "feat(portfolio): add projects page"
# ✅ SUCCESS: Context updated
```

### ❌ DON'T: Add dependency without documenting

```bash
bun add axios
git add package.json bun.lockb
git commit -m "chore(deps): add axios"
# ❌ ERROR: Dependency commits must update tech-stack.md
```

### ✅ DO: Document new dependencies

```bash
bun add axios
# Update .context/tech-stack.md
git add package.json bun.lockb .context/tech-stack.md
git commit -m "chore(deps): add axios for API requests"
# ✅ SUCCESS
```

## 📊 Commit Message Quality

### Good Commit Messages

```bash
feat(portfolio): add project showcase with filtering
fix(nav): resolve mobile menu Z-index issue
docs(context): update project structure after refactor
chore(deps): update next to 14.2.0 for performance
ci(github): add bundle size monitoring to pipeline
```

### Bad Commit Messages

```bash
# Too vague
git commit -m "update stuff"
git commit -m "fix bug"
git commit -m "wip"

# Not conventional
git commit -m "Added new feature"
git commit -m "Fixed the menu"

# No scope when helpful
git commit -m "feat: add page"  # Which page?
git commit -m "fix: css issue"   # Where?
```

## 🔄 Context File Maintenance

### Regular Reviews

- **Weekly**: Review context matches reality
- **Before PR**: Verify all context is current
- **After merge**: Ensure main branch context is accurate

### Keeping Context Current

```bash
# If you find outdated context
git add .context/project-structure.md
git commit -m "docs(context): update project structure

- Removed deprecated routes
- Added new component directories
- Clarified testing structure"
```

### When to Run E2E Tests

✅ **Should run E2E**:

- After UI/UX changes
- Before major releases
- After route modifications
- When reminder appears

⏭️ **Can skip E2E**:

- Config-only changes
- Documentation updates
- Internal refactoring (no UI impact)
- Dependency updates

### Running E2E Locally

```bash
# Run all E2E tests
bun run test:e2e

# Run specific test
bun run test:e2e home.spec.ts

# Debug mode
bun run test:e2e --debug
```

## 🎯 Why This Matters

### For AI Assistants

- Context files provide critical understanding
- Pre-commit hooks ensure AI can't skip documentation
- Future AI can read context to understand project

### For Humans

- New developers onboard faster
- Project structure is always documented
- DevOps rules are clear and enforced
- Tech stack is auditable

### For Quality

- Forces documentation at commit time
- Prevents "I'll document later" syndrome
- Maintains living documentation
- Enables automated validation

---

**Remember**: These guidelines are **ENFORCED** by pre-commit hooks. The validation is there to help, not hinder. Document as you go!
