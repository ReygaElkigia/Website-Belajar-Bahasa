/**
 * Tuu versi pendamping: digambar ulang dengan bagian-bagian yang bisa
 * digerakkan (mata, kelopak, alis, lengan, syal, rambut bintang) dan lapisan
 * efek untuk setiap suasana hati. Mata mengikuti kursor lewat variabel CSS
 * --ex dan --ey yang diatur langsung oleh Companion tanpa render ulang.
 */

export type TuuMood =
  | "idle"
  | "wave"
  | "happy"
  | "cheer"
  | "proud"
  | "love"
  | "shy"
  | "wink"
  | "sad"
  | "nervous"
  | "think"
  | "focus"
  | "surprised"
  | "sleep"
  | "dizzy"
  | "listen"
  | "read";

const INK = "var(--tuu-ink, #1b1f3b)";
const BODY = "#FFFDF7";
const BLUSH = "#FF8FB1";

type ArmPose = "rest" | "wave" | "up" | "cheeks" | "chin" | "ear" | "book" | "hips" | "flop";

const ARMS: Record<TuuMood, ArmPose> = {
  idle: "rest",
  wave: "wave",
  happy: "rest",
  cheer: "up",
  proud: "hips",
  love: "cheeks",
  shy: "cheeks",
  wink: "wave",
  sad: "flop",
  nervous: "chin",
  think: "chin",
  focus: "hips",
  surprised: "up",
  sleep: "flop",
  dizzy: "flop",
  listen: "ear",
  read: "book",
};

/* ---------- Mata ---------- */

function Eye({ cx, mood, side }: { cx: number; mood: TuuMood; side: "l" | "r" }) {
  const cy = 58;
  switch (mood) {
    case "happy":
    case "cheer":
    case "proud":
      return <path d={`M${cx - 7} ${cy + 2} Q${cx} ${cy - 9} ${cx + 7} ${cy + 2}`} fill="none" stroke={INK} strokeWidth={4.5} strokeLinecap="round" />;
    case "sleep":
      return <path d={`M${cx - 7} ${cy + 1} Q${cx} ${cy + 6} ${cx + 7} ${cy + 1}`} fill="none" stroke={INK} strokeWidth={4} strokeLinecap="round" />;
    case "wink":
      return side === "r" ? (
        <path d={`M${cx - 7} ${cy} Q${cx} ${cy - 7} ${cx + 7} ${cy}`} fill="none" stroke={INK} strokeWidth={4.5} strokeLinecap="round" />
      ) : (
        <NormalEye cx={cx} cy={cy} />
      );
    case "love":
      return (
        <path
          d={`M${cx} ${cy + 7} C${cx - 11} ${cy} ${cx - 8} ${cy - 9} ${cx} ${cy - 4} C${cx + 8} ${cy - 9} ${cx + 11} ${cy} ${cx} ${cy + 7} Z`}
          fill="#FF4F7B"
          stroke={INK}
          strokeWidth={2.2}
          strokeLinejoin="round"
        />
      );
    case "dizzy":
      return (
        <path
          className="tuu-spiral"
          d={`M${cx} ${cy} m-1 0 a1 1 0 1 1 2 0 a3 3 0 1 1 -5 -1 a5 5 0 1 1 9 2 a7 7 0 1 1 -12 -3`}
          fill="none"
          stroke={INK}
          strokeWidth={2.4}
          strokeLinecap="round"
        />
      );
    case "surprised":
      return (
        <g>
          <circle cx={cx} cy={cy} r={8.5} fill="#fff" stroke={INK} strokeWidth={3} />
          <circle cx={cx} cy={cy} r={3.6} fill={INK} />
        </g>
      );
    case "focus":
      return (
        <g>
          <ellipse cx={cx} cy={cy + 1} rx={5.5} ry={7} fill={INK} />
          <circle cx={cx + 2} cy={cy - 2.5} r={2} fill="#fff" />
          <path d={side === "l" ? `M${cx - 9} ${cy - 13} L${cx + 6} ${cy - 9}` : `M${cx + 9} ${cy - 13} L${cx - 6} ${cy - 9}`} stroke={INK} strokeWidth={3.5} strokeLinecap="round" />
        </g>
      );
    case "think":
      return side === "r" ? (
        <path d={`M${cx - 7} ${cy + 1} L${cx + 7} ${cy - 1}`} stroke={INK} strokeWidth={4} strokeLinecap="round" />
      ) : (
        <NormalEye cx={cx} cy={cy} />
      );
    case "sad":
    case "nervous":
      return (
        <g>
          <ellipse cx={cx} cy={cy + 2} rx={5.5} ry={7} fill={INK} />
          <circle cx={cx + 2} cy={cy - 1} r={2.2} fill="#fff" />
          <path
            d={side === "l" ? `M${cx - 8} ${cy - 9} L${cx + 6} ${cy - 13}` : `M${cx + 8} ${cy - 9} L${cx - 6} ${cy - 13}`}
            stroke={INK}
            strokeWidth={3}
            strokeLinecap="round"
          />
        </g>
      );
    default:
      return <NormalEye cx={cx} cy={cy} />;
  }
}

