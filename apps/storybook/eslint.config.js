// @ts-check
import baseConfig from '@config/eslint/base.mjs'

export default [
  ...baseConfig,
  {
    ignores: [
      'storybook-static/**/*',
      'node_modules/**/*',
      'dist/**/*',
      'build/**/*',
      '.turbo/**/*',
    ],
  },
]
