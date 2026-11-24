"use client";

import { useState } from "react";
import type { GlyphSection } from "@/data/types";
import { speak } from "@/lib/speech";

export function GlyphGrid({ section, tts, dir }: { section: GlyphSection; tts: string; dir: "ltr" | "rtl" }) {
  const [playing, setPlaying] = useState<number | null>(null);
  const cols = section.cols ?? 5;
  // Daftar pola bunyi (3 kolom) tampil sebagai kartu rata kiri; tabel huruf tetap berupa kisi.
  const wide = cols <= 3;
  // Tabel kana 5 kolom harus tetap 5 kolom agar barisnya sejajar.
  const style = { "--cols": cols, "--cols-sm": cols === 5 ? 5 : Math.min(cols, 4) } as React.CSSProperties;

  return (
    <div className={wide ? "glyph-grid wide" : "glyph-grid"} style={wide ? undefined : style}>
      {section.items.map((g, i) =>
        g ? (
          <button
            key={i}
            type="button"
            className="glyph"
            data-playing={playing === i}
            onClick={() => {
              const ok = speak(g.say ?? g.char, tts, { onEnd: () => setPlaying(null) });
              if (ok) setPlaying(i);
            }}
            aria-label={`${g.char}, dibaca ${g.roman}${g.note ? `, ${g.note}` : ""}`}
          >
            <span className="glyph-char" lang={tts} dir={dir} data-long={[...g.char].length > 3 && /[a-z]/i.test(g.char)}>
              {g.char}
            </span>
            <span className="glyph-roman">{g.roman}</span>
            {g.note && <span className="glyph-note">{g.note}</span>}
          </button>
        ) : (
          <span key={i} className="glyph-empty" aria-hidden />
        ),
      )}
    </div>
  );
}
