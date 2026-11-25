"use client";

import { useEffect, useRef, useState } from "react";
import {
  Check,
  Eye,
  EyeOff,
  Languages,
  Pause,
  Play,
  RotateCcw,
  Volume2,
  X,
} from "lucide-react";
import { speak, stopSpeaking } from "@/lib/speech";
import { completeReading, PASS, useProgress } from "@/lib/progress";
import { XP } from "@/data/gamify";
import type { Reading } from "@/data/readings";
import { MascotSays } from "./mascot/Mascot";

interface Props {
  reading: Reading;
  langSlug: string;
  tts: string;
  dir: "ltr" | "rtl";
}

/**
 * Pembaca cerita bertingkat: dengarkan per kalimat atau seluruhnya,
 * buka terjemahan bila perlu, lalu jawab soal pemahaman.
 */
export function Reader({ reading, langSlug, tts, dir }: Props) {
  const hasRoman = reading.sentences.some((s) => s.roman);
  const [showRoman, setShowRoman] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [opened, setOpened] = useState<Set<number>>(new Set());
  const [playing, setPlaying] = useState<number | null>(null);
  const [flash, setFlash] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>(() =>
    reading.questions.map(() => null),
  );
  const [reported, setReported] = useState(false);
  const [firstPass, setFirstPass] = useState(false);
  const playRef = useRef(false);
  const lineRefs = useRef<(HTMLLIElement | null)[]>([]);
  const progress = useProgress();
  const best = progress.reads[langSlug]?.[reading.id];

  useEffect(() => () => stopSpeaking(), []);

  const playFrom = (i: number) => {
    if (i >= reading.sentences.length || !playRef.current) {
      playRef.current = false;
      setPlaying(null);
      return;
    }
    setPlaying(i);
    lineRefs.current[i]?.scrollIntoView({
      block: "nearest",
      behavior: "smooth",
    });
    speak(reading.sentences[i].text, tts, {
      onEnd: () => window.setTimeout(() => playFrom(i + 1), 350),
    });
  };

  const togglePlayAll = () => {
    if (playRef.current) {
      playRef.current = false;
      stopSpeaking();
      setPlaying(null);
    } else {
      playRef.current = true;
      playFrom(0);
    }
  };

  const toggleLine = (i: number) =>
    setOpened((o) => {
      const n = new Set(o);
      if (n.has(i)) n.delete(i);
      else n.add(i);
      return n;
    });

  const jumpTo = (line: number) => {
    const i = line - 1;
    lineRefs.current[i]?.scrollIntoView({
      block: "center",
      behavior: "smooth",
    });
    setFlash(i);
    window.setTimeout(() => setFlash(null), 1600);
  };

  const answered = answers.filter((a) => a !== null).length;
  const right = answers.filter(
    (a, i) => a === reading.questions[i].answer,
  ).length;
  const done = answered === reading.questions.length;
  const score = Math.round((right / reading.questions.length) * 100);

  useEffect(() => {
    if (done && !reported) {
      setFirstPass(score >= PASS && (best ?? 0) < PASS);
      completeReading(langSlug, reading.id, score);
      setReported(true);
    }
  }, [done, reported, langSlug, reading.id, score, best]);

  const retry = () => {
    setAnswers(reading.questions.map(() => null));
    setReported(false);
    setFirstPass(false);
  };

  return (
    <div className="reader">
      <div className="reader-read">
        <div className="reader-tools panel">
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={togglePlayAll}
            aria-pressed={playing !== null}
          >
            {playing !== null ? (
              <Pause size={16} aria-hidden />
            ) : (
              <Play size={16} aria-hidden />
            )}
            {playing !== null ? "Hentikan" : "Dengarkan semua"}
          </button>
          <button
            type="button"
            className="btn btn-sm"
            onClick={() => setShowAll((v) => !v)}
            aria-pressed={showAll}
          >
            {showAll ? (
              <EyeOff size={16} aria-hidden />
            ) : (
              <Eye size={16} aria-hidden />
            )}
            {showAll ? "Sembunyikan arti" : "Tampilkan semua arti"}
          </button>
          {hasRoman && (
            <button
              type="button"
              className="btn btn-sm btn-quiet"
              onClick={() => setShowRoman((v) => !v)}
              aria-pressed={showRoman}
            >
              <Languages size={16} aria-hidden />
              {showRoman ? "Tanpa romanisasi" : "Romanisasi"}
            </button>
          )}
          <span className="tiny muted reader-hint">
            Ketuk kalimat untuk melihat artinya.
          </span>
        </div>

        <ol className="reader-text panel">
          {reading.sentences.map((s, i) => {
            const open = showAll || opened.has(i);
            return (
              <li
                key={i}
                ref={(el) => {
                  lineRefs.current[i] = el;
                }}
                className="reader-line"
                data-playing={playing === i || undefined}
                data-flash={flash === i || undefined}
              >
                <span className="reader-num" aria-hidden>
                  {i + 1}
                </span>
                <div className="reader-body">
                  <button
                    type="button"
                    className="reader-sentence"
                    onClick={() => toggleLine(i)}
                    aria-expanded={open}
                  >
                    <span lang={tts} dir={dir}>
                      {s.text}
                    </span>
                  </button>
                  {showRoman && s.roman && (
                    <span className="term-roman">{s.roman}</span>
                  )}
                  {open && <span className="reader-meaning">{s.meaning}</span>}
                </div>
                <button
                  type="button"
                  className="speak"
                  onClick={() => speak(s.text, tts)}
                  aria-label={`Dengarkan kalimat ${i + 1}`}
                >
                  <Volume2 size={18} strokeWidth={1.75} />
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      <section className="reader-questions" aria-labelledby={`q-${reading.id}`}>
        <div className="row between">
          <h2 id={`q-${reading.id}`} style={{ fontSize: 24 }}>
            Soal pemahaman
          </h2>
          <span className="small muted">
            {answered} dari {reading.questions.length} dijawab
            {best !== undefined && ` · skor terbaik ${best}`}
          </span>
        </div>
        <ol className="reader-qlist">
          {reading.questions.map((q, qi) => {
            const picked = answers[qi];
            return (
              <li key={q.q} className="panel reader-q">
                <p style={{ fontWeight: 700 }}>
                  {qi + 1}. {q.q}
                </p>
                <ul className="options">
                  {q.options.map((o, oi) => {
                    const state =
                      picked === null
                        ? undefined
                        : oi === q.answer
                          ? "right"
                          : oi === picked
                            ? "wrong"
                            : undefined;
                    return (
                      <li key={o}>
                        <button
                          type="button"
                          className="option"
                          data-state={state}
                          disabled={picked !== null}
                          onClick={() =>
                            setAnswers((a) =>
                              a.map((x, i) => (i === qi ? oi : x)),
                            )
                          }
                        >
                          <kbd aria-hidden>{String.fromCharCode(65 + oi)}</kbd>
                          <span>{o}</span>
                          {state === "right" && (
                            <Check
                              size={18}
                              style={{ marginLeft: "auto", color: "var(--ok)" }}
                              aria-label="Benar"
                            />
                          )}
                          {state === "wrong" && (
                            <X
                              size={18}
                              style={{
                                marginLeft: "auto",
                                color: "var(--margin)",
                              }}
                              aria-label="Salah"
                            />
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
                {picked !== null && (
                  <p className="small mt-2">
                    {picked === q.answer ? "Benar. " : "Belum tepat. "}
                    <button
                      type="button"
                      className="link-btn"
                      onClick={() => jumpTo(q.line)}
                    >
                      Lihat kalimat {q.line}
                    </button>
                  </p>
                )}
              </li>
            );
          })}
        </ol>

        {done && (
          <div className="panel reader-result" aria-live="polite">
            <MascotSays
              mood={score >= 100 ? "cheer" : score >= PASS ? "happy" : "think"}
            >
              <strong>
                Skor {score}: {right} dari {reading.questions.length} benar.
              </strong>{" "}
              {score >= PASS
                ? firstPass
                  ? "Bacaan ini ditandai selesai."
                  : "Pemahamanmu bagus."
                : "Baca sekali lagi kalimat yang ditunjuk, lalu coba lagi. Bacaan lulus dengan skor 70 ke atas."}
              {firstPass && <span className="xp-chip">+{XP.reading} XP</span>}
            </MascotSays>
            <button type="button" className="btn btn-sm mt-4" onClick={retry}>
              <RotateCcw size={16} aria-hidden />
              Jawab ulang
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
