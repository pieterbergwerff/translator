import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Input from '@packages/components/atoms/Input'

describe('Input Component', () => {
  it('renders an input element', () => {
    render(<Input data-testid="input" />)
    const input = screen.getByTestId('input')
    expect(input.tagName).toBe('INPUT')
  })

  it('applies custom className', () => {
    render(<Input className="custom-class" data-testid="input" />)
    const input = screen.getByTestId('input')
    expect(input).toHaveClass('custom-class')
  })

  it('supports type attribute', () => {
    render(<Input type="email" data-testid="input" />)
    const input = screen.getByTestId('input')
    expect(input).toHaveAttribute('type', 'email')
  })

  it('supports placeholder attribute', () => {
    render(<Input placeholder="Enter text" data-testid="input" />)
    const input = screen.getByTestId('input')
    expect(input).toHaveAttribute('placeholder', 'Enter text')
  })

  it('can be disabled', () => {
    render(<Input disabled data-testid="input" />)
    const input = screen.getByTestId('input')
    expect(input).toBeDisabled()
  })

  it('supports value and onChange', async () => {
    const handleChange = vi.fn()
    const user = userEvent.setup()
    render(<Input value="" onChange={handleChange} data-testid="input" />)
    const input = screen.getByTestId('input')
    await user.type(input, 'test')
    expect(handleChange).toHaveBeenCalled()
  })

  it('supports required attribute', () => {
    render(<Input required data-testid="input" />)
    const input = screen.getByTestId('input')
    expect(input).toBeRequired()
  })

  it('supports name attribute', () => {
    render(<Input name="username" data-testid="input" />)
    const input = screen.getByTestId('input')
    expect(input).toHaveAttribute('name', 'username')
  })

  it('supports id attribute', () => {
    render(<Input id="test-input" data-testid="input" />)
    const input = screen.getByTestId('input')
    expect(input).toHaveAttribute('id', 'test-input')
  })

  it('supports different input types', () => {
    const types = ['text', 'password', 'email', 'number', 'tel', 'url'] as const
    types.forEach((type) => {
      const { unmount } = render(<Input type={type} data-testid={`input-${type}`} />)
      const input = screen.getByTestId(`input-${type}`)
      expect(input).toHaveAttribute('type', type)
      unmount()
    })
  })
})
