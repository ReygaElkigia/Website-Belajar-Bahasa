import type { Language, Term } from "./types";
import { concepts, phraseConcepts, units, conceptById, unitById } from "./curriculum";

import inggris from "./languages/inggris";
import jepang from "./languages/jepang";
import korea from "./languages/korea";
import mandarin from "./languages/mandarin";
import arab from "./languages/arab";
import jerman from "./languages/jerman";
import prancis from "./languages/prancis";
import spanyol from "./languages/spanyol";
import rusia from "./languages/rusia";
import italia from "./languages/italia";
import thai from "./languages/thai";
import hindi from "./languages/hindi";

export const languages: Language[] = [
  inggris,
  jepang,
  korea,
  mandarin,
  arab,
  jerman,
  prancis,
  spanyol,
  rusia,
  italia,
  thai,
  hindi,
];

export const languageBySlug: Record<string, Language> = Object.fromEntries(
  languages.map((l) => [l.slug, l]),
);

export const getLanguage = (slug: string) => languageBySlug[slug];

export { concepts, phraseConcepts, units, conceptById, unitById };

export const challengeLabel: Record<Language["challenge"], string> = {
  1: "Ringan",
  2: "Sedang",
  3: "Menantang",
  4: "Berat",
};

export interface VocabRow {
  id: string;
  meaning: string;
  pos: string;
  term: Term;
}

export function unitVocab(lang: Language, unitId: string): VocabRow[] {
  return concepts
    .filter((c) => c.unit === unitId && lang.vocab[c.id])
    .map((c) => ({ id: c.id, meaning: c.word, pos: c.pos, term: lang.vocab[c.id] }));
}

export function unitPhrases(lang: Language, unitId: string) {
  return phraseConcepts
    .filter((p) => p.unit === unitId && lang.phrases[p.id])
    .map((p) => ({ id: p.id, meaning: p.text, term: lang.phrases[p.id] }));
}

export const totalWords = concepts.length * languages.length;

/** Bahasa tambahan untuk kamus online (di luar 12 bahasa berkurikulum). */
export const onlineLanguages: { code: string; name: string }[] = [
  { code: "en", name: "Inggris" },
  { code: "ja", name: "Jepang" },
  { code: "ko", name: "Korea" },
  { code: "zh-CN", name: "Mandarin" },
  { code: "ar", name: "Arab" },
  { code: "de", name: "Jerman" },
  { code: "fr", name: "Prancis" },
  { code: "es", name: "Spanyol" },
  { code: "ru", name: "Rusia" },
  { code: "it", name: "Italia" },
  { code: "th", name: "Thai" },
  { code: "hi", name: "Hindi" },
  { code: "nl", name: "Belanda" },
  { code: "pt", name: "Portugis" },
  { code: "tr", name: "Turki" },
  { code: "vi", name: "Vietnam" },
  { code: "ms", name: "Melayu" },
  { code: "tl", name: "Tagalog" },
  { code: "fa", name: "Persia" },
  { code: "ur", name: "Urdu" },
  { code: "bn", name: "Bengali" },
  { code: "ta", name: "Tamil" },
  { code: "el", name: "Yunani" },
  { code: "he", name: "Ibrani" },
  { code: "pl", name: "Polandia" },
  { code: "uk", name: "Ukraina" },
  { code: "sv", name: "Swedia" },
  { code: "no", name: "Norwegia" },
  { code: "da", name: "Denmark" },
  { code: "fi", name: "Finlandia" },
  { code: "cs", name: "Ceko" },
  { code: "hu", name: "Hungaria" },
  { code: "ro", name: "Rumania" },
  { code: "sw", name: "Swahili" },
  { code: "km", name: "Khmer" },
  { code: "my", name: "Myanmar" },
  { code: "lo", name: "Laos" },
  { code: "jv", name: "Jawa" },
  { code: "su", name: "Sunda" },
  { code: "la", name: "Latin" },
].sort((a, b) => a.name.localeCompare(b.name, "id"));
