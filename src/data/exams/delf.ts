import type { Exam } from "./types";
import { mc } from "./build";

/**
 * DELF A2 sampai B2 dan DALF C1 sampai C2. Struktur dari France Éducation
 * international; soal latihan ditulis sendiri meniru jenis tugas aslinya.
 */

const ORG = "France Éducation international, untuk Kementerian Pendidikan Prancis";
const NOTE = "France Éducation international memperbarui bentuk soal pemahaman DELF secara bertahap. Periksa contoh soal terbaru (sujets d'exemple) sebelum mendaftar.";
const SCORE = ["Setiap bagian bernilai 25, total 100.", "Lulus dengan minimal 50 dari 100, dan minimal 5 dari 25 di setiap bagian.", "Diploma berlaku seumur hidup; di Indonesia diselenggarakan oleh IFI."];
const fei = (path: string, label: string) => ({ label: `France Éducation international: ${label}`, url: `https://www.france-education-international.fr/${path}` });

export const delfA2: Exam = {
  id: "delf-a2",
  lang: "prancis",
  name: "DELF A2",
  fullName: "Diplôme d'études en langue française, niveau A2",
  org: ORG,
  level: "A2 (CEFR)",
  about: "Kemampuan dasar untuk tugas sehari-hari yang sederhana: belanja, perjalanan, keluarga, pekerjaan. Sering diminta untuk izin tinggal jangka panjang tertentu di Prancis.",
  note: NOTE,
  format: [
    { name: "Compréhension de l'oral", time: "sekitar 25 menit", items: "4 latihan", tasks: "Pengumuman, pesan suara, siaran radio pendek" },
    { name: "Compréhension des écrits", time: "30 menit", items: "4 latihan", tasks: "Iklan, email, petunjuk, artikel pendek" },
    { name: "Production écrite", time: "45 menit", items: "2 latihan", tasks: "Menceritakan pengalaman dan menulis pesan (masing-masing minimal 60 kata)" },
    { name: "Production orale", time: "6–8 menit, persiapan 10 menit", items: "3 bagian", tasks: "Wawancara terpandu, monolog, dialog simulasi" },
  ],
  scoring: SCORE,
  tips: ["Untuk menceritakan pengalaman, kuasai passé composé dan imparfait beserta penanda waktu (d'abord, ensuite, enfin)."],
  official: { label: "france-education-international.fr", url: "https://www.france-education-international.fr/diplome/delf-tout-public/niveau-a2" },
  sources: [fei("diplome/delf-tout-public/niveau-a2", "DELF A2")],
  parts: [
    {
      id: "comprehension",
      section: "Compréhension",
      title: "Menyimak dan membaca",
      instructions: "Dengarkan atau baca, lalu jawab.",
      minutes: 5,
      questions: [
        mc({
          task: "Compréhension de l'oral",
          audio: "Bonjour, c'est Julie. Je ne peux pas venir au cinéma ce soir, j'ai trop de travail. On peut y aller samedi après-midi ? Rappelle-moi !",
          prompt: "Qu'est-ce que Julie propose ?",
          opts: ["d'aller au cinéma samedi après-midi", "d'aller au cinéma ce soir", "de travailler ensemble", "d'aller au restaurant samedi"],
        }),
        mc({
          task: "Compréhension des écrits",
          passage: "Piscine municipale — horaires d'été\nDu lundi au vendredi : 10 h – 20 h\nSamedi et dimanche : 9 h – 18 h\nFermée le 14 juillet.\nEntrée : 4 € (gratuit pour les moins de 6 ans)",
          prompt: "Vous voulez nager dimanche à 19 h. C'est possible ?",
          opts: ["Non, la piscine ferme à 18 h.", "Oui, c'est ouvert jusqu'à 20 h.", "Oui, mais c'est gratuit.", "Non, elle est fermée le dimanche."],
        }),
      ],
    },
    {
      id: "production",
      section: "Production écrite",
      title: "Menulis",
      instructions: "Tulis sesuai tugas.",
      minutes: 20,
      questions: [
        {
          type: "write",
          task: "Exercice 1: raconter",
          prompt: "Vous avez passé un week-end dans une ville que vous ne connaissiez pas. Vous écrivez à un ami pour raconter ce que vous avez fait et donner vos impressions (60 mots minimum).",
          minWords: 60,
          minutes: 20,
          checklist: ["Salam pembuka dan penutup.", "Kegiatan diceritakan dengan passé composé.", "Kesan atau perasaan (c'était…, j'ai adoré…).", "Minimal 60 kata."],
          model:
            "Salut Paul,\nLe week-end dernier, je suis allée à Lyon avec ma sœur. Samedi, nous avons visité la vieille ville et nous avons mangé dans un bouchon traditionnel. Dimanche, il faisait beau, alors nous avons fait une promenade au bord du Rhône. C'était une ville très agréable et les gens étaient sympathiques. J'ai adoré ! Tu dois y aller un jour.\nBises,\nRina",
        },
      ],
    },
  ],
};

