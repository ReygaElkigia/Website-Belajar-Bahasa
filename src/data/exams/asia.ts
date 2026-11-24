import type { Exam } from "./types";

const yesNo = ["Sesuai (✓)", "Tidak sesuai (✗)"];

export const jlpt: Exam = {
  id: "jlpt-n5",
  lang: "jepang",
  name: "JLPT N5",
  fullName: "日本語能力試験 (Japanese-Language Proficiency Test) N5",
  org: "Japan Foundation dan Japan Educational Exchanges and Services",
  level: "N5 (dasar) sampai N1 (mahir)",
  about:
    "Ujian bahasa Jepang paling dikenal di dunia, diadakan dua kali setahun (Juli dan Desember) di Indonesia. N5 menguji kemampuan memahami kalimat dasar dalam hiragana, katakana, dan kanji sederhana. N4 dan N3 sering diminta untuk program magang dan kerja di Jepang.",
  format: [
    { name: "言語知識（文字・語彙）Kosakata", time: "20 menit", items: "beberapa bagian soal", tasks: "漢字読み (cara baca kanji), 表記 (penulisan), 文脈規定 (kata dalam konteks), 言い換え類義 (padanan makna)" },
    { name: "言語知識（文法）・読解 Tata bahasa dan bacaan", time: "40 menit", items: "beberapa bagian soal", tasks: "文法形式 (bentuk tata bahasa), 文の組み立て (menyusun kalimat ★), 文章の文法, 読解 (bacaan pendek)" },
    { name: "聴解 Menyimak", time: "30 menit", items: "4 bagian", tasks: "課題理解, ポイント理解, 発話表現, 即時応答" },
  ],
  scoring: [
    "Skor dibagi dua: Pengetahuan bahasa dan bacaan (0 sampai 120) serta Menyimak (0 sampai 60). Total 180.",
    "Lulus N5 butuh minimal 80 dari 180, dan minimal 38 untuk bagian bahasa dan bacaan serta 19 untuk menyimak.",
    "Semua soal berupa pilihan ganda; tidak ada bagian menulis atau berbicara.",
  ],
  tips: [
    "Kuasai hiragana dan katakana sepenuhnya; N5 sudah memakai sekitar 100 kanji.",
    "Soal ★ (文の組み立て) meminta urutan kata: cari partikel yang menempel ke kata sebelumnya.",
  ],
  official: { label: "jlpt.jp", url: "https://www.jlpt.jp/e/guideline/testsections.html" },
  sources: [
    { label: "JLPT: Test sections and test times", url: "https://jlpt.jp/e/guideline/testsections.html" },
    { label: "JLPT: Perubahan waktu N4 dan N5 (2020)", url: "https://jlpt.jp/e/topics/202009091599642827.html" },
  ],
  parts: [
    {
      id: "moji-goi",
      section: "文字・語彙",
      title: "Kosakata dan huruf",
      instructions: "Pilih jawaban yang paling tepat untuk kata yang ditandai ⟨ ⟩.",
      minutes: 6,
      questions: [
        { type: "mc", task: "漢字読み", prompt: "あしたは ⟨雨⟩ です。", options: ["あめ", "ゆき", "かぜ", "はれ"], answer: 0, explain: "雨 = あめ (hujan)." },
        { type: "mc", task: "漢字読み", prompt: "この ⟨本⟩ は おもしろいです。", options: ["ほん", "ぼん", "もと", "き"], answer: 0, explain: "本 = ほん (buku)." },
        { type: "mc", task: "表記", prompt: "まいばん ⟨てれび⟩ を みます。", options: ["テレビ", "テレピ", "デレビ", "テルビ"], answer: 0, explain: "Kata serapan ditulis dengan katakana: テレビ." },
        { type: "mc", task: "文脈規定", prompt: "さむいですから、まどを （　） ください。", options: ["しめて", "あけて", "きて", "はいて"], answer: 0, explain: "Karena dingin, tolong tutup (しめて) jendelanya." },
        {
          type: "mc",
          task: "言い換え類義",
          prompt: "この へやは せまいです。 Kalimat mana yang artinya paling dekat?",
          options: ["この へやは ひろくないです。", "この へやは あかるくないです。", "この へやは きれいじゃないです。", "この へやは しずかじゃないです。"],
          answer: 0,
          explain: "せまい (sempit) = ひろくない (tidak luas).",
        },
      ],
    },
    {
      id: "bunpo-dokkai",
      section: "文法・読解",
      title: "Tata bahasa dan bacaan",
      instructions: "Pilih partikel atau bentuk yang tepat, susun kalimat ★, lalu baca memo.",
      minutes: 10,
      questions: [
        { type: "mc", task: "文法形式", prompt: "わたしは まいあさ パン （　） たべます。", options: ["を", "に", "で", "が"], answer: 0, explain: "を menandai objek: パンをたべます." },
        { type: "mc", task: "文法形式", prompt: "えきまで バス （　） いきます。", options: ["で", "を", "に", "へ"], answer: 0, explain: "で menandai alat atau sarana: バスでいきます." },
        {
          type: "order",
          task: "文の組み立て ★",
          frame: "あの ＿＿ ＿＿ ★ ＿＿ は わたしの あにです。",
          prompt: "Susun kata-kata menjadi kalimat yang benar.",
          items: ["めがねを", "かけて", "いる", "ひと"],
          joiner: " ",
          explain: "あの めがねを かけて いる ひと は わたしの あにです。 (Orang yang memakai kacamata itu kakak saya.)",
        },
        {
          type: "mc",
          task: "読解",
          passage: "リンさんへ\nきょうは ごご 3じに としょかんへ いきます。いっしょに べんきょうしませんか。としょかんの まえで まって います。\nたなか",
          prompt: "たなかさんは どこで まって いますか。",
          options: ["としょかんの まえ", "がっこうの なか", "えきの まえ", "リンさんの いえ"],
          answer: 0,
        },
      ],
    },
    {
      id: "chokai",
      section: "聴解",
      title: "Menyimak",
      instructions: "Dengarkan percakapan, lalu pilih jawaban.",
      minutes: 5,
      questions: [
        {
          type: "mc",
          task: "課題理解",
          audio: "おとこのひとと おんなのひとが はなしています。おとこのひとは なにを かいますか。あしたの パーティーの のみもの、おねがいね。ジュースと おちゃで いい？ おちゃは もう あるから、ジュースだけで いいよ。わかった。",
          prompt: "おとこのひとは なにを かいますか。",
          options: ["ジュース", "おちゃ", "ジュースと おちゃ", "パン"],
          answer: 0,
          explain: "Teh sudah ada (おちゃは もう ある), jadi hanya jus yang dibeli.",
        },
        {
          type: "mc",
          task: "即時応答",
          audio: "おなかが すきましたね。",
          prompt: "Pilih tanggapan yang tepat.",
          options: ["そうですね。なにか たべましょう。", "いいえ、げんきです。", "はい、おなかです。"],
          answer: 0,
        },
      ],
    },
  ],
};

