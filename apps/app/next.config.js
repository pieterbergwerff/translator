/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    '@packages/components',
    '@packages/hooks',
    '@packages/validators',
    '@packages/types',
    '@packages/constants',
    '@packages/theme',
    '@packages/translate',
    '@utils/common',
    '@utils/server',
    '@utils/client',
  ],
  experimental: {
    esmExternals: true,
  },
}

export default nextConfig
