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
    '@packages/database',
    '@utils/common',
    '@utils/server',
    '@utils/client',
  ],
  experimental: {
    esmExternals: true,
  },
  webpack: (config) => {
    // Ignore optional database drivers that aren't installed
    config.externals = config.externals || []
    config.externals.push({
      oracledb: 'commonjs oracledb',
      'pg-query-stream': 'commonjs pg-query-stream',
      tedious: 'commonjs tedious',
      mysql: 'commonjs mysql',
      'better-sqlite3': 'commonjs better-sqlite3',
    })

    return config
  },
}

export default nextConfig
