import type { Concept, PhraseConcept, Unit } from "./types";

export const units: Unit[] = [
  { id: "salam", title: "Salam dan sapaan", summary: "Menyapa, berterima kasih, dan meminta maaf dengan sopan.", level: "A1" },
  { id: "kenalan", title: "Perkenalan", summary: "Menyebut nama dan asal, lalu meminta lawan bicara berbicara pelan.", level: "A1" },
  { id: "angka", title: "Angka 1 sampai 10", summary: "Menghitung, menyebut umur, dan meminta satu lagi.", level: "A1" },
  { id: "keluarga", title: "Keluarga", summary: "Menyebut anggota keluarga dan bercerita tentang mereka.", level: "A1" },
  { id: "makan", title: "Makan dan minum", summary: "Memesan di restoran dan meminta tagihan.", level: "A2" },
  { id: "waktu", title: "Waktu dan hari", summary: "Menanyakan jam dan hari, lalu membuat janji.", level: "A2" },
  { id: "arah", title: "Arah dan tempat", summary: "Menanyakan jalan dan memahami petunjuk arah.", level: "A2" },
  { id: "belanja", title: "Belanja", summary: "Menanyakan harga dan membayar.", level: "A2" },
  { id: "transportasi", title: "Transportasi", summary: "Membeli tiket dan menanyakan jadwal keberangkatan.", level: "A2" },
  { id: "kesehatan", title: "Tubuh dan kesehatan", summary: "Menyebut bagian tubuh dan meminta pertolongan saat sakit.", level: "A2" },
  { id: "cuaca", title: "Cuaca dan alam", summary: "Membicarakan cuaca, musim, dan alam sekitar.", level: "A2" },
  { id: "kegiatan", title: "Pekerjaan dan kegiatan", summary: "Bercerita tentang pekerjaan, sekolah, dan kegiatan sehari-hari.", level: "A2" },
];

const c = (unit: Concept["unit"], pos: string, list: [string, string][]): Concept[] =>
  list.map(([id, word]) => ({ id, word, pos, unit }));

export const concepts: Concept[] = [
  ...c("salam", "ungkapan", [
    ["halo", "halo"],
    ["pagi", "selamat pagi"],
    ["malam", "selamat malam"],
    ["terimakasih", "terima kasih"],
    ["samasama", "sama-sama"],
    ["maaf", "maaf"],
    ["permisi", "permisi"],
  ]),
  ...c("salam", "partikel", [
    ["ya", "ya"],
    ["tidak", "tidak"],
  ]),
  ...c("salam", "ungkapan", [["dadah", "selamat tinggal"]]),

  ...c("kenalan", "kata ganti", [
    ["saya", "saya"],
    ["kamu", "kamu"],
  ]),
  ...c("kenalan", "nomina", [
    ["nama", "nama"],
    ["teman", "teman"],
    ["guru", "guru"],
    ["pelajar", "pelajar"],
    ["negara", "negara"],
    ["bahasa", "bahasa"],
    ["indonesia", "Indonesia"],
  ]),
  ...c("kenalan", "verba", [["berbicara", "berbicara"]]),

  ...c("angka", "numeralia", [
    ["satu", "satu"],
    ["dua", "dua"],
    ["tiga", "tiga"],
    ["empat", "empat"],
    ["lima", "lima"],
    ["enam", "enam"],
    ["tujuh", "tujuh"],
    ["delapan", "delapan"],
    ["sembilan", "sembilan"],
    ["sepuluh", "sepuluh"],
  ]),

  ...c("keluarga", "nomina", [
    ["keluarga", "keluarga"],
    ["ayah", "ayah"],
    ["ibu", "ibu"],
    ["anak", "anak"],
    ["saudaralk", "saudara laki-laki"],
    ["saudarapr", "saudara perempuan"],
    ["suami", "suami"],
    ["istri", "istri"],
    ["kakek", "kakek"],
    ["nenek", "nenek"],
  ]),

  ...c("makan", "verba", [
    ["makan", "makan"],
    ["minum", "minum"],
  ]),
  ...c("makan", "nomina", [
    ["air", "air"],
    ["nasi", "nasi"],
    ["roti", "roti"],
    ["kopi", "kopi"],
    ["teh", "teh"],
    ["ikan", "ikan"],
    ["ayam", "ayam (daging)"],
  ]),
  ...c("makan", "adjektiva", [["enak", "enak"]]),

  ...c("waktu", "adverbia", [
    ["hariini", "hari ini"],
    ["besok", "besok"],
    ["kemarin", "kemarin"],
    ["sekarang", "sekarang"],
  ]),
  ...c("waktu", "nomina", [
    ["jam", "jam"],
    ["hari", "hari"],
    ["minggu", "minggu (pekan)"],
    ["bulan", "bulan"],
    ["tahun", "tahun"],
    ["pagihari", "pagi"],
  ]),

  ...c("arah", "kata tanya", [["dimana", "di mana"]]),
  ...c("arah", "arah", [
    ["kiri", "kiri"],
    ["kanan", "kanan"],
    ["lurus", "lurus"],
  ]),
  ...c("arah", "adjektiva", [
    ["dekat", "dekat"],
    ["jauh", "jauh"],
  ]),
  ...c("arah", "nomina", [
    ["stasiun", "stasiun"],
    ["rumah", "rumah"],
    ["toilet", "toilet"],
    ["hotel", "hotel"],
  ]),

  ...c("belanja", "kata tanya", [["berapa", "berapa"]]),
  ...c("belanja", "nomina", [["harga", "harga"]]),
  ...c("belanja", "adjektiva", [
    ["mahal", "mahal"],
    ["murah", "murah"],
  ]),
  ...c("belanja", "nomina", [["uang", "uang"]]),
  ...c("belanja", "verba", [["membeli", "membeli"]]),
  ...c("belanja", "nomina", [["toko", "toko"]]),
  ...c("belanja", "kata tunjuk", [
    ["ini", "ini"],
    ["itu", "itu"],
  ]),
  ...c("belanja", "verba", [["membayar", "membayar"]]),

  ...c("transportasi", "nomina", [
    ["mobil", "mobil"],
    ["bus", "bus"],
    ["kereta", "kereta"],
    ["pesawat", "pesawat"],
    ["sepeda", "sepeda"],
    ["tiket", "tiket"],
    ["jalan", "jalan (raya)"],
    ["bandara", "bandara"],
  ]),
  ...c("transportasi", "verba", [
    ["berangkat", "berangkat"],
    ["tiba", "tiba"],
  ]),

  ...c("kesehatan", "nomina", [
    ["kepala", "kepala"],
    ["mata", "mata"],
    ["tangan", "tangan"],
    ["kaki", "kaki"],
    ["perut", "perut"],
  ]),
  ...c("kesehatan", "adjektiva", [["sakit", "sakit"]]),
  ...c("kesehatan", "nomina", [
    ["dokter", "dokter"],
    ["obat", "obat"],
    ["rumahsakit", "rumah sakit"],
    ["demam", "demam"],
  ]),

  ...c("cuaca", "nomina", [["cuaca", "cuaca"]]),
  ...c("cuaca", "adjektiva", [
    ["panas", "panas"],
    ["dingin", "dingin"],
  ]),
  ...c("cuaca", "nomina", [
    ["hujan", "hujan"],
    ["matahari", "matahari"],
    ["angin", "angin"],
    ["laut", "laut"],
    ["gunung", "gunung"],
    ["sungai", "sungai"],
    ["musim", "musim"],
  ]),

  ...c("kegiatan", "verba", [
    ["bekerja", "bekerja"],
    ["belajar", "belajar"],
    ["membaca", "membaca"],
    ["menulis", "menulis"],
    ["tidur", "tidur"],
    ["pergi", "pergi"],
    ["datang", "datang"],
  ]),
  ...c("kegiatan", "nomina", [
    ["kantor", "kantor"],
    ["sekolah", "sekolah"],
    ["libur", "libur"],
  ]),
];

