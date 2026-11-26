import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getLanguage, languages, unitPhrases, unitVocab, units } from "@/data";
import { LessonRunner } from "@/components/lesson/LessonRunner";
import { Themed } from "@/components/anime/Themed";
import type { UnitPack } from "@/lib/lessons";

export const dynamicParams = false;

export function generateStaticParams() {
  return languages.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const l = getLanguage(slug);
  return l ? { title: `Pelajaran bahasa ${l.name}`, robots: { index: false } } : {};
}

export default async function LessonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const l = getLanguage(slug);
  if (!l) notFound();
  const packs: UnitPack[] = units.map((u) => ({
    id: u.id,
    title: u.title,
    level: u.level,
    words: unitVocab(l, u.id).map((v) => ({ id: v.id, word: v.term.word, roman: v.term.roman, meaning: v.meaning, note: v.term.note, kind: "word" as const })),
    phrases: unitPhrases(l, u.id).map((p) => ({ id: p.id, word: p.term.word, roman: p.term.roman, meaning: p.meaning, note: p.term.note, kind: "phrase" as const })),
  }));
  return (
    <Themed slug={l.slug}>
      <Suspense>
        <LessonRunner lang={{ slug: l.slug, name: l.name, tts: l.tts, dir: l.dir }} units={packs} />
      </Suspense>
    </Themed>
  );
}
