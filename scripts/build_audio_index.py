"""
Ubah hasil fetch_native_audio.py menjadi dua berkas data situs:

- src/data/audio-index.json   : {kode_tts: {teks_kata: jalur_file_commons}}
  dimuat oleh tombol dengar (dipisah dari bundel utama).
- src/data/audio-credits.json : {slug: {id_konsep: {word, file, page, artist, license, licenseUrl}}}
  untuk penanda mikrofon dan halaman kredit (atribusi CC BY-SA).

Pemakaian: python3 scripts/build_audio_index.py audio.json
"""
import json, re, sys

ROOT = __file__.rsplit("/scripts/", 1)[0]
raw = json.load(open(sys.argv[1], encoding="utf-8"))
PREFIX = "https://upload.wikimedia.org/wikipedia/commons/"

def vocab(slug):
    src = open(f"{ROOT}/src/data/languages/{slug}.ts", encoding="utf-8").read()
    tts = re.search(r'tts: "([^"]+)"', src).group(1)
    block = src.split("vocab: `")[1].split("`")[0]
    words = {}
    for line in block.strip().split("\n"):
        parts = [p.strip() for p in line.split("|")]
        words[parts[0]] = parts[1]
    return tts, words

index, credits = {}, {}
for slug, entries in raw.items():
    tts, words = vocab(slug)
    idx, cred = {}, {}
    for key, e in entries.items():
        if key.startswith("_") or not e.get("url", "").startswith(PREFIX):
            continue
        path = e["url"][len(PREFIX):]
        full = words[key]
        # Tombol dengar memanggil kata lengkap atau bagian pertama sebelum " / ".
        for text in {full, full.split(" / ")[0].strip()}:
            idx[text] = path
        cred[key] = {k: e.get(k, "") for k in ("word", "file", "page", "artist", "license", "licenseUrl")}
        # Metadata Lingua Libre: "Speaker: X Recorder: Y" -> X
        m = re.search(r"Speaker:\s*(.+?)(?:\s*Recorder:|$)", cred[key]["artist"], re.S)
        if m:
            cred[key]["artist"] = m.group(1).strip()
    index[tts] = idx
    credits[slug] = cred
    print(f"{slug}: {len(cred)} rekaman")

json.dump(index, open(f"{ROOT}/src/data/audio-index.json", "w", encoding="utf-8"), ensure_ascii=False, separators=(",", ":"))
json.dump(credits, open(f"{ROOT}/src/data/audio-credits.json", "w", encoding="utf-8"), ensure_ascii=False, indent=1)
