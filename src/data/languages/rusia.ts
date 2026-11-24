import { defineLanguage } from "../define";

export default defineLanguage({
  slug: "rusia",
  name: "Rusia",
  native: "Русский",
  tts: "ru-RU",
  code: "ru",
  dir: "ltr",
  script: "Kiril",
  glyph: "Ж",
  speakers: 255,
  challenge: 3,
  challengeNote: "Huruf Kiril bisa dibaca dalam seminggu. Tantangan sebenarnya adalah enam kasus tata bahasa.",
  regions: "Rusia, Belarus, Kazakhstan, Kirgizstan, dan Asia Tengah",
  about:
    "Bahasa Slavia terbesar dan bahasa resmi PBB. Seperti bahasa Indonesia, bahasa Rusia tidak punya artikel dan tidak memakai 'adalah' di masa kini, sehingga kalimat dasarnya terasa akrab.",
  vocab: `
halo | Здравствуйте | zdravstvuyte | akrab: Привет (privet)
pagi | Доброе утро | dobroye utro
malam | Добрый вечер | dobryy vecher | sebelum tidur: Спокойной ночи
terimakasih | Спасибо | spasibo
samasama | Пожалуйста | pozhaluysta | juga berarti 'tolong'
maaf | Извините | izvinite
permisi | Простите | prostite
ya | Да | da
tidak | Нет | net
dadah | До свидания | do svidaniya | akrab: Пока (poka)
saya | я | ya
kamu | ты | ty | formal: вы (vy)
nama | имя | imya
teman | друг | drug
guru | учитель | uchitel'
pelajar | студент | student
negara | страна | strana
bahasa | язык | yazyk
indonesia | Индонезия | Indoneziya
berbicara | говорить | govorit'
satu | один | odin
dua | два | dva
tiga | три | tri
empat | четыре | chetyre
lima | пять | pyat'
enam | шесть | shest'
tujuh | семь | sem'
delapan | восемь | vosem'
sembilan | девять | devyat'
sepuluh | десять | desyat'
keluarga | семья | sem'ya
ayah | отец | otets | akrab: папа
ibu | мать | mat' | akrab: мама
anak | ребёнок | rebyonok
saudaralk | брат | brat
saudarapr | сестра | sestra
suami | муж | muzh
istri | жена | zhena
kakek | дедушка | dedushka
nenek | бабушка | babushka
makan | есть | yest'
minum | пить | pit'
air | вода | voda
nasi | рис | ris
roti | хлеб | khleb
kopi | кофе | kofe
teh | чай | chay
ikan | рыба | ryba
ayam | курица | kuritsa
enak | вкусно | vkusno
hariini | сегодня | segodnya
besok | завтра | zavtra
kemarin | вчера | vchera
sekarang | сейчас | seychas
jam | час | chas
hari | день | den'
minggu | неделя | nedelya
bulan | месяц | mesyats
tahun | год | god
pagihari | утро | utro
dimana | где | gde
kiri | налево | nalevo
kanan | направо | napravo
lurus | прямо | pryamo
dekat | близко | blizko
jauh | далеко | daleko
stasiun | вокзал | vokzal | stasiun metro: станция
rumah | дом | dom
toilet | туалет | tualet
hotel | гостиница | gostinitsa
berapa | сколько | skol'ko
harga | цена | tsena
mahal | дорого | dorogo
murah | дёшево | dyoshevo
uang | деньги | den'gi
membeli | покупать | pokupat'
toko | магазин | magazin
ini | это | eto
itu | то | to
membayar | платить | platit'
mobil | машина | mashina | formal: автомобиль
bus | автобус | avtobus
kereta | поезд | poyezd
pesawat | самолёт | samolyot
sepeda | велосипед | velosiped
tiket | билет | bilet
jalan | дорога | doroga | jalan di kota: улица (ulitsa)
bandara | аэропорт | aeroport
berangkat | отправляться | otpravlyat'sya
tiba | приезжать | priyezzhat'
kepala | голова | golova
mata | глаз | glaz
tangan | рука | ruka | juga berarti lengan
kaki | нога | noga | juga berarti tungkai
perut | живот | zhivot
sakit | больной | bol'noy
dokter | врач | vrach
obat | лекарство | lekarstvo
rumahsakit | больница | bol'nitsa
demam | температура | temperatura | arti harfiah: suhu tubuh tinggi
cuaca | погода | pogoda
panas | жарко | zharko
dingin | холодно | kholodno
hujan | дождь | dozhd'
matahari | солнце | solntse | huruf л tidak dibaca
angin | ветер | veter
laut | море | more
gunung | гора | gora
sungai | река | reka
musim | время года | vremya goda
bekerja | работать | rabotat'
belajar | учиться | uchit'sya | mempelajari sesuatu: изучать
membaca | читать | chitat'
menulis | писать | pisat'
tidur | спать | spat'
pergi | идти | idti | dengan kendaraan: ехать
datang | приходить | prikhodit'
kantor | офис | ofis
sekolah | школа | shkola
libur | отпуск | otpusk | libur sekolah: каникулы
`,
  phrases: `
s1 | Как дела? | kak dela?
s2 | Хорошо, спасибо. | khorosho, spasibo.
s3 | Приятно познакомиться. | priyatno poznakomit'sya.
s4 | До встречи! | do vstrechi!
k1 | Меня зовут Рина. | menya zovut Rina.
k2 | Как вас зовут? | kak vas zovut?
k3 | Я из Индонезии. | ya iz Indonezii.
k4 | Я не понимаю. | ya ne ponimayu.
k5 | Говорите медленнее, пожалуйста. | govorite medlenneye, pozhaluysta.
a1 | Сколько тебе лет? | skol'ko tebe let?
a2 | Мне двадцать лет. | mne dvadtsat' let.
a3 | Ещё один, пожалуйста. | yeshchyo odin, pozhaluysta.
f1 | Это моя мама. | eto moya mama.
f2 | У тебя есть братья или сёстры? | u tebya yest' brat'ya ili syostry?
f3 | Моя семья живёт в Джакарте. | moya sem'ya zhivyot v Dzhakarte.
m1 | Я голоден. | ya goloden. | penutur perempuan: голодна
m2 | Стакан воды, пожалуйста. | stakan vody, pozhaluysta.
m3 | Очень вкусно! | ochen' vkusno!
m4 | Счёт, пожалуйста. | schyot, pozhaluysta.
w1 | Который час? | kotoryy chas?
w2 | Какой сегодня день? | kakoy segodnya den'?
w3 | До завтра! | do zavtra!
w4 | Сегодня я занят. | segodnya ya zanyat. | penutur perempuan: занята
d1 | Где туалет? | gde tualet?
d2 | Поверните налево. | povernite nalevo.
d3 | Это далеко отсюда? | eto daleko otsyuda?
d4 | Я заблудился. | ya zabludilsya. | penutur perempuan: заблудилась
b1 | Сколько это стоит? | skol'ko eto stoit?
b2 | Это слишком дорого. | eto slishkom dorogo.
b3 | Я хочу купить это. | ya khochu kupit' eto.
b4 | Можно заплатить картой? | mozhno zaplatit' kartoy?
t1 | Куда идёт этот автобус? | kuda idyot etot avtobus?
t2 | Один билет до Бандунга, пожалуйста. | odin bilet do Bandunga, pozhaluysta.
t3 | Во сколько отправляется поезд? | vo skol'ko otpravlyayetsya poyezd?
h1 | Я болен. | ya bolen. | penutur perempuan: больна
h2 | У меня болит голова. | u menya bolit golova.
h3 | Вызовите врача, пожалуйста! | vyzovite vracha, pozhaluysta!
c1 | Сегодня очень жарко. | segodnya ochen' zharko.
c2 | Завтра будет дождь. | zavtra budet dozhd'.
c3 | Хорошая погода. | khoroshaya pogoda.
g1 | Я работаю в офисе. | ya rabotayu v ofise.
g2 | Я учусь каждый день. | ya uchus' kazhdyy den'.
g3 | Какое у тебя хобби? | kakoye u tebya khobbi?
`,
  alphabet: {
    title: "Alfabet Kiril",
    intro:
      "Alfabet Rusia punya 33 huruf. Sebagian terlihat seperti huruf Latin dengan bunyi yang sama, sebagian terlihat sama tetapi bunyinya berbeda, dan sisanya benar-benar baru.",
    sections: [
      {
        title: "33 huruf",
        cols: 6,
        items:
          "А=a;Б=b;В=v;Г=g;Д=d;Е=ye;Ё=yo;Ж=zh|seperti 'j' Prancis;З=z;И=i;Й=y pendek;К=k;Л=l;М=m;Н=n;О=o|dibaca 'a' jika tanpa tekanan;П=p;Р=r bergetar;С=s;Т=t;У=u;Ф=f;Х=kh;Ц=ts;Ч=ch|seperti c pada 'cari';Ш=sh|sy keras;Щ=shch|sy panjang dan lembut;Ъ=tanda keras|tidak berbunyi;Ы=y|i dari belakang mulut;Ь=tanda lunak|melunakkan konsonan sebelumnya;Э=e;Ю=yu;Я=ya",
      },
      {
        title: "Huruf yang menipu",
        note: "Terlihat seperti huruf Latin, tetapi bunyinya berbeda.",
        cols: 6,
        items: "В=v;Н=n;Р=r;С=s;У=u;Х=kh",
      },
    ],
  },
  grammar: [
    {
      title: "Tanpa 'adalah' dan tanpa artikel",
      body: "Di masa kini, kata kerja 'adalah' tidak diucapkan. Bahasa Rusia juga tidak punya kata seperti 'the' atau 'a'.",
      examples: `
Я студент. | ya student. | Saya pelajar.
Это дом. | eto dom. | Ini rumah.`,
    },
    {
      title: "Tiga gender dari akhiran kata",
      body: "Gender biasanya bisa ditebak dari huruf terakhir: konsonan untuk maskulin, -а/-я untuk feminin, dan -о/-е untuk netral.",
      examples: `
дом | dom | rumah (maskulin)
мама | mama | ibu (feminin)
окно | okno | jendela (netral)`,
    },
    {
      title: "Kasus: akhiran berubah menurut fungsi",
      body: "Kata benda punya enam kasus. Akhirannya berubah saat menjadi objek, menunjukkan tempat, kepemilikan, dan sebagainya. Mulailah dengan kasus lokatif untuk 'di'.",
      examples: `
Москва → в Москве | Moskva → v Moskve | Moskwa → di Moskwa
Джакарта → в Джакарте | Dzhakarta → v Dzhakarte | Jakarta → di Jakarta`,
    },
    {
      title: "Tekanan suku kata mengubah bunyi",
      body: "Tekanan tidak ditulis, tetapi menentukan bunyi. Huruf о tanpa tekanan dibaca seperti 'a'.",
      examples: `
хорошо | kharashó | baik
молоко | malakó | susu`,
    },
  ],
  videos: [
    { id: "zwLvb-Rtqyk", title: "Learn the Russian Alphabet (Cyrillic) for Beginners", kind: "Huruf", about: "Ke-33 huruf Kiril dijelaskan oleh pengajar penutur asli." },
    { id: "vJ0Qzk4PtP8", title: "100 Basic Russian Phrases for Absolute Beginners", kind: "Frasa", about: "Seratus frasa dasar yang perlu diketahui pemula." },
  ],
});
