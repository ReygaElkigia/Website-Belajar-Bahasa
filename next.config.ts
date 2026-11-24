import type { NextConfig } from "next";

// GitHub Pages menyajikan repo proyek di /<nama-repo>/. Workflow deploy mengisi
// variabel ini; untuk lokal, Vercel, atau Netlify biarkan kosong.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath,
  assetPrefix: basePath || undefined,
};

export default nextConfig;
