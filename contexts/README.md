# AI Context Directory

This directory contains essential context files that AI assistants **MUST** read before making any changes to the codebase.

## ⚠️ NEVER BYPASS COMMIT CHECKS

**CRITICAL RULE**: Do NOT disable, skip, or bypass any commit checks (Husky hooks, lint-staged, ESLint, TypeScript, Prettier) unless the user **EXPLICITLY** instructs you to do so.

- ❌ DO NOT use `git commit --no-verify`
- ❌ DO NOT modify lint-staged to remove checks
- ❌ DO NOT simplify configurations to make commits "easier"
- ✅ ALWAYS fix the underlying issue that's blocking the commit
- ✅ ONLY bypass if user explicitly says "skip the checks" or "bypass the hooks"

**The guardrails exist to prevent AI from going off-task. Respect them.**

## 🚨 CLI COMMAND CONFIRMATION REQUIRED

**CRITICAL**: Ask for user confirmation BEFORE running any CLI commands that:

1. **Are Irreversible (High Risk)**:
   - `git push --force` - Force push (rewrites history)
   - `git reset --hard` - Discards changes permanently
   - `git clean -fd` - Removes untracked files
   - Database migrations, drops, or destructive operations

2. **Bypass Safety Checks**:
   - `--no-verify` flag (Git hooks)
   - `--skip-*` flags (Skip validations)
   - `--force` flags (Override protections)
   - Modifying hook files to disable checks

3. **Check Git History First**:
   - Before suggesting irreversible commands, check `git log` or recent commits
   - Verify if files exist before deletion
   - Confirm backup/safety measures

**Note**: File deletion (`rm`), directory removal, and dependency changes are allowed without confirmation.\*\*

## 📋 Context Files

- **[README.md](README.md)** - This file, context directory guide
- **[branding.md](branding.md)** - Brand guidelines, colors, typography, logo usage (STRICT)
- **[devops-rules.md](devops-rules.md)** - Strict DevOps standards and quality gates
- **[project-structure.md](project-structure.md)** - Complete project structure and file paths
- **[monorepo-structure-explained.md](monorepo-structure-explained.md)** - Monorepo conventions and structure rationale
- **[tech-stack.md](tech-stack.md)** - All packages, tools, and technologies used
- **[commit-guidelines.md](commit-guidelines.md)** - Commit requirements and context documentation rules
- **[components.md](components.md)** - Component architecture, behavior, and usage rules
- **[case-study-tandem-draft.md](case-study-tandem-draft.md)** - Working Tandem case-study content source and placeholders

## Tandem Case-Study Note

- For ongoing Tandem fullscreen case-study work, keep `case-study-tandem-draft.md` synchronized with:
  - placeholder inventory,
  - approved public links,
  - confirmed role/challenge/outcome wording,
  - and implemented interaction patterns (timeline markers, tech stack collapse, placeholder expansion behavior, preview ratio constraints).
- Static assets for the finalized Tandem case study are organized under `apps/web/public/case-study/tandem/` and documented in `project-structure.md`.

## ⚠️ CRITICAL: CONTEXT-FIRST WORKFLOW

### Before EVERY Change

**MANDATORY CHECKLIST:**

1. ✅ Read relevant `contexts/` files
2. ✅ If any requirement is unclear, ask clarifying questions before implementing
3. ✅ Make your changes
4. ✅ **Provide a quick summary of changes with examples** (var names, line changes, function names)
   - Example: "Renamed `isReady` → `showElements`, consolidated 3 useEffects → 1, removed `lineOffset` prop"
5. ✅ **Ask: "Does this require context update?"**
6. ✅ If YES → Update context files
7. ✅ Stage context changes with your code
8. ✅ Commit (hooks will enforce this)

### When Context Update is Required

**Always update context when you:**

- Add new features → Update `project-structure.md` + `tech-stack.md`
- Add dependencies → Update `tech-stack.md`
- Change file structure → Update `project-structure.md`
- Modify CI/CD → Update `devops-rules.md`
- Add new DevOps rules → Update `devops-rules.md`
- Add new component files → Update `components.md`
- Add new `contexts/*.md` files → Update `contexts/README.md`

**Pre-commit hooks will BLOCK if context is missing!**

## 🛡️ Enforced by Automation

### Pre-Commit Hooks Block:

- ❌ TypeScript errors
- ❌ ESLint errors
- ❌ Format violations
- ❌ `feat:` commits without context updates
- ❌ `chore(deps):` commits without tech-stack updates
- ❌ `ci:` commits without devops-rules updates
- ❌ New components without `contexts/components.md`
- ❌ New `contexts/*.md` without `contexts/README.md`

### This Context is Committed

- ✅ `contexts/` is tracked in git
- ✅ Helps future AI understand the project
- ✅ Maintains living documentation
- ❌ Never put secrets here (use env vars)

## 🎯 Branding Rules

- Username: **SDX24**
- No variations like "SDX 2024" or "SDX2024"
- Keep branding consistent

## 🚫 DO NOT EDIT: Main README.md

**CRITICAL**: `/README.md` (root) is the **GitHub profile page**, NOT project documentation.

- ❌ DO NOT edit main README.md for project documentation
- ❌ DO NOT add setup instructions or technical details there
- ✅ It should ONLY contain portfolio/profile information
- ✅ For project docs, update `contexts/` files instead
- ✅ Main README is separate from this repository's development

**Purpose**: GitHub profile page visible at `github.com/sdx24/sdx24`

## 🔍 AI Workflow

**Every time you make changes:**

```
1. Read contexts/devops-rules.md
2. Read contexts/project-structure.md
3. Read contexts/tech-stack.md
4. Make your changes
5. Check: Does this need context update?
   - Adding files? → Update project-structure.md
   - Using new packages? → Update tech-stack.md
   - Changing CI/build? → Update devops-rules.md
6. Stage ALL changes (code + context)
7. Commit with conventional message
8. Pre-commit hook validates everything
```

## 📝 Context Update Examples

**Adding a projects page:**

```bash
# 1. Create the page
touch apps/web/src/app/projects/page.tsx

# 2. Update context
# Edit contexts/project-structure.md to document new route

# 3. Stage everything
git add apps/web/src/app/projects/
git add contexts/project-structure.md

# 4. Commit
git commit -m "feat(portfolio): add projects page"
```

**Adding a dependency:**

```bash
# 1. Install package
bun add framer-motion

# 2. Update context
# Edit contexts/tech-stack.md to document new package

# 3. Stage everything
git add package.json bun.lockb
git add contexts/tech-stack.md

# 4. Commit
git commit -m "chore(deps): add framer-motion for animations"
```

## ⚡ Quick Context Check

**Before committing, ask:**

- Did I add files/routes? → Update `project-structure.md`
- Did I add packages? → Update `tech-stack.md`
- Did I change CI/CD? → Update `devops-rules.md`
- Did I add component files? → Update `components.md`
- Did I add a new context file? → Update `contexts/README.md`
- If YES to any → Stage those context files!

**Hooks will catch missing context and block the commit.**
