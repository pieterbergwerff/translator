import type { StorybookConfig } from '@storybook/react-vite'
import { resolve } from 'path'
import { fileURLToPath } from 'url'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

const __filename = fileURLToPath(import.meta.url)
const __dirname = fileURLToPath(new URL('.', import.meta.url))

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
  viteFinal: async (config) => {
    config.resolve = config.resolve || {}
    config.resolve.alias = {
      ...config.resolve.alias,
      '@packages/components': resolve(__dirname, '../../../packages/components/src'),
      '@packages/hooks': resolve(__dirname, '../../../packages/hooks/src'),
      '@packages/theme': resolve(__dirname, '../../../packages/theme/src'),
      '@packages/validators': resolve(__dirname, '../../../packages/validators/src'),
      '@packages/types': resolve(__dirname, '../../../packages/types/src'),
      '@packages/constants': resolve(__dirname, '../../../packages/constants/src'),
      '@packages/translate': resolve(__dirname, '../../../packages/translate/src'),
      '@utils/common': resolve(__dirname, '../../../utils/common/src'),
      '@utils/server': resolve(__dirname, '../../../utils/server/src'),
      '@utils/client': resolve(__dirname, '../../../utils/client/src'),
    }

    // Ensure proper module resolution
    config.resolve.extensions = ['.tsx', '.ts', '.jsx', '.js', '.json']

    // Fix CSS handling
    config.css = {
      postcss: {
        plugins: [tailwindcss, autoprefixer],
      },
    }

    return config
  },
  previewHead: (head) => `
    ${head}
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
  `,
}

export default config
