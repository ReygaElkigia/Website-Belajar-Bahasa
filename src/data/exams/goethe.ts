import type { Exam, Question } from "./types";
import { gap, mc } from "./build";

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

/* ---------------------------------------------------------------- Latihan tambahan */

goetheA2.parts.push({
  id: "mehr",
  section: "Lesen · Hören · Sprechen",
  title: "Latihan tambahan",
  instructions: "Baca, dengarkan, atau bicara sesuai tugas.",
  minutes: 10,
  questions: [
    rf({
      task: "Lesen Teil 1: Zeitungstext",
      passage: "Seit Montag gibt es im Stadtpark einen neuen Spielplatz. Er ist täglich von 8 bis 20 Uhr geöffnet. Hunde dürfen nicht auf den Spielplatz. Die Stadt hat für den Spielplatz 80.000 Euro bezahlt.",
      prompt: "Hunde dürfen mit auf den Spielplatz.",
      ok: false,
    }),
    mc({
      task: "Lesen Teil 3: E-Mail",
      passage: "Liebe Anna,\nich bin jetzt seit zwei Wochen in Hamburg. Die Arbeit gefällt mir gut, nur die Wohnung ist zu klein und zu teuer. Am Wochenende suche ich eine neue. Kommst du mich im Mai besuchen?\nLiebe Grüße\nTom",
      prompt: "Was ist Toms Problem?",
      opts: ["Seine Wohnung ist klein und teuer.", "Die Arbeit gefällt ihm nicht.", "Er hat keine Freunde in Hamburg.", "Er muss am Wochenende arbeiten."],
    }),
    mc({
      task: "Lesen Teil 4: Anzeigen",
      passage: "A) Sprachkurs Spanisch, abends, 2× pro Woche\nB) Kochkurs für Kinder, samstags 10 Uhr\nC) Yoga am Morgen, Mo–Fr 7 Uhr\nD) Fotokurs am Wochenende, Kamera mitbringen",
      prompt: "Lena arbeitet tagsüber und möchte abends eine Sprache lernen. Welche Anzeige passt?",
      opts: ["A", "B", "C", "D"],
    }),
    mc({
      task: "Hören Teil 1: Radio",
      audio: "Und jetzt das Wetter: Am Vormittag ist es noch sonnig, am Nachmittag kommen von Westen Wolken und es regnet. Die Temperaturen liegen bei 18 Grad.",
      prompt: "Wie wird das Wetter am Nachmittag?",
      opts: ["Es regnet.", "Es ist sonnig.", "Es schneit.", "Es ist sehr heiß."],
    }),
    mc({
      task: "Hören Teil 4: Interview",
      audio: "Reporterin: Herr Lang, Sie fahren jeden Tag mit dem Fahrrad zur Arbeit, auch im Winter? Herr Lang: Ja, nur wenn es schneit, nehme ich den Bus. Das Fahrrad ist schneller als das Auto, weil ich nie im Stau stehe.",
      prompt: "Wann fährt Herr Lang mit dem Bus?",
      opts: ["wenn es schneit", "jeden Montag", "wenn er spät aufsteht", "im Sommer"],
    }),
    gap({
      task: "Grammatik im Kontext",
      prompt: "Pilih kata yang tepat.",
      text: "Gestern [0] ich mit meiner Schwester ins Kino gegangen. Der Film war gut, [1] er war ein bisschen zu lang.",
      gaps: [
        ["bin", "habe", "war", "hatte"],
        ["aber", "denn", "oder", "weil"],
      ],
    }),
    {
      type: "speak",
      task: "Sprechen Teil 2: Über sich sprechen",
      prompt: "Erzählen Sie: Was machen Sie am Wochenende gern? Mit wem? Wo?",
      prepSeconds: 30,
      speakSeconds: 60,
      checklist: ["Kegiatan akhir pekan.", "Dengan siapa.", "Di mana.", "Kalimat lengkap dengan kata kerja di posisi kedua."],
      model: "Am Wochenende schlafe ich gern lange. Am Samstag gehe ich oft mit meinen Freunden in den Park, und am Sonntag koche ich mit meiner Familie.",
    },
    {
      type: "speak",
      task: "Sprechen Teil 3: Gemeinsam etwas planen",
      prompt: "Sie und Ihr Partner möchten einer Kollegin ein Geschenk kaufen. Machen Sie Vorschläge: Was? Wie viel Geld? Wer kauft es? Wann?",
      prepSeconds: 30,
      speakSeconds: 90,
      checklist: ["Menawarkan usul (Wollen wir…?).", "Menanggapi usul (Gute Idee! / Lieber…).", "Menyepakati keputusan."],
    },
  ],
});