export const topik: Exam = {
  id: "topik-1",
  lang: "korea",
  name: "TOPIK I",
  fullName: "한국어능력시험 (Test of Proficiency in Korean) I",
  org: "National Institute for International Education (NIIED), Korea",
  level: "TOPIK I: level 1 dan 2. TOPIK II: level 3 sampai 6",
  about:
    "Ujian resmi bahasa Korea untuk kuliah, beasiswa GKS, dan kerja di Korea. TOPIK I menguji kemampuan dasar sehari-hari dan hanya terdiri dari menyimak dan membaca.",
  note: "Versi berbasis internet (TOPIK IBT) punya jumlah soal dan waktu yang berbeda; angka di bawah untuk versi kertas.",
  format: [
    { name: "듣기 Menyimak", time: "40 menit", items: "30 soal", tasks: "Memilih tanggapan, menebak topik dan tempat, memahami percakapan" },
    { name: "읽기 Membaca", time: "60 menit", items: "40 soal", tasks: "Topik teks, mengisi rumpang, memahami pengumuman, mengurutkan kalimat" },
  ],
  scoring: [
    "Setiap bagian bernilai 100, total 200.",
    "Level 1: minimal 80 poin. Level 2: minimal 140 poin.",
    "Semua soal pilihan ganda dengan empat pilihan.",
  ],
  tips: ["Hafalkan partikel 은/는, 이/가, 을/를; banyak soal rumpang mengujinya.", "Pengumuman dan iklan sering muncul di bagian membaca. Perhatikan angka dan hari."],
  official: { label: "topik.go.kr", url: "https://www.topik.go.kr" },
  sources: [
    { label: "KAIST Language Center: struktur TOPIK", url: "https://lang.kaist.ac.kr/pages/view/lang_03_02?lang=en" },
    { label: "HKEAA: Panduan TOPIK IBT 2025", url: "https://www.hkeaa.edu.hk/DocLibrary/ipe/TOPIK/TOPIK-ibt-Guideline-for-Candidates-HK-Sep-2025.pdf" },
  ],
  parts: [
    {
      id: "listening",
      section: "듣기",
      title: "Menyimak",
      instructions: "Dengarkan, lalu pilih jawaban yang paling tepat.",
      minutes: 5,
      questions: [
        { type: "mc", task: "알맞은 대답", audio: "가방이 있어요?", prompt: "Pilih jawaban yang tepat.", options: ["네, 가방이 있어요.", "네, 가방이 아니에요.", "아니요, 가방이 좋아요.", "아니요, 가방이 커요."], answer: 0 },
        { type: "mc", task: "무엇에 대해 말하고 있습니까", audio: "몇 시에 일어나요? 일곱 시에 일어나요.", prompt: "Mereka sedang membicarakan apa?", options: ["시간", "날짜", "나이", "계절"], answer: 0, explain: "몇 시 (jam berapa) → 시간 (waktu)." },
        { type: "mc", task: "여기는 어디입니까", audio: "이 사과 얼마예요? 한 개에 천 원이에요.", prompt: "Di mana percakapan ini terjadi?", options: ["시장", "병원", "은행", "학교"], answer: 0 },
      ],
    },
    {
      id: "reading",
      section: "읽기",
      title: "Membaca",
      instructions: "Baca, lalu jawab.",
      minutes: 8,
      questions: [
        { type: "mc", task: "무엇에 대한 내용입니까", passage: "저는 사과를 좋아합니다. 딸기도 좋아합니다.", prompt: "Teks ini tentang apa?", options: ["과일", "계절", "날씨", "운동"], answer: 0 },
        { type: "mc", task: "빈칸 채우기", prompt: "비가 (　). 우산을 가지고 가세요.", options: ["와요", "가요", "먹어요", "자요"], answer: 0, explain: "비가 와요 = hujan turun." },
        {
          type: "mc",
          task: "안내문",
          passage: "〈도서관 이용 안내〉\n월요일~금요일: 09:00~18:00\n토요일: 09:00~13:00\n일요일: 쉽니다",
          prompt: "Pernyataan mana yang sesuai dengan pengumuman?",
          options: ["일요일에는 도서관에 갈 수 없습니다.", "토요일에는 오후 6시까지 엽니다.", "도서관은 매일 엽니다.", "월요일에는 쉽니다."],
          answer: 0,
        },
        {
          type: "order",
          task: "순서대로 나열",
          prompt: "Urutkan kalimat-kalimat ini.",
          items: ["저는 주말에 친구와 영화를 봤습니다.", "영화가 끝나고 식당에 갔습니다.", "식당에서 불고기를 먹었습니다.", "정말 즐거운 하루였습니다."],
          joiner: " ",
        },
      ],
    },
  ],
};

