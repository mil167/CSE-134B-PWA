var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  'hw4_login.html',
  'hw4_login.css',
  'hw4_home.html',
  'hw4_home.css',
  'hw4_confirm.html',
  'hw4_editgame.html',
  'hw4_editgame.css',
  'hw4_forgot.html',
  'hw4_forgot.css',
  'hw4_gamestats.html',
  'hw4_gamestats.css',
  'hw4_register.html',
  'hw4_schedule.html',
  'hw4_schedule.css',
  'main-roster.html',
  'main-roster.css',
  'main-roster.js',
  'data-roster.js',
  'manifest.json',
  'sw.js'
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