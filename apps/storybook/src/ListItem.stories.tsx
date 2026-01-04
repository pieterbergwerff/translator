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
    children: 'List item content',
  },
}

export const WithLongContent: Story = {
  args: {
    children:
      'This is a longer list item with more content to demonstrate how it handles text wrapping',
  },
}

export const Multiple: Story = {
  render: () => (
    <ul className="space-y-2 list-none p-0">
      <ListItem>First item</ListItem>
      <ListItem>Second item</ListItem>
      <ListItem>Third item</ListItem>
    </ul>
  ),
}
