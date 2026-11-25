"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { themeFor, themeVars } from "@/data/themes";
import { Flame, Heart, Infinity as InfinityIcon, Volume2, VolumeX, X, Zap, Target, Timer } from "lucide-react";
import { buildLesson, buildPractice, checkBuild, checkTyped, lessonDefs, type Exercise, type Item, type UnitPack } from "@/lib/lessons";
import { completeLesson, gainHeart, getProgress, heartsNow, loseHeart, MAX_HEARTS, PASS, setRelaxed, useProgress } from "@/lib/progress";
import { tuu } from "@/lib/companion";
import { sfx, sfxOn, setSfx } from "@/lib/sfx";
import { speak } from "@/lib/speech";
import { PRAISE } from "@/data/gamify";
import { TuuSprite, type TuuMood } from "../companion/TuuSprite";
import { Build, Choice, Match, Speak, TypeIn, speechSupported, type Answer } from "./Exercises";

interface Props {
  lang: { slug: string; name: string; tts: string; dir: "ltr" | "rtl" };
  units: UnitPack[];
}

type Phase = "play" | "done" | "nohearts" | "quit";

interface Slot {
  ex: Exercise;
  key: number;
  retry?: boolean;
}

const RIGHT = ["Benar!", "Hebat!", "Tepat sekali!", "Mantap!", "Sempurna!", "Keren!"];
const WRONG = ["Belum tepat.", "Hampir!", "Ups, kurang pas."];

