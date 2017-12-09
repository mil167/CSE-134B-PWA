var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  'hw4_login.html',
  'hw4_login.min.css',
  'hw4_home.html',
  'hw4_home.min.css',
  'hw4_confirm.html',
  'hw4_editgame.html',
  'hw4_editgame.min.css',
  'hw4_forgot.html',
  'hw4_forgot.min.css',
  'hw4_gamestats.html',
  'hw4_gamestats.min.css',
  'hw4_register.html',
  'hw4_schedule.html',
  'hw4_schedule.min.css',
  'main-roster.html',
  'main-roster.min.css',
  'main-roster.min.js',
  'data-roster.min.js',
  'manifest.json',
  'icon_4x.png',
  'icon_2x.png',
  'icon_1x.png',
  'icon-splash.png'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});