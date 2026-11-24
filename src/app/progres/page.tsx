import type { Metadata } from "next";
import { ProgressView } from "@/components/ProgressView";

export const metadata: Metadata = {
  title: "Progres saya",
  description: "Runtunan hari belajar, unit yang selesai, dan kata yang sudah melekat.",
};

export default function ProgressPage() {
  return (
    <>
      <header className="page-head">
        <div className="wrap stack">
          <h1>Progres saya</h1>
          <p className="lead">Ringkasan belajar Anda di perangkat ini.</p>
        </div>
      </header>
      <section className="section" style={{ paddingTop: 40 }}>
        <div className="wrap">
          <ProgressView />
        </div>
      </section>
    </>
  );
}
