# List Components

A flexible List component system with a sticky search field and customizable list items.

## Components

### List (Molecule)

Container component with optional sticky search field and header.

**Props:**

- `children`: ReactNode - List items to render
- `searchable?`: boolean - Show search field (default: false)
- `searchPlaceholder?`: string - Search placeholder text (default: "Search")
- `searchValue?`: string - Controlled search value
- `onSearchChange?`: (value: string) => void - Search change handler
- `header?`: ReactNode - Header content above the list
- `emptyState?`: ReactNode - Content to show when no items

### ListItem (Atom)

Individual list item with icon, title, description, and actions.

**Props:**

- `icon?`: ReactNode - Icon or avatar on the left
- `title`: ReactNode - Title of the item (required)
- `description?`: ReactNode - Description text below title
- `actions?`: ReactNode - Action buttons on the right

## Usage Examples

### Basic List

```tsx
import List from '@packages/components/molecules/List'
import ListItem from '@packages/components/atoms/ListItem'

function BasicList() {
  return (
    <List>
      <ListItem title="Item 1" description="Description for item 1" />
      <ListItem title="Item 2" description="Description for item 2" />
      <ListItem title="Item 3" description="Description for item 3" />
    </List>
  )
}
```

### List with Search

```tsx
import { useState } from 'react'
import List from '@packages/components/molecules/List'
import ListItem from '@packages/components/atoms/ListItem'

function SearchableList() {
  const [searchQuery, setSearchQuery] = useState('')

  const items = [
    { id: 1, title: 'First Item', description: 'First description' },
    { id: 2, title: 'Second Item', description: 'Second description' },
    { id: 3, title: 'Third Item', description: 'Third description' },
  ]

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <List
      searchable
      searchPlaceholder="Search items..."
      searchValue={searchQuery}
      onSearchChange={setSearchQuery}
    >
      {filteredItems.map((item) => (
        <ListItem key={item.id} title={item.title} description={item.description} />
      ))}
    </List>
  )
}
```

### List with Icons and Actions

```tsx
import List from '@packages/components/molecules/List'
import ListItem from '@packages/components/atoms/ListItem'
import Button from '@packages/components/atoms/Button'

function ListWithActions() {
  return (
    <List searchable>
      <ListItem
        icon={<span>🎨</span>}
        title="Design System"
        description="A comprehensive design system"
        actions={
          <>
            <Button variant="outline" size="sm">
              View
            </Button>
            <Button size="sm">Edit</Button>
          </>
        }
      />
      <ListItem
        icon={<span>📦</span>}
        title="Component Library"
        description="Reusable React components"
        actions={
          <Button variant="outline" size="sm">
            View
          </Button>
        }
      />
    </List>
  )
}
```

### List with Header

```tsx
import List from '@packages/components/molecules/List'
import ListItem from '@packages/components/atoms/ListItem'
import Button from '@packages/components/atoms/Button'

function ListWithHeader() {
  return (
    <List
      searchable
      header={
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">My Items</h2>
          <Button size="sm">Add New</Button>
        </div>
      }
    >
      <ListItem title="Item 1" description="Description 1" />
      <ListItem title="Item 2" description="Description 2" />
    </List>
  )
}
```

### Full Example (Like the Screenshot)

```tsx
import { useState } from 'react'
import List from '@packages/components/molecules/List'
import ListItem from '@packages/components/atoms/ListItem'
import Button from '@packages/components/atoms/Button'

function ComponentLibraryList() {
  const [searchQuery, setSearchQuery] = useState('')

  const libraries = [
    {
      id: '1',
      icon: '8',
      title: '@8bitcn',
      description: 'A set of 8-bit styled retro components. Works with your favorite frameworks.',
    },
    {
      id: '2',
      icon: '8',
      title: '@8starlabs-ui',
      description: 'A set of beautifully designed components designed for developers.',
    },
    // ... more items
  ]

  const filteredLibraries = libraries.filter(
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
}
```

## Styling

Both components use Tailwind CSS and respect the project's theme system. They support all standard div props including `className` for custom styling.

## Accessibility

- Search input includes proper type and placeholder attributes
- List items are keyboard navigable
- Supports all standard HTML div attributes

## Testing

Comprehensive unit tests are available in:

- `tests/unit/src/components/atoms/ListItem.test.tsx`
- `tests/unit/src/components/molecules/List.test.tsx`

## Storybook

Interactive examples available in Storybook at:

- `apps/storybook/src/List.stories.tsx`

Run Storybook: `npm run dev` (available at http://localhost:4000)
