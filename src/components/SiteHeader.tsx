"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, ChartColumn, Clapperboard, Languages, Layers } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { href: "/bahasa/", label: "Bahasa", icon: Languages },
  { href: "/kamus/", label: "Kamus", icon: BookOpen },
  { href: "/latihan/", label: "Latihan", icon: Layers },
  { href: "/video/", label: "Video", icon: Clapperboard },
  { href: "/progres/", label: "Progres", icon: ChartColumn },
];

function useActive() {
  const path = usePathname() ?? "/";
  return (href: string) => (path.startsWith(href) ? "page" : undefined);
}

export function SiteHeader() {
  const active = useActive();
  return (
    <header className="site-header">
      <div className="wrap">
        <Link href="/" className="brand" aria-label="Tutur, ke beranda">
          Tutur
          <span className="brand-dot" aria-hidden />
        </Link>
        <nav className="nav" aria-label="Utama">
          {links.map((l) => (
            <Link key={l.href} href={l.href} aria-current={active(l.href)}>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="header-end">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

export function TabBar() {
  const active = useActive();
  return (
    <nav className="tabbar" aria-label="Utama (seluler)">
      {links.map(({ href, label, icon: Icon }) => (
        <Link key={href} href={href} aria-current={active(href)}>
          <Icon size={22} strokeWidth={1.75} aria-hidden />
          {label}
        </Link>
      ))}
    </nav>
  );
}
