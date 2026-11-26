"use client";

import { useSyncExternalStore } from "react";
import { BADGES, XP, levelInfo, type BadgeFacts } from "@/data/gamify";
import { units } from "@/data/curriculum";

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
  exams: Record<string, Record<string, number>>; // ujian -> bagian -> skor terbaik (0..100)
  xp: number; // total XP
  xpDays: Record<string, number>; // tanggal -> XP hari itu
  badges: string[]; // lencana yang sudah didapat
  goal: number; // target XP harian
  reviews: number; // jumlah kartu hafalan yang pernah diulang
  reads: Record<string, Record<string, number>>; // lang -> bacaan -> skor terbaik (0..100)
  path: Record<string, Record<string, PathNode>>; // lang -> "unit:n" -> hasil pelajaran jalur
  hearts: { n: number; at: number }; // nyawa jalur belajar dan waktu terakhir terisi
  relaxed: boolean; // mode santai: tanpa batas hati
}

export interface PathNode {
  stars: number; // 1..3
  best: number; // akurasi terbaik 0..100
  times: number;
}

export const MAX_HEARTS = 5;
export const HEART_MS = 30 * 60_000;

const KEY = "tutur:progress:v1";
const EMPTY: ProgressState = {
  done: {},
  cards: {},
  days: [],
  saved: {},
  exams: {},
  xp: 0,
  xpDays: {},
  badges: [],
  goal: 50,
  reviews: 0,
  reads: {},
  path: {},
  hearts: { n: MAX_HEARTS, at: 0 },
  relaxed: false,
};

/* ---------- Peristiwa permainan (untuk maskot dan notifikasi) ---------- */

export type GameEvent =
  | { type: "xp"; amount: number; reason: string; lang?: string }
  | { type: "level"; level: number; title: string }
  | { type: "badge"; id: string }
  | { type: "goal"; goal: number };

const gameListeners = new Set<(e: GameEvent) => void>();

export function onGameEvent(cb: (e: GameEvent) => void) {
  gameListeners.add(cb);
  return () => {
    gameListeners.delete(cb);
  };
}

function emit(events: GameEvent[]) {
  events.forEach((e) => gameListeners.forEach((l) => l(e)));
}

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

export function badgeFacts(s: ProgressState): BadgeFacts {
  const langs = Object.keys(s.done);
  const passed = langs.map((l) => Object.values(s.done[l]).filter((x) => x >= PASS).length);
  return {
    unitsPassed: passed.reduce((a, b) => a + b, 0),
    languagesWithUnit: passed.filter((n) => n > 0).length,
    fullLanguage: passed.some((n) => n >= units.length),
    perfectUnit: langs.some((l) => Object.values(s.done[l]).some((x) => x >= 100)),
    wordsLearned: Object.keys(s.cards).reduce((n, l) => n + learnedCount(s, l), 0),
    cardsReviewed: s.reviews,
    examParts: Object.values(s.exams).reduce((n, e) => n + Object.keys(e).length, 0),
    readingsB1: Object.values(s.reads).filter((r) => (r.rina ?? 0) >= PASS).length,
    readingsPassed: Object.values(s.reads).reduce((n, r) => n + Object.values(r).filter((x) => x >= PASS).length, 0),
    streak: streak(s.days),
    goalDays: Object.values(s.xpDays).filter((x) => x >= s.goal).length,
    level: levelInfo(s.xp).level,
  };
}

/** Terapkan perubahan progres plus XP, lalu kirim peristiwa naik level, target, dan lencana. */
function commitWithXp(next: ProgressState, amount: number, reason: string, lang?: string) {
  const t = today();
  const before = state;
  let s = withToday(next);
  const events: GameEvent[] = [];
  if (amount > 0) {
    s = { ...s, xp: s.xp + amount, xpDays: { ...s.xpDays, [t]: (s.xpDays[t] ?? 0) + amount } };
    events.push({ type: "xp", amount, reason, lang });
    const l0 = levelInfo(before.xp);
    const l1 = levelInfo(s.xp);
    if (l1.level > l0.level) events.push({ type: "level", level: l1.level, title: l1.title });
    if ((before.xpDays[t] ?? 0) < s.goal && s.xpDays[t] >= s.goal) events.push({ type: "goal", goal: s.goal });
  }
  const facts = badgeFacts(s);
  const fresh = BADGES.filter((b) => !s.badges.includes(b.id) && b.test(facts)).map((b) => b.id);
  if (fresh.length) {
    s = { ...s, badges: [...s.badges, ...fresh] };
    fresh.forEach((id) => events.push({ type: "badge", id }));
  }
  commit(s);
  emit(events);
}

/** XP untuk aksi kecil, mis. jawaban benar. */
export function gainXp(amount: number, reason: string, lang?: string) {
  ensureLoaded();
  commitWithXp(state, amount, reason, lang);
}

