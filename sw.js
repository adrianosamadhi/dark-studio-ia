const CACHE_NAME = 'estudio-ia-pwa-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json'
];

// Instala o Service Worker e guarda os ficheiros em cache para funcionar offline
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Interceta os pedidos para permitir funcionamento offline e velocidade máxima
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // Devolve a versão em cache se existir
        }
        return fetch(event.request); // Vai buscar à internet se for algo novo
      })
  );
});