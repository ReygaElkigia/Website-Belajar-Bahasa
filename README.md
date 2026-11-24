# Tutur

Situs belajar bahasa dunia dari bahasa Indonesia: huruf, kosakata bersuara, frasa, kamus multibahasa, video, kuis, dan kartu hafalan berjadwal.

## Isi

- **12 bahasa**: Inggris, Jepang, Korea, Mandarin, Arab, Jerman, Prancis, Spanyol, Rusia, Italia, Thai, Hindi.
- **Huruf**: tabel hiragana/katakana, hangul, pinyin dan nada, hijaiyah, Kiril, aksara Thai, Dewanagari, dan pola bunyi untuk bahasa berhuruf Latin. Setiap huruf bisa diketuk untuk didengar.
- **12 unit per bahasa**: 120 kosakata inti dan 43 frasa, dengan romanisasi, catatan pemakaian, suara, dan kuis penutup (pilih arti, pilih kata, tebak dari suara).
- **Tata bahasa**: 4–5 catatan per bahasa tentang hal yang paling berbeda dari bahasa Indonesia.
- **Kamus**: cari dalam bahasa apa pun (aksara asli atau romanisasi); setiap entri menampilkan 12 bahasa sekaligus. Kata di luar kamus diterjemahkan online (MyMemory) ke 40 bahasa.
- **Video**: video YouTube pilihan per bahasa, dimuat hanya saat diputar.
- **Latihan ujian resmi**: 14 ujian (IELTS, PTE, TOEFL iBT 2026, JLPT N5, TOPIK I, HSK 1, TOAFL, Goethe A1, DELF A1, DELE A1, ТРКИ, CILS A1, CU-TFL, Hindi A1). Info format bersumber dari situs penyelenggara resmi (tautan di tiap halaman); soal latihan ditulis sendiri meniru jenis tugas aslinya (True/False/Not Given, Re-order Paragraphs, Write from Dictation, soal ★ JLPT, i'rab TOAFL, dan lainnya). Data ada di `src/data/exams/`.
- **Kartu hafalan**: sistem Leitner 5 kotak; progres, runtunan hari, dan skor tersimpan di `localStorage`, tanpa akun.

Suara memakai Web Speech API bawaan peramban, jadi kualitas dan ketersediaannya bergantung pada perangkat. Situs memberi tahu bila suara untuk suatu bahasa tidak terpasang.

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
