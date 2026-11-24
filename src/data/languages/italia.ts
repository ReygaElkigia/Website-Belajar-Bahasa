import { defineLanguage } from "../define";

export default defineLanguage({
  slug: "italia",
  name: "Italia",
  native: "Italiano",
  tts: "it-IT",
  code: "it",
  dir: "ltr",
  script: "Latin",
  glyph: "Èè",
  speakers: 68,
  challenge: 1,
  challengeNote: "Vokal jelas seperti bahasa Indonesia dan ejaannya teratur. Cocok sebagai bahasa Eropa pertama.",
  regions: "Italia, Swiss, San Marino, Vatikan",
  about:
    "Bahasa musik, seni, dan kuliner. Bunyinya terdengar akrab bagi telinga Indonesia karena hampir setiap kata berakhir dengan vokal dan setiap huruf diucapkan.",
  vocab: `
halo | Ciao | sopan: Salve
pagi | Buongiorno
malam | Buonasera | sebelum tidur: Buonanotte
terimakasih | Grazie
samasama | Prego
maaf | Mi dispiace
permisi | Scusi | akrab: Scusa
ya | Sì
tidak | No
dadah | Arrivederci
saya | io
kamu | tu | formal: Lei
nama | il nome
teman | l'amico | perempuan: l'amica
guru | l'insegnante
pelajar | lo studente | perempuan: la studentessa
negara | il paese
bahasa | la lingua
indonesia | l'Indonesia
berbicara | parlare
satu | uno
dua | due
tiga | tre
empat | quattro
lima | cinque
enam | sei
tujuh | sette
delapan | otto
sembilan | nove
sepuluh | dieci
keluarga | la famiglia
ayah | il padre | akrab: papà
ibu | la madre | akrab: mamma
anak | il bambino | perempuan: la bambina
saudaralk | il fratello
saudarapr | la sorella
suami | il marito
istri | la moglie
kakek | il nonno
nenek | la nonna
makan | mangiare
minum | bere
air | l'acqua
nasi | il riso
roti | il pane
kopi | il caffè
teh | il tè
ikan | il pesce
ayam | il pollo
enak | buono
hariini | oggi
besok | domani
kemarin | ieri
sekarang | adesso
jam | l'ora
hari | il giorno
minggu | la settimana
bulan | il mese
tahun | l'anno
pagihari | la mattina
dimana | dove
kiri | a sinistra
kanan | a destra
lurus | dritto
dekat | vicino
jauh | lontano
stasiun | la stazione
rumah | la casa
toilet | il bagno
hotel | l'albergo | juga l'hotel
berapa | quanto
harga | il prezzo
mahal | caro
murah | economico
uang | i soldi
membeli | comprare
toko | il negozio
ini | questo
itu | quello
membayar | pagare
`,
  phrases: `
s1 | Come stai?
s2 | Sto bene, grazie.
s3 | Piacere di conoscerti.
s4 | A presto!
k1 | Mi chiamo Rina.
k2 | Come ti chiami?
k3 | Vengo dall'Indonesia.
k4 | Non capisco.
k5 | Parli più lentamente, per favore.
a1 | Quanti anni hai?
a2 | Ho vent'anni.
a3 | Un altro, per favore.
f1 | Questa è mia madre.
f2 | Hai fratelli o sorelle?
f3 | La mia famiglia vive a Giacarta.
m1 | Ho fame.
m2 | Un bicchiere d'acqua, per favore.
m3 | È buonissimo!
m4 | Il conto, per favore.
w1 | Che ore sono?
w2 | Che giorno è oggi?
w3 | A domani!
w4 | Oggi sono occupato.
d1 | Dov'è il bagno?
d2 | Giri a sinistra.
d3 | È lontano da qui?
d4 | Mi sono perso.
b1 | Quanto costa?
b2 | È troppo caro.
b3 | Vorrei comprare questo.
b4 | Posso pagare con la carta?
`,
  alphabet: {
    title: "Alfabet dan bunyi",
    intro:
      "Bahasa Italia dibaca seperti ditulis. Yang perlu diperhatikan hanya huruf c dan g, yang bunyinya berubah di depan e dan i, serta konsonan ganda yang diucapkan lebih panjang.",
    sections: [
      {
        title: "Pola bunyi penting",
        cols: 3,
        items:
          "c + a, o, u=k|casa|casa;c + e, i=c seperti pada 'cari'|ciao, cena|ciao;ch=k|chiesa|chiesa;g + e, i=j|gelato|gelato;gh=g|spaghetti|spaghetti;gn=ny|gnocchi|gnocchi;gli=ly|famiglia|famiglia;sc + e, i=sy|scienza|scienza;z=ts atau dz|pizza|pizza;h=tidak dibaca|ho, hotel|ho;konsonan ganda=diucapkan lebih panjang|notte, pizza|notte",
      },
    ],
  },
  grammar: [
    {
      title: "Dua gender dari akhiran",
      body: "Kata yang berakhiran -o umumnya maskulin (il), yang berakhiran -a umumnya feminin (la).",
      examples: `
il libro | buku
la casa | rumah`,
    },
    {
      title: "Jamak dengan mengganti vokal akhir",
      body: "Tidak ada pengulangan kata seperti 'buku-buku'. Vokal terakhir diganti: -o menjadi -i, -a menjadi -e.",
      examples: `
libro → libri | buku → buku-buku
casa → case | rumah → rumah-rumah`,
    },
    {
      title: "Konjugasi dan subjek yang dihilangkan",
      body: "Akhiran kata kerja sudah menunjukkan pelakunya, jadi io, tu, dan lainnya biasanya tidak diucapkan.",
      examples: `
parlo, parli, parla | saya, kamu, dia berbicara
Parlo italiano. | Saya berbicara bahasa Italia.`,
    },
    {
      title: "Tu dan Lei",
      body: "Pakai tu untuk teman dan keluarga. Pakai Lei, yang secara tata bahasa adalah kata ganti orang ketiga, untuk orang asing dan situasi resmi.",
      examples: `
Come stai? | Apa kabarmu? (akrab)
Come sta? | Apa kabar Anda? (formal)`,
    },
  ],
  videos: [
    { id: "DtkPriOj59U", title: "An Everyday Conversation in Slow Italian | Super Easy Italian 63", kind: "Percakapan", about: "Easy Italian: percakapan sehari-hari dengan bahasa Italia yang diperlambat." },
    { id: "8dKqZX4YYOE", title: "Easy Italian Dialogues for Beginners", kind: "Percakapan", about: "Dialog pendek untuk situasi sehari-hari." },
  ],
});
