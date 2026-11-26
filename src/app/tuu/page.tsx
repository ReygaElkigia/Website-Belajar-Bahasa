import type { Metadata } from "next";
import { PageHero } from "@/components/anime/Themed";
import { TuuSprite, type TuuMood } from "@/components/companion/TuuSprite";
import { TuuSettingsPanel } from "@/components/companion/TuuSettingsPanel";

export const metadata: Metadata = {
  title: "Kenalan dengan Tuu",
  description: "Tuu, maskot pendamping Tutur: ekspresi, reaksi terhadap aktivitas belajar, dan cara mengaturnya.",
};

const MOODS: { mood: TuuMood; name: string; when: string }[] = [
  { mood: "wave", name: "Menyapa", when: "Saat kamu datang, membuka dunia bahasa baru, atau kembali setelah lama pergi." },
  { mood: "idle", name: "Santai", when: "Menemanimu membaca. Matanya mengikuti kursor dan sesekali berkedip." },
  { mood: "happy", name: "Senang", when: "Setiap jawaban benar dan setiap XP yang kamu dapat." },
  { mood: "wink", name: "Mengedip", when: "Jawaban benar beruntun, atau saat berbagi fakta unik tentang bahasa." },
  { mood: "cheer", name: "Bersorak", when: "Combo 3 dan 5 jawaban benar, naik level, dan target harian tercapai." },
  { mood: "love", name: "Terharu", when: "Nilai sempurna dan combo 10 jawaban benar." },
  { mood: "proud", name: "Bangga", when: "Lulus kuis atau bacaan, dapat lencana, dan saat membuka halaman progres." },
  { mood: "shy", name: "Malu-malu", when: "Saat kamu mengetuknya, dan saat mengingatkanmu beristirahat." },
  { mood: "sad", name: "Sedih", when: "Jawaban salah (sebentar saja) dan saat internet terputus." },
  { mood: "nervous", name: "Gugup", when: "Tiga jawaban salah berturut-turut, atau runtunan belajarmu terancam putus." },
  { mood: "think", name: "Berpikir", when: "Saat kamu mengetik di kamus, kuis selesai dengan skor rendah, atau kamu diam cukup lama." },
  { mood: "focus", name: "Fokus", when: "Selama latihan ujian. Tuu memakai ikat kepala dan tidak banyak bicara." },
  { mood: "surprised", name: "Kaget", when: "Saat kartu hafalan dibalik, saat diseret, atau saat dibangunkan." },
  { mood: "listen", name: "Mendengarkan", when: "Setiap kali suara diputar, dan di mode bayangan." },
  { mood: "read", name: "Membaca", when: "Di halaman bacaan bertingkat." },
  { mood: "sleep", name: "Tertidur", when: "Kalau kamu tidak melakukan apa-apa hampir dua menit. Gerakkan apa saja untuk membangunkannya." },
  { mood: "dizzy", name: "Pusing", when: "Kalau diketuk lima kali dengan cepat. Kasihan, kan?" },
];

export default function TuuPage() {
  return (
    <>
      <PageHero height={300} overlap={90}>
        <div className="tuu-hero">
          <div className="stack">
            <h1>Kenalan dengan Tuu</h1>
            <p className="lead">
              Tuu adalah balon kata kecil yang menemanimu di setiap halaman. Ia memperhatikan apa yang kamu lakukan, ikut senang saat
              jawabanmu benar, menyemangati saat salah, dan mengingatkan kartu yang perlu diulang. Syalnya berganti warna mengikuti dunia
              bahasa yang sedang kamu kunjungi.
            </p>
          </div>
          <TuuSprite mood="wave" size={150} />
        </div>
      </PageHero>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <h2>{MOODS.length} ekspresi Tuu</h2>
            <p className="muted">Setiap ekspresi punya gerakan dan efeknya sendiri. Ini kapan masing-masing muncul.</p>
          </div>
          <ul className="mood-grid">
            {MOODS.map((m) => (
              <li key={m.mood} className="mood-card">
                <TuuSprite mood={m.mood} size={110} />
                <div>
                  <h3>{m.name}</h3>
                  <p className="small muted">{m.when}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="wrap two-col">
          <div>
            <div className="section-head">
              <h2>Apa saja yang Tuu perhatikan</h2>
            </div>
            <ul className="tuu-list">
              <li>
                <strong>Halaman yang kamu buka.</strong> Setiap halaman punya sapaan dan tips sendiri, misalnya salam dalam bahasa yang
                sedang dipelajari, lengkap dengan tombol dengar.
              </li>
              <li>
                <strong>Jawabanmu.</strong> Kuis unit, kuis ungkapan, bacaan, kartu hafalan, dan latihan ujian. Tuu menghitung jawaban benar
                beruntun dan menyemangati setelah beberapa kali salah.
              </li>
              <li>
                <strong>Waktu dan kebiasaan.</strong> Sapaan pagi sampai larut malam, sambutan setelah beberapa hari tidak datang, pengingat
                istirahat setelah 25 menit belajar, dan pengingat runtunan di sore hari.
              </li>
              <li>
                <strong>Progresmu.</strong> Naik level, lencana baru, setengah target harian, target tercapai, dan kartu yang jatuh tempo.
              </li>
              <li>
                <strong>Hal kecil lainnya.</strong> Mengganti tema, menyimpan bahasa untuk offline, menyalin teks, koneksi putus dan tersambung,
                serta saat kamu diam terlalu lama.
              </li>
            </ul>
            <h3 className="mt-6">Cara berinteraksi</h3>
            <ul className="tuu-list">
              <li>
                <strong>Ketuk Tuu</strong> untuk tips belajar atau fakta unik tentang bahasa yang sedang dibuka.
              </li>
              <li>
                <strong>Seret Tuu</strong> ke sisi kiri atau kanan layar.
              </li>
              <li>
                <strong>Tombol ⋯</strong> di samping Tuu membuka menu: tips halaman, mode tenang, pindah sisi, dan sembunyikan.
              </li>
            </ul>
          </div>
          <aside className="aside-sticky">
            <TuuSettingsPanel />
          </aside>
        </div>
      </section>
    </>
  );
}
