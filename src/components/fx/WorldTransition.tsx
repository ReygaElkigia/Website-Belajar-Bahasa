"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { slugFromPath, type LangMeta } from "@/lib/currentLang";
import { themeFor } from "@/data/themes";
import { Particles } from "../anime/Particles";
import { Flag } from "@/components/Flag";
import { SceneBackdrop } from "../anime/SceneBackdrop";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";

type Phase = "in" | "out" | null;

/**
 * Transisi "masuk dunia" saat berpindah ke bahasa lain: lingkaran bertema
 * membesar dari titik klik, memperlihatkan pemandangan, aksara, dan nama
 * bahasanya, lalu terbuka ke halaman baru.
 */
export function WorldTransition({ langs }: { langs: LangMeta[] }) {
  const router = useRouter();
  const path = usePathname();
  const [phase, setPhase] = useState<Phase>(null);
  const [target, setTarget] = useState<LangMeta | null>(null);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });
  const pending = useRef<string | null>(null);
  const pathRef = useRef(path);
  pathRef.current = path;
  const timers = useRef<number[]>([]);

  const later = (fn: () => void, ms: number) => timers.current.push(window.setTimeout(fn, ms));

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a || (a.target && a.target !== "_self") || a.hasAttribute("download")) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin) return;
      let p = url.pathname;
      if (BASE && p.startsWith(BASE)) p = p.slice(BASE.length) || "/";
      const to = slugFromPath(p);
      const from = slugFromPath(pathRef.current);
      if (!to || to === from) return;
      const meta = langs.find((l) => l.slug === to);
      if (!meta) return;
      e.preventDefault();
      timers.current.forEach(clearTimeout);
      timers.current = [];
      setOrigin({ x: (e.clientX / window.innerWidth) * 100, y: (e.clientY / window.innerHeight) * 100 });
      setTarget(meta);
      setPhase("in");
      pending.current = to;
      router.prefetch(p);
      later(() => router.push(p + url.search + url.hash), 650);
      // Jaga-jaga bila navigasi tidak terjadi.
      later(() => {
        if (pending.current) {
          pending.current = null;
          setPhase("out");
          later(() => setPhase(null), 700);
        }
      }, 4000);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [langs, router]);

  useEffect(() => {
    if (!pending.current || slugFromPath(path) !== pending.current) return;
    pending.current = null;
    later(() => setPhase("out"), 380);
    later(() => {
      setPhase(null);
      setTarget(null);
    }, 1150);
  }, [path]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  if (!phase || !target) return null;
  const t = themeFor(target.slug);
  return (
    <div
      className="world-warp"
      data-phase={phase}
      style={
        {
          "--wx": `${origin.x}%`,
          "--wy": `${origin.y}%`,
          "--w1": t.sky[0],
          "--w2": t.sky[1],
          "--w3": t.sky[2],
          "--wa": t.accent,
          "--wp": t.pop,
        } as React.CSSProperties
      }
      aria-live="polite"
    >
      <div className="world-warp-scene" aria-hidden>
        <SceneBackdrop theme={t} id="warp" />
        <Particles kind={t.particle} seed={7} density={1.3} />
      </div>
      <div className="world-warp-rings" aria-hidden>
        <i />
        <i />
        <i />
      </div>
      <div className="world-warp-content">
        <span className="world-warp-glyph" aria-hidden>
          <Flag slug={target.slug} size={88} />
        </span>
        <span className="world-warp-native" lang={target.tts}>
          {target.native}
        </span>
        <span className="world-warp-label">
          Memasuki dunia <strong>{t.name}</strong>
        </span>
        <span className="sr-only">Membuka bahasa {target.name}</span>
      </div>
    </div>
  );
}
