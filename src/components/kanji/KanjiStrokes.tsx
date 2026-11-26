"use client";

import { useState } from "react";
import { RotateCcw } from "lucide-react";

/**
 * Urutan goresan dari KanjiVG: kanji menulis dirinya goresan demi goresan,
 * lalu deretan kotak kecil memperlihatkan setiap langkah.
 */
export function KanjiStrokes({ paths, kanji }: { paths: string[]; kanji: string }) {
  const [run, setRun] = useState(0);
  if (!paths.length) {
    return (
      <div className="kj-draw kj-draw-empty" lang="ja">
        {kanji}
      </div>
    );
  }
  const step = Math.min(0.6, 6 / paths.length);
  return (
    <div className="kj-strokes">
      <div className="kj-draw-box">
        <svg key={run} className="kj-draw" viewBox="0 0 109 109" role="img" aria-label={`Urutan goresan ${kanji}, ${paths.length} goresan`}>
          <path className="kj-guide" d="M54.5 0V109M0 54.5H109" />
          {paths.map((d, i) => (
            <path key={`g${i}`} className="kj-ghost" d={d} />
          ))}
          {paths.map((d, i) => (
            <path key={i} className="kj-ink" d={d} pathLength={1} style={{ animationDelay: `${0.3 + i * step}s`, animationDuration: `${step * 0.9}s` }} />
          ))}
        </svg>
        <button type="button" className="kj-replay" onClick={() => setRun((n) => n + 1)} aria-label="Putar ulang urutan goresan" title="Putar ulang">
          <RotateCcw size={16} aria-hidden />
        </button>
      </div>
      <ol className="kj-frames" aria-label="Langkah goresan">
        {paths.map((_, n) => (
          <li key={n}>
            <svg viewBox="0 0 109 109" aria-hidden>
              {paths.slice(0, n + 1).map((d, i) => (
                <path key={i} d={d} className={i === n ? "kj-frame-now" : "kj-frame-done"} />
              ))}
            </svg>
            <span>{n + 1}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
