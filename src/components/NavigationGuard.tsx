
import React, { useEffect } from 'react';
import { useLocation, useNavigate, useBeforeUnload } from 'react-router-dom';
import { toast } from "@/components/ui/use-toast";

interface NavigationGuardProps {
  when?: boolean;
  message?: string;
}

export const NavigationGuard = ({ 
  when = false, 
  message = "You have unsaved changes. Are you sure you want to leave this page?" 
}: NavigationGuardProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Set the global unsaved changes flag
  useEffect(() => {
    if (typeof window.setUnsavedChanges === 'function') {
      window.setUnsavedChanges(when);
    }
    
    return () => {
      if (typeof window.setUnsavedChanges === 'function') {
        window.setUnsavedChanges(false);
      }
    };
  }, [when]);

  // Handle the beforeunload event to prevent accidental page refresh/close
  useBeforeUnload(
    React.useCallback(
      (event) => {
        if (when) {
          event.preventDefault();
          return message;
        }
      },
      [when, message]
    )
  );

  // Handle the browser back button
  useEffect(() => {
    if (!when) return;

    // Show a toast when there are unsaved changes
    toast({
      title: "Unsaved Changes",
      description: "You have unsaved changes. Please save or discard them before navigating away.",
    });
    
    // Implementation will depend on the needs of the application
    // This is a simple listener to alert users about unsaved changes
    
    return () => {
      // Cleanup if necessary
    };
  }, [when, location, navigate]);

  return null;
};

export default NavigationGuard;