export const hsk: Exam = {
  id: "hsk-1",
  lang: "mandarin",
  name: "HSK 1",
  fullName: "汉语水平考试 (Hanyu Shuiping Kaoshi) Level 1",
  org: "Chinese Testing International (CTI)",
  level: "HSK 1 sampai 6 (dan 7 sampai 9 di standar HSK 3.0)",
  about:
    "Ujian bahasa Mandarin resmi dari Tiongkok untuk beasiswa dan kuliah. HSK 1 adalah level paling dasar: mengenali kata dan kalimat sederhana sehari-hari.",
  note: "Standar HSK 3.0 memperbanyak kosakata tiap level. Periksa daftar kata yang berlaku untuk jadwal ujian Anda di situs CTI.",
  format: [
    { name: "听力 Menyimak", time: "sekitar 15 menit", items: "20 soal, 4 bagian", tasks: "Benar/salah dengan gambar, memilih gambar, memahami dialog pendek" },
    { name: "阅读 Membaca", time: "sekitar 17 menit", items: "20 soal, 4 bagian", tasks: "Mencocokkan kata dan gambar, pertanyaan dan jawaban, mengisi kata" },
  ],
  scoring: ["Total 40 soal dalam sekitar 40 menit (termasuk waktu mengisi data).", "Skor maksimal 200 (100 per bagian); lulus dengan 120.", "Tidak ada bagian menulis atau berbicara di HSK 1."],
  tips: ["Di HSK 1, hanzi dicetak bersama pinyin. Tetap latih membaca hanzinya karena itu yang dibutuhkan di HSK 3 ke atas."],
  official: { label: "chinesetest.cn", url: "https://www.chinesetest.cn/HSK/1" },
  sources: [
    { label: "Chinese Testing International: HSK 1", url: "https://www.chinesetest.cn/HSK/1" },
    { label: "Confucius Institute UK: HSK level 1", url: "https://www.confuciusinstitute.ac.uk/wp-content/uploads/2020/12/HSK-level-1.pdf" },
  ],
  parts: [
    {
      id: "listening",
      section: "听力",
      title: "Menyimak",
      instructions: "Dengarkan, lalu jawab.",
      minutes: 4,
      questions: [
        { type: "mc", task: "判断对错", audio: "我喜欢喝茶。", prompt: "Pernyataan: 他喜欢喝咖啡。", options: yesNo, answer: 1, explain: "Audio: 我喜欢喝茶 (saya suka minum teh), bukan kopi." },
        { type: "mc", task: "对话理解", audio: "你去哪儿？我去医院看医生。", prompt: "女的去哪儿？", options: ["学校", "医院", "商店"], answer: 1 },
        { type: "mc", task: "听短文", audio: "我叫王明，今年二十岁，是大学生。", prompt: "王明多大了？", options: ["十二岁", "二十岁", "二十二岁"], answer: 1 },
      ],
    },
    {
      id: "reading",
      section: "阅读",
      title: "Membaca",
      instructions: "Pilih jawaban atau kata yang tepat.",
      minutes: 5,
      questions: [
        { type: "mc", task: "问答配对", prompt: "你喝什么？", options: ["我喝水。", "我是老师。", "在学校。"], answer: 0 },
        { type: "mc", task: "选词填空", prompt: "我（　）北京人。", options: ["是", "有", "在"], answer: 0 },
        { type: "mc", task: "选词填空", prompt: "小猫在椅子（　）。", options: ["下面", "喝", "月"], answer: 0 },
        { type: "order", task: "排序", prompt: "Susun menjadi kalimat: \"Besok saya pergi ke Beijing.\"", items: ["我", "明天", "去", "北京"], joiner: "" },
      ],
    },
  ],
};

