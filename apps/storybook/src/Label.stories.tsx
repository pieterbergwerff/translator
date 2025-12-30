// @ts-nocheck - React 19 type conflicts
import type { Meta, StoryObj } from '@storybook/react'
import Label from '@packages/components/atoms/Label'
import Input from '@packages/components/atoms/Input'

const meta: Meta<typeof Label> = {
  title: 'Atoms/Label',
  component: Label,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    htmlFor: {
      control: { type: 'text' },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Label Text',
  },
}

export const WithInput: Story = {
  args: {
    htmlFor: 'example-input',
    children: 'Email Address',
  },
  render: (args) => (
    <div className="space-y-2">
      <Label {...args} />
      <Input id="example-input" type="email" placeholder="Enter your email..." />
    </div>
  ),
}