goetheB1.parts.push({
  id: "mehr",
  section: "Lesen · Hören · Sprechen",
  title: "Latihan tambahan",
  instructions: "Kerjakan tugas berikut.",
  minutes: 14,
  questions: [
    mc({
      task: "Lesen Teil 2: Zeitungsartikel",
      passage:
        "Immer mehr Menschen teilen sich ein Auto. Beim Carsharing bucht man das Fahrzeug per App und bezahlt nur für die Zeit, die man es nutzt. Besonders in Großstädten ist das beliebt, weil Parkplätze knapp und teuer sind. Auf dem Land dagegen fehlen oft die Angebote.",
      prompt: "Warum ist Carsharing in Großstädten beliebt?",
      opts: ["Weil Parkplätze knapp und teuer sind.", "Weil es dort keine Busse gibt.", "Weil die Autos kostenlos sind.", "Weil man kein Handy braucht."],
    }),
    mc({
      task: "Lesen Teil 3: Anzeigen",
      passage: "a) Nachhilfe Mathe, alle Klassen, auch online\nb) Gitarrenunterricht für Erwachsene, Anfänger willkommen\nc) Babysitter gesucht, 2× pro Woche abends\nd) Deutschkurs B2, Prüfungsvorbereitung, Samstag",
      prompt: "Herr Ortiz möchte sich auf eine Deutschprüfung vorbereiten. Welche Anzeige passt?",
      opts: ["d", "a", "b", "c"],
    }),
    rf({
      task: "Lesen Teil 5: Hausordnung",
      passage: "Hausordnung: Die Mülltonnen werden jeden Dienstag geleert. Fahrräder dürfen nicht im Treppenhaus abgestellt werden. Bitte nutzen Sie den Fahrradkeller. Zwischen 22 und 6 Uhr ist Nachtruhe.",
      prompt: "Fahrräder kann man im Treppenhaus abstellen.",
      ok: false,
    }),
    mc({
      task: "Hören Teil 2: Führung",
      audio: "Herzlich willkommen im Stadtmuseum! Unser Rundgang dauert etwa eine Stunde. Wir beginnen im Erdgeschoss mit der Stadtgeschichte. Fotografieren ist erlaubt, aber bitte ohne Blitz. Am Ende können Sie im Museumscafé im dritten Stock eine Pause machen.",
      prompt: "Was ist im Museum nicht erlaubt?",
      opts: ["mit Blitz fotografieren", "fotografieren", "ins Café gehen", "Fragen stellen"],
    }),
    rf({
      task: "Hören Teil 3: Gespräch",
      audio: "Frau: Sag mal, fährst du dieses Jahr wieder nach Italien? Mann: Nein, diesmal nicht. Wir haben so viel Geld für die neue Küche ausgegeben, wir bleiben im Sommer zu Hause und machen nur ein paar Ausflüge.",
      prompt: "Der Mann fährt in diesem Sommer nach Italien.",
      ok: false,
    }),
    mc({
      task: "Hören Teil 4: Diskussion",
      audio: "Moderator: Sollen Schüler schon um sieben Uhr Unterricht haben? Frau Weber, Lehrerin: Ich halte das für keine gute Idee. Jugendliche sind morgens oft müde und lernen schlechter. Ein späterer Beginn um halb neun wäre besser.",
      prompt: "Was meint Frau Weber?",
      opts: ["Der Unterricht sollte später beginnen.", "Schüler sollten früher aufstehen.", "Sieben Uhr ist ideal.", "Es sollte weniger Unterricht geben."],
    }),
    {
      type: "write",
      task: "Schreiben Teil 1: E-Mail an Freund",
      prompt: "Sie sind vor kurzem umgezogen. Schreiben Sie einer Freundin: Beschreiben Sie die neue Wohnung. Was gefällt Ihnen in der neuen Umgebung besonders? Laden Sie sie zu einer kleinen Party ein (ca. 80 Wörter).",
      minWords: 70,
      maxWords: 110,
      minutes: 20,
      checklist: ["Ketiga poin ada.", "Anrede dan salam informal.", "Konektor: und, aber, deshalb, außerdem.", "Sekitar 80 kata."],
    },
    {
      type: "speak",
      task: "Sprechen Teil 1: Gemeinsam etwas planen",
      prompt: "Ein Freund aus Ihrem Deutschkurs hat Geburtstag. Planen Sie mit Ihrem Partner eine Überraschung: Wo feiern? Wer wird eingeladen? Essen und Getränke? Geschenk?",
      prepSeconds: 30,
      speakSeconds: 150,
      checklist: ["Menawarkan dan menanggapi usul.", "Menolak dengan sopan dan memberi alternatif.", "Menyepakati semua poin."],
    },
  ],
});

