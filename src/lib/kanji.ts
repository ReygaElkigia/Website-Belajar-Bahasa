"use client";

import { useSyncExternalStore } from "react";

/**
 * Kanji JLPT N5–N1. Daftar per level dari Jonathan Waller (tanos.co.uk), data
 * bacaan dan jumlah goresan dari KANJIDIC2, urutan goresan dari KanjiVG, contoh
 * kata dari JMdict; arti dalam bahasa Indonesia diterjemahkan oleh Tutur.
 * Rincian dan goresan dimuat per potongan (60 kanji) hanya saat dibutuhkan.
 */

import { CHUNK, type KanjiDetail, type KanjiLevel } from "@/data/kanji/meta";

export * from "@/data/kanji/meta";

const chunkCache = new Map<string, Promise<Record<string, KanjiDetail>>>();
const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function loadChunk(level: KanjiLevel, index: number) {
  const key = `${level}-${index}`;
  let p = chunkCache.get(key);
  if (!p) {
    p = fetch(`${BASE}/kanji/${level.toUpperCase()}-${index}.json`).then((r) => {
      if (!r.ok) throw new Error(`Gagal memuat data kanji (${r.status})`);
      return r.json();
    });
    p.catch(() => chunkCache.delete(key));
    chunkCache.set(key, p);
  }
  return p;
}

export async function loadDetail(level: KanjiLevel, position: number, kanji: string) {
  const chunk = await loadChunk(level, Math.floor(position / CHUNK));
  return chunk[kanji];
}

/* ---------- Kemajuan hafalan ---------- */

const KEY = "tutur:kanji:v1";
/** Skor per kanji: 0–3. Dianggap hafal mulai 2. */
type Store = Record<string, number>;
export const KNOWN_AT = 2;

let cache: Store | null = null;
const listeners = new Set<() => void>();

function read(): Store {
  if (cache) return cache;
  try {
    cache = JSON.parse(localStorage.getItem(KEY) || "{}") as Store;
  } catch {
    cache = {};
  }
  return cache;
}

function write(next: Store) {
  cache = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* penyimpanan penuh atau diblokir: tetap jalan di memori */
  }
  listeners.forEach((l) => l());
}

const EMPTY: Store = {};

export function useKanjiScores(): Store {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      const onStorage = (e: StorageEvent) => {
        if (e.key === KEY) {
          cache = null;
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
    () => EMPTY,
  );
}

export function setKnown(k: string, known: boolean) {
  const s = { ...read() };
  if (known) s[k] = 3;
  else delete s[k];
  write(s);
}

/** Jawaban kuis: benar menaikkan skor, salah mengembalikannya ke 0. */
export function recordAnswer(k: string, correct: boolean) {
  const s = { ...read() };
  s[k] = correct ? Math.min(3, (s[k] ?? 0) + 1) : 0;
  if (!s[k]) delete s[k];
  write(s);
}

export const isKnown = (scores: Store, k: string) => (scores[k] ?? 0) >= KNOWN_AT;
