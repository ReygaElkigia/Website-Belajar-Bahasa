"use client";

import { useEffect, useRef } from "react";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";

/**
 * Video latar tanpa suara yang berulang. Tidak diputar (hanya poster) bila
 * pengguna meminta gerak minimal atau hemat data, dan dijeda saat di luar layar.
 */
export function BgVideo({ src, poster, focus, className }: { src: string; poster: string; focus?: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (saveData || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      v.removeAttribute("autoplay");
      v.pause();
      return;
    }
    const io = new IntersectionObserver(([en]) => {
      if (en.isIntersecting) void v.play().catch(() => undefined);
      else v.pause();
    });
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className={`${className ?? ""} scene-video`}
      src={`${BASE}${src}`}
      poster={`${BASE}${poster}`}
      style={focus ? { objectPosition: focus } : undefined}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden
      tabIndex={-1}
    />
  );
}
