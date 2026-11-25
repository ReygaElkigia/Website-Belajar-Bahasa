/**
 * Teks bacaan per bahasa, satu kalimat per baris: `teks | romanisasi`.
 * Urutannya sama dengan kalimat bahasa Indonesia di readings.ts.
 * Dimas laki-laki dan Rina perempuan; bentuk kata mengikuti itu.
 */

export const readingTexts: Record<string, { city: string; dimas: string; rina: string }> = {
  inggris: {
    city: "London",
    dimas: `
My name is Dimas, and I live in Bandung.
I'm busy on weekdays, so I like weekends.
Every Saturday morning, I go swimming with my older sister.
At noon, I cook fried rice for my family.
On Sundays, we usually watch a movie at home.
I like comedies because they're funny.
Next week, I want to play football with my friends.`,
    rina: `
Last year, Rina went to London for the first time.
Before she left, she was worried because she had never been on a plane.
In the end, the flight was more comfortable than she had imagined.
On the first day, she got lost and asked an old woman for directions.
The woman was very friendly and walked her all the way to the station.
For a week, she visited museums, parks and traditional markets.
In Rina's opinion, the food at the market was the best.
Every evening, she wrote about her experiences in her diary.
Before going home, she bought souvenirs for her family.
She will go back next year, so now she studies English every day.`,
  },

  jepang: {
    city: "Kyoto",
    dimas: `
ぼくの名前はディマスです。バンドンに住んでいます。 | boku no namae wa Dimasu desu. Bandon ni sunde imasu.
平日は忙しいので、週末が好きです。 | heijitsu wa isogashii node, shūmatsu ga suki desu.
毎週土曜日の朝、姉と泳ぎます。 | maishū doyōbi no asa, ane to oyogimasu.
昼は家族のためにナシゴレンを作ります。 | hiru wa kazoku no tame ni nashigoren o tsukurimasu.
日曜日は、たいてい家で映画を見ます。 | nichiyōbi wa, taitei ie de eiga o mimasu.
面白いので、コメディー映画が好きです。 | omoshiroi node, komedī eiga ga suki desu.
来週は友達とサッカーをしたいです。 | raishū wa tomodachi to sakkā o shitai desu.`,
    rina: `
去年、リナさんは初めて京都へ行きました。 | kyonen, Rina-san wa hajimete Kyōto e ikimashita.
出発する前は、飛行機に乗ったことがなかったので心配でした。 | shuppatsu suru mae wa, hikōki ni notta koto ga nakatta node shinpai deshita.
でも、フライトは想像していたより快適でした。 | demo, furaito wa sōzō shite ita yori kaiteki deshita.
一日目に道に迷って、おばあさんに道を聞きました。 | ichinichime ni michi ni mayotte, obāsan ni michi o kikimashita.
おばあさんはとても親切で、駅まで連れて行ってくれました。 | obāsan wa totemo shinsetsu de, eki made tsurete itte kuremashita.
一週間、博物館や公園や昔ながらの市場を訪れました。 | isshūkan, hakubutsukan ya kōen ya mukashinagara no ichiba o otozuremashita.
リナさんによると、市場の食べ物がいちばんおいしかったそうです。 | Rina-san ni yoru to, ichiba no tabemono ga ichiban oishikatta sō desu.
毎晩、その日の経験を日記に書きました。 | maiban, sono hi no keiken o nikki ni kakimashita.
帰る前に、家族へのお土産を買いました。 | kaeru mae ni, kazoku e no omiyage o kaimashita.
来年また行くつもりなので、今は毎日日本語を勉強しています。 | rainen mata iku tsumori na node, ima wa mainichi nihongo o benkyō shite imasu.`,
  },

  korea: {
    city: "Busan",
    dimas: `
제 이름은 디마스이고, 반둥에 살아요. | je ireumeun Dimaseuigo, Bandunge sarayo.
평일에는 바빠서 주말을 좋아해요. | pyeongireneun bappaseo jumareul joahaeyo.
매주 토요일 아침에 누나와 수영해요. | maeju toyoil achime nunawa suyeonghaeyo.
점심에는 가족을 위해 나시고렝을 만들어요. | jeomsimeneun gajogeul wihae nasigorengeul mandeureoyo.
일요일에는 보통 집에서 영화를 봐요. | iryoireneun botong jibeseo yeonghwareul bwayo.
코미디 영화는 재미있어서 좋아해요. | komidi yeonghwaneun jaemiisseoseo joahaeyo.
다음 주에는 친구들과 축구를 하고 싶어요. | daeum jueneun chingudeulgwa chukgureul hago sipeoyo.`,
    rina: `
작년에 리나는 처음으로 부산에 갔어요. | jangnyeone Rinaneun cheoeumeuro Busane gasseoyo.
출발하기 전에는 비행기를 타 본 적이 없어서 걱정했어요. | chulbalhagi jeoneneun bihaenggireul ta bon jeogi eopseoseo geokjeonghaesseoyo.
그런데 비행은 생각했던 것보다 편했어요. | geureonde bihaengeun saenggakhaetdeon geotboda pyeonhaesseoyo.
첫날 길을 잃어서 할머니께 길을 물어봤어요. | cheonnal gireul ireoseo halmeonikke gireul mureobwasseoyo.
할머니는 아주 친절하셔서 역까지 데려다주셨어요. | halmeonineun aju chinjeolhasyeoseo yeokkkaji deryeodajusyeosseoyo.
일주일 동안 박물관, 공원, 전통 시장을 방문했어요. | iljuil dongan bangmulgwan, gongwon, jeontong sijangeul bangmunhaesseoyo.
리나는 시장 음식이 제일 맛있었다고 해요. | Rinaneun sijang eumsigi jeil masisseotdago haeyo.
매일 밤 그날의 경험을 일기에 썼어요. | maeil bam geunarui gyeongheomeul ilgie sseosseoyo.
돌아가기 전에 가족에게 줄 기념품을 샀어요. | doragagi jeone gajogege jul ginyeompumeul sasseoyo.
내년에 다시 갈 거라서 지금은 매일 한국어를 공부해요. | naenyeone dasi gal georaseo jigeumeun maeil hangugeoreul gongbuhaeyo.`,
  },

  mandarin: {
    city: "Xi'an",
    dimas: `
我叫迪马斯，我住在万隆。 | wǒ jiào Dímǎsī, wǒ zhù zài Wànlóng.
平时我很忙，所以我喜欢周末。 | píngshí wǒ hěn máng, suǒyǐ wǒ xǐhuan zhōumò.
每个星期六早上，我和姐姐去游泳。 | měi ge xīngqīliù zǎoshang, wǒ hé jiějie qù yóuyǒng.
中午，我给家人做炒饭。 | zhōngwǔ, wǒ gěi jiārén zuò chǎofàn.
星期天我们一般在家看电影。 | xīngqītiān wǒmen yìbān zài jiā kàn diànyǐng.
我喜欢喜剧片，因为很好笑。 | wǒ xǐhuan xǐjùpiàn, yīnwèi hěn hǎoxiào.
下个星期，我想和朋友们踢足球。 | xià ge xīngqī, wǒ xiǎng hé péngyoumen tī zúqiú.`,
    rina: `
去年，丽娜第一次去了西安。 | qùnián, Lìnà dì yī cì qù le Xī'ān.
出发前她很担心，因为她从来没坐过飞机。 | chūfā qián tā hěn dānxīn, yīnwèi tā cónglái méi zuò guo fēijī.
没想到，飞行比她想象的舒服多了。 | méi xiǎngdào, fēixíng bǐ tā xiǎngxiàng de shūfu duō le.
第一天她迷路了，就向一位老奶奶问路。 | dì yī tiān tā mílù le, jiù xiàng yí wèi lǎo nǎinai wèn lù.
老奶奶非常热情，一直把她送到了车站。 | lǎo nǎinai fēicháng rèqíng, yìzhí bǎ tā sòng dào le chēzhàn.
一个星期里，她参观了博物馆、公园和传统市场。 | yí ge xīngqī lǐ, tā cānguān le bówùguǎn, gōngyuán hé chuántǒng shìchǎng.
丽娜觉得市场里的东西最好吃。 | Lìnà juéde shìchǎng lǐ de dōngxi zuì hǎochī.
每天晚上，她都把自己的经历写在日记里。 | měi tiān wǎnshang, tā dōu bǎ zìjǐ de jīnglì xiě zài rìjì lǐ.
回国前，她给家人买了纪念品。 | huíguó qián, tā gěi jiārén mǎi le jìniànpǐn.
她明年还要再去，所以现在每天都学习中文。 | tā míngnián hái yào zài qù, suǒyǐ xiànzài měi tiān dōu xuéxí Zhōngwén.`,
  },

  arab: {
    city: "Kairo",
    dimas: `
اسمي ديماس، وأسكن في باندونغ. | ismī Dīmās, wa-askunu fī Bāndūng.
أنا مشغول في أيام العمل، لذلك أحب عطلة نهاية الأسبوع. | anā mashghūl fī ayyām al-ʿamal, li-dhālika uḥibbu ʿuṭlat nihāyat al-usbūʿ.
كل يوم سبت صباحا، أسبح مع أختي الكبرى. | kulla yawmi sabtin ṣabāḥan, asbaḥu maʿa ukhtī al-kubrā.
في الظهر، أطبخ الأرز المقلي لعائلتي. | fī aẓ-ẓuhr, aṭbukhu al-aruzz al-maqlī li-ʿāʾilatī.
يوم الأحد، نشاهد عادة فيلما في البيت. | yawma al-aḥad, nushāhidu ʿādatan fīlman fī al-bayt.
أحب الأفلام الكوميدية لأنها مضحكة. | uḥibbu al-aflām al-kūmīdiyya li-annahā muḍḥika.
في الأسبوع القادم، أريد أن ألعب كرة القدم مع أصدقائي. | fī al-usbūʿ al-qādim, urīdu an alʿaba kurat al-qadam maʿa aṣdiqāʾī.`,
    rina: `
في السنة الماضية، سافرت رينا إلى القاهرة لأول مرة. | fī as-sana al-māḍiya, sāfarat Rīnā ilā al-Qāhira li-awwal marra.
قبل السفر، كانت قلقة لأنها لم تركب طائرة من قبل. | qabla as-safar, kānat qaliqa li-annahā lam tarkab ṭāʾira min qabl.
لكن الرحلة كانت أكثر راحة مما تخيلت. | lākinna ar-riḥla kānat akthar rāḥa mimmā takhayyalat.
في اليوم الأول، ضلت الطريق وسألت امرأة مسنة عن الطريق. | fī al-yawm al-awwal, ḍallat aṭ-ṭarīq wa-saʾalat imraʾa musinna ʿan aṭ-ṭarīq.
كانت المرأة لطيفة جدا، ورافقتها حتى المحطة. | kānat al-marʾa laṭīfa jiddan, wa-rāfaqathā ḥattā al-maḥaṭṭa.
خلال أسبوع، زارت المتاحف والحدائق والأسواق الشعبية. | khilāla usbūʿ, zārat al-matāḥif wa-l-ḥadāʾiq wa-l-aswāq ash-shaʿbiyya.
في رأي رينا، كان طعام السوق هو الألذ. | fī raʾy Rīnā, kāna ṭaʿām as-sūq huwa al-aladhdh.
كل مساء، كانت تكتب تجاربها في مذكراتها. | kulla masāʾ, kānat taktubu tajāribahā fī mudhakkirātihā.
قبل العودة، اشترت هدايا تذكارية لعائلتها. | qabla al-ʿawda, ishtarat hadāyā tidhkāriyya li-ʿāʾilatihā.
ستعود في السنة القادمة، لذلك تدرس العربية الآن كل يوم. | sa-taʿūdu fī as-sana al-qādima, li-dhālika tadrusu al-ʿarabiyya al-āna kulla yawm.`,
  },

  jerman: {
    city: "München",
    dimas: `
Ich heiße Dimas und wohne in Bandung.
Unter der Woche bin ich beschäftigt, deshalb mag ich das Wochenende.
Jeden Samstagmorgen gehe ich mit meiner älteren Schwester schwimmen.
Mittags koche ich Nasi Goreng für meine Familie.
Am Sonntag schauen wir meistens zu Hause einen Film.
Ich mag Komödien, weil sie lustig sind.
Nächste Woche möchte ich mit meinen Freunden Fußball spielen.`,
    rina: `
Letztes Jahr ist Rina zum ersten Mal nach München gereist.
Vor der Abreise war sie nervös, weil sie noch nie geflogen war.
Der Flug war aber bequemer, als sie gedacht hatte.
Am ersten Tag hat sie sich verlaufen und eine ältere Frau nach dem Weg gefragt.
Die Frau war sehr freundlich und hat sie bis zum Bahnhof begleitet.
Eine Woche lang hat sie Museen, Parks und traditionelle Märkte besucht.
Rina findet, dass das Essen auf dem Markt am besten war.
Jeden Abend hat sie ihre Erlebnisse in ihr Tagebuch geschrieben.
Vor der Heimreise hat sie Souvenirs für ihre Familie gekauft.
Nächstes Jahr fährt sie wieder hin, deshalb lernt sie jetzt jeden Tag Deutsch.`,
  },

  prancis: {
    city: "Lyon",
    dimas: `
Je m'appelle Dimas et j'habite à Bandung.
En semaine, je suis occupé, alors j'aime le week-end.
Tous les samedis matin, je vais nager avec ma grande sœur.
À midi, je prépare du nasi goreng pour ma famille.
Le dimanche, nous regardons généralement un film à la maison.
J'aime les comédies parce qu'elles sont drôles.
La semaine prochaine, je veux jouer au foot avec mes amis.`,
    rina: `
L'année dernière, Rina est allée à Lyon pour la première fois.
Avant le départ, elle était inquiète parce qu'elle n'avait jamais pris l'avion.
Finalement, le vol a été plus confortable qu'elle ne l'imaginait.
Le premier jour, elle s'est perdue et a demandé son chemin à une vieille dame.
La dame était très gentille et l'a accompagnée jusqu'à la gare.
Pendant une semaine, elle a visité des musées, des parcs et des marchés traditionnels.
Pour Rina, la nourriture du marché était la meilleure.
Chaque soir, elle racontait ses expériences dans son journal.
Avant de rentrer, elle a acheté des souvenirs pour sa famille.
Elle y retournera l'année prochaine, donc maintenant elle apprend le français tous les jours.`,
  },

  spanyol: {
    city: "Sevilla",
    dimas: `
Me llamo Dimas y vivo en Bandung.
Entre semana estoy ocupado, así que me gustan los fines de semana.
Todos los sábados por la mañana, nado con mi hermana mayor.
Al mediodía, cocino nasi goreng para mi familia.
Los domingos, normalmente vemos una película en casa.
Me gustan las comedias porque son divertidas.
La semana que viene quiero jugar al fútbol con mis amigos.`,
    rina: `
El año pasado, Rina fue a Sevilla por primera vez.
Antes de salir, estaba preocupada porque nunca había viajado en avión.
Al final, el vuelo fue más cómodo de lo que había imaginado.
El primer día se perdió y le preguntó el camino a una señora mayor.
La señora fue muy amable y la acompañó hasta la estación.
Durante una semana, visitó museos, parques y mercados tradicionales.
Según Rina, la comida del mercado era la más rica.
Cada noche escribía sus experiencias en su diario.
Antes de volver, compró recuerdos para su familia.
Volverá el año que viene, así que ahora estudia español todos los días.`,
  },

  rusia: {
    city: "Sankt Peterburg",
    dimas: `
Меня зовут Димас, я живу в Бандунге. | menya zovut Dimas, ya zhivu v Bandunge.
В будни я занят, поэтому люблю выходные. | v budni ya zanyat, poetomu lyublyu vykhodnyye.
Каждую субботу утром я плаваю со старшей сестрой. | kazhduyu subbotu utrom ya plavayu so starshey sestroy.
Днём я готовлю наси горенг для семьи. | dnyom ya gotovlyu nasi goreng dlya sem'i.
В воскресенье мы обычно смотрим фильм дома. | v voskresen'ye my obychno smotrim fil'm doma.
Я люблю комедии, потому что они смешные. | ya lyublyu komedii, potomu chto oni smeshnyye.
На следующей неделе я хочу поиграть в футбол с друзьями. | na sleduyushchey nedele ya khochu poigrat' v futbol s druz'yami.`,
    rina: `
В прошлом году Рина впервые поехала в Санкт-Петербург. | v proshlom godu Rina vpervyye poyekhala v Sankt-Peterburg.
Перед отъездом она волновалась, потому что никогда не летала на самолёте. | pered ot"yezdom ona volnovalas', potomu chto nikogda ne letala na samolyote.
Но полёт оказался удобнее, чем она представляла. | no polyot okazalsya udobneye, chem ona predstavlyala.
В первый день она заблудилась и спросила дорогу у пожилой женщины. | v pervyy den' ona zabludilas' i sprosila dorogu u pozhiloy zhenshchiny.
Женщина была очень доброй и проводила её до самого вокзала. | zhenshchina byla ochen' dobroy i provodila yeyo do samogo vokzala.
За неделю она посетила музеи, парки и традиционные рынки. | za nedelyu ona posetila muzei, parki i traditsionnyye rynki.
По мнению Рины, еда на рынке была самой вкусной. | po mneniyu Riny, yeda na rynke byla samoy vkusnoy.
Каждый вечер она записывала свои впечатления в дневник. | kazhdyy vecher ona zapisyvala svoi vpechatleniya v dnevnik.
Перед возвращением она купила сувениры для семьи. | pered vozvrashcheniyem ona kupila suveniry dlya sem'i.
В следующем году она поедет туда снова, поэтому сейчас каждый день учит русский. | v sleduyushchem godu ona poyedet tuda snova, poetomu seychas kazhdyy den' uchit russkiy.`,
  },

  italia: {
    city: "Firenze",
    dimas: `
Mi chiamo Dimas e abito a Bandung.
Durante la settimana sono impegnato, quindi mi piace il fine settimana.
Ogni sabato mattina vado a nuotare con mia sorella maggiore.
A pranzo cucino il nasi goreng per la mia famiglia.
La domenica di solito guardiamo un film a casa.
Mi piacciono le commedie perché sono divertenti.
La settimana prossima voglio giocare a calcio con i miei amici.`,
    rina: `
L'anno scorso Rina è andata a Firenze per la prima volta.
Prima di partire era preoccupata, perché non aveva mai preso l'aereo.
Invece il volo è stato più comodo di quanto immaginasse.
Il primo giorno si è persa e ha chiesto la strada a una signora anziana.
La signora era molto gentile e l'ha accompagnata fino alla stazione.
Per una settimana ha visitato musei, parchi e mercati tradizionali.
Secondo Rina, il cibo del mercato era il più buono.
Ogni sera scriveva le sue esperienze nel diario.
Prima di tornare a casa ha comprato dei souvenir per la sua famiglia.
Ci tornerà l'anno prossimo, quindi adesso studia l'italiano ogni giorno.`,
  },

  thai: {
    city: "Chiang Mai",
    dimas: `
ผมชื่อดิมัส ผมอยู่ที่บันดุง | phom chue Dimat, phom yu thi Bandung.
วันธรรมดาผมยุ่ง ผมจึงชอบวันหยุดสุดสัปดาห์ | wan thammada phom yung, phom chueng chop wan yut sut sapda.
ทุกเช้าวันเสาร์ ผมไปว่ายน้ำกับพี่สาว | thuk chao wan sao, phom pai wai nam kap phi sao.
ตอนเที่ยง ผมทำข้าวผัดให้ครอบครัว | ton thiang, phom tham khao phat hai khrop khrua.
วันอาทิตย์ พวกเรามักดูหนังที่บ้าน | wan athit, phuak rao mak du nang thi ban.
ผมชอบหนังตลกเพราะดูแล้วขำ | phom chop nang talok phro du laeo kham.
สัปดาห์หน้า ผมอยากเล่นฟุตบอลกับเพื่อนๆ | sapda na, phom yak len futbon kap phuean phuean.`,
    rina: `
ปีที่แล้ว รีนาไปเชียงใหม่เป็นครั้งแรก | pi thi laeo, Rina pai Chiang Mai pen khrang raek.
ก่อนออกเดินทาง เธอกังวลเพราะไม่เคยนั่งเครื่องบินมาก่อน | kon ok doen thang, thoe kangwon phro mai khoei nang khrueang bin ma kon.
แต่เที่ยวบินกลับสบายกว่าที่เธอคิดไว้ | tae thiao bin klap sabai kwa thi thoe khit wai.
วันแรก เธอหลงทางและถามทางคุณยายคนหนึ่ง | wan raek, thoe long thang lae tham thang khun yai khon nueng.
คุณยายใจดีมากและพาเธอไปส่งถึงสถานี | khun yai chai di mak lae pha thoe pai song thueng sathani.
ตลอดหนึ่งสัปดาห์ เธอไปเที่ยวพิพิธภัณฑ์ สวนสาธารณะ และตลาดพื้นเมือง | talot nueng sapda, thoe pai thiao phiphitthaphan, suan satharana lae talat phuen mueang.
รีนาคิดว่าอาหารที่ตลาดอร่อยที่สุด | Rina khit wa ahan thi talat aroi thi sut.
ทุกคืน เธอเขียนเล่าประสบการณ์ลงในสมุดบันทึก | thuk khuen, thoe khian lao prasopkan long nai samut banthuek.
ก่อนกลับบ้าน เธอซื้อของฝากให้ครอบครัว | kon klap ban, thoe sue khong fak hai khrop khrua.
ปีหน้าเธอจะกลับไปอีก ตอนนี้เธอจึงเรียนภาษาไทยทุกวัน | pi na thoe cha klap pai ik, ton ni thoe chueng rian phasa thai thuk wan.`,
  },

  hindi: {
    city: "Jaipur",
    dimas: `
मेरा नाम दिमास है, और मैं बांडुंग में रहता हूँ। | merā nām Dimās hai, aur maiṃ Bāṇḍuṅg meṃ rahtā hūṃ.
हफ़्ते के दिनों में मैं व्यस्त रहता हूँ, इसलिए मुझे सप्ताहांत पसंद है। | hafte ke dinoṃ meṃ maiṃ vyast rahtā hūṃ, islie mujhe saptāhānt pasand hai.
हर शनिवार सुबह मैं अपनी बड़ी बहन के साथ तैरने जाता हूँ। | har śanivār subah maiṃ apnī baṛī bahan ke sāth tairne jātā hūṃ.
दोपहर में मैं अपने परिवार के लिए नासी गोरेंग बनाता हूँ। | dopahar meṃ maiṃ apne parivār ke lie nāsī goreṅg banātā hūṃ.
रविवार को हम आमतौर पर घर पर फ़िल्म देखते हैं। | ravivār ko ham āmtaur par ghar par film dekhte haiṃ.
मुझे कॉमेडी फ़िल्में पसंद हैं क्योंकि वे मज़ेदार होती हैं। | mujhe kômeḍī filmeṃ pasand haiṃ kyoṃki ve mazedār hotī haiṃ.
अगले हफ़्ते मैं दोस्तों के साथ फ़ुटबॉल खेलना चाहता हूँ। | agle hafte maiṃ dostoṃ ke sāth fuṭbôl khelnā cāhtā hūṃ.`,
    rina: `
पिछले साल रीना पहली बार जयपुर गई। | pichhle sāl Rīnā pahlī bār Jaypur gaī.
जाने से पहले वह चिंतित थी, क्योंकि वह कभी हवाई जहाज़ में नहीं बैठी थी। | jāne se pahle vah cintit thī, kyoṃki vah kabhī havāī jahāz meṃ nahīṃ baiṭhī thī.
लेकिन उड़ान उसकी सोच से ज़्यादा आरामदायक थी। | lekin uṛān uskī soc se zyādā ārāmdāyak thī.
पहले दिन वह रास्ता भटक गई और उसने एक बूढ़ी अम्मा से रास्ता पूछा। | pahle din vah rāstā bhaṭak gaī aur usne ek būṛhī ammā se rāstā pūchā.
अम्मा बहुत दयालु थीं और उसे स्टेशन तक छोड़ आईं। | ammā bahut dayālu thīṃ aur use sṭeśan tak chhoṛ āīṃ.
एक हफ़्ते में उसने संग्रहालय, बाग़ और पारंपरिक बाज़ार देखे। | ek hafte meṃ usne saṅgrahālay, bāg aur pāramparik bāzār dekhe.
रीना के अनुसार बाज़ार का खाना सबसे स्वादिष्ट था। | Rīnā ke anusār bāzār kā khānā sabse svādiṣṭ thā.
हर रात वह अपने अनुभव डायरी में लिखती थी। | har rāt vah apne anubhav ḍāyrī meṃ likhtī thī.
लौटने से पहले उसने परिवार के लिए सुवेनियर ख़रीदे। | lauṭne se pahle usne parivār ke lie suveniyar kharīde.
वह अगले साल फिर जाएगी, इसलिए अब वह रोज़ हिंदी सीखती है। | vah agle sāl phir jāegī, islie ab vah roz hindī sīkhtī hai.`,
  },
};
