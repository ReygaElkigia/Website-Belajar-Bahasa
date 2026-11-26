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

/* ---------------------------------------------------------------- Latihan tambahan */

torflA2.parts.push({
  id: "eshche",
  section: "Чтение · Аудирование · Письмо",
  title: "Latihan tambahan",
  instructions: "Baca, dengarkan, atau tulis sesuai tugas.",
  minutes: 12,
  questions: [
    mc({ task: "Падежи", prompt: "Я часто звоню (　).", opts: ["маме", "маму", "мамы", "мамой"], explain: "звонить + datif." }),
    mc({ task: "Падежи", prompt: "У меня нет (　).", opts: ["машины", "машина", "машину", "машиной"], explain: "нет + genitif." }),
    mc({ task: "Падежи", prompt: "Мы долго говорили (　).", opts: ["о фильме", "фильм", "фильма", "с фильмом"], explain: "говорить о + preposisional." }),
    mc({
      task: "Чтение",
      passage: "Объявление. Магазин «Книги» работает с 10 до 20 часов, в субботу — с 11 до 18. В воскресенье магазин не работает. Скидка студентам — 10%.",
      prompt: "Когда магазин закрыт?",
      opts: ["в воскресенье", "в субботу", "в понедельник", "каждый день после 18"],
    }),
    mc({
      task: "Чтение",
      passage: "Меня зовут Анна. Я живу в Казани и учусь в университете на экономическом факультете. Утром у меня лекции, а вечером я работаю в кафе. В свободное время я люблю гулять по набережной.",
      prompt: "Что Анна делает вечером?",
      opts: ["работает в кафе", "слушает лекции", "гуляет по набережной", "учит экономику дома"],
    }),
    mc({
      task: "Аудирование",
      audio: "— Привет, Олег! Пойдём завтра в кино? — Завтра не могу, у меня экзамен. Давай в пятницу? — Хорошо, в пятницу в семь.",
      prompt: "Когда они пойдут в кино?",
      opts: ["в пятницу в семь", "завтра в семь", "после экзамена завтра", "в субботу"],
    }),
    {
      type: "write",
      task: "Письмо",
      prompt: "Напишите письмо другу о вашем выходном дне: где вы были, что делали, что вам понравилось (не менее 50 слов).",
      minWords: 50,
      minutes: 15,
      checklist: ["Salam pembuka dan penutup.", "Kata kerja lampau (был, ходил, смотрел).", "Kesan (мне понравилось…)."],
    },
  ],
});

torflB1.parts.push({
  id: "eshche",
  section: "Лексика · Аудирование · Говорение",
  title: "Latihan tambahan",
  instructions: "Kerjakan tugas berikut.",
  minutes: 12,
  questions: [
    mc({ task: "Грамматика", prompt: "Если бы у меня было время, я (　) с тобой в театр.", opts: ["пошёл бы", "пойду", "иду", "ходил"], explain: "Kalimat pengandaian: если бы … , … бы." }),
    mc({ task: "Грамматика", prompt: "Студенты, (　) в общежитии, часто готовят вместе.", opts: ["живущие", "живущих", "живущим", "жившим"], explain: "Partisip aktif nominatif jamak." }),
    mc({ task: "Лексика", prompt: "Он (　) экзамен с первого раза.", opts: ["сдал", "сдавал", "отдал", "продал"], explain: "сдать экзамен = lulus ujian (perfektif)." }),
    mc({ task: "Глаголы движения", prompt: "Вчера друзья (　) ко мне в гости.", opts: ["приходили", "уходили", "выходили", "проходили"] }),
    mc({
      task: "Аудирование",
      audio: "Внимание! Поезд номер двенадцать Москва — Санкт-Петербург отправляется с третьего пути. Повторяем: с третьего пути. Нумерация вагонов начинается с головы поезда.",
      prompt: "С какого пути отправляется поезд?",
      opts: ["с третьего", "с двенадцатого", "с первого", "с пятого"],
    }),
    mc({
      task: "Аудирование",
      audio: "— Ты решил, где будешь отдыхать летом? — Сначала хотел поехать на море, но билеты очень дорогие. Поеду лучше к бабушке в деревню: там тихо, лес, река.",
      prompt: "Почему он не поедет на море?",
      opts: ["билеты дорогие", "он не любит море", "бабушка болеет", "у него нет отпуска"],
    }),
    {
      type: "speak",
      task: "Говорение",
      prompt: "Расскажите о своём родном городе: где он находится, чем известен, что бы вы посоветовали посмотреть туристам.",
      prepSeconds: 60,
      speakSeconds: 150,
      checklist: ["Lokasi dan ciri kota.", "Tempat yang disarankan (советую посмотреть…).", "Kalimat majemuk dengan который."],
    },
  ],
});