function fmtTime(ms: number) {
  const s = Math.max(0, Math.round(ms / 1000));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

/**
 * Pelajaran fokus layar penuh: bilah progres, hati, combo, latihan
 * berganti-ganti, lembar umpan balik di bawah, dan layar selesai.
 */
export function LessonRunner(props: Props) {
  // Dirender di body agar benar-benar layar penuh (induknya memakai animasi transform),
  // dengan variabel warna tema bahasa yang dibawa serta.
  const [host, setHost] = useState<HTMLElement | null>(null);
  useEffect(() => setHost(document.body), []);
  if (!host) return null;
  return createPortal(
    <div className="themed lesson-root" style={themeVars(themeFor(props.lang.slug))}>
      <LessonScreen {...props} />
    </div>,
    host,
  );
}

function LessonScreen({ lang, units }: Props) {
  const params = useSearchParams();
  const router = useRouter();
  const progress = useProgress();
  const unitId = params.get("u") ?? units[0].id;
  const n = Number(params.get("l") ?? "1");
  const practice = params.get("mode") === "latihan";
  const unit = units.find((u) => u.id === unitId) ?? units[0];
  const def = lessonDefs(unit.id).find((d) => d.n === n) ?? lessonDefs(unit.id)[0];
  const allItems = useMemo<Item[]>(() => units.flatMap((u) => [...u.words, ...u.phrases]), [units]);
  const pathBack = `/bahasa/${lang.slug}/jalur/`;

  const [slots, setSlots] = useState<Slot[]>([]);
  const [idx, setIdx] = useState(0);
  const [total, setTotal] = useState(1);
  const [solved, setSolved] = useState(0);
  const [result, setResult] = useState<Answer | null>(null);
  const [ready, setReady] = useState(false);
  const [phase, setPhase] = useState<Phase>("play");
  const [combo, setCombo] = useState(0);
  const [stats, setStats] = useState({ right: 0, wrong: 0, best: 0 });
  const [summary, setSummary] = useState<{ xp: number; acc: number; ms: number; stars: number; passed: boolean } | null>(null);
  const [sound, setSound] = useState(true);
  const [mounted, setMounted] = useState(false);
  const checker = useRef<(() => Answer) | null>(null);
  const started = useRef(Date.now());
  const seq = useRef(0);

  const hearts = heartsNow(progress);
  const relaxed = progress.relaxed;

  /* Susun pelajaran sekali saat dibuka */
  useEffect(() => {
    setMounted(true);
    setSound(sfxOn());
    const canSpeak = speechSupported();
    let ex: Exercise[];
    if (practice) {
      const opened = units.filter((u) => Object.keys(getProgress().path[lang.slug] ?? {}).some((k) => k.startsWith(`${u.id}:`)));
      const src = (opened.length ? opened : units.slice(0, 2)).flatMap((u) => [...u.words, ...u.phrases]);
      ex = buildPractice(src, lang.tts, canSpeak);
    } else ex = buildLesson(unit, def.n, allItems.filter((i) => i.kind === "word"), lang.tts, canSpeak);
    setSlots(ex.map((e) => ({ ex: e, key: ++seq.current })));
    setTotal(ex.length);
    setIdx(0);
    setSolved(0);
    setResult(null);
    setCombo(0);
    setStats({ right: 0, wrong: 0, best: 0 });
    setSummary(null);
    started.current = Date.now();
    const p = getProgress();
    setPhase(!practice && !p.relaxed && heartsNow(p).n <= 0 ? "nohearts" : "play");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unit.id, def.n, practice]);

  // Kunci scroll halaman di belakang pelajaran
  useEffect(() => {
    document.body.dataset.lesson = "on";
    return () => {
      delete document.body.dataset.lesson;
    };
  }, []);

  const setChecker = useCallback((fn: (() => Answer) | null) => {
    checker.current = fn;
    setReady(!!fn);
  }, []);

  const slot = slots[idx];

  const finish = useCallback(
    (right: number, wrong: number, best: number) => {
      const answered = right + wrong;
      const acc = answered ? Math.round((right / answered) * 100) : 100;
      const ms = Date.now() - started.current;
      let xp: number;
      let stars = acc >= 95 ? 3 : acc >= 80 ? 2 : 1;
      let passed = true;
      if (practice) {
        xp = 8;
        gainHeart(1);
        stars = 0;
      } else {
        const tantangan = def.n === 4;
        passed = !tantangan || acc >= PASS;
        xp = (tantangan ? 15 : 10) + (wrong === 0 ? 5 : 0) + Math.min(6, Math.floor(best / 5) * 2);
        completeLesson(lang.slug, def.key, acc, xp, tantangan ? { unit: unit.id, score: acc } : undefined);
      }
      tuu({ type: "finish", source: "quiz", score: acc });
      sfx.done();
      setSummary({ xp, acc, ms, stars, passed });
      setPhase("done");
    },
    [practice, def, lang.slug, unit.id],
  );

  const applyAnswer = useCallback(
    (a: Answer) => {
      if (!slot) return;
      setResult(a);
      tuu({ type: "answer", correct: a.ok, source: "quiz" });
      if (a.ok) {
        const c = combo + 1;
        setCombo(c);
        if (c > 0 && c % 5 === 0) sfx.combo(c);
        else sfx.right();
        setSolved((s) => s + 1);
        setStats((s) => ({ ...s, right: s.right + (slot.retry ? 0 : 1), best: Math.max(s.best, c) }));
      } else {
        setCombo(0);
        sfx.wrong();
        setStats((s) => ({ ...s, wrong: s.wrong + (slot.retry ? 0 : 1) }));
        if (!practice) {
          loseHeart();
          window.setTimeout(() => sfx.heart(), 250);
        }
        // Soal yang salah diulang di akhir pelajaran.
        setSlots((ss) => [...ss, { ex: slot.ex, key: ++seq.current, retry: true }]);
      }
      if (a.say) window.setTimeout(() => speak(a.say!.split(" / ")[0], lang.tts), a.ok ? 150 : 350);
    },
    [slot, combo, practice, lang.tts],
  );

  const check = useCallback(() => {
    if (!checker.current || result) return;
    applyAnswer(checker.current());
  }, [applyAnswer, result]);

  const next = useCallback(() => {
    const ni = idx + 1;
    setResult(null);
    setReady(false);
    checker.current = null;
    const p = getProgress();
    if (!practice && !p.relaxed && heartsNow(p).n <= 0 && ni < slots.length) {
      setPhase("nohearts");
      return;
    }
    if (ni >= slots.length) {
      finish(stats.right, stats.wrong, stats.best);
      return;
    }
    setIdx(ni);
  }, [idx, slots.length, practice, finish, stats]);

  const autoDone = useCallback(
    (a: Answer | "skip") => {
      if (a === "skip") {
        setSolved((s) => s + 1);
        setResult(null);
        const ni = idx + 1;
        if (ni >= slots.length) finish(stats.right, stats.wrong, stats.best);
        else setIdx(ni);
        return;
      }
      applyAnswer(a);
    },
    [applyAnswer, idx, slots.length, finish, stats],
  );

  // Enter: periksa atau lanjut
  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (e.key !== "Enter" || phase !== "play") return;
      e.preventDefault();
      if (result) next();
      else check();
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [result, next, check, phase]);

  const pct = Math.min(100, Math.round((solved / Math.max(1, total)) * 100));
  const praise = PRAISE[lang.slug];
  const mood: TuuMood = result ? (result.ok ? (combo >= 5 ? "cheer" : "happy") : "sad") : combo >= 3 ? "wink" : "idle";

  const leave = () => {
    if (phase === "play" && idx > 0) setPhase("quit");
    else router.push(pathBack);
  };

  if (!mounted || !slots.length) return <div className="lesson" aria-busy="true" />;

  /* ---------- Layar selesai ---------- */
  if (phase === "done" && summary) {
    const title = practice ? "Latihan selesai!" : !summary.passed ? "Hampir lulus!" : summary.acc === 100 ? "Sempurna!" : "Pelajaran selesai!";
    return (
      <div className="lesson lesson-done">
        <div className="lesson-done-inner">
          <TuuSprite mood={summary.passed ? (summary.acc === 100 ? "love" : "cheer") : "think"} size={170} />
          <h1>{title}</h1>
          <p className="muted">
            {practice
              ? "Satu hati terisi kembali. Terus latih kata-kata yang sudah kamu pelajari."
              : !summary.passed
                ? "Tantangan unit lulus dengan akurasi 70%. Ulangi sekali lagi, kamu pasti bisa."
                : `${def.title}, ${unit.title.toLowerCase()}.`}
          </p>
          {!practice && summary.stars > 0 && (
            <div className="lesson-stars" aria-label={`${summary.stars} dari 3 bintang`}>
              {[1, 2, 3].map((s) => (
                <span key={s} data-on={s <= summary.stars || undefined} style={{ animationDelay: `${300 + s * 220}ms` }}>
                  ★
                </span>
              ))}
            </div>
          )}
          <div className="lesson-cards">
            <div className="lesson-card" data-tone="xp">
              <span>Total XP</span>
              <strong>
                <Zap size={18} aria-hidden /> {summary.xp}
              </strong>
            </div>
            <div className="lesson-card" data-tone="acc">
              <span>Akurasi</span>
              <strong>
                <Target size={18} aria-hidden /> {summary.acc}%
              </strong>
            </div>
            <div className="lesson-card" data-tone="time">
              <span>Waktu</span>
              <strong>
                <Timer size={18} aria-hidden /> {fmtTime(summary.ms)}
              </strong>
            </div>
            <div className="lesson-card" data-tone="combo">
              <span>Combo terbaik</span>
              <strong>
                <Flame size={18} aria-hidden /> {stats.best}
              </strong>
            </div>
          </div>
          <div className="lesson-done-actions">
            {!summary.passed && (
              <button type="button" className="btn btn-lg" onClick={() => window.location.reload()}>
                Ulangi
              </button>
            )}
            <Link className="btn btn-primary btn-lg" href={practice ? pathBack : `${pathBack}?selesai=${encodeURIComponent(def.key)}`}>
              Lanjut
            </Link>
          </div>
        </div>
      </div>
    );
  }

  /* ---------- Hati habis ---------- */
  if (phase === "nohearts") {
    return (
      <div className="lesson lesson-done">
        <div className="lesson-done-inner">
          <TuuSprite mood="sad" size={150} />
          <h1>Hatimu habis</h1>
          <p className="muted">
            Hati terisi satu setiap 30 menit{hearts.next ? `, berikutnya dalam ${fmtTime(hearts.next - Date.now())}` : ""}. Sambil menunggu, kerjakan
            latihan untuk mengisi satu hati, atau pakai mode santai tanpa batas hati.
          </p>
          <div className="lesson-done-actions">
            <Link className="btn btn-primary btn-lg" href={`/bahasa/${lang.slug}/pelajaran/?mode=latihan`}>
              <Heart size={18} aria-hidden /> Latihan isi hati
            </Link>
            <button
              type="button"
              className="btn btn-lg"
              onClick={() => {
                setRelaxed(true);
                setPhase("play");
              }}
            >
              <InfinityIcon size={18} aria-hidden /> Mode santai
            </button>
            <Link className="btn btn-quiet btn-lg" href={pathBack}>
              Kembali ke jalur
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const ex = slot.ex;
  const common = { tts: lang.tts, dir: lang.dir, locked: !!result, setChecker, autoDone };
  const selfChecking = ex.type === "match" || ex.type === "speak";

  return (
    <div className="lesson" data-result={result ? (result.ok ? "right" : "wrong") : undefined}>
      <header className="lesson-top">
        <button type="button" className="icon-btn" onClick={leave} aria-label="Keluar dari pelajaran">
          <X size={24} />
        </button>
        <div className="lesson-bar" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label="Progres pelajaran">
          <i style={{ width: `${Math.max(4, pct)}%` }} />
          {combo >= 3 && (
            <span className="lesson-combo" key={combo}>
              <Flame size={14} aria-hidden /> {combo} beruntun
            </span>
          )}
        </div>
        <button
          type="button"
          className="icon-btn"
          onClick={() => {
            setSfx(!sound);
            setSound(!sound);
          }}
          aria-label={sound ? "Matikan efek suara" : "Nyalakan efek suara"}
        >
          {sound ? <Volume2 size={20} /> : <VolumeX size={20} />}
        </button>
        <span className="lesson-hearts" data-low={!relaxed && !practice && hearts.n <= 1 || undefined} title={relaxed ? "Mode santai: hati tak terbatas" : `${hearts.n} dari ${MAX_HEARTS} hati`}>
          <Heart size={22} fill="currentColor" aria-hidden />
          {relaxed || practice ? <InfinityIcon size={18} aria-label="Tak terbatas" /> : <span key={hearts.n}>{hearts.n}</span>}
        </span>
      </header>

      <main className="lesson-body">
        <div className="lesson-stage" key={slot.key}>
          {slot.retry && <span className="ex-badge ex-badge-retry">Kesalahan sebelumnya</span>}
          {ex.type === "intro" || ex.type === "meaning" || ex.type === "word" || ex.type === "listen" ? (
            <Choice ex={ex} {...common} />
          ) : ex.type === "match" ? (
            <Match ex={ex} {...common} />
          ) : ex.type === "type" ? (
            <TypeIn ex={ex} {...common} check={(v) => checkTyped(v, ex.item)} />
          ) : ex.type === "build" ? (
            <Build ex={ex} {...common} check={checkBuild} />
          ) : (
            <Speak ex={ex} {...common} />
          )}
        </div>
      </main>

      <footer className="lesson-foot" data-result={result ? (result.ok ? "right" : "wrong") : undefined}>
        <div className="lesson-foot-inner">
          {result ? (
            <div className="lesson-feedback" role="status" aria-live="assertive">
              <TuuSprite mood={mood} size={64} />
              <div>
                <strong className="lesson-feedback-title">
                  {result.ok ? (result.typo ? "Benar, perhatikan ejaannya" : RIGHT[(solved + combo) % RIGHT.length]) : WRONG[idx % WRONG.length]}
                  {result.ok && praise && combo >= 2 && (
                    <span lang={praise.tts} className="lesson-praise">
                      {" "}
                      {praise.text}
                    </span>
                  )}
                </strong>
                {(!result.ok || result.typo) && (
                  <p className="lesson-solution">
                    <span className="tiny">Jawaban benar:</span> <span>{result.solution}</span>
                    {result.solutionRoman && <span className="ex-roman"> {result.solutionRoman}</span>}
                    {result.say && (
                      <button type="button" className="speak" onClick={() => speak(result.say!.split(" / ")[0], lang.tts)} aria-label="Dengarkan jawaban">
                        <Volume2 size={16} />
                      </button>
                    )}
                  </p>
                )}
              </div>
              <button type="button" className="btn btn-lg lesson-go" onClick={next} autoFocus>
                Lanjut
              </button>
            </div>
          ) : (
            <>
              {!selfChecking && (
                <button
                  type="button"
                  className="btn btn-quiet btn-lg"
                  onClick={() => {
                    if (!slot) return;
                    applyAnswer({ ok: false, solution: "item" in ex ? (ex.type === "word" ? ex.item.word : ex.type === "build" && ex.dir === "to-target" ? ex.item.word : ex.item.meaning) : "", say: "item" in ex ? ex.item.word : undefined });
                  }}
                >
                  Lewati
                </button>
              )}
              <span className="lesson-foot-tuu" aria-hidden>
                <TuuSprite mood={mood} size={56} />
              </span>
              {!selfChecking && (
                <button type="button" className="btn btn-primary btn-lg lesson-go" disabled={!ready} onClick={check}>
                  Periksa
                </button>
              )}
            </>
          )}
        </div>
      </footer>

      {phase === "quit" && (
        <div className="lesson-modal" role="dialog" aria-modal="true" aria-labelledby="quit-title">
          <div className="lesson-modal-card">
            <TuuSprite mood="nervous" size={110} />
            <h2 id="quit-title">Tunggu, jangan pergi dulu!</h2>
            <p className="muted">Kalau keluar sekarang, progres pelajaran ini akan hilang.</p>
            <button type="button" className="btn btn-primary btn-lg" onClick={() => setPhase("play")} autoFocus>
              Lanjut belajar
            </button>
            <Link className="btn btn-quiet" href={pathBack}>
              Keluar
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
