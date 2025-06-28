import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { CookieConsent } from "@/components/CookieConsent";
import { Suspense, lazy } from "react";
import LoadingLogo from "./components/LoadingLogo";
import { useAuth } from "@/context/AuthContext";
import { getDashboardPathForRole } from "@/services/auth.service";
import OfflineIndicator from "./components/OfflineIndicator";
import RouteRestorer from "./components/RouteRestorer";

// Create the query client
const queryClient = new QueryClient();

// Create a retry wrapper for lazy imports
const retryLazyImport = (fn: () => Promise<any>, retries = 3) => {
  return lazy(() =>
    fn().catch((error) => {
      if (retries > 0) {
        console.log(`Retrying import, ${retries} attempts left`);
        return new Promise((resolve) => setTimeout(resolve, 1000)).then(() =>
          retryLazyImport(fn, retries - 1)(),
        );
      }
      console.error("Failed to load component after retries:", error);
      // Return a fallback component
      return Promise.resolve({
        default: () => (
          <div className="flex flex-col items-center justify-center min-h-screen p-6">
            <h1 className="text-2xl font-bold mb-4">Loading Error</h1>
            <p className="text-muted-foreground mb-4">
              Failed to load this page. Please refresh to try again.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
            >
              Refresh Page
            </button>
          </div>
        ),
      });
    }),
  );
};

// Lazy load page components with retry mechanism
const Index = retryLazyImport(() => import("./pages/Index"));
const About = retryLazyImport(() => import("./pages/About"));
const Platform = retryLazyImport(() => import("./pages/Platform"));
const Pricing = retryLazyImport(() => import("./pages/Pricing"));
const Impact = retryLazyImport(() => import("./pages/Impact"));
const Blog = retryLazyImport(() => import("./pages/Blog"));
const Join = retryLazyImport(() => import("./pages/Join"));
const NotFound = retryLazyImport(() => import("./pages/NotFound"));
const Login = retryLazyImport(() => import("./pages/EnhancedLogin"));
const Register = retryLazyImport(() => import("./pages/Register"));
const ForgotPassword = retryLazyImport(() => import("./pages/ForgotPassword"));
const ResetPassword = retryLazyImport(() => import("./pages/ResetPassword"));
const Dashboard = retryLazyImport(() => import("./pages/Dashboard"));
const Onboarding = retryLazyImport(() => import("./pages/Onboarding"));
const ApiDemoPage = retryLazyImport(() => import("./pages/ApiDemoPage"));
const MarketImpact = retryLazyImport(() => import("./pages/MarketImpact"));
const Workforce = retryLazyImport(() => import("./pages/Workforce"));
const Careers = retryLazyImport(() => import("./pages/Careers"));

// Enterprise and Platform pages
const Enterprise = retryLazyImport(() => import("./pages/Enterprise"));
const EnterpriseDemo = retryLazyImport(
  () => import("./pages/enterprise/EnterpriseDemo"),
);
const EnterprisePricing = retryLazyImport(
  () => import("./pages/enterprise/EnterprisePricing"),
);
const EnterpriseROICalculator = retryLazyImport(
  () => import("./pages/enterprise/EnterpriseROICalculator"),
);
const RiskEngine = retryLazyImport(() => import("./pages/platform/RiskEngine"));
const IntelligenceDashboard = retryLazyImport(
  () => import("./pages/platform/IntelligenceDashboard"),
);

// Role-specific dashboards
const SupplyChainDashboard = retryLazyImport(
  () => import("./pages/dashboard/SupplyChainDashboard"),
);
const ComplianceDashboard = retryLazyImport(
  () => import("./pages/dashboard/ComplianceDashboard"),
);
const NgoDashboard = retryLazyImport(
  () => import("./pages/dashboard/NgoDashboard"),
);
const GovernmentDashboard = retryLazyImport(
  () => import("./pages/dashboard/GovernmentDashboard"),
);
const SuperadminDashboard = retryLazyImport(
  () => import("./pages/dashboard/SuperadminDashboard"),
);
const PlatformAdminDashboard = retryLazyImport(
  () => import("./pages/dashboard/PlatformAdminDashboard"),
);
const EnterpriseSuperadminDashboard = retryLazyImport(
  () => import("./pages/dashboard/EnterpriseSuperadminDashboard"),
);
const CEOEnterpriseDashboard = retryLazyImport(
  () => import("./pages/dashboard/CEOEnterpriseDashboard"),
);

// Add payment confirmation component
const PaymentConfirmation = retryLazyImport(
  () => import("./components/pricing/PaymentConfirmation"),
);

// Error Boundary component for catching component errors
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6">
          <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
          <p className="text-muted-foreground mb-4">
            An error occurred while loading this page.
          </p>
          <button
            onClick={() => {
              this.setState({ hasError: false });
              window.location.reload();
            }}
            className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Protected route component that checks for authentication and role
