import type { Metadata } from "next";
import Link from "next/link";
import { languages } from "@/data";
import { exams, questionCount } from "@/data/exams";
import { PageHero } from "@/components/anime/Themed";

export const metadata: Metadata = {
  title: "Latihan ujian bahasa",
  description:
    "Simulasi IELTS, PTE, TOEFL, JLPT, TOPIK, HSK, TOAFL, Goethe, DELF, DELE, TORFL, CILS, dan CU-TFL dengan format sesuai ujian aslinya.",
};

export default function ExamsPage() {
  return (
    <>
      <PageHero height={300} overlap={90}>
        <div className="stack">
          <h1>Latihan ujian</h1>
          <p className="lead">
            {exams.length} ujian kemahiran bahasa dengan jenis soal yang meniru format aslinya, dari IELTS dan PTE sampai JLPT
            dan HSK. Info format diambil dari situs penyelenggara resmi; soal latihannya ditulis tim Tutur.
          </p>
        </div>
      </PageHero>
      <section className="section" style={{ paddingTop: 40 }}>
        <div className="wrap stack" style={{ display: "grid", gap: 48 }}>
          {languages
            .filter((l) => exams.some((e) => e.lang === l.slug))
            .map((l) => (
              <section key={l.slug}>
                <h2 style={{ fontSize: 24, marginBottom: 16 }}>Bahasa {l.name}</h2>
                <div className="exam-card-grid">
                  {exams
                    .filter((e) => e.lang === l.slug)
                    .map((e) => (
                      <Link key={e.id} href={`/ujian/${e.id}/`} className="exam-card">
                        <h3>{e.name}</h3>
                        <span className="small muted">{e.org}</span>
                        <span className="small">{e.format.length} bagian ujian, {e.parts.length} bagian latihan</span>
                        <span className="row" style={{ gap: 8, marginTop: 4 }}>
                          <span className="level">{e.level}</span>
                          <span className="level">{questionCount(e)} soal latihan</span>
                        </span>
                      </Link>
                    ))}
                </div>
              </section>
            ))}
          <p className="small muted">
            Tutur tidak berafiliasi dengan penyelenggara ujian mana pun. Nama ujian adalah merek milik penyelenggaranya.
            Untuk pendaftaran, jadwal, dan biaya, selalu cek situs resminya.
          </p>
        </div>
      </section>
    </>
  );
}
