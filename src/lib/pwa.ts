"use client";

/** Utilitas PWA: service worker, simpan offline per bahasa, pengingat, dan pemasangan. */

export const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";
const PAGES = "tutur-pages";
const ASSETS = "tutur-assets";
const META = "tutur-meta";
const SAVED_KEY = "tutur:offline:v1";

export const supportsSW = () => typeof navigator !== "undefined" && "serviceWorker" in navigator;

export function registerServiceWorker() {
  if (!supportsSW() || process.env.NODE_ENV !== "production") return;
  navigator.serviceWorker.register(`${BASE}/sw.js`, { scope: `${BASE}/` }).catch(() => undefined);
}

/* ---------- Simpan bahasa untuk offline ---------- */

interface OfflineManifest {
  version: string;
  languages: Record<string, { files: string[]; bytes: number }>;
}

let manifestPromise: Promise<OfflineManifest | null> | null = null;
export function offlineManifest() {
  manifestPromise ??= fetch(`${BASE}/offline-manifest.json`)
    .then((r) => (r.ok ? (r.json() as Promise<OfflineManifest>) : null))
    .catch(() => null);
  return manifestPromise;
}

export function savedLanguages(): Record<string, { version: string; at: number }> {
  try {
    return JSON.parse(localStorage.getItem(SAVED_KEY) || "{}");
  } catch {
    return {};
  }
}

function markSaved(slug: string, version: string | null) {
  const s = savedLanguages();
  if (version) s[slug] = { version, at: Date.now() };
  else delete s[slug];
  try {
    localStorage.setItem(SAVED_KEY, JSON.stringify(s));
  } catch {
    /* abaikan */
  }
}

/**
 * Unduh semua halaman satu bahasa (unit, huruf, ujian) beserta asetnya ke
 * cache yang sama dengan yang dibaca service worker.
 */
export async function saveLanguageOffline(slug: string, onProgress: (done: number, total: number) => void) {
  const m = await offlineManifest();
  const entry = m?.languages[slug];
  if (!m || !entry) throw new Error("Daftar berkas offline tidak tersedia.");
  const pages = await caches.open(PAGES);
  const assets = await caches.open(ASSETS);
  let done = 0;
  const queue = [...entry.files];
  const worker = async () => {
    while (queue.length) {
      const rel = queue.shift()!;
      const isPage = rel.endsWith(".html") || rel.endsWith(".txt");
      // Halaman disimpan dengan URL foldernya juga ("/bahasa/jepang/"), seperti saat dinavigasi.
      const url = `${BASE}/${rel}`;
      // Halaman diambil lewat URL foldernya, karena sebagian server mengalihkan
      // ".../index.html" ke ".../", dan respons hasil pengalihan ditolak saat navigasi.
      const fetchUrl = rel.endsWith("index.html") ? url.slice(0, -"index.html".length) : url;
      try {
        const res = await fetch(fetchUrl, { cache: "no-cache" });
        if (res.ok) {
          const cache = isPage ? pages : assets;
          const body = await res.blob();
          const clean = () => new Response(body, { status: 200, headers: res.headers });
          await cache.put(fetchUrl, clean());
          if (fetchUrl !== url) await cache.put(url, clean());
        }
      } catch {
        /* lanjutkan berkas lain */
      }
      onProgress(++done, entry.files.length);
    }
  };
  await Promise.all([worker(), worker(), worker(), worker()]);
  markSaved(slug, m.version);
  return entry.bytes;
}

export async function removeLanguageOffline(slug: string) {
  const m = await offlineManifest();
  const entry = m?.languages[slug];
  if (entry) {
    const pages = await caches.open(PAGES);
    await Promise.all(
      entry.files
        .filter((f) => f.startsWith(`bahasa/${slug}/`))
        .flatMap((f) => [pages.delete(`${BASE}/${f}`), pages.delete(`${BASE}/${f.replace(/index\.html$/, "")}`)]),
    );
  }
  markSaved(slug, null);
}

/* ---------- Pengingat ---------- */

export async function writeReminderMeta(data: { reminders?: boolean; lastActive?: string; due?: number }) {
  if (typeof caches === "undefined") return;
  const c = await caches.open(META);
  const key = `${BASE}/__meta__`;
  const prev = await c.match(key).then((r) => (r ? r.json() : {})).catch(() => ({}));
  await c.put(key, new Response(JSON.stringify({ ...prev, ...data })));
}

export function remindersSupported() {
  return typeof window !== "undefined" && "Notification" in window && supportsSW();
}

export async function enableReminders(): Promise<"on" | "denied" | "unsupported" | "in-app"> {
  if (!remindersSupported()) return "unsupported";
  const perm = await Notification.requestPermission();
  if (perm !== "granted") return "denied";
  await writeReminderMeta({ reminders: true });
  const reg = (await navigator.serviceWorker.ready) as ServiceWorkerRegistration & {
    periodicSync?: { register: (tag: string, o: { minInterval: number }) => Promise<void> };
  };
  if (reg.periodicSync) {
    try {
      await reg.periodicSync.register("tutur-reminder", { minInterval: 12 * 3600 * 1000 });
      return "on";
    } catch {
      return "in-app";
    }
  }
  return "in-app";
}

export async function disableReminders() {
  await writeReminderMeta({ reminders: false });
  const reg = (await navigator.serviceWorker?.ready) as
    | (ServiceWorkerRegistration & { periodicSync?: { unregister: (tag: string) => Promise<void> } })
    | undefined;
  await reg?.periodicSync?.unregister("tutur-reminder").catch(() => undefined);
}

/* ---------- Pemasangan ---------- */

export interface InstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

let deferred: InstallPromptEvent | null = null;
const installListeners = new Set<() => void>();

if (typeof window !== "undefined") {
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferred = e as InstallPromptEvent;
    installListeners.forEach((l) => l());
  });
  window.addEventListener("appinstalled", () => {
    deferred = null;
    installListeners.forEach((l) => l());
  });
}

export const canPromptInstall = () => !!deferred;
export const onInstallChange = (cb: () => void) => {
  installListeners.add(cb);
  return () => {
    installListeners.delete(cb);
  };
};

export async function promptInstall() {
  if (!deferred) return false;
  await deferred.prompt();
  const { outcome } = await deferred.userChoice;
  deferred = null;
  installListeners.forEach((l) => l());
  return outcome === "accepted";
}

export function isStandalone() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(display-mode: standalone)").matches || (navigator as Navigator & { standalone?: boolean }).standalone === true;
}

export function isIos() {
  if (typeof navigator === "undefined") return false;
  return /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
}
