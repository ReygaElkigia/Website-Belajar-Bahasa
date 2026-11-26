import { getLanguage } from "@/data";
import { themeFor } from "@/data/themes";
import { LangSubnav } from "@/components/LangSubnav";

/** Semua halaman dalam satu bahasa berbagi bilah navigasi bahasa di bagian atas. */
export default async function LanguageLayout({ children, params }: { children: React.ReactNode; params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const l = getLanguage(slug);
  if (!l) return children;
  const t = themeFor(l.slug);
  return (
    <>
      <LangSubnav lang={{ slug: l.slug, name: l.name, native: l.native, glyph: l.glyph, tts: l.tts }} accent={t.accent} pop={t.pop} />
      {children}
    </>
  );
}
