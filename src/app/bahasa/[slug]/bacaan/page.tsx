import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getLanguage, languages } from "@/data";
import { readingsFor } from "@/data/readings";
import { Reader } from "@/components/Reader";
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
    title: `Bacaan bertingkat bahasa ${l.name}`,
    description: `Cerita pendek bahasa ${l.name} tingkat A2 dan B1, bersuara, dengan terjemahan per kalimat dan soal pemahaman.`,
  };
}

export default async function ReadingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const l = getLanguage(slug);
  if (!l) notFound();
  const readings = readingsFor(l.slug, l.name);

  return (
    <Themed slug={l.slug}>
      <PageHero slug={l.slug} height={360} overlap={96}>
        <div className="stack">
          <nav className="crumbs" aria-label="Lokasi">
            <Link href="/bahasa/">Bahasa</Link>
            <span aria-hidden>/</span>
            <Link href={`/bahasa/${l.slug}/`}>{l.name}</Link>
            <span aria-hidden>/</span>
            <span>Bacaan</span>
          </nav>
          <h1>Bacaan bertingkat</h1>
          <p className="lead">
            Dua cerita pendek dalam bahasa {l.name}: satu tingkat A2 tentang kegiatan sehari-hari, satu tingkat B1 tentang pengalaman
            bepergian. Dengarkan, tebak artinya dulu, baru buka terjemahannya.
          </p>
          <nav className="btn-row" aria-label="Pilih cerita">
            {readings.map((r) => (
              <a key={r.id} className="btn btn-sm" href={`#${r.id}`}>
                <span className="level-chip">{r.level}</span>
                {r.title}
              </a>
            ))}
          </nav>
          <VoiceNotice tts={l.tts} name={l.name} />
        </div>
      </PageHero>

      {readings.map((r) => (
        <section key={r.id} id={r.id} className="section reading-section">
          <div className="wrap reading-wrap">
            <header className="section-head">
              <span className="level-chip">{r.level}</span>
              <h2>{r.title}</h2>
              <p className="muted">{r.summary}</p>
              <ul className="focus-list" aria-label="Yang dilatih">
                {r.focus.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </header>
            <Reader reading={r} langSlug={l.slug} tts={l.tts} dir={l.dir} />
          </div>
        </section>
      ))}

      <section className="section">
        <div className="wrap">
          <div className="panel row between">
            <div>
              <h3 style={{ marginBottom: 4 }}>Ingin tahu pola kalimatnya?</h3>
              <p className="small muted">Bentuk lampau, masa depan, dan perbandingan dijelaskan di catatan tata bahasa A2–B1.</p>
            </div>
            <Link className="btn btn-primary" href={`/bahasa/${l.slug}/#tata-bahasa-lanjut`}>
              Buka catatan tata bahasa
            </Link>
          </div>
        </div>
      </section>
    </Themed>
  );
}
