import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FileBarChart,
  Search,
  Bell,
  LogOut,
  BarChart3,
  Users,
  ShieldAlert,
  FileCheck,
  Settings,
  HelpCircle,
  Globe,
  AlertTriangle,
  BookOpen,
  MessageSquare,
  TrendingUp,
  Target,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useInView } from "react-intersection-observer";
import { logoutUser, getCurrentUser } from "@/services/auth.service";
import { getUserProfile } from "@/services/user.service";
import {
  getRiskZones,
  getSupplierAssessments,
  getEsgMetrics,
  saveDashboardPreference,
} from "@/services/dashboard.service";
import { RiskIntelligence } from "@/components/dashboard/RiskIntelligence";
import { SupplierCompliance } from "@/components/dashboard/SupplierCompliance";
import ComplianceDashboard from "@/components/dashboard/ComplianceDashboard";
import GlobalMapContent from "@/components/dashboard/GlobalMapContent";
import MarketImpactDashboard from "@/components/dashboard/MarketImpactDashboard";
import CollaborationHub from "@/components/dashboard/CollaborationHub";
import SettingsPanel from "@/components/dashboard/SettingsPanel";
import HelpSupport from "@/components/dashboard/HelpSupport";
import ReportsPage from "@/components/dashboard/ReportsPage";
import ProductMarketFitDashboard from "@/components/dashboard/ProductMarketFitDashboard";
import BusinessDashboard from "@/components/dashboard/BusinessDashboard";
import ComplianceDashboardView from "@/components/dashboard/ComplianceDashboardView";
import NgoDashboard from "@/components/dashboard/NgoDashboard";
import GovernmentDashboard from "@/components/dashboard/GovernmentDashboard";
import AdvancedAIDashboard from "@/components/dashboard/AdvancedAIDashboard";
import BlockchainVerificationCenter from "@/components/dashboard/BlockchainVerificationCenter";
import WorkerProtectionDashboard from "@/components/dashboard/WorkerProtectionDashboard";
import EnterpriseIntegrationHub from "@/components/dashboard/EnterpriseIntegrationHub";

type UserRole = "business" | "compliance" | "ngo" | "government" | "superadmin";

interface DashboardState {
  userData: {
    id: string;
    name: string;
    email: string;
    role: UserRole;
  } | null;
  isLoading: boolean;
  dashboardData: {
    riskZones: any[];
    supplierAssessments: any[];
    esgMetrics: any[];
  };
}

const COLORS = {
  primary: "#18A0FB",
  secondary: "#6941C6",
  success: "#12B76A",
  warning: "#F79009",
  error: "#F04438",
  low: "#12B76A",
  medium: "#F79009",
  high: "#F04438",
  critical: "#7A0916",
};

const RISK_LEVEL_COLORS = {
  low: COLORS.low,
  medium: COLORS.medium,
  high: COLORS.high,
  critical: COLORS.critical,
};

