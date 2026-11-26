import Link from "next/link";
import { languages } from "@/data";
import { Flag } from "@/components/Flag";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div className="stack">
          <Link href="/" className="brand">
            Tutur
            <span className="brand-dot" aria-hidden />
          </Link>
          <p>
            Tempat belajar bahasa dunia dari bahasa Indonesia. Progres Anda disimpan di perangkat ini saja, tanpa akun.
          </p>
          <p className="tiny">
            Suara memakai rekaman penutur asli dari Lingua Libre bila tersedia, selain itu suara bawaan perangkat. Video
            milik kreatornya masing-masing dan diputar dari YouTube. Tutur bisa dipasang sebagai aplikasi dan dipakai offline.
          </p>
        </div>
        <div>
          <h2>Bahasa</h2>
          <ul style={{ gridTemplateColumns: "1fr 1fr", columnGap: 16 }}>
            {languages.map((l) => (
              <li key={l.slug}>
                <Link href={`/bahasa/${l.slug}/jalur/`} className="flag-label">
                  <Flag slug={l.slug} size={18} /> {l.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Belajar</h2>
          <ul>
            <li>
              <Link href="/kamus/">Kamus multibahasa</Link>
            </li>
            <li>
              <Link href="/latihan/">Kartu hafalan dan kuis</Link>
            </li>
            <li>
              <Link href="/ujian/">Latihan ujian (IELTS, JLPT, HSK, …)</Link>
            </li>
            <li>
              <Link href="/video/">Video pilihan</Link>
            </li>
            <li>
              <Link href="/progres/">Progres saya</Link>
            </li>
            <li>
              <Link href="/tuu/">Kenalan dengan Tuu</Link>
            </li>
            <li>
              <Link href="/kredit/">Kredit dan lisensi</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
