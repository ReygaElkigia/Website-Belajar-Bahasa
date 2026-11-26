"use client";

import { useSyncExternalStore } from "react";
import type { TuuMood } from "@/components/companion/TuuSprite";

/**
 * Jalur komunikasi ke Tuu, maskot pendamping. Komponen mana pun cukup
 * memanggil `tuu({...})` saat pengunjung melakukan sesuatu; Companion yang
 * memutuskan reaksi, ekspresi, dan kapan sebaiknya diam.
 */

export type ActivitySource = "quiz" | "exam" | "reading" | "expr" | "card";

export type Activity =
  | { type: "answer"; correct: boolean; source: ActivitySource }
  | { type: "finish"; source: ActivitySource; score: number; total?: number }
  | { type: "listen" }
  | { type: "shadow" }
  | { type: "typing" }
  | { type: "flip" }
  | { type: "theme"; dark: boolean }
  | { type: "saved-offline"; name: string }
  | { type: "say"; text: string; mood?: TuuMood; ms?: number };

const listeners = new Set<(a: Activity) => void>();

export function tuu(a: Activity) {
  listeners.forEach((l) => l(a));
}

export function onTuu(cb: (a: Activity) => void) {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

/* ---------- Pengaturan yang dipilih pengunjung ---------- */

export interface TuuSettings {
  /** Disembunyikan sepenuhnya (tersisa tab kecil untuk memanggil kembali). */
  hidden: boolean;
  /** Mode tenang: tetap berekspresi, tetapi hanya bicara untuk hal penting. */
  quiet: boolean;
  /** Sisi layar tempat Tuu duduk. */
  side: "left" | "right";
}

const KEY = "tutur:tuu:settings";
const DEFAULTS: TuuSettings = { hidden: false, quiet: false, side: "right" };
let settings: TuuSettings = DEFAULTS;
let loaded = false;
const settingListeners = new Set<() => void>();

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    settings = { ...DEFAULTS, ...JSON.parse(localStorage.getItem(KEY) || "{}") };
  } catch {
    settings = DEFAULTS;
  }
}

export function getTuuSettings(): TuuSettings {
  load();
  return settings;
}

export function setTuuSettings(patch: Partial<TuuSettings>) {
  load();
  settings = { ...settings, ...patch };
  try {
    localStorage.setItem(KEY, JSON.stringify(settings));
  } catch {
    /* abaikan */
  }
  settingListeners.forEach((l) => l());
}

export function useTuuSettings(): TuuSettings {
  return useSyncExternalStore(
    (cb) => {
      settingListeners.add(cb);
      return () => {
        settingListeners.delete(cb);
      };
    },
    getTuuSettings,
    () => DEFAULTS,
  );
}