export const delfB1: Exam = {
  id: "delf-b1",
  lang: "prancis",
  name: "DELF B1",
  fullName: "Diplôme d'études en langue française, niveau B1",
  org: ORG,
  level: "B1 (CEFR)",
  about: "Pengguna mandiri: bisa mengikuti diskusi, menyampaikan pendapat, dan menangani situasi tak terduga dalam kehidupan sehari-hari. Sering menjadi syarat naturalisasi dan sebagian program studi.",
  note: NOTE,
  format: [
    { name: "Compréhension de l'oral", time: "sekitar 25 menit", items: "3 latihan", tasks: "Percakapan, siaran radio, wawancara" },
    { name: "Compréhension des écrits", time: "35 menit", items: "2 latihan", tasks: "Memilih dokumen yang sesuai kebutuhan, memahami artikel" },
    { name: "Production écrite", time: "45 menit", items: "1 tugas", tasks: "Esai, surat, atau artikel berisi pendapat (minimal 160 kata)" },
    { name: "Production orale", time: "15 menit, persiapan 10 menit", items: "3 bagian", tasks: "Wawancara terpandu, latihan interaksi, monolog tentang dokumen" },
  ],
  scoring: SCORE,
  tips: ["Production écrite dinilai juga dari susunan: perkenalan, dua atau tiga argumen, kesimpulan.", "Di monolog lisan, ungkapkan pendapat tentang dokumen, bukan hanya meringkasnya."],
  official: { label: "france-education-international.fr", url: "https://www.france-education-international.fr/diplome/delf-tout-public/niveau-b1" },
  sources: [fei("diplome/delf-tout-public/niveau-b1", "DELF B1")],
  parts: [
    {
      id: "comprehension",
      section: "Compréhension",
      title: "Menyimak dan membaca",
      instructions: "Dengarkan atau baca, lalu jawab.",
      minutes: 6,
      questions: [
        mc({
          task: "Compréhension de l'oral",
          audio: "Journaliste : Vous avez ouvert un café où les clients peuvent réparer leurs objets. Pourquoi ? Femme : Parce qu'on jette trop de choses qui marchent encore presque. Ici, des bénévoles aident les gens à réparer une lampe, un vélo, un grille-pain. On économise de l'argent et on crée du lien entre voisins.",
          prompt: "Selon la femme, quels sont les avantages du café ?",
          opts: ["économiser de l'argent et rencontrer des voisins", "acheter des objets neufs moins chers", "apprendre un métier rémunéré", "vendre des vélos d'occasion"],
        }),
        mc({
          task: "Compréhension des écrits",
          passage:
            "De plus en plus d'entreprises proposent la semaine de quatre jours. Les salariés apprécient d'avoir plus de temps libre, mais certains constatent que leurs journées sont devenues plus longues et plus fatigantes. Pour les experts, la réussite dépend surtout de l'organisation du travail.",
          prompt: "Selon le texte, qu'est-ce qui est le plus important pour réussir la semaine de quatre jours ?",
          opts: ["l'organisation du travail", "le nombre de salariés", "le salaire", "la durée des vacances"],
        }),
      ],
    },
    {
      id: "production",
      section: "Production écrite",
      title: "Menulis",
      instructions: "Tulis pendapat Anda.",
      minutes: 45,
      questions: [
        {
          type: "write",
          task: "Essai argumenté",
          prompt: "Sur le forum de votre ville, on se demande s'il faut interdire les voitures dans le centre-ville. Vous donnez votre opinion de façon argumentée, avec des exemples (160 mots minimum).",
          minWords: 160,
          minutes: 45,
          checklist: ["Perkenalan topik.", "Dua atau tiga argumen dengan contoh.", "Penghubung (d'abord, de plus, cependant, donc).", "Kesimpulan dengan pendapat jelas.", "Minimal 160 kata."],
        },
      ],
    },
  ],
};

