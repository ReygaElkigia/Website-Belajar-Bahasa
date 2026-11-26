import type { Exam } from "./types";
import { mc } from "./build";

/**
 * DELE A2 sampai C2. Struktur dari examenes.cervantes.es; soal latihan
 * ditulis sendiri meniru jenis tugas aslinya.
 */

const ORG = "Instituto Cervantes";
const GROUPS = (g1: string, g2: string) => [
  "Skor maksimal 100; lulus dengan minimal 60.",
  `Nilai dibagi dua kelompok: (${g1}) dan (${g2}). Masing-masing minimal 30 dari 50.`,
  "Diploma berlaku tanpa batas waktu.",
];
const cervantes = (lv: string, path: string) => ({ label: `Instituto Cervantes: DELE ${lv}`, url: `https://examenes.cervantes.es/es/dele/${path}` });
const NOTE = "Waktu di bawah sesuai panduan ujian Instituto Cervantes yang berlaku; periksa Guía del examen terbaru untuk jadwal Anda.";

export const deleA2: Exam = {
  id: "dele-a2",
  lang: "spanyol",
  name: "DELE A2",
  fullName: "Diploma de Español como Lengua Extranjera, nivel A2",
  org: ORG,
  level: "A2 (CEFR)",
  about: "Kemampuan memahami kalimat dan ungkapan sehari-hari tentang hal yang dekat: keluarga, belanja, pekerjaan, lingkungan. Dipakai antara lain sebagai syarat kewarganegaraan Spanyol (bersama ujian CCSE).",
  note: NOTE,
  format: [
    { name: "Comprensión de lectura", time: "60 menit", items: "4 tugas", tasks: "Email, iklan, artikel pendek" },
    { name: "Comprensión auditiva", time: "35 menit", items: "4 tugas", tasks: "Pengumuman, percakapan, pesan" },
    { name: "Expresión e interacción escritas", time: "45 menit", items: "2 tugas", tasks: "Membalas pesan dan menulis teks pendek" },
    { name: "Expresión e interacción orales", time: "12 menit, persiapan 12 menit", items: "4 tugas", tasks: "Monolog, deskripsi foto, dialog simulasi" },
  ],
  scoring: GROUPS("lectura + expresión escrita", "auditiva + expresión oral"),
  tips: ["Bedakan pretérito perfecto (he comido) untuk hari ini dan pretérito indefinido (comí) untuk waktu lampau yang selesai."],
  official: { label: "examenes.cervantes.es", url: "https://examenes.cervantes.es/es/dele/examenes/a2" },
  sources: [cervantes("A2", "examenes/a2")],
  parts: [
    {
      id: "comprension",
      section: "Comprensión",
      title: "Membaca dan menyimak",
      instructions: "Baca atau dengarkan, lalu jawab.",
      minutes: 5,
      questions: [
        mc({
          task: "Comprensión de lectura",
          passage: "Hola, Marta:\nEl sábado celebramos el cumpleaños de Luis en el parque, a las cinco. Cada uno lleva algo para comer. Yo llevo la tarta. ¿Puedes traer bebidas? Si llueve, nos vemos en mi casa.\nUn beso,\nCarla",
          prompt: "¿Qué tiene que llevar Marta?",
          opts: ["bebidas", "la tarta", "comida", "un regalo"],
        }),
        mc({
          task: "Comprensión auditiva",
          audio: "Atención, señores pasajeros: el tren con destino a Valencia, que tenía salida a las diez y cuarto, saldrá con veinte minutos de retraso desde la vía cuatro.",
          prompt: "¿A qué hora sale el tren a Valencia?",
          opts: ["a las diez y treinta y cinco", "a las diez y cuarto", "a las diez y veinte", "a las cuatro"],
        }),
      ],
    },
    {
      id: "escrita",
      section: "Expresión escrita",
      title: "Menulis",
      instructions: "Tulis sesuai tugas.",
      minutes: 15,
      questions: [
        {
          type: "write",
          task: "Tarea 1",
          prompt: "Un amigo te escribe para preguntarte por tu nuevo trabajo. Respóndele: dónde trabajas, qué haces, cómo son tus compañeros y qué es lo que más te gusta (60–70 palabras).",
          minWords: 60,
          maxWords: 70,
          minutes: 15,
          checklist: ["Salam pembuka dan penutup.", "Keempat poin dijawab.", "Presente untuk rutinitas."],
          model: "¡Hola, Pedro!\nTrabajo en una agencia de viajes en el centro. Atiendo a los clientes y organizo sus vacaciones. Mis compañeros son muy simpáticos y siempre me ayudan. Lo que más me gusta es hablar con personas de otros países y practicar idiomas. ¿Y tú, qué tal en la universidad?\nUn abrazo,\nRina",
        },
      ],
    },
  ],
};

