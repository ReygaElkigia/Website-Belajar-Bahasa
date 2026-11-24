/** Penilaian otomatis soal latihan ujian. Semua skor bernilai 0..1. */

export function normalize(s: string) {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[.,!?;:"'“”‘’¿¡。、！？「」…]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokens(s: string) {
  const n = normalize(s);
  // Aksara tanpa spasi (Jepang, Mandarin, Thai): bandingkan per karakter.
  if (!n.includes(" ") && /[぀-鿿฀-๿]/.test(n)) return [...n];
  return n.split(" ").filter(Boolean);
}

/** Jawaban isian: cocok persis (setelah normalisasi) dengan jawaban atau alternatifnya. */
export function scoreExact(input: string, answer: string, accept: string[] = []) {
  const v = normalize(input);
  return [answer, ...accept].some((a) => normalize(a) === v) ? 1 : 0;
}

/**
 * Dikte dan kalimat panjang: proporsi kata jawaban yang muncul di masukan,
 * seperti penilaian Write from Dictation PTE (satu poin per kata benar).
 */
export function scoreWords(input: string, answer: string) {
  const want = tokens(answer);
  if (!want.length) return 0;
  const have = tokens(input);
  const pool = new Map<string, number>();
  have.forEach((w) => pool.set(w, (pool.get(w) ?? 0) + 1));
  let hit = 0;
  for (const w of want) {
    const n = pool.get(w) ?? 0;
    if (n > 0) {
      hit++;
      pool.set(w, n - 1);
    }
  }
  return hit / want.length;
}

/** Soal isian pendek dinilai persis; kalimat panjang dinilai per kata. */
export function scoreTyped(input: string, answer: string, accept?: string[]) {
  if (tokens(answer).length <= 3) return scoreExact(input, answer, accept);
  return Math.max(scoreExact(input, answer, accept), scoreWords(input, answer));
}

/** Pilihan ganda jawaban banyak: benar +1, salah -1, minimal 0 (aturan PTE). */
export function scoreMulti(picked: number[], answers: number[]) {
  const right = picked.filter((p) => answers.includes(p)).length;
  const wrong = picked.length - right;
  return Math.max(0, right - wrong) / answers.length;
}

/** Menyusun urutan: proporsi pasangan bersebelahan yang benar (aturan PTE Re-order Paragraphs). */
export function scoreOrder(order: string[], correct: string[]) {
  if (correct.length < 2) return order[0] === correct[0] ? 1 : 0;
  let pairs = 0;
  for (let i = 0; i < correct.length - 1; i++) {
    const a = order.indexOf(correct[i]);
    if (a !== -1 && order[a + 1] === correct[i + 1]) pairs++;
  }
  return pairs / (correct.length - 1);
}

export function countWords(s: string) {
  const t = s.trim();
  if (!t) return 0;
  // Aksara tanpa spasi dihitung per karakter, sebagaimana ujian JLPT/HSK menghitung panjang teks.
  if (!/\s/.test(t) && /[぀-鿿฀-๿]/.test(t)) return [...t.replace(/[。、！？]/g, "")].length;
  return t.split(/\s+/).length;
}
