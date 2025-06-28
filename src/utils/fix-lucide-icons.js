// Critical fix for production build - Invalid lucide-react imports
export const LUCIDE_ICON_FIXES = {
  // Invalid icons that don't exist in lucide-react and their replacements
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
  WifiOff: "WifiOff", // This one might be valid
  Dot: "Circle",
};

// Export the fix mapping for reference
console.log("Lucide icon fixes available:", LUCIDE_ICON_FIXES);