export const deleB1: Exam = {
  id: "dele-b1",
  lang: "spanyol",
  name: "DELE B1",
  fullName: "Diploma de Español como Lengua Extranjera, nivel B1",
  org: ORG,
  level: "B1 (CEFR)",
  about: "Pengguna mandiri: memahami poin utama teks tentang pekerjaan, sekolah, dan waktu luang, serta bisa menangani sebagian besar situasi saat bepergian di negara berbahasa Spanyol.",
  note: NOTE,
  format: [
    { name: "Comprensión de lectura", time: "70 menit", items: "5 tugas", tasks: "Teks informatif, opini, dan pengumuman" },
    { name: "Comprensión auditiva", time: "40 menit", items: "5 tugas", tasks: "Monolog, percakapan, berita radio" },
    { name: "Expresión e interacción escritas", time: "60 menit", items: "2 tugas", tasks: "Surat atau email, dan teks naratif atau opini" },
    { name: "Expresión e interacción orales", time: "15 menit, persiapan 15 menit", items: "4 tugas", tasks: "Monolog topik, percakapan, deskripsi foto, dialog situasi" },
  ],
  scoring: GROUPS("lectura + expresión escrita", "auditiva + expresión oral"),
  tips: ["Kuasai subjuntivo untuk saran dan perasaan (Te recomiendo que vayas…, Me alegra que…)."],
  official: { label: "examenes.cervantes.es", url: "https://examenes.cervantes.es/es/dele/examenes/b1" },
  sources: [cervantes("B1", "examenes/b1")],
  parts: [
    {
      id: "comprension",
      section: "Comprensión",
      title: "Membaca",
      instructions: "Baca, lalu jawab.",
      minutes: 5,
      questions: [
        mc({
          task: "Comprensión de lectura",
          passage:
            "Cada vez más jóvenes deciden pasar un año trabajando como voluntarios antes de empezar la universidad. Según una encuesta reciente, la mayoría afirma que esa experiencia les ayudó a elegir mejor su carrera, aunque algunos reconocen que les costó volver a la rutina de estudio.",
          prompt: "Según el texto, ¿qué ventaja tiene el año de voluntariado?",
          opts: ["Ayuda a elegir mejor la carrera.", "Permite ganar mucho dinero.", "Hace más fácil volver a estudiar.", "Es obligatorio para entrar en la universidad."],
        }),
        mc({ task: "Gramática en contexto", prompt: "Te recomiendo que (　) este libro; es muy interesante.", opts: ["leas", "lees", "leerás", "leíste"], explain: "Recomendar que + subjuntivo." }),
      ],
    },
    {
      id: "oral",
      section: "Expresión oral",
      title: "Berbicara",
      instructions: "Siapkan monolog, lalu bicara.",
      minutes: 6,
      questions: [
        {
          type: "speak",
          task: "Tarea 1: monólogo",
          prompt: "Habla sobre el tema «Aprender un idioma en el extranjero». Puedes hablar de tu experiencia, de las ventajas y desventajas, y de lo que recomendarías a otras personas.",
          prepSeconds: 60,
          speakSeconds: 150,
          checklist: ["Perkenalan topik.", "Pengalaman pribadi.", "Kelebihan dan kekurangan.", "Saran dengan subjuntivo."],
        },
      ],
    },
  ],
};

