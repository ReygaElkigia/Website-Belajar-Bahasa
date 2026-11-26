import type { Exam, Question } from "./types";
import { gap, mc } from "./build";

/**
 * HSK 2 sampai 6 (format ujian HSK yang berlaku) dan HSK 7–9 (ujian lanjut
 * berdasarkan standar HSK 3.0). Info format dari Chinese Testing International;
 * soal latihan ditulis sendiri meniru jenis tugas aslinya.
 */

const yesNo = ["Sesuai (✓)", "Tidak sesuai (✗)"];
/** Soal benar/salah (判断对错): `ok` = pernyataan sesuai. */
const tf = (q: { task: string; audio?: string; passage?: string; prompt: string; ok: boolean; explain?: string }): Question => ({
  type: "mc",
  task: q.task,
  audio: q.audio,
  passage: q.passage,
  prompt: q.prompt,
  explain: q.explain,
  options: yesNo,
  answer: q.ok ? 0 : 1,
});

const ORG = "Chinese Testing International (CTI)";
const NOTE =
  "Standar HSK 3.0 (2021) memperbanyak kosakata tiap level, dan CTI menyesuaikan ujian secara bertahap. Selalu periksa format dan daftar kata yang berlaku untuk jadwal ujian Anda di chinesetest.cn.";
const VOCAB = (v2: string, v3: string) => `Kosakata: sekitar ${v2} kata (daftar HSK lama) atau ${v3} kata kumulatif menurut standar HSK 3.0.`;
const src = (n: string) => [
  { label: `Chinese Testing International: HSK ${n}`, url: `https://www.chinesetest.cn/HSK/${n}` },
  { label: "Standar HSK 3.0 (GF 0025-2021)", url: "https://www.chinesetest.cn/" },
];

/* ---------------------------------------------------------------- HSK 2 */

export const hsk2: Exam = {
  id: "hsk-2",
  lang: "mandarin",
  name: "HSK 2",
  fullName: "汉语水平考试 (Hanyu Shuiping Kaoshi) Level 2",
  org: ORG,
  level: "HSK 2 (dasar)",
  about: "Untuk pelajar yang bisa berkomunikasi sederhana dan langsung tentang hal sehari-hari yang sudah dikenal. Soal masih dicetak dengan pinyin.",
  note: NOTE,
  format: [
    { name: "听力 Menyimak", time: "sekitar 25 menit", items: "35 soal, 4 bagian", tasks: "Benar/salah dengan gambar, mencocokkan dialog dan gambar, dialog pendek, dialog lebih panjang" },
    { name: "阅读 Membaca", time: "22 menit", items: "25 soal, 4 bagian", tasks: "Memilih gambar, mengisi kata, benar/salah, mencocokkan kalimat" },
  ],
  scoring: ["Total 60 soal dalam sekitar 55 menit (termasuk 5 menit mengisi data).", "Skor maksimal 200 (100 per bagian); lulus dengan 120.", VOCAB("300", "1.272")],
  tips: ["Soal bergambar di ujian asli diganti pernyataan teks di latihan ini.", "Hafalkan kata keterangan waktu (已经, 正在, 就, 才); sering muncul di bagian mengisi kata."],
  official: { label: "chinesetest.cn", url: "https://www.chinesetest.cn/HSK/2" },
  sources: src("2"),
  parts: [
    {
      id: "listening",
      section: "听力",
      title: "Menyimak",
      instructions: "Dengarkan, lalu jawab.",
      minutes: 4,
      questions: [
        tf({ task: "判断对错", audio: "我每天早上六点起床，然后去跑步。", prompt: "Pernyataan: 他每天早上去跑步。", ok: true }),
        mc({ task: "对话理解", audio: "男：你怎么还不睡觉？女：明天有考试，我想再看一会儿书。", prompt: "女的为什么还不睡觉？", opts: ["明天要考试", "她不累", "她在看电视"] }),
        mc({ task: "对话理解", audio: "女：这件衣服怎么样？男：颜色很好看，但是有点儿贵。女：没关系，我很喜欢，就买这件吧。", prompt: "女的觉得这件衣服怎么样？", opts: ["很喜欢", "太贵了", "颜色不好看"] }),
      ],
    },
    {
      id: "reading",
      section: "阅读",
      title: "Membaca",
      instructions: "Pilih kata atau jawaban yang tepat.",
      minutes: 5,
      questions: [
        mc({ task: "选词填空", prompt: "这个西瓜（　）甜啊！", opts: ["真", "再", "已经", "一起"], explain: "真 + kata sifat + 啊 = sungguh ...!" }),
        tf({ task: "判断对错", passage: "我下午三点要去机场接妹妹，现在已经两点了，我得走了。", prompt: "Pernyataan: ★ 现在是三点。", ok: false, explain: "Sekarang jam dua; jam tiga adalah waktu menjemput." }),
        mc({ task: "句子匹配", prompt: "你什么时候回来？", opts: ["下个星期二。", "我在火车站。", "因为我生病了。", "是我哥哥。"] }),
      ],
    },
  ],
};

/* ---------------------------------------------------------------- HSK 3 */

