"use client";

import { useEffect, useRef, useState } from "react";
import {
  Eye,
  EyeOff,
  Languages,
  Mic,
  Pause,
  Play,
  Volume2,
} from "lucide-react";
import { speak, stopSpeaking } from "@/lib/speech";
import { tuu } from "@/lib/companion";
import type { MediaScene } from "@/data/media";

interface Props {
  scene: MediaScene;
  tts: string;
  dir: "ltr" | "rtl";
}

type Mode = "idle" | "play" | "shadow";

/** Nada berbeda untuk tiap tokoh agar dialog suara perangkat lebih mudah diikuti. */
const PITCH = [1.12, 0.88];

/**
 * Adegan bergaya panel komik: dengarkan dialog utuh, atau pakai mode bayangan
 * (shadowing): setiap kalimat diputar lalu dijeda agar kamu menirukannya.
 */
export function ScenePlayer({ scene, tts, dir }: Props) {
  const [mode, setMode] = useState<Mode>("idle");
  const [current, setCurrent] = useState<number | null>(null);
  const [yourTurn, setYourTurn] = useState(false);
  const [showMeaning, setShowMeaning] = useState(true);
  const [showRoman, setShowRoman] = useState(false);
  const run = useRef(0);
  const timer = useRef<number | undefined>(undefined);
  const hasRoman = scene.lines.some((l) => l.roman);

  const stop = () => {
    run.current++;
    window.clearTimeout(timer.current);
    stopSpeaking();
    setMode("idle");
    setCurrent(null);
    setYourTurn(false);
  };

  useEffect(() => () => stop(), []); // eslint-disable-line react-hooks/exhaustive-deps

  const start = (m: Exclude<Mode, "idle">) => {
    stop();
    const id = run.current;
    setMode(m);
    if (m === "shadow") tuu({ type: "shadow" });
    const step = (i: number) => {
      if (run.current !== id) return;
      if (i >= scene.lines.length) {
        setMode("idle");
        setCurrent(null);
        setYourTurn(false);
        return;
      }
      const line = scene.lines[i];
      setCurrent(i);
      setYourTurn(false);
      speak(line.text, tts, {
        pitch: PITCH[line.who],
        onEnd: () => {
          if (run.current !== id) return;
          if (m === "shadow") {
            setYourTurn(true);
            // Waktu meniru: kira-kira sepanjang kalimatnya, minimal 2,5 detik.
            const wait = Math.max(2500, Math.min(7000, line.text.length * 140));
            timer.current = window.setTimeout(() => step(i + 1), wait);
          } else {
            timer.current = window.setTimeout(() => step(i + 1), 450);
          }
        },
      });
    };
    step(0);
  };

  return (
    <article className="scene-card">
      <header className="scene-head">
        <div>
          <span className="level-chip">{scene.genre}</span>
          <h3>{scene.title}</h3>
          <p className="small muted">{scene.setting}</p>
        </div>
        <div className="scene-cast" aria-label="Tokoh">
          {scene.cast.map((c, i) => (
            <span key={c} className="cast-chip" data-who={i}>
              <span className="cast-dot" aria-hidden>
                {c[0]}
              </span>
              {c}
            </span>
          ))}
        </div>
      </header>

      <div className="scene-tools">
        {mode === "play" ? (
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={stop}
          >
            <Pause size={16} aria-hidden /> Hentikan
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() => start("play")}
          >
            <Play size={16} aria-hidden /> Putar adegan
          </button>
        )}
        {mode === "shadow" ? (
          <button type="button" className="btn btn-sm" onClick={stop}>
            <Pause size={16} aria-hidden /> Hentikan bayangan
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-sm"
            onClick={() => start("shadow")}
          >
            <Mic size={16} aria-hidden /> Mode bayangan
          </button>
        )}
        <button
          type="button"
          className="btn btn-sm btn-quiet"
          onClick={() => setShowMeaning((v) => !v)}
          aria-pressed={!showMeaning}
        >
          {showMeaning ? (
            <EyeOff size={16} aria-hidden />
          ) : (
            <Eye size={16} aria-hidden />
          )}
          {showMeaning ? "Sembunyikan arti" : "Tampilkan arti"}
        </button>
        {hasRoman && (
          <button
            type="button"
            className="btn btn-sm btn-quiet"
            onClick={() => setShowRoman((v) => !v)}
            aria-pressed={showRoman}
          >
            <Languages size={16} aria-hidden />{" "}
            {showRoman ? "Tanpa romanisasi" : "Romanisasi"}
          </button>
        )}
      </div>

      {mode === "shadow" && (
        <p className="shadow-hint small" aria-live="polite">
          {yourTurn
            ? "Giliranmu: ucapkan kalimat yang disorot dengan keras."
            : "Dengarkan dulu..."}
        </p>
      )}

      <ol className="scene-lines">
        {scene.lines.map((l, i) => (
          <li
            key={i}
            className="bubble-row"
            data-who={l.who}
            data-active={current === i || undefined}
            data-turn={(current === i && yourTurn) || undefined}
          >
            <span className="cast-dot" data-who={l.who} aria-hidden>
              {scene.cast[l.who][0]}
            </span>
            <div className="speech">
              <span className="sr-only">{scene.cast[l.who]}: </span>
              <span className="speech-text" lang={tts} dir={dir}>
                {l.text}
              </span>
              {showRoman && l.roman && (
                <span className="term-roman">{l.roman}</span>
              )}
              {showMeaning && (
                <span className="speech-meaning">{l.meaning}</span>
              )}
              {l.note && <span className="speech-note">{l.note}</span>}
            </div>
            <button
              type="button"
              className="speak"
              onClick={() => speak(l.text, tts, { pitch: PITCH[l.who] })}
              aria-label={`Dengarkan kalimat ${i + 1}`}
            >
              <Volume2 size={18} strokeWidth={1.75} />
            </button>
          </li>
        ))}
      </ol>
    </article>
  );
}
