import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { concepts, getLanguage, languages, unitById, unitPhrases, unitVocab, units } from "@/data";
import { Quiz, type QuizItem } from "@/components/Quiz";
import { SpeakButton } from "@/components/Speak";
import { TermView } from "@/components/Term";
import { VoiceNotice } from "@/components/VoiceNotice";

export const dynamicParams = false;

export function generateStaticParams() {
  return languages.flatMap((l) => units.map((u) => ({ slug: l.slug, unit: u.id })));
}

type Params = Promise<{ slug: string; unit: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug, unit } = await params;
  const l = getLanguage(slug);
  const u = unitById[unit];
  if (!l || !u) return {};
  return {
    title: `${u.title} dalam bahasa ${l.name}`,
    description: `${u.summary} Kosakata dan frasa bahasa ${l.name} dengan suara, romanisasi, dan kuis.`,
  };
}

export default async function UnitPage({ params }: { params: Params }) {
  const { slug, unit } = await params;
  const l = getLanguage(slug);
  const u = unitById[unit];
  if (!l || !u) notFound();

  const idx = units.findIndex((x) => x.id === u.id);
  const next = units[idx + 1];
  const prev = units[idx - 1];
  const vocab = unitVocab(l, u.id);
  const phrases = unitPhrases(l, u.id);

  const items: QuizItem[] = vocab.map((v) => ({ id: v.id, word: v.term.word, roman: v.term.roman, meaning: v.meaning }));
  // Pengecoh diambil dari seluruh kosakata agar kuis tidak terlalu mudah ditebak.
  const pool: QuizItem[] = concepts
    .filter((c) => l.vocab[c.id])
    .map((c) => ({ id: c.id, word: l.vocab[c.id].word, roman: l.vocab[c.id].roman, meaning: c.word }));

  return (
    <>
      <header className="page-head">
        <div className="wrap stack">
          <nav className="crumbs" aria-label="Lokasi">
            <Link href="/bahasa/">Bahasa</Link>
            <span aria-hidden>/</span>
            <Link href={`/bahasa/${l.slug}/`}>{l.name}</Link>
            <span aria-hidden>/</span>
            <span>Unit {idx + 1}</span>
          </nav>
          <div className="row" style={{ gap: 12 }}>
            <span className="level">Unit {idx + 1} dari {units.length}</span>
            <span className="level">{u.level}</span>
          </div>
          <h1>{u.title}</h1>
          <p className="lead">{u.summary}</p>
          <VoiceNotice tts={l.tts} name={l.name} />
        </div>
      </header>

      <section className="section">
        <div className="wrap two-col">
          <div>
            <h2 style={{ marginBottom: 8 }}>Kosakata</h2>
            <p className="small muted" style={{ marginBottom: 24 }}>
              Ucapkan setiap kata dengan keras setelah mendengarnya. Mengulang dengan suara membantu ingatan lebih dari
              membaca dalam hati.
            </p>
            <ul className="vocab">
              {vocab.map((v) => (
                <li key={v.id} className="vocab-row">
                  <TermView term={{ word: v.term.word, roman: v.term.roman }} lang={l} />
                  <span className="vocab-meaning">
                    <Link href={`/kamus/${v.id}/`} style={{ color: "var(--ink)", textDecoration: "none", fontWeight: 600 }}>
                      {v.meaning}
                    </Link>
                    <span className="pos">{v.pos}</span>
                    {v.term.note && <span className="term-note">{v.term.note}</span>}
                  </span>
                  <SpeakButton text={v.term.word.split(" / ")[0]} lang={l.tts} />
                </li>
              ))}
            </ul>

            <h2 className="mt-7" style={{ marginBottom: 8 }}>
              Frasa
            </h2>
            <p className="small muted" style={{ marginBottom: 24 }}>
              Tekan tombol dengar dua kali: sekali untuk mendengar, sekali lagi sambil menirukan.
            </p>
            <ul className="vocab phrases">
              {phrases.map((p) => (
                <li key={p.id} className="vocab-row">
                  <TermView term={{ word: p.term.word, roman: p.term.roman }} lang={l} />
                  <span className="vocab-meaning">
                    <span style={{ fontWeight: 600 }}>{p.meaning}</span>
                    {p.term.note && <span className="term-note">{p.term.note}</span>}
                  </span>
                  <SpeakButton text={p.term.word} lang={l.tts} />
                </li>
              ))}
            </ul>

            <h2 className="mt-7" style={{ marginBottom: 24 }} id="kuis">
              Kuis
            </h2>
            <Quiz
              items={items}
              pool={pool}
              langSlug={l.slug}
              langName={l.name}
              tts={l.tts}
              dir={l.dir}
              unitId={u.id}
              nextHref={next ? `/bahasa/${l.slug}/${next.id}/` : `/latihan/?bahasa=${l.slug}`}
              nextLabel={next ? `Lanjut ke unit ${idx + 2}: ${next.title}` : "Ulangi lewat kartu hafalan"}
            />
          </div>

          <aside className="aside-sticky">
            <div className="panel">
              <h3>Unit bahasa {l.name}</h3>
              <ol className="small" style={{ margin: 0, paddingLeft: 20, display: "grid", gap: 6 }}>
                {units.map((x) => (
                  <li key={x.id}>
                    {x.id === u.id ? (
                      <strong aria-current="page">{x.title}</strong>
                    ) : (
                      <Link href={`/bahasa/${l.slug}/${x.id}/`}>{x.title}</Link>
                    )}
                  </li>
                ))}
              </ol>
            </div>
            <div className="panel">
              <h3>Ulangi nanti</h3>
              <p className="small muted">Kata-kata di unit ini masuk ke kartu hafalan yang dijadwalkan ulang otomatis.</p>
              <Link className="btn btn-sm mt-4" href={`/latihan/?bahasa=${l.slug}&unit=${u.id}`}>
                Buka kartu hafalan
              </Link>
            </div>
            <nav className="row between mt-4" aria-label="Unit sebelum dan sesudah">
              {prev ? (
                <Link className="small" href={`/bahasa/${l.slug}/${prev.id}/`}>
                  Sebelumnya: {prev.title}
                </Link>
              ) : (
                <Link className="small" href={`/bahasa/${l.slug}/huruf/`}>
                  Sebelumnya: {l.alphabet.title}
                </Link>
              )}
              {next && (
                <Link className="small" href={`/bahasa/${l.slug}/${next.id}/`}>
                  Berikutnya: {next.title}
                </Link>
              )}
            </nav>
          </aside>
        </div>
      </section>
    </>
  );
}
