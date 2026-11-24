"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play, Volume2 } from "lucide-react";
import { speak } from "@/lib/speech";

export interface Greeting {
  slug: string;
  name: string;
  native: string;
  tts: string;
  dir: "ltr" | "rtl";
  word: string;
  roman?: string;
}

const INTERVAL = 2800;

export function HeroGreeting({ items }: { items: Greeting[] }) {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const timer = useRef<number | null>(null);

  // Rotasi otomatis hanya jika pengguna tidak meminta gerak minimal.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setAuto(!reduce);
  }, []);

  useEffect(() => {
    if (!auto) return;
    timer.current = window.setInterval(() => setI((x) => (x + 1) % items.length), INTERVAL);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, [auto, items.length]);

  const g = items[i];

  const say = (idx: number) => {
    const item = items[idx];
    setI(idx);
    setAuto(false);
    const ok = speak(item.word, item.tts, { onEnd: () => setSpeaking(false) });
    if (ok) setSpeaking(true);
  };

  return (
    <div>
      <p className="hero-caption">
        <span>
          Halo dalam bahasa <strong style={{ color: "var(--ink)" }}>{g.name}</strong>
        </span>
        <button
          type="button"
          className="icon-btn"
          style={{ width: 32, height: 32 }}
          onClick={() => setAuto((a) => !a)}
          aria-label={auto ? "Jeda pergantian bahasa" : "Lanjutkan pergantian bahasa"}
          title={auto ? "Jeda" : "Putar"}
        >
          {auto ? <Pause size={16} strokeWidth={1.75} /> : <Play size={16} strokeWidth={1.75} />}
        </button>
      </p>

      <div className="hero-word">
        <button
          key={g.slug}
          type="button"
          className="hero-say word-in"
          lang={g.tts}
          dir={g.dir}
          onClick={() => say(i)}
          aria-label={`${g.word}. Ketuk untuk mendengar pelafalannya`}
        >
          {g.word}
        </button>
        <button
          type="button"
          className="speak speak-lg"
          data-playing={speaking}
          onClick={() => say(i)}
          aria-label={`Dengarkan ${g.word}`}
          style={{ marginBottom: 14 }}
        >
          <Volume2 size={24} strokeWidth={1.75} aria-hidden />
        </button>
      </div>
      <p className="hero-roman" aria-live="polite">
        {g.roman ?? " "}
      </p>

      <ul className="hero-tabs" aria-label="Pilih bahasa sapaan">
        {items.map((it, idx) => (
          <li key={it.slug}>
            <button type="button" lang={it.tts} aria-pressed={idx === i} onClick={() => say(idx)}>
              {it.native}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
