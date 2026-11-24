import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section">
      <div className="wrap stack">
        <h1>Halaman ini tidak ada</h1>
        <p className="lead">Tautannya mungkin salah ketik atau halamannya sudah dipindah.</p>
        <div className="btn-row">
          <Link className="btn btn-primary" href="/bahasa/">
            Lihat semua bahasa
          </Link>
          <Link className="btn" href="/kamus/">
            Cari di kamus
          </Link>
        </div>
      </div>
    </section>
  );
}
