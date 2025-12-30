// @ts-check
import baseConfig from '@config/eslint/base.mjs'
import tseslint from 'typescript-eslint'

export default tseslint.config(...baseConfig, {
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
  rules: {
    '@typescript-eslint/ban-ts-comment': [
      'error',
      {
        'ts-nocheck': 'allow-with-description',
        minimumDescriptionLength: 10,
      },
    ],
  },
})
