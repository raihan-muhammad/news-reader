const CACHE_NAME = "firstpwa-v3";
const urlsToChace = [
  "./",
  "./nav.html",
  "./index.html",
  "./article.html",
  "./pages/home.html",
  "./pages/about.html",
  "./pages/contact.html",
  "./css/materialize.min.css",
  "./js/materialize.min.js",
  "./js/nav.js",
  "./js/api.js",
  "./icon.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToChace);
    })
  );
});

self.addEventListener("fetch", (event) => {
  const base_url = "https://readerapi.codepolitan.com/";
  if (event.request.url.indexOf(base_url) > -1) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return fetch(event.request).then((response) => {
          cache.put(event.request.url, response.clone());
          return response;
        });
      })
    );
  } else {
    event.respondWith(
      caches
        .match(event.request, { ignoreSearch: true })
        .then(function (response) {
          return response || fetch(event.request);
        })
    );
  }
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName != CACHE_NAME) {
            console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          } else {
            console.log("a");
          }
        })
      );
    })
  );
});
