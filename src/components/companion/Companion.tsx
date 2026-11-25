"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeftRight, EyeOff, Lightbulb, MoreHorizontal, Volume2, VolumeX, X } from "lucide-react";
import { onTuu, setTuuSettings, useTuuSettings, type Activity } from "@/lib/companion";
import { onGameEvent, streak, today, useProgress, getProgress } from "@/lib/progress";
import { speak } from "@/lib/speech";
import { badgeById, levelInfo, PRAISE } from "@/data/gamify";
import { themeFor } from "@/data/themes";
import { unitById } from "@/data/curriculum";
import * as L from "@/data/tuuLines";
import { TuuSprite, type TuuMood } from "./TuuSprite";

/* ---------- Jenis data ---------- */

interface Action {
  label: string;
  href?: string;
  run?: () => void;
  speak?: { text: string; tts: string };
}

interface Msg {
  id: number;
  text: string;
  mood: TuuMood;
  /** 0 = obrolan, 1 = reaksi, 2 = penting (tetap tampil di mode tenang) */
  priority: 0 | 1 | 2;
  ms: number;
  actions?: Action[];
  sticky?: boolean;
}

interface SayOpts {
  mood?: TuuMood;
  priority?: 0 | 1 | 2;
  ms?: number;
  actions?: Action[];
  /** Kunci jeda agar kalimat sejenis tidak diulang terlalu sering. */
  key?: string;
  cooldown?: number;
  sticky?: boolean;
}

interface Memory {
  visits: number;
  firstSeen: number;
  lastSeen: number;
  introDone: boolean;
  pets: number;
  shown: Record<string, string>; // kunci pengingat harian -> tanggal
}

interface Ctx {
  key: string;
  lines: string[];
  vars: Record<string, string | number>;
  base: TuuMood;
  slug?: string;
  quiet?: boolean;
  speakHello?: boolean;
}

const MEM_KEY = "tutur:tuu:memory";
const BORED_MS = 45_000;
const SLEEP_MS = 110_000;

function readMemory(): Memory {
  try {
    return { visits: 0, firstSeen: Date.now(), lastSeen: 0, introDone: false, pets: 0, shown: {}, ...JSON.parse(localStorage.getItem(MEM_KEY) || "{}") };
  } catch {
    return { visits: 0, firstSeen: Date.now(), lastSeen: 0, introDone: false, pets: 0, shown: {} };
  }
}

function writeMemory(m: Memory) {
  try {
    localStorage.setItem(MEM_KEY, JSON.stringify(m));
  } catch {
    /* abaikan */
  }
}

function sessionOnce(key: string) {
  try {
    if (sessionStorage.getItem(key)) return false;
    sessionStorage.setItem(key, "1");
    return true;
  } catch {
    return true;
  }
}

const reducedMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Baca konteks halaman dari alamatnya. */
function contextFor(path: string, level: number, run: number): Ctx {
  const seg = path.split("/").filter(Boolean);
  const [a, b, c] = seg;
  if (!a) return { key: "home", lines: L.ROUTE.home, vars: {}, base: "idle" };
  if (a === "bahasa") {
    if (!b) return { key: "bahasa", lines: L.ROUTE.bahasaIndex, vars: {}, base: "idle" };
    const lang = L.LANG[b];
    const vars = { name: lang?.name ?? b, hello: lang?.hello ?? "", theme: themeFor(b).name };
    if (!c) return { key: `lang:${b}`, lines: L.ROUTE.lang, vars, base: "wave", slug: b, speakHello: true };
    if (c === "huruf") return { key: `huruf:${b}`, lines: L.ROUTE.huruf, vars, base: "idle", slug: b };
    if (c === "bacaan") return { key: `bacaan:${b}`, lines: L.ROUTE.bacaan, vars, base: "read", slug: b };
    if (c === "tonton") return { key: `tonton:${b}`, lines: L.ROUTE.tonton, vars, base: "idle", slug: b };
    if (c === "jalur") return { key: `jalur:${b}`, lines: L.ROUTE.jalur, vars, base: "wave", slug: b, speakHello: true };
    if (c === "pelajaran") return { key: `pelajaran:${b}`, lines: [], vars, base: "focus", slug: b, quiet: true };
    if (c === "ujian") return { key: `ujianlang:${b}`, lines: L.ROUTE.ujianIndex, vars, base: "idle", slug: b };
    const unit = unitById[c];
    return { key: `unit:${b}:${c}`, lines: L.ROUTE.unit, vars: { ...vars, unit: unit?.title.toLowerCase() ?? c }, base: "idle", slug: b };
  }
  if (a === "ujian") return b ? { key: `ujian:${b}`, lines: L.ROUTE.ujian, vars: {}, base: "focus", quiet: true } : { key: "ujian", lines: L.ROUTE.ujianIndex, vars: {}, base: "idle" };
  if (a === "kamus") return b ? { key: "kamusword", lines: L.ROUTE.kamusWord, vars: {}, base: "idle" } : { key: "kamus", lines: L.ROUTE.kamus, vars: {}, base: "idle" };
  if (a === "latihan") return { key: "latihan", lines: L.ROUTE.latihan, vars: {}, base: "idle" };
  if (a === "video") return { key: "video", lines: L.ROUTE.video, vars: {}, base: "idle" };
  if (a === "progres") return { key: "progres", lines: L.ROUTE.progres, vars: { level, streak: run }, base: "proud" };
  if (a === "kredit") return { key: "kredit", lines: L.ROUTE.kredit, vars: {}, base: "love" };
  if (a === "offline") return { key: "offline", lines: L.ROUTE.offline, vars: {}, base: "sad" };
  return { key: path, lines: [], vars: {}, base: "idle" };
}

/**
 * Tuu, maskot pendamping. Duduk di pojok layar di setiap halaman dan bereaksi
 * pada apa yang dilakukan pengunjung: halaman yang dibuka, jawaban kuis,
 * kartu hafalan, suara yang diputar, waktu, kebiasaan, bahkan saat
 * pengunjung diam terlalu lama.
 */
