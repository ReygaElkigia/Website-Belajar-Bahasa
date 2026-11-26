import type { Exam, Question } from "./types";
import { mc } from "./build";

/**
 * Goethe-Zertifikat A2 sampai C2. Struktur dan batas lulus dari goethe.de;
 * soal latihan ditulis sendiri meniru jenis tugas aslinya.
 */

const ORG = "Goethe-Institut";
const rf = (q: { task: string; audio?: string; passage?: string; prompt: string; ok: boolean; explain?: string }): Question => ({
  type: "mc",
  task: q.task,
  audio: q.audio,
  passage: q.passage,
  prompt: q.prompt,
  explain: q.explain,
  options: ["Richtig", "Falsch"],
  answer: q.ok ? 0 : 1,
});
const modular = [
  "Ujian modular: Lesen, Hören, Schreiben, dan Sprechen bisa diambil bersama atau terpisah.",
  "Setiap modul bernilai 100 poin dan lulus dengan minimal 60 poin.",
  "Modul yang lulus mendapat sertifikat sendiri, sehingga hanya modul yang gagal yang perlu diulang.",
];
const src = (lv: string, path: string) => [
  { label: `Goethe-Institut: Goethe-Zertifikat ${lv}`, url: `https://www.goethe.de/de/spr/prf/${path}.html` },
  { label: "Goethe-Institut: Übungsmaterialien", url: "https://www.goethe.de/de/spr/prf/ueb.html" },
];

/* ---------------------------------------------------------------- A2 */

export const goetheA2: Exam = {
  id: "goethe-a2",
  lang: "jerman",
  name: "Goethe-Zertifikat A2",
  fullName: "Goethe-Zertifikat A2",
  org: ORG,
  level: "A2 (CEFR)",
  about: "Bukti kemampuan bahasa Jerman dasar untuk situasi sehari-hari: belanja, bekerja, keluarga, dan lingkungan sekitar. Sering dipakai sebagai langkah antara sebelum B1 untuk Ausbildung.",
  format: [
    { name: "Lesen Membaca", time: "30 menit", items: "4 bagian", tasks: "Artikel koran pendek, papan informasi, iklan, email" },
    { name: "Hören Menyimak", time: "sekitar 30 menit", items: "4 bagian", tasks: "Pengumuman radio, percakapan, pesan telepon, wawancara" },
    { name: "Schreiben Menulis", time: "30 menit", items: "2 bagian", tasks: "SMS sekitar 20–30 kata dan email sekitar 30–40 kata" },
    { name: "Sprechen Berbicara", time: "sekitar 15 menit (berpasangan)", items: "3 bagian", tasks: "Bertanya dan menjawab, bercerita tentang diri, merencanakan sesuatu bersama" },
  ],
  scoring: ["Nilai maksimal 100; lulus dengan minimal 60 poin.", "Bagian tertulis 90 menit, ujian lisan berpasangan sekitar 15 menit."],
  tips: ["Di Schreiben, tiga poin yang diminta harus muncul semua.", "Saat merencanakan bersama (Sprechen Teil 3), tawarkan usul, tanggapi usul pasangan, lalu sepakati."],
  official: { label: "goethe.de", url: "https://www.goethe.de/de/spr/prf.html" },
  sources: [{ label: "Goethe-Institut: Deutschprüfungen", url: "https://www.goethe.de/de/spr/prf.html" }, { label: "Goethe-Institut: Übungsmaterialien", url: "https://www.goethe.de/de/spr/prf/ueb.html" }],
  parts: [
    {
      id: "lesen-hoeren",
      section: "Lesen · Hören",
      title: "Membaca dan menyimak",
      instructions: "Baca atau dengarkan, lalu jawab.",
      minutes: 6,
      questions: [
        mc({
          task: "Lesen Teil 2",
          passage: "Kaufhaus Sommer – Wegweiser\nEG: Lebensmittel, Kasse\n1. Stock: Damen- und Herrenmode\n2. Stock: Spielwaren, Bücher\n3. Stock: Elektrogeräte, Café",
          prompt: "Sie möchten eine Kaffeemaschine kaufen. Wohin gehen Sie?",
          opts: ["3. Stock", "Erdgeschoss", "1. Stock", "2. Stock"],
        }),
        rf({ task: "Hören Teil 2", audio: "Hallo Jana, hier ist Paul. Das Kino morgen fängt nicht um acht, sondern schon um halb acht an. Wir treffen uns um sieben vor dem Kino, okay?", prompt: "Paul und Jana treffen sich um sieben Uhr.", ok: true }),
        mc({
          task: "Hören Teil 3",
          audio: "Frau: Und, wie war dein Urlaub? Mann: Ach, das Hotel war super und das Essen auch. Nur das Wetter war schlecht, es hat fast jeden Tag geregnet.",
          prompt: "Was war im Urlaub nicht gut?",
          opts: ["das Wetter", "das Hotel", "das Essen"],
        }),
      ],
    },
    {
      id: "schreiben",
      section: "Schreiben",
      title: "Menulis",
      instructions: "Tulis pesan sesuai tugas.",
      minutes: 10,
      questions: [
        {
          type: "write",
          task: "Teil 2: E-Mail",
          prompt: "Ihr Kollege Herr Braun hat Sie zu seiner Geburtstagsfeier eingeladen. Schreiben Sie Herrn Braun eine E-Mail: Bedanken Sie sich. Sie können nicht kommen – warum? Schlagen Sie ein Treffen nächste Woche vor.",
          minWords: 30,
          maxWords: 50,
          minutes: 10,
          checklist: ["Anrede formal: Lieber Herr Braun,", "Berterima kasih atas undangan.", "Alasan tidak bisa datang.", "Usul bertemu minggu depan.", "Salam penutup."],
          model: "Lieber Herr Braun,\nvielen Dank für die Einladung zu Ihrer Feier. Leider kann ich nicht kommen, denn meine Eltern besuchen mich am Wochenende. Wollen wir nächste Woche zusammen Mittag essen? Am Dienstag habe ich Zeit.\nViele Grüße\nRina",
        },
      ],
    },
  ],
};

