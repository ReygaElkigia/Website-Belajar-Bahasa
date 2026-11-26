import type { Exam, GapQuestion, McQuestion, Question } from "./types";

/**
 * JLPT N4 sampai N1. Waktu, bagian, jenis soal, dan batas lulus mengikuti
 * jlpt.jp (format sejak 2010, dengan perubahan waktu 2020). Soal latihan
 * ditulis sendiri meniru jenis tugas aslinya, bukan salinan soal resmi.
 */

/** Taruh jawaban benar (opsi pertama) di posisi `at` agar letak jawaban bervariasi. */
function place(opts: string[], at: number) {
  const [right, ...rest] = opts;
  const i = at % opts.length;
  return { options: [...rest.slice(0, i), right, ...rest.slice(i)], answer: i };
}

let turn = 0;
/** Pilihan ganda; opsi pertama adalah jawaban benar. */
function mc(q: Omit<McQuestion, "type" | "options" | "answer"> & { opts: string[] }): Question {
  const { opts, ...rest } = q;
  return { type: "mc", ...rest, ...place(opts, (turn = (turn * 7 + 3) % 11)) };
}

function gap(q: Omit<GapQuestion, "type" | "gaps"> & { gaps: string[][] }): Question {
  const { gaps, ...rest } = q;
  return { type: "gap", ...rest, gaps: gaps.map((g, i) => place(g, (turn + i * 2 + 1) % g.length)) };
}

const OFFICIAL = { label: "jlpt.jp", url: "https://www.jlpt.jp/e/guideline/testsections.html" };
const SOURCES = [
  { label: "JLPT: Test sections and test times", url: "https://www.jlpt.jp/e/guideline/testsections.html" },
  { label: "JLPT: Scoring and pass marks", url: "https://www.jlpt.jp/e/guideline/results.html" },
  { label: "JLPT: N1–N5 Summary of linguistic competence", url: "https://www.jlpt.jp/e/about/levelsummary.html" },
  { label: "JLPT: Perubahan waktu ujian (2020)", url: "https://www.jlpt.jp/e/topics/202009091599642827.html" },
];

const kanjiTip = (lv: string, n: string) => `Latih ${n} kanji ${lv} di halaman Kanji Tutur; kuisnya memakai jenis soal 漢字読み (cara baca kanji).`;

/* ---------------------------------------------------------------- N4 */