const ProtectedRoute = ({
  children,
  requiredRole,
}: {
  children: React.ReactNode;
  requiredRole?: string;
}) => {
  const { isAuthenticated, isLoading, userRole, checkUserAccess } = useAuth();

  if (isLoading) {
    return <LoadingLogo />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If a specific role is required and the user doesn't have it
  if (requiredRole && !checkUserAccess(requiredRole)) {
    // Navigate to their proper dashboard based on their role
    const dashboardPath = getDashboardPathForRole(userRole || "");
    return <Navigate to={dashboardPath} replace />;
  }

  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <>
      <RouteRestorer />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/platform" element={<Platform />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/impact" element={<Impact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/join" element={<Join />} />
        <Route path="/api" element={<ApiDemoPage />} />
        <Route path="/workforce" element={<Workforce />} />
        <Route path="/careers" element={<Careers />} />

        {/* Add payment confirmation route */}
        <Route path="/payment/confirm" element={<PaymentConfirmation />} />

        {/* Authentication Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Protected Routes */}
        <Route
          path="/onboarding"
          element={
            <ProtectedRoute>
              <Onboarding />
            </ProtectedRoute>
          }
        />

        {/* Main Dashboard - redirects to role-specific dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Role-specific Dashboards */}
        <Route
          path="/dashboard/supply-chain"
          element={
            <ProtectedRoute requiredRole="business">
              <SupplyChainDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/compliance"
          element={
            <ProtectedRoute requiredRole="compliance">
              <ComplianceDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/ngo"
          element={
            <ProtectedRoute requiredRole="ngo">
              <NgoDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/government"
          element={
            <ProtectedRoute requiredRole="government">
              <GovernmentDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/platform-admin"
          element={
            <ProtectedRoute requiredRole="admin">
              <PlatformAdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/superadmin"
          element={
            <ProtectedRoute requiredRole="superadmin">
              <SuperadminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/enterprise"
          element={
            <ProtectedRoute requiredRole="superadmin">
              <EnterpriseSuperadminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/ceo"
          element={
            <ProtectedRoute requiredRole="superadmin">
              <CEOEnterpriseDashboard />
            </ProtectedRoute>
          }
        />

        {/* Enterprise Routes */}
        <Route path="/enterprise" element={<Enterprise />} />
        <Route path="/enterprise/demo" element={<EnterpriseDemo />} />
        <Route path="/enterprise/pricing" element={<EnterprisePricing />} />
        <Route path="/enterprise/implementation" element={<EnterpriseDemo />} />
        <Route path="/enterprise/integration-hub" element={<Enterprise />} />
        <Route
          path="/enterprise/workspace-management"
          element={<Enterprise />}
        />
        <Route
          path="/enterprise/security-compliance"
          element={<Enterprise />}
        />
        <Route path="/enterprise/analytics" element={<Enterprise />} />
        <Route path="/enterprise/custom-solutions" element={<Enterprise />} />
        <Route
          path="/enterprise/roi-calculator"
          element={<EnterpriseROICalculator />}
        />

        {/* Contact Routes - redirect to demo page */}
        <Route
          path="/contact/enterprise"
          element={<Navigate to="/enterprise/demo" replace />}
        />
        <Route
          path="/contact/risk-engine"
          element={<Navigate to="/enterprise/demo" replace />}
        />
        <Route
          path="/contact/intelligence"
          element={<Navigate to="/enterprise/demo" replace />}
        />

        {/* Platform Feature Routes */}
        <Route path="/platform/risk-engine" element={<RiskEngine />} />
        <Route
          path="/platform/risk-engine/demo"
          element={<Navigate to="/enterprise/demo" replace />}
        />
        <Route
          path="/platform/risk-engine/documentation"
          element={<RiskEngine />}
        />
        <Route
          path="/platform/risk-engine/setup"
          element={<Navigate to="/enterprise/demo" replace />}
        />
        <Route
          path="/platform/risk-engine/trial"
          element={<Navigate to="/enterprise/demo" replace />}
        />

        <Route
          path="/platform/intelligence-dashboard"
          element={<IntelligenceDashboard />}
        />
        <Route
          path="/platform/intelligence-dashboard/demo"
          element={<Navigate to="/enterprise/demo" replace />}
        />
        <Route
          path="/platform/intelligence-dashboard/features"
          element={<IntelligenceDashboard />}
        />
        <Route
          path="/platform/intelligence-dashboard/data-sources"
          element={<IntelligenceDashboard />}
        />
        <Route
          path="/platform/intelligence-dashboard/trial"
          element={<Navigate to="/enterprise/demo" replace />}
        />

        {/* Solutions by Industry Routes */}
        <Route path="/solutions/manufacturing" element={<Enterprise />} />
        <Route path="/solutions/retail-fashion" element={<Enterprise />} />
        <Route path="/solutions/technology" element={<Enterprise />} />
        <Route path="/solutions/logistics" element={<Enterprise />} />

        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="/market-impact" element={<MarketImpact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <CookieConsent
              options={{
                position: "bottom-right",
                companyName: "Atlas",
                privacyPolicyUrl: "/privacy",
                cookiePolicyUrl: "/cookies",
                showToggleAll: true,
                categories: [
                  {
                    id: "necessary",
                    name: "Necessary",
                    description:
                      "These cookies are essential for the website to function properly.",
                    required: true,
                  },
                  {
                    id: "preferences",
                    name: "Preferences",
                    description:
                      "These cookies remember your preferences and settings.",
                  },
                  {
                    id: "statistics",
                    name: "Statistics",
                    description:
                      "These cookies collect information about how you use the website.",
                  },
                  {
                    id: "marketing",
                    name: "Marketing",
                    description:
                      "These cookies track your online activity to help advertisers deliver more relevant ads.",
                  },
                ],
              }}
              onAccept={(settings) => {
                console.log("Cookie consent settings:", settings);
              }}
            />
            <OfflineIndicator />
            <Suspense fallback={<LoadingLogo />}>
              <AppRoutes />
            </Suspense>
          </TooltipProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
