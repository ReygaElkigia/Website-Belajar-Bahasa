"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Check, RotateCcw, Volume2, X } from "lucide-react";
import { speak, useVoiceStatus } from "@/lib/speech";
import { completeUnit } from "@/lib/progress";

export interface QuizItem {
  id: string;
  word: string;
  roman?: string;
  meaning: string;
}

type Kind = "meaning" | "word" | "listen";

interface Question {
  kind: Kind;
  answer: QuizItem;
  options: QuizItem[];
}

interface Props {
  items: QuizItem[];
  pool: QuizItem[];
  langSlug: string;
  langName: string;
  tts: string;
  dir: "ltr" | "rtl";
  unitId?: string;
  nextHref?: string;
  nextLabel?: string;
  count?: number;
}

function shuffle<T>(arr: T[], rand: () => number): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function build(items: QuizItem[], pool: QuizItem[], count: number, canListen: boolean, seed: number): Question[] {
  let s = seed;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  const kinds: Kind[] = canListen ? ["meaning", "word", "listen"] : ["meaning", "word"];
  return shuffle(items, rand)
    .slice(0, count)
    .map((answer, n) => {
      const distractors = shuffle(
        pool.filter((p) => p.id !== answer.id && p.meaning !== answer.meaning && p.word !== answer.word),
        rand,
      ).slice(0, 3);
      return { kind: kinds[n % kinds.length], answer, options: shuffle([answer, ...distractors], rand) };
    });
}