export function Companion() {
  const settings = useTuuSettings();
  const pathname = usePathname() || "/";
  const progress = useProgress();
  const [mounted, setMounted] = useState(false);
  const [mood, setMood] = useState<TuuMood>("idle");
  const [msg, setMsg] = useState<Msg | null>(null);
  const [typed, setTyped] = useState(0);
  const [menu, setMenu] = useState(false);
  const [dragPos, setDragPos] = useState<{ x: number; y: number } | null>(null);

  const root = useRef<HTMLDivElement>(null);
  const spriteBox = useRef<HTMLButtonElement>(null);
  const queue = useRef<Msg[]>([]);
  const msgRef = useRef<Msg | null>(null);
  const seq = useRef(0);
  const hideTimer = useRef<number | undefined>(undefined);
  const moodTimer = useRef<number | undefined>(undefined);
  const lastFlash = useRef(0);
  const baseMood = useRef<TuuMood>("idle");
  const sleeping = useRef(false);
  const bored = useRef(false);
  const lastInput = useRef(Date.now());
  const activeMs = useRef(0);
  const watching = useRef(false);
  const lastSaid = useRef<Record<string, number>>({});
  const combo = useRef(0);
  const wrongRun = useRef(0);
  const cardsDone = useRef(0);
  const clicks = useRef<number[]>([]);
  const memory = useRef<Memory | null>(null);
  const ctxRef = useRef<Ctx>(contextFor("/", 1, 0));
  const settingsRef = useRef(settings);
  settingsRef.current = settings;
  const dragState = useRef<{ startX: number; startY: number; moved: boolean; id: number } | null>(null);
  const tipIndex = useRef(Math.floor(Math.random() * L.TIPS.length));

  const lv = levelInfo(progress.xp);
  const run = streak(progress.days);
  const ctx = useMemo(() => contextFor(pathname, lv.level, run), [pathname, lv.level, run]);
  ctxRef.current = ctx;
  const accent = ctx.slug ? themeFor(ctx.slug) : null;

  useEffect(() => setMounted(true), []);

  /* ---------- Ekspresi ---------- */

  const settle = useCallback(() => {
    setMood(sleeping.current ? "sleep" : baseMood.current);
  }, []);

  const flash = useCallback(
    (m: TuuMood, ms = 1600) => {
      window.clearTimeout(moodTimer.current);
      lastFlash.current = Date.now();
      setMood(m);
      moodTimer.current = window.setTimeout(settle, ms);
    },
    [settle],
  );

  /* ---------- Balon ucapan ---------- */

  const showNext = useCallback(() => {
    window.clearTimeout(hideTimer.current);
    const next = queue.current.shift() ?? null;
    msgRef.current = next;
    setMsg(next);
    setTyped(0);
    if (next) {
      flash(next.mood, Math.min(next.ms, 4200));
      if (!next.sticky) hideTimer.current = window.setTimeout(showNext, next.ms);
    }
  }, [flash]);

  const say = useCallback(
    (text: string, o: SayOpts = {}) => {
      const s = settingsRef.current;
      const priority = o.priority ?? 0;
      const mood = o.mood ?? "happy";
      if (s.hidden) return;
      const now = Date.now();
      if (o.key) {
        const last = lastSaid.current[o.key] ?? 0;
        if (now - last < (o.cooldown ?? 20_000)) return;
        lastSaid.current[o.key] = now;
      }
      // Mode tenang dan halaman ujian: cukup berekspresi, tanpa bicara.
      if ((s.quiet || ctxRef.current.quiet) && priority < 2) {
        flash(mood);
        return;
      }
      const ms = o.ms ?? Math.min(9000, 2600 + text.length * 45) + (o.actions?.length ? 4000 : 0);
      const m: Msg = { id: ++seq.current, text, mood, priority, ms, actions: o.actions, sticky: o.sticky };
      const cur = msgRef.current;
      if (cur && cur.priority > priority) {
        if (queue.current.length < 3) queue.current.push(m);
        return;
      }
      if (cur && cur.sticky && priority < 2) {
        if (queue.current.length < 3) queue.current.push(m);
        return;
      }
      queue.current.unshift(m);
      showNext();
    },
    [flash, showNext],
  );

  const dismiss = () => showNext();

  // Efek mesin ketik
  useEffect(() => {
    if (!msg) return;
    if (reducedMotion()) {
      setTyped(msg.text.length);
      return;
    }
    const t = window.setInterval(() => {
      setTyped((n) => {
        if (n >= msg.text.length) {
          window.clearInterval(t);
          return n;
        }
        return n + 2;
      });
    }, 22);
    return () => window.clearInterval(t);
  }, [msg]);

  /* ---------- Ingatan dan sapaan pertama ---------- */

  useEffect(() => {
    if (!mounted) return;
    const m = readMemory();
    const prevSeen = m.lastSeen;
    m.visits += 1;
    m.lastSeen = Date.now();
    memory.current = m;
    writeMemory(m);
    const save = () => {
      if (memory.current) {
        memory.current.lastSeen = Date.now();
        writeMemory(memory.current);
      }
    };
    window.addEventListener("pagehide", save);

    const t = window.setTimeout(() => {
      if (!m.introDone) {
        const step = (i: number) => {
          say(L.INTRO[i], {
            mood: i === 0 ? "wave" : i === 1 ? "happy" : "wink",
            priority: 2,
            sticky: true,
            actions: [
              i < L.INTRO.length - 1
                ? { label: "Lanjut", run: () => step(i + 1) }
                : {
                    label: "Siap!",
                    run: () => {
                      if (memory.current) {
                        memory.current.introDone = true;
                        writeMemory(memory.current);
                      }
                      flash("cheer", 1800);
                      showNext();
                    },
                  },
            ],
          });
        };
        step(0);
        return;
      }
      if (!sessionOnce("tuu:greeted")) return;
      const days = prevSeen ? Math.floor((Date.now() - prevSeen) / 86_400_000) : 0;
      if (days >= 2) say(L.fill(L.pick(L.WELCOME_BACK.days), { d: days }), { mood: "love", priority: 1 });
      else say(L.pick(L.TIME_GREET[L.timeSlot()]), { mood: L.timeSlot() === "larut" ? "sleep" : "wave", priority: 1 });
    }, 1200);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("pagehide", save);
    };
  }, [mounted, say, flash, showNext]);

  /* ---------- Konteks halaman ---------- */

  useEffect(() => {
    if (!mounted) return;
    baseMood.current = ctx.base === "wave" ? "idle" : ctx.base;
    flash(ctx.base === "wave" ? "wave" : ctx.base, ctx.base === "wave" ? 2200 : 900);
    combo.current = 0;
    wrongRun.current = 0;
    if (!ctx.lines.length) return;
    const t = window.setTimeout(() => {
      if (!memory.current?.introDone) return;
      if (!sessionOnce(`tuu:route:${ctx.key}`)) return;
      const lang = ctx.slug ? L.LANG[ctx.slug] : undefined;
      say(L.fill(L.pick(ctx.lines), ctx.vars), {
        mood: ctx.base === "focus" ? "focus" : ctx.base === "read" ? "read" : ctx.base === "proud" ? "proud" : ctx.base === "wave" ? "wave" : "happy",
        priority: 0,
        actions: ctx.speakHello && lang ? [{ label: `Dengar ${lang.hello}`, speak: { text: lang.hello, tts: lang.tts } }] : undefined,
      });
    }, 1100);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted, ctx.key]);

  /* ---------- Reaksi terhadap aktivitas ---------- */

  useEffect(() => {
    if (!mounted) return;
    const praise = () => (ctxRef.current.slug ? PRAISE[ctxRef.current.slug]?.text : undefined) ?? "Hebat!";
    const handle = (a: Activity) => {
      lastInput.current = Date.now();
      if (sleeping.current) wake();
      switch (a.type) {
        case "answer": {
          if (a.correct) {
            combo.current += 1;
            wrongRun.current = 0;
            const lines = L.COMBO[combo.current];
            if (lines) {
              say(L.fill(L.pick(lines), { praise: praise() }), { mood: combo.current >= 10 ? "love" : "cheer", priority: 1 });
            } else flash(combo.current % 2 ? "happy" : "wink", 1300);
          } else {
            combo.current = 0;
            wrongRun.current += 1;
            if (wrongRun.current >= 3) {
              say(L.pick(L.WRONG), { mood: "nervous", priority: 1, key: "wrong", cooldown: 40_000 });
              wrongRun.current = 0;
            } else flash("sad", 1500);
          }
          break;
        }
        case "finish": {
          const v = { score: a.score, praise: praise() };
          if (a.score >= 100) say(L.fill(L.pick(L.FINISH.perfect), v), { mood: "love", priority: 1 });
          else if (a.score >= 70) say(L.fill(L.pick(L.FINISH.pass), v), { mood: "proud", priority: 1 });
          else say(L.fill(L.pick(L.FINISH.low), v), { mood: "think", priority: 1 });
          combo.current = 0;
          break;
        }
        case "flip":
          flash("surprised", 700);
          break;
        case "listen":
          // Jangan menimpa reaksi jawaban yang baru saja muncul.
          if (Date.now() - lastFlash.current > 1500) flash("listen", 1800);
          if (sessionOnce("tuu:listen")) say(L.pick(L.LISTEN_FIRST), { mood: "listen" });
          break;
        case "shadow":
          say(L.pick(L.SHADOW), { mood: "listen", key: "shadow", cooldown: 60_000 });
          break;
        case "typing":
          flash("think", 1400);
          if (sessionOnce("tuu:typing")) say(L.pick(L.TYPING), { mood: "think" });
          break;
        case "theme":
          say(L.pick(a.dark ? L.THEME.dark : L.THEME.light), { mood: a.dark ? "sleep" : "surprised", key: "theme", cooldown: 8000 });
          break;
        case "saved-offline":
          say(L.fill(L.pick(L.SAVED), { name: a.name }), { mood: "proud", priority: 1 });
          break;
        case "say":
          say(a.text, { mood: a.mood ?? "happy", ms: a.ms, priority: 1 });
          break;
      }
      if (a.type === "answer" && a.source === "card") {
        cardsDone.current += 1;
        if (cardsDone.current % 15 === 0) say(L.fill(L.pick(L.CARD_MILESTONE), { n: cardsDone.current }), { mood: "proud", priority: 1 });
      }
    };
    const offAct = onTuu(handle);
    const offGame = onGameEvent((e) => {
      if (e.type === "xp") {
        if (!msgRef.current && Date.now() - lastFlash.current > 1500) flash("happy", 900);
      } else if (e.type === "level") {
        say(L.fill(L.pick(L.GAME.level), { level: e.level, title: e.title }), {
          mood: "cheer",
          priority: 2,
          actions: [{ label: "Lihat progres", href: "/progres/" }],
        });
      } else if (e.type === "badge") {
        say(L.fill(L.pick(L.GAME.badge), { badge: badgeById[e.id]?.name ?? e.id }), {
          mood: "proud",
          priority: 2,
          actions: [{ label: "Lihat lencana", href: "/progres/" }],
        });
      } else if (e.type === "goal") {
        say(L.pick(L.GAME.goal), { mood: "cheer", priority: 2 });
      }
    });
    return () => {
      offAct();
      offGame();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted, say, flash]);

  /* ---------- Setengah target harian ---------- */

  const todayXp = progress.xpDays[today()] ?? 0;
  const prevXp = useRef(todayXp);
  useEffect(() => {
    const half = progress.goal / 2;
    if (prevXp.current < half && todayXp >= half && todayXp < progress.goal && mounted) {
      say(L.pick(L.GAME.half), { mood: "cheer", priority: 1, key: "half", cooldown: 3_600_000 });
    }
    prevXp.current = todayXp;
  }, [todayXp, progress.goal, mounted, say]);

  /* ---------- Diam, tertidur, bangun ---------- */

  const wake = useCallback(() => {
    if (!sleeping.current) return;
    sleeping.current = false;
    bored.current = false;
    flash("surprised", 1200);
    say(L.pick(L.IDLE.wake), { mood: "surprised", key: "wake", cooldown: 60_000 });
  }, [flash, say]);

  useEffect(() => {
    if (!mounted) return;
    const input = () => {
      lastInput.current = Date.now();
      bored.current = false;
      if (sleeping.current) wake();
    };
    const evs = ["pointerdown", "keydown", "scroll", "touchstart", "wheel"] as const;
    evs.forEach((e) => window.addEventListener(e, input, { passive: true }));
    let lastMove = 0;
    const move = () => {
      const n = Date.now();
      if (n - lastMove > 1000) {
        lastMove = n;
        input();
      }
    };
    window.addEventListener("pointermove", move, { passive: true });
    let lastTick = Date.now();
    const tick = window.setInterval(() => {
      const now = Date.now();
      const idle = now - lastInput.current;
      if (idle < 60_000 && document.visibilityState === "visible") activeMs.current += now - lastTick;
      lastTick = now;
      if (watching.current || document.visibilityState !== "visible") return;
      if (idle > SLEEP_MS && !sleeping.current) {
        sleeping.current = true;
        setMood("sleep");
      } else if (idle > BORED_MS && !bored.current && !sleeping.current) {
        bored.current = true;
        say(L.pick(L.IDLE.bored), { mood: "think", key: "bored", cooldown: 300_000 });
      }
      // Pengingat istirahat setelah sekitar 25 menit aktif
      if (activeMs.current > 25 * 60_000 && sessionOnce("tuu:longsession")) {
        say(L.fill(L.pick(L.NUDGE.long), { m: 25 }), { mood: "shy", priority: 1 });
      }
    }, 4000);
    return () => {
      evs.forEach((e) => window.removeEventListener(e, input));
      window.removeEventListener("pointermove", move);
      window.clearInterval(tick);
    };
  }, [mounted, wake, say]);

  // Video sedang diputar: jangan dianggap diam.
  useEffect(() => {
    const onWatch = (e: Event) => {
      watching.current = !!(e as CustomEvent<boolean>).detail;
      lastInput.current = Date.now();
    };
    window.addEventListener("tutur:watching", onWatch);
    return () => window.removeEventListener("tutur:watching", onWatch);
  }, []);

  /* ---------- Tab, jaringan, salin ---------- */

  useEffect(() => {
    if (!mounted) return;
    let hiddenAt = 0;
    const vis = () => {
      if (document.visibilityState === "hidden") hiddenAt = Date.now();
      else if (hiddenAt && Date.now() - hiddenAt > 3 * 60_000) {
        lastInput.current = Date.now();
        sleeping.current = false;
        say(L.pick(L.WELCOME_BACK.tab), { mood: "wave", priority: 1, key: "tabback", cooldown: 600_000 });
      }
    };
    const off = () => say(L.pick(L.NET.off), { mood: "sad", priority: 2 });
    const on = () => say(L.pick(L.NET.on), { mood: "cheer", priority: 1 });
    const copy = () => {
      if (sessionOnce("tuu:copy")) say(L.pick(L.COPY), { mood: "wink" });
    };
    document.addEventListener("visibilitychange", vis);
    window.addEventListener("offline", off);
    window.addEventListener("online", on);
    document.addEventListener("copy", copy);
    return () => {
      document.removeEventListener("visibilitychange", vis);
      window.removeEventListener("offline", off);
      window.removeEventListener("online", on);
      document.removeEventListener("copy", copy);
    };
  }, [mounted, say]);

  /* ---------- Pengingat harian: kartu jatuh tempo dan runtunan ---------- */

  useEffect(() => {
    if (!mounted || settings.hidden) return;
    const t = window.setTimeout(() => {
      const m = memory.current;
      if (!m?.introDone) return;
      const p = getProgress();
      const day = today();
      const studied = p.days.includes(day);
      const now = Date.now();
      const due = Object.values(p.cards).reduce((n, deck) => n + Object.values(deck).filter((c) => c.due <= now).length, 0);
      const mark = (k: string) => {
        m.shown[k] = day;
        writeMemory(m);
      };
      if (due > 0 && !pathname.startsWith("/latihan") && m.shown.due !== day && !studied) {
        mark("due");
        say(L.fill(L.pick(L.NUDGE.due), { n: due }), {
          mood: "wave",
          priority: 2,
          sticky: true,
          actions: [
            { label: "Ulangi sekarang", href: "/latihan/" },
            { label: "Nanti saja", run: () => showNext() },
          ],
        });
        return;
      }
      const r = streak(p.days);
      if (r > 0 && !studied && new Date().getHours() >= 18 && m.shown.streak !== day) {
        mark("streak");
        say(L.fill(L.pick(L.NUDGE.streak), { n: r }), {
          mood: "nervous",
          priority: 2,
          actions: [{ label: "Kuis cepat", href: "/latihan/" }],
        });
      }
    }, 6000);
    return () => window.clearTimeout(t);
  }, [mounted, settings.hidden, pathname, say, showNext]);

  /* ---------- Mata mengikuti kursor dan berkedip ---------- */

  useEffect(() => {
    if (!mounted || settings.hidden) return;
    let raf = 0;
    let px = 0;
    let py = 0;
    const apply = () => {
      raf = 0;
      const el = spriteBox.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const dx = px - (r.left + r.width / 2);
      const dy = py - (r.top + r.height * 0.42);
      const d = Math.hypot(dx, dy) || 1;
      const k = Math.min(1, d / 260);
      el.style.setProperty("--ex", `${((dx / d) * 4 * k).toFixed(2)}px`);
      el.style.setProperty("--ey", `${((dy / d) * 3 * k).toFixed(2)}px`);
    };
    const move = (e: PointerEvent) => {
      px = e.clientX;
      py = e.clientY;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", move, { passive: true });

    let blinkT = 0;
    const blink = () => {
      const el = spriteBox.current;
      if (el && !sleeping.current) {
        el.dataset.blink = "1";
        window.setTimeout(() => {
          if (el) delete el.dataset.blink;
          // Sesekali kedip dua kali
          if (Math.random() < 0.2) {
            window.setTimeout(() => {
              el.dataset.blink = "1";
              window.setTimeout(() => delete el.dataset.blink, 120);
            }, 180);
          }
        }, 130);
      }
      blinkT = window.setTimeout(blink, 2400 + Math.random() * 3800);
    };
    blinkT = window.setTimeout(blink, 2000);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", move);
      cancelAnimationFrame(raf);
      window.clearTimeout(blinkT);
    };
  }, [mounted, settings.hidden]);

  // Tandai body agar lapisan notifikasi lain memberi ruang.
  useEffect(() => {
    if (!mounted) return;
    document.body.dataset.tuu = settings.hidden ? "off" : settings.side;
    return () => {
      delete document.body.dataset.tuu;
    };
  }, [mounted, settings.hidden, settings.side]);

  /* ---------- Sentuhan: elus, pusing, seret ---------- */

  const nextTip = () => {
    tipIndex.current = (tipIndex.current + 1) % L.TIPS.length;
    return L.TIPS[tipIndex.current];
  };

  const pet = () => {
    const now = Date.now();
    clicks.current = [...clicks.current.filter((t) => now - t < 2500), now];
    lastInput.current = now;
    if (sleeping.current) {
      wake();
      return;
    }
    if (memory.current) {
      memory.current.pets += 1;
      writeMemory(memory.current);
    }
    if (clicks.current.length >= 5) {
      clicks.current = [];
      queue.current = [];
      say(L.pick(L.DIZZY), { mood: "dizzy", priority: 1, ms: 2600 });
      return;
    }
    if (msgRef.current && clicks.current.length > 1) {
      flash("shy", 1200);
      return;
    }
    const slug = ctxRef.current.slug;
    const lang = slug ? L.LANG[slug] : undefined;
    const useFact = lang && Math.random() < 0.5;
    const text = useFact ? `Tahukah kamu? ${L.pick(lang.facts)}` : `${L.pick(L.PET)} ${nextTip()}`;
    say(text, {
      mood: useFact ? "wink" : "shy",
      priority: 1,
      actions: [{ label: "Tips lain", run: () => say(nextTip(), { mood: "think", priority: 1, actions: [{ label: "Terima kasih", run: () => showNext() }] }) }],
    });
  };

  const onPointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (e.button !== 0) return;
    dragState.current = { startX: e.clientX, startY: e.clientY, moved: false, id: e.pointerId };
  };
  const onPointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    const d = dragState.current;
    if (!d || d.id !== e.pointerId) return;
    if (!d.moved && Math.hypot(e.clientX - d.startX, e.clientY - d.startY) > 8) {
      d.moved = true;
      e.currentTarget.setPointerCapture(e.pointerId);
      setMenu(false);
      say(L.pick(L.DRAG.start), { mood: "surprised", priority: 1, ms: 1600, key: "drag", cooldown: 4000 });
    }
    if (d.moved) setDragPos({ x: e.clientX, y: e.clientY });
  };
  const onPointerUp = (e: React.PointerEvent<HTMLButtonElement>) => {
    const d = dragState.current;
    dragState.current = null;
    if (!d) return;
    if (d.moved) {
      setDragPos(null);
      const side = e.clientX < window.innerWidth / 2 ? "left" : "right";
      setTuuSettings({ side });
      say(L.pick(L.DRAG.drop), { mood: "happy", priority: 1, ms: 2200 });
    } else pet();
  };

  // Tutup menu dengan Escape atau klik di luar
  useEffect(() => {
    if (!menu) return;
    const close = (e: Event) => {
      if (e instanceof KeyboardEvent && e.key !== "Escape") return;
      if (e instanceof PointerEvent && root.current?.contains(e.target as Node)) return;
      setMenu(false);
    };
    window.addEventListener("keydown", close);
    window.addEventListener("pointerdown", close);
    return () => {
      window.removeEventListener("keydown", close);
      window.removeEventListener("pointerdown", close);
    };
  }, [menu]);

  if (!mounted) return null;

  if (settings.hidden) {
    return (
      <button
        type="button"
        className="tuu-peek"
        data-side={settings.side}
        onClick={() => {
          setTuuSettings({ hidden: false });
          window.setTimeout(() => say("Aku kembali! Terima kasih sudah memanggilku.", { mood: "wave", priority: 2 }), 300);
        }}
        aria-label="Panggil Tuu kembali"
        title="Panggil Tuu"
      >
        <TuuSprite mood="wink" size={40} />
      </button>
    );
  }

  const text = msg ? msg.text.slice(0, typed) : "";
  const runAction = (a: Action) => {
    if (a.speak) {
      speak(a.speak.text, a.speak.tts);
      flash("listen", 1600);
      return;
    }
    a.run?.();
    if (a.href) showNext();
  };

  return (
    <div
      ref={root}
      className="tuu-dock"
      data-side={settings.side}
      data-dragging={dragPos ? "" : undefined}
      style={
        {
          ...(accent ? { "--pen": accent.accent, "--pop": accent.pop } : {}),
          ...(dragPos ? { left: dragPos.x - 46, top: dragPos.y - 46, right: "auto", bottom: "auto" } : {}),
        } as React.CSSProperties
      }
    >
      {msg && !dragPos && !menu && (
        <div className="tuu-bubble" role="status" aria-live="polite" key={msg.id}>
          <button type="button" className="tuu-bubble-x" onClick={dismiss} aria-label="Tutup pesan Tuu">
            <X size={14} />
          </button>
          <p>
            <span className="sr-only">Tuu: </span>
            {text}
            {typed < msg.text.length && <span className="tuu-caret" aria-hidden />}
          </p>
          {msg.actions && typed >= msg.text.length && (
            <div className="tuu-actions">
              {msg.actions.map((a) =>
                a.href ? (
                  <Link key={a.label} href={a.href} className="btn btn-primary btn-sm" onClick={() => runAction(a)}>
                    {a.label}
                  </Link>
                ) : (
                  <button key={a.label} type="button" className={`btn btn-sm${a.speak ? "" : " btn-primary"}`} onClick={() => runAction(a)}>
                    {a.speak && <Volume2 size={14} aria-hidden />}
                    {a.label}
                  </button>
                ),
              )}
            </div>
          )}
        </div>
      )}

      {menu && (
        <div className="tuu-menu" role="menu" aria-label="Menu Tuu">
          <button
            type="button"
            role="menuitem"
            onClick={() => {
              setMenu(false);
              const c = ctxRef.current;
              say(c.lines.length ? L.fill(L.pick(c.lines), c.vars) : nextTip(), { mood: "think", priority: 2 });
            }}
          >
            <Lightbulb size={16} aria-hidden /> Tips untuk halaman ini
          </button>
          <button
            type="button"
            role="menuitemcheckbox"
            aria-checked={settings.quiet}
            onClick={() => {
              setMenu(false);
              setTuuSettings({ quiet: !settings.quiet });
              window.setTimeout(
                () =>
                  say(settings.quiet ? "Oke, aku boleh mengobrol lagi!" : "Siap, aku diam. Aku tetap berekspresi dan hanya bicara untuk hal penting.", {
                    mood: settings.quiet ? "cheer" : "shy",
                    priority: 2,
                  }),
                50,
              );
            }}
          >
            {settings.quiet ? <Volume2 size={16} aria-hidden /> : <VolumeX size={16} aria-hidden />}
            {settings.quiet ? "Boleh mengobrol lagi" : "Mode tenang"}
          </button>
          <button
            type="button"
            role="menuitem"
            onClick={() => {
              setMenu(false);
              setTuuSettings({ side: settings.side === "right" ? "left" : "right" });
            }}
          >
            <ArrowLeftRight size={16} aria-hidden /> Pindah ke {settings.side === "right" ? "kiri" : "kanan"}
          </button>
          <button
            type="button"
            role="menuitem"
            onClick={() => {
              setMenu(false);
              setMsg(null);
              msgRef.current = null;
              queue.current = [];
              setTuuSettings({ hidden: true });
            }}
          >
            <EyeOff size={16} aria-hidden /> Sembunyikan Tuu
          </button>
        </div>
      )}

      <div className="tuu-stage">
        <button
          ref={spriteBox}
          type="button"
          className="tuu-btn"
          aria-label="Tuu, maskot pendamping. Ketuk untuk tips, seret untuk memindahkan."
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={() => {
            dragState.current = null;
            setDragPos(null);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              pet();
            }
          }}
        >
          <TuuSprite mood={mood} size={92} />
        </button>
        <button
          type="button"
          className="tuu-more"
          onClick={() => setMenu((v) => !v)}
          aria-label="Menu Tuu"
          aria-expanded={menu}
          aria-haspopup="menu"
        >
          <MoreHorizontal size={16} />
        </button>
      </div>
    </div>
  );
}
