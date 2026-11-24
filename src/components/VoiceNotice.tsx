"use client";

import { Info } from "lucide-react";
import { useVoiceStatus } from "@/lib/speech";

/** Memberi tahu bila perangkat tidak punya suara untuk bahasa ini. */
export function VoiceNotice({ tts, name }: { tts: string; name: string }) {
  const status = useVoiceStatus(tts);
  if (status !== "missing" && status !== "unsupported") return null;
  return (
    <p className="notice mt-5" role="status">
      <Info size={16} strokeWidth={1.75} aria-hidden />
      <span>
        {status === "unsupported"
          ? "Peramban ini tidak mendukung pembacaan suara. Coba Chrome, Edge, atau Safari versi terbaru."
          : `Perangkat ini belum punya suara bahasa ${name}. Tombol dengar mungkin memakai suara lain atau diam. Tambahkan suara di pengaturan bahasa dan ucapan perangkat Anda.`}
      </span>
    </p>
  );
}
