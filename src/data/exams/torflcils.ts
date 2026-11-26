import type { Exam } from "./types";
import { mc } from "./build";

/**
 * ТРКИ/TORFL ТБУ sampai ТРКИ-4 dan CILS A2 sampai QUATTRO-C2.
 * Struktur umum dari spesifikasi resmi; waktu yang tidak kami pastikan
 * ditulis "lihat spesifikasi". Soal latihan ditulis sendiri.
 */

/* ---------------------------------------------------------------- TORFL */

const T_ORG = "Sistem Ujian Negara Federasi Rusia (pusat uji di universitas Rusia)";
const T_SCORE = ["Ada lima subtes: Лексика/Грамматика, Чтение, Аудирование, Письмо, Говорение.", "Untuk lulus, peserta perlu minimal 66% di setiap subtes.", "Subtes yang gagal bisa diulang tanpa mengulang seluruh ujian (sesuai aturan pusat uji)."];
const T_SRC = [
  { label: "Universitas Herzen: struktur ТРКИ", url: "https://www.herzen.spb.ru/upload/medialibrary/329/blyd1fxnx36jrw0jm20a2bymyd5bc7rs/TRKI2.pdf" },
  { label: "Universitas Negeri Sankt Peterburg: pusat uji ТРКИ", url: "https://testing.spbu.ru/" },
];
const tFormat = (lex: string, read: string, write: string, speak: string) => [
  { name: "Лексика. Грамматика", time: "lihat spesifikasi", items: "soal pilihan ganda", tasks: lex },
  { name: "Чтение Membaca", time: "lihat spesifikasi", items: "beberapa teks", tasks: read },
  { name: "Аудирование Menyimak", time: "lihat spesifikasi", items: "beberapa audio", tasks: "Dialog, berita, wawancara sesuai level" },
  { name: "Письмо Menulis", time: "lihat spesifikasi", items: "1 sampai 3 tugas", tasks: write },
  { name: "Говорение Berbicara", time: "lihat spesifikasi", items: "beberapa tugas", tasks: speak },
];

export const torflA2: Exam = {
  id: "trki-tbu",
  lang: "rusia",
  name: "ТРКИ Dasar (ТБУ)",
  fullName: "Тест по русскому языку как иностранному, базовый уровень (ТБУ)",
  org: T_ORG,
  level: "ТБУ (A2)",
  about: "Level dasar: berkomunikasi dalam situasi sehari-hari yang paling penting. Sering dipakai untuk izin kerja dan sebagai target akhir kelas persiapan.",
  format: tFormat("Kasus, aspek kata kerja, kata kerja gerak dasar", "Pengumuman, surat, teks pendek", "Surat pendek tentang diri dan rencana", "Dialog situasi, cerita tentang diri"),
  scoring: T_SCORE,
  tips: ["Bedakan идти/ходить (satu arah/bolak-balik) dan ехать/ездить."],
  official: { label: "testing.spbu.ru", url: "https://testing.spbu.ru/" },
  sources: T_SRC,
  parts: [
    {
      id: "lexgram",
      section: "Лексика. Грамматика",
      title: "Kosakata dan tata bahasa",
      instructions: "Pilih bentuk yang tepat.",
      minutes: 4,
      questions: [
        mc({ task: "Падежи", prompt: "Вчера я ходил (　).", opts: ["в театр", "в театре", "театра", "театром"], explain: "Gerak ke tujuan: в + akusatif (в театр)." }),
        mc({ task: "Вид глагола", prompt: "Каждый день я (　) газету.", opts: ["читаю", "прочитаю", "прочитал", "прочитать"], explain: "Tindakan berulang memakai aspek imperfektif." }),
        mc({ task: "Глаголы движения", prompt: "Завтра мы (　) на дачу на машине.", opts: ["поедем", "пойдём", "ходим", "ездили"], explain: "Dengan kendaraan dan rencana satu kali: поехать." }),
      ],
    },
  ],
};

