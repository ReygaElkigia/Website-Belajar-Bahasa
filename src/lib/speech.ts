"use client";

import { useEffect, useState } from "react";

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

export function speak(text: string, lang: string, opts: { slow?: boolean; onEnd?: () => void } = {}) {
  if (!canSpeak()) return false;
  const synth = window.speechSynthesis;
  synth.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = lang;
  const voice = pickVoice(lang);
  if (voice) u.voice = voice;
  u.rate = opts.slow ? 0.6 : 0.9;
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
