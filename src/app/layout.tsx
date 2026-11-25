import type { Metadata, Viewport } from "next";
import "@fontsource-variable/nunito";
import "@fontsource/m-plus-rounded-1c/700.css";
import "@fontsource/m-plus-rounded-1c/800.css";
import "./globals.css";
import "./anime.css";
import { SiteHeader, TabBar } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { GameLayer } from "@/components/mascot/GameLayer";
import { PwaBoot } from "@/components/pwa/PwaBoot";

export const metadata: Metadata = {
  title: {
    default: "Tutur: belajar bahasa dunia dari bahasa Indonesia",
    template: "%s | Tutur",
  },
  description:
    "Belajar 12 bahasa dunia dari bahasa Indonesia: huruf, kosakata dengan suara, frasa sehari-hari, kamus multibahasa, video, dan latihan. Gratis, tanpa daftar.",
  manifest: `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/manifest.webmanifest`,
  icons: {
    icon: `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/icons/favicon-32.png`,
    apple: `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/icons/apple-touch-icon.png`,
  },
  appleWebApp: { capable: true, title: "Tutur", statusBarStyle: "default" },
};

export const viewport: Viewport = {
  themeColor: "#f5f7fb",
};

// Tema terang adalah bawaan; tema gelap hanya bila pengguna memilihnya lewat tombol.
const themeScript = `try{if(localStorage.getItem("tutur:theme")==="dark")document.documentElement.dataset.theme="dark"}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" data-theme="light" suppressHydrationWarning>
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
        <PwaBoot />
      </body>
    </html>
  );
}
