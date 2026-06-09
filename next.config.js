/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // El service worker se registra manualmente desde components/PwaRegister.tsx
  // y vive en /public/sw.js — no se requiere ninguna dependencia externa.
};

module.exports = nextConfig;
