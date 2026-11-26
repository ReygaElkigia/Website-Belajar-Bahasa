import type { Exam } from "./types";
import { inggrisExams } from "./inggris";
import { asiaExams } from "./asia";
import { eropaExams } from "./eropa";
import { jlptHigher } from "./jlpt";

export const exams: Exam[] = [...inggrisExams, ...asiaExams.flatMap((e) => (e.id === "jlpt-n5" ? [e, ...jlptHigher] : [e])), ...eropaExams];

export const examById: Record<string, Exam> = Object.fromEntries(exams.map((e) => [e.id, e]));

export const examsForLang = (slug: string) => exams.filter((e) => e.lang === slug);

export function questionCount(e: Exam) {
  return e.parts.reduce((n, p) => n + p.questions.length, 0);
}
