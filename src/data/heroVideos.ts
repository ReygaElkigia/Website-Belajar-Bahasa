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
  author: string;
  source: string;
  url: string;
  license: string;
}

export const heroVideos: Record<string, HeroVideo> = {
  default: {
    src: "/video/default.mp4",
    poster: "/video/default.jpg",
    author: "Stepleton",
    source: "Lenticular cloud over Longs Peak, Colorado (time lapse)",
    url: "https://commons.wikimedia.org/wiki/File:Lenticular_cloud_over_Longs_Peak,_Colorado_(time_lapse).ogv",
    license: "CC0",
  },
  inggris: {
    src: "/video/inggris.mp4",
    poster: "/video/inggris.jpg",
    author: "nabs",
    source: "Timelapse from Waterloo Bridge, London",
    url: "https://commons.wikimedia.org/wiki/File:Timelapse_from_Waterloo_Bridge,_London.webm",
    license: "CC BY 3.0",
  },
};
