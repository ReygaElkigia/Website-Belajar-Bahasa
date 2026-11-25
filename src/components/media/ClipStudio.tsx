"use client";

import { useEffect, useRef, useState } from "react";
import {
  ExternalLink,
  FastForward,
  Pause,
  Play,
  Repeat,
  RotateCcw,
} from "lucide-react";
import type { MediaClip, MediaExpression } from "@/data/media";

/* ---------- Pemuat YouTube IFrame API (sekali per halaman) ---------- */

interface YTPlayer {
  playVideo(): void;
  pauseVideo(): void;
  seekTo(s: number, allowSeekAhead: boolean): void;
  getCurrentTime(): number;
  getPlayerState(): number;
  setPlaybackRate(r: number): void;
  destroy(): void;
}
interface YTNamespace {
  Player: new (
    el: HTMLElement,
    o: {
      videoId: string;
      host?: string;
      playerVars?: Record<string, string | number>;
      events?: {
        onReady?: () => void;
        onStateChange?: (e: { data: number }) => void;
      };
    },
  ) => YTPlayer;
}
declare global {
  interface Window {
    YT?: YTNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let apiPromise: Promise<YTNamespace> | null = null;
function loadYouTube(): Promise<YTNamespace> {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  apiPromise ??= new Promise((resolve, reject) => {
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prev?.();
      resolve(window.YT!);
    };
    const s = document.createElement("script");
    s.src = "https://www.youtube.com/iframe_api";
    s.async = true;
    s.onerror = () => {
      apiPromise = null;
      reject(new Error("YouTube tidak dapat dimuat"));
    };
    document.head.appendChild(s);
  });
  return apiPromise;
}

const PLAYING = 1;
const RATES = [0.5, 0.75, 1];
const PAUSES = [0, 5, 8];

function useTicks(key: string) {
  const [ticks, setTicks] = useState<string[]>([]);
  useEffect(() => {
    try {
      setTicks(JSON.parse(localStorage.getItem(key) || "[]"));
    } catch {
      /* abaikan */
    }
  }, [key]);
  const toggle = (t: string) =>
    setTicks((prev) => {
      const next = prev.includes(t)
        ? prev.filter((x) => x !== t)
        : [...prev, t];
      try {
        localStorage.setItem(key, JSON.stringify(next));
      } catch {
        /* abaikan */
      }
      return next;
    });
  return [ticks, toggle] as const;
}

interface Props {
  clip: MediaClip;
  langCode: string;
  tts: string;
  dir: "ltr" | "rtl";
  expressions: MediaExpression[];
}

/**
 * Studio klip: pemutar YouTube resmi plus alat belajar, yaitu kecepatan,
 * mundur 5 detik, jeda otomatis untuk shadowing, dan ulang segmen.
 */
export function ClipStudio({ clip, langCode, tts, dir, expressions }: Props) {
  const host = useRef<HTMLDivElement>(null);
  const player = useRef<YTPlayer | null>(null);
  const segStart = useRef(0);
  const [on, setOn] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [rate, setRate] = useState(1);
  const [pauseEvery, setPauseEvery] = useState(0);
  const pauseRef = useRef(0);
  pauseRef.current = pauseEvery;
  const [turn, setTurn] = useState(false);
  const [ticks, toggleTick] = useTicks(`tutur:clip:${clip.id}`);

  useEffect(() => {
    if (!on || !host.current) return;
    let alive = true;
    const el = document.createElement("div");
    host.current.appendChild(el);
    loadYouTube()
      .then((YT) => {
        if (!alive) return;
        player.current = new YT.Player(el, {
          videoId: clip.id,
          host: "https://www.youtube-nocookie.com",
          playerVars: {
            autoplay: 1,
            rel: 0,
            playsinline: 1,
            cc_load_policy: 1,
            cc_lang_pref: langCode,
            hl: "id",
          },
          events: {
            onReady: () => setReady(true),
            onStateChange: (e) => {
              setPlaying(e.data === PLAYING);
              if (e.data === PLAYING) {
                setTurn(false);
                // Dilanjutkan dari tombol YouTube sendiri: mulai segmen baru.
                const now = player.current?.getCurrentTime() ?? 0;
                if (
                  pauseRef.current &&
                  now - segStart.current >= pauseRef.current - 0.3
                )
                  segStart.current = now;
              }
            },
          },
        });
      })
      .catch(() => setFailed(true));
    return () => {
      alive = false;
      player.current?.destroy();
      player.current = null;
      el.remove();
    };
  }, [on, clip.id, langCode]);

  // Jeda otomatis: hentikan setiap N detik agar penonton menirukan.
  useEffect(() => {
    if (!pauseEvery || !ready) return;
    segStart.current = player.current?.getCurrentTime() ?? 0;
    const t = window.setInterval(() => {
      const p = player.current;
      if (!p || p.getPlayerState() !== PLAYING) return;
      if (p.getCurrentTime() - segStart.current >= pauseEvery) {
        p.pauseVideo();
        setTurn(true);
      }
    }, 200);
    return () => window.clearInterval(t);
  }, [pauseEvery, ready]);

  const p = () => player.current;
  const toggle = () => (playing ? p()?.pauseVideo() : resume());
  const resume = () => {
    segStart.current = p()?.getCurrentTime() ?? 0;
    p()?.playVideo();
  };
  const back = (s: number) => {
    const now = p()?.getCurrentTime() ?? 0;
    p()?.seekTo(Math.max(0, now - s), true);
    segStart.current = Math.max(0, now - s);
    p()?.playVideo();
  };
  const replaySegment = () => {
    const start = pauseEvery
      ? Math.max(0, segStart.current)
      : Math.max(0, (p()?.getCurrentTime() ?? 0) - 5);
    p()?.seekTo(start, true);
    segStart.current = start;
    p()?.playVideo();
  };
  const changeRate = (r: number) => {
    setRate(r);
    p()?.setPlaybackRate(r);
  };

  return (
    <article className="clip-card">
      <div className="video-frame clip-frame">
        {on ? (
          <div ref={host} className="clip-host" />
        ) : (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://i.ytimg.com/vi/${clip.id}/hqdefault.jpg`}
              alt=""
              loading="lazy"
            />
            <button
              type="button"
              className="video-play"
              onClick={() => setOn(true)}
              aria-label={`Putar klip: ${clip.show}`}
            >
              <span>
                <Play
                  size={28}
                  fill="currentColor"
                  strokeWidth={0}
                  aria-hidden
                />
              </span>
            </button>
          </>
        )}
      </div>

      <div className="clip-body">
        <div className="video-meta">
          <span className="level">{clip.kind}</span>
          <span className="level">{clip.level}</span>
          <span className="level">{clip.length}</span>
        </div>
        <h3>{clip.show}</h3>
        <p className="small">{clip.title}</p>
        <p className="tiny muted">Kanal resmi: {clip.channel}</p>

        {on && (
          <div className="clip-tools" role="group" aria-label="Alat belajar">
            {failed ? (
              <p className="small muted">
                Pemutar YouTube tidak dapat dimuat. Buka klip langsung di
                YouTube.
              </p>
            ) : (
              <>
                <div className="clip-row">
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={toggle}
                    disabled={!ready}
                  >
                    {playing ? (
                      <Pause size={16} aria-hidden />
                    ) : (
                      <Play size={16} aria-hidden />
                    )}
                    {playing ? "Jeda" : turn ? "Lanjut" : "Putar"}
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm"
                    onClick={() => back(5)}
                    disabled={!ready}
                  >
                    <RotateCcw size={16} aria-hidden /> 5 dtk
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm"
                    onClick={replaySegment}
                    disabled={!ready}
                  >
                    <Repeat size={16} aria-hidden /> Ulangi bagian ini
                  </button>
                </div>
                <div className="clip-row">
                  <span className="tiny muted clip-label">
                    <FastForward size={14} aria-hidden /> Kecepatan
                  </span>
                  <div className="seg" role="radiogroup" aria-label="Kecepatan">
                    {RATES.map((r) => (
                      <button
                        key={r}
                        type="button"
                        role="radio"
                        aria-checked={rate === r}
                        onClick={() => changeRate(r)}
                        disabled={!ready}
                      >
                        {String(r).replace(".", ",")}×
                      </button>
                    ))}
                  </div>
                </div>
                <div className="clip-row">
                  <span className="tiny muted clip-label">Jeda otomatis</span>
                  <div
                    className="seg"
                    role="radiogroup"
                    aria-label="Jeda otomatis"
                  >
                    {PAUSES.map((s) => (
                      <button
                        key={s}
                        type="button"
                        role="radio"
                        aria-checked={pauseEvery === s}
                        onClick={() => setPauseEvery(s)}
                        disabled={!ready}
                      >
                        {s ? `${s} dtk` : "Mati"}
                      </button>
                    ))}
                  </div>
                </div>
                {turn && (
                  <p className="shadow-hint small" aria-live="polite">
                    Giliranmu: tirukan bagian yang baru kamu dengar, lalu tekan
                    Lanjut. Tekan Ulangi bila belum tertangkap.
                  </p>
                )}
              </>
            )}
          </div>
        )}

        <p className="small mt-3">{clip.tip}</p>

        <details className="catch">
          <summary className="small">
            Tantangan: tandai ungkapan yang kamu tangkap ({ticks.length}/
            {expressions.length})
          </summary>
          <ul>
            {expressions.map((e) => (
              <li key={e.text}>
                <label>
                  <input
                    type="checkbox"
                    checked={ticks.includes(e.text)}
                    onChange={() => toggleTick(e.text)}
                  />
                  <span lang={tts} dir={dir}>
                    {e.text}
                  </span>
                  <span className="tiny muted">{e.meaning}</span>
                </label>
              </li>
            ))}
          </ul>
          <p className="tiny muted">
            Tidak semua ungkapan muncul di setiap klip. Daftar ini hanya untuk
            melatih telinga.
          </p>
        </details>

        <a
          className="tiny row"
          style={{ gap: 4 }}
          href={`https://www.youtube.com/watch?v=${clip.id}`}
          target="_blank"
          rel="noreferrer"
        >
          Buka di YouTube
          <ExternalLink size={13} strokeWidth={1.75} aria-hidden />
        </a>
      </div>
    </article>
  );
}