export function Quiz({ items, pool, langSlug, langName, tts, dir, unitId, nextHref, nextLabel, count = 10 }: Props) {
  const voice = useVoiceStatus(tts);
  const canListen = voice === "ok";
  const [seed, setSeed] = useState(1);
  const questions = useMemo(
    () => build(items, pool, Math.min(count, items.length), canListen, seed),
    [items, pool, count, canListen, seed],
  );
  const [n, setN] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [right, setRight] = useState(0);
  const [started, setStarted] = useState(false);

  const q = questions[n];
  const finished = n >= questions.length;
  const score = questions.length ? Math.round((right / questions.length) * 100) : 0;

  const choose = useCallback(
    (id: string) => {
      if (picked || !q) return;
      setPicked(id);
      if (id === q.answer.id) setRight((r) => r + 1);
      // Selalu perdengarkan jawaban benar agar telinga ikut belajar.
      speak(q.answer.word, tts);
    },
    [picked, q, tts],
  );

  const next = useCallback(() => {
    setPicked(null);
    setN((x) => x + 1);
  }, []);

  useEffect(() => {
    if (finished && unitId && questions.length) completeUnit(langSlug, unitId, score);
  }, [finished, unitId, langSlug, score, questions.length]);

  useEffect(() => {
    if (q?.kind === "listen" && started && !picked) speak(q.answer.word, tts);
  }, [q, started, picked, tts]);

  useEffect(() => {
    if (!started || finished) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;
      const k = Number(e.key);
      if (!picked && k >= 1 && k <= (q?.options.length ?? 0)) choose(q.options[k - 1].id);
      if (picked && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        next();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [started, finished, picked, q, choose, next]);

  const restart = () => {
    setSeed((x) => x + 1);
    setN(0);
    setRight(0);
    setPicked(null);
    setStarted(true);
  };

  if (!started) {
    return (
      <div className="quiz panel">
        <h3>Uji diri: {Math.min(count, items.length)} soal</h3>
        <p className="muted small">
          Pilih arti kata, pilih kata yang tepat, {canListen ? "dan tebak kata dari suaranya" : "dalam tiga sampai empat pilihan"}.
          Gunakan tombol angka 1 sampai 4 di papan ketik.
        </p>
        <div className="btn-row mt-4">
          <button type="button" className="btn btn-primary" onClick={() => setStarted(true)}>
            Mulai kuis
          </button>
        </div>
      </div>
    );
  }

  if (finished) {
    const passed = score >= 70;
    return (
      <div className="quiz panel" aria-live="polite">
        <p className="muted small">Hasil kuis</p>
        <p className="score mt-2">{score}</p>
        <p className="mt-3">
          {right} dari {questions.length} jawaban benar.{" "}
          {passed
            ? unitId
              ? "Unit ini ditandai selesai."
              : "Hasil yang bagus."
            : "Ulangi kosakata di atas, lalu coba sekali lagi. Unit ditandai selesai dengan skor 70 ke atas."}
        </p>
        <div className="btn-row mt-5">
          {passed && nextHref && (
            <Link className="btn btn-primary" href={nextHref}>
              {nextLabel ?? "Lanjut"}
            </Link>
          )}
          <button type="button" className={passed && nextHref ? "btn" : "btn btn-primary"} onClick={restart}>
            <RotateCcw size={18} strokeWidth={1.75} aria-hidden />
            Ulangi kuis
          </button>
        </div>
      </div>
    );
  }

  const isRight = picked === q.answer.id;
  const prompt =
    q.kind === "meaning" ? (
      <>
        <span className="big" lang={tts} dir={dir}>
          {q.answer.word}
        </span>
        <button type="button" className="speak" onClick={() => speak(q.answer.word, tts)} aria-label="Dengarkan">
          <Volume2 size={18} strokeWidth={1.75} />
        </button>
      </>
    ) : q.kind === "word" ? (
      <span className="big" style={{ fontFamily: "var(--font-serif)", fontWeight: 600 }}>
        {q.answer.meaning}
      </span>
    ) : (
      <button
        type="button"
        className="btn"
        onClick={() => speak(q.answer.word, tts)}
        style={{ minHeight: 64, paddingInline: 24 }}
      >
        <Volume2 size={24} strokeWidth={1.75} aria-hidden />
        Putar suara lagi
      </button>
    );

  const question =
    q.kind === "meaning"
      ? "Apa artinya?"
      : q.kind === "word"
        ? `Mana bahasa ${langName}-nya?`
        : "Dengarkan, lalu pilih artinya.";

  return (
    <div className="quiz">
      <div className="quiz-progress" aria-hidden>
        <i style={{ width: `${(n / questions.length) * 100}%` }} />
      </div>
      <p className="muted small">
        Soal {n + 1} dari {questions.length}. {question}
      </p>
      <div className="quiz-prompt">{prompt}</div>
      <ul className="options">
        {q.options.map((o, idx) => {
          const state = picked ? (o.id === q.answer.id ? "right" : o.id === picked ? "wrong" : undefined) : undefined;
          const showWord = q.kind === "word";
          return (
            <li key={o.id}>
              <button type="button" className="option" data-state={state} disabled={!!picked} onClick={() => choose(o.id)}>
                <kbd aria-hidden>{idx + 1}</kbd>
                {showWord ? (
                  <span className="term">
                    <span lang={tts} dir={dir} style={{ fontWeight: 600 }}>
                      {o.word}
                    </span>
                    {o.roman && picked && <span className="term-roman">{o.roman}</span>}
                  </span>
                ) : (
                  <span>{o.meaning}</span>
                )}
                {state === "right" && <Check size={18} style={{ marginLeft: "auto", color: "var(--ok)" }} aria-label="Benar" />}
                {state === "wrong" && <X size={18} style={{ marginLeft: "auto", color: "var(--margin)" }} aria-label="Salah" />}
              </button>
            </li>
          );
        })}
      </ul>
      {picked && (
        <div className="feedback" data-ok={isRight} aria-live="polite">
          <span>
            <strong>{isRight ? "Benar." : "Belum tepat."}</strong>{" "}
            <span lang={tts} dir={dir}>
              {q.answer.word}
            </span>
            {q.answer.roman ? ` (${q.answer.roman})` : ""} berarti &ldquo;{q.answer.meaning}&rdquo;.
          </span>
          <button type="button" className="btn btn-primary btn-sm" onClick={next} autoFocus>
            {n + 1 === questions.length ? "Lihat hasil" : "Soal berikutnya"}
          </button>
        </div>
      )}
    </div>
  );
}
