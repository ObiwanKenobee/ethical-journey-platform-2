
import React from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
import './index.css';

const helmetContext = {};

// Function to register and handle service worker with improved reliability
const registerServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('ServiceWorker registration successful with scope: ', registration.scope);
          
          // Check for updates to the service worker
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            
            // When the new worker is installed, notify the user but don't auto reload
            newWorker?.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                console.log('New service worker installed, updates are ready');
                // Show a notification to the user about the update instead of auto reload
                if ('Notification' in window && Notification.permission === 'granted') {
                  new Notification('Vought International', { 
                    body: 'A new version is available. Refresh to update.'
                  });
                }
              }
            });
          });
        })
        .catch(error => {
          console.log('ServiceWorker registration failed: ', error);
        });
      
      // Setup message listener for service worker messages
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'CONNECTION_RESTORED') {
          console.log('Connection restored at:', new Date(event.data.timestamp));
          
          // Display a toast or notification instead of auto reloading
          if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('Vought International', { 
              body: 'Connection restored. New content available.'
            });
          }
        }
      });
    });

    // Listen for connectivity changes
    window.addEventListener('online', () => {
      console.log('Browser is online, checking for updates...');
      
      // Notify service worker about online status
      if (navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({
          type: 'CHECK_ONLINE_STATUS'
        });
      }
      
      // Display the online status to the user but don't auto reload
      if (document.getElementById('offline-indicator')) {
        document.getElementById('offline-indicator')!.style.display = 'none';
      }
    });
    
    // Handle offline status
    window.addEventListener('offline', () => {
      console.log('Browser is offline');
      
      // Display the offline status to the user
      if (!document.getElementById('offline-indicator')) {
        const offlineIndicator = document.createElement('div');
        offlineIndicator.id = 'offline-indicator';
        offlineIndicator.style.position = 'fixed';
        offlineIndicator.style.bottom = '10px';
        offlineIndicator.style.right = '10px';
        offlineIndicator.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        offlineIndicator.style.color = 'white';
        offlineIndicator.style.padding = '10px 15px';
        offlineIndicator.style.borderRadius = '5px';
        offlineIndicator.style.zIndex = '9999';
        offlineIndicator.textContent = 'You are offline. Some features may be limited.';
        document.body.appendChild(offlineIndicator);
      } else {
        document.getElementById('offline-indicator')!.style.display = 'block';
      }
    });
    
    // Cache important resources for offline use
    if (navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        type: 'CACHE_RESOURCES',
        resources: [
          '/',
          '/index.html',
          '/about',
          '/platform',
          '/pricing',
          '/impact'
        ]
      });
    }
  }
  
  // Request notification permission
  if ('Notification' in window && Notification.permission !== 'granted' && Notification.permission !== 'denied') {
    // Wait for user interaction before requesting permission
    document.addEventListener('click', function requestPermission() {
      Notification.requestPermission();
      document.removeEventListener('click', requestPermission);
    });
  }
};

// Register the service worker
registerServiceWorker();

// Create a function to warn users when they attempt to leave the page with unsaved changes
window.onbeforeunload = function(e) {
  // Only trigger this when the app sets a flag indicating unsaved changes
  if (window.hasUnsavedChanges) {
    // Standard message for modern browsers
    const message = 'You have unsaved changes. Are you sure you want to leave?';
    e.returnValue = message;
    return message;
  }
};

// Add event listener for page visibility changes to handle tab focus
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible' && navigator.onLine) {
    console.log('Page became visible and online, checking for updates');
    if (navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        type: 'CHECK_ONLINE_STATUS'
      });
    }
  }
});

// Create a global function for components to mark unsaved changes
window.setUnsavedChanges = (hasChanges) => {
  window.hasUnsavedChanges = hasChanges;
};

// Add missing TypeScript declarations
declare global {
  interface Window {
    hasUnsavedChanges?: boolean;
    setUnsavedChanges?: (hasChanges: boolean) => void;
  }
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider context={helmetContext}>
      <App />
    </HelmetProvider>
  </React.StrictMode>
);
