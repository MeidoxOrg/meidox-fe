/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },

  i18n: {
    locales: ["ja", "en"], 
    defaultLocale: "ja",   
  },
}

export default nextConfig
