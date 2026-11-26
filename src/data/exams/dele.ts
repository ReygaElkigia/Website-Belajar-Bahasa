import type { Exam } from "./types";
import { gap, mc } from "./build";

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

/* ---------------------------------------------------------------- Latihan tambahan */

deleA2.parts.push({
  id: "mas",
  section: "Comprensión · Expresión oral",
  title: "Latihan tambahan",
  instructions: "Baca, dengarkan, atau bicara sesuai tugas.",
  minutes: 10,
  questions: [
    mc({
      task: "Comprensión de lectura",
      passage: "Se alquila habitación en piso compartido. Céntrica, cerca del metro. 350 € al mes, gastos incluidos. No se admiten animales. Preferiblemente estudiantes. Llamar por las tardes.",
      prompt: "¿Qué está prohibido en el piso?",
      opts: ["tener animales", "ser estudiante", "llamar por la tarde", "usar el metro"],
    }),
    mc({
      task: "Comprensión de lectura",
      passage: "Biblioteca Municipal\nHorario: lunes a viernes, de 9:00 a 21:00. Sábados, de 10:00 a 14:00. Domingos, cerrado.\nPréstamo: máximo 5 libros durante 15 días.",
      prompt: "¿Cuántos libros puedes llevarte como máximo?",
      opts: ["cinco", "quince", "dos", "uno"],
    }),
    mc({
      task: "Comprensión auditiva",
      audio: "Mujer: ¿Vienes a cenar el viernes? Hombre: El viernes no puedo, tengo que trabajar hasta tarde. ¿Qué tal el sábado? Mujer: Perfecto, el sábado a las nueve.",
      prompt: "¿Cuándo van a cenar?",
      opts: ["el sábado a las nueve", "el viernes a las nueve", "el viernes tarde", "el domingo"],
    }),
    mc({
      task: "Comprensión auditiva",
      audio: "Hola, soy Marcos, de la tienda de bicicletas. Su bicicleta ya está arreglada. Puede pasar a recogerla mañana a partir de las diez. Son cuarenta euros.",
      prompt: "¿Por qué llama Marcos?",
      opts: ["La bicicleta ya está arreglada.", "La bicicleta no tiene arreglo.", "Quiere vender una bicicleta.", "La tienda está cerrada mañana."],
    }),
    mc({ task: "Gramática", prompt: "Ayer (　) al cine con mis amigos.", opts: ["fui", "voy", "iba a", "iré"], explain: "Ayer → pretérito indefinido: fui." }),
    mc({ task: "Gramática", prompt: "Esta mañana (　) un café con leche.", opts: ["he tomado", "tomaba", "tomaré", "tomo"], explain: "Esta mañana → pretérito perfecto." }),
    {
      type: "speak",
      task: "Tarea 1: monólogo",
      prompt: "Habla de tu rutina diaria: a qué hora te levantas, qué haces por la mañana y por la tarde, y qué te gusta hacer los fines de semana.",
      prepSeconds: 60,
      speakSeconds: 120,
      checklist: ["Jam dan kegiatan.", "Penanda waktu (primero, después, luego).", "Gustos (me gusta…)."],
    },
    {
      type: "speak",
      task: "Tarea 4: conversación",
      prompt: "Estás en una tienda de ropa. Quieres cambiar una camisa porque es demasiado pequeña. Habla con el dependiente (el examinador).",
      prepSeconds: 30,
      speakSeconds: 90,
      checklist: ["Menjelaskan masalah.", "Meminta ukuran lain atau uang kembali.", "Sopan (por favor, ¿podría…?)."],
    },
  ],
});

