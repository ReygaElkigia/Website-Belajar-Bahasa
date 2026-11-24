import { defineLanguage } from "../define";

export default defineLanguage({
  slug: "mandarin",
  name: "Mandarin",
  native: "中文",
  tts: "zh-CN",
  code: "zh-CN",
  dir: "ltr",
  script: "Hanzi dan Pinyin",
  glyph: "字",
  speakers: 1140,
  challenge: 4,
  challengeNote: "Tata bahasanya sederhana dan mirip bahasa Indonesia, tetapi nada dan karakternya menuntut latihan rutin.",
  regions: "Tiongkok, Taiwan, Singapura, dan komunitas Tionghoa di Indonesia",
  about:
    "Bahasa dengan penutur asli terbanyak di dunia. Tidak ada konjugasi, gender, atau bentuk jamak, sehingga tata bahasanya terasa ringan. Tantangannya ada di empat nada dan ribuan karakter. Pinyin membantu Anda membaca bunyi sejak hari pertama.",
  vocab: `
halo | 你好 | nǐ hǎo
pagi | 早上好 | zǎoshang hǎo
malam | 晚上好 | wǎnshang hǎo
terimakasih | 谢谢 | xièxie
samasama | 不客气 | bú kèqi
maaf | 对不起 | duìbuqǐ
permisi | 不好意思 | bù hǎoyìsi | untuk bertanya: 请问 (qǐngwèn)
ya | 是 | shì | sering cukup mengulang kata kerjanya
tidak | 不是 | bú shì
dadah | 再见 | zàijiàn
saya | 我 | wǒ
kamu | 你 | nǐ | sopan: 您 (nín)
nama | 名字 | míngzi
teman | 朋友 | péngyou
guru | 老师 | lǎoshī
pelajar | 学生 | xuéshēng
negara | 国家 | guójiā
bahasa | 语言 | yǔyán | nama bahasa: 〜语 (-yǔ)
indonesia | 印度尼西亚 | Yìndùníxīyà | singkat: 印尼 (Yìnní)
berbicara | 说 | shuō
satu | 一 | yī
dua | 二 | èr | untuk jumlah: 两 (liǎng)
tiga | 三 | sān
empat | 四 | sì
lima | 五 | wǔ
enam | 六 | liù
tujuh | 七 | qī
delapan | 八 | bā
sembilan | 九 | jiǔ
sepuluh | 十 | shí
keluarga | 家人 | jiārén
ayah | 爸爸 | bàba | formal: 父亲 (fùqīn)
ibu | 妈妈 | māma | formal: 母亲 (mǔqīn)
anak | 孩子 | háizi
saudaralk | 哥哥 / 弟弟 | gēge / dìdi | kakak / adik laki-laki
saudarapr | 姐姐 / 妹妹 | jiějie / mèimei | kakak / adik perempuan
suami | 丈夫 | zhàngfu
istri | 妻子 | qīzi
kakek | 爷爷 | yéye | dari pihak ibu: 外公 (wàigōng)
nenek | 奶奶 | nǎinai | dari pihak ibu: 外婆 (wàipó)
makan | 吃 | chī
minum | 喝 | hē
air | 水 | shuǐ
nasi | 米饭 | mǐfàn
roti | 面包 | miànbāo
kopi | 咖啡 | kāfēi
teh | 茶 | chá
ikan | 鱼 | yú
ayam | 鸡肉 | jīròu
enak | 好吃 | hǎochī | minuman enak: 好喝 (hǎohē)
hariini | 今天 | jīntiān
besok | 明天 | míngtiān
kemarin | 昨天 | zuótiān
sekarang | 现在 | xiànzài
jam | 小时 | xiǎoshí | pukul: 点 (diǎn)
hari | 天 | tiān
minggu | 星期 | xīngqī
bulan | 月 | yuè
tahun | 年 | nián
pagihari | 早上 | zǎoshang
dimana | 哪里 | nǎlǐ
kiri | 左 | zuǒ
kanan | 右 | yòu
lurus | 直走 | zhí zǒu
dekat | 近 | jìn
jauh | 远 | yuǎn
stasiun | 车站 | chēzhàn
rumah | 家 | jiā
toilet | 厕所 | cèsuǒ | lebih halus: 洗手间 (xǐshǒujiān)
hotel | 酒店 | jiǔdiàn
berapa | 多少 | duōshao
harga | 价格 | jiàgé
mahal | 贵 | guì
murah | 便宜 | piányi
uang | 钱 | qián
membeli | 买 | mǎi
toko | 商店 | shāngdiàn
ini | 这个 | zhège
itu | 那个 | nàge
membayar | 付钱 | fù qián
`,
  phrases: `
s1 | 你好吗？ | nǐ hǎo ma?
s2 | 我很好。 | wǒ hěn hǎo.
s3 | 很高兴认识你。 | hěn gāoxìng rènshi nǐ.
s4 | 回头见。 | huítóu jiàn.
k1 | 我叫丽娜。 | wǒ jiào Lìnà.
k2 | 你叫什么名字？ | nǐ jiào shénme míngzi?
k3 | 我来自印度尼西亚。 | wǒ láizì Yìndùníxīyà.
k4 | 我听不懂。 | wǒ tīng bu dǒng.
k5 | 请说慢一点。 | qǐng shuō màn yìdiǎn.
a1 | 你多大了？ | nǐ duō dà le?
a2 | 我二十岁。 | wǒ èrshí suì.
a3 | 请再来一个。 | qǐng zài lái yí ge.
f1 | 这是我妈妈。 | zhè shì wǒ māma.
f2 | 你有兄弟姐妹吗？ | nǐ yǒu xiōngdì jiěmèi ma?
f3 | 我的家人住在雅加达。 | wǒ de jiārén zhù zài Yǎjiādá.
m1 | 我饿了。 | wǒ è le.
m2 | 请给我一杯水。 | qǐng gěi wǒ yì bēi shuǐ.
m3 | 太好吃了！ | tài hǎochī le!
m4 | 请买单。 | qǐng mǎidān.
w1 | 现在几点？ | xiànzài jǐ diǎn?
w2 | 今天星期几？ | jīntiān xīngqī jǐ?
w3 | 明天见。 | míngtiān jiàn.
w4 | 我今天很忙。 | wǒ jīntiān hěn máng.
d1 | 厕所在哪里？ | cèsuǒ zài nǎlǐ?
d2 | 向左转。 | xiàng zuǒ zhuǎn.
d3 | 离这里远吗？ | lí zhèlǐ yuǎn ma?
d4 | 我迷路了。 | wǒ mílù le.
b1 | 多少钱？ | duōshao qián?
b2 | 太贵了。 | tài guì le.
b3 | 我想买这个。 | wǒ xiǎng mǎi zhège.
b4 | 可以刷卡吗？ | kěyǐ shuākǎ ma?
`,
  alphabet: {
    title: "Pinyin, nada, dan karakter",
    intro:
      "Pinyin adalah ejaan Latin untuk bunyi Mandarin. Setiap suku kata punya nada, dan nada yang berbeda mengubah arti. Pelajari nada dulu, lalu bunyi awal (inisial), lalu karakter dasar.",
    sections: [
      {
        title: "Empat nada dan nada netral",
        note: "Suku kata yang sama, lima arti berbeda.",
        cols: 5,
        items:
          "妈=mā|nada 1, tinggi datar: ibu;麻=má|nada 2, naik: rami;马=mǎ|nada 3, turun lalu naik: kuda;骂=mà|nada 4, turun tajam: memarahi;吗=ma|netral, ringan: partikel tanya",
      },
      {
        title: "Bunyi awal (inisial)",
        note: "Ketuk untuk mendengar contoh karakter.",
        cols: 7,
        items:
          "b=p tanpa hembusan|八 bā|八;p=p dengan hembusan|爬 pá|爬;m=m|妈 mā|妈;f=f|发 fā|发;d=t tanpa hembusan|大 dà|大;t=t dengan hembusan|他 tā|他;n=n|你 nǐ|你;l=l|六 liù|六;g=k tanpa hembusan|哥 gē|哥;k=k dengan hembusan|口 kǒu|口;h=h dari tenggorokan|好 hǎo|好;j=j lembut|鸡 jī|鸡;q=c dengan hembusan|七 qī|七;x=s lembut|西 xī|西;zh=j, lidah melengkung|中 zhōng|中;ch=c, lidah melengkung|吃 chī|吃;sh=sy, lidah melengkung|是 shì|是;r=r lembut, mirip 'zh'|人 rén|人;z=dz|在 zài|在;c=ts dengan hembusan|菜 cài|菜;s=s|三 sān|三",
      },
      {
        title: "Karakter dasar",
        note: "Banyak karakter berasal dari gambar benda.",
        cols: 6,
        items:
          "人=rén|orang;口=kǒu|mulut;大=dà|besar;小=xiǎo|kecil;山=shān|gunung;水=shuǐ|air;火=huǒ|api;木=mù|pohon;日=rì|matahari, hari;月=yuè|bulan;中=zhōng|tengah;好=hǎo|baik",
      },
    ],
  },
  grammar: [
    {
      title: "Urutan kata seperti bahasa Indonesia",
      body: "Subjek, kata kerja, lalu objek. Anda bisa menerjemahkan kalimat sederhana kata demi kata.",
      examples: `
我吃米饭。 | wǒ chī mǐfàn. | Saya makan nasi.`,
    },
    {
      title: "Kata kerja tidak berubah",
      body: "Tidak ada konjugasi. Waktu ditunjukkan dengan kata keterangan (昨天 kemarin, 明天 besok) atau partikel 了 (le) untuk tindakan yang sudah selesai.",
      examples: `
我昨天吃了米饭。 | wǒ zuótiān chī le mǐfàn. | Kemarin saya makan nasi.`,
    },
    {
      title: "Pertanyaan ya/tidak dengan 吗",
      body: "Tambahkan 吗 (ma) di akhir kalimat pernyataan.",
      examples: `
你是学生。 | nǐ shì xuéshēng. | Kamu pelajar.
你是学生吗？ | nǐ shì xuéshēng ma? | Apakah kamu pelajar?`,
    },
    {
      title: "Kata penggolong",
      body: "Seperti 'seorang', 'sebuah', 'segelas' dalam bahasa Indonesia. 个 (ge) adalah penggolong umum yang paling sering dipakai.",
      examples: `
一个人 | yí ge rén | seorang
一本书 | yì běn shū | sebuah buku
一杯水 | yì bēi shuǐ | segelas air`,
    },
  ],
  videos: [
    { id: "wSMX6ZdJZ38", title: "Chinese Pinyin for Beginners: Initials, Finals & the 4 Tones", kind: "Huruf", about: "Pinyin lengkap: inisial, final, empat nada, dan nada netral." },
    { id: "-Lsvve4JCIA", title: "Learn Chinese All Pinyin Tones in 10 Minutes", kind: "Huruf", about: "Latihan singkat empat nada dan nada netral." },
    { id: "m1LWu81kWqE", title: "Learn Basic Greetings in Mandarin Chinese", kind: "Frasa", about: "Halo, apa kabar, terima kasih, dan sampai jumpa." },
  ],
});
