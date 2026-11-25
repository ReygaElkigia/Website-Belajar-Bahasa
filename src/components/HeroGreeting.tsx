"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Pause, Play, Volume2 } from "lucide-react";
import { speak } from "@/lib/speech";
import { themeFor, themeVars } from "@/data/themes";
import { Scene } from "./anime/Scene";
import { Particles } from "./anime/Particles";
import { Parallax } from "./anime/Parallax";
import { Mascot } from "./mascot/Mascot";
import { Flag } from "@/components/Flag";

export interface Greeting {
  slug: string;
  name: string;
  native: string;
  tts: string;
  dir: "ltr" | "rtl";
  word: string;
  roman?: string;
}

const INTERVAL = 4200;

/**
 * Hero beranda: sapaan dalam balon kata di atas pemandangan anime yang
 * berganti mengikuti bahasanya.
 */
export function HeroGreeting({ items, title, lead }: { items: Greeting[]; title: string; lead: string }) {
  // Indeks bahasa saat ini dan sebelumnya, agar pemandangan bisa memudar silang.
  const [{ i, prev }, setPos] = useState({ i: 1, prev: 1 });
  const [auto, setAuto] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    setAuto(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const go = (next: number) => setPos((p) => ({ i: next, prev: p.i }));

  useEffect(() => {
    if (!auto) return;
    timer.current = window.setInterval(() => {
      setPos((p) => ({ i: (p.i + 1) % items.length, prev: p.i }));
    }, INTERVAL);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, [auto, items.length]);

  const g = items[i];
  const t = themeFor(g.slug);
  const pt = themeFor(items[prev].slug);

  const say = (idx: number) => {
    const item = items[idx];
    if (idx !== i) go(idx);
    setAuto(false);
    const ok = speak(item.word, item.tts, { onEnd: () => setSpeaking(false) });
    if (ok) setSpeaking(true);
  };

  return (
    <section className="anime-hero home-hero themed" style={themeVars(t)} aria-label="Sapaan dalam berbagai bahasa">
      <Parallax>
        <div className="scene-stack">
          <div key={`p-${pt.id}`}>
            <Scene theme={pt} className="scene" id={`home-prev-${pt.id}`} />
          </div>
          <div key={`c-${t.id}`} className="scene-fade">
            <Scene theme={t} className="scene" id={`home-${t.id}`} />
          </div>
        </div>
        <Particles key={t.id} kind={t.particle} seed={i + 5} />
      </Parallax>

      <div className="wrap home-hero-inner">
        <div>
          <div className="hero-speaker">
          <Mascot mood={speaking ? "cheer" : "happy"} size={120} className="hero-mascot" title="Tuu, maskot Tutur, sedang menyapa" />
          <div className="bubble">
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
            <button type="button" className="speak speak-lg" data-playing={speaking} onClick={() => say(i)} aria-label={`Dengarkan ${g.word}`}>
              <Volume2 size={24} strokeWidth={2} aria-hidden />
            </button>
          </div>
          </div>
          <div className="hero-meta" style={{ marginTop: 34 }} aria-live="polite">
            <span className="hero-chip">Halo dalam bahasa {g.name}</span>
            {g.roman && (
              <span className="hero-chip" style={{ fontStyle: "italic" }}>
                {g.roman}
              </span>
            )}
            <span className="hero-chip" title={t.mood}>
              Tema: {t.name}
            </span>
            <button
              type="button"
              className="speak"
              onClick={() => setAuto((a) => !a)}
              aria-label={auto ? "Jeda pergantian bahasa" : "Lanjutkan pergantian bahasa"}
              title={auto ? "Jeda" : "Putar"}
            >
              {auto ? <Pause size={16} strokeWidth={2} /> : <Play size={16} strokeWidth={2} />}
            </button>
          </div>
        </div>

        <ul className="hero-tabs anime" aria-label="Pilih bahasa">
          {items.map((it, idx) => (
            <li key={it.slug}>
              <button type="button" lang={it.tts} aria-pressed={idx === i} onClick={() => say(idx)}>
                <Flag slug={it.slug} size={18} />
                {it.native}
              </button>
            </li>
          ))}
        </ul>

        <div className="home-hero-copy">
          <h1>{title}</h1>
          <p className="lead">{lead}</p>
          <div className="btn-row mt-4">
            <Link className="btn btn-primary" href={`/bahasa/${g.slug}/jalur/`}>
              Belajar bahasa {g.name}
            </Link>
            <Link className="btn" href="/bahasa/">
              Semua bahasa
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
