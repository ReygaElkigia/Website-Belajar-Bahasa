"use client";

import { useRef, useState } from "react";
import type { Exam } from "@/data/exams/types";
import { useProgress } from "@/lib/progress";
import { ExamRunner } from "./ExamRunner";

export function ExamParts({ exam, tts, dir }: { exam: Exam; tts: string; dir: "ltr" | "rtl" }) {
  const [active, setActive] = useState<string | null>(null);
  const progress = useProgress();
  const best = progress.exams[exam.id] ?? {};
  const top = useRef<HTMLDivElement>(null);
  const part = exam.parts.find((p) => p.id === active);

  const open = (id: string) => {
    setActive(id);
    requestAnimationFrame(() => top.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  return (
    <div ref={top} style={{ scrollMarginTop: 80 }}>
      {part ? (
        <ExamRunner key={part.id} examId={exam.id} part={part} tts={tts} dir={dir} onExit={() => setActive(null)} />
      ) : (
        <ul className="part-list">
          {exam.parts.map((p) => (
            <li key={p.id}>
              <span>
                <span className="row" style={{ gap: 8 }}>
                  <strong>{p.title}</strong>
                  <span className="level">{p.questions.length} soal</span>
                  {p.minutes ? <span className="level">±{p.minutes} menit</span> : null}
                </span>
                <span className="small muted" style={{ display: "block", marginTop: 4 }}>
                  {p.instructions}
                </span>
                {best[p.id] !== undefined && (
                  <span className="small" style={{ display: "block", marginTop: 4, color: "var(--ok)" }}>
                    Skor terbaik: {best[p.id]}%
                  </span>
                )}
              </span>
              <button type="button" className="btn btn-primary btn-sm" onClick={() => open(p.id)}>
                {best[p.id] !== undefined ? "Ulangi" : "Mulai"}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
