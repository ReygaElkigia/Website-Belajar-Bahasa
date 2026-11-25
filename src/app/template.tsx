/** Membungkus setiap halaman agar muncul dengan transisi halus saat berpindah. */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
