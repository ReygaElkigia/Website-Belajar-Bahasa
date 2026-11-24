export type UnitId =
  | "salam"
  | "kenalan"
  | "angka"
  | "keluarga"
  | "makan"
  | "waktu"
  | "arah"
  | "belanja";

export interface Unit {
  id: UnitId;
  title: string;
  summary: string;
  level: "A1" | "A2";
}

export interface Concept {
  id: string;
  /** Kata dalam bahasa Indonesia */
  word: string;
  /** Kelas kata */
  pos: string;
  unit: UnitId;
}

export interface PhraseConcept {
  id: string;
  text: string;
  unit: UnitId;
}

export interface Term {
  /** Tulisan dalam aksara asli */
  word: string;
  /** Romanisasi (kosong untuk aksara Latin) */
  roman?: string;
  /** Catatan pendek: bacaan kana, bentuk lain, dsb. */
  note?: string;
}

export interface Glyph {
  char: string;
  roman: string;
  note?: string;
  /** Teks yang diucapkan TTS (default: char) */
  say?: string;
}

export interface GlyphSection {
  title: string;
  note?: string;
  cols?: number;
  items: (Glyph | null)[];
}

export interface Alphabet {
  title: string;
  intro: string;
  sections: GlyphSection[];
}

export interface Example {
  text: string;
  roman?: string;
  meaning: string;
}

export interface Grammar {
  title: string;
  body: string;
  examples: Example[];
}

export type VideoKind = "Huruf" | "Frasa" | "Percakapan";

export interface Video {
  id: string;
  title: string;
  kind: VideoKind;
  about: string;
}

export interface Language {
  slug: string;
  name: string;
  native: string;
  /** BCP-47 untuk suara (speech synthesis) */
  tts: string;
  /** Kode bahasa untuk kamus online */
  code: string;
  dir: "ltr" | "rtl";
  script: string;
  /** Karakter perwakilan aksara */
  glyph: string;
  speakers: number;
  /** 1 ringan … 4 berat, untuk penutur bahasa Indonesia */
  challenge: 1 | 2 | 3 | 4;
  challengeNote: string;
  regions: string;
  about: string;
  vocab: Record<string, Term>;
  phrases: Record<string, Term>;
  alphabet: Alphabet;
  grammar: Grammar[];
  videos: Video[];
}
