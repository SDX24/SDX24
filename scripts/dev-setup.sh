#!/bin/bash

set -e

echo "🚀 SDX24 Development Environment Setup"
echo "======================================"
echo ""

# Check if bun is installed
if ! command -v bun &> /dev/null; then
    echo "❌ Bun is not installed."
    echo "   Install from: https://bun.sh"
    echo "   Run: curl -fsSL https://bun.sh/install | bash"
    exit 1
fi

echo "✅ Bun found: $(bun --version)"
echo ""

# 1. Install dependencies
echo "📦 Installing dependencies..."
bun install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed"
echo ""

# 2. Check for Vercel CLI
echo "🔐 Setting up environment variables..."

if command -v vercel &> /dev/null; then
    echo "✅ Vercel CLI found"
    
    # Check if project is linked
    if [ -f ".vercel/project.json" ]; then
        echo "✅ Project already linked to Vercel"
    else
        echo "⚠️  Project not linked to Vercel"
        echo "   Run: vercel link"
        echo "   Then run this script again"
        exit 1
    fi
    
    # Pull environment variables
    echo "📥 Pulling environment variables from Vercel..."
    vercel env pull apps/web/.env.local
    
    if [ $? -eq 0 ]; then
        echo "✅ Environment variables synced"
    else
        echo "⚠️  Failed to sync environment variables"
        echo "   You may need to run: vercel login"
    fi
else
    echo "⚠️  Vercel CLI not found"
    echo ""
    echo "To manage environment variables from GitHub:"
    echo "  1. Install Vercel CLI: npm i -g vercel"
    echo "  2. Login: vercel login"
    echo "  3. Link project: vercel link"
    echo "  4. Pull env vars: vercel env pull apps/web/.env.local"
    echo ""
    echo "For now, copy .env.example:"
    
    if [ ! -f "apps/web/.env.local" ]; then
        cp apps/web/.env.example apps/web/.env.local
        echo "✅ Created apps/web/.env.local from .env.example"
        echo "   ⚠️  You'll need to fill in actual values"
    else
        echo "✅ apps/web/.env.local already exists"
    fi
fi

echo ""

# 3. Install Playwright browsers
echo "🎭 Installing Playwright browsers..."

if bunx playwright install chromium --with-deps > /dev/null 2>&1; then
    echo "✅ Playwright browsers installed"
else
    echo "⚠️  Playwright installation may need system dependencies"
    echo "   Run manually: bunx playwright install chromium --with-deps"
fi

echo ""

# 4. Verify setup
echo "🔍 Verifying setup..."

echo "  → Type checking..."
if bun run type-check > /dev/null 2>&1; then
    echo "  ✅ Type check passed"
else
    echo "  ⚠️  Type check failed (this is okay for initial setup)"
fi

echo "  → Checking build..."
if bun run build > /dev/null 2>&1; then
    echo "  ✅ Build successful"
else
    echo "  ⚠️  Build failed (check env vars)"
fi

echo ""
echo "======================================"
echo "✅ Setup complete!"
echo ""
echo "Quick start:"
echo "  bun dev              # Start development server"
echo "  bun run env:sync     # Re-sync environment variables"
echo "  bun run type-check   # Run type checking"
echo "  bun run test:e2e     # Run E2E tests"
echo ""
echo "Environment variables:"
echo "  vercel env pull      # Sync from Vercel"
echo "  vercel env ls        # List all env vars"
echo ""
echo "📚 Documentation:"
echo "  README.md                        # Project overview"
echo "  contexts/                        # AI context files"
echo "  docs/MANAGING_WITHOUT_VSCODE.md  # CLI guide"
echo "  docs/ENVIRONMENT_MANAGEMENT.md   # Env vars guide"
echo ""
echo "Happy coding! 🚀"
