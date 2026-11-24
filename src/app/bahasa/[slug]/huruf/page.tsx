import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getLanguage, languages, units } from "@/data";
import { GlyphGrid } from "@/components/GlyphGrid";
import { VoiceNotice } from "@/components/VoiceNotice";

export const dynamicParams = false;

export function generateStaticParams() {
  return languages.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const l = getLanguage(slug);
  if (!l) return {};
  return { title: `${l.alphabet.title} (bahasa ${l.name})`, description: l.alphabet.intro };
}

export default async function AlphabetPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const l = getLanguage(slug);
  if (!l) notFound();

  return (
    <>
      <header className="page-head">
        <div className="wrap stack">
          <nav className="crumbs" aria-label="Lokasi">
            <Link href="/bahasa/">Bahasa</Link>
            <span aria-hidden>/</span>
            <Link href={`/bahasa/${l.slug}/`}>{l.name}</Link>
            <span aria-hidden>/</span>
            <span>{l.alphabet.title}</span>
          </nav>
          <h1>{l.alphabet.title}</h1>
          <p className="lead">{l.alphabet.intro}</p>
          <p className="small muted">Ketuk setiap huruf untuk mendengar bunyinya.</p>
          <VoiceNotice tts={l.tts} name={l.name} />
        </div>
      </header>

      <section className="section">
        <div className="wrap">
          {l.alphabet.sections.map((s) => (
            <section key={s.title} className="glyph-section">
              <h2 style={{ fontSize: 24 }}>{s.title}</h2>
              {s.note && <p className="small muted mt-2">{s.note}</p>}
              <GlyphGrid section={s} tts={l.tts} dir={l.dir} />
            </section>
          ))}

          <div className="panel mt-7 row between">
            <div>
              <h3 style={{ marginBottom: 4 }}>Sudah mengenal hurufnya?</h3>
              <p className="small muted">Lanjutkan ke unit pertama: {units[0].title.toLowerCase()}.</p>
            </div>
            <Link className="btn btn-primary" href={`/bahasa/${l.slug}/${units[0].id}/`}>
              Mulai unit 1
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
