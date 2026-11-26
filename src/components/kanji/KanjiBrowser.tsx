"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { Check, ChevronLeft, ChevronRight, Play, Search, Volume2, X } from "lucide-react";
import { themeFor, themeVars } from "@/data/themes";
import { speak } from "@/lib/speech";
import { sfx } from "@/lib/sfx";
import { tuu } from "@/lib/companion";
import {
  CHUNK,
  isKnown,
  loadChunk,
  loadDetail,
  recordAnswer,
  setKnown,
  splitKun,
  useKanjiScores,
  type KanjiDetail,
  type KanjiLevel,
  type KanjiRow,
} from "@/lib/kanji";
import { KanjiStrokes } from "./KanjiStrokes";

type Filter = "semua" | "belum" | "hafal";

const GRADE: Record<number, string> = {
  1: "Kelas 1 SD",
  2: "Kelas 2 SD",
  3: "Kelas 3 SD",
  4: "Kelas 4 SD",
  5: "Kelas 5 SD",
  6: "Kelas 6 SD",
  8: "Jōyō (SMP ke atas)",
  9: "Kanji nama (jinmeiyō)",
  10: "Kanji nama (jinmeiyō)",
};

export function KanjiBrowser({ level, rows }: { level: KanjiLevel; rows: KanjiRow[] }) {
  const scores = useKanjiScores();
  const [filter, setFilter] = useState<Filter>("semua");
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<number | null>(null);
  const [quiz, setQuiz] = useState(false);

  const known = rows.filter((r) => isKnown(scores, r[0])).length;
  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows
      .map((r, i) => ({ r, i }))
      .filter(({ r }) => (filter === "semua" ? true : filter === "hafal" ? isKnown(scores, r[0]) : !isKnown(scores, r[0])))
      .filter(({ r }) => !q || r[0] === q || r[1].toLowerCase().includes(q));
  }, [rows, filter, query, scores]);

  return (
    <div className="kj">
      <div className="kj-bar">
        <div className="kj-count">
          <strong>{known}</strong> dari {rows.length} hafal
          <span className="kj-meter" aria-hidden>
            <i style={{ width: `${(known / rows.length) * 100}%` }} />
          </span>
        </div>
        <button type="button" className="btn btn-primary" onClick={() => setQuiz(true)}>
          <Play size={16} aria-hidden /> Kuis 10 soal
        </button>
      </div>

      <div className="kj-tools">
        <div className="seg" role="radiogroup" aria-label="Saring kanji">
          {(["semua", "belum", "hafal"] as Filter[]).map((f) => (
            <button key={f} type="button" role="radio" aria-checked={filter === f} onClick={() => setFilter(f)}>
              {f === "semua" ? "Semua" : f === "belum" ? "Belum hafal" : "Sudah hafal"}
            </button>
          ))}
        </div>
        <label className="kj-search">
          <Search size={16} aria-hidden />
          <span className="sr-only">Cari kanji atau arti</span>
          <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Cari arti, mis. air" />
        </label>
      </div>

      {shown.length ? (
        <ul className="kj-grid">
          {shown.map(({ r, i }) => (
            <li key={r[0]}>
              <button type="button" className="kj-tile" data-score={scores[r[0]] ?? 0} onClick={() => setOpen(i)} aria-label={`${r[0]}, ${r[1]}`}>
                <span className="kj-tile-k" lang="ja">
                  {r[0]}
                </span>
                <span className="kj-tile-m">{r[1].split(";")[0]}</span>
                {isKnown(scores, r[0]) && <Check className="kj-tile-ok" size={14} aria-hidden />}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="kj-empty muted">
          {filter === "hafal" ? "Belum ada kanji yang ditandai hafal. Coba kuisnya, atau buka kanji lalu tandai hafal." : "Tidak ada kanji yang cocok."}
        </p>
      )}

      {open !== null && <KanjiSheet level={level} rows={rows} pos={open} onMove={setOpen} onClose={() => setOpen(null)} />}
      {quiz && <KanjiQuiz level={level} rows={rows} onClose={() => setQuiz(false)} />}
    </div>
  );
}

/* ---------- Lapisan yang menempel ke body (lepas dari animasi halaman) ---------- */

function Overlay({ label, onClose, children }: { label: string; onClose: () => void; children: React.ReactNode }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);
  return createPortal(
    <div className="themed kj-overlay" style={themeVars(themeFor("jepang"))} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="kj-sheet" role="dialog" aria-modal="true" aria-label={label}>
        <button type="button" className="kj-close" onClick={onClose} aria-label="Tutup">
          <X size={20} aria-hidden />
        </button>
        {children}
      </div>
    </div>,
    document.body,
  );
}

function useDetail(level: KanjiLevel, pos: number, k: string) {
  const [d, setD] = useState<{ k: string; v: KanjiDetail | null; err?: boolean }>({ k: "", v: null });
  useEffect(() => {
    let live = true;
    loadDetail(level, pos, k)
      .then((v) => live && setD({ k, v: v ?? null }))
      .catch(() => live && setD({ k, v: null, err: true }));
    return () => {
      live = false;
    };
  }, [level, pos, k]);
  return d.k === k ? d : { k, v: null };
}

function KanjiSheet({ level, rows, pos, onMove, onClose }: { level: KanjiLevel; rows: KanjiRow[]; pos: number; onMove: (n: number) => void; onClose: () => void }) {
  const [k, meaning, strokes] = rows[pos];
  const scores = useKanjiScores();
  const d = useDetail(level, pos, k);
  const known = isKnown(scores, k);
  const go = useCallback((n: number) => onMove((n + rows.length) % rows.length), [onMove, rows.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(pos + 1);
      if (e.key === "ArrowLeft") go(pos - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, pos]);

  return (
    <Overlay label={`Kanji ${k}`} onClose={onClose}>
      <div className="kj-detail">
        <div className="kj-detail-draw">
          {d.v ? <KanjiStrokes key={k} paths={d.v.p} kanji={k} /> : <div className="kj-draw kj-draw-empty" lang="ja">{k}</div>}
        </div>
        <div className="kj-detail-info">
          <p className="kj-kicker">
            {level.toUpperCase()} · {pos + 1}/{rows.length} · {strokes} goresan
            {d.v && GRADE[d.v.g] ? ` · ${GRADE[d.v.g]}` : ""}
          </p>
          <h2 className="kj-meaning">{meaning.replaceAll(";", ",")}</h2>
          {d.err && <p className="small muted">Rincian belum bisa dimuat. Periksa koneksi lalu buka lagi.</p>}
          {d.v && (
            <>
              <dl className="kj-reads">
                {d.v.on.length > 0 && (
                  <div>
                    <dt>
                      On&apos;yomi <span className="tiny muted">bacaan Tionghoa</span>
                    </dt>
                    <dd lang="ja">
                      {d.v.on.map((o) => (
                        <span key={o} className="kj-read">
                          {o}
                        </span>
                      ))}
                    </dd>
                  </div>
                )}
                {d.v.kun.length > 0 && (
                  <div>
                    <dt>
                      Kun&apos;yomi <span className="tiny muted">bacaan Jepang</span>
                    </dt>
                    <dd lang="ja">
                      {d.v.kun.map((o) => {
                        const [stem, okuri] = splitKun(o);
                        return (
                          <span key={o} className="kj-read">
                            {stem}
                            {okuri && <span className="kj-okuri">{okuri}</span>}
                          </span>
                        );
                      })}
                    </dd>
                  </div>
                )}
              </dl>
              {d.v.ex.length > 0 && (
                <div className="kj-ex">
                  <h3>Contoh kata</h3>
                  <ul>
                    {d.v.ex.map(([w, r, m]) => (
                      <li key={w + r}>
                        <button type="button" className="kj-ex-say" onClick={() => speak(r, "ja-JP")} aria-label={`Dengarkan ${w}`}>
                          <Volume2 size={16} aria-hidden />
                        </button>
                        <ruby lang="ja">
                          {w}
                          <rt>{r}</rt>
                        </ruby>
                        <span className="kj-ex-m">{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
          <div className="kj-detail-actions">
            <button type="button" className={known ? "btn" : "btn btn-primary"} onClick={() => setKnown(k, !known)} aria-pressed={known}>
              <Check size={16} aria-hidden /> {known ? "Sudah hafal" : "Tandai hafal"}
            </button>
            <span className="kj-nav">
              <button type="button" className="btn" onClick={() => go(pos - 1)} aria-label="Kanji sebelumnya">
                <ChevronLeft size={18} aria-hidden />
              </button>
              <button type="button" className="btn" onClick={() => go(pos + 1)} aria-label="Kanji berikutnya">
                <ChevronRight size={18} aria-hidden />
              </button>
            </span>
          </div>
        </div>
      </div>
    </Overlay>
  );
}

/* ---------- Kuis: arti, kanji, dan cara baca (漢字読み) ---------- */

interface Q {
  kind: "arti" | "kanji" | "baca";
  k: string;
  prompt: string;
  sub?: string;
  options: string[];
  answer: number;
  explain: string;
}

function shuffle<T>(a: T[]) {
  const b = [...a];
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
}

function pickOthers<T>(pool: T[], n: number, not: (x: T) => boolean) {
  return shuffle(pool.filter((x) => !not(x))).slice(0, n);
}

async function buildQuiz(level: KanjiLevel, rows: KanjiRow[], scores: Record<string, number>): Promise<Q[]> {
  const idx = rows.map((r, i) => ({ r, i }));
  const fresh = shuffle(idx.filter(({ r }) => !isKnown(scores, r[0])));
  const picked = [...fresh, ...shuffle(idx.filter(({ r }) => isKnown(scores, r[0])))].slice(0, 10);
  const chunks = await Promise.all([...new Set(picked.map(({ i }) => Math.floor(i / CHUNK)))].map((c) => loadChunk(level, c).catch(() => ({}))));
  const details: Record<string, KanjiDetail> = Object.assign({}, ...chunks);
  const allWords = Object.values(details).flatMap((d) => d.ex);
  const short = (m: string) => m.split(";")[0];

  return picked.map(({ r }, n) => {
    const [k, m] = r;
    const d = details[k];
    const kind: Q["kind"] = d?.ex.length && n % 3 === 2 ? "baca" : n % 3 === 1 ? "kanji" : "arti";
    if (kind === "baca") {
      const [w, reading, wm] = d.ex[0];
      const wrong = pickOthers(
        [...new Set(allWords.map((x) => x[1]))].filter((x) => Math.abs(x.length - reading.length) <= 1),
        3,
        (x) => x === reading,
      );
      const options = shuffle([reading, ...wrong]);
      return { kind, k, prompt: w, sub: "Bagaimana cara membaca kata ini?", options, answer: options.indexOf(reading), explain: `${w} dibaca ${reading}: ${wm}.` };
    }
    if (kind === "kanji") {
      const wrong = pickOthers(rows, 3, (x) => x[0] === k || short(x[1]) === short(m)).map((x) => x[0]);
      const options = shuffle([k, ...wrong]);
      return { kind, k, prompt: short(m), sub: "Kanji mana yang artinya ini?", options, answer: options.indexOf(k), explain: `${k} berarti ${m.replaceAll(";", ",")}.` };
    }
    const wrong = pickOthers(rows, 3, (x) => x[0] === k || short(x[1]) === short(m)).map((x) => short(x[1]));
    const options = shuffle([short(m), ...wrong]);
    return { kind, k, prompt: k, sub: "Apa arti kanji ini?", options, answer: options.indexOf(short(m)), explain: `${k} berarti ${m.replaceAll(";", ",")}.` };
  });
}

function KanjiQuiz({ level, rows, onClose }: { level: KanjiLevel; rows: KanjiRow[]; onClose: () => void }) {
  const scores = useKanjiScores();
  const [qs, setQs] = useState<Q[] | null>(null);
  const [n, setN] = useState(0);
  const [pick, setPick] = useState<number | null>(null);
  const [right, setRight] = useState(0);
  const [round, setRound] = useState(0);

  useEffect(() => {
    let live = true;
    // Soal disusun sekali per putaran; skor terbaru dibaca saat itu saja.
    buildQuiz(level, rows, scores).then((q) => live && setQs(q));
    return () => {
      live = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [level, rows, round]);

  const q = qs?.[n];
  const done = qs && n >= qs.length;

  const answer = (i: number) => {
    if (!q || pick !== null) return;
    setPick(i);
    const ok = i === q.answer;
    if (ok) setRight((x) => x + 1);
    recordAnswer(q.k, ok);
    (ok ? sfx.right : sfx.wrong)();
    tuu({ type: "answer", correct: ok, source: "quiz" });
  };

  const next = () => {
    setPick(null);
    setN((x) => x + 1);
    if (qs && n + 1 >= qs.length) tuu({ type: "finish", source: "quiz", score: right, total: qs.length });
  };

  const restart = () => {
    setQs(null);
    setN(0);
    setPick(null);
    setRight(0);
    setRound((r) => r + 1);
  };

  return (
    <Overlay label={`Kuis kanji ${level.toUpperCase()}`} onClose={onClose}>
      <div className="kj-quiz">
        {!qs && <p className="muted">Menyiapkan soal…</p>}
        {qs && !done && q && (
          <>
            <div className="kj-quiz-top">
              <span className="tiny muted">
                Soal {n + 1} dari {qs.length}
              </span>
              <span className="kj-meter" aria-hidden>
                <i style={{ width: `${(n / qs.length) * 100}%` }} />
              </span>
            </div>
            <p className="kj-quiz-sub">{q.sub}</p>
            <p className={q.kind === "kanji" ? "kj-quiz-prompt is-text" : "kj-quiz-prompt"} lang={q.kind === "kanji" ? undefined : "ja"}>
              {q.prompt}
            </p>
            <div className="kj-quiz-opts" role="group" aria-label="Pilihan jawaban">
              {q.options.map((o, i) => (
                <button
                  key={o + i}
                  type="button"
                  className="kj-opt"
                  lang={q.kind === "arti" ? undefined : "ja"}
                  data-kind={q.kind}
                  data-state={pick === null ? undefined : i === q.answer ? "right" : i === pick ? "wrong" : "dim"}
                  onClick={() => answer(i)}
                  disabled={pick !== null}
                >
                  {o}
                </button>
              ))}
            </div>
            {pick !== null && (
              <div className="kj-quiz-feedback" data-ok={pick === q.answer}>
                <p>
                  <strong>{pick === q.answer ? "Benar!" : "Belum tepat."}</strong> {q.explain}
                </p>
                <button type="button" className="btn btn-primary" onClick={next} autoFocus>
                  {n + 1 >= qs.length ? "Lihat hasil" : "Lanjut"}
                </button>
              </div>
            )}
          </>
        )}
        {done && qs && (
          <div className="kj-quiz-done">
            <p className="kj-quiz-score">
              {right}/{qs.length}
            </p>
            <p>{right === qs.length ? "Sempurna! Kanji yang benar dua kali otomatis ditandai hafal." : "Kanji yang dijawab benar dua kali otomatis ditandai hafal. Yang salah akan muncul lagi."}</p>
            <div className="row">
              <button type="button" className="btn btn-primary" onClick={restart}>
                Kuis lagi
              </button>
              <button type="button" className="btn" onClick={onClose}>
                Selesai
              </button>
            </div>
          </div>
        )}
      </div>
    </Overlay>
  );
}
