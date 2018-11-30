var cacheName = "misPerris-v6";
var filesToCache = [
    "/",
    "/index.html",
    "/js/app.js",
    "/js/citySelector.js",
    "/js/modal.js",
    "/js/nav.js",
    "/js/slides.js",
    "/js/validarRut.js",
    "/css/main.css",
    "/imagenes/12.07.17_PuppyLab_Killian5.jpg",
    "/imagenes/D059BC4A-CCF3-4495-849ABBAFAED10456.jpg",
    "/imagenes/fb.jpg",
    "/imagenes/instagram.jpg",
    "/imagenes/logo.png",
    "/imagenes/twitter.jpg",
    "/imagenes/favicon.ico",
    "/imagenes/adoptados/Apolo.jpg",
    "/imagenes/adoptados/Duque.jpg",
    "/imagenes/adoptados/Tom.jpg",
];

self.addEventListener('install', function (e) {
    console.log('[ServiceWorker] Install');
    e.waitUntil(
        caches.open(cacheName).then(function (cache) {
            console.log('[ServiceWorker] Caching app shell');
            return cache.addAll(filesToCache);
        })
    );
});

self.addEventListener('activate', function (e) {
    console.log('[ServiceWorker] Activate');
    e.waitUntil(
        caches.keys().then(function (keyList) {
            return Promise.all(keyList.map(function (key) {
                if (key !== cacheName && key !== dataCacheName) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );
    return self.clients.claim();
});

self.addEventListener('fetch', function (e) {
    console.log('[Service Worker] Fetch', e.request.url);
    var dataUrl = 'http://localhost:8000/posts/';
    if (e.request.url.indexOf(dataUrl) > -1) {
        e.respondWith(
            caches.open(dataCacheName).then(function (cache) {
                return fetch(e.request).then(function (response) {
                    cache.put(e.request.url, response.clone());
                    return response;
                });
            })
        );
    } else {
        e.respondWith(
            caches.match(e.request).then(function (response) {
                return response || fetch(e.request);
            })
        );
    }
});