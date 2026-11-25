"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { concepts, languages, units } from "@/data";
import { PASS, learnedCount, resetProgress, setGoal, streak, today, useProgress } from "@/lib/progress";
import { BADGES, GOALS, levelInfo } from "@/data/gamify";
import { Mascot } from "./mascot/Mascot";
import { BadgeIcon } from "./mascot/BadgeIcon";
import { AppPanel } from "./pwa/AppPanel";
import { CountUp } from "./fx/CountUp";
import { TuuSettingsPanel } from "./companion/TuuSettingsPanel";

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

  const lv = levelInfo(p.xp);
  const todayXp = p.xpDays[today()] ?? 0;
  const goalPct = Math.min(100, Math.round((todayXp / p.goal) * 100));

  return (
    <div className="stack" style={{ display: "grid", gap: 64 }}>
      <section className="level-card">
        <Mascot mood={goalPct >= 100 ? "cheer" : todayXp > 0 ? "happy" : "idle"} size={132} />
        <div className="level-main">
          <p className="small muted">Level {lv.level}</p>
          <h2>{lv.title}</h2>
          <div className="bar mt-3" aria-hidden>
            <i style={{ width: `${lv.pct}%` }} />
          </div>
          <p className="small muted mt-2">
            <CountUp value={p.xp} /> XP total. {lv.next - p.xp} XP lagi menuju level {lv.level + 1}.
          </p>
          <p className="mascot-line mt-4">
            {todayXp === 0
              ? "Ayo mulai hari ini! Satu unit atau satu sesi kartu hafalan sudah cukup untuk menjaga runtunan."
              : goalPct >= 100
                ? `Target hari ini tercapai (${todayXp} XP). Hebat, sampai jumpa besok!`
                : `Hari ini ${todayXp} dari ${p.goal} XP. Tinggal ${p.goal - todayXp} XP lagi!`}
          </p>
        </div>
        <div className="goal-box">
          <p className="small" style={{ fontWeight: 800 }}>
            Target harian
          </p>
          <div className="goal-ring" style={{ "--pct": goalPct } as React.CSSProperties}>
            <span>
              {todayXp}
              <small>/{p.goal}</small>
            </span>
          </div>
          <div className="chips" role="group" aria-label="Pilih target harian">
            {GOALS.map((g) => (
              <button key={g.xp} type="button" className="chip" aria-pressed={p.goal === g.xp} onClick={() => setGoal(g.xp)} title={g.note}>
                {g.label} {g.xp}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section>
        <h2 style={{ fontSize: 22, marginBottom: 6 }}>Lencana</h2>
        <p className="small muted" style={{ marginBottom: 18 }}>
          {p.badges.length} dari {BADGES.length} lencana terkumpul.
        </p>
        <ul className="badge-grid">
          {BADGES.map((b) => {
            const got = p.badges.includes(b.id);
            return (
              <li key={b.id} className="badge-item" data-got={got}>
                <BadgeIcon icon={b.icon} size={64} locked={!got} />
                <strong>{b.name}</strong>
                <span className="tiny muted">{b.how}</span>
              </li>
            );
          })}
        </ul>
      </section>

      <dl className="stats">
        <div>
          <dt>Runtunan hari belajar</dt>
          <dd>
            <CountUp value={run} />
          </dd>
        </div>
        <div>
          <dt>Unit selesai</dt>
          <dd>
            <CountUp value={unitsDone} />
          </dd>
        </div>
        <div>
          <dt>Kata yang sudah melekat</dt>
          <dd>
            <CountUp value={words} />
          </dd>
        </div>
        <div>
          <dt>Bahasa yang dipelajari</dt>
          <dd>
            <CountUp value={active.length} />
          </dd>
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
                        <Link href={`/bahasa/${l.slug}/jalur/`}>Lanjutkan</Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <AppPanel />

      <TuuSettingsPanel compact />

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
