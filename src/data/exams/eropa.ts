import type { Exam } from "./types";

const rf = ["Richtig", "Falsch"];

export const goethe: Exam = {
  id: "goethe-a1",
  lang: "jerman",
  name: "Goethe-Zertifikat A1",
  fullName: "Goethe-Zertifikat A1: Start Deutsch 1",
  org: "Goethe-Institut",
  level: "A1 (CEFR)",
  about:
    "Sertifikat bahasa Jerman tingkat dasar yang sering diminta untuk visa reuni keluarga ke Jerman dan sebagai bukti awal untuk Ausbildung. Bisa diambil di Goethe-Institut Jakarta, Bandung, dan Surabaya.",
  format: [
    { name: "Hören Menyimak", time: "sekitar 20 menit", items: "3 bagian", tasks: "Percakapan pendek, pengumuman, pesan telepon" },
    { name: "Lesen Membaca", time: "sekitar 25 menit", items: "3 bagian", tasks: "Surat pendek, iklan, papan dan tanda" },
    { name: "Schreiben Menulis", time: "sekitar 20 menit", items: "2 bagian", tasks: "Mengisi formulir, menulis pesan sekitar 30 kata" },
    { name: "Sprechen Berbicara", time: "ujian kelompok", items: "3 bagian", tasks: "Memperkenalkan diri, bertanya dan menjawab, meminta sesuatu" },
  ],
  scoring: [
    "Bagian tertulis (Hören, Lesen, Schreiben) berlangsung 65 menit tanpa jeda.",
    "Nilai maksimal 100; lulus dengan minimal 60 poin.",
    "Ujian lisan dilakukan berkelompok, paling lambat 14 hari setelah ujian tertulis.",
  ],
  tips: ["Waktu dalam bahasa Jerman: 'halb zehn' berarti 9.30, bukan 10.30.", "Di Schreiben Teil 2, jawab ketiga poin yang diminta; poin yang terlewat mengurangi nilai."],
  official: { label: "goethe.de", url: "https://www.goethe.de/ins/sg/de/kur/prf/gzsd1/inf.html" },
  sources: [
    { label: "Goethe-Institut: Weitere Informationen A1", url: "https://www.goethe.de/ins/sg/de/kur/prf/gzsd1/inf.html" },
    { label: "Goethe-Institut: Durchführungsbestimmungen A1", url: "https://www.goethe.de/resources/files/pdf325/durchfuehrungsbestimmungen_a1_start_deutsch_1.pdf" },
    { label: "Goethe-Institut: Übungssatz A1", url: "https://www.goethe.de/pro/relaunch/prf/materialien/A1_sd1/sd_1_uebungssatz01.pdf" },
  ],
  parts: [
    {
      id: "hoeren",
      section: "Hören",
      title: "Menyimak",
      instructions: "Dengarkan, lalu jawab.",
      minutes: 4,
      questions: [
        {
          type: "mc",
          task: "Teil 1",
          audio: "Frau Müller, hier ist die Praxis Doktor Schmidt. Ihr Termin ist am Dienstag um halb zehn.",
          prompt: "Wann ist der Termin?",
          options: ["Dienstag, 9:30 Uhr", "Dienstag, 10:30 Uhr", "Donnerstag, 9:30 Uhr"],
          answer: 0,
          explain: "halb zehn = setengah menuju sepuluh = 9.30.",
        },
        {
          type: "mc",
          task: "Teil 2",
          audio: "Achtung am Gleis drei: Der Zug nach München fährt heute fünfzehn Minuten später ab.",
          prompt: "Der Zug nach München hat Verspätung.",
          options: rf,
          answer: 0,
        },
      ],
    },
    {
      id: "lesen",
      section: "Lesen",
      title: "Membaca",
      instructions: "Baca, lalu pilih Richtig (benar) atau Falsch (salah).",
      minutes: 5,
      questions: [
        {
          type: "mc",
          task: "Teil 1",
          passage: "Liebe Anna,\nam Samstag mache ich eine Party. Sie beginnt um 19 Uhr. Kannst du einen Salat mitbringen?\nViele Grüße\nJonas",
          prompt: "Die Party ist am Sonntag.",
          options: rf,
          answer: 1,
        },
        {
          type: "mc",
          task: "Teil 1",
          passage: "Liebe Anna,\nam Samstag mache ich eine Party. Sie beginnt um 19 Uhr. Kannst du einen Salat mitbringen?\nViele Grüße\nJonas",
          prompt: "Anna soll etwas zum Essen mitbringen.",
          options: rf,
          answer: 0,
        },
        {
          type: "mc",
          task: "Teil 3",
          passage: "BÄCKEREI KRAUSE\nHeute geschlossen!\nAb morgen wieder von 7 bis 18 Uhr geöffnet.",
          prompt: "Sie können heute in der Bäckerei Brot kaufen.",
          options: rf,
          answer: 1,
        },
      ],
    },
    {
      id: "schreiben",
      section: "Schreiben",
      title: "Menulis",
      instructions: "Isi formulir, lalu tulis pesan singkat.",
      minutes: 12,
      questions: [
        {
          type: "type",
          task: "Teil 1: Formular",
          passage: "Maria Santos kommt aus Spanien. Sie ist 28 Jahre alt und wohnt jetzt in Berlin. Sie möchte einen Deutschkurs am Abend machen.",
          prompt: "Isi kolom formulir untuk Maria.",
          display: "Herkunftsland: ___",
          answer: "Spanien",
        },
        {
          type: "write",
          task: "Teil 2: Mitteilung",
          prompt:
            "Sie können morgen nicht zum Deutschkurs kommen. Schreiben Sie Ihrer Lehrerin, Frau Weber: Warum kommen Sie nicht? Wann kommen Sie wieder? Bitten Sie um die Hausaufgaben.",
          minWords: 30,
          minutes: 10,
          checklist: ["Anrede: Liebe Frau Weber,", "Alasan tidak datang.", "Kapan datang lagi.", "Meminta pekerjaan rumah.", "Salam penutup dan nama."],
          model:
            "Liebe Frau Weber,\nich kann morgen leider nicht zum Kurs kommen, denn ich bin krank. Ich komme am Donnerstag wieder. Können Sie mir bitte die Hausaufgaben schicken?\nViele Grüße\nRina",
        },
      ],
    },
    {
      id: "sprechen",
      section: "Sprechen",
      title: "Berbicara",
      instructions: "Bicaralah dengan keras seperti di ujian.",
      questions: [
        {
          type: "speak",
          task: "Teil 1: Sich vorstellen",
          prompt: "Stellen Sie sich vor: Name? Alter? Land? Wohnort? Sprachen? Beruf? Hobby?",
          speakSeconds: 60,
          checklist: ["Menyebut ketujuh poin.", "Kalimat lengkap: Ich heiße…, Ich bin … Jahre alt, Ich komme aus…"],
          model: "Ich heiße Rina. Ich bin 22 Jahre alt. Ich komme aus Indonesien und wohne in Bandung. Ich spreche Indonesisch, Englisch und ein bisschen Deutsch. Ich bin Studentin. Mein Hobby ist Fotografieren.",
        },
      ],
    },
  ],
};

