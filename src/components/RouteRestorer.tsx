
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * RouteRestorer component
 * This component helps maintain the current route across page reloads
 * by storing it in sessionStorage and making it available to the service worker.
 */
const RouteRestorer: React.FC = () => {
  const location = useLocation();
  
  useEffect(() => {
    const currentRoute = location.pathname + location.search;
    
    // Store current route in sessionStorage
    sessionStorage.setItem('lastRoute', currentRoute);
    
    // Also notify service worker about the current route
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        type: 'STORE_ROUTE',
        route: currentRoute
      });
    }
    
    // Set flag to restore this route on next load if needed
    sessionStorage.setItem('shouldRestoreRoute', 'true');
    
    // On unload (refresh/close), ensure we mark to restore the route
    const handleBeforeUnload = () => {
      sessionStorage.setItem('shouldRestoreRoute', 'true');
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [location.pathname, location.search]);
  
  // This is a non-visual component
  return null;
};

export default RouteRestorer;