export const deleB2: Exam = {
  id: "dele-b2",
  lang: "spanyol",
  name: "DELE B2",
  fullName: "Diploma de Español como Lengua Extranjera, nivel B2",
  org: ORG,
  level: "B2 (CEFR)",
  about: "Kemampuan berinteraksi dengan lancar dan spontan dengan penutur asli serta menulis teks rinci tentang berbagai topik. Syarat umum untuk kuliah dan pekerjaan di negara berbahasa Spanyol.",
  note: NOTE,
  format: [
    { name: "Comprensión de lectura", time: "70 menit", items: "4 tugas", tasks: "Teks informatif, sastra, dan argumentatif" },
    { name: "Comprensión auditiva", time: "40 menit", items: "5 tugas", tasks: "Wawancara, konferensi, percakapan" },
    { name: "Expresión e interacción escritas", time: "80 menit", items: "2 tugas", tasks: "Surat atau artikel dari rekaman audio, dan teks pilihan berdasarkan data" },
    { name: "Expresión e interacción orales", time: "20 menit, persiapan 20 menit", items: "3 tugas", tasks: "Menilai beberapa usulan, deskripsi situasi dari foto, survei" },
  ],
  scoring: GROUPS("lectura + expresión escrita", "auditiva + expresión oral"),
  tips: ["Siapkan ungkapan untuk menilai usulan: «La propuesta que me parece más acertada es…, aunque…»."],
  official: { label: "examenes.cervantes.es", url: "https://examenes.cervantes.es/es/dele/examenes/b2" },
  sources: [cervantes("B2", "examenes/b2")],
  parts: [
    {
      id: "comprension",
      section: "Comprensión",
      title: "Membaca dan menyimak",
      instructions: "Baca atau dengarkan, lalu jawab.",
      minutes: 6,
      questions: [
        mc({
          task: "Comprensión de lectura",
          passage:
            "La gamificación, es decir, el uso de dinámicas propias del juego en contextos no lúdicos, se ha extendido en las aulas. Sus defensores destacan que aumenta la motivación; sus críticos advierten que, si todo se convierte en puntos y premios, los alumnos pueden acabar estudiando solo por la recompensa.",
          prompt: "¿Qué advierten los críticos?",
          opts: ["Que los alumnos estudien solo por el premio.", "Que los juegos no motivan nada.", "Que los profesores no saben usar juegos.", "Que la gamificación es demasiado cara."],
        }),
        mc({
          task: "Comprensión auditiva",
          audio: "Entrevistadora: ¿Por qué decidió dejar la ciudad y mudarse a un pueblo? Hombre: Mire, no fue por el precio de la vivienda, como mucha gente piensa. Fue sobre todo por tiempo: aquí no pierdo dos horas al día en el tráfico y puedo estar con mis hijos.",
          prompt: "¿Por qué se mudó el hombre al pueblo?",
          opts: ["para tener más tiempo con su familia", "porque la vivienda era más barata", "porque encontró trabajo allí", "porque no le gusta la gente de la ciudad"],
        }),
      ],
    },
  ],
};

