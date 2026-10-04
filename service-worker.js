const CACHE_NAME = "blubi-omrum-v4";

const FILES_TO_CACHE = [
    "./",
    "./index.html",
    "./style.css",
    "./script.js",
    "./manifest.json"
];


/* =========================
   INSTALACIÓN
========================= */

self.addEventListener("install", event => {

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(FILES_TO_CACHE);
            })
    );

    self.skipWaiting();
});


/* =========================
   ACTIVACIÓN
========================= */

self.addEventListener("activate", event => {

    event.waitUntil(

        caches.keys()
            .then(keys => {

                return Promise.all(

                    keys
                        .filter(key => key !== CACHE_NAME)
                        .map(key => caches.delete(key))

                );

            })
            .then(() => {

                return self.clients.claim();

            })

    );
});


/* =========================
   PETICIONES
========================= */

self.addEventListener("fetch", event => {

    const request = event.request;

    /*
       Para HTML, CSS y JS:
       primero intenta descargar la versión
       nueva desde GitHub Pages.
    */

    if (
        request.method === "GET" &&
        (
            request.destination === "document" ||
            request.destination === "script" ||
            request.destination === "style"
        )
    ) {

        event.respondWith(

            fetch(request)
                .then(response => {

                    if (response && response.ok) {

                        const responseClone =
                            response.clone();

                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(
                                    request,
                                    responseClone
                                );
                            });

                    }

                    return response;

                })
                .catch(() => {

                    return caches.match(request);

                })

        );

        return;
    }


    /*
       Para imágenes, fuentes, manifest, etc.:
       usamos caché primero y red como respaldo.
    */

    event.respondWith(

        caches.match(request)
            .then(cachedResponse => {

                return (
                    cachedResponse ||
                    fetch(request)
                );

            })

    );

});