const Dashboard = () => {
  const [userRole, setUserRole] = useState<UserRole>("business");
  const [state, setState] = useState<DashboardState>({
    userData: null,
    isLoading: true,
    dashboardData: {
      riskZones: [],
      supplierAssessments: [],
      esgMetrics: [],
    },
  });
  const [activeTab, setActiveTab] = useState("overview");
  const [complianceScore, setComplianceScore] = useState(92);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check for stored role first
        const storedRole = localStorage.getItem("userRole") as UserRole | null;
        if (storedRole) {
          setUserRole(storedRole);
        }

        const { user: userData, error } = await getCurrentUser();

        if (error || !userData) {
          toast({
            title: "Authentication required",
            description: "Please sign in to access the dashboard",
            variant: "destructive",
          });
          navigate("/login");
          return;
        }

        const { profile } = await getUserProfile(userData.id);
        if (profile) {
          setState((prev) => ({
            ...prev,
            userData: {
              id: userData.id,
              name: profile.name || "User",
              email: userData.email || "",
              role: (profile.role as UserRole) || "business",
            },
          }));

          if (profile.role) {
            setUserRole(profile.role as UserRole);
            localStorage.setItem("userRole", profile.role);
          }
        }

        const [riskZonesRes, supplierAssessmentsRes, esgMetricsRes] =
          await Promise.all([
            getRiskZones(),
            getSupplierAssessments(),
            getEsgMetrics(),
          ]);

        setState((prev) => ({
          ...prev,
          isLoading: false,
          dashboardData: {
            riskZones: riskZonesRes.data || [],
            supplierAssessments: supplierAssessmentsRes.data || [],
            esgMetrics: esgMetricsRes.data || [],
          },
        }));
      } catch (error) {
        console.error("Dashboard data fetch error:", error);
        setState((prev) => ({ ...prev, isLoading: false }));
      }
    };

    fetchData();
  }, [navigate, toast]);

  const handleLogout = async () => {
    const { error } = await logoutUser();

    if (error) {
      toast({
        title: "Logout failed",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");

    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });

    navigate("/login");
  };

  const switchRole = async (role: UserRole) => {
    setUserRole(role);
    localStorage.setItem("userRole", role);

    if (state.userData?.id) {
      await saveDashboardPreference(state.userData.id, { role });
    }

    toast({
      title: "Role switched",
      description: `Now viewing as ${role} user`,
    });
  };

  // Enhanced sidebar items with new advanced features
  const getSidebarItems = () => {
    const commonItems = [
      {
        id: "overview",
        label: "Dashboard",
        icon: LayoutDashboard,
      },
      {
        id: "ai-intelligence",
        label: "AI Intelligence",
        icon: BookOpen,
      },
      {
        id: "blockchain-verification",
        label: "Blockchain Center",
        icon: ShieldAlert,
      },
      {
        id: "worker-protection",
        label: "Worker Protection",
        icon: Users,
      },
      {
        id: "enterprise-integration",
        label: "Enterprise Hub",
        icon: Globe,
      },
      {
        id: "collaboration",
        label: "Collaboration Hub",
        icon: MessageSquare,
      },
      {
        id: "settings",
        label: "Settings",
        icon: Settings,
      },
      {
        id: "help",
        label: "Help & Support",
        icon: HelpCircle,
      },
    ];

    const roleSpecificItems = {
      business: [
        {
          id: "risk-intelligence",
          label: "Risk Intelligence",
          icon: AlertTriangle,
        },
        { id: "suppliers", label: "Suppliers", icon: Users },
        { id: "reports", label: "Reports", icon: FileBarChart },
        { id: "market-impact", label: "Market Impact", icon: TrendingUp },
        { id: "product-market-fit", label: "Market Fit", icon: Target },
        { id: "global-map", label: "Global Map", icon: Globe },
      ],
      compliance: [
        { id: "compliance", label: "Compliance", icon: FileCheck },
        { id: "reports", label: "Reports", icon: FileBarChart },
        {
          id: "risk-intelligence",
          label: "Risk Analytics",
          icon: AlertTriangle,
        },
        { id: "global-map", label: "Global Map", icon: Globe },
      ],
      ngo: [
        { id: "investigations", label: "Investigations", icon: FileBarChart },
        { id: "whistleblower", label: "Whistleblower", icon: MessageSquare },
        { id: "impact", label: "Impact Tracking", icon: TrendingUp },
        { id: "global-map", label: "Global Map", icon: Globe },
        { id: "advocacy", label: "Advocacy", icon: Users },
      ],
      government: [
        { id: "enforcement", label: "Enforcement", icon: ShieldAlert },
        { id: "policy", label: "Policy", icon: FileCheck },
        { id: "compliance", label: "Compliance Monitor", icon: BarChart3 },
        { id: "analytics", label: "Analytics", icon: TrendingUp },
        { id: "international", label: "International", icon: Globe },
      ],
      superadmin: [
        { id: "users", label: "User Management", icon: Users },
        { id: "system", label: "System Health", icon: ShieldAlert },
        { id: "analytics", label: "Platform Analytics", icon: BarChart3 },
        { id: "global-operations", label: "Global Operations", icon: Globe },
      ],
    };

    return [...commonItems, ...(roleSpecificItems[userRole] || [])];
  };

  const renderRoleDashboard = () => {
    switch (userRole) {
      case "business":
        return <BusinessDashboard />;
      case "compliance":
        return <ComplianceDashboardView />;
      case "ngo":
        return <NgoDashboard />;
      case "government":
        return <GovernmentDashboard />;
      case "superadmin":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-card rounded-lg border p-6 text-center">
                <Users className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <div className="text-2xl font-bold">12,847</div>
                <p className="text-sm text-muted-foreground">Active Users</p>
              </div>
              <div className="bg-card rounded-lg border p-6 text-center">
                <BarChart3 className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <div className="text-2xl font-bold">3,421</div>
                <p className="text-sm text-muted-foreground">Organizations</p>
              </div>
              <div className="bg-card rounded-lg border p-6 text-center">
                <Globe className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                <div className="text-2xl font-bold">45,692</div>
                <p className="text-sm text-muted-foreground">
                  Global Suppliers
                </p>
              </div>
              <div className="bg-card rounded-lg border p-6 text-center">
                <TrendingUp className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                <div className="text-2xl font-bold">247%</div>
                <p className="text-sm text-muted-foreground">YoY Growth</p>
              </div>
            </div>
            <div className="bg-card rounded-lg border p-6">
              <h3 className="text-xl font-semibold mb-4">
                Platform Administration
              </h3>
              <p className="text-muted-foreground">
                Welcome to the Guardian-IO platform administration center.
                Monitor global operations, manage user access, and oversee
                system health from this comprehensive control panel.
              </p>
            </div>
          </div>
        );
      default:
        return <BusinessDashboard />;
    }
  };

  const getRoleDisplayName = () => {
    switch (userRole) {
      case "business":
        return "Business Executive";
      case "compliance":
        return "Compliance Officer";
      case "ngo":
        return "NGO Analyst";
      case "government":
        return "Government Regulator";
      case "superadmin":
        return "Platform Administrator";
      default:
        return "User";
    }
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <Sidebar>
          <SidebarHeader className="p-4">
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-primary p-1">
                <ShieldAlert className="h-5 w-5 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-bold">Guardian-IO</h1>
            </div>
            <div className="mt-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  className="bg-sidebar-accent pl-10"
                />
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent>
            <SidebarMenu>
              {getSidebarItems().map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    isActive={activeTab === item.id}
                    tooltip={item.label}
                    onClick={() => setActiveTab(item.id)}
                  >
                    <item.icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>

          <SidebarFooter className="p-4">
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="w-full justify-start text-muted-foreground"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </Button>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 overflow-auto bg-background/95">
          <header className="bg-background border-b border-border h-16 flex items-center justify-between px-6 sticky top-0 z-10">
            <h1 className="text-xl font-semibold capitalize">
              {activeTab === "overview"
                ? `${getRoleDisplayName()} Dashboard`
                : activeTab.replace("-", " ")}
            </h1>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center">
                  3
                </span>
              </Button>

              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold">
                  {state.userData?.name.charAt(0).toUpperCase() ||
                    userRole.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-medium">
                    {state.userData?.name || "Demo User"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {getRoleDisplayName()}
                  </p>
                </div>
              </div>
            </div>
          </header>

          <div className="p-6" ref={ref}>
            <div className="mb-8 p-4 bg-muted rounded-lg">
              <h2 className="font-semibold mb-2">Demo Account Switcher</h2>
              <p className="text-sm text-muted-foreground mb-3">
                Experience different perspectives of the Guardian-IO platform by
                switching between user roles:
              </p>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={userRole === "business" ? "default" : "outline"}
                  size="sm"
                  onClick={() => switchRole("business")}
                >
                  Business Executive
                </Button>
                <Button
                  variant={userRole === "compliance" ? "default" : "outline"}
                  size="sm"
                  onClick={() => switchRole("compliance")}
                >
                  Compliance Officer
                </Button>
                <Button
                  variant={userRole === "ngo" ? "default" : "outline"}
                  size="sm"
                  onClick={() => switchRole("ngo")}
                >
                  NGO Analyst
                </Button>
                <Button
                  variant={userRole === "government" ? "default" : "outline"}
                  size="sm"
                  onClick={() => switchRole("government")}
                >
                  Government Regulator
                </Button>
                <Button
                  variant={userRole === "superadmin" ? "default" : "outline"}
                  size="sm"
                  onClick={() => switchRole("superadmin")}
                >
                  Platform Admin
                </Button>
              </div>
            </div>

            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <div className="hidden">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="ai-intelligence">
                    AI Intelligence
                  </TabsTrigger>
                  <TabsTrigger value="blockchain-verification">
                    Blockchain
                  </TabsTrigger>
                  <TabsTrigger value="worker-protection">
                    Worker Protection
                  </TabsTrigger>
                  <TabsTrigger value="enterprise-integration">
                    Enterprise Hub
                  </TabsTrigger>
                  <TabsTrigger value="risk-intelligence">
                    Risk Intelligence
                  </TabsTrigger>
                  <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
                  <TabsTrigger value="compliance">Compliance</TabsTrigger>
                  <TabsTrigger value="reports">Reports</TabsTrigger>
                  <TabsTrigger value="global-map">Global Map</TabsTrigger>
                  <TabsTrigger value="market-impact">Market Impact</TabsTrigger>
                  <TabsTrigger value="product-market-fit">
                    Market Fit
                  </TabsTrigger>
                  <TabsTrigger value="collaboration">Collaboration</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                  <TabsTrigger value="help">Help</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="overview" className="space-y-6">
                {renderRoleDashboard()}
              </TabsContent>

              <TabsContent value="ai-intelligence" className="space-y-6">
                <AdvancedAIDashboard />
              </TabsContent>

              <TabsContent
                value="blockchain-verification"
                className="space-y-6"
              >
                <BlockchainVerificationCenter />
              </TabsContent>

              <TabsContent value="worker-protection" className="space-y-6">
                <WorkerProtectionDashboard />
              </TabsContent>

              <TabsContent value="enterprise-integration" className="space-y-6">
                <EnterpriseIntegrationHub />
              </TabsContent>

              <TabsContent value="risk-intelligence" className="space-y-6">
                <RiskIntelligence />
              </TabsContent>

              <TabsContent value="suppliers" className="space-y-6">
                <SupplierCompliance />
              </TabsContent>

              <TabsContent value="compliance" className="space-y-6">
                <ComplianceDashboard />
              </TabsContent>

              <TabsContent value="reports" className="space-y-6">
                <ReportsPage />
              </TabsContent>

              <TabsContent value="global-map" className="space-y-6">
                <GlobalMapContent />
              </TabsContent>

              <TabsContent value="market-impact" className="space-y-6">
                <MarketImpactDashboard />
              </TabsContent>

              <TabsContent value="product-market-fit" className="space-y-6">
                <ProductMarketFitDashboard />
              </TabsContent>

              <TabsContent value="collaboration" className="space-y-6">
                <CollaborationHub />
              </TabsContent>

              <TabsContent value="settings" className="space-y-6">
                <SettingsPanel />
              </TabsContent>

              <TabsContent value="help" className="space-y-6">
                <HelpSupport />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
