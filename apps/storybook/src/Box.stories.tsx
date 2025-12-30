import type { Meta, StoryObj } from '@storybook/react'
import Box from '@packages/components/atoms/Box'

const meta = {
  title: 'Atoms/Box',
  component: Box,
  args: {},
  argTypes: {
    component: {
      control: { type: 'select' },
      options: ['div', 'span', 'section', 'article', 'main', 'header', 'footer'],
    },
  },
} satisfies Meta<typeof Box>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'This is a Box component',
  },
}

export const AsSection: Story = {
  args: {
    component: 'section',
    children: 'This Box renders as a section element',
  },
}

export const WithClassName: Story = {
  args: {
    children: 'This Box has custom styles',
    className: 'p-4 bg-blue-100 rounded-lg text-blue-900',
  },
}

export const AsArticle: Story = {
  args: {
    component: 'article',
    children: 'This Box renders as an article element',
    className: 'p-6 border border-gray-200 rounded',
  },
}

export const AsSpan: Story = {
  args: {
    component: 'span',
    children: 'This Box renders as an inline span',
    className: 'font-bold text-red-500',
  },
}