function NormalEye({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g>
      <ellipse cx={cx} cy={cy} rx={6} ry={9} fill={INK} />
      <circle cx={cx + 2.3} cy={cy - 4} r={2.5} fill="#fff" />
      <circle cx={cx - 2} cy={cy + 4} r={1.2} fill="#fff" opacity={0.8} />
    </g>
  );
}

/* ---------- Mulut ---------- */

function Mouth({ mood }: { mood: TuuMood }) {
  const y = 72;
  switch (mood) {
    case "happy":
    case "cheer":
    case "love":
    case "proud":
      return (
        <g>
          <path d={`M60 ${y - 2} Q70 ${y + 15} 80 ${y - 2} Z`} fill="#E8476C" stroke={INK} strokeWidth={3} strokeLinejoin="round" />
          <path d={`M64 ${y + 6} Q70 ${y + 2} 76 ${y + 6} Q70 ${y + 10} 64 ${y + 6} Z`} fill="#FF9AB0" />
        </g>
      );
    case "surprised":
      return <ellipse cx={70} cy={y + 3} rx={4.5} ry={6} fill="#E8476C" stroke={INK} strokeWidth={3} />;
    case "sad":
      return <path d={`M62 ${y + 6} Q70 ${y - 2} 78 ${y + 6}`} fill="none" stroke={INK} strokeWidth={3.5} strokeLinecap="round" />;
    case "nervous":
    case "dizzy":
      return <path d={`M61 ${y + 2} q3 -4 6 0 t6 0 t6 0`} fill="none" stroke={INK} strokeWidth={3} strokeLinecap="round" />;
    case "think":
    case "focus":
      return <path d={`M64 ${y + 3} L77 ${y + 1}`} fill="none" stroke={INK} strokeWidth={3.5} strokeLinecap="round" />;
    case "sleep":
      return <ellipse cx={70} cy={y + 3} rx={3} ry={3.6} fill="#E8476C" stroke={INK} strokeWidth={2.4} />;
    case "shy":
      return <path d={`M65 ${y + 2} Q70 ${y + 6} 75 ${y + 2}`} fill="none" stroke={INK} strokeWidth={3} strokeLinecap="round" />;
    case "listen":
    case "read":
      return <path d={`M64 ${y} Q70 ${y + 7} 76 ${y}`} fill="none" stroke={INK} strokeWidth={3.2} strokeLinecap="round" />;
    default:
      // Mulut kucing khas Tuu
      return <path d={`M62 ${y} Q66 ${y + 5} 70 ${y} Q74 ${y + 5} 78 ${y}`} fill="none" stroke={INK} strokeWidth={3.2} strokeLinecap="round" />;
  }
}

/* ---------- Lengan ---------- */

function Arm({ side, pose }: { side: "l" | "r"; pose: ArmPose }) {
  const flip = side === "l" ? 1 : -1;
  const sx = side === "l" ? 30 : 110; // bahu
  const common = { fill: BODY, stroke: INK, strokeWidth: 4 };
  let cx = sx - 8 * flip;
  let cy = 78;
  let rot = 20 * flip;
  switch (pose) {
    case "wave":
      if (side === "r") return <g className="tuu-arm-wave"><ellipse cx={118} cy={44} rx={7} ry={11} transform="rotate(25 118 44)" {...common} /></g>;
      break;
    case "up":
      cx = sx - 12 * flip;
      cy = 40;
      rot = -35 * flip;
      break;
    case "cheeks":
      cx = side === "l" ? 42 : 98;
      cy = 74;
      rot = 0;
      break;
    case "chin":
      if (side === "r") {
        cx = 84;
        cy = 86;
        rot = -40;
      }
      break;
    case "ear":
      if (side === "l") {
        cx = 28;
        cy = 50;
        rot = 30;
      }
      break;
    case "book":
      cx = side === "l" ? 52 : 88;
      cy = 92;
      rot = 0;
      break;
    case "hips":
      cx = sx - 4 * flip;
      cy = 86;
      rot = -30 * flip;
      break;
    case "flop":
      cx = sx - 5 * flip;
      cy = 90;
      rot = 5 * flip;
      break;
  }
  return <ellipse className={`tuu-arm tuu-arm-${side}`} cx={cx} cy={cy} rx={7} ry={11} transform={`rotate(${rot} ${cx} ${cy})`} {...common} />;
}

