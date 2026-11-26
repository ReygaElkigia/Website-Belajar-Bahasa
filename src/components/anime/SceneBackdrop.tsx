import type { AnimeTheme } from "@/data/themes";
import { heroVideos } from "@/data/heroVideos";
import { Scene } from "./Scene";
import { BgVideo } from "./BgVideo";

/** Latar sebuah dunia: video loop bila tersedia, selain itu pemandangan SVG. */
export function SceneBackdrop({ theme, compact, id }: { theme: AnimeTheme; compact?: boolean; id?: string }) {
  const v = heroVideos[theme.id];
  if (v) return <BgVideo src={v.src} poster={v.poster} focus={v.focus} className="scene" />;
  return <Scene theme={theme} className="scene" compact={compact} id={id} />;
}

export const hasVideo = (theme: AnimeTheme) => !!heroVideos[theme.id];