export const toafl: Exam = {
  id: "toafl",
  lang: "arab",
  name: "TOAFL",
  fullName: "Test of Arabic as a Foreign Language, اختبار كفاءة اللغة العربية",
  org: "Pusat bahasa perguruan tinggi keagamaan Islam di Indonesia (UIN, IAIN)",
  level: "Skor gaya TOEFL (umumnya sekitar 310 sampai 677)",
  about:
    "Ujian kemahiran bahasa Arab yang dipakai luas di perguruan tinggi Islam Indonesia: syarat kelulusan, masuk pascasarjana, dan beasiswa ke Timur Tengah. Formatnya meniru TOEFL dengan tiga bagian. Penyelenggara berbeda-beda, jadi rincian soal bisa berbeda antarkampus.",
  format: [
    { name: "فهم المسموع (Istima')", time: "sekitar 30 sampai 40 menit", items: "puluhan soal", tasks: "Memahami percakapan dan monolog pendek" },
    { name: "التراكيب والتعبير الكتابي (Tarakib)", time: "sekitar 25 menit", items: "puluhan soal", tasks: "Melengkapi kalimat dan menemukan kesalahan nahwu-sharaf" },
    { name: "فهم المقروء (Qira'ah)", time: "sekitar 55 menit", items: "puluhan soal", tasks: "Memahami bacaan, makna kata, gagasan pokok" },
  ],
  scoring: [
    "Skor dihitung seperti TOEFL ITP dan dilaporkan sebagai satu angka total.",
    "Syarat minimal ditetapkan masing-masing kampus, misalnya 400 sampai 450 untuk kelulusan S1.",
  ],
  tips: [
    "Bagian tarakib sangat menguji i'rab: fa'il marfu', maf'ul bih manshub, isim inna manshub.",
    "Latih menyimak Arab fusha tanpa harakat di teks pertanyaan.",
  ],
  official: { label: "Kajian TOAFL (Kemenag)", url: "https://moraref.kemenag.go.id/documents/article/97874782241973550" },
  sources: [
    { label: "Moraref Kemenag: Format TOAFL", url: "https://moraref.kemenag.go.id/documents/article/97874782241973550" },
    { label: "Jurnal Al Bayan: TOAFL", url: "https://doaj.org/article/afd4ed5491a648a4aebc61bb9641bc2f" },
  ],
  parts: [
    {
      id: "istima",
      section: "Istima'",
      title: "فهم المسموع",
      instructions: "Dengarkan, lalu jawab.",
      minutes: 4,
      questions: [
        {
          type: "mc",
          audio: "ذهب أحمد إلى المكتبة صباح يوم الأحد ليقرأ كتابا عن تاريخ الإسلام.",
          prompt: "متى ذهب أحمد إلى المكتبة؟",
          options: ["صباح يوم الأحد", "مساء يوم الجمعة", "صباح يوم السبت", "ظهر يوم الأحد"],
          answer: 0,
        },
        {
          type: "mc",
          audio: "ذهب أحمد إلى المكتبة صباح يوم الأحد ليقرأ كتابا عن تاريخ الإسلام.",
          prompt: "لماذا ذهب أحمد إلى المكتبة؟",
          options: ["ليقرأ كتابا", "ليقابل صديقه", "ليكتب رسالة", "ليشتري كتابا"],
          answer: 0,
        },
      ],
    },
    {
      id: "tarakib",
      section: "Tarakib",
      title: "التراكيب",
      instructions: "Pilih kata yang tepat sesuai kaidah nahwu.",
      minutes: 4,
      questions: [
        { type: "mc", prompt: "ذهب ______ إلى المدرسة.", options: ["الطالبُ", "الطالبَ", "الطالبِ", "طالبًا"], answer: 0, explain: "Fa'il (subjek) selalu marfu': الطالبُ." },
        { type: "mc", prompt: "إنَّ ______ مجتهدٌ.", options: ["الطالبُ", "الطالبَ", "الطالبِ", "الطالبين"], answer: 1, explain: "Isim inna manshub: الطالبَ." },
        { type: "mc", prompt: "كتبتُ ______ في الدفتر.", options: ["الدرسُ", "الدرسِ", "الدرسَ", "دروسٌ"], answer: 2, explain: "Maf'ul bih (objek) manshub: الدرسَ." },
      ],
    },
    {
      id: "qiraah",
      section: "Qira'ah",
      title: "فهم المقروء",
      instructions: "Baca teks, lalu jawab.",
      minutes: 6,
      questions: [
        {
          type: "mc",
          passage:
            "إندونيسيا دولة كبيرة في جنوب شرق آسيا، وهي أكبر دولة أرخبيلية في العالم، إذ تتكون من أكثر من سبعة عشر ألف جزيرة. عاصمتها جاكرتا، ولغتها الرسمية هي اللغة الإندونيسية. ويعمل كثير من سكانها في الزراعة والتجارة.",
          prompt: "ما الفكرة الرئيسية للنص؟",
          options: ["التعريف بدولة إندونيسيا", "تاريخ مدينة جاكرتا", "الزراعة في آسيا", "اللغات في العالم"],
          answer: 0,
        },
        {
          type: "mc",
          passage:
            "إندونيسيا دولة كبيرة في جنوب شرق آسيا، وهي أكبر دولة أرخبيلية في العالم، إذ تتكون من أكثر من سبعة عشر ألف جزيرة. عاصمتها جاكرتا، ولغتها الرسمية هي اللغة الإندونيسية. ويعمل كثير من سكانها في الزراعة والتجارة.",
          prompt: "ما معنى كلمة «أرخبيلية» في النص؟",
          options: ["تتكون من جزر كثيرة", "فيها جبال عالية", "تقع في الصحراء", "صغيرة جدا"],
          answer: 0,
        },
      ],
    },
  ],
};

