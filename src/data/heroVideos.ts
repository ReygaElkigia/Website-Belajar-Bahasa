/**
 * Video latar bergerak (loop) per dunia bahasa. Bila sebuah tema punya video,
 * pemandangan SVG diganti video; bila tidak, pemandangan SVG tetap dipakai.
 *
 * Berkas disimpan di public/video/<id>.mp4 (maks. ±1,5 MB, 960 px, tanpa suara)
 * beserta gambar poster public/video/<id>.jpg untuk mode hemat dan gerak minimal.
 * Kredit wajib dicantumkan sesuai lisensi sumbernya (lihat halaman Kredit).
 */
export interface HeroVideo {
  src: string;
  poster: string;
  /** Titik fokus (CSS object-position) agar objek utama tetap tampak saat dipotong di layar tegak. */
  focus?: string;
  author: string;
  source: string;
  url: string;
  license: string;
}

export const heroVideos: Record<string, HeroVideo> = {
  default: {
    src: "/video/default.mp4",
    poster: "/video/default.jpg",
    focus: "40% 50%",
    author: "Stepleton",
    source: "Lenticular cloud over Longs Peak, Colorado (time lapse)",
    url: "https://commons.wikimedia.org/wiki/File:Lenticular_cloud_over_Longs_Peak,_Colorado_(time_lapse).ogv",
    license: "CC0",
  },
  inggris: {
    src: "/video/inggris.mp4",
    poster: "/video/inggris.jpg",
    focus: "32% 50%",
    author: "nabs",
    source: "Timelapse from Waterloo Bridge, London",
    url: "https://commons.wikimedia.org/wiki/File:Timelapse_from_Waterloo_Bridge,_London.webm",
    license: "CC BY 3.0",
  },
  jepang: {
    src: "/video/jepang.mp4",
    poster: "/video/jepang.jpg",
    focus: "45% 50%",
    author: "Stefan Lins",
    source: "JP Park Sakura C 20180330",
    url: "https://commons.wikimedia.org/wiki/File:JP_Park_Sakura_C_20180330.webm",
    license: "CC BY 3.0",
  },
  korea: {
    src: "/video/korea.mp4",
    poster: "/video/korea.jpg",
    focus: "80% 50%",
    author: "Nesnad",
    source: "View-of-Seoul-from63-Building-2019-7-27",
    url: "https://commons.wikimedia.org/wiki/File:View-of-Seoul-from63-Building-2019-7-27.webm",
    license: "CC BY-SA 4.0",
  },
  mandarin: {
    src: "/video/mandarin.mp4",
    poster: "/video/mandarin.jpg",
    focus: "36% 50%",
    author: "Yigang Yu",
    source: "Shanghai Bund, Lujiazui Skyline Timelapse",
    url: "https://commons.wikimedia.org/wiki/File:Shanghai_Bund,_Lujiazui_Skyline_Timelapse.webm",
    license: "CC0",
  },
  arab: {
    src: "/video/arab.mp4",
    poster: "/video/arab.jpg",
    focus: "50% 50%",
    author: "blmcalifornia",
    source: "Mojave Desert Sunset (40480403760)",
    url: "https://commons.wikimedia.org/wiki/File:Mojave_Desert_Sunset_(40480403760).webm",
    license: "Public domain",
  },
  jerman: {
    src: "/video/jerman.mp4",
    poster: "/video/jerman.jpg",
    focus: "78% 50%",
    author: "André Götzmann",
    source: "Deutsche Welle - Daily Drone - Burg Gleichen",
    url: "https://commons.wikimedia.org/wiki/File:Deutsche_Welle_-_Daily_Drone_-_Burg_Gleichen.webm",
    license: "CC BY 4.0",
  },
  prancis: {
    src: "/video/prancis.mp4",
    poster: "/video/prancis.jpg",
    focus: "50% 50%",
    author: "Yann Caradec",
    source: "Timelapse Tour Eiffel à Paris",
    url: "https://commons.wikimedia.org/wiki/File:Timelapse_Tour_Eiffel_%C3%A0_Paris.webm",
    license: "CC BY-SA 2.0",
  },
  spanyol: {
    src: "/video/spanyol.mp4",
    poster: "/video/spanyol.jpg",
    focus: "52% 50%",
    author: "Jynus",
    source: "Patio de los Leones",
    url: "https://commons.wikimedia.org/wiki/File:Patio_de_los_Leones.webm",
    license: "CC BY-SA 4.0",
  },
  italia: {
    src: "/video/italia.mp4",
    poster: "/video/italia.jpg",
    focus: "45% 50%",
    author: "Deror avi",
    source: "Canal Grande MVI 0763",
    url: "https://commons.wikimedia.org/wiki/File:Canal_Grande_MVI_0763.webm",
    license: "CC BY-SA 4.0",
  },
  thai: {
    src: "/video/thai.mp4",
    poster: "/video/thai.jpg",
    focus: "40% 50%",
    author: "Don Ramey Logan",
    source: "Silom Sunset Timelapse by Don Ramey Logan",
    url: "https://commons.wikimedia.org/wiki/File:Silom_Sunset_Timelapse_by_Don_Ramey_Logan.webm",
    license: "CC BY 4.0",
  },
  hindi: {
    src: "/video/hindi.mp4",
    poster: "/video/hindi.jpg",
    focus: "42% 50%",
    author: "ZDF/Terra X/interscience film/Faber Courtial/Gero von Boehm",
    source: "Taj Mahal - Mausoleum der Liebe (CC BY-SA 4.0)",
    url: "https://commons.wikimedia.org/wiki/File:Taj_Mahal_-_Mausoleum_der_Liebe_(CC_BY-SA_4.0).webm",
    license: "CC BY-SA 4.0",
  },
};
