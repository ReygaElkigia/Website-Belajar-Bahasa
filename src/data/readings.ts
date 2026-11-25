import type { Example } from "./types";
import { readingTexts } from "./readingTexts";

/**
 * Bacaan bertingkat: cerita yang sama untuk semua bahasa, ditulis ulang oleh
 * kami dalam tiap bahasa dengan tata bahasa setingkat A2 dan B1.
 * Kalimat bahasa Indonesia di sini menjadi terjemahan per kalimat, dan soal
 * pemahamannya berlaku untuk semua bahasa.
 */

export interface ReadingQuestion {
  q: string;
  options: string[];
  /** Indeks jawaban benar di `options` */
  answer: number;
  /** Nomor kalimat (mulai 1) yang memuat jawabannya */
  line: number;
}

export interface Reading {
  id: "dimas" | "rina";
  level: "A2" | "B1";
  title: string;
  summary: string;
  focus: string[];
  sentences: Example[];
  questions: ReadingQuestion[];
}

interface Story {
  id: Reading["id"];
  level: Reading["level"];
  title: string;
  summary: string;
  focus: string[];
  lines: string[];
  questions: ReadingQuestion[];
}

const STORIES: Story[] = [
  {
    id: "dimas",
    level: "A2",
    title: "Akhir pekan Dimas",
    summary: "Dimas bercerita tentang kegiatannya setiap Sabtu dan Minggu, serta rencananya minggu depan.",
    focus: ["Kebiasaan dengan bentuk sekarang", "Kata sambung karena dan jadi", "Mau atau ingin"],
    lines: [
      "Nama saya Dimas, dan saya tinggal di Bandung.",
      "Pada hari kerja saya sibuk, jadi saya suka akhir pekan.",
      "Setiap Sabtu pagi, saya berenang bersama kakak perempuan saya.",
      "Siang harinya, saya memasak nasi goreng untuk keluarga.",
      "Hari Minggu, kami biasanya menonton film di rumah.",
      "Saya suka film komedi karena lucu.",
      "Minggu depan, saya ingin bermain sepak bola dengan teman-teman.",
    ],
    questions: [
      { q: "Di mana Dimas tinggal?", options: ["Di Bandung", "Di Jakarta", "Di Bali", "Di Surabaya"], answer: 0, line: 1 },
      { q: "Apa yang Dimas lakukan setiap Sabtu pagi?", options: ["Memasak", "Berenang", "Bermain sepak bola", "Menonton film"], answer: 1, line: 3 },
      { q: "Untuk siapa Dimas memasak nasi goreng?", options: ["Untuk temannya", "Untuk gurunya", "Untuk keluarganya", "Untuk dirinya sendiri"], answer: 2, line: 4 },
      { q: "Mengapa Dimas suka film komedi?", options: ["Karena pendek", "Karena menakutkan", "Karena murah", "Karena lucu"], answer: 3, line: 6 },
      { q: "Apa rencana Dimas minggu depan?", options: ["Bermain sepak bola", "Berenang bersama kakaknya", "Pergi ke Jakarta", "Menonton film"], answer: 0, line: 7 },
    ],
  },
  {
    id: "rina",
    level: "B1",
    title: "Perjalanan pertama Rina",
    summary: "Rina menceritakan perjalanan pertamanya ke luar negeri: rasa khawatir, tersesat, ditolong orang asing, dan rencana untuk kembali.",
    focus: ["Bentuk lampau untuk bercerita", "Pengalaman: pernah dan belum pernah", "Perbandingan dan bentuk paling", "Rencana masa depan"],
    lines: [
      "Tahun lalu, Rina pergi ke {kota} untuk pertama kalinya.",
      "Sebelum berangkat, dia khawatir karena belum pernah naik pesawat.",
      "Ternyata penerbangannya lebih nyaman daripada yang dia bayangkan.",
      "Pada hari pertama, dia tersesat dan bertanya jalan kepada seorang nenek.",
      "Nenek itu sangat ramah dan mengantarnya sampai ke stasiun.",
      "Selama seminggu, dia mengunjungi museum, taman, dan pasar tradisional.",
      "Menurut Rina, makanan di pasar adalah yang paling enak.",
      "Setiap malam, dia menulis pengalamannya di buku harian.",
      "Sebelum pulang, dia membeli oleh-oleh untuk keluarganya.",
      "Tahun depan dia akan kembali, jadi sekarang dia belajar bahasa {bahasa} setiap hari.",
    ],
    questions: [
      { q: "Mengapa Rina khawatir sebelum berangkat?", options: ["Dia kehilangan paspor", "Dia belum pernah naik pesawat", "Dia tidak punya uang", "Cuacanya buruk"], answer: 1, line: 2 },
      { q: "Bagaimana penerbangannya menurut Rina?", options: ["Lebih nyaman daripada dugaannya", "Lebih buruk daripada dugaannya", "Sangat membosankan", "Dibatalkan"], answer: 0, line: 3 },
      { q: "Siapa yang menolong Rina saat tersesat?", options: ["Seorang polisi", "Sopir taksi", "Seorang nenek", "Temannya"], answer: 2, line: 4 },
      { q: "Menurut Rina, di mana makanan paling enak?", options: ["Di hotel", "Di stasiun", "Di museum", "Di pasar"], answer: 3, line: 7 },
      { q: "Apa yang Rina lakukan setiap malam?", options: ["Menulis di buku harian", "Menonton film", "Menelepon keluarga", "Berbelanja oleh-oleh"], answer: 0, line: 8 },
      { q: "Mengapa sekarang Rina belajar setiap hari?", options: ["Karena ada ujian", "Karena dia akan kembali tahun depan", "Karena disuruh nenek itu", "Karena dia pindah kerja"], answer: 1, line: 10 },
    ],
  },
];

export function readingsFor(slug: string, languageName: string): Reading[] {
  const t = readingTexts[slug];
  if (!t) return [];
  return STORIES.map((s) => {
    const rows = t[s.id]
      .trim()
      .split("\n")
      .map((l) => l.split("|").map((x) => x.trim()));
    if (rows.length !== s.lines.length && process.env.NODE_ENV !== "production") {
      console.warn(`[bacaan] ${slug}/${s.id}: ${rows.length} kalimat, seharusnya ${s.lines.length}`);
    }
    const sentences = s.lines.map((meaning, i) => ({
      text: rows[i]?.[0] ?? "",
      roman: rows[i]?.[1] || undefined,
      meaning: meaning.replace("{kota}", t.city).replace("{bahasa}", languageName),
    }));
    return { id: s.id, level: s.level, title: s.title, summary: s.summary, focus: s.focus, sentences, questions: s.questions };
  });
}

export const readingIds = STORIES.map((s) => s.id);