export const jlptN4: Exam = {
  id: "jlpt-n4",
  lang: "jepang",
  name: "JLPT N4",
  fullName: "日本語能力試験 (Japanese-Language Proficiency Test) N4",
  org: "Japan Foundation dan Japan Educational Exchanges and Services",
  level: "N4 (dasar)",
  about:
    "Menguji pemahaman bahasa Jepang dasar: membaca teks sehari-hari dengan kosakata dan kanji dasar, serta memahami percakapan sehari-hari yang diucapkan agak lambat. Sering diminta untuk program magang dan visa kerja berketerampilan khusus (tokutei ginō).",
  format: [
    { name: "言語知識（文字・語彙）Kosakata", time: "25 menit", items: "5 jenis soal", tasks: "漢字読み, 表記, 文脈規定, 言い換え類義, 用法" },
    { name: "言語知識（文法）・読解 Tata bahasa dan bacaan", time: "55 menit", items: "6 jenis soal", tasks: "文法形式の判断, 文の組み立て ★, 文章の文法, 内容理解（短文・中文）, 情報検索" },
    { name: "聴解 Menyimak", time: "35 menit", items: "4 jenis soal", tasks: "課題理解, ポイント理解, 発話表現, 即時応答" },
  ],
  scoring: [
    "Dua bagian skor: Pengetahuan bahasa dan bacaan (0 sampai 120) serta Menyimak (0 sampai 60). Total 180.",
    "Lulus N4 butuh minimal 90 dari 180, sekaligus minimal 38 untuk bahasa dan bacaan serta 19 untuk menyimak.",
    "Semua soal pilihan ganda. Skor memakai skala, bukan jumlah jawaban benar mentah.",
  ],
  tips: [
    kanjiTip("N4", "166"),
    "Di bagian 用法, baca keempat kalimat utuh: kata yang ditanyakan sering dipakai salah secara halus.",
    "Untuk menyimak 発話表現, perhatikan gambar situasinya: siapa bicara kepada siapa.",
  ],
  official: OFFICIAL,
  sources: SOURCES,
  parts: [
    {
      id: "moji-goi",
      section: "文字・語彙",
      title: "Kosakata dan huruf",
      instructions: "Pilih jawaban yang paling tepat. Kata yang ditanyakan ditandai ⟨ ⟩.",
      minutes: 7,
      questions: [
        mc({ task: "漢字読み", prompt: "駅の ⟨近く⟩ に 新しい 店が できました。", opts: ["ちかく", "きんく", "ちがく", "しかく"], explain: "近く = ちかく (dekat, sekitar)." }),
        mc({ task: "漢字読み", prompt: "夏休みに ⟨家族⟩ と 旅行しました。", opts: ["かぞく", "かそく", "がぞく", "いえぞく"], explain: "家族 = かぞく (keluarga)." }),
        mc({ task: "表記", prompt: "毎朝 こうえんで ⟨うんどう⟩ を して います。", opts: ["運動", "運働", "連動", "軍動"], explain: "うんどう (olahraga) ditulis 運動." }),
        mc({ task: "文脈規定", prompt: "わからない ことが あったので、先生に （　）。", opts: ["しつもんしました", "へんじしました", "あいさつしました", "しょうかいしました"], explain: "Bertanya kepada guru = しつもんする." }),
        mc({
          task: "言い換え類義",
          prompt: "あしたは ひまです。 Kalimat mana yang artinya paling dekat?",
          opts: ["あしたは 用事が ありません。", "あしたは いそがしいです。", "あしたは 休みじゃ ありません。", "あしたは 仕事が あります。"],
          explain: "ひま (senggang) = 用事が ない (tidak ada urusan).",
        }),
        mc({
          task: "用法",
          prompt: "「おみやげ」 dipakai dengan benar di kalimat mana?",
          opts: ["旅行の おみやげに、友だちに おかしを 買いました。", "毎朝 おみやげを 飲んで います。", "おみやげが ふって きました。", "日曜日は おみやげで 家に います。"],
          explain: "おみやげ = oleh-oleh yang dibawa dari perjalanan.",
        }),
      ],
    },
    {
      id: "bunpo-dokkai",
      section: "文法・読解",
      title: "Tata bahasa dan bacaan",
      instructions: "Pilih bentuk yang tepat, susun kalimat ★, isi rumpang teks, lalu jawab soal bacaan.",
      minutes: 14,
      questions: [
        mc({ task: "文法形式の判断", prompt: "日本へ 行ったら、本物の すしを 食べて （　） です。", opts: ["みたい", "しまい", "おき", "ある"], explain: "〜てみたい = ingin mencoba melakukan." }),
        mc({ task: "文法形式の判断", prompt: "先生に 辞書を 貸して （　）。", opts: ["いただきました", "くださいました", "あげました", "さしあげました"], explain: "Pemberi ditandai に, jadi pakai 〜ていただく (saya dipinjami oleh guru)." }),
        mc({ task: "文法形式の判断", prompt: "この 部屋は 静か （　）、勉強しやすいです。", opts: ["なので", "だので", "のに", "けれど"], explain: "Kata sifat な + ので menjadi 静かなので (karena tenang)." }),
        {
          type: "order",
          task: "文の組み立て ★",
          frame: "あした ＿＿ ＿＿ ★ ＿＿ ください。",
          prompt: "Susun menjadi kalimat yang benar.",
          items: ["までに", "この", "しゅくだいを", "出して"],
          joiner: " ",
          explain: "あした までに この しゅくだいを 出して ください。 (Kumpulkan PR ini paling lambat besok.)",
        },
        gap({
          task: "文章の文法",
          prompt: "Pilih kata yang paling tepat untuk setiap rumpang.",
          text: "わたしの しゅみは 料理です。週末は 友だちを よんで、いっしょに 食べます。[0] 先週の カレーは からすぎて、みんな 水を たくさん 飲みました。こんどは もっと おいしく 作れる [1]、れんしゅう します。",
          gaps: [
            ["でも", "そして", "だから", "それに"],
            ["ように", "ために", "ことに", "ほどに"],
          ],
          explain: "でも = tetapi (kejadian yang tidak sesuai harapan); 〜ように = supaya bisa.",
        }),
        mc({
          task: "内容理解（短文）",
          passage: "山田さんへ\nあしたの 会議の 時間が 変わりました。10時からでは なく、午後2時からです。場所は 同じ 3階の 会議室です。資料は 会議の 前に 読んで おいて ください。\n田中",
          prompt: "山田さんは 会議の 前に 何を しなければ なりませんか。",
          opts: ["資料を 読む", "会議室を 予約する", "田中さんに 電話する", "10時に 3階へ 行く"],
          explain: "資料は 会議の 前に 読んで おいて ください = baca dokumennya sebelum rapat.",
        }),
        mc({
          task: "情報検索",
          passage: "市民プール 利用案内\n時間：9:00〜20:00（月曜日は 休み）\n料金：大人 400円 ／ 子ども（中学生まで）200円\n※ 土曜日と 日曜日は、子どもは 無料です。",
          prompt: "日曜日に 大人 2人と 小学生 1人で 行きます。全部で いくらですか。",
          opts: ["800円", "1,000円", "600円", "1,200円"],
          explain: "Hari Minggu anak gratis: 400 × 2 = 800 yen.",
        }),
      ],
    },
    {
      id: "chokai",
      section: "聴解",
      title: "Menyimak",
      instructions: "Dengarkan, lalu pilih jawaban. Audio dibacakan suara perangkat.",
      minutes: 7,
      questions: [
        mc({
          task: "課題理解",
          audio: "会社で 女の人と 男の人が 話しています。男の人は まず 何を しますか。あ、コピー機、紙が ないみたい。じゃ、ぼくが 入れて おきます。ありがとう。それから、会議の 資料、10部 コピーして くれる？ はい、紙を 入れてから、すぐ やります。",
          prompt: "男の人は まず 何を しますか。",
          opts: ["紙を 入れる", "資料を コピーする", "会議に 出る", "女の人に 電話する"],
          explain: "紙を 入れてから コピーする: masukkan kertas dulu.",
        }),
        mc({
          task: "ポイント理解",
          audio: "男の人と 女の人が 話しています。女の人は どうして パーティーに 行きませんか。あしたの パーティー、行く？ 行きたいんだけど、母が 日本に 来るから、空港へ むかえに 行かなきゃ いけないの。そうか、ざんねん。",
          prompt: "女の人は どうして パーティーに 行きませんか。",
          opts: ["お母さんを むかえに 行くから", "仕事が あるから", "病気だから", "パーティーが きらいだから"],
        }),
        mc({
          task: "発話表現",
          audio: "友だちの 家で、ジュースを 出して もらいました。飲む 前に 何と 言いますか。",
          prompt: "Pilih ucapan yang tepat.",
          opts: ["いただきます。", "ごちそうさまでした。", "おじゃまします。", "いってきます。"],
          explain: "Sebelum makan atau minum yang diberikan orang lain: いただきます.",
        }),
        mc({
          task: "即時応答",
          audio: "すみません、この 席、空いて いますか。",
          prompt: "Pilih tanggapan yang tepat.",
          opts: ["ええ、どうぞ。", "いいえ、空きました。", "はい、すわりました。"],
        }),
      ],
    },
  ],
};

