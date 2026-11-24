import type { Exam } from "./types";

const ieltsReading = `Rooftop farms in crowded cities

Over the past two decades, many large cities have begun to look upwards for space to grow food. Flat roofs on supermarkets, schools and car parks, which were once left empty, are now being covered with soil beds and greenhouses. Supporters argue that rooftop farms reduce the distance food travels before it reaches consumers, and that the plants help to cool buildings during hot summers.

However, the farms are not without problems. A typical roof can only carry a limited weight, so farmers must use lightweight soil mixtures, which dry out quickly and need frequent watering. Building owners also worry about leaks. In Singapore and New York, several projects were delayed because engineers had to strengthen the roofs before any planting could begin.

Researchers have found that rooftop farms rarely produce enough food to feed a neighbourhood. Their main value, according to a 2021 study, lies in education: schools that run rooftop gardens report that pupils eat more vegetables and understand better where their food comes from.`;

const pteReorder = [
  "Many people assume that sleep is simply a time when the brain switches off.",
  "In fact, research shows that the brain remains highly active during several stages of sleep.",
  "During these stages, it sorts and stores information gathered during the day.",
  "This is why students who sleep well after studying often remember more the next day.",
];

export const ielts: Exam = {
  id: "ielts",
  lang: "inggris",
  name: "IELTS Academic",
  fullName: "International English Language Testing System (Academic)",
  org: "British Council, IDP IELTS, dan Cambridge University Press & Assessment",
  level: "Band 1 sampai 9",
  about:
    "Ujian bahasa Inggris yang paling banyak diminta untuk kuliah di Inggris Raya, Australia, Kanada, dan Selandia Baru, serta untuk beasiswa seperti LPDP dan Chevening. Versi Academic dipakai untuk pendidikan tinggi; versi General Training untuk kerja dan imigrasi.",
  format: [
    { name: "Listening", time: "sekitar 30 menit", items: "40 soal, 4 bagian", tasks: "Melengkapi formulir dan catatan, pilihan ganda, menjodohkan, label peta" },
    { name: "Reading", time: "60 menit", items: "40 soal, 3 teks panjang", tasks: "True/False/Not Given, pilihan ganda, menjodohkan judul, melengkapi kalimat" },
    { name: "Writing", time: "60 menit", items: "2 tugas", tasks: "Task 1: deskripsi grafik minimal 150 kata. Task 2: esai minimal 250 kata, bobotnya dua kali Task 1" },
    { name: "Speaking", time: "11 sampai 14 menit", items: "3 bagian", tasks: "Wawancara, berbicara 2 menit dari kartu topik, diskusi" },
  ],
  scoring: [
    "Setiap bagian dinilai pada skala band 0 sampai 9 dengan kenaikan setengah band. Nilai akhir adalah rata-rata keempatnya.",
    "Listening, Reading, dan Writing dikerjakan pada hari yang sama tanpa jeda; Speaking bisa di hari yang sama atau hingga seminggu sebelum/sesudahnya.",
    "Banyak universitas meminta overall 6.5 dengan tidak ada bagian di bawah 6.0, tetapi syarat setiap kampus berbeda.",
  ],
  tips: [
    "Di Listening, audio hanya diputar sekali. Baca soal sebelum audio dimulai.",
    "Bedakan False (bertentangan dengan teks) dan Not Given (tidak dibahas sama sekali).",
    "Writing Task 2 bernilai dua kali lipat; sisihkan sekitar 40 menit untuk tugas ini.",
  ],
  official: { label: "takeielts.britishcouncil.org", url: "https://takeielts.britishcouncil.org/take-ielts/test-format" },
  sources: [
    { label: "British Council: IELTS test format", url: "https://takeielts.britishcouncil.org/take-ielts/test-format" },
    { label: "Cambridge English: IELTS test format", url: "https://www.cambridgeenglish.org/exams/ielts/test-format/" },
  ],
  parts: [
    {
      id: "listening",
      section: "Listening",
      title: "Listening Part 1 dan Part 4",
      instructions: "Dengarkan audio, lalu jawab. Untuk isian, tulis tidak lebih dari dua kata dan/atau satu angka.",
      minutes: 8,
      questions: [
        {
          type: "type",
          task: "Form completion",
          audio:
            "Good morning, City Library, how can I help? Hi, I'd like to join the library. Of course. Could I have your surname? Yes, it's Collins. That's C, O, L, L, I, N, S. Thank you. And your address? Twenty-four Park Road. Lovely. When would you like to collect your card? Thursday afternoon, if possible.",
          prompt: "Library membership form. Surname:",
          display: "Surname: ___",
          answer: "Collins",
          explain: "Nama dieja huruf per huruf: C-O-L-L-I-N-S. Ejaan yang salah dihitung salah di IELTS.",
        },
        {
          type: "type",
          task: "Form completion",
          audio:
            "Good morning, City Library, how can I help? Hi, I'd like to join the library. Of course. Could I have your surname? Yes, it's Collins. That's C, O, L, L, I, N, S. Thank you. And your address? Twenty-four Park Road. Lovely. When would you like to collect your card? Thursday afternoon, if possible.",
          prompt: "Address:",
          display: "Address: ___ Park Road",
          answer: "24",
          accept: ["twenty-four", "twenty four"],
          explain: "Angka boleh ditulis sebagai digit. Menulis 24 lebih aman dari salah eja.",
        },
        {
          type: "type",
          task: "Form completion",
          audio:
            "Good morning, City Library, how can I help? Hi, I'd like to join the library. Of course. Could I have your surname? Yes, it's Collins. That's C, O, L, L, I, N, S. Thank you. And your address? Twenty-four Park Road. Lovely. When would you like to collect your card? Thursday afternoon, if possible.",
          prompt: "Day to collect card:",
          display: "Collect card on: ___",
          answer: "Thursday",
          accept: ["thursday afternoon"],
        },
        {
          type: "mc",
          task: "Multiple choice",
          audio:
            "Honeybees share information about food through a movement known as the waggle dance. The angle of the dance, measured against the vertical, shows the direction of the food in relation to the sun. The length of the waggle run, on the other hand, tells the other bees how far away the food is.",
          prompt: "According to the speaker, the angle of the waggle dance shows",
          options: ["how far away the food is.", "which direction the food is in.", "how much food there is."],
          answer: 1,
          explain: "Sudut tarian menunjukkan arah; panjang gerakan menunjukkan jarak. Pengecoh A memakai informasi yang benar tetapi untuk hal lain.",
        },
      ],
    },
    {
      id: "reading",
      section: "Reading",
      title: "Reading: Rooftop farms",
      instructions: "Baca teks, lalu jawab. Pilih TRUE jika sesuai teks, FALSE jika bertentangan, NOT GIVEN jika teks tidak membahasnya.",
      minutes: 12,
      questions: [
        {
          type: "mc",
          task: "True / False / Not Given",
          passage: ieltsReading,
          prompt: "Rooftop farms were common in cities before the year 2000.",
          options: ["TRUE", "FALSE", "NOT GIVEN"],
          answer: 1,
          explain: "Teks menyebut kota-kota baru mulai memakai atap 'over the past two decades', dan atap itu 'once left empty'. Ini bertentangan dengan pernyataan.",
        },
        {
          type: "mc",
          task: "True / False / Not Given",
          passage: ieltsReading,
          prompt: "Lightweight soil needs more water than ordinary soil.",
          options: ["TRUE", "FALSE", "NOT GIVEN"],
          answer: 0,
          explain: "'lightweight soil mixtures, which dry out quickly and need frequent watering'.",
        },
        {
          type: "mc",
          task: "True / False / Not Given",
          passage: ieltsReading,
          prompt: "Rooftop farms in New York are more profitable than those in Singapore.",
          options: ["TRUE", "FALSE", "NOT GIVEN"],
          answer: 2,
          explain: "Kedua kota disebut hanya soal penundaan proyek. Keuntungan tidak dibahas sama sekali.",
        },
        {
          type: "mc",
          task: "Multiple choice",
          passage: ieltsReading,
          prompt: "According to the 2021 study, the main benefit of rooftop farms is",
          options: ["feeding whole neighbourhoods.", "cooling buildings in summer.", "teaching children about food.", "reducing water use."],
          answer: 2,
          explain: "'Their main value ... lies in education'.",
        },
        {
          type: "type",
          task: "Sentence completion",
          passage: ieltsReading,
          prompt: "Lengkapi dengan SATU KATA dari teks.",
          display: "Before planting, engineers sometimes had to ___ the roofs.",
          answer: "strengthen",
        },
      ],
    },
    {
      id: "writing",
      section: "Writing",
      title: "Writing Task 1 dan Task 2",
      instructions: "Tulis jawaban di kotak. Penghitung kata dan waktu mengikuti aturan ujian. Nilai sendiri dengan daftar periksa berdasarkan kriteria resmi.",
      minutes: 60,
      questions: [
        {
          type: "write",
          task: "Academic Task 1",
          prompt:
            "The table below shows the percentage of households with internet access in three countries in 2005, 2015 and 2025. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
          table: [
            ["Country", "2005", "2015", "2025"],
            ["Country A", "45%", "78%", "95%"],
            ["Country B", "12%", "51%", "88%"],
            ["Country C", "30%", "40%", "62%"],
          ],
          minWords: 150,
          minutes: 20,
          checklist: [
            "Ada kalimat ikhtisar (overview) tentang tren utama.",
            "Membandingkan negara, bukan sekadar menyalin semua angka.",
            "Memakai data untuk mendukung setiap pernyataan.",
            "Tidak memberi pendapat pribadi.",
            "Minimal 150 kata.",
          ],
          model:
            "The table compares the proportion of households with internet access in Countries A, B and C over a twenty-year period. Overall, access rose in all three countries, with Country B showing the most dramatic growth, while Country C remained the lowest throughout.",
        },
        {
          type: "write",
          task: "Task 2",
          prompt:
            "In many cities, public transport is free for students and older people. Some people believe it should be free for everyone. Discuss both views and give your own opinion.",
          minWords: 250,
          minutes: 40,
          checklist: [
            "Task Response: kedua pandangan dibahas dan pendapat Anda jelas.",
            "Coherence and Cohesion: paragraf tertata, setiap paragraf satu gagasan utama.",
            "Lexical Resource: kosakata bervariasi dan tepat.",
            "Grammatical Range and Accuracy: kalimat beragam dengan sedikit kesalahan.",
            "Minimal 250 kata.",
          ],
        },
      ],
    },
    {
      id: "speaking",
      section: "Speaking",
      title: "Speaking Part 2: kartu topik",
      instructions: "Siapkan diri 1 menit, lalu bicara hingga 2 menit. Rekam diri atau minta teman mendengarkan.",
      questions: [
        {
          type: "speak",
          task: "Long turn (Part 2)",
          prompt:
            "Describe a place you visited that you would like to return to. You should say: where it is, when you went there, what you did there, and explain why you would like to go back.",
          prepSeconds: 60,
          speakSeconds: 120,
          checklist: [
            "Berbicara lancar hampir 2 menit tanpa berhenti lama.",
            "Menjawab keempat poin di kartu.",
            "Memakai kata penghubung (first, after that, the main reason is).",
            "Memakai beberapa bentuk waktu (past, present, would).",
          ],
        },
      ],
    },
  ],
};