export const delf: Exam = {
  id: "delf-a1",
  lang: "prancis",
  name: "DELF A1",
  fullName: "Diplôme d'études en langue française, niveau A1",
  org: "France Éducation international, untuk Kementerian Pendidikan Prancis",
  level: "A1 (CEFR)",
  about:
    "Diploma bahasa Prancis resmi yang berlaku seumur hidup. Di Indonesia diselenggarakan oleh Institut français d'Indonésie (IFI). Dipakai untuk studi ke Prancis dan bukti kemampuan bahasa.",
  format: [
    { name: "Compréhension de l'oral", time: "sekitar 20 menit", items: "4 latihan", tasks: "Mendengarkan dokumen audio pendek dan menjawab" },
    { name: "Compréhension des écrits", time: "30 menit", items: "4 latihan", tasks: "Membaca dokumen sehari-hari dan menjawab" },
    { name: "Production écrite", time: "30 menit", items: "2 latihan", tasks: "Mengisi formulir dan menulis pesan minimal 40 kata" },
    { name: "Production orale", time: "5 sampai 7 menit, persiapan 10 menit", items: "3 bagian", tasks: "Wawancara terpandu, bertukar informasi, dialog simulasi" },
  ],
  scoring: ["Setiap bagian bernilai 25, total 100.", "Lulus dengan minimal 50 dari 100, dan minimal 5 dari 25 di setiap bagian."],
  tips: ["Di production écrite, hitung kata Anda: kurang dari 40 kata mengurangi nilai."],
  official: { label: "france-education-international.fr", url: "https://www.france-education-international.fr/diplome/delf-tout-public/niveau-a1" },
  sources: [{ label: "France Éducation international: DELF A1", url: "https://www.france-education-international.fr/en/diplome/delf-tout-public/niveau-a1" }],
  parts: [
    {
      id: "comprehension",
      section: "Compréhension",
      title: "Menyimak dan membaca",
      instructions: "Dengarkan atau baca, lalu jawab.",
      minutes: 6,
      questions: [
        {
          type: "mc",
          task: "Compréhension de l'oral",
          audio: "Bonjour Paul, c'est Léa. On se retrouve devant le cinéma à dix-huit heures trente. N'oublie pas les billets ! À ce soir.",
          prompt: "Où est le rendez-vous ?",
          options: ["Devant le cinéma", "À la gare", "Chez Léa"],
          answer: 0,
        },
        {
          type: "mc",
          task: "Compréhension de l'oral",
          audio: "Bonjour Paul, c'est Léa. On se retrouve devant le cinéma à dix-huit heures trente. N'oublie pas les billets ! À ce soir.",
          prompt: "À quelle heure ?",
          options: ["18 h 30", "16 h 30", "19 h 00"],
          answer: 0,
        },
        {
          type: "mc",
          task: "Compréhension des écrits",
          passage: "À LOUER\nAppartement 2 pièces, centre-ville, près de la gare.\n650 € par mois.\nAppelez le 06 12 34 56 78 après 18 h.",
          prompt: "Quand faut-il téléphoner ?",
          options: ["Après 18 heures", "Le matin", "Le week-end seulement"],
          answer: 0,
        },
      ],
    },
    {
      id: "production",
      section: "Production",
      title: "Menulis dan berbicara",
      instructions: "Tulis pesan minimal 40 kata, lalu latih wawancara.",
      questions: [
        {
          type: "write",
          task: "Production écrite",
          prompt: "Vous êtes en vacances. Vous écrivez une carte postale à un ami français : où vous êtes, le temps qu'il fait, vos activités.",
          minWords: 40,
          minutes: 15,
          checklist: ["Salam pembuka (Cher…/Chère…).", "Tempat Anda berada.", "Cuaca.", "Dua kegiatan.", "Salam penutup (Bisous, À bientôt)."],
          model: "Cher Thomas,\nJe suis à Bali avec ma famille. Il fait chaud et il y a beaucoup de soleil. Le matin, je nage à la plage et l'après-midi, je visite des temples. Le soir, nous mangeons du poisson au restaurant. C'est magnifique !\nÀ bientôt,\nRina",
        },
        {
          type: "speak",
          task: "Entretien dirigé",
          prompt: "Présentez-vous : votre nom, votre âge, votre pays, votre ville, votre profession et vos loisirs.",
          speakSeconds: 60,
          checklist: ["Je m'appelle…, J'ai … ans, J'habite à…", "Menyebut profesi dan hobi."],
        },
      ],
    },
  ],
};