/* ---------------------------------------------------------------- N3 */

export const jlptN3: Exam = {
  id: "jlpt-n3",
  lang: "jepang",
  name: "JLPT N3",
  fullName: "日本語能力試験 (Japanese-Language Proficiency Test) N3",
  org: "Japan Foundation dan Japan Educational Exchanges and Services",
  level: "N3 (menengah)",
  about:
    "Jembatan antara level dasar (N4, N5) dan lanjut (N2, N1). Menguji kemampuan membaca teks konkret tentang topik sehari-hari, menangkap inti judul berita, serta memahami percakapan dengan kecepatan hampir alami.",
  format: [
    { name: "言語知識（文字・語彙）Kosakata", time: "30 menit", items: "5 jenis soal", tasks: "漢字読み, 表記, 文脈規定, 言い換え類義, 用法" },
    { name: "言語知識（文法）・読解 Tata bahasa dan bacaan", time: "70 menit", items: "7 jenis soal", tasks: "文法形式の判断, 文の組み立て ★, 文章の文法, 内容理解（短文・中文・長文）, 情報検索" },
    { name: "聴解 Menyimak", time: "40 menit", items: "5 jenis soal", tasks: "課題理解, ポイント理解, 概要理解, 発話表現, 即時応答" },
  ],
  scoring: [
    "Tiga bagian skor: Pengetahuan bahasa (0 sampai 60), Bacaan (0 sampai 60), dan Menyimak (0 sampai 60). Total 180.",
    "Lulus N3 butuh minimal 95 dari 180, sekaligus minimal 19 di setiap bagian.",
    "Skor memakai skala, jadi jumlah benar yang sama bisa menghasilkan skor sedikit berbeda antarperiode.",
  ],
  tips: [
    kanjiTip("N3", "367"),
    "Bacaan 長文 menghabiskan waktu: baca pertanyaannya dulu, baru cari bagian teks yang relevan.",
    "概要理解 tidak punya pertanyaan di awal. Dengarkan untuk menangkap maksud pembicara, bukan detail.",
  ],
  official: OFFICIAL,
  sources: SOURCES,
  parts: [
    {
      id: "moji-goi",
      section: "文字・語彙",
      title: "Kosakata dan huruf",
      instructions: "Pilih jawaban yang paling tepat. Kata yang ditanyakan ditandai ⟨ ⟩.",
      minutes: 7,
      questions: [
        mc({ task: "漢字読み", prompt: "わたしは 彼の 意見に ⟨賛成⟩ です。", opts: ["さんせい", "さんぜい", "ざんせい", "さんしょう"], explain: "賛成 = さんせい (setuju)." }),
        mc({ task: "漢字読み", prompt: "道が ⟨込んで⟩ いて、約束に 遅れました。", opts: ["こんで", "かんで", "ふんで", "すんで"], explain: "込む = こむ (padat, macet)." }),
        mc({ task: "表記", prompt: "出かける 前に 部屋を ⟨かたづけ⟩ なさい。", opts: ["片付け", "方付け", "片着け", "肩付け"], explain: "かたづける (membereskan) ditulis 片付ける." }),
        mc({ task: "文脈規定", prompt: "しめきりに 間に合うように、（　） 作業を 進めて ください。", opts: ["さっさと", "じっと", "ほっと", "そっと"], explain: "さっさと = cepat-cepat, tanpa membuang waktu." }),
        mc({
          task: "言い換え類義",
          prompt: "会議は 延期に なりました。 Kalimat mana yang artinya paling dekat?",
          opts: ["会議は 別の 日に する ことに なりました。", "会議は 中止に なりました。", "会議は 早く 始まる ことに なりました。", "会議の 場所が 変わりました。"],
          explain: "延期 (ditunda) = diadakan di hari lain, bukan dibatalkan (中止).",
        }),
        mc({
          task: "用法",
          prompt: "「さっそく」 dipakai dengan benar di kalimat mana?",
          opts: ["新しい パソコンが 届いたので、さっそく 使って みました。", "さっそく 雨が やんで ほしい。", "彼とは さっそく 10年 会って いない。", "この 道は さっそく せまく なる。"],
          explain: "さっそく = segera (setelah sesuatu terjadi), dipakai untuk tindakan sendiri.",
        }),
      ],
    },
    {
      id: "bunpo-dokkai",
      section: "文法・読解",
      title: "Tata bahasa dan bacaan",
      instructions: "Pilih bentuk yang tepat, susun kalimat ★, isi rumpang teks, lalu jawab soal bacaan.",
      minutes: 18,
      questions: [
        mc({ task: "文法形式の判断", prompt: "この 薬は 1日 3回、食事の 後に 飲む （　） なって います。", opts: ["ことに", "ように", "ために", "ところに"], explain: "〜ことになっている = sudah ditetapkan (aturan)." }),
        mc({ task: "文法形式の判断", prompt: "子どもの ころ、母に きらいな 野菜を 食べ （　） ました。", opts: ["させられ", "させ", "られ", "させて"], explain: "Bentuk kausatif-pasif 食べさせられる = dipaksa makan." }),
        mc({ task: "文法形式の判断", prompt: "雨が 降って いた （　）、試合は 予定どおり 行われた。", opts: ["にもかかわらず", "おかげで", "ために", "かわりに"], explain: "〜にもかかわらず = meskipun." }),
        {
          type: "order",
          task: "文の組み立て ★",
          frame: "駅に ＿＿ ＿＿ ★ ＿＿ 電車が 出て しまった。",
          prompt: "Susun menjadi kalimat yang benar.",
          items: ["着いた", "とたんに", "乗る", "はずの"],
          joiner: " ",
          explain: "駅に 着いた とたんに 乗る はずの 電車が 出て しまった。 (Begitu tiba di stasiun, kereta yang seharusnya saya naiki berangkat.)",
        },
        gap({
          task: "文章の文法",
          prompt: "Pilih kata yang paling tepat untuk setiap rumpang.",
          text: "最近、駅前に 新しい 図書館が できた。前の 図書館は 古くて せまかったが、新しい 図書館は 広くて 明るい。[0]、カフェも あるので、コーヒーを 飲みながら 本を 読む ことが できる。週末は 家族連れで にぎわって いて、[1] すわる 場所が ない ことも ある。",
          gaps: [
            ["さらに", "しかし", "つまり", "ところで"],
            ["時には", "決して", "めったに", "必ずしも"],
          ],
          explain: "さらに = selain itu; 時には = kadang-kadang.",
        }),
        mc({
          task: "内容理解（短文）",
          passage: "【お知らせ】\n来週の 月曜日から 金曜日まで、エレベーターの 点検を 行います。点検中は エレベーターを 使えませんので、階段を ご利用ください。点検は 毎日 午前10時から 午後3時までです。ご迷惑を おかけしますが、ご協力を お願いします。\n管理事務所",
          prompt: "この お知らせで 一番 伝えたい ことは 何か。",
          opts: ["点検の 時間は エレベーターが 使えない こと", "階段が 新しく なる こと", "管理事務所が 移る こと", "月曜日は 点検が ない こと"],
        }),
        mc({
          task: "内容理解（中文）",
          passage:
            "日本では、電車の 中で 電話を する 人は 少ない。周りの 人に 迷惑を かけたくないと 考える 人が 多いからだ。しかし、メールや メッセージを 送る 人は たくさん いる。声を 出さなければ、ほかの 人の じゃまに ならないと 思われて いるのだろう。わたしは、大切なのは 規則を 守る ことより、周りの 人の 気持ちを 考える ことだと 思う。",
          prompt: "筆者が 一番 大切だと 考えて いる ことは 何か。",
          opts: ["周りの 人の 気持ちを 考える こと", "電車で メールを しない こと", "規則を 必ず 守る こと", "電車で 電話を 使わない こと"],
        }),
        mc({
          task: "情報検索",
          passage: "料理教室のご案内\nAコース（和食）　毎週土曜　10:00〜12:00　3,000円\nBコース（パン）　毎週日曜　14:00〜16:00　2,500円\nCコース（中華）　毎週水曜　19:00〜21:00　3,500円",
          prompt: "平日の 夜しか 時間が ない 人が 参加できるのは どれか。",
          opts: ["Cコース", "Aコース", "Bコース", "どれも 参加できない"],
          explain: "Hanya kursus C yang hari kerja (Rabu) malam.",
        }),
      ],
    },
    {
      id: "chokai",
      section: "聴解",
      title: "Menyimak",
      instructions: "Dengarkan, lalu pilih jawaban. Audio dibacakan suara perangkat.",
      minutes: 8,
      questions: [
        mc({
          task: "課題理解",
          audio: "大学で 先生と 学生が 話しています。学生は レポートを どう しますか。先生、レポートの しめきりは 金曜日でしたよね。そうだったんだけど、来週の 月曜日まで 延ばす ことに したよ。ただ、メールじゃ なくて、紙で 出してね。わかりました。",
          prompt: "学生は レポートを どう しますか。",
          opts: ["月曜日までに 紙で 出す", "金曜日までに 紙で 出す", "月曜日までに メールで 出す", "金曜日までに メールで 出す"],
        }),
        mc({
          task: "ポイント理解",
          audio: "女の人と 男の人が 話しています。男の人は どうして 引っ越しますか。引っ越すんだって？ 今の アパート、駅から 近くて 便利なのに。うん、便利なんだけどね。となりの 部屋の 音が うるさくて、夜 よく ねむれないんだよ。それは 大変だね。",
          prompt: "男の人が 引っ越す 一番の 理由は 何ですか。",
          opts: ["となりの 音が うるさいから", "駅から 遠いから", "家賃が 高いから", "部屋が せまいから"],
        }),
        mc({
          task: "概要理解",
          audio: "ラジオで 男の人が 話しています。最近、自転車で 通勤する 人が 増えています。運動に なるし、電車の 混雑も さけられるからです。一方で、自転車の 事故も 増えています。自転車に 乗る ときは、交通ルールを 守り、ヘルメットを かぶるように しましょう。",
          prompt: "男の人は 何に ついて 話して いますか。",
          opts: ["自転車通勤の よい 点と 注意する こと", "電車が 混雑する 原因", "ヘルメットの 選び方", "新しい 交通ルール"],
        }),
        mc({
          task: "発話表現",
          audio: "友だちの 本を 読みたいです。友だちに 何と 言いますか。",
          prompt: "Pilih ucapan yang tepat.",
          opts: ["この 本、借りても いい？", "この 本、貸しても いい？", "この 本、借りて あげる。"],
          explain: "Meminjam = 借りる; meminjamkan = 貸す.",
        }),
        mc({
          task: "即時応答",
          audio: "あれ、まだ 帰らないの？",
          prompt: "Pilih tanggapan yang tepat.",
          opts: ["うん、この 仕事を 終わらせてから。", "うん、もう 帰ったよ。", "じゃあ、お先に どうぞ。"],
        }),
      ],
    },
  ],
};