export const deleC1: Exam = {
  id: "dele-c1",
  lang: "spanyol",
  name: "DELE C1",
  fullName: "Diploma de Español como Lengua Extranjera, nivel C1",
  org: ORG,
  level: "C1 (CEFR)",
  about: "Untuk penggunaan bahasa Spanyol yang luwes dan efektif dalam konteks sosial, akademik, dan profesional. Sebagian tugas memadukan beberapa keterampilan sekaligus (destrezas integradas).",
  note: NOTE,
  format: [
    { name: "Comprensión de lectura y uso de la lengua", time: "90 menit", items: "5 tugas", tasks: "Teks panjang, struktur teks, kosakata dan tata bahasa dalam konteks" },
    { name: "Comprensión auditiva y uso de la lengua", time: "50 menit", items: "4 tugas", tasks: "Konferensi, percakapan, potongan siaran" },
    { name: "Destrezas integradas: comprensión auditiva y expresión escrita", time: "80 menit", items: "2 tugas", tasks: "Menulis dari rekaman audio, dan teks argumentatif pilihan" },
    { name: "Destrezas integradas: comprensión de lectura y expresión oral", time: "20 menit, persiapan 20 menit", items: "3 tugas", tasks: "Presentasi dari teks, debat, negosiasi" },
  ],
  scoring: GROUPS("lectura + escrita integrada", "auditiva + oral integrada"),
  tips: ["Di tugas menulis dari audio, catat angka, contoh, dan pendapat pembicara selama mendengarkan."],
  official: { label: "examenes.cervantes.es", url: "https://examenes.cervantes.es/es/dele/examenes/c1" },
  sources: [cervantes("C1", "examenes/c1")],
  parts: [
    {
      id: "uso",
      section: "Uso de la lengua",
      title: "Bahasa dalam konteks",
      instructions: "Pilih jawaban yang tepat.",
      minutes: 4,
      questions: [
        mc({ task: "Uso de la lengua", prompt: "Por mucho que (　), no conseguirás convencerle.", opts: ["insistas", "insistes", "insistirás", "insistías"], explain: "Por mucho que + subjuntivo untuk konsesi." }),
        mc({ task: "Uso de la lengua", prompt: "El proyecto salió adelante (　) las dificultades económicas.", opts: ["pese a", "debido a", "a fin de", "en cuanto a"] }),
      ],
    },
  ],
};

export const deleC2: Exam = {
  id: "dele-c2",
  lang: "spanyol",
  name: "DELE C2",
  fullName: "Diploma de Español como Lengua Extranjera, nivel C2",
  org: ORG,
  level: "C2 (CEFR)",
  about: "Level tertinggi DELE: penguasaan bahasa Spanyol yang memungkinkan berkomunikasi tanpa hambatan dalam situasi apa pun, dengan ketepatan dan kehalusan makna.",
  note: NOTE,
  format: [
    { name: "Uso de la lengua, comprensión de lectura y auditiva", time: "105 menit", items: "beberapa tugas", tasks: "Teks dan audio dengan soal kosakata, tata bahasa, dan pemahaman" },
    { name: "Destrezas integradas: comprensión auditiva y de lectura, expresión escrita", time: "150 menit", items: "beberapa tugas", tasks: "Menulis teks dari beberapa sumber, menyusun ulang teks dengan register lain" },
    { name: "Destrezas integradas: comprensión de lectura y expresión oral", time: "20 menit, persiapan 30 menit", items: "beberapa tugas", tasks: "Presentasi dan percakapan dari kumpulan teks" },
  ],
  scoring: ["Skor maksimal 100; lulus dengan minimal 60.", "Setiap ujian (prueba) harus mencapai nilai minimum yang ditetapkan panduan.", "Diploma berlaku tanpa batas waktu."],
  tips: ["Pada C2, kemampuan mengubah register (misalnya dari teks lisan informal ke laporan formal) dinilai khusus."],
  official: { label: "examenes.cervantes.es", url: "https://examenes.cervantes.es/es/dele/examenes/c2" },
  sources: [cervantes("C2", "examenes/c2")],
  parts: [
    {
      id: "uso",
      section: "Uso de la lengua",
      title: "Bahasa dalam konteks",
      instructions: "Pilih jawaban yang tepat.",
      minutes: 3,
      questions: [
        mc({ task: "Uso de la lengua", prompt: "No es que no (　) ayudarte, es que hoy no tengo ni un minuto libre.", opts: ["quiera", "quiero", "querré", "quería"], explain: "No es que + subjuntivo." }),
        mc({ task: "Léxico", prompt: "«Dar gato por liebre» significa:", opts: ["engañar dando algo de menor valor", "cuidar animales ajenos", "cambiar de opinión con frecuencia", "llegar tarde a una cita"] }),
      ],
    },
  ],
};

export const deleHigher = [deleA2, deleB1, deleB2, deleC1, deleC2];
