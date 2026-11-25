"use client";

import { useEffect, useState } from "react";
import { CloudDownload, Check, Trash2 } from "lucide-react";
import { offlineManifest, removeLanguageOffline, saveLanguageOffline, savedLanguages } from "@/lib/pwa";

const mb = (b: number) => `${(b / 1_048_576).toLocaleString("id-ID", { maximumFractionDigits: 1 })} MB`;

/** Tombol untuk mengunduh semua halaman satu bahasa agar bisa dipakai tanpa internet. */
export function OfflineSave({ slug, name }: { slug: string; name: string }) {
  const [ready, setReady] = useState(false);
  const [size, setSize] = useState<number | null>(null);
  const [saved, setSaved] = useState(false);
  const [progress, setProgress] = useState<[number, number] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!("caches" in window)) return;
    setReady(true);
    setSaved(!!savedLanguages()[slug]);
    offlineManifest().then((m) => setSize(m?.languages[slug]?.bytes ?? null));
  }, [slug]);

  if (!ready) return null;

  const save = async () => {
    setError(null);
    setProgress([0, 1]);
    try {
      await saveLanguageOffline(slug, (d, t) => setProgress([d, t]));
      setSaved(true);
    } catch {
      setError("Gagal mengunduh. Periksa koneksi lalu coba lagi.");
    } finally {
      setProgress(null);
    }
  };

  const remove = async () => {
    await removeLanguageOffline(slug);
    setSaved(false);
  };

  return (
    <div className="panel">
      <h3>Belajar tanpa internet</h3>
      <p className="small muted">
        Simpan semua unit, huruf, dan latihan ujian bahasa {name} di perangkat ini{size ? ` (sekitar ${mb(size)})` : ""}.
      </p>
      {progress ? (
        <div className="mt-4" aria-live="polite">
          <div className="bar">
            <i style={{ width: `${(progress[0] / progress[1]) * 100}%` }} />
          </div>
          <p className="tiny muted mt-2">
            Mengunduh {progress[0]} dari {progress[1]} berkas…
          </p>
        </div>
      ) : saved ? (
        <div className="row mt-4" style={{ gap: 8 }}>
          <span className="native-badge" style={{ fontSize: 12 }}>
            <Check size={13} strokeWidth={2.5} aria-hidden /> Tersimpan untuk offline
          </span>
          <button type="button" className="btn btn-quiet btn-sm" onClick={save}>
            Perbarui
          </button>
          <button type="button" className="btn btn-quiet btn-sm" onClick={remove} aria-label={`Hapus simpanan offline bahasa ${name}`}>
            <Trash2 size={15} aria-hidden /> Hapus
          </button>
        </div>
      ) : (
        <button type="button" className="btn btn-sm mt-4" onClick={save}>
          <CloudDownload size={16} strokeWidth={2.25} aria-hidden />
          Simpan untuk offline
        </button>
      )}
      {error && (
        <p className="small mt-2" style={{ color: "var(--margin)" }} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
