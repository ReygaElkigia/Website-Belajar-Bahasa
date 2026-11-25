import { defineLanguage } from "../define";

export default defineLanguage({
  slug: "prancis",
  name: "Prancis",
  native: "Français",
  tts: "fr-FR",
  code: "fr",
  dir: "ltr",
  script: "Latin",
  glyph: "Çç",
  speakers: 310,
  challenge: 2,
  challengeNote: "Banyak huruf akhir tidak dibaca dan ada vokal sengau, tetapi kosakatanya banyak yang mirip bahasa Inggris.",
  regions: "Prancis, Kanada, Belgia, Swiss, dan lebih dari 20 negara di Afrika",
  about:
    "Bahasa resmi PBB, Uni Afrika, dan Olimpiade, serta bahasa diplomasi, mode, dan kuliner. Kata-kata seperti kafe, restoran, dan parfum masuk ke bahasa Indonesia lewat bahasa Belanda dari bahasa Prancis.",
  vocab: `
halo | Salut | sopan: Bonjour
pagi | Bonjour
malam | Bonsoir | sebelum tidur: Bonne nuit
terimakasih | Merci
samasama | De rien
maaf | Désolé | penutur perempuan: Désolée
permisi | Excusez-moi
ya | Oui
tidak | Non
dadah | Au revoir
saya | je
kamu | tu | formal: vous
nama | le nom
teman | l'ami | perempuan: l'amie
guru | le professeur
pelajar | l'étudiant | perempuan: l'étudiante
negara | le pays
bahasa | la langue
indonesia | l'Indonésie
berbicara | parler
satu | un
dua | deux
tiga | trois
empat | quatre
lima | cinq
enam | six
tujuh | sept
delapan | huit
sembilan | neuf
sepuluh | dix
keluarga | la famille
ayah | le père | akrab: papa
ibu | la mère | akrab: maman
anak | l'enfant
saudaralk | le frère
saudarapr | la sœur
suami | le mari
istri | la femme
kakek | le grand-père
nenek | la grand-mère
makan | manger
minum | boire
air | l'eau
nasi | le riz
roti | le pain
kopi | le café
teh | le thé
ikan | le poisson
ayam | le poulet
enak | délicieux
hariini | aujourd'hui
besok | demain
kemarin | hier
sekarang | maintenant
jam | l'heure
hari | le jour
minggu | la semaine
bulan | le mois
tahun | l'an | juga l'année
pagihari | le matin
dimana | où
kiri | à gauche
kanan | à droite
lurus | tout droit
dekat | près
jauh | loin
stasiun | la gare
rumah | la maison
toilet | les toilettes
hotel | l'hôtel
berapa | combien
harga | le prix
mahal | cher
murah | bon marché
uang | l'argent
membeli | acheter
toko | le magasin
ini | ceci | lisan: ça
itu | cela
membayar | payer
mobil | la voiture
bus | le bus
kereta | le train
pesawat | l'avion
sepeda | le vélo
tiket | le billet
jalan | la route | | jalan di kota: la rue
bandara | l'aéroport
berangkat | partir
tiba | arriver
kepala | la tête
mata | l'œil | | jamak: les yeux
tangan | la main
kaki | le pied | | tungkai: la jambe
perut | le ventre
sakit | malade
dokter | le médecin
obat | le médicament
rumahsakit | l'hôpital
demam | la fièvre
cuaca | le temps | | prakiraan cuaca: la météo
panas | chaud
dingin | froid
hujan | la pluie
matahari | le soleil
angin | le vent
laut | la mer
gunung | la montagne
sungai | la rivière | | sungai besar ke laut: le fleuve
musim | la saison
bekerja | travailler
belajar | étudier | | mempelajari keterampilan: apprendre
membaca | lire
menulis | écrire
tidur | dormir
pergi | aller
datang | venir
kantor | le bureau
sekolah | l'école
libur | les vacances
musik | la musique
film | le film
olahraga | le sport
berenang | nager
memasak | cuisiner | | juga: faire la cuisine
bernyanyi | chanter
menonton | regarder
bermain | jouer
akhirpekan | le week-end
suka | aimer
paspor | le passeport
koper | la valise
pantai | la plage
peta | la carte | | peta kota: le plan
pemesanan | la réservation
turis | le touriste
oleholeh | le souvenir
pemandangan | la vue | | juga: le paysage
pengalaman | l'expérience
mengunjungi | visiter | | mengunjungi orang: rendre visite à
senang | content | | bahagia: heureux
sedih | triste
marah | en colère
takut | avoir peur | | J'ai peur. = Saya takut.
lelah | fatigué
khawatir | inquiet
menarik | intéressant
membosankan | ennuyeux
setuju | être d'accord
pendapat | l'avis | | juga: l'opinion
dulu | autrefois | | kebiasaan lampau memakai imparfait
nanti | plus tard
rencana | le projet
mimpi | le rêve
masadepan | l'avenir
pernah | déjà | | As-tu déjà … ? = Pernahkah kamu … ?
sudah | déjà
belum | pas encore
mulai | commencer
selesai | finir | | juga: terminer
`,
  phrases: `
s1 | Comment ça va ?
s2 | Ça va bien, merci.
s3 | Enchanté.
s4 | À bientôt !
k1 | Je m'appelle Rina.
k2 | Comment tu t'appelles ?
k3 | Je viens d'Indonésie.
k4 | Je ne comprends pas.
k5 | Parlez lentement, s'il vous plaît.
a1 | Quel âge as-tu ?
a2 | J'ai vingt ans.
a3 | Encore un, s'il vous plaît.
f1 | C'est ma mère.
f2 | Tu as des frères et sœurs ?
f3 | Ma famille habite à Jakarta.
m1 | J'ai faim.
m2 | Un verre d'eau, s'il vous plaît.
m3 | C'est délicieux !
m4 | L'addition, s'il vous plaît.
w1 | Quelle heure est-il ?
w2 | On est quel jour aujourd'hui ?
w3 | À demain !
w4 | Je suis occupé aujourd'hui.
d1 | Où sont les toilettes ?
d2 | Tournez à gauche.
d3 | C'est loin d'ici ?
d4 | Je suis perdu.
b1 | Combien ça coûte ?
b2 | C'est trop cher.
b3 | Je voudrais acheter ça.
b4 | Je peux payer par carte ?
t1 | Où va ce bus ?
t2 | Un billet pour Bandung, s'il vous plaît.
t3 | À quelle heure part le train ?
h1 | Je suis malade.
h2 | J'ai mal à la tête.
h3 | Appelez un médecin, s'il vous plaît !
c1 | Il fait très chaud aujourd'hui.
c2 | Il va pleuvoir demain.
c3 | Il fait beau.
g1 | Je travaille dans un bureau.
g2 | J'étudie tous les jours.
g3 | Quels sont tes loisirs ?
o1 | J'aime écouter de la musique.
o2 | Qu'est-ce que tu fais le week-end ?
o3 | Je joue au foot deux fois par semaine.
o4 | On va voir un film ensemble ?
j1 | J'ai réservé une chambre pour deux nuits.
j2 | L'année dernière, j'ai visité Bali avec ma famille.
j3 | Pourriez-vous me recommander un endroit intéressant ?
j4 | La vue est plus belle que je ne l'imaginais.
e1 | À mon avis, cette idée est très bonne.
e2 | Je ne suis pas d'accord avec toi.
e3 | Je suis inquiet parce que j'ai un examen demain. | | penutur perempuan: inquiète
e4 | Ce film est plus intéressant que le livre.
r1 | Quand j'étais petit, j'habitais dans un village. | | penutur perempuan: petite
r2 | Je n'ai jamais pris l'avion.
r3 | L'année prochaine, j'étudierai à l'étranger.
r4 | Si j'ai le temps, je voudrais apprendre une autre langue.
`,
  alphabet: {
    title: "Aksen dan bunyi",
    intro:
      "Hurufnya Latin, tetapi tanda aksen mengubah bunyi dan banyak huruf akhir tidak diucapkan. Kuasai pola di bawah ini sebelum menghafal kosakata.",
    sections: [
      {
        title: "Huruf beraksen",
        cols: 4,
        items:
          "é=e seperti pada 'sate'|accent aigu|café;è / ê=e terbuka seperti pada 'bebek'|accent grave, circonflexe|mère;ç=s|cédille|français;à / ù=a / u|aksen pembeda arti|où",
      },
      {
        title: "Pola bunyi penting",
        cols: 3,
        items:
          "ou=u|vous|vous;oi=wa|moi|moi;eau / au=o|beau|beau;u=bibir bulat, ucap i|tu|tu;an / en=sengau 'ang'|enfant|enfant;on=sengau 'ong'|bonjour|bonjour;in / ain=sengau 'eng'|vin, pain|pain;r=dari pangkal tenggorokan|rouge|rouge;gn=ny|montagne|montagne;huruf akhir=sering tidak dibaca|petit, Paris|petit",
      },
    ],
  },
  grammar: [
    {
      title: "Dua gender: le dan la",
      body: "Kata benda maskulin memakai le, feminin memakai la. Sebelum vokal keduanya menjadi l', dan bentuk jamaknya les.",
      examples: `
le livre | buku
la table | meja
l'eau, les amis | air, teman-teman`,
    },
    {
      title: "Kata sifat di belakang kata benda",
      body: "Seperti bahasa Indonesia, kebanyakan kata sifat diletakkan setelah kata benda. Kata sifat ikut berubah mengikuti gender.",
      examples: `
une maison blanche | sebuah rumah putih
un café noir | kopi hitam`,
    },
    {
      title: "Konjugasi kata kerja",
      body: "Akhiran kata kerja berubah menurut subjek. Untungnya, beberapa bentuk diucapkan sama.",
      examples: `
je parle, tu parles, il parle | saya, kamu, dia berbicara
nous parlons, vous parlez | kami, kalian berbicara`,
    },
    {
      title: "Negasi ne ... pas",
      body: "Kalimat negatif mengapit kata kerja dengan ne dan pas. Dalam percakapan santai, ne sering dihilangkan.",
      examples: `
Je ne parle pas français. | Saya tidak berbicara bahasa Prancis.`,
    },
    {
      title: "Liaison: huruf akhir yang tiba-tiba dibaca",
      body: "Huruf akhir yang biasanya diam akan diucapkan jika kata berikutnya diawali vokal.",
      examples: `
les amis | lé-za-mi | teman-teman`,
    },
  ],
  videos: [
    { id: "xOd7-UqvN2A", title: "Two Women Meet in the Street", kind: "Percakapan", about: "Percakapan pendek di jalan, cocok untuk tingkat A1 sampai A2." },
    { id: "eH4XD2KBEC0", title: "Easy French Dialogue for Beginners", kind: "Percakapan", about: "Dialog sederhana untuk pemula dengan tempo yang jelas." },
  ],
});
