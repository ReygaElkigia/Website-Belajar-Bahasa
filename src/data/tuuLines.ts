/**
 * Semua kalimat Tuu. Dipisah dari logika agar mudah ditambah atau diubah.
 * `{n}`, `{name}` dan sejenisnya diganti saat dipakai.
 */

export const pick = <T,>(arr: readonly T[]) => arr[Math.floor(Math.random() * arr.length)];
export const fill = (s: string, v: Record<string, string | number>) => s.replace(/\{(\w+)\}/g, (_, k) => String(v[k] ?? ""));

/** Data kecil per bahasa (sengaja tidak mengimpor data bahasa lengkap agar ringan). */
export const LANG: Record<string, { name: string; hello: string; tts: string; bye: string; facts: string[] }> = {
  inggris: {
    name: "Inggris",
    hello: "Hello!",
    tts: "en-US",
    bye: "See you!",
    facts: [
      "Kamus Oxford edisi kedua memuat lebih dari 170 ribu kata bahasa Inggris yang masih dipakai.",
      "Huruf yang paling sering muncul dalam teks bahasa Inggris adalah e.",
    ],
  },
  jepang: {
    name: "Jepang",
    hello: "こんにちは！",
    tts: "ja-JP",
    bye: "またね！",
    facts: [
      "Bahasa Jepang memakai tiga aksara sekaligus: hiragana, katakana, dan kanji.",
      "Kata パン (pan, roti) dalam bahasa Jepang berasal dari bahasa Portugis, pão.",
    ],
  },
  korea: {
    name: "Korea",
    hello: "안녕하세요!",
    tts: "ko-KR",
    bye: "또 만나요!",
    facts: [
      "Hangul diciptakan atas perintah Raja Sejong pada abad ke-15.",
      "Korea Selatan punya hari libur nasional untuk merayakan Hangul, setiap 9 Oktober.",
    ],
  },
  mandarin: {
    name: "Mandarin",
    hello: "你好！",
    tts: "zh-CN",
    bye: "再见！",
    facts: [
      "Dengan nada berbeda, ma bisa berarti ibu (妈), rami (麻), kuda (马), atau memarahi (骂).",
      "Kata teh dalam bahasa Indonesia berasal dari dialek Hokkian, 茶 (tê).",
    ],
  },
  arab: {
    name: "Arab",
    hello: "مرحبا!",
    tts: "ar-SA",
    bye: "مع السلامة!",
    facts: [
      "Tulisan Arab dibaca dari kanan ke kiri, tetapi angka ditulis dari kiri ke kanan.",
      "Kitab, waktu, dan kursi adalah sebagian kata Indonesia yang berasal dari bahasa Arab.",
    ],
  },
  jerman: {
    name: "Jerman",
    hello: "Hallo!",
    tts: "de-DE",
    bye: "Tschüss!",
    facts: [
      "Semua kata benda bahasa Jerman ditulis dengan huruf kapital.",
      "Handschuh (sarung tangan) harfiahnya berarti sepatu tangan.",
    ],
  },
  prancis: {
    name: "Prancis",
    hello: "Bonjour !",
    tts: "fr-FR",
    bye: "À bientôt !",
    facts: [
      "Banyak huruf akhir bahasa Prancis tidak diucapkan, misalnya t dalam petit.",
      "Kata restoran dan parfum berakar dari bahasa Prancis.",
    ],
  },
  spanyol: {
    name: "Spanyol",
    hello: "¡Hola!",
    tts: "es-ES",
    bye: "¡Hasta luego!",
    facts: [
      "Bahasa Spanyol adalah bahasa ibu dengan penutur terbanyak kedua di dunia, setelah Mandarin.",
      "Kalimat tanya bahasa Spanyol dibuka dengan tanda tanya terbalik: ¿",
    ],
  },
  rusia: {
    name: "Rusia",
    hello: "Привет!",
    tts: "ru-RU",
    bye: "Пока!",
    facts: [
      "Aksara Kiril dinamai dari Santo Kirilus, misionaris abad ke-9.",
      "Bahasa Rusia tidak memakai kata adalah di masa kini: Я студент berarti Saya mahasiswa.",
    ],
  },
  italia: {
    name: "Italia",
    hello: "Ciao!",
    tts: "it-IT",
    bye: "A presto!",
    facts: [
      "Hampir semua kata asli bahasa Italia berakhir dengan huruf vokal.",
      "Istilah musik seperti piano, forte, dan allegro berasal dari bahasa Italia.",
    ],
  },
  thai: {
    name: "Thai",
    hello: "สวัสดี!",
    tts: "th-TH",
    bye: "แล้วพบกันใหม่!",
    facts: [
      "Bahasa Thai punya lima nada dan tidak memakai spasi di antara kata.",
      "Aksara Thai berakar dari aksara Pallawa, sama seperti aksara Kawi di Nusantara.",
    ],
  },
  hindi: {
    name: "Hindi",
    hello: "नमस्ते!",
    tts: "hi-IN",
    bye: "फिर मिलेंगे!",
    facts: [
      "Garis panjang di atas huruf Dewanagari disebut shirorekha.",
      "Kata bahasa sendiri berasal dari bahasa Sanskerta, kerabat dekat bahasa Hindi.",
    ],
  },
};

