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

export const heroVideos: Record<string, HeroVideo> = {};
