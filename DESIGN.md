# Tutur — DESIGN.md

Tutur adalah situs belajar bahasa dunia untuk penutur bahasa Indonesia:
huruf, kosakata, frasa, kamus, video, latihan, dan latihan ujian resmi.

## Arah desain: dunia anime per bahasa

Setiap bahasa punya "dunia" sendiri yang digambar sebagai pemandangan anime
orisinal: langit bergradasi ala film animasi, matahari atau bulan bercahaya,
awan yang hanyut, siluet landmark, dan partikel yang bergerak. Antarmuka di
atasnya memakai bahasa visual komik: panel dengan garis tinta tebal, bayangan
keras yang bergeser, balon kata, dan tekstur titik raster (screentone).

Semua ilustrasi adalah SVG buatan sendiri (`src/components/anime/Scene.tsx`).
Tidak ada karakter, logo, atau adegan dari anime tertentu.

## Tema per bahasa (`src/data/themes.ts`)

| Bahasa   | Tema                 | Pemandangan                          | Partikel        |
|----------|----------------------|--------------------------------------|-----------------|
| default  | Langit Tutur         | Bukit, kota kecil, tiang listrik     | (awan)          |
| Inggris  | Senja London         | Menara jam, jembatan, sungai         | gerimis         |
| Jepang   | Sakura Senja         | Gunung bersalju, pagoda, torii       | kelopak sakura  |
| Korea    | Malam Seoul          | Menara di bukit, jendela kota        | kunang-kunang   |
| Mandarin | Festival Lentera     | Pagoda bertingkat, atap melengkung   | lentera terbang |
| Arab     | Malam Gurun          | Masjid, menara, bulan sabit, bukit   | bintang         |
| Jerman   | Kastil Hutan         | Kastil, hutan pinus, pegunungan      | daun            |
| Prancis  | Pagi Paris           | Menara besi, atap mansard pastel     | gelembung       |
| Spanyol  | Sore Fiesta          | Kincir angin berputar di bukit       | konfeti         |
| Rusia    | Musim Dingin         | Kubah bawang warna-warni, pinus salju| salju           |
| Italia   | Musim Panas Venesia  | Menara lonceng, lengkungan, gondola  | kilau cahaya    |
| Thai     | Kuil Emas            | Prang kuil, pohon palem              | kelopak teratai |
| Hindi    | Festival Warna       | Kubah putih, menara, palem           | serbuk warna    |

Setiap tema menetapkan: 3 warna langit, matahari/bulan, warna lapisan jauh/
tengah/dekat, `accent` (terang) dan `accentDark` (mode gelap), serta `pop`.
Halaman bahasa, unit, huruf, ujian, dan kartu hafalan dibungkus `.themed`
sehingga tombol, tautan, dan sorotan ikut berwarna aksen bahasanya.

## Warna dasar

| Token        | Terang    | Gelap     | Peran |
|--------------|-----------|-----------|-------|
| `--paper`    | `#F3F6FF` | `#0E1124` | Latar halaman (dengan screentone) |
| `--sheet`    | `#FFFFFF` | `#171B36` | Panel dan kartu |
| `--ink`      | `#1B1F3B` | `#EEF1FF` | Teks utama |
| `--ink-2`    | `#4E5578` | `#AAB2D8` | Teks sekunder |
| `--stroke`   | `#1B1F3B` | `#05060F` | Garis tinta dan bayangan keras |
| `--pen`      | aksen tema| aksen gelap tema | Tombol, tautan, fokus |
| `--pop`      | per tema  | per tema  | Sorotan, badge |

## Tipografi

- **M PLUS Rounded 1c** (700, 800): judul, nama bahasa, angka besar. Huruf
  bulat khas antarmuka anime; juga mendukung kana dan kanji.
- **Nunito** (variable): teks dan antarmuka.
- Aksara lain memakai font sistem lewat `:lang()`.

## Bentuk

- Panel: border 2px `--stroke`, radius 20px, bayangan keras `4px 4px 0`.
- Tombol: pil, border 2px, bayangan keras 3px; naik saat hover, turun saat ditekan.
- Balon kata (hero beranda): border 3px, ekor miring.
- Kartu hafalan: kertas bergaris yang melayang di atas pemandangan bahasa.

## Gerak (fluid)

- Hero beranda: sapaan berganti tiap ~4 detik; pemandangan memudar silang
  ke dunia bahasa berikutnya.
- Parallax: lapisan pemandangan bergeser mengikuti kursor dan scroll.
- Partikel CSS per tema; kincir angin berputar; bintang berkelip; awan hanyut.
- Transisi halaman (`app/template.tsx`) dan kemunculan saat scroll
  (`animation-timeline: view()`, hanya di peramban yang mendukung).
- Umpan balik: jawaban benar "pop", jawaban salah bergetar, tombol dengar berdenyut.
- Semua gerak dekoratif dimatikan saat `prefers-reduced-motion: reduce`.
