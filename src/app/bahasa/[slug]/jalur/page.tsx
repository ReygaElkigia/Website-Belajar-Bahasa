import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getLanguage, languages, unitVocab, units } from "@/data";
import { readingsFor } from "@/data/readings";
import { themeFor } from "@/data/themes";
import { PathMap } from "@/components/path/PathMap";
import { PathStart } from "@/components/path/PathStart";
import { SpeakButton } from "@/components/Speak";
import { VoiceNotice } from "@/components/VoiceNotice";
import { PageHero, Themed } from "@/components/anime/Themed";

export const dynamicParams = false;

export function generateStaticParams() {
  return languages.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const l = getLanguage(slug);
  if (!l) return {};
  return {
    title: `Belajar bahasa ${l.name}: jalur belajar`,
    description: `Belajar bahasa ${l.name} dari bahasa Indonesia lewat pelajaran lima menit yang terbuka bertahap: kosakata, frasa, menyusun kalimat, mendengar, dan berbicara.`,
  };
}

/** Halaman pembuka setiap bahasa: tujuan jelas, langsung ke pelajaran berikutnya. */
export default async function PathPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const l = getLanguage(slug);
  if (!l) notFound();
  const t = themeFor(l.slug);
  const stories = readingsFor(l.slug, l.name);
  // Cerita A2 setelah unit 12, cerita B1 setelah unit terakhir.
  const storyAfter = [11, units.length - 1];

  return (
    <Themed slug={l.slug}>
      <PageHero slug={l.slug} height={340} overlap={110}>
        <div className="path-hero">
          <div className="stack">
            <span className="path-hero-kicker">
              Dunia {t.name} · {units.length} unit · A1 sampai B1
            </span>
            <div className="lang-title">
              <h1>Bahasa {l.name}</h1>
              <span className="native" lang={l.tts} dir={l.dir}>
                {l.native}
              </span>
              <SpeakButton text={l.native} lang={l.tts} />
            </div>
            <p className="lead path-hero-lead">
              Ikuti jalur dari atas ke bawah. Setiap lingkaran adalah pelajaran lima menit yang membuka lingkaran berikutnya. Tuu menunggu di
              pelajaranmu selanjutnya.
            </p>
            <Suspense>
              <PathStart slug={l.slug} units={units.map((u) => ({ id: u.id, title: u.title }))} alphabetTitle={l.alphabet.title} />
            </Suspense>
            <p className="small muted">
              Ingin tahu dulu tentang bahasanya? <Link href={`/bahasa/${l.slug}/`}>Tentang bahasa {l.name}</Link>, tata bahasa, dan video.
            </p>
          </div>
        </div>
        <VoiceNotice tts={l.tts} name={l.name} />
      </PageHero>
      <section className="section path-section" id="jalur">
        <div className="wrap">
          <Suspense>
            <PathMap
              lang={{ slug: l.slug, name: l.name, tts: l.tts, glyph: l.glyph }}
              units={units.map((u) => ({ id: u.id, title: u.title, level: u.level, words: unitVocab(l, u.id).length }))}
              stories={stories.map((s, i) => ({ after: storyAfter[i] ?? units.length - 1, id: s.id, title: s.title, level: s.level }))}
            />
          </Suspense>
        </div>
      </section>
    </Themed>
  );
}
