import '@testing-library/jest-dom/vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import DashboardItem from '@packages/components/atoms/DashboardItem'

describe('DashboardItem', () => {
  it('renders with title', () => {
    render(<DashboardItem title="Dashboard Title" />)
    expect(screen.getByText('Dashboard Title')).toBeInTheDocument()
  })

  it('renders with title and description', () => {
    render(<DashboardItem title="Title" description="Description text" />)
    expect(screen.getByText('Title')).toBeInTheDocument()
    expect(screen.getByText('Description text')).toBeInTheDocument()
  })

  it('renders with icon', () => {
    render(<DashboardItem title="Title" icon={<span data-testid="icon">📊</span>} />)
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })

  it('is clickable and calls onClick', () => {
    const handleClick = vi.fn()
    render(<DashboardItem title="Title" onClick={handleClick} />)

    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('applies custom className', () => {
    render(<DashboardItem title="Title" className="custom-class" />)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('custom-class')
  })

  it('renders as button element', () => {
    render(<DashboardItem title="Title" />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('forwards ref correctly', () => {
    const ref = { current: null }
    render(<DashboardItem title="Title" ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLButtonElement)
  })

  it('can be disabled', () => {
    render(<DashboardItem title="Title" disabled />)
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
  })

  it('renders complex title as ReactNode', () => {
    render(<DashboardItem title={<strong data-testid="bold-title">Bold</strong>} />)
    expect(screen.getByTestId('bold-title')).toBeInTheDocument()
  })
})
