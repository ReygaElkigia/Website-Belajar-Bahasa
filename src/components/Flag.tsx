import { useId } from "react";

/**
 * Bendera SVG untuk setiap bahasa (bukan emoji, karena emoji bendera tidak
 * tampil di Windows). Bahasa dipakai di banyak negara; bendera di sini hanya
 * penanda yang paling dikenal:
 *   Inggris: Britania Raya, Arab: Uni Emirat Arab, Hindi: India, Spanyol:
 *   Spanyol (bendera sipil tanpa lambang).
 */

type Shape = "circle" | "rect";

function star(cx: number, cy: number, r: number, rot = -90) {
  const pts: string[] = [];
  for (let i = 0; i < 10; i++) {
    const rr = i % 2 === 0 ? r : r * 0.382;
    const a = ((rot + i * 36) * Math.PI) / 180;
    pts.push(`${(cx + Math.cos(a) * rr).toFixed(2)},${(cy + Math.sin(a) * rr).toFixed(2)}`);
  }
  return `M${pts.join("L")}Z`;
}

/** Trigram bendera Korea: 3 batang, `broken` menandai batang yang terputus di tengah. */
function trigram(cx: number, cy: number, angle: number, broken: [boolean, boolean, boolean]) {
  return (
    <g transform={`translate(${cx} ${cy}) rotate(${angle})`} fill="#000">
      {broken.map((b, i) => {
        const y = (i - 1) * 1.6 - 0.5;
        return b ? (
          <g key={i}>
            <rect x={-3} y={y} width={2.7} height={1} />
            <rect x={0.3} y={y} width={2.7} height={1} />
          </g>
        ) : (
          <rect key={i} x={-3} y={y} width={6} height={1} />
        );
      })}
    </g>
  );
}

