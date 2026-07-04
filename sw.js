const CACHE = 'odungi-v1';
self.addEventListener('install', (e) => {
  self.skipWaiting();
});
self.addEventListener('activate', (e) => {
  self.clients.claim();
});
self.addEventListener('fetch', (e) => {
  // 네트워크 우선, 실패 시 캐시 (오프라인 최소 지원)
  e.respondWith(
    fetch(e.request).then((res) => {
      const resClone = res.clone();
      caches.open(CACHE).then((cache) => cache.put(e.request, resClone));
      return res;
    }).catch(() => caches.match(e.request))
  );
});
