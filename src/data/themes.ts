/**
 * Tema anime per bahasa. Setiap tema punya langit, pemandangan siluet, dan
 * partikel sendiri. Semua ilustrasi digambar sebagai SVG orisinal, bukan
 * karakter atau adegan dari anime tertentu.
 */

export type SceneKind =
  | "sky"
  | "london"
  | "sakura"
  | "seoul"
  | "lantern"
  | "desert"
  | "castle"
  | "paris"
  | "windmill"
  | "winter"
  | "venice"
  | "temple"
  | "holi";

export type ParticleKind =
  | "cloud"
  | "rain"
  | "petal"
  | "firefly"
  | "lantern"
  | "star"
  | "leaf"
  | "bubble"
  | "confetti"
  | "snow"
  | "sparkle"
  | "lotus"
  | "powder";

export interface AnimeTheme {
  id: string;
  name: string;
  mood: string;
  scene: SceneKind;
  particle: ParticleKind;
  night: boolean;
  /** Gradasi langit dari atas ke bawah. */
  sky: [string, string, string];
  /** Matahari atau bulan. */
  sun: string;
  /** Lapisan jauh, tengah, dan dekat. */
  far: string;
  mid: string;
  near: string;
  /** Warna aksen untuk tombol dan tautan (terang dan gelap). */
  accent: string;
  accentDark: string;
  /** Warna kedua untuk sorotan dan badge. */
  pop: string;
}

