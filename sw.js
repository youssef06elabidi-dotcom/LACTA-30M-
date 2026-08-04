const CACHE_NAME = "lacta-jibal-v5";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "./images/m2_m10.jpg",
  "./images/m6_m7.jpg",
  "./images/v122.jpg",
  "./images/v159.jpg",
  "./images/v131.jpg",
  "./images/v143.jpg",
  "./images/v117.jpg",
  "./images/ft41.jpg",
  "./images/v193a.jpg"
  "./images/v117.jpg"
  "./images/v150.jpg"
  "./images/v151.jpg"
  "./images/v158.jpg"
  "./images/v160.jpg"
  "./images/v159.jpg"
  "./images/v103.jpg"
  "./images/v147.jpg"
  "./images/v161.jpg"
  "./images/v184.jpg"
  "./images/v240.jpg"
  "./images/v242.jpg"
  "./images/PT87.jpg"
  "./images/PT82.jpg"
  "./images/PT90.jpg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      const fetchPromise = fetch(event.request)
        .then((networkResponse) => {
          if (event.request.method === "GET" && networkResponse.ok) {
            const clone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return networkResponse;
        })
        .catch(() => cached);
      return cached || fetchPromise;
    })
  );
});