/* ---------- Efek ---------- */

function Star({ x, y, s = 1, className }: { x: number; y: number; s?: number; className?: string }) {
  return (
    // Posisi di grup luar, animasi CSS di path dalam, agar animasi tidak menimpa posisi.
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path
        className={className}
        d="M0 -8 L2.2 -2.2 L8 0 L2.2 2.2 L0 8 L-2.2 2.2 L-8 0 L-2.2 -2.2 Z"
        fill="var(--pop, #ffb547)"
        stroke={INK}
        strokeWidth={1.4}
        strokeLinejoin="round"
      />
    </g>
  );
}

function Heart({ x, y, s = 1, className }: { x: number; y: number; s?: number; className?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path className={className} d="M0 6 C-9 0 -7 -8 0 -3 C7 -8 9 0 0 6 Z" fill="#FF4F7B" stroke={INK} strokeWidth={1.5} />
    </g>
  );
}

function Effects({ mood }: { mood: TuuMood }) {
  switch (mood) {
    case "cheer":
    case "proud":
      return (
        <g className="tuu-fx">
          <Star x={14} y={22} s={1.1} className="fx-twinkle" />
          <Star x={126} y={30} s={0.8} className="fx-twinkle fx-d1" />
          <Star x={122} y={104} s={0.7} className="fx-twinkle fx-d2" />
          <Star x={18} y={98} s={0.6} className="fx-twinkle fx-d3" />
        </g>
      );
    case "love":
    case "shy":
      return (
        <g className="tuu-fx">
          <Heart x={118} y={34} className="fx-rise" />
          <Heart x={24} y={40} s={0.7} className="fx-rise fx-d1" />
          {mood === "love" && <Heart x={110} y={60} s={0.6} className="fx-rise fx-d2" />}
        </g>
      );
    case "sleep":
      return (
        <g className="tuu-fx" fill={INK} fontFamily="var(--font-display)" fontWeight={800}>
          <text x={102} y={30} fontSize={14} className="fx-z">z</text>
          <text x={112} y={18} fontSize={18} className="fx-z fx-d1">z</text>
          <text x={124} y={6} fontSize={22} className="fx-z fx-d2">Z</text>
        </g>
      );
    case "listen":
      return (
        <g className="tuu-fx" fill={INK}>
          <g className="fx-rise">
            <circle cx={118} cy={46} r={3.5} />
            <path d="M121 46 V30 L129 28" fill="none" stroke={INK} strokeWidth={2} />
          </g>
          <g className="fx-rise fx-d1">
            <circle cx={12} cy={34} r={3} />
            <path d="M15 34 V22" stroke={INK} strokeWidth={2} />
          </g>
        </g>
      );
    case "think":
      return (
        <g className="tuu-fx">
          <circle cx={108} cy={26} r={2.5} fill={INK} className="fx-pop" />
          <circle cx={116} cy={18} r={3.5} fill={INK} className="fx-pop fx-d1" />
          <text x={120} y={14} fontSize={20} fontWeight={800} fill="var(--pen, #2f6be8)" stroke={INK} strokeWidth={1} className="fx-pop fx-d2" fontFamily="var(--font-display)">
            ?
          </text>
        </g>
      );
    case "surprised":
      return (
        <g className="tuu-fx">
          <text x={112} y={30} fontSize={28} fontWeight={900} fill="var(--pop, #ffb547)" stroke={INK} strokeWidth={1.5} className="fx-pop" fontFamily="var(--font-display)">
            !
          </text>
        </g>
      );
    case "sad":
    case "nervous":
      return (
        <path className="tuu-fx fx-drip" d="M108 36 Q114 46 108 50 Q102 46 108 36 Z" fill="#7CC8FF" stroke={INK} strokeWidth={2} />
      );
    case "dizzy":
      return (
        <g className="tuu-fx fx-orbit">
          <Star x={42} y={8} s={0.55} />
          <Star x={98} y={8} s={0.55} />
          <Star x={70} y={2} s={0.5} />
        </g>
      );
    case "read":
      return (
        <g className="tuu-book">
          <path d="M50 88 L70 92 L90 88 L90 104 L70 108 L50 104 Z" fill="var(--pen, #2f6be8)" stroke={INK} strokeWidth={3} strokeLinejoin="round" />
          <path d="M70 92 V108" stroke={INK} strokeWidth={2} />
          <path d="M55 93 L66 95 M55 98 L66 100 M74 95 L85 93 M74 100 L85 98" stroke="#fff" strokeWidth={1.6} strokeLinecap="round" />
        </g>
      );
    case "focus":
      return (
        <g className="tuu-band">
          <path d="M33 34 Q70 24 107 34 L107 41 Q70 31 33 41 Z" fill="var(--pen, #2f6be8)" stroke={INK} strokeWidth={2.5} strokeLinejoin="round" />
          <circle cx={70} cy={32} r={4} fill="#fff" stroke={INK} strokeWidth={1.5} />
          <path d="M107 36 L120 30 M107 38 L119 42" stroke={INK} strokeWidth={3} strokeLinecap="round" />
        </g>
      );
    default:
      return null;
  }
}

