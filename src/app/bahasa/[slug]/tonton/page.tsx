import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getLanguage, languages } from "@/data";
import { mediaFor } from "@/data/media";
import { ScenePlayer } from "@/components/media/ScenePlayer";
import { ClipStudio } from "@/components/media/ClipStudio";
import { ExpressionQuiz } from "@/components/media/ExpressionQuiz";
import { SpeakButton } from "@/components/Speak";
import { VoiceNotice } from "@/components/VoiceNotice";
import { PageHero, Themed } from "@/components/anime/Themed";

export const dynamicParams = false;

export function generateStaticParams() {
  return languages
    .filter((l) => mediaFor(l.slug))
    .map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const l = getLanguage(slug);
  const m = mediaFor(slug);
  if (!l || !m) return {};
  return {
    title: `${m.label}: bahasa ${l.name}`,
    description: `Belajar bahasa ${l.name} dari ${m.media}: adegan bersuara dengan mode bayangan, ungkapan khas, dan klip resmi dengan alat belajar.`,
  };
}

const STEPS = [
  {
    t: "Dengar tanpa teks",
    d: "Tonton sekali tanpa subtitle. Tangkap suasana dan kata yang sudah kamu kenal.",
  },
  {
    t: "Baca dalam bahasa aslinya",
    d: "Nyalakan subtitle bahasa yang dipelajari (tombol CC) bila tersedia, bukan subtitle Indonesia.",
  },
  {
    t: "Tirukan",
    d: "Pakai jeda otomatis. Ucapkan ulang setiap potongan dengan nada dan kecepatan yang sama.",
  },
  {
    t: "Ulangi besok",
    d: "Klip yang sama terasa jauh lebih mudah pada tontonan ketiga. Itu tanda kemajuan.",
  },
];

export default async function WatchPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const l = getLanguage(slug);
  const m = mediaFor(slug);
  if (!l || !m) notFound();

  return (
    <Themed slug={l.slug}>
      <PageHero slug={l.slug} height={360} overlap={96}>
        <div className="stack">
          <nav className="crumbs" aria-label="Lokasi">
            <Link href="/bahasa/">Bahasa</Link>
            <span aria-hidden>/</span>
            <Link href={`/bahasa/${l.slug}/`}>{l.name}</Link>
            <span aria-hidden>/</span>
            <span>Tonton</span>
          </nav>
          <h1>{m.label}</h1>
          <p className="lead">{m.intro}</p>
          <nav className="btn-row" aria-label="Bagian halaman">
            <a className="btn btn-sm" href="#adegan">
              Adegan
            </a>
            <a className="btn btn-sm" href="#ungkapan">
              Ungkapan khas
            </a>
            <a className="btn btn-sm" href="#klip">
              Klip resmi
            </a>
          </nav>
          <VoiceNotice tts={l.tts} name={l.name} />
        </div>
      </PageHero>

      <section className="section" id="adegan">
        <div className="wrap">
          <div className="section-head">
            <h2>Adegan</h2>
            <p className="muted">
              Dialog pendek bergaya {m.media}, ditulis khusus untuk belajar.
              Putar adegannya, lalu coba mode bayangan: setiap kalimat diputar,
              kemudian giliranmu menirukan.
            </p>
          </div>
          <div className="scene-grid">
            {m.scenes.map((s) => (
              <ScenePlayer key={s.id} scene={s} tts={l.tts} dir={l.dir} />
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="ungkapan">
        <div className="wrap two-col">
          <div>
            <div className="section-head">
              <h2>Ungkapan khas</h2>
              <p className="muted">
                Yang paling sering terdengar di {m.media}, lengkap dengan kapan
                sebaiknya tidak dipakai.
              </p>
            </div>
            <ul className="expr-grid">
              {m.expressions.map((e) => (
                <li key={e.text} className="expr-card">
                  <div
                    className="row between"
                    style={{ flexWrap: "nowrap", alignItems: "start" }}
                  >
                    <span className="term">
                      <span className="term-word" lang={l.tts} dir={l.dir}>
                        {e.text}
                      </span>
                      {e.roman && <span className="term-roman">{e.roman}</span>}
                    </span>
                    <SpeakButton text={e.text.split(" / ")[0]} lang={l.tts} />
                  </div>
                  <p className="small" style={{ fontWeight: 600 }}>
                    {e.meaning}
                  </p>
                  {e.note && <p className="tiny muted">{e.note}</p>}
                </li>
              ))}
            </ul>
          </div>
          <aside className="aside-sticky">
            <ExpressionQuiz
              items={m.expressions}
              tts={l.tts}
              dir={l.dir}
              langSlug={l.slug}
            />
          </aside>
        </div>
      </section>

      <section className="section" id="klip">
        <div className="wrap">
          <div className="section-head">
            <h2>Klip resmi</h2>
            <p className="muted">
              Diputar langsung dari kanal YouTube pemegang hak, dengan alat
              belajar: kecepatan lambat, mundur 5 detik, ulang bagian, dan jeda
              otomatis untuk shadowing.
            </p>
          </div>
          <ol className="watch-steps">
            {STEPS.map((s, i) => (
              <li key={s.t}>
                <span className="step-num">Langkah {i + 1}</span>
                <strong>{s.t}</strong>
                <span className="small muted">{s.d}</span>
              </li>
            ))}
          </ol>
          <div className="clip-grid">
            {m.clips.map((c) => (
              <ClipStudio
                key={c.id}
                clip={c}
                langCode={l.code.split("-")[0]}
                tts={l.tts}
                dir={l.dir}
                expressions={m.expressions}
              />
            ))}
          </div>
          <p className="tiny muted mt-5">
            Semua klip milik pemegang haknya masing-masing dan diputar lewat
            pemutar resmi YouTube. Tutur tidak menyimpan atau menyalin videonya.
            Ketersediaan subtitle tergantung pengunggah.
          </p>
        </div>
      </section>
    </Themed>
  );
}
