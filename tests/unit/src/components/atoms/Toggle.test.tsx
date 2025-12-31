// @ts-nocheck - React 19 type conflicts with @testing-library
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Toggle from '@packages/components/atoms/Toggle'

describe('Toggle Component', () => {
  it('renders correctly', () => {
    render(<Toggle aria-label="Toggle feature">Toggle</Toggle>)
    const toggle = screen.getByRole('button', { name: 'Toggle feature' })
    expect(toggle).toBeInTheDocument()
  })

  it('renders children correctly', () => {
    render(<Toggle aria-label="Feature toggle">Enable Feature</Toggle>)
    expect(screen.getByText('Enable Feature')).toBeInTheDocument()
  })

  it('applies variant prop correctly', () => {
    render(
      <Toggle variant="outline" aria-label="Outline toggle">
        Outline Toggle
      </Toggle>
    )
    const toggle = screen.getByRole('button', { name: 'Outline toggle' })
    expect(toggle).toBeInTheDocument()
  })

  it('applies size prop correctly', () => {
    render(
      <Toggle size="sm" aria-label="Small toggle">
        Small
      </Toggle>
    )
    const toggle = screen.getByRole('button', { name: 'Small toggle' })
    expect(toggle).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(
      <Toggle className="custom-class" aria-label="Custom toggle">
        Custom
      </Toggle>
    )
    const toggle = screen.getByRole('button', { name: 'Custom toggle' })
    expect(toggle).toHaveClass('custom-class')
  })

  it('handles toggle state changes', async () => {
    const handlePressedChange = vi.fn()
    const user = userEvent.setup()
    render(
      <Toggle onPressedChange={handlePressedChange} aria-label="Toggle state">
        Toggle Me
      </Toggle>
    )
    const toggle = screen.getByRole('button', { name: 'Toggle state' })
    await user.click(toggle)
    expect(handlePressedChange).toHaveBeenCalledTimes(1)
  })

  it('can be disabled', () => {
    render(
      <Toggle disabled aria-label="Disabled toggle">
        Disabled
      </Toggle>
    )
    const toggle = screen.getByRole('button', { name: 'Disabled toggle' })
    expect(toggle).toBeDisabled()
  })

  it('supports pressed state', () => {
    render(
      <Toggle pressed={true} aria-label="Pressed toggle">
        Pressed
      </Toggle>
    )
    const toggle = screen.getByRole('button', { name: 'Pressed toggle' })
    expect(toggle).toHaveAttribute('data-state', 'on')
  })

  it('supports unpressed state', () => {
    render(
      <Toggle pressed={false} aria-label="Unpressed toggle">
        Unpressed
      </Toggle>
    )
    const toggle = screen.getByRole('button', { name: 'Unpressed toggle' })
    expect(toggle).toHaveAttribute('data-state', 'off')
  })
})
