import type { Meta, StoryObj } from '@storybook/react'
import List from '@packages/components/molecules/List'
import ListItem from '@packages/components/atoms/ListItem'
import Button from '@packages/components/atoms/Button'
import { useState } from 'react'

const meta = {
  title: 'Molecules/List',
  component: List,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof List>

export default meta
type Story = StoryObj<typeof meta>

// Sample data
const componentLibraries = [
  {
    id: '1',
    icon: '8',
    title: '@8bitcn',
    description:
      'A set of 8-bit styled retro components. Works with your favorite frameworks. Open Source. Open Code.',
  },
  {
    id: '2',
    icon: '8',
    title: '@8starlabs-ui',
    description:
      'A set of beautifully designed components designed for developers who want niche, high-utility UI elements that you...',
  },
  {
    id: '3',
    icon: 'A',
    title: '@abui',
    description:
      "A shadcn-compatible registry of reusable components, blocks, and utilities conforming to Vercel's components.build specification",
  },
  {
    id: '4',
    icon: 'A',
    title: '@abstract',
    description: 'A collection of React components for the most common crypto patterns',
  },
  {
    id: '5',
    icon: 'A',
    title: '@aceternity',
    description:
      'A modern component library built with Tailwind CSS and Motion for React, Aceternity UI contains unique and interactive...',
  },
]

export const Default: Story = {
  args: {
    children: null,
  },
  render: () => (
    <div className="h-[600px] w-[700px] overflow-hidden rounded-lg border">
      <List>
        {componentLibraries.map((lib) => (
          <ListItem
            key={lib.id}
            icon={
              <div className="flex h-10 w-10 items-center justify-center rounded bg-muted font-bold">
                {lib.icon}
              </div>
            }
            title={lib.title}
            description={lib.description}
            actions={
              <>
                <Button variant="outline" size="sm">
                  View
                </Button>
                <Button variant="outline" size="sm">
                  MCP
                </Button>
              </>
            }
          />
        ))}
      </List>
    </div>
  ),
}

export const WithSearch: Story = {
  args: {
    children: null,
  },
  render: () => {
    const [searchQuery, setSearchQuery] = useState('')
    const filteredLibraries = componentLibraries.filter(
      (lib) =>
        lib.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lib.description.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
      <div className="h-[600px] w-[700px] overflow-hidden rounded-lg border">
        <List
          searchable
          searchPlaceholder="Search"
          searchValue={searchQuery}
          onSearchChange={setSearchQuery}
        >
          {filteredLibraries.map((lib) => (
            <ListItem
              key={lib.id}
              icon={
                <div className="flex h-10 w-10 items-center justify-center rounded bg-muted font-bold">
                  {lib.icon}
                </div>
              }
              title={lib.title}
              description={lib.description}
              actions={
                <>
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    MCP
                  </Button>
                </>
              }
            />
          ))}
        </List>
      </div>
    )
  },
}

export const WithHeader: Story = {
  args: {
    children: null,
  },
  render: () => (
    <div className="h-[600px] w-[700px] overflow-hidden rounded-lg border">
      <List
        searchable
        header={
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Component Libraries</h2>
            <Button variant="outline" size="sm">
              Add New
            </Button>
          </div>
        }
      >
        {componentLibraries.slice(0, 3).map((lib) => (
          <ListItem
            key={lib.id}
            icon={
              <div className="flex h-10 w-10 items-center justify-center rounded bg-muted font-bold">
                {lib.icon}
              </div>
            }
            title={lib.title}
            description={lib.description}
            actions={
              <Button variant="outline" size="sm">
                View
              </Button>
            }
          />
        ))}
      </List>
    </div>
  ),
}

export const EmptyState: Story = {
  args: {
    children: null,
  },
  render: () => (
    <div className="h-[400px] w-[700px] overflow-hidden rounded-lg border">
      <List searchable emptyState={<div className="text-center">No items found</div>}>
        {null}
      </List>
    </div>
  ),
}

export const SimpleList: Story = {
  args: {
    children: null,
  },
  render: () => (
    <div className="w-[500px] overflow-hidden rounded-lg border">
      <List>
        <ListItem title="First Item" description="This is the first item" />
        <ListItem title="Second Item" description="This is the second item" />
        <ListItem title="Third Item" description="This is the third item" />
      </List>
    </div>
  ),
}

export const ListItemVariants: Story = {
  args: {
    children: null,
  },
  render: () => (
    <div className="w-[600px] space-y-4">
      <div className="overflow-hidden rounded-lg border">
        <ListItem
          title="Item with icon and actions"
          icon={<span>🎨</span>}
          actions={<Button size="sm">Edit</Button>}
        />
      </div>

      <div className="overflow-hidden rounded-lg border">
        <ListItem
          title="Item with description"
          description="This is a longer description that provides more context about the item"
        />
      </div>

      <div className="overflow-hidden rounded-lg border">
        <ListItem title="Minimal item" />
      </div>

      <div className="overflow-hidden rounded-lg border">
        <ListItem
          title="Complex actions"
          description="Multiple action buttons"
          actions={
            <>
              <Button variant="ghost" size="sm">
                Delete
              </Button>
              <Button variant="outline" size="sm">
                Edit
              </Button>
              <Button size="sm">View</Button>
            </>
          }
        />
      </div>
    </div>
  ),
}
