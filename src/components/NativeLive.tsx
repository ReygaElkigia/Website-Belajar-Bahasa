"use client";

import { useEffect, useState } from "react";
import { cachedNative, onNativeUpdate, prefetchNative } from "@/lib/nativeAudio";
import { NativeBadge } from "./NativeBadge";

/** Mencari rekaman penutur asli untuk kata-kata di halaman, saat peramban senggang. */
export function NativePrefetch({ tts, items }: { tts: string; items: { word: string; note?: string }[] }) {
  const key = items.map((i) => i.word).join("|");
  useEffect(() => {
    const run = () => void prefetchNative(tts, items);
    const w = window as Window & { requestIdleCallback?: (cb: () => void) => number };
    if (w.requestIdleCallback) w.requestIdleCallback(run);
    else window.setTimeout(run, 300);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tts, key]);
  return null;
}

/** Penanda "Penutur asli" untuk rekaman yang ditemukan oleh peramban. */
export function LiveNativeBadge({ tts, word }: { tts: string; word: string }) {
  const [, force] = useState(0);
  useEffect(() => onNativeUpdate(() => force((n) => n + 1)), []);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  const rec = cachedNative(tts, word);
  if (!rec) return null;
  return <NativeBadge credit={{ word, file: "", page: rec.page, artist: rec.artist, license: rec.license, licenseUrl: "" }} />;
}