torflB2.parts.push({
  id: "eshche",
  section: "Лексика · Аудирование · Письмо",
  title: "Latihan tambahan",
  instructions: "Kerjakan tugas berikut.",
  minutes: 18,
  questions: [
    mc({ task: "Грамматика", prompt: "(　) работу, он сразу пошёл домой.", opts: ["Закончив", "Заканчивая", "Закончивший", "Закончить"], explain: "Gerund perfektif: tindakan selesai sebelum tindakan utama." }),
    mc({ task: "Лексика", prompt: "Компания приняла решение (　) расходы на рекламу.", opts: ["сократить", "сокращаться", "укоротить", "убавиться"] }),
    mc({ task: "Лексика", prompt: "Этот вопрос не (　) к теме нашей встречи.", opts: ["относится", "принадлежит", "касается к", "подходит в"] }),
    mc({
      task: "Аудирование",
      audio: "Эксперт: Многие думают, что для изучения языка нужен особый талант. На самом деле гораздо важнее регулярность. Двадцать минут каждый день дают больше, чем три часа один раз в неделю.",
      prompt: "Что, по мнению эксперта, важнее всего?",
      opts: ["регулярность занятий", "талант", "длинные занятия раз в неделю", "дорогие курсы"],
    }),
    mc({
      task: "Чтение",
      passage: "Электронные книги не вытеснили бумажные, как предсказывали десять лет назад. Продажи бумажных книг даже немного выросли. Исследователи объясняют это тем, что для многих читателей книга — это не только текст, но и предмет, который приятно держать в руках и дарить.",
      prompt: "Как исследователи объясняют популярность бумажных книг?",
      opts: ["Книга ценится и как предмет.", "Электронные книги слишком дорогие.", "Бумажные книги легче читать в темноте.", "Электронных книг мало."],
    }),
    {
      type: "write",
      task: "Письмо: официальное письмо",
      prompt: "Напишите официальное письмо в администрацию университета с просьбой продлить срок сдачи курсовой работы. Объясните причину и предложите новый срок (не менее 100 слов).",
      minWords: 100,
      minutes: 25,
      checklist: ["Format resmi (Уважаемый…, С уважением).", "Alasan jelas.", "Usul tenggat baru.", "Gaya bahasa resmi (прошу Вас…)."],
    },
  ],
});

torflC.parts.push({
  id: "eshche",
  section: "Чтение · Письмо",
  title: "Latihan tambahan",
  instructions: "Kerjakan tugas berikut.",
  minutes: 20,
  questions: [
    mc({
      task: "Чтение",
      passage:
        "Принято сетовать на то, что молодёжь разучилась писать. Между тем никогда прежде люди не писали так много: сообщения, комментарии, посты. Иное дело, что эта письменная речь подчиняется другим законам — она ближе к устной и ценит скорость выше точности.",
      prompt: "Какова позиция автора?",
      opts: ["Письменная речь изменилась, а не исчезла.", "Молодёжь совсем перестала писать.", "Сообщения ничем не отличаются от книг.", "Точность важнее скорости."],
    }),
    mc({ task: "Фразеология", prompt: "«Бить баклуши» значит:", opts: ["бездельничать", "много работать", "ссориться", "торопиться"] }),
    mc({ task: "Фразеология", prompt: "«Как с гуся вода» говорят о человеке, которому:", opts: ["всё нипочём", "очень холодно", "некуда идти", "всё время везёт"] }),
    mc({ task: "Стиль", prompt: "Какое слово уместно в научном тексте?", opts: ["следовательно", "короче", "вообще-то", "типа"] }),
    {
      type: "write",
      task: "Письмо: аргументированный текст",
      prompt: "Напишите статью для студенческого журнала на тему «Нужно ли сохранять обязательное изучение литературы в школе?» (около 200 слов).",
      minWords: 180,
      maxWords: 240,
      minutes: 40,
      checklist: ["Pengantar topik.", "Argumen dengan contoh.", "Argumen lawan.", "Kesimpulan.", "Gaya publisistik."],
    },
  ],
});

