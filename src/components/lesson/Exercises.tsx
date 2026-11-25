"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Mic, Snail, Volume2 } from "lucide-react";
import { speak } from "@/lib/speech";
import { sfx } from "@/lib/sfx";
import { mainForm, speechScore, type Exercise, type Item } from "@/lib/lessons";

export interface Answer {
  ok: boolean;
  typo?: boolean;
  /** Jawaban benar yang ditampilkan di lembar umpan balik */
  solution: string;
  solutionRoman?: string;
  /** Teks bahasa target untuk tombol dengar di umpan balik */
  say?: string;
}

export interface ExProps<E extends Exercise> {
  ex: E;
  tts: string;
  dir: "ltr" | "rtl";
  locked: boolean;
  /** Kirim fungsi pemeriksa ke induk; null berarti belum bisa diperiksa. */
  setChecker: (fn: (() => Answer) | null) => void;
  /** Latihan yang menilai dirinya sendiri (pasangkan, ucapkan). */
  autoDone: (a: Answer | "skip") => void;
}

const say = (text: string, tts: string, slow = false) => speak(mainForm(text), tts, { slow });

export function TargetText({ item, tts, dir, big = true, hint }: { item: Item; tts: string; dir: "ltr" | "rtl"; big?: boolean; hint?: string }) {
  return (
    <div className="ex-target">
      <button type="button" className="ex-speak" onClick={() => say(item.word, tts)} aria-label="Dengarkan">
        <Volume2 size={24} strokeWidth={2} />
      </button>
      <div className="ex-target-text">
        <span className={big ? "ex-word" : "ex-phrase"} lang={tts} dir={dir}>
          {item.word}
        </span>
        {item.roman && <span className="ex-roman">{item.roman}</span>}
        {hint && <span className="ex-hint">{hint}</span>}
      </div>
    </div>
  );
}

/* ---------- Pilihan ganda (kata baru, arti, kata, dengar) ---------- */

