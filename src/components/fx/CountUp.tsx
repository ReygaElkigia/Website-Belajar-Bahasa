"use client";

import { useEffect, useRef, useState } from "react";

/** Angka yang menghitung naik dari nol saat pertama kali terlihat di layar. */
export function CountUp({ value, duration }: { value: number; duration?: number }) {
  const [shown, setShown] = useState(value);
  const el = useRef<HTMLSpanElement>(null);
  const played = useRef(false);

  useEffect(() => {
    if (played.current) {
      setShown(value);
      return;
    }
    const node = el.current;
    if (!node || typeof IntersectionObserver === "undefined" || window.matchMedia("(prefers-reduced-motion: reduce)").matches || value <= 0) {
      setShown(value);
      return;
    }
    let raf = 0;
    const io = new IntersectionObserver(
      ([en]) => {
        if (!en.isIntersecting) return;
        io.disconnect();
        played.current = true;
        const start = performance.now();
        const dur = duration ?? Math.min(1400, 500 + value * 5);
        const tick = (now: number) => {
          const k = Math.min(1, (now - start) / dur);
          setShown(Math.round(value * (1 - Math.pow(1 - k, 3))));
          if (k < 1) raf = requestAnimationFrame(tick);
        };
        setShown(0);
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );
    io.observe(node);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, duration]);

  return (
    <span ref={el} className="countup">
      {new Intl.NumberFormat("id-ID").format(shown)}
    </span>
  );
}