export const dele: Exam = {
  id: "dele-a1",
  lang: "spanyol",
  name: "DELE A1",
  fullName: "Diploma de Español como Lengua Extranjera, nivel A1",
  org: "Instituto Cervantes",
  level: "A1 (CEFR)",
  about:
    "Diploma resmi bahasa Spanyol dari pemerintah Spanyol, berlaku tanpa batas waktu dan diakui di seluruh dunia berbahasa Spanyol.",
  note: "Format DELE A1 diperbarui sejak 2020. Waktu bagian ekspresi tidak tercantum di sumber yang kami baca; cek Guía del examen DELE A1 v2020.",
  format: [
    { name: "Comprensión de lectura", time: "45 menit", items: "25 soal, 4 tugas", tasks: "Pesan, iklan, dan teks pendek" },
    { name: "Comprensión auditiva", time: "20 menit", items: "25 soal, 4 tugas", tasks: "Percakapan dan pengumuman pendek" },
    { name: "Expresión e interacción escritas", time: "lihat panduan", items: "2 tugas", tasks: "Formulir dan pesan pendek" },
    { name: "Expresión e interacción orales", time: "lihat panduan", items: "beberapa tugas", tasks: "Presentasi diri dan percakapan dengan penguji" },
  ],
  scoring: ["Nilai dibagi dua kelompok: (bacaan + menulis) dan (menyimak + berbicara). Peserta harus lulus di kedua kelompok."],
  tips: ["Pengumuman stasiun dan bandara sering muncul di comprensión auditiva. Fokus pada angka: jalur, jam, dan nomor."],
  official: { label: "examenes.cervantes.es", url: "https://examenes.cervantes.es/a1a2/a1_en.htm" },
  sources: [
    { label: "Instituto Cervantes: DELE A1", url: "https://examenes.cervantes.es/a1a2/a1_en.htm" },
    { label: "Instituto Cervantes: Guía del examen DELE A1 v2020", url: "https://examenes.cervantes.es/sites/default/files/DELE_A1_v2020_Guia-de-examen.pdf" },
  ],
  parts: [
    {
      id: "comprension",
      section: "Comprensión",
      title: "Membaca dan menyimak",
      instructions: "Baca atau dengarkan, lalu jawab.",
      minutes: 6,
      questions: [
        {
          type: "mc",
          task: "Comprensión de lectura",
          passage: "Hola, Marta:\nEsta tarde no puedo ir al gimnasio porque tengo que trabajar hasta las ocho. ¿Vamos mañana a las siete?\nUn beso,\nLucía",
          prompt: "¿Por qué Lucía no va al gimnasio hoy?",
          options: ["Porque trabaja.", "Porque está enferma.", "Porque tiene clase."],
          answer: 0,
        },
        {
          type: "mc",
          task: "Comprensión de lectura",
          passage: "Hola, Marta:\nEsta tarde no puedo ir al gimnasio porque tengo que trabajar hasta las ocho. ¿Vamos mañana a las siete?\nUn beso,\nLucía",
          prompt: "¿Cuándo quiere ir Lucía al gimnasio?",
          options: ["Mañana a las siete.", "Hoy a las ocho.", "Mañana a las ocho."],
          answer: 0,
        },
        {
          type: "mc",
          task: "Comprensión auditiva",
          audio: "Atención, señores pasajeros: el tren con destino a Sevilla saldrá por la vía cuatro.",
          prompt: "¿Por qué vía sale el tren a Sevilla?",
          options: ["Vía 4", "Vía 14", "Vía 2"],
          answer: 0,
        },
      ],
    },
    {
      id: "expresion",
      section: "Expresión",
      title: "Menulis",
      instructions: "Tulis email singkat.",
      questions: [
        {
          type: "write",
          task: "Expresión e interacción escritas",
          prompt: "Escribe un correo a un amigo para invitarlo a tu cumpleaños. Indica el día, la hora y el lugar de la fiesta.",
          minWords: 30,
          minutes: 15,
          checklist: ["Salam (Hola…).", "Hari.", "Jam.", "Tempat.", "Penutup (Un abrazo)."],
        },
      ],
    },
  ],
};

