"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { onTuu } from "@/lib/companion";
import { onGameEvent } from "@/lib/progress";
import { slugFromPath } from "@/lib/currentLang";
import { themeFor } from "@/data/themes";
import type { ParticleKind } from "@/data/themes";

/**
 * Lapisan efek interaktif untuk seluruh situs, dipasang sekali di layout:
 *  - bilah progres scroll di header,
 *  - kartu yang miring 3D mengikuti kursor, lengkap dengan kilap,
 *  - percikan partikel saat tombol ditekan, ledakan bintang saat jawaban benar,
 *  - jejak partikel bertema (kelopak, bintang, salju, ...) saat kursor di atas pemandangan,
 *  - konfeti untuk skor bagus, combo, naik level, lencana, dan target harian,
 * Semuanya mati bila pengguna memilih gerak minimal.
 */

const TILT = ".lang-card, .mood-card, .expr-card, .exam-card, .level-card, .clip-card .video-frame, .video .video-frame, .badge-card";
const BURST = ".btn, .option, .speak, .icon-btn, .seg button, .tuu-btn, .lang-pill, .glyph";

function reduced() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function accentOf(el: Element | null) {
  const v = el ? getComputedStyle(el).getPropertyValue("--pen").trim() : "";
  return v || "#2f6be8";
}

/* ---------- Konfeti di kanvas ---------- */

interface Bit {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  vr: number;
  w: number;
  h: number;
  c: string;
  life: number;
  shape: 0 | 1 | 2;
}

