"use client";

import { useState } from "react";
import { ExternalLink, Play } from "lucide-react";
import type { Video } from "@/data/types";

/**
 * Pemutar ringan: hanya gambar mini yang dimuat sampai pengguna menekan
 * putar, sehingga halaman tetap cepat dan tidak memuat skrip YouTube.
 */
export function VideoCard({ video, langName }: { video: Video; langName?: string }) {
  const [on, setOn] = useState(false);
  const watch = `https://www.youtube.com/watch?v=${video.id}`;
  return (
    <article className="video">
      <div className="video-frame">
        {on ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0&cc_load_policy=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`} alt="" loading="lazy" />
            <button type="button" className="video-play" onClick={() => setOn(true)} aria-label={`Putar video: ${video.title}`}>
              <span>
                <Play size={28} fill="currentColor" strokeWidth={0} aria-hidden />
              </span>
            </button>
          </>
        )}
      </div>
      <div className="video-meta">
        {langName && <span className="level">{langName}</span>}
        <span className="level">{video.kind}</span>
      </div>
      <h3 lang="en">{video.title}</h3>
      <p>{video.about}</p>
      <a className="tiny row" style={{ gap: 4 }} href={watch} target="_blank" rel="noreferrer">
        Buka di YouTube
        <ExternalLink size={13} strokeWidth={1.75} aria-hidden />
      </a>
    </article>
  );
}
