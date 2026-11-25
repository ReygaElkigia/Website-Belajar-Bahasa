import Link from "next/link";
import { conceptById, concepts, languages, onlineLanguages, phraseConcepts, units } from "@/data";
import { HeroGreeting, type Greeting } from "@/components/HeroGreeting";
import { LanguageIndex } from "@/components/LanguageIndex";
import { SpeakButton } from "@/components/Speak";
import { TermView } from "@/components/Term";
import { VideoCard } from "@/components/VideoCard";
import { languageSummaries } from "@/lib/summaries";
import { exams } from "@/data/exams";

const SAMPLE_WORD = "terimakasih";

export default function Home() {
  const greetings: Greeting[] = languages.map((l) => ({
    slug: l.slug,
    name: l.name,
    native: l.native,
    tts: l.tts,
    dir: l.dir,
    word: l.vocab.halo.word,
    roman: l.vocab.halo.roman,
  }));

  const ja = languages.find((l) => l.slug === "jepang")!;
  const sample = conceptById[SAMPLE_WORD];
  const featured = ["jepang", "korea", "spanyol"].map((s) => {
    const l = languages.find((x) => x.slug === s)!;
    return { v: l.videos[l.videos.length > 1 ? 1 : 0], l };
  });

  return (
    <>
      <HeroGreeting
        items={greetings}
        title="Belajar bahasa dunia, langsung dari bahasa Indonesia."
        lead={`${languages.length} bahasa, masing-masing dengan dunianya sendiri: huruf, ${concepts.length} kosakata bersuara, ${phraseConcepts.length} frasa, bacaan bertingkat A2–B1, kamus, video, kuis, dan latihan ujian resmi. Gratis dan tanpa daftar.`}
      />

      <section className="section">
        <div className="wrap">
          <div className="section-head split">
            <div className="stack">
              <h2>Mulai dari bahasa yang ingin Anda kuasai</h2>
              <p className="muted">
                Tingkat tantangan diukur dari sudut pandang penutur bahasa Indonesia: huruf, bunyi, dan seberapa jauh tata
                bahasanya dari bahasa kita.
              </p>
            </div>
          </div>
          <LanguageIndex items={languageSummaries()} totalUnits={units.length} />
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <h2>Satu unit, empat langkah</h2>
            <p className="muted">Setiap bahasa punya {units.length} unit dengan urutan yang sama. Contoh di bawah diambil dari bahasa Jepang.</p>
          </div>
          <ol className="steps">
            <li className="step">
              <span className="step-num">Langkah 1</span>
              <h3>Kenali hurufnya</h3>
              <p className="small muted">Tabel huruf yang bisa diketuk untuk mendengar bunyinya.</p>
              <span className="step-sample">
                <b lang="ja-JP">あ い う</b> a, i, u
              </span>
            </li>
            <li className="step">
              <span className="step-num">Langkah 2</span>
              <h3>Hafalkan kosakata</h3>
              <p className="small muted">Sepuluh kata per unit, lengkap dengan romanisasi dan suara.</p>
              <span className="step-sample">
                <b lang="ja-JP">{ja.vocab.air.word}</b> {ja.vocab.air.roman}, air
              </span>
            </li>
            <li className="step">
              <span className="step-num">Langkah 3</span>
              <h3>Pakai dalam frasa</h3>
              <p className="small muted">Kalimat yang benar-benar Anda perlukan saat bepergian.</p>
              <span className="step-sample">
                <b lang="ja-JP" style={{ fontSize: 17 }}>
                  {ja.phrases.m2.word}
                </b>
              </span>
            </li>
            <li className="step">
              <span className="step-num">Langkah 4</span>
              <h3>Uji diri</h3>
              <p className="small muted">Kuis pilihan ganda dan tebak dari suara. Skor 70 menandai unit selesai.</p>
              <span className="step-sample">Lalu ulangi lewat kartu hafalan berjadwal.</span>
            </li>
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head split">
            <div className="stack">
              <h2>Siap untuk ujian resmi</h2>
              <p className="muted">
                Latihan dengan jenis soal seperti ujian aslinya: True/False/Not Given di IELTS, Re-order Paragraphs dan
                dikte di PTE, soal ★ di JLPT, sampai i&apos;rab di TOAFL. Format diambil dari situs penyelenggara resmi.
              </p>
            </div>
            <Link className="btn" href="/ujian/">
              Semua ujian
            </Link>
          </div>
          <div className="chips">
            {exams.map((e) => (
              <Link key={e.id} className="chip" href={`/ujian/${e.id}/`}>
                {e.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap grid-2">
          <div className="stack">
            <h2>Kamus yang menjawab dalam dua belas bahasa sekaligus</h2>
            <p className="muted">
              Cari dalam bahasa Indonesia atau bahasa apa pun yang Anda kenal. Setiap entri menampilkan padanan, cara baca,
              dan suara untuk semua bahasa di Tutur. Kata di luar kamus bisa diterjemahkan online ke {onlineLanguages.length} bahasa.
            </p>
            <div className="btn-row">
              <Link className="btn btn-primary" href="/kamus/">
                Cari kata
              </Link>
              <Link className="btn" href={`/kamus/${SAMPLE_WORD}/`}>
                Lihat entri &ldquo;{sample.word}&rdquo;
              </Link>
            </div>
          </div>
          <div className="entry">
            <div className="headword">
              <h3 style={{ fontFamily: "var(--font-serif)", fontSize: 30, fontWeight: 600 }}>{sample.word}</h3>
              <span className="pos">{sample.pos}</span>
            </div>
            <ul className="translations">
              {languages.slice(0, 6).map((l) => (
                <li key={l.slug} className="translation">
                  <span className="lang-label">{l.name}</span>
                  <TermView term={l.vocab[SAMPLE_WORD]} lang={l} showNote={false} />
                  <SpeakButton text={l.vocab[SAMPLE_WORD].word} lang={l.tts} />
                </li>
              ))}
            </ul>
            <Link className="small" href={`/kamus/${SAMPLE_WORD}/`}>
              Enam bahasa lainnya
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head split">
            <div className="stack">
              <h2>Dengar penutur aslinya</h2>
              <p className="muted">Video pilihan dari pengajar dan kanal belajar bahasa, dipilah menurut huruf, frasa, dan percakapan.</p>
            </div>
            <Link className="btn" href="/video/">
              Semua video
            </Link>
          </div>
          <div className="video-grid">
            {featured.map(({ v, l }) => (
              <VideoCard key={v.id} video={v} langName={l.name} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
