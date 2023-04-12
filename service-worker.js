// 서비스 워커 설치
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('my-cache')
      .then(cache => cache.addAll([
        '/',
        '/index.html',
        '/style.css',
        '/script.js'
      ]))
  );
});

// 네트워크 요청 가로채기
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

// 서비스 워커 업데이트
self.addEventListener('activate', event => {
  const cacheWhitelist = ['my-cache'];
  event.waitUntil(
    caches.keys().then(cacheNames => Promise.all(
      cacheNames.map(cacheName => {
        if (!cacheWhitelist.includes(cacheName)) {
          return caches.delete(cacheName);
        }
      })
    ))
  );
});
