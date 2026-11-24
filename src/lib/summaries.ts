import { challengeLabel, languages } from "@/data";
import type { LangSummary } from "@/components/LanguageIndex";

/** Ringkasan ringan untuk komponen klien, tanpa membawa seluruh data bahasa. */
export function languageSummaries(): LangSummary[] {
  return languages.map((l) => ({
    slug: l.slug,
    name: l.name,
    native: l.native,
    tts: l.tts,
    glyph: l.glyph,
    script: l.script,
    latin: l.script === "Latin",
    speakers: l.speakers,
    challenge: l.challenge,
    challengeLabel: challengeLabel[l.challenge],
  }));
}
