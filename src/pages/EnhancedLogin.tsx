import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Mail,
  Lock,
  AlertCircle,
  ArrowLeft,
  Building,
  Globe,
  Gavel,
  Shield,
  Bot,
  Zap,
  Database,
  TrendingUp,
  Factory,
  Users,
  Scale,
  Award,
  Target,
  Network,
  Eye,
  CheckCircle,
  Crown,
  Settings,
  Briefcase,
  BookOpen,
  BarChart3,
  Leaf,
  Heart,
  Monitor,
  FileText,
  Activity,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import SocialLogin from "@/components/auth/SocialLogin";
import { useToast } from "@/hooks/use-toast";
import {
  loginUser,
  AuthCredentials,
  getDashboardPathForRole,
} from "@/services/auth.service";
import { getUserProfile } from "@/services/user.service";
import { useAuth } from "@/context/AuthContext";

interface UserArchetype {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  bgGradient: string;
  category:
    | "executive"
    | "governance"
    | "operational"
    | "technical"
    | "oversight";
  organizationType: string;
  keyResponsibilities: string[];
  primaryGoals: string[];
  technologyAccess: string[];
  dataCapabilities: string[];
  complianceFrameworks: string[];
  analyticsLevel: "basic" | "intermediate" | "advanced" | "expert";
  decisionAuthority: "view" | "recommend" | "approve" | "execute";
  demoCredentials: {
    email: string;
    password: string;
  };
}

const EnhancedLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedArchetype, setSelectedArchetype] =
    useState<UserArchetype | null>(null);
  const [showArchetypeSelector, setShowArchetypeSelector] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAuthenticated, userRole: currentRole, refreshAuth } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated && currentRole) {
      const dashboardPath = getDashboardPathForRole(currentRole);
      navigate(dashboardPath);
    }
  }, [isAuthenticated, currentRole, navigate]);

  // Comprehensive user archetypes with enhanced differentiation
  const userArchetypes: UserArchetype[] = [
    // EXECUTIVE LEADERSHIP
    {
      id: "ceo",
      title: "Chief Executive Officer",
      subtitle: "Executive Leadership",
      description:
        "Strategic oversight of global operations, ESG performance, and stakeholder relations",
      icon: Crown,
      color: "text-yellow-600",
      bgGradient: "from-yellow-500 to-orange-500",
      category: "executive",
      organizationType: "Corporate Executive",
      keyResponsibilities: [
        "Strategic decision making and corporate governance",
        "Stakeholder management and investor relations",
        "ESG strategy and sustainability leadership",
        "Risk management and crisis response",
        "Regulatory compliance oversight",
      ],
      primaryGoals: [
        "Maximize shareholder value while maintaining ESG standards",
        "Ensure regulatory compliance across all jurisdictions",
        "Drive sustainable business growth and innovation",
        "Maintain corporate reputation and stakeholder trust",
      ],
      technologyAccess: [
        "Executive dashboards with real-time KPIs",
        "Predictive analytics for strategic planning",
        "Stakeholder communication platforms",
        "Risk monitoring and early warning systems",
      ],
      dataCapabilities: [
        "Enterprise-wide performance metrics",
        "Market intelligence and competitive analysis",
        "ESG scoring and impact measurement",
        "Financial performance and risk indicators",
      ],
      complianceFrameworks: ["SOC 2", "ISO 27001", "GDPR", "Sarbanes-Oxley"],
      analyticsLevel: "expert",
      decisionAuthority: "execute",
      demoCredentials: { email: "ceo@demo.com", password: "demo123" },
    },
    {
      id: "supply-chain-executive",
      title: "Chief Supply Chain Officer",
      subtitle: "Supply Chain Leadership",
      description:
        "End-to-end supply chain strategy, supplier relationships, and operational excellence",
      icon: Building,
      color: "text-blue-600",
      bgGradient: "from-blue-500 to-indigo-500",
      category: "executive",
      organizationType: "Supply Chain Executive",
      keyResponsibilities: [
        "Global supply chain strategy and optimization",
        "Supplier relationship management and development",
        "Supply chain risk assessment and mitigation",
        "Sustainability and ESG integration",
        "Technology adoption and digital transformation",
      ],
      primaryGoals: [
        "Optimize supply chain efficiency and reduce costs",
        "Ensure supplier compliance and ethical sourcing",
        "Build resilient and sustainable supply networks",
        "Leverage technology for competitive advantage",
      ],
      technologyAccess: [
        "AI-powered demand forecasting and planning",
        "Supplier performance analytics and scorecards",
        "Real-time supply chain visibility platforms",
        "Blockchain verification and traceability systems",
      ],
      dataCapabilities: [
        "End-to-end supply chain analytics",
        "Supplier risk and performance metrics",
        "Cost optimization and efficiency analysis",
        "Sustainability and ESG impact measurement",
      ],
      complianceFrameworks: ["ISO 14001", "SA8000", "CTPAT", "AEO"],
      analyticsLevel: "expert",
      decisionAuthority: "execute",
      demoCredentials: {
        email: "supply-executive@demo.com",
        password: "demo123",
      },
    },

    // GOVERNANCE & COMPLIANCE
    {
      id: "compliance-officer",
      title: "Chief Compliance Officer",
      subtitle: "Regulatory & Compliance",
      description:
        "Ensure organizational compliance with regulations, policies, and ethical standards",
      icon: Shield,
      color: "text-green-600",
      bgGradient: "from-green-500 to-emerald-500",
      category: "governance",
      organizationType: "Compliance & Governance",
      keyResponsibilities: [
        "Regulatory compliance monitoring and reporting",
        "Policy development and implementation",
        "Audit coordination and remediation",
        "Training and awareness programs",
        "Incident investigation and response",
      ],
      primaryGoals: [
        "Maintain 100% regulatory compliance",
        "Minimize compliance risks and violations",
        "Establish robust governance frameworks",
        "Ensure ethical business practices",
      ],
      technologyAccess: [
        "Automated compliance monitoring systems",
        "Regulatory change management platforms",
        "Audit trail and documentation systems",
        "Risk assessment and reporting tools",
      ],
      dataCapabilities: [
        "Compliance status and gap analysis",
        "Regulatory requirement tracking",
        "Audit findings and remediation progress",
        "Training completion and effectiveness metrics",
      ],
      complianceFrameworks: ["SOX", "GDPR", "CCPA", "HIPAA", "PCI DSS"],
      analyticsLevel: "advanced",
      decisionAuthority: "approve",
      demoCredentials: { email: "compliance@demo.com", password: "demo123" },
    },
    {
      id: "government-regulator",
      title: "Government Regulatory Officer",
      subtitle: "Public Sector Oversight",
      description:
        "Enforce regulations, conduct investigations, and ensure public interest protection",
      icon: Gavel,
      color: "text-purple-600",
      bgGradient: "from-purple-500 to-violet-500",
      category: "governance",
      organizationType: "Government Agency",
      keyResponsibilities: [
        "Regulatory enforcement and investigation",
        "Policy development and implementation",
        "Stakeholder engagement and consultation",
        "Public interest protection",
        "Cross-border coordination and cooperation",
      ],
      primaryGoals: [
        "Protect public interest and consumer rights",
        "Ensure fair and competitive markets",
        "Maintain regulatory effectiveness",
        "Promote international cooperation",
      ],
      technologyAccess: [
        "Government regulatory databases",
        "Investigation and case management systems",
        "Public consultation and feedback platforms",
        "International cooperation networks",
      ],
      dataCapabilities: [
        "Market surveillance and monitoring",
        "Violation detection and analysis",
        "Policy impact assessment",
        "Cross-jurisdictional intelligence",
      ],
      complianceFrameworks: [
        "Administrative Law",
        "International Treaties",
        "Public Interest Standards",
      ],
      analyticsLevel: "advanced",
      decisionAuthority: "execute",
      demoCredentials: { email: "government@demo.com", password: "demo123" },
    },

    // OVERSIGHT & ADVOCACY
    {
      id: "ngo-analyst",
      title: "NGO Human Rights Analyst",
      subtitle: "Human Rights & Advocacy",
      description:
        "Monitor human rights violations, conduct investigations, and advocate for worker protection",
      icon: Globe,
      color: "text-orange-600",
      bgGradient: "from-orange-500 to-red-500",
      category: "oversight",
      organizationType: "Non-Governmental Organization",
      keyResponsibilities: [
        "Human rights monitoring and documentation",
        "Investigation of labor violations",
        "Advocacy campaign development",
        "Stakeholder engagement and coalition building",
        "Public awareness and education",
      ],
      primaryGoals: [
        "Protect and promote human rights",
        "Expose and address labor violations",
        "Advocate for policy and regulatory changes",
        "Build awareness and public support",
      ],
      technologyAccess: [
        "Anonymous reporting and whistleblower systems",
        "Investigation and case management tools",
        "Advocacy campaign management platforms",
        "Secure communication and collaboration tools",
      ],
      dataCapabilities: [
        "Human rights violation tracking",
        "Investigation evidence management",
        "Impact measurement and reporting",
        "Campaign effectiveness analytics",
      ],
      complianceFrameworks: [
        "UN Global Compact",
        "ILO Conventions",
        "UNGP",
        "OECD Guidelines",
      ],
      analyticsLevel: "intermediate",
      decisionAuthority: "recommend",
      demoCredentials: { email: "ngo-analyst@demo.com", password: "demo123" },
    },
    {
      id: "auditor",
      title: "External Auditor",
      subtitle: "Independent Verification",
      description:
        "Conduct independent audits and assessments of compliance and risk management",
      icon: Scale,
      color: "text-indigo-600",
      bgGradient: "from-indigo-500 to-blue-500",
      category: "oversight",
      organizationType: "Audit & Assurance Firm",
      keyResponsibilities: [
        "Independent audit and assessment",
        "Risk evaluation and reporting",
        "Compliance verification and certification",
        "Quality assurance and methodology",
        "Client advisory and recommendations",
      ],
      primaryGoals: [
        "Provide independent and objective assurance",
        "Identify risks and improvement opportunities",
        "Ensure audit quality and methodology",
        "Maintain professional standards and ethics",
      ],
      technologyAccess: [
        "Audit management and documentation systems",
        "Risk assessment and testing tools",
        "Data analytics and sampling platforms",
        "Report generation and communication tools",
      ],
      dataCapabilities: [
        "Audit trail and evidence management",
        "Risk assessment and testing results",
        "Compliance status and gap analysis",
        "Quality metrics and benchmarking",
      ],
      complianceFrameworks: ["GAAS", "ISAE", "SOC", "ISO 19011"],
      analyticsLevel: "advanced",
      decisionAuthority: "approve",
      demoCredentials: { email: "auditor@demo.com", password: "demo123" },
    },

    // OPERATIONAL MANAGEMENT
    {
      id: "operations-manager",
      title: "Operations Manager",
      subtitle: "Operational Excellence",
      description:
        "Manage day-to-day operations, process optimization, and operational compliance",
      icon: Settings,
      color: "text-gray-600",
      bgGradient: "from-gray-500 to-slate-500",
      category: "operational",
      organizationType: "Operations Management",
      keyResponsibilities: [
        "Daily operations management and optimization",
        "Process improvement and standardization",
        "Team management and development",
        "Performance monitoring and reporting",
        "Operational compliance and quality",
      ],
      primaryGoals: [
        "Optimize operational efficiency and productivity",
        "Ensure quality and compliance standards",
        "Manage costs and resource utilization",
        "Develop team capabilities and performance",
      ],
      technologyAccess: [
        "Operations dashboards and monitoring systems",
        "Process management and optimization tools",
        "Team collaboration and communication platforms",
        "Performance tracking and reporting systems",
      ],
      dataCapabilities: [
        "Operational performance metrics",
        "Process efficiency and quality indicators",
        "Team productivity and development metrics",
        "Cost and resource utilization analysis",
      ],
      complianceFrameworks: [
        "ISO 9001",
        "Lean Six Sigma",
        "Operational Excellence Standards",
      ],
      analyticsLevel: "intermediate",
      decisionAuthority: "approve",
      demoCredentials: { email: "operations@demo.com", password: "demo123" },
    },
    {
      id: "procurement-manager",
      title: "Procurement Manager",
      subtitle: "Strategic Sourcing",
      description:
        "Manage supplier relationships, procurement processes, and sourcing strategies",
      icon: Briefcase,
      color: "text-teal-600",
      bgGradient: "from-teal-500 to-cyan-500",
      category: "operational",
      organizationType: "Procurement & Sourcing",
      keyResponsibilities: [
        "Strategic sourcing and supplier selection",
        "Contract negotiation and management",
        "Supplier relationship and performance management",
        "Procurement process optimization",
        "Risk management and mitigation",
      ],
      primaryGoals: [
        "Optimize procurement costs and value",
        "Ensure supplier compliance and performance",
        "Manage procurement risks effectively",
        "Build strategic supplier partnerships",
      ],
      technologyAccess: [
        "Supplier management and evaluation systems",
        "Procurement analytics and optimization tools",
        "Contract management and tracking platforms",
        "Risk monitoring and assessment systems",
      ],
      dataCapabilities: [
        "Supplier performance and compliance metrics",
        "Procurement cost and value analysis",
        "Contract performance and risk indicators",
        "Market intelligence and benchmarking",
      ],
      complianceFrameworks: [
        "Procurement Standards",
        "Supplier Code of Conduct",
        "Trade Compliance",
      ],
      analyticsLevel: "intermediate",
      decisionAuthority: "approve",
      demoCredentials: { email: "procurement@demo.com", password: "demo123" },
    },

    // TECHNICAL SPECIALISTS
    {
      id: "data-scientist",
      title: "Data Scientist",
      subtitle: "Advanced Analytics",
      description:
        "Develop AI models, conduct advanced analytics, and drive data-driven insights",
      icon: Database,
      color: "text-pink-600",
      bgGradient: "from-pink-500 to-rose-500",
      category: "technical",
      organizationType: "Technology & Analytics",
      keyResponsibilities: [
        "Machine learning model development",
        "Advanced statistical analysis and modeling",
        "Data mining and pattern recognition",
        "Predictive analytics and forecasting",
        "AI solution design and implementation",
      ],
      primaryGoals: [
        "Develop accurate and reliable AI models",
        "Generate actionable insights from data",
        "Automate decision-making processes",
        "Improve predictive capabilities",
      ],
      technologyAccess: [
        "Machine learning and AI development platforms",
        "Big data processing and analytics tools",
        "Statistical modeling and visualization software",
        "Cloud computing and data infrastructure",
      ],
      dataCapabilities: [
        "Model performance and accuracy metrics",
        "Data quality and completeness indicators",
        "Predictive analytics and forecasting results",
        "Algorithm optimization and tuning parameters",
      ],
      complianceFrameworks: [
        "AI Ethics Guidelines",
        "Data Protection Regulations",
        "Model Governance Standards",
      ],
      analyticsLevel: "expert",
      decisionAuthority: "recommend",
      demoCredentials: {
        email: "data-scientist@demo.com",
        password: "demo123",
      },
    },
    {
      id: "platform-admin",
      title: "Platform Administrator",
      subtitle: "System Management",
      description:
        "Manage platform infrastructure, security, and technical operations",
      icon: Monitor,
      color: "text-red-600",
      bgGradient: "from-red-500 to-pink-500",
      category: "technical",
      organizationType: "Platform Engineering",
      keyResponsibilities: [
        "Platform infrastructure management",
        "System security and access control",
        "Performance monitoring and optimization",
        "User account and permission management",
        "Technical support and troubleshooting",
      ],
      primaryGoals: [
        "Ensure platform availability and performance",
        "Maintain security and data protection",
        "Optimize system resources and costs",
        "Provide excellent user experience",
      ],
      technologyAccess: [
        "System administration and monitoring tools",
        "Security management and access control systems",
        "Performance analytics and optimization platforms",
        "Infrastructure automation and deployment tools",
      ],
      dataCapabilities: [
        "System performance and availability metrics",
        "Security incident and threat analysis",
        "User activity and engagement analytics",
        "Infrastructure cost and resource utilization",
      ],
      complianceFrameworks: [
        "ISO 27001",
        "SOC 2",
        "Cloud Security Standards",
        "ITIL",
      ],
      analyticsLevel: "advanced",
      decisionAuthority: "execute",
      demoCredentials: { email: "admin@demo.com", password: "demo123" },
    },
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (showArchetypeSelector && selectedArchetype) {
      // User has selected an archetype, proceed with login
      setIsLoading(true);
      setError("");

      try {
        const credentials: AuthCredentials = {
          email,
          password,
        };

        const { user, error } = await loginUser(credentials);

        if (error) {
          throw error;
        }

        if (user) {
          // Store the selected archetype role
          const roleMapping: Record<string, string> = {
            ceo: "business",
            "supply-chain-executive": "business",
            "compliance-officer": "compliance",
            "government-regulator": "government",
            "ngo-analyst": "ngo",
            auditor: "compliance",
            "operations-manager": "business",
            "procurement-manager": "business",
            "data-scientist": "business",
            "platform-admin": "superadmin",
          };

          const systemRole = roleMapping[selectedArchetype.id] || "business";
          localStorage.setItem("userRole", systemRole);
          localStorage.setItem("userArchetype", selectedArchetype.id);

          toast({
            title: "Login successful",
            description: `Welcome ${selectedArchetype.title}! Redirecting to your specialized dashboard...`,
          });

          await refreshAuth();
          const dashboardPath = getDashboardPathForRole(systemRole);
          navigate(dashboardPath);
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unexpected error occurred");
        }
        setIsLoading(false);
      }
    } else {
      // Move to archetype selection step
      setShowArchetypeSelector(true);
    }
  };

  const handleArchetypeSelect = (archetype: UserArchetype) => {
    setSelectedArchetype(archetype);
    setEmail(archetype.demoCredentials.email);
    setPassword(archetype.demoCredentials.password);
  };

  const getFilteredArchetypes = () => {
    if (activeCategory === "all") return userArchetypes;
    return userArchetypes.filter(
      (archetype) => archetype.category === activeCategory,
    );
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "executive":
        return Crown;
      case "governance":
        return Scale;
      case "oversight":
        return Eye;
      case "operational":
        return Settings;
      case "technical":
        return Monitor;
      default:
        return Users;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "executive":
        return "text-yellow-600";
      case "governance":
        return "text-purple-600";
      case "oversight":
        return "text-orange-600";
      case "operational":
        return "text-blue-600";
      case "technical":
        return "text-pink-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Back to Home Link */}
      <div className="container-tight pt-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
      </div>

      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-6xl space-y-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight">
              Welcome to Guardian-IO
            </h1>
            <p className="mt-2 text-muted-foreground">
              Choose your role to access your specialized dashboard and tools
            </p>
          </div>

          {/* Error message */}
          {error && (
            <div className="p-3 rounded-md bg-destructive/10 text-destructive flex items-center gap-2 max-w-md mx-auto">
              <AlertCircle className="h-4 w-4" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          {!showArchetypeSelector ? (
            /* Initial Login Form */
            <form onSubmit={handleLogin} className="space-y-4 max-w-md mx-auto">
              <div className="space-y-2">
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="Email"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="password"
                    placeholder="Password"
                    className="pl-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-muted-foreground"
                  >
                    Remember me
                  </label>
                </div>
                <Link
                  to="/forgot-password"
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Continue to Role Selection"}
              </Button>
            </form>
          ) : (
            /* Enhanced Archetype Selection */
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-xl font-semibold mb-2">
                  Select Your Professional Role
                </h2>
                <p className="text-muted-foreground">
                  Choose the role that best describes your position and
                  responsibilities
                </p>
              </div>

              {/* Category Filter */}
              <Tabs
                value={activeCategory}
                onValueChange={setActiveCategory}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-6">
                  <TabsTrigger value="all">All Roles</TabsTrigger>
                  <TabsTrigger value="executive">Executive</TabsTrigger>
                  <TabsTrigger value="governance">Governance</TabsTrigger>
                  <TabsTrigger value="oversight">Oversight</TabsTrigger>
                  <TabsTrigger value="operational">Operations</TabsTrigger>
                  <TabsTrigger value="technical">Technical</TabsTrigger>
                </TabsList>

                <TabsContent value={activeCategory} className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {getFilteredArchetypes().map((archetype) => {
                      const IconComponent = archetype.icon;
                      const isSelected = selectedArchetype?.id === archetype.id;

                      return (
                        <Card
                          key={archetype.id}
                          className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                            isSelected ? "ring-2 ring-primary shadow-lg" : ""
                          }`}
                          onClick={() => handleArchetypeSelect(archetype)}
                        >
                          <CardHeader className="pb-4">
                            <div className="flex items-start justify-between">
                              <div
                                className={`p-3 rounded-full bg-gradient-to-r ${archetype.bgGradient}`}
                              >
                                <IconComponent className="h-6 w-6 text-white" />
                              </div>
                              <Badge variant="outline" className="capitalize">
                                {archetype.category}
                              </Badge>
                            </div>
                            <div>
                              <CardTitle className="text-lg">
                                {archetype.title}
                              </CardTitle>
                              <p className="text-sm text-muted-foreground">
                                {archetype.subtitle}
                              </p>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <p className="text-sm">{archetype.description}</p>

                            <div className="space-y-3">
                              <div>
                                <span className="text-xs font-medium text-muted-foreground">
                                  Organization Type:
                                </span>
                                <p className="text-sm">
                                  {archetype.organizationType}
                                </p>
                              </div>

                              <div>
                                <span className="text-xs font-medium text-muted-foreground">
                                  Analytics Level:
                                </span>
                                <div className="flex items-center gap-2 mt-1">
                                  <Badge
                                    variant={
                                      archetype.analyticsLevel === "expert"
                                        ? "default"
                                        : archetype.analyticsLevel ===
                                            "advanced"
                                          ? "secondary"
                                          : "outline"
                                    }
                                  >
                                    {archetype.analyticsLevel}
                                  </Badge>
                                  <Badge
                                    variant="outline"
                                    className="capitalize"
                                  >
                                    {archetype.decisionAuthority}
                                  </Badge>
                                </div>
                              </div>

                              <div>
                                <span className="text-xs font-medium text-muted-foreground">
                                  Key Responsibilities:
                                </span>
                                <ul className="text-xs text-muted-foreground mt-1 space-y-0.5">
                                  {archetype.keyResponsibilities
                                    .slice(0, 3)
                                    .map((resp, index) => (
                                      <li
                                        key={index}
                                        className="flex items-start gap-1"
                                      >
                                        <CheckCircle className="h-2 w-2 text-green-500 mt-1 flex-shrink-0" />
                                        {resp}
                                      </li>
                                    ))}
                                  {archetype.keyResponsibilities.length > 3 && (
                                    <li className="text-xs text-muted-foreground italic">
                                      +
                                      {archetype.keyResponsibilities.length - 3}{" "}
                                      more responsibilities
                                    </li>
                                  )}
                                </ul>
                              </div>

                              <div>
                                <span className="text-xs font-medium text-muted-foreground">
                                  Primary Frameworks:
                                </span>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {archetype.complianceFrameworks
                                    .slice(0, 3)
                                    .map((framework, index) => (
                                      <Badge
                                        key={index}
                                        variant="secondary"
                                        className="text-xs"
                                      >
                                        {framework}
                                      </Badge>
                                    ))}
                                  {archetype.complianceFrameworks.length >
                                    3 && (
                                    <Badge
                                      variant="secondary"
                                      className="text-xs"
                                    >
                                      +
                                      {archetype.complianceFrameworks.length -
                                        3}
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </TabsContent>
              </Tabs>

              {selectedArchetype && (
                <Card className="border-2 border-primary">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <selectedArchetype.icon
                        className={`h-5 w-5 ${selectedArchetype.color}`}
                      />
                      Selected: {selectedArchetype.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium mb-2">Primary Goals</h4>
                        <ul className="text-sm space-y-1">
                          {selectedArchetype.primaryGoals.map((goal, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <Target className="h-3 w-3 text-primary mt-0.5 flex-shrink-0" />
                              {goal}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Technology Access</h4>
                        <ul className="text-sm space-y-1">
                          {selectedArchetype.technologyAccess
                            .slice(0, 4)
                            .map((tech, index) => (
                              <li
                                key={index}
                                className="flex items-start gap-2"
                              >
                                <Zap className="h-3 w-3 text-blue-500 mt-0.5 flex-shrink-0" />
                                {tech}
                              </li>
                            ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <form onSubmit={handleLogin} className="max-w-md mx-auto">
                <div className="flex space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      setShowArchetypeSelector(false);
                      setSelectedArchetype(null);
                      setEmail("");
                      setPassword("");
                    }}
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1"
                    disabled={isLoading || !selectedArchetype}
                  >
                    {isLoading
                      ? "Signing in..."
                      : `Enter as ${selectedArchetype?.title || "Selected Role"}`}
                  </Button>
                </div>
              </form>
            </div>
          )}

          {!showArchetypeSelector && (
            <>
              {/* Divider */}
              <div className="relative max-w-md mx-auto">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>

              {/* Social login */}
              <div className="max-w-md mx-auto">
                <SocialLogin />
              </div>

              {/* Register link */}
              <p className="text-center text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="font-medium text-primary hover:underline"
                >
                  Create an account <ArrowRight className="inline h-3 w-3" />
                </Link>
              </p>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default EnhancedLogin;