/* ---------------------------------------------------------------- B1 */

export const goetheB1: Exam = {
  id: "goethe-b1",
  lang: "jerman",
  name: "Goethe-Zertifikat B1",
  fullName: "Goethe-Zertifikat B1",
  org: ORG,
  level: "B1 (CEFR)",
  about: "Sertifikat yang paling banyak diminta untuk Ausbildung, kerja perawat dan tenaga kesehatan di Jerman, serta izin tinggal tetap dan naturalisasi. Menunjukkan kemampuan mandiri dalam kehidupan sehari-hari dan pekerjaan.",
  format: [
    { name: "Lesen Membaca", time: "65 menit", items: "5 bagian", tasks: "Blog, artikel, iklan, opini pembaca, aturan dan petunjuk" },
    { name: "Hören Menyimak", time: "sekitar 40 menit", items: "4 bagian", tasks: "Pengumuman, kuliah singkat, percakapan, diskusi radio" },
    { name: "Schreiben Menulis", time: "60 menit", items: "3 bagian", tasks: "Email pribadi (~80 kata), pendapat di forum (~80 kata), pesan formal (~40 kata)" },
    { name: "Sprechen Berbicara", time: "sekitar 15 menit (berpasangan)", items: "3 bagian", tasks: "Merencanakan bersama, presentasi topik, menanggapi pertanyaan" },
  ],
  scoring: modular,
  tips: [
    "Presentasi Sprechen Teil 2 punya lima langkah tetap: topik, pengalaman pribadi, situasi di negara asal, kelebihan/kekurangan dan pendapat, penutup.",
    "Di Schreiben Teil 2 (forum), nyatakan pendapat dengan alasan; jangan sekadar meringkas topik.",
  ],
  official: { label: "goethe.de", url: "https://www.goethe.de/de/spr/prf/gzb1.html" },
  sources: src("B1", "gzb1"),
  parts: [
    {
      id: "lesen",
      section: "Lesen",
      title: "Membaca",
      instructions: "Baca teksnya, lalu jawab.",
      minutes: 8,
      questions: [
        rf({
          task: "Teil 1: Blog",
          passage:
            "Letzten Monat habe ich endlich meinen Führerschein gemacht. Ehrlich gesagt war die praktische Prüfung leichter als gedacht – mein Fahrlehrer hatte mich gut vorbereitet. Nur das Einparken klappt immer noch nicht so gut. Deshalb fahre ich im Moment lieber mit dem Fahrrad zur Arbeit.",
          prompt: "Die Autorin hat Probleme beim Einparken.",
          ok: true,
        }),
        mc({
          task: "Teil 4: Meinungen",
          passage: "Thema: Sollen Kinder ein eigenes Handy haben?\nMarco: »Ein Handy gibt Eltern Sicherheit. Man kann sein Kind jederzeit erreichen.«\nSabine: »Kinder sollen draußen spielen, nicht auf einen Bildschirm schauen. Vor zwölf Jahren braucht niemand ein Handy.«",
          prompt: "Ist Sabine für ein eigenes Handy für Kinder?",
          opts: ["Nein", "Ja"],
        }),
      ],
    },
    {
      id: "hoeren",
      section: "Hören",
      title: "Menyimak",
      instructions: "Dengarkan, lalu jawab.",
      minutes: 4,
      questions: [
        mc({
          task: "Teil 1: Ansage",
          audio: "Liebe Fahrgäste, wegen Bauarbeiten fährt die S-Bahn heute zwischen Hauptbahnhof und Flughafen nicht. Bitte benutzen Sie die Busse vor dem Bahnhof, Ausgang Nord.",
          prompt: "Wie kommen die Fahrgäste heute zum Flughafen?",
          opts: ["mit dem Bus vom Ausgang Nord", "mit der S-Bahn", "mit dem Taxi", "zu Fuß"],
        }),
      ],
    },
    {
      id: "schreiben-sprechen",
      section: "Schreiben · Sprechen",
      title: "Menulis dan berbicara",
      instructions: "Tulis dan bicara sesuai tugas.",
      minutes: 25,
      questions: [
        {
          type: "write",
          task: "Schreiben Teil 2: Forum",
          prompt: "Sie haben im Radio eine Diskussion zum Thema »Homeoffice – für alle eine gute Idee?« gehört. Im Online-Gästebuch der Sendung schreiben Sie Ihre Meinung (ca. 80 Wörter).",
          minWords: 70,
          maxWords: 110,
          minutes: 25,
          checklist: ["Pendapat jelas di awal.", "Dua alasan, sebaiknya dengan contoh.", "Penghubung: weil, deshalb, außerdem, aber.", "Kalimat penutup."],
          model:
            "Ich finde Homeoffice grundsätzlich gut, aber nicht für alle. Man spart viel Zeit, weil man nicht zur Arbeit fahren muss. Außerdem kann man sich die Arbeit freier einteilen. Allerdings fehlt vielen Leuten der Kontakt zu den Kollegen, und zu Hause gibt es oft viel Ablenkung, zum Beispiel durch Kinder. Deshalb wäre für mich eine Mischung ideal: zwei Tage im Büro und drei Tage zu Hause.",
        },
        {
          type: "speak",
          task: "Sprechen Teil 2: Präsentation",
          prompt: "Präsentieren Sie das Thema »Sollte man in der Freizeit ein Ehrenamt machen?«: Thema vorstellen, eigene Erfahrung, Situation in Ihrem Heimatland, Vor- und Nachteile mit Ihrer Meinung, Abschluss.",
          prepSeconds: 60,
          speakSeconds: 180,
          checklist: ["Kelima langkah presentasi.", "Ungkapan penghubung (Zuerst…, In meinem Land…, Zum Schluss…).", "Pendapat pribadi dengan alasan."],
        },
      ],
    },
  ],
};

