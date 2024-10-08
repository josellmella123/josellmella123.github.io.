const CACHE_NAME = 'toma-bonito-v1';
const assets = [
  '/',
  '/index.html',
  '/css/estilo.css',
  '/js/script.js',
  '/image/fondo.jpeg',
  '/image/icono.png',
  '/sonido/ruleta.mp3',
  // Asegúrate de incluir todas las páginas HTML adicionales
  '/jugadores.html',
  '/trivia.html',
  '/queprefieres.html',
  '/caracteristicas.html',
  '/retosyjuegos.html',
  '/goats.html',
  // Agrega aquí cualquier otro recurso que tu app necesite
];

// Instalación del Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(assets);
      })
      .catch(err => console.error('Error caching assets:', err))
  );
});

// Activación del Service Worker
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Estrategia de cache: Network First, fallback to cache
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Si la respuesta es válida, clonamos y guardamos en cache
        if (response && response.status === 200) {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });
        }
        return response;
      })
      .catch(() => {
        // Si falla la red, intentamos con el cache
        return caches.match(event.request)
          .then(response => {
            if (response) {
              return response;
            }
            // Si no está en cache y no hay red, podríamos retornar una página de fallback
            if (event.request.mode === 'navigate') {
              return caches.match('/offline.html');
            }
            // Para otros recursos, simplemente fallamos
            return new Response('Not available offline');
          });
      })
  );
});

// Manejo de notificaciones push (si las usas)
self.addEventListener('push', event => {
  if (event.data) {
    const options = {
      body: event.data.text(),
      icon: '/image/icono.png',
      badge: '/image/badge.png'
    };
    
    event.waitUntil(
      self.registration.showNotification('Toma Bonito', options)
    );
  }
});

// Manejo de clicks en notificaciones
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/')
  );
});
