// Service Worker for OMGsystems - Updated for Next.js
const CACHE_NAME = 'omgsystems-v1.0.0';

// Install event - handle gracefully
self.addEventListener('install', function(event) {
  // Skip waiting to activate immediately
  self.skipWaiting();
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        // Only cache the root - let Next.js handle the rest
        return cache.addAll(['/']).catch(function(err) {
          // Silently fail - caching is optional
          return Promise.resolve();
        });
      })
      .catch(function(err) {
        // Silently fail
        return Promise.resolve();
      })
  );
});

// Fetch event - network first, fallback to cache
self.addEventListener('fetch', function(event) {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  // Skip Next.js internal routes
  if (event.request.url.includes('/_next/') || event.request.url.includes('/api/')) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then(function(response) {
        // Clone the response
        const responseToCache = response.clone();
        
        // Cache successful responses (only in production)
        if (response.status === 200 && response.type === 'basic') {
          caches.open(CACHE_NAME).then(function(cache) {
            cache.put(event.request, responseToCache).catch(() => {
              // Ignore cache errors
            });
          });
        }
        
        return response;
      })
      .catch(function() {
        // Fallback to cache if network fails
        return caches.match(event.request).then(function(response) {
          return response || fetch(event.request);
        });
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(function() {
      // Take control of all pages immediately
      return self.clients.claim();
    })
  );
});