/* ---------------------------------------------------------------- B2 */

export const goetheB2: Exam = {
  id: "goethe-b2",
  lang: "jerman",
  name: "Goethe-Zertifikat B2",
  fullName: "Goethe-Zertifikat B2",
  org: ORG,
  level: "B2 (CEFR)",
  about: "Untuk kuliah dan pekerjaan profesional. Banyak universitas Jerman menerima B2 untuk program studi tertentu, dan B2 diminta untuk pengakuan profesi seperti dokter dan perawat (dilengkapi ujian bahasa profesi).",
  format: [
    { name: "Lesen Membaca", time: "65 menit", items: "5 bagian", tasks: "Teks opini, artikel, pendapat, aturan" },
    { name: "Hören Menyimak", time: "sekitar 40 menit", items: "4 bagian", tasks: "Pengumuman, wawancara, diskusi, kuliah" },
    { name: "Schreiben Menulis", time: "75 menit", items: "2 bagian", tasks: "Tulisan pendapat di forum (~150 kata), pesan formal (~100 kata)" },
    { name: "Sprechen Berbicara", time: "sekitar 15 menit (berpasangan)", items: "2 bagian", tasks: "Presentasi sekitar 4 menit, diskusi dengan pasangan" },
  ],
  scoring: modular,
  tips: ["Struktur pendapat: Einleitung, Argumente mit Beispielen, Gegenargument, Schluss.", "Pesan formal (Teil 2) harus memakai register yang tepat: Sehr geehrte Damen und Herren, Sie-Form, Konjunktiv II untuk permintaan sopan."],
  official: { label: "goethe.de", url: "https://www.goethe.de/de/spr/prf/gzb2.html" },
  sources: src("B2", "gzb2"),
  parts: [
    {
      id: "lesen-hoeren",
      section: "Lesen · Hören",
      title: "Membaca dan menyimak",
      instructions: "Baca atau dengarkan, lalu jawab.",
      minutes: 8,
      questions: [
        mc({
          task: "Lesen Teil 2",
          passage:
            "Immer mehr Städte richten sogenannte Begegnungszonen ein: Straßen, in denen Fußgänger, Radfahrer und Autos gleichberechtigt sind und höchstens 20 km/h gefahren werden darf. Kritiker befürchten mehr Unfälle, doch erste Auswertungen zeigen das Gegenteil: Weil sich niemand auf Vorfahrtsregeln verlassen kann, fahren alle vorsichtiger.",
          prompt: "Was zeigen die ersten Auswertungen?",
          opts: ["Es passieren eher weniger Unfälle.", "Die Kritiker hatten recht.", "Autos fahren dort schneller als früher.", "Fußgänger meiden diese Straßen."],
        }),
        mc({
          task: "Hören Teil 2: Interview",
          audio:
            "Moderatorin: Frau Kaya, Sie haben mit 45 noch einmal studiert. Warum? Frau Kaya: In meinem alten Beruf hatte ich keine Entwicklungsmöglichkeiten mehr. Das Studium war anstrengend, vor allem neben der Familie. Aber ich würde es sofort wieder tun – heute macht mir meine Arbeit einfach mehr Spaß.",
          prompt: "Wie bewertet Frau Kaya ihre Entscheidung?",
          opts: ["Sie würde sich wieder so entscheiden.", "Sie bereut das Studium.", "Das Studium war für sie leicht.", "Sie möchte in ihren alten Beruf zurück."],
        }),
      ],
    },
    {
      id: "schreiben",
      section: "Schreiben",
      title: "Menulis",
      instructions: "Tulis tanggapan formal sesuai tugas.",
      minutes: 25,
      questions: [
        {
          type: "write",
          task: "Teil 2: Formelle Nachricht",
          prompt: "Sie sind Mitglied in einem Sportverein. Der Verein will die Öffnungszeiten der Halle am Wochenende verkürzen. Schreiben Sie an die Vereinsleitung: Äußern Sie Ihr Bedauern, nennen Sie Gründe, warum die Zeiten wichtig sind, und machen Sie einen Vorschlag (ca. 100 Wörter).",
          minWords: 90,
          maxWords: 130,
          minutes: 25,
          checklist: ["Anrede dan salam formal.", "Penyesalan dinyatakan dengan sopan.", "Minimal dua alasan.", "Usul yang konkret.", "Konjunktiv II untuk permintaan (Ich würde vorschlagen…)."],
          model:
            "Sehr geehrte Damen und Herren,\nmit Bedauern habe ich gelesen, dass die Halle am Wochenende kürzer geöffnet sein soll. Für viele Mitglieder, die unter der Woche lange arbeiten, ist das Wochenende die einzige Zeit zum Trainieren. Außerdem finden samstags die Kurse für Kinder statt, die sonst ausfallen müssten. Ich würde deshalb vorschlagen, die Öffnungszeiten am Samstag beizubehalten und nur am Sonntag früher zu schließen. Vielleicht könnten auch ehrenamtliche Mitglieder die Aufsicht übernehmen.\nMit freundlichen Grüßen\nRina Putri",
        },
      ],
    },
  ],
};

