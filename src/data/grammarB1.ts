import { examples } from "./define";
import type { Grammar } from "./types";

/**
 * Catatan tata bahasa tingkat A2–B1: bercerita tentang masa lalu, membuat
 * rencana, dan membandingkan. Melengkapi unit Hobi, Perjalanan, Perasaan, dan Cerita.
 * Format contoh sama dengan catatan dasar: `teks | romanisasi | arti` atau `teks | arti`.
 */

type Raw = { title: string; body: string; examples: string };

const RAW: Record<string, Raw[]> = {
  inggris: [
    {
      title: "Past simple: -ed dan kata kerja tak beraturan",
      body: "Kejadian yang sudah selesai memakai bentuk lampau. Kata kerja beraturan cukup ditambah -ed, tetapi banyak kata kerja umum tak beraturan dan perlu dihafal (go → went, see → saw). Kalimat negatif dan pertanyaan memakai did + bentuk dasar.",
      examples: `
I visited Bali last year. | Saya mengunjungi Bali tahun lalu.
We went to the beach. | Kami pergi ke pantai.
Did you see the movie? | Apakah kamu menonton film itu?`,
    },
    {
      title: "Present perfect untuk pernah dan sudah",
      body: "have/has + bentuk ketiga dipakai untuk pengalaman tanpa waktu yang jelas dan hal yang baru selesai. Jangan memakainya bersama keterangan waktu lampau seperti yesterday atau last year.",
      examples: `
I have never been to Japan. | Saya belum pernah ke Jepang.
Have you finished your homework? | Apakah kamu sudah menyelesaikan PR-mu?
She has already left. | Dia sudah pergi.`,
    },
    {
      title: "Masa depan: will dan going to",
      body: "will dipakai untuk keputusan spontan, janji, dan ramalan. be going to dipakai untuk rencana yang sudah dibuat sebelumnya.",
      examples: `
I'll help you. | Saya akan membantumu.
I'm going to study abroad next year. | Saya akan kuliah di luar negeri tahun depan.
It will rain tomorrow. | Besok akan hujan.`,
    },
    {
      title: "Perbandingan: -er than dan more … than",
      body: "Kata sifat pendek ditambah -er (lebih) dan -est (paling). Kata sifat panjang memakai more dan most. Beberapa tidak beraturan: good → better → best, bad → worse → worst.",
      examples: `
Jakarta is bigger than Bandung. | Jakarta lebih besar daripada Bandung.
This book is more interesting than that one. | Buku ini lebih menarik daripada yang itu.
It was the best day of my life. | Itu hari terbaik dalam hidup saya.`,
    },
  ],

  jepang: [
    {
      title: "Bentuk lampau ました dan かった",
      body: "Kata kerja sopan: ます menjadi ました, dan ません menjadi ませんでした. Kata sifat-い: い diganti かったです. Kata sifat-な dan kata benda: です menjadi でした.",
      examples: `
昨日、映画を見ました。 | kinō, eiga o mimashita. | Kemarin saya menonton film.
旅行は楽しかったです。 | ryokō wa tanoshikatta desu. | Perjalanannya menyenangkan.
海はきれいでした。 | umi wa kirei deshita. | Lautnya indah.`,
    },
    {
      title: "Pernah: 〜たことがあります",
      body: "Bentuk-た kata kerja + ことがあります berarti pernah. Negatifnya, ことがありません, berarti belum pernah.",
      examples: `
富士山に登ったことがあります。 | Fujisan ni nobotta koto ga arimasu. | Saya pernah mendaki Gunung Fuji.
納豆を食べたことがありません。 | nattō o tabeta koto ga arimasen. | Saya belum pernah makan natto.`,
    },
    {
      title: "Masa depan dan rencana: つもり dan 予定",
      body: "Bahasa Jepang tidak punya bentuk khusus untuk masa depan; bentuk ます juga berarti akan. Untuk niat pribadi pakai bentuk kamus + つもりです, dan untuk jadwal yang sudah pasti pakai 予定です.",
      examples: `
明日、京都に行きます。 | ashita, Kyōto ni ikimasu. | Besok saya akan pergi ke Kyoto.
来年、日本で働くつもりです。 | rainen, Nihon de hataraku tsumori desu. | Tahun depan saya berniat bekerja di Jepang.
三時に出発する予定です。 | sanji ni shuppatsu suru yotei desu. | Rencananya berangkat jam tiga.`,
    },
    {
      title: "Perbandingan: より dan いちばん",
      body: "A は B より + sifat berarti A lebih … daripada B. Untuk paling, pakai いちばん. Pertanyaan pilihan: A と B と どちらが …?",
      examples: `
電車はバスより速いです。 | densha wa basu yori hayai desu. | Kereta lebih cepat daripada bus.
夏がいちばん好きです。 | natsu ga ichiban suki desu. | Saya paling suka musim panas.
犬と猫とどちらが好きですか。 | inu to neko to dochira ga suki desu ka. | Kamu lebih suka anjing atau kucing?`,
    },
  ],

  korea: [
    {
      title: "Bentuk lampau -았/었어요",
      body: "Tambahkan -았어요 jika vokal terakhir batang kata ㅏ atau ㅗ, dan -었어요 untuk vokal lainnya. 하다 menjadi 했어요.",
      examples: `
어제 영화를 봤어요. | eoje yeonghwareul bwasseoyo. | Kemarin saya menonton film.
친구를 만났어요. | chingureul mannasseoyo. | Saya bertemu teman.
숙제를 했어요. | sukjereul haesseoyo. | Saya mengerjakan PR.`,
    },
    {
      title: "Pernah: -(으)ㄴ 적이 있다",
      body: "Batang kata + -(으)ㄴ 적이 있어요 berarti pernah; 없어요 berarti belum pernah. Sering dipakai bersama -아/어 보다 (mencoba): 가 본 적이 있어요.",
      examples: `
한국에 가 본 적이 있어요. | hanguge ga bon jeogi isseoyo. | Saya pernah ke Korea.
김치를 먹어 본 적이 없어요. | gimchireul meogeo bon jeogi eopseoyo. | Saya belum pernah makan kimchi.`,
    },
    {
      title: "Masa depan -(으)ㄹ 거예요",
      body: "Batang kata + ㄹ 거예요 (berakhir vokal) atau 을 거예요 (berakhir konsonan) untuk rencana dan dugaan. -(으)ㄹ게요 dipakai untuk janji kepada lawan bicara.",
      examples: `
내일 부산에 갈 거예요. | naeil Busane gal geoyeyo. | Besok saya akan pergi ke Busan.
주말에 책을 읽을 거예요. | jumare chaegeul ilgeul geoyeyo. | Akhir pekan saya akan membaca buku.
제가 도와줄게요. | jega dowajulgeyo. | Saya akan membantu (berjanji).`,
    },
    {
      title: "Perbandingan: 보다 dan 제일",
      body: "A이/가 B보다 (더) + sifat berarti A lebih … daripada B. Untuk paling, pakai 제일 atau 가장.",
      examples: `
기차가 버스보다 빨라요. | gichaga beoseuboda ppallayo. | Kereta lebih cepat daripada bus.
한국어가 영어보다 더 어려워요. | hangugeoga yeongeoboda deo eoryeowoyo. | Bahasa Korea lebih sulit daripada bahasa Inggris.
김치찌개를 제일 좋아해요. | gimchi jjigaereul jeil joahaeyo. | Saya paling suka kimchi jjigae.`,
    },
  ],

  mandarin: [
    {
      title: "Sudah terjadi: 了, dan pernah: 过",
      body: "Kata kerja tidak berubah. 了 setelah kata kerja menandai tindakan yang sudah terjadi, sedangkan 过 menandai pengalaman (pernah). Bentuk negatifnya memakai 没, tanpa 了.",
      examples: `
我昨天看了一部电影。 | wǒ zuótiān kàn le yí bù diànyǐng. | Kemarin saya menonton sebuah film.
我去过北京。 | wǒ qù guo Běijīng. | Saya pernah ke Beijing.
我还没吃早饭。 | wǒ hái méi chī zǎofàn. | Saya belum sarapan.`,
    },
    {
      title: "Masa depan: 要, 会, dan 打算",
      body: "Tambahkan keterangan waktu, lalu 要 (akan, mau), 会 (kemungkinan atau ramalan), atau 打算 (berencana) sebelum kata kerja.",
      examples: `
明天我要去上海。 | míngtiān wǒ yào qù Shànghǎi. | Besok saya akan pergi ke Shanghai.
明天会下雨。 | míngtiān huì xià yǔ. | Besok akan hujan.
我打算明年去中国留学。 | wǒ dǎsuàn míngnián qù Zhōngguó liúxué. | Saya berencana kuliah di Tiongkok tahun depan.`,
    },
    {
      title: "Perbandingan: 比 dan 最",
      body: "A 比 B + sifat berarti A lebih … daripada B. Jangan tambahkan 很 setelah 比; pakai 一点儿 (sedikit) atau 多了 (jauh) di belakangnya. Untuk paling, pakai 最.",
      examples: `
火车比汽车快。 | huǒchē bǐ qìchē kuài. | Kereta lebih cepat daripada mobil.
今天比昨天冷一点儿。 | jīntiān bǐ zuótiān lěng yìdiǎnr. | Hari ini sedikit lebih dingin daripada kemarin.
这是我最喜欢的菜。 | zhè shì wǒ zuì xǐhuan de cài. | Ini masakan yang paling saya sukai.`,
    },
  ],

  arab: [
    {
      title: "Kata kerja lampau (al-māḍī)",
      body: "Bentuk lampau adalah bentuk dasar kata kerja, lalu diberi akhiran sesuai pelaku: كتب (dia lk menulis), كتبت (saya menulis), كتبنا (kami menulis).",
      examples: `
ذهبت إلى السوق. | dhahabtu ilā as-sūq. | Saya pergi ke pasar.
زرنا المتحف أمس. | zurnā al-matḥaf ams. | Kami mengunjungi museum kemarin.
هل أكلت؟ | hal akalta? | Apakah kamu (lk) sudah makan?`,
    },
    {
      title: "Masa depan dengan سـ dan سوف",
      body: "Untuk akan, tambahkan سـ (sa-) yang menempel di depan kata kerja bentuk sekarang, atau سوف (sawfa) sebagai kata terpisah. Bentuk negatifnya memakai لن.",
      examples: `
سأسافر غدا. | sa-usāfiru ghadan. | Saya akan bepergian besok.
سوف ندرس العربية. | sawfa nadrusu al-ʿarabiyya. | Kami akan belajar bahasa Arab.
لن أذهب. | lan adhhaba. | Saya tidak akan pergi.`,
    },
    {
      title: "Perbandingan pola أفعل",
      body: "Bentuk lebih dibuat dengan pola afʿal dari akar kata sifat, lalu من (daripada): كبير menjadi أكبر. Jika diletakkan di depan kata benda, artinya paling.",
      examples: `
القطار أسرع من الحافلة. | al-qiṭār asraʿ min al-ḥāfila. | Kereta lebih cepat daripada bus.
أخي أكبر مني. | akhī akbar minnī. | Saudara laki-laki saya lebih tua daripada saya.
هذا أجمل مكان. | hādhā ajmal makān. | Ini tempat paling indah.`,
    },
  ],

  jerman: [
    {
      title: "Perfekt untuk bercerita",
      body: "Dalam percakapan, kejadian lampau memakai haben atau sein + Partizip II di akhir kalimat. sein dipakai untuk kata kerja gerak dan perubahan keadaan seperti gehen, fahren, dan fliegen.",
      examples: `
Ich habe einen Film gesehen. | Saya menonton film.
Wir sind nach Berlin gefahren. | Kami pergi ke Berlin (naik kendaraan).
Hast du schon gegessen? | Apakah kamu sudah makan?`,
    },
    {
      title: "Masa depan: Präsens atau werden",
      body: "Jika ada keterangan waktu, bentuk sekarang sudah cukup. werden + infinitif di akhir kalimat dipakai untuk menekankan rencana atau untuk dugaan.",
      examples: `
Morgen fahre ich nach München. | Besok saya pergi ke München.
Nächstes Jahr werde ich in Deutschland studieren. | Tahun depan saya akan kuliah di Jerman.
Es wird morgen regnen. | Besok akan hujan.`,
    },
    {
      title: "Perbandingan: -er als dan am -sten",
      body: "Tambahkan -er + als untuk lebih … daripada, dan am …-sten untuk paling. Banyak kata sifat pendek mendapat umlaut: alt menjadi älter. Tidak beraturan: gut, besser, am besten.",
      examples: `
Der Zug ist schneller als der Bus. | Kereta lebih cepat daripada bus.
Mein Bruder ist älter als ich. | Saudara laki-laki saya lebih tua daripada saya.
Im Sommer ist es hier am schönsten. | Di sini paling indah saat musim panas.`,
    },
  ],

  prancis: [
    {
      title: "Passé composé",
      body: "Kejadian lampau yang sudah selesai memakai avoir atau être + participe passé. être dipakai untuk kata kerja gerak seperti aller, venir, dan partir, dan participe-nya menyesuaikan gender subjek.",
      examples: `
J'ai visité le musée. | Saya mengunjungi museum.
Elle est allée à Lyon. | Dia (pr) pergi ke Lyon.
Nous avons mangé au restaurant. | Kami makan di restoran.`,
    },
    {
      title: "Masa depan: futur proche dan futur simple",
      body: "aller + infinitif dipakai untuk rencana dekat. Futur simple dibentuk dari infinitif + -ai, -as, -a, -ons, -ez, -ont.",
      examples: `
Je vais partir demain. | Saya akan berangkat besok.
L'année prochaine, j'étudierai en France. | Tahun depan saya akan kuliah di Prancis.
Il pleuvra ce soir. | Malam ini akan hujan.`,
    },
    {
      title: "Perbandingan: plus … que",
      body: "plus, moins, atau aussi + sifat + que. Untuk paling, pakai le/la/les plus. Tidak beraturan: bon menjadi meilleur.",
      examples: `
Le train est plus rapide que le bus. | Kereta lebih cepat daripada bus.
Ce livre est moins cher que l'autre. | Buku ini lebih murah daripada yang lain.
C'est le meilleur restaurant de la ville. | Ini restoran terbaik di kota.`,
    },
  ],

  spanyol: [
    {
      title: "Pretérito indefinido dan imperfecto",
      body: "Indefinido dipakai untuk kejadian yang selesai pada waktu tertentu (ayer, el año pasado). Imperfecto dipakai untuk kebiasaan dan latar cerita di masa lalu.",
      examples: `
Ayer visité a mi abuela. | Kemarin saya mengunjungi nenek.
Fuimos a la playa en agosto. | Kami pergi ke pantai pada bulan Agustus.
De niño, jugaba al fútbol todos los días. | Waktu kecil, saya bermain sepak bola setiap hari.`,
    },
    {
      title: "Masa depan: ir a + infinitif dan futuro",
      body: "ir a + infinitif dipakai untuk rencana dekat. Futuro simple dibentuk dari infinitif + -é, -ás, -á, -emos, -éis, -án.",
      examples: `
Voy a estudiar esta noche. | Saya akan belajar malam ini.
El año que viene viajaré a México. | Tahun depan saya akan bepergian ke Meksiko.
Mañana lloverá. | Besok akan hujan.`,
    },
    {
      title: "Perbandingan: más … que",
      body: "más atau menos + sifat + que, dan tan … como untuk sama …-nya. Untuk paling, pakai el/la más. Tidak beraturan: bueno menjadi mejor, malo menjadi peor.",
      examples: `
Madrid es más grande que Sevilla. | Madrid lebih besar daripada Sevilla.
Mi hermana es tan alta como yo. | Saudara perempuan saya sama tingginya dengan saya.
Es la mejor paella de la ciudad. | Ini paella terbaik di kota.`,
    },
  ],

  rusia: [
    {
      title: "Bentuk lampau mengikuti gender",
      body: "Hapus -ть dari infinitif, lalu tambahkan -л (lk), -ла (pr), -ло (netral), atau -ли (jamak). Bentuknya ditentukan gender subjek, bukan orang pertama atau kedua.",
      examples: `
Я читал книгу. | ya chital knigu. | Saya (lk) membaca buku.
Она была в Москве. | ona byla v Moskve. | Dia (pr) pernah ke Moskwa.
Мы смотрели фильм. | my smotreli fil'm. | Kami menonton film.`,
    },
    {
      title: "Masa depan dan aspek",
      body: "Kata kerja imperfektif memakai буду + infinitif untuk proses di masa depan. Kata kerja perfektif dalam bentuk sekarang sudah bermakna masa depan, dengan arti tindakan itu akan selesai.",
      examples: `
Завтра я буду работать. | zavtra ya budu rabotat'. | Besok saya akan bekerja.
Я прочитаю эту книгу. | ya prochitayu etu knigu. | Saya akan membaca buku ini sampai selesai.
Мы поедем на море. | my poyedem na more. | Kami akan pergi ke laut.`,
    },
    {
      title: "Perbandingan: -ее dan чем",
      body: "Tambahkan -ее pada kata sifat (интересный menjadi интереснее), lalu чем + pembanding. Untuk paling, pakai самый + kata sifat.",
      examples: `
Поезд быстрее, чем автобус. | poyezd bystreye, chem avtobus. | Kereta lebih cepat daripada bus.
Летом теплее, чем зимой. | letom tepleye, chem zimoy. | Musim panas lebih hangat daripada musim dingin.
Это самый красивый город. | eto samyy krasivyy gorod. | Ini kota paling indah.`,
    },
  ],

  italia: [
    {
      title: "Passato prossimo",
      body: "avere atau essere + participio passato. essere dipakai untuk kata kerja gerak dan perubahan seperti andare, venire, dan partire, dan participio-nya menyesuaikan gender dan jumlah.",
      examples: `
Ho mangiato una pizza. | Saya makan pizza.
Siamo andati a Firenze. | Kami pergi ke Firenze.
Hai visto il film? | Apakah kamu sudah menonton film itu?`,
    },
    {
      title: "Futuro semplice",
      body: "Hapus -e di akhir infinitif lalu tambahkan -ò, -ai, -à, -emo, -ete, -anno; akhiran -are berubah menjadi -er-. Dalam percakapan, bentuk sekarang + keterangan waktu juga lazim.",
      examples: `
Domani partirò per Roma. | Besok saya akan berangkat ke Roma.
L'anno prossimo studierò l'italiano. | Tahun depan saya akan belajar bahasa Italia.
Stasera mangiamo a casa. | Malam ini kami makan di rumah.`,
    },
    {
      title: "Perbandingan: più … di",
      body: "più atau meno + sifat + di (sebelum kata benda atau kata ganti) atau che (sebelum kata sifat dan kata kerja). Untuk paling, pakai il/la più. Tidak beraturan: buono menjadi migliore.",
      examples: `
Roma è più grande di Firenze. | Roma lebih besar daripada Firenze.
È più facile parlare che scrivere. | Berbicara lebih mudah daripada menulis.
È il gelato migliore della città. | Ini gelato terbaik di kota.`,
    },
  ],

  thai: [
    {
      title: "Sudah dan pernah: แล้ว dan เคย",
      body: "Kata kerja tidak berubah. แล้ว di akhir kalimat menandai sesuatu sudah terjadi, dan เคย di depan kata kerja berarti pernah. Keterangan waktu sering sudah cukup untuk menunjukkan masa lalu.",
      examples: `
ฉันกินข้าวแล้ว | chan kin khao laeo. | Saya sudah makan.
เมื่อวานฉันไปตลาด | muea wan chan pai talat. | Kemarin saya pergi ke pasar.
คุณเคยไปเชียงใหม่ไหม | khun khoei pai Chiang Mai mai? | Apakah kamu pernah ke Chiang Mai?`,
    },
    {
      title: "Masa depan dengan จะ",
      body: "Letakkan จะ di depan kata kerja untuk akan. ตั้งใจจะ berarti berniat.",
      examples: `
พรุ่งนี้ฉันจะไปทะเล | phrung ni chan cha pai thale. | Besok saya akan pergi ke laut.
ปีหน้าเขาจะเรียนภาษาไทย | pi na khao cha rian phasa thai. | Tahun depan dia akan belajar bahasa Thai.
ฉันตั้งใจจะออกกำลังกายทุกวัน | chan tang chai cha ok kamlang kai thuk wan. | Saya berniat berolahraga setiap hari.`,
    },
    {
      title: "Perbandingan: กว่า dan ที่สุด",
      body: "Sifat + กว่า berarti lebih … daripada. Sifat + ที่สุด berarti paling.",
      examples: `
รถไฟเร็วกว่ารถเมล์ | rot fai reo kwa rot me. | Kereta lebih cepat daripada bus.
วันนี้ร้อนกว่าเมื่อวาน | wan ni ron kwa muea wan. | Hari ini lebih panas daripada kemarin.
ร้านนี้อร่อยที่สุด | ran ni aroi thi sut. | Warung ini paling enak.`,
    },
  ],

  hindi: [
    {
      title: "Bentuk lampau mengikuti gender",
      body: "Kata kerja lampau berakhiran -ā (lk), -ī (pr), atau -e (jamak). Untuk kata kerja transitif, subjek diberi ने dan kata kerjanya menyesuaikan objek.",
      examples: `
मैं बाज़ार गया। | maiṃ bāzār gayā. | Saya (lk) pergi ke pasar.
वह कल दिल्ली आई। | vah kal Dillī āī. | Dia (pr) datang ke Delhi kemarin.
मैंने खाना खाया। | maiṃne khānā khāyā. | Saya sudah makan.`,
    },
    {
      title: "Masa depan: -ūṃgā dan -egā",
      body: "Tambahkan akhiran masa depan pada batang kata: -ūṃgā (saya, lk), -egā (dia, lk), -eṃge (kami atau Anda). Untuk perempuan, akhiran -ā berubah menjadi -ī.",
      examples: `
मैं कल जाऊँगा। | maiṃ kal jāūṃgā. | Saya (lk) akan pergi besok.
वह हिंदी सीखेगी। | vah hindī sīkhegī. | Dia (pr) akan belajar bahasa Hindi.
हम फ़िल्म देखेंगे। | ham film dekheṃge. | Kami akan menonton film.`,
    },
    {
      title: "Perbandingan: से ज़्यादा dan सबसे",
      body: "A, B से (ज़्यादा) + sifat berarti A lebih … daripada B. Untuk paling, pakai सबसे + sifat.",
      examples: `
ट्रेन बस से तेज़ है। | ṭren bas se tez hai. | Kereta lebih cepat daripada bus.
यह किताब उससे ज़्यादा दिलचस्प है। | yah kitāb usse zyādā dilcasp hai. | Buku ini lebih menarik daripada buku itu.
यह सबसे अच्छा होटल है। | yah sabse achchhā hoṭal hai. | Ini hotel terbaik.`,
    },
  ],
};

export function grammarB1For(slug: string): Grammar[] {
  return (RAW[slug] ?? []).map((g) => ({ ...g, examples: examples(g.examples) }));
}