goetheB2.parts.push({
  id: "mehr",
  section: "Lesen · Hören · Sprechen",
  title: "Latihan tambahan",
  instructions: "Kerjakan tugas berikut.",
  minutes: 18,
  questions: [
    mc({
      task: "Lesen Teil 1: Meinungen",
      passage: "Thema: Sollte das Plastikgeschirr in Kantinen verboten werden?\nJonas: »Ein Verbot ist überfällig. Mehrweggeschirr ist längst erprobt und spart Unmengen an Müll.«\nPetra: »Grundsätzlich richtig, aber kleine Kantinen haben oft keine Spülmaschinen. Man sollte ihnen Zeit für die Umstellung geben.«",
      prompt: "Welche Haltung hat Petra?",
      opts: ["Sie ist dafür, fordert aber eine Übergangszeit.", "Sie lehnt ein Verbot strikt ab.", "Sie hält Mehrweggeschirr für unhygienisch.", "Sie hat keine Meinung."],
    }),
    gap({
      task: "Lesen Teil 3: Lückentext",
      prompt: "Pilih kata yang paling tepat.",
      text: "Viele Unternehmen setzen inzwischen auf flexible Arbeitszeiten. [0] die Mitarbeitenden zufriedener sind, sinkt auch die Zahl der Krankmeldungen. Kritiker bemängeln [1], dass die Grenze zwischen Arbeit und Freizeit verschwimmt.",
      gaps: [
        ["Da", "Obwohl", "Damit", "Sobald"],
        ["jedoch", "deshalb", "nämlich", "also"],
      ],
    }),
    mc({
      task: "Lesen Teil 4: Leserbriefe",
      passage: "»Ich finde es richtig, dass unsere Stadt die Innenstadt für Autos sperrt. Seitdem kaufe ich wieder lieber im Zentrum ein, weil es ruhiger ist. Allerdings müssten die Busse dann auch öfter fahren.« – Maria K.",
      prompt: "Was kritisiert Maria K.?",
      opts: ["dass die Busse zu selten fahren", "die Sperrung der Innenstadt", "die Geschäfte im Zentrum", "den Lärm"],
    }),
    mc({
      task: "Hören Teil 1: Kurze Texte",
      audio: "Liebe Kundinnen und Kunden, aufgrund einer Systemstörung können wir heute leider keine Kartenzahlung annehmen. Bargeld erhalten Sie am Automaten neben dem Eingang. Wir bitten um Ihr Verständnis.",
      prompt: "Was sollen die Kunden tun?",
      opts: ["bar bezahlen", "mit Karte bezahlen", "morgen wiederkommen", "online bestellen"],
    }),
    mc({
      task: "Hören Teil 3: Radiodiskussion",
      audio: "Moderatorin: Herr Dr. Brandt, macht Social Media einsam? Dr. Brandt: Pauschal kann man das nicht sagen. Wer soziale Netzwerke nutzt, um bestehende Freundschaften zu pflegen, fühlt sich eher verbunden. Problematisch wird es, wenn man passiv scrollt und sich ständig mit anderen vergleicht.",
      prompt: "Wann ist Social Media laut Dr. Brandt problematisch?",
      opts: ["beim passiven Scrollen und Vergleichen", "beim Pflegen von Freundschaften", "grundsätzlich immer", "nur bei Jugendlichen"],
    }),
    mc({
      task: "Hören Teil 4: Vortrag",
      audio: "In meinem Vortrag geht es um die sogenannte Schwammstadt. Gemeint sind Städte, die Regenwasser wie ein Schwamm speichern – durch Grünflächen, begrünte Dächer und durchlässige Böden. Das schützt vor Überschwemmungen und kühlt die Stadt im Sommer.",
      prompt: "Was ist das Ziel einer Schwammstadt?",
      opts: ["Regenwasser speichern und die Stadt kühlen", "mehr Parkplätze schaffen", "Gebäude höher bauen", "Wasser schneller ableiten"],
    }),
    {
      type: "write",
      task: "Schreiben Teil 1: Forumsbeitrag",
      prompt: "Im Online-Forum einer Zeitung wird diskutiert: »Sollten Supermärkte unverkaufte Lebensmittel spenden müssen?« Schreiben Sie einen Beitrag (ca. 150 Wörter): Äußern Sie Ihre Meinung, nennen Sie Gründe und Beispiele, gehen Sie auf ein Gegenargument ein.",
      minWords: 140,
      maxWords: 190,
      minutes: 50,
      checklist: ["Einleitung.", "Dua argumen dengan contoh.", "Satu argumen lawan dan tanggapan.", "Schluss.", "Sekitar 150 kata."],
    },
    {
      type: "speak",
      task: "Sprechen Teil 1: Vortrag",
      prompt: "Halten Sie einen kurzen Vortrag (ca. 4 Minuten) zum Thema »Sollte Wohnen in Großstädten staatlich stärker reguliert werden?« Strukturieren Sie: Einleitung, Situation im Heimatland, Vor- und Nachteile, eigene Meinung, Schluss.",
      prepSeconds: 120,
      speakSeconds: 240,
      checklist: ["Struktur diumumkan di awal.", "Contoh dari negara asal.", "Pro dan kontra.", "Pendapat yang jelas.", "Penutup."],
    },
  ],
});

