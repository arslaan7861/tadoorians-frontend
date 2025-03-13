const CACHE_NAME = "tandoorians-v1";
const STATIC_ASSETS = ["/offline"];
self.addEventListener("install", (event) => {
  console.log("[SW] Installed");
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      await cache.addAll(STATIC_ASSETS);

      self.skipWaiting();
    })()
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
      await self.clients.claim();
      console.log("[SW] Activated & Old caches cleaned");
    })()
  );
});

// 📡 Network First with Cache Fallback + Cache Update
self.addEventListener("fetch", (event) => {
  const method = event.request.method; // e.g., 'GET', 'POST', etc.
  const url = event.request.url;
  if (method === "POST") return;
  event.respondWith(
    (async () => {
      try {
        const networkResponse = await fetch(event.request);
        // ✅ Clone & store the fresh response in cache
        const cache = await caches.open(CACHE_NAME);
        cache.put(event.request, networkResponse.clone());
        return networkResponse; // Serve network response
      } catch (error) {
        // 🔄 If offline or request fails, try cache
        const cachedResponse = await caches.match(event.request);
        if (cachedResponse) {
          return cachedResponse;
        } else if (event.request.mode === "navigate")
          return await caches.match("/offline");
        // ! If not in cache, return fallback
        return new Response("Network and Cache both failed.", {
          status: 503,
          statusText: "Service Unavailable",
        });
      }
    })()
  );
});

self.addEventListener("push", function (event) {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: data.icon || "/icon.png",
      badge: "/badge.png",
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: "2",
      },
    };
    event.waitUntil(self.registration.showNotification(data.title, options));
  }
});

self.addEventListener("notificationclick", function (event) {
  console.log("Notification click received.");
  event.notification.close();
  event.waitUntil(clients.openWindow("/"));
});
