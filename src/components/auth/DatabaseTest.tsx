import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const DatabaseTest = () => {
  const [testResults, setTestResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const runDatabaseTests = async () => {
    setIsLoading(true);
    setTestResults([]);
    const results: any[] = [];

    // Test 1: Check Supabase connection
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("count")
        .limit(1);
      results.push({
        test: "Supabase Connection",
        status: error ? "error" : "success",
        message: error ? error.message : "Connected successfully",
        details: error ? error : "Database is accessible",
      });
    } catch (error) {
      results.push({
        test: "Supabase Connection",
        status: "error",
        message: "Connection failed",
        details: error instanceof Error ? error.message : "Unknown error",
      });
    }

    // Test 2: Check user_profiles table
    try {
      const { data, error } = await supabase
        .from("user_profiles")
        .select("count")
        .limit(1);
      results.push({
        test: "user_profiles Table",
        status: error ? "warning" : "success",
        message: error ? "Table not accessible" : "Table accessible",
        details: error
          ? error.message
          : "user_profiles table exists and is accessible",
      });
    } catch (error) {
      results.push({
        test: "user_profiles Table",
        status: "warning",
        message: "Table check failed",
        details: error instanceof Error ? error.message : "Unknown error",
      });
    }

    // Test 3: Check profiles table (fallback)
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("count")
        .limit(1);
      results.push({
        test: "profiles Table (Fallback)",
        status: error ? "warning" : "success",
        message: error ? "Table not accessible" : "Table accessible",
        details: error
          ? error.message
          : "profiles table exists and is accessible",
      });
    } catch (error) {
      results.push({
        test: "profiles Table (Fallback)",
        status: "warning",
        message: "Table check failed",
        details: error instanceof Error ? error.message : "Unknown error",
      });
    }

    // Test 4: Check authentication
    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      results.push({
        test: "Authentication Check",
        status: "success",
        message: user ? "User authenticated" : "No user logged in",
        details: user ? `User ID: ${user.id}` : "Authentication system working",
      });
    } catch (error) {
      results.push({
        test: "Authentication Check",
        status: "error",
        message: "Auth check failed",
        details: error instanceof Error ? error.message : "Unknown error",
      });
    }

    setTestResults(results);
    setIsLoading(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "warning":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case "error":
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "border-green-200 bg-green-50";
      case "warning":
        return "border-yellow-200 bg-yellow-50";
      case "error":
        return "border-red-200 bg-red-50";
      default:
        return "border-gray-200 bg-gray-50";
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          🔧 Database Connection Test
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            Test the database connection and table accessibility for user
            registration.
          </p>
          <Button onClick={runDatabaseTests} disabled={isLoading}>
            {isLoading ? "Testing..." : "Run Tests"}
          </Button>
        </div>

        {testResults.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-semibold">Test Results:</h3>
            {testResults.map((result, index) => (
              <Alert key={index} className={getStatusColor(result.status)}>
                <div className="flex items-start gap-3">
                  {getStatusIcon(result.status)}
                  <div className="flex-1">
                    <div className="font-medium">{result.test}</div>
                    <AlertDescription className="mt-1">
                      <div className="font-medium text-sm">
                        {result.message}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {result.details}
                      </div>
                    </AlertDescription>
                  </div>
                </div>
              </Alert>
            ))}
          </div>
        )}

        {testResults.length > 0 && (
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">📋 Summary:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>
                ✅ If <strong>Supabase Connection</strong> is green, basic
                connectivity works
              </li>
              <li>
                ⚠️ If profile tables show warnings, registration will use
                fallback methods
              </li>
              <li>
                🔧 Registration system will adapt to available database schema
              </li>
              <li>
                💡 User profiles can be created during onboarding if table
                creation fails
              </li>
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DatabaseTest;
