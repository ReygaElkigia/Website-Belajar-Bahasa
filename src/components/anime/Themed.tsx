import type { ReactNode } from "react";
import { themeFor, themeVars, type AnimeTheme } from "@/data/themes";
import { Particles } from "./Particles";
import { Parallax } from "./Parallax";
import { SceneBackdrop } from "./SceneBackdrop";

/** Membungkus satu halaman dengan warna aksen tema bahasa. */
export function Themed({ slug, theme, children }: { slug?: string; theme?: AnimeTheme; children: ReactNode }) {
  const t = theme ?? themeFor(slug);
  return (
    <div className="themed" style={themeVars(t)} data-anime={t.id}>
      {children}
    </div>
  );
}

/**
 * Header halaman: pemandangan anime selebar layar, lalu kartu judul yang
 * menumpang di atasnya seperti panel komik.
 */
export function PageHero({
  slug,
  height = 300,
  overlap = 110,
  showTag = true,
  children,
}: {
  slug?: string;
  height?: number;
  overlap?: number;
  showTag?: boolean;
  children: ReactNode;
}) {
  const t = themeFor(slug);
  return (
    <div className="page-anime-head">
      <section className="anime-hero" style={{ "--hero-h": `${height}px` } as React.CSSProperties} aria-label={`Ilustrasi tema ${t.name}`}>
        <Parallax>
          <SceneBackdrop theme={t} compact />
          <Particles kind={t.particle} seed={t.id.length + 3} density={0.8} />
        </Parallax>
        {showTag && (
          <span className="theme-tag" title={t.mood}>
            <i aria-hidden />
            {t.name}
          </span>
        )}
      </section>
      <div className="wrap">
        <div className="hero-card" style={{ "--overlap": `${overlap}px` } as React.CSSProperties}>
          {children}
        </div>
      </div>
    </div>
  );
}
