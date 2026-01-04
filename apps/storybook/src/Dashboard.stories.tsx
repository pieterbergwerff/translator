import type { Meta, StoryObj } from '@storybook/react'
import Dashboard from '@packages/components/molecules/Dashboard'

const meta = {
  title: 'Molecules/Dashboard',
  component: Dashboard,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    columns: {
      control: 'select',
      options: [2, 3, 4],
    },
  },
} satisfies Meta<typeof Dashboard>

export default meta
type Story = StoryObj<typeof meta>

const sampleData = [
  {
    title: 'Analytics',
    description: 'View detailed analytics and insights',
    icon: '📊',
  },
  {
    title: 'Users',
    description: 'Manage user accounts and permissions',
    icon: '👥',
  },
  {
    title: 'Settings',
    description: 'Configure system settings',
    icon: '⚙️',
  },
  {
    title: 'Reports',
    description: 'Generate and view reports',
    icon: '📈',
  },
  {
    title: 'Messages',
    description: 'View and send messages',
    icon: '💬',
  },
  {
    title: 'Calendar',
    description: 'Manage events and schedules',
    icon: '📅',
  },
]

export const Default: Story = {
  args: {
    data: sampleData,
  },
}

export const TwoColumns: Story = {
  args: {
    data: sampleData.slice(0, 4),
    columns: 2,
  },
}

export const FourColumns: Story = {
  args: {
    data: sampleData,
    columns: 4,
  },
}

export const WithoutIcons: Story = {
  args: {
    data: [
      {
        title: 'Dashboard',
        description: 'View your main dashboard',
      },
      {
        title: 'Projects',
        description: 'Manage your projects',
      },
      {
        title: 'Tasks',
        description: 'Track your tasks',
      },
    ],
  },
}

export const WithoutDescriptions: Story = {
  args: {
    data: [
      { title: 'Home', icon: '🏠' },
      { title: 'Profile', icon: '👤' },
      { title: 'Settings', icon: '⚙️' },
      { title: 'Help', icon: '❓' },
    ],
  },
}

export const MinimalItems: Story = {
  args: {
    data: [{ title: 'Item 1' }, { title: 'Item 2' }, { title: 'Item 3' }],
  },
}

export const Interactive: Story = {
  args: {
    data: sampleData.map((item) => ({
      ...item,
      onClick: () => alert(`Clicked: ${item.title}`),
    })),
  },
}

export const LargeGrid: Story = {
  args: {
    data: [
      { title: 'Item 1', description: 'Description 1', icon: '1️⃣' },
      { title: 'Item 2', description: 'Description 2', icon: '2️⃣' },
      { title: 'Item 3', description: 'Description 3', icon: '3️⃣' },
      { title: 'Item 4', description: 'Description 4', icon: '4️⃣' },
      { title: 'Item 5', description: 'Description 5', icon: '5️⃣' },
      { title: 'Item 6', description: 'Description 6', icon: '6️⃣' },
      { title: 'Item 7', description: 'Description 7', icon: '7️⃣' },
      { title: 'Item 8', description: 'Description 8', icon: '8️⃣' },
      { title: 'Item 9', description: 'Description 9', icon: '9️⃣' },
    ],
    columns: 3,
  },
}
