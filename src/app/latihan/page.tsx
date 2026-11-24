import type { Metadata } from "next";
import { Suspense } from "react";
import { Flashcards } from "@/components/Flashcards";

export const metadata: Metadata = {
  title: "Kartu hafalan",
  description: "Kartu hafalan berjadwal untuk 12 bahasa. Kata yang sudah hafal diulang dengan jeda makin panjang.",
};

export default function PracticePage() {
  return (
    <>
      <header className="page-head">
        <div className="wrap stack">
          <h1>Kartu hafalan</h1>
          <p className="lead">
            Dua belas kartu per sesi. Kata yang belum hafal muncul lagi di sesi berikutnya, kata yang sudah hafal muncul lagi
            setelah jeda yang makin panjang.
          </p>
        </div>
      </header>
      <section className="section" style={{ paddingTop: 40 }}>
        <div className="wrap">
          <Suspense fallback={<div style={{ minHeight: 400 }} />}>
            <Flashcards />
          </Suspense>
        </div>
      </section>
    </>
  );
}
