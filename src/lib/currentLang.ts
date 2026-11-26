"use client";

import { useSyncExternalStore } from "react";

/** Bahasa yang sedang dipelajari: diingat dari halaman bahasa terakhir yang dibuka. */

export interface LangMeta {
  slug: string;
  name: string;
  native: string;
  glyph: string;
  tts: string;
}

const KEY = "tutur:lang:v1";
const listeners = new Set<() => void>();
let cache: string | null | undefined;

function read(): string | null {
  if (cache !== undefined) return cache;
  try {
    cache = localStorage.getItem(KEY);
  } catch {
    cache = null;
  }
  return cache;
}

export function setCurrentLang(slug: string) {
  if (read() === slug) return;
  cache = slug;
  try {
    localStorage.setItem(KEY, slug);
  } catch {
    /* abaikan */
  }
  listeners.forEach((l) => l());
}

export function useCurrentLang(): string | null {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      const onStorage = (e: StorageEvent) => {
        if (e.key === KEY) {
          cache = e.newValue;
          cb();
        }
      };
      window.addEventListener("storage", onStorage);
      return () => {
        listeners.delete(cb);
        window.removeEventListener("storage", onStorage);
      };
    },
    read,
    () => null,
  );
}

/** Slug bahasa dari alamat halaman, mis. /bahasa/jepang/salam/ menjadi "jepang". */
export function slugFromPath(path: string | null | undefined): string | null {
  const m = /^\/bahasa\/([^/]+)/.exec(path ?? "");
  return m ? m[1] : null;
}
