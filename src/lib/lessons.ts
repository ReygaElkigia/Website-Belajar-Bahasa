/**
 * Penyusun pelajaran jalur belajar. Setiap unit dipecah menjadi empat
 * pelajaran singkat; setiap pelajaran berisi sekitar sepuluh latihan beragam
 * yang dibuat dari kosakata dan frasa unit itu.
 */

export interface Item {
  id: string;
  word: string;
  roman?: string;
  meaning: string;
  note?: string;
  kind: "word" | "phrase";
}

export interface UnitPack {
  id: string;
  title: string;
  level: string;
  words: Item[];
  phrases: Item[];
}

export type Exercise =
  | { type: "intro"; item: Item; options: Item[] }
  | { type: "meaning"; item: Item; options: Item[] }
  | { type: "word"; item: Item; options: Item[] }
  | { type: "listen"; item: Item; options: Item[] }
  | { type: "match"; items: Item[] }
  | { type: "type"; item: Item }
  | { type: "build"; item: Item; dir: "to-id" | "to-target"; tiles: string[]; answer: string[] }
  | { type: "speak"; item: Item };

export interface LessonDef {
  n: number;
  key: string;
  title: string;
  about: string;
  icon: "book" | "chat" | "trophy";
}

export const LESSONS_PER_UNIT = 4;

export function lessonDefs(unit: string): LessonDef[] {
  return [
    { n: 1, key: `${unit}:1`, title: "Kata baru I", about: "Kenali lima kata pertama.", icon: "book" },
    { n: 2, key: `${unit}:2`, title: "Kata baru II", about: "Lima kata berikutnya, plus ulangan.", icon: "book" },
    { n: 3, key: `${unit}:3`, title: "Frasa", about: "Susun kalimat dan dengarkan frasa unit.", icon: "chat" },
    { n: 4, key: `${unit}:4`, title: "Tantangan unit", about: "Campuran semua latihan. Lulus dengan akurasi 70% untuk menamatkan unit.", icon: "trophy" },
  ];
}

/* ---------- Utilitas ---------- */

function shuffle<T>(a: T[]): T[] {
  const r = [...a];
  for (let i = r.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [r[i], r[j]] = [r[j], r[i]];
  }
  return r;
}

const sample = <T,>(a: T[], n: number) => shuffle(a).slice(0, n);

function options(item: Item, pool: Item[], n = 4) {
  const others = pool.filter((p) => p.id !== item.id && p.meaning !== item.meaning && p.word !== item.word);
  return shuffle([item, ...sample(others, n - 1)]);
}

/** Bentuk utama kata (sebelum " / "), dipakai untuk suara dan pengetikan. */
export const mainForm = (w: string) => w.split(" / ")[0].trim();

