import type { ReactNode } from "react";
import type { AnimeTheme } from "@/data/themes";

/**
 * Pemandangan anime berlapis dalam SVG: langit bergradasi, matahari/bulan,
 * awan, lalu lapisan jauh, tengah (landmark), dan dekat. Setiap lapisan diberi
 * kelas agar bisa digeser pelan (parallax) oleh CSS.
 */

const W = 1440;
const H = 600;

function rng(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

/* ---------- Bentuk dasar ---------- */

function hills(y: number, amp: number, seed: number, segs = 6) {
  const r = rng(seed);
  const step = W / segs;
  let d = `M0 ${H} L0 ${y}`;
  let prevY = y;
  for (let i = 1; i <= segs; i++) {
    const x = i * step;
    const ny = y + (r() - 0.5) * amp;
    d += ` C ${x - step * 0.65} ${prevY - amp * 0.25}, ${x - step * 0.35} ${ny - amp * 0.25}, ${x} ${ny}`;
    prevY = ny;
  }
  return `${d} L${W} ${H} Z`;
}

function mountain(cx: number, peakY: number, half: number, baseY = H) {
  return `M${cx - half} ${baseY} L${cx - half * 0.12} ${peakY + 18} Q${cx} ${peakY - 6} ${cx + half * 0.12} ${peakY + 18} L${cx + half} ${baseY} Z`;
}

function buildings(x0: number, x1: number, base: number, minH: number, maxH: number, seed: number, fill: string, windows?: string) {
  const r = rng(seed);
  const out: ReactNode[] = [];
  let x = x0;
  let k = 0;
  while (x < x1) {
    const w = 34 + r() * 56;
    const h = minH + r() * (maxH - minH);
    out.push(<rect key={`b${k}`} x={x} y={base - h} width={w + 1} height={h + 1} fill={fill} />);
    if (windows) {
      for (let wy = base - h + 12; wy < base - 14; wy += 18) {
        for (let wx = x + 7; wx < x + w - 8; wx += 13) {
          if (r() > 0.62) out.push(<rect key={`w${k}-${wx}-${wy}`} x={wx} y={wy} width={5} height={7} fill={windows} opacity={0.55 + r() * 0.45} />);
        }
      }
    }
    x += w + 2 + r() * 6;
    k++;
  }
  return out;
}

function pine(x: number, base: number, h: number, fill: string, snow?: string, key?: string) {
  const w = h * 0.42;
  return (
    <g key={key}>
      <rect x={x - 3} y={base - h * 0.15} width={6} height={h * 0.15} fill={fill} />
      <path d={`M${x} ${base - h} L${x - w * 0.55} ${base - h * 0.55} L${x - w * 0.3} ${base - h * 0.55} L${x - w} ${base - h * 0.12} L${x + w} ${base - h * 0.12} L${x + w * 0.3} ${base - h * 0.55} L${x + w * 0.55} ${base - h * 0.55} Z`} fill={fill} />
      {snow && <path d={`M${x} ${base - h} L${x - w * 0.3} ${base - h * 0.72} L${x + w * 0.3} ${base - h * 0.72} Z`} fill={snow} />}
    </g>
  );
}

function palm(x: number, base: number, h: number, fill: string, lean = 1, key?: string) {
  const topX = x + lean * h * 0.18;
  const topY = base - h;
  const leaves = [-150, -115, -70, -30, 10, 45].map((a, i) => {
    const rad = (a * Math.PI) / 180;
    const len = h * 0.42;
    const ex = topX + Math.cos(rad) * len;
    const ey = topY + Math.sin(rad) * len * 0.55 + len * 0.25;
    const mx = topX + Math.cos(rad) * len * 0.5;
    const my = topY + Math.sin(rad) * len * 0.5 - 18;
    return <path key={i} d={`M${topX} ${topY} Q${mx} ${my} ${ex} ${ey} Q${mx} ${my + 14} ${topX} ${topY + 4} Z`} fill={fill} />;
  });
  return (
    <g key={key}>
      <path d={`M${x - 5} ${base} Q${x + lean * h * 0.05} ${base - h * 0.5} ${topX - 3} ${topY} L${topX + 3} ${topY} Q${x + lean * h * 0.08 + 6} ${base - h * 0.5} ${x + 6} ${base} Z`} fill={fill} />
      {leaves}
    </g>
  );
}

/**
 * Kubah bawang. Ujungnya `cross` untuk gereja Ortodoks (Rusia), atau `spire`:
 * menara runcing dengan bola dan bulan sabit, seperti puncak kubah Taj Mahal.
 */
function onion(cx: number, base: number, w: number, h: number, fill: string, key?: string, finial: "cross" | "spire" = "cross") {
  const hw = w / 2;
  const top = base - h;
  return (
    <g key={key}>
      <path
        d={`M${cx - hw} ${base} C${cx - hw * 1.25} ${base - h * 0.45}, ${cx - hw * 0.15} ${base - h * 0.62}, ${cx} ${top} C${cx + hw * 0.15} ${base - h * 0.62}, ${cx + hw * 1.25} ${base - h * 0.45}, ${cx + hw} ${base} Z`}
        fill={fill}
      />
      {finial === "cross" ? (
        <>
          <rect x={cx - 1.5} y={top - 22} width={3} height={24} fill={fill} />
          <rect x={cx - 8} y={top - 16} width={16} height={3} fill={fill} />
        </>
      ) : (
        <>
          <path d={`M${cx - 2.5} ${top + 2} L${cx} ${top - 20} L${cx + 2.5} ${top + 2} Z`} fill={fill} />
          <circle cx={cx} cy={top - 7} r={3.2} fill={fill} />
          <path d={`M${cx - 5} ${top - 26} A5.5 5.5 0 0 0 ${cx + 5} ${top - 26} A4 4 0 0 1 ${cx - 5} ${top - 26} Z`} fill={fill} />
        </>
      )}
    </g>
  );
}

function dome(cx: number, base: number, r: number, fill: string, key?: string) {
  return (
    <g key={key}>
      <path d={`M${cx - r} ${base} A${r} ${r * 1.05} 0 0 1 ${cx + r} ${base} Z`} fill={fill} />
      <rect x={cx - 2} y={base - r * 1.05 - 26} width={4} height={28} fill={fill} />
      <circle cx={cx} cy={base - r * 1.05 - 30} r={6} fill={fill} />
    </g>
  );
}

function cloud(x: number, y: number, s: number, fill: string, op: number, key: string) {
  return (
    <g key={key} transform={`translate(${x} ${y}) scale(${s})`} opacity={op}>
      <ellipse cx={0} cy={0} rx={90} ry={34} fill={fill} />
      <ellipse cx={-50} cy={-14} rx={46} ry={34} fill={fill} />
      <ellipse cx={30} cy={-34} rx={60} ry={50} fill={fill} />
      <ellipse cx={86} cy={-6} rx={46} ry={30} fill={fill} />
    </g>
  );
}

function powerLines(fill: string) {
  const poles = [180, 560, 940, 1320];
  return (
    <g>
      {poles.map((x) => (
        <g key={x}>
          <rect x={x - 4} y={300} width={8} height={300} fill={fill} />
          <rect x={x - 34} y={318} width={68} height={6} fill={fill} />
          <rect x={x - 26} y={346} width={52} height={5} fill={fill} />
        </g>
      ))}
      {[320, 348].map((y) =>
        [0, 1, 2].map((i) => (
          <path key={`${y}-${i}`} d={`M${poles[i] + (y === 320 ? 30 : 22)} ${y} Q${(poles[i] + poles[i + 1]) / 2} ${y + 46} ${poles[i + 1] - (y === 320 ? 30 : 22)} ${y}`} stroke={fill} strokeWidth={2} fill="none" />
        )),
      )}
    </g>
  );
}

/* ---------- Pemandangan per tema ---------- */

interface Layers {
  far: ReactNode;
  mid: ReactNode;
  near: ReactNode;
}

function sceneLayers(t: AnimeTheme): Layers {
  const { far, mid, near, accent, pop } = t;
  switch (t.scene) {
    case "london":
      return {
        far: <g>{buildings(0, W, 520, 60, 150, 7, far)}</g>,
        mid: (
          <g>
            {/* Menara jam */}
            <rect x={1050} y={210} width={64} height={390} fill={mid} />
            <rect x={1040} y={250} width={84} height={70} fill={mid} />
            <path d={`M1040 210 L1082 110 L1124 210 Z`} fill={mid} />
            <rect x={1079} y={86} width={6} height={28} fill={mid} />
            <circle cx={1082} cy={285} r={22} fill={pop} opacity={0.9} />
            <circle cx={1082} cy={285} r={2.5} fill={mid} />
            {/* Jembatan */}
            {[300, 640].map((x) => (
              <g key={x}>
                <rect x={x - 30} y={300} width={60} height={300} fill={mid} />
                <path d={`M${x - 34} 300 L${x} 248 L${x + 34} 300 Z`} fill={mid} />
              </g>
            ))}
            <rect x={120} y={452} width={720} height={18} fill={mid} />
            <path d="M330 320 Q470 450 610 320" stroke={mid} strokeWidth={6} fill="none" />
            <path d="M120 450 Q200 360 270 320" stroke={mid} strokeWidth={6} fill="none" />
            <path d="M670 320 Q760 380 840 450" stroke={mid} strokeWidth={6} fill="none" />
          </g>
        ),
        near: (
          <g>
            <rect x={0} y={530} width={W} height={70} fill={near} />
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <rect key={i} x={80 + i * 230} y={548 + (i % 2) * 14} width={90} height={3} fill={pop} opacity={0.35} />
            ))}
          </g>
        ),
      };
    case "sakura":
      return {
        far: (
          <g>
            <path d={mountain(720, 150, 420)} fill={far} />
            <path d="M664 186 Q720 150 776 186 L748 210 L730 196 L712 214 L690 198 Z" fill="#FFF6FA" opacity={0.95} />
            <path d={hills(470, 60, 11)} fill={far} opacity={0.8} />
          </g>
        ),
        mid: (
          <g>
            {/* Pagoda lima tingkat */}
            {[0, 1, 2, 3, 4].map((i) => {
              const y = 520 - i * 52;
              const w = 150 - i * 20;
              return (
                <g key={i}>
                  <rect x={260 - w * 0.3} y={y - 40} width={w * 0.6} height={42} fill={mid} />
                  <path d={`M${260 - w / 2 - 18} ${y - 34} Q${260 - w / 2} ${y - 40} ${260 - w * 0.3} ${y - 56} L${260 + w * 0.3} ${y - 56} Q${260 + w / 2} ${y - 40} ${260 + w / 2 + 18} ${y - 34} Z`} fill={mid} />
                </g>
              );
            })}
            <rect x={258} y={210} width={4} height={60} fill={mid} />
            {/* Pohon sakura */}
            {[[120, 470, 70], [430, 480, 60], [620, 500, 55], [1320, 470, 80]].map(([x, y, r], i) => (
              <g key={i}>
                <rect x={x - 5} y={y} width={10} height={130} fill={mid} />
                <circle cx={x} cy={y - 10} r={r} fill={pop} opacity={0.9} />
                <circle cx={x - r * 0.6} cy={y + 10} r={r * 0.6} fill={pop} opacity={0.8} />
                <circle cx={x + r * 0.6} cy={y + 6} r={r * 0.65} fill={pop} opacity={0.85} />
              </g>
            ))}
          </g>
        ),
        near: (
          <g>
            <path d={hills(560, 20, 3)} fill={near} />
            {/* Torii */}
            <rect x={990} y={330} width={24} height={270} fill={accent} />
            <rect x={1166} y={330} width={24} height={270} fill={accent} />
            <rect x={960} y={372} width={260} height={18} fill={accent} />
            <path d="M920 312 Q1090 336 1260 312 L1254 300 Q1090 318 926 300 Z" fill={near} />
            <path d="M932 330 Q1090 346 1248 330 L1248 316 Q1090 334 932 316 Z" fill={accent} />
            <rect x={1080} y={340} width={20} height={34} fill={accent} />
          </g>
        ),
      };
    case "seoul":
      return {
        far: (
          <g>
            <path d={hills(380, 120, 21, 5)} fill={far} />
          </g>
        ),
        mid: (
          <g>
            <path d="M880 600 L880 420 Q1060 300 1260 420 L1260 600 Z" fill={mid} />
            <rect x={1064} y={180} width={14} height={180} fill={mid} />
            <ellipse cx={1071} cy={220} rx={34} ry={14} fill={mid} />
            <rect x={1069} y={110} width={4} height={74} fill={mid} />
            <circle cx={1071} cy={108} r={4} fill={pop} />
            {[1060, 1072, 1084].map((x) => (
              <rect key={x} x={x - 10} y={216} width={6} height={4} fill={pop} opacity={0.9} />
            ))}
            {buildings(0, 860, 600, 120, 260, 5, mid, "#FFE08A")}
          </g>
        ),
        near: <g>{buildings(0, W, 600, 40, 120, 9, near, "#FFD36B")}</g>,
      };
    case "lantern":
      return {
        far: <path d={hills(400, 140, 31, 5)} fill={far} />,
        mid: (
          <g>
            {[0, 1, 2, 3].map((i) => {
              const y = 560 - i * 70;
              const w = 260 - i * 46;
              return (
                <g key={i}>
                  <rect x={720 - w * 0.32} y={y - 56} width={w * 0.64} height={58} fill={mid} />
                  <path d={`M${720 - w / 2 - 30} ${y - 46} Q${720 - w / 2} ${y - 52} ${720 - w * 0.32} ${y - 76} L${720 + w * 0.32} ${y - 76} Q${720 + w / 2} ${y - 52} ${720 + w / 2 + 30} ${y - 46} Z`} fill={mid} />
                  {[-1, 0, 1].map((k) => (
                    <rect key={k} x={720 + k * w * 0.18 - 6} y={y - 40} width={12} height={20} rx={5} fill={pop} opacity={0.85} />
                  ))}
                </g>
              );
            })}
            <rect x={717} y={240} width={6} height={50} fill={mid} />
          </g>
        ),
        near: (
          <g>
            {[0, 1, 2, 3, 4, 5].map((i) => {
              const x = i * 260 - 40;
              const y = 520 + (i % 2) * 20;
              return <path key={i} d={`M${x} ${y} Q${x + 20} ${y - 4} ${x + 30} ${y - 26} L${x + 210} ${y - 26} Q${x + 220} ${y - 4} ${x + 240} ${y} L${x + 240} 600 L${x} 600 Z`} fill={near} />;
            })}
          </g>
        ),
      };
    case "desert":
      return {
        far: <path d={hills(470, 70, 41, 4)} fill={far} />,
        mid: (
          <g>
            <rect x={640} y={430} width={240} height={170} fill={mid} />
            {dome(760, 432, 96, mid)}
            {dome(668, 432, 34, mid)}
            {dome(852, 432, 34, mid)}
            {[580, 940].map((x) => (
              <g key={x}>
                <rect x={x - 12} y={250} width={24} height={350} fill={mid} />
                <rect x={x - 18} y={330} width={36} height={8} fill={mid} />
                {dome(x, 252, 14, mid)}
              </g>
            ))}
            <path d="M730 600 L730 520 A30 30 0 0 1 790 520 L790 600 Z" fill={pop} opacity={0.55} />
            {[676, 844].map((x) => (
              <path key={x} d={`M${x - 12} 520 L${x - 12} 494 A12 12 0 0 1 ${x + 12} 494 L${x + 12} 520 Z`} fill={pop} opacity={0.5} />
            ))}
          </g>
        ),
        near: <path d={hills(545, 50, 47, 3)} fill={near} />,
      };
    case "castle":
      return {
        far: (
          <g>
            <path d={mountain(300, 180, 360)} fill={far} />
            <path d={mountain(1240, 160, 380)} fill={far} />
          </g>
        ),
        mid: (
          <g>
            <path d="M700 600 Q860 380 1060 420 Q1200 450 1300 600 Z" fill={mid} />
            <rect x={900} y={290} width={150} height={150} fill={mid} />
            {[[880, 250, 40], [990, 200, 46], [1070, 260, 36], [940, 300, 30]].map(([x, y, w], i) => (
              <g key={i}>
                <rect x={x} y={y} width={w} height={460 - y} fill={mid} />
                <path d={`M${x - 6} ${y} L${x + w / 2} ${y - w * 1.5} L${x + w + 6} ${y} Z`} fill={accent} />
                <rect x={x + w / 2 - 1} y={y - w * 1.5 - 24} width={2} height={24} fill={mid} />
                <path d={`M${x + w / 2 + 1} ${y - w * 1.5 - 24} l18 6 l-18 6 Z`} fill={pop} />
              </g>
            ))}
            {[[930, 340], [1005, 300], [1005, 360]].map(([x, y], i) => (
              <rect key={i} x={x} y={y} width={10} height={18} rx={5} fill={pop} opacity={0.8} />
            ))}
          </g>
        ),
        near: (
          <g>
            <path d={hills(560, 30, 51)} fill={near} />
            {Array.from({ length: 22 }, (_, i) => pine(i * 70 + (i % 3) * 12, 600, 120 + (i % 4) * 26, near, undefined, `p${i}`))}
          </g>
        ),
      };
    case "paris":
      return {
        far: <g>{buildings(0, W, 500, 50, 120, 61, far)}</g>,
        mid: (
          <g>
            <path
              fillRule="evenodd"
              d="M980 600 L1036 430 L1030 430 L1048 290 L1062 150 L1070 150 L1084 290 L1102 430 L1096 430 L1152 600 Z M1020 600 Q1066 500 1112 600 Z"
              fill={mid}
            />
            <rect x={1024} y={424} width={84} height={10} fill={mid} />
            <rect x={1044} y={286} width={44} height={8} fill={mid} />
            <rect x={1064} y={108} width={4} height={44} fill={mid} />
          </g>
        ),
        near: (
          <g>
            {Array.from({ length: 9 }, (_, i) => {
              const x = i * 170 - 20;
              const top = 470 + (i % 3) * 18;
              return (
                <g key={i}>
                  <rect x={x} y={top} width={164} height={600 - top} fill={near} />
                  <path d={`M${x - 6} ${top} L${x + 18} ${top - 40} L${x + 146} ${top - 40} L${x + 170} ${top} Z`} fill={near} />
                  <rect x={x + 30} y={top - 64} width={14} height={30} fill={near} />
                  <rect x={x + 110} y={top - 58} width={12} height={24} fill={near} />
                  {[0, 1, 2].map((k) => (
                    <rect key={k} x={x + 26 + k * 46} y={top + 24} width={18} height={26} rx={9} fill={pop} opacity={0.35} />
                  ))}
                </g>
              );
            })}
          </g>
        ),
      };
    case "windmill":
      return {
        far: <path d={hills(430, 90, 71, 4)} fill={far} />,
        mid: (
          <g>
            <path d={hills(500, 60, 73, 3)} fill={mid} />
            {[[300, 480, 1], [760, 430, 1.25], [1160, 470, 0.95]].map(([x, y, s], i) => (
              <g key={i} transform={`translate(${x} ${y}) scale(${s})`}>
                <path d="M-34 60 L-22 -70 L22 -70 L34 60 Z" fill={mid} />
                <path d="M-28 -70 L0 -100 L28 -70 Z" fill={mid} />
                <rect x={-8} y={10} width={16} height={30} rx={8} fill={pop} opacity={0.5} />
                <g className="spin" style={{ animationDuration: `${8 + i * 3}s` }}>
                  {[0, 90, 180, 270].map((a) => (
                    <g key={a} transform={`rotate(${a})`}>
                      <rect x={-3} y={-150} width={6} height={150} fill={mid} />
                      <rect x={3} y={-140} width={22} height={100} fill={mid} opacity={0.75} />
                    </g>
                  ))}
                  <circle r={9} fill={mid} />
                </g>
              </g>
            ))}
          </g>
        ),
        near: (
          <g>
            <path d={hills(560, 30, 79)} fill={near} />
            {Array.from({ length: 12 }, (_, i) => (
              <ellipse key={i} cx={60 + i * 125} cy={560 - (i % 2) * 10} rx={36} ry={22} fill={near} />
            ))}
          </g>
        ),
      };
    case "winter":
      return {
        far: <path d={hills(440, 80, 81, 4)} fill="#F4F8FF" opacity={0.85} />,
        mid: (
          <g>
            <rect x={600} y={400} width={240} height={200} fill={mid} />
            <rect x={690} y={300} width={60} height={110} fill={mid} />
            {onion(720, 300, 80, 110, accent)}
            <rect x={612} y={340} width={36} height={70} fill={mid} />
            {onion(630, 342, 50, 70, pop)}
            <rect x={792} y={340} width={36} height={70} fill={mid} />
            {onion(810, 342, 50, 70, "#3BB273")}
            {onion(560, 420, 44, 62, "#F2C14E")}
            <rect x={544} y={420} width={32} height={180} fill={mid} />
            {onion(880, 420, 44, 62, "#7A5AF8")}
            <rect x={864} y={420} width={32} height={180} fill={mid} />
          </g>
        ),
        near: (
          <g>
            <path d={hills(540, 40, 87)} fill="#FFFFFF" />
            {Array.from({ length: 10 }, (_, i) => pine(i < 5 ? 40 + i * 90 : 1000 + (i - 5) * 95, 600, 140 + (i % 3) * 30, near, "#FFFFFF", `s${i}`))}
          </g>
        ),
      };
    case "venice":
      return {
        far: <g>{buildings(0, W, 470, 80, 170, 91, far)}</g>,
        mid: (
          <g>
            <rect x={1150} y={140} width={70} height={340} fill={mid} />
            <path d="M1142 140 L1185 60 L1228 140 Z" fill={mid} />
            <rect x={1146} y={180} width={78} height={40} fill={mid} />
            {[0, 1, 2].map((k) => (
              <path key={k} d={`M${1160 + k * 18} 214 L${1160 + k * 18} 196 A7 7 0 0 1 ${1174 + k * 18} 196 L${1174 + k * 18} 214 Z`} fill={pop} opacity={0.6} />
            ))}
            <path
              fillRule="evenodd"
              d={`M360 480 L360 330 L980 330 L980 480 Z ${Array.from({ length: 10 }, (_, k) => {
                const x = 392 + k * 58;
                return `M${x} 480 L${x} 420 A20 20 0 0 1 ${x + 40} 420 L${x + 40} 480 Z`;
              }).join(" ")}`}
              fill={mid}
            />
            <rect x={350} y={320} width={640} height={14} fill={mid} />
          </g>
        ),
        near: (
          <g>
            <rect x={0} y={480} width={W} height={120} fill={near} opacity={0.85} />
            {Array.from({ length: 14 }, (_, i) => (
              <rect key={i} x={40 + i * 100 + (i % 3) * 14} y={500 + (i % 4) * 22} width={60 + (i % 2) * 30} height={3} rx={2} fill="#FFFFFF" opacity={0.4} />
            ))}
            <path d="M200 540 Q380 560 560 520 L556 530 Q380 576 196 548 Z" fill="#1A1010" />
            <rect x={470} y={470} width={5} height={60} fill="#1A1010" />
            <circle cx={472} cy={462} r={9} fill="#1A1010" />
          </g>
        ),
      };
    case "temple":
      return {
        far: <path d={hills(450, 80, 101, 4)} fill={far} />,
        mid: (
          <g>
            {[[720, 1], [520, 0.62], [920, 0.62]].map(([cx, s], i) => (
              <g key={i} transform={`translate(${cx} 600) scale(${s})`}>
                <rect x={-120} y={-120} width={240} height={120} fill={mid} />
                {Array.from({ length: 8 }, (_, k) => {
                  const w = 150 - k * 17;
                  const y = -120 - k * 38;
                  return <path key={k} d={`M${-w / 2} ${y} Q0 ${y - 54} ${w / 2} ${y} Z`} fill={mid} />;
                })}
                <rect x={-3} y={-470} width={6} height={60} fill={mid} />
                <rect x={-18} y={-96} width={36} height={60} rx={18} fill={pop} opacity={0.35} />
              </g>
            ))}
          </g>
        ),
        near: (
          <g>
            <path d={hills(570, 20, 107)} fill={near} />
            {palm(110, 600, 300, near, 1, "a")}
            {palm(230, 600, 230, near, -1, "b")}
            {palm(1240, 600, 280, near, -1, "c")}
            {palm(1350, 600, 220, near, 1, "d")}
          </g>
        ),
      };
    case "holi":
      return {
        far: <path d={hills(460, 80, 111, 4)} fill={far} />,
        mid: (
          <g>
            <rect x={560} y={420} width={320} height={180} fill="#FFF3F8" />
            <path d="M690 600 L690 500 A30 34 0 0 1 750 500 L750 600 Z" fill={mid} opacity={0.5} />
            {onion(720, 420, 150, 170, "#FFF3F8", undefined, "spire")}
            {onion(610, 420, 56, 64, "#FFF3F8", undefined, "spire")}
            {onion(830, 420, 56, 64, "#FFF3F8", undefined, "spire")}
            {[500, 940].map((x) => (
              <g key={x}>
                <rect x={x - 11} y={300} width={22} height={300} fill="#FFF3F8" />
                {onion(x, 302, 30, 38, "#FFF3F8", undefined, "spire")}
              </g>
            ))}
          </g>
        ),
        near: (
          <g>
            <path d={hills(568, 24, 117)} fill={near} />
            {palm(140, 600, 280, near, 1, "a")}
            {palm(1300, 600, 300, near, -1, "b")}
          </g>
        ),
      };
    default:
      return {
        far: <path d={hills(430, 100, 121, 4)} fill={far} />,
        mid: (
          <g>
            <path d={hills(500, 60, 123, 5)} fill={mid} />
            {buildings(860, 1440, 520, 30, 70, 125, mid, "#FFF4D6")}
          </g>
        ),
        near: (
          <g>
            <path d={hills(560, 36, 127, 4)} fill={near} />
            {powerLines(near)}
          </g>
        ),
      };
  }
}