export const hsk3: Exam = {
  id: "hsk-3",
  lang: "mandarin",
  name: "HSK 3",
  fullName: "汉语水平考试 (Hanyu Shuiping Kaoshi) Level 3",
  org: ORG,
  level: "HSK 3 (dasar atas)",
  about: "Untuk pelajar yang bisa berkomunikasi dalam kehidupan, belajar, dan pekerjaan sehari-hari, termasuk saat bepergian di Tiongkok. Mulai level ini soal tidak lagi memakai pinyin, dan ada bagian menulis.",
  note: NOTE,
  format: [
    { name: "听力 Menyimak", time: "sekitar 35 menit", items: "40 soal, 4 bagian", tasks: "Mencocokkan dialog dan gambar, benar/salah, dialog pendek, dialog panjang" },
    { name: "阅读 Membaca", time: "30 menit", items: "30 soal, 3 bagian", tasks: "Mencocokkan kalimat, mengisi kata, memahami teks pendek" },
    { name: "书写 Menulis", time: "15 menit", items: "10 soal, 2 bagian", tasks: "完成句子 (menyusun kalimat), 写汉字 (menulis hanzi dari pinyin)" },
  ],
  scoring: ["Total 80 soal dalam sekitar 90 menit.", "Skor maksimal 300 (100 per bagian); lulus dengan 180.", VOCAB("600", "2.245")],
  tips: ["Bagian 写汉字 menuntut hanzi ditulis benar. Latih menulis tangan, bukan hanya mengetik pinyin.", "Di 完成句子, temukan dulu predikatnya, lalu letakkan keterangan waktu dan tempat sebelum predikat."],
  official: { label: "chinesetest.cn", url: "https://www.chinesetest.cn/HSK/3" },
  sources: src("3"),
  parts: [
    {
      id: "listening",
      section: "听力",
      title: "Menyimak",
      instructions: "Dengarkan, lalu jawab.",
      minutes: 4,
      questions: [
        tf({ task: "判断对错", audio: "这家饭馆的菜虽然有点儿贵，但是非常好吃，所以每天客人都很多。", prompt: "Pernyataan: ★ 这家饭馆的菜很便宜。", ok: false }),
        mc({ task: "对话", audio: "女：你的自行车呢？男：借给同事了，他的坏了。今天我是走路来的。", prompt: "男的今天是怎么来的？", opts: ["走路", "骑自行车", "坐出租车"] }),
        mc({ task: "对话", audio: "男：喂，小李，会议几点开始？女：本来是九点，现在改成十点了。男：在哪个会议室？女：还是三楼那个。", prompt: "会议几点开始？", opts: ["十点", "九点", "三点"] }),
      ],
    },
    {
      id: "reading",
      section: "阅读",
      title: "Membaca",
      instructions: "Pilih kata atau jawaban yang tepat.",
      minutes: 5,
      questions: [
        mc({ task: "句子匹配", prompt: "你明天能来帮我搬家吗？", opts: ["没问题，你说几点？", "我家在三楼。", "他已经搬走了。"] }),
        mc({ task: "选词填空", prompt: "我们（　）这个周末去爬山，天气预报说是晴天。", opts: ["打算", "认为", "一般", "已经"], explain: "打算 = berencana." }),
        mc({
          task: "阅读理解",
          passage: "小王以前很少运动，身体不太好，经常感冒。去年他开始每天早上跑步，现在不但很少生病，而且比以前更有精神了。",
          prompt: "★ 小王现在：",
          opts: ["身体比以前好", "经常感冒", "不喜欢跑步"],
        }),
      ],
    },
    {
      id: "writing",
      section: "书写",
      title: "Menulis",
      instructions: "Susun kata menjadi kalimat, lalu tulis hanzi yang tepat.",
      minutes: 5,
      questions: [
        { type: "order", task: "完成句子", prompt: "Susun menjadi satu kalimat.", items: ["这本书", "被", "弟弟", "借走了"], joiner: "", explain: "这本书被弟弟借走了。 (Buku ini dipinjam adik.)" },
        { type: "type", task: "写汉字", prompt: "Tulis hanzi untuk pinyin dalam kurung.", display: "今天天气很（lěng），多穿点儿衣服。", answer: "冷", explain: "lěng = 冷 (dingin)." },
        { type: "type", task: "写汉字", prompt: "Tulis hanzi untuk pinyin dalam kurung.", display: "我们一起去看电（yǐng）吧。", answer: "影", explain: "电影 = film." },
      ],
    },
  ],
};

/* ---------------------------------------------------------------- HSK 4 */

