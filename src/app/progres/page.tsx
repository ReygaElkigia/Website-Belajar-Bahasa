import type { Metadata } from "next";
import { ProgressView } from "@/components/ProgressView";
import { PageHero } from "@/components/anime/Themed";

export const metadata: Metadata = {
  title: "Progres saya",
  description: "Runtunan hari belajar, unit yang selesai, dan kata yang sudah melekat.",
};

export default function ProgressPage() {
  return (
    <>
      <PageHero height={300} overlap={90}>
        <div className="stack">
          <h1>Progres saya</h1>
          <p className="lead">Ringkasan belajar Anda di perangkat ini.</p>
        </div>
      </PageHero>
      <section className="section" style={{ paddingTop: 40 }}>
        <div className="wrap">
          <ProgressView />
        </div>
      </section>
    </>
  );
}
