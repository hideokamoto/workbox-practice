importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.0.0/workbox-sw.js');
if (workbox) {
  registerRoutes()
  initPrecaching()
} else {
  console.log('Oh, workbox did not load')
}

function initPrecaching() {
  workbox.precaching.precacheAndRoute([
    { url: '/scripts/app.js', revision: '383676' },
    { url: '/css/style.css', revision: '383676' },
    { url: '/index.html', revision: '383676' },
  ]);
}

function registerRoutes() {
  workbox.routing.registerRoute(
    new RegExp('.*\.js'),
    workbox.strategies.networkFirst()
  )
  workbox.routing.registerRoute(
    /.*\.css/,
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'css-cache',
    })
  )
  workbox.routing.registerRoute(
    /.*\.(?:png|jpg|jpeg|svg|gif)/,
    workbox.strategies.cacheFirst({
      cacheName: 'image-cache',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 20,
          maxAgeSeconds: 7 * 24 * 60 * 60,
        })
      ]
    })
  )
}
