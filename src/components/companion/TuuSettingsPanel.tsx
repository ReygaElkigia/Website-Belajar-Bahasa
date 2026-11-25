"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { setTuuSettings, useTuuSettings } from "@/lib/companion";

/** Pengaturan Tuu: tampil atau tidak, mode tenang, dan sisi layar. */
export function TuuSettingsPanel({ compact }: { compact?: boolean }) {
  const s = useTuuSettings();
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);

  const resetIntro = () => {
    try {
      const m = JSON.parse(localStorage.getItem("tutur:tuu:memory") || "{}");
      m.introDone = false;
      localStorage.setItem("tutur:tuu:memory", JSON.stringify(m));
      sessionStorage.removeItem("tuu:greeted");
    } catch {
      /* abaikan */
    }
    setTuuSettings({ hidden: false });
    window.location.reload();
  };

  return (
    <div className="panel tuu-settings">
      <h3>Pengaturan Tuu</h3>
      {!compact && <p className="small muted">Tersimpan di perangkat ini.</p>}
      <label className="tuu-switch">
        <input type="checkbox" checked={ready && !s.hidden} onChange={(e) => setTuuSettings({ hidden: !e.target.checked })} />
        <span>
          <strong>Tampilkan Tuu</strong>
          <span className="tiny muted">Bila disembunyikan, panggil lagi lewat tab kecil di tepi layar.</span>
        </span>
      </label>
      <label className="tuu-switch">
        <input type="checkbox" checked={ready && s.quiet} onChange={(e) => setTuuSettings({ quiet: e.target.checked })} />
        <span>
          <strong>Mode tenang</strong>
          <span className="tiny muted">Tetap berekspresi, tetapi hanya bicara untuk hal penting.</span>
        </span>
      </label>
      <div className="tuu-switch" role="radiogroup" aria-label="Sisi layar">
        <span>
          <strong>Sisi layar</strong>
        </span>
        <div className="seg">
          {(["left", "right"] as const).map((side) => (
            <button key={side} type="button" role="radio" aria-checked={ready && s.side === side} onClick={() => setTuuSettings({ side })}>
              {side === "left" ? "Kiri" : "Kanan"}
            </button>
          ))}
        </div>
      </div>
      <div className="btn-row mt-3">
        <button type="button" className="btn btn-sm" onClick={resetIntro}>
          Ulangi perkenalan
        </button>
        {compact && (
          <Link className="btn btn-sm btn-quiet" href="/tuu/">
            Kenalan dengan Tuu
          </Link>
        )}
      </div>
    </div>
  );
}
