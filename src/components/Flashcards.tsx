"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { RotateCcw, Volume2 } from "lucide-react";
import { concepts, languages, units, getLanguage } from "@/data";
import { BOX_DAYS, getProgress, reviewCard, useProgress } from "@/lib/progress";
import { speak } from "@/lib/speech";
import { themeFor, themeVars } from "@/data/themes";
import { Scene } from "./anime/Scene";
import { Particles } from "./anime/Particles";
import { Mascot, type MascotMood } from "./mascot/Mascot";
import { NativePrefetch } from "./NativeLive";

const SESSION = 12;

type Direction = "target" | "id";

export function Flashcards() {
  const params = useSearchParams();
  const router = useRouter();
  const progress = useProgress();

  const slug = params.get("bahasa") ?? languages[0].slug;
  const lang = getLanguage(slug) ?? languages[0];
  const [unit, setUnit] = useState<string>(params.get("unit") ?? "semua");
  const [dir, setDir] = useState<Direction>("target");
  const [round, setRound] = useState(0);
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [tally, setTally] = useState({ knew: 0, again: 0 });
  const [mood, setMood] = useState<MascotMood>("idle");

  // Susun sesi: kartu yang jatuh tempo dulu, lalu kartu baru, lalu sisanya.
  // Deck dibekukan per putaran supaya urutan tidak berubah saat kartu dinilai.
  const [deck, setDeck] = useState<typeof concepts | null>(null);
  useEffect(() => {
    const cards = getProgress().cards[lang.slug] ?? {};
    const now = Date.now();
    const pool = concepts.filter((c) => (unit === "semua" || c.unit === unit) && lang.vocab[c.id]);
    const due = pool.filter((c) => cards[c.id] && cards[c.id].due <= now);
    const fresh = pool.filter((c) => !cards[c.id]);
    const later = pool
      .filter((c) => cards[c.id] && cards[c.id].due > now)
      .sort((a, b) => cards[a.id].due - cards[b.id].due);
    setDeck([...due, ...fresh, ...later].slice(0, SESSION));
  }, [lang, unit, round]);

  const card = deck?.[i];
  const term = card ? lang.vocab[card.id] : undefined;
  const done = deck !== null && i >= deck.length;
  const dueCount = useMemo(() => {
    const cards = progress.cards[lang.slug] ?? {};
    return Object.values(cards).filter((c) => c.due <= Date.now()).length;
  }, [progress, lang.slug]);

  const reset = () => {
    setI(0);
    setFlipped(false);
    setTally({ knew: 0, again: 0 });
    setRound((r) => r + 1);
  };

  const pickLang = (s: string) => {
    const q = new URLSearchParams(params.toString());
    q.set("bahasa", s);
    router.replace(`/latihan/?${q.toString()}`, { scroll: false });
    setUnit("semua");
    reset();
  };

  const grade = useCallback(
    (knew: boolean) => {
      if (!card) return;
      reviewCard(lang.slug, card.id, knew);
      setTally((t) => (knew ? { ...t, knew: t.knew + 1 } : { ...t, again: t.again + 1 }));
      setMood(knew ? "happy" : "think");
      setFlipped(false);
      setI((x) => x + 1);
    },
    [card, lang.slug],
  );

  const flip = useCallback(() => {
    setFlipped((f) => {
      if (!f && term && dir === "id") speak(term.word, lang.tts);
      return !f;
    });
  }, [term, dir, lang.tts]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLSelectElement || e.target instanceof HTMLInputElement) return;
      if (done) return;
      if (e.key === " ") {
        e.preventDefault();
        flip();
      } else if (flipped && e.key === "1") grade(false);
      else if (flipped && e.key === "2") grade(true);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [flip, grade, flipped, done]);

  const box = card ? (progress.cards[lang.slug]?.[card.id]?.box ?? 0) : 0;

  const theme = themeFor(lang.slug);
  const stage = (
    <>
      <Scene key={theme.id} theme={theme} className="scene" compact id={`flash-${theme.id}`} />
      <Particles key={`p-${theme.id}`} kind={theme.particle} seed={7} density={0.6} />
      <Mascot mood={mood} size={74} className="stage-mascot" title={`Tuu, maskot Tutur, sedang ${mood === "happy" ? "senang" : mood === "think" ? "berpikir" : "menunggu"}`} />
    </>
  );

  return (
    <div className="two-col themed" style={themeVars(theme)}>
      {deck && <NativePrefetch tts={lang.tts} items={deck.map((c) => ({ word: lang.vocab[c.id].word, note: lang.vocab[c.id].note }))} />}
      <div>
        {deck === null ? (
          <div className="flash-stage" aria-busy="true">
            {stage}
            <div className="card-stage">
              <div className="flashcard">
                <div className="card-face ruled with-margin" />
              </div>
            </div>
          </div>
        ) : !done && card && term ? (
          <>
            <p className="muted small" style={{ marginBottom: 16 }}>
              Kartu {i + 1} dari {deck?.length}. Ketuk kartu atau tekan spasi untuk membalik.
            </p>
            <div className="flash-stage">
            {stage}
            <div className="card-stage">
              <div
                className="flashcard"
                data-flipped={flipped}
                onClick={flip}
                role="button"
                tabIndex={0}
                aria-label={flipped ? "Kartu terbuka. Tekan untuk menutup." : "Kartu tertutup. Tekan untuk membalik."}
                onKeyDown={(e) => {
                  if (e.key === "Enter") flip();
                }}
              >
                <div className="card-face ruled with-margin" aria-hidden={flipped}>
                  <span className="card-hint">{box ? `Kotak ${box}` : "Kartu baru"}</span>
                  {dir === "target" ? (
                    <>
                      <span className="big" lang={lang.tts} dir={lang.dir}>
                        {term.word}
                      </span>
                      <span className="muted small">Apa artinya dalam bahasa Indonesia?</span>
                    </>
                  ) : (
                    <>
                      <span className="card-id">{card.word}</span>
                      <span className="muted small">Bagaimana mengatakannya dalam bahasa {lang.name}?</span>
                    </>
                  )}
                </div>
                <div className="card-face card-back ruled with-margin" aria-hidden={!flipped}>
                  <span className="card-hint">{card.pos}</span>
                  <span className="big" lang={lang.tts} dir={lang.dir}>
                    {term.word}
                  </span>
                  {term.roman && <span className="term-roman" style={{ fontSize: 19 }}>{term.roman}</span>}
                  <span className="card-id" style={{ fontSize: 26 }}>
                    {card.word}
                  </span>
                  {term.note && <span className="term-note">{term.note}</span>}
                  <span>
                    <button
                      type="button"
                      className="btn btn-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        speak(term.word, lang.tts);
                      }}
                    >
                      <Volume2 size={16} strokeWidth={1.75} aria-hidden />
                      Dengarkan
                    </button>
                  </span>
                </div>
              </div>
            </div>
            </div>
            <div className="btn-row mt-5" style={{ maxWidth: 640 }}>
              {flipped ? (
                <>
                  <button type="button" className="btn" style={{ flex: 1 }} onClick={() => grade(false)}>
                    <kbd className="tiny muted">1</kbd> Belum hafal
                  </button>
                  <button type="button" className="btn btn-primary" style={{ flex: 1 }} onClick={() => grade(true)}>
                    <kbd className="tiny">2</kbd> Sudah hafal
                  </button>
                </>
              ) : (
                <button type="button" className="btn btn-primary" style={{ flex: 1 }} onClick={flip}>
                  Balik kartu
                </button>
              )}
            </div>
          </>
        ) : (
          <div className="panel" style={{ maxWidth: 560 }} aria-live="polite">
            <p className="muted small">Sesi selesai</p>
            <p className="score mt-2">{tally.knew}</p>
            <p className="mt-3">
              kata sudah hafal, {tally.again} perlu diulang. Kata yang belum hafal akan muncul lagi di sesi berikutnya;
              kata yang sudah hafal muncul lagi setelah jeda yang makin panjang.
            </p>
            <div className="btn-row mt-5">
              <button type="button" className="btn btn-primary" onClick={reset}>
                <RotateCcw size={18} strokeWidth={1.75} aria-hidden />
                Sesi baru
              </button>
              <Link className="btn" href={`/bahasa/${lang.slug}/`}>
                Kembali ke pelajaran {lang.name}
              </Link>
            </div>
          </div>
        )}
      </div>

      <aside className="aside-sticky">
        <div className="panel">
          <h3>Atur sesi</h3>
          <label className="small muted" htmlFor="fc-lang">
            Bahasa
          </label>
          <select id="fc-lang" className="select mt-2" style={{ width: "100%" }} value={lang.slug} onChange={(e) => pickLang(e.target.value)}>
            {languages.map((l) => (
              <option key={l.slug} value={l.slug}>
                {l.name}
              </option>
            ))}
          </select>
          <label className="small muted mt-4" htmlFor="fc-unit" style={{ display: "block" }}>
            Unit
          </label>
          <select
            id="fc-unit"
            className="select mt-2"
            style={{ width: "100%" }}
            value={unit}
            onChange={(e) => {
              setUnit(e.target.value);
              reset();
            }}
          >
            <option value="semua">Semua unit</option>
            {units.map((u) => (
              <option key={u.id} value={u.id}>
                {u.title}
              </option>
            ))}
          </select>
          <p className="small muted mt-4">Sisi depan</p>
          <div className="chips mt-2" role="group" aria-label="Sisi depan kartu">
            <button type="button" className="chip" aria-pressed={dir === "target"} onClick={() => setDir("target")}>
              Bahasa {lang.name}
            </button>
            <button type="button" className="chip" aria-pressed={dir === "id"} onClick={() => setDir("id")}>
              Bahasa Indonesia
            </button>
          </div>
        </div>
        <div className="panel">
          <h3>Cara kerja kartu</h3>
          <p className="small muted">
            Setiap kata berada di salah satu dari lima kotak. Jika Anda hafal, kata naik satu kotak dan baru muncul lagi
            setelah {BOX_DAYS[2]}, {BOX_DAYS[3]}, {BOX_DAYS[4]}, lalu {BOX_DAYS[5]} hari. Jika lupa, kata kembali ke kotak
            pertama.
          </p>
          <p className="small mt-3">
            {dueCount > 0 ? `${dueCount} kata ${lang.name} jatuh tempo untuk diulang.` : `Belum ada kata ${lang.name} yang jatuh tempo.`}
          </p>
        </div>
      </aside>
    </div>
  );
}
