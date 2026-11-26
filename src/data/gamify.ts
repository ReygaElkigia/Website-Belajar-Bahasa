/**
 * Aturan gamifikasi Tutur: XP, level, target harian, dan lencana.
 * Semua dihitung di perangkat dari data progres.
 */

export const XP = {
  correct: 10, // jawaban kuis atau soal ujian yang benar
  unitPass: 50, // pertama kali lulus unit (skor ≥ 70)
  perfect: 20, // pertama kali skor 100 di unit
  cardKnew: 5, // kartu hafalan: sudah hafal
  cardAgain: 2, // kartu hafalan: belum hafal (tetap dihargai karena sudah berlatih)
  examPart: 20, // menyelesaikan satu bagian latihan ujian
  selfCheck: 5, // menilai sendiri tugas berbicara/menulis
  reading: 30, // pertama kali lulus soal pemahaman bacaan
} as const;

export const GOALS = [
  { xp: 30, label: "Santai", note: "sekitar 5 menit" },
  { xp: 50, label: "Rutin", note: "sekitar 10 menit" },
  { xp: 100, label: "Serius", note: "sekitar 20 menit" },
  { xp: 200, label: "Ambisius", note: "sekitar 40 menit" },
];

const TITLES = [
  "Pemula",
  "Murid Baru",
  "Penjelajah Kata",
  "Petualang Bahasa",
  "Ksatria Kosakata",
  "Penyihir Tata Bahasa",
  "Sensei",
  "Legenda Poliglot",
];

/** XP total yang dibutuhkan untuk mencapai level n (level 1 = 0 XP). */
export const xpForLevel = (n: number) => 50 * n * (n - 1);

export function levelInfo(xp: number) {
  let level = 1;
  while (xpForLevel(level + 1) <= xp) level++;
  const floor = xpForLevel(level);
  const next = xpForLevel(level + 1);
  return {
    level,
    title: TITLES[Math.min(level - 1, TITLES.length - 1)],
    floor,
    next,
    into: xp - floor,
    span: next - floor,
    pct: Math.round(((xp - floor) / (next - floor)) * 100),
  };
}

/** Ringkasan yang dibutuhkan untuk mengecek lencana. */
export interface BadgeFacts {
  unitsPassed: number;
  languagesWithUnit: number;
  fullLanguage: boolean;
  perfectUnit: boolean;
  wordsLearned: number;
  cardsReviewed: number;
  examParts: number;
  readingsPassed: number;
  readingsB1: number;
  streak: number;
  goalDays: number;
  level: number;
}

export interface Badge {
  id: string;
  name: string;
  how: string;
  icon: "seed" | "flame" | "moon" | "sun" | "book" | "scroll" | "crown" | "globe" | "target" | "star" | "cards" | "medal";
  test: (f: BadgeFacts) => boolean;
}

export const BADGES: Badge[] = [
  { id: "first-unit", name: "Langkah Pertama", how: "Lulus satu unit pelajaran.", icon: "seed", test: (f) => f.unitsPassed >= 1 },
  { id: "first-cards", name: "Kartu Pertama", how: "Ulangi 12 kartu hafalan.", icon: "cards", test: (f) => f.cardsReviewed >= 12 },
  { id: "streak-3", name: "Tiga Hari Berturut", how: "Belajar 3 hari berturut-turut.", icon: "flame", test: (f) => f.streak >= 3 },
  { id: "streak-7", name: "Seminggu Penuh", how: "Belajar 7 hari berturut-turut.", icon: "moon", test: (f) => f.streak >= 7 },
  { id: "streak-30", name: "Sebulan Tanpa Libur", how: "Belajar 30 hari berturut-turut.", icon: "sun", test: (f) => f.streak >= 30 },
  { id: "goal-1", name: "Target Tercapai", how: "Capai target XP harian.", icon: "target", test: (f) => f.goalDays >= 1 },
  { id: "perfect", name: "Nilai Sempurna", how: "Dapatkan skor 100 di kuis unit.", icon: "star", test: (f) => f.perfectUnit },
  { id: "words-50", name: "Kolektor Kata", how: "Buat 50 kata melekat di kartu hafalan.", icon: "book", test: (f) => f.wordsLearned >= 50 },
  { id: "exam-1", name: "Siap Ujian", how: "Selesaikan satu bagian latihan ujian.", icon: "scroll", test: (f) => f.examParts >= 1 },
  { id: "reader-1", name: "Kutu Buku", how: "Lulus soal pemahaman satu bacaan bertingkat.", icon: "book", test: (f) => f.readingsPassed >= 1 },
  { id: "reader-b1", name: "Pembaca B1", how: "Lulus bacaan tingkat B1 di 2 bahasa.", icon: "scroll", test: (f) => f.readingsB1 >= 2 },
  { id: "polyglot-3", name: "Poliglot Muda", how: "Lulus unit di 3 bahasa berbeda.", icon: "globe", test: (f) => f.languagesWithUnit >= 3 },
  { id: "full-language", name: "Tamat Satu Bahasa", how: "Lulus semua unit dalam satu bahasa.", icon: "crown", test: (f) => f.fullLanguage },
  { id: "level-5", name: "Ksatria Kosakata", how: "Capai level 5.", icon: "medal", test: (f) => f.level >= 5 },
];

export const badgeById = Object.fromEntries(BADGES.map((b) => [b.id, b]));

/** Pujian dalam bahasa yang sedang dipelajari, diucapkan maskot. */
export const PRAISE: Record<string, { text: string; tts: string }> = {
  inggris: { text: "Great job!", tts: "en-US" },
  jepang: { text: "すごい！", tts: "ja-JP" },
  korea: { text: "잘했어요!", tts: "ko-KR" },
  mandarin: { text: "太棒了！", tts: "zh-CN" },
  arab: { text: "ممتاز!", tts: "ar-SA" },
  jerman: { text: "Super!", tts: "de-DE" },
  prancis: { text: "Bravo !", tts: "fr-FR" },
  spanyol: { text: "¡Genial!", tts: "es-ES" },
  rusia: { text: "Отлично!", tts: "ru-RU" },
  italia: { text: "Bravissimo!", tts: "it-IT" },
  thai: { text: "เก่งมาก!", tts: "th-TH" },
  hindi: { text: "शाबाश!", tts: "hi-IN" },
};

export const CHEER_WRONG = [
  "Hampir! Coba ingat bentuk yang benar, ya.",
  "Tidak apa-apa, salah itu bagian dari belajar.",
  "Sedikit lagi! Dengarkan sekali lagi pelafalannya.",
  "Ayo, kita ulangi kata ini nanti di kartu hafalan.",
];

export const CHEER_RIGHT = ["Mantap!", "Tepat sekali!", "Hebat!", "Lanjutkan!", "Keren!"];