export const torfl: Exam = {
  id: "trki-teu",
  lang: "rusia",
  name: "ТРКИ Elementer (TORFL)",
  fullName: "Тест по русскому языку как иностранному, элементарный уровень (ТЭУ)",
  org: "Sistem Ujian Negara Federasi Rusia (pusat uji di universitas Rusia)",
  level: "ТЭУ (A1)",
  about: "Ujian resmi bahasa Rusia untuk penutur asing, dipakai untuk kuliah di Rusia dan beasiswa pemerintah Rusia.",
  format: [
    { name: "Лексика. Грамматика", time: "sekitar 50 menit", items: "soal pilihan ganda", tasks: "Bentuk kasus, kata kerja, kosakata" },
    { name: "Чтение Membaca", time: "lihat spesifikasi", items: "beberapa teks", tasks: "Memahami teks pendek" },
    { name: "Аудирование Menyimak", time: "lihat spesifikasi", items: "beberapa audio", tasks: "Memahami dialog dan pengumuman" },
    { name: "Письмо Menulis", time: "lihat spesifikasi", items: "1 sampai 2 tugas", tasks: "Teks tentang diri sendiri" },
    { name: "Говорение Berbicara", time: "lihat spesifikasi", items: "beberapa tugas", tasks: "Dialog dan monolog pendek" },
  ],
  scoring: ["Ada lima subtes. Untuk lulus, peserta perlu minimal 66% di setiap subtes."],
  tips: ["Kasus lokatif (в Москве, в школе) dan genitif setelah нет (нет брата) muncul sejak level dasar."],
  official: { label: "Contoh tes ТЭУ (Universitas Bergamo)", url: "https://www.unibg.it/sites/default/files/training_tests_-_elementary.pdf" },
  sources: [
    { label: "Training tests: Elementary level", url: "https://www.unibg.it/sites/default/files/training_tests_-_elementary.pdf" },
    { label: "Universitas Herzen: struktur ТРКИ", url: "https://www.herzen.spb.ru/upload/medialibrary/329/blyd1fxnx36jrw0jm20a2bymyd5bc7rs/TRKI2.pdf" },
  ],
  parts: [
    {
      id: "lexgram",
      section: "Лексика. Грамматика",
      title: "Kosakata dan tata bahasa",
      instructions: "Pilih bentuk yang benar.",
      minutes: 4,
      questions: [
        { type: "mc", prompt: "Я живу в ___.", options: ["Москва", "Москве", "Москву"], answer: 1, explain: "Lokatif setelah в (di): в Москве." },
        { type: "mc", prompt: "У меня нет ___.", options: ["брат", "брата", "брату"], answer: 1, explain: "Genitif setelah нет: нет брата." },
        { type: "mc", prompt: "Мы идём ___ магазин.", options: ["в", "на", "из"], answer: 0, explain: "в + akusatif untuk arah ke dalam: в магазин." },
      ],
    },
    {
      id: "chtenie-audirovanie",
      section: "Чтение. Аудирование",
      title: "Membaca dan menyimak",
      instructions: "Baca atau dengarkan, lalu jawab.",
      minutes: 5,
      questions: [
        {
          type: "mc",
          passage: "Меня зовут Анна. Я студентка. Я учусь в университете в Москве. Мой брат работает врачом в больнице.",
          prompt: "Кем работает брат Анны?",
          options: ["Врачом", "Студентом", "Учителем"],
          answer: 0,
        },
        {
          type: "mc",
          audio: "Магазин работает с девяти утра до восьми вечера, без перерыва.",
          prompt: "Когда закрывается магазин?",
          options: ["В 20:00", "В 9:00", "В 18:00"],
          answer: 0,
        },
      ],
    },
    {
      id: "pismo",
      section: "Письмо",
      title: "Menulis",
      instructions: "Tulis tentang diri Anda.",
      questions: [
        {
          type: "write",
          prompt: "Напишите о себе: как вас зовут, откуда вы, где вы живёте, где учитесь или работаете, что вы любите делать.",
          minWords: 30,
          minutes: 15,
          checklist: ["Меня зовут…", "Я из…", "Я живу в … (lokatif).", "Я учусь / работаю…", "Я люблю…"],
        },
      ],
    },
  ],
};

