"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { unitsDone, useProgress } from "@/lib/progress";
import { ChallengeMeter, formatSpeakers } from "./LangMeta";

export interface LangSummary {
  slug: string;
  name: string;
  native: string;
  tts: string;
  glyph: string;
  script: string;
  latin: boolean;
  speakers: number;
  challenge: number;
  challengeLabel: string;
}

const filters = [
  { id: "all", label: "Semua" },
  { id: "latin", label: "Huruf Latin" },
  { id: "other", label: "Aksara lain" },
  { id: "easy", label: "Paling mudah dimulai" },
] as const;

type FilterId = (typeof filters)[number]["id"];

export function LanguageIndex({ items, withFilter = false }: { items: LangSummary[]; withFilter?: boolean }) {
  const [filter, setFilter] = useState<FilterId>("all");
  const progress = useProgress();

  const shown = items.filter((l) => {
    if (filter === "latin") return l.latin;
    if (filter === "other") return !l.latin;
    if (filter === "easy") return l.challenge <= 2;
    return true;
  });

  return (
    <div>
      {withFilter && (
        <div className="chips" role="group" aria-label="Saring bahasa" style={{ marginBottom: 24 }}>
          {filters.map((f) => (
            <button key={f.id} type="button" className="chip" aria-pressed={filter === f.id} onClick={() => setFilter(f.id)}>
              {f.label}
            </button>
          ))}
        </div>
      )}
      <ul className="lang-index">
        {shown.map((l) => {
          const done = unitsDone(progress, l.slug).length;
          return (
            <li key={l.slug} className="lang-row">
              <Link href={`/bahasa/${l.slug}/`}>
                <span className="lang-glyph" lang={l.tts} aria-hidden>
                  {l.glyph}
                </span>
                <span>
                  <span className="lang-name">
                    <strong>{l.name}</strong>
                    <span className="lang-native" lang={l.tts}>
                      {l.native}
                    </span>
                  </span>
                  <span className="lang-meta">
                    <span>{l.script}</span>
                    <span>{formatSpeakers(l.speakers)} penutur</span>
                    {done > 0 && <span style={{ color: "var(--ok)" }}>{done} dari 8 unit selesai</span>}
                  </span>
                </span>
                <span className="lang-side">
                  <ChallengeMeter level={l.challenge} label={l.challengeLabel} />
                </span>
                <ChevronRight className="lang-arrow" size={20} strokeWidth={1.75} aria-hidden />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
