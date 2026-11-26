"use client";

/**
 * Efek suara kecil yang disintesis dengan Web Audio (tanpa berkas audio):
 * benar, salah, ketukan ubin, combo, dan fanfare selesai.
 */

const KEY = "tutur:sfx";
let ctx: AudioContext | null = null;

export function sfxOn() {
  try {
    return localStorage.getItem(KEY) !== "off";
  } catch {
    return true;
  }
}

export function setSfx(on: boolean) {
  try {
    localStorage.setItem(KEY, on ? "on" : "off");
  } catch {
    /* abaikan */
  }
}

function ac() {
  if (typeof window === "undefined") return null;
  const AC = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AC) return null;
  ctx ??= new AC();
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

function tone(freq: number, start: number, dur: number, type: OscillatorType = "sine", gain = 0.18, slideTo?: number) {
  const c = ac();
  if (!c) return;
  const t = c.currentTime + start;
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, t);
  if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, t + dur);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(gain, t + 0.015);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g).connect(c.destination);
  o.start(t);
  o.stop(t + dur + 0.05);
}

export const sfx = {
  right() {
    if (!sfxOn()) return;
    tone(784, 0, 0.12, "triangle", 0.16);
    tone(1175, 0.09, 0.22, "triangle", 0.16);
  },
  wrong() {
    if (!sfxOn()) return;
    tone(220, 0, 0.18, "square", 0.06, 180);
    tone(165, 0.14, 0.26, "square", 0.06, 130);
  },
  tap() {
    if (!sfxOn()) return;
    tone(660, 0, 0.06, "sine", 0.08);
  },
  combo(n: number) {
    if (!sfxOn()) return;
    const base = 660 + Math.min(n, 10) * 40;
    [0, 0.07, 0.14].forEach((d, i) => tone(base * [1, 1.25, 1.5][i], d, 0.14, "triangle", 0.12));
  },
  heart() {
    if (!sfxOn()) return;
    tone(330, 0, 0.3, "sine", 0.12, 160);
  },
  done() {
    if (!sfxOn()) return;
    const notes = [523, 659, 784, 1047];
    notes.forEach((f, i) => tone(f, i * 0.11, 0.24, "triangle", 0.14));
    tone(1319, 0.5, 0.5, "triangle", 0.12);
    tone(1047, 0.5, 0.5, "sine", 0.08);
  },
};