export const hsk4: Exam = {
  id: "hsk-4",
  lang: "mandarin",
  name: "HSK 4",
  fullName: "汉语水平考试 (Hanyu Shuiping Kaoshi) Level 4",
  org: ORG,
  level: "HSK 4 (menengah)",
  about: "Untuk pelajar yang bisa membahas berbagai topik dengan cukup lancar dan berkomunikasi dengan penutur asli. Sering menjadi syarat beasiswa kuliah S1 berbahasa Mandarin.",
  note: NOTE,
  format: [
    { name: "听力 Menyimak", time: "sekitar 30 menit", items: "45 soal, 3 bagian", tasks: "Benar/salah, dialog pendek, dialog dan monolog panjang" },
    { name: "阅读 Membaca", time: "40 menit", items: "40 soal, 3 bagian", tasks: "选词填空, 排列顺序 (mengurutkan kalimat), 阅读理解" },
    { name: "书写 Menulis", time: "25 menit", items: "15 soal, 2 bagian", tasks: "完成句子, 看图用词造句 (membuat kalimat dari gambar dan kata)" },
  ],
  scoring: ["Total 100 soal dalam sekitar 105 menit.", "Skor maksimal 300 (100 per bagian); lulus dengan 180.", VOCAB("1.200", "3.245")],
  tips: ["Di 排列顺序, cari kalimat yang punya subjek lengkap: biasanya itu kalimat pertama.", "Kata penghubung berpasangan (虽然…但是, 不但…而且, 因为…所以) adalah petunjuk urutan paling kuat."],
  official: { label: "chinesetest.cn", url: "https://www.chinesetest.cn/HSK/4" },
  sources: src("4"),
  parts: [
    {
      id: "listening",
      section: "听力",
      title: "Menyimak",
      instructions: "Dengarkan, lalu jawab.",
      minutes: 4,
      questions: [
        tf({ task: "判断对错", audio: "我原来打算大学毕业后去国外读研究生，但是后来家里出了点儿事，就先工作了。", prompt: "Pernyataan: ★ 他大学毕业后马上出国了。", ok: false }),
        mc({ task: "对话", audio: "女：这个周末的演出你买到票了吗？男：别提了，网上早就卖完了，只能等下次了。", prompt: "关于演出票，可以知道什么？", opts: ["已经卖完了", "男的买了两张", "票价很便宜", "女的不想去"] }),
        mc({
          task: "短文",
          audio: "很多人认为，只有工作时间长才能把事情做好。其实，效率比时间更重要。如果一个人总是加班，可能说明他的方法有问题。学会安排时间，才能既做好工作，又有时间休息。",
          prompt: "说话人认为什么更重要？",
          opts: ["工作效率", "工作时间", "经常加班", "多休息"],
        }),
      ],
    },
    {
      id: "reading",
      section: "阅读",
      title: "Membaca",
      instructions: "Isi kata, urutkan kalimat, lalu jawab soal bacaan.",
      minutes: 6,
      questions: [
        mc({ task: "选词填空", prompt: "这次比赛的（　）让大家都很吃惊，谁也没想到他会得第一名。", opts: ["结果", "原因", "经验", "态度"] }),
        { type: "order", task: "排列顺序", prompt: "Urutkan ketiga bagian kalimat.", items: ["我们原来打算周六去长城，", "但是天气预报说那天有大雨，", "所以只好改到下个周末了。"], joiner: "" },
        mc({
          task: "阅读理解",
          passage: "有人说，读书就像旅行：去过的地方越多，看问题的角度就越多。一本好书能带我们认识不同的人和生活，让我们更理解别人。所以，即使工作再忙，也应该留出一点儿时间读书。",
          prompt: "这段话主要想告诉我们：",
          opts: ["应该坚持读书", "旅行比读书重要", "工作忙就不用读书", "好书越来越少"],
        }),
      ],
    },
    {
      id: "writing",
      section: "书写",
      title: "Menulis",
      instructions: "Susun kalimat, lalu buat kalimat sendiri.",
      minutes: 6,
      questions: [
        { type: "order", task: "完成句子", prompt: "Susun menjadi satu kalimat.", items: ["他的", "汉语", "说得", "越来越流利了"], joiner: "", explain: "他的汉语说得越来越流利了。" },
        {
          type: "write",
          task: "看图用词造句",
          prompt: "Di ujian asli ada gambar. Bayangkan gambar seorang perempuan merapikan kamarnya, lalu buat satu kalimat dengan kata 「整理」.",
          unit: "karakter",
          minWords: 6,
          maxWords: 30,
          minutes: 3,
          checklist: ["Memakai kata 整理.", "Kalimat lengkap: ada subjek dan predikat.", "Sesuai dengan gambar."],
          model: "她正在整理自己的房间。",
        },
      ],
    },
  ],
};

/* ---------------------------------------------------------------- HSK 5 */

