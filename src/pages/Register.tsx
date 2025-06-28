import React, { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Mail,
  Lock,
  User,
  Building,
  AlertCircle,
  ArrowLeft,
  CheckCircle,
  Globe,
  Gavel,
  FileCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import SocialLogin from "@/components/auth/SocialLogin";
import { useToast } from "@/hooks/use-toast";
import { registerUser, RegisterData } from "@/services/auth.service";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Register = () => {
  // All state hooks declared at the top level, unconditionally
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [userRole, setUserRole] = useState("business");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showRoleWizard, setShowRoleWizard] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  // Custom hooks called unconditionally
  const navigate = useNavigate();
  const { toast } = useToast();

  // Memoized validation function
  const validateForm = useCallback(() => {
    if (!name.trim()) {
      setError("Name is required");
      return false;
    }

    if (!email.trim()) {
      setError("Email is required");
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address");
      return false;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return false;
    }

    return true;
  }, [name, email, password]);

  // Memoized registration handler
  const handleRegister = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!showRoleWizard) {
        if (!validateForm()) {
          return;
        }
        setShowRoleWizard(true);
        setError("");
        return;
      }

      setIsLoading(true);
      setError("");

      try {
        const userData: RegisterData = {
          email: email.trim(),
          password,
          name: name.trim(),
          company: company.trim() || undefined,
          role: userRole,
        };

        const { user, error } = await registerUser(userData);

        if (error) {
          throw error;
        }

        if (user) {
          setRegistrationSuccess(true);

          toast({
            title: "Registration successful!",
            description: `Welcome to Atlas! Your ${userRole} dashboard is being prepared.`,
          });

          setTimeout(() => {
            navigate("/onboarding");
          }, 2000);
        } else {
          throw new Error("Registration failed: No user data returned");
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError(
            "An unexpected error occurred during registration. Please try again.",
          );
        }
        setRegistrationSuccess(false);
      } finally {
        setIsLoading(false);
      }
    },
    [
      showRoleWizard,
      validateForm,
      email,
      password,
      name,
      company,
      userRole,
      toast,
      navigate,
    ],
  );

  const handleBackToForm = useCallback(() => {
    setShowRoleWizard(false);
    setError("");
  }, []);

  const roleCards = [
    {
      id: "business",
      title: "Business & Supply Chain",
      description:
        "Optimize your supply chain with ESG metrics and risk management",
      icon: Building,
      color: "bg-blue-500",
    },
    {
      id: "compliance",
      title: "ESG & Compliance",
      description: "Monitor regulatory compliance and generate audit reports",
      icon: FileCheck,
      color: "bg-green-500",
    },
    {
      id: "ngo",
      title: "NGO & Human Rights",
      description: "Track social impact and ethical performance metrics",
      icon: Globe,
      color: "bg-yellow-500",
    },
    {
      id: "government",
      title: "Government & Regulatory",
      description: "Oversee policy compliance and cross-border trade",
      icon: Gavel,
      color: "bg-purple-500",
    },
  ];

  // Early return for success state - all hooks have been called
  if (registrationSuccess) {
    return (
      <div className="flex flex-col min-h-screen bg-background items-center justify-center">
        <div className="w-full max-w-md space-y-8 text-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">
              Welcome to Atlas!
            </h1>
            <p className="text-muted-foreground">
              Your account has been created successfully. We're setting up your
              personalized dashboard...
            </p>
          </div>

          <div className="space-y-4">
            <div className="animate-pulse">
              <div className="h-2 bg-primary/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full"
                  style={{
                    animation: "loading 2s ease-in-out infinite",
                  }}
                />
              </div>
            </div>

            <p className="text-sm text-muted-foreground">
              Preparing your {userRole} dashboard...
            </p>
          </div>
        </div>

        <style jsx>{`
          @keyframes loading {
            0% {
              transform: translateX(-100%);
            }
            50% {
              transform: translateX(0%);
            }
            100% {
              transform: translateX(100%);
            }
          }
        `}</style>
      </div>
    );
  }

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
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight">
              Create an account
            </h1>
            <p className="mt-2 text-muted-foreground">
              Join Atlas to build ethical supply chains
            </p>
          </div>

          {/* Error message */}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Registration form or Role Selection Wizard */}
          {!showRoleWizard ? (
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Full Name"
                    className="pl-10"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="Email"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="relative">
                  <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Company or Organization (Optional)"
                    className="pl-10"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="password"
                    placeholder="Password (8+ characters)"
                    className="pl-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={8}
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="flex items-center">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  required
                  disabled={isLoading}
                />
                <label
                  htmlFor="terms"
                  className="ml-2 block text-sm text-muted-foreground"
                >
                  I agree to the{" "}
                  <Link
                    to="/terms"
                    className="font-medium text-primary hover:underline"
                    target="_blank"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="/privacy"
                    className="font-medium text-primary hover:underline"
                    target="_blank"
                  >
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Validating..." : "Continue"}
              </Button>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="text-center animate-fadeIn">
                <h2 className="text-xl font-semibold mb-2">Welcome, {name}!</h2>
                <p className="text-muted-foreground">
                  Why are you here today? Select your primary role:
                </p>
              </div>

              <form onSubmit={handleRegister}>
                <div className="grid gap-4">
                  {roleCards.map((role) => {
                    const IconComponent = role.icon;
                    return (
                      <Card
                        key={role.id}
                        className={`cursor-pointer transition-all duration-200 hover:shadow-md ${userRole === role.id ? "ring-2 ring-primary" : "hover:border-primary/50"}`}
                        onClick={() => setUserRole(role.id)}
                      >
                        <CardContent className="p-4 flex items-center space-x-4">
                          <div
                            className={`p-2 rounded-full ${role.color} text-white`}
                          >
                            <IconComponent className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium">{role.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {role.description}
                            </p>
                          </div>
                          <RadioGroup
                            value={userRole}
                            onValueChange={setUserRole}
                            className="flex"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value={role.id} id={role.id} />
                            </div>
                          </RadioGroup>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>

                <div className="mt-6 flex space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={handleBackToForm}
                    disabled={isLoading}
                  >
                    Back
                  </Button>
                  <Button type="submit" className="flex-1" disabled={isLoading}>
                    {isLoading ? "Creating account..." : "Complete Sign Up"}
                  </Button>
                </div>
              </form>
            </div>
          )}

          {!showRoleWizard && (
            <>
              {/* Divider */}
              <div className="relative">
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
              <SocialLogin />

              {/* Login link */}
              <p className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-primary hover:underline"
                >
                  Sign in <ArrowRight className="inline h-3 w-3" />
                </Link>
              </p>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Register;
