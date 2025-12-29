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
      values: [
        {
          name: 'light',
          value: 'var(--background)',
        },
        {
          name: 'dark',
          value: 'var(--background)',
        },
      ],
    },
  },
  decorators: [
    (Story) => (
      <div
        className="light font-inter bg-background text-foreground min-h-screen p-4"
        style={{
          fontFamily: 'Inter, system-ui, sans-serif',
        }}
      >
        <Story />
      </div>
    ),
  ],
}

export default preview
