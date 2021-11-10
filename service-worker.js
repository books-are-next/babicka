/* global self, caches, fetch */
/* eslint-disable no-restricted-globals */

const CACHE = 'cache-44a365c';

self.addEventListener('install', e => {
  e.waitUntil(precache()).then(() => self.skipWaiting());
});

self.addEventListener('activate', event => {
  self.clients
    .matchAll({
      includeUncontrolled: true,
    })
    .then(clientList => {
      const urls = clientList.map(client => client.url);
      console.log('[ServiceWorker] Matching clients:', urls.join(', '));
    });

  event.waitUntil(
    caches
      .keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE) {
              console.log('[ServiceWorker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
            return null;
          })
        )
      )
      .then(() => {
        console.log('[ServiceWorker] Claiming clients for version', CACHE);
        return self.clients.claim();
      })
  );
});

function precache() {
  return caches.open(CACHE).then(cache => cache.addAll(["./","./babicka_001.html","./babicka_002.html","./babicka_008.html","./babicka_009.html","./babicka_010.html","./babicka_011.html","./babicka_012.html","./babicka_013.html","./babicka_014.html","./babicka_015.html","./babicka_016.html","./babicka_017.html","./babicka_018.html","./babicka_019.html","./babicka_020.html","./babicka_021.html","./babicka_022.html","./babicka_023.html","./babicka_024.html","./babicka_025.html","./babicka_026.html","./babicka_027.html","./favicon.png","./index.html","./colophon.html","./manifest.json","./resources.html","./resources/image001_fmt.jpeg","./resources/image003_fmt.jpeg","./resources/image004_fmt.jpeg","./resources/index.xml","./resources/obalka_babicka2_fmt.jpeg","./resources/upoutavka_eknihy_fmt.jpeg","./scripts/bundle.js","./style/style.min.css"]));
}

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.open(CACHE).then(cache => {
      return cache.match(e.request).then(matching => {
        if (matching) {
          console.log('[ServiceWorker] Serving file from cache.');
          console.log(e.request);
          return matching;
        }

        return fetch(e.request);
      });
    })
  );
});
