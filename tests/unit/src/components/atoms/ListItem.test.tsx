import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ListItem from '@packages/components/atoms/ListItem'

describe('ListItem', () => {
  it('renders with title', () => {
    render(<ListItem title="Test Title" />)
    expect(screen.getByText('Test Title')).toBeInTheDocument()
  })

  it('renders with title and description', () => {
    render(<ListItem title="Test Title" description="Test description" />)
    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.getByText('Test description')).toBeInTheDocument()
  })

  it('renders with icon', () => {
    render(<ListItem title="Test" icon={<span data-testid="icon">Icon</span>} />)
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })

  it('renders with actions', () => {
    render(
      <ListItem
        title="Test"
        actions={
          <button data-testid="action-button" type="button">
            Action
          </button>
        }
      />
    )
    expect(screen.getByTestId('action-button')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(<ListItem title="Test" className="custom-class" />)
    expect(container.firstChild).toHaveClass('custom-class')
  })

  it('renders complex title and description as ReactNode', () => {
    render(
      <ListItem
        title={<strong data-testid="custom-title">Bold Title</strong>}
        description={<em data-testid="custom-desc">Italic Description</em>}
      />
    )
    expect(screen.getByTestId('custom-title')).toBeInTheDocument()
    expect(screen.getByTestId('custom-desc')).toBeInTheDocument()
  })

  it('forwards ref correctly', () => {
    const ref = { current: null }
    render(<ListItem title="Test" ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
})
