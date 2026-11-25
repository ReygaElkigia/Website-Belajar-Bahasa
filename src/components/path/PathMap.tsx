"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { BookOpen, BookOpenText, Check, Flame, Heart, Infinity as InfinityIcon, Lock, MessageCircle, Notebook, Play, RotateCcw, Trophy, Type, Volume2, VolumeX } from "lucide-react";
import { heartsNow, MAX_HEARTS, PASS, setRelaxed, streak, today, useProgress } from "@/lib/progress";
import { lessonDefs, type LessonDef } from "@/lib/lessons";
import { sfxOn, setSfx } from "@/lib/sfx";
import { TuuSprite } from "../companion/TuuSprite";

interface UnitInfo {
  id: string;
  title: string;
  level: string;
  words: number;
}

interface Props {
  lang: { slug: string; name: string; tts: string; glyph: string };
  units: UnitInfo[];
  /** Cerita bacaan yang disisipkan setelah unit tertentu (indeks unit). */
  stories: { after: number; id: string; title: string; level: string }[];
}

type NodeState = "done" | "current" | "open" | "locked";

const OFFSETS = [0, 58, 92, 58, 0, -58, -92, -58];

function fmt(ms: number) {
  const m = Math.max(0, Math.ceil(ms / 60000));
  return m >= 60 ? `${Math.floor(m / 60)} j ${m % 60} m` : `${m} menit`;
}

/**
 * Peta jalur belajar: setiap unit berisi empat pelajaran yang terbuka
 * berurutan, ditandai bintang sesuai akurasi. Tuu menunggu di pelajaran
 * berikutnya.
 */
