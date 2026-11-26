"""
Cari rekaman penutur asli (Lingua Libre, Wikimedia Commons) untuk kosakata Tutur.

Langkah:
1. Untuk tiap bahasa, ambil contoh judul file Lingua Libre untuk menentukan
   Q-id bahasa dan perekam yang paling banyak merekam.
2. Untuk setiap perekam teratas, cek langsung keberadaan file
   "LL-Q.. (kode)-Perekam-kata.wav" (50 judul per permintaan).
3. Ambil URL, nama perekam, dan lisensi file terpilih.

Pemakaian: python3 fetch_audio.py <repo_root> <out.json>
"""
import json, re, ssl, sys, time, urllib.parse, urllib.request, collections, os

ROOT, OUT = sys.argv[1], sys.argv[2]
API = "https://commons.wikimedia.org/w/api.php"
UA = "TuturBuild/1.0 (educational language-learning site; one-off build script)"
CTX = ssl.create_default_context(cafile="/root/.ccr/ca-bundle.crt") if os.path.exists("/root/.ccr/ca-bundle.crt") else None
DELAY = 3.0

# (kode ISO 639-3, Q-id Wikidata) seperti dipakai di nama file Lingua Libre
LANGS = {
    "inggris": ("eng", "Q1860"), "jepang": ("jpn", "Q5287"), "korea": ("kor", "Q9176"),
    "mandarin": ("cmn", "Q9192"), "arab": ("ara", "Q13955"), "jerman": ("deu", "Q188"),
    "prancis": ("fra", "Q150"), "spanyol": ("spa", "Q1321"), "rusia": ("rus", "Q7737"),
    "italia": ("ita", "Q652"), "thai": ("tha", "Q9217"), "hindi": ("hin", "Q1568"),
}
ARTICLES = {
    "jerman": ["der ", "die ", "das "],
    "prancis": ["le ", "la ", "les ", "l'"],
    "spanyol": ["el ", "la ", "los ", "las ", "a la "],
    "italia": ["il ", "lo ", "la ", "i ", "gli ", "le ", "l'", "a "],
    "inggris": ["to "],
}

def api(params):
    params = {**params, "format": "json", "formatversion": "2", "maxlag": "5"}
    url = API + "?" + urllib.parse.urlencode(params)
    for attempt in range(5):
        req = urllib.request.Request(url, headers={"User-Agent": UA})
        try:
            with urllib.request.urlopen(req, context=CTX, timeout=40) as r:
                body = r.read().decode("utf-8")
            time.sleep(DELAY)
            return json.loads(body)
        except Exception as e:  # batas laju atau jaringan: tunggu lalu ulangi
            wait = 30 * (attempt + 1)
            print(f"  ulang dalam {wait}s ({e.__class__.__name__}: {str(e)[:80]})", flush=True)
            time.sleep(wait)
    raise RuntimeError("API gagal berulang kali")

def parse_vocab(slug):
    src = open(f"{ROOT}/src/data/languages/{slug}.ts", encoding="utf-8").read()
    block = src.split("vocab: `")[1].split("`")[0]
    out = {}
    for line in block.strip().split("\n"):
        parts = [p.strip() for p in line.split("|")]
        key, word = parts[0], parts[1]
        note = parts[3] if len(parts) > 3 else ""
        out[key] = (word, note)
    return out

def variants(slug, word, note):
    vs = []
    first = word.split(" / ")[0].strip()
    vs.append(first)
    low = first.lower()
    for art in ARTICLES.get(slug, []):
        if low.startswith(art):
            vs.append(first[len(art):])
    if slug == "jepang" and note:
        kana = re.split(r"[;,]", note)[0].strip()
        if kana and re.fullmatch(r"[぀-ヿ〜ー]+", kana):
            vs.append(kana)
    if slug == "rusia" and "ё" in first:
        vs.append(first.replace("ё", "е"))
    seen, res = set(), []
    for v in vs:
        v = v.strip()
        if v and v not in seen and "/" not in v:
            seen.add(v)
            res.append(v)
    return res

def lang_info(code, qid):
    """Perekam terbanyak dari contoh hasil pencarian (satu panggilan pencarian per bahasa)."""
    time.sleep(4)
    d = api({"action": "query", "list": "search", "srsearch": f'"LL-{qid} ({code})"', "srnamespace": 6, "srlimit": 500, "srprop": ""})
    speakers = collections.Counter()
    pat = re.compile(r"^File:LL-" + qid + r" \(" + code + r"\)-(.+?)-.+\.(wav|ogg|mp3|flac)$")
    for hit in d.get("query", {}).get("search", []):
        m = pat.match(hit["title"])
        if m:
            speakers[m.group(1)] += 1
    return qid, [s for s, _ in speakers.most_common(6)]

def exists(titles):
    found = set()
    for i in range(0, len(titles), 50):
        d = api({"action": "query", "titles": "|".join(titles[i:i + 50])})
        for p in d.get("query", {}).get("pages", []):
            if not p.get("missing") and not p.get("invalid"):
                found.add(p["title"])
    return found

def file_info(titles):
    info = {}
    for i in range(0, len(titles), 50):
        d = api({
            "action": "query", "titles": "|".join(titles[i:i + 50]), "prop": "imageinfo",
            "iiprop": "url|extmetadata", "iiextmetadatafilter": "Artist|LicenseShortName|LicenseUrl",
        })
        for p in d.get("query", {}).get("pages", []):
            ii = (p.get("imageinfo") or [{}])[0]
            meta = ii.get("extmetadata", {})
            artist = re.sub(r"<[^>]+>", "", meta.get("Artist", {}).get("value", "")).strip()
            info[p["title"]] = {
                "url": ii.get("url"),
                "page": ii.get("descriptionurl"),
                "artist": artist,
                "license": meta.get("LicenseShortName", {}).get("value", ""),
                "licenseUrl": meta.get("LicenseUrl", {}).get("value", ""),
            }
    return info

result = json.load(open(OUT)) if os.path.exists(OUT) else {}
for slug, (code, qid0) in LANGS.items():
    if slug in result and result[slug].get("_done"):
        print(f"{slug}: sudah ada, lewati")
        continue
    print(f"== {slug} ({code})", flush=True)
    qid, speakers = lang_info(code, qid0)
    print(f"  qid={qid} perekam={speakers[:6]}", flush=True)
    vocab = parse_vocab(slug)
    chosen = {}
    if qid:
        remaining = dict(vocab)
        for sp in speakers:
            if not remaining:
                break
            cand = {}
            for key, (word, note) in remaining.items():
                for v in variants(slug, word, note):
                    cand[f"File:LL-{qid} ({code})-{sp}-{v}.wav"] = (key, v)
            found = exists(list(cand))
            for title in found:
                key, v = cand[title]
                if key in remaining:
                    chosen[key] = {"title": title, "word": v}
                    remaining.pop(key)
            print(f"  {sp}: +{len(found)} (sisa {len(remaining)})", flush=True)
    info = file_info([c["title"] for c in chosen.values()]) if chosen else {}
    out = {"_qid": qid, "_code": code}
    for key, c in chosen.items():
        meta = info.get(c["title"], {})
        if meta.get("url"):
            out[key] = {"file": c["title"].removeprefix("File:"), "word": c["word"], **meta}
    out["_done"] = True
    result[slug] = out
    json.dump(result, open(OUT, "w"), ensure_ascii=False, indent=1)
    print(f"  selesai: {len(out) - 3} dari {len(vocab)} kata punya rekaman asli", flush=True)
print("SELESAI")
