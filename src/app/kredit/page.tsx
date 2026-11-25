import type { Metadata } from "next";
import { conceptById, languages } from "@/data";
import { creditsFor, recordingCount } from "@/data/audioCredits";
import { PageHero } from "@/components/anime/Themed";
import { heroVideos } from "@/data/heroVideos";
import { themes } from "@/data/themes";

export const metadata: Metadata = {
  title: "Kredit dan lisensi",
  description: "Atribusi rekaman penutur asli, video, font, dan ikon yang dipakai Tutur.",
};

export default function CreditsPage() {
  const total = recordingCount();
  return (
    <>
      <PageHero height={300} overlap={90}>
        <div className="stack">
          <h1>Kredit dan lisensi</h1>
          <p className="lead">
            Tutur dibangun di atas karya banyak orang. Terima kasih kepada para perekam sukarela, kreator video, dan
            perancang font berikut.
          </p>
        </div>
      </PageHero>

      <section className="section" style={{ paddingTop: 40 }}>
        <div className="wrap stack" style={{ display: "grid", gap: 48 }}>
          <section>
            <h2 style={{ marginBottom: 8 }}>Rekaman penutur asli</h2>
            <p className="muted" style={{ marginBottom: 20 }}>
              {total > 0
                ? `${total} rekaman kata berasal dari proyek Lingua Libre dan disimpan di Wikimedia Commons. Setiap rekaman tetap milik perekamnya dan dipakai sesuai lisensinya (umumnya CC BY-SA 4.0). Kata tanpa rekaman dibacakan oleh suara perangkat Anda.`
                : "Rekaman penutur asli sedang dikumpulkan dari proyek Lingua Libre. Untuk sementara, semua kata dibacakan oleh suara perangkat Anda."}
            </p>
            {languages.map((l) => {
              const rows = Object.entries(creditsFor(l.slug));
              if (!rows.length) return null;
              return (
                <details key={l.slug} className="panel" style={{ marginBottom: 12 }}>
                  <summary style={{ cursor: "pointer", fontWeight: 800 }}>
                    Bahasa {l.name}: {rows.length} rekaman
                  </summary>
                  <div style={{ overflowX: "auto", marginTop: 12 }}>
                    <table className="progress-table">
                      <thead>
                        <tr>
                          <th scope="col">Kata</th>
                          <th scope="col">Arti</th>
                          <th scope="col">Perekam</th>
                          <th scope="col">Lisensi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rows.map(([id, c]) => (
                          <tr key={id}>
                            <td lang={l.tts} dir={l.dir}>
                              <a href={c.page} target="_blank" rel="noreferrer">
                                {c.word}
                              </a>
                            </td>
                            <td>{conceptById[id]?.word}</td>
                            <td>{c.artist}</td>
                            <td>
                              {c.licenseUrl ? (
                                <a href={c.licenseUrl} target="_blank" rel="noreferrer">
                                  {c.license}
                                </a>
                              ) : (
                                c.license
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </details>
              );
            })}
          </section>

          {Object.keys(heroVideos).length > 0 && (
            <section>
              <h2 style={{ marginBottom: 8 }}>Video latar</h2>
              <p className="muted" style={{ marginBottom: 20 }}>
                Latar bergerak setiap dunia bahasa adalah potongan video dari Wikimedia Commons yang kami pendekkan, kecilkan, dan buat
                berulang. Hasil olahan karya berlisensi CC BY-SA dibagikan dengan lisensi yang sama.
              </p>
              <div style={{ overflowX: "auto" }}>
                <table className="progress-table">
                  <thead>
                    <tr>
                      <th scope="col">Dunia</th>
                      <th scope="col">Video</th>
                      <th scope="col">Pembuat</th>
                      <th scope="col">Lisensi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(heroVideos).map(([id, v]) => (
                      <tr key={id}>
                        <td>{themes[id]?.name ?? id}</td>
                        <td>
                          <a href={v.url} target="_blank" rel="noreferrer">
                            {v.source}
                          </a>
                        </td>
                        <td>{v.author}</td>
                        <td>{v.license}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          <section>
            <h2 style={{ marginBottom: 8 }}>Video</h2>
            <p className="muted" style={{ marginBottom: 12 }}>
              Video diputar langsung dari YouTube dan tetap milik kanalnya masing-masing.
            </p>
            <ul style={{ margin: 0, paddingLeft: 20, display: "grid", gap: 6 }}>
              {languages.flatMap((l) =>
                l.videos.map((v) => (
                  <li key={v.id}>
                    <a href={`https://www.youtube.com/watch?v=${v.id}`} target="_blank" rel="noreferrer" lang="en">
                      {v.title}
                    </a>{" "}
                    <span className="muted small">(bahasa {l.name})</span>
                  </li>
                )),
              )}
            </ul>
          </section>

          <section>
            <h2 style={{ marginBottom: 8 }}>Font, ikon, dan ilustrasi</h2>
            <ul style={{ margin: 0, paddingLeft: 20, display: "grid", gap: 6 }}>
              <li>M PLUS Rounded 1c oleh M+ Fonts Project, SIL Open Font License.</li>
              <li>Nunito oleh Vernon Adams, Cyreal, dan Jacques Le Bailly, SIL Open Font License.</li>
              <li>Ikon Lucide, lisensi ISC.</li>
              <li>Semua ilustrasi pemandangan dan maskot dibuat khusus untuk Tutur.</li>
            </ul>
          </section>
        </div>
      </section>
    </>
  );
}
