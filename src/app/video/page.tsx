import type { Metadata } from "next";
import { VideoLibrary } from "@/components/VideoLibrary";

export const metadata: Metadata = {
  title: "Video belajar bahasa",
  description: "Video pilihan untuk belajar huruf, frasa, dan percakapan dalam 12 bahasa.",
};

export default function VideoPage() {
  return (
    <>
      <header className="page-head">
        <div className="wrap stack">
          <h1>Video</h1>
          <p className="lead">
            Video pilihan dari kanal belajar bahasa di YouTube, dikelompokkan menurut tujuan: mengenal huruf, menghafal frasa,
            atau melatih telinga dengan percakapan nyata. Aktifkan subtitle untuk mengikuti.
          </p>
        </div>
      </header>
      <section className="section" style={{ paddingTop: 40 }}>
        <div className="wrap">
          <VideoLibrary />
        </div>
      </section>
    </>
  );
}
