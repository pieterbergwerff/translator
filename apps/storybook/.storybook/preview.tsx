import type { Preview } from '@storybook/react'
import '@packages/theme/globals.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          fontFamily: 'Inter, system-ui, sans-serif',
          backgroundColor: 'var(--background, #ffffff)',
          color: 'var(--foreground, #000000)',
          minHeight: '100vh',
          padding: '1rem',
        }}
      >
        <Story />
      </div>
    ),
  ],
}

export default preview
