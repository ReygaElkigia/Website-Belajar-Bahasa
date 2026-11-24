"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { concepts, languages, units } from "@/data";
import { PASS, learnedCount, resetProgress, streak, today, useProgress } from "@/lib/progress";

const DAYS = 28;

export function ProgressView() {
  const p = useProgress();
  const [confirm, setConfirm] = useState(false);
  // Isi halaman bergantung pada tanggal dan penyimpanan perangkat, jadi hanya dirender di peramban.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div style={{ minHeight: 480 }} aria-busy="true" />;

  const active = languages.filter((l) => p.done[l.slug] || p.cards[l.slug]);
  const unitsDone = languages.reduce(
    (n, l) => n + Object.values(p.done[l.slug] ?? {}).filter((s) => s >= PASS).length,
    0,
  );
  const words = languages.reduce((n, l) => n + learnedCount(p, l.slug), 0);
  const run = streak(p.days);

  const set = new Set(p.days);
  const cells = Array.from({ length: DAYS }, (_, k) => {
    const d = new Date();
    d.setDate(d.getDate() - (DAYS - 1 - k));
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    return { key, on: set.has(key), label: d.toLocaleDateString("id-ID", { day: "numeric", month: "long" }) };
  });

  return (
    <div className="stack" style={{ display: "grid", gap: 64 }}>
      <dl className="stats">
        <div>
          <dt>Runtunan hari belajar</dt>
          <dd>{run}</dd>
        </div>
        <div>
          <dt>Unit selesai</dt>
          <dd>{unitsDone}</dd>
        </div>
        <div>
          <dt>Kata yang sudah melekat</dt>
          <dd>{words}</dd>
        </div>
        <div>
          <dt>Bahasa yang dipelajari</dt>
          <dd>{active.length}</dd>
        </div>
      </dl>

      <section>
        <h2 style={{ fontSize: 22, marginBottom: 16 }}>Empat minggu terakhir</h2>
        <div className="calendar" role="img" aria-label={`${cells.filter((c) => c.on).length} hari aktif dalam ${DAYS} hari terakhir`}>
          {cells.map((c) => (
            <i key={c.key} data-on={c.on} title={`${c.label}${c.key === today() ? " (hari ini)" : ""}`} />
          ))}
        </div>
        <p className="small muted mt-3">Setiap kotak adalah satu hari. Kotak biru berarti Anda menyelesaikan kuis atau kartu hafalan hari itu.</p>
      </section>

      <section>
        <h2 style={{ fontSize: 22, marginBottom: 16 }}>Per bahasa</h2>
        {active.length === 0 ? (
          <div className="empty">
            <p>Belum ada progres. Selesaikan kuis di akhir unit atau satu sesi kartu hafalan, dan hasilnya muncul di sini.</p>
            <Link className="btn btn-primary" href="/bahasa/">
              Pilih bahasa
            </Link>
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table className="progress-table">
              <thead>
                <tr>
                  <th scope="col">Bahasa</th>
                  <th scope="col" style={{ minWidth: 160 }}>
                    Unit selesai
                  </th>
                  <th scope="col" className="num">
                    Kata melekat
                  </th>
                  <th scope="col">
                    <span className="sr-only">Tindakan</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {active.map((l) => {
                  const done = Object.values(p.done[l.slug] ?? {}).filter((s) => s >= PASS).length;
                  return (
                    <tr key={l.slug}>
                      <th scope="row" style={{ color: "var(--ink)" }}>
                        {l.name}
                      </th>
                      <td>
                        <div className="row" style={{ flexWrap: "nowrap" }}>
                          <div className="bar" style={{ flex: 1, minWidth: 80 }}>
                            <i style={{ width: `${(done / units.length) * 100}%` }} />
                          </div>
                          <span className="tiny" style={{ whiteSpace: "nowrap" }}>
                            {done} / {units.length}
                          </span>
                        </div>
                      </td>
                      <td className="num">
                        {learnedCount(p, l.slug)} / {concepts.length}
                      </td>
                      <td style={{ textAlign: "right" }}>
                        <Link href={`/bahasa/${l.slug}/`}>Buka</Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="panel">
        <h3>Data Anda</h3>
        <p className="small muted">
          Progres disimpan di peramban perangkat ini saja. Membersihkan data situs atau berganti perangkat akan memulai dari
          nol.
        </p>
        <div className="btn-row mt-4">
          {confirm ? (
            <>
              <button
                type="button"
                className="btn"
                style={{ borderColor: "var(--margin)", color: "var(--margin)" }}
                onClick={() => {
                  resetProgress();
                  setConfirm(false);
                }}
              >
                Ya, hapus semua progres
              </button>
              <button type="button" className="btn btn-quiet" onClick={() => setConfirm(false)}>
                Batal
              </button>
            </>
          ) : (
            <button type="button" className="btn btn-sm" onClick={() => setConfirm(true)}>
              Hapus progres
            </button>
          )}
        </div>
      </section>
    </div>
  );
}
