import '@testing-library/jest-dom/vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import List from '@packages/components/molecules/List'

describe('List', () => {
  it('renders children', () => {
    render(
      <List>
        <div>Item 1</div>
        <div>Item 2</div>
      </List>
    )
    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.getByText('Item 2')).toBeInTheDocument()
  })

  it('renders search field when searchable', () => {
    render(<List searchable>Content</List>)
    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument()
  })

  it('uses custom search placeholder', () => {
    render(
      <List searchable searchPlaceholder="Search items...">
        Content
      </List>
    )
    expect(screen.getByPlaceholderText('Search items...')).toBeInTheDocument()
  })

  it('handles uncontrolled search input', () => {
    render(<List searchable>Content</List>)
    const input = screen.getByPlaceholderText('Search')
    fireEvent.change(input, { target: { value: 'test query' } })
    expect(input).toHaveValue('test query')
  })

  it('handles controlled search input', () => {
    const handleChange = vi.fn()
    const { rerender } = render(
      <List searchable searchValue="" onSearchChange={handleChange}>
        Content
      </List>
    )

    const input = screen.getByPlaceholderText('Search')
    fireEvent.change(input, { target: { value: 'test' } })

    expect(handleChange).toHaveBeenCalledWith('test')
    expect(input).toHaveValue('')

    rerender(
      <List searchable searchValue="test" onSearchChange={handleChange}>
        Content
      </List>
    )
    expect(input).toHaveValue('test')
  })

  it('renders header content', () => {
    render(<List header={<div>Header Content</div>}>Content</List>)
    expect(screen.getByText('Header Content')).toBeInTheDocument()
  })

  it('renders empty state when no children', () => {
    render(<List emptyState={<div>No items found</div>}>{null}</List>)
    expect(screen.getByText('No items found')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(<List className="custom-list">Content</List>)
    expect(container.firstChild).toHaveClass('custom-list')
  })

  it('forwards ref correctly', () => {
    const ref = { current: null }
    render(<List ref={ref}>Content</List>)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it('does not render search when searchable is false', () => {
    render(<List searchable={false}>Content</List>)
    expect(screen.queryByPlaceholderText('Search')).not.toBeInTheDocument()
  })

  it('renders both header and search field', () => {
    render(
      <List searchable header={<div>List Header</div>}>
        Content
      </List>
    )
    expect(screen.getByText('List Header')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument()
  })
})
