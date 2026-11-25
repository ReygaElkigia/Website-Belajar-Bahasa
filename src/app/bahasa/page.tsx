import type { Metadata } from "next";
import { LanguageIndex } from "@/components/LanguageIndex";
import { WorldPicker } from "@/components/WorldPicker";
import { onlineLanguages, units } from "@/data";
import { languageSummaries } from "@/lib/summaries";
import { LESSONS_PER_UNIT } from "@/lib/lessons";

export const metadata: Metadata = {
  title: "Semua bahasa",
  description: "Pilih dari 12 bahasa dunia: Inggris, Jepang, Korea, Mandarin, Arab, Jerman, Prancis, Spanyol, Rusia, Italia, Thai, dan Hindi.",
};

export default function LanguagesPage() {
  const items = languageSummaries();
  return (
    <>
      <WorldPicker
        items={items.map((l) => ({ slug: l.slug, name: l.name, native: l.native, tts: l.tts, challengeLabel: l.challengeLabel }))}
        units={units.length}
        lessons={units.length * LESSONS_PER_UNIT}
      />
      <section className="section" id="daftar">
        <div className="wrap">
          <div className="section-head">
            <h2>Semua bahasa</h2>
            <p className="muted">Bandingkan aksara, jumlah penutur, dan tingkat tantangannya.</p>
          </div>
          <LanguageIndex items={items} totalUnits={units.length} withFilter />
          <p className="small muted mt-6">
            Mencari bahasa lain, seperti Belanda, Turki, atau Vietnam? Kamus Tutur bisa menerjemahkan online ke {onlineLanguages.length} bahasa
            sambil kurikulumnya kami tambah.
          </p>
        </div>
      </section>
    </>
  );
}
