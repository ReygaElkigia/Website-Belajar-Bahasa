"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowRight, Volume2 } from "lucide-react";
import { themeFor, themeVars } from "@/data/themes";
import { speak } from "@/lib/speech";
import { Particles } from "./anime/Particles";
import { Parallax } from "./anime/Parallax";
import { Flag } from "./Flag";
import { SceneBackdrop } from "./anime/SceneBackdrop";

export interface WorldItem {
  slug: string;
  name: string;
  native: string;
  tts: string;
  challengeLabel: string;
}

const INTERVAL = 3200;

/**
 * Pembuka halaman Semua bahasa: pemandangan berganti mengikuti dunia bahasa,
 * deretan bendera untuk memilih, dan kartu pratinjau yang langsung membawa
 * ke jalur belajar. Sedikit teks, banyak yang bisa disentuh.
 */
export function WorldPicker({ items, units, lessons }: { items: WorldItem[]; units: number; lessons: number }) {
  const [{ i, prev }, setPos] = useState({ i: 0, prev: 0 });
  const [auto, setAuto] = useState(false);
  const [chosen, setChosen] = useState(false);
  const rail = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setAuto(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (!auto) return;
    const t = window.setInterval(() => setPos((p) => ({ i: (p.i + 1) % items.length, prev: p.i })), INTERVAL);
    return () => window.clearInterval(t);
  }, [auto, items.length]);

  // Gulirkan bendera aktif ke tengah deretan (penting di layar sempit).
  useEffect(() => {
    const el = rail.current?.querySelector<HTMLElement>(`[data-i="${i}"]`);
    const box = rail.current;
    if (el && box && box.scrollWidth > box.clientWidth) {
      box.scrollTo({ left: el.offsetLeft - box.clientWidth / 2 + el.clientWidth / 2, behavior: "smooth" });
    }
  }, [i]);

  /** Memilih hanya menampilkan pratinjau; masuk ke jalur lewat tombol Mulai. */
  const pick = (n: number, byTap = false) => {
    setAuto(false);
    if (n !== i) setPos({ i: n, prev: i });
    if (byTap) {
      setChosen(true);
      speak(items[n].native, items[n].tts);
    }
  };

  const it = items[i];
  const t = themeFor(it.slug);
  const pt = themeFor(items[prev].slug);

  return (
    <section className="anime-hero world-picker themed" style={themeVars(t)} aria-label="Pilih bahasa yang ingin dipelajari">
      <Parallax>
        <div className="scene-stack">
          <div key={`p-${pt.id}`}>
            <SceneBackdrop theme={pt} id={`wp-prev-${pt.id}`} />
          </div>
          <div key={`c-${t.id}`} className="scene-fade">
            <SceneBackdrop theme={t} id={`wp-${t.id}`} />
          </div>
        </div>
        <Particles key={t.id} kind={t.particle} seed={i + 3} />
      </Parallax>

      <div className="wrap world-picker-inner">
        <div className="world-picker-head">
          <span className="path-hero-kicker">Langkah 1 · Pilih duniamu</span>
          <h1>Mau menjelajah dunia mana?</h1>
          <ul className="world-stats" aria-label="Isi setiap bahasa">
            <li>
              <strong>{items.length}</strong> bahasa
            </li>
            <li>
              <strong>{units}</strong> unit
            </li>
            <li>
              <strong>{lessons}</strong> pelajaran 5 menit
            </li>
            <li>
              <strong>A1–B1</strong>
            </li>
          </ul>
        </div>

        <div className="world-preview" key={it.slug} aria-live="polite" data-chosen={chosen || undefined}>
          <Flag slug={it.slug} size={64} />
          <div className="world-preview-text">
            <button type="button" className="world-preview-native" lang={it.tts} onClick={() => speak(it.native, it.tts)} title="Dengarkan">
              {it.native}
              <Volume2 size={18} aria-hidden />
            </button>
            <span className="world-preview-name">
              Bahasa {it.name} · <span>{t.name}</span> · {it.challengeLabel}
            </span>
          </div>
          <Link className="btn btn-primary world-preview-go" href={`/bahasa/${it.slug}/jalur/`}>
            {chosen ? `Mulai belajar ${it.name}` : "Mulai"} <ArrowRight size={18} aria-hidden />
          </Link>
        </div>

        <p className="world-hint">{chosen ? "Bahasa dipilih. Tekan Mulai untuk masuk ke jalur belajarnya." : "Ketuk bendera untuk melihat dunianya."}</p>
        <div className="world-rail" ref={rail} role="radiogroup" aria-label="Pilih bahasa" onPointerEnter={() => setAuto(false)}>
          {items.map((l, n) => (
            <div key={l.slug} data-i={n}>
              <button
                type="button"
                role="radio"
                className="world-flag"
                aria-checked={n === i}
                aria-current={n === i ? "true" : undefined}
                onClick={() => pick(n, true)}
                aria-label={`Pilih bahasa ${l.name}`}
              >
                <Flag slug={l.slug} size={52} />
                <span>{l.name}</span>
              </button>
            </div>
          ))}
        </div>

        <a className="world-more" href="#daftar">
          Lihat detail semua bahasa <ArrowDown size={16} aria-hidden />
        </a>
      </div>
    </section>
  );
}
