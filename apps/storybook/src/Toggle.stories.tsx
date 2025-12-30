import type { Meta, StoryObj } from '@storybook/react'
import { Bold, Italic, Underline } from 'lucide-react'
import Toggle from '@packages/components/atoms/Toggle'

const meta = {
  title: 'Atoms/Toggle',
  component: Toggle,
  args: {
    variant: 'default',
    size: 'default',
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'outline'],
    },
    size: {
      control: { type: 'select' },
      options: ['default', 'sm', 'lg'],
    },
  },
} satisfies Meta<typeof Toggle>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    'aria-label': 'Toggle bold',
    children: <Bold className="h-4 w-4" />,
  },
}

export const Outline: Story = {
  args: {
    variant: 'outline',
    'aria-label': 'Toggle italic',
    children: <Italic className="h-4 w-4" />,
  },
}

export const Small: Story = {
  args: {
    size: 'sm',
    'aria-label': 'Toggle underline',
    children: <Underline className="h-3 w-3" />,
  },
}

export const Large: Story = {
  args: {
    size: 'lg',
    'aria-label': 'Toggle bold',
    children: <Bold className="h-5 w-5" />,
  },
}

export const WithText: Story = {
  args: {
    'aria-label': 'Toggle feature',
    children: 'Toggle',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    'aria-label': 'Disabled toggle',
    children: <Bold className="h-4 w-4" />,
  },
}

export const Pressed: Story = {
  args: {
    pressed: true,
    'aria-label': 'Pressed toggle',
    children: <Bold className="h-4 w-4" />,
  },
}