cilsA2.parts.push({
  id: "ancora",
  section: "Ascolto · Lettura · Produzione",
  title: "Latihan tambahan",
  instructions: "Dengarkan, baca, atau tulis sesuai tugas.",
  minutes: 12,
  questions: [
    mc({
      task: "Ascolto",
      audio: "Attenzione: il treno regionale per Firenze delle ore 10 e 15 partirà dal binario 6 invece che dal binario 3. Ci scusiamo per il disagio.",
      prompt: "Da quale binario parte il treno per Firenze?",
      opts: ["dal binario 6", "dal binario 3", "dal binario 10", "dal binario 15"],
    }),
    mc({
      task: "Ascolto",
      audio: "Donna: Andiamo al ristorante stasera? Uomo: Stasera sono stanco, preferisco mangiare a casa. Domani sera va bene? Donna: Va bene, domani allora.",
      prompt: "Quando vanno al ristorante?",
      opts: ["domani sera", "stasera", "a pranzo", "non ci vanno"],
    }),
    mc({
      task: "Comprensione della lettura",
      passage: "Cercasi cameriere/a per ristorante in centro. Orario: dal martedì alla domenica, sera. Richiesta esperienza minima di un anno e conoscenza dell'inglese. Inviare il CV a lavoro@trattoria.it",
      prompt: "Cosa è richiesto per il lavoro?",
      opts: ["un anno di esperienza e l'inglese", "lavorare il lunedì", "una laurea", "la patente"],
    }),
    mc({
      task: "Comprensione della lettura",
      passage: "Cara Giulia,\nsono arrivata a Napoli ieri sera. La città è bellissima e la pizza è buonissima! Oggi visito il museo archeologico e domani vado a Pompei. Torno sabato.\nUn abbraccio,\nSara",
      prompt: "Che cosa fa Sara domani?",
      opts: ["va a Pompei", "visita il museo", "torna a casa", "arriva a Napoli"],
    }),
    mc({ task: "Strutture", prompt: "La settimana scorsa (　) un bel libro.", opts: ["ho letto", "sono letto", "leggo", "leggerò"] }),
    mc({ task: "Strutture", prompt: "Domani (　) al mare con i miei amici.", opts: ["andrò", "sono andato", "andavo", "vado stato"] }),
    {
      type: "write",
      task: "Produzione scritta",
      prompt: "Scrivi un messaggio a un amico italiano: lo inviti a cena a casa tua sabato. Spiega a che ora, chi viene e cosa cucini (40–50 parole).",
      minWords: 40,
      maxWords: 60,
      minutes: 15,
      checklist: ["Salam.", "Jam, siapa yang datang, menu.", "Penutup."],
    },
  ],
});

