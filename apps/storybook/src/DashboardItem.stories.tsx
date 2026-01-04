import type { Meta, StoryObj } from '@storybook/react'
import DashboardItem from '@packages/components/atoms/DashboardItem'

const meta = {
  title: 'Atoms/DashboardItem',
  component: DashboardItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof DashboardItem>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Dashboard Item',
    description: 'This is a dashboard item description',
  },
}

export const WithLongText: Story = {
  args: {
    title: 'Dashboard Item with Very Long Title',
    description:
      'This is a much longer description for the dashboard item to see how it handles text wrapping and layout',
  },
}

export const ShortDescription: Story = {
  args: {
    title: 'Quick Stats',
    description: 'View metrics',
  },
}