export const themes: Record<string, AnimeTheme> = {
  default: {
    id: "default",
    name: "Langit Tutur",
    mood: "Langit musim panas yang luas, awan tinggi, dan cahaya sore.",
    scene: "sky",
    particle: "cloud",
    night: false,
    sky: ["#4FA6F0", "#9CD3FA", "#FFE8C8"],
    sun: "#FFF4D6",
    far: "#8DB8E8",
    mid: "#5F8FD0",
    near: "#2D4F8E",
    accent: "#2F6BE8",
    accentDark: "#8DB4FF",
    pop: "#FFB547",
  },
  inggris: {
    id: "inggris",
    name: "Senja London",
    mood: "Gerimis tipis di atas sungai saat lampu kota mulai menyala.",
    scene: "london",
    particle: "rain",
    night: false,
    sky: ["#3E3B7A", "#9A78B8", "#F7B89A"],
    sun: "#FFD7B0",
    far: "#7C6AA8",
    mid: "#4B3F7C",
    near: "#221B45",
    accent: "#5B47D6",
    accentDark: "#B3A6FF",
    pop: "#FF9F7A",
  },
  jepang: {
    id: "jepang",
    name: "Sakura Senja",
    mood: "Kelopak sakura berguguran di depan gerbang kuil saat matahari terbenam.",
    scene: "sakura",
    particle: "petal",
    night: false,
    sky: ["#6A7FD8", "#F4A6C4", "#FFD8A8"],
    sun: "#FFF0D0",
    far: "#C18BC0",
    mid: "#8E5A9A",
    near: "#4A2450",
    accent: "#E23C7A",
    accentDark: "#FF8DB8",
    pop: "#FFB0CB",
  },
  korea: {
    id: "korea",
    name: "Malam Seoul",
    mood: "Menara di atas bukit dan jendela kota yang menyala di malam musim panas.",
    scene: "seoul",
    particle: "firefly",
    night: true,
    sky: ["#0E1238", "#2B2A78", "#7A5AC8"],
    sun: "#F4F1FF",
    far: "#33357E",
    mid: "#211F57",
    near: "#100E2E",
    accent: "#6E56F0",
    accentDark: "#A796FF",
    pop: "#5CE1E6",
  },
  mandarin: {
    id: "mandarin",
    name: "Festival Lentera",
    mood: "Ribuan lentera naik ke langit malam di atas atap pagoda.",
    scene: "lantern",
    particle: "lantern",
    night: true,
    sky: ["#2A0A1E", "#7A1C2E", "#E0603A"],
    sun: "#FFE7A3",
    far: "#8A2A33",
    mid: "#5A1424",
    near: "#2A0812",
    accent: "#D7362F",
    accentDark: "#FF7D6B",
    pop: "#FFC447",
  },
  arab: {
    id: "arab",
    name: "Malam Gurun",
    mood: "Bulan sabit dan bintang di atas kubah, bukit pasir berkilau keperakan.",
    scene: "desert",
    particle: "star",
    night: true,
    sky: ["#0D1E46", "#2A5590", "#5FA3B0"],
    sun: "#FFF2C2",
    far: "#3F77A0",
    mid: "#0F2347",
    near: "#081530",
    accent: "#C98A12",
    accentDark: "#F3C24F",
    pop: "#4FD1C5",
  },
  jerman: {
    id: "jerman",
    name: "Kastil Hutan",
    mood: "Kastil di atas bukit hutan pinus, pagi yang segar seperti dunia fantasi.",
    scene: "castle",
    particle: "leaf",
    night: false,
    sky: ["#58B6E8", "#A8E0E8", "#F2F7D8"],
    sun: "#FFFBE0",
    far: "#8CC3A8",
    mid: "#4E8F6E",
    near: "#1F4A38",
    accent: "#1E8C5A",
    accentDark: "#6FDCA4",
    pop: "#F2C14E",
  },
  prancis: {
    id: "prancis",
    name: "Pagi Paris",
    mood: "Atap-atap kota pastel dan menara besi di pagi yang manis.",
    scene: "paris",
    particle: "bubble",
    night: false,
    sky: ["#9AA8F2", "#E3B8F2", "#FFE3EE"],
    sun: "#FFF6FA",
    far: "#C6A6E0",
    mid: "#9C78C8",
    near: "#5B3E86",
    accent: "#9B3FE0",
    accentDark: "#D3A4FF",
    pop: "#FF8FC2",
  },
  spanyol: {
    id: "spanyol",
    name: "Sore Fiesta",
    mood: "Kincir angin berputar di bukit kering saat langit sore menyala jingga.",
    scene: "windmill",
    particle: "confetti",
    night: false,
    sky: ["#F2715A", "#FFA65C", "#FFE08A"],
    sun: "#FFF5C8",
    far: "#E8935C",
    mid: "#B8573A",
    near: "#5E2418",
    accent: "#E0551B",
    accentDark: "#FF9A62",
    pop: "#FFD23F",
  },
  rusia: {
    id: "rusia",
    name: "Musim Dingin",
    mood: "Salju turun pelan di atas kubah bawang yang berwarna-warni.",
    scene: "winter",
    particle: "snow",
    night: false,
    sky: ["#6F95D8", "#B8D2F0", "#EEF5FF"],
    sun: "#FFFFFF",
    far: "#A9C2E2",
    mid: "#6B8CC0",
    near: "#2E4A7A",
    accent: "#2F6FD6",
    accentDark: "#8DB8FF",
    pop: "#E8475F",
  },
  italia: {
    id: "italia",
    name: "Musim Panas Venesia",
    mood: "Air kanal berkilau, lengkungan batu, dan menara lonceng di siang terik.",
    scene: "venice",
    particle: "sparkle",
    night: false,
    sky: ["#2FA6D8", "#7FD6E8", "#FFF0C2"],
    sun: "#FFFBE6",
    far: "#E3B98E",
    mid: "#C27A52",
    near: "#6B3A2A",
    accent: "#0F8F96",
    accentDark: "#5FD8DE",
    pop: "#FF8F5A",
  },
  thai: {
    id: "thai",
    name: "Kuil Emas",
    mood: "Puncak kuil berkilau emas di antara pohon palem saat fajar.",
    scene: "temple",
    particle: "lotus",
    night: false,
    sky: ["#3D7FA8", "#F2B86A", "#FFE6A8"],
    sun: "#FFF2C8",
    far: "#C99A5A",
    mid: "#94642E",
    near: "#3E2A12",
    accent: "#C48600",
    accentDark: "#F7C64A",
    pop: "#F25F9A",
  },
  hindi: {
    id: "hindi",
    name: "Festival Warna",
    mood: "Serbuk warna beterbangan di depan kubah putih saat festival musim semi.",
    scene: "holi",
    particle: "powder",
    night: false,
    sky: ["#B03FA8", "#FF7A6B", "#FFD36B"],
    sun: "#FFF4E0",
    far: "#E08AB8",
    mid: "#A84F8E",
    near: "#4A1846",
    accent: "#D12D8A",
    accentDark: "#FF86C8",
    pop: "#FFB300",
  },
};

export const themeFor = (slug?: string) => (slug && themes[slug]) || themes.default;

/** Variabel CSS untuk membungkus halaman dengan tema bahasa. */
export function themeVars(t: AnimeTheme): React.CSSProperties {
  return {
    "--accent": t.accent,
    "--accent-dark": t.accentDark,
    "--pop": t.pop,
    "--sky-1": t.sky[0],
    "--sky-2": t.sky[1],
    "--sky-3": t.sky[2],
    "--scene-near": t.near,
  } as React.CSSProperties;
}
