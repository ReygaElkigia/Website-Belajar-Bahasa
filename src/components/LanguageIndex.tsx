"use client";

import Link from "next/link";
import { useState } from "react";
import { unitsDone, useProgress } from "@/lib/progress";
import { themeFor, themeVars } from "@/data/themes";
import { ChallengeMeter, formatSpeakers } from "./LangMeta";
import { Scene } from "./anime/Scene";

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

export function LanguageIndex({
  items,
  totalUnits,
  withFilter = false,
}: {
  items: LangSummary[];
  totalUnits: number;
  withFilter?: boolean;
}) {
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
        <div className="chips" role="group" aria-label="Saring bahasa" style={{ marginBottom: 28 }}>
          {filters.map((f) => (
            <button key={f.id} type="button" className="chip" aria-pressed={filter === f.id} onClick={() => setFilter(f.id)}>
              {f.label}
            </button>
          ))}
        </div>
      )}
      <ul className="lang-grid">
        {shown.map((l) => {
          const done = unitsDone(progress, l.slug).length;
          const t = themeFor(l.slug);
          return (
            <li key={l.slug} className="themed" style={themeVars(t)}>
              <Link href={`/bahasa/${l.slug}/`} className="lang-card">
                <span className="lang-card-scene">
                  <Scene theme={t} className="scene" compact id={`card-${l.slug}`} />
                  <span className="lang-card-theme">{t.name}</span>
                  <span className="lang-card-glyph" lang={l.tts} aria-hidden>
                    {l.glyph}
                  </span>
                </span>
                <span className="lang-card-body">
                  <span className="lang-name">
                    <strong>{l.name}</strong>
                    <span className="lang-native" lang={l.tts}>
                      {l.native}
                    </span>
                  </span>
                  <span className="lang-meta">
                    <span>{l.script}</span>
                    <span>{formatSpeakers(l.speakers)} penutur</span>
                  </span>
                  <span className="lang-card-foot">
                    <ChallengeMeter level={l.challenge} label={l.challengeLabel} />
                    {done > 0 && (
                      <span style={{ color: "var(--ok)", fontWeight: 800 }}>
                        {done}/{totalUnits} unit
                      </span>
                    )}
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
