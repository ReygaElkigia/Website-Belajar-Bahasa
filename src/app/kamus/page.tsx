import type { Metadata } from "next";
import { Suspense } from "react";
import { Dictionary } from "@/components/Dictionary";
import { concepts, languages, phraseConcepts } from "@/data";

export const metadata: Metadata = {
  title: "Kamus multibahasa",
  description: "Cari kata dalam bahasa Indonesia atau bahasa lain dan lihat padanannya dalam 12 bahasa, lengkap dengan cara baca dan suara.",
};

export default function DictionaryPage() {
  return (
    <>
      <header className="page-head">
        <div className="wrap stack">
          <h1>Kamus</h1>
          <p className="lead">
            {concepts.length} kata inti dan {phraseConcepts.length} frasa dalam {languages.length} bahasa. Ketik dalam bahasa
            Indonesia, dalam aksara asli, atau dalam romanisasi.
          </p>
        </div>
      </header>
      <section className="section" style={{ paddingTop: 40 }}>
        <div className="wrap">
          <Suspense fallback={<div style={{ minHeight: 400 }} />}>
            <Dictionary />
          </Suspense>
        </div>
      </section>
    </>
  );
}