export const hsk5: Exam = {
  id: "hsk-5",
  lang: "mandarin",
  name: "HSK 5",
  fullName: "汉语水平考试 (Hanyu Shuiping Kaoshi) Level 5",
  org: ORG,
  level: "HSK 5 (menengah atas)",
  about: "Untuk pelajar yang bisa membaca koran dan majalah berbahasa Mandarin, menonton film, dan memberi pidato yang cukup utuh. Banyak kampus di Tiongkok mensyaratkan HSK 5 untuk program pascasarjana.",
  note: NOTE,
  format: [
    { name: "听力 Menyimak", time: "sekitar 30 menit", items: "45 soal, 2 bagian", tasks: "Dialog pendek, dialog dan monolog panjang" },
    { name: "阅读 Membaca", time: "45 menit", items: "45 soal, 3 bagian", tasks: "选词填空 (rumpang dalam teks), memilih kalimat yang sesuai isi teks, 阅读理解 teks panjang" },
    { name: "书写 Menulis", time: "40 menit", items: "10 soal, 2 bagian", tasks: "完成句子, 写短文 (sekitar 80 karakter dari kata yang diberikan dan dari gambar)" },
  ],
  scoring: ["Total 100 soal dalam sekitar 125 menit.", "Skor maksimal 300 (100 per bagian); lulus dengan 180.", VOCAB("2.500", "4.316")],
  tips: ["Bagian membaca padat: jangan berhenti lama di satu kata yang tidak dikenal.", "Untuk 写短文, susun alur sederhana (awal, kejadian, akhir) dan pakai semua kata yang diberikan."],
  official: { label: "chinesetest.cn", url: "https://www.chinesetest.cn/HSK/5" },
  sources: src("5"),
  parts: [
    {
      id: "listening",
      section: "听力",
      title: "Menyimak",
      instructions: "Dengarkan, lalu jawab.",
      minutes: 4,
      questions: [
        mc({ task: "对话", audio: "男：听说你被那家公司录取了？恭喜啊！女：谢谢，不过我还在犹豫，那儿离家太远了，每天来回要三个小时。", prompt: "女的为什么犹豫？", opts: ["公司离家太远", "工资太低", "还没被录取", "不喜欢那个工作"] }),
        mc({
          task: "短文",
          audio: "研究发现，适当的午睡能提高下午的工作效率。但是午睡时间不宜过长，一般二十到三十分钟比较合适。如果睡得太久，进入深度睡眠，醒来后反而会觉得头脑不清醒，更加疲劳。",
          prompt: "根据这段话，午睡时间太长会怎么样？",
          opts: ["醒来后更累", "工作效率更高", "晚上睡得更好", "头脑更清醒"],
        }),
      ],
    },
    {
      id: "reading",
      section: "阅读",
      title: "Membaca",
      instructions: "Isi rumpang dan jawab soal bacaan.",
      minutes: 6,
      questions: [
        gap({
          task: "选词填空",
          prompt: "Pilih kata yang paling tepat untuk setiap rumpang.",
          text: "小时候，我总觉得父亲很[0]，很少跟我们聊天。直到我自己当了父亲，才[1]他的辛苦：他不是不爱说话，而是把所有的时间都用在了工作上，为了让我们过上更好的生活。",
          gaps: [
            ["严肃", "热情", "幽默", "粗心"],
            ["理解", "解释", "原谅", "表达"],
          ],
        }),
        mc({
          task: "选择与文段一致的一项",
          passage: "竹子是生长速度最快的植物之一，有的品种一天能长一米左右。不过，竹子在地下要先花好几年的时间发展根系，等根扎得足够深，才开始快速向上生长。",
          prompt: "根据这段话，可以知道：",
          opts: ["竹子快速生长前要先发展根系", "所有竹子一天都能长一米", "竹子的根很浅", "竹子一直长得很慢"],
        }),
      ],
    },
    {
      id: "writing",
      section: "书写",
      title: "Menulis",
      instructions: "Susun kalimat, lalu tulis paragraf pendek.",
      minutes: 15,
      questions: [
        { type: "order", task: "完成句子", prompt: "Susun menjadi satu kalimat.", items: ["他把", "那份", "重要的文件", "忘在出租车上了"], joiner: "", explain: "他把那份重要的文件忘在出租车上了。" },
        {
          type: "write",
          task: "写短文",
          prompt: "Tulis paragraf sekitar 80 karakter yang memakai semua kata berikut: 毕业、紧张、机会、坚持、终于。",
          unit: "karakter",
          minWords: 70,
          maxWords: 110,
          minutes: 12,
          checklist: ["Kelima kata dipakai.", "Ada alur: awal, kejadian, akhir.", "Panjang sekitar 80 karakter."],
          model: "大学毕业以后，我找工作找了很久。第一次面试时，我非常紧张，没有回答好问题。但是我没有放弃，一直坚持练习。后来，一家公司给了我一个机会，我终于找到了喜欢的工作。",
        },
      ],
    },
  ],
};

/* ---------------------------------------------------------------- HSK 6 */