export const pte: Exam = {
  id: "pte",
  lang: "inggris",
  name: "PTE Academic",
  fullName: "Pearson Test of English Academic",
  org: "Pearson",
  level: "Skor 10 sampai 90",
  about:
    "Ujian berbasis komputer yang dinilai mesin dan manusia. Diterima untuk visa Australia dan Selandia Baru serta banyak universitas. Hasil biasanya keluar dalam dua hari.",
  note: "Sejak 7 Agustus 2025, PTE Academic punya 22 jenis tugas: 20 tugas lama ditambah Summarize Group Discussion dan Respond to a Situation.",
  format: [
    {
      name: "Speaking & Writing",
      time: "sekitar 1 jam",
      items: "9 jenis tugas",
      tasks: "Read Aloud, Repeat Sentence, Describe Image, Retell Lecture, Answer Short Question, Summarize Group Discussion, Respond to a Situation, Summarize Written Text, Write Essay",
    },
    {
      name: "Reading",
      time: "sekitar 30 menit",
      items: "5 jenis tugas",
      tasks: "Reading & Writing: Fill in the Blanks, Multiple Choice (multiple answers), Re-order Paragraphs, Fill in the Blanks, Multiple Choice (single answer)",
    },
    {
      name: "Listening",
      time: "sekitar 30 menit",
      items: "8 jenis tugas",
      tasks: "Summarize Spoken Text, Multiple Choice, Fill in the Blanks, Highlight Correct Summary, Select Missing Word, Highlight Incorrect Words, Write from Dictation",
    },
  ],
  scoring: [
    "Skor keseluruhan 10 sampai 90, ditambah skor Speaking, Writing, Reading, dan Listening.",
    "Banyak tugas menilai dua kemampuan sekaligus; misalnya Write from Dictation menyumbang ke Listening dan Writing.",
    "Beberapa tugas dinilai sebagian (partial credit): jawaban yang sebagian benar tetap mendapat poin.",
  ],
  tips: [
    "Write from Dictation adalah salah satu tugas paling berbobot. Latih mengetik kalimat utuh setelah sekali dengar.",
    "Di Re-order Paragraphs, cari kalimat pembuka yang tidak merujuk ke hal sebelumnya (tanpa 'this', 'these', 'however').",
    "Di Multiple Choice jawaban ganda, jawaban salah mengurangi skor. Pilih hanya yang Anda yakini.",
  ],
  official: { label: "pearsonpte.com", url: "https://www.pearsonpte.com/pte-academic/test-format" },
  sources: [
    { label: "Pearson: Updates to PTE Academic", url: "https://www.pearsonpte.com/pte-updates-2025/" },
    { label: "Pearson: PTE changes 2025", url: "https://www.pearsonpte.com/articles/pte-academic-changes" },
  ],
  parts: [
    {
      id: "speaking-writing",
      section: "Speaking & Writing",
      title: "Speaking & Writing",
      instructions: "Untuk tugas berbicara, peramban Chrome atau Edge bisa menuliskan ucapan Anda dan membandingkannya dengan teks.",
      minutes: 30,
      questions: [
        {
          type: "speak",
          task: "Read Aloud",
          prompt: "Bacalah teks berikut dengan suara keras. Anda punya 30 detik persiapan.",
          text: "Coral reefs cover less than one percent of the ocean floor, yet they support about a quarter of all marine species. Rising water temperatures, however, are causing many reefs to lose their colour and, eventually, their life.",
          prepSeconds: 30,
          speakSeconds: 40,
          checklist: ["Semua kata terbaca tanpa dilewati.", "Jeda wajar di koma dan titik.", "Tidak berhenti lebih dari 3 detik."],
        },
        {
          type: "speak",
          task: "Repeat Sentence",
          prompt: "Dengarkan kalimat, lalu ulangi persis seperti yang Anda dengar.",
          audio: "The library will be closed for renovation until the end of the month.",
          text: "The library will be closed for renovation until the end of the month.",
          speakSeconds: 15,
          checklist: ["Semua kata diulang dengan urutan yang sama.", "Intonasi alami, tidak terputus-putus."],
        },
        {
          type: "speak",
          task: "Respond to a Situation",
          prompt:
            "You booked a room for a group study session, but when you arrive another group is using it. Speak to the library staff member. You have 20 seconds to prepare and 40 seconds to respond.",
          prepSeconds: 20,
          speakSeconds: 40,
          checklist: [
            "Menjelaskan masalah dengan sopan.",
            "Menyebut bukti pemesanan (nama, waktu).",
            "Menawarkan atau meminta solusi.",
          ],
          model:
            "Excuse me, I'm sorry to bother you. I booked Room 3 for two o'clock under the name Rina, but there's another group in there now. Could you check the booking for me? If the room isn't available, is there another one we could use?",
        },
        {
          type: "write",
          task: "Summarize Written Text",
          passage:
            "Urban trees provide more than shade. Studies in several cities have shown that streets with mature trees can be up to five degrees cooler in summer than streets without them. Trees also absorb rainwater, which reduces the risk of flooding, and they filter some pollutants from the air. Despite these benefits, city budgets often treat trees as decoration rather than infrastructure, and older trees are frequently removed during road works without being replaced.",
          prompt: "Tulis ringkasan teks di atas dalam SATU kalimat (5 sampai 75 kata).",
          minWords: 5,
          maxWords: 75,
          minutes: 10,
          checklist: [
            "Hanya satu kalimat, diakhiri satu titik.",
            "Mencakup gagasan utama: manfaat pohon dan sikap anggaran kota.",
            "5 sampai 75 kata.",
          ],
          model:
            "Although urban trees cool streets, reduce flooding and clean the air, city budgets often treat them as decoration, so many are removed during road works without replacement.",
        },
      ],
    },
    {
      id: "reading",
      section: "Reading",
      title: "Reading",
      instructions: "Kerjakan tiga jenis tugas Reading yang paling sering muncul.",
      minutes: 10,
      questions: [
        {
          type: "gap",
          task: "Reading & Writing: Fill in the Blanks",
          prompt: "Pilih kata yang paling tepat untuk setiap rumpang.",
          text: "Volunteering can [0] young people valuable skills. Many employers now [1] candidates who have worked in the community, because such experience [2] teamwork and responsibility.",
          gaps: [
            { options: ["teach", "learn", "study", "explain"], answer: 0 },
            { options: ["prefer", "insist", "avoid", "refuse"], answer: 0 },
            { options: ["demonstrates", "depends", "consists", "results"], answer: 0 },
          ],
          explain: "'teach someone skills' (bukan 'learn someone'), 'prefer candidates', dan 'demonstrates teamwork' adalah kolokasi yang benar.",
        },
        {
          type: "order",
          task: "Re-order Paragraphs",
          prompt: "Susun kalimat-kalimat berikut menjadi paragraf yang runtut.",
          items: pteReorder,
          joiner: "\n",
          explain: "Kalimat pembuka menyatakan anggapan umum. 'In fact' membantahnya, 'these stages' merujuk ke tahap tidur, dan 'This is why' menutup dengan akibat.",
        },
        {
          type: "multi",
          task: "Multiple Choice, Choose Multiple Answers",
          passage:
            "Electric scooters have spread rapidly in European cities since 2018. Supporters say they reduce short car trips and are cheap to use. Critics point out that scooters left on pavements create obstacles for pedestrians, particularly for people with visual impairments, and that the scooters themselves often last less than two years before being replaced.",
          prompt: "Which of the following problems are mentioned? Choose all that apply.",
          options: [
            "Scooters can block pavements.",
            "Scooters are more expensive than taxis.",
            "Scooters have a short working life.",
            "Scooters increase car traffic.",
          ],
          answers: [0, 2],
          explain: "Teks menyebut skuter menghalangi trotoar dan jarang bertahan lebih dari dua tahun. Biaya disebut murah, dan perjalanan mobil disebut berkurang.",
        },
      ],
    },
    {
      id: "listening",
      section: "Listening",
      title: "Listening",
      instructions: "Audio di ujian asli hanya diputar sekali. Cobalah menjawab setelah sekali dengar.",
      minutes: 8,
      questions: [
        {
          type: "type",
          task: "Write from Dictation",
          prompt: "Ketik kalimat yang Anda dengar persis seperti aslinya.",
          audio: "Students must submit their assignments before the end of the week.",
          answer: "Students must submit their assignments before the end of the week.",
          explain: "Setiap kata yang benar mendapat satu poin, meskipun urutannya tidak sempurna.",
        },
        {
          type: "mc",
          task: "Highlight Correct Summary",
          audio:
            "Many people think that being bilingual simply means knowing two sets of words. But researchers have found that bilingual children often become better at switching between tasks and ignoring distractions, because their brains constantly choose which language to use.",
          prompt: "Pilih ringkasan yang paling tepat.",
          options: [
            "Bilingual children learn new words faster than other children.",
            "Using two languages may train the brain to switch tasks and ignore distractions.",
            "Researchers believe children should learn only one language at a time.",
          ],
          answer: 1,
        },
        {
          type: "mc",
          task: "Select Missing Word",
          audio: "To reduce waste, the café now gives a small discount to customers who bring their own",
          prompt: "Rekaman berhenti sebelum kata terakhir. Kata apa yang paling tepat melengkapinya?",
          options: ["cup.", "money.", "friends.", "menu."],
          answer: 0,
        },
      ],
    },
  ],
};

