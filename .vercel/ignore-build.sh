#!/bin/bash

echo "🔍 Vercel Build Check - Conflict Resolution & Smart Deployment"

# Get environment variables
VERCEL_GIT_COMMIT_MESSAGE=${VERCEL_GIT_COMMIT_MESSAGE:-""}
VERCEL_GIT_COMMIT_REF=${VERCEL_GIT_COMMIT_REF:-""}
VERCEL_GIT_COMMIT_SHA=${VERCEL_GIT_COMMIT_SHA:-""}

echo "📝 Commit: $VERCEL_GIT_COMMIT_MESSAGE"
echo "🌿 Branch: $VERCEL_GIT_COMMIT_REF" 
echo "🔗 SHA: $VERCEL_GIT_COMMIT_SHA"

# Skip build for documentation-only changes
if [[ "$VERCEL_GIT_COMMIT_MESSAGE" =~ ^\[docs\] ]] || [[ "$VERCEL_GIT_COMMIT_MESSAGE" =~ ^docs: ]]; then
  echo "📚 Documentation-only change detected. Skipping build."
  exit 0
fi

# Skip build for merge conflict resolution commits
if [[ "$VERCEL_GIT_COMMIT_MESSAGE" =~ "resolve.*conflict" ]] || [[ "$VERCEL_GIT_COMMIT_MESSAGE" =~ "merge.*conflict" ]]; then
  echo "🔧 Conflict resolution commit detected. Checking if build is needed..."
  
  # Check if only merge markers or trivial changes
  if git diff --name-only HEAD~1 HEAD | grep -E '\.(md|txt|yml|yaml)$' > /dev/null; then
    echo "📋 Only configuration files changed. Skipping build."
    exit 0
  fi
fi

# Skip build for CI/automation commits
if [[ "$VERCEL_GIT_COMMIT_MESSAGE" =~ ^\[ci\] ]] || [[ "$VERCEL_GIT_COMMIT_MESSAGE" =~ ^\[auto\] ]]; then
  echo "🤖 Automation commit detected. Skipping build."
  exit 0
fi

# Always build for main branch
if [[ "$VERCEL_GIT_COMMIT_REF" == "main" ]]; then
  echo "🚀 Main branch detected. Building."
  exit 1
fi

# Always build for development branch
if [[ "$VERCEL_GIT_COMMIT_REF" == "development" ]]; then
  echo "🧪 Development branch detected. Building."
  exit 1
fi

# Build for feature branches with specific patterns
if [[ "$VERCEL_GIT_COMMIT_REF" =~ ^feature/ ]] || [[ "$VERCEL_GIT_COMMIT_REF" =~ ^feat/ ]]; then
  echo "✨ Feature branch detected. Building."
  exit 1
fi

# Build for bugfix branches
if [[ "$VERCEL_GIT_COMMIT_REF" =~ ^bugfix/ ]] || [[ "$VERCEL_GIT_COMMIT_REF" =~ ^fix/ ]]; then
  echo "🐛 Bugfix branch detected. Building."
  exit 1
fi

# Build for release branches
if [[ "$VERCEL_GIT_COMMIT_REF" =~ ^release/ ]]; then
  echo "🏷️ Release branch detected. Building."
  exit 1
fi

# Build for hotfix branches
if [[ "$VERCEL_GIT_COMMIT_REF" =~ ^hotfix/ ]]; then
  echo "🚨 Hotfix branch detected. Building."
  exit 1
fi

# Check for significant file changes
echo "🔍 Checking for significant changes..."

# Get list of changed files
CHANGED_FILES=$(git diff --name-only HEAD~1 HEAD 2>/dev/null || echo "")

if [[ -z "$CHANGED_FILES" ]]; then
  echo "📄 No file changes detected. Skipping build."
  exit 0
fi

echo "📝 Changed files:"
echo "$CHANGED_FILES"

# Check if any significant files changed
SIGNIFICANT_CHANGES=false

# Check for source code changes
if echo "$CHANGED_FILES" | grep -E '\.(ts|tsx|js|jsx|css|scss|html|json)$' > /dev/null; then
  SIGNIFICANT_CHANGES=true
  echo "💻 Source code changes detected."
fi

# Check for package.json changes
if echo "$CHANGED_FILES" | grep -E 'package(-lock)?\.json$' > /dev/null; then
  SIGNIFICANT_CHANGES=true
  echo "📦 Package changes detected."
fi

# Check for configuration changes
if echo "$CHANGED_FILES" | grep -E '(vite|tailwind|tsconfig|vercel)\..*\.(js|ts|json)$' > /dev/null; then
  SIGNIFICANT_CHANGES=true
  echo "⚙️ Configuration changes detected."
fi

# Check for public asset changes
if echo "$CHANGED_FILES" | grep -E '^public/' > /dev/null; then
  SIGNIFICANT_CHANGES=true
  echo "🖼️ Public asset changes detected."
fi

# Check for component changes
if echo "$CHANGED_FILES" | grep -E '^src/(components|pages|hooks|lib|services)/' > /dev/null; then
  SIGNIFICANT_CHANGES=true
  echo "🧩 Component/service changes detected."
fi

if [[ "$SIGNIFICANT_CHANGES" == "true" ]]; then
  echo "✅ Significant changes detected. Proceeding with build."
  exit 1
else
  echo "⏭️ No significant changes detected. Skipping build."
  exit 0
fi