cilsB1.parts.push({
  id: "ancora",
  section: "Ascolto · Strutture · Produzione",
  title: "Latihan tambahan",
  instructions: "Kerjakan tugas berikut.",
  minutes: 14,
  questions: [
    mc({
      task: "Ascolto",
      audio: "Intervistatore: Perché ha deciso di aprire un negozio di biciclette? Donna: Perché in città sempre più persone usano la bici per andare al lavoro, ma mancavano posti dove ripararla. Ho visto un'occasione e l'ho presa.",
      prompt: "Perché la donna ha aperto il negozio?",
      opts: ["Mancavano posti per riparare le bici.", "Voleva vendere automobili.", "Le biciclette costano poco.", "Non aveva altro lavoro."],
    }),
    mc({
      task: "Ascolto",
      audio: "Radio: Il museo civico resterà chiuso per lavori di restauro fino alla fine di marzo. Durante la chiusura, alcune opere saranno esposte nella biblioteca comunale.",
      prompt: "Dove si possono vedere alcune opere durante la chiusura?",
      opts: ["nella biblioteca comunale", "al museo civico", "in una galleria privata", "da nessuna parte"],
    }),
    mc({
      task: "Comprensione della lettura",
      passage: "Sempre più italiani scelgono di passare le vacanze in campagna, negli agriturismi. Oltre a dormire e mangiare prodotti locali, gli ospiti possono partecipare alla vendemmia o alla raccolta delle olive.",
      prompt: "Cosa possono fare gli ospiti degli agriturismi?",
      opts: ["partecipare alla raccolta delle olive", "visitare musei in città", "lavorare in un hotel", "fare corsi di lingua"],
    }),
    mc({ task: "Strutture", prompt: "Spero che domani (　) bel tempo.", opts: ["faccia", "fa", "farà", "faceva"], explain: "Sperare che + congiuntivo." }),
    mc({ task: "Strutture", prompt: "Quando ero piccolo, (　) sempre al parco.", opts: ["giocavo", "ho giocato", "giocherò", "gioco"] }),
    mc({ task: "Strutture", prompt: "Ti piacciono le mele? Sì, (　) mangio una ogni giorno.", opts: ["ne", "le", "ci", "la"], explain: "ne = darinya (kuantitas)." }),
    {
      type: "write",
      task: "Produzione scritta",
      prompt: "Scrivi un'e-mail all'ufficio turistico di Siena per chiedere informazioni su visite guidate, prezzi e orari per un gruppo di dieci persone (80–100 parole).",
      minWords: 80,
      maxWords: 100,
      minutes: 25,
      checklist: ["Salam formal (Gentili signori,).", "Tiga informasi yang ditanyakan.", "Condizionale untuk sopan (vorrei, potreste).", "Penutup formal (Distinti saluti)."],
    },
  ],
});

cilsB2.parts.push({
  id: "ancora",
  section: "Ascolto · Lettura · Produzione",
  title: "Latihan tambahan",
  instructions: "Kerjakan tugas berikut.",
  minutes: 18,
  questions: [
    mc({
      task: "Ascolto",
      audio: "Esperta: Il lavoro da remoto ha ridotto il traffico nelle grandi città, ma ha creato nuovi problemi: molti lavoratori faticano a separare la vita privata da quella professionale e rispondono alle e-mail anche di sera.",
      prompt: "Quale problema segnala l'esperta?",
      opts: ["La difficoltà a separare lavoro e vita privata.", "L'aumento del traffico.", "La mancanza di computer.", "Gli stipendi più bassi."],
    }),
    mc({
      task: "Comprensione della lettura",
      passage:
        "Il fenomeno dello spopolamento colpisce molti piccoli borghi italiani. Alcuni comuni hanno messo in vendita case abbandonate a un euro, con l'obbligo di ristrutturarle entro tre anni. L'iniziativa ha attirato l'attenzione internazionale, anche se non tutti gli acquirenti si trasferiscono stabilmente.",
      prompt: "Quale condizione devono rispettare gli acquirenti?",
      opts: ["ristrutturare la casa entro tre anni", "vivere nel borgo per sempre", "pagare un euro al mese", "essere cittadini italiani"],
    }),
    mc({
      task: "Comprensione della lettura",
      passage: "Secondo un recente sondaggio, i giovani italiani leggono più libri dei loro genitori, ma preferiscono il formato digitale e gli audiolibri. Gli editori stanno quindi investendo in nuove piattaforme.",
      prompt: "Come reagiscono gli editori?",
      opts: ["investono in piattaforme digitali", "smettono di pubblicare libri", "abbassano i prezzi della carta", "chiudono le librerie"],
    }),
    mc({ task: "Strutture", prompt: "Nonostante (　) stanco, ha continuato a lavorare.", opts: ["fosse", "era", "sarebbe", "è stato"], explain: "Nonostante + congiuntivo." }),
    mc({ task: "Strutture", prompt: "Il libro (　) ti ho parlato è finalmente uscito.", opts: ["di cui", "che", "a cui", "il quale"], explain: "parlare di → di cui." }),
    {
      type: "write",
      task: "Produzione scritta: testo argomentativo",
      prompt: "«Le città dovrebbero vietare le auto nei centri storici?» Scrivi un testo argomentativo per il giornale locale (160–180 parole).",
      minWords: 160,
      maxWords: 180,
      minutes: 40,
      checklist: ["Pengantar.", "Argumen pro dan kontra.", "Penghubung (tuttavia, inoltre, quindi).", "Kesimpulan pribadi."],
    },
    {
      type: "speak",
      task: "Produzione orale",
      prompt: "Parla per circa tre minuti del tema «Studiare all'estero: vantaggi e difficoltà», facendo riferimento alla tua esperienza o a quella di persone che conosci.",
      prepSeconds: 60,
      speakSeconds: 180,
      checklist: ["Struktur jelas.", "Pengalaman atau contoh.", "Kelebihan dan kesulitan.", "Pendapat pribadi."],
    },
  ],
});

