import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Mail,
  Lock,
  User,
  Building,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { registerUser, RegisterData } from "@/services/auth.service";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Simple fallback Register component for testing
const RegisterFallback: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    company: "",
  });
  const [userRole, setUserRole] = useState("business");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { toast } = useToast();

  const handleInputChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const userData: RegisterData = {
        email: formData.email.trim(),
        password: formData.password,
        name: formData.name.trim(),
        company: formData.company.trim() || undefined,
        role: userRole,
      };

      const { user, error } = await registerUser(userData);

      if (error) {
        throw error;
      }

      if (user) {
        toast({
          title: "Registration successful!",
          description: "Welcome to Atlas! Redirecting to onboarding...",
        });

        setTimeout(() => {
          navigate("/onboarding");
        }, 1000);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
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
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight">
              Create an account
            </h1>
            <p className="mt-2 text-muted-foreground">
              Join Atlas to build ethical supply chains
            </p>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Full Name"
                  className="pl-10"
                  value={formData.name}
                  onChange={handleInputChange("name")}
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
                  value={formData.email}
                  onChange={handleInputChange("email")}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="relative">
                <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Company (Optional)"
                  className="pl-10"
                  value={formData.company}
                  onChange={handleInputChange("company")}
                  disabled={isLoading}
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="password"
                  placeholder="Password (8+ characters)"
                  className="pl-10"
                  value={formData.password}
                  onChange={handleInputChange("password")}
                  required
                  minLength={8}
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Select your role:</label>
              <select
                value={userRole}
                onChange={(e) => setUserRole(e.target.value)}
                className="w-full p-2 border rounded-md"
                disabled={isLoading}
              >
                <option value="business">Business & Supply Chain</option>
                <option value="compliance">ESG & Compliance</option>
                <option value="ngo">NGO & Human Rights</option>
                <option value="government">Government & Regulatory</option>
              </select>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating account..." : "Create Account"}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-primary hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default RegisterFallback;
