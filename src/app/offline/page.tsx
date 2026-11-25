import type { Metadata } from "next";
import Link from "next/link";
import { Mascot } from "@/components/mascot/Mascot";

export const metadata: Metadata = { title: "Sedang offline" };

export default function OfflinePage() {
  return (
    <section className="section">
      <div className="wrap" style={{ display: "grid", justifyItems: "center", textAlign: "center", gap: 16 }}>
        <Mascot mood="sad" size={150} />
        <h1>Halaman ini belum tersimpan</h1>
        <p className="lead">
          Anda sedang offline dan halaman ini belum pernah dibuka di perangkat ini. Halaman yang pernah dibuka dan bahasa yang
          disimpan untuk offline tetap bisa dipakai.
        </p>
        <div className="btn-row" style={{ justifyContent: "center" }}>
          <Link className="btn btn-primary" href="/">
            Ke beranda
          </Link>
          <Link className="btn" href="/latihan/">
            Kartu hafalan
          </Link>
        </div>
      </div>
    </section>
  );
}