goetheC1.parts.push({
  id: "mehr",
  section: "Lesen · Hören · Sprechen",
  title: "Latihan tambahan",
  instructions: "Kerjakan tugas berikut.",
  minutes: 18,
  questions: [
    gap({
      task: "Lesen Teil 1: Lückentext",
      prompt: "Pilih kata yang paling tepat.",
      text: "Die Digitalisierung der Verwaltung kommt nur schleppend voran. Bürgerinnen und Bürger müssen [0] vieler Online-Angebote nach wie vor persönlich im Amt erscheinen, [1] die Prozesse im Hintergrund noch auf Papier beruhen.",
      gaps: [
        ["trotz", "wegen", "statt", "infolge"],
        ["da", "obwohl", "sofern", "indem"],
      ],
    }),
    mc({
      task: "Lesen Teil 3: Textverständnis",
      passage:
        "Dass Langeweile kreativ macht, ist mehr als eine Küchenweisheit. In Experimenten fanden Versuchspersonen, die zuvor eine monotone Aufgabe erledigt hatten, bei anschließenden Ideenaufgaben originellere Lösungen. Die Forschenden vermuten, dass das Gehirn in reizarmen Phasen nach eigener Stimulation sucht – ein Effekt, der verloren geht, wenn jede Leerlaufminute mit dem Smartphone gefüllt wird.",
      prompt: "Welche Schlussfolgerung legt der Text nahe?",
      opts: [
        "Ständige Ablenkung kann kreative Prozesse behindern.",
        "Monotone Arbeit sollte vermieden werden.",
        "Smartphones fördern die Kreativität.",
        "Langeweile ist wissenschaftlich nicht erforscht.",
      ],
    }),
    mc({
      task: "Wortschatz",
      prompt: "Die Regierung will die Maßnahmen zunächst in einem Modellprojekt … , bevor sie bundesweit eingeführt werden.",
      opts: ["erproben", "erörtern", "erheben", "ergreifen"],
      explain: "erproben = menguji coba.",
    }),
    mc({
      task: "Hören Teil 1: Interview",
      audio:
        "Journalist: Frau Professorin Lindner, Sie forschen zu Mehrsprachigkeit. Schadet es Kindern, wenn sie mit zwei Sprachen aufwachsen? Lindner: Das ist ein hartnäckiger Mythos. Kurzfristig mischen Kinder die Sprachen zwar mitunter, langfristig zeigen mehrsprachige Kinder aber häufig Vorteile, etwa beim Wechsel zwischen Aufgaben.",
      prompt: "Was sagt Professorin Lindner über Mehrsprachigkeit?",
      opts: ["Langfristig überwiegen oft die Vorteile.", "Sie schadet der Sprachentwicklung.", "Kinder sollten nur eine Sprache lernen.", "Das Mischen der Sprachen ist ein dauerhaftes Problem."],
    }),
    mc({
      task: "Hören Teil 2: Vortrag",
      audio:
        "Viele glauben, Recycling löse unser Müllproblem. Doch selbst bei vorbildlicher Trennung wird nur ein Teil des Kunststoffs tatsächlich wiederverwertet. Wirksamer wäre es, Verpackungen von vornherein zu vermeiden und Produkte so zu gestalten, dass sie repariert werden können.",
      prompt: "Was hält der Redner für am wirksamsten?",
      opts: ["Verpackungen vermeiden und reparierbare Produkte", "noch besser Müll trennen", "mehr Recyclinganlagen bauen", "Kunststoff verbrennen"],
    }),
    {
      type: "write",
      task: "Schreiben Teil 2: Formelle Mitteilung",
      prompt: "Sie haben an einer Weiterbildung teilgenommen, die nicht den Angaben in der Ausschreibung entsprach (weniger Unterrichtsstunden, kein Zertifikat). Schreiben Sie an den Veranstalter (ca. 120 Wörter): Schildern Sie die Mängel, nehmen Sie Bezug auf die Ausschreibung und formulieren Sie eine Forderung.",
      minWords: 110,
      maxWords: 150,
      minutes: 30,
      checklist: ["Register formal.", "Kekurangan dijelaskan konkret.", "Merujuk pada iklan/pengumuman.", "Tuntutan yang jelas dan sopan (Ich bitte Sie daher…)."],
    },
    {
      type: "speak",
      task: "Sprechen Teil 2: Diskussion",
      prompt: "Diskutieren Sie: »Sollten Universitäten Studiengebühren erheben, um die Qualität der Lehre zu verbessern?« Vertreten Sie eine Position, reagieren Sie auf Gegenargumente und versuchen Sie, zu einer Lösung zu kommen.",
      prepSeconds: 60,
      speakSeconds: 240,
      checklist: ["Posisi jelas dengan alasan.", "Menanggapi argumen lawan secara langsung.", "Ungkapan diskusi (Da muss ich widersprechen…, Ein Kompromiss wäre…).", "Mengusulkan solusi."],
    },
  ],
});