/* ---------------------------------------------------------------- C1 */

export const goetheC1: Exam = {
  id: "goethe-c1",
  lang: "jerman",
  name: "Goethe-Zertifikat C1",
  fullName: "Goethe-Zertifikat C1",
  org: ORG,
  level: "C1 (CEFR)",
  about: "Untuk studi di universitas berbahasa Jerman dan pekerjaan dengan tuntutan bahasa tinggi. Diakui sebagai bukti kemampuan bahasa untuk masuk sebagian besar program studi di Jerman.",
  format: [
    { name: "Lesen Membaca", time: "65 menit", items: "3 bagian", tasks: "Teks ilmiah populer, artikel opini, teks panjang" },
    { name: "Hören Menyimak", time: "sekitar 40 menit", items: "2 bagian", tasks: "Wawancara, kuliah dan diskusi" },
    { name: "Schreiben Menulis", time: "75 menit", items: "2 bagian", tasks: "Teks argumentatif (~230 kata) dan pesan formal (~120 kata)" },
    { name: "Sprechen Berbicara", time: "sekitar 15 menit", items: "2 bagian", tasks: "Presentasi singkat dan diskusi" },
  ],
  scoring: modular,
  tips: ["Gunakan nominalisasi dan penghubung kompleks (zumal, wohingegen, infolgedessen) secara wajar.", "Di Lesen, perhatikan sikap penulis: kata seperti allerdings, freilich, keineswegs sering jadi kunci."],
  official: { label: "goethe.de", url: "https://www.goethe.de/de/spr/prf/gzc1.html" },
  sources: src("C1", "gzc1"),
  parts: [
    {
      id: "lesen",
      section: "Lesen",
      title: "Membaca",
      instructions: "Baca, lalu jawab.",
      minutes: 6,
      questions: [
        mc({
          task: "Teil 2",
          passage:
            "Die Vier-Tage-Woche wird häufig als Allheilmittel gegen Überlastung gepriesen. Freilich zeigen Pilotprojekte, dass ihr Erfolg weniger von der Zahl der Arbeitstage abhängt als von der Frage, ob Abläufe tatsächlich verschlankt werden. Wer lediglich dieselbe Arbeit in kürzerer Zeit erledigen soll, erlebt eher mehr als weniger Druck.",
          prompt: "Welche Position vertritt der Autor?",
          opts: [
            "Entscheidend ist, ob die Arbeitsabläufe effizienter werden.",
            "Die Vier-Tage-Woche verringert immer den Stress.",
            "Pilotprojekte sind wenig aussagekräftig.",
            "Mehr Arbeitstage führen zu besseren Ergebnissen.",
          ],
        }),
      ],
    },
    {
      id: "schreiben",
      section: "Schreiben",
      title: "Menulis",
      instructions: "Tulis teks argumentatif.",
      minutes: 40,
      questions: [
        {
          type: "write",
          task: "Teil 1: Argumentation",
          prompt: "Schreiben Sie einen Beitrag für ein Online-Magazin zum Thema »Sollte ein soziales Pflichtjahr für junge Erwachsene eingeführt werden?« Gehen Sie auf Vor- und Nachteile ein, beziehen Sie Stellung und machen Sie einen Vorschlag (ca. 230 Wörter).",
          minWords: 200,
          maxWords: 270,
          minutes: 40,
          checklist: ["Pengantar yang menarik ke topik.", "Argumen pro dan kontra dengan contoh.", "Sikap pribadi yang jelas.", "Usul konkret di akhir.", "Variasi struktur kalimat dan penghubung."],
        },
      ],
    },
  ],
};

