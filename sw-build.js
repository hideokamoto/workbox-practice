importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.0.0/workbox-sw.js');
if (workbox) {
  registerRoutes()
  initPrecaching()
} else {
  console.log('Oh, workbox did not load')
}

function initPrecaching() {
  workbox.precaching.precacheAndRoute([
  {
    "url": "css/style.css",
    "revision": "6dc8050a8cbd35afe5c81575f4bedef6"
  },
  {
    "url": "images/example.png",
    "revision": "0c48f4a717e32e5646b753d28c5e3756"
  },
  {
    "url": "index.html",
    "revision": "4845f76b0ee45f51a49cf658c6c3778a"
  },
  {
    "url": "scripts/app.js",
    "revision": "5c81403e5f5a9ca529a47d78051526b9"
  },
  {
    "url": "sw.js",
    "revision": "e04da3adc703b44803a0a5bd9d6782c2"
  },
  {
    "url": "workbox-config.js",
    "revision": "348cd7102c02098b5da00cec47330671"
  }
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