export function setGoal(goal: number) {
  ensureLoaded();
  commit({ ...state, goal });
}

export function completeUnit(lang: string, unit: string, score: number) {
  ensureLoaded();
  const prev = state.done[lang]?.[unit] ?? 0;
  let bonus = 0;
  if (score >= PASS && prev < PASS) bonus += XP.unitPass;
  if (score >= 100 && prev < 100) bonus += XP.perfect;
  commitWithXp(
    { ...state, done: { ...state.done, [lang]: { ...state.done[lang], [unit]: Math.max(prev, score) } } },
    bonus,
    score >= 100 ? "Unit sempurna" : "Unit lulus",
    lang,
  );
}

export function saveExamPart(exam: string, part: string, score: number, lang?: string) {
  ensureLoaded();
  const first = state.exams[exam]?.[part] === undefined;
  const prev = state.exams[exam]?.[part] ?? 0;
  commitWithXp(
    { ...state, exams: { ...state.exams, [exam]: { ...state.exams[exam], [part]: Math.max(prev, score) } } },
    first ? XP.examPart : 0,
    "Bagian ujian selesai",
    lang,
  );
}

/** Menyelesaikan soal pemahaman bacaan bertingkat. Bonus hanya saat pertama kali lulus. */
export function completeReading(lang: string, id: string, score: number) {
  ensureLoaded();
  const prev = state.reads[lang]?.[id] ?? 0;
  commitWithXp(
    { ...state, reads: { ...state.reads, [lang]: { ...state.reads[lang], [id]: Math.max(prev, score) } } },
    score >= PASS && prev < PASS ? XP.reading : 0,
    "Bacaan selesai",
    lang,
  );
}

export function reviewCard(lang: string, id: string, knew: boolean) {
  ensureLoaded();
  const deck = state.cards[lang] ?? {};
  const prev = deck[id] ?? { box: 1, due: 0 };
  const box = knew ? Math.min(prev.box + 1, 5) : 1;
  const due = Date.now() + BOX_DAYS[box] * 86_400_000;
  commitWithXp(
    { ...state, reviews: state.reviews + 1, cards: { ...state.cards, [lang]: { ...deck, [id]: { box, due } } } },
    knew ? XP.cardKnew : XP.cardAgain,
    "Kartu hafalan",
    lang,
  );
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

/* ---------- Jalur belajar: hati dan pelajaran ---------- */

/** Hati saat ini setelah diisi ulang otomatis satu per 30 menit. */
export function heartsNow(s: ProgressState, now = Date.now()) {
  const h = s.hearts ?? { n: MAX_HEARTS, at: 0 };
  if (h.n >= MAX_HEARTS) return { n: MAX_HEARTS, next: 0 };
  const gained = Math.floor((now - h.at) / HEART_MS);
  const n = Math.min(MAX_HEARTS, h.n + Math.max(0, gained));
  const next = n >= MAX_HEARTS ? 0 : h.at + (gained + 1) * HEART_MS;
  return { n, next };
}

export function loseHeart() {
  ensureLoaded();
  if (state.relaxed) return;
  const now = Date.now();
  const cur = heartsNow(state, now);
  const n = Math.max(0, cur.n - 1);
  // Penghitung isi ulang dimulai dari hati pertama yang hilang.
  const at = cur.n >= MAX_HEARTS ? now : cur.next - HEART_MS;
  commit({ ...state, hearts: { n, at } });
}

export function gainHeart(k = 1) {
  ensureLoaded();
  const cur = heartsNow(state);
  const n = Math.min(MAX_HEARTS, cur.n + k);
  commit({ ...state, hearts: { n, at: n >= MAX_HEARTS ? 0 : state.hearts.at || Date.now() } });
}

export function setRelaxed(relaxed: boolean) {
  ensureLoaded();
  commit({ ...state, relaxed });
}

/** Simpan hasil satu pelajaran jalur, beri XP, dan tandai unit selesai bila ini tantangan akhir. */
export function completeLesson(lang: string, key: string, accuracy: number, xp: number, unitScore?: { unit: string; score: number }) {
  ensureLoaded();
  const prev = state.path[lang]?.[key];
  const stars = accuracy >= 95 ? 3 : accuracy >= 80 ? 2 : 1;
  const node: PathNode = { stars: Math.max(prev?.stars ?? 0, stars), best: Math.max(prev?.best ?? 0, accuracy), times: (prev?.times ?? 0) + 1 };
  let next: ProgressState = { ...state, path: { ...state.path, [lang]: { ...state.path[lang], [key]: node } } };
  if (unitScore) {
    const p = next.done[lang]?.[unitScore.unit] ?? 0;
    next = { ...next, done: { ...next.done, [lang]: { ...next.done[lang], [unitScore.unit]: Math.max(p, unitScore.score) } } };
  }
  commitWithXp(next, xp, "Pelajaran selesai", lang);
  return node;
}