export const hsk6: Exam = {
  id: "hsk-6",
  lang: "mandarin",
  name: "HSK 6",
  fullName: "汉语水平考试 (Hanyu Shuiping Kaoshi) Level 6",
  org: ORG,
  level: "HSK 6 (mahir)",
  about: "Level tertinggi format HSK 1–6. Untuk pelajar yang mudah memahami informasi lisan dan tulisan dalam bahasa Mandarin serta mampu mengungkapkan pendapat dengan lancar, baik lisan maupun tulisan.",
  note: NOTE,
  format: [
    { name: "听力 Menyimak", time: "sekitar 35 menit", items: "50 soal, 3 bagian", tasks: "Memilih kalimat yang sesuai rekaman, wawancara, monolog panjang" },
    { name: "阅读 Membaca", time: "50 menit", items: "50 soal, 4 bagian", tasks: "找出病句 (mencari kalimat salah), 选词填空, 选句填空, 阅读理解" },
    { name: "书写 Menulis", time: "45 menit", items: "1 soal", tasks: "缩写: membaca teks sekitar 1.000 karakter selama 10 menit, lalu menulis ringkasannya sekitar 400 karakter tanpa melihat teks" },
  ],
  scoring: ["Total 101 soal dalam sekitar 140 menit.", "Skor maksimal 300 (100 per bagian); lulus dengan 180.", VOCAB("5.000", "5.456")],
  tips: [
    "找出病句 menguji kesalahan khas: subjek hilang (通过…使…), kolokasi salah, dan urutan kata keterangan.",
    "Untuk 缩写, catat di kepala tokoh, kejadian utama, dan akhir cerita; judul juga wajib ditulis.",
  ],
  official: { label: "chinesetest.cn", url: "https://www.chinesetest.cn/HSK/6" },
  sources: src("6"),
  parts: [
    {
      id: "listening",
      section: "听力",
      title: "Menyimak",
      instructions: "Dengarkan, lalu jawab.",
      minutes: 4,
      questions: [
        mc({
          task: "选择与录音一致",
          audio: "俗话说，三个臭皮匠，顶个诸葛亮。意思是说，几个普通人的智慧合在一起，也能比得上一个聪明人。这告诉我们，团队合作往往能解决个人难以解决的问题。",
          prompt: "这段话主要说明：",
          opts: ["团队合作很重要", "诸葛亮非常聪明", "普通人不如聪明人", "个人能力最重要"],
        }),
        mc({
          task: "访谈",
          audio: "女：您的书一出版就成了畅销书，您觉得成功的原因是什么？男：我想主要是因为写的是普通人的故事。读者在书里能看到自己的影子，自然就有了共鸣。至于写作技巧，我觉得反而是次要的。",
          prompt: "男的认为书受欢迎的主要原因是什么？",
          opts: ["读者产生了共鸣", "写作技巧高", "宣传做得好", "书的价格便宜"],
        }),
      ],
    },
    {
      id: "reading",
      section: "阅读",
      title: "Membaca",
      instructions: "Temukan kalimat yang salah, isi rumpang, lalu jawab soal bacaan.",
      minutes: 8,
      questions: [
        mc({
          task: "找出病句",
          prompt: "Kalimat mana yang mengandung kesalahan?",
          opts: ["通过这次活动，使我们认识到了环保的重要性。", "这部电影讲述了一个关于友情的感人故事。", "他的建议得到了大家的一致认可。", "随着科技的发展，人们的生活越来越方便。"],
          explain: "通过…使… menghilangkan subjek. Benar: 这次活动使我们认识到… atau 通过这次活动，我们认识到…",
        }),
        gap({
          task: "选词填空",
          prompt: "Pilih kata yang paling tepat untuk setiap rumpang.",
          text: "在信息[0]的今天，人们每天都会接触大量的新闻和消息。然而，信息越多，越需要我们具备[1]真假的能力，否则很容易被错误的信息误导。",
          gaps: [
            ["爆炸", "爆发", "爆满", "发作"],
            ["辨别", "分配", "发挥", "承担"],
          ],
          explain: "信息爆炸 = ledakan informasi; 辨别真假 = membedakan benar dan palsu.",
        }),
        gap({
          task: "选句填空",
          prompt: "Pilih kalimat yang paling tepat untuk rumpang.",
          text: "很多人以为，记忆力好的人天生就聪明。[0]。研究人员发现，那些记忆力出色的人，往往都有自己的一套方法，比如把要记的内容和熟悉的画面联系起来。",
          gaps: [["其实，好记忆大多是练出来的", "所以记忆力是无法提高的", "因此聪明的人不需要努力", "可见方法并不重要"]],
        }),
        mc({
          task: "阅读理解",
          passage:
            "近年来，“慢生活”在城市年轻人中流行起来。所谓慢生活，并不是指做事拖拉，而是在快节奏的生活中有意识地放慢脚步，关注当下，比如认真吃一顿饭、陪家人散散步。专家指出，这种生活方式有助于缓解压力，但关键在于找到适合自己的节奏，而不是盲目模仿。",
          prompt: "关于“慢生活”，下列哪项正确？",
          opts: ["它不等于做事拖拉", "它要求辞去工作", "专家认为人人都应该模仿", "它只在老年人中流行"],
        }),
      ],
    },
    {
      id: "writing",
      section: "书写",
      title: "Menulis (缩写)",
      instructions: "Baca teksnya sekali dengan saksama, lalu tulis ringkasan beserta judul tanpa melihat teks lagi.",
      minutes: 20,
      questions: [
        {
          type: "write",
          task: "缩写（练习版）",
          passage:
            "有一个年轻人在一家小餐馆打工。老板对他说：“每天最早来的人负责开门、打扫，月底多给两百块钱。”年轻人想，两百块钱不多，可也是个机会，就答应了。从那天起，他每天比别人早到一个小时。打扫完以后，他就站在门口观察来往的客人，记下哪些菜卖得好，哪些客人常来，他们喜欢什么口味。一年以后，老板决定开一家分店，问员工们谁愿意去管理。大家都犹豫了，只有这个年轻人站了出来，还拿出了一个厚厚的本子，里面写满了他一年来的观察和想法。老板看完以后，当场就把分店交给了他。后来有人问他成功的秘诀，他笑着说：“机会对每个人都一样，只是有的人把它当成负担，有的人把它当成开始。”",
          prompt: "Di ujian asli teksnya sekitar 1.000 karakter dan ringkasan sekitar 400 karakter. Untuk latihan ini, tulis ringkasan sekitar 150 karakter beserta judul.",
          unit: "karakter",
          minWords: 120,
          maxWords: 200,
          minutes: 15,
          checklist: ["Ada judul.", "Tokoh dan kejadian utama tercakup: datang paling pagi, mengamati pelanggan, ditawari cabang.", "Pesan akhir cerita disebutkan.", "Tidak menambahkan pendapat pribadi."],
          model:
            "机会\n一个年轻人在小餐馆打工，老板让最早来的人负责开门打扫。他答应了，每天早到一个小时，还认真观察客人，把菜和客人的喜好记在本子上。一年后老板要开分店，别人都犹豫，只有他站出来，拿出了自己的记录。老板把分店交给了他。他说，机会对每个人都一样，关键是把它当成负担还是开始。",
        },
      ],
    },
  ],
};

/* ---------------------------------------------------------------- HSK 7–9 */

