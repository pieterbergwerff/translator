// @ts-check
import baseConfig from '@config/eslint/base.mjs'

export default [
  ...baseConfig,
  {
    ignores: [
      '.next/**/*',
      'next-env.d.ts',
      'next.config.js',
      'postcss.config.js',
      'tailwind.config.ts',
      'node_modules/**/*',
      'dist/**/*',
      'build/**/*',
      '.turbo/**/*',
    ],
  },
]
