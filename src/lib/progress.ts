"use client";

import { useSyncExternalStore } from "react";

/**
 * Progres belajar disimpan di perangkat pengguna (localStorage).
 * Tidak ada akun, tidak ada server.
 */

export interface Card {
  /** Kotak Leitner 1..5. Kotak lebih tinggi = jarak ulang lebih lama. */
  box: number;
  due: number;
}

export interface ProgressState {
  done: Record<string, Record<string, number>>; // lang -> unit -> skor terbaik (0..100)
  cards: Record<string, Record<string, Card>>; // lang -> concept -> kartu
  days: string[]; // tanggal aktif, YYYY-MM-DD
  saved: Record<string, string[]>; // lang -> kata yang ditandai dari kamus
}

const KEY = "tutur:progress:v1";
const EMPTY: ProgressState = { done: {}, cards: {}, days: [], saved: {} };

/** Jarak ulang per kotak, dalam hari. */
export const BOX_DAYS = [0, 0, 1, 3, 7, 16];

let state: ProgressState = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

function read(): ProgressState {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as Partial<ProgressState>;
    return { ...EMPTY, ...parsed };
  } catch {
    return EMPTY;
  }
}

function ensureLoaded() {
  if (!loaded && typeof window !== "undefined") {
    state = read();
    loaded = true;
  }
}

function commit(next: ProgressState) {
  state = next;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* penyimpanan penuh atau diblokir: progres tetap berlaku untuk sesi ini */
  }
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) {
      state = read();
      cb();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}

export function useProgress(): ProgressState {
  return useSyncExternalStore(
    subscribe,
    () => {
      ensureLoaded();
      return state;
    },
    () => EMPTY,
  );
}

/** Baca progres saat ini di luar render (mis. di effect). */
export function getProgress(): ProgressState {
  ensureLoaded();
  return state;
}

export function today() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function withToday(s: ProgressState): ProgressState {
  const t = today();
  return s.days.includes(t) ? s : { ...s, days: [...s.days, t].slice(-400) };
}

export function completeUnit(lang: string, unit: string, score: number) {
  ensureLoaded();
  const prev = state.done[lang]?.[unit] ?? 0;
  commit(
    withToday({
      ...state,
      done: { ...state.done, [lang]: { ...state.done[lang], [unit]: Math.max(prev, score) } },
    }),
  );
}

export function reviewCard(lang: string, id: string, knew: boolean) {
  ensureLoaded();
  const deck = state.cards[lang] ?? {};
  const prev = deck[id] ?? { box: 1, due: 0 };
  const box = knew ? Math.min(prev.box + 1, 5) : 1;
  const due = Date.now() + BOX_DAYS[box] * 86_400_000;
  commit(withToday({ ...state, cards: { ...state.cards, [lang]: { ...deck, [id]: { box, due } } } }));
}

export function toggleSaved(lang: string, id: string) {
  ensureLoaded();
  const list = state.saved[lang] ?? [];
  const next = list.includes(id) ? list.filter((x) => x !== id) : [...list, id];
  commit({ ...state, saved: { ...state.saved, [lang]: next } });
}

export function resetProgress() {
  commit(EMPTY);
}

export function streak(days: string[]) {
  const set = new Set(days);
  let count = 0;
  const d = new Date();
  // Hari ini belum aktif tidak memutus runtunan kemarin.
  const key = (x: Date) =>
    `${x.getFullYear()}-${String(x.getMonth() + 1).padStart(2, "0")}-${String(x.getDate()).padStart(2, "0")}`;
  if (!set.has(key(d))) d.setDate(d.getDate() - 1);
  while (set.has(key(d))) {
    count++;
    d.setDate(d.getDate() - 1);
  }
  return count;
}

/** Skor minimal agar sebuah unit dianggap selesai. */
export const PASS = 70;

export function unitsDone(s: ProgressState, lang: string) {
  return Object.entries(s.done[lang] ?? {}).filter(([, score]) => score >= PASS).map(([u]) => u);
}

export function learnedCount(s: ProgressState, lang: string) {
  return Object.values(s.cards[lang] ?? {}).filter((c) => c.box >= 3).length;
}
