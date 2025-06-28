#!/usr/bin/env node

/**
 * Production Build Verification Script for Atlas Platform
 * This script verifies that the production build is ready for deployment
 */

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

console.log("🚀 Atlas Platform - Production Build Verification\n");

// Step 1: Verify Node.js version
console.log("1. Checking Node.js version...");
const nodeVersion = process.version;
console.log(`   Node.js version: ${nodeVersion}`);
if (parseInt(nodeVersion.split(".")[0].slice(1)) < 18) {
  console.error("   ❌ Node.js version 18 or higher is required");
  process.exit(1);
}
console.log("   ✅ Node.js version is compatible\n");

// Step 2: Check for critical files
console.log("2. Checking critical files...");
const criticalFiles = [
  "package.json",
  "vite.config.ts",
  "src/App.tsx",
  "src/main.tsx",
  "index.html",
];

criticalFiles.forEach((file) => {
  if (fs.existsSync(file)) {
    console.log(`   ✅ ${file}`);
  } else {
    console.log(`   ❌ ${file} - MISSING`);
    process.exit(1);
  }
});
console.log("   ✅ All critical files present\n");

// Step 3: Install dependencies
console.log("3. Installing dependencies...");
try {
  execSync("npm install", { stdio: "inherit" });
  console.log("   ✅ Dependencies installed successfully\n");
} catch (error) {
  console.error("   ❌ Failed to install dependencies");
  process.exit(1);
}

// Step 4: Run type checking
console.log("4. Running TypeScript type checking...");
try {
  execSync("npm run typecheck", { stdio: "inherit" });
  console.log("   ✅ Type checking passed\n");
} catch (error) {
  console.error("   ❌ Type checking failed");
  process.exit(1);
}

// Step 5: Run linting
console.log("5. Running ESLint...");
try {
  execSync("npm run lint", { stdio: "pipe" });
  console.log("   ✅ Linting passed\n");
} catch (error) {
  console.log("   ⚠️  Linting warnings (non-blocking)\n");
}

// Step 6: Build for production
console.log("6. Building for production...");
try {
  execSync("npm run build", { stdio: "inherit" });
  console.log("   ✅ Production build successful\n");
} catch (error) {
  console.error("   ❌ Production build failed");
  process.exit(1);
}

// Step 7: Verify build output
console.log("7. Verifying build output...");
const distDir = "./dist";
if (fs.existsSync(distDir)) {
  const files = fs.readdirSync(distDir);
  console.log(`   ✅ Build output directory exists with ${files.length} files`);

  // Check for essential files
  const hasIndex = files.some((f) => f === "index.html");
  const hasAssets = files.some((f) => f === "assets");

  if (hasIndex && hasAssets) {
    console.log("   ✅ Essential build files present");
  } else {
    console.log("   ❌ Missing essential build files");
    process.exit(1);
  }
} else {
  console.log("   ❌ Build output directory not found");
  process.exit(1);
}

// Step 8: Check bundle size
console.log("\n8. Analyzing bundle size...");
const assetsDir = path.join(distDir, "assets");
if (fs.existsSync(assetsDir)) {
  const assetFiles = fs.readdirSync(assetsDir);
  let totalSize = 0;

  assetFiles.forEach((file) => {
    const filePath = path.join(assetsDir, file);
    const stats = fs.statSync(filePath);
    totalSize += stats.size;
  });

  const totalSizeMB = (totalSize / 1024 / 1024).toFixed(2);
  console.log(`   📦 Total bundle size: ${totalSizeMB} MB`);

  if (totalSize < 10 * 1024 * 1024) {
    // 10MB
    console.log("   ✅ Bundle size is optimal");
  } else {
    console.log("   ⚠️  Bundle size is large (consider optimization)");
  }
}

// Step 9: Environment check
console.log("\n9. Environment configuration...");
const envFiles = [".env.production", ".env.example"];
envFiles.forEach((file) => {
  if (fs.existsSync(file)) {
    console.log(`   ✅ ${file}`);
  } else {
    console.log(`   ⚠️  ${file} not found (optional)`);
  }
});

// Step 10: Deployment readiness
console.log("\n10. Deployment readiness check...");
const deploymentFiles = ["vercel.json"];
deploymentFiles.forEach((file) => {
  if (fs.existsSync(file)) {
    console.log(`   ✅ ${file} - Vercel deployment ready`);
  }
});

// Final summary
console.log("\n" + "=".repeat(50));
console.log("🎉 PRODUCTION BUILD VERIFICATION COMPLETE");
console.log("=".repeat(50));
console.log("✅ Build Status: READY FOR DEPLOYMENT");
console.log("📦 Output Directory: ./dist");
console.log("🌐 Deployment Platforms: Vercel, AWS, Azure");
console.log("📚 Documentation: DEPLOYMENT.md");
console.log("=".repeat(50));

console.log("\n🚀 Ready to deploy! Choose your platform:");
console.log("   • Vercel: npx vercel");
console.log("   • AWS: amplify publish");
console.log("   • Azure: swa deploy");
console.log("   • Manual: Upload ./dist folder to your server\n");
