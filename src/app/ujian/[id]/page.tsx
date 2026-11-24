import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink, Info } from "lucide-react";
import { getLanguage } from "@/data";
import { examById, exams, questionCount } from "@/data/exams";
import { ExamParts } from "@/components/ExamParts";
import { VoiceNotice } from "@/components/VoiceNotice";

export const dynamicParams = false;

export function generateStaticParams() {
  return exams.map((e) => ({ id: e.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const e = examById[id];
  if (!e) return {};
  return {
    title: `Latihan ${e.name}`,
    description: `Format resmi ${e.name} dan ${questionCount(e)} soal latihan dengan jenis tugas seperti ujian aslinya.`,
  };
}

export default async function ExamPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const e = examById[id];
  if (!e) notFound();
  const l = getLanguage(e.lang);

  return (
    <>
      <header className="page-head">
        <div className="wrap stack">
          <nav className="crumbs" aria-label="Lokasi">
            <Link href="/ujian/">Ujian</Link>
            <span aria-hidden>/</span>
            <Link href={`/bahasa/${l.slug}/`}>{l.name}</Link>
            <span aria-hidden>/</span>
            <span>{e.name}</span>
          </nav>
          <h1>{e.name}</h1>
          <p className="muted" dir="auto">
            {e.fullName}
          </p>
          <p className="lead">{e.about}</p>
          {e.note && (
            <p className="notice">
              <Info size={16} strokeWidth={1.75} aria-hidden />
              <span>{e.note}</span>
            </p>
          )}
        </div>
      </header>

      <section className="section">
        <div className="wrap two-col">
          <div className="stack" style={{ display: "grid", gap: 48 }}>
            <section>
              <h2 style={{ marginBottom: 16 }}>Format ujian</h2>
              <div style={{ overflowX: "auto" }}>
                <table className="format-table">
                  <thead>
                    <tr>
                      <th scope="col">Bagian</th>
                      <th scope="col">Waktu</th>
                      <th scope="col">Soal</th>
                      <th scope="col">Jenis tugas</th>
                    </tr>
                  </thead>
                  <tbody>
                    {e.format.map((f) => (
                      <tr key={f.name}>
                        <th scope="row">{f.name}</th>
                        <td data-label="Waktu">{f.time}</td>
                        <td data-label="Soal">{f.items}</td>
                        <td data-label="Jenis tugas">{f.tasks}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section id="latihan">
              <h2 style={{ marginBottom: 8 }}>Latihan</h2>
              <p className="small muted" style={{ marginBottom: 24 }}>
                Soal ditulis tim Tutur mengikuti jenis tugas resmi. Kerjakan per bagian; skor terbaik tersimpan di perangkat
                ini.
              </p>
              <VoiceNotice tts={l.tts} name={l.name} />
              <div className="mt-4">
                <ExamParts exam={e} tts={l.tts} dir={l.dir} />
              </div>
            </section>
          </div>

          <aside className="aside-sticky">
            <div className="panel">
              <h3>Penilaian</h3>
              <p className="small muted" style={{ marginBottom: 8 }}>
                {e.level}
              </p>
              <ul className="small" style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 8 }}>
                {e.scoring.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
            <div className="panel">
              <h3>Kiat</h3>
              <ul className="small" style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 8 }}>
                {e.tips.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
            <div className="panel">
              <h3>Sumber resmi</h3>
              <p className="small muted" style={{ marginBottom: 8 }}>
                Penyelenggara: {e.org}
              </p>
              <ul className="small" style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: 8 }}>
                {e.sources.map((s) => (
                  <li key={s.url}>
                    <a href={s.url} target="_blank" rel="noreferrer" className="row" style={{ gap: 4, display: "inline-flex" }}>
                      {s.label}
                      <ExternalLink size={13} aria-hidden />
                    </a>
                  </li>
                ))}
              </ul>
              <p className="tiny muted mt-4">
                Tutur tidak berafiliasi dengan {e.org.split(",")[0]}. Format bisa berubah; cek situs resmi sebelum mendaftar.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
