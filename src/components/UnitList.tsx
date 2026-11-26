"use client";

import Link from "next/link";
import { CircleCheck } from "lucide-react";
import { PASS, useProgress } from "@/lib/progress";
import { UnitIcon } from "@/components/UnitIcon";

export interface UnitSummary {
  id: string;
  title: string;
  summary: string;
  level: string;
  count: number;
}

export function UnitList({ slug, items }: { slug: string; items: UnitSummary[] }) {
  const progress = useProgress();
  const scores = progress.done[slug] ?? {};
  return (
    <ol className="units">
      {items.map((u, n) => {
        const score = scores[u.id];
        const done = score !== undefined && score >= PASS;
        return (
          <li key={u.id} className="unit-row" data-done={done} style={{ "--i": n } as React.CSSProperties}>
            <Link href={`/bahasa/${slug}/${u.id}/`}>
              <span className="unit-num">{done ? <CircleCheck size={22} strokeWidth={1.75} aria-label="Selesai" /> : n + 1}</span>
              <span>
                <span className="row" style={{ gap: 8 }}>
                  <span className="unit-badge">
                    <UnitIcon id={u.id} size={16} />
                  </span>
                  <span className="unit-title">{u.title}</span>
                  <span className="level">{u.level}</span>
                </span>
                <span className="small muted" style={{ display: "block", marginTop: 2 }}>
                  {u.summary}
                </span>
              </span>
              <span className="unit-status">
                {score !== undefined ? `Skor ${score}` : `${u.count} kata`}
              </span>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}

export function ContinueButton({ slug, firstUnit, units, secondary }: { slug: string; firstUnit: string; units: string[]; secondary?: boolean }) {
  const progress = useProgress();
  const scores = progress.done[slug] ?? {};
  const next = units.find((u) => !(scores[u] >= PASS));
  const started = Object.keys(scores).length > 0;
  const target = next ?? firstUnit;
  return (
    <Link className={secondary ? "btn" : "btn btn-primary"} href={`/bahasa/${slug}/${target}/`}>
      {secondary ? (started ? "Lanjutkan unit" : "Lihat unit pertama") : !started ? "Mulai unit pertama" : next ? "Lanjutkan belajar" : "Ulangi dari awal"}
    </Link>
  );
}
