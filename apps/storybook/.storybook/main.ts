import type { StorybookConfig } from '@storybook/react-vite'
import { resolve } from 'path'
import { fileURLToPath } from 'url'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  addons: ['@storybook/addon-essentials'],
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

    // Fix CSS handling and ensure theme CSS loads first
    config.css = {
      postcss: {
        plugins: [tailwindcss, autoprefixer],
      },
    }

    // Force import the theme CSS
    if (!config.define) config.define = {}
    config.define['__THEME_CSS__'] = JSON.stringify(
      resolve(__dirname, '../../../packages/theme/src/globals.css')
    )

    return config
  },
  previewHead: (head) => `
    ${head}
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    <style>
      :root {
        --primary: oklch(0.205 0 0) !important;
        --primary-foreground: oklch(0.985 0 0) !important;
        --background: oklch(1 0 0) !important;
        --foreground: oklch(0.145 0 0) !important;
      }
    </style>
    <script>
      // Ensure proper theme class is applied to html element
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    </style>
  `,
}

export default config
