import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { kanjiIndex } from "@/data/kanji";
import { KANJI_LEVELS, LEVEL_INFO } from "@/data/kanji/meta";
import { PageHero, Themed } from "@/components/anime/Themed";
import { KanjiCredit } from "@/components/kanji/KanjiCredit";
import { KanjiLevelProgress } from "@/components/kanji/KanjiLevelProgress";

export const dynamicParams = false;
export const generateStaticParams = () => [{ slug: "jepang" }];

export const metadata: Metadata = {
  title: "Kanji JLPT N5 sampai N1",
  description: "2.211 kanji JLPT dari N5 sampai N1: arti dalam bahasa Indonesia, on'yomi, kun'yomi, urutan goresan, contoh kata, dan kuis.",
};

export default function KanjiHome() {
  const total = KANJI_LEVELS.reduce((n, l) => n + kanjiIndex[l].length, 0);
  let before = 0;
  return (
    <Themed slug="jepang">
      <PageHero slug="jepang" height={340} overlap={96}>
        <div className="stack">
          <nav className="crumbs" aria-label="Lokasi">
            <Link href="/bahasa/">Bahasa</Link>
            <span aria-hidden>/</span>
            <Link href="/bahasa/jepang/">Jepang</Link>
            <span aria-hidden>/</span>
            <span>Kanji</span>
          </nav>
          <h1>Kanji JLPT N5 sampai N1</h1>
          <p className="lead">
            {total.toLocaleString("id-ID")} kanji, lengkap dengan arti, cara baca, urutan goresan, dan contoh kata. Mulai dari N5, lalu naik
            level.
          </p>
        </div>
      </PageHero>

      <section className="section">
        <div className="wrap">
          <ol className="kj-levels">
            {KANJI_LEVELS.map((l) => {
              const n = kanjiIndex[l].length;
              before += n;
              return (
                <li key={l}>
                  <Link className="kj-level-card" href={`/bahasa/jepang/kanji/${l}/`}>
                    <span className="kj-level-badge">{LEVEL_INFO[l].label}</span>
                    <span className="kj-level-text">
                      <strong>{n.toLocaleString("id-ID")} kanji baru</strong>
                      <span className="small muted">{LEVEL_INFO[l].blurb}</span>
                      <span className="tiny muted">Total sampai level ini: {before.toLocaleString("id-ID")}</span>
                      <KanjiLevelProgress kanji={kanjiIndex[l].map((r) => r[0])} />
                    </span>
                    <span className="kj-level-sample" lang="ja" aria-hidden>
                      {kanjiIndex[l].slice(0, 4).map((r) => r[0]).join("")}
                    </span>
                    <ArrowRight size={18} aria-hidden />
                  </Link>
                </li>
              );
            })}
          </ol>

          <div className="panel mt-7 kj-note">
            <h2 style={{ fontSize: 20 }}>Tentang daftar ini</h2>
            <p className="small">
              Sejak format baru JLPT berlaku pada 2010, Japan Foundation dan JEES tidak lagi menerbitkan daftar kanji resmi per level. Karena itu
              semua daftar kanji N5 sampai N1 yang beredar adalah rekonstruksi. Tutur memakai daftar Jonathan Waller (tanos.co.uk), yang paling
              luas dipakai buku dan aplikasi belajar. Level ujian sungguhan bisa memuat kanji di luar daftar ini, jadi anggap daftar ini sebagai
              peta belajar, bukan bocoran soal.
            </p>
          </div>
          <KanjiCredit />
        </div>
      </section>
    </Themed>
  );
}
