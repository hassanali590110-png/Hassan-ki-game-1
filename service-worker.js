const CACHE_NAME = 'pong-game-v1';
const ASSETS = [
  '.',
  '/index.html',
  '/pong.html',
  '/profile.html',
  '/manifest.json',
  '/icons/icon-192.svg',
  '/icons/icon-512.svg',
  '/images-1/IMG_20241226_173417.jpg',
  '/images-1/IMG_20241226_173435.jpg',
  '/images-1/IMG_20241229_134503.jpg',
  '/images-1/IMG_20250123_095136.jpg',
  '/images-1/IMG_20250123_095143.jpg',
  '/images-2/IMG_20250123_095151.jpg',
  '/images-2/IMG_20250123_095759.jpg',
  '/images-2/IMG_20250123_095813.jpg',
  '/images-2/IMG_20250123_095916.jpg',
  '/images-2/IMG_20250123_095921.jpg',
  '/images-3/IMG_20250123_095953.jpg'
];

self.addEventListener('install', event => {
  console.log('[Service Worker] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[Service Worker] Caching assets');
      return cache.addAll(ASSETS);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  console.log('[Service Worker] Activating...');
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  // Cache first, then network fallback
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        // Don't cache non-successful responses
        if (!response || response.status !== 200 || response.type === 'error') {
          return response;
        }
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
        return response;
      }).catch(() => {
        // Fallback for offline
        if (event.request.mode === 'navigate') {
          return caches.match('/pong.html');
        }
        return caches.match('/index.html');
      });
    })
  );
});

