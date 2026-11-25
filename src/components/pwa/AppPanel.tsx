"use client";

import { useEffect, useState } from "react";
import { Bell, BellOff, Download, Share, SquarePlus } from "lucide-react";
import { languages } from "@/data";
import {
  canPromptInstall,
  disableReminders,
  enableReminders,
  isIos,
  isStandalone,
  onInstallChange,
  promptInstall,
  remindersSupported,
  savedLanguages,
} from "@/lib/pwa";

const REM_KEY = "tutur:reminders";

/** Panel di halaman progres: pasang aplikasi, pengingat, dan daftar bahasa offline. */
export function AppPanel() {
  const [mounted, setMounted] = useState(false);
  const [, force] = useState(0);
  const [rem, setRem] = useState<string>("off");
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    try {
      setRem(localStorage.getItem(REM_KEY) || "off");
    } catch {
      /* abaikan */
    }
    return onInstallChange(() => force((n) => n + 1));
  }, []);

  if (!mounted) return null;
  const standalone = isStandalone();
  const saved = savedLanguages();
  const savedNames = languages.filter((l) => saved[l.slug]).map((l) => l.name);

  const toggleRem = async () => {
    setMsg(null);
    if (rem !== "off") {
      await disableReminders();
      setRem("off");
      localStorage.setItem(REM_KEY, "off");
      return;
    }
    const r = await enableReminders();
    const next = r === "on" ? "on" : r === "in-app" ? "in-app" : "off";
    setRem(next);
    localStorage.setItem(REM_KEY, next);
    if (r === "denied") setMsg("Izin notifikasi ditolak. Aktifkan lewat pengaturan situs di peramban.");
    if (r === "unsupported") setMsg("Peramban ini tidak mendukung notifikasi. Pengingat tetap muncul di dalam aplikasi.");
    if (r === "in-app")
      setMsg("Notifikasi aktif, tetapi pengingat otomatis harian hanya tersedia di Chrome Android untuk aplikasi yang sudah dipasang. Di perangkat ini, Tuu mengingatkan saat aplikasi dibuka.");
  };

  return (
    <section className="panel app-panel">
      <h3>Aplikasi dan offline</h3>
      <div className="app-grid">
        <div>
          <p className="small" style={{ fontWeight: 800 }}>
            Pasang di layar utama
          </p>
          {standalone ? (
            <p className="small muted">Tutur sudah terpasang dan berjalan sebagai aplikasi.</p>
          ) : canPromptInstall() ? (
            <button type="button" className="btn btn-primary btn-sm mt-2" onClick={() => void promptInstall()}>
              <Download size={16} aria-hidden /> Pasang aplikasi
            </button>
          ) : isIos() ? (
            <p className="small muted">
              Di Safari, ketuk <Share size={14} aria-label="Bagikan" style={{ verticalAlign: "-2px" }} /> lalu pilih{" "}
              <strong>
                <SquarePlus size={14} aria-hidden style={{ verticalAlign: "-2px" }} /> Tambah ke Layar Utama
              </strong>
              .
            </p>
          ) : (
            <p className="small muted">
              Buka menu peramban lalu pilih <strong>Pasang aplikasi</strong> atau <strong>Tambahkan ke layar utama</strong>.
            </p>
          )}
        </div>
        <div>
          <p className="small" style={{ fontWeight: 800 }}>
            Pengingat harian
          </p>
          <button type="button" className="btn btn-sm mt-2" onClick={toggleRem} disabled={!remindersSupported() && rem === "off" && false}>
            {rem === "off" ? <Bell size={16} aria-hidden /> : <BellOff size={16} aria-hidden />}
            {rem === "off" ? "Aktifkan pengingat" : "Matikan pengingat"}
          </button>
          {msg && <p className="tiny muted mt-2">{msg}</p>}
        </div>
        <div>
          <p className="small" style={{ fontWeight: 800 }}>
            Tersimpan untuk offline
          </p>
          <p className="small muted">
            {savedNames.length ? savedNames.join(", ") : "Belum ada. Buka halaman bahasa lalu ketuk Simpan untuk offline."}
          </p>
        </div>
      </div>
    </section>
  );
}