deleB1.parts.push({
  id: "mas",
  section: "Comprensión · Expresión escrita",
  title: "Latihan tambahan",
  instructions: "Kerjakan tugas berikut.",
  minutes: 14,
  questions: [
    mc({
      task: "Comprensión de lectura",
      passage:
        "El ayuntamiento ha puesto en marcha un programa de huertos urbanos en solares abandonados. Los vecinos pueden solicitar una parcela gratuita durante dos años, con la condición de no usar pesticidas químicos y participar en las tareas comunes de mantenimiento.",
      prompt: "¿Qué condición deben cumplir los vecinos?",
      opts: ["no usar pesticidas químicos", "pagar una cuota anual", "vender lo que cultivan", "vivir en el solar"],
    }),
    mc({
      task: "Comprensión de lectura",
      passage: "Mensaje de Clara: «Al final no voy a poder ir a la excursión del domingo. Mi hermano se casa el sábado y el domingo tenemos comida familiar. ¡Hacedme muchas fotos!»",
      prompt: "¿Por qué no va Clara a la excursión?",
      opts: ["Tiene una comida familiar.", "Está enferma.", "No le gustan las excursiones.", "Tiene que trabajar."],
    }),
    mc({
      task: "Comprensión auditiva",
      audio: "Locutor: Según los últimos datos, el uso de la bicicleta en la ciudad ha aumentado un treinta por ciento desde que se construyeron los nuevos carriles bici. Sin embargo, los ciclistas piden más aparcamientos seguros.",
      prompt: "¿Qué piden los ciclistas?",
      opts: ["más aparcamientos seguros", "más carriles bici", "bicicletas gratuitas", "menos coches"],
    }),
    mc({
      task: "Comprensión auditiva",
      audio: "Hombre: ¿Al final aceptaste el trabajo en Barcelona? Mujer: No, me pagaban más, pero tendría que mudarme y dejar a mi familia. Prefiero quedarme aquí, al menos por ahora.",
      prompt: "¿Por qué rechazó la mujer el trabajo?",
      opts: ["No quería dejar a su familia.", "Le pagaban poco.", "No le gusta Barcelona.", "Ya tenía otro trabajo mejor."],
    }),
    mc({ task: "Gramática", prompt: "Cuando (　) a casa, te llamaré.", opts: ["llegue", "llego", "llegaré", "llegaba"], explain: "Cuando + subjuntivo untuk masa depan." }),
    mc({ task: "Gramática", prompt: "Me alegra que (　) venir a la fiesta.", opts: ["puedas", "puedes", "podrás", "pudiste"] }),
    gap({
      task: "Texto con huecos",
      prompt: "Pilih kata yang tepat.",
      text: "Me encanta viajar, [0] no siempre tengo dinero. Por eso, [1] puedo, busco ofertas de última hora.",
      gaps: [
        ["pero", "porque", "así que", "aunque si"],
        ["siempre que", "a pesar de", "en vez de", "sin que"],
      ],
    }),
    {
      type: "write",
      task: "Tarea 2: texto",
      prompt: "Escribe un texto para un blog de viajes sobre un viaje que recuerdas especialmente: adónde fuiste, con quién, qué pasó y por qué lo recuerdas (130–150 palabras).",
      minWords: 130,
      maxWords: 150,
      minutes: 30,
      checklist: ["Narasi dengan indefinido dan imperfecto.", "Kejadian penting.", "Alasan mengingatnya.", "130–150 kata."],
    },
  ],
});

