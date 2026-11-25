"use client";

import { useEffect, useState } from "react";
import { cachedNative } from "./nativeAudio";

let cachedVoices: SpeechSynthesisVoice[] = [];

function loadVoices(): SpeechSynthesisVoice[] {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return [];
  const v = window.speechSynthesis.getVoices();
  if (v.length) cachedVoices = v;
  return cachedVoices;
}

function pickVoice(lang: string): SpeechSynthesisVoice | undefined {
  const voices = loadVoices();
  const norm = (s: string) => s.replace("_", "-").toLowerCase();
  const target = norm(lang);
  const base = target.split("-")[0];
  return (
    voices.find((v) => norm(v.lang) === target) ??
    voices.find((v) => norm(v.lang).split("-")[0] === base)
  );
}

export function canSpeak() {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

export function hasVoiceFor(lang: string) {
  return !!pickVoice(lang);
}

/* ---------- Rekaman penutur asli ---------- */

const COMMONS = "https://upload.wikimedia.org/wikipedia/commons/";
type AudioIndex = Record<string, Record<string, string>>;
let indexPromise: Promise<AudioIndex> | null = null;
let indexCache: AudioIndex | null = null;
let current: HTMLAudioElement | null = null;

/** Indeks rekaman dimuat sekali, terpisah dari bundel utama. */
function loadIndex() {
  indexPromise ??= import("@/data/audio-index.json")
    .then((m) => (indexCache = m.default as AudioIndex))
    .catch(() => (indexCache = {}));
  return indexPromise;
}

/**
 * Muat indeks lebih awal (dipanggil saat tombol dengar tampil), agar klik
 * pertama bisa langsung memutar audio. Safari memblokir play() yang terjadi
 * setelah jeda asinkron dari klik.
 */
export function preloadNativeAudio() {
  if (typeof window !== "undefined") void loadIndex();
}

/** Ada rekaman asli untuk teks ini? (null bila indeks belum dimuat) */
export function hasNativeAudio(text: string, lang: string) {
  return indexCache ? !!indexCache[lang]?.[text] : null;
}

function playPath(path: string, text: string, lang: string, opts: { slow?: boolean; onEnd?: () => void }) {
  const audio = new Audio(path.startsWith("http") ? path : COMMONS + path);
  current = audio;
  let fellBack = false;
  const fallback = () => {
    if (fellBack || current !== audio) return;
    fellBack = true;
    speakTts(text, lang, opts);
  };
  audio.onended = () => opts.onEnd?.();
  audio.onerror = fallback;
  audio.play().catch(fallback);
}

export interface SpeakOpts {
  slow?: boolean;
  /** Nada suara perangkat (0..2), untuk membedakan tokoh dalam dialog. */
  pitch?: number;
  onEnd?: () => void;
}

/** Hentikan rekaman atau suara perangkat yang sedang diputar. */
export function stopSpeaking() {
  if (typeof window !== "undefined") stopAll();
}

function stopAll() {
  if (current) {
    current.pause();
    current = null;
  }
  if (canSpeak()) window.speechSynthesis.cancel();
}

/**
 * Putar rekaman asli bila ada (Lingua Libre via Wikimedia Commons),
 * jika tidak ada atau gagal, bacakan dengan suara perangkat.
 */
export function speak(text: string, lang: string, opts: SpeakOpts = {}) {
  if (typeof window === "undefined") return false;
  stopAll();
  if (opts.slow) return speakTts(text, lang, opts);
  const run = (idx: AudioIndex) => {
    // Urutan: indeks bawaan situs, lalu temuan peramban (Lingua Libre), lalu suara perangkat.
    const path = idx[lang]?.[text] ?? cachedNative(lang, text)?.url;
    if (path) playPath(path, text, lang, opts);
    else speakTts(text, lang, opts);
  };
  // Jalur sinkron bila indeks sudah ada: tetap di dalam gestur klik pengguna.
  if (indexCache) run(indexCache);
  else loadIndex().then(run);
  return true;
}

function speakTts(text: string, lang: string, opts: SpeakOpts = {}) {
  if (!canSpeak()) {
    opts.onEnd?.();
    return false;
  }
  const synth = window.speechSynthesis;
  synth.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = lang;
  const voice = pickVoice(lang);
  if (voice) u.voice = voice;
  u.rate = opts.slow ? 0.6 : 0.9;
  if (opts.pitch) u.pitch = opts.pitch;
  if (opts.onEnd) {
    u.onend = opts.onEnd;
    u.onerror = opts.onEnd;
  }
  synth.speak(u);
  return true;
}

/** Status suara untuk sebuah bahasa: null selama belum diketahui. */
export function useVoiceStatus(lang: string) {
  const [status, setStatus] = useState<"ok" | "missing" | "unsupported" | null>(null);
  useEffect(() => {
    if (!canSpeak()) {
      setStatus("unsupported");
      return;
    }
    const check = () => setStatus(hasVoiceFor(lang) ? "ok" : "missing");
    check();
    window.speechSynthesis.addEventListener("voiceschanged", check);
    const t = window.setTimeout(check, 1200);
    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", check);
      window.clearTimeout(t);
    };
  }, [lang]);
  return status;
}