export const hsk79: Exam = {
  id: "hsk-7-9",
  lang: "mandarin",
  name: "HSK 7–9",
  fullName: "汉语水平考试 (Hanyu Shuiping Kaoshi) Level 7–9",
  org: ORG,
  level: "HSK 7 sampai 9 (lanjut)",
  about:
    "Ujian tingkat lanjut berdasarkan standar HSK 3.0, untuk calon mahasiswa pascasarjana di bidang bahasa Mandarin, penerjemah, dan profesional. Satu kali ujian menguji lima keterampilan; skor menentukan apakah peserta mencapai level 7, 8, atau 9.",
  note: "Format HSK 7–9 relatif baru (mulai 2022). Rincian jumlah soal dan waktu tiap bagian bisa berubah; periksa panduan terbaru di chinesetest.cn.",
  format: [
    { name: "听力 Menyimak", time: "bagian dari ujian sekitar 210 menit", items: "beberapa bagian", tasks: "Wawancara, berita, kuliah, dan percakapan panjang" },
    { name: "阅读 Membaca", time: "", items: "beberapa bagian", tasks: "Teks panjang akademik, sastra, dan berita" },
    { name: "写作 Menulis", time: "", items: "2 tugas", tasks: "Menulis berdasarkan grafik atau data, dan esai argumentatif" },
    { name: "翻译 Menerjemahkan", time: "", items: "beberapa tugas", tasks: "Terjemahan tertulis dan lisan antara bahasa Mandarin dan bahasa lain" },
    { name: "口语 Berbicara", time: "", items: "beberapa tugas", tasks: "Menanggapi situasi, menyampaikan pendapat, menjawab pertanyaan" },
  ],
  scoring: [
    "Satu ujian untuk tiga level; hasil dilaporkan sebagai level 7, 8, atau 9 sesuai skor total.",
    "Kosakata standar HSK 3.0 untuk level 7–9: 5.636 kata tambahan, sehingga total sekitar 11.000 kata.",
    "Ujian berlangsung sekitar 210 menit dengan lima keterampilan.",
  ],
  tips: ["Biasakan membaca tajuk dan opini di media berbahasa Mandarin; kosakata formal dan chengyu sangat menentukan.", "Latih menerjemahkan secara lisan dengan batas waktu; bagian 口译 tidak memberi waktu panjang untuk berpikir."],
  official: { label: "chinesetest.cn", url: "https://www.chinesetest.cn/" },
  sources: [{ label: "Chinese Testing International", url: "https://www.chinesetest.cn/" }, { label: "Standar HSK 3.0 (GF 0025-2021)", url: "https://www.chinesetest.cn/" }],
  parts: [
    {
      id: "reading",
      section: "阅读",
      title: "Membaca",
      instructions: "Baca teks, lalu jawab.",
      minutes: 6,
      questions: [
        mc({
          task: "阅读理解",
          passage:
            "城市更新不应只是拆旧建新。老街区承载着居民的生活记忆和社会关系，一旦被整体拆除，这些无形的价值便难以重建。近年来，不少城市开始尝试“微更新”：在保留原有街巷格局的基础上，改善基础设施，引入小型公共空间，让居民参与设计。这种做法虽然见效较慢，却更能兼顾发展与人文。",
          prompt: "作者对“微更新”的态度是：",
          opts: ["肯定，认为它兼顾发展与人文", "反对，认为它见效太慢", "怀疑，认为居民不应参与设计", "中立，没有表明看法"],
        }),
        mc({ task: "词语理解", prompt: "“他做事一向雷厉风行。”句中“雷厉风行”的意思是：", opts: ["做事果断迅速", "脾气暴躁", "说话声音很大", "喜欢冒险"] }),
      ],
    },
    {
      id: "writing",
      section: "写作・翻译",
      title: "Menulis dan menerjemahkan",
      instructions: "Kerjakan tugas tertulis berikut.",
      minutes: 30,
      questions: [
        {
          type: "write",
          task: "翻译（笔译）",
          prompt: "Terjemahkan ke dalam bahasa Mandarin: \"Pemerintah mendorong penggunaan transportasi umum untuk mengurangi kemacetan dan polusi udara di kota-kota besar.\"",
          unit: "karakter",
          minWords: 20,
          minutes: 5,
          checklist: ["Subjek 政府 dan predikat 鼓励/提倡.", "Tujuan dinyatakan dengan 以/为了.", "Dua masalah: 交通拥堵 dan 空气污染."],
          model: "政府鼓励人们使用公共交通，以减少大城市的交通拥堵和空气污染。",
        },
        {
          type: "write",
          task: "议论文",
          prompt: "Tulis esai argumentatif dengan judul 「人工智能会让人变得更懒吗？」. Nyatakan pendapat, beri dua alasan dan contoh, lalu simpulkan.",
          unit: "karakter",
          minWords: 300,
          minutes: 25,
          checklist: ["Pendapat jelas di paragraf pertama.", "Dua alasan dengan contoh.", "Memakai penghubung formal (首先、其次、由此可见).", "Kesimpulan yang menegaskan pendapat."],
          model:
            "人工智能会让人变得更懒吗？我认为，关键不在于技术本身，而在于人们如何使用它。\n首先，人工智能确实替我们完成了许多重复性工作，比如整理资料、翻译简单文本。如果一味依赖，人们可能会失去独立思考和动手的能力。其次，人工智能也为我们节省了大量时间。善于利用的人，会把这些时间投入到更有创造性的工作中，例如设计新产品、研究新问题。\n由此可见，人工智能既可能让人变懒，也可能让人变得更有效率。我们应当把它当作工具，而不是替代思考的“拐杖”。",
        },
      ],
    },
    {
      id: "speaking",
      section: "口语",
      title: "Berbicara",
      instructions: "Siapkan jawaban, lalu bicara sesuai waktu.",
      minutes: 4,
      questions: [
        {
          type: "speak",
          task: "观点表达",
          prompt: "有人认为，年轻人应该先工作几年再读研究生。你同意吗？请说明理由。",
          prepSeconds: 60,
          speakSeconds: 120,
          checklist: ["Pendapat jelas di awal.", "Minimal dua alasan.", "Contoh konkret.", "Penutup yang merangkum."],
          model: "我基本同意这个看法。首先，工作几年能让人更清楚自己想研究什么，读研的目标会更明确。其次，有了工作经验，在研究中更容易把理论和实践结合起来。当然，如果一个人已经对学术很有兴趣，直接读研也未尝不可。总之，选择应该根据个人情况来决定。",
        },
      ],
    },
  ],
};