export const cils: Exam = {
  id: "cils-a1",
  lang: "italia",
  name: "CILS A1",
  fullName: "Certificazione di Italiano come Lingua Straniera, livello A1",
  org: "Università per Stranieri di Siena",
  level: "A1 (CEFR)",
  about: "Sertifikasi bahasa Italia resmi yang diakui pemerintah Italia, dipakai untuk kuliah dan izin tinggal. Bisa diambil di Istituto Italiano di Cultura Jakarta.",
  format: [
    { name: "Ascolto Menyimak", time: "lihat petunjuk resmi", items: "beberapa tugas", tasks: "Dialog dan pengumuman pendek" },
    { name: "Comprensione della lettura", time: "sekitar 30 menit", items: "beberapa tugas", tasks: "Teks dan pengumuman" },
    { name: "Analisi delle strutture di comunicazione", time: "lihat petunjuk resmi", items: "beberapa tugas", tasks: "Tata bahasa dalam konteks" },
    { name: "Produzione scritta", time: "lihat petunjuk resmi", items: "2 tugas", tasks: "Pesan dan teks pendek" },
    { name: "Produzione orale", time: "lihat petunjuk resmi", items: "2 tugas", tasks: "Presentasi diri dan percakapan" },
  ],
  scoring: ["Lima kemampuan masing-masing 20 poin, total 100.", "Setiap kemampuan harus mencapai minimal 11 poin; total minimal 55."],
  tips: ["Bagian analisi delle strutture khas CILS: kuasai konjugasi presente dan passato prossimo."],
  official: { label: "cils.unistrasi.it", url: "https://cils.unistrasi.it" },
  sources: [
    { label: "Unistrasi: Istruzioni svolgimento prove", url: "https://cils.unistrasi.it/public/articoli/28/Istruzioni%20svolgimento%20prove.pdf" },
    { label: "CLA Unipd: Linee guida CILS", url: "https://cla.unipd.it/wp-content/uploads/2025/03/linee_guida_cils_pdf2.pdf" },
  ],
  parts: [
    {
      id: "ascolto-lettura",
      section: "Ascolto e lettura",
      title: "Menyimak dan membaca",
      instructions: "Dengarkan atau baca, lalu jawab.",
      minutes: 5,
      questions: [
        {
          type: "mc",
          task: "Ascolto",
          audio: "Buongiorno, vorrei un caffè e un cornetto, per favore. Ecco a lei. Sono due euro e cinquanta.",
          prompt: "Quanto paga il cliente?",
          options: ["2,50 €", "2,15 €", "5,20 €"],
          answer: 0,
        },
        {
          type: "mc",
          task: "Comprensione della lettura",
          passage: "MUSEO CIVICO\nAperto dal martedì alla domenica, dalle 9 alle 19.\nIl lunedì è chiuso.\nIngresso gratuito la prima domenica del mese.",
          prompt: "Quando è chiuso il museo?",
          options: ["Il lunedì", "La domenica", "Il martedì"],
          answer: 0,
        },
      ],
    },
    {
      id: "strutture",
      section: "Analisi delle strutture",
      title: "Struktur komunikasi",
      instructions: "Pilih bentuk yang tepat.",
      minutes: 3,
      questions: [
        {
          type: "gap",
          prompt: "Lengkapi teks.",
          text: "Mi chiamo Rina e [0] indonesiana. Ieri [1] al cinema con un'amica e oggi [2] italiano.",
          gaps: [
            { options: ["sono", "è", "sei"], answer: 0 },
            { options: ["sono andata", "vado", "andrò"], answer: 0 },
            { options: ["studio", "studia", "studiano"], answer: 0 },
          ],
          explain: "io sono, passato prossimo 'sono andata' untuk kemarin, dan io studio.",
        },
      ],
    },
    {
      id: "scritta",
      section: "Produzione scritta",
      title: "Menulis",
      instructions: "Tulis pesan pendek.",
      questions: [
        {
          type: "write",
          prompt: "Scrivi un messaggio a un amico: sei in vacanza in Italia. Dove sei? Cosa fai? Che tempo fa?",
          minWords: 30,
          minutes: 15,
          checklist: ["Salam (Ciao…).", "Tempat.", "Kegiatan.", "Cuaca (fa caldo, piove).", "Penutup (A presto!)."],
        },
      ],
    },
  ],
};

export const eropaExams = [goethe, delf, dele, torfl, cils];
