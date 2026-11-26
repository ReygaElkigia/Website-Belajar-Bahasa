"use client";

import { isKnown, useKanjiScores } from "@/lib/kanji";

export function KanjiLevelProgress({ kanji }: { kanji: string[] }) {
  const scores = useKanjiScores();
  const n = kanji.filter((k) => isKnown(scores, k)).length;
  if (!n) return null;
  return (
    <span className="kj-level-progress tiny">
      <span className="kj-meter" aria-hidden>
        <i style={{ width: `${(n / kanji.length) * 100}%` }} />
      </span>
      {n} hafal
    </span>
  );
}