export const torflB1: Exam = {
  id: "trki-1",
  lang: "rusia",
  name: "ТРКИ-1",
  fullName: "Тест по русскому языку как иностранному, первый сертификационный уровень (ТРКИ-1)",
  org: T_ORG,
  level: "ТРКИ-1 (B1)",
  about: "Syarat umum untuk kuliah S1 dan S2 berbahasa Rusia (di luar jurusan filologi) serta untuk kerja di lingkungan berbahasa Rusia.",
  format: tFormat("Kasus dengan preposisi, partisip, kalimat majemuk", "Artikel, iklan, teks naratif", "Surat atau ringkasan berdasarkan teks atau audio", "Dialog situasi, monolog tentang topik, diskusi dari teks"),
  scoring: T_SCORE,
  tips: ["Kalimat dengan который (yang) dan kasusnya sering diuji di bagian tata bahasa."],
  official: { label: "testing.spbu.ru", url: "https://testing.spbu.ru/" },
  sources: T_SRC,
  parts: [
    {
      id: "lexgram-read",
      section: "Лексика · Чтение",
      title: "Tata bahasa dan membaca",
      instructions: "Pilih jawaban yang tepat.",
      minutes: 6,
      questions: [
        mc({ task: "Который", prompt: "Это студент, (　) я помогал готовиться к экзамену.", opts: ["которому", "который", "которого", "которым"], explain: "помогать + datif → которому." }),
        mc({
          task: "Чтение",
          passage: "В нашем городе открылась новая библиотека. Кроме книг, здесь можно бесплатно пользоваться компьютерами, а по субботам проходят встречи с писателями. Библиотека работает каждый день, кроме понедельника.",
          prompt: "Что можно делать в библиотеке по субботам?",
          opts: ["встречаться с писателями", "покупать компьютеры", "смотреть фильмы", "ничего, она закрыта"],
        }),
      ],
    },
    {
      id: "pismo",
      section: "Письмо",
      title: "Menulis",
      instructions: "Tulis sesuai tugas.",
      minutes: 15,
      questions: [
        {
          type: "write",
          task: "Письмо другу",
          prompt: "Напишите письмо другу о городе, в котором вы учитесь: что вам нравится, что не нравится и куда вы советуете пойти (не менее 80 слов).",
          minWords: 80,
          minutes: 15,
          checklist: ["Salam pembuka (Привет, …!) dan penutup.", "Hal yang disukai dan tidak disukai.", "Saran tempat dengan советую + infinitif.", "Minimal 80 kata."],
        },
      ],
    },
  ],
};

export const torflB2: Exam = {
  id: "trki-2",
  lang: "rusia",
  name: "ТРКИ-2",
  fullName: "Тест по русскому языку как иностранному, второй сертификационный уровень (ТРКИ-2)",
  org: T_ORG,
  level: "ТРКИ-2 (B2)",
  about: "Untuk lulusan dan profesional yang bekerja dalam bahasa Rusia (teknik, ekonomi, ilmu alam), serta untuk mahasiswa jurusan filologi pada tahap awal studi.",
  format: tFormat("Ungkapan resmi, gerund dan partisip, kolokasi", "Artikel publisistik dan ilmiah populer", "Surat resmi dan teks argumentatif", "Diskusi, presentasi pendapat, menanggapi kasus"),
  scoring: T_SCORE,
  tips: ["Teks publisistik memakai banyak деепричастие (сделав, говоря); latih mengenalinya."],
  official: { label: "testing.spbu.ru", url: "https://testing.spbu.ru/" },
  sources: T_SRC,
  parts: [
    {
      id: "chtenie",
      section: "Чтение",
      title: "Membaca",
      instructions: "Baca, lalu jawab.",
      minutes: 6,
      questions: [
        mc({
          task: "Чтение",
          passage:
            "Удалённая работа, ещё недавно казавшаяся привилегией, стала для многих нормой. Однако исследования показывают: сотрудники, полностью работающие из дома, реже получают повышение. Руководители, сами того не замечая, чаще поручают важные проекты тем, кого видят каждый день в офисе.",
          prompt: "Какой вывод можно сделать из текста?",
          opts: [
            "Работа только из дома может мешать карьерному росту.",
            "Удалённая работа по-прежнему редкость.",
            "Руководители специально наказывают удалённых сотрудников.",
            "В офисе работать менее эффективно.",
          ],
        }),
        mc({ task: "Лексика", prompt: "Решение было принято (　) мнения большинства.", opts: ["с учётом", "в течение", "по поводу", "в отличие"], explain: "с учётом + genitif = dengan mempertimbangkan." }),
      ],
    },
  ],
};

export const torflC: Exam = {
  id: "trki-3-4",
  lang: "rusia",
  name: "ТРКИ-3 dan ТРКИ-4",
  fullName: "Тест по русскому языку как иностранному, третий и четвёртый сертификационные уровни (ТРКИ-3, ТРКИ-4)",
  org: T_ORG,
  level: "ТРКИ-3 (C1), ТРКИ-4 (C2)",
  about: "Level lanjut untuk filolog, penerjemah, dosen bahasa Rusia, dan profesional yang bekerja penuh dalam bahasa Rusia. ТРКИ-4 setara penutur asli berpendidikan tinggi.",
  format: tFormat("Gaya bahasa, sinonim, frasa idiomatis", "Teks ilmiah, sastra, dan publisistik yang kompleks", "Teks argumentatif dan pengolahan beberapa sumber", "Debat, presentasi, analisis teks"),
  scoring: T_SCORE,
  tips: ["Pada level ini, kemampuan memilih gaya (научный, официально-деловой, публицистический) dinilai khusus."],
  official: { label: "testing.spbu.ru", url: "https://testing.spbu.ru/" },
  sources: T_SRC,
  parts: [
    {
      id: "stil",
      section: "Лексика",
      title: "Kosakata dan gaya",
      instructions: "Pilih jawaban yang tepat.",
      minutes: 3,
      questions: [
        mc({ task: "Фразеология", prompt: "«Водить за нос» значит:", opts: ["обманывать", "помогать", "наказывать", "торопить"] }),
        mc({ task: "Стиль", prompt: "Какое выражение подходит для официального письма?", opts: ["Просим Вас рассмотреть нашу заявку.", "Глянь, пожалуйста, нашу заявку.", "Ну посмотри уже заявку!", "Заявку-то видел?"] }),
      ],
    },
  ],
};