/* ---------------------------------------------------------------- N2 */

export const jlptN2: Exam = {
  id: "jlpt-n2",
  lang: "jepang",
  name: "JLPT N2",
  fullName: "日本語能力試験 (Japanese-Language Proficiency Test) N2",
  org: "Japan Foundation dan Japan Educational Exchanges and Services",
  level: "N2 (menengah atas)",
  about:
    "Menguji kemampuan memahami bahasa Jepang sehari-hari dan dalam berbagai situasi yang lebih luas: artikel koran dan majalah, tulisan penjelasan, serta percakapan dan berita dengan kecepatan alami. Banyak perusahaan Jepang menjadikan N2 syarat minimum untuk pekerjaan kantor.",
  format: [
    {
      name: "言語知識（文字・語彙・文法）・読解 Bahasa dan bacaan",
      time: "105 menit",
      items: "14 jenis soal",
      tasks: "漢字読み, 表記, 語形成, 文脈規定, 言い換え類義, 用法, 文法形式の判断, 文の組み立て ★, 文章の文法, 内容理解（短文・中文）, 統合理解, 主張理解（長文）, 情報検索",
    },
    { name: "聴解 Menyimak", time: "50 menit", items: "5 jenis soal", tasks: "課題理解, ポイント理解, 概要理解, 即時応答, 統合理解" },
  ],
  scoring: [
    "Tiga bagian skor: Pengetahuan bahasa (0 sampai 60), Bacaan (0 sampai 60), dan Menyimak (0 sampai 60). Total 180.",
    "Lulus N2 butuh minimal 90 dari 180, sekaligus minimal 19 di setiap bagian.",
    "Bahasa dan bacaan diujikan dalam satu sesi 105 menit, jadi atur sendiri waktu untuk bacaan.",
  ],
  tips: [
    kanjiTip("N2", "367"),
    "Sisihkan sekitar 60 menit untuk bacaan; soal kosakata dan tata bahasa sebaiknya selesai dalam 40 menit.",
    "Di 統合理解 menyimak, catat pendapat setiap orang dalam tabel kecil sebelum memilih.",
  ],
  official: OFFICIAL,
  sources: SOURCES,
  parts: [
    {
      id: "moji-goi",
      section: "文字・語彙",
      title: "Kosakata dan huruf",
      instructions: "Pilih jawaban yang paling tepat. Kata yang ditanyakan ditandai ⟨ ⟩.",
      minutes: 8,
      questions: [
        mc({ task: "漢字読み", prompt: "事故の 原因を ⟨詳しく⟩ 調べる 必要が ある。", opts: ["くわしく", "こまかく", "くやしく", "あやしく"], explain: "詳しい = くわしい (rinci)." }),
        mc({ task: "漢字読み", prompt: "来年から 新しい 制度が ⟨導入⟩ される。", opts: ["どうにゅう", "どうにゅ", "とうにゅう", "どうじゅう"], explain: "導入 = どうにゅう (penerapan)." }),
        mc({ task: "表記", prompt: "会議の 日程を ⟨ちょうせい⟩ して います。", opts: ["調整", "調製", "長整", "調正"], explain: "Menyesuaikan jadwal = 調整. 調製 berarti membuat atau meracik." }),
        mc({ task: "語形成", prompt: "（　）責任な 発言は ひかえて ください。", opts: ["無", "不", "未", "非"], explain: "無責任 = tidak bertanggung jawab." }),
        mc({ task: "文脈規定", prompt: "彼は 何を 言われても （　） 態度を くずさなかった。", opts: ["冷静な", "正式な", "微妙な", "深刻な"], explain: "冷静な態度 = sikap tenang." }),
        mc({
          task: "言い換え類義",
          prompt: "彼の 説明は あいまいだった。 Kata mana yang artinya paling dekat dengan あいまいだった?",
          opts: ["はっきりしなかった", "長すぎた", "まちがって いた", "むずかしかった"],
          explain: "あいまい = samar, tidak jelas.",
        }),
        mc({
          task: "用法",
          prompt: "「手がかり」 dipakai dengan benar di kalimat mana?",
          opts: ["警察は 事件の 手がかりを 探して いる。", "料理の 手がかりに 塩を 入れた。", "手がかりを 洗ってから 食事を する。", "彼は 手がかりが 広くて 友人が 多い。"],
          explain: "手がかり = petunjuk.",
        }),
      ],
    },
    {
      id: "bunpo",
      section: "文法",
      title: "Tata bahasa",
      instructions: "Pilih bentuk yang tepat, susun kalimat ★, lalu isi rumpang teks.",
      minutes: 8,
      questions: [
        mc({ task: "文法形式の判断", prompt: "この 店は 味 （　）、値段も 手ごろなので、いつも 混んで いる。", opts: ["はもちろん", "にしては", "によって", "にかけては"], explain: "〜はもちろん = tentu saja ..., dan juga." }),
        mc({ task: "文法形式の判断", prompt: "せっかく 京都まで 来た （　）、有名な お寺を 見て 帰りたい。", opts: ["からには", "とたんに", "うちに", "ばかりに"], explain: "〜からには = karena sudah ..., maka sepantasnya." }),
        mc({ task: "文法形式の判断", prompt: "実際に やって （　）、その 難しさは わからない。", opts: ["みないことには", "みるからには", "みたところで", "みたうえで"], explain: "〜ないことには = kalau tidak ..., maka (tidak bisa)." }),
        {
          type: "order",
          task: "文の組み立て ★",
          frame: "この 問題は ＿＿ ＿＿ ★ ＿＿ 解決できる ものでは ない。",
          prompt: "Susun menjadi kalimat yang benar.",
          items: ["一人の", "力", "だけで", "簡単に"],
          joiner: " ",
          explain: "この 問題は 一人の 力 だけで 簡単に 解決できる ものでは ない。",
        },
        gap({
          task: "文章の文法",
          prompt: "Pilih kata yang paling tepat untuk setiap rumpang.",
          text: "近年、在宅勤務を 導入する 企業が 増えて いる。通勤の 負担が 減り、家族と 過ごす 時間が 増えたと いう 声も 多い。[0]、同僚と 直接 話す 機会が 減り、孤独を 感じる 人も いる [1]。働き方の 選択肢が 増えた 今、それぞれに 合った バランスを 見つける ことが 求められて いる。",
          gaps: [
            ["その一方で", "そのうえ", "したがって", "すなわち"],
            ["ようだ", "ものだ", "わけがない", "べきだ"],
          ],
          explain: "その一方で = di sisi lain; 〜ようだ = tampaknya.",
        }),
      ],
    },
    {
      id: "dokkai",
      section: "読解",
      title: "Bacaan",
      instructions: "Baca teksnya, lalu pilih jawaban yang paling tepat.",
      minutes: 12,
      questions: [
        mc({
          task: "内容理解（短文）",
          passage:
            "件名：打ち合わせ日程の変更について\n株式会社ミドリ　佐藤様\nいつもお世話になっております。来週水曜日に予定しておりました打ち合わせですが、弊社の都合により、木曜日の同じ時間に変更させていただけないでしょうか。ご都合が悪い場合は、候補日をいくつかお知らせください。\n山川商事　田村",
          prompt: "この メールを 読んで、佐藤さんが しなければ ならない ことは 何か。",
          opts: ["木曜日で よいか どうか 返事を する", "打ち合わせの 資料を 送る", "水曜日に 山川商事へ 行く", "候補日を 必ず 三つ 知らせる"],
          explain: "Diminta mengabari apakah Kamis bisa; tanggal alternatif hanya jika tidak bisa.",
        }),
        mc({
          task: "主張理解",
          passage:
            "「失敗しては いけない」と 教えられて 育った 子どもは、新しい ことに 挑戦しなく なる。失敗を 恐れて、できる ことだけを 選ぶように なるからだ。しかし、人は 失敗から 多くを 学ぶ。大人が すべき ことは、失敗を 責める ことでは なく、失敗した 後に どう 考え、どう 動くかを 一緒に 考える ことでは ないだろうか。",
          prompt: "筆者の 主張に 最も 近い ものは どれか。",
          opts: [
            "大人は 子どもと、失敗の 後の 行動を 一緒に 考える べきだ。",
            "子どもには できる ことだけを させる べきだ。",
            "子どもに 失敗しない 方法を 教える べきだ。",
            "失敗した 子どもは 厳しく 注意する べきだ。",
          ],
        }),
      ],
    },
    {
      id: "chokai",
      section: "聴解",
      title: "Menyimak",
      instructions: "Dengarkan, lalu pilih jawaban. Audio dibacakan suara perangkat.",
      minutes: 8,
      questions: [
        mc({
          task: "課題理解",
          audio: "会社で 女の人と 男の人が 話しています。男の人は このあと まず 何を しますか。来週の プレゼンの 資料、できた？ はい、だいたい できました。あとは グラフを 入れる だけです。その前に、部長に 内容を 一度 見て もらって。部長、午後から 出張だから、今の うちにね。わかりました。すぐ 持って いきます。",
          prompt: "男の人は このあと まず 何を しますか。",
          opts: ["部長に 資料を 見せる", "グラフを 入れる", "出張の 準備を する", "プレゼンの 練習を する"],
        }),
        mc({
          task: "ポイント理解",
          audio: "テレビで レストランの 店長が 話しています。うちは 駅から 遠いし、値段も 安くは ありません。それでも お客様が 来て くださるのは、毎朝 地元の 農家から 届く 野菜を 使って いるからだと 思います。料理人の 腕も ありますが、やはり 素材の 力が 大きいですね。",
          prompt: "店長は 店が 人気に なった 一番の 理由は 何だと 言って いますか。",
          opts: ["地元の 新鮮な 野菜を 使って いる こと", "料理人の 技術が 高い こと", "値段が 安い こと", "駅から 近い こと"],
        }),
        mc({
          task: "概要理解",
          audio: "講演会で 大学の 先生が 話しています。最近、時間が ないと 言う 人が 増えて います。しかし、一日の 行動を 記録して みると、スマートフォンを 何となく 見て いる 時間が 意外に 長い ことに 気づきます。時間が ないのでは なく、時間の 使い方を 意識して いないのです。まずは 一週間、自分の 時間の 使い方を 書き出して みて ください。",
          prompt: "先生が 一番 言いたい ことは 何ですか。",
          opts: ["自分の 時間の 使い方を 意識する べきだ", "スマートフォンを 使っては いけない", "一日の 予定を 細かく 決める べきだ", "忙しい 人は 休みを 取る べきだ"],
        }),
        mc({
          task: "即時応答",
          audio: "この 企画、もう 少し 練り直した ほうが いいんじゃない？",
          prompt: "Pilih tanggapan yang tepat.",
          opts: ["そうですね、もう 一度 検討して みます。", "はい、練習して おきます。", "いいえ、もう 少しです。"],
          explain: "練り直す = menyusun ulang (rencana), bukan berlatih.",
        }),
      ],
    },
  ],
};

