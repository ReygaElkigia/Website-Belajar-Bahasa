"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Menggeser lapisan pemandangan mengikuti kursor dan scroll lewat variabel
 * CSS --mx, --my, dan --sy. Mati bila pengguna meminta gerak minimal.
 */
export function Parallax({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    // Hanya di perangkat dengan mouse; di HP parallax tidak dipakai sama sekali.
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let frame = 0;
    let mx = 0;
    let my = 0;
    let visible = true;
    // Jangan menghitung parallax saat pemandangan tidak terlihat.
    const io =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(([en]) => {
            visible = en.isIntersecting;
          })
        : null;
    io?.observe(el);
    const apply = () => {
      frame = 0;
      el.style.setProperty("--mx", mx.toFixed(3));
      el.style.setProperty("--my", my.toFixed(3));
    };
    const queue = () => {
      if (visible && !frame) frame = requestAnimationFrame(apply);
    };
    const onMove = (e: PointerEvent) => {
      mx = (e.clientX / window.innerWidth) * 2 - 1;
      my = (e.clientY / window.innerHeight) * 2 - 1;
      queue();
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
      io?.disconnect();
    };
  }, []);

  return (
    <div ref={ref} className={className} style={{ position: "absolute", inset: 0 }}>
      {children}
    </div>
  );
}
