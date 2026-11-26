import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { kanjiIndex } from "@/data/kanji";
import { KANJI_LEVELS, LEVEL_INFO, type KanjiLevel } from "@/data/kanji/meta";
import { PageHero, Themed } from "@/components/anime/Themed";
import { KanjiBrowser } from "@/components/kanji/KanjiBrowser";
import { KanjiCredit } from "@/components/kanji/KanjiCredit";

export const dynamicParams = false;
export const generateStaticParams = () => KANJI_LEVELS.map((level) => ({ slug: "jepang", level }));

export async function generateMetadata({ params }: { params: Promise<{ level: string }> }): Promise<Metadata> {
  const { level } = await params;
  const l = level as KanjiLevel;
  if (!kanjiIndex[l]) return {};
  return {
    title: `Kanji JLPT ${LEVEL_INFO[l].label}`,
    description: `${kanjiIndex[l].length} kanji JLPT ${LEVEL_INFO[l].label} dengan arti, on'yomi, kun'yomi, urutan goresan, contoh kata, dan kuis.`,
  };
}

export default async function KanjiLevelPage({ params }: { params: Promise<{ level: string }> }) {
  const { level } = await params;
  const l = level as KanjiLevel;
  const rows = kanjiIndex[l];
  if (!rows) notFound();
  return (
    <Themed slug="jepang">
      <PageHero slug="jepang" height={320} overlap={96}>
        <div className="stack">
          <nav className="crumbs" aria-label="Lokasi">
            <Link href="/bahasa/jepang/">Jepang</Link>
            <span aria-hidden>/</span>
            <Link href="/bahasa/jepang/kanji/">Kanji</Link>
            <span aria-hidden>/</span>
            <span>{LEVEL_INFO[l].label}</span>
          </nav>
          <h1>Kanji {LEVEL_INFO[l].label}</h1>
          <p className="lead">
            {rows.length.toLocaleString("id-ID")} kanji. {LEVEL_INFO[l].blurb} Ketuk kanji untuk melihat cara baca, urutan goresan, dan contoh
            kata.
          </p>
          <nav className="chips" aria-label="Level kanji">
            {KANJI_LEVELS.map((x) => (
              <Link key={x} className="chip" href={`/bahasa/jepang/kanji/${x}/`} aria-current={x === l ? "page" : undefined}>
                {LEVEL_INFO[x].label}
              </Link>
            ))}
          </nav>
        </div>
      </PageHero>
      <section className="section">
        <div className="wrap">
          <KanjiBrowser level={l} rows={rows} />
          <KanjiCredit />
        </div>
      </section>
    </Themed>
  );
}
