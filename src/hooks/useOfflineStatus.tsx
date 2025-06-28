
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const useOfflineStatus = (): boolean => {
  // Initialize from sessionStorage if available, otherwise from navigator.onLine
  const getInitialStatus = (): boolean => {
    const stored = sessionStorage.getItem('offlineStatus');
    return stored !== null ? stored === 'true' : !navigator.onLine;
  };

  const [isOffline, setIsOffline] = useState(getInitialStatus);
  const location = useLocation();
  const navigate = useNavigate();

  // Using a route restoration effect
  useEffect(() => {
    // On initial load, check if we need to restore a route
    const shouldRestoreRoute = sessionStorage.getItem('shouldRestoreRoute') === 'true';
    const lastRoute = sessionStorage.getItem('lastRoute');
    
    if (shouldRestoreRoute && lastRoute && lastRoute !== '/' && lastRoute !== location.pathname + location.search) {
      console.log('Restoring route to:', lastRoute);
      navigate(lastRoute);
      sessionStorage.setItem('shouldRestoreRoute', 'false');
    }
  }, []);

  useEffect(() => {
    // Handle online status changes
    const handleOnline = () => {
      setIsOffline(false);
      sessionStorage.setItem('offlineStatus', 'false');
    };
    
    const handleOffline = () => {
      setIsOffline(true);
      sessionStorage.setItem('offlineStatus', 'true');
    };

    // Listen for connection events
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Store the current route in service worker and sessionStorage
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      const currentRoute = location.pathname + location.search;
      
      navigator.serviceWorker.controller.postMessage({
        type: 'STORE_ROUTE',
        route: currentRoute
      });
      
      // Store in sessionStorage as backup
      sessionStorage.setItem('lastRoute', currentRoute);
      
      // Mark that we should restore route on next load
      sessionStorage.setItem('shouldRestoreRoute', 'true');
      
      // Also store any API data that should be available offline
      const apiRequestsToCache = [
        '/api/workforce-programs', 
        '/api/platform-metrics'
      ];
      
      navigator.serviceWorker.controller.postMessage({
        type: 'CACHE_API_ROUTES',
        routes: apiRequestsToCache
      });
      
      console.log('Current route stored:', currentRoute);
    }

    // Setup listener for messages from service worker
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'CONNECTION_RESTORED') {
        setIsOffline(false);
        sessionStorage.setItem('offlineStatus', 'false');
      }
    };

    if (navigator.serviceWorker) {
      navigator.serviceWorker.addEventListener('message', handleMessage);
    }

    // Track refresh/reload through beforeunload event
    const handleBeforeUnload = () => {
      // Set flag to restore route on next load
      sessionStorage.setItem('shouldRestoreRoute', 'true');
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      if (navigator.serviceWorker) {
        navigator.serviceWorker.removeEventListener('message', handleMessage);
      }
    };
  }, [location.pathname, location.search, navigate]);

  return isOffline;
};

export default useOfflineStatus;