export const cutfl: Exam = {
  id: "cu-tfl",
  lang: "thai",
  name: "CU-TFL",
  fullName: "Chulalongkorn University Test of Thai as a Foreign Language",
  org: "Sirindhorn Thai Language Institute, Chulalongkorn University",
  level: "Novice, Intermediate, Advanced, Superior, Distinguished",
  about:
    "Ujian kemahiran bahasa Thai yang paling dikenal, untuk kerja dan studi di Thailand. Peserta boleh mengambil semua kemampuan atau hanya sebagian.",
  format: [
    { name: "การฟัง Menyimak", time: "dijadwalkan terpisah", items: "pilihan ganda", tasks: "Memahami percakapan, pengumuman, dan berita" },
    { name: "การอ่าน Membaca", time: "dijadwalkan terpisah", items: "pilihan ganda", tasks: "Memahami tanda, iklan, dan teks" },
    { name: "การเขียน Menulis", time: "dijadwalkan terpisah", items: "esai", tasks: "Menulis pesan dan teks pendek" },
    { name: "การพูด Berbicara", time: "wawancara", items: "lisan", tasks: "Wawancara dengan penguji" },
  ],
  scoring: ["Hasil berupa tingkat kemahiran (Novice sampai Distinguished) per kemampuan, disertai sertifikat."],
  tips: ["Perhatikan sistem jam Thai: สามทุ่ม (sam thum) berarti pukul 21.00, bukan 15.00."],
  official: { label: "sti.chula.ac.th", url: "https://www.sti.chula.ac.th/operation-service/thai-test/thai-test-for-non-native/cu-tfl-en" },
  sources: [{ label: "Sirindhorn Thai Language Institute: CU-TFL", url: "https://www.sti.chula.ac.th/operation-service/thai-test/thai-test-for-non-native/cu-tfl-en" }],
  parts: [
    {
      id: "listening-reading",
      section: "Menyimak dan membaca",
      title: "Menyimak dan membaca",
      instructions: "Dengarkan atau baca, lalu jawab.",
      minutes: 6,
      questions: [
        {
          type: "mc",
          audio: "ร้านนี้เปิดทุกวัน ตั้งแต่แปดโมงเช้าถึงสามทุ่ม",
          prompt: "Toko ini tutup pukul berapa?",
          options: ["15.00", "21.00", "09.00", "18.00"],
          answer: 1,
          explain: "สามทุ่ม (sam thum) = pukul 21.00. Malam hari dihitung dengan ทุ่ม mulai pukul 19.00.",
        },
        { type: "mc", passage: "ห้ามสูบบุหรี่", prompt: "Apa arti tanda ini?", options: ["Dilarang merokok", "Dilarang masuk", "Dilarang parkir", "Dilarang makan"], answer: 0 },
        { type: "mc", prompt: "ฉันมีแมวสอง ___", options: ["ตัว", "คน", "เล่ม", "คัน"], answer: 0, explain: "ตัว adalah kata penggolong untuk hewan; คน untuk orang, เล่ม untuk buku, คัน untuk kendaraan." },
      ],
    },
    {
      id: "writing",
      section: "การเขียน",
      title: "Menulis",
      instructions: "Tulis dalam aksara Thai.",
      questions: [
        {
          type: "write",
          prompt: "Tulis 3 sampai 5 kalimat untuk memperkenalkan diri: nama, asal, pekerjaan, dan alasan belajar bahasa Thai.",
          minWords: 5,
          minutes: 10,
          checklist: ["Memakai ผม atau ฉัน dengan konsisten.", "Mengakhiri kalimat dengan ครับ atau ค่ะ.", "Menyebut nama, asal, dan pekerjaan."],
          model: "สวัสดีค่ะ ฉันชื่อรีนา ฉันมาจากอินโดนีเซีย ฉันเป็นนักศึกษา ฉันเรียนภาษาไทยเพราะอยากทำงานที่กรุงเทพฯ ค่ะ",
        },
      ],
    },
  ],
};

