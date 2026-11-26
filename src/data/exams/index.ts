import type { Exam } from "./types";
import { inggrisExams } from "./inggris";
import { asiaExams } from "./asia";
import { eropaExams } from "./eropa";
import { jlptHigher } from "./jlpt";
import { hskHigher } from "./hsk";
import { topik2 } from "./topik";

/** Level lanjutan diletakkan tepat setelah level dasarnya. */
const after: Record<string, Exam[]> = { "jlpt-n5": jlptHigher, "topik-1": [topik2], "hsk-1": hskHigher };

export const exams: Exam[] = [...inggrisExams, ...asiaExams.flatMap((e) => [e, ...(after[e.id] ?? [])]), ...eropaExams];

export const examById: Record<string, Exam> = Object.fromEntries(exams.map((e) => [e.id, e]));

export const examsForLang = (slug: string) => exams.filter((e) => e.lang === slug);

export function questionCount(e: Exam) {
  return e.parts.reduce((n, p) => n + p.questions.length, 0);
}
