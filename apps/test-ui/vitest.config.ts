import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    ui: true,
    passWithNoTests: true,
    browser: {
      enabled: false,
    },
  },
  server: {
    port: 5173, // Regular dev server port
  },
  preview: {
    port: 5000, // Preview server port
    open: false,
  },
  resolve: {
    alias: {
      '@packages/components': path.resolve(__dirname, '../../packages/components/src'),
      '@packages/hooks': path.resolve(__dirname, '../../packages/hooks/src'),
      '@packages/validators': path.resolve(__dirname, '../../packages/validators/src'),
      '@packages/types': path.resolve(__dirname, '../../packages/types/src'),
      '@packages/constants': path.resolve(__dirname, '../../packages/constants/src'),
      '@packages/theme': path.resolve(__dirname, '../../packages/theme/src'),
      '@packages/translate': path.resolve(__dirname, '../../packages/translate/src'),
      '@utils/common': path.resolve(__dirname, '../../utils/common/src'),
      '@utils/server': path.resolve(__dirname, '../../utils/server/src'),
      '@utils/client': path.resolve(__dirname, '../../utils/client/src'),
    },
  },
})
