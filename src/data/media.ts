/**
 * "Belajar dari tontonan": per bahasa ada
 *  1. adegan pendek orisinal bergaya anime, drama, atau kartun dari budaya
 *     bahasa itu (dialog kami tulis sendiri, jadi aman disalin dan dibacakan),
 *  2. ungkapan khas yang sering terdengar di tontonan tersebut,
 *  3. klip resmi dari kanal YouTube pemegang hak (diputar lewat sematan resmi).
 *
 * Baris adegan: `A|teks|romanisasi|arti|catatan` (A atau B = pembicara).
 * Ungkapan: `teks|romanisasi|arti|catatan`.
 * Klip sudah dicek: kanal resmi terverifikasi dan boleh disematkan (oEmbed).
 */

export interface SceneLine {
  who: 0 | 1;
  text: string;
  roman?: string;
  meaning: string;
  note?: string;
}

export interface MediaScene {
  id: string;
  title: string;
  genre: string;
  setting: string;
  cast: [string, string];
  lines: SceneLine[];
}

export interface MediaExpression {
  text: string;
  roman?: string;
  meaning: string;
  note?: string;
}

export interface MediaClip {
  id: string;
  show: string;
  title: string;
  channel: string;
  kind: string;
  length: string;
  level: "Pemula" | "Menengah";
  tip: string;
}

export interface MediaPack {
  label: string;
  media: string;
  intro: string;
  scenes: MediaScene[];
  expressions: MediaExpression[];
  clips: MediaClip[];
}

interface RawScene extends Omit<MediaScene, "lines"> {
  lines: string;
}
interface RawPack extends Omit<MediaPack, "scenes" | "expressions"> {
  scenes: RawScene[];
  expressions: string;
}

const rows = (s: string) =>
  s
    .trim()
    .split("\n")
    .map((l) => l.split("|").map((x) => x.trim()));

function parse(p: RawPack): MediaPack {
  return {
    ...p,
    scenes: p.scenes.map((sc) => ({
      ...sc,
      lines: rows(sc.lines).map(([who, text, roman, meaning, note]) => ({
        who: who === "B" ? 1 : 0,
        text,
        roman: roman || undefined,
        meaning,
        note: note || undefined,
      })),
    })),
    expressions: rows(p.expressions).map(([text, roman, meaning, note]) => ({
      text,
      roman: roman || undefined,
      meaning,
      note: note || undefined,
    })),
  };
}