/* ---------------------------------------------------------------- CILS */

const C_ORG = "Università per Stranieri di Siena";
const C_SCORE = ["Lima kemampuan masing-masing 20 poin, total 100.", "Setiap kemampuan harus mencapai minimal 11 poin.", "Kemampuan yang lulus bisa disimpan (capitalizzabile) dan hanya yang gagal diulang dalam jangka waktu tertentu."];
const cFormat = (listen: string, read: string, struct: string, write: string, speak: string) => [
  { name: "Ascolto Menyimak", time: "lihat petunjuk resmi", items: "beberapa tugas", tasks: listen },
  { name: "Comprensione della lettura", time: "lihat petunjuk resmi", items: "beberapa tugas", tasks: read },
  { name: "Analisi delle strutture di comunicazione", time: "lihat petunjuk resmi", items: "beberapa tugas", tasks: struct },
  { name: "Produzione scritta", time: "lihat petunjuk resmi", items: "2 tugas", tasks: write },
  { name: "Produzione orale", time: "lihat petunjuk resmi", items: "2 tugas", tasks: speak },
];
const C_SRC = [
  { label: "CILS: Certificazione di Italiano come Lingua Straniera", url: "https://cils.unistrasi.it" },
  { label: "Unistrasi: Istruzioni svolgimento prove", url: "https://cils.unistrasi.it/public/articoli/28/Istruzioni%20svolgimento%20prove.pdf" },
];

export const cilsA2: Exam = {
  id: "cils-a2",
  lang: "italia",
  name: "CILS A2",
  fullName: "Certificazione di Italiano come Lingua Straniera, livello A2",
  org: C_ORG,
  level: "A2 (CEFR)",
  about: "Kemampuan dasar untuk kebutuhan sehari-hari. CILS A2 juga dipakai sebagai syarat izin tinggal jangka panjang (permesso di soggiorno UE per soggiornanti di lungo periodo).",
  format: cFormat("Dialog dan pengumuman", "Iklan, pesan, teks pendek", "Artikel, preposisi, passato prossimo", "Pesan dan teks pendek tentang pengalaman", "Presentasi diri dan dialog situasi"),
  scoring: C_SCORE,
  tips: ["Hafalkan kata kerja yang memakai essere di passato prossimo (andare, venire, partire, arrivare)."],
  official: { label: "cils.unistrasi.it", url: "https://cils.unistrasi.it" },
  sources: C_SRC,
  parts: [
    {
      id: "strutture",
      section: "Strutture",
      title: "Tata bahasa dalam konteks",
      instructions: "Pilih bentuk yang tepat.",
      minutes: 3,
      questions: [
        mc({ task: "Passato prossimo", prompt: "Ieri Maria (　) al mare con le amiche.", opts: ["è andata", "ha andato", "è andato", "andava"], explain: "andare memakai essere; subjek perempuan → andata." }),
        mc({ task: "Preposizioni", prompt: "Abito (　) Roma da tre anni.", opts: ["a", "in", "di", "per"], explain: "Kota memakai a: abito a Roma." }),
      ],
    },
  ],
};

