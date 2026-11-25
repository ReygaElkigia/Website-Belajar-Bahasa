# Tutur

Situs belajar bahasa dunia dari bahasa Indonesia: huruf, kosakata bersuara, frasa, kamus multibahasa, video, kuis, dan kartu hafalan berjadwal.

## Isi

- **12 bahasa**: Inggris, Jepang, Korea, Mandarin, Arab, Jerman, Prancis, Spanyol, Rusia, Italia, Thai, Hindi.
- **Huruf**: tabel hiragana/katakana, hangul, pinyin dan nada, hijaiyah, Kiril, aksara Thai, Dewanagari, dan pola bunyi untuk bahasa berhuruf Latin. Setiap huruf bisa diketuk untuk didengar.
- **16 unit per bahasa, A1 sampai B1**: 160 kosakata inti dan 59 frasa, dengan romanisasi, catatan pemakaian, suara, dan kuis penutup (pilih arti, pilih kata, tebak dari suara). Empat unit terakhir (Hobi, Perjalanan, Perasaan, Cerita) memakai kalimat yang lebih panjang: bentuk lampau, pengalaman, rencana, dan perbandingan.
- **Bacaan bertingkat** (`/bahasa/<slug>/bacaan/`): cerita A2 dan B1 yang sama di semua bahasa, ditulis ulang dalam tiap bahasa, dengan suara per kalimat, putar semua, terjemahan yang bisa dibuka per kalimat, dan soal pemahaman yang menunjuk kalimat jawabannya.
- **Belajar dari tontonan** (`/bahasa/<slug>/tonton/`): anime untuk Jepang, drakor untuk Korea, donghua untuk Mandarin, anime dubbing Spacetoon untuk Arab, multfilm untuk Rusia, lakorn untuk Thai, Bollywood untuk Hindi, dan kartun atau animasi untuk bahasa lain. Isinya adegan dialog orisinal bersuara dengan mode bayangan (shadowing), ungkapan khas beserta kuisnya, dan klip dari kanal YouTube resmi (dicek embeddable lewat oEmbed). Klip diputar dengan alat belajar: kecepatan 0,5×/0,75×, mundur 5 detik, ulangi bagian, dan jeda otomatis.
- **Tata bahasa lanjutan A2–B1**: bentuk lampau, masa depan, perbandingan, dan pengalaman untuk 12 bahasa.
- **Tata bahasa**: 4–5 catatan per bahasa tentang hal yang paling berbeda dari bahasa Indonesia.
- **Kamus**: cari dalam bahasa apa pun (aksara asli atau romanisasi); setiap entri menampilkan 12 bahasa sekaligus. Kata di luar kamus diterjemahkan online (MyMemory) ke 40 bahasa.
- **Video**: video YouTube pilihan per bahasa, dimuat hanya saat diputar.
- **Latihan ujian resmi**: 14 ujian (IELTS, PTE, TOEFL iBT 2026, JLPT N5, TOPIK I, HSK 1, TOAFL, Goethe A1, DELF A1, DELE A1, ТРКИ, CILS A1, CU-TFL, Hindi A1). Info format bersumber dari situs penyelenggara resmi (tautan di tiap halaman); soal latihan ditulis sendiri meniru jenis tugas aslinya (True/False/Not Given, Re-order Paragraphs, Write from Dictation, soal ★ JLPT, i'rab TOAFL, dan lainnya). Data ada di `src/data/exams/`.
- **Kartu hafalan**: sistem Leitner 5 kotak; progres, runtunan hari, dan skor tersimpan di `localStorage`, tanpa akun.

## Suara

Tombol dengar mencoba tiga sumber berurutan:

1. **Indeks rekaman bawaan** (`src/data/audio-index.json`): rekaman penutur asli dari [Lingua Libre](https://lingualibre.org) di Wikimedia Commons, dikumpulkan saat build dengan `scripts/fetch_native_audio.py` lalu `scripts/build_audio_index.py`. Saat ini berisi 108 kata bahasa Inggris.
2. **Pencarian dari peramban** (`src/lib/nativeAudio.ts`): untuk kata yang belum ada di indeks, peramban pengunjung mencari perekam Lingua Libre teratas dan nama file persisnya lewat API Commons, lalu menyimpan hasilnya di `localStorage`.
3. **Suara perangkat** (Web Speech API) bila rekaman tidak ada atau gagal dimuat.

Kata yang diputar dari rekaman asli diberi penanda "Penutur asli" yang menautkan ke berkas dan perekamnya. Atribusi lengkap ada di halaman `/kredit/` (lisensi CC BY-SA 4.0 atau CC BY 4.0 sesuai berkas).

## Aplikasi (PWA) dan offline

- `public/manifest.webmanifest` dan ikon di `public/icons/` (maskot Tuu) membuat Tutur bisa dipasang di layar utama.
- `public/sw.js`: kerangka aplikasi disimpan saat dipasang; halaman memakai jaringan dulu lalu cache; aset `_next` dan rekaman Wikimedia memakai cache dulu.
- `scripts/postbuild.mjs` (dijalankan oleh `npm run build`) memberi versi pada service worker dan menulis `out/offline-manifest.json`, daftar berkas per bahasa untuk tombol **Simpan untuk offline** di halaman bahasa.
- Pengingat: Tuu mengingatkan di dalam aplikasi bila ada kartu jatuh tempo; notifikasi harian otomatis memakai Periodic Background Sync (Chrome Android, aplikasi terpasang).

## Gamifikasi

XP, level, target harian, runtunan hari, dan 12 lencana (`src/data/gamify.ts`), disimpan di `localStorage`. Maskot **Tuu** (`src/components/mascot/`) adalah karakter orisinal yang bereaksi di kuis, latihan ujian, kartu hafalan, dan beranda.

## Navigasi bahasa dan efek interaktif

- **Penanda bahasa aktif** di header: aksara, nama bahasa, dan cincin progres unit. Menunya berisi tombol lanjut ke unit berikutnya dan daftar 12 bahasa untuk berpindah. Di setiap halaman bahasa ada subnav yang menempel (Ringkasan, Huruf, Unit, Bacaan, Tonton) dengan nomor unit dan titik progres.
- **Transisi masuk dunia**: berpindah ke bahasa lain membuka lingkaran bertema dari titik klik, berisi pemandangan, partikel, aksara, dan nama bahasanya (`src/components/fx/WorldTransition.tsx`).
- **Lapisan efek** (`src/components/fx/FxLayer.tsx`): bilah progres scroll, kartu yang miring 3D dengan kilap, percikan saat tombol ditekan, ledakan bintang saat jawaban benar, jejak partikel bertema di atas pemandangan, konfeti untuk combo, skor bagus, naik level, lencana, dan target harian, serta angka statistik yang menghitung naik.
- Semua efek mati bila perangkat memakai pengaturan gerak minimal.

## Tuu, maskot pendamping

Tuu duduk di pojok layar di setiap halaman (`src/components/companion/`). Fitur lain cukup memanggil `tuu({...})` dari `src/lib/companion.ts`; Companion yang memutuskan reaksinya.

- **17 ekspresi** dengan gerakan sendiri: menyapa, senang, bersorak, terharu, bangga, malu, sedih, gugup, berpikir, fokus (ikat kepala saat ujian), kaget, mendengarkan, membaca, tertidur, pusing, dan lain-lain. Mata mengikuti kursor dan berkedip acak. Syalnya berganti warna mengikuti dunia bahasa.
- **Bereaksi pada**: halaman yang dibuka, jawaban kuis/bacaan/ujian/kartu (combo 3, 5, 10, 20 dan semangat setelah 3 salah), skor akhir, suara yang diputar, mode bayangan, mengetik di kamus, ganti tema, simpan offline, salin teks, koneksi putus/tersambung, naik level, lencana, setengah dan penuh target harian.
- **Waktu dan kebiasaan**: perkenalan saat kunjungan pertama, sapaan pagi sampai larut malam, sambutan setelah beberapa hari absen atau kembali ke tab, bosan setelah 45 detik diam lalu tertidur, pengingat istirahat setelah 25 menit, pengingat kartu jatuh tempo dan runtunan sore hari.
- **Interaksi**: ketuk untuk tips atau fakta unik bahasa, ketuk cepat lima kali membuatnya pusing, seret ke kiri/kanan, menu untuk mode tenang dan menyembunyikan. Pengaturan juga ada di halaman Progres dan `/tuu/`.
- Menghormati `prefers-reduced-motion`, punya `aria-live`, bisa dipakai dengan papan ketik.

## Menjalankan

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # hasil statis di folder out/
```

Hasil `out/` adalah HTML statis yang bisa diunggah ke GitHub Pages, Netlify, Vercel, atau hosting apa pun.

## Struktur

- `DESIGN.md`: arah desain, token warna, tipografi, dan aturan komponen.
- `src/data/curriculum.ts`: unit, konsep kosakata, dan frasa (dipakai bersama semua bahasa).
- `src/data/readings.ts` dan `readingTexts.ts`: cerita bertingkat (kalimat Indonesia dan soal di file pertama, teks tiap bahasa di file kedua).
- `src/data/grammarB1.ts`: catatan tata bahasa A2–B1.
- `src/data/media.ts`: adegan, ungkapan, dan klip resmi untuk halaman Tonton.
- `src/data/languages/*.ts`: satu berkas per bahasa, dalam format baris `kunci | kata | romanisasi | catatan` agar mudah diperiksa penutur asli.
- `src/app/`: halaman (Next.js App Router, ekspor statis).
- `src/components/`: komponen antarmuka; `src/lib/`: suara dan penyimpanan progres.

## Menambah bahasa

1. Salin salah satu berkas di `src/data/languages/`, isi semua kunci kosakata dan frasa.
2. Daftarkan di `src/data/index.ts`.
3. Jalankan `npm run dev`; konsol memperingatkan bila ada kunci yang belum diterjemahkan.

## Deploy ke GitHub Pages

Workflow `.github/workflows/deploy.yml` membangun dan menerbitkan situs setiap ada push ke `main`.

1. Di GitHub, buka **Settings → Pages**, lalu pada **Build and deployment → Source** pilih **GitHub Actions**.
2. Gabungkan perubahan ke `main`. Situs akan tersedia di `https://<pengguna>.github.io/<nama-repo>/`.

Untuk Vercel atau Netlify, cukup impor repo; tidak perlu mengisi `NEXT_PUBLIC_BASE_PATH`.