export const toefl: Exam = {
  id: "toefl",
  lang: "inggris",
  name: "TOEFL iBT",
  fullName: "Test of English as a Foreign Language, internet-based test",
  org: "ETS (Educational Testing Service)",
  level: "Skala 1 sampai 6, selaras CEFR",
  about:
    "Ujian bahasa Inggris dari Amerika Serikat yang diterima ribuan universitas. Sejak 21 Januari 2026 formatnya lebih singkat, adaptif, dan memakai tugas sehari-hari selain akademik.",
  note: "TOEFL iBT berubah pada Januari 2026. Jumlah soal per bagian bisa berbeda karena tesnya adaptif; cek angka terbaru di situs ETS.",
  format: [
    { name: "Reading", time: "sekitar 30 menit", items: "adaptif", tasks: "Complete the Words, Read in Daily Life, Read an Academic Passage" },
    { name: "Listening", time: "sekitar 30 menit", items: "adaptif", tasks: "Listen and Choose a Response, Listen to a Conversation, Listen to an Announcement, Listen to an Academic Talk" },
    { name: "Writing", time: "sekitar 23 menit", items: "3 jenis tugas", tasks: "Build a Sentence, Write an Email, Write for an Academic Discussion" },
    { name: "Speaking", time: "sekitar 8 menit", items: "2 jenis tugas", tasks: "Listen and Repeat, Take an Interview" },
  ],
  scoring: [
    "Sejak 2026, setiap bagian dan nilai total dilaporkan pada skala 1 sampai 6 (kenaikan 0,5) yang selaras dengan CEFR.",
    "Selama masa transisi, skor juga ditampilkan pada skala lama 0 sampai 120 sebagai pembanding.",
  ],
  tips: [
    "Complete the Words menguji ejaan dan tata bahasa sekaligus: baca seluruh kalimat sebelum melengkapi kata.",
    "Write an Email dinilai dari kejelasan tujuan dan nada yang sesuai dengan penerima.",
  ],
  official: { label: "ets.org/toefl", url: "https://www.ets.org/toefl/test-takers/ibt/about/content.html" },
  sources: [
    { label: "ETS: TOEFL iBT updates January 2026", url: "https://www.in.ets.org/toefl/test-takers/ibt/upcoming-updates-jan-2026.html" },
    { label: "ETS: TOEFL iBT test content", url: "https://www.ets.org/toefl/test-takers/ibt/about/content.html" },
  ],
  parts: [
    {
      id: "reading",
      section: "Reading",
      title: "Reading",
      instructions: "Lengkapi kata yang terpotong dan jawab soal bacaan.",
      minutes: 8,
      questions: [
        {
          type: "type",
          task: "Complete the Words",
          passage: "Plants need light to make food. This process, cal___ photosynthesis, takes place mostly in the leaves.",
          prompt: "Lengkapi kata yang terpotong. Ketik kata utuhnya.",
          display: "This process, cal___ photosynthesis, …",
          answer: "called",
        },
        {
          type: "type",
          task: "Complete the Words",
          passage: "Plants need light to make food. This process, called photosynthesis, takes place mos___ in the leaves.",
          prompt: "Lengkapi kata yang terpotong. Ketik kata utuhnya.",
          display: "…, takes place mos___ in the leaves.",
          answer: "mostly",
        },
        {
          type: "mc",
          task: "Read in Daily Life",
          passage:
            "From: Campus Housing\nSubject: Water shut-off on Friday\n\nDear residents,\nThe water supply to North Hall will be turned off on Friday from 9 a.m. to 1 p.m. for pipe repairs. Showers in South Hall will remain available during this time. We apologise for the inconvenience.",
          prompt: "What should North Hall residents do if they need a shower on Friday morning?",
          options: ["Wait until the evening.", "Use the showers in South Hall.", "Contact Campus Housing.", "Shower before 8 a.m."],
          answer: 1,
        },
      ],
    },
    {
      id: "listening",
      section: "Listening",
      title: "Listening",
      instructions: "Dengarkan, lalu pilih jawaban terbaik.",
      minutes: 5,
      questions: [
        {
          type: "mc",
          task: "Listen and Choose a Response",
          audio: "Do you know if the biology lab is open this afternoon?",
          prompt: "Pilih tanggapan yang paling tepat.",
          options: ["I think it closes at noon on Fridays.", "Biology is my favourite subject.", "Yes, I opened it carefully."],
          answer: 0,
        },
        {
          type: "mc",
          task: "Listen to an Announcement",
          audio:
            "Attention students. Due to the heavy rain, this afternoon's football match has been moved from the main field to the indoor sports hall. The start time remains three o'clock.",
          prompt: "What has changed about the football match?",
          options: ["The start time.", "The location.", "The teams.", "It has been cancelled."],
          answer: 1,
        },
      ],
    },
    {
      id: "writing",
      section: "Writing",
      title: "Writing",
      instructions: "Susun kalimat dan tulis email singkat.",
      minutes: 12,
      questions: [
        {
          type: "order",
          task: "Build a Sentence",
          prompt: "Susun kata-kata berikut menjadi tanggapan yang tepat untuk: \"Where did you find that book?\"",
          items: ["I", "borrowed", "it", "from", "the", "library"],
          explain: "I borrowed it from the library.",
        },
        {
          type: "write",
          task: "Write an Email",
          prompt:
            "Your study group meets every Tuesday, but you have a new part-time job on Tuesdays. Write an email to the group leader. Explain the situation, suggest a solution, and ask a question about the next meeting.",
          minWords: 80,
          minutes: 7,
          checklist: [
            "Salam pembuka dan penutup sesuai.",
            "Menjelaskan masalah dengan jelas.",
            "Memberi usulan solusi yang masuk akal.",
            "Mengajukan satu pertanyaan.",
            "Nada sopan dan bersahabat.",
          ],
        },
      ],
    },
    {
      id: "speaking",
      section: "Speaking",
      title: "Speaking",
      instructions: "Ulangi kalimat, lalu jawab pertanyaan wawancara.",
      questions: [
        {
          type: "speak",
          task: "Listen and Repeat",
          audio: "Please remember to return your keys to the front desk before you leave.",
          text: "Please remember to return your keys to the front desk before you leave.",
          prompt: "Dengarkan, lalu ulangi kalimatnya.",
          speakSeconds: 12,
          checklist: ["Semua kata terulang dengan urutan yang sama.", "Pelafalan jelas."],
        },
        {
          type: "speak",
          task: "Take an Interview",
          prompt: "Some people prefer to study alone, while others prefer to study in groups. Which do you prefer, and why?",
          speakSeconds: 45,
          checklist: ["Pilihan Anda jelas sejak kalimat pertama.", "Ada dua alasan dengan contoh.", "Bicara lancar tanpa jeda panjang."],
        },
      ],
    },
  ],
};

export const inggrisExams = [ielts, pte, toefl];