function makeConfetti(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  let bits: Bit[] = [];
  let raf = 0;
  const size = () => {
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = innerWidth * dpr;
    canvas.height = innerHeight * dpr;
    ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  size();
  window.addEventListener("resize", size);
  const step = () => {
    if (!ctx) return;
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    bits = bits.filter((b) => b.life > 0 && b.y < innerHeight + 40);
    for (const b of bits) {
      b.vy += 0.18;
      b.vx *= 0.99;
      b.vy *= 0.99;
      b.x += b.vx;
      b.y += b.vy;
      b.r += b.vr;
      b.life -= 1;
      ctx.save();
      ctx.translate(b.x, b.y);
      ctx.rotate(b.r);
      ctx.globalAlpha = Math.min(1, b.life / 30);
      ctx.fillStyle = b.c;
      if (b.shape === 0) ctx.fillRect(-b.w / 2, -b.h / 2, b.w, b.h * Math.abs(Math.cos(b.r * 2)));
      else if (b.shape === 1) {
        ctx.beginPath();
        ctx.arc(0, 0, b.w / 2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
          const a = (i * 4 * Math.PI) / 5;
          ctx.lineTo(Math.cos(a) * b.w * 0.6, Math.sin(a) * b.w * 0.6);
        }
        ctx.fill();
      }
      ctx.restore();
    }
    raf = bits.length ? requestAnimationFrame(step) : 0;
  };
  return {
    fire(x: number, y: number, power: number, colors: string[]) {
      const n = Math.round(60 * power);
      for (let i = 0; i < n; i++) {
        const a = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 0.9;
        const s = 6 + Math.random() * 9 * Math.sqrt(power);
        bits.push({
          x,
          y,
          vx: Math.cos(a) * s,
          vy: Math.sin(a) * s,
          r: Math.random() * Math.PI,
          vr: (Math.random() - 0.5) * 0.3,
          w: 6 + Math.random() * 6,
          h: 10 + Math.random() * 8,
          c: colors[i % colors.length],
          life: 110 + Math.random() * 60,
          shape: (Math.random() < 0.65 ? 0 : Math.random() < 0.5 ? 1 : 2) as Bit["shape"],
        });
      }
      if (!raf) raf = requestAnimationFrame(step);
    },
    destroy() {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", size);
    },
  };
}

/* ---------- Bentuk jejak partikel per tema ---------- */

function trailShape(kind: ParticleKind, color: string) {
  switch (kind) {
    case "petal":
    case "lotus":
      return `<svg viewBox="0 0 20 20" width="16" height="16"><path d="M10 2 C15 6 15 13 10 18 C5 13 5 6 10 2 Z" fill="#ffb3c8" stroke="#e8476c" stroke-width="1"/></svg>`;
    case "snow":
      return `<svg viewBox="0 0 20 20" width="14" height="14"><g stroke="#fff" stroke-width="2" stroke-linecap="round"><path d="M10 2v16M3 6l14 8M3 14l14-8"/></g></svg>`;
    case "leaf":
      return `<svg viewBox="0 0 20 20" width="16" height="16"><path d="M3 17 C3 7 9 3 17 3 C17 11 13 17 3 17 Z" fill="#f4a340" stroke="#a65a12" stroke-width="1"/></svg>`;
    case "bubble":
      return `<svg viewBox="0 0 20 20" width="14" height="14"><circle cx="10" cy="10" r="7" fill="rgba(255,255,255,.35)" stroke="#fff" stroke-width="1.5"/></svg>`;
    case "lantern":
    case "firefly":
      return `<svg viewBox="0 0 20 20" width="12" height="12"><circle cx="10" cy="10" r="5" fill="#ffd66b"/><circle cx="10" cy="10" r="9" fill="rgba(255,214,107,.35)"/></svg>`;
    case "confetti":
    case "powder":
      return `<svg viewBox="0 0 20 20" width="10" height="10"><rect x="4" y="4" width="12" height="12" rx="2" fill="${color}"/></svg>`;
    default:
      return `<svg viewBox="0 0 20 20" width="14" height="14"><path d="M10 1 L12.5 7.5 L19 10 L12.5 12.5 L10 19 L7.5 12.5 L1 10 L7.5 7.5 Z" fill="#fff7c2" stroke="#ffb547" stroke-width="1"/></svg>`;
  }
}

export function FxLayer() {
  const path = usePathname();
  const layer = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const pathRef = useRef(path);
  pathRef.current = path;

  /* Bilah progres scroll */
  useEffect(() => {
    let raf = 0;
    const set = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - innerHeight;
      document.documentElement.style.setProperty("--scroll", String(max > 0 ? Math.min(1, scrollY / max) : 0));
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(set);
    };
    set();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
      cancelAnimationFrame(raf);
    };
  }, []);
  useEffect(() => {
    document.documentElement.style.setProperty("--scroll", "0");
  }, [path]);

  /* Kartu miring 3D */
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let current: HTMLElement | null = null;
    let raf = 0;
    let last: PointerEvent | null = null;
    const apply = () => {
      raf = 0;
      if (!current || !last) return;
      const r = current.getBoundingClientRect();
      const px = (last.clientX - r.left) / r.width;
      const py = (last.clientY - r.top) / r.height;
      current.style.setProperty("--rx", `${((0.5 - py) * 9).toFixed(2)}deg`);
      current.style.setProperty("--ry", `${((px - 0.5) * 11).toFixed(2)}deg`);
      current.style.setProperty("--gx", `${(px * 100).toFixed(1)}%`);
      current.style.setProperty("--gy", `${(py * 100).toFixed(1)}%`);
    };
    const reset = (el: HTMLElement) => {
      delete el.dataset.tilt;
      el.style.removeProperty("--rx");
      el.style.removeProperty("--ry");
    };
    const move = (e: PointerEvent) => {
      if (reduced()) return;
      const el = (e.target as Element | null)?.closest?.(TILT) as HTMLElement | null;
      if (el !== current) {
        if (current) reset(current);
        current = el;
        if (el) el.dataset.tilt = "";
      }
      last = e;
      if (current && !raf) raf = requestAnimationFrame(apply);
    };
    const leave = () => {
      if (current) reset(current);
      current = null;
    };
    document.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    return () => {
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
      cancelAnimationFrame(raf);
    };
  }, []);

  /* Percikan saat menekan, ledakan saat jawaban benar */
  useEffect(() => {
    const spawn = (x: number, y: number, color: string, n: number, big = false) => {
      const host = layer.current;
      if (!host) return;
      const ring = document.createElement("span");
      ring.className = big ? "fx-ring fx-ring-big" : "fx-ring";
      ring.style.cssText = `left:${x}px;top:${y}px;--c:${color}`;
      host.appendChild(ring);
      const made: HTMLElement[] = [ring];
      for (let i = 0; i < n; i++) {
        const s = document.createElement("span");
        const a = (i / n) * Math.PI * 2 + Math.random() * 0.5;
        const d = (big ? 46 : 26) + Math.random() * (big ? 34 : 16);
        s.className = big && i % 2 ? "fx-spark fx-star" : "fx-spark";
        s.style.cssText = `left:${x}px;top:${y}px;--c:${i % 3 === 0 ? "var(--pop,#ffb547)" : color};--dx:${Math.cos(a) * d}px;--dy:${Math.sin(a) * d}px`;
        host.appendChild(s);
        made.push(s);
      }
      window.setTimeout(() => made.forEach((el) => el.remove()), 800);
    };
    const down = (e: PointerEvent) => {
      if (reduced() || e.button !== 0) return;
      const el = (e.target as Element | null)?.closest?.(BURST);
      if (!el || (el as HTMLButtonElement).disabled) return;
      spawn(e.clientX, e.clientY, accentOf(el), 7);
      if (el.classList.contains("option")) {
        // Lihat hasilnya setelah komponen kuis menandai jawaban.
        window.setTimeout(() => {
          if ((el as HTMLElement).dataset.state === "right") {
            const r = el.getBoundingClientRect();
            spawn(r.left + r.width / 2, r.top + r.height / 2, "#2fb36b", 14, true);
          }
        }, 60);
      }
    };
    document.addEventListener("pointerdown", down, { passive: true });
    return () => document.removeEventListener("pointerdown", down);
  }, []);

  /* Jejak partikel bertema di atas pemandangan */
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let lastT = 0;
    let lastX = 0;
    let lastY = 0;
    const move = (e: PointerEvent) => {
      if (reduced()) return;
      const hero = (e.target as Element | null)?.closest?.(".anime-hero, .lang-card-scene, .hero-stage");
      if (!hero) return;
      const now = performance.now();
      if (now - lastT < 55 || Math.hypot(e.clientX - lastX, e.clientY - lastY) < 14) return;
      lastT = now;
      lastX = e.clientX;
      lastY = e.clientY;
      const host = layer.current;
      if (!host) return;
      const slug = slugFromPath(pathRef.current) ?? (hero.closest(".themed")?.querySelector("a")?.getAttribute("href")?.match(/bahasa\/([^/]+)/)?.[1] ?? undefined);
      const t = themeFor(slug);
      const s = document.createElement("span");
      s.className = "fx-trail";
      s.innerHTML = trailShape(t.particle, t.accent);
      s.style.cssText = `left:${e.clientX}px;top:${e.clientY}px;--dx:${(Math.random() - 0.5) * 40}px;--rot:${(Math.random() - 0.5) * 360}deg`;
      host.appendChild(s);
      window.setTimeout(() => s.remove(), 1200);
    };
    document.addEventListener("pointermove", move, { passive: true });
    return () => document.removeEventListener("pointermove", move);
  }, []);

  /* Konfeti */
  useEffect(() => {
    if (!canvas.current) return;
    const c = makeConfetti(canvas.current);
    const colors = () => {
      const t = themeFor(slugFromPath(pathRef.current) ?? undefined);
      return [t.accent, t.pop, "#ff6b8a", "#ffffff", "#7cc8ff", "#2fb36b"];
    };
    const fire = (power = 1, x?: number, y?: number) => {
      if (reduced()) return;
      c.fire(x ?? innerWidth / 2, y ?? innerHeight * 0.75, power, colors());
    };
    const sides = (power: number) => {
      fire(power * 0.6, innerWidth * 0.15, innerHeight * 0.9);
      window.setTimeout(() => fire(power * 0.6, innerWidth * 0.85, innerHeight * 0.9), 160);
    };
    let combo = 0;
    const offTuu = onTuu((a) => {
      if (a.type === "answer") {
        combo = a.correct ? combo + 1 : 0;
        if (combo === 5 || combo === 10 || combo === 20) fire(combo >= 10 ? 1.3 : 0.8);
      } else if (a.type === "finish") {
        combo = 0;
        if (a.score >= 100) sides(1.6);
        else if (a.score >= 70) fire(0.9);
      } else if (a.type === "saved-offline") fire(0.7);
    });
    const offGame = onGameEvent((e) => {
      if (e.type === "level") sides(2);
      else if (e.type === "goal") sides(1.3);
      else if (e.type === "badge") fire(1.1, innerWidth / 2, innerHeight * 0.6);
    });
    const onCustom = (e: Event) => {
      const d = (e as CustomEvent<{ power?: number; x?: number; y?: number }>).detail ?? {};
      fire(d.power ?? 1, d.x, d.y);
    };
    window.addEventListener("tutur:confetti", onCustom);
    return () => {
      offTuu();
      offGame();
      window.removeEventListener("tutur:confetti", onCustom);
      c.destroy();
    };
  }, []);

  return (
    <>
      <canvas ref={canvas} className="fx-confetti" aria-hidden />
      <div ref={layer} className="fx-layer" aria-hidden />
    </>
  );
}
