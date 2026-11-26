import type { Exam } from "./types";
import { inggrisExams } from "./inggris";
import { asiaExams } from "./asia";
import { eropaExams } from "./eropa";
import { jlptHigher } from "./jlpt";
import { hskHigher } from "./hsk";
import { topik2 } from "./topik";
import { goetheHigher } from "./goethe";
import { delfHigher } from "./delf";
import { deleHigher } from "./dele";
import { cilsHigher, torflHigher } from "./torflcils";

/** Level lanjutan diletakkan tepat setelah level dasarnya. */
const after: Record<string, Exam[]> = {
  "jlpt-n5": jlptHigher,
  "topik-1": [topik2],
  "hsk-1": hskHigher,
  "goethe-a1": goetheHigher,
  "delf-a1": delfHigher,
  "dele-a1": deleHigher,
  "trki-teu": torflHigher,
  "cils-a1": cilsHigher,
};
const withLevels = (list: Exam[]) => list.flatMap((e) => [e, ...(after[e.id] ?? [])]);

/** Satu ujian per keluarga (level pertama), untuk daftar ringkas. */
export const baseExams: Exam[] = [...inggrisExams, ...asiaExams, ...eropaExams];

export const exams: Exam[] = [...inggrisExams, ...withLevels(asiaExams), ...withLevels(eropaExams)];

export const examById: Record<string, Exam> = Object.fromEntries(exams.map((e) => [e.id, e]));

export const examsForLang = (slug: string) => exams.filter((e) => e.lang === slug);

export function questionCount(e: Exam) {
  return e.parts.reduce((n, p) => n + p.questions.length, 0);
}
