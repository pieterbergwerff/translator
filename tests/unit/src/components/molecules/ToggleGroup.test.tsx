// @ts-nocheck - React 19 type conflicts with @testing-library
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ToggleGroup, { ToggleGroupItem } from '@packages/components/molecules/ToggleGroup'

describe('ToggleGroup Component', () => {
  it('renders ToggleGroup correctly', () => {
    render(
      <ToggleGroup type="single" aria-label="Text alignment">
        <ToggleGroupItem value="left">Left</ToggleGroupItem>
        <ToggleGroupItem value="center">Center</ToggleGroupItem>
        <ToggleGroupItem value="right">Right</ToggleGroupItem>
      </ToggleGroup>
    )
    expect(screen.getByText('Left')).toBeInTheDocument()
    expect(screen.getByText('Center')).toBeInTheDocument()
    expect(screen.getByText('Right')).toBeInTheDocument()
  })

  it('handles single selection', async () => {
    const handleValueChange = vi.fn()
    const user = userEvent.setup()
    render(
      <ToggleGroup type="single" onValueChange={handleValueChange} aria-label="Alignment">
        <ToggleGroupItem value="left">Left</ToggleGroupItem>
        <ToggleGroupItem value="center">Center</ToggleGroupItem>
      </ToggleGroup>
    )
    await user.click(screen.getByText('Left'))
    expect(handleValueChange).toHaveBeenCalledWith('left')
  })

  it('handles multiple selection', async () => {
    const handleValueChange = vi.fn()
    const user = userEvent.setup()
    render(
      <ToggleGroup type="multiple" onValueChange={handleValueChange} aria-label="Styles">
        <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
        <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
      </ToggleGroup>
    )
    await user.click(screen.getByText('Bold'))
    expect(handleValueChange).toHaveBeenCalled()
  })

  it('applies variant prop to items', () => {
    render(
      <ToggleGroup type="single" variant="outline" aria-label="Options">
        <ToggleGroupItem value="option1">Option 1</ToggleGroupItem>
      </ToggleGroup>
    )
    const item = screen.getByText('Option 1')
    expect(item).toBeInTheDocument()
  })

  it('applies size prop to items', () => {
    render(
      <ToggleGroup type="single" size="sm" aria-label="Small options">
        <ToggleGroupItem value="small">Small</ToggleGroupItem>
      </ToggleGroup>
    )
    const item = screen.getByText('Small')
    expect(item).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(
      <ToggleGroup type="single" className="custom-group" aria-label="Custom">
        <ToggleGroupItem value="item">Item</ToggleGroupItem>
      </ToggleGroup>
    )
    const group = screen.getByRole('group')
    expect(group).toHaveClass('custom-group')
  })

  it('supports default value in single mode', () => {
    render(
      <ToggleGroup type="single" defaultValue="center" aria-label="Alignment">
        <ToggleGroupItem value="left">Left</ToggleGroupItem>
        <ToggleGroupItem value="center">Center</ToggleGroupItem>
        <ToggleGroupItem value="right">Right</ToggleGroupItem>
      </ToggleGroup>
    )
    const centerItem = screen.getByText('Center')
    expect(centerItem).toHaveAttribute('data-state', 'on')
  })

  it('supports controlled value in single mode', () => {
    render(
      <ToggleGroup type="single" value="right" aria-label="Alignment">
        <ToggleGroupItem value="left">Left</ToggleGroupItem>
        <ToggleGroupItem value="center">Center</ToggleGroupItem>
        <ToggleGroupItem value="right">Right</ToggleGroupItem>
      </ToggleGroup>
    )
    const rightItem = screen.getByText('Right')
    expect(rightItem).toHaveAttribute('data-state', 'on')
  })

  it('can be disabled', () => {
    render(
      <ToggleGroup type="single" disabled aria-label="Disabled group">
        <ToggleGroupItem value="item1">Item 1</ToggleGroupItem>
        <ToggleGroupItem value="item2">Item 2</ToggleGroupItem>
      </ToggleGroup>
    )
    const item1 = screen.getByText('Item 1')
    const item2 = screen.getByText('Item 2')
    expect(item1).toBeDisabled()
    expect(item2).toBeDisabled()
  })
})
