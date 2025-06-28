import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Mail, Lock, AlertCircle, ArrowLeft, Building, Globe, Gavel, Shield, Bot, Zap, Database, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import SocialLogin from '@/components/auth/SocialLogin';
import { useToast } from '@/hooks/use-toast';
import { loginUser, AuthCredentials, getDashboardPathForRole, demoAccounts } from '@/services/auth.service';
import { getUserProfile } from '@/services/user.service';
import { useAuth } from '@/context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [userRole, setUserRole] = useState('business');
  const [showRoleSelector, setShowRoleSelector] = useState(false);
  const [showDemoLogins, setShowDemoLogins] = useState(false);
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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (showRoleSelector) {
      // User has selected a role, proceed with login
      setIsLoading(true);
      setError('');

      try {
        const credentials: AuthCredentials = {
          email,
          password
        };

        const { user, error } = await loginUser(credentials);
        
        if (error) {
          throw error;
        }
        
        if (user) {
          // Success! Navigate to dashboard and show toast
          toast({
            title: "Login successful",
            description: `Welcome to Guardian-IO! Redirecting to your dashboard...`,
          });
          
          // Store the user role in localStorage for quick access
          localStorage.setItem('userRole', userRole);
          
          // Refresh auth context to update role
          await refreshAuth();
          
          // Get the appropriate dashboard path
          const dashboardPath = getDashboardPathForRole(userRole);
          
          // Navigate to dashboard
          navigate(dashboardPath);
        } else {
          throw new Error('Invalid email or password');
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unexpected error occurred');
        }
        setIsLoading(false);
      }
    } else {
      // Move to role selection step
      setShowRoleSelector(true);
    }
  };

  // Enhanced demo accounts with comprehensive technology analysis and chat history features
  const enhancedDemoAccounts = [
    {
      role: 'business',
      email: 'business@demo.com',
      password: 'demo123',
      title: 'Supply Chain Executive',
      description: 'Monitor global supply chains, track ESG compliance, and manage supplier relationships',
      icon: Building,
      color: 'bg-blue-500',
      features: ['Risk Intelligence', 'Supplier Analytics', 'Market Impact'],
      technologyStack: [
        'AI-Powered Predictive Analytics',
        'Blockchain Supply Chain Verification', 
        'Real-time Compliance Monitoring',
        'Advanced ESG Scoring Algorithms'
      ],
      chatCapabilities: [
        'Strategic supply chain optimization queries',
        'ESG compliance guidance and recommendations',
        'Risk mitigation strategy development',
        'Supplier performance analysis and insights'
      ],
      dataAccess: [
        'Global supplier network analytics',
        'Real-time compliance score tracking',
        'Predictive risk assessment models',
        'Market impact measurement tools'
      ],
      workflows: [
        'Automated supplier onboarding and verification',
        'Real-time compliance monitoring and alerts',
        'Predictive risk analysis and mitigation planning',
        'ESG reporting and stakeholder communication'
      ]
    },
    {
      role: 'compliance',
      email: 'compliance@demo.com', 
      password: 'demo123',
      title: 'Compliance Officer',
      description: 'Oversee regulatory compliance, manage audits, and ensure policy adherence',
      icon: Shield,
      color: 'bg-green-500',
      features: ['Regulatory Updates', 'Audit Tracking', 'Risk Assessment'],
      technologyStack: [
        'Regulatory Intelligence Engine',
        'Automated Audit Management System',
        'Policy Compliance Tracking',
        'Legal Document Analysis AI'
      ],
      chatCapabilities: [
        'Regulatory requirement interpretation and guidance',
        'Audit preparation and management assistance',
        'Policy compliance verification queries',
        'Legal document analysis and summarization'
      ],
      dataAccess: [
        'Comprehensive regulatory database',
        'Audit trail and compliance history',
        'Policy adherence scoring metrics',
        'Legal precedent and case analysis'
      ],
      workflows: [
        'Automated regulatory change monitoring',
        'Compliance gap analysis and remediation',
        'Audit scheduling and execution tracking',
        'Policy update distribution and training'
      ]
    },
    {
      role: 'ngo',
      email: 'ngo@demo.com',
      password: 'demo123',
      title: 'NGO Human Rights Analyst',
      description: 'Investigate human rights violations, track worker protection, and advocate for policy changes',
      icon: Globe,
      color: 'bg-yellow-500',
      features: ['Investigation Tools', 'Whistleblower Portal', 'Impact Tracking'],
      technologyStack: [
        'Anonymous Reporting System',
        'Human Rights Violation Detection AI',
        'Worker Protection Monitoring',
        'Advocacy Campaign Management'
      ],
      chatCapabilities: [
        'Human rights violation investigation guidance',
        'Worker protection strategy development',
        'Advocacy campaign planning and execution',
        'Anonymous report analysis and triage'
      ],
      dataAccess: [
        'Global human rights violation database',
        'Worker protection metrics and trends',
        'Anonymous whistleblower reports',
        'Advocacy impact measurement tools'
      ],
      workflows: [
        'Anonymous report intake and investigation',
        'Worker protection monitoring and alerts',
        'Advocacy campaign coordination',
        'Impact measurement and reporting'
      ]
    },
    {
      role: 'government',
      email: 'government@demo.com',
      password: 'demo123',
      title: 'Government Regulator',
      description: 'Enforce policies, monitor compliance, and coordinate international standards',
      icon: Gavel,
      color: 'bg-purple-500',
      features: ['Enforcement Actions', 'Policy Development', 'Global Standards'],
      technologyStack: [
        'Policy Enforcement Automation',
        'International Standards Coordination',
        'Regulatory Impact Analysis',
        'Cross-Border Compliance Monitoring'
      ],
      chatCapabilities: [
        'Policy development and implementation guidance',
        'Enforcement action planning and execution',
        'International standards coordination',
        'Regulatory impact analysis and reporting'
      ],
      dataAccess: [
        'Comprehensive regulatory enforcement database',
        'International standards compliance metrics',
        'Cross-border violation tracking',
        'Policy impact measurement tools'
      ],
      workflows: [
        'Policy development and stakeholder consultation',
        'Enforcement action planning and execution',
        'International coordination and reporting',
        'Regulatory impact assessment and optimization'
      ]
    },
    {
      role: 'superadmin',
      email: 'admin@demo.com',
      password: 'demo123',
      title: 'Platform Administrator',
      description: 'Manage global operations, oversee system health, and configure platform settings',
      icon: Shield,
      color: 'bg-red-500',
      features: ['User Management', 'System Health', 'Platform Analytics'],
      technologyStack: [
        'Global Operations Management',
        'Advanced System Health Monitoring',
        'Platform Analytics and Optimization',
        'Multi-tenant Architecture Control'
      ],
      chatCapabilities: [
        'Platform configuration and optimization',
        'System health monitoring and troubleshooting',
        'User management and access control',
        'Global operations coordination and planning'
      ],
      dataAccess: [
        'Complete platform analytics and metrics',
        'System health and performance data',
        'User behavior and engagement analytics',
        'Global operations coordination tools'
      ],
      workflows: [
        'Platform configuration and optimization',
        'System health monitoring and maintenance',
        'User onboarding and access management',
        'Global operations coordination'
      ]
    }
  ];

  // Function to detect entity type from email domain
  const detectEntityFromEmail = (email: string): string => {
    const domain = email.split('@')[1]?.toLowerCase();
    
    if (!domain) return 'business';
    
    // Simple heuristics - can be expanded with a more comprehensive list
    if (domain.includes('gov') || domain.includes('government')) return 'government';
    if (domain.includes('ngo') || domain.includes('org')) return 'ngo';
    if (domain.includes('compliance') || domain.includes('legal')) return 'compliance';
    if (domain.includes('admin') || domain.includes('superadmin')) return 'superadmin';
    
    return 'business'; // Default
  };

  // Auto-detect role when email changes
  useEffect(() => {
    if (email && email.includes('@')) {
      const detectedRole = detectEntityFromEmail(email);
      setUserRole(detectedRole);
    }
  }, [email]);

  // Role cards for the role selector screen - enhanced with better descriptions
  const roleCards = [
    {
      id: 'business',
      title: 'Business Executive',
      description: 'Supply chain management, ESG compliance, and supplier oversight',
      icon: Building,
      color: 'bg-blue-500',
      features: ['Risk Intelligence', 'Supplier Analytics', 'Market Impact']
    },
    {
      id: 'compliance',
      title: 'Compliance Officer',
      description: 'Regulatory oversight, audit management, and policy enforcement',
      icon: Shield,
      color: 'bg-green-500',
      features: ['Regulatory Updates', 'Audit Tracking', 'Risk Assessment']
    },
    {
      id: 'ngo',
      title: 'NGO Analyst',
      description: 'Human rights monitoring, worker protection, and advocacy',
      icon: Globe,
      color: 'bg-yellow-500',
      features: ['Investigation Tools', 'Whistleblower Portal', 'Impact Tracking']
    },
    {
      id: 'government',
      title: 'Government Regulator',
      description: 'Policy enforcement, compliance monitoring, and international coordination',
      icon: Gavel,
      color: 'bg-purple-500',
      features: ['Enforcement Actions', 'Policy Development', 'Global Standards']
    },
    {
      id: 'superadmin',
      title: 'Platform Administrator',
      description: 'Global operations management and system oversight',
      icon: Shield,
      color: 'bg-red-500',
      features: ['User Management', 'System Health', 'Platform Analytics']
    }
  ];

  // Handle demo login selection - enhanced to show role features
  const handleDemoLogin = (demoAccount: { email: string; password: string; role: string; description: string }) => {
    setEmail(demoAccount.email);
    setPassword(demoAccount.password);
    setUserRole(demoAccount.role);
    
    // For demo accounts, we can proceed directly to login
    setShowRoleSelector(true);
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
        <div className="w-full max-w-4xl space-y-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight">Welcome to Guardian-IO</h1>
            <p className="mt-2 text-muted-foreground">
              Sign in to your account to continue
            </p>
          </div>

          {/* Error message */}
          {error && (
            <div className="p-3 rounded-md bg-destructive/10 text-destructive flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          {/* Enhanced Demo Login Section */}
          <div className="bg-muted/40 p-6 rounded-lg border border-border">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="font-semibold text-lg">Experience Guardian-IO Demo Accounts</h3>
                <p className="text-sm text-muted-foreground">Choose a role to explore different perspectives of our comprehensive platform</p>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowDemoLogins(!showDemoLogins)}
              >
                {showDemoLogins ? 'Hide Demos' : 'Show Demos'}
              </Button>
            </div>
            
            {showDemoLogins && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {enhancedDemoAccounts.map((account) => (
                    <Card
                      key={account.role}
                      className="cursor-pointer hover:shadow-md transition-all duration-200 border-l-4"
                      style={{ borderLeftColor: account.color.replace('bg-', '#') }}
                      onClick={() => handleDemoLogin(account)}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className={`p-3 rounded-full ${account.color} text-white flex-shrink-0`}>
                            <account.icon className="h-6 w-6" />
                          </div>
                          <div className="flex-1 space-y-3">
                            <div>
                              <h4 className="font-semibold text-lg">{account.title}</h4>
                              <p className="text-sm text-muted-foreground">{account.email}</p>
                              <p className="text-sm mt-1">{account.description}</p>
                            </div>

                            <div className="space-y-3">
                              <div>
                                <div className="flex items-center gap-2 mb-2">
                                  <Bot className="h-4 w-4 text-blue-600" />
                                  <span className="text-xs font-medium text-blue-600">AI Chat Capabilities</span>
                                </div>
                                <div className="flex flex-wrap gap-1">
                                  {account.chatCapabilities.slice(0, 2).map((capability, index) => (
                                    <Badge key={index} variant="outline" className="text-xs">
                                      {capability}
                                    </Badge>
                                  ))}
                                  {account.chatCapabilities.length > 2 && (
                                    <Badge variant="outline" className="text-xs">
                                      +{account.chatCapabilities.length - 2} more
                                    </Badge>
                                  )}
                                </div>
                              </div>

                              <div>
                                <div className="flex items-center gap-2 mb-2">
                                  <Database className="h-4 w-4 text-green-600" />
                                  <span className="text-xs font-medium text-green-600">Technology Stack</span>
                                </div>
                                <div className="flex flex-wrap gap-1">
                                  {account.technologyStack.slice(0, 2).map((tech, index) => (
                                    <Badge key={index} variant="secondary" className="text-xs">
                                      {tech}
                                    </Badge>
                                  ))}
                                  {account.technologyStack.length > 2 && (
                                    <Badge variant="secondary" className="text-xs">
                                      +{account.technologyStack.length - 2} more
                                    </Badge>
                                  )}
                                </div>
                              </div>

                              <div>
                                <div className="flex items-center gap-2 mb-2">
                                  <TrendingUp className="h-4 w-4 text-purple-600" />
                                  <span className="text-xs font-medium text-purple-600">Automated Workflows</span>
                                </div>
                                <div className="flex flex-wrap gap-1">
                                  {account.workflows.slice(0, 2).map((workflow, index) => (
                                    <Badge key={index} variant="outline" className="text-xs border-purple-200">
                                      {workflow}
                                    </Badge>
                                  ))}
                                  {account.workflows.length > 2 && (
                                    <Badge variant="outline" className="text-xs border-purple-200">
                                      +{account.workflows.length - 2} more
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>

                            <Button 
                              size="sm" 
                              className="w-full mt-4"
                              onClick={() => handleDemoLogin(account)}
                            >
                              <Zap className="h-4 w-4 mr-2" />
                              Experience {account.title} Dashboard
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
                  <div className="flex items-start gap-3">
                    <Bot className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-900 mb-2">AI-Powered Platform Intelligence</h4>
                      <p className="text-sm text-blue-800 mb-3">
                        Each demo account provides access to advanced AI capabilities including:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-blue-700">
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                          Interactive chat-based assistance and guidance
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                          Predictive analytics and risk assessment
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                          Automated workflow optimization
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                          Real-time compliance monitoring
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Login form or Role Selection */}
          {!showRoleSelector ? (
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

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Continue"}
              </Button>
            </form>
          ) : (
            <div className="space-y-6 max-w-2xl mx-auto">
              <div className="text-center animate-fadeIn">
                <h2 className="text-xl font-semibold mb-2">Select Your Role</h2>
                <p className="text-muted-foreground">
                  Choose your organization type to access the appropriate dashboard
                </p>
              </div>
              
              <form onSubmit={handleLogin}>
                <div className="grid gap-4">
                  {roleCards.map((role) => (
                    <Card 
                      key={role.id}
                      className={`cursor-pointer transition-all duration-200 hover:shadow-md ${userRole === role.id ? 'ring-2 ring-primary' : 'hover:border-primary/50'}`}
                      onClick={() => setUserRole(role.id)}
                    >
                      <CardContent className="p-4 flex items-center space-x-4">
                        <div className={`p-2 rounded-full ${role.color} text-white`}>
                          <role.icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">{role.title}</h3>
                          <p className="text-sm text-muted-foreground">{role.description}</p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {role.features.map((feature, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <RadioGroup value={userRole} onValueChange={setUserRole} className="flex">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value={role.id} id={role.id} />
                          </div>
                        </RadioGroup>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <div className="mt-6 flex space-x-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setShowRoleSelector(false)}
                  >
                    Back
                  </Button>
                  <Button 
                    type="submit"
                    className="flex-1"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing in..." : "Sign in"}
                  </Button>
                </div>
              </form>
            </div>
          )}

          {!showRoleSelector && (
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

export default Login;
