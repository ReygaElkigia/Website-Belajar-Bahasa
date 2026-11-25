import { Mic } from "lucide-react";
import type { AudioCredit } from "@/data/audioCredits";

/** Penanda kata yang diputar dari rekaman penutur asli, sekaligus atribusinya. */
export function NativeBadge({ credit }: { credit: AudioCredit }) {
  const who = credit.artist || "penutur asli";
  return (
    <a
      className="native-badge"
      href={credit.page}
      target="_blank"
      rel="noreferrer"
      title={`Rekaman asli oleh ${who} (Lingua Libre, ${credit.license || "lisensi bebas"}). Ketuk untuk melihat berkasnya.`}
    >
      <Mic size={12} strokeWidth={2.25} aria-hidden />
      <span>Penutur asli</span>
      <span className="sr-only">
        , direkam oleh {who}, lisensi {credit.license}
      </span>
    </a>
  );
}
