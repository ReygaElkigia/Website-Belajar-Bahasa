/**
 * Tuu, maskot Tutur: makhluk kecil berbentuk balon kata dengan mata anime,
 * sehelai rambut berujung bintang, dan syal berwarna aksen tema bahasa.
 * Karakter orisinal, digambar sebagai SVG.
 */

export type MascotMood = "idle" | "happy" | "cheer" | "sad" | "think";

const INK = "var(--stroke, #1b1f3b)";

function Eyes({ mood }: { mood: MascotMood }) {
  if (mood === "happy" || mood === "cheer") {
    return (
      <g fill="none" stroke={INK} strokeWidth={4.5} strokeLinecap="round">
        <path d="M39 52 Q46 41 53 52" />
        <path d="M67 52 Q74 41 81 52" />
      </g>
    );
  }
  if (mood === "think") {
    return (
      <g>
        <ellipse cx={46} cy={50} rx={6} ry={8.5} fill={INK} />
        <circle cx={48.2} cy={46.5} r={2.3} fill="#fff" />
        <path d="M67 51 Q74 47 81 51" fill="none" stroke={INK} strokeWidth={4.5} strokeLinecap="round" />
      </g>
    );
  }
  const sad = mood === "sad";
  return (
    <g className="mascot-eyes">
      <ellipse cx={46} cy={sad ? 53 : 50} rx={6} ry={sad ? 7 : 9} fill={INK} />
      <ellipse cx={74} cy={sad ? 53 : 50} rx={6} ry={sad ? 7 : 9} fill={INK} />
      <circle cx={48.4} cy={sad ? 50 : 45.8} r={2.4} fill="#fff" />
      <circle cx={76.4} cy={sad ? 50 : 45.8} r={2.4} fill="#fff" />
      <circle cx={44} cy={sad ? 56 : 54} r={1.2} fill="#fff" opacity={0.8} />
      <circle cx={72} cy={sad ? 56 : 54} r={1.2} fill="#fff" opacity={0.8} />
      {sad && (
        <g fill="none" stroke={INK} strokeWidth={3} strokeLinecap="round">
          <path d="M38 40 L52 44" />
          <path d="M82 40 L68 44" />
        </g>
      )}
    </g>
  );
}

function Mouth({ mood }: { mood: MascotMood }) {
  if (mood === "happy" || mood === "cheer") {
    return <path d="M51 61 Q60 77 69 61 Z" fill="#FF6B8A" stroke={INK} strokeWidth={3} strokeLinejoin="round" />;
  }
  if (mood === "sad") return <path d="M53 68 Q60 61 67 68" fill="none" stroke={INK} strokeWidth={3.5} strokeLinecap="round" />;
  if (mood === "think") return <path d="M55 66 L66 64" fill="none" stroke={INK} strokeWidth={3.5} strokeLinecap="round" />;
  return <path d="M53 63 Q56.5 67 60 63 Q63.5 67 67 63" fill="none" stroke={INK} strokeWidth={3.2} strokeLinecap="round" />;
}

export function Mascot({ mood = "idle", size = 96, className, title }: { mood?: MascotMood; size?: number; className?: string; title?: string }) {
  const cheer = mood === "cheer";
  return (
    <svg
      className={`mascot mascot-${mood} ${className ?? ""}`}
      width={size}
      height={size}
      viewBox="0 0 120 120"
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <ellipse cx={60} cy={113} rx={28} ry={4.5} fill={INK} opacity={0.15} className="mascot-shadow" />
      <g className="mascot-body">
        {/* Rambut berujung bintang */}
        <path d="M60 14 C56 2 68 -2 72 6" fill="none" stroke={INK} strokeWidth={4} strokeLinecap="round" />
        <path d="M74 1 L76 6 L81 6.5 L77 9.5 L78.5 14.5 L74 11.5 L69.5 14.5 L71 9.5 L67 6.5 L72 6 Z" fill="var(--pop, #ffb547)" stroke={INK} strokeWidth={2} strokeLinejoin="round" />
        {/* Lengan */}
        {cheer ? (
          <g fill="#FFFDF7" stroke={INK} strokeWidth={4}>
            <ellipse cx={14} cy={36} rx={6.5} ry={10} transform="rotate(-35 14 36)" />
            <ellipse cx={106} cy={36} rx={6.5} ry={10} transform="rotate(35 106 36)" />
          </g>
        ) : (
          <g fill="#FFFDF7" stroke={INK} strokeWidth={4}>
            <ellipse cx={15} cy={64} rx={6.5} ry={10} transform="rotate(20 15 64)" />
            <ellipse cx={105} cy={64} rx={6.5} ry={10} transform="rotate(-20 105 64)" />
          </g>
        )}
        {/* Badan balon kata */}
        <path
          d="M22 34 Q22 14 42 14 H78 Q98 14 98 34 V68 Q98 90 78 90 H54 L40 104 L42 90 Q22 90 22 68 Z"
          fill="#FFFDF7"
          stroke={INK}
          strokeWidth={4.5}
          strokeLinejoin="round"
        />
        {/* Syal sesuai warna tema */}
        <path d="M24 74 Q60 86 96 74 L96 82 Q60 94 24 82 Z" fill="var(--pen, #2f6be8)" stroke={INK} strokeWidth={3} strokeLinejoin="round" />
        <path d="M80 82 L88 98 L78 96 Z" fill="var(--pen, #2f6be8)" stroke={INK} strokeWidth={3} strokeLinejoin="round" />
        {/* Wajah */}
        <ellipse cx={37} cy={62} rx={6} ry={3.5} fill="#FF8FB1" opacity={0.65} />
        <ellipse cx={83} cy={62} rx={6} ry={3.5} fill="#FF8FB1" opacity={0.65} />
        <Eyes mood={mood} />
        <Mouth mood={mood} />
        {mood === "sad" && <path d="M95 30 Q101 40 95 44 Q89 40 95 30 Z" fill="#7CC8FF" stroke={INK} strokeWidth={2} />}
        {mood === "think" && (
          <g fill={INK}>
            <circle cx={100} cy={10} r={2.6} />
            <circle cx={108} cy={6} r={2.6} />
            <circle cx={116} cy={2} r={2.6} />
          </g>
        )}
      </g>
      {cheer && (
        <g className="mascot-sparkles" fill="var(--pop, #ffb547)" stroke={INK} strokeWidth={1.5}>
          <path d="M8 12 L10 18 L16 20 L10 22 L8 28 L6 22 L0 20 L6 18 Z" />
          <path d="M108 52 L109.5 56 L113.5 57.5 L109.5 59 L108 63 L106.5 59 L102.5 57.5 L106.5 56 Z" />
          <path d="M100 96 L101.5 100 L105.5 101.5 L101.5 103 L100 107 L98.5 103 L94.5 101.5 L98.5 100 Z" />
        </g>
      )}
    </svg>
  );
}

/** Maskot dengan balon ucapan di sampingnya. */
export function MascotSays({
  mood,
  children,
  size = 84,
}: {
  mood: MascotMood;
  children: React.ReactNode;
  size?: number;
}) {
  return (
    <div className="mascot-says" data-mood={mood}>
      <Mascot mood={mood} size={size} />
      <div className="mascot-line">{children}</div>
    </div>
  );
}
