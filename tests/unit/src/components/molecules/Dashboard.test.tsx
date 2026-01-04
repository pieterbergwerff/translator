import '@testing-library/jest-dom/vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Dashboard from '@packages/components/molecules/Dashboard'

describe('Dashboard', () => {
  const sampleData = [
    { title: 'Item 1', description: 'Description 1' },
    { title: 'Item 2', description: 'Description 2' },
    { title: 'Item 3', description: 'Description 3' },
  ]

  it('renders all dashboard items from data', () => {
    render(<Dashboard data={sampleData} />)
    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.getByText('Item 2')).toBeInTheDocument()
    expect(screen.getByText('Item 3')).toBeInTheDocument()
  })

  it('renders descriptions for items', () => {
    render(<Dashboard data={sampleData} />)
    expect(screen.getByText('Description 1')).toBeInTheDocument()
    expect(screen.getByText('Description 2')).toBeInTheDocument()
    expect(screen.getByText('Description 3')).toBeInTheDocument()
  })

  it('renders icons when provided', () => {
    const dataWithIcons = [{ title: 'Item', icon: <span data-testid="icon-1">📊</span> }]
    render(<Dashboard data={dataWithIcons} />)
    expect(screen.getByTestId('icon-1')).toBeInTheDocument()
  })

  it('handles click events on items', () => {
    const handleClick = vi.fn()
    const dataWithClick = [{ title: 'Clickable', onClick: handleClick }]

    render(<Dashboard data={dataWithClick} />)
    const button = screen.getByRole('button', { name: /clickable/i })
    fireEvent.click(button)

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('applies custom className', () => {
    const { container } = render(<Dashboard data={sampleData} className="custom-dashboard" />)
    expect(container.firstChild).toHaveClass('custom-dashboard')
  })

  it('renders empty dashboard with empty data', () => {
    const { container } = render(<Dashboard data={[]} />)
    const buttons = container.querySelectorAll('button')
    expect(buttons).toHaveLength(0)
  })

  it('uses custom keys when provided', () => {
    const dataWithKeys = [
      { key: 'custom-1', title: 'Item 1' },
      { key: 'custom-2', title: 'Item 2' },
    ]
    const { container } = render(<Dashboard data={dataWithKeys} />)
    expect(container.querySelectorAll('button')).toHaveLength(2)
  })

  it('applies 2-column grid when columns=2', () => {
    const { container } = render(<Dashboard data={sampleData} columns={2} />)
    const grid = container.querySelector('.grid')
    expect(grid).toHaveClass('sm:grid-cols-2')
  })

  it('applies 3-column grid by default', () => {
    const { container } = render(<Dashboard data={sampleData} />)
    const grid = container.querySelector('.grid')
    expect(grid).toHaveClass('lg:grid-cols-3')
  })

  it('applies 4-column grid when columns=4', () => {
    const { container } = render(<Dashboard data={sampleData} columns={4} />)
    const grid = container.querySelector('.grid')
    expect(grid).toHaveClass('xl:grid-cols-4')
  })

  it('forwards ref correctly', () => {
    const ref = { current: null }
    render(<Dashboard data={sampleData} ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
})