export function TuuSprite({ mood, size = 96 }: { mood: TuuMood; size?: number }) {
  const arms = ARMS[mood];
  const blushStrong = mood === "shy" || mood === "love";
  // Pose tangan di depan wajah/badan digambar setelah badan agar tidak tertutup.
  const front = arms === "cheeks" || arms === "chin" || arms === "book";
  return (
    <svg className="tuu-sprite" data-mood={mood} width={size} height={size} viewBox="0 0 140 140" aria-hidden overflow="visible">
      <ellipse className="tuu-shadow" cx={70} cy={130} rx={30} ry={5} fill={INK} opacity={0.16} />
      <g className="tuu-body">
        {/* Rambut berujung bintang */}
        <g className="tuu-antenna">
          <path d="M70 22 C66 8 80 2 84 12" fill="none" stroke={INK} strokeWidth={4} strokeLinecap="round" />
          <Star x={87} y={10} s={0.95} className="tuu-antenna-star" />
        </g>
        {!front && (
          <>
            <Arm side="l" pose={arms} />
            <Arm side="r" pose={arms} />
          </>
        )}
        {/* Badan balon kata */}
        <path
          d="M32 42 Q32 22 52 22 H88 Q108 22 108 42 V78 Q108 100 88 100 H64 L50 115 L52 100 Q32 100 32 78 Z"
          fill={BODY}
          stroke={INK}
          strokeWidth={4.5}
          strokeLinejoin="round"
        />
        {/* Kilap */}
        <path d="M42 36 Q44 29 52 28" fill="none" stroke="#fff" strokeWidth={4} strokeLinecap="round" opacity={0.9} />
        {/* Syal sesuai warna dunia bahasa */}
        <g className="tuu-scarf">
          <path d="M34 82 Q70 94 106 82 L106 90 Q70 102 34 90 Z" fill="var(--pen, #2f6be8)" stroke={INK} strokeWidth={3} strokeLinejoin="round" />
          <path className="tuu-scarf-tail" d="M90 90 L99 108 L88 105 Z" fill="var(--pen, #2f6be8)" stroke={INK} strokeWidth={3} strokeLinejoin="round" />
        </g>
        {/* Pipi */}
        <ellipse cx={46} cy={70} rx={6.5} ry={3.8} fill={BLUSH} opacity={blushStrong ? 0.95 : 0.6} className="tuu-cheek" />
        <ellipse cx={94} cy={70} rx={6.5} ry={3.8} fill={BLUSH} opacity={blushStrong ? 0.95 : 0.6} className="tuu-cheek" />
        {blushStrong && (
          <g stroke={BLUSH} strokeWidth={1.6} strokeLinecap="round">
            <path d="M42 67 l-2 4 M46 67 l-2 4 M50 67 l-2 4" />
            <path d="M90 67 l-2 4 M94 67 l-2 4 M98 67 l-2 4" />
          </g>
        )}
        {/* Mata: grup luar untuk arah pandang, grup dalam untuk kedipan */}
        <g className="tuu-look">
          <g className="tuu-blink">
            <Eye cx={56} mood={mood} side="l" />
            <Eye cx={84} mood={mood} side="r" />
          </g>
        </g>
        <Mouth mood={mood} />
        {mood === "read" || mood === "focus" ? <Effects mood={mood} /> : null}
        {front && (
          <>
            <Arm side="l" pose={arms} />
            <Arm side="r" pose={arms} />
          </>
        )}
      </g>
      {mood !== "read" && mood !== "focus" && <Effects mood={mood} />}
    </svg>
  );
}
