// I have no clue how service workers work but they are  a pain in the 
// ass to understand and test. Will come back to this later...
// Here are some resources:
// - https://developers.google.com/web/fundamentals/primers/service-workers/
// - https://redfin.engineering/service-workers-break-the-browsers-refresh-button-by-default-here-s-why-56f9417694

const { assets } = global.serviceWorkerOption;
const CACHE_NAME = new Date().toISOString();
let assetsToCache = [...assets, './'];
assetsToCache = assetsToCache.map(path => {
    return new URL(path, global.location).toString()
})
console.log('[SW] assetsToCache', assetsToCache)

self.addEventListener('install', event => {
    console.log('[SW] Install')
})

// After the install event.
self.addEventListener('activate', event => {
    console.log('[SW] Activate event')
})