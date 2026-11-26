/**
 * Pencarian rekaman penutur asli langsung dari peramban pengunjung.
 *
 * Rekaman berasal dari proyek Lingua Libre di Wikimedia Commons dengan pola
 * nama "LL-Q<bahasa> (<kode>)-<perekam>-<kata>.wav". Untuk setiap bahasa kita
 * mencari perekam paling produktif (sekali, lalu disimpan), kemudian mengecek
 * keberadaan nama file persis untuk kata-kata di halaman, 50 sekaligus.
 * Hasil disimpan di localStorage agar tidak meminta ulang.
 */

const API = "https://commons.wikimedia.org/w/api.php";
const KEY = "tutur:native:v1";
const SPEAKER_TTL = 30 * 86_400_000;
const MISS_TTL = 14 * 86_400_000;

export interface NativeRec {
  url: string;
  page: string;
  artist: string;
  license: string;
}

const META: Record<string, { code: string; qid: string; articles: string[] }> = {
  "en-US": { code: "eng", qid: "Q1860", articles: ["to "] },
  "ja-JP": { code: "jpn", qid: "Q5287", articles: [] },
  "ko-KR": { code: "kor", qid: "Q9176", articles: [] },
  "zh-CN": { code: "cmn", qid: "Q9192", articles: [] },
  "ar-SA": { code: "ara", qid: "Q13955", articles: [] },
  "de-DE": { code: "deu", qid: "Q188", articles: ["der ", "die ", "das "] },
  "fr-FR": { code: "fra", qid: "Q150", articles: ["le ", "la ", "les ", "l'"] },
  "es-ES": { code: "spa", qid: "Q1321", articles: ["el ", "la ", "los ", "las ", "a la "] },
  "ru-RU": { code: "rus", qid: "Q7737", articles: [] },
  "it-IT": { code: "ita", qid: "Q652", articles: ["il ", "lo ", "la ", "i ", "gli ", "le ", "l'", "a "] },
  "th-TH": { code: "tha", qid: "Q9217", articles: [] },
  "hi-IN": { code: "hin", qid: "Q1568", articles: [] },
};

type Entry = NativeRec | { miss: number };
interface LangCache {
  speakers?: string[];
  at?: number;
  words: Record<string, Entry>;
}
type Cache = Record<string, LangCache>;

let cache: Cache | null = null;
const listeners = new Set<() => void>();
const inflight = new Map<string, Promise<void>>();

function load(): Cache {
  if (cache) return cache;
  try {
    cache = JSON.parse(localStorage.getItem(KEY) || "{}") as Cache;
  } catch {
    cache = {};
  }
  return cache;
}

function save() {
  try {
    localStorage.setItem(KEY, JSON.stringify(cache));
  } catch {
    /* penyimpanan penuh: tetap berlaku untuk sesi ini */
  }
  listeners.forEach((l) => l());
}

