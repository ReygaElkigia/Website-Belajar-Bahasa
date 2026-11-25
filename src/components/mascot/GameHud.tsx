"use client";

import Link from "next/link";
import { Flame } from "lucide-react";
import { levelInfo } from "@/data/gamify";
import { streak, today, useProgress } from "@/lib/progress";

/** Ringkasan di header: level, cincin target harian, dan runtunan hari. */
export function GameHud() {
  const p = useProgress();
  const lv = levelInfo(p.xp);
  const todayXp = p.xpDays[today()] ?? 0;
  const pct = Math.min(100, Math.round((todayXp / p.goal) * 100));
  const run = streak(p.days);
  const r = 15;
  const c = 2 * Math.PI * r;

  return (
    <Link
      href="/progres/"
      className="hud"
      aria-label={`Level ${lv.level}, ${lv.title}. Hari ini ${todayXp} dari ${p.goal} XP. Runtunan ${run} hari.`}
      title={`Level ${lv.level} · ${todayXp}/${p.goal} XP hari ini`}
    >
      <span className="hud-ring" data-done={pct >= 100}>
        <svg width={38} height={38} viewBox="0 0 38 38" aria-hidden>
          <circle cx={19} cy={19} r={r} fill="none" stroke="var(--rule)" strokeWidth={5} />
          <circle
            cx={19}
            cy={19}
            r={r}
            fill="none"
            stroke="var(--pen)"
            strokeWidth={5}
            strokeLinecap="round"
            strokeDasharray={`${(pct / 100) * c} ${c}`}
            transform="rotate(-90 19 19)"
          />
        </svg>
        <b>{lv.level}</b>
      </span>
      <span className="hud-streak" data-on={run > 0}>
        <Flame size={16} strokeWidth={2.25} aria-hidden />
        {run}
      </span>
    </Link>
  );
}
