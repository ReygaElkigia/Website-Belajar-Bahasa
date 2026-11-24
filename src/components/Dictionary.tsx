"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronRight, ExternalLink, Globe, Search } from "lucide-react";
import { concepts, languages, onlineLanguages, phraseConcepts, unitById } from "@/data";
import { SpeakButton } from "./Speak";

/** Huruf kecil tanpa diakritik, agar "arigato" cocok dengan "arigatō". */
export function fold(s: string) {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[ʿʾ'’]/g, "")
    .trim();
}

interface Hit {
  type: "word" | "phrase";
  id: string;
  label: string;
  unit: string;
  pos?: string;
  matchedIn?: string; // slug bahasa tempat kata cocok
  score: number;
}

function searchAll(query: string, only: string): Hit[] {
  const q = fold(query);
  if (!q) return [];
  const langs = only === "semua" ? languages : languages.filter((l) => l.slug === only);
  const hits: Hit[] = [];

  const rank = (hay: string) => {
    const h = fold(hay);
    if (h === q) return 3;
    if (h.startsWith(q)) return 2;
    if (q.length >= 2 && h.includes(q)) return 1;
    return 0;
  };

  for (const c of concepts) {
    let best = rank(c.word);
    let where: string | undefined;
    for (const l of langs) {
      const t = l.vocab[c.id];
      if (!t) continue;
      const r = Math.max(rank(t.word), t.roman ? rank(t.roman) : 0);
      if (r > best) {
        best = r;
        where = l.slug;
      }
    }
    if (best) hits.push({ type: "word", id: c.id, label: c.word, unit: c.unit, pos: c.pos, matchedIn: where, score: best + 1 });
  }

  for (const p of phraseConcepts) {
    let best = rank(p.text) ? 1 : 0;
    let where: string | undefined;
    for (const l of langs) {
      const t = l.phrases[p.id];
      if (!t) continue;
      const r = fold(t.word).includes(q) || (t.roman && fold(t.roman).includes(q)) ? 1 : 0;
      if (r > best) {
        best = r;
        where = l.slug;
      }
    }
    if (best) hits.push({ type: "phrase", id: p.id, label: p.text, unit: p.unit, matchedIn: where, score: best });
  }

  return hits.sort((a, b) => b.score - a.score).slice(0, 40);
}

export function Dictionary() {
  const params = useSearchParams();
  const router = useRouter();
  const [q, setQ] = useState(params.get("q") ?? "");
  const [only, setOnly] = useState(params.get("bahasa") ?? "semua");

  // Sinkronkan kueri ke URL agar hasil pencarian bisa dibagikan.
  useEffect(() => {
    const t = window.setTimeout(() => {
      const next = new URLSearchParams();
      if (q) next.set("q", q);
      if (only !== "semua") next.set("bahasa", only);
      const s = next.toString();
      router.replace(s ? `/kamus/?${s}` : "/kamus/", { scroll: false });
    }, 300);
    return () => window.clearTimeout(t);
  }, [q, only, router]);

  const hits = useMemo(() => searchAll(q, only), [q, only]);
  const preview = only === "semua" ? languages.slice(0, 4) : languages.filter((l) => l.slug === only);

  return (
    <div className="two-col">
      <div>
        <form role="search" onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="kamus-q" className="sr-only">
            Cari kata
          </label>
          <div className="search">
            <Search size={20} strokeWidth={1.75} aria-hidden />
            <input
              id="kamus-q"
              type="search"
              autoComplete="off"
              placeholder="Cari dalam bahasa apa pun: makan, arigatō, 谢谢, merci"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              autoFocus
            />
          </div>
          <div className="row mt-3">
            <label htmlFor="kamus-lang" className="small muted">
              Tampilkan
            </label>
            <select id="kamus-lang" className="select" value={only} onChange={(e) => setOnly(e.target.value)}>
              <option value="semua">Semua 12 bahasa</option>
              {languages.map((l) => (
                <option key={l.slug} value={l.slug}>
                  Bahasa {l.name}
                </option>
              ))}
            </select>
          </div>
        </form>

        <div className="mt-6">
          {!q && <Browse />}
          {q && hits.length > 0 && (
            <>
              <p className="small muted" style={{ marginBottom: 12 }} aria-live="polite">
                {hits.length} hasil di kamus Tutur
              </p>
              <ul className="results">
                {hits.map((h) => {
                  const href = h.type === "word" ? `/kamus/${h.id}/` : `/bahasa/${h.matchedIn ?? preview[0].slug}/${h.unit}/`;
                  return (
                    <li key={`${h.type}-${h.id}`} className="result">
                      <Link href={href}>
                        <span>
                          <span className="result-head">
                            <strong>{h.label}</strong>
                            <span className="pos small">{h.type === "word" ? h.pos : "frasa"}</span>
                            <span className="tiny muted">{unitById[h.unit].title}</span>
                          </span>
                          <span className="result-preview mt-2">
                            {(h.matchedIn ? [languages.find((l) => l.slug === h.matchedIn)!, ...preview.filter((l) => l.slug !== h.matchedIn)].slice(0, Math.max(preview.length, 1)) : preview).map((l) => {
                              const t = h.type === "word" ? l.vocab[h.id] : l.phrases[h.id];
                              if (!t) return null;
                              return (
                                <span key={l.slug}>
                                  <span className="tiny">{l.name}</span>{" "}
                                  <span lang={l.tts} dir={l.dir} style={{ color: "var(--ink)", fontWeight: 600 }}>
                                    {l.slug === h.matchedIn ? <mark>{t.word}</mark> : t.word}
                                  </span>
                                </span>
                              );
                            })}
                          </span>
                        </span>
                        <ChevronRight size={20} strokeWidth={1.75} aria-hidden className="muted" />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </>
          )}
          {q && hits.length === 0 && (
            <div className="empty">
              <h3>&ldquo;{q}&rdquo; belum ada di kamus Tutur</h3>
              <p className="muted small">
                Kamus Tutur berisi 80 kata inti dan 31 frasa yang sudah diperiksa untuk 12 bahasa. Untuk kata lain, pakai
                terjemahan online di samping.
              </p>
            </div>
          )}
        </div>
      </div>

      <aside className="aside-sticky">
        <OnlineLookup initial={q} />
      </aside>
    </div>
  );
}

function Browse() {
  return (
    <div className="stack">
      <h2 style={{ fontSize: 22 }}>Jelajahi menurut topik</h2>
      {Object.values(unitById).map((u) => (
        <section key={u.id}>
          <h3 className="small" style={{ fontWeight: 700, marginBottom: 8 }}>
            {u.title}
          </h3>
          <p className="row" style={{ gap: "6px 8px" }}>
            {concepts
              .filter((c) => c.unit === u.id)
              .map((c) => (
                <Link key={c.id} href={`/kamus/${c.id}/`} className="chip">
                  {c.word}
                </Link>
              ))}
          </p>
        </section>
      ))}
    </div>
  );
}

interface OnlineResult {
  text: string;
  from: string;
  to: string;
}

function OnlineLookup({ initial }: { initial: string }) {
  const [text, setText] = useState(initial);
  const [to, setTo] = useState("ja");
  const [reverse, setReverse] = useState(false);
  const [state, setState] = useState<"idle" | "loading" | "error">("idle");
  const [result, setResult] = useState<OnlineResult | null>(null);

  useEffect(() => setText(initial), [initial]);

  const from = reverse ? to : "id";
  const target = reverse ? "id" : to;
  const toName = (code: string) => (code === "id" ? "Indonesia" : (onlineLanguages.find((l) => l.code === code)?.name ?? code));

  const run = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    setState("loading");
    setResult(null);
    try {
      const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text.trim())}&langpair=${from}|${target}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(String(res.status));
      const data = (await res.json()) as { responseData?: { translatedText?: string } };
      const out = data.responseData?.translatedText;
      if (!out) throw new Error("kosong");
      setResult({ text: out, from, to: target });
      setState("idle");
    } catch {
      setState("error");
    }
  };

  const gt = `https://translate.google.com/?sl=${from}&tl=${target}&text=${encodeURIComponent(text)}&op=translate`;
  const wikt = `https://id.wiktionary.org/wiki/${encodeURIComponent(text.trim())}`;

  return (
    <div className="panel">
      <h3 className="row" style={{ gap: 8 }}>
        <Globe size={18} strokeWidth={1.75} aria-hidden />
        Terjemahan online
      </h3>
      <p className="small muted">Untuk kata di luar kamus Tutur, dalam {onlineLanguages.length} bahasa.</p>
      <form onSubmit={run} className="mt-4" style={{ display: "grid", gap: 12 }}>
        <label className="sr-only" htmlFor="ol-text">
          Teks
        </label>
        <input
          id="ol-text"
          className="select"
          style={{ background: "var(--sheet)", paddingRight: 12 }}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Ketik kata atau kalimat"
        />
        <div className="row" style={{ gap: 8 }}>
          <span className="small">{reverse ? "" : "Indonesia ke"}</span>
          <label className="sr-only" htmlFor="ol-lang">
            Bahasa
          </label>
          <select id="ol-lang" className="select" value={to} onChange={(e) => setTo(e.target.value)} style={{ flex: 1 }}>
            {onlineLanguages.map((l) => (
              <option key={l.code} value={l.code}>
                {l.name}
              </option>
            ))}
          </select>
          <span className="small">{reverse ? "ke Indonesia" : ""}</span>
        </div>
        <button type="button" className="btn btn-quiet btn-sm" style={{ justifySelf: "start" }} onClick={() => setReverse((r) => !r)}>
          Tukar arah terjemahan
        </button>
        <button type="submit" className="btn btn-primary" disabled={state === "loading" || !text.trim()}>
          {state === "loading" ? "Menerjemahkan…" : "Terjemahkan"}
        </button>
      </form>

      {result && (
        <div className="mt-5" aria-live="polite">
          <p className="tiny muted">Bahasa {toName(result.to)}</p>
          <div className="row mt-2" style={{ flexWrap: "nowrap", alignItems: "flex-start" }}>
            <span className="term-word" lang={result.to} style={{ flex: 1 }}>
              {result.text}
            </span>
            <SpeakButton text={result.text} lang={result.to} />
          </div>
          <p className="tiny muted mt-3">
            Hasil mesin dari MyMemory, belum diperiksa manusia. Periksa ulang sebelum dipakai untuk hal penting.
          </p>
        </div>
      )}
      {state === "error" && (
        <p className="notice mt-4" role="alert">
          Terjemahan online tidak dapat dihubungi. Periksa koneksi internet Anda, atau buka Google Terjemahan di bawah.
        </p>
      )}

      <div className="mt-5" style={{ display: "grid", gap: 6 }}>
        <a className="small row" style={{ gap: 6 }} href={gt} target="_blank" rel="noreferrer">
          Buka di Google Terjemahan <ExternalLink size={13} aria-hidden />
        </a>
        <a className="small row" style={{ gap: 6 }} href={wikt} target="_blank" rel="noreferrer">
          Cari di Wikikamus <ExternalLink size={13} aria-hidden />
        </a>
      </div>
    </div>
  );
}