export function PathMap({ lang, units, stories }: Props) {
  const p = useProgress();
  const params = useSearchParams();
  const router = useRouter();
  const just = params.get("selesai");
  const [openKey, setOpenKey] = useState<string | null>(null);
  const [sound, setSound] = useState(true);
  const [now, setNow] = useState(() => Date.now());
  const [mounted, setMounted] = useState(false);
  const currentRef = useRef<HTMLDivElement>(null);
  const results = p.path[lang.slug] ?? {};

  useEffect(() => {
    setMounted(true);
    setSound(sfxOn());
    const t = window.setInterval(() => setNow(Date.now()), 30_000);
    return () => window.clearInterval(t);
  }, []);

  const flat = useMemo(() => units.flatMap((u) => lessonDefs(u.id).map((d) => ({ unit: u, def: d }))), [units]);
  const currentKey = flat.find((f) => !results[f.def.key])?.def.key ?? null;
  const stateOf = (key: string): NodeState => {
    if (results[key]) return "done";
    if (key === currentKey) return "current";
    return "locked";
  };

  // Gulir ke pelajaran berikutnya
  useEffect(() => {
    if (!mounted) return;
    const t = window.setTimeout(() => currentRef.current?.scrollIntoView({ block: "center", behavior: just ? "smooth" : "auto" }), just ? 900 : 200);
    return () => window.clearTimeout(t);
  }, [mounted, just]);

  // Bersihkan penanda "baru selesai" dari alamat setelah animasinya tampil
  useEffect(() => {
    if (!just) return;
    const t = window.setTimeout(() => router.replace(`/bahasa/${lang.slug}/jalur/`, { scroll: false }), 2600);
    return () => window.clearTimeout(t);
  }, [just, router, lang.slug]);

  // Tutup popover saat klik di luar
  useEffect(() => {
    if (!openKey) return;
    const close = (e: Event) => {
      if (e instanceof KeyboardEvent && e.key !== "Escape") return;
      if (e instanceof PointerEvent && (e.target as Element).closest?.(".path-node-wrap")) return;
      setOpenKey(null);
    };
    window.addEventListener("pointerdown", close);
    window.addEventListener("keydown", close);
    return () => {
      window.removeEventListener("pointerdown", close);
      window.removeEventListener("keydown", close);
    };
  }, [openKey]);

  const hearts = heartsNow(p, now);
  const run = streak(p.days);
  const todayXp = p.xpDays[today()] ?? 0;
  const goalPct = Math.min(100, Math.round((todayXp / p.goal) * 100));
  const doneCount = Object.keys(results).length;
  const totalCount = flat.length;
  const unitsPassed = units.filter((u) => (p.done[lang.slug]?.[u.id] ?? 0) >= PASS).length;

  const icon = (d: LessonDef, st: NodeState) => {
    if (st === "locked") return <Lock size={26} strokeWidth={2.4} />;
    if (st === "done" && d.icon !== "trophy") return <Check size={30} strokeWidth={3} />;
    if (d.icon === "trophy") return <Trophy size={28} strokeWidth={2.4} />;
    if (d.icon === "chat") return <MessageCircle size={28} strokeWidth={2.4} />;
    return <BookOpen size={28} strokeWidth={2.4} />;
  };

  let step = 0;

  return (
    <div className="path-layout">
      <div className="path-col">
        <Link href={`/bahasa/${lang.slug}/huruf/`} className="path-banner path-banner-intro">
          <Type size={22} aria-hidden />
          <span>
            <strong>Mulai dari huruf</strong>
            <span className="small">Kenali aksara dan bunyinya sebelum unit pertama.</span>
          </span>
        </Link>

        {units.map((u, ui) => {
          const defs = lessonDefs(u.id);
          const story = stories.find((s) => s.after === ui);
          const unitDone = (p.done[lang.slug]?.[u.id] ?? 0) >= PASS;
          return (
            <section key={u.id} className="path-unit" aria-labelledby={`pu-${u.id}`} style={defs.some((d) => d.key === openKey) ? { zIndex: 30 } : undefined}>
              <header className="path-banner" data-done={unitDone || undefined}>
                <div>
                  <span className="path-banner-kicker">
                    Unit {ui + 1} · {u.level}
                  </span>
                  <h2 id={`pu-${u.id}`}>{u.title}</h2>
                </div>
                <Link href={`/bahasa/${lang.slug}/${u.id}/`} className="path-banner-book" title="Buku catatan unit: kosakata dan frasa">
                  <Notebook size={20} aria-hidden />
                  <span>Catatan</span>
                </Link>
              </header>
              <ol className="path-nodes">
                {defs.map((d) => {
                  const st = stateOf(d.key);
                  const off = OFFSETS[step++ % OFFSETS.length];
                  const r = results[d.key];
                  const open = openKey === d.key;
                  return (
                    <li key={d.key} className="path-node-row" style={{ "--off": `${off}px`, zIndex: open ? 30 : undefined } as React.CSSProperties}>
                      <div className="path-node-wrap" ref={st === "current" ? currentRef : undefined}>
                        {st === "current" && (
                          <span className="path-tuu" aria-hidden>
                            <TuuSprite mood={doneCount === 0 ? "wave" : "happy"} size={74} />
                            <span className="path-tuu-bubble">{doneCount === 0 ? "Mulai!" : "Ayo lanjut!"}</span>
                          </span>
                        )}
                        <button
                          type="button"
                          className="path-node"
                          data-state={st}
                          data-kind={d.icon}
                          data-just={just === d.key || undefined}
                          aria-expanded={open}
                          aria-label={`${u.title}: ${d.title}. ${st === "done" ? `Selesai, ${r?.stars} bintang` : st === "current" ? "Pelajaran berikutnya" : "Terkunci"}`}
                          onClick={() => setOpenKey(open ? null : d.key)}
                        >
                          <span className="path-node-face">{icon(d, st)}</span>
                        </button>
                        {st === "done" && r && (
                          <span className="path-stars" aria-hidden>
                            {[1, 2, 3].map((s) => (
                              <i key={s} data-on={s <= r.stars || undefined}>
                                ★
                              </i>
                            ))}
                          </span>
                        )}
                        {open && (
                          <div className="path-pop" data-state={st} role="dialog" aria-label={d.title}>
                            <strong>{d.title}</strong>
                            <span className="small">{st === "locked" ? "Selesaikan pelajaran sebelumnya untuk membuka ini." : d.about}</span>
                            {st === "done" && r && <span className="tiny">Akurasi terbaik {r.best}% · {r.times}× dikerjakan</span>}
                            {st !== "locked" && (
                              <Link className="btn btn-sm path-pop-go" href={`/bahasa/${lang.slug}/pelajaran/?u=${u.id}&l=${d.n}`}>
                                {st === "done" ? <RotateCcw size={16} aria-hidden /> : <Play size={16} aria-hidden />}
                                {st === "done" ? "Ulangi +XP" : `Mulai +${d.n === 4 ? 15 : 10} XP`}
                              </Link>
                            )}
                          </div>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ol>
              {story && (
                <Link href={`/bahasa/${lang.slug}/bacaan/#${story.id}`} className="path-story" style={{ "--off": `${OFFSETS[step++ % OFFSETS.length]}px` } as React.CSSProperties}>
                  <span className="path-story-icon">
                    <BookOpenText size={26} aria-hidden />
                  </span>
                  <span>
                    <span className="tiny">Cerita {story.level}</span>
                    <strong>{story.title}</strong>
                  </span>
                </Link>
              )}
            </section>
          );
        })}
        <div className="path-end">
          <TuuSprite mood="proud" size={110} />
          <p>
            <strong>Garis akhir jalur bahasa {lang.name}.</strong>
            <br />
            <span className="small muted">Lanjutkan dengan latihan ujian resmi dan menonton klip asli.</span>
          </p>
        </div>
      </div>

      <aside className="path-side">
        <div className="path-stat-row">
          <span className="path-stat" data-tone="streak" title="Runtunan hari belajar">
            <Flame size={20} aria-hidden /> {run}
          </span>
          <span className="path-stat" data-tone="heart" title={p.relaxed ? "Mode santai" : `${hearts.n} dari ${MAX_HEARTS} hati`}>
            <Heart size={20} fill="currentColor" aria-hidden /> {p.relaxed ? <InfinityIcon size={18} aria-label="tak terbatas" /> : hearts.n}
          </span>
          <span className="path-stat" data-tone="glyph" title={`Bahasa ${lang.name}`} lang={lang.tts}>
            {lang.glyph}
          </span>
        </div>

        <div className="panel path-panel">
          <h3>Target hari ini</h3>
          <div className="path-goal">
            <span className="path-goal-bar">
              <i style={{ width: `${goalPct}%` }} />
            </span>
            <span className="small">
              {todayXp}/{p.goal} XP
            </span>
          </div>
          <p className="tiny muted mt-2">
            {doneCount} dari {totalCount} pelajaran · {unitsPassed} unit tamat
          </p>
        </div>

        <div className="panel path-panel">
          <h3>Hati</h3>
          {p.relaxed ? (
            <p className="small muted">Mode santai aktif: salah jawab tidak mengurangi hati.</p>
          ) : (
            <>
              <div className="path-hearts" aria-label={`${hearts.n} dari ${MAX_HEARTS} hati`}>
                {Array.from({ length: MAX_HEARTS }, (_, i) => (
                  <Heart key={i} size={24} fill={i < hearts.n ? "currentColor" : "none"} data-on={i < hearts.n || undefined} aria-hidden />
                ))}
              </div>
              <p className="small muted">{hearts.n >= MAX_HEARTS ? "Hati penuh." : `Satu hati terisi dalam ${fmt(hearts.next - now)}.`}</p>
            </>
          )}
          <div className="btn-row mt-3">
            <Link className="btn btn-sm" href={`/bahasa/${lang.slug}/pelajaran/?mode=latihan`}>
              <Heart size={16} aria-hidden /> Latihan isi hati
            </Link>
          </div>
          <label className="tuu-switch mt-3">
            <input type="checkbox" checked={mounted && p.relaxed} onChange={(e) => setRelaxed(e.target.checked)} />
            <span>
              <strong>Mode santai</strong>
              <span className="tiny muted">Belajar tanpa batas hati.</span>
            </span>
          </label>
          <label className="tuu-switch mt-2">
            <input
              type="checkbox"
              checked={sound}
              onChange={(e) => {
                setSfx(e.target.checked);
                setSound(e.target.checked);
              }}
            />
            <span>
              <strong>{sound ? <Volume2 size={14} aria-hidden /> : <VolumeX size={14} aria-hidden />} Efek suara</strong>
              <span className="tiny muted">Bunyi benar, salah, dan combo.</span>
            </span>
          </label>
        </div>
      </aside>
    </div>
  );
}
