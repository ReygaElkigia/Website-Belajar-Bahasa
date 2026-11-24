import type { Metadata } from "next";
import { LanguageIndex } from "@/components/LanguageIndex";
import { languages, onlineLanguages, units } from "@/data";
import { languageSummaries } from "@/lib/summaries";

export const metadata: Metadata = {
  title: "Semua bahasa",
  description: "Pilih dari 12 bahasa dunia: Inggris, Jepang, Korea, Mandarin, Arab, Jerman, Prancis, Spanyol, Rusia, Italia, Thai, dan Hindi.",
};

export default function LanguagesPage() {
  return (
    <>
      <header className="page-head">
        <div className="wrap stack">
          <h1>Semua bahasa</h1>
          <p className="lead">
            {languages.length} bahasa dengan kurikulum lengkap. Setiap bahasa punya pengenalan huruf, {units.length} unit kosakata dan
            frasa, catatan tata bahasa, serta video.
          </p>
        </div>
      </header>
      <section className="section">
        <div className="wrap">
          <LanguageIndex items={languageSummaries()} totalUnits={units.length} withFilter />
          <p className="small muted mt-6">
            Mencari bahasa lain, seperti Belanda, Turki, atau Vietnam? Kamus Tutur bisa menerjemahkan online ke {onlineLanguages.length} bahasa
            sambil kurikulumnya kami tambah.
          </p>
        </div>
      </section>
    </>
  );
}
