"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { WifiOff, X } from "lucide-react";
import { registerServiceWorker, writeReminderMeta } from "@/lib/pwa";
import { today, useProgress } from "@/lib/progress";
import { Mascot } from "../mascot/Mascot";

const NUDGE_KEY = "tutur:nudge";

/**
 * Dipasang sekali di layout: mendaftarkan service worker, menyalin ringkasan
 * progres untuk pengingat, menampilkan tanda offline, dan pengingat di dalam
 * aplikasi bila ada kartu hafalan yang jatuh tempo.
 */
export function PwaBoot() {
  const p = useProgress();
  const [online, setOnline] = useState(true);
  const [nudge, setNudge] = useState(false);

  useEffect(() => {
    registerServiceWorker();
    const up = () => setOnline(navigator.onLine);
    up();
    window.addEventListener("online", up);
    window.addEventListener("offline", up);
    return () => {
      window.removeEventListener("online", up);
      window.removeEventListener("offline", up);
    };
  }, []);

  const due = useMemo(() => {
    const now = Date.now();
    return Object.values(p.cards).reduce((n, deck) => n + Object.values(deck).filter((c) => c.due <= now).length, 0);
  }, [p.cards]);
  const studiedToday = p.days.includes(today());

  useEffect(() => {
    void writeReminderMeta({ lastActive: studiedToday ? today() : p.days.at(-1), due }).catch(() => undefined);
  }, [due, studiedToday, p.days]);

  useEffect(() => {
    if (due === 0 || studiedToday) return;
    try {
      if (localStorage.getItem(NUDGE_KEY) === today()) return;
    } catch {
      return;
    }
    const t = window.setTimeout(() => setNudge(true), 2500);
    return () => window.clearTimeout(t);
  }, [due, studiedToday]);

  const closeNudge = () => {
    setNudge(false);
    try {
      localStorage.setItem(NUDGE_KEY, today());
    } catch {
      /* abaikan */
    }
  };

  return (
    <>
      {!online && (
        <div className="offline-pill" role="status">
          <WifiOff size={16} strokeWidth={2.25} aria-hidden />
          Sedang offline. Halaman yang tersimpan tetap bisa dibuka.
        </div>
      )}
      {nudge && (
        <div className="nudge" role="status">
          <Mascot mood="happy" size={64} />
          <div>
            <strong>{due} kata menunggu diulang</strong>
            <p className="small">Lima menit saja cukup untuk menjaga runtunan belajarmu.</p>
            <Link href="/latihan/" className="btn btn-primary btn-sm mt-2" onClick={closeNudge}>
              Ulangi sekarang
            </Link>
          </div>
          <button type="button" className="icon-btn" onClick={closeNudge} aria-label="Tutup pengingat">
            <X size={16} />
          </button>
        </div>
      )}
    </>
  );
}
