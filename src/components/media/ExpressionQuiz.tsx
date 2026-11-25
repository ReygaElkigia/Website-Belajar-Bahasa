"use client";

import { useState } from "react";
import { Check, RotateCcw, Volume2, X } from "lucide-react";
import { speak } from "@/lib/speech";
import { gainXp } from "@/lib/progress";
import { CHEER_RIGHT, CHEER_WRONG, XP } from "@/data/gamify";
import type { MediaExpression } from "@/data/media";
import { MascotSays } from "../mascot/Mascot";

interface Q {
  answer: MediaExpression;
  options: MediaExpression[];
}

function shuffle<T>(a: T[]) {
  const r = [...a];
  for (let i = r.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [r[i], r[j]] = [r[j], r[i]];
  }
  return r;
}

const build = (items: MediaExpression[]): Q[] =>
  shuffle(items)
    .slice(0, 6)
    .map((answer) => ({
      answer,
      options: shuffle([
        answer,
        ...shuffle(items.filter((x) => x !== answer)).slice(0, 3),
      ]),
    }));

/** Kuis singkat: dengar ungkapan khas tontonan, pilih artinya. */
export function ExpressionQuiz({
  items,
  tts,
  dir,
  langSlug,
}: {
  items: MediaExpression[];
  tts: string;
  dir: "ltr" | "rtl";
  langSlug: string;
}) {
  const [qs, setQs] = useState<Q[] | null>(null);
  const [n, setN] = useState(0);
  const [picked, setPicked] = useState<MediaExpression | null>(null);
  const [right, setRight] = useState(0);

  const start = () => {
    setQs(build(items));
    setN(0);
    setPicked(null);
    setRight(0);
  };

  if (!qs) {
    return (
      <div className="panel">
        <h3>Kuis ungkapan</h3>
        <p className="small muted">
          Enam soal: dengarkan ungkapan, lalu pilih artinya. Setiap jawaban
          benar memberi XP.
        </p>
        <button
          type="button"
          className="btn btn-primary btn-sm mt-3"
          onClick={start}
        >
          Mulai kuis
        </button>
      </div>
    );
  }

  if (n >= qs.length) {
    const score = Math.round((right / qs.length) * 100);
    return (
      <div className="panel">
        <MascotSays
          mood={score >= 100 ? "cheer" : score >= 70 ? "happy" : "think"}
        >
          <strong>
            {right} dari {qs.length} benar.
          </strong>{" "}
          {score >= 70
            ? "Telingamu sudah siap menonton."
            : "Putar lagi adegannya, lalu coba sekali lagi."}
        </MascotSays>
        <button type="button" className="btn btn-sm mt-4" onClick={start}>
          <RotateCcw size={16} aria-hidden /> Ulangi
        </button>
      </div>
    );
  }

  const q = qs[n];
  const choose = (o: MediaExpression) => {
    if (picked) return;
    setPicked(o);
    if (o === q.answer) {
      setRight((r) => r + 1);
      gainXp(XP.correct, "Kuis ungkapan", langSlug);
    }
  };

  return (
    <div className="panel quiz">
      <div className="quiz-progress" aria-hidden>
        <i style={{ width: `${(n / qs.length) * 100}%` }} />
      </div>
      <p className="muted small">
        Soal {n + 1} dari {qs.length}. Apa artinya?
      </p>
      <div className="quiz-prompt">
        <span className="big" lang={tts} dir={dir}>
          {q.answer.text}
        </span>
        <button
          type="button"
          className="speak"
          onClick={() => speak(q.answer.text.split(" / ")[0], tts)}
          aria-label="Dengarkan"
        >
          <Volume2 size={18} strokeWidth={1.75} />
        </button>
      </div>
      <ul className="options">
        {q.options.map((o, i) => {
          const state = picked
            ? o === q.answer
              ? "right"
              : o === picked
                ? "wrong"
                : undefined
            : undefined;
          return (
            <li key={o.text}>
              <button
                type="button"
                className="option"
                data-state={state}
                disabled={!!picked}
                onClick={() => choose(o)}
              >
                <kbd aria-hidden>{i + 1}</kbd>
                <span>{o.meaning}</span>
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
                    style={{ marginLeft: "auto", color: "var(--margin)" }}
                    aria-label="Salah"
                  />
                )}
              </button>
            </li>
          );
        })}
      </ul>
      {picked && (
        <div
          className="feedback"
          data-ok={picked === q.answer}
          aria-live="polite"
        >
          <p className="small">
            {picked === q.answer ? (
              <>
                {CHEER_RIGHT[n % CHEER_RIGHT.length]}{" "}
                <span className="xp-chip">+{XP.correct} XP</span>
              </>
            ) : (
              CHEER_WRONG[n % CHEER_WRONG.length]
            )}
            {q.answer.note && (
              <span
                className="tiny muted"
                style={{ display: "block", marginTop: 4 }}
              >
                {q.answer.note}
              </span>
            )}
          </p>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() => (setN(n + 1), setPicked(null))}
            autoFocus
          >
            {n + 1 < qs.length ? "Lanjut" : "Lihat hasil"}
          </button>
        </div>
      )}
    </div>
  );
}