/* ---------------------------------------------------------------- Latihan tambahan */

hsk2.parts.push({
  id: "gengduo",
  section: "听力 · 阅读",
  title: "Latihan tambahan",
  instructions: "Dengarkan atau baca, lalu jawab.",
  minutes: 6,
  questions: [
    tf({ task: "判断对错", audio: "我哥哥在医院工作，他是医生。", prompt: "Pernyataan: 他哥哥是老师。", ok: false }),
    mc({ task: "对话理解", audio: "女：你的手机呢？男：在桌子上，你看，就在电脑旁边。", prompt: "手机在哪儿？", opts: ["电脑旁边", "椅子下面", "男的手里"] }),
    mc({ task: "对话理解", audio: "男：这儿离火车站远吗？女：不远，走路十分钟就到了。", prompt: "从这儿到火车站要多长时间？", opts: ["十分钟", "一个小时", "两分钟"] }),
    mc({ task: "选词填空", prompt: "他（　）在打电话，你等一下吧。", opts: ["正", "也", "再", "很"], explain: "正在 = sedang." }),
    mc({ task: "选词填空", prompt: "外面下雨了，你（　）带伞吧。", opts: ["最好", "已经", "一起", "非常"] }),
    tf({ task: "判断对错", passage: "我今天起床晚了，没吃早饭就去公司了，现在很饿。", prompt: "Pernyataan: ★ 他吃了早饭。", ok: false }),
    mc({ task: "句子匹配", prompt: "你为什么不去看电影？", opts: ["因为明天有考试。", "电影很好看。", "下午三点。", "我和朋友去。"] }),
  ],
});

hsk3.parts.push({
  id: "gengduo",
  section: "听力 · 阅读 · 书写",
  title: "Latihan tambahan",
  instructions: "Kerjakan tugas berikut.",
  minutes: 6,
  questions: [
    tf({ task: "判断对错", audio: "我本来想坐飞机去上海，但是机票太贵了，所以最后坐了火车。", prompt: "Pernyataan: ★ 他坐火车去了上海。", ok: true }),
    mc({ task: "对话", audio: "男：你最近怎么瘦了这么多？女：我每天下班以后都去游泳，晚饭也吃得很少。", prompt: "女的为什么瘦了？", opts: ["每天游泳，吃得少", "生病了", "工作太忙"] }),
    mc({ task: "选词填空", prompt: "这件事你（　）告诉别人，我们先保密。", opts: ["别", "没", "不用", "还"] }),
    { type: "order", task: "完成句子", prompt: "Susun menjadi satu kalimat.", items: ["我", "把", "作业", "写完了"], joiner: "", explain: "我把作业写完了。" },
    { type: "type", task: "写汉字", prompt: "Tulis hanzi untuk pinyin dalam kurung.", display: "我（mǎi）了一本新书。", answer: "买", explain: "mǎi = 买 (membeli)." },
  ],
});

hsk4.parts.push({
  id: "gengduo",
  section: "听力 · 阅读 · 书写",
  title: "Latihan tambahan",
  instructions: "Kerjakan tugas berikut.",
  minutes: 8,
  questions: [
    tf({ task: "判断对错", audio: "现在很多年轻人喜欢在网上买东西，因为又方便又便宜，而且可以送到家。", prompt: "Pernyataan: ★ 网上购物很方便。", ok: true }),
    mc({ task: "对话", audio: "男：你的签证办好了吗？女：还没有，材料交了，大使馆说要等两个星期。", prompt: "关于女的签证，可以知道什么？", opts: ["还要等两个星期", "已经办好了", "材料还没交", "被拒绝了"] }),
    mc({ task: "选词填空", prompt: "他做事很（　），从来不会忘记重要的事情。", opts: ["仔细", "马虎", "随便", "热闹"] }),
    { type: "order", task: "排列顺序", prompt: "Urutkan ketiga bagian.", items: ["这家餐厅的菜虽然不便宜，", "但是味道特别好，", "所以周末常常需要排队。"], joiner: "" },
    mc({
      task: "阅读理解",
      passage: "有些人觉得失败是一件很丢人的事，所以不敢尝试新东西。其实，每个成功的人都经历过很多次失败。重要的不是失败了多少次，而是失败以后能不能总结经验，继续努力。",
      prompt: "这段话主要是说：",
      opts: ["要从失败中总结经验", "失败很丢人", "不要尝试新东西", "成功的人很少失败"],
    }),
    { type: "order", task: "完成句子", prompt: "Susun menjadi satu kalimat.", items: ["这个问题", "比我想的", "复杂", "得多"], joiner: "", explain: "这个问题比我想的复杂得多。" },
  ],
});

