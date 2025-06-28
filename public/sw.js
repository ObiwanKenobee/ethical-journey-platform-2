
// Service Worker for Atlas
const CACHE_NAME = 'atlas-offline-v5';
const urlsToCache = [
  '/offline.html',
  '/favicon.ico',
  '/index.css',
  '/placeholder.svg'
];

// API routes that should be cached for offline use
const API_CACHE_NAME = 'atlas-api-cache-v1';
const apiRoutesToCache = [
  '/api/workforce-programs', 
  '/api/platform-metrics'
];

// Store the current navigation state to avoid unnecessary reloads
let currentRoute = '/';
let lastNavigationTimestamp = Date.now();

// Install the service worker and cache the static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
  // Force the waiting service worker to become the active service worker
  self.skipWaiting();
});

// Clean up old caches when a new service worker is activated
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME, API_CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  // Claim all clients so this service worker controls all pages immediately
  event.waitUntil(self.clients.claim());
});

// More robust connection status check
const checkNetworkAndReload = () => {
  // Use a timestamp to avoid caching
  fetch('/?timestamp=' + Date.now(), { 
    headers: { 'Cache-Control': 'no-cache' }
  })
    .then(response => {
      // If we get a successful response, notify all clients
      if (response.ok) {
        self.clients.matchAll().then(clients => {
          clients.forEach(client => {
            // Send message to client instead of automatically reloading
            client.postMessage({
              type: 'CONNECTION_RESTORED',
              timestamp: Date.now()
            });
          });
        });
      }
    })
    .catch(error => {
      // If fetch fails, connectivity is still down
      console.log('Still offline, will retry connection check:', error);
    });
};

// Periodic network check (every 60 seconds instead of 30)
setInterval(() => {
  if (navigator.onLine) {
    checkNetworkAndReload();
  }
}, 60000);

// Listen for the online event
self.addEventListener('online', () => {
  console.log('Network is back online');
  checkNetworkAndReload();
});

// Improved fetch handler for better offline experience and preventing unnecessary reloads
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // Check if this is an API request
  const isApiRequest = url.pathname.startsWith('/api/');
  
  // For navigation requests (HTML), we need to handle them specially
  if (event.request.mode === 'navigate') {
    event.respondWith(
      // Try the network first
      fetch(event.request)
        .then(response => {
          return response;
        })
        .catch(() => {
          // If network fails, try to get the requested URL from cache
          return caches.match(event.request)
            .then(cachedResponse => {
              if (cachedResponse) {
                return cachedResponse;
              }
              
              // If not in cache, check if we have a saved route
              const savedRoute = sessionStorage.getItem('lastRoute') || '/';
              if (savedRoute && savedRoute !== '/') {
                // Try to get the saved route from cache
                return caches.match(new Request(savedRoute))
                  .then(routeResponse => {
                    if (routeResponse) {
                      return routeResponse;
                    }
                    // As a last resort, serve the offline page
                    return caches.match('/offline.html');
                  });
              } else {
                // If no saved route, serve the offline page
                return caches.match('/offline.html');
              }
            });
        })
    );
    return;
  }
  
  // For API requests, use a dedicated cache
  if (isApiRequest) {
    event.respondWith(
      // Try the network first
      fetch(event.request)
        .then(response => {
          // Clone the response to store in cache
          const responseToCache = response.clone();
          
          // Only cache successful GET requests
          if (event.request.method === 'GET' && response.status === 200) {
            caches.open(API_CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
          }
          
          return response;
        })
        .catch(() => {
          // If fetch fails (offline), try to return from cache
          return caches.match(event.request);
        })
    );
    return;
  }
  
  // For non-navigation, non-API requests, use standard strategy
  if (!isApiRequest) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Clone the response to store in cache
          const responseToCache = response.clone();
          
          // Only cache GET requests that are successful
          if (event.request.method === 'GET' && response.status === 200) {
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
          }
          
          // Return the network response
          return response;
        })
        .catch(() => {
          // If fetch fails (offline), try to return from cache
          return caches.match(event.request)
            .then((response) => {
              if (response) {
                return response;
              }
              // If we can't fetch the resource and it's not in the cache
              return Promise.reject('No cached data available');
            });
        })
    );
  }
});

// Handle postMessage events from the main thread
self.addEventListener('message', (event) => {
  if (event.data) {
    // Store current route
    if (event.data.type === 'STORE_ROUTE') {
      currentRoute = event.data.route;
      console.log('Stored current route in SW:', currentRoute);
      
      // We also want to cache this route if possible
      if (currentRoute && currentRoute !== '/') {
        const routeUrl = new URL(currentRoute, self.location.origin).href;
        fetch(routeUrl)
          .then(response => {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(new Request(routeUrl), responseToCache);
            });
          })
          .catch(err => {
            console.log('Failed to cache route:', err);
          });
      }
    }
    
    // Cache API routes 
    if (event.data.type === 'CACHE_API_ROUTES' && event.data.routes) {
      const routes = event.data.routes;
      caches.open(API_CACHE_NAME)
        .then(cache => {
          routes.forEach(route => {
            const apiUrl = new URL(route, self.location.origin).href;
            fetch(apiUrl)
              .then(response => {
                cache.put(new Request(apiUrl), response);
                console.log('Cached API route:', apiUrl);
              })
              .catch(err => {
                console.log('Failed to cache API route:', err);
              });
          });
        });
    }
    
    // Check online status
    if (event.data.type === 'CHECK_ONLINE_STATUS') {
      checkNetworkAndReload();
    }
    
    // Cache specific resources on demand
    if (event.data.type === 'CACHE_RESOURCES' && event.data.resources) {
      caches.open(CACHE_NAME)
        .then(cache => {
          cache.addAll(event.data.resources);
        });
    }
  }
});
