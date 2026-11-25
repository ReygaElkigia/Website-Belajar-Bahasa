/* Service worker Tutur.
 * - Kerangka aplikasi disimpan saat dipasang.
 * - Halaman: jaringan dulu, lalu cache, lalu halaman offline.
 * - Aset _next, font, ikon: cache dulu (namanya sudah berversi).
 * - Rekaman Wikimedia yang pernah diputar disimpan agar bisa didengar offline.
 * - Pengingat harian lewat Periodic Background Sync (bila peramban mendukung).
 * VERSION diganti oleh scripts/postbuild.mjs setiap build.
 */
const VERSION = "__BUILD__";
const SHELL = `tutur-shell-${VERSION}`;
const PAGES = "tutur-pages";
const ASSETS = "tutur-assets";
const AUDIO = "tutur-audio";
const META = "tutur-meta";
const BASE = new URL(self.registration.scope).pathname; // mis. "/Website-Belajar-Bahasa/"

const SHELL_URLS = ["", "offline/", "manifest.webmanifest", "icons/icon-192.png", "icons/icon-512.png"].map((p) => BASE + p);

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(SHELL)
      .then((c) => c.addAll(SHELL_URLS))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith("tutur-shell-") && k !== SHELL).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

async function trimCache(name, max) {
  const c = await caches.open(name);
  const keys = await c.keys();
  for (let i = 0; i < keys.length - max; i++) await c.delete(keys[i]);
}

async function networkFirst(req, cacheName) {
  const cache = await caches.open(cacheName);
  try {
    const res = await fetch(req);
    if (res.ok && !res.redirected) cache.put(req, res.clone());
    return res;
  } catch {
    const hit = (await cache.match(req, { ignoreSearch: true })) || (await caches.match(req, { ignoreSearch: true }));
    if (hit) return hit;
    if (req.mode === "navigate") return (await caches.match(BASE + "offline/")) || Response.error();
    return Response.error();
  }
}

async function cacheFirst(req, cacheName, max) {
  const hit = await caches.match(req, { ignoreSearch: cacheName === AUDIO });
  if (hit) return hit;
  const res = await fetch(req);
  if (res.ok || res.type === "opaque") {
    const c = await caches.open(cacheName);
    c.put(req, res.clone());
    if (max) trimCache(cacheName, max);
  }
  return res;
}

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  if (url.hostname === "upload.wikimedia.org") {
    event.respondWith(cacheFirst(req, AUDIO, 600));
    return;
  }
  if (url.origin !== self.location.origin || !url.pathname.startsWith(BASE)) return;

  if (url.pathname.includes("/_next/static/") || url.pathname.includes("/icons/")) {
    event.respondWith(cacheFirst(req, ASSETS));
    return;
  }
  // Halaman HTML dan muatan RSC (index.txt) untuk navigasi di dalam aplikasi.
  if (req.mode === "navigate" || url.pathname.endsWith(".txt") || url.searchParams.has("_rsc")) {
    event.respondWith(networkFirst(req, PAGES));
  }
});

/* ---------- Pengingat ---------- */

async function readMeta() {
  const c = await caches.open(META);
  const res = await c.match(BASE + "__meta__");
  return res ? res.json() : {};
}

function localDate() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

async function maybeRemind() {
  const m = await readMeta();
  if (!m.reminders) return;
  const today = localDate();
  if (m.lastActive === today || m.lastReminded === today) return;
  const body = m.due > 0 ? `${m.due} kata menunggu diulang. Lima menit saja sudah cukup!` : "Jaga runtunan belajarmu hari ini bersama Tuu!";
  await self.registration.showNotification("Waktunya belajar di Tutur", {
    body,
    icon: BASE + "icons/icon-192.png",
    badge: BASE + "icons/icon-192.png",
    tag: "tutur-reminder",
    data: { url: BASE + "latihan/" },
  });
  const c = await caches.open(META);
  await c.put(BASE + "__meta__", new Response(JSON.stringify({ ...m, lastReminded: today })));
}

self.addEventListener("periodicsync", (event) => {
  if (event.tag === "tutur-reminder") event.waitUntil(maybeRemind());
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const target = event.notification.data?.url || BASE;
  event.waitUntil(
    self.clients.matchAll({ type: "window" }).then((list) => {
      for (const w of list) if ("focus" in w) return w.navigate(target).then((x) => x?.focus());
      return self.clients.openWindow(target);
    }),
  );
});
