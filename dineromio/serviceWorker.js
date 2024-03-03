/* SERVICE WORKER CON ESTRATEGIA NETWORK FIRST */

const staticDineromio = "Dineromio";
const assets = [
  "/",
  "/images/back.png",
  "/images/icon.png",
  "/js/app.js",
  "/index.html",
  "/manifest.json",
  "/serviceWorker.js",
  "/style.css"
];

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticDineromio).then(cache => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    // Intenta obtener la respuesta de la red primero
    fetch(fetchEvent.request).then(response => {
      // Clona la respuesta para que pueda ser utilizada por la red y la caché
      const responseClone = response.clone();

      // Abre la caché y almacena la respuesta clonada
      caches.open(staticDineromio).then(cache => {
        cache.put(fetchEvent.request, responseClone);
      });

      // Devuelve la respuesta original obtenida de la red
      return response;
    }).catch(() => {
      // Si la red falla, intenta obtener la respuesta de la caché
      return caches.match(fetchEvent.request);
    })
  );
});



/*

const staticMangos = "Mangos";
const assets = [
"/",
"/images/back.png",
"/images/icon.png",
"/js/app.js",
"/index.html",
"/manifest.json",
"/serviceWorker.js",
"/style.css"
];

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticMangos).then(cache => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request);
    })
  );
});

*/