function FlagArt({ slug, uid }: { slug: string; uid: string }) {
  switch (slug) {
    case "inggris":
      return (
        <svg viewBox="0 0 60 30" preserveAspectRatio="xMidYMid slice">
          <clipPath id={`uk-${uid}`}>
            <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
          </clipPath>
          <rect width="60" height="30" fill="#012169" />
          <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
          <path d="M0,0 L60,30 M60,0 L0,30" clipPath={`url(#uk-${uid})`} stroke="#C8102E" strokeWidth="4" />
          <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
          <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
        </svg>
      );
    case "jepang":
      return (
        <svg viewBox="0 0 30 20" preserveAspectRatio="xMidYMid slice">
          <rect width="30" height="20" fill="#fff" />
          <circle cx="15" cy="10" r="6" fill="#BC002D" />
        </svg>
      );
    case "korea":
      return (
        <svg viewBox="0 0 36 24" preserveAspectRatio="xMidYMid slice">
          <rect width="36" height="24" fill="#fff" />
          <g transform="rotate(33.69 18 12)">
            <circle cx="18" cy="12" r="6" fill="#0047A0" />
            <path d="M12,12 A6,6 0 0 1 24,12 A3,3 0 0 1 18,12 A3,3 0 0 0 12,12 Z" fill="#CD2E3A" />
          </g>
          {trigram(10.1, 6.73, -56.31, [false, false, false])}
          {trigram(25.9, 17.27, -56.31, [true, true, true])}
          {trigram(25.9, 6.73, 56.31, [true, false, true])}
          {trigram(10.1, 17.27, 56.31, [false, true, false])}
        </svg>
      );
    case "mandarin":
      return (
        <svg viewBox="0 0 30 20" preserveAspectRatio="xMidYMid slice">
          <rect width="30" height="20" fill="#EE1C25" />
          <path d={star(5, 5, 3)} fill="#FFFF00" />
          <path d={star(10, 2, 1, -60)} fill="#FFFF00" />
          <path d={star(12, 4, 1, -80)} fill="#FFFF00" />
          <path d={star(12, 7, 1, -100)} fill="#FFFF00" />
          <path d={star(10, 9, 1, -120)} fill="#FFFF00" />
        </svg>
      );
    case "arab":
      return (
        <svg viewBox="0 0 24 12" preserveAspectRatio="xMidYMid slice">
          <rect width="24" height="4" fill="#00732F" />
          <rect y="4" width="24" height="4" fill="#fff" />
          <rect y="8" width="24" height="4" fill="#000" />
          <rect width="6" height="12" fill="#FF0000" />
        </svg>
      );
    case "jerman":
      return (
        <svg viewBox="0 0 5 3" preserveAspectRatio="xMidYMid slice">
          <rect width="5" height="1" fill="#000" />
          <rect y="1" width="5" height="1" fill="#DD0000" />
          <rect y="2" width="5" height="1" fill="#FFCE00" />
        </svg>
      );
    case "prancis":
      return (
        <svg viewBox="0 0 3 2" preserveAspectRatio="xMidYMid slice">
          <rect width="1" height="2" fill="#0055A4" />
          <rect x="1" width="1" height="2" fill="#fff" />
          <rect x="2" width="1" height="2" fill="#EF4135" />
        </svg>
      );
    case "spanyol":
      return (
        <svg viewBox="0 0 3 2" preserveAspectRatio="xMidYMid slice">
          <rect width="3" height="2" fill="#AA151B" />
          <rect y="0.5" width="3" height="1" fill="#F1BF00" />
        </svg>
      );
    case "rusia":
      return (
        <svg viewBox="0 0 9 6" preserveAspectRatio="xMidYMid slice">
          <rect width="9" height="2" fill="#fff" />
          <rect y="2" width="9" height="2" fill="#0039A6" />
          <rect y="4" width="9" height="2" fill="#D52B1E" />
        </svg>
      );
    case "italia":
      return (
        <svg viewBox="0 0 3 2" preserveAspectRatio="xMidYMid slice">
          <rect width="1" height="2" fill="#009246" />
          <rect x="1" width="1" height="2" fill="#fff" />
          <rect x="2" width="1" height="2" fill="#CE2B37" />
        </svg>
      );
    case "thai":
      return (
        <svg viewBox="0 0 9 6" preserveAspectRatio="xMidYMid slice">
          <rect width="9" height="6" fill="#A51931" />
          <rect y="1" width="9" height="4" fill="#F4F5F8" />
          <rect y="2" width="9" height="2" fill="#2D2A4A" />
        </svg>
      );
    case "hindi":
      return (
        <svg viewBox="0 0 30 20" preserveAspectRatio="xMidYMid slice">
          <rect width="30" height="6.67" fill="#FF9933" />
          <rect y="6.67" width="30" height="6.67" fill="#fff" />
          <rect y="13.33" width="30" height="6.67" fill="#138808" />
          <circle cx="15" cy="10" r="2.9" fill="none" stroke="#000080" strokeWidth="0.45" />
          <g stroke="#000080" strokeWidth="0.18">
            {Array.from({ length: 24 }, (_, i) => {
              const a = (i * 15 * Math.PI) / 180;
              return <line key={i} x1="15" y1="10" x2={(15 + Math.cos(a) * 2.9).toFixed(2)} y2={(10 + Math.sin(a) * 2.9).toFixed(2)} />;
            })}
          </g>
          <circle cx="15" cy="10" r="0.6" fill="#000080" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 3 2">
          <rect width="3" height="2" fill="#ccc" />
        </svg>
      );
  }
}

export const FLAG_NOTE: Record<string, string> = {
  inggris: "Britania Raya",
  jepang: "Jepang",
  korea: "Korea Selatan",
  mandarin: "Tiongkok",
  arab: "Uni Emirat Arab",
  jerman: "Jerman",
  prancis: "Prancis",
  spanyol: "Spanyol",
  rusia: "Rusia",
  italia: "Italia",
  thai: "Thailand",
  hindi: "India",
};

export function Flag({ slug, size = 28, shape = "circle", className }: { slug: string; size?: number; shape?: Shape; className?: string }) {
  const uid = useId().replace(/:/g, "");
  const w = shape === "circle" ? size : Math.round(size * 1.4);
  return (
    <span className={`flag flag-${shape}${className ? ` ${className}` : ""}`} style={{ width: w, height: size }} aria-hidden>
      <FlagArt slug={slug} uid={uid} />
    </span>
  );
}
