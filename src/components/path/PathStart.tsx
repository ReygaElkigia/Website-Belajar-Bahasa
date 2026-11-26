"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Play, Type } from "lucide-react";
import { useProgress } from "@/lib/progress";
import { lessonDefs } from "@/lib/lessons";

/**
 * Tombol tujuan utama di atas jalur: langsung membuka pelajaran berikutnya,
 * sehingga pengunjung selalu tahu langkah selanjutnya.
 */
export function PathStart({ slug, units, alphabetTitle }: { slug: string; units: { id: string; title: string }[]; alphabetTitle: string }) {
  const p = useProgress();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const results = p.path[slug] ?? {};
  const flat = units.flatMap((u, ui) => lessonDefs(u.id).map((d) => ({ u, ui, d })));
  const next = flat.find((f) => !results[f.d.key]);
  const done = flat.length - flat.filter((f) => !results[f.d.key]).length;
  const fresh = done === 0;
  const pct = Math.round((done / flat.length) * 100);

  if (!mounted) return <div className="path-start" aria-hidden />;

  return (
    <div className="path-start">
      {next ? (
        <Link className="btn btn-primary btn-lg path-start-go" href={`/bahasa/${slug}/pelajaran/?u=${next.u.id}&l=${next.d.n}`}>
          <Play size={20} aria-hidden />
          <span>
            <span className="path-start-label">{fresh ? "Mulai pelajaran pertama" : "Lanjutkan belajar"}</span>
            <span className="path-start-sub">
              Unit {next.ui + 1}: {next.u.title} · {next.d.title}
            </span>
          </span>
        </Link>
      ) : (
        <span className="btn btn-lg path-start-go" aria-disabled>
          Semua pelajaran selesai!
        </span>
      )}
      {fresh ? (
        <Link className="btn btn-lg" href={`/bahasa/${slug}/huruf/`}>
          <Type size={18} aria-hidden /> Kenali {alphabetTitle.toLowerCase()} dulu
        </Link>
      ) : (
        <div className="path-start-progress" aria-label={`${done} dari ${flat.length} pelajaran selesai`}>
          <span className="path-goal-bar">
            <i style={{ width: `${pct}%` }} />
          </span>
          <span className="small">
            {done}/{flat.length} pelajaran
          </span>
        </div>
      )}
    </div>
  );
}
