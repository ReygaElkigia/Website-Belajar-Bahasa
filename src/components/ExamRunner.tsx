"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowDown, ArrowUp, Check, Mic, RotateCcw, Square, Timer, Turtle, Volume2, X } from "lucide-react";
import type { PracticePart, Question } from "@/data/exams/types";
import { speak } from "@/lib/speech";
import { gainXp, saveExamPart } from "@/lib/progress";
import { CHEER_WRONG, PRAISE, XP } from "@/data/gamify";
import { Mascot, MascotSays } from "./mascot/Mascot";
import { countWords, scoreMulti, scoreOrder, scoreTyped, scoreWords } from "@/lib/examScore";

interface Props {
  examId: string;
  langSlug: string;
  part: PracticePart;
  tts: string;
  dir: "ltr" | "rtl";
  onExit: () => void;
}

/** Hasil satu soal: skor 0..1 dan apakah dinilai otomatis. */
interface Result {
  score: number;
  auto: boolean;
}

const isAuto = (q: Question) => q.type !== "speak" && q.type !== "write";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  // Hindari urutan acak yang kebetulan sudah benar.
  if (a.length > 1 && a.every((x, i) => x === arr[i])) [a[0], a[1]] = [a[1], a[0]];
  return a;
}

export function ExamRunner({ examId, langSlug, part, tts, dir, onExit }: Props) {
  const [i, setI] = useState(0);
  const [results, setResults] = useState<Result[]>([]);
  const q = part.questions[i];
  const done = i >= part.questions.length;

  const record = useCallback((r: Result) => {
    const xp = r.auto ? Math.round(XP.correct * r.score) : XP.selfCheck;
    if (xp > 0) gainXp(xp, r.auto ? "Soal ujian" : "Penilaian diri", langSlug);
    setResults((rs) => {
      const next = [...rs];
      next[i] = r;
      return next;
    });
  }, [i, langSlug]);

  const autoResults = results.filter((r) => r?.auto);
  const selfResults = results.filter((r) => r && !r.auto);
  const autoPct = autoResults.length ? Math.round((autoResults.reduce((s, r) => s + r.score, 0) / autoResults.length) * 100) : null;
  const selfPct = selfResults.length ? Math.round((selfResults.reduce((s, r) => s + r.score, 0) / selfResults.length) * 100) : null;

  useEffect(() => {
    if (!done) return;
    const all = results.filter(Boolean);
    if (!all.length) return;
    const pct = Math.round((all.reduce((s, r) => s + r.score, 0) / all.length) * 100);
    saveExamPart(examId, part.id, pct, langSlug);
  }, [done, results, examId, part.id, langSlug]);

  const restart = () => {
    setI(0);
    setResults([]);
  };

  if (done) {
    return (
      <div className="panel" aria-live="polite">
        <div className="row" style={{ gap: 14, flexWrap: "nowrap" }}>
          <Mascot mood={(autoPct ?? selfPct ?? 0) >= 70 ? "cheer" : "think"} size={80} />
          <p className="muted small">Selesai: {part.title}. Bonus +{XP.examPart} XP untuk bagian yang pertama kali selesai.</p>
        </div>
        <dl className="stats mt-4" style={{ gridTemplateColumns: "repeat(2, minmax(0, 1fr))" }}>
          <div>
            <dt>Dinilai otomatis</dt>
            <dd>{autoPct === null ? "–" : `${autoPct}%`}</dd>
          </div>
          <div>
            <dt>Penilaian diri</dt>
            <dd>{selfPct === null ? "–" : `${selfPct}%`}</dd>
          </div>
        </dl>
        <p className="small muted mt-5">
          Persentase ini hanya gambaran latihan dan tidak dikonversi ke skor resmi ujian, karena setiap penyelenggara
          memakai skala dan pembobotan sendiri.
        </p>
        <div className="btn-row mt-5">
          <button type="button" className="btn btn-primary" onClick={restart}>
            <RotateCcw size={18} strokeWidth={1.75} aria-hidden />
            Ulangi bagian ini
          </button>
          <button type="button" className="btn" onClick={onExit}>
            Pilih bagian lain
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="row between" style={{ marginBottom: 12 }}>
        <p className="small muted">
          {part.section}. Soal {i + 1} dari {part.questions.length}
          {q.task ? <> · <span lang={tts}>{q.task}</span></> : null}
        </p>
        <button type="button" className="btn btn-quiet btn-sm" onClick={onExit}>
          Keluar
        </button>
      </div>
      <div className="quiz-progress" aria-hidden>
        <i style={{ width: `${(i / part.questions.length) * 100}%` }} />
      </div>
      <QuestionView
        key={`${part.id}-${i}`}
        q={q}
        tts={tts}
        dir={dir}
        result={results[i]}
        langSlug={langSlug}
        onResult={record}
        onNext={() => setI((x) => x + 1)}
        last={i + 1 === part.questions.length}
      />
    </div>
  );
}

interface QProps {
  q: Question;
  langSlug: string;
  tts: string;
  dir: "ltr" | "rtl";
  result?: Result;
  onResult: (r: Result) => void;
  onNext: () => void;
  last: boolean;
}

function QuestionView({ q, tts, dir, result, onResult, onNext, last, langSlug }: QProps) {
  const checked = !!result;
  return (
    <div className="exam-q">
      {q.audio && <AudioPlayer text={q.audio} tts={tts} />}
      {q.passage && (
        <div className="exam-passage" lang={tts} dir={dir}>
          {q.passage}
        </div>
      )}
      {q.type === "mc" && <Mc q={q} tts={tts} dir={dir} checked={checked} onResult={onResult} />}
      {q.type === "multi" && <Multi q={q} tts={tts} dir={dir} checked={checked} onResult={onResult} />}
      {q.type === "order" && <Order q={q} tts={tts} dir={dir} checked={checked} onResult={onResult} />}
      {q.type === "gap" && <Gap q={q} tts={tts} dir={dir} checked={checked} onResult={onResult} />}
      {q.type === "type" && <Typed q={q} tts={tts} dir={dir} checked={checked} onResult={onResult} />}
      {q.type === "speak" && <Speak q={q} tts={tts} dir={dir} checked={checked} onResult={onResult} />}
      {q.type === "write" && <Write q={q} tts={tts} dir={dir} checked={checked} onResult={onResult} />}

      {checked && (
        <div className="feedback" data-ok={result.auto ? result.score >= 0.99 : true} aria-live="polite">
          <MascotSays mood={!result.auto || result.score >= 0.99 ? "happy" : result.score > 0 ? "think" : "sad"} size={60}>
            {!result.auto || result.score >= 0.99 ? (
              <b lang={PRAISE[langSlug]?.tts}>{PRAISE[langSlug]?.text}</b>
            ) : (
              CHEER_WRONG[q.prompt.length % CHEER_WRONG.length]
            )}
          </MascotSays>
          <span>
            <strong>
              {result.auto
                ? result.score >= 0.99
                  ? "Benar."
                  : result.score > 0
                    ? `Sebagian benar (${Math.round(result.score * 100)}%).`
                    : "Belum tepat."
                : `Penilaian diri: ${Math.round(result.score * 100)}%.`}
            </strong>{" "}
            {q.explain}
          </span>
          <button type="button" className="btn btn-primary btn-sm" onClick={onNext} autoFocus>
            {last ? "Lihat hasil" : "Soal berikutnya"}
          </button>
        </div>
      )}
    </div>
  );
}

/* ---------- Audio ---------- */

function AudioPlayer({ text, tts }: { text: string; tts: string }) {
  const [plays, setPlays] = useState(0);
  const [playing, setPlaying] = useState(false);
  const play = (slow = false) => {
    const ok = speak(text, tts, { slow, onEnd: () => setPlaying(false) });
    if (ok) {
      setPlaying(true);
      setPlays((n) => n + 1);
    }
  };
  return (
    <div className="exam-audio">
      <button type="button" className="btn" data-playing={playing} onClick={() => play()}>
        <Volume2 size={18} strokeWidth={1.75} aria-hidden />
        {plays === 0 ? "Putar audio" : "Putar lagi"}
      </button>
      <button type="button" className="btn btn-quiet btn-sm" onClick={() => play(true)}>
        <Turtle size={16} strokeWidth={1.75} aria-hidden />
        Pelan
      </button>
      <span className="tiny muted">
        {plays > 1 ? `Diputar ${plays} kali. Di ujian asli, audio biasanya hanya sekali atau dua kali.` : "Audio dibacakan oleh suara perangkat."}
      </span>
    </div>
  );
}

/* ---------- Tipe soal ---------- */

interface TypeProps<T extends Question> {
  q: T;
  tts: string;
  dir: "ltr" | "rtl";
  checked: boolean;
  onResult: (r: Result) => void;
}

function Prompt({ text, tts, dir }: { text: string; tts: string; dir: "ltr" | "rtl" }) {
  return (
    <p className="exam-prompt" lang={tts} dir={dir}>
      {text}
    </p>
  );
}

function Mc({ q, tts, dir, checked, onResult }: TypeProps<Extract<Question, { type: "mc" }>>) {
  const [picked, setPicked] = useState<number | null>(null);
  const choose = (n: number) => {
    if (checked) return;
    setPicked(n);
    onResult({ score: n === q.answer ? 1 : 0, auto: true });
  };
  useKeys(q.options.length, choose, !checked);
  return (
    <>
      <Prompt text={q.prompt} tts={tts} dir={dir} />
      <ul className="options">
        {q.options.map((o, n) => {
          const state = checked ? (n === q.answer ? "right" : n === picked ? "wrong" : undefined) : undefined;
          return (
            <li key={n}>
              <button type="button" className="option" data-state={state} disabled={checked} onClick={() => choose(n)}>
                <kbd aria-hidden>{n + 1}</kbd>
                <span lang={tts} dir={dir}>
                  {o}
                </span>
                {state === "right" && <Check size={18} className="opt-icon ok" aria-label="Benar" />}
                {state === "wrong" && <X size={18} className="opt-icon bad" aria-label="Salah" />}
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}

function Multi({ q, tts, dir, checked, onResult }: TypeProps<Extract<Question, { type: "multi" }>>) {
  const [picked, setPicked] = useState<number[]>([]);
  const toggle = (n: number) => setPicked((p) => (p.includes(n) ? p.filter((x) => x !== n) : [...p, n]));
  return (
    <>
      <Prompt text={q.prompt} tts={tts} dir={dir} />
      <ul className="options one-col">
        {q.options.map((o, n) => {
          const on = picked.includes(n);
          const right = q.answers.includes(n);
          const state = checked ? (right ? "right" : on ? "wrong" : undefined) : on ? "picked" : undefined;
          return (
            <li key={n}>
              <button type="button" className="option" role="checkbox" aria-checked={on} data-state={state} disabled={checked} onClick={() => toggle(n)}>
                <span className="checkbox" aria-hidden>
                  {on && <Check size={14} strokeWidth={2.5} />}
                </span>
                <span lang={tts} dir={dir}>
                  {o}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      {!checked && (
        <button
          type="button"
          className="btn btn-primary mt-4"
          disabled={!picked.length}
          onClick={() => onResult({ score: scoreMulti(picked, q.answers), auto: true })}
        >
          Periksa jawaban
        </button>
      )}
    </>
  );
}

function Order({ q, tts, dir, checked, onResult }: TypeProps<Extract<Question, { type: "order" }>>) {
  const [order, setOrder] = useState<string[]>(() => shuffle(q.items));
  const move = (n: number, d: -1 | 1) => {
    setOrder((o) => {
      const m = n + d;
      if (m < 0 || m >= o.length) return o;
      const next = [...o];
      [next[n], next[m]] = [next[m], next[n]];
      return next;
    });
  };
  const joiner = q.joiner ?? " ";
  const block = joiner === "\n";
  return (
    <>
      <Prompt text={q.prompt} tts="id" dir="ltr" />
      {q.frame && (
        <p className="exam-frame" lang={tts} dir={dir}>
          {q.frame}
        </p>
      )}
      <ol className={block ? "order-list block" : "order-list"}>
        {order.map((item, n) => {
          const right = checked && q.items[n] === item;
          return (
            <li key={item} className="order-item" data-state={checked ? (right ? "right" : "wrong") : undefined}>
              <span className="order-num">{n + 1}</span>
              <span className="order-text" lang={tts} dir={dir}>
                {item}
              </span>
              {!checked && (
                <span className="order-moves">
                  <button type="button" className="icon-btn" onClick={() => move(n, -1)} disabled={n === 0} aria-label={`Naikkan: ${item}`}>
                    <ArrowUp size={18} strokeWidth={1.75} />
                  </button>
                  <button type="button" className="icon-btn" onClick={() => move(n, 1)} disabled={n === order.length - 1} aria-label={`Turunkan: ${item}`}>
                    <ArrowDown size={18} strokeWidth={1.75} />
                  </button>
                </span>
              )}
            </li>
          );
        })}
      </ol>
      {!checked ? (
        <button type="button" className="btn btn-primary mt-4" onClick={() => onResult({ score: scoreOrder(order, q.items), auto: true })}>
          Periksa urutan
        </button>
      ) : (
        <p className="exam-answer" lang={tts} dir={dir}>
          <span className="tiny muted">Urutan benar</span>
          <span style={{ whiteSpace: block ? "pre-line" : undefined }}>{q.items.join(joiner)}</span>
        </p>
      )}
    </>
  );
}

function Gap({ q, tts, dir, checked, onResult }: TypeProps<Extract<Question, { type: "gap" }>>) {
  const [vals, setVals] = useState<(number | null)[]>(() => q.gaps.map(() => null));
  const parts = q.text.split(/(\[\d+\])/g);
  return (
    <>
      <Prompt text={q.prompt} tts="id" dir="ltr" />
      <p className="exam-gaptext" lang={tts} dir={dir}>
        {parts.map((p, k) => {
          const m = p.match(/^\[(\d+)\]$/);
          if (!m) return <span key={k}>{p}</span>;
          const g = Number(m[1]);
          const gap = q.gaps[g];
          const v = vals[g];
          const state = checked ? (v === gap.answer ? "right" : "wrong") : undefined;
          return (
            <span key={k} className="gap-wrap" data-state={state}>
              <label className="sr-only" htmlFor={`gap-${g}`}>
                Rumpang {g + 1}
              </label>
              <select
                id={`gap-${g}`}
                className="select gap-select"
                value={v ?? ""}
                disabled={checked}
                onChange={(e) => setVals((vs) => vs.map((x, n) => (n === g ? Number(e.target.value) : x)))}
              >
                <option value="" disabled>
                  pilih…
                </option>
                {gap.options.map((o, n) => (
                  <option key={n} value={n}>
                    {o}
                  </option>
                ))}
              </select>
              {checked && v !== gap.answer && <span className="gap-fix">{gap.options[gap.answer]}</span>}
            </span>
          );
        })}
      </p>
      {!checked && (
        <button
          type="button"
          className="btn btn-primary mt-4"
          disabled={vals.some((v) => v === null)}
          onClick={() => onResult({ score: vals.filter((v, n) => v === q.gaps[n].answer).length / q.gaps.length, auto: true })}
        >
          Periksa jawaban
        </button>
      )}
    </>
  );
}

function Typed({ q, tts, dir, checked, onResult }: TypeProps<Extract<Question, { type: "type" }>>) {
  const [v, setV] = useState("");
  const long = q.answer.split(/\s+/).length > 3;
  const submit = () => onResult({ score: scoreTyped(v, q.answer, q.accept), auto: true });
  return (
    <>
      <Prompt text={q.prompt} tts="id" dir="ltr" />
      {q.display && (
        <p className="exam-frame" lang={tts} dir={dir}>
          {q.display}
        </p>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!checked && v.trim()) submit();
        }}
      >
        <label className="sr-only" htmlFor="typed">
          Jawaban
        </label>
        {long ? (
          <textarea id="typed" className="exam-input" rows={3} lang={tts} dir={dir} value={v} disabled={checked} onChange={(e) => setV(e.target.value)} />
        ) : (
          <input id="typed" className="exam-input" lang={tts} dir={dir} autoComplete="off" value={v} disabled={checked} onChange={(e) => setV(e.target.value)} autoFocus />
        )}
        {!checked && (
          <button type="submit" className="btn btn-primary mt-4" disabled={!v.trim()}>
            Periksa jawaban
          </button>
        )}
      </form>
      {checked && (
        <p className="exam-answer" lang={tts} dir={dir}>
          <span className="tiny muted">Jawaban</span>
          {q.answer}
        </p>
      )}
    </>
  );
}

/* ---------- Berbicara ---------- */

type Rec = { start: () => void; stop: () => void; abort: () => void } & Record<string, unknown>;

function getRecognizer(lang: string): Rec | null {
  if (typeof window === "undefined") return null;
  const W = window as unknown as { SpeechRecognition?: new () => Rec; webkitSpeechRecognition?: new () => Rec };
  const C = W.SpeechRecognition ?? W.webkitSpeechRecognition;
  if (!C) return null;
  const r = new C();
  r.lang = lang;
  r.interimResults = true;
  r.continuous = true;
  return r;
}

function Countdown({ seconds, label, onDone }: { seconds: number; label: string; onDone?: () => void }) {
  const [left, setLeft] = useState(seconds);
  const cb = useRef(onDone);
  cb.current = onDone;
  useEffect(() => {
    if (left <= 0) {
      cb.current?.();
      return;
    }
    const t = window.setTimeout(() => setLeft((x) => x - 1), 1000);
    return () => window.clearTimeout(t);
  }, [left]);
  const mm = Math.floor(left / 60);
  const ss = String(left % 60).padStart(2, "0");
  return (
    <span className="timer" data-low={left <= 10} role="timer" aria-live="off">
      <Timer size={16} strokeWidth={1.75} aria-hidden />
      {label} {mm}:{ss}
    </span>
  );
}

function Checklist({ items, onDone }: { items: string[]; onDone: (score: number) => void }) {
  const [on, setOn] = useState<boolean[]>(() => items.map(() => false));
  return (
    <div className="panel mt-5">
      <h3>Nilai diri Anda</h3>
      <p className="small muted" style={{ marginBottom: 12 }}>
        Centang kriteria yang sudah Anda penuhi. Kriteria disusun dari aspek yang dinilai di ujian aslinya.
      </p>
      <ul className="checklist">
        {items.map((t, n) => (
          <li key={n}>
            <label>
              <input type="checkbox" checked={on[n]} onChange={() => setOn((o) => o.map((x, k) => (k === n ? !x : x)))} />
              <span>{t}</span>
            </label>
          </li>
        ))}
      </ul>
      <button type="button" className="btn btn-primary mt-4" onClick={() => onDone(on.filter(Boolean).length / items.length)}>
        Simpan penilaian
      </button>
    </div>
  );
}

function Speak({ q, tts, dir, checked, onResult }: TypeProps<Extract<Question, { type: "speak" }>>) {
  const [phase, setPhase] = useState<"idle" | "prep" | "talk" | "after">("idle");
  const [transcript, setTranscript] = useState("");
  const rec = useRef<Rec | null>(null);
  const supported = useMemo(() => getRecognizer(tts) !== null, [tts]);
  const repeat = !!q.audio;

  const startTalk = () => {
    setPhase("talk");
    setTranscript("");
    const r = getRecognizer(tts);
    if (!r) return;
    rec.current = r;
    r.onresult = (e: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => {
      let t = "";
      for (let k = 0; k < e.results.length; k++) t += e.results[k][0].transcript + " ";
      setTranscript(t.trim());
    };
    r.onerror = () => undefined;
    try {
      r.start();
    } catch {
      /* mikrofon ditolak atau sedang dipakai */
    }
  };

  const stopTalk = () => {
    rec.current?.stop();
    rec.current = null;
    setPhase("after");
  };

  useEffect(() => () => rec.current?.abort(), []);

  const match = q.text && transcript ? Math.round(scoreWords(transcript, q.text) * 100) : null;

  return (
    <>
      <Prompt text={q.prompt} tts={tts} dir={dir} />
      {q.text && !repeat && (
        <div className="exam-passage" lang={tts} dir={dir}>
          {q.text}
        </div>
      )}
      <div className="row mt-4" style={{ gap: 12 }}>
        {phase === "idle" && (
          <>
            {q.prepSeconds ? (
              <button type="button" className="btn" onClick={() => setPhase("prep")}>
                Mulai persiapan ({q.prepSeconds} detik)
              </button>
            ) : null}
            <button type="button" className="btn btn-primary" onClick={startTalk}>
              <Mic size={18} strokeWidth={1.75} aria-hidden />
              Mulai berbicara
            </button>
          </>
        )}
        {phase === "prep" && (
          <>
            <Countdown seconds={q.prepSeconds ?? 0} label="Persiapan" onDone={startTalk} />
            <button type="button" className="btn btn-primary" onClick={startTalk}>
              <Mic size={18} strokeWidth={1.75} aria-hidden />
              Mulai sekarang
            </button>
          </>
        )}
        {phase === "talk" && (
          <>
            {q.speakSeconds ? <Countdown seconds={q.speakSeconds} label="Bicara" onDone={stopTalk} /> : null}
            <button type="button" className="btn btn-primary" onClick={stopTalk}>
              <Square size={16} strokeWidth={1.75} aria-hidden />
              Selesai
            </button>
          </>
        )}
      </div>
      {!supported && phase === "idle" && (
        <p className="tiny muted mt-3">Peramban ini tidak bisa menuliskan ucapan. Bicaralah dengan keras, lalu nilai sendiri.</p>
      )}
      {(phase === "talk" || phase === "after") && supported && (
        <div className="exam-answer mt-4">
          <span className="tiny muted">Yang tertangkap</span>
          <span lang={tts} dir={dir}>
            {transcript || "…"}
          </span>
          {match !== null && phase === "after" && <span className="small">Kecocokan dengan teks: {match}%</span>}
        </div>
      )}
      {phase === "after" && (
        <>
          {repeat && q.text && (
            <p className="exam-answer mt-4" lang={tts} dir={dir}>
              <span className="tiny muted">Kalimat yang diperdengarkan</span>
              {q.text}
            </p>
          )}
          {q.model && (
            <p className="exam-answer mt-4" lang={tts} dir={dir}>
              <span className="tiny muted">Contoh jawaban</span>
              {q.model}
            </p>
          )}
          {!checked && <Checklist items={q.checklist} onDone={(s) => onResult({ score: match !== null ? (s + match / 100) / 2 : s, auto: false })} />}
        </>
      )}
    </>
  );
}

/* ---------- Menulis ---------- */

function Write({ q, tts, dir, checked, onResult }: TypeProps<Extract<Question, { type: "write" }>>) {
  const [text, setText] = useState("");
  const [started, setStarted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const words = countWords(text);
  const under = q.minWords ? words < q.minWords : false;
  const over = q.maxWords ? words > q.maxWords : false;

  return (
    <>
      <Prompt text={q.prompt} tts={tts} dir={dir} />
      {q.table && (
        <div style={{ overflowX: "auto" }}>
          <table className="progress-table exam-table">
            <thead>
              <tr>
                {q.table[0].map((h) => (
                  <th key={h} scope="col">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {q.table.slice(1).map((row) => (
                <tr key={row[0]}>
                  {row.map((c, n) => (n === 0 ? <th key={n} scope="row">{c}</th> : <td key={n} className="num">{c}</td>))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="row between mt-4">
        <span className="small muted">
          {q.minWords ? `Minimal ${q.minWords} kata` : ""}
          {q.maxWords ? `${q.minWords ? ", maksimal" : "Maksimal"} ${q.maxWords} kata` : ""}
          {q.minutes ? `. Waktu ${q.minutes} menit.` : ""}
        </span>
        {started && q.minutes && !submitted ? <Countdown seconds={q.minutes * 60} label="Sisa" /> : null}
      </div>
      <label className="sr-only" htmlFor="essay">
        Jawaban tulisan
      </label>
      <textarea
        id="essay"
        className="exam-input essay"
        rows={10}
        lang={tts}
        dir={dir}
        value={text}
        disabled={submitted}
        onFocus={() => setStarted(true)}
        onChange={(e) => setText(e.target.value)}
        placeholder="Mulai menulis di sini. Waktu berjalan sejak Anda mengetik."
      />
      <p className="small mt-2" style={{ color: under || over ? "var(--margin)" : "var(--ink-2)" }}>
        {words} kata{under ? `, kurang ${q.minWords! - words}` : ""}
        {over ? `, lebih ${words - q.maxWords!}` : ""}
      </p>
      {!submitted ? (
        <button type="button" className="btn btn-primary mt-3" disabled={!text.trim()} onClick={() => setSubmitted(true)}>
          Selesai menulis
        </button>
      ) : (
        <>
          {q.model && (
            <p className="exam-answer mt-4" lang={tts} dir={dir}>
              <span className="tiny muted">Contoh jawaban (sebagian)</span>
              <span style={{ whiteSpace: "pre-line" }}>{q.model}</span>
            </p>
          )}
          {!checked && <Checklist items={q.checklist} onDone={(s) => onResult({ score: s, auto: false })} />}
        </>
      )}
    </>
  );
}

/* ---------- Papan ketik ---------- */

function useKeys(count: number, choose: (n: number) => void, active: boolean) {
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.tagName === "SELECT") return;
      const k = Number(e.key);
      if (k >= 1 && k <= count) choose(k - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [count, choose, active]);
}

