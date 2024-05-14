

/** @type {import('next').NextConfig} */

// next.config.mjs
import withFonts from 'next-fonts';
const nextConfig = withFonts({
  webpack(config, options) {
    return config;
  }
});
export default nextConfig;