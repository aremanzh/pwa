const staticCacheName = 'site-static-v2';
const dynamicCacheName = 'site-dynamic-v1';
const assets = ['/','index.html','pages/fallback.html','manifest.json','js/app.js','js/materialize.min.js','js/ui.js','img/dish.png','css/styles.css','css/materialize.min.css','img/icons/','https://fonts.gstatic.com/s/materialicons/v140/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2'];


// cache size limit function
const limitCacheSize = (name, size) => {
    caches.open(name).then(cache => {
        cache.keys().then(keys => {
            if(keys.length > size){
                cache.delete(keys[0]).then(limitCacheSize(name, size));
            }
        })
    })
}

// install service worker
self.addEventListener('install', evt => {
    evt.waitUntil(
        caches.open(staticCacheName).then(async (cache) => {
            console.log('Caching shell assets');
            try {
                await cache.addAll(assets);
                console.log('Assets cached successfully');
            } catch (error) {
                console.error('Error caching assets:', error);
            }
        })
    );
})

// activate service worker
self.addEventListener('activate', evt => {
    // console.log('service worker has been activated');
    evt.waitUntil(
        caches.keys().then(keys => {
            // console.log(keys);
            return Promise.all(keys
            .filter(key => key !== staticCacheName && key !== dynamicCacheName)
            .map(key => caches.delete(key))
            )
        })
    );
})

// fetch events
self.addEventListener('fetch', evt => {
    // evt.respondWith(
    //     caches.match(evt.request).then(async (cachesRes) => {
    //         try {
    //             return cachesRes || fetch(evt.request).then(async (fetchRes) => {
    //                 return caches.open(dynamicCacheName).then(cache => {
    //                     cache.put(evt.request.url, fetchRes.clone());
    //                     limitCacheSize(dynamicCacheName, 15);
    //                     return fetchRes;
    //                 });
    //             }); 
    //         } catch (error) {
    //             console.log('Error fetch cache asset: ', error);
    //         }
    //     }).catch(() => {
    //         if(evt.request.url.indexOf('.html') > -1) {
    //             return caches.match('/pages/fallback.html');
    //         }
    //     })
    // );
});