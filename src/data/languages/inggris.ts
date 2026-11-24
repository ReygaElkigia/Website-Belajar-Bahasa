import { defineLanguage } from "../define";

export default defineLanguage({
  slug: "inggris",
  name: "Inggris",
  native: "English",
  tts: "en-US",
  code: "en",
  dir: "ltr",
  script: "Latin",
  glyph: "Ee",
  speakers: 1500,
  challenge: 2,
  challengeNote: "Huruf Latin dan urutan kata mirip, tetapi ejaan sering tidak sesuai bunyinya.",
  regions: "Amerika Serikat, Inggris Raya, Australia, India, Singapura, dan bahasa internasional",
  about:
    "Bahasa paling banyak dipelajari di dunia dan bahasa kerja di sains, teknologi, dan penerbangan. Struktur kalimatnya dekat dengan bahasa Indonesia, jadi tantangan utamanya ada di pelafalan dan perubahan kata kerja menurut waktu.",
  vocab: `
halo | hello
pagi | good morning
malam | good evening | good night untuk berpamitan
terimakasih | thank you
samasama | you're welcome
maaf | sorry
permisi | excuse me
ya | yes
tidak | no
dadah | goodbye
saya | I
kamu | you
nama | name
teman | friend
guru | teacher
pelajar | student
negara | country
bahasa | language
indonesia | Indonesia
berbicara | to speak
satu | one
dua | two
tiga | three
empat | four
lima | five
enam | six
tujuh | seven
delapan | eight
sembilan | nine
sepuluh | ten
keluarga | family
ayah | father | dad (akrab)
ibu | mother | mom (akrab)
anak | child | jamak: children
saudaralk | brother
saudarapr | sister
suami | husband
istri | wife
kakek | grandfather
nenek | grandmother
makan | to eat
minum | to drink
air | water
nasi | rice
roti | bread
kopi | coffee
teh | tea
ikan | fish
ayam | chicken
enak | delicious
hariini | today
besok | tomorrow
kemarin | yesterday
sekarang | now
jam | hour | o'clock = pukul
hari | day
minggu | week
bulan | month
tahun | year
pagihari | morning
dimana | where
kiri | left
kanan | right
lurus | straight
dekat | near
jauh | far
stasiun | station
rumah | house | home = rumah (tempat tinggal)
toilet | restroom | toilet juga dipakai
hotel | hotel
berapa | how much | how many untuk benda terhitung
harga | price
mahal | expensive
murah | cheap
uang | money
membeli | to buy
toko | shop
ini | this
itu | that
membayar | to pay
`,
  phrases: `
s1 | How are you?
s2 | I'm fine, thank you.
s3 | Nice to meet you.
s4 | See you later.
k1 | My name is Rina.
k2 | What's your name?
k3 | I'm from Indonesia.
k4 | I don't understand.
k5 | Please speak slowly.
a1 | How old are you?
a2 | I'm twenty years old.
a3 | One more, please.
f1 | This is my mother.
f2 | Do you have any siblings?
f3 | My family lives in Jakarta.
m1 | I'm hungry.
m2 | A glass of water, please.
m3 | This is delicious!
m4 | Can I have the bill, please?
w1 | What time is it?
w2 | What day is it today?
w3 | See you tomorrow.
w4 | I'm busy today.
d1 | Where is the restroom?
d2 | Turn left.
d3 | Is it far from here?
d4 | I'm lost.
b1 | How much is it?
b2 | It's too expensive.
b3 | I'd like to buy this.
b4 | Can I pay by card?
`,
  alphabet: {
    title: "Alfabet dan bunyi",
    intro:
      "Hurufnya sama dengan bahasa Indonesia, tetapi nama hurufnya berbeda dan satu huruf bisa punya beberapa bunyi. Hafalkan nama huruf untuk mengeja nama dan alamat.",
    sections: [
      {
        title: "Nama huruf",
        note: "Ditulis dengan ejaan Indonesia agar mudah dibaca.",
        cols: 6,
        items:
          "A=ei;B=bi;C=si;D=di;E=i;F=ef;G=ji;H=eic;I=ai;J=jei;K=kei;L=el;M=em;N=en;O=ou;P=pi;Q=kyu;R=ar;S=es;T=ti;U=yu;V=vi;W=dabel-yu;X=eks;Y=wai;Z=zi|zed di Inggris Raya",
      },
      {
        title: "Bunyi yang sering keliru",
        cols: 3,
        items:
          "th=lidah di antara gigi|think, this|think, this;sh=sy|she, fish|she, fish;ch=c|church, cheese|church, cheese;ph=f|phone, photo|phone, photo;-tion=syen|nation, station|nation, station;ee=i panjang|see, tree|see, tree;oo=u panjang|food, moon|food, moon;v=v, bibir bawah ke gigi atas|very, voice|very, voice;w=w bulat|water, we|water, we",
      },
    ],
  },
  grammar: [
    {
      title: "Urutan kata sama: subjek, predikat, objek",
      body: "Kalimat dasar bahasa Inggris tersusun seperti bahasa Indonesia. Anda bisa langsung menyusun kalimat sederhana.",
      examples: `
I eat rice. | Saya makan nasi.
She reads a book. | Dia membaca buku.`,
    },
    {
      title: "Kata kerja berubah menurut waktu",
      body: "Bahasa Indonesia memakai kata keterangan seperti 'sudah' atau 'akan'. Bahasa Inggris mengubah bentuk kata kerjanya (tense).",
      examples: `
I eat. | Saya makan.
I ate. | Saya (sudah) makan.
I will eat. | Saya akan makan.`,
    },
    {
      title: "'To be' wajib ada",
      body: "Kalimat tanpa kata kerja tetap butuh am, is, atau are. Dalam bahasa Indonesia kata 'adalah' sering boleh dihilangkan, dalam bahasa Inggris tidak.",
      examples: `
I am a student. | Saya pelajar.
She is a teacher. | Dia guru.
They are my friends. | Mereka teman saya.`,
    },
    {
      title: "Artikel a, an, dan the",
      body: "A dan an berarti 'sebuah/seorang' untuk hal yang baru disebut. The untuk hal yang sudah diketahui. An dipakai sebelum bunyi vokal.",
      examples: `
a book, an apple | sebuah buku, sebuah apel
the book on the table | buku (itu) di atas meja`,
    },
    {
      title: "Akhiran -s untuk dia",
      body: "Pada masa kini, kata kerja untuk he, she, dan it mendapat akhiran -s.",
      examples: `
I work. She works. | Saya bekerja. Dia bekerja.`,
    },
  ],
  videos: [
    { id: "P5TaP4PHt-s", title: "Everyday English Conversation Practice for Beginners", kind: "Percakapan", about: "Percakapan sehari-hari dengan tempo pelan untuk pemula." },
    { id: "k1eMvACmSnw", title: "10 Real-Life English Conversations for Beginners", kind: "Percakapan", about: "Sepuluh situasi nyata, cocok setelah menyelesaikan unit pertama." },
  ],
});
