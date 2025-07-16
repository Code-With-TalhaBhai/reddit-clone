/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images:{
    domains: ['links.papareact.com','api.dicebear.com'],
    dangerouslyAllowSVG: true
  }
}

module.exports = nextConfig
