# Tutur — DESIGN.md

Tutur adalah situs belajar bahasa dunia untuk penutur bahasa Indonesia:
huruf, kosakata, frasa, kamus, video, dan latihan dalam satu tempat.

## Arah desain: buku tulis dan kamus

Material yang paling akrab bagi pelajar Indonesia adalah buku tulis bergaris
(garis biru muda, garis margin merah) dan kamus saku. Tutur memakai bahasa
visual itu secara hemat: garis buku hanya muncul di permukaan tempat orang
*menulis atau menghafal* (hero, kartu hafalan), bukan sebagai dekorasi di
semua tempat. Tinta biru pulpen adalah warna aksi. Stabilo kuning menandai
kata yang dicari atau sedang dipelajari.

Yang sengaja dihindari: latar krem + serif + terakota, gradien ungu-biru,
kartu identik dengan bayangan yang sama, label huruf kapital di atas setiap
judul, emoji sebagai ikon, dan tanda panah di setiap tombol.

Arah ini tidak dibandingkan dengan situs nyata lewat UXKIN (server UXKIN
tidak terhubung di lingkungan ini); dasarnya adalah material belajar nyata
dan pola umum aplikasi belajar bahasa.

## Warna

| Token            | Terang    | Gelap     | Peran |
|------------------|-----------|-----------|-------|
| `--paper`        | `#F5F7FB` | `#10141C` | Latar halaman |
| `--sheet`        | `#FFFFFF` | `#171C27` | Permukaan: panel, kartu hafalan, input |
| `--sheet-2`      | `#EDF1F8` | `#1E2432` | Permukaan sekunder, hover baris |
| `--ink`          | `#1C2230` | `#E7EBF3` | Teks utama |
| `--ink-2`        | `#535C70` | `#A3ACBE` | Teks sekunder, keterangan |
| `--rule`         | `#D3DCEC` | `#2A3242` | Garis buku, border |
| `--pen`          | `#2443B3` | `#8EA6FF` | Aksi utama: tombol, tautan, fokus |
| `--pen-strong`   | `#1A3391` | `#B3C3FF` | Hover tombol utama |
| `--pen-wash`     | `#E6ECFF` | `#1F2A4D` | Latar terpilih / chip aktif |
| `--margin`       | `#D9374B` | `#FF7B8A` | Garis margin, jawaban salah, error |
| `--highlight`    | `#FFE66B` | `#5C4C00` | Stabilo: hasil cari, kata aktif |
| `--ok`           | `#1D7F55` | `#5FD3A0` | Jawaban benar, selesai |
| `--warn`         | `#9A6200` | `#F2B84B` | Peringatan |

Kontras teks utama dan `--pen` pada `--sheet` di atas 7:1; `--ink-2` di atas 4.5:1.

## Tipografi

- **Literata** (variable, serif baca): judul halaman, kata kepala kamus,
  angka besar. Optical size otomatis.
- **Atkinson Hyperlegible Next** (variable, sans): seluruh antarmuka dan teks.
  Dipilih karena dirancang agar huruf yang mirip mudah dibedakan.
- Aksara non-Latin memakai font sistem (Noto/Hiragino/Apple SD Gothic/
  Noto Naskh Arabic/Thonburi/Noto Sans Devanagari) lewat `--font-native`.

Skala (rasio ~1.25, basis 17px):

| Token       | Ukuran | Line-height | Pakai |
|-------------|--------|-------------|-------|
| `--t-hero`  | clamp(56px, 11vw, 128px) | 1.0 | Sapaan di hero |
| `--t-1`     | clamp(34px, 5vw, 48px)   | 1.1 | Judul halaman |
| `--t-2`     | 28px | 1.2 | Judul bagian |
| `--t-3`     | 21px | 1.3 | Judul sub-bagian, kata kepala |
| `--t-body`  | 17px | 1.6 | Teks |
| `--t-small` | 15px | 1.5 | Keterangan |
| `--t-tiny`  | 13px | 1.4 | Meta, badge |

Bobot: 400 teks, 600 penekanan/tombol, 700 judul sans. Judul serif 600.
Huruf kapital penuh tidak dipakai untuk label. Panjang baris maks 68ch.

## Spasi dan tata letak

Skala 4px: 4, 8, 12, 16, 24, 32, 48, 64, 96. Lebar konten 1160px,
gutter 16px (mobile) / 32px (desktop). Jarak antarbagian 96px desktop,
64px mobile. Konten rata kiri; tidak ada bagian yang seluruhnya rata tengah.

## Bentuk dan kedalaman

Radius: `--r-1` 6px (input, chip), `--r-2` 10px (panel), `--r-pill` 999px
(badge level). Kartu hafalan memakai sudut 4px seperti kartu indeks asli.
Satu bayangan saja, `--lift`, untuk elemen yang benar-benar terangkat
(kartu hafalan, menu). Panel biasa cukup border `--rule`.

## Komponen

- **Tombol**: utama (isi `--pen`, teks putih), sekunder (border `--rule`,
  teks `--ink`), senyap (tanpa border, teks `--pen`). Fokus: outline 3px
  `--pen` offset 2px. Nonaktif: opasitas 0.5.
- **Tombol dengar**: ikon speaker bulat 36px, dipakai di semua kata/frasa.
- **Baris kosakata**: kata (aksara asli, besar) · romanisasi · arti; baris
  dipisah garis `--rule` seperti buku catatan, bukan kartu.
- **Chip filter**: pill border; aktif = `--pen-wash` + teks `--pen`.
- **Kartu hafalan**: lembar putih dengan garis buku dan margin merah.
- **Navigasi**: logo kata "Tutur", tautan teks, tombol tema. Mobile:
  bilah bawah dengan 5 tujuan.

## Gambar dan ikon

Ikon: Lucide, stroke 1.75. Tidak ada ilustrasi stok; "gambar" utama situs
adalah aksara itu sendiri (あ, 한, 字, ع, Ж, ก, अ). Video memakai thumbnail
YouTube yang baru dimuat sebagai iframe saat diklik.

## Gerak

Satu momen terorkestrasi: sapaan hero berganti bahasa (dapat dijeda, mati
saat `prefers-reduced-motion`). Selain itu hanya gerak yang menjawab aksi
pengguna: kartu hafalan dibalik, jawaban kuis dikonfirmasi.