export const cilsB1: Exam = {
  id: "cils-uno-b1",
  lang: "italia",
  name: "CILS UNO-B1",
  fullName: "Certificazione di Italiano come Lingua Straniera, livello UNO-B1",
  org: C_ORG,
  level: "B1 (CEFR)",
  about: "Kemampuan mandiri dalam kehidupan sehari-hari dan kerja. Varian CILS B1 Cittadinanza khusus dipakai untuk permohonan kewarganegaraan Italia, yang mensyaratkan level B1.",
  format: cFormat("Wawancara, pengumuman, siaran radio", "Artikel dan teks informatif", "Kata ganti, congiuntivo dasar, penghubung", "Surat dan teks deskriptif atau naratif", "Monolog dan dialog dengan penguji"),
  scoring: C_SCORE,
  tips: ["Kata ganti gabungan (glielo, me ne) sering diuji di Analisi delle strutture."],
  official: { label: "cils.unistrasi.it", url: "https://cils.unistrasi.it" },
  sources: C_SRC,
  parts: [
    {
      id: "lettura",
      section: "Lettura · Strutture",
      title: "Membaca dan tata bahasa",
      instructions: "Baca, lalu jawab.",
      minutes: 5,
      questions: [
        mc({
          task: "Comprensione della lettura",
          passage: "Il Comune organizza corsi gratuiti di italiano per adulti stranieri. Le lezioni si svolgono il martedì e il giovedì sera presso la biblioteca civica. Per iscriversi è necessario presentare un documento d'identità entro il 30 settembre.",
          prompt: "Che cosa serve per iscriversi al corso?",
          opts: ["un documento d'identità", "pagare una quota", "un certificato di lavoro", "un esame d'ingresso"],
        }),
        mc({ task: "Pronomi", prompt: "Hai dato il libro a Luca? Sì, (　) ho dato ieri.", opts: ["gliel'", "gli", "lo", "ne"], explain: "gli + lo → glielo, menjadi gliel' sebelum ho." }),
      ],
    },
  ],
};

export const cilsB2: Exam = {
  id: "cils-due-b2",
  lang: "italia",
  name: "CILS DUE-B2",
  fullName: "Certificazione di Italiano come Lingua Straniera, livello DUE-B2",
  org: C_ORG,
  level: "B2 (CEFR)",
  about: "Syarat bahasa yang diterima banyak universitas Italia untuk program berbahasa Italia, dan bukti kemampuan untuk bekerja di lingkungan profesional.",
  format: cFormat("Wawancara, berita, ceramah", "Artikel opini dan teks informatif panjang", "Congiuntivo, periodo ipotetico, kata ganti relatif", "Teks argumentatif dan surat formal", "Presentasi topik dan diskusi"),
  scoring: C_SCORE,
  tips: ["Periodo ipotetico tipe 2 dan 3 (se avessi…, avrei…) hampir selalu muncul."],
  official: { label: "cils.unistrasi.it", url: "https://cils.unistrasi.it" },
  sources: C_SRC,
  parts: [
    {
      id: "strutture",
      section: "Strutture",
      title: "Tata bahasa dalam konteks",
      instructions: "Pilih bentuk yang tepat.",
      minutes: 3,
      questions: [
        mc({ task: "Periodo ipotetico", prompt: "Se (　) più tempo, imparerei a suonare il pianoforte.", opts: ["avessi", "avrei", "ho", "avevo"], explain: "Se + congiuntivo imperfetto, condizionale presente." }),
        mc({ task: "Congiuntivo", prompt: "Penso che il treno (　) già partito.", opts: ["sia", "è", "sarà", "fosse stato"], explain: "Penso che + congiuntivo." }),
      ],
    },
  ],
};

export const cilsC: Exam = {
  id: "cils-tre-quattro",
  lang: "italia",
  name: "CILS TRE-C1 dan QUATTRO-C2",
  fullName: "Certificazione di Italiano come Lingua Straniera, livelli TRE-C1 e QUATTRO-C2",
  org: C_ORG,
  level: "C1 (TRE) dan C2 (QUATTRO)",
  about: "Level lanjut untuk pekerjaan dengan tuntutan bahasa tinggi, penerjemahan, dan mengajar bahasa Italia. QUATTRO-C2 menunjukkan penguasaan setara penutur asli berpendidikan.",
  format: cFormat("Kuliah, debat, siaran", "Teks sastra, ilmiah populer, dan opini", "Struktur kompleks, gaya, dan kosakata khusus", "Teks argumentatif dan menulis ulang teks dengan register lain", "Presentasi dan diskusi dengan penguji"),
  scoring: C_SCORE,
  tips: ["Latih menulis ulang teks informal menjadi formal; tugas mengubah register khas level lanjut."],
  official: { label: "cils.unistrasi.it", url: "https://cils.unistrasi.it" },
  sources: C_SRC,
  parts: [
    {
      id: "lessico",
      section: "Strutture",
      title: "Kosakata dan gaya",
      instructions: "Pilih jawaban yang tepat.",
      minutes: 3,
      questions: [
        mc({ task: "Lessico", prompt: "«Prendere due piccioni con una fava» significa:", opts: ["ottenere due risultati con un'azione sola", "fare due errori di seguito", "cucinare un piatto tipico", "perdere tempo inutilmente"] }),
        mc({ task: "Registro", prompt: "Quale formula è adatta a una lettera formale?", opts: ["In attesa di un Suo cortese riscontro, porgo distinti saluti.", "Ciao, fammi sapere!", "Ci sentiamo, eh?", "Baci a tutti!"] }),
      ],
    },
  ],
};

export const torflHigher = [torflA2, torflB1, torflB2, torflC];
export const cilsHigher = [cilsA2, cilsB1, cilsB2, cilsC];
