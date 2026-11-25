"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Play } from "lucide-react";
import { setCurrentLang, slugFromPath, useCurrentLang, type LangMeta } from "@/lib/currentLang";
import { PASS, useProgress } from "@/lib/progress";
import { units } from "@/data/curriculum";
import { themeFor } from "@/data/themes";

/**
 * Penanda bahasa yang sedang dipelajari di header, lengkap dengan progres
 * unit dan menu untuk berpindah bahasa.
 */
export function LangPill({ langs }: { langs: LangMeta[] }) {
  const path = usePathname();
  const stored = useCurrentLang();
  const progress = useProgress();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  const fromPath = slugFromPath(path);
  const valid = (s: string | null) => (s && langs.some((l) => l.slug === s) ? s : null);
  const slug = valid(fromPath) ?? valid(stored);
  const lang = langs.find((l) => l.slug === slug);

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (valid(fromPath)) setCurrentLang(fromPath!);
    setOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromPath]);

  useEffect(() => {
    if (!open) return;
    const close = (e: Event) => {
      if (e instanceof KeyboardEvent && e.key !== "Escape") return;
      if (e instanceof PointerEvent && box.current?.contains(e.target as Node)) return;
      setOpen(false);
    };
    window.addEventListener("keydown", close);
    window.addEventListener("pointerdown", close);
    return () => {
      window.removeEventListener("keydown", close);
      window.removeEventListener("pointerdown", close);
    };
  }, [open]);

  const passed = (s: string) => Object.values(progress.done[s] ?? {}).filter((x) => x >= PASS).length;
  const nextUnit = (s: string) => units.find((u) => (progress.done[s]?.[u.id] ?? 0) < PASS) ?? units[units.length - 1];

  if (!mounted) return <div className="lang-pill-slot" aria-hidden />;

  const t = lang ? themeFor(lang.slug) : null;
  const done = lang ? passed(lang.slug) : 0;
  const pct = Math.round((done / units.length) * 100);

  return (
    <div className="lang-pill-wrap" ref={box}>
      <button
        type="button"
        className="lang-pill"
        data-empty={!lang || undefined}
        style={t ? ({ "--lp": t.accent, "--lp-pop": t.pop } as React.CSSProperties) : undefined}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label={lang ? `Sedang belajar bahasa ${lang.name}, ${done} dari ${units.length} unit selesai. Ganti bahasa` : "Pilih bahasa yang ingin dipelajari"}
      >
        {lang ? (
          <>
            <span className="lang-pill-glyph" lang={lang.tts} aria-hidden>
              {lang.glyph}
              <svg viewBox="0 0 36 36" className="lang-pill-ring" aria-hidden>
                <circle cx={18} cy={18} r={16} pathLength={100} />
                <circle cx={18} cy={18} r={16} pathLength={100} style={{ strokeDasharray: `${pct} 100` }} />
              </svg>
            </span>
            <span className="lang-pill-text">
              <span className="lang-pill-label">Sedang belajar</span>
              <span className="lang-pill-name">
                {lang.name}
                <span className="lang-pill-native" lang={lang.tts}>
                  {lang.native}
                </span>
              </span>
            </span>
          </>
        ) : (
          <span className="lang-pill-text">
            <span className="lang-pill-label">Belum memilih</span>
            <span className="lang-pill-name">Pilih bahasa</span>
          </span>
        )}
        <ChevronDown size={16} className="lang-pill-chev" aria-hidden />
      </button>

      {open && (
        <div className="lang-menu" role="dialog" aria-label="Ganti bahasa yang dipelajari">
          {lang && (
            <div className="lang-menu-head" style={{ "--lp": t!.accent } as React.CSSProperties}>
              <div>
                <span className="tiny muted">Lanjutkan bahasa {lang.name}</span>
                <strong>
                  Unit {units.indexOf(nextUnit(lang.slug)) + 1}: {nextUnit(lang.slug).title}
                </strong>
                <span className="lang-menu-bar" aria-hidden>
                  <i style={{ width: `${pct}%` }} />
                </span>
                <span className="tiny muted">
                  {done} dari {units.length} unit selesai
                </span>
              </div>
              <Link className="btn btn-primary btn-sm" href={`/bahasa/${lang.slug}/${nextUnit(lang.slug).id}/`}>
                <Play size={14} aria-hidden /> Lanjut
              </Link>
            </div>
          )}
          <p className="tiny muted lang-menu-title">Ganti bahasa</p>
          <ul className="lang-menu-list">
            {langs.map((l) => {
              const lt = themeFor(l.slug);
              const d = passed(l.slug);
              return (
                <li key={l.slug}>
                  <Link
                    href={`/bahasa/${l.slug}/jalur/`}
                    className="lang-menu-item"
                    aria-current={l.slug === slug ? "true" : undefined}
                    style={{ "--lp": lt.accent } as React.CSSProperties}
                  >
                    <span className="lang-menu-glyph" lang={l.tts} aria-hidden>
                      {l.glyph}
                    </span>
                    <span className="lang-menu-name">
                      {l.name}
                      <span className="tiny muted">{d ? `${d}/${units.length} unit` : lt.name}</span>
                    </span>
                    {l.slug === slug && <Check size={16} aria-label="Sedang dipelajari" />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
