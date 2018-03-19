importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.0.0/workbox-sw.js');
if (workbox) {
  registerRoutes()
} else {
  console.log('Oh, workbox did not load')
}

function registerRoutes() {
  workbox.routing.registerRoute(
    new RegExp('.*\.js'),
    workbox.strategies.networkFirst()
  )
}
