import type { Meta, StoryObj } from '@storybook/react'
import Avatar from '@packages/components/atoms/Avatar'

const meta = {
  title: 'Atoms/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    src: 'https://github.com/shadcn.png',
    alt: 'User avatar',
  },
}

export const Fallback: Story = {
  args: {
    src: 'https://invalid-url.com/image.png',
    alt: 'User avatar',
  },
}

export const NoSource: Story = {
  args: {
    alt: 'Fallback avatar',
  },
}