const p = (unit: PhraseConcept["unit"], list: [string, string][]): PhraseConcept[] =>
  list.map(([id, text]) => ({ id, text, unit }));

export const phraseConcepts: PhraseConcept[] = [
  ...p("salam", [
    ["s1", "Apa kabar?"],
    ["s2", "Kabar saya baik."],
    ["s3", "Senang berkenalan denganmu."],
    ["s4", "Sampai jumpa lagi."],
  ]),
  ...p("kenalan", [
    ["k1", "Nama saya Rina."],
    ["k2", "Siapa namamu?"],
    ["k3", "Saya dari Indonesia."],
    ["k4", "Saya tidak mengerti."],
    ["k5", "Tolong bicara pelan-pelan."],
  ]),
  ...p("angka", [
    ["a1", "Berapa umurmu?"],
    ["a2", "Umur saya dua puluh tahun."],
    ["a3", "Tolong, satu lagi."],
  ]),
  ...p("keluarga", [
    ["f1", "Ini ibu saya."],
    ["f2", "Apakah kamu punya saudara?"],
    ["f3", "Keluarga saya tinggal di Jakarta."],
  ]),
  ...p("makan", [
    ["m1", "Saya lapar."],
    ["m2", "Tolong, segelas air."],
    ["m3", "Ini enak sekali!"],
    ["m4", "Minta tagihannya."],
  ]),
  ...p("waktu", [
    ["w1", "Jam berapa sekarang?"],
    ["w2", "Hari ini hari apa?"],
    ["w3", "Sampai jumpa besok."],
    ["w4", "Saya sibuk hari ini."],
  ]),
  ...p("arah", [
    ["d1", "Di mana toilet?"],
    ["d2", "Belok kiri."],
    ["d3", "Apakah jauh dari sini?"],
    ["d4", "Saya tersesat."],
  ]),
  ...p("belanja", [
    ["b1", "Berapa harganya?"],
    ["b2", "Terlalu mahal."],
    ["b3", "Saya mau membeli ini."],
    ["b4", "Bisa bayar pakai kartu?"],
  ]),
  ...p("transportasi", [
    ["t1", "Bus ini pergi ke mana?"],
    ["t2", "Satu tiket ke Bandung, tolong."],
    ["t3", "Keretanya berangkat jam berapa?"],
  ]),
  ...p("kesehatan", [
    ["h1", "Saya sakit."],
    ["h2", "Kepala saya sakit."],
    ["h3", "Tolong panggil dokter!"],
  ]),
  ...p("cuaca", [
    ["c1", "Hari ini panas sekali."],
    ["c2", "Besok akan hujan."],
    ["c3", "Cuacanya bagus."],
  ]),
  ...p("kegiatan", [
    ["g1", "Saya bekerja di kantor."],
    ["g2", "Saya belajar setiap hari."],
    ["g3", "Apa hobimu?"],
  ]),
];

export const conceptById = Object.fromEntries(concepts.map((x) => [x.id, x]));
export const phraseById = Object.fromEntries(phraseConcepts.map((x) => [x.id, x]));
export const unitById = Object.fromEntries(units.map((u) => [u.id, u])) as Record<string, Unit>;