export const hindiTest: Exam = {
  id: "hindi-a1",
  lang: "hindi",
  name: "Latihan kemahiran Hindi A1",
  fullName: "Latihan bergaya CEFR A1, merujuk silabus sertifikat Kendriya Hindi Sansthan",
  org: "Kendriya Hindi Sansthan, Agra (Kementerian Pendidikan India)",
  level: "Certificate, Diploma, Advanced Diploma",
  about:
    "Belum ada ujian internasional bahasa Hindi yang standar seperti IELTS atau JLPT. Jalur resmi untuk penutur asing adalah program sertifikat Kendriya Hindi Sansthan, termasuk beasiswa yang diumumkan Kedutaan Besar India setiap tahun. Latihan di bawah mengikuti aspek yang dinilai program itu.",
  format: [
    { name: "मौखिक अभिव्यक्ति Lisan", time: "bervariasi", items: "wawancara", tasks: "Ekspresi lisan" },
    { name: "लिखित अभिव्यक्ति Tulis", time: "bervariasi", items: "esai", tasks: "Ekspresi tulis" },
    { name: "भाषा संरचना Struktur bahasa", time: "bervariasi", items: "soal", tasks: "Struktur dan penggunaan bahasa" },
    { name: "पाठ Teks", time: "bervariasi", items: "soal", tasks: "Prosa dan puisi" },
  ],
  scoring: ["Format penilaian ditetapkan oleh institut; cek brosur terbaru di khsindia.org."],
  tips: ["Kuasai postposisi (में, पर, से, को) dan perubahan kata kerja menurut gender."],
  official: { label: "khsindia.org", url: "https://khsindia.org" },
  sources: [{ label: "Kedutaan India: info program Kendriya Hindi Sansthan", url: "https://www.eoibogota.gov.in/docs/1616088625Details%20of%20KENDRIYA%20HINDI%20SANSTHAN,%20AGRA.pdf" }],
  parts: [
    {
      id: "a1",
      section: "Campuran",
      title: "Menyimak, struktur, dan membaca",
      instructions: "Jawab setiap soal.",
      minutes: 6,
      questions: [
        { type: "mc", audio: "मेरा नाम राहुल है। मैं दिल्ली में रहता हूँ। मैं डॉक्टर हूँ।", prompt: "राहुल कहाँ रहता है?", options: ["दिल्ली", "मुंबई", "आगरा", "जकार्ता"], answer: 0 },
        { type: "mc", audio: "मेरा नाम राहुल है। मैं दिल्ली में रहता हूँ। मैं डॉक्टर हूँ।", prompt: "राहुल क्या काम करता है?", options: ["डॉक्टर", "अध्यापक", "छात्र", "ड्राइवर"], answer: 0 },
        { type: "mc", prompt: "मैं घर ___ हूँ।", options: ["में", "पर", "से", "को"], answer: 0, explain: "में = di dalam: मैं घर में हूँ (saya di rumah)." },
        { type: "mc", prompt: "लड़की स्कूल ___ है।", options: ["जाती", "जाता", "जाते", "जाना"], answer: 0, explain: "Subjek perempuan (लड़की) → kata kerja berakhiran -ī: जाती." },
        {
          type: "mc",
          passage: "सीता के परिवार में चार लोग हैं। उसके पिता अध्यापक हैं और उसकी माँ डॉक्टर हैं। उसका एक छोटा भाई है।",
          prompt: "सीता की माँ क्या करती हैं?",
          options: ["वह डॉक्टर हैं।", "वह अध्यापक हैं।", "वह छात्रा हैं।", "वह घर पर रहती हैं।"],
          answer: 0,
        },
      ],
    },
  ],
};

export const asiaExams = [jlpt, topik, hsk, toafl, cutfl, hindiTest];
