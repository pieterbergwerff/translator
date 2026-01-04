import type { Meta, StoryObj } from '@storybook/react'
import ListItem from '@packages/components/atoms/ListItem'

const meta = {
  title: 'Atoms/ListItem',
  component: ListItem,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof ListItem>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'List item content',
  },
}

export const WithLongContent: Story = {
  args: {
    title:
      'This is a longer list item with more content to demonstrate how it handles text wrapping',
  },
}

export const Multiple: Story = {
  args: {
    title: 'Item with args',
  },
  render: () => (
    <ul className="space-y-2 list-none p-0">
      <ListItem title="First item" />
      <ListItem title="Second item" />
      <ListItem title="Third item" />
    </ul>
  ),
}
