// Fix for invalid lucide-react imports
// Run this script to fix all the problematic icon imports

const fs = require("fs");
const path = require("path");
const glob = require("glob");

// Mapping of invalid imports to valid ones
const iconMapping = {
  BadgeCheck: "ShieldCheck",
  CheckCircle2: "CheckCircle",
  Layers: "Stack",
  ShieldAlert: "ShieldX",
  Instagram: "Camera",
  Twitter: "Bird",
  Linkedin: "Link",
  Facebook: "Users",
  Fingerprint: "Scan",
  MessageSquare: "MessageCircle",
  BarChart2: "BarChart3",
  MessageCircle: "MessageCircle",
  WifiOff: "WifiOff",
  Dot: "Circle",
};

// Function to fix imports in a file
function fixImportsInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, "utf8");
    let modified = false;

    // Fix import statements
    Object.keys(iconMapping).forEach((oldIcon) => {
      const newIcon = iconMapping[oldIcon];

      // Fix in import statement
      const importRegex = new RegExp(
        `\\b${oldIcon}\\b(?=.*from\\s+['"]lucide-react['"])`,
        "g",
      );
      if (content.match(importRegex)) {
        content = content.replace(importRegex, newIcon);
        modified = true;
        console.log(`Fixed import ${oldIcon} -> ${newIcon} in ${filePath}`);
      }

      // Fix usage in JSX
      const usageRegex = new RegExp(`<${oldIcon}`, "g");
      if (content.match(usageRegex)) {
        content = content.replace(usageRegex, `<${newIcon}`);
        modified = true;
        console.log(`Fixed usage ${oldIcon} -> ${newIcon} in ${filePath}`);
      }
    });

    if (modified) {
      fs.writeFileSync(filePath, content);
      console.log(`✅ Fixed ${filePath}`);
    }
  } catch (error) {
    console.error(`❌ Error fixing ${filePath}:`, error.message);
  }
}

// Find all React files
const files = glob.sync("src/**/*.{tsx,ts}", { cwd: process.cwd() });

console.log("🔧 Fixing lucide-react imports...\n");

files.forEach(fixImportsInFile);

console.log("\n✅ All lucide-react imports fixed!");
