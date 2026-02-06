#!/bin/sh

echo "Running optimization advisory (non-blocking)..."

STAGED_FILES=$(git diff --cached --name-only)
CODE_FILES=$(echo "$STAGED_FILES" | grep -E '\.(tsx?|jsx?)$' || true)
ASSET_FILES=$(echo "$STAGED_FILES" | grep -E '\.(png|jpe?g|svg|webp|gif|mp4|webm)$' || true)

warn() {
  echo "⚠️  $1"
}

if [ -n "$CODE_FILES" ]; then
  if echo "$CODE_FILES" | xargs grep -n '<img\b' 2>/dev/null | grep -q .; then
    warn "Found <img> usage in staged files; prefer next/image for optimization."
  fi

  if echo "$CODE_FILES" | xargs grep -n '<Image\b' 2>/dev/null | grep -q .; then
    if ! echo "$CODE_FILES" | xargs grep -n 'sizes=' 2>/dev/null | grep -q .; then
      warn "Next.js Image without sizes in staged files; add sizes to avoid layout shifts."
    fi
  fi

  if echo "$CODE_FILES" | xargs grep -n -E 'from\s+["\']lodash["\']|require\(["\']lodash["\']\)' 2>/dev/null | grep -q .; then
    warn "Lodash import detected; consider targeted imports to reduce bundle size."
  fi

  if echo "$CODE_FILES" | xargs grep -n -E 'from\s+["\']moment["\']|require\(["\']moment["\']\)' 2>/dev/null | grep -q .; then
    warn "Moment.js import detected; consider lighter date libraries to reduce bundle size."
  fi

  if echo "$CODE_FILES" | xargs grep -n -E 'Math\.random\(|Date\.now\(' 2>/dev/null | grep -q .; then
    warn "Random/time calls found in code; avoid inside render paths to prevent re-render churn."
  fi

  if echo "$CODE_FILES" | xargs grep -n "use client" 2>/dev/null | grep -q .; then
    if echo "$CODE_FILES" | xargs grep -n 'fetch\(' 2>/dev/null | grep -q .; then
      warn "fetch() in client components detected; consider server-side data fetching or caching."
    fi
    if echo "$CODE_FILES" | grep -E '/app/.*/(page|layout)\.tsx$' | xargs grep -n "use client" 2>/dev/null | grep -q .; then
      warn "Client directive in app page/layout detected; consider keeping these server-side when possible."
    fi
  fi

  if echo "$CODE_FILES" | xargs grep -n -E 'react-icons/' 2>/dev/null | grep -q .; then
    if echo "$CODE_FILES" | xargs grep -n -E 'react-icons/lu' 2>/dev/null | grep -q .; then
      :
    else
      warn "Non-Lucide react-icons usage detected; prefer react-icons/lu only."
    fi
  fi
fi

if [ -n "$ASSET_FILES" ]; then
  DUPLICATE_ASSETS=$(echo "$ASSET_FILES" | xargs -n1 basename | sort | uniq -d)
  if [ -n "$DUPLICATE_ASSETS" ]; then
    warn "Duplicate asset filenames staged:"
    echo "$DUPLICATE_ASSETS"
  fi
fi

UI_STAGED=$(echo "$STAGED_FILES" | grep -E '^apps/web/src/(app|components)/' || true)
E2E_STAGED=$(echo "$STAGED_FILES" | grep -E '^apps/web/e2e/|\.spec\.ts$' || true)
if [ -n "$UI_STAGED" ] && [ -z "$E2E_STAGED" ]; then
  warn "UI changes staged without E2E updates; consider running bun run test:e2e."
fi

echo "Optimization advisory completed."
exit 0
