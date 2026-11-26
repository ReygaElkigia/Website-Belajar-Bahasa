// Langkah setelah `next build`:
// 1. Beri versi pada service worker sesuai build, agar cache lama diganti.
// 2. Tulis out/offline-manifest.json: daftar berkas yang perlu disimpan
//    untuk memakai satu bahasa tanpa internet.
import { readFileSync, readdirSync, statSync, writeFileSync, existsSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const out = join(root, "out");

const buildId = readdirSync(join(out, "_next/static")).find((d) => !["chunks", "media", "css"].includes(d)) ?? String(Date.now());
const swPath = join(out, "sw.js");
writeFileSync(swPath, readFileSync(swPath, "utf8").replace("__BUILD__", buildId));

function walk(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

const pageFiles = (dir) => walk(dir).filter((f) => f.endsWith(".html") || f.endsWith(".txt"));
const rel = (f) => relative(out, f).split("\\").join("/");

function assetsOf(htmlFiles) {
  const set = new Set();
  for (const f of htmlFiles.filter((x) => x.endsWith(".html"))) {
    const html = readFileSync(f, "utf8");
    for (const m of html.matchAll(/\/_next\/static\/[^"'\s)]+/g)) set.add(m[0].slice(1).replace(/^.*?_next\//, "_next/"));
  }
  return [...set];
}

// Halaman umum yang selalu ikut disimpan.
const core = ["", "bahasa", "kamus", "latihan", "progres", "ujian", "offline"].flatMap((d) =>
  ["index.html", "index.txt"].map((f) => join(out, d, f)).filter(existsSync),
);

// Ujian per bahasa dibaca dari data sumber.
const examsByLang = {};
for (const f of ["inggris", "asia", "eropa"]) {
  const src = readFileSync(join(root, "src/data/exams", `${f}.ts`), "utf8");
  for (const m of src.matchAll(/id: "([a-z0-9-]+)",\s*\n\s*lang: "([a-z]+)"/g)) (examsByLang[m[2]] ??= []).push(m[1]);
}

const manifest = { version: buildId, languages: {} };
for (const slug of readdirSync(join(out, "bahasa")).filter((d) => statSync(join(out, "bahasa", d)).isDirectory())) {
  const files = [
    ...core,
    ...pageFiles(join(out, "bahasa", slug)),
    ...(examsByLang[slug] ?? []).flatMap((id) => pageFiles(join(out, "ujian", id))),
    // Data kanji (rincian dan urutan goresan) untuk bahasa Jepang.
    ...(slug === "jepang" ? walk(join(out, "kanji")).filter((f) => f.endsWith(".json")) : []),
  ];
  const assets = assetsOf(files);
  const all = [...new Set([...files.map(rel), ...assets])];
  const bytes = all.reduce((n, r) => n + (existsSync(join(out, r)) ? statSync(join(out, r)).size : 0), 0);
  manifest.languages[slug] = { files: all, bytes };
}
writeFileSync(join(out, "offline-manifest.json"), JSON.stringify(manifest));
console.log(`sw.js versi ${buildId}; manifest offline untuk ${Object.keys(manifest.languages).length} bahasa`);
