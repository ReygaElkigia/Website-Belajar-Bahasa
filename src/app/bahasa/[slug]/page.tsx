import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { challengeLabel, getLanguage, languages, unitVocab, units } from "@/data";
import { ContinueButton, UnitList } from "@/components/UnitList";
import { ChallengeMeter, formatSpeakers } from "@/components/LangMeta";
import { SpeakButton } from "@/components/Speak";
import { VideoCard } from "@/components/VideoCard";
import { VoiceNotice } from "@/components/VoiceNotice";

export const dynamicParams = false;

export function generateStaticParams() {
  return languages.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const l = getLanguage(slug);
  if (!l) return {};
  return {
    title: `Belajar bahasa ${l.name}`,
    description: `Belajar bahasa ${l.name} dari bahasa Indonesia: ${l.alphabet.title.toLowerCase()}, ${units.length} unit kosakata dan frasa bersuara, tata bahasa, dan video.`,
  };
}

export default async function LanguagePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const l = getLanguage(slug);
  if (!l) notFound();

  const unitItems = units.map((u) => ({ ...u, count: unitVocab(l, u.id).length }));

  return (
    <>
      <header className="page-head">
        <div className="wrap">
          <nav className="crumbs" aria-label="Lokasi">
            <Link href="/bahasa/">Bahasa</Link>
            <span aria-hidden>/</span>
            <span>{l.name}</span>
          </nav>
          <div className="lang-hero">
            <div className="stack">
              <div className="lang-title">
                <h1>Bahasa {l.name}</h1>
                <span className="native" lang={l.tts} dir={l.dir}>
                  {l.native}
                </span>
                <SpeakButton text={l.native} lang={l.tts} />
              </div>
              <p className="lead">{l.about}</p>
              <div className="btn-row">
                <ContinueButton slug={l.slug} firstUnit={units[0].id} units={units.map((u) => u.id)} />
                <Link className="btn" href={`/bahasa/${l.slug}/huruf/`}>
                  {l.alphabet.title}
                </Link>
                <Link className="btn btn-quiet" href={`/latihan/?bahasa=${l.slug}`}>
                  Kartu hafalan
                </Link>
              </div>
            </div>
            <dl className="facts panel">
              <dt>Aksara</dt>
              <dd>{l.script}</dd>
              <dt>Penutur</dt>
              <dd>{formatSpeakers(l.speakers)}</dd>
              <dt>Dipakai di</dt>
              <dd style={{ fontWeight: 400 }}>{l.regions}</dd>
              <dt>Tantangan</dt>
              <dd>
                <ChallengeMeter level={l.challenge} label={challengeLabel[l.challenge]} />
                <span className="small muted" style={{ display: "block", fontWeight: 400, marginTop: 4 }}>
                  {l.challengeNote}
                </span>
              </dd>
            </dl>
          </div>
          <VoiceNotice tts={l.tts} name={l.name} />
        </div>
      </header>

      <section className="section">
        <div className="wrap two-col">
          <div>
            <div className="section-head">
              <h2>{units.length} unit</h2>
              <p className="muted">Kerjakan berurutan. Setiap unit berisi sepuluh kata, beberapa frasa, dan kuis penutup.</p>
            </div>
            <UnitList slug={l.slug} items={unitItems} />
          </div>
          <aside className="aside-sticky">
            <div className="panel">
              <h3>Sebelum mulai</h3>
              <p className="small muted">{l.alphabet.intro}</p>
              <Link className="btn btn-sm mt-4" href={`/bahasa/${l.slug}/huruf/`}>
                Pelajari {l.alphabet.title.toLowerCase()}
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <section className="section" id="tata-bahasa">
        <div className="wrap">
          <div className="section-head">
            <h2>Catatan tata bahasa</h2>
            <p className="muted">Hal-hal yang paling berbeda dari bahasa Indonesia, dijelaskan dengan contoh.</p>
          </div>
          <div className="grammar grid-2" style={{ alignItems: "start" }}>
            {l.grammar.map((g) => (
              <article key={g.title} className="grammar-item">
                <h3>{g.title}</h3>
                <p className="muted">{g.body}</p>
                <ul className="example-list">
                  {g.examples.map((e) => (
                    <li key={e.text} className="example">
                      <span className="term">
                        <span className="term-word" lang={l.tts} dir={l.dir}>
                          {e.text}
                        </span>
                        {e.roman && <span className="term-roman">{e.roman}</span>}
                        <span className="small">{e.meaning}</span>
                      </span>
                      <SpeakButton text={e.text.split("→").pop()!.split("/")[0].trim()} lang={l.tts} />
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {l.videos.length > 0 && (
        <section className="section" id="video">
          <div className="wrap">
            <div className="section-head">
              <h2>Video bahasa {l.name}</h2>
              <p className="muted">Tonton setelah unit pertama atau kapan saja sebagai latihan mendengar.</p>
            </div>
            <div className="video-grid">
              {l.videos.map((v) => (
                <VideoCard key={v.id} video={v} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
