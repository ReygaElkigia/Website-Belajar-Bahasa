import raw from "./audio-credits.json";

export interface AudioCredit {
  word: string;
  file: string;
  page: string;
  artist: string;
  license: string;
  licenseUrl: string;
}

const credits = raw as Record<string, Record<string, AudioCredit>>;

/** Rekaman penutur asli untuk satu konsep kosakata, bila ada. */
export const creditFor = (slug: string, id: string): AudioCredit | undefined => credits[slug]?.[id];

export const creditsFor = (slug: string) => credits[slug] ?? {};

export const recordingCount = () => Object.values(credits).reduce((n, c) => n + Object.keys(c).length, 0);
