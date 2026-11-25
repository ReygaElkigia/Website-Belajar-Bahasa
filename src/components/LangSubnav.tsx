"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { BookOpenText, Clapperboard, Compass, ListOrdered, Route, Type } from "lucide-react";
import { units } from "@/data/curriculum";
import { PASS, useProgress } from "@/lib/progress";
import { speak } from "@/lib/speech";
import type { LangMeta } from "@/lib/currentLang";

/**
 * Bilah navigasi di dalam satu bahasa: selalu menunjukkan bahasa yang sedang
 * dipelajari, bagian yang sedang dibuka, dan progres unit.
 */
export function LangSubnav({ lang, accent, pop }: { lang: LangMeta; accent: string; pop: string }) {
  const path = usePathname() ?? "";
  const progress = useProgress();
  const base = `/bahasa/${lang.slug}/`;
  const rest = path.startsWith(base) ? path.slice(base.length).replace(/\/$/, "") : "";
  const unitIdx = units.findIndex((u) => u.id === rest);
  const done = units.filter((u) => (progress.done[lang.slug]?.[u.id] ?? 0) >= PASS).length;
  const scroller = useRef<HTMLDivElement>(null);

  const items = [
    { href: base, label: "Ringkasan", icon: Compass, on: rest === "" },
    { href: `${base}jalur/`, label: "Jalur", icon: Route, on: rest === "jalur" || rest === "pelajaran" },
    { href: `${base}huruf/`, label: "Huruf", icon: Type, on: rest === "huruf" },
    { href: `${base}${units[0].id}/`, label: "Unit", icon: ListOrdered, on: unitIdx >= 0 },
    { href: `${base}bacaan/`, label: "Bacaan", icon: BookOpenText, on: rest === "bacaan" },
    { href: `${base}tonton/`, label: "Tonton", icon: Clapperboard, on: rest === "tonton" },
  ];

  // Geser tab aktif ke tengah pada layar sempit.
  useEffect(() => {
    const el = scroller.current?.querySelector<HTMLElement>("[aria-current='page']");
    el?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [rest]);

  return (
    <nav className="lang-subnav" aria-label={`Bagian bahasa ${lang.name}`} style={{ "--lp": accent, "--lp-pop": pop } as React.CSSProperties}>
      <div className="wrap lang-subnav-inner">
        <button type="button" className="lang-subnav-id" onClick={() => speak(lang.native, lang.tts)} title={`Dengarkan: ${lang.native}`}>
          <span className="lang-subnav-glyph" lang={lang.tts} aria-hidden>
            {lang.glyph}
          </span>
          <span className="lang-subnav-name">
            <span className="tiny">Bahasa</span>
            <strong>{lang.name}</strong>
          </span>
          <span className="sr-only">, dengarkan nama bahasanya</span>
        </button>
        <div className="lang-subnav-tabs" ref={scroller}>
          {items.map(({ href, label, icon: Icon, on }) => (
            <Link key={label} href={href} aria-current={on ? "page" : undefined}>
              <Icon size={16} strokeWidth={2} aria-hidden />
              {label}
              {label === "Unit" && unitIdx >= 0 && <span className="lang-subnav-count">{unitIdx + 1}/{units.length}</span>}
            </Link>
          ))}
        </div>
        <div className="lang-subnav-progress" title={`${done} dari ${units.length} unit selesai`}>
          <span className="lang-subnav-dots" aria-hidden>
            {units.map((u, i) => (
              <i key={u.id} data-done={(progress.done[lang.slug]?.[u.id] ?? 0) >= PASS || undefined} data-here={i === unitIdx || undefined} />
            ))}
          </span>
          <span className="tiny">
            {done}/{units.length}
          </span>
        </div>
      </div>
    </nav>
  );
}
