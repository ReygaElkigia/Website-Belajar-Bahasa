/** Konstanta dan tipe kanji JLPT yang dipakai halaman (server) dan komponen (klien). */

export const KANJI_LEVELS = ["n5", "n4", "n3", "n2", "n1"] as const;
export type KanjiLevel = (typeof KANJI_LEVELS)[number];
export const CHUNK = 60;

/** Baris indeks: [kanji, arti singkat, jumlah goresan]. */
export type KanjiRow = [string, string, number];

export interface KanjiDetail {
  on: string[];
  kun: string[];
  s: number;
  /** Kelas sekolah Jepang (1–6), 8 = SMP ke atas, 9–10 = kanji nama. */
  g: number;
  /** Contoh kata: [tulisan, bacaan, arti]. */
  ex: [string, string, string][];
  /** Goresan berurutan, jalur SVG dalam kotak 109×109. */
  p: string[];
}

export const LEVEL_INFO: Record<KanjiLevel, { label: string; blurb: string }> = {
  n5: { label: "N5", blurb: "Angka, hari, arah, keluarga, dan kata kerja paling dasar." },
  n4: { label: "N4", blurb: "Kehidupan sehari-hari: sekolah, kerja, kota, musim." },
  n3: { label: "N3", blurb: "Berita ringan, papan pengumuman, dan percakapan umum." },
  n2: { label: "N2", blurb: "Koran, dokumen kantor, dan bacaan umum orang dewasa." },
  n1: { label: "N1", blurb: "Bahasa tulis lanjutan, istilah resmi, dan kanji nama." },
};

/** "た.べる" → ["た", "べる"]; awalan/akhiran "-" dibiarkan. */
export function splitKun(kun: string): [string, string] {
  const i = kun.indexOf(".");
  return i < 0 ? [kun, ""] : [kun.slice(0, i), kun.slice(i + 1)];
}

