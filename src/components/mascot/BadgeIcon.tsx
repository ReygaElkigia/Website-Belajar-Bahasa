import type { Badge } from "@/data/gamify";

const INK = "var(--stroke, #1b1f3b)";

/** Ikon lencana bergaya medali anime: lingkaran berpita dengan simbol di tengah. */
export function BadgeIcon({ icon, size = 64, locked = false }: { icon: Badge["icon"]; size?: number; locked?: boolean }) {
  const fill = locked ? "var(--sheet-2, #eef2fd)" : "var(--pop, #ffb547)";
  const symbol = locked ? "var(--rule-strong, #b9c3e6)" : INK;
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden className={locked ? "badge-ico locked" : "badge-ico"}>
      <path d="M20 40 L14 62 L24 56 L30 62 L32 42 Z" fill={locked ? fill : "var(--pen, #2f6be8)"} stroke={INK} strokeWidth={2.5} strokeLinejoin="round" />
      <path d="M44 40 L50 62 L40 56 L34 62 L32 42 Z" fill={locked ? fill : "var(--pen, #2f6be8)"} stroke={INK} strokeWidth={2.5} strokeLinejoin="round" />
      <circle cx={32} cy={28} r={22} fill={fill} stroke={INK} strokeWidth={3} />
      <circle cx={32} cy={28} r={16} fill="none" stroke={INK} strokeWidth={1.5} strokeDasharray="3 3" opacity={0.5} />
      <g fill={symbol} stroke={symbol} strokeWidth={0} transform="translate(32 28)">
        {icon === "seed" && <path d="M0 10 V-2 M0 -2 C-8 -2 -10 -10 -10 -10 C-2 -10 0 -6 0 -2 C0 -6 2 -12 10 -12 C10 -12 8 -2 0 -2" stroke={symbol} strokeWidth={2.6} fill="none" strokeLinecap="round" />}
        {icon === "flame" && <path d="M0 -12 C6 -4 10 0 8 6 C6 11 -6 11 -8 6 C-10 0 -4 -2 -2 -8 C-1 -4 2 -3 0 -12 Z" />}
        {icon === "moon" && <path d="M4 -11 A11 11 0 1 0 8 8 A9 9 0 1 1 4 -11 Z" />}
        {icon === "sun" && (
          <g>
            <circle r={6} />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
              <rect key={a} x={-1.5} y={-12} width={3} height={4} transform={`rotate(${a})`} />
            ))}
          </g>
        )}
        {icon === "book" && <path d="M-11 -7 Q-5 -10 0 -6 Q5 -10 11 -7 V8 Q5 5 0 9 Q-5 5 -11 8 Z" />}
        {icon === "scroll" && <path d="M-9 -10 H7 Q10 -10 10 -7 V9 H-6 Q-9 9 -9 6 Z M-5 -4 H6 M-5 1 H6" stroke={symbol} strokeWidth={0} />}
        {icon === "crown" && <path d="M-11 8 L-11 -6 L-5 0 L0 -10 L5 0 L11 -6 L11 8 Z" />}
        {icon === "globe" && (
          <g fill="none" stroke={symbol} strokeWidth={2.4}>
            <circle r={10} />
            <ellipse rx={4.5} ry={10} />
            <path d="M-10 0 H10" />
          </g>
        )}
        {icon === "target" && (
          <g fill="none" stroke={symbol} strokeWidth={2.4}>
            <circle r={10} />
            <circle r={5} />
            <circle r={1.5} fill={symbol} />
          </g>
        )}
        {icon === "star" && <path d="M0 -12 L3.5 -4 L12 -3.5 L5.5 2 L7.5 11 L0 6 L-7.5 11 L-5.5 2 L-12 -3.5 L-3.5 -4 Z" />}
        {icon === "cards" && (
          <g>
            <rect x={-10} y={-9} width={13} height={17} rx={2} transform="rotate(-12)" />
            <rect x={-3} y={-8} width={13} height={17} rx={2} fill={fill} stroke={symbol} strokeWidth={2} transform="rotate(10)" />
          </g>
        )}
        {icon === "medal" && <path d="M0 -11 L3 -3 L11 -3 L5 2 L7 10 L0 5 L-7 10 L-5 2 L-11 -3 L-3 -3 Z" />}
      </g>
    </svg>
  );
}