cilsC.parts.push({
  id: "ancora",
  section: "Lettura · Produzione",
  title: "Latihan tambahan",
  instructions: "Kerjakan tugas berikut.",
  minutes: 20,
  questions: [
    mc({
      task: "Comprensione della lettura",
      passage:
        "Si tende a considerare il dialetto un retaggio del passato destinato a scomparire. Eppure, in molte regioni, i giovani lo recuperano nella musica e sui social, non come lingua d'uso quotidiano ma come segno d'identità. Più che di declino, si dovrebbe parlare di trasformazione.",
      prompt: "Qual è la tesi dell'autore?",
      opts: ["Il dialetto si sta trasformando, non scomparendo.", "Il dialetto scomparirà presto.", "I giovani parlano solo dialetto.", "Il dialetto è vietato sui social."],
    }),
    mc({ task: "Lessico", prompt: "«Avere le mani bucate» significa:", opts: ["spendere troppo", "essere ferito", "lavorare molto", "essere maldestro"] }),
    mc({ task: "Strutture", prompt: "Qualora (　) problemi, contatti subito l'assistenza.", opts: ["sorgessero", "sorgono", "sorgeranno", "sono sorti"], explain: "Qualora + congiuntivo." }),
    mc({ task: "Registro", prompt: "Quale espressione è adatta a un saggio accademico?", opts: ["Ne consegue che…", "Cioè, tipo…", "Insomma, alla fine…", "Ma dai, è ovvio che…"] }),
    {
      type: "write",
      task: "Riformulazione di registro",
      passage: "Messaggio vocale: «Ciao a tutti, domani niente riunione, il capo sta male. La spostiamo a martedì, stessa ora. Portate i dati, mi raccomando!»",
      prompt: "Riscrivi il messaggio come e-mail formale indirizzata a partner esterni.",
      minWords: 50,
      maxWords: 110,
      minutes: 15,
      checklist: ["Register formal.", "Semua informasi tetap ada.", "Salam formal."],
      model:
        "Gentili partner,\nVi comunichiamo che la riunione prevista per domani è rinviata a causa di un'indisposizione del nostro direttore. Vi proponiamo di tenerla martedì prossimo alla stessa ora. Vi saremmo grati se poteste portare i dati aggiornati.\nCordiali saluti",
    },
  ],
});

export const torflHigher = [torflA2, torflB1, torflB2, torflC];
export const cilsHigher = [cilsA2, cilsB1, cilsB2, cilsC];
