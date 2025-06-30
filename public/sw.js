// Enhanced Service Worker for PWA with better caching strategy
const CACHE_NAME = 'jk-portfolio-v2.0.0';
const STATIC_CACHE_URLS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/assets/cv.png',
  '/assets/photo.jpg',
  '/assets/jayraj-kamalakar-cv.pdf'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('🔧 Service Worker: Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('📦 Service Worker: Caching static assets');
        return cache.addAll(STATIC_CACHE_URLS);
      })
      .then(() => {
        console.log('✅ Service Worker: Installation complete');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('❌ Service Worker: Installation failed', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('🚀 Service Worker: Activating...');
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log('🗑️ Service Worker: Deleting old cache', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('✅ Service Worker: Activation complete');
        return self.clients.claim();
      })
  );
});

// Enhanced fetch event with better caching strategy
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // Skip chrome-extension and other non-http requests
  if (!event.request.url.startsWith('http')) {
    return;
  }

  // Skip requests with cache-control: no-cache
  if (event.request.headers.get('cache-control') === 'no-cache') {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        // Return cached version if available
        if (cachedResponse) {
          console.log('📋 Serving from cache:', event.request.url);
          return cachedResponse;
        }

        // Otherwise fetch from network
        console.log('🌐 Fetching from network:', event.request.url);
        return fetch(event.request)
          .then((response) => {
            // Don't cache non-successful responses
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response
            const responseToCache = response.clone();

            // Cache the fetched response for future use
            caches.open(CACHE_NAME)
              .then((cache) => {
                // Only cache GET requests
                if (event.request.method === 'GET') {
                  cache.put(event.request, responseToCache);
                  console.log('💾 Cached:', event.request.url);
                }
              });

            return response;
          })
          .catch((error) => {
            console.error('🚫 Network fetch failed:', error);
            
            // Return offline page or fallback for document requests
            if (event.request.destination === 'document') {
              return caches.match('/') || new Response(
                '<!DOCTYPE html><html><head><title>Offline</title></head><body><h1>You are offline</h1><p>Please check your internet connection.</p></body></html>',
                { headers: { 'Content-Type': 'text/html' } }
              );
            }
            
            // For other requests, just throw the error
            throw error;
          });
      })
  );
});

// Background sync for offline functionality
self.addEventListener('sync', (event) => {
  console.log('🔄 Service Worker: Background sync triggered:', event.tag);
  
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // Perform background sync tasks here
      console.log('📡 Performing background sync...')
    );
  }
});

// Enhanced push notification handling
self.addEventListener('push', (event) => {
  console.log('📬 Service Worker: Push notification received');
  
  const options = {
    body: event.data ? event.data.text() : 'Check out the latest updates!',
    icon: '/assets/cv.png',
    badge: '/assets/cv.png',
    image: '/assets/photo.jpg',
    vibrate: [200, 100, 200, 100, 200],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 'portfolio-notification',
      url: '/'
    },
    actions: [
      {
        action: 'explore',
        title: '👀 View Portfolio',
        icon: '/assets/cv.png'
      },
      {
        action: 'contact',
        title: '📧 Contact Me',
        icon: '/assets/cv.png'
      },
      {
        action: 'close',
        title: '✕ Close',
        icon: '/assets/cv.png'
      }
    ],
    requireInteraction: false,
    silent: false,
    tag: 'portfolio-update'
  };

  event.waitUntil(
    self.registration.showNotification('🚀 JK Portfolio', options)
  );
});

// Enhanced notification click handling
self.addEventListener('notificationclick', (event) => {
  console.log('🔔 Service Worker: Notification clicked', event.action);
  event.notification.close();

  let targetUrl = '/';
  
  switch (event.action) {
    case 'explore':
      targetUrl = '/';
      break;
    case 'contact':
      targetUrl = '/#contact';
      break;
    case 'close':
      return; // Just close the notification
    default:
      targetUrl = event.notification.data?.url || '/';
  }

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then((clientList) => {
        // Check if there's already a window/tab open with the target URL
        for (const client of clientList) {
          if (client.url === targetUrl && 'focus' in client) {
            return client.focus();
          }
        }
        
        // If no existing window/tab, open a new one
        if (clients.openWindow) {
          return clients.openWindow(targetUrl);
        }
      })
  );
});

// Handle notification close
self.addEventListener('notificationclose', (event) => {
  console.log('🔕 Service Worker: Notification closed');
  
  // Optional: Track notification close events
  // You could send analytics data here
});

// Message handling for communication with main thread
self.addEventListener('message', (event) => {
  console.log('💬 Service Worker: Message received', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_NAME });
  }
});

// Error handling
self.addEventListener('error', (event) => {
  console.error('💥 Service Worker: Error occurred', event.error);
});

self.addEventListener('unhandledrejection', (event) => {
  console.error('💥 Service Worker: Unhandled promise rejection', event.reason);
});

console.log('🎯 Service Worker: Script loaded successfully');