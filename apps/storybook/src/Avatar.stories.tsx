import type { Meta, StoryObj } from '@storybook/react'
import Avatar, { AvatarImage, AvatarFallback } from '@packages/components/atoms/Avatar'

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
  render: () => (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="User avatar" />
      <AvatarFallback>UA</AvatarFallback>
    </Avatar>
  ),
}

export const Fallback: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="https://invalid-url.com/image.png" alt="User avatar" />
      <AvatarFallback>UA</AvatarFallback>
    </Avatar>
  ),
}

export const NoSource: Story = {
  render: () => (
    <Avatar>
      <AvatarFallback>FA</AvatarFallback>
    </Avatar>
  ),
}