export const delfB2: Exam = {
  id: "delf-b2",
  lang: "prancis",
  name: "DELF B2",
  fullName: "Diplôme d'études en langue française, niveau B2",
  org: ORG,
  level: "B2 (CEFR)",
  about: "Syarat bahasa paling umum untuk kuliah S1 di universitas Prancis. Menunjukkan kemampuan berargumen dan memahami teks serta siaran yang cukup kompleks.",
  note: NOTE,
  format: [
    { name: "Compréhension de l'oral", time: "sekitar 30 menit", items: "beberapa dokumen", tasks: "Wawancara, berita, kuliah, debat" },
    { name: "Compréhension des écrits", time: "60 menit", items: "2 latihan", tasks: "Teks informatif dan teks argumentatif" },
    { name: "Production écrite", time: "60 menit", items: "1 tugas", tasks: "Teks argumentatif: surat formal, artikel, atau kontribusi di forum (minimal 250 kata)" },
    { name: "Production orale", time: "20 menit, persiapan 30 menit", items: "1 tugas", tasks: "Mempertahankan pendapat dari dokumen pemicu, lalu berdebat dengan penguji" },
  ],
  scoring: SCORE,
  tips: ["Production orale B2 dinilai dari kemampuan membela pendapat saat penguji membantah. Siapkan contoh nyata.", "Di teks argumentatif, satu argumen = satu paragraf dengan contoh."],
  official: { label: "france-education-international.fr", url: "https://www.france-education-international.fr/diplome/delf-tout-public/niveau-b2" },
  sources: [fei("diplome/delf-tout-public/niveau-b2", "DELF B2")],
  parts: [
    {
      id: "comprehension",
      section: "Compréhension des écrits",
      title: "Membaca",
      instructions: "Baca, lalu jawab.",
      minutes: 6,
      questions: [
        mc({
          task: "Texte argumentatif",
          passage:
            "On reproche souvent aux réseaux sociaux d'enfermer les utilisateurs dans des bulles où ils ne voient que des opinions semblables aux leurs. Pourtant, plusieurs études nuancent ce constat : les internautes croisent en ligne davantage de points de vue divergents que dans leur entourage réel. Le véritable problème serait moins l'absence de diversité que la manière, souvent agressive, dont ces désaccords s'expriment.",
          prompt: "Quelle est la thèse de l'auteur ?",
          opts: [
            "Le problème principal est la façon agressive dont on débat en ligne.",
            "Les réseaux sociaux enferment toujours les utilisateurs dans des bulles.",
            "Les internautes ne rencontrent jamais d'opinions différentes.",
            "Il faut interdire les réseaux sociaux.",
          ],
        }),
      ],
    },
    {
      id: "orale",
      section: "Production orale",
      title: "Berbicara",
      instructions: "Siapkan pendapat dari dokumen pemicu, lalu bicara.",
      minutes: 10,
      questions: [
        {
          type: "speak",
          task: "Exposé et débat",
          prompt: "Document : « Faut-il rendre le vote obligatoire ? » Dégagez le problème, présentez votre opinion avec des arguments et des exemples, puis défendez-la.",
          prepSeconds: 120,
          speakSeconds: 300,
          checklist: ["Memperkenalkan masalah dari dokumen.", "Rencana jelas (d'abord, ensuite, enfin).", "Argumen dengan contoh.", "Kesimpulan.", "Siap menanggapi bantahan."],
        },
      ],
    },
  ],
};

export const dalfC1: Exam = {
  id: "dalf-c1",
  lang: "prancis",
  name: "DALF C1",
  fullName: "Diplôme approfondi de langue française, niveau C1",
  org: ORG,
  level: "C1 (CEFR)",
  about: "Membebaskan pemegangnya dari tes bahasa untuk masuk universitas Prancis. Menguji kemampuan memahami dokumen panjang dan menyusun sintesis serta argumen yang terstruktur.",
  format: [
    { name: "Compréhension de l'oral", time: "sekitar 40 menit", items: "beberapa dokumen", tasks: "Dokumen panjang (kuliah, wawancara) dan beberapa dokumen pendek" },
    { name: "Compréhension des écrits", time: "50 menit", items: "1 teks", tasks: "Teks panjang 1.500–2.000 kata" },
    { name: "Production écrite", time: "2 jam 30 menit", items: "2 tugas", tasks: "Synthèse dari beberapa dokumen, lalu essai argumentatif" },
    { name: "Production orale", time: "30 menit, persiapan 1 jam", items: "1 tugas", tasks: "Exposé dari dokumen, lalu diskusi dengan juri" },
  ],
  scoring: SCORE,
  tips: ["Synthèse tidak boleh berisi pendapat pribadi dan tidak boleh mengutip kalimat dokumen apa adanya.", "Exposé lisan butuh rencana yang diumumkan di awal (problématique + 2–3 bagian)."],
  official: { label: "france-education-international.fr", url: "https://www.france-education-international.fr/diplome/dalf/niveau-c1" },
  sources: [fei("diplome/dalf/niveau-c1", "DALF C1")],
  parts: [
    {
      id: "ecrit",
      section: "Production écrite",
      title: "Menulis",
      instructions: "Kerjakan latihan sintesis versi pendek.",
      minutes: 30,
      questions: [
        {
          type: "write",
          task: "Synthèse (version courte)",
          passage:
            "Document 1 : Selon une enquête nationale, 62 % des Français déclarent lire moins de livres qu'il y a dix ans, principalement par manque de temps et à cause des écrans.\nDocument 2 : Les bibliothèques constatent pourtant une hausse des emprunts de livres audio et numériques, notamment chez les 18–30 ans, qui lisent « autrement », dans les transports ou en faisant du sport.",
          prompt: "Rédigez une synthèse de ces deux documents (environ 120 mots), sans donner votre opinion et sans recopier les phrases.",
          minWords: 100,
          maxWords: 140,
          minutes: 30,
          checklist: ["Judul.", "Problématique yang menghubungkan kedua dokumen.", "Informasi kedua dokumen digabung, bukan dirangkum satu per satu.", "Tanpa pendapat pribadi.", "Tanpa menyalin kalimat dokumen."],
        },
      ],
    },
  ],
};

export const dalfC2: Exam = {
  id: "dalf-c2",
  lang: "prancis",
  name: "DALF C2",
  fullName: "Diplôme approfondi de langue française, niveau C2",
  org: ORG,
  level: "C2 (CEFR)",
  about: "Level tertinggi diploma bahasa Prancis. Peserta memilih bidang (lettres et sciences humaines atau sciences) dan diuji dalam dua bagian besar yang memadukan pemahaman dan produksi.",
  format: [
    { name: "Compréhension et production orales", time: "30 menit, persiapan 1 jam", items: "1 tugas", tasks: "Mendengarkan dokumen, lalu exposé argumentatif dan debat dengan juri" },
    { name: "Compréhension et production écrites", time: "3 jam 30 menit", items: "1 tugas", tasks: "Menulis teks terstruktur (artikel, editorial, laporan) dari kumpulan dokumen" },
  ],
  scoring: ["Setiap bagian bernilai 50, total 100.", "Lulus dengan minimal 50 dari 100, dan minimal 10 dari 50 di setiap bagian."],
  tips: ["Pada C2, bentuk teks (editorial, laporan, surat terbuka) harus sesuai yang diminta, lengkap dengan register yang tepat."],
  official: { label: "france-education-international.fr", url: "https://www.france-education-international.fr/diplome/dalf/niveau-c2" },
  sources: [fei("diplome/dalf/niveau-c2", "DALF C2")],
  parts: [
    {
      id: "orale",
      section: "Production orale",
      title: "Berbicara",
      instructions: "Siapkan exposé, lalu bicara.",
      minutes: 12,
      questions: [
        {
          type: "speak",
          task: "Exposé argumenté",
          prompt: "Thème : « Le télétravail transforme-t-il notre rapport à la ville ? » Présentez un exposé structuré avec une problématique, deux ou trois axes et une conclusion ouverte.",
          prepSeconds: 300,
          speakSeconds: 420,
          checklist: ["Problématique dirumuskan.", "Rencana diumumkan.", "Argumen bernuansa dengan contoh.", "Kesimpulan yang membuka pertanyaan baru.", "Register formal dan kosakata kaya."],
        },
      ],
    },
  ],
};

export const delfHigher = [delfA2, delfB1, delfB2, dalfC1, dalfC2];