/* ---------------------------------------------------------------- N1 */

export const jlptN1: Exam = {
  id: "jlpt-n1",
  lang: "jepang",
  name: "JLPT N1",
  fullName: "日本語能力試験 (Japanese-Language Proficiency Test) N1",
  org: "Japan Foundation dan Japan Educational Exchanges and Services",
  level: "N1 (mahir)",
  about:
    "Level tertinggi JLPT. Menguji kemampuan membaca tulisan yang logikanya rumit atau abstrak, seperti tajuk rencana dan kritik, memahami alur dan maksud penulis, serta menyimak percakapan, berita, dan kuliah dengan kecepatan alami secara mendalam.",
  format: [
    {
      name: "言語知識（文字・語彙・文法）・読解 Bahasa dan bacaan",
      time: "110 menit",
      items: "13 jenis soal",
      tasks: "漢字読み, 文脈規定, 言い換え類義, 用法, 文法形式の判断, 文の組み立て ★, 文章の文法, 内容理解（短文・中文・長文）, 統合理解, 主張理解（長文）, 情報検索",
    },
    { name: "聴解 Menyimak", time: "55 menit", items: "5 jenis soal", tasks: "課題理解, ポイント理解, 概要理解, 即時応答, 統合理解" },
  ],
  scoring: [
    "Tiga bagian skor: Pengetahuan bahasa (0 sampai 60), Bacaan (0 sampai 60), dan Menyimak (0 sampai 60). Total 180.",
    "Lulus N1 butuh minimal 100 dari 180, sekaligus minimal 19 di setiap bagian.",
    "Tidak ada bagian menulis atau berbicara; semua soal pilihan ganda.",
  ],
  tips: [
    kanjiTip("N1", "1.232"),
    "Biasakan membaca tajuk rencana koran Jepang setiap hari; soal 主張理解 meniru gaya itu.",
    "Pola tata bahasa N1 banyak yang formal dan tertulis (〜をもってすれば, 〜なしには). Hafalkan bersama contoh kalimatnya.",
  ],
  official: OFFICIAL,
  sources: SOURCES,
  parts: [
    {
      id: "moji-goi",
      section: "文字・語彙",
      title: "Kosakata dan huruf",
      instructions: "Pilih jawaban yang paling tepat. Kata yang ditanyakan ditandai ⟨ ⟩.",
      minutes: 7,
      questions: [
        mc({ task: "漢字読み", prompt: "両国の 関係は ⟨著しく⟩ 改善した。", opts: ["いちじるしく", "あらわしく", "はなはだしく", "すみやかしく"], explain: "著しい = いちじるしい (mencolok, signifikan)." }),
        mc({ task: "漢字読み", prompt: "彼は 業界の ⟨重鎮⟩ として 知られて いる。", opts: ["じゅうちん", "ちょうちん", "じゅうしん", "ちょうてん"], explain: "重鎮 = じゅうちん (tokoh senior yang berpengaruh)." }),
        mc({ task: "文脈規定", prompt: "長年の 努力が （　）、ついに 新薬の 開発に 成功した。", opts: ["実り", "至り", "及び", "帯び"], explain: "努力が実る = usaha membuahkan hasil." }),
        mc({
          task: "言い換え類義",
          prompt: "その 件に ついては 一切 関知して いない。 Arti 関知して いない paling dekat dengan …",
          opts: ["全く 関わって いない", "少しも 知らされて いない", "あまり 興味が ない", "まだ 決めて いない"],
        }),
        mc({
          task: "用法",
          prompt: "「踏襲」 dipakai dengan benar di kalimat mana?",
          opts: ["新社長も 前社長の 経営方針を 踏襲する 考えだ。", "階段を 一段ずつ 踏襲して 上った。", "彼は 試験に 踏襲して 合格した。", "台風が 九州を 踏襲した。"],
          explain: "踏襲 = meneruskan cara atau kebijakan pendahulu.",
        }),
      ],
    },
    {
      id: "bunpo",
      section: "文法",
      title: "Tata bahasa",
      instructions: "Pilih bentuk yang tepat, susun kalimat ★, lalu isi rumpang teks.",
      minutes: 8,
      questions: [
        mc({ task: "文法形式の判断", prompt: "彼の 才能を もって （　）、この 程度の 問題は すぐ 解決できる だろう。", opts: ["すれば", "しても", "しては", "するなら"], explain: "〜をもってすれば = dengan (kemampuan) ..., pasti bisa." }),
        mc({ task: "文法形式の判断", prompt: "社長の 許可 （　）、この 資料を 外部に 出す ことは できない。", opts: ["なしには", "ならでは", "ともなると", "をよそに"], explain: "〜なしには = tanpa ..., tidak bisa." }),
        mc({ task: "文法形式の判断", prompt: "周囲の 心配 （　）、彼は 一人で 冬山に 登った。", opts: ["をよそに", "をもとに", "にそって", "にひきかえ"], explain: "〜をよそに = tanpa menghiraukan ..." }),
        {
          type: "order",
          task: "文の組み立て ★",
          frame: "この 映画は ＿＿ ＿＿ ★ ＿＿ 心を 打たれる 作品だ。",
          prompt: "Susun menjadi kalimat yang benar.",
          items: ["見る", "たびに", "新たな 発見が", "あり、"],
          joiner: " ",
          explain: "この 映画は 見る たびに 新たな 発見が あり、心を 打たれる 作品だ。",
        },
        gap({
          task: "文章の文法",
          prompt: "Pilih ungkapan yang paling tepat untuk setiap rumpang.",
          text: "人工知能の 発達に より、多くの 仕事が 機械に 置き換えられると 言われて いる。[0]、すべての 仕事が なくなる わけでは ない。人の 気持ちを 理解し、相手に 合わせて 判断する 力は、今の ところ 機械には 難しい。これからの 時代に 求められるのは、機械と 競う ことでは なく、機械を 使いこなし つつ、人に しか できない 価値を 生み出す 力 [1]。",
          gaps: [
            ["とはいえ", "それゆえ", "ひいては", "ちなみに"],
            ["なのでは ないだろうか", "であるまい", "にすぎない", "どころでは ない"],
          ],
          explain: "とはいえ = meskipun begitu; 〜なのではないだろうか = bukankah ... (pendapat penulis yang halus).",
        }),
      ],
    },
    {
      id: "dokkai",
      section: "読解",
      title: "Bacaan",
      instructions: "Baca teksnya, lalu pilih jawaban yang paling tepat.",
      minutes: 15,
      questions: [
        mc({
          task: "内容理解（中文）",
          passage:
            "「便利さ」は 私たちの 生活を 豊かに した。だが、便利さと 引き換えに 失った ものも 少なく ない。たとえば、道に 迷う 経験だ。地図アプリが あれば、私たちは 迷わずに 目的地へ 着ける。しかし、迷った 末に 偶然 見つけた 店や 風景の ほうが、記憶に 残って いる ことも 多い。効率だけを 追い求める ことで、人生から 余白が 消えて いるのでは ないか。",
          prompt: "筆者の 考えに 合う ものは どれか。",
          opts: [
            "効率を 求めすぎると、偶然の 出会いや 余白が 失われる。",
            "地図アプリは 使う べきでは ない。",
            "便利さは 生活を 貧しく した。",
            "道に 迷わない ことが 豊かさに つながる。",
          ],
        }),
        mc({
          task: "統合理解",
          passage:
            "A\n小学生に スマートフォンを 持たせる ことには 慎重で あるべきだ。長時間の 使用は 睡眠や 学習に 影響し、ネット上の トラブルに 巻き込まれる 危険も ある。持たせる 場合でも、家庭で 使用時間の ルールを 決める ことが 欠かせない。\n\nB\n共働きの 家庭が 増えた 今、子どもと すぐに 連絡が 取れる 安心感は 大きい。もちろん 使いすぎの 心配は あるが、それは 家庭で 使い方を 話し合い、ルールを 作る ことで 防げる はずだ。",
          prompt: "A と B の どちらの 文章も 述べて いる ことは 何か。",
          opts: ["家庭で 使い方の ルールを 決める ことが 大切だ。", "小学生に スマートフォンは 必要ない。", "ネット上の トラブルが 増えて いる。", "共働きの 家庭が 増えて いる。"],
        }),
        mc({
          task: "情報検索",
          passage:
            "奨学金募集要項\n対象：本学の 2年生以上で、前年度の 成績が 平均B以上の 学生\n金額：月額 3万円（返済不要）\n応募方法：申請書と 推薦状（指導教員が 作成）を 学生課へ 提出\n締切：5月31日（必着）",
          prompt: "1年生の ときの 成績が 平均Aだった 2年生の リーさんが 応募する ために 必要な ものは どれか。",
          opts: ["申請書と 指導教員の 推薦状", "申請書だけ", "推薦状と 返済計画書", "リーさんは 応募できない"],
        }),
      ],
    },
    {
      id: "chokai",
      section: "聴解",
      title: "Menyimak",
      instructions: "Dengarkan, lalu pilih jawaban. Audio dibacakan suara perangkat.",
      minutes: 9,
      questions: [
        mc({
          task: "課題理解",
          audio: "会社で 上司と 部下が 話しています。部下は このあと 何を しなければ なりませんか。例の 新商品の 件だけど、取引先から 価格に ついて もう 少し 検討して ほしいって 連絡が あってね。そうですか。では、原価を もう 一度 計算し直して。いや、それは もう 経理に 頼んで あるから。君には、競合他社の 価格を 調べて 一覧に まとめて ほしいんだ。明日の 会議で 使うから。承知しました。",
          prompt: "部下は このあと 何を しなければ なりませんか。",
          opts: ["他社の 価格を 調べて まとめる", "原価を 計算し直す", "経理に 連絡する", "取引先に 電話する"],
        }),
        mc({
          task: "ポイント理解",
          audio: "ラジオで 作家が 話しています。よく、取材を たくさん するんですかと 聞かれます。もちろん 取材も しますし、文章の リズムにも 気を 配ります。でも、何より 大事に して いるのは、登場人物が 自分の 言葉で 話して いるか どうか、なんです。作者の 都合で 人物を 動かすと、読者は すぐに 気づきますから。",
          prompt: "作家が 最も 大切に して いる ことは 何ですか。",
          opts: ["登場人物が 自分の 言葉で 話して いる こと", "取材を たくさん する こと", "文章の リズム", "読者の 意見を 聞く こと"],
        }),
        mc({
          task: "概要理解",
          audio: "講演で 経済学者が 話しています。物の 値段が 上がると、私たちは つい 買い物を 控えようと します。しかし、皆が 一斉に 消費を 減らすと、企業の 売り上げが 落ち、給料が 上がりにくく なる。結果と して、さらに 消費が 冷え込むと いう 悪循環が 起こりかねません。個人に とって 合理的な 行動が、社会全体に とっては 望ましくない 結果を 招く ことが あるのです。",
          prompt: "経済学者が 言いたい ことは 何ですか。",
          opts: [
            "個人に とって 合理的な 行動が、社会全体に 悪い 結果を 生む ことが ある。",
            "値段が 上がったら 買い物を 控える べきだ。",
            "企業は 給料を 上げる べきだ。",
            "消費が 増えると 物価が 下がる。",
          ],
        }),
        mc({
          task: "即時応答",
          audio: "今回の 件、部長には 私から 話を 通して おきましょうか。",
          prompt: "Pilih tanggapan yang tepat.",
          opts: ["助かります。よろしく お願いします。", "はい、もう 通りました。", "いえ、部長は 話しません。"],
          explain: "話を通す = menyampaikan dan meminta persetujuan lebih dulu.",
        }),
      ],
    },
  ],
};

export const jlptHigher = [jlptN4, jlptN3, jlptN2, jlptN1];
