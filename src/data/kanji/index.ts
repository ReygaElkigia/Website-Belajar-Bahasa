import levels from "./levels.json";
import type { KanjiLevel, KanjiRow } from "./meta";

/** Indeks kanji per level (kanji, arti singkat, jumlah goresan), urut sesuai daftar Waller. */
export const kanjiIndex = {
  n5: levels.N5,
  n4: levels.N4,
  n3: levels.N3,
  n2: levels.N2,
  n1: levels.N1,
} as unknown as Record<KanjiLevel, KanjiRow[]>;

export const KANJI_SOURCES = [
  { label: "Daftar per level: Jonathan Waller, JLPT Resources", url: "http://www.tanos.co.uk/jlpt/", license: "CC BY" },
  { label: "Bacaan, jumlah goresan, kelas sekolah: KANJIDIC2 (EDRDG)", url: "https://www.edrdg.org/wiki/index.php/KANJIDIC_Project", license: "CC BY-SA 4.0" },
  { label: "Contoh kata: JMdict (EDRDG)", url: "https://www.edrdg.org/wiki/index.php/JMdict-EDICT_Dictionary_Project", license: "CC BY-SA 4.0" },
  { label: "Urutan goresan: KanjiVG (Ulrich Apel dan kontributor)", url: "https://kanjivg.tagaini.net", license: "CC BY-SA 3.0" },
];
