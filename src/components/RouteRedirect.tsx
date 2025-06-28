import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface RouteRedirectProps {
  to: string;
  delay?: number;
  message?: string;
}

const RouteRedirect: React.FC<RouteRedirectProps> = ({
  to,
  delay = 0,
  message = "Redirecting...",
}) => {
  const location = useLocation();

  useEffect(() => {
    console.log(`Redirecting from ${location.pathname} to ${to}`);
  }, [location.pathname, to]);

  if (delay === 0) {
    return <Navigate to={to} replace />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold mb-2">{message}</h2>
        <p className="text-muted-foreground">
          You will be redirected shortly...
        </p>
      </div>
    </div>
  );
};

export default RouteRedirect;