const PUNCT = /[.,!?;:"“”‘’¿¡。、！？「」…()«»—–-]/g;

/** Pecah kalimat menjadi ubin kata. Bahasa tanpa spasi memakai Intl.Segmenter. */
export function segment(text: string, locale: string): string[] {
  const clean = text.replace(PUNCT, " ").replace(/\s+/g, " ").trim();
  const Seg = (Intl as unknown as { Segmenter?: new (l: string, o: { granularity: "word" }) => { segment(s: string): Iterable<{ segment: string; isWordLike?: boolean }> } }).Segmenter;
  const noSpace = /^(ja|zh|th)/.test(locale);
  if (noSpace && Seg) {
    const out: string[] = [];
    for (const s of new Seg(locale, { granularity: "word" }).segment(clean)) {
      if (s.isWordLike || s.segment.trim()) {
        const t = s.segment.trim();
        if (t) out.push(t);
      }
    }
    // Gabungkan potongan satu huruf berturut-turut agar ubin tidak terlalu banyak.
    const merged: string[] = [];
    for (const t of out) {
      const last = merged[merged.length - 1];
      if (last && [...last].length === 1 && [...t].length === 1 && merged.length > 0) merged[merged.length - 1] = last + t;
      else merged.push(t);
    }
    return merged.length ? merged : [clean];
  }
  if (noSpace) {
    const chars = [...clean.replace(/\s/g, "")];
    const out: string[] = [];
    for (let i = 0; i < chars.length; i += 2) out.push(chars.slice(i, i + 2).join(""));
    return out;
  }
  return clean.split(" ").filter(Boolean);
}

function buildExercise(item: Item, dir: "to-id" | "to-target", locale: string, pool: Item[]): Exercise {
  const answer = dir === "to-id" ? segment(item.meaning, "id") : segment(item.word, locale);
  const extraSource = pool.filter((p) => p.id !== item.id);
  const extra = new Set<string>();
  for (const p of shuffle(extraSource)) {
    for (const t of dir === "to-id" ? segment(p.meaning, "id") : segment(p.word, locale)) {
      if (!answer.includes(t)) extra.add(t);
      if (extra.size >= Math.min(4, Math.max(2, Math.ceil(answer.length / 2)))) break;
    }
    if (extra.size >= 3) break;
  }
  return { type: "build", item, dir, answer, tiles: shuffle([...answer, ...extra]) };
}

/* ---------- Penyusun pelajaran ---------- */

export function buildLesson(unit: UnitPack, n: number, allWords: Item[], locale: string, canSpeak: boolean): Exercise[] {
  const words = unit.words;
  const half = Math.ceil(words.length / 2);
  const ex: Exercise[] = [];
  const pool = allWords.length >= 4 ? allWords : words;

  if (n === 1 || n === 2) {
    const fresh = n === 1 ? words.slice(0, half) : words.slice(half);
    const review = n === 2 ? sample(words.slice(0, half), 2) : [];
    for (const w of fresh) ex.push({ type: "intro", item: w, options: options(w, pool) });
    const mix = shuffle([...fresh, ...review]);
    mix.slice(0, 3).forEach((w, i) => ex.push(i % 2 ? { type: "listen", item: w, options: options(w, pool) } : { type: "word", item: w, options: options(w, pool) }));
    ex.push({ type: "match", items: sample([...fresh, ...review], Math.min(5, fresh.length + review.length)) });
    ex.push({ type: "type", item: sample(fresh, 1)[0] });
    if (fresh.length > 3) ex.push({ type: "meaning", item: mix[3], options: options(mix[3], pool) });
    return ex;
  }

  if (n === 3) {
    const phrases = unit.phrases.length ? unit.phrases : words.slice(0, 3);
    const phrasePool = [...phrases, ...pool.filter((p) => p.kind === "phrase")];
    for (const p of phrases) {
      ex.push({ type: "meaning", item: p, options: options(p, phrasePool.length >= 4 ? phrasePool : [...phrasePool, ...pool]) });
      ex.push(buildExercise(p, "to-id", locale, phrasePool));
    }
    for (const p of sample(phrases, Math.min(2, phrases.length))) ex.push(buildExercise(p, "to-target", locale, phrasePool));
    ex.push({ type: "listen", item: sample(phrases, 1)[0], options: options(sample(phrases, 1)[0], phrasePool.length >= 4 ? phrasePool : pool) });
    ex.push({ type: "match", items: sample(words, Math.min(5, words.length)) });
    return interleave(ex);
  }

  // Tantangan unit: campuran yang lebih sulit
  const ws = shuffle(words);
  const ps = shuffle(unit.phrases);
  const phrasePool = [...unit.phrases, ...pool.filter((p) => p.kind === "phrase")];
  ex.push({ type: "word", item: ws[0], options: options(ws[0], pool) });
  ex.push({ type: "listen", item: ws[1], options: options(ws[1], pool) });
  ex.push({ type: "type", item: ws[2] });
  ex.push({ type: "match", items: ws.slice(3, 8) });
  if (ps[0]) ex.push(buildExercise(ps[0], "to-target", locale, phrasePool));
  ex.push({ type: "type", item: ws[4] ?? ws[0] });
  if (ps[1]) ex.push(buildExercise(ps[1], "to-id", locale, phrasePool));
  if (canSpeak) ex.push({ type: "speak", item: ws[5] ?? ws[0] });
  ex.push({ type: "meaning", item: ws[6] ?? ws[1], options: options(ws[6] ?? ws[1], pool) });
  if (ps[2]) ex.push({ type: "listen", item: ps[2], options: options(ps[2], phrasePool.length >= 4 ? phrasePool : pool) });
  ex.push({ type: "word", item: ws[7] ?? ws[2], options: options(ws[7] ?? ws[2], pool) });
  return ex;
}

/** Latihan isi hati: ulangan acak dari kata unit yang sudah dibuka. */
export function buildPractice(items: Item[], locale: string, canSpeak: boolean): Exercise[] {
  const ws = sample(items.filter((i) => i.kind === "word"), 8);
  const ps = sample(items.filter((i) => i.kind === "phrase"), 2);
  const ex: Exercise[] = [];
  ws.slice(0, 3).forEach((w, i) => ex.push(i === 1 ? { type: "listen", item: w, options: options(w, items) } : { type: "meaning", item: w, options: options(w, items) }));
  if (ws.length >= 4) ex.push({ type: "match", items: ws.slice(3, 8) });
  if (ws[0]) ex.push({ type: "type", item: ws[0] });
  for (const p of ps) ex.push(buildExercise(p, "to-id", locale, items.filter((i) => i.kind === "phrase")));
  if (canSpeak && ws[1]) ex.push({ type: "speak", item: ws[1] });
  return ex;
}

function interleave(ex: Exercise[]) {
  // Hindari dua latihan bertipe sama berturut-turut bila memungkinkan.
  const out: Exercise[] = [];
  const rest = [...ex];
  while (rest.length) {
    const last = out[out.length - 1]?.type;
    const i = rest.findIndex((e) => e.type !== last);
    out.push(rest.splice(i === -1 ? 0 : i, 1)[0]);
  }
  return out;
}

/* ---------- Penilaian ---------- */

export function norm(s: string) {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(PUNCT, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function lev(a: string, b: string) {
  const m = a.length;
  const n = b.length;
  const d = Array.from({ length: m + 1 }, (_, i) => [i, ...Array(n).fill(0)]);
  for (let j = 1; j <= n; j++) d[0][j] = j;
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return d[m][n];
}

/** Jawaban ketik: cocok, atau salah ketik kecil (dianggap benar dengan catatan). */
export function checkTyped(input: string, item: Item): "right" | "typo" | "wrong" {
  const v = norm(input);
  if (!v) return "wrong";
  const answers = item.meaning.split(/\s*[/(),]\s*/).map(norm).filter(Boolean);
  answers.push(norm(item.meaning));
  if (answers.includes(v)) return "right";
  if (answers.some((a) => a.length > 4 && lev(a, v) <= (a.length > 9 ? 2 : 1))) return "typo";
  return "wrong";
}

export function checkBuild(picked: string[], answer: string[]) {
  const join = (a: string[]) => norm(a.join(" ")).replace(/\s/g, "");
  return join(picked) === join(answer);
}

/** Kemiripan ucapan (pengenalan suara) dengan target, 0..1. */
export function speechScore(heard: string, target: string) {
  const a = norm(heard).replace(/\s/g, "");
  const b = norm(mainForm(target)).replace(/\s/g, "");
  if (!a || !b) return 0;
  return 1 - lev(a, b) / Math.max(a.length, b.length);
}
