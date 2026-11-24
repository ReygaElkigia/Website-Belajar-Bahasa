"use client";

import { useState } from "react";
import { languages } from "@/data";
import type { VideoKind } from "@/data/types";
import { VideoCard } from "./VideoCard";

const kinds: VideoKind[] = ["Huruf", "Frasa", "Percakapan"];

export function VideoLibrary() {
  const [lang, setLang] = useState("semua");
  const [kind, setKind] = useState<VideoKind | "semua">("semua");

  const all = languages.flatMap((l) => l.videos.map((v) => ({ v, l })));
  const shown = all.filter(({ v, l }) => (lang === "semua" || l.slug === lang) && (kind === "semua" || v.kind === kind));

  return (
    <div>
      <div className="stack">
        <div className="chips" role="group" aria-label="Saring menurut bahasa">
          <button type="button" className="chip" aria-pressed={lang === "semua"} onClick={() => setLang("semua")}>
            Semua bahasa
          </button>
          {languages.map((l) => (
            <button key={l.slug} type="button" className="chip" aria-pressed={lang === l.slug} onClick={() => setLang(l.slug)}>
              {l.name}
            </button>
          ))}
        </div>
        <div className="chips" role="group" aria-label="Saring menurut jenis">
          <button type="button" className="chip" aria-pressed={kind === "semua"} onClick={() => setKind("semua")}>
            Semua jenis
          </button>
          {kinds.map((k) => (
            <button key={k} type="button" className="chip" aria-pressed={kind === k} onClick={() => setKind(k)}>
              {k}
            </button>
          ))}
        </div>
      </div>
      <p className="small muted mt-5" aria-live="polite">
        {shown.length} video
      </p>
      <div className="video-grid mt-4">
        {shown.map(({ v, l }) => (
          <VideoCard key={v.id} video={v} langName={l.name} />
        ))}
      </div>
      {shown.length === 0 && (
        <div className="empty mt-4">
          <p>Belum ada video {kind.toLowerCase()} untuk bahasa ini.</p>
          <button type="button" className="btn btn-sm" onClick={() => setKind("semua")}>
            Tampilkan semua jenis
          </button>
        </div>
      )}
    </div>
  );
}