deleB2.parts.push({
  id: "mas",
  section: "Comprensión · Expresión",
  title: "Latihan tambahan",
  instructions: "Kerjakan tugas berikut.",
  minutes: 20,
  questions: [
    mc({
      task: "Comprensión de lectura",
      passage:
        "Los expertos en nutrición insisten en que no existen alimentos milagro. Ningún producto aislado, por saludable que sea, compensa una dieta desequilibrada. Lo determinante es el patrón global de alimentación a lo largo del tiempo.",
      prompt: "¿Cuál es la idea principal del texto?",
      opts: ["Lo importante es el conjunto de la dieta.", "Hay alimentos que lo curan todo.", "Hay que evitar ciertos alimentos.", "Las dietas deben ser cortas."],
    }),
    gap({
      task: "Comprensión de lectura: huecos",
      prompt: "Pilih kata yang paling tepat.",
      text: "El turismo masivo genera ingresos importantes, [0] también provoca la subida de los alquileres en los centros históricos. [1], muchos vecinos se ven obligados a abandonar sus barrios.",
      gaps: [
        ["si bien", "puesto que", "a fin de que", "en cuanto"],
        ["Como consecuencia", "En cambio", "Sin embargo", "Es decir"],
      ],
    }),
    mc({
      task: "Comprensión auditiva",
      audio: "Conferenciante: Durante años se pensó que la inteligencia era fija. Hoy sabemos que el cerebro cambia con el aprendizaje durante toda la vida. Eso no significa que todos podamos ser genios, sino que nunca es tarde para mejorar nuestras capacidades.",
      prompt: "¿Qué afirma la conferenciante?",
      opts: ["Siempre es posible mejorar nuestras capacidades.", "La inteligencia no cambia.", "Todos podemos ser genios.", "Solo los niños aprenden."],
    }),
    mc({
      task: "Comprensión auditiva",
      audio: "Mujer: ¿Has leído que van a peatonalizar el centro? Hombre: Sí, y al principio me pareció mal por los comercios, pero en otras ciudades las ventas incluso han subido. Así que ahora lo veo con buenos ojos.",
      prompt: "¿Cómo ha cambiado la opinión del hombre?",
      opts: ["Ahora está a favor.", "Ahora está en contra.", "Nunca tuvo opinión.", "Siempre estuvo a favor."],
    }),
    mc({ task: "Gramática", prompt: "Si lo (　) sabido antes, te habría avisado.", opts: ["hubiera", "habría", "había", "haya"], explain: "Si + pluscuamperfecto de subjuntivo, condicional compuesto." }),
    {
      type: "write",
      task: "Tarea 2: artículo de opinión",
      prompt: "Escribe un artículo de opinión para la revista de tu universidad sobre el tema «¿Deberían ser obligatorias las prácticas en empresas durante la carrera?» (150–180 palabras).",
      minWords: 150,
      maxWords: 180,
      minutes: 40,
      checklist: ["Judul.", "Pendapat jelas.", "Argumen dengan contoh.", "Argumen lawan dan bantahan.", "Kesimpulan."],
    },
    {
      type: "speak",
      task: "Tarea 1: valorar propuestas",
      prompt: "Para reducir el estrés de los estudiantes se proponen: horarios más flexibles, menos exámenes y más trabajos, talleres de gestión del tiempo, y apoyo psicológico gratuito. Valora las propuestas y explica cuál te parece mejor y por qué.",
      prepSeconds: 120,
      speakSeconds: 180,
      checklist: ["Menilai setiap usulan.", "Memilih yang terbaik dengan alasan.", "Ungkapan penilaian (me parece…, sería conveniente que…)."],
    },
  ],
});

deleC1.parts.push({
  id: "mas",
  section: "Comprensión · Destrezas integradas",
  title: "Latihan tambahan",
  instructions: "Kerjakan tugas berikut.",
  minutes: 22,
  questions: [
    mc({
      task: "Comprensión de lectura",
      passage:
        "La llamada «economía de la atención» parte de una premisa sencilla: en un mundo saturado de información, el recurso escaso no es el contenido, sino el tiempo que los usuarios están dispuestos a dedicarle. De ahí que las plataformas compitan, más que por ofrecer calidad, por retener la mirada el mayor tiempo posible.",
      prompt: "Según el texto, ¿por qué compiten las plataformas?",
      opts: ["por retener la atención de los usuarios", "por ofrecer el contenido más barato", "por producir más información", "por respetar el tiempo libre"],
    }),
    mc({
      task: "Comprensión auditiva",
      audio:
        "Entrevistadora: ¿Es realista pensar en ciudades sin coches? Urbanista: Sin coches, quizá no. Pero sí con muchos menos. La clave está en que la alternativa resulte más cómoda: transporte público frecuente, barrios con servicios a quince minutos a pie y calles pensadas para las personas.",
      prompt: "¿Qué considera clave el urbanista?",
      opts: ["que las alternativas al coche sean más cómodas", "prohibir los coches por completo", "construir más aparcamientos", "subir el precio de la gasolina"],
    }),
    mc({ task: "Uso de la lengua", prompt: "(　) que me lo pidas mil veces, no voy a cambiar de opinión.", opts: ["Aunque", "Ya", "Puesto", "Dado"], explain: "Aunque + subjuntivo (konsesi hipotetis)." }),
    mc({ task: "Léxico", prompt: "La empresa decidió (　) el proyecto por falta de financiación.", opts: ["paralizar", "fomentar", "impulsar", "agilizar"] }),
    gap({
      task: "Uso de la lengua: texto",
      prompt: "Pilih ungkapan yang paling tepat.",
      text: "La investigación no ha concluido todavía; [0], los primeros resultados son prometedores. [1] se confirmen, podría cambiar el tratamiento de la enfermedad.",
      gaps: [
        ["no obstante", "por tanto", "es decir", "de modo que"],
        ["En caso de que", "Ya que", "Mientras", "A menos que no"],
      ],
    }),
    {
      type: "write",
      task: "Tarea 2: texto argumentativo",
      prompt: "Escribe un artículo de opinión (220–250 palabras) para un periódico digital sobre «¿Debe la universidad ser gratuita para todos?». Incluye argumentos a favor y en contra y una conclusión personal.",
      minWords: 220,
      maxWords: 250,
      minutes: 45,
      checklist: ["Struktur jelas.", "Argumen kedua sisi.", "Penghubung formal (no obstante, en definitiva).", "Kesimpulan pribadi."],
    },
    {
      type: "speak",
      task: "Prueba 4: exposición",
      prompt: "A partir de un texto sobre «el aumento del trabajo freelance», expón las ideas principales durante 3–5 minutos y después conversa con el entrevistador sobre ventajas y riesgos.",
      prepSeconds: 120,
      speakSeconds: 300,
      checklist: ["Ringkasan ide utama.", "Opini dengan nuansa.", "Kosakata kerja dan ekonomi.", "Menanggapi pertanyaan."],
    },
  ],
});

