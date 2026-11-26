import type { GapQuestion, McQuestion, Question } from "./types";

/** Pembantu menulis soal: opsi pertama selalu jawaban benar, lalu letaknya diputar. */

/** Taruh jawaban benar (opsi pertama) di posisi `at` agar letak jawaban bervariasi. */
export function place(opts: string[], at: number) {
  const [right, ...rest] = opts;
  const i = at % opts.length;
  return { options: [...rest.slice(0, i), right, ...rest.slice(i)], answer: i };
}

let turn = 0;
/** Pilihan ganda; opsi pertama adalah jawaban benar. */
export function mc(q: Omit<McQuestion, "type" | "options" | "answer"> & { opts: string[] }): Question {
  const { opts, ...rest } = q;
  return { type: "mc", ...rest, ...place(opts, (turn = (turn * 7 + 3) % 11)) };
}

export function gap(q: Omit<GapQuestion, "type" | "gaps"> & { gaps: string[][] }): Question {
  const { gaps, ...rest } = q;
  return { type: "gap", ...rest, gaps: gaps.map((g, i) => place(g, (turn + i * 2 + 1) % g.length)) };
}