hsk5.parts.push({
  id: "gengduo",
  section: "听力 · 阅读",
  title: "Latihan tambahan",
  instructions: "Kerjakan tugas berikut.",
  minutes: 10,
  questions: [
    mc({ task: "对话", audio: "女：这个方案你觉得怎么样？男：总体不错，就是预算有点儿超了，我们得想办法把成本降下来。", prompt: "男的觉得方案有什么问题？", opts: ["成本太高", "时间太紧", "内容太少", "人手不够"] }),
    mc({
      task: "短文",
      audio: "很多人以为，多喝咖啡就能提高工作效率。其实，咖啡只能让人暂时兴奋，如果喝得太多，反而会影响睡眠，第二天精神更差。保证充足的睡眠，才是提高效率的根本。",
      prompt: "说话人认为提高效率的根本是什么？",
      opts: ["保证充足的睡眠", "多喝咖啡", "少休息", "多运动"],
    }),
    gap({
      task: "选词填空",
      prompt: "Pilih kata yang paling tepat.",
      text: "随着生活水平的提高，人们越来越[0]健康。不少人开始[1]锻炼身体，选择更健康的饮食方式。",
      gaps: [
        ["重视", "重复", "重量", "重新"],
        ["坚持", "坚决", "坚强", "坚固"],
      ],
    }),
    mc({
      task: "选择与文段一致的一项",
      passage: "大熊猫是中国特有的动物，主要生活在四川、陕西等地的山区。它们每天要花十几个小时吃竹子。虽然属于食肉目动物，但大熊猫的食物中百分之九十九都是竹子。",
      prompt: "根据这段话，可以知道：",
      opts: ["大熊猫主要吃竹子", "大熊猫生活在海边", "大熊猫每天只吃一次", "大熊猫不属于食肉目"],
    }),
    mc({
      task: "阅读理解",
      passage: "小李刚参加工作时，总是等领导安排任务。后来他发现，主动的人进步更快：他们会提前想好下一步要做什么，遇到问题先自己找办法。于是小李也开始改变，一年后就成了部门的骨干。",
      prompt: "小李为什么能成为部门的骨干？",
      opts: ["他变得更主动了", "领导很喜欢他", "他换了工作", "他工作时间最长"],
    }),
    { type: "order", task: "完成句子", prompt: "Susun menjadi satu kalimat.", items: ["这次活动", "受到了", "大家的", "热烈欢迎"], joiner: "", explain: "这次活动受到了大家的热烈欢迎。" },
  ],
});

hsk6.parts.push({
  id: "gengduo",
  section: "听力 · 阅读",
  title: "Latihan tambahan",
  instructions: "Kerjakan tugas berikut.",
  minutes: 10,
  questions: [
    mc({
      task: "选择与录音一致",
      audio: "研究表明，人在心情愉快时，更容易产生新的想法。因此，一些公司特意为员工布置轻松的办公环境，比如设置休息区、允许带宠物上班，以激发员工的创造力。",
      prompt: "根据录音，公司布置轻松环境的目的是：",
      opts: ["激发员工的创造力", "降低办公成本", "减少员工数量", "延长工作时间"],
    }),
    mc({
      task: "找出病句",
      prompt: "Kalimat mana yang mengandung kesalahan?",
      opts: ["他的学习成绩是全班最优秀的学生。", "经过大家的努力，问题终于解决了。", "这座古老的建筑已有三百多年的历史。", "她不仅会说汉语，而且会说日语。"],
      explain: "成绩 tidak bisa menjadi 学生. Benar: 他是全班学习成绩最优秀的学生。",
    }),
    mc({
      task: "找出病句",
      prompt: "Kalimat mana yang mengandung kesalahan?",
      opts: ["我们要避免不再犯同样的错误。", "这本书对我的影响很大。", "他把房间收拾得干干净净。", "春天来了，公园里开满了鲜花。"],
      explain: "避免 sudah bermakna menghindari, jadi 不再 membuat makna terbalik. Benar: 避免再犯同样的错误。",
    }),
    gap({
      task: "选词填空",
      prompt: "Pilih kata yang paling tepat.",
      text: "这位老艺术家一生[0]于传统手工艺的保护，即使年事已高，仍然[1]在第一线，培养了大批年轻传人。",
      gaps: [
        ["致力", "致使", "导致", "以致"],
        ["坚守", "坚定", "守卫", "保守"],
      ],
    }),
    mc({
      task: "阅读理解",
      passage: "“碎片化阅读”是指利用零散时间，通过手机等设备进行的简短阅读。有人认为它让知识变得浅薄；也有人认为，在快节奏的生活中，它是获取信息的有效方式。关键在于，读者能否在碎片中建立联系，形成自己的知识体系。",
      prompt: "作者认为碎片化阅读的关键是：",
      opts: ["能否形成自己的知识体系", "读得越多越好", "必须用纸质书", "完全放弃"],
    }),
  ],
});

hsk79.parts.push({
  id: "gengduo",
  section: "阅读 · 听力",
  title: "Latihan tambahan",
  instructions: "Kerjakan tugas berikut.",
  minutes: 8,
  questions: [
    mc({ task: "成语", prompt: "“他做事总是半途而废。”句中“半途而废”的意思是：", opts: ["事情没做完就放弃", "做事很有耐心", "走路走到一半", "浪费了很多东西"] }),
    mc({ task: "词语辨析", prompt: "这项政策的出台，（　）了社会各界的广泛关注。", opts: ["引起", "引导", "引用", "吸引了于"] }),
    mc({
      task: "听力",
      audio: "访谈：主持人：您认为传统文化如何吸引年轻人？嘉宾：关键不在于把传统包装得多么时髦，而在于让年轻人参与进来。当他们亲手做过一次剪纸、写过一次书法，这份文化就不再遥远。",
      prompt: "嘉宾认为吸引年轻人的关键是：",
      opts: ["让年轻人亲身参与", "把传统包装得时髦", "多做广告", "降低门票价格"],
    }),
    mc({
      task: "阅读理解",
      passage: "所谓“内卷”，原指一种文化模式发展到一定阶段后停滞不前、只在内部精细化的现象。如今它被广泛用来形容同一领域内的过度竞争：投入不断增加，回报却没有相应提高。",
      prompt: "现在人们用“内卷”形容：",
      opts: ["投入增加而回报不增的过度竞争", "文化的快速发展", "经济的全面繁荣", "个人的自我提升"],
    }),
  ],
});

export const hskHigher = [hsk2, hsk3, hsk4, hsk5, hsk6, hsk79];