const RAW: Record<string, RawPack> = {
  jepang: {
    label: "Belajar dari Anime",
    media: "anime",
    intro:
      "Anime memakai bahasa lisan yang santai, bahkan kasar, dan sangat berbeda dari bentuk sopan です/ます di unit pelajaran. Pelajari ungkapannya agar bisa menikmati anime tanpa terjemahan, tetapi tetap tahu kapan ungkapan itu tidak pantas dipakai.",
    scenes: [
      {
        id: "sekolah",
        title: "Pagi yang terlambat",
        genre: "Slice of life",
        setting: "Gerbang sekolah, lima menit sebelum bel berbunyi.",
        cast: ["Haruto", "Yui"],
        lines: `
A|おはよう！遅刻しそう！|ohayō! chikoku shisō!|Pagi! Aku hampir terlambat!|〜そう: kelihatannya akan
B|また？早く早く！|mata? hayaku hayaku!|Lagi? Cepat, cepat!|
A|待って！パンを食べてから！|matte! pan o tabete kara!|Tunggu! Habiskan rotiku dulu!|Adegan klise anime: berlari sambil menggigit roti
B|もう、しょうがないなあ。|mō, shō ga nai nā.|Ya ampun, apa boleh buat.|もう di awal kalimat menandakan kesal
A|ありがとう！明日はちゃんと起きるから！|arigatō! ashita wa chanto okiru kara!|Makasih! Besok aku bangun tepat waktu, deh!|
B|本当に？期待しないでおくね。|hontō ni? kitai shinaide oku ne.|Yang benar? Aku tidak akan terlalu berharap, ya.|`,
      },
      {
        id: "pertarungan",
        title: "Sebelum pertarungan terakhir",
        genre: "Shōnen",
        setting: "Reruntuhan kota. Musuh terakhir menunggu.",
        cast: ["Ren", "Aoi"],
        lines: `
A|大丈夫か？|daijōbu ka?|Kamu baik-baik saja?|か tanpa です terdengar santai dan maskulin
B|うん、平気。まだ戦える！|un, heiki. mada tatakaeru!|Iya, aku tidak apa-apa. Aku masih bisa bertarung!|
A|無理するなよ。|muri suru na yo.|Jangan memaksakan diri.|Kata kerja + な: larangan yang kasar
B|仲間を守るって約束したでしょ。|nakama o mamoru tte yakusoku shita desho.|Aku sudah janji akan melindungi teman-teman, kan?|仲間 (nakama): kawan seperjuangan, kata favorit anime shōnen
A|……分かった。俺に任せろ！|……wakatta. ore ni makasero!|...Baiklah. Serahkan padaku!|俺: aku (laki-laki, santai)
B|行くぞ！|iku zo!|Ayo maju!|ぞ: penegas yang tegas dan santai`,
      },
    ],
    expressions: `
やばい|yabai|Gawat! atau Keren banget!|Bisa positif atau negatif tergantung nada. Hindari di situasi formal.
大丈夫？|daijōbu?|Kamu tidak apa-apa?|Jawabannya juga 大丈夫 (aku baik-baik saja).
待って！|matte!|Tunggu!|Bentuk sopannya 待ってください.
任せて|makasete|Serahkan padaku|Versi kasar dan maskulin: 任せろ.
しょうがない|shō ga nai|Apa boleh buat|Sering diucapkan sambil menghela napas.
マジで？|maji de?|Serius?|Gaul. Versi netralnya 本当に？
いただきます|itadakimasu|Selamat makan|Diucapkan sebelum makan. Sesudahnya: ごちそうさま.
お前 / 俺|omae / ore|kamu / aku (kasar, maskulin)|Sangat sering di anime, tetapi tidak sopan di dunia nyata. Pakai あなた / 私.`,
    clips: [
      {
        id: "X3Y9esqDspY",
        show: "Sōsō no Frieren",
        title: "Mini anime: sihir yang membuat orang mengucapkan isi pikirannya",
        channel: "TOHO animation チャンネル",
        kind: "Anime",
        length: "1:10",
        level: "Pemula",
        tip: "Sangat pendek, cocok diulang. Tonton tiga kali: tanpa subtitle, dengan subtitle Jepang bila tersedia, lalu tirukan kalimat per kalimat.",
      },
      {
        id: "iVAWwYzAlVs",
        show: "Kusuriya no Hitorigoto",
        title: "Mini anime: gumaman Maomao, episode 1",
        channel: "TOHO animation チャンネル",
        kind: "Anime",
        length: "1:37",
        level: "Menengah",
        tip: "Maomao banyak bergumam sendiri dengan gaya santai. Perhatikan akhiran kalimat yang dipendekkan.",
      },
      {
        id: "sMsNh3oPPTg",
        show: "Dr. STONE",
        title: "Episode 1 lengkap: Stone World",
        channel: "TOHO animation チャンネル",
        kind: "Anime",
        length: "24:05",
        level: "Menengah",
        tip: "Episode penuh resmi. Pakai jeda otomatis 8 detik untuk shadowing, dan catat ungkapan dari daftar di atas yang berhasil kamu tangkap.",
      },
    ],
  },

  korea: {
    label: "Belajar dari Drakor",
    media: "drama Korea dan animasi",
    intro:
      "Drama Korea berpindah-pindah antara bahasa akrab (반말) dan bahasa sopan (존댓말) tergantung siapa yang bicara. Perhatikan akhiran 요 dan 습니다: dari situ terlihat hubungan antartokoh.",
    scenes: [
      {
        id: "kafe",
        title: "Kencan di kafe",
        genre: "Komedi romantis",
        setting: "Kafe kecil di Seoul, hujan rintik-rintik.",
        cast: ["Minjun", "Jiyeon"],
        lines: `
A|늦어서 미안해!|neujeoseo mianhae!|Maaf aku terlambat!|미안해: maaf (akrab)
B|괜찮아. 나도 방금 왔어.|gwaenchana. nado banggeum wasseo.|Tidak apa-apa. Aku juga baru datang.|
A|진짜? 다행이다.|jinjja? dahaengida.|Serius? Syukurlah.|
B|근데 오빠, 그 꽃은 뭐야?|geunde oppa, geu kkocheun mwoya?|Tapi, Oppa, bunga itu apa?|오빠: panggilan perempuan untuk laki-laki yang lebih tua
A|너 주려고 샀어.|neo juryeogo sasseo.|Aku beli untuk kamu.|
B|대박! 고마워!|daebak! gomawo!|Wah, keren! Makasih!|`,
      },
      {
        id: "kantor",
        title: "Tenggat di kantor",
        genre: "Drama kantor",
        setting: "Ruang tim pemasaran, pukul enam sore.",
        cast: ["Ketua tim Park", "Seojun"],
        lines: `
A|서준 씨, 보고서 다 됐어요?|Seojun ssi, bogoseo da dwaesseoyo?|Seojun, laporannya sudah selesai?|씨: sapaan sopan setelah nama
B|죄송합니다, 아직이요.|joesonghamnida, ajigiyo.|Maaf, belum.|죄송합니다: maaf (formal)
A|오늘까지 꼭 끝내 주세요.|oneulkkaji kkok kkeunnae juseyo.|Tolong pastikan selesai hari ini.|
B|네, 알겠습니다!|ne, algetseumnida!|Baik, saya mengerti!|
A|힘내요. 화이팅!|himnaeyo. hwaiting!|Semangat. Fighting!|
B|감사합니다, 팀장님.|gamsahamnida, timjangnim.|Terima kasih, Pak Ketua Tim.|님: akhiran penghormatan untuk jabatan`,
      },
    ],
    expressions: `
대박|daebak|Keren banget! atau Luar biasa!|Juga dipakai saat kaget.
진짜?|jinjja?|Serius? Beneran?|Sopan: 진짜요?
괜찮아|gwaenchana|Tidak apa-apa|Sopan: 괜찮아요.
미안해|mianhae|Maaf (akrab)|Formal: 죄송합니다.
오빠 / 언니|oppa / eonni|kakak laki-laki / kakak perempuan|Dipakai penutur perempuan. Penutur laki-laki memakai 형 dan 누나.
화이팅|hwaiting|Semangat!|Dari kata bahasa Inggris "fighting".
알겠습니다|algetseumnida|Saya mengerti|Formal, sering terdengar di kantor dan militer.
어떡해|eotteokae|Bagaimana ini?!|Diucapkan saat panik atau sedih.`,
    clips: [
      {
        id: "wqS05l4jxeo",
        show: "Pororo",
        title: "Kumpulan cerita Pororo tentang kebiasaan baik",
        channel: "뽀로로 (Pororo)",
        kind: "Animasi",
        length: "1:42:12",
        level: "Pemula",
        tip: "Bahasa anak-anak yang jelas dan lambat. Ambil satu cerita saja per hari dan ulangi kalimat yang kamu kenali.",
      },
      {
        id: "psuFRpQtGCo",
        show: "What's Wrong with Secretary Kim",
        title: "Klip episode 6",
        channel: "tvN DRAMA",
        kind: "Drama",
        length: "1:21",
        level: "Menengah",
        tip: "Klip pendek drama tvN. Dengarkan perpindahan bahasa akrab dan sopan antartokoh.",
      },
    ],
  },

  mandarin: {
    label: "Belajar dari Donghua",
    media: "donghua (animasi Tiongkok) dan kartun",
    intro:
      "Donghua silat dan fantasi (xianxia) penuh sapaan guru-murid dan ungkapan semangat. Video resmi Tiongkok hampir selalu memakai subtitle aksara Han, jadi sekalian latihan membaca.",
    scenes: [
      {
        id: "perguruan",
        title: "Murid yang tidak sabar",
        genre: "Xianxia",
        setting: "Halaman perguruan di atas gunung berkabut.",
        cast: ["Xiao Lin", "Guru"],
        lines: `
A|师父，我准备好了！|shīfu, wǒ zhǔnbèi hǎo le!|Guru, saya sudah siap!|师父: guru silat atau guru keterampilan
B|别急。先把基本功练好。|bié jí. xiān bǎ jīběngōng liàn hǎo.|Jangan terburu-buru. Kuasai dulu dasar-dasarnya.|
A|可是我已经练了三年了！|kěshì wǒ yǐjīng liàn le sān nián le!|Tapi saya sudah berlatih tiga tahun!|
B|三年？还差得远呢。|sān nián? hái chà de yuǎn ne.|Tiga tahun? Masih jauh.|
A|好吧……我一定会努力的！|hǎo ba…… wǒ yídìng huì nǔlì de!|Baiklah... saya pasti akan berusaha!|
B|这才像话。|zhè cái xiànghuà.|Nah, begitu baru benar.|`,
      },
      {
        id: "kelas",
        title: "PR yang hilang",
        genre: "Kartun sekolah",
        setting: "Ruang kelas sebelum pelajaran dimulai.",
        cast: ["Xiaomei", "Daming"],
        lines: `
A|你怎么了？|nǐ zěnme le?|Kamu kenapa?|
B|我的作业不见了！|wǒ de zuòyè bú jiàn le!|PR-ku hilang!|不见了: hilang, tidak kelihatan
A|别担心，我帮你找。|bié dānxīn, wǒ bāng nǐ zhǎo.|Jangan khawatir, aku bantu cari.|
B|太好了，谢谢你！|tài hǎo le, xièxie nǐ!|Bagus sekali, terima kasih!|
A|哎呀，在你书包里呢！|āiyā, zài nǐ shūbāo lǐ ne!|Aduh, ternyata di tasmu!|
B|真的吗？我太粗心了。|zhēn de ma? wǒ tài cūxīn le.|Beneran? Aku ceroboh sekali.|`,
      },
    ],
    expressions: `
加油|jiāyóu|Semangat!|Harfiah: tambah minyak.
哎呀|āiyā|Aduh! atau Astaga!|
没事|méi shì|Tidak apa-apa|
真的吗？|zhēn de ma?|Beneran?|
别急|bié jí|Sabar, jangan terburu-buru|
厉害|lìhai|Hebat!|Sering: 好厉害！
师父 / 师兄|shīfu / shīxiōng|guru / kakak seperguruan|Sangat sering di donghua silat.
怎么办？|zěnme bàn?|Bagaimana ini?|`,
    clips: [
      {
        id: "qgpFNSgoMJk",
        show: "Peppa Pig (小猪佩奇)",
        title: "Musim 1, episode 40 sampai 52",
        channel: "小猪佩奇 中文官方 - Peppa Pig",
        kind: "Kartun",
        length: "59:32",
        level: "Pemula",
        tip: "Episode sekitar lima menit dengan kalimat pendek. Cocok untuk latihan nada.",
      },
      {
        id: "lCG3B9M461k",
        show: "剑来 (The Swords)",
        title: "Donghua xianxia, episode 1",
        channel: "腾讯视频 - 动漫",
        kind: "Donghua",
        length: "26:17",
        level: "Menengah",
        tip: "Donghua resmi Tencent dengan subtitle Han. Jeda di setiap kalimat dan coba baca subtitlenya sebelum suaranya selesai.",
      },
    ],
  },

  arab: {
    label: "Belajar dari Anime dubbing Arab",
    media: "anime dubbing Spacetoon",
    intro:
      "Anime yang didubbing Spacetoon memakai bahasa Arab fusha, ragam baku yang sama dengan yang dipelajari di situs ini. Karena itu kartun Spacetoon menjadi bahan dengar favorit pelajar bahasa Arab di seluruh dunia.",
    scenes: [
      {
        id: "bola",
        title: "Gol penentuan",
        genre: "Anime olahraga",
        setting: "Menit terakhir final turnamen sekolah.",
        cast: ["Sami", "Yasir"],
        lines: `
A|هيا يا ياسر، مرر الكرة!|hayyā yā Yāsir, marrir al-kura!|Ayo, Yasir, oper bolanya!|يا: partikel panggilan
B|انتبه! المدافع خلفك!|intabih! al-mudāfiʿ khalfak!|Awas! Bek ada di belakangmu!|
A|لا تقلق، سأسجل هدفا!|lā taqlaq, sa-usajjilu hadafan!|Jangan khawatir, aku akan mencetak gol!|سـ: akan
B|رائع! هدف!|rāʾiʿ! hadaf!|Hebat! Gol!|
A|لولاك لما فزنا يا صديقي.|lawlāka la-mā fuznā yā ṣadīqī.|Kalau bukan karenamu, kita tidak akan menang, kawan.|
B|نحن فريق واحد!|naḥnu farīq wāḥid!|Kita satu tim!|`,
      },
      {
        id: "petualangan",
        title: "Suara di dalam gua",
        genre: "Anime petualangan",
        setting: "Gua gelap di tepi hutan.",
        cast: ["Laila", "Umar"],
        lines: `
A|ما هذا الصوت؟|mā hādhā aṣ-ṣawt?|Suara apa ini?|
B|لا أعرف... لنقترب بهدوء.|lā aʿrif... li-naqtarib bi-hudūʾ.|Tidak tahu... ayo mendekat pelan-pelan.|
A|أنا خائفة قليلا.|anā khāʾifa qalīlan.|Aku sedikit takut.|خائفة: bentuk perempuan
B|لا تخافي، أنا معك.|lā takhāfī, anā maʿaki.|Jangan takut, aku bersamamu.|لا تخافي: larangan untuk perempuan
A|انظر! إنه قط صغير!|unẓur! innahu qiṭṭ ṣaghīr!|Lihat! Itu kucing kecil!|
B|يا لها من مغامرة!|yā lahā min mughāmara!|Petualangan yang luar biasa!|`,
      },
    ],
    expressions: `
هيا|hayyā|Ayo!|
انتبه|intabih|Awas! Hati-hati!|Untuk perempuan: انتبهي
لا تقلق|lā taqlaq|Jangan khawatir|Untuk perempuan: لا تقلقي
رائع|rāʾiʿ|Hebat! Luar biasa!|
يا صديقي|yā ṣadīqī|wahai kawanku|
لولاك|lawlāka|kalau bukan karenamu|
يا إلهي|yā ilāhī|Ya Tuhan!|Ungkapan kaget.
مستحيل!|mustaḥīl!|Mustahil! Tidak mungkin!|`,
    clips: [
      {
        id: "s0hlNoa6vII",
        show: "Dragon Ball Super (دراغون بول سوبر)",
        title: "Vegeta mencoba memasak",
        channel: "Spacetoon",
        kind: "Anime dubbing",
        length: "1:07",
        level: "Menengah",
        tip: "Klip pendek dubbing fusha. Dengarkan bentuk perintah dan kata ganti.",
      },
      {
        id: "eqt4UU3NfiA",
        show: "Captain Majed (الكابتن ماجد)",
        title: "Kenangan Spacetoon: Kapten Majed",
        channel: "Spacetoon",
        kind: "Anime dubbing",
        length: "1:03",
        level: "Pemula",
        tip: "Anime sepak bola legendaris versi Arab. Cocok dipasangkan dengan adegan Gol penentuan di atas.",
      },
    ],
  },

  jerman: {
    label: "Belajar dari Kartun",
    media: "kartun dan serial animasi",
    intro:
      "Kartun berbahasa Jerman memakai kalimat sehari-hari yang jelas, lengkap dengan seruan khas seperti Mist! dan Los geht's! yang jarang muncul di buku pelajaran.",
    scenes: [
      {
        id: "belanja",
        title: "Es krim setelah belanja",
        genre: "Kartun keluarga",
        setting: "Supermarket pada Sabtu pagi.",
        cast: ["Lena", "Papa"],
        lines: `
A|Papa, darf ich ein Eis haben?||Papa, boleh aku minta es krim?|darf ich …?: bolehkah aku …?
B|Erst nach dem Einkaufen.||Nanti setelah belanja.|
A|Och, menno!||Yah, sebal!|Seruan kesal khas anak-anak
B|Hilfst du mir? Wir brauchen Milch und Brot.||Mau bantu Papa? Kita perlu susu dan roti.|
A|Klar! Ich hole die Milch.||Tentu! Aku ambil susunya.|
B|Super, danke!||Hebat, makasih!|`,
      },
      {
        id: "petualangan",
        title: "Peta yang tertinggal",
        genre: "Serial petualangan",
        setting: "Pintu masuk hutan, menjelang senja.",
        cast: ["Max", "Mia"],
        lines: `
A|Los geht's!||Ayo berangkat!|
B|Warte mal! Hast du die Karte?||Tunggu dulu! Kamu bawa petanya?|
A|Mist, die habe ich vergessen.||Sial, aku lupa.|Mist: umpatan ringan, aman untuk anak-anak
B|Na toll. Und jetzt?||Bagus sekali. Lalu sekarang bagaimana?|Na toll di sini bernada sindiran
A|Keine Panik, ich kenne den Weg.||Jangan panik, aku tahu jalannya.|
B|Na gut, ich vertraue dir.||Ya sudah, aku percaya padamu.|`,
      },
    ],
    expressions: `
Los geht's!||Ayo mulai! Ayo berangkat!|
Warte mal!||Tunggu dulu!|
Mist!||Sial!|Umpatan ringan.
Na toll.||Bagus sekali (sindiran)|Nadanya datar dan kesal.
Keine Panik!||Jangan panik!|
Klar!||Tentu!|
Echt?||Serius? Beneran?|
Genau!||Betul! Tepat!|`,
    clips: [
      {
        id: "-Zro_MYnckw",
        show: "Peppa Wutz",
        title: "Belanja dan cerita lainnya",
        channel: "Peppa Pig Deutsch - Offizieller Kanal",
        kind: "Kartun",
        length: "14:03",
        level: "Pemula",
        tip: "Tema belanja cocok dengan adegan di atas. Hitung berapa kali kamu mendengar kata yang sudah dipelajari.",
      },
      {
        id: "7uBzGzzJmxo",
        show: "Miraculous",
        title: "Episode lengkap: Jagged Stone",
        channel: "MIRACULOUS - Geschichten von Ladybug und Cat Noir",
        kind: "Animasi",
        length: "41:48",
        level: "Menengah",
        tip: "Animasi bergaya anime dengan dubbing Jerman. Pakai kecepatan 0,75× untuk dialog cepat.",
      },
    ],
  },

  prancis: {
    label: "Belajar dari Animasi",
    media: "animasi Prancis",
    intro:
      "Prancis adalah salah satu produsen animasi terbesar di dunia, termasuk Miraculous yang bergaya anime. Bahasa lisannya sering menghilangkan ne dalam kalimat negatif dan penuh seruan seperti Oh là là! dan Trop bien!",
    scenes: [
      {
        id: "terlambat",
        title: "Bus pukul tujuh",
        genre: "Animasi remaja",
        setting: "Halte bus di Paris, pagi hari.",
        cast: ["Lou", "Hugo"],
        lines: `
A|Oh là là, je suis en retard !||Aduh, aku terlambat!|
B|Encore ? Dépêche-toi !||Lagi? Cepatlah!|
A|Attends-moi !||Tunggu aku!|
B|Allez, on y va !||Ayo, kita berangkat!|on: kita (lisan)
A|Trop bien, on est à l'heure !||Keren, kita tepat waktu!|trop: sangat (gaul)
B|Ouf ! Heureusement.||Fiuh! Untunglah.|`,
      },
      {
        id: "pahlawan",
        title: "Pahlawan di atap",
        genre: "Animasi pahlawan super",
        setting: "Atap gedung saat malam, ada penjahat di bawah.",
        cast: ["Inès", "Malik"],
        lines: `
A|Attention, derrière toi !||Awas, di belakangmu!|
B|Pas de panique, je m'en occupe.||Jangan panik, biar aku yang urus.|
A|Tu es sûr ?||Kamu yakin?|
B|Fais-moi confiance !||Percayalah padaku!|
A|Bravo ! Tu l'as fait !||Hebat! Kamu berhasil!|
B|On forme une super équipe.||Kita tim yang hebat.|`,
      },
    ],
    expressions: `
Oh là là !||Aduh! Astaga!|Bisa kaget, kagum, atau kesal.
Allez !||Ayo!|
On y va !||Ayo berangkat!|
Attention !||Awas!|
Pas de panique !||Jangan panik!|
Trop bien !||Keren banget!|Gaul. Juga: Trop cool !
Ouf !||Fiuh!|Lega.
C'est pas vrai !||Tidak mungkin!|Lisan, tanpa ne.`,
    clips: [
      {
        id: "V4GGwoPveZ4",
        show: "Peppa Pig",
        title: "Peppa bermain gelembung sabun",
        channel: "Peppa Pig Français - Chaîne Officielle",
        kind: "Kartun",
        length: "4:38",
        level: "Pemula",
        tip: "Satu episode penuh dalam lima menit. Tonton tanpa subtitle dulu, lalu dengan subtitle Prancis bila tersedia.",
      },
      {
        id: "62kApgWkc_8",
        show: "Miraculous",
        title: "Musim 1, episode 1: Climatika",
        channel: "MIRACULOUS - Les aventures de Ladybug et Chat Noir",
        kind: "Animasi",
        length: "20:42",
        level: "Menengah",
        tip: "Versi asli Prancis. Dengarkan seruan dari daftar di atas yang muncul di adegan aksi.",
      },
    ],
  },

  spanyol: {
    label: "Belajar dari Kartun dan Telenovela",
    media: "kartun dan telenovela",
    intro:
      "Telenovela terkenal dengan dialog dramatis yang diucapkan jelas dan berulang, cocok untuk latihan mendengar. Kartun Amerika Latin memakai ustedes, bukan vosotros, dan beberapa kata gaul berbeda dari Spanyol.",
    scenes: [
      {
        id: "telenovela",
        title: "Rahasia terbongkar",
        genre: "Telenovela",
        setting: "Ruang tamu sebuah hacienda, malam hari.",
        cast: ["Lucía", "Diego"],
        lines: `
A|¿Qué haces aquí?||Sedang apa kamu di sini?|
B|Tenemos que hablar.||Kita harus bicara.|Kalimat paling klise di telenovela
A|No quiero escucharte.||Aku tidak mau mendengarmu.|
B|Por favor, déjame explicarte.||Tolong, biarkan aku menjelaskan.|
A|¡No puede ser! ¿Me mentiste?||Tidak mungkin! Kamu membohongiku?|
B|Lo siento mucho, de verdad.||Aku benar-benar minta maaf.|`,
      },
      {
        id: "keluarga",
        title: "Ke taman setelah beres-beres",
        genre: "Kartun keluarga",
        setting: "Rumah pada Minggu pagi.",
        cast: ["Sofía", "Mamá"],
        lines: `
A|Mamá, ¿puedo ir al parque?||Ma, boleh aku ke taman?|
B|Primero, recoge tu cuarto.||Bereskan kamarmu dulu.|
A|¡Ay, qué aburrido!||Aduh, membosankan!|
B|Venga, te ayudo.||Ayo, Mama bantu.|Venga (Spanyol); di Amerika Latin: Dale
A|¡Listo! ¿Ya nos vamos?||Beres! Kita berangkat sekarang?|
B|¡Vamos!||Ayo!|`,
      },
    ],
    expressions: `
¡No puede ser!||Tidak mungkin!|
Tenemos que hablar.||Kita harus bicara.|
¡Vamos!||Ayo!|
¡Ay!||Aduh!|
¿En serio?||Serius?|
Lo siento.||Maaf.|
¡Qué padre! / ¡Qué guay!||Keren!|Padre di Meksiko, guay di Spanyol.
¡Dios mío!||Ya Tuhan!|`,
    clips: [
      {
        id: "jiKTS_0f4Ew",
        show: "Peppa Pig",
        title: "Peppa dan seruling: konser mini",
        channel: "Peppa Pig Español Latino - Canal Oficial",
        kind: "Kartun",
        length: "35:55",
        level: "Pemula",
        tip: "Dubbing Amerika Latin. Bandingkan pengucapan s dan z dengan Spanyol: di Amerika Latin keduanya berbunyi s.",
      },
    ],
  },

  rusia: {
    label: "Belajar dari Multfilm",
    media: "multfilm (kartun Rusia)",
    intro:
      "Multfilm Rusia, dari Ну, погоди! zaman Soviet sampai Маша и Медведь, dikenal di seluruh dunia. Dialognya pendek dan ekspresif, cocok untuk melatih intonasi dan bentuk perintah.",
    scenes: [
      {
        id: "petak-umpet",
        title: "Petak umpet di hutan",
        genre: "Multfilm anak",
        setting: "Tepi hutan birch, musim panas.",
        cast: ["Dasha", "Misha"],
        lines: `
A|Привет! Давай играть!|privet! davay igrat'!|Hai! Ayo main!|Давай + infinitif: ayo …
B|Давай! Во что?|davay! vo chto?|Ayo! Main apa?|
A|В прятки! Ты водишь.|v pryatki! ty vodish'.|Petak umpet! Kamu yang jaga.|
B|Раз, два, три... Я иду искать!|raz, dva, tri... ya idu iskat'!|Satu, dua, tiga... Aku datang mencari!|Kalimat wajib dalam petak umpet
A|Ой, нашёл!|oy, nashyol!|Aduh, ketemu!|
B|Ура! Теперь ты водишь!|ura! teper' ty vodish'!|Hore! Sekarang kamu yang jaga!|`,
      },
      {
        id: "nenek",
        title: "Sup buatan nenek",
        genre: "Multfilm keluarga",
        setting: "Rumah kayu di desa, siang hari.",
        cast: ["Nenek", "Vanya"],
        lines: `
A|Ваня, иди обедать!|Vanya, idi obedat'!|Vanya, ayo makan siang!|
B|Сейчас, бабушка!|seychas, babushka!|Sebentar, Nek!|Сейчас: sekarang, juga berarti sebentar
A|Суп остывает!|sup ostyvayet!|Supnya keburu dingin!|
B|Иду, иду! Ммм, как вкусно!|idu, idu! mmm, kak vkusno!|Iya, iya! Mmm, enak sekali!|
A|Кушай на здоровье.|kushay na zdorov'ye.|Makanlah, semoga sehat.|Ungkapan khas tuan rumah
B|Спасибо, бабушка!|spasibo, babushka!|Terima kasih, Nek!|`,
      },
    ],
    expressions: `
Давай!|davay!|Ayo!|
Ой!|oy!|Aduh! Ups!|
Ура!|ura!|Hore!|
Ну, погоди!|nu, pogodi!|Awas kau, ya!|Judul multfilm Soviet paling terkenal.
Сейчас!|seychas!|Sebentar!|
Молодец!|molodets!|Pintar! Bagus!|Pujian untuk orang yang berhasil.
На здоровье|na zdorov'ye|Silakan, semoga sehat|Jawaban saat orang berterima kasih atas makanan.
Ничего себе!|nichego sebe!|Wah, luar biasa!|`,
    clips: [
      {
        id: "GJ0ahRt0JIc",
        show: "Маша и Медведь",
        title: "Terbang melintasi Sankt Peterburg",
        channel: "Маша и Медведь",
        kind: "Multfilm",
        length: "0:30",
        level: "Pemula",
        tip: "Hanya 30 detik. Putar ulang sampai kamu bisa menirukan intonasi Masha.",
      },
      {
        id: "_-timwx6YeM",
        show: "Маша и Медведь",
        title: "Seri baru: teman baru",
        channel: "Маша и Медведь",
        kind: "Multfilm",
        length: "59:23",
        level: "Menengah",
        tip: "Kumpulan episode resmi. Pilih satu episode, pakai jeda otomatis, dan tirukan setiap kalimat Masha.",
      },
    ],
  },

  italia: {
    label: "Belajar dari Kartun",
    media: "kartun dan animasi",
    intro:
      "Bahasa Italia lisan penuh seruan dan gerak tangan. Kartun membantu mendengar intonasi naik turun yang khas, serta ungkapan seperti Dai! dan Mamma mia! yang dipakai setiap hari.",
    scenes: [
      {
        id: "dapur",
        title: "Lasagna nenek",
        genre: "Kartun keluarga",
        setting: "Dapur rumah di Bologna, hari Minggu.",
        cast: ["Nonna", "Luca"],
        lines: `
A|Luca, a tavola!||Luca, ayo ke meja makan!|
B|Arrivo! Cosa c'è oggi?||Aku datang! Hari ini ada apa?|
A|Lasagne fatte in casa.||Lasagna buatan sendiri.|
B|Che buono! Sei la migliore, nonna!||Enaknya! Nenek yang terbaik!|
A|Mangia, mangia!||Makan, makan!|Diucapkan nenek Italia di mana pun
B|Basta, sono pieno!||Cukup, aku kenyang!|`,
      },
      {
        id: "bioskop",
        title: "Kunci yang hilang",
        genre: "Komedi",
        setting: "Depan pintu apartemen, lima menit sebelum film mulai.",
        cast: ["Giulia", "Marco"],
        lines: `
A|Dai, sbrigati! Il film comincia tra cinque minuti.||Ayo, cepat! Filmnya mulai lima menit lagi.|
B|Un attimo! Non trovo le chiavi.||Sebentar! Aku tidak menemukan kunci.|
A|Mamma mia, ogni volta la stessa storia!||Astaga, setiap kali sama saja!|
B|Eccole! Andiamo.||Ini dia! Ayo berangkat.|Ecco + le: ini dia (kuncinya)
A|Finalmente!||Akhirnya!|
B|Che figata, siamo in tempo!||Keren, kita tepat waktu!|Che figata: gaul anak muda`,
      },
    ],
    expressions: `
Dai!||Ayo!|Juga untuk menyemangati.
Mamma mia!||Astaga!|
Un attimo!||Sebentar!|
Che buono!||Enak sekali!|
Basta!||Cukup!|
Andiamo!||Ayo pergi!|
Che figata!||Keren banget!|Gaul.
Magari!||Andai saja! Semoga!|`,
    clips: [
      {
        id: "DDey8zqAyOk",
        show: "Peppa Pig",
        title: "Taman petualangan dan episode lainnya",
        channel: "Peppa Pig Italiano - Canale Ufficiale",
        kind: "Kartun",
        length: "1:02:53",
        level: "Pemula",
        tip: "Episode pendek beruntun. Fokus pada kata kerja yang diulang-ulang.",
      },
      {
        id: "tcSfiei9Cac",
        show: "Miraculous",
        title: "Musim 5, episode 1: Evoluzione",
        channel: "MIRACULOUS - Le storie di Ladybug e Chat Noir",
        kind: "Animasi",
        length: "21:25",
        level: "Menengah",
        tip: "Dubbing Italia untuk animasi bergaya anime. Catat seruan yang kamu tangkap.",
      },
    ],
  },

  thai: {
    label: "Belajar dari Lakorn dan Kartun",
    media: "lakorn (drama Thai) dan kartun",
    intro:
      "Lakorn dan serial Thai memperlihatkan partikel sopan ครับ/ค่ะ dan kata akhir seperti นะ dan เหรอ yang memberi warna pada kalimat. Dari situ terdengar siapa yang lebih tua dan seberapa akrab mereka.",
    scenes: [
      {
        id: "teman",
        title: "Tidak diajak makan",
        genre: "Lakorn remaja",
        setting: "Kantin kampus di Bangkok.",
        cast: ["Nam", "Ton"],
        lines: `
A|ต้น! ไปไหนมา|Ton! pai nai ma?|Ton! Dari mana saja?|Sapaan akrab, bukan pertanyaan sungguhan
B|ไปกินข้าวมาครับ|pai kin khao ma khrap.|Habis makan.|ครับ: partikel sopan penutur laki-laki
A|ไม่ชวนเลยอะ|mai chuan loei a.|Kok nggak ngajak sih.|
B|ขอโทษครับ คราวหน้าไปด้วยกันนะ|khothot khrap, khrao na pai duai kan na.|Maaf, lain kali kita pergi bareng ya.|
A|สัญญานะ|sanya na.|Janji, ya.|
B|สัญญาครับ|sanya khrap.|Janji.|`,
      },
      {
        id: "rumah",
        title: "PR untuk besok",
        genre: "Kartun keluarga",
        setting: "Ruang keluarga, malam hari.",
        cast: ["Ibu", "Phum"],
        lines: `
A|ภูมิ ทำการบ้านเสร็จหรือยัง|Phum, tham kan ban set rue yang?|Phum, PR-mu sudah selesai belum?|
B|ยังเลยครับแม่|yang loei khrap mae.|Belum, Bu.|
A|ตายแล้ว พรุ่งนี้ต้องส่งไม่ใช่เหรอ|tai laeo! phrung ni tong song mai chai roe?|Astaga! Bukannya besok harus dikumpulkan?|ตายแล้ว: astaga (harfiah: sudah mati)
B|ไม่เป็นไรครับ เดี๋ยวทำเลย|mai pen rai khrap, diao tham loei.|Tidak apa-apa, Bu, sebentar lagi langsung kukerjakan.|
A|เร็วๆ นะลูก|reo reo na luk.|Cepat ya, Nak.|
B|ครับผม|khrap phom.|Baik, Bu.|Jawaban patuh khas anak laki-laki`,
      },
    ],
    expressions: `
ไม่เป็นไร|mai pen rai|Tidak apa-apa|Ungkapan paling Thai.
ตายแล้ว!|tai laeo!|Astaga!|
จริงเหรอ?|ching roe?|Beneran?|
สู้ๆ|su su|Semangat!|
ใจเย็นๆ|chai yen yen|Tenang, sabar|Harfiah: hati dingin.
อะไรเนี่ย|arai nia|Apa-apaan ini?|
เดี๋ยว|diao|Sebentar|
ครับ / ค่ะ|khrap / kha|partikel sopan (laki-laki / perempuan)|`,
    clips: [
      {
        id: "3qsJr6RYvAc",
        show: "ปังปอนด์ (PangPond)",
        title: "Episode 1: Teman baru dari luar angkasa",
        channel: "Vtoon (Vithita Animation)",
        kind: "Kartun",
        length: "8:41",
        level: "Pemula",
        tip: "Kartun anak Thai yang klasik dengan subtitle Inggris. Dengarkan partikel di akhir kalimat.",
      },
      {
        id: "4qddiDshQO0",
        show: "Cooking Crush",
        title: "Episode 1, bagian 1",
        channel: "GMMTV OFFICIAL",
        kind: "Lakorn",
        length: "15:03",
        level: "Menengah",
        tip: "Serial resmi GMMTV dengan subtitle Inggris. Perhatikan kapan tokoh memakai ครับ/ค่ะ dan kapan tidak.",
      },
    ],
  },

  hindi: {
    label: "Belajar dari Kartun dan Bollywood",
    media: "kartun India dan film Bollywood",
    intro:
      "Film dan kartun India memakai bahasa Hindi lisan yang bercampur kata Urdu dan Inggris. Seruan seperti अरे, अच्छा, dan यार muncul hampir di setiap adegan.",
    scenes: [
      {
        id: "stasiun",
        title: "Pengakuan di stasiun",
        genre: "Bollywood",
        setting: "Peron stasiun Mumbai, kereta hampir berangkat.",
        cast: ["Rahul", "Priya"],
        lines: `
A|प्रिया, रुको!|Priyā, ruko!|Priya, tunggu!|
B|अब क्या है, राहुल?|ab kyā hai, Rāhul?|Ada apa lagi, Rahul?|
A|मुझे तुमसे कुछ कहना है।|mujhe tumse kuchh kahnā hai.|Aku ingin mengatakan sesuatu padamu.|
B|जल्दी बोलो, मेरी ट्रेन छूट जाएगी।|jaldī bolo, merī ṭren chhūṭ jāegī.|Cepat bilang, keretaku nanti ketinggalan.|
A|मैं तुमसे प्यार करता हूँ।|maiṃ tumse pyār kartā hūṃ.|Aku mencintaimu.|Kalimat paling terkenal di Bollywood
B|सच में? पागल हो क्या!|sach meṃ? pāgal ho kyā!|Serius? Kamu gila, ya!|Diucapkan sambil tersenyum`,
      },
      {
        id: "nenek",
        title: "Ladoo dari nenek",
        genre: "Kartun keluarga",
        setting: "Dapur rumah, sore hari.",
        cast: ["Binu", "Nenek"],
        lines: `
A|दादी, भूख लगी है!|dādī, bhūkh lagī hai!|Nek, aku lapar!|
B|अरे, अभी तो खाना खाया था!|are, abhī to khānā khāyā thā!|Lho, tadi kan baru makan!|
A|वो तो सुबह था।|vo to subah thā.|Itu kan tadi pagi.|
B|अच्छा, अच्छा, लड्डू ले लो।|achchhā, achchhā, laḍḍū le lo.|Iya, iya, ambil ladoo-nya.|
A|वाह! आप सबसे अच्छी हैं!|vāh! āp sabse achchhī haiṃ!|Wah! Nenek yang terbaik!|
B|बस, ज़्यादा मत खाना।|bas, zyādā mat khānā.|Sudah, jangan makan terlalu banyak.|`,
      },
    ],
    expressions: `
अरे|are|Eh! Lho!|Seruan kaget atau menegur.
अच्छा|achchhā|Oh, begitu. Oke.|Juga berarti baik.
चलो|calo|Ayo!|
सच में?|sach meṃ?|Beneran?|
यार|yār|bro, kawan|Akrab dan santai.
वाह!|vāh!|Wah!|Kagum.
बस|bas|Cukup, sudah|
क्या बात है!|kyā bāt hai!|Keren! Hebat!|Pujian.`,
    clips: [
      {
        id: "3lYcfd3jwno",
        show: "Chhota Bheem (छोटा भीम)",
        title: "Sekolah yang menyenangkan",
        channel: "Green Gold TV - Official Channel",
        kind: "Kartun",
        length: "28:24",
        level: "Pemula",
        tip: "Kartun India paling populer. Kalimatnya pendek dan diulang, cocok untuk latihan mendengar.",
      },
    ],
  },

  inggris: {
    label: "Belajar dari Kartun dan Serial",
    media: "kartun dan serial animasi",
    intro:
      "Serial animasi berbahasa Inggris memakai bahasa lisan dengan banyak bentuk singkat (I've, let's, gonna) dan ungkapan yang jarang diajarkan di kelas. Avatar: The Last Airbender, yang bergaya anime, dan Peppa Pig berbahasa Inggris Britania adalah titik awal yang bagus.",
    scenes: [
      {
        id: "petualangan",
        title: "Lolos dari reruntuhan",
        genre: "Animasi petualangan",
        setting: "Kuil tua yang mulai runtuh.",
        cast: ["Kai", "Nora"],
        lines: `
A|Watch out!||Awas!|
B|Whoa, that was close!||Wah, hampir saja!|
A|Are you okay?||Kamu baik-baik saja?|
B|I'm fine. Let's get out of here!||Aku baik. Ayo pergi dari sini!|
A|Hold on, I've got an idea.||Tunggu, aku punya ide.|I've got = I have (lisan)
B|Seriously? Now?||Serius? Sekarang?|`,
      },
      {
        id: "taman",
        title: "Ke taman saat hujan",
        genre: "Kartun keluarga",
        setting: "Rumah pada sore yang mendung.",
        cast: ["Emma", "Dad"],
        lines: `
A|Daddy, can we go to the park?||Ayah, boleh kita ke taman?|
B|Maybe later, sweetheart.||Mungkin nanti, sayang.|
A|Pleeease?||Pleeease?|Memanjangkan please saat merengek
B|Oh, all right. Get your boots on!||Oh, baiklah. Pakai sepatu botmu!|
A|Hooray!||Hore!|
B|Don't forget your coat. It's chilly outside.||Jangan lupa mantelmu. Di luar dingin.|chilly: dingin (agak)`,
      },
    ],
    expressions: `
Watch out!||Awas!|
That was close!||Hampir saja!|
Let's go! / Come on!||Ayo!|
Hold on.||Tunggu sebentar.|
No way!||Tidak mungkin!|
Seriously?||Serius?|
Awesome!||Keren!|
I've got this.||Aku bisa menangani ini.|`,
    clips: [
      {
        id: "10Oe0BneEwc",
        show: "Avatar: The Last Airbender",
        title: "Episode lengkap: The Puppetmaster",
        channel: "Nickelodeon UK",
        kind: "Animasi",
        length: "22:51",
        level: "Menengah",
        tip: "Serial bergaya anime dengan bahasa Inggris Amerika yang jelas. Coba tonton dengan subtitle Inggris, jangan Indonesia.",
      },
      {
        id: "9qShcQMq1cA",
        show: "Peppa Pig",
        title: "Kumpulan episode resmi",
        channel: "Peppa Pig - Official Channel",
        kind: "Kartun",
        length: "2:01:20",
        level: "Pemula",
        tip: "Bahasa Inggris Britania yang lambat dan jelas. Satu episode lima menit sudah cukup untuk satu sesi shadowing.",
      },
    ],
  },
};

const cache: Record<string, MediaPack> = {};
export function mediaFor(slug: string): MediaPack | null {
  if (!RAW[slug]) return null;
  return (cache[slug] ??= parse(RAW[slug]));
}