export const TIME_GREET = {
  pagi: ["Selamat pagi! Otak paling segar di pagi hari, pas untuk kosakata baru.", "Pagi! Sudah sarapan? Aku sarapan huruf hiragana."],
  siang: ["Selamat siang! Lima menit belajar di jam istirahat itu ampuh, lho.", "Siang! Yuk, satu unit sebelum kantuk datang."],
  sore: ["Selamat sore! Waktu yang pas untuk mengulang kartu hafalan.", "Sore! Teh hangat dan satu kuis, setuju?"],
  malam: ["Selamat malam! Belajar sebelum tidur membantu ingatan menempel.", "Malam! Satu bacaan pendek sebelum istirahat?"],
  larut: ["Sudah larut. Belajar sebentar boleh, tapi jangan lupa tidur, ya.", "Masih bangun? Aku temani, tapi lima menit saja ya. Tidur juga bagian dari belajar."],
};

export function timeSlot(h = new Date().getHours()): keyof typeof TIME_GREET {
  if (h >= 4 && h < 11) return "pagi";
  if (h >= 11 && h < 15) return "siang";
  if (h >= 15 && h < 18) return "sore";
  if (h >= 18 && h < 23) return "malam";
  return "larut";
}

export const INTRO = [
  "Halo! Aku Tuu, si balon kata. Aku akan menemanimu belajar di setiap halaman.",
  "Aku bereaksi saat kamu menjawab kuis, mendengarkan, membaca, atau menonton. Ketuk aku kapan saja untuk tips.",
  "Kalau aku terlalu cerewet, buka menu di sampingku untuk mode tenang, pindah sisi, atau menyembunyikanku. Aku tidak akan tersinggung!",
];

export const WELCOME_BACK = {
  short: ["Kamu kembali! Lanjut dari tadi?", "Hai lagi! Aku menunggumu."],
  days: ["Lama tak jumpa, {d} hari! Aku kangen. Mulai pelan-pelan saja, ya.", "{d} hari tanpa kamu terasa panjang. Yuk, satu unit kecil dulu."],
  tab: ["Selamat datang kembali! Tadi sampai mana kita?", "Oh, kamu kembali! Lanjut yuk."],
};

export const ROUTE = {
  home: ["Mau belajar bahasa apa hari ini? Setiap bahasa punya dunianya sendiri."],
  bahasaIndex: ["Dua belas dunia, dua belas bahasa. Pilih yang paling bikin penasaran!", "Bingung memilih? Mulai dari yang tantangannya ringan dulu juga bagus."],
  lang: ["{hello} Selamat datang di dunia {theme}!", "{hello} Ini dunia {theme}. Siap belajar bahasa {name}?"],
  unit: ["Unit {unit}. Dengarkan setiap kata, ucapkan keras-keras, lalu tutup dengan kuis.", "Unit {unit}! Coba tebak arti kata sebelum melihat terjemahannya."],
  huruf: ["Ketuk setiap huruf untuk mendengar bunyinya. Tirukan dengan keras, ya!", "Huruf dulu, kata kemudian. Pelan-pelan saja."],
  bacaan: ["Aku suka cerita! Coba tebak artinya dulu sebelum membuka terjemahan.", "Waktunya membaca. Dengarkan sekali, lalu baca sendiri dengan suaramu."],
  jalur: [
    "Ini jalur bahasa {name}-mu! Ketuk lingkaran yang bergoyang untuk pelajaran berikutnya.",
    "Satu pelajaran cuma lima menit. Kumpulkan tiga bintang di setiap lingkaran, ya!",
  ],
  tonton: ["Waktunya menonton! Coba mode bayangan supaya lidahmu ikut terlatih.", "Nonton sambil belajar. Nyalakan subtitle bahasa aslinya kalau bisa."],
  ujianIndex: ["Latihan ujian resmi? Aku siapkan semangat ekstra!"],
  ujian: ["Fokus, ya. Aku akan menyemangati diam-diam dari sini."],
  kamus: ["Cari kata dalam bahasa apa pun. Aku bantu lihat!", "Kamus multibahasa! Ketik kata Indonesia atau kata asingnya."],
  kamusWord: ["Satu kata, dua belas bahasa. Mana yang paling mirip bahasa Indonesia?"],
  latihan: ["Kartu hafalan! Jujur saja saat menilai diri sendiri, ya.", "Kartu yang sulit akan muncul lebih sering. Itu cara kerja otak kita."],
  video: ["Video pilihan! Berani tonton tanpa subtitle Indonesia?"],
  progres: ["Level {level}, runtunan {streak} hari. Aku bangga padamu!", "Lihat semua yang sudah kamu capai. Keren, kan?"],
  kredit: ["Terima kasih untuk para perekam suara Lingua Libre. Suara mereka membuat belajar terasa nyata."],
  offline: ["Internetnya sedang tidak ada. Halaman yang sudah disimpan tetap bisa dibuka, kok."],
};

