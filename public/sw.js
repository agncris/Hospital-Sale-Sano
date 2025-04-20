// Nombre de la caché
const CACHE_NAME = 'hospital-app-v1';

// Archivos a cachear inicialmente
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico',
  // Agrega aquí más recursos que desees cachear
];

// Evento de instalación - precachear recursos
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Caché abierta');
        return cache.addAll(urlsToCache);
      })
      .catch(error => {
        console.error('Error durante la instalación del service worker:', error);
      })
  );
  // Fuerza al service worker en espera a convertirse en el service worker activo
  self.skipWaiting();
});

// Evento de activación - limpiar cachés antiguas
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Eliminando caché antigua:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  // Toma el control de las páginas inmediatamente
  self.clients.claim();
});

// Evento fetch - responder con recursos cacheados cuando estén disponibles
self.addEventListener('fetch', (event) => {
  // Ignorar solicitudes que no sean GET o que sean de extensiones
  if (
    event.request.method !== 'GET' || 
    event.request.url.startsWith('chrome-extension:') ||
    event.request.url.includes('extension') ||
    event.request.url.includes('/_')
  ) {
    return;
  }

  // Para solicitudes de la API, usamos network-first
  if (event.request.url.includes('/api/')) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Clonamos la respuesta antes de ponerla en caché
          const responseToCache = response.clone();
          
          // Solo cachear respuestas válidas
          if (response.status === 200) {
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
          }
          
          return response;
        })
        .catch(() => {
          // Si la red falla, intentamos desde la caché
          return caches.match(event.request);
        })
    );
    return;
  }

  // Para otras solicitudes, usamos cache-first
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Si encontramos una coincidencia en la caché, la devolvemos
        if (response) {
          return response;
        }
        
        // De lo contrario, buscamos en la red
        return fetch(event.request)
          .then((response) => {
            // No cachear respuestas no válidas
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clonamos la respuesta para poder usarla tanto en la caché como en la respuesta
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return response;
          })
          .catch(error => {
            console.error('Error en fetch:', error);
            // Si hay un error en la red, podemos devolver una página offline personalizada
            // return caches.match('/offline.html');
          });
      })
  );
}); 