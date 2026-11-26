import type { Exam } from "./types";
import { gap, mc } from "./build";

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

/* ---------------------------------------------------------------- Latihan tambahan */

delfA2.parts.push({
  id: "plus",
  section: "Compréhension · Production orale",
  title: "Latihan tambahan",
  instructions: "Dengarkan, baca, atau bicara sesuai tugas.",
  minutes: 10,
  questions: [
    mc({
      task: "Compréhension de l'oral",
      audio: "Mesdames et messieurs, le magasin fermera dans quinze minutes. Nous vous invitons à vous diriger vers les caisses. Demain, le magasin sera ouvert de neuf heures à vingt heures.",
      prompt: "Dans combien de temps le magasin ferme-t-il ?",
      opts: ["dans 15 minutes", "dans une heure", "à neuf heures", "à vingt heures"],
    }),
    mc({
      task: "Compréhension de l'oral",
      audio: "Homme : Tu as trouvé un appartement ? Femme : Oui ! Il est petit, mais il est près de mon travail, donc je peux y aller à pied. Et il y a un grand balcon.",
      prompt: "Pourquoi la femme aime son appartement ?",
      opts: ["Il est près de son travail.", "Il est très grand.", "Il n'est pas cher.", "Il a un jardin."],
    }),
    mc({
      task: "Compréhension des écrits",
      passage: "Objet : Cours de cuisine\nBonjour à tous,\nLe cours de samedi est annulé car le professeur est malade. Il aura lieu le samedi suivant, à la même heure. N'oubliez pas d'apporter un tablier.\nL'équipe de l'Atelier Gourmand",
      prompt: "Pourquoi le cours est-il annulé ?",
      opts: ["Le professeur est malade.", "Il n'y a pas assez d'élèves.", "La salle est fermée.", "Il manque des tabliers."],
    }),
    mc({
      task: "Compréhension des écrits",
      passage: "Location de vélos — Tarifs\n1 heure : 3 €\n1 journée : 12 €\n1 semaine : 45 €\nCaution : 150 € (rendue au retour du vélo)",
      prompt: "Vous louez un vélo pour deux jours. Combien payez-vous (sans la caution) ?",
      opts: ["24 €", "12 €", "45 €", "6 €"],
    }),
    mc({ task: "Grammaire", prompt: "Hier, nous (　) au restaurant avec des amis.", opts: ["sommes allés", "avons allé", "allons", "irons"], explain: "aller memakai être di passé composé." }),
    mc({ task: "Grammaire", prompt: "Quand j'étais petit, je (　) souvent chez ma grand-mère.", opts: ["allais", "suis allé", "irai", "vais"], explain: "Kebiasaan di masa lalu: imparfait." }),
    {
      type: "speak",
      task: "Production orale: monologue suivi",
      prompt: "Parlez de votre ville : où elle se trouve, ce qu'on peut y faire, ce que vous aimez et n'aimez pas.",
      prepSeconds: 60,
      speakSeconds: 120,
      checklist: ["Lokasi kota.", "Kegiatan yang bisa dilakukan.", "Yang disukai dan tidak disukai.", "Penghubung (et, mais, parce que)."],
    },
    {
      type: "speak",
      task: "Production orale: exercice en interaction",
      prompt: "Vous êtes dans une agence de voyage. Vous voulez partir un week-end à la mer. Demandez des informations (transport, hôtel, prix) et choisissez une offre.",
      prepSeconds: 60,
      speakSeconds: 120,
      checklist: ["Salam dan vous.", "Bertanya transport, hotel, harga.", "Memilih dan memesan dengan sopan (Je voudrais…)."],
    },
  ],
});

delfB1.parts.push({
  id: "plus",
  section: "Compréhension · Production orale",
  title: "Latihan tambahan",
  instructions: "Dengarkan, baca, atau bicara sesuai tugas.",
  minutes: 14,
  questions: [
    mc({
      task: "Compréhension de l'oral",
      audio: "Femme : Je pense arrêter de prendre la voiture pour aller au bureau. Homme : Ah bon ? Et comment tu vas faire ? Femme : Je vais essayer le covoiturage avec deux collègues qui habitent près de chez moi. On partagera les frais d'essence.",
      prompt: "Quelle solution la femme choisit-elle ?",
      opts: ["Partager une voiture avec des collègues.", "Prendre le train.", "Travailler à la maison.", "Acheter un vélo électrique."],
    }),
    mc({
      task: "Compréhension de l'oral",
      audio: "À la radio : selon une étude récente, les Français passent en moyenne trois heures par jour devant un écran en dehors du travail. Les chercheurs recommandent de faire des pauses régulières et d'éviter les écrans une heure avant de dormir.",
      prompt: "Que recommandent les chercheurs ?",
      opts: ["éviter les écrans avant de dormir", "travailler moins", "acheter de nouveaux écrans", "regarder la télévision le soir"],
    }),
    mc({
      task: "Compréhension des écrits",
      passage:
        "Quatre amis cherchent une activité pour samedi :\n• Léa veut être en plein air et faire du sport.\n• Activité A : visite guidée du musée d'art moderne (intérieur).\n• Activité B : randonnée de 15 km en forêt avec pique-nique.\n• Activité C : atelier de poterie en salle.",
      prompt: "Quelle activité correspond à Léa ?",
      opts: ["B", "A", "C"],
    }),
    mc({
      task: "Compréhension des écrits",
      passage:
        "Dans de nombreux collèges, les élèves participent désormais au jardin de l'établissement. Les professeurs observent que ce projet développe le sens des responsabilités et améliore l'ambiance en classe. Les légumes récoltés sont utilisés à la cantine.",
      prompt: "Selon le texte, quel est un effet du projet ?",
      opts: ["Les élèves deviennent plus responsables.", "Les élèves ont moins de cours.", "La cantine ferme.", "Les professeurs travaillent moins."],
    }),
    mc({ task: "Grammaire", prompt: "Il faut que tu (　) tes devoirs avant ce soir.", opts: ["fasses", "fais", "feras", "faisais"], explain: "Il faut que + subjonctif." }),
    mc({ task: "Grammaire", prompt: "Si j'avais plus de temps, je (　) le piano.", opts: ["apprendrais", "apprends", "apprendrai", "ai appris"], explain: "Si + imparfait, conditionnel présent." }),
    {
      type: "speak",
      task: "Production orale: exercice en interaction",
      prompt: "Votre voisin fait beaucoup de bruit le soir. Vous allez le voir pour en parler et trouver une solution ensemble. (L'examinateur joue le voisin.)",
      prepSeconds: 60,
      speakSeconds: 150,
      checklist: ["Menjelaskan masalah dengan sopan.", "Menanggapi alasan tetangga.", "Mengusulkan solusi dan berkompromi."],
    },
    {
      type: "speak",
      task: "Production orale: expression d'un point de vue",
      prompt: "Document : « Les jeunes lisent de moins en moins de livres. » Dégagez le thème, puis donnez votre opinion avec des exemples.",
      prepSeconds: 120,
      speakSeconds: 180,
      checklist: ["Menyebut tema dokumen.", "Pendapat jelas.", "Dua contoh.", "Kesimpulan."],
    },
  ],
});

delfB2.parts.push({
  id: "plus",
  section: "Compréhension · Production écrite",
  title: "Latihan tambahan",
  instructions: "Kerjakan tugas berikut.",
  minutes: 20,
  questions: [
    mc({
      task: "Compréhension de l'oral",
      audio:
        "Journaliste : Vous militez pour la semaine de quatre jours à l'école. Pourquoi ? Chercheuse : En réalité, je milite surtout pour un meilleur rythme. Ce n'est pas le nombre de jours qui compte, mais la répartition des heures : des journées trop longues fatiguent les enfants et nuisent aux apprentissages.",
      prompt: "Qu'est-ce qui compte le plus selon la chercheuse ?",
      opts: ["la répartition des heures de cours", "le nombre de jours d'école", "la durée des vacances", "le nombre d'élèves par classe"],
    }),
    mc({
      task: "Compréhension de l'oral",
      audio:
        "Reportage : À Lyon, une épicerie propose des produits sans emballage. Les clients viennent avec leurs propres bocaux. Le gérant reconnaît que les prix sont parfois un peu plus élevés, mais affirme que ses clients gaspillent moins, car ils achètent uniquement la quantité nécessaire.",
      prompt: "Quel avantage le gérant met-il en avant ?",
      opts: ["Les clients gaspillent moins.", "Les prix sont plus bas.", "Les produits viennent de l'étranger.", "Le magasin est plus grand."],
    }),
    mc({
      task: "Compréhension des écrits",
      passage:
        "Longtemps considéré comme un loisir solitaire, le jeu vidéo est aujourd'hui pratiqué en ligne par des millions de personnes qui y nouent de véritables amitiés. Certains psychologues l'utilisent même dans des thérapies. Il serait toutefois naïf d'ignorer les risques d'usage excessif, en particulier chez les adolescents.",
      prompt: "Quelle est la position de l'auteur ?",
      opts: [
        "Il reconnaît les aspects positifs du jeu vidéo sans nier ses risques.",
        "Il condamne totalement le jeu vidéo.",
        "Il pense que le jeu vidéo est sans danger.",
        "Il affirme que les jeux sont réservés aux adolescents.",
      ],
    }),
    mc({ task: "Connecteurs", prompt: "La réforme a été adoptée, (　) de nombreuses protestations.", opts: ["malgré", "grâce à", "afin de", "puisque"] }),
    mc({ task: "Grammaire", prompt: "Bien qu'il (　) beaucoup travaillé, il n'a pas réussi l'examen.", opts: ["ait", "a", "avait", "aura"], explain: "Bien que + subjonctif." }),
    gap({
      task: "Texte lacunaire",
      prompt: "Pilih kata yang paling tepat.",
      text: "Le télétravail présente de nombreux avantages. [0], il permet de réduire le temps de transport. [1], il peut isoler certains salariés, qui perdent le contact avec leurs collègues.",
      gaps: [
        ["D'une part", "Par conséquent", "En revanche", "Pourtant"],
        ["D'autre part", "C'est pourquoi", "Ainsi", "Donc"],
      ],
    }),
    {
      type: "write",
      task: "Production écrite: lettre formelle",
      prompt: "Votre mairie envisage de supprimer la piscine municipale pour construire un parking. Vous écrivez au maire pour vous opposer à ce projet, en argumentant et en proposant une alternative (250 mots minimum).",
      minWords: 250,
      minutes: 60,
      checklist: ["Format surat formal (Monsieur le Maire, formule de politesse).", "Tujuan surat di awal.", "Tiga argumen dengan contoh.", "Alternatif konkret.", "Minimal 250 kata."],
    },
  ],
});

dalfC1.parts.push({
  id: "plus",
  section: "Compréhension · Production orale",
  title: "Latihan tambahan",
  instructions: "Kerjakan tugas berikut.",
  minutes: 18,
  questions: [
    mc({
      task: "Compréhension de l'oral",
      audio:
        "Conférencier : On présente souvent l'intelligence artificielle comme une menace pour l'emploi. Les études historiques montrent pourtant que les innovations détruisent certains métiers mais en créent d'autres. Le vrai défi n'est donc pas la disparition du travail, mais la formation des salariés dont les tâches évoluent.",
      prompt: "Quel est, selon le conférencier, le vrai défi ?",
      opts: ["former les salariés", "empêcher l'innovation", "interdire l'intelligence artificielle", "réduire le temps de travail"],
    }),
    mc({
      task: "Compréhension de l'oral",
      audio:
        "Animatrice : Les villes moyennes attirent de nouveaux habitants depuis la crise sanitaire. Urbaniste : Oui, mais il faut nuancer. Ce sont surtout des cadres en télétravail qui partent. Pour beaucoup d'autres, l'emploi reste concentré dans les métropoles.",
      prompt: "Quelle nuance apporte l'urbaniste ?",
      opts: ["Le phénomène concerne surtout les cadres en télétravail.", "Personne ne quitte les métropoles.", "Les villes moyennes perdent des habitants.", "L'emploi s'est déplacé vers les campagnes."],
    }),
    mc({
      task: "Compréhension des écrits",
      passage:
        "La gratuité des transports publics, adoptée par plusieurs villes françaises, séduit par sa simplicité. Ses partisans y voient une mesure sociale et écologique. Ses détracteurs objectent qu'elle attire davantage les piétons et cyclistes que les automobilistes, et qu'elle prive les réseaux de ressources nécessaires à leur amélioration.",
      prompt: "Quelle objection est formulée contre la gratuité ?",
      opts: [
        "Elle attire surtout des personnes qui ne prenaient pas la voiture.",
        "Elle est trop compliquée à mettre en place.",
        "Elle augmente la pollution.",
        "Elle n'a jamais été testée.",
      ],
    }),
    mc({ task: "Lexique", prompt: "Le gouvernement a dû (　) face à la mobilisation et retirer son projet.", opts: ["faire marche arrière", "prendre le dessus", "mettre en avant", "tenir tête"] }),
    {
      type: "write",
      task: "Production écrite: essai argumenté",
      prompt: "« Faut-il limiter le tourisme dans les sites les plus fréquentés ? » Rédigez un essai argumenté de 250 mots environ, avec une introduction, un développement structuré et une conclusion.",
      minWords: 230,
      maxWords: 300,
      minutes: 45,
      checklist: ["Pengantar dengan problématique.", "Rencana dua bagian (tesis-antitesis atau pro-kontra).", "Contoh konkret.", "Kesimpulan dan pembukaan.", "Register formal."],
    },
    {
      type: "speak",
      task: "Production orale: exposé",
      prompt: "Thème : « Les réseaux sociaux renforcent-ils la démocratie ? » Présentez un exposé de 7 minutes avec problématique et plan, puis préparez-vous à débattre.",
      prepSeconds: 300,
      speakSeconds: 420,
      checklist: ["Problématique.", "Rencana diumumkan.", "Argumen bernuansa.", "Kesimpulan."],
    },
  ],
});

dalfC2.parts.push({
  id: "plus",
  section: "Compréhension et production écrites",
  title: "Latihan tambahan",
  instructions: "Kerjakan tugas berikut.",
  minutes: 30,
  questions: [
    mc({
      task: "Compréhension",
      passage:
        "Il est de bon ton de déplorer l'appauvrissement de la langue chez les jeunes. Pourtant, jamais une génération n'a autant écrit : messages, commentaires, publications. Que cette écriture obéisse à d'autres normes ne signifie pas qu'elle soit pauvre ; elle témoigne plutôt d'une compétence nouvelle, celle de passer d'un registre à l'autre.",
      prompt: "Quelle est la thèse de l'auteur ?",
      opts: [
        "Les jeunes développent une capacité à changer de registre.",
        "La langue des jeunes s'appauvrit inévitablement.",
        "Les jeunes n'écrivent plus.",
        "Il faut interdire l'écriture numérique.",
      ],
    }),
    mc({ task: "Lexique", prompt: "Son argumentation, quoique brillante, pèche par (　) : elle ignore les données contradictoires.", opts: ["partialité", "exhaustivité", "clarté", "concision"] }),
    mc({ task: "Registre", prompt: "Quelle formulation convient à un éditorial ?", opts: ["Force est de constater que…", "Franchement, c'est n'importe quoi…", "Bon, en gros…", "Tu vois ce que je veux dire…"] }),
    {
      type: "write",
      task: "Texte structuré (version courte)",
      passage:
        "Doc. 1 : 70 % des salariés déclarent consulter leurs courriels professionnels pendant leurs congés.\nDoc. 2 : En France, la loi reconnaît depuis 2017 un « droit à la déconnexion », mais son application varie fortement selon les entreprises.\nDoc. 3 : Un sociologue estime que la frontière entre vie privée et vie professionnelle relève désormais davantage de la discipline individuelle que de la loi.",
      prompt: "En vous appuyant sur ces documents, rédigez un éditorial (environ 250 mots) pour un magazine économique sur le thème « Le droit à la déconnexion est-il réaliste ? ».",
      minWords: 230,
      maxWords: 320,
      minutes: 40,
      checklist: ["Format editorial: judul, sudut pandang tegas.", "Memanfaatkan ketiga dokumen tanpa menyalin.", "Argumen bernuansa.", "Gaya formal dan retoris."],
    },
  ],
});

export const delfHigher = [delfA2, delfB1, delfB2, dalfC1, dalfC2];
