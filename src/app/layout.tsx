import type { Metadata, Viewport } from "next";
import "@fontsource-variable/nunito";
import "@fontsource/m-plus-rounded-1c/700.css";
import "@fontsource/m-plus-rounded-1c/800.css";
import "./globals.css";
import "./anime.css";
import { SiteHeader, TabBar } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { GameLayer } from "@/components/mascot/GameLayer";

export const metadata: Metadata = {
  title: {
    default: "Tutur: belajar bahasa dunia dari bahasa Indonesia",
    template: "%s | Tutur",
  },
  description:
    "Belajar 12 bahasa dunia dari bahasa Indonesia: huruf, kosakata dengan suara, frasa sehari-hari, kamus multibahasa, video, dan latihan. Gratis, tanpa daftar.",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f7fb" },
    { media: "(prefers-color-scheme: dark)", color: "#10141c" },
  ],
};

const themeScript = `try{var t=localStorage.getItem("tutur:theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a className="skip" href="#isi">
          Langsung ke isi
        </a>
        <SiteHeader />
        <main id="isi">{children}</main>
        <SiteFooter />
        <TabBar />
        <GameLayer />
      </body>
    </html>
  );
}