export const COMBO: Record<number, string[]> = {
  3: ["Tiga benar beruntun! {praise}", "Combo 3! Kamu sedang panas!"],
  5: ["Lima beruntun! {praise} Aku sampai melompat!", "Combo 5! Otakmu sedang menyala!"],
  10: ["Sepuluh beruntun! Kamu luar biasa!", "Combo 10! Aku kehabisan kata. {praise}"],
  20: ["Dua puluh beruntun?! Kamu ini legenda!"],
};

export const WRONG = [
  "Tidak apa-apa. Salah itu bagian dari belajar.",
  "Hampir! Lihat jawaban yang benar, lalu ucapkan sekali.",
  "Otak paling banyak belajar justru dari kesalahan.",
  "Tarik napas. Jawaban berikutnya pasti lebih mantap.",
];

export const FINISH = {
  perfect: ["Nilai sempurna! {praise}", "Seratus! Aku sampai berkaca-kaca."],
  pass: ["Lulus! {score} poin. Kerja bagus!", "Skor {score}. Kemajuan yang mantap!"],
  low: ["Skor {score}. Ulangi sekali lagi, pasti naik.", "Kamu sudah lebih tahu dari sebelumnya. Coba sekali lagi?"],
};

export const CARD_MILESTONE = ["{n} kartu diulang! Ingatanmu makin kuat.", "Sudah {n} kartu. Istirahat sebentar juga boleh."];

export const LISTEN_FIRST = ["Dengarkan, lalu tirukan dengan keras. Telinga dan mulut belajar bersama!"];
export const SHADOW = ["Aku ikut menirukan juga! Satu, dua...", "Mode bayangan! Tiru nada dan iramanya, bukan hanya katanya."];

export const IDLE = {
  bored: ["Hmm... sedang berpikir? Aku tunggu.", "Aku di sini kalau butuh teman."],
  sleep: ["Zzz..."],
  wake: ["Eh! Aku ketiduran. Maaf, maaf!", "Hah! Aku tidak tidur, kok. Cuma memejamkan mata."],
};

export const PET = [
  "Hehe, geli!",
  "Kamu memanggilku? Ini tips untukmu:",
  "Aku senang ditemani!",
];

export const DIZZY = ["Pusiiing~ Pelan-pelan, dong!", "Duniaku berputar..."];
export const DRAG = { start: ["Wuih, aku terbang!"], drop: ["Di sini juga nyaman.", "Pemandangannya bagus dari sini!"] };

export const TIPS = [
  "Ucapkan setiap kata dengan keras. Membaca dalam hati jauh lebih mudah dilupakan.",
  "Belajar sepuluh menit setiap hari lebih ampuh daripada dua jam seminggu sekali.",
  "Ulangi kartu hafalan saat jatuh tempo. Jaraknya sudah diatur agar pas dengan cara otak mengingat.",
  "Buat kalimat sendiri dengan kata baru, misalnya tentang hari ini.",
  "Tonton klip pendek berulang kali. Tontonan ketiga selalu terasa jauh lebih mudah.",
  "Jangan takut salah ucap. Penutur asli lebih menghargai usaha daripada kesempurnaan.",
  "Tempel kata baru di benda sekitarmu: pintu, meja, kulkas.",
  "Belajar sebelum tidur membantu ingatan menempel saat kamu tidur.",
  "Fokus pada frasa utuh, bukan hanya kata satu per satu.",
  "Rekam suaramu sendiri dan bandingkan dengan penutur asli.",
  "Simpan bahasa favoritmu untuk offline, lalu belajar di perjalanan.",
  "Target harian kecil yang konsisten mengalahkan target besar yang ditinggalkan.",
];

export const THEME = {
  dark: ["Mode malam! Mataku jadi adem.", "Gelap-gelap begini enaknya belajar sambil minum cokelat hangat."],
  light: ["Silau! Tapi cerah begini bikin semangat.", "Terang lagi! Selamat pagi, dunia."],
};

export const NET = {
  off: ["Yah, internetnya putus. Halaman yang sudah disimpan tetap bisa dibuka."],
  on: ["Tersambung lagi! Ayo lanjut."],
};

export const SAVED = ["Bahasa {name} siap dibawa ke mana saja, bahkan tanpa internet!"];

export const GAME = {
  level: ["Naik ke level {level}! Gelar barumu: {title}!", "Level {level}! Aku sampai menari!"],
  badge: ["Lencana baru: {badge}! Pasang di dadamu dengan bangga."],
  goal: ["Target harian tercapai! Hari ini kamu menang."],
  half: ["Setengah target hari ini sudah tercapai. Sedikit lagi!"],
};

export const NUDGE = {
  due: ["{n} kata menunggu diulang. Lima menit saja cukup untuk menjaga ingatanmu."],
  streak: ["Runtunanmu {n} hari dan hari ini belum belajar. Satu kuis kecil saja untuk menjaganya?"],
  long: ["Sudah {m} menit belajar. Istirahatkan mata sebentar, minum air, lalu lanjut lagi."],
};

export const COPY = ["Mencatat? Kebiasaan yang bagus!"];
export const TYPING = ["Hmm, kata apa yang kamu cari?"];
