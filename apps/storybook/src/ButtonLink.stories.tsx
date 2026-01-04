import type { Meta, StoryObj } from '@storybook/react'
import ButtonLink from '@packages/components/atoms/ButtonLink'

const meta = {
  title: 'Atoms/ButtonLink',
  component: ButtonLink,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
    },
    href: {
      control: 'text',
      description: 'URL to navigate to when clicked',
    },
  },
} satisfies Meta<typeof ButtonLink>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Navigate',
    href: '/example',
  },
}

export const WithCustomOnClick: Story = {
  args: {
    children: 'Custom Action',
    onClick: () => alert('Custom click handler!'),
  },
}

export const Destructive: Story = {
  args: {
    children: 'Delete',
    href: '/delete',
    variant: 'destructive',
  },
}

export const Outline: Story = {
  args: {
    children: 'Learn More',
    href: '/learn',
    variant: 'outline',
  },
}

export const Ghost: Story = {
  args: {
    children: 'Cancel',
    href: '/cancel',
    variant: 'ghost',
  },
}

export const Large: Story = {
  args: {
    children: 'Get Started',
    href: '/start',
    size: 'lg',
  },
}

export const Small: Story = {
  args: {
    children: 'Small Link',
    href: '/small',
    size: 'sm',
  },
}

export const Disabled: Story = {
  args: {
    children: 'Disabled',
    href: '/disabled',
    disabled: true,
  },
}
