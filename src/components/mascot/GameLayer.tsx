"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { onGameEvent, type GameEvent } from "@/lib/progress";
import { badgeById } from "@/data/gamify";
import { getTuuSettings } from "@/lib/companion";
import { Mascot } from "./Mascot";
import { BadgeIcon } from "./BadgeIcon";

interface Toast {
  id: number;
  kind: "xp" | "big";
  event: GameEvent;
}

/**
 * Lapisan notifikasi global: "+10 XP" yang melayang, dan kartu perayaan
 * bersama maskot saat naik level, dapat lencana, atau target harian tercapai.
 */
export function GameLayer() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const seq = useRef(0);

  useEffect(
    () =>
      onGameEvent((event) => {
        const id = ++seq.current;
        const kind: Toast["kind"] = event.type === "xp" ? "xp" : "big";
        // Perayaan besar disampaikan Tuu pendamping bila ia sedang tampil.
        if (kind === "big" && !getTuuSettings().hidden) return;
        setToasts((t) => [...t, { id, kind, event }].slice(-6));
        window.setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), kind === "xp" ? 1600 : 5200);
      }),
    [],
  );

  const dismiss = (id: number) => setToasts((t) => t.filter((x) => x.id !== id));
  const xps = toasts.filter((t) => t.kind === "xp");
  const bigs = toasts.filter((t) => t.kind === "big");

  return (
    <div className="game-layer" aria-live="polite">
      <div className="xp-floats">
        {xps.map((t) => (
          <span key={t.id} className="xp-float">
            +{(t.event as Extract<GameEvent, { type: "xp" }>).amount} XP
          </span>
        ))}
      </div>
      {bigs.map((t) => {
        const e = t.event;
        let title = "";
        let body = "";
        let icon: React.ReactNode = <Mascot mood="cheer" size={72} />;
        if (e.type === "level") {
          title = `Naik ke level ${e.level}!`;
          body = `Gelar baru: ${e.title}. Terus semangat!`;
        } else if (e.type === "goal") {
          title = "Target hari ini tercapai!";
          body = `${e.goal} XP terkumpul. Otsukaresama, kerja bagus hari ini.`;
        } else if (e.type === "badge") {
          const b = badgeById[e.id];
          title = `Lencana baru: ${b?.name ?? e.id}`;
          body = b?.how ?? "";
          icon = (
            <span className="toast-badge">
              <BadgeIcon icon={b?.icon ?? "star"} size={56} />
            </span>
          );
        }
        return (
          <div key={t.id} className="celebrate" role="status">
            {icon}
            <div>
              <strong>{title}</strong>
              <p className="small">{body}</p>
              <Link href="/progres/" className="small">
                Lihat progres
              </Link>
            </div>
            <button type="button" className="icon-btn" onClick={() => dismiss(t.id)} aria-label="Tutup">
              <X size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