export function Choice({ ex, tts, dir, locked, setChecker }: ExProps<Extract<Exercise, { type: "intro" | "meaning" | "word" | "listen" }>>) {
  const [picked, setPicked] = useState<string | null>(null);
  const showWord = ex.type === "word";
  const item = ex.item;

  useEffect(() => {
    if (ex.type !== "word") say(item.word, tts);
  }, [ex, item.word, tts]);

  useEffect(() => {
    setChecker(
      picked
        ? () => ({
            ok: picked === item.id,
            solution: showWord ? item.word : item.meaning,
            solutionRoman: showWord ? item.roman : undefined,
            say: item.word,
          })
        : null,
    );
  }, [picked, item, showWord, setChecker]);

  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (locked || (e.target as HTMLElement)?.tagName === "INPUT") return;
      const n = Number(e.key);
      if (n >= 1 && n <= ex.options.length) {
        setPicked(ex.options[n - 1].id);
        sfx.tap();
        if (showWord) say(ex.options[n - 1].word, tts);
      }
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [ex.options, locked, showWord, tts]);

  return (
    <div className="ex">
      {ex.type === "intro" && <span className="ex-badge">Kata baru</span>}
      <h2 className="ex-title">
        {ex.type === "word" ? `Mana yang berarti “${item.meaning}”?` : ex.type === "listen" ? "Dengarkan, lalu pilih artinya" : "Apa artinya?"}
      </h2>
      {ex.type === "listen" ? (
        <div className="ex-listen">
          <button type="button" className="ex-listen-btn" onClick={() => say(item.word, tts)} aria-label="Putar lagi">
            <Volume2 size={40} strokeWidth={2} />
          </button>
          <button type="button" className="ex-listen-btn ex-listen-slow" onClick={() => say(item.word, tts, true)} aria-label="Putar pelan">
            <Snail size={26} strokeWidth={2} />
          </button>
        </div>
      ) : ex.type !== "word" ? (
        <TargetText item={item} tts={tts} dir={dir} big={item.kind === "word"} hint={ex.type === "intro" ? `Petunjuk: ${item.meaning}` : undefined} />
      ) : null}
      <ul className={`ex-options${showWord ? " ex-options-target" : ""}`}>
        {ex.options.map((o, i) => (
          <li key={o.id}>
            <button
              type="button"
              className="ex-option"
              aria-pressed={picked === o.id}
              disabled={locked}
              onClick={() => {
                setPicked(o.id);
                sfx.tap();
                if (showWord) say(o.word, tts);
              }}
            >
              <kbd aria-hidden>{i + 1}</kbd>
              {showWord ? (
                <span className="ex-option-text">
                  <span lang={tts} dir={dir}>
                    {o.word}
                  </span>
                  {o.roman && <span className="ex-roman">{o.roman}</span>}
                </span>
              ) : (
                <span className="ex-option-text">{o.meaning}</span>
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- Pasangkan ---------- */

export function Match({ ex, tts, dir, autoDone }: ExProps<Extract<Exercise, { type: "match" }>>) {
  const left = useMemo(() => [...ex.items].sort(() => Math.random() - 0.5), [ex]);
  const right = useMemo(() => [...ex.items].sort(() => Math.random() - 0.5), [ex]);
  const [sel, setSel] = useState<{ side: "l" | "r"; id: string } | null>(null);
  const [done, setDone] = useState<string[]>([]);
  const [bad, setBad] = useState<string[]>([]);
  const [okFlash, setOkFlash] = useState<string | null>(null);
  const finished = useRef(false);

  const pick = (side: "l" | "r", id: string, item: Item) => {
    if (done.includes(id)) return;
    if (side === "l") say(item.word, tts);
    if (!sel || sel.side === side) {
      setSel({ side, id });
      sfx.tap();
      return;
    }
    if (sel.id === id) {
      sfx.right();
      setOkFlash(id);
      window.setTimeout(() => setOkFlash(null), 450);
      const next = [...done, id];
      setDone(next);
      setSel(null);
      if (next.length === ex.items.length && !finished.current) {
        finished.current = true;
        window.setTimeout(() => autoDone({ ok: true, solution: "Semua pasangan cocok!" }), 350);
      }
    } else {
      sfx.wrong();
      const pair = [sel.id + sel.side, id + side];
      setBad(pair);
      window.setTimeout(() => setBad([]), 500);
      setSel(null);
    }
  };

  const state = (id: string, side: "l" | "r") =>
    done.includes(id) ? (okFlash === id ? "ok" : "done") : bad.includes(id + side) ? "bad" : sel?.id === id && sel.side === side ? "sel" : undefined;

  return (
    <div className="ex">
      <h2 className="ex-title">Ketuk pasangan yang cocok</h2>
      <div className="ex-match">
        <ul>
          {left.map((it) => (
            <li key={it.id}>
              <button type="button" className="ex-tile ex-match-tile" data-state={state(it.id, "l")} disabled={done.includes(it.id)} onClick={() => pick("l", it.id, it)}>
                <span lang={tts} dir={dir}>
                  {it.word}
                </span>
              </button>
            </li>
          ))}
        </ul>
        <ul>
          {right.map((it) => (
            <li key={it.id}>
              <button type="button" className="ex-tile ex-match-tile" data-state={state(it.id, "r")} disabled={done.includes(it.id)} onClick={() => pick("r", it.id, it)}>
                {it.meaning}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ---------- Ketik artinya ---------- */

export function TypeIn({ ex, tts, dir, locked, setChecker, check }: ExProps<Extract<Exercise, { type: "type" }>> & { check: (v: string) => "right" | "typo" | "wrong" }) {
  const [v, setV] = useState("");
  const input = useRef<HTMLInputElement>(null);
  useEffect(() => {
    say(ex.item.word, tts);
    input.current?.focus();
  }, [ex, tts]);
  useEffect(() => {
    setChecker(
      v.trim()
        ? () => {
            const r = check(v);
            return { ok: r !== "wrong", typo: r === "typo", solution: ex.item.meaning, say: ex.item.word };
          }
        : null,
    );
  }, [v, ex.item, check, setChecker]);
  return (
    <div className="ex">
      <h2 className="ex-title">Tulis artinya dalam bahasa Indonesia</h2>
      <TargetText item={ex.item} tts={tts} dir={dir} big={ex.item.kind === "word"} />
      <input
        ref={input}
        className="ex-input"
        value={v}
        onChange={(e) => setV(e.target.value)}
        disabled={locked}
        placeholder="Ketik di sini"
        autoComplete="off"
        autoCapitalize="off"
        spellCheck={false}
        aria-label="Jawabanmu"
      />
    </div>
  );
}

/* ---------- Susun kalimat dari ubin ---------- */

export function Build({ ex, tts, dir, locked, setChecker, check }: ExProps<Extract<Exercise, { type: "build" }>> & { check: (p: string[], a: string[]) => boolean }) {
  const tiles = useMemo(() => ex.tiles.map((t, i) => ({ t, k: `${i}` })), [ex]);
  const [chosen, setChosen] = useState<string[]>([]);
  const toTarget = ex.dir === "to-target";

  useEffect(() => {
    if (!toTarget) say(ex.item.word, tts);
  }, [ex, toTarget, tts]);

  useEffect(() => {
    setChecker(
      chosen.length
        ? () => ({
            ok: check(
              chosen.map((k) => tiles[Number(k)].t),
              ex.answer,
            ),
            solution: toTarget ? ex.item.word : ex.item.meaning,
            solutionRoman: toTarget ? ex.item.roman : undefined,
            say: ex.item.word,
          })
        : null,
    );
  }, [chosen, tiles, ex, toTarget, check, setChecker]);

  const tap = (k: string) => {
    if (locked) return;
    sfx.tap();
    setChosen((c) => (c.includes(k) ? c.filter((x) => x !== k) : [...c, k]));
    const t = tiles[Number(k)].t;
    if (toTarget && !chosen.includes(k)) speak(t, tts);
  };

  return (
    <div className="ex">
      <h2 className="ex-title">{toTarget ? "Terjemahkan ke bahasa yang dipelajari" : "Terjemahkan kalimat ini"}</h2>
      {toTarget ? (
        <div className="ex-target ex-target-id">
          <span className="ex-phrase">{ex.item.meaning}</span>
        </div>
      ) : (
        <TargetText item={ex.item} tts={tts} dir={dir} big={false} />
      )}
      <div className="ex-answer-line" data-empty={!chosen.length || undefined} dir={toTarget ? dir : "ltr"}>
        {chosen.map((k) => (
          <button key={k} type="button" className="ex-tile ex-tile-in" onClick={() => tap(k)} disabled={locked} lang={toTarget ? tts : "id"}>
            {tiles[Number(k)].t}
          </button>
        ))}
      </div>
      <div className="ex-bank" dir={toTarget ? dir : "ltr"}>
        {tiles.map(({ t, k }) => (
          <button key={k} type="button" className="ex-tile" data-used={chosen.includes(k) || undefined} onClick={() => tap(k)} disabled={locked || chosen.includes(k)} lang={toTarget ? tts : "id"}>
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ---------- Ucapkan ---------- */

interface Rec {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  start(): void;
  stop(): void;
  onresult: ((e: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onerror: ((e: { error: string }) => void) | null;
  onend: (() => void) | null;
}

export function speechSupported() {
  if (typeof window === "undefined") return false;
  const w = window as unknown as { SpeechRecognition?: unknown; webkitSpeechRecognition?: unknown };
  return !!(w.SpeechRecognition || w.webkitSpeechRecognition);
}

export function Speak({ ex, tts, dir, locked, autoDone }: ExProps<Extract<Exercise, { type: "speak" }>>) {
  const [listening, setListening] = useState(false);
  const [heard, setHeard] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const rec = useRef<Rec | null>(null);
  useEffect(() => {
    say(ex.item.word, tts);
    return () => rec.current?.stop();
  }, [ex, tts]);

  const start = () => {
    const w = window as unknown as { SpeechRecognition?: new () => Rec; webkitSpeechRecognition?: new () => Rec };
    const R = w.SpeechRecognition || w.webkitSpeechRecognition;
    if (!R) return;
    const r = new R();
    r.lang = tts;
    r.interimResults = false;
    r.maxAlternatives = 3;
    r.onresult = (e) => {
      const alts = Array.from(e.results[0] ?? []).map((a) => a.transcript);
      const best = Math.max(...alts.map((a) => speechScore(a, ex.item.word)), 0);
      setHeard(alts[0] ?? "");
      autoDone({ ok: best >= 0.6, solution: ex.item.word, solutionRoman: ex.item.roman, say: ex.item.word });
    };
    r.onerror = (e) => setErr(e.error === "not-allowed" ? "Izin mikrofon ditolak." : "Suara tidak tertangkap. Coba lagi.");
    r.onend = () => setListening(false);
    rec.current = r;
    setErr(null);
    setListening(true);
    r.start();
  };

  return (
    <div className="ex">
      <h2 className="ex-title">Ucapkan kata ini</h2>
      <TargetText item={ex.item} tts={tts} dir={dir} />
      <button type="button" className="ex-mic" data-on={listening || undefined} onClick={start} disabled={locked || listening}>
        <Mic size={28} strokeWidth={2} aria-hidden />
        {listening ? "Mendengarkan..." : "Ketuk lalu bicara"}
      </button>
      {heard !== null && <p className="small muted">Terdengar: “{heard}”</p>}
      {err && <p className="small muted">{err}</p>}
      <button type="button" className="btn btn-quiet btn-sm" onClick={() => autoDone("skip")} disabled={locked}>
        Tidak bisa bicara sekarang
      </button>
    </div>
  );
}
