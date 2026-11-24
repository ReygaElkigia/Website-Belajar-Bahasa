import type { Language, Term } from "@/data/types";

interface Props {
  term: Term;
  lang: Pick<Language, "tts" | "dir">;
  className?: string;
  showNote?: boolean;
}

/** Kata dalam aksara aslinya, dengan romanisasi dan catatan bila ada. */
export function TermView({ term, lang, className, showNote = true }: Props) {
  return (
    <span className={`term ${className ?? ""}`}>
      <span className="term-word" lang={lang.tts} dir={lang.dir}>
        {term.word}
      </span>
      {term.roman && <span className="term-roman">{term.roman}</span>}
      {showNote && term.note && <span className="term-note">{term.note}</span>}
    </span>
  );
}
