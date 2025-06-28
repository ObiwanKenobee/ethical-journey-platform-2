import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import {
  Menu,
  X,
  Globe,
  Network,
  ChevronDown,
  ChevronRight,
  Shield,
  TreeDeciduous,
  Star,
  Building2,
  Factory,
  Shirt,
  Smartphone,
  Truck,
  Zap,
  Database,
  Users,
  BarChart3,
  Search,
  ArrowRight,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { useResponsive } from "@/hooks/useResponsive";

const NavLink = ({
  href,
  children,
  className,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) => {
  const location = useLocation();
  const isActive = location.pathname === href;

  return (
    <Link
      to={href}
      onClick={onClick}
      className={cn(
        "relative text-sm font-medium text-foreground/90 transition-colors hover:text-foreground",
        "after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full",
        "after:origin-bottom-right after:scale-x-0 after:bg-foreground after:transition-transform",
        "after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100",
        isActive &&
          "text-foreground after:scale-x-100 after:origin-bottom-left",
        className,
      )}
    >
      {children}
    </Link>
  );
};

const MobileDropdown = ({
  title,
  children,
  icon: Icon,
}: {
  title: string;
  children: React.ReactNode;
  icon?: React.ComponentType<any>;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-base py-3 font-semibold text-left hover:text-primary transition-colors"
      >
        <div className="flex items-center gap-2">
          {Icon && <Icon className="h-4 w-4" />}
          {title}
        </div>
        <ChevronRight
          className={cn("h-4 w-4 transition-transform", isOpen && "rotate-90")}
        />
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out",
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className="pl-6 space-y-3 pb-2">{children}</div>
      </div>
    </div>
  );
};

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();
  const { isMobile, isTablet, isDesktop } = useResponsive();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const handleResize = () => {
      if (window.innerWidth >= 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [isMenuOpen]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "py-2 sm:py-3 glass shadow-glass-sm backdrop-blur-xl"
            : "py-4 sm:py-5 bg-transparent",
        )}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center space-x-2 group shrink-0"
              onClick={closeMenu}
            >
              <div className="relative">
                <Globe className="h-6 w-6 sm:h-7 sm:w-7 text-primary group-hover:scale-110 transition-transform" />
                <Network className="absolute h-2 w-2 sm:h-2.5 sm:w-2.5 text-primary bottom-1.5 left-2 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-bold tracking-tight">
                  Atlas
                </span>
                <span className="hidden lg:block text-xs text-muted-foreground -mt-1">
                  Building Tomorrow
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              <NavLink href="/">Home</NavLink>
              <NavLink href="/about">About</NavLink>

              {/* Platform Dropdown */}
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger
                      className={cn(
                        "relative text-sm font-medium text-foreground/90 transition-colors hover:text-foreground bg-transparent",
                        "hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent",
                        location.pathname === "/platform" && "text-foreground",
                      )}
                    >
                      Platform
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="glass shadow-glass-sm border border-border/50 p-3 rounded-xl">
                      <ul className="grid w-[600px] gap-3 p-3 md:w-[700px] md:grid-cols-3">
                        <li>
                          <NavigationMenuLink asChild>
                            <Link
                              to="/platform"
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                            >
                              <div className="flex items-center gap-2 text-sm font-medium">
                                <Globe className="h-4 w-4 text-primary" />
                                Platform Overview
                              </div>
                              <p className="line-clamp-2 text-sm text-muted-foreground">
                                Our comprehensive ethical supply chain platform
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <Link
                              to="/platform/risk-engine"
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                            >
                              <div className="flex items-center gap-2 text-sm font-medium">
                                <Zap className="h-4 w-4 text-primary" />
                                AI Risk Engine
                              </div>
                              <p className="line-clamp-2 text-sm text-muted-foreground">
                                Advanced AI-powered risk assessment and
                                prediction
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <Link
                              to="/platform/intelligence-dashboard"
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                            >
                              <div className="flex items-center gap-2 text-sm font-medium">
                                <BarChart3 className="h-4 w-4 text-primary" />
                                Global Intelligence
                              </div>
                              <p className="line-clamp-2 text-sm text-muted-foreground">
                                Real-time global supply chain monitoring
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <Link
                              to="/market-impact"
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                            >
                              <div className="flex items-center gap-2 text-sm font-medium">
                                <Network className="h-4 w-4 text-primary" />
                                Market Impact
                              </div>
                              <p className="line-clamp-2 text-sm text-muted-foreground">
                                How our technology transforms global markets
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <Link
                              to="/workforce"
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                            >
                              <div className="flex items-center gap-2 text-sm font-medium">
                                <Users className="h-4 w-4 text-primary" />
                                Workforce Solutions
                              </div>
                              <p className="line-clamp-2 text-sm text-muted-foreground">
                                Protect workers worldwide through technology
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <Link
                              to="/careers"
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                            >
                              <div className="flex items-center gap-2 text-sm font-medium">
                                <Building2 className="h-4 w-4 text-primary" />
                                Careers
                              </div>
                              <p className="line-clamp-2 text-sm text-muted-foreground">
                                Join our team building an ethical future
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>

              {/* Enterprise Dropdown */}
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger
                      className={cn(
                        "relative text-sm font-medium text-foreground/90 transition-colors hover:text-foreground bg-transparent",
                        "hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent",
                        location.pathname.includes("/enterprise") &&
                          "text-foreground",
                      )}
                    >
                      Enterprise
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="glass shadow-glass-sm border border-border/50 p-3 rounded-xl">
                      <ul className="grid w-[600px] gap-3 p-3 md:w-[700px] md:grid-cols-3">
                        <li>
                          <NavigationMenuLink asChild>
                            <Link
                              to="/enterprise"
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                            >
                              <div className="flex items-center gap-2 text-sm font-medium">
                                <Building2 className="h-4 w-4 text-primary" />
                                Enterprise Overview
                              </div>
                              <p className="line-clamp-2 text-sm text-muted-foreground">
                                Comprehensive enterprise supply chain solutions
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <Link
                              to="/enterprise/integration-hub"
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                            >
                              <div className="flex items-center gap-2 text-sm font-medium">
                                <Database className="h-4 w-4 text-primary" />
                                Integration Hub
                              </div>
                              <p className="line-clamp-2 text-sm text-muted-foreground">
                                Connect with ERP, CRM, and enterprise systems
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <Link
                              to="/enterprise/workspace-management"
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                            >
                              <div className="flex items-center gap-2 text-sm font-medium">
                                <Users className="h-4 w-4 text-primary" />
                                Workspace Management
                              </div>
                              <p className="line-clamp-2 text-sm text-muted-foreground">
                                Multi-tenant enterprise workspace control
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <Link
                              to="/enterprise/security-compliance"
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                            >
                              <div className="flex items-center gap-2 text-sm font-medium">
                                <Shield className="h-4 w-4 text-primary" />
                                Security & Compliance
                              </div>
                              <p className="line-clamp-2 text-sm text-muted-foreground">
                                Enterprise-grade security and compliance tools
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <Link
                              to="/enterprise/analytics"
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                            >
                              <div className="flex items-center gap-2 text-sm font-medium">
                                <BarChart3 className="h-4 w-4 text-primary" />
                                Enterprise Analytics
                              </div>
                              <p className="line-clamp-2 text-sm text-muted-foreground">
                                Advanced reporting and business intelligence
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <Link
                              to="/enterprise/custom-solutions"
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                            >
                              <div className="flex items-center gap-2 text-sm font-medium">
                                <Zap className="h-4 w-4 text-primary" />
                                Custom Solutions
                              </div>
                              <p className="line-clamp-2 text-sm text-muted-foreground">
                                Tailored enterprise implementations
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>

              {/* Solutions Dropdown */}
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger
                      className={cn(
                        "relative text-sm font-medium text-foreground/90 transition-colors hover:text-foreground bg-transparent",
                        "hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent",
                        location.pathname.includes("/solutions") &&
                          "text-foreground",
                      )}
                    >
                      Solutions
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="glass shadow-glass-sm border border-border/50 p-3 rounded-xl">
                      <ul className="grid w-[500px] gap-3 p-3 md:w-[600px] md:grid-cols-2">
                        <li>
                          <NavigationMenuLink asChild>
                            <Link
                              to="/solutions/manufacturing"
                              className="flex items-center select-none space-x-3 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                            >
                              <Factory className="h-5 w-5 text-primary" />
                              <div>
                                <div className="text-sm font-medium">
                                  Manufacturing
                                </div>
                                <p className="line-clamp-2 text-sm text-muted-foreground">
                                  Supply chain solutions for manufacturers
                                </p>
                              </div>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <Link
                              to="/solutions/retail-fashion"
                              className="flex items-center select-none space-x-3 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                            >
                              <Shirt className="h-5 w-5 text-primary" />
                              <div>
                                <div className="text-sm font-medium">
                                  Retail & Fashion
                                </div>
                                <p className="line-clamp-2 text-sm text-muted-foreground">
                                  Ethical sourcing for fashion brands
                                </p>
                              </div>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <Link
                              to="/solutions/technology"
                              className="flex items-center select-none space-x-3 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                            >
                              <Smartphone className="h-5 w-5 text-primary" />
                              <div>
                                <div className="text-sm font-medium">
                                  Technology
                                </div>
                                <p className="line-clamp-2 text-sm text-muted-foreground">
                                  Tech hardware supply chain transparency
                                </p>
                              </div>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <Link
                              to="/solutions/logistics"
                              className="flex items-center select-none space-x-3 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                            >
                              <Truck className="h-5 w-5 text-primary" />
                              <div>
                                <div className="text-sm font-medium">
                                  Logistics & Transportation
                                </div>
                                <p className="line-clamp-2 text-sm text-muted-foreground">
                                  End-to-end logistics monitoring
                                </p>
                              </div>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>

              <NavLink href="/pricing">Pricing</NavLink>

              {/* Impact Dropdown */}
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger
                      className={cn(
                        "relative text-sm font-medium text-foreground/90 transition-colors hover:text-foreground bg-transparent",
                        "hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent",
                        location.pathname === "/impact" && "text-foreground",
                      )}
                    >
                      Impact
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="glass shadow-glass-sm border border-border/50 p-3 rounded-xl">
                      <ul className="grid w-[400px] gap-3 p-3">
                        <li>
                          <NavigationMenuLink asChild>
                            <Link
                              to="/impact"
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                            >
                              <div className="text-sm font-medium">
                                Impact Overview
                              </div>
                              <p className="line-clamp-2 text-sm text-muted-foreground">
                                See the tangible difference we're making
                                worldwide
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <Link
                              to="/impact/project-sentinel"
                              className="flex items-center select-none space-x-3 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                            >
                              <Shield className="h-5 w-5 text-primary" />
                              <div>
                                <div className="text-sm font-medium">
                                  Atlas Sentinel
                                </div>
                                <p className="line-clamp-2 text-sm text-muted-foreground">
                                  Proactive protection of vulnerable workers
                                </p>
                              </div>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <Link
                              to="/impact/project-evergreen"
                              className="flex items-center select-none space-x-3 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                            >
                              <TreeDeciduous className="h-5 w-5 text-harmony" />
                              <div>
                                <div className="text-sm font-medium">
                                  Project Evergreen
                                </div>
                                <p className="line-clamp-2 text-sm text-muted-foreground">
                                  Sustainable supply chain practices
                                </p>
                              </div>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <Link
                              to="/impact/guardians-initiative"
                              className="flex items-center select-none space-x-3 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                            >
                              <Star className="h-5 w-5 text-utopian" />
                              <div>
                                <div className="text-sm font-medium">
                                  Guardians of the Galaxy Initiative
                                </div>
                                <p className="line-clamp-2 text-sm text-muted-foreground">
                                  Global coalition for ethical trade
                                </p>
                              </div>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>

              <NavLink href="/blog">Blog</NavLink>
            </nav>

            {/* Tablet Navigation (md-lg) */}
            <nav className="hidden md:flex lg:hidden items-center space-x-4">
              <NavLink href="/">Home</NavLink>
              <NavLink href="/platform">Platform</NavLink>
              <NavLink href="/enterprise">Enterprise</NavLink>
              <NavLink href="/pricing">Pricing</NavLink>
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                className="hidden xl:inline-flex"
              >
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
              <Button asChild size="sm" className="group">
                <Link to="/join">
                  Join Movement
                  <ArrowRight className="h-3 w-3 ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>

            {/* Mobile CTA & Menu Button */}
            <div className="flex items-center space-x-3 md:hidden">
              <Button
                asChild
                size="sm"
                variant="outline"
                className="hidden sm:inline-flex"
              >
                <Link to="/join">Join</Link>
              </Button>
              <button
                className="p-2 text-foreground hover:bg-accent rounded-md transition-colors"
                onClick={toggleMenu}
                aria-label="Toggle navigation menu"
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>

            {/* Tablet Menu Button */}
            <button
              className="hidden md:block lg:hidden p-2 text-foreground hover:bg-accent rounded-md transition-colors"
              onClick={toggleMenu}
              aria-label="Toggle navigation menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile/Tablet Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={closeMenu}
        />
      )}

      {/* Mobile/Tablet Navigation Menu */}
      <div
        ref={menuRef}
        className={cn(
          "fixed top-0 right-0 h-full w-full max-w-sm bg-background/95 backdrop-blur-xl shadow-2xl z-50 transform transition-transform duration-300 ease-in-out lg:hidden",
          isMenuOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border/50">
            <div className="flex items-center space-x-2">
              <Globe className="h-5 w-5 text-primary" />
              <span className="font-semibold">Atlas Menu</span>
            </div>
            <button
              onClick={closeMenu}
              className="p-2 hover:bg-accent rounded-md transition-colors"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* Quick Links */}
            <div className="space-y-3">
              <NavLink
                href="/"
                className="text-base py-3 block"
                onClick={closeMenu}
              >
                Home
              </NavLink>
              <NavLink
                href="/about"
                className="text-base py-3 block"
                onClick={closeMenu}
              >
                About
              </NavLink>
            </div>

            {/* Platform Section */}
            <MobileDropdown title="Platform" icon={Globe}>
              <NavLink
                href="/platform"
                className="text-sm py-2 block"
                onClick={closeMenu}
              >
                Platform Overview
              </NavLink>
              <NavLink
                href="/platform/risk-engine"
                className="text-sm py-2 flex items-center"
                onClick={closeMenu}
              >
                <Zap className="h-4 w-4 text-primary mr-2" /> AI Risk Engine
              </NavLink>
              <NavLink
                href="/platform/intelligence-dashboard"
                className="text-sm py-2 flex items-center"
                onClick={closeMenu}
              >
                <BarChart3 className="h-4 w-4 text-primary mr-2" /> Global
                Intelligence
              </NavLink>
              <NavLink
                href="/market-impact"
                className="text-sm py-2 flex items-center"
                onClick={closeMenu}
              >
                <Network className="h-4 w-4 text-primary mr-2" /> Market Impact
              </NavLink>
              <NavLink
                href="/workforce"
                className="text-sm py-2 flex items-center"
                onClick={closeMenu}
              >
                <Users className="h-4 w-4 text-primary mr-2" /> Workforce
                Solutions
              </NavLink>
              <NavLink
                href="/careers"
                className="text-sm py-2 flex items-center"
                onClick={closeMenu}
              >
                <Building2 className="h-4 w-4 text-primary mr-2" /> Careers
              </NavLink>
            </MobileDropdown>

            {/* Enterprise Section */}
            <MobileDropdown title="Enterprise" icon={Building2}>
              <NavLink
                href="/enterprise"
                className="text-sm py-2 block"
                onClick={closeMenu}
              >
                Enterprise Overview
              </NavLink>
              <NavLink
                href="/enterprise/integration-hub"
                className="text-sm py-2 flex items-center"
                onClick={closeMenu}
              >
                <Database className="h-4 w-4 text-primary mr-2" /> Integration
                Hub
              </NavLink>
              <NavLink
                href="/enterprise/workspace-management"
                className="text-sm py-2 flex items-center"
                onClick={closeMenu}
              >
                <Users className="h-4 w-4 text-primary mr-2" /> Workspace
                Management
              </NavLink>
              <NavLink
                href="/enterprise/security-compliance"
                className="text-sm py-2 flex items-center"
                onClick={closeMenu}
              >
                <Shield className="h-4 w-4 text-primary mr-2" /> Security &
                Compliance
              </NavLink>
              <NavLink
                href="/enterprise/analytics"
                className="text-sm py-2 flex items-center"
                onClick={closeMenu}
              >
                <BarChart3 className="h-4 w-4 text-primary mr-2" /> Enterprise
                Analytics
              </NavLink>
              <NavLink
                href="/enterprise/custom-solutions"
                className="text-sm py-2 flex items-center"
                onClick={closeMenu}
              >
                <Zap className="h-4 w-4 text-primary mr-2" /> Custom Solutions
              </NavLink>
            </MobileDropdown>

            {/* Solutions Section */}
            <MobileDropdown title="Solutions" icon={Factory}>
              <NavLink
                href="/solutions/manufacturing"
                className="text-sm py-2 flex items-center"
                onClick={closeMenu}
              >
                <Factory className="h-4 w-4 text-primary mr-2" /> Manufacturing
              </NavLink>
              <NavLink
                href="/solutions/retail-fashion"
                className="text-sm py-2 flex items-center"
                onClick={closeMenu}
              >
                <Shirt className="h-4 w-4 text-primary mr-2" /> Retail & Fashion
              </NavLink>
              <NavLink
                href="/solutions/technology"
                className="text-sm py-2 flex items-center"
                onClick={closeMenu}
              >
                <Smartphone className="h-4 w-4 text-primary mr-2" /> Technology
              </NavLink>
              <NavLink
                href="/solutions/logistics"
                className="text-sm py-2 flex items-center"
                onClick={closeMenu}
              >
                <Truck className="h-4 w-4 text-primary mr-2" /> Logistics
              </NavLink>
            </MobileDropdown>

            {/* Quick Links */}
            <div className="space-y-3 border-t border-border/50 pt-6">
              <NavLink
                href="/pricing"
                className="text-base py-3 block"
                onClick={closeMenu}
              >
                Pricing
              </NavLink>

              <MobileDropdown title="Impact" icon={Shield}>
                <NavLink
                  href="/impact"
                  className="text-sm py-2 block"
                  onClick={closeMenu}
                >
                  Impact Overview
                </NavLink>
                <NavLink
                  href="/impact/project-sentinel"
                  className="text-sm py-2 flex items-center"
                  onClick={closeMenu}
                >
                  <Shield className="h-4 w-4 text-primary mr-2" /> Project
                  Sentinel
                </NavLink>
                <NavLink
                  href="/impact/project-evergreen"
                  className="text-sm py-2 flex items-center"
                  onClick={closeMenu}
                >
                  <TreeDeciduous className="h-4 w-4 text-harmony mr-2" />{" "}
                  Project Evergreen
                </NavLink>
                <NavLink
                  href="/impact/guardians-initiative"
                  className="text-sm py-2 flex items-center"
                  onClick={closeMenu}
                >
                  <Star className="h-4 w-4 text-utopian mr-2" /> Guardians
                  Initiative
                </NavLink>
              </MobileDropdown>

              <NavLink
                href="/blog"
                className="text-base py-3 block"
                onClick={closeMenu}
              >
                Blog
              </NavLink>
            </div>
          </div>

          {/* Footer CTA */}
          <div className="p-4 border-t border-border/50 space-y-3">
            <Button asChild className="w-full" onClick={closeMenu}>
              <Link to="/join">
                Join the Movement
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
            <div className="flex space-x-2">
              <Button
                asChild
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={closeMenu}
              >
                <Link to="/login">Sign In</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={closeMenu}
              >
                <Link to="/register">Sign Up</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