export function onNativeUpdate(cb: () => void) {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

/** Rekaman yang sudah diketahui untuk teks ini (sinkron, dari cache). */
export function cachedNative(tts: string, text: string): NativeRec | null {
  if (typeof window === "undefined") return null;
  const e = load()[tts]?.words[text];
  return e && "url" in e ? e : null;
}

function variants(tts: string, word: string, note?: string) {
  const first = word.split(" / ")[0].trim();
  const out = [first];
  const low = first.toLowerCase();
  for (const a of META[tts]?.articles ?? []) if (low.startsWith(a)) out.push(first.slice(a.length));
  if (tts === "ja-JP" && note) {
    const kana = note.split(/[;,]/)[0].trim();
    if (/^[぀-ヿ〜ー]+$/.test(kana)) out.push(kana);
  }
  if (tts === "ru-RU" && first.includes("ё")) out.push(first.replace(/ё/g, "е"));
  return [...new Set(out.filter((v) => v && !v.includes("/")))];
}

async function api(params: Record<string, string>) {
  const url = `${API}?${new URLSearchParams({ ...params, origin: "*", format: "json", formatversion: "2" })}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(String(res.status));
  return res.json();
}

async function speakersFor(tts: string): Promise<string[]> {
  const c = load();
  const lc = (c[tts] ??= { words: {} });
  if (lc.speakers && lc.at && Date.now() - lc.at < SPEAKER_TTL) return lc.speakers;
  const { code, qid } = META[tts];
  const d = await api({ action: "query", list: "search", srsearch: `"LL-${qid} (${code})"`, srnamespace: "6", srlimit: "500", srprop: "" });
  const re = new RegExp(`^File:LL-${qid} \\(${code}\\)-(.+?)-.+\\.(wav|ogg|mp3|flac)$`);
  const count = new Map<string, number>();
  for (const hit of d?.query?.search ?? []) {
    const m = re.exec(hit.title);
    if (m) count.set(m[1], (count.get(m[1]) ?? 0) + 1);
  }
  lc.speakers = [...count.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6).map(([s]) => s);
  lc.at = Date.now();
  return lc.speakers;
}

const strip = (s: string) => s.replace(/<[^>]+>/g, "").trim();

/** Metadata Lingua Libre berbentuk "Speaker: X\nRecorder: Y"; ambil nama penuturnya. */
function cleanArtist(raw: string, fallback: string) {
  const t = strip(raw);
  const m = /Speaker:\s*([^\n]+)/i.exec(t);
  return (m ? m[1] : t.split("\n")[0]).trim() || fallback;
}

async function resolve(tts: string, items: { word: string; note?: string }[]) {
  const meta = META[tts];
  if (!meta) return;
  const c = load();
  const lc = (c[tts] ??= { words: {} });
  const fresh = (e?: Entry) => e && ("url" in e || Date.now() - e.miss < MISS_TTL);
  let todo = items.filter((it) => !fresh(lc.words[it.word]));
  if (!todo.length) return;
  const speakers = await speakersFor(tts);
  for (const sp of speakers) {
    if (!todo.length) break;
    const cand = new Map<string, string>();
    for (const it of todo) for (const v of variants(tts, it.word, it.note)) cand.set(`File:LL-${meta.qid} (${meta.code})-${sp}-${v}.wav`, it.word);
    const titles = [...cand.keys()];
    for (let i = 0; i < titles.length; i += 50) {
      const d = await api({
        action: "query",
        titles: titles.slice(i, i + 50).join("|"),
        prop: "imageinfo",
        iiprop: "url|extmetadata",
        iiextmetadatafilter: "Artist|LicenseShortName",
      });
      for (const p of d?.query?.pages ?? []) {
        const ii = p?.imageinfo?.[0];
        const word = cand.get(p.title);
        if (!ii?.url || !word || ("url" in (lc.words[word] ?? {}))) continue;
        lc.words[word] = {
          url: ii.url,
          page: ii.descriptionurl,
          artist: cleanArtist(ii.extmetadata?.Artist?.value ?? "", sp),
          license: strip(ii.extmetadata?.LicenseShortName?.value ?? ""),
        };
      }
    }
    todo = todo.filter((it) => !("url" in (lc.words[it.word] ?? {})));
  }
  for (const it of todo) lc.words[it.word] = { miss: Date.now() };
  // Tombol dengar kadang memakai bagian pertama saja ("兄 / 弟" menjadi "兄").
  for (const it of items) {
    const e = lc.words[it.word];
    const first = it.word.split(" / ")[0].trim();
    if (e && "url" in e && first !== it.word) lc.words[first] = e;
  }
  save();
}

/**
 * Cari rekaman untuk kata-kata di halaman (dipanggil saat halaman tampil).
 * Gagal jaringan diabaikan: tombol dengar tetap memakai suara perangkat.
 */
export function prefetchNative(tts: string, items: { word: string; note?: string }[]) {
  if (typeof window === "undefined" || !META[tts] || !items.length) return Promise.resolve();
  const key = tts + "|" + items.map((i) => i.word).join("|");
  if (!inflight.has(key)) {
    inflight.set(
      key,
      resolve(tts, items).catch(() => undefined),
    );
  }
  return inflight.get(key)!;
}
