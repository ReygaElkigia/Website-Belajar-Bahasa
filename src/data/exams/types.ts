/**
 * Ujian kemahiran bahasa. Info format diambil dari situs penyelenggara resmi
 * (lihat `sources`). Soal latihan ditulis sendiri meniru jenis tugas aslinya,
 * bukan salinan soal resmi.
 */

interface Base {
  /** Nama jenis tugas resmi, mis. "Repeat Sentence" atau "漢字読み". */
  task?: string;
  /** Perintah soal. */
  prompt: string;
  /** Teks bacaan atau dokumen yang menyertai soal. */
  passage?: string;
  /** Naskah audio, dibacakan dengan suara perangkat. */
  audio?: string;
  /** Penjelasan yang ditampilkan setelah menjawab. */
  explain?: string;
}

export interface McQuestion extends Base {
  type: "mc";
  options: string[];
  answer: number;
}

export interface MultiQuestion extends Base {
  type: "multi";
  options: string[];
  answers: number[];
}

export interface OrderQuestion extends Base {
  type: "order";
  /** Urutan yang benar. Ditampilkan dalam urutan acak. */
  items: string[];
  /** Penyambung saat menampilkan hasil: " " (default), "" untuk aksara CJK, "\n" untuk paragraf. */
  joiner?: string;
  /** Kerangka kalimat, mis. "あの ＿＿＿ は わたしの あにです。" */
  frame?: string;
}

export interface GapQuestion extends Base {
  type: "gap";
  /** Teks dengan penanda [0], [1], … untuk tiap rumpang. */
  text: string;
  gaps: { options: string[]; answer: number }[];
}

export interface TypeQuestion extends Base {
  type: "type";
  /** Kalimat/konteks yang tampil, dengan ___ untuk bagian yang diisi. */
  display?: string;
  answer: string;
  accept?: string[];
}

export interface SpeakQuestion extends Base {
  type: "speak";
  /** Teks yang harus dibaca keras (Read Aloud). */
  text?: string;
  /** Detik persiapan dan berbicara, mengikuti ujian aslinya. */
  prepSeconds?: number;
  speakSeconds?: number;
  checklist: string[];
  model?: string;
}

export interface WriteQuestion extends Base {
  type: "write";
  /** Tabel data opsional (baris pertama = judul kolom). */
  table?: string[][];
  minWords?: number;
  maxWords?: number;
  minutes?: number;
  checklist: string[];
  model?: string;
}

export type Question =
  | McQuestion
  | MultiQuestion
  | OrderQuestion
  | GapQuestion
  | TypeQuestion
  | SpeakQuestion
  | WriteQuestion;

export interface ExamSection {
  name: string;
  time: string;
  items: string;
  tasks: string;
}

export interface PracticePart {
  id: string;
  /** Bagian ujian, mis. "Listening" */
  section: string;
  title: string;
  instructions: string;
  minutes?: number;
  questions: Question[];
}

export interface Exam {
  id: string;
  lang: string;
  name: string;
  /** Nama lengkap dan penyelenggara. */
  fullName: string;
  org: string;
  level: string;
  /** Untuk siapa dan dipakai untuk apa. */
  about: string;
  format: ExamSection[];
  scoring: string[];
  tips: string[];
  official: { label: string; url: string };
  sources: { label: string; url: string }[];
  /** Catatan tambahan, mis. format yang sedang berubah. */
  note?: string;
  parts: PracticePart[];
}