deleC2.parts.push({
  id: "mas",
  section: "Comprensión · Destrezas integradas",
  title: "Latihan tambahan",
  instructions: "Kerjakan tugas berikut.",
  minutes: 25,
  questions: [
    mc({
      task: "Comprensión de lectura",
      passage:
        "Se suele decir que la traducción es una traición. Sería más justo decir que es una negociación: el traductor renuncia a ciertos matices para salvar otros que considera esenciales. Lo que distingue una buena traducción no es la ausencia de pérdidas, sino la lucidez con que se eligen.",
      prompt: "¿Qué idea defiende el autor?",
      opts: ["Traducir implica elegir conscientemente qué se pierde.", "Una buena traducción no pierde nada.", "Traducir es siempre traicionar.", "Los matices no importan al traducir."],
    }),
    mc({ task: "Léxico", prompt: "«Estar en el ajo» significa:", opts: ["estar al tanto de un asunto", "cocinar con ajo", "estar enfadado", "no entender nada"] }),
    mc({ task: "Uso de la lengua", prompt: "De (　) sabido, no habría venido.", opts: ["haberlo", "saberlo", "habiéndolo", "haber"], explain: "De + infinitivo compuesto = si lo hubiera sabido." }),
    mc({
      task: "Comprensión auditiva",
      audio: "Tertulia: La lectura en pantalla no es peor en sí misma; lo que cambia es la actitud. Ante una pantalla tendemos a leer en diagonal, saltando de un enlace a otro. El reto es recuperar la lectura lenta, sea cual sea el soporte.",
      prompt: "¿Cuál es el reto, según el tertuliano?",
      opts: ["recuperar la lectura lenta", "abandonar las pantallas", "leer más rápido", "volver solo al papel"],
    }),
    {
      type: "write",
      task: "Tarea: cambio de registro",
      passage: "Nota de voz: «Oye, que mañana no hay reunión, que el jefe está malo. La pasamos al martes a la misma hora. Traed los números, ¿vale?»",
      prompt: "Reescribe el mensaje como correo formal dirigido a socios externos.",
      minWords: 50,
      maxWords: 110,
      minutes: 15,
      checklist: ["Register formal penuh.", "Informasi lengkap.", "Salam pembuka dan penutup formal."],
      model:
        "Estimados socios:\nLes informamos de que la reunión prevista para mañana queda aplazada debido a la indisposición de nuestro director. Les proponemos celebrarla el próximo martes a la misma hora. Les agradeceríamos que aportaran los datos actualizados.\nReciban un cordial saludo.",
    },
  ],
});

export const deleHigher = [deleA2, deleB1, deleB2, deleC1, deleC2];