export function Scene({ theme, className, compact = false, id }: { theme: AnimeTheme; className?: string; compact?: boolean; id?: string }) {
  const uid = id ?? theme.id;
  const r = rng(theme.id.length * 97 + 13);
  const stars = theme.night
    ? Array.from({ length: 36 }, (_, i) => (
        // Hanya sebagian bintang yang berkedip: animasi SVG mahal di perangkat lemah.
        <circle key={i} cx={r() * W} cy={r() * H * 0.55} r={0.6 + r() * 1.6} fill="#FFFFFF" className={i % 3 === 0 ? "twinkle" : undefined} style={i % 3 === 0 ? { animationDelay: `${(r() * 4).toFixed(2)}s` } : undefined} />
      ))
    : null;
  const L = sceneLayers(theme);
  const sunX = theme.scene === "desert" ? 1160 : theme.night ? 260 : 300;
  const sunY = theme.night ? 120 : theme.scene === "sky" ? 150 : 210;
  const cloudFill = theme.night ? "#FFFFFF" : "#FFFFFF";
  const cloudOp = theme.night ? 0.12 : 0.85;

  return (
    <svg className={className} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio={compact ? "xMidYMid slice" : "xMidYMax slice"} aria-hidden focusable="false">
      <defs>
        <linearGradient id={`sky-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={theme.sky[0]} />
          <stop offset="0.58" stopColor={theme.sky[1]} />
          <stop offset="1" stopColor={theme.sky[2]} />
        </linearGradient>
        <radialGradient id={`glow-${uid}`}>
          <stop offset="0" stopColor={theme.sun} stopOpacity="0.9" />
          <stop offset="0.35" stopColor={theme.sun} stopOpacity="0.35" />
          <stop offset="1" stopColor={theme.sun} stopOpacity="0" />
        </radialGradient>
        <mask id={`moon-${uid}`}>
          <rect width={W} height={H} fill="#fff" />
          <circle cx={sunX + 22} cy={sunY - 10} r={44} fill="#000" />
        </mask>
      </defs>
      <rect width={W} height={H} fill={`url(#sky-${uid})`} />
      {stars}
      <g className="layer layer-sun">
        <circle cx={sunX} cy={sunY} r={compact ? 160 : 220} fill={`url(#glow-${uid})`} />
        {theme.scene === "desert" ? (
          <circle cx={sunX} cy={sunY} r={48} fill={theme.sun} mask={`url(#moon-${uid})`} />
        ) : (
          <circle cx={sunX} cy={sunY} r={theme.night ? 34 : 56} fill={theme.sun} />
        )}
      </g>
      <g className="layer layer-clouds">
        <g className="drift">
          {cloud(980, 130, 1.1, cloudFill, cloudOp, "c1")}
          {cloud(520, 90, 0.7, cloudFill, cloudOp * 0.8, "c2")}
          {cloud(1300, 230, 0.6, cloudFill, cloudOp * 0.7, "c3")}
          {cloud(160, 250, 0.55, cloudFill, cloudOp * 0.6, "c4")}
        </g>
      </g>
      <g className="layer layer-far">{L.far}</g>
      <g className="layer layer-mid">{L.mid}</g>
      <g className="layer layer-near">{L.near}</g>
    </svg>
  );
}
