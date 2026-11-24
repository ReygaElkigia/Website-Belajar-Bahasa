import type { Alphabet, Example, Glyph, GlyphSection, Grammar, Language, Term, Video } from "./types";
import { concepts, phraseConcepts } from "./curriculum";

/**
 * Data bahasa ditulis dalam format baris yang ringkas agar mudah diperiksa
 * penutur asli: `kunci | kata | romanisasi | catatan`.
 */
function parseTerms(src: string): Record<string, Term> {
  const out: Record<string, Term> = {};
  for (const raw of src.split("\n")) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    const [key, word, roman, note] = line.split("|").map((s) => s.trim());
    out[key] = { word, roman: roman || undefined, note: note || undefined };
  }
  return out;
}

/** `char=bunyi|catatan|ucapan; ...` — `_` untuk sel kosong. */
export function glyphs(src: string): (Glyph | null)[] {
  return src
    .split(";")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((item) => {
      if (item === "_") return null;
      const eq = item.indexOf("=");
      const char = item.slice(0, eq).trim();
      const [roman, note, say] = item.slice(eq + 1).split("|").map((s) => s.trim());
      return { char, roman, note: note || undefined, say: say || undefined };
    });
}

/** Contoh kalimat: `teks | romanisasi | arti` per baris. */
export function examples(src: string): Example[] {
  return src
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => {
      const parts = l.split("|").map((s) => s.trim());
      if (parts.length === 2) return { text: parts[0], meaning: parts[1] };
      return { text: parts[0], roman: parts[1] || undefined, meaning: parts[2] };
    });
}

interface LanguageInput
  extends Omit<Language, "vocab" | "phrases" | "alphabet" | "grammar" | "videos"> {
  vocab: string;
  phrases: string;
  alphabet: { title: string; intro: string; sections: (Omit<GlyphSection, "items"> & { items: string })[] };
  grammar: (Omit<Grammar, "examples"> & { examples: string })[];
  videos: Video[];
}

export function defineLanguage(input: LanguageInput): Language {
  const vocab = parseTerms(input.vocab);
  const phrases = parseTerms(input.phrases);

  if (process.env.NODE_ENV !== "production") {
    const missing = [
      ...concepts.filter((c) => !vocab[c.id]).map((c) => c.id),
      ...phraseConcepts.filter((p) => !phrases[p.id]).map((p) => p.id),
    ];
    if (missing.length) console.warn(`[${input.slug}] belum ada terjemahan: ${missing.join(", ")}`);
  }

  const alphabet: Alphabet = {
    title: input.alphabet.title,
    intro: input.alphabet.intro,
    sections: input.alphabet.sections.map((s) => ({ ...s, items: glyphs(s.items) })),
  };

  return {
    ...input,
    vocab,
    phrases,
    alphabet,
    grammar: input.grammar.map((g) => ({ ...g, examples: examples(g.examples) })),
  };
}