/* ---------------------------------------------------------------- C2 */

export const goetheC2: Exam = {
  id: "goethe-c2",
  lang: "jerman",
  name: "Goethe-Zertifikat C2",
  fullName: "Goethe-Zertifikat C2: Großes Deutsches Sprachdiplom",
  org: ORG,
  level: "C2 (CEFR)",
  about: "Level tertinggi. Menunjukkan penguasaan bahasa Jerman mendekati penutur asli terdidik, misalnya untuk mengajar bahasa Jerman atau bekerja sebagai penerjemah.",
  format: [
    { name: "Lesen Membaca", time: "80 menit", items: "beberapa bagian", tasks: "Teks sastra, esai, artikel ilmiah populer" },
    { name: "Hören Menyimak", time: "sekitar 35 menit", items: "beberapa bagian", tasks: "Wawancara, kuliah, siaran radio" },
    { name: "Schreiben Menulis", time: "80 menit", items: "2 bagian", tasks: "Teks argumentatif dan menyunting/menulis ulang teks" },
    { name: "Sprechen Berbicara", time: "sekitar 15 menit", items: "2 bagian", tasks: "Presentasi dan diskusi" },
  ],
  scoring: modular,
  tips: ["Pada level C2, ketepatan gaya (register, idiom, kolokasi) dinilai sama pentingnya dengan isi."],
  official: { label: "goethe.de", url: "https://www.goethe.de/de/spr/prf/gzc2.html" },
  sources: src("C2", "gzc2"),
  parts: [
    {
      id: "wortschatz",
      section: "Lesen",
      title: "Kosakata dan gaya",
      instructions: "Pilih ungkapan yang paling tepat.",
      minutes: 4,
      questions: [
        mc({ task: "Redewendung", prompt: "Nach monatelangen Verhandlungen haben beide Seiten endlich einen Kompromiss … .", opts: ["erzielt", "erledigt", "erhoben", "erworben"], explain: "Kolokasi: einen Kompromiss erzielen." }),
        mc({ task: "Register", prompt: "Welche Formulierung passt in einen wissenschaftlichen Aufsatz?", opts: ["Die Ergebnisse legen nahe, dass …", "Man sieht ja total, dass …", "Ehrlich gesagt glaube ich, dass …", "Das ist doch klar, dass …"] }),
      ],
    },
  ],
};

export const goetheHigher = [goetheA2, goetheB1, goetheB2, goetheC1, goetheC2];
