import type { CSSProperties } from "react";
import type { ParticleKind } from "@/data/themes";

/**
 * Partikel dekoratif (kelopak, salju, lentera, dst.) yang digerakkan murni
 * dengan CSS. Posisi dibuat deterministik agar hasil server dan klien sama.
 */

const COUNTS: Record<ParticleKind, number> = {
  cloud: 0,
  rain: 46,
  petal: 26,
  firefly: 22,
  lantern: 14,
  star: 18,
  leaf: 16,
  bubble: 16,
  confetti: 30,
  snow: 40,
  sparkle: 18,
  lotus: 14,
  powder: 18,
};

const POWDER = ["#FF3D9A", "#FFC233", "#38C7FF", "#7CFF6B", "#B06CFF", "#FF7A3D"];
const CONFETTI = ["#FFD23F", "#FF5D5D", "#3BCEAC", "#4C6EF5", "#FF8FC2"];

export function Particles({ kind, seed = 1, density = 1 }: { kind: ParticleKind; seed?: number; density?: number }) {
  const n = Math.round(COUNTS[kind] * density);
  if (!n) return null;
  let s = seed * 9301 + 49297;
  const r = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
  return (
    <div className={`particles p-${kind}`} aria-hidden>
      {Array.from({ length: n }, (_, i) => {
        const style = {
          "--x": `${(r() * 100).toFixed(2)}%`,
          "--y": `${(r() * 100).toFixed(2)}%`,
          "--d": `${(kind === "rain" ? 0.7 + r() * 0.5 : 7 + r() * 9).toFixed(2)}s`,
          "--delay": `${(-r() * 16).toFixed(2)}s`,
          "--s": (0.55 + r() * 0.9).toFixed(2),
          "--sway": `${(20 + r() * 60).toFixed(0)}px`,
          "--c": kind === "powder" ? POWDER[i % POWDER.length] : kind === "confetti" ? CONFETTI[i % CONFETTI.length] : undefined,
        } as CSSProperties;
        return <i key={i} style={style} />;
      })}
    </div>
  );
}
