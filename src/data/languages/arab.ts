import { defineLanguage } from "../define";

export default defineLanguage({
  slug: "arab",
  name: "Arab",
  native: "العربية",
  tts: "ar-SA",
  code: "ar",
  dir: "rtl",
  script: "Arab (hijaiyah)",
  glyph: "ع",
  speakers: 380,
  challenge: 4,
  challengeNote: "Banyak orang Indonesia sudah mengenal huruf hijaiyah, tetapi bunyi tenggorokan dan pola akar kata butuh latihan.",
  regions: "Timur Tengah dan Afrika Utara, bahasa resmi di 22 negara",
  about:
    "Materi di sini memakai bahasa Arab standar modern (fusha), bahasa berita, buku, dan pidato yang dipahami di seluruh dunia Arab. Ratusan kata Indonesia berasal dari bahasa Arab, seperti kitab, waktu, dan ilmu, sehingga banyak kosakata terasa akrab.",
  vocab: `
halo | مرحبا | marḥaban | salam umum: السلام عليكم (as-salāmu ʿalaykum)
pagi | صباح الخير | ṣabāḥ al-khayr
malam | مساء الخير | masāʾ al-khayr
terimakasih | شكرا | shukran
samasama | عفوا | ʿafwan
maaf | آسف | āsif | penutur perempuan: آسفة (āsifa)
permisi | لو سمحت | law samaḥt
ya | نعم | naʿam
tidak | لا | lā
dadah | مع السلامة | maʿa as-salāma
saya | أنا | anā
kamu | أنتَ / أنتِ | anta / anti | kepada laki-laki / perempuan
nama | اسم | ism
teman | صديق | ṣadīq
guru | معلم | muʿallim
pelajar | طالب | ṭālib | perempuan: طالبة (ṭāliba)
negara | بلد | balad
bahasa | لغة | lugha
indonesia | إندونيسيا | Indūnīsiyā
berbicara | يتكلم | yatakallamu | kata dasar: تكلم (takallama)
satu | واحد | wāḥid | angka: ١
dua | اثنان | ithnān | angka: ٢
tiga | ثلاثة | thalātha | angka: ٣
empat | أربعة | arbaʿa | angka: ٤
lima | خمسة | khamsa | angka: ٥
enam | ستة | sitta | angka: ٦
tujuh | سبعة | sabʿa | angka: ٧
delapan | ثمانية | thamāniya | angka: ٨
sembilan | تسعة | tisʿa | angka: ٩
sepuluh | عشرة | ʿashara | angka: ١٠
keluarga | عائلة | ʿāʾila
ayah | أب | ab
ibu | أم | umm
anak | طفل | ṭifl
saudaralk | أخ | akh
saudarapr | أخت | ukht
suami | زوج | zawj
istri | زوجة | zawja
kakek | جد | jadd
nenek | جدة | jadda
makan | يأكل | yaʾkulu | kata dasar: أكل (akala)
minum | يشرب | yashrabu | kata dasar: شرب (shariba)
air | ماء | māʾ
nasi | أرز | aruzz
roti | خبز | khubz
kopi | قهوة | qahwa
teh | شاي | shāy
ikan | سمك | samak
ayam | دجاج | dajāj
enak | لذيذ | ladhīdh
hariini | اليوم | al-yawm
besok | غدا | ghadan
kemarin | أمس | ams
sekarang | الآن | al-ān
jam | ساعة | sāʿa
hari | يوم | yawm
minggu | أسبوع | usbūʿ
bulan | شهر | shahr
tahun | سنة | sana
pagihari | صباح | ṣabāḥ
dimana | أين | ayna
kiri | يسار | yasār
kanan | يمين | yamīn
lurus | على طول | ʿalā ṭūl
dekat | قريب | qarīb
jauh | بعيد | baʿīd
stasiun | محطة | maḥaṭṭa
rumah | بيت | bayt
toilet | حمام | ḥammām
hotel | فندق | funduq
berapa | كم | kam | berapa harga: بكم (bikam)
harga | سعر | siʿr
mahal | غالٍ | ghālin
murah | رخيص | rakhīṣ
uang | نقود | nuqūd
membeli | يشتري | yashtarī | kata dasar: اشترى (ishtarā)
toko | متجر | matjar | toko kecil: دكان (dukkān)
ini | هذا | hādhā | untuk benda feminin: هذه (hādhihi)
itu | ذلك | dhālika | untuk benda feminin: تلك (tilka)
membayar | يدفع | yadfaʿu | kata dasar: دفع (dafaʿa)
`,
  phrases: `
s1 | كيف حالك؟ | kayfa ḥāluk?
s2 | أنا بخير، الحمد لله. | anā bikhayr, al-ḥamdu lillāh.
s3 | تشرفت بمعرفتك. | tasharraftu bimaʿrifatik.
s4 | إلى اللقاء. | ilā al-liqāʾ.
k1 | اسمي رينا. | ismī Rīnā.
k2 | ما اسمك؟ | mā ismuk?
k3 | أنا من إندونيسيا. | anā min Indūnīsiyā.
k4 | لا أفهم. | lā afham.
k5 | تكلم ببطء من فضلك. | takallam bibuṭʾ min faḍlik.
a1 | كم عمرك؟ | kam ʿumruk?
a2 | عمري عشرون سنة. | ʿumrī ʿishrūn sana.
a3 | واحد آخر من فضلك. | wāḥid ākhar min faḍlik.
f1 | هذه أمي. | hādhihi ummī.
f2 | هل لديك إخوة؟ | hal ladayka ikhwa?
f3 | عائلتي تسكن في جاكرتا. | ʿāʾilatī taskun fī Jākartā.
m1 | أنا جائع. | anā jāʾiʿ.
m2 | كوب ماء من فضلك. | kūb māʾ min faḍlik.
m3 | هذا لذيذ جدا! | hādhā ladhīdh jiddan!
m4 | الحساب من فضلك. | al-ḥisāb min faḍlik.
w1 | كم الساعة الآن؟ | kam as-sāʿa al-ān?
w2 | أي يوم اليوم؟ | ayy yawm al-yawm?
w3 | أراك غدا. | arāka ghadan.
w4 | أنا مشغول اليوم. | anā mashghūl al-yawm.
d1 | أين الحمام؟ | ayna al-ḥammām?
d2 | انعطف يسارا. | inʿaṭif yasāran.
d3 | هل هو بعيد من هنا؟ | hal huwa baʿīd min hunā?
d4 | أنا تائه. | anā tāʾih.
b1 | بكم هذا؟ | bikam hādhā?
b2 | هذا غالٍ جدا. | hādhā ghālin jiddan.
b3 | أريد أن أشتري هذا. | urīdu an ashtariya hādhā.
b4 | هل يمكنني الدفع بالبطاقة؟ | hal yumkinunī ad-dafʿ bil-biṭāqa?
`,
  alphabet: {
    title: "Huruf hijaiyah",
    intro:
      "Bahasa Arab ditulis dari kanan ke kiri dengan 28 huruf. Sebagian besar huruf bersambung dan bentuknya sedikit berubah di awal, tengah, atau akhir kata. Jika Anda pernah belajar mengaji, separuh jalan sudah Anda tempuh.",
    sections: [
      {
        title: "28 huruf",
        cols: 7,
        items:
          "ا=a / ā|alif;ب=b|bāʾ;ت=t|tāʾ;ث=th|thāʾ, seperti 'th' pada think;ج=j|jīm;ح=ḥ|ḥāʾ, h tajam dari tenggorokan;خ=kh|khāʾ;د=d|dāl;ذ=dh|dhāl, seperti 'th' pada this;ر=r|rāʾ;ز=z|zāy;س=s|sīn;ش=sy|syīn;ص=ṣ|ṣād, s tebal;ض=ḍ|ḍād, d tebal;ط=ṭ|ṭāʾ, t tebal;ظ=ẓ|ẓāʾ, dz tebal;ع=ʿ|ʿayn, dari tengah tenggorokan;غ=gh|ghayn, seperti r Prancis;ف=f|fāʾ;ق=q|qāf, k dari pangkal lidah;ك=k|kāf;ل=l|lām;م=m|mīm;ن=n|nūn;ه=h|hāʾ;و=w / ū|wāw;ي=y / ī|yāʾ",
      },
      {
        title: "Harakat (tanda vokal)",
        note: "Di teks sehari-hari harakat jarang ditulis; pembaca menebak dari konteks.",
        cols: 5,
        items: "بَ=ba|fatḥah;بِ=bi|kasrah;بُ=bu|ḍammah;بْ=b|sukūn, tanpa vokal;بّ=bb|syaddah, huruf ganda",
      },
      {
        title: "Satu huruf, empat bentuk",
        note: "Contoh huruf ب (bāʾ) menurut posisinya dalam kata.",
        cols: 4,
        items: "ب=sendiri|bentuk lepas;بـ=awal|bentuk awal;ـبـ=tengah|bentuk tengah;ـب=akhir|bentuk akhir",
      },
    ],
  },
  grammar: [
    {
      title: "Kalimat tanpa 'adalah'",
      body: "Seperti bahasa Indonesia, kalimat nominal di masa kini tidak butuh kata kerja 'adalah'.",
      examples: `
أنا طالب. | anā ṭālib. | Saya pelajar.
البيت كبير. | al-baytu kabīr. | Rumah itu besar.`,
    },
    {
      title: "Maskulin dan feminin",
      body: "Kata benda dan kata sifat punya gender. Bentuk feminin sering berakhiran ة (tāʾ marbūṭa).",
      examples: `
طالب / طالبة | ṭālib / ṭāliba | pelajar laki-laki / perempuan
معلم / معلمة | muʿallim / muʿallima | guru laki-laki / perempuan`,
    },
    {
      title: "Kata sandang ال",
      body: "Awalan ال (al-) berarti kata benda itu sudah tentu, seperti 'itu' atau 'the'.",
      examples: `
بيت | bayt | sebuah rumah
البيت | al-bayt | rumah itu`,
    },
    {
      title: "Akar tiga huruf",
      body: "Sebagian besar kata dibangun dari akar tiga konsonan. Mengenali akar membantu menebak arti kata baru.",
      examples: `
كتب | kataba | ia menulis
كتاب | kitāb | buku (kitab)
مكتب | maktab | kantor, meja tulis`,
    },
  ],
  videos: [
    { id: "C4gb2GnVoPQ", title: "Beginners Arabic - Lesson 01 - Arabic Alphabet", kind: "Huruf", about: "Cara membaca dan mengucapkan huruf-huruf Arab." },
    { id: "NIQ2KX7Dhrs", title: "Learn 40 Arabic Greetings in 5 Minutes", kind: "Frasa", about: "Empat puluh salam dan ungkapan sopan untuk pemula." },
  ],
});
