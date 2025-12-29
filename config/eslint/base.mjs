// @ts-check
import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'

export default tseslint.config({
  files: ['**/*.{js,mjs,cjs,ts,tsx}'],
  ignores: ['node_modules/**/*', 'dist/**/*', 'build/**/*', '.turbo/**/*', '*.d.ts'],
  extends: [eslint.configs.recommended, ...tseslint.configs.recommended],
  rules: {
    '@typescript-eslint/no-unused-vars': 'error',
  },
})
