// @ts-check
import baseConfig from '@config/eslint/base.mjs'
import tseslint from 'typescript-eslint'

export default tseslint.config(...baseConfig, {
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
