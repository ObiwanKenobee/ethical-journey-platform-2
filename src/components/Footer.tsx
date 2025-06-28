import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Camera,
  Bird,
  Link as LinkIcon,
  Users,
  Globe,
  Network,
} from "lucide-react";

const SocialLink = ({
  href,
  icon,
}: {
  href: string;
  icon: React.ReactNode;
}) => (
  <a
    href={href}
    className="w-9 h-9 rounded-full bg-muted hover:bg-primary transition-colors flex items-center justify-center text-muted-foreground hover:text-primary-foreground"
    target="_blank"
    rel="noopener noreferrer"
  >
    {icon}
  </a>
);

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border/5">
      <div className="container-tight py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="relative">
                <Globe className="h-6 w-6 text-primary" />
                <Network className="absolute h-2 w-2 text-primary bottom-1.5 left-2" />
              </div>
              <span className="text-xl font-bold tracking-tight">Atlas</span>
            </Link>
            <p className="text-muted-foreground text-sm mb-4 max-w-sm">
              Empowering ethical supply chains with AI & blockchain technology.
              Protecting 24.9 million vulnerable workers worldwide.
            </p>
            <div className="flex items-center space-x-2">
              <SocialLink
                href="https://x.com/AtlasHQ"
                icon={<Bird className="h-4 w-4" />}
              />
              <SocialLink href="#" icon={<LinkIcon className="h-4 w-4" />} />
              <SocialLink href="#" icon={<Users className="h-4 w-4" />} />
              <SocialLink
                href="https://www.instagram.com/atlashq/"
                icon={<Camera className="h-4 w-4" />}
              />
            </div>
          </div>

          {/* Platform */}
          <div>
            <h3 className="font-semibold mb-4">Platform</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  to="/platform"
                  className="hover:text-foreground transition-colors"
                >
                  Platform Overview
                </Link>
              </li>
              <li>
                <Link
                  to="/platform/risk-engine"
                  className="hover:text-foreground transition-colors"
                >
                  AI Risk Engine
                </Link>
              </li>
              <li>
                <Link
                  to="/platform/intelligence-dashboard"
                  className="hover:text-foreground transition-colors"
                >
                  Global Intelligence
                </Link>
              </li>
              <li>
                <Link
                  to="/market-impact"
                  className="hover:text-foreground transition-colors"
                >
                  Market Impact
                </Link>
              </li>
              <li>
                <Link
                  to="/workforce"
                  className="hover:text-foreground transition-colors"
                >
                  Workforce Solutions
                </Link>
              </li>
            </ul>
          </div>

          {/* Enterprise */}
          <div>
            <h3 className="font-semibold mb-4">Enterprise</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  to="/enterprise"
                  className="hover:text-foreground transition-colors"
                >
                  Enterprise Overview
                </Link>
              </li>
              <li>
                <Link
                  to="/enterprise/integration-hub"
                  className="hover:text-foreground transition-colors"
                >
                  Integration Hub
                </Link>
              </li>
              <li>
                <Link
                  to="/enterprise/security-compliance"
                  className="hover:text-foreground transition-colors"
                >
                  Security & Compliance
                </Link>
              </li>
              <li>
                <Link
                  to="/enterprise/analytics"
                  className="hover:text-foreground transition-colors"
                >
                  Enterprise Analytics
                </Link>
              </li>
              <li>
                <Link
                  to="/enterprise/demo"
                  className="hover:text-foreground transition-colors"
                >
                  Request Demo
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  to="/about"
                  className="hover:text-foreground transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/careers"
                  className="hover:text-foreground transition-colors"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="hover:text-foreground transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/impact"
                  className="hover:text-foreground transition-colors"
                >
                  Our Impact
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-foreground transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-border/5 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="font-semibold mb-2">
                Stay updated on our mission
              </h3>
              <p className="text-sm text-muted-foreground">
                Get the latest insights on supply chain ethics and transparency.
              </p>
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-64 px-3 py-2 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors flex items-center gap-1 text-sm">
                Subscribe
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border/5 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-6">
            <p>&copy; 2024 Atlas. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <Link
                to="/privacy"
                className="hover:text-foreground transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="hover:text-foreground transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                to="/security"
                className="hover:text-foreground transition-colors"
              >
                Security
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs">
            <span>Built with</span>
            <span className="text-red-500">♥</span>
            <span>for human dignity</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
