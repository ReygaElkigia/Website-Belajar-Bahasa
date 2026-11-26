import { KANJI_SOURCES } from "@/data/kanji";

/** Kredit wajib di layar yang menampilkan data kanji (syarat lisensi EDRDG dan KanjiVG). */
export function KanjiCredit() {
  return (
    <p className="kj-credit tiny muted">
      Data kanji:{" "}
      {KANJI_SOURCES.map((s, i) => (
        <span key={s.url}>
          {i > 0 && " · "}
          <a href={s.url} target="_blank" rel="noopener noreferrer">
            {s.label}
          </a>{" "}
          ({s.license})
        </span>
      ))}
      . KANJIDIC2 dan JMdict adalah milik Electronic Dictionary Research and Development Group, dipakai sesuai{" "}
      <a href="https://www.edrdg.org/edrdg/licence.html" target="_blank" rel="noopener noreferrer">
        lisensinya
      </a>
      . Arti dalam bahasa Indonesia diterjemahkan oleh Tutur; berkas data turunan dibagikan dengan lisensi CC BY-SA yang sama.
    </p>
  );
}
