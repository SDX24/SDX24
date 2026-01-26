# AI Context Directory

This directory contains essential context files that AI assistants **MUST** read before making any changes to the codebase.

## 📋 Context Files

- **[devops-rules.md](devops-rules.md)** - Strict DevOps standards and quality gates
- **[project-structure.md](project-structure.md)** - Complete project structure and file paths
- **[tech-stack.md](tech-stack.md)** - All packages, tools, and technologies used
- **[commit-guidelines.md](commit-guidelines.md)** - Commit requirements and context documentation rules

## ⚠️ CRITICAL: CONTEXT-FIRST WORKFLOW

### Before EVERY Change

**MANDATORY CHECKLIST:**

1. ✅ Read relevant `.context/` files
2. ✅ Make your changes
3. ✅ **Ask: "Does this require context update?"**
4. ✅ If YES → Update context files
5. ✅ Stage context changes with your code
6. ✅ Commit (hooks will enforce this)

### When Context Update is Required

**Always update context when you:**

- Add new features → Update `project-structure.md` + `tech-stack.md`
- Add dependencies → Update `tech-stack.md`
- Change file structure → Update `project-structure.md`
- Modify CI/CD → Update `devops-rules.md`
- Add new DevOps rules → Update `devops-rules.md`

**Pre-commit hooks will BLOCK if context is missing!**

## 🛡️ Enforced by Automation

### Pre-Commit Hooks Block:

- ❌ TypeScript errors
- ❌ ESLint errors
- ❌ Format violations
- ❌ `feat:` commits without context updates
- ❌ `chore(deps):` commits without tech-stack updates
- ❌ `ci:` commits without devops-rules updates

### This Context is Committed

- ✅ `.context/` is tracked in git
- ✅ Helps future AI understand the project
- ✅ Maintains living documentation
- ❌ Never put secrets here (use env vars)

## 🎯 Branding Rules

- Username: **SDX24**
- No variations like "SDX 2024" or "SDX2024"
- Keep branding consistent

## 🔍 AI Workflow

**Every time you make changes:**

```
1. Read .context/devops-rules.md
2. Read .context/project-structure.md
3. Read .context/tech-stack.md
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
# Edit .context/project-structure.md to document new route

# 3. Stage everything
git add apps/web/src/app/projects/
git add .context/project-structure.md

# 4. Commit
git commit -m "feat(portfolio): add projects page"
```

**Adding a dependency:**

```bash
# 1. Install package
bun add framer-motion

# 2. Update context
# Edit .context/tech-stack.md to document new package

# 3. Stage everything
git add package.json bun.lockb
git add .context/tech-stack.md

# 4. Commit
git commit -m "chore(deps): add framer-motion for animations"
```

## ⚡ Quick Context Check

**Before committing, ask:**

- Did I add files/routes? → Update `project-structure.md`
- Did I add packages? → Update `tech-stack.md`
- Did I change CI/CD? → Update `devops-rules.md`
- If YES to any → Stage those context files!

**Hooks will catch missing context and block the commit.**
