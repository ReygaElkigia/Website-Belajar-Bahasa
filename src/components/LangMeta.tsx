/** Komponen tanpa state: aman dipakai di server maupun klien. */

export function formatSpeakers(n: number) {
  return n >= 1000 ? `${(n / 1000).toLocaleString("id-ID", { maximumFractionDigits: 1 })} miliar` : `${n} juta`;
}

export function ChallengeMeter({ level, label }: { level: number; label: string }) {
  return (
    <span className="row" style={{ gap: 8 }}>
      <span className="meter" aria-hidden>
        {[1, 2, 3, 4].map((n) => (
          <i key={n} data-on={n <= level} />
        ))}
      </span>
      <span>{label}</span>
    </span>
  );
}
