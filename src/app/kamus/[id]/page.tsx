import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { conceptById, concepts, languages, unitById, units } from "@/data";
import { SpeakButton } from "@/components/Speak";
import { TermView } from "@/components/Term";
import { NativeBadge } from "@/components/NativeBadge";
import { LiveNativeBadge, NativePrefetch } from "@/components/NativeLive";
import { creditFor } from "@/data/audioCredits";
import { PageHero } from "@/components/anime/Themed";

export const dynamicParams = false;

export function generateStaticParams() {
  return concepts.map((c) => ({ id: c.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const c = conceptById[id];
  if (!c) return {};
  const sample = languages
    .slice(0, 4)
    .map((l) => `${l.name}: ${l.vocab[id]?.word}`)
    .join(", ");
  return {
    title: `"${c.word}" dalam 12 bahasa`,
    description: `Arti dan terjemahan "${c.word}" dalam 12 bahasa dengan cara baca dan suara. ${sample}.`,
  };
}

export default async function EntryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const c = conceptById[id];
  if (!c) notFound();
  const u = unitById[c.unit];
  const siblings = concepts.filter((x) => x.unit === c.unit && x.id !== c.id);
  const unitIndex = units.findIndex((x) => x.id === u.id) + 1;

  return (
    <>
      <PageHero height={300} overlap={90}>
        <div className="stack">
          <nav className="crumbs" aria-label="Lokasi">
            <Link href="/kamus/">Kamus</Link>
            <span aria-hidden>/</span>
            <span>{c.word}</span>
          </nav>
          <div className="headword">
            <h1>{c.word}</h1>
            <span className="pos" style={{ fontSize: 20 }}>
              {c.pos}
            </span>
          </div>
          <p className="muted">
            Dari unit {unitIndex}, {u.title.toLowerCase()}.
          </p>
        </div>
      </PageHero>

      <section className="section" style={{ paddingTop: 40 }}>
        <div className="wrap two-col">
          <div className="entry">
            <ul className="translations">
              {languages.map((l) => {
                const t = l.vocab[c.id];
                if (!t) return null;
                return (
                  <li key={l.slug} className="translation">
                    <span className="lang-label">
                      <Link href={`/bahasa/${l.slug}/${c.unit}/`}>{l.name}</Link>
                    </span>
                    <span style={{ display: "grid", gap: 4 }}>
                      <TermView term={t} lang={l} />
                      {creditFor(l.slug, c.id) ? (
                        <NativeBadge credit={creditFor(l.slug, c.id)!} />
                      ) : (
                        <>
                          <NativePrefetch tts={l.tts} items={[{ word: t.word, note: t.note }]} />
                          <LiveNativeBadge tts={l.tts} word={t.word} />
                        </>
                      )}
                    </span>
                    <SpeakButton text={t.word.split(" / ")[0]} lang={l.tts} />
                  </li>
                );
              })}
            </ul>
          </div>
          <aside className="aside-sticky">
            <div className="panel">
              <h3>Kata lain di unit ini</h3>
              <p className="row" style={{ gap: "6px 8px" }}>
                {siblings.map((s) => (
                  <Link key={s.id} href={`/kamus/${s.id}/`} className="chip">
                    {s.word}
                  </Link>
                ))}
              </p>
            </div>
            <div className="panel">
              <h3>Belajar kata ini dalam konteks</h3>
              <p className="small muted">Unit {u.title.toLowerCase()} berisi kata ini beserta frasa dan kuisnya.</p>
              <div className="chips mt-4">
                {languages.slice(0, 6).map((l) => (
                  <Link key={l.slug} className="chip" href={`/bahasa/${l.slug}/${c.unit}/`}>
                    {l.name}
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
