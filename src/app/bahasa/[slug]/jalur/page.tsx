import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getLanguage, languages, unitVocab, units } from "@/data";
import { readingsFor } from "@/data/readings";
import { PathMap } from "@/components/path/PathMap";
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
    title: `Jalur belajar bahasa ${l.name}`,
    description: `Pelajaran singkat bahasa ${l.name} yang terbuka bertahap: kosakata, frasa, menyusun kalimat, mendengar, dan berbicara.`,
  };
}

export default async function PathPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const l = getLanguage(slug);
  if (!l) notFound();
  const stories = readingsFor(l.slug, l.name);
  // Cerita A2 setelah unit 12, cerita B1 setelah unit terakhir.
  const storyAfter = [11, units.length - 1];

  return (
    <Themed slug={l.slug}>
      <PageHero slug={l.slug} height={250} overlap={70}>
        <div className="stack">
          <h1>Jalur belajar bahasa {l.name}</h1>
          <p className="lead">
            Pelajaran lima menit yang terbuka satu per satu. Jawab benar beruntun untuk combo, jaga hatimu, dan kumpulkan tiga bintang di
            setiap pelajaran.
          </p>
        </div>
      </PageHero>
      <section className="section path-section">
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