goetheC2.parts.push({
  id: "mehr",
  section: "Lesen · Hören · Schreiben",
  title: "Latihan tambahan",
  instructions: "Kerjakan tugas berikut.",
  minutes: 20,
  questions: [
    mc({
      task: "Lesen: Textverständnis",
      passage:
        "Wer heute von »Authentizität« spricht, meint selten das Unverstellte, sondern meist eine sorgfältig inszenierte Natürlichkeit. Gerade in sozialen Medien wird das scheinbar Spontane zur Ware – ein Paradox, das umso weniger auffällt, je perfekter die Inszenierung gelingt.",
      prompt: "Worin besteht das vom Autor beschriebene Paradox?",
      opts: [
        "Natürlichkeit wird bewusst inszeniert und vermarktet.",
        "Soziale Medien lehnen Authentizität ab.",
        "Spontaneität ist heute verboten.",
        "Inszenierungen fallen immer sofort auf.",
      ],
    }),
    mc({ task: "Redewendung", prompt: "Mit seinem Vorschlag hat er bei der Geschäftsführung offene Türen … .", opts: ["eingerannt", "eingeschlagen", "aufgesperrt", "zugeschlagen"], explain: "offene Türen einrennen = mengusulkan sesuatu yang sudah disetujui." }),
    mc({ task: "Stil", prompt: "Welche Umformulierung ist am präzisesten? »Die Firma hat viel Geld verloren.«", opts: ["Das Unternehmen verzeichnete erhebliche Verluste.", "Die Firma hat echt viel Kohle verloren.", "Da ist viel Geld weg.", "Die Firma ist pleite."] }),
    gap({
      task: "Lückentext",
      prompt: "Pilih ungkapan yang paling tepat.",
      text: "Die Reform ist zwar gut gemeint, [0] an der Lebensrealität vieler Familien vorbei. Es bleibt abzuwarten, [1] die Regierung nachbessert.",
      gaps: [
        ["geht aber", "gehen aber", "geht also", "ging deshalb"],
        ["inwieweit", "sodass", "weshalb nicht", "damit"],
      ],
    }),
    mc({
      task: "Hören: Radiofeature",
      audio:
        "Der Begriff »Heimat« erlebt eine erstaunliche Renaissance. Lange galt er als belastet, heute verwenden ihn Politiker aller Lager. Doch gerade diese Beliebtheit macht ihn unscharf: Jeder versteht darunter etwas anderes – vom Dorf der Kindheit bis zum Gefühl, irgendwo nicht fremd zu sein.",
      prompt: "Welches Problem sieht der Sprecher im Begriff »Heimat«?",
      opts: ["Er ist durch seine Beliebtheit unscharf geworden.", "Niemand benutzt ihn mehr.", "Er bezieht sich nur auf Dörfer.", "Er ist gesetzlich definiert."],
    }),
    {
      type: "write",
      task: "Schreiben: Umformulieren",
      passage: "Hey Leute, kurze Info: Die Sitzung morgen fällt flach, der Chef ist krank. Wir machen's dann nächsten Dienstag, gleiche Uhrzeit. Bringt bitte eure Zahlen mit!",
      prompt: "Formulieren Sie die Nachricht als formelle E-Mail an externe Projektpartner um.",
      minWords: 50,
      maxWords: 110,
      minutes: 15,
      checklist: ["Register formal sepenuhnya.", "Informasi tetap lengkap (batal, alasan, jadwal baru, membawa data).", "Anrede dan salam formal."],
      model:
        "Sehr geehrte Damen und Herren,\nleider müssen wir die für morgen geplante Besprechung absagen, da unser Abteilungsleiter erkrankt ist. Wir schlagen vor, den Termin auf kommenden Dienstag zur gleichen Uhrzeit zu verlegen. Wir wären Ihnen dankbar, wenn Sie die aktuellen Kennzahlen mitbringen könnten.\nMit freundlichen Grüßen",
    },
  ],
});

export const goetheHigher = [goetheA2, goetheB1, goetheB2, goetheC1, goetheC2];
