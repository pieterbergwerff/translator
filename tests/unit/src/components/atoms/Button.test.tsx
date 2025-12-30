import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Button from '@packages/components/atoms/Button'

describe('Button Component', () => {
  it('renders with default variant and size', () => {
    render(<Button>Click me</Button>)
    const button = screen.getByRole('button', { name: 'Click me' })
    expect(button).toBeInTheDocument()
  })

  it('renders children correctly', () => {
    render(<Button>Test Button</Button>)
    expect(screen.getByText('Test Button')).toBeInTheDocument()
  })

  it('applies variant prop correctly', () => {
    render(<Button variant="destructive">Delete</Button>)
    const button = screen.getByRole('button', { name: 'Delete' })
    expect(button).toBeInTheDocument()
  })

  it('applies size prop correctly', () => {
    render(<Button size="sm">Small Button</Button>)
    const button = screen.getByRole('button', { name: 'Small Button' })
    expect(button).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(<Button className="custom-class">Styled Button</Button>)
    const button = screen.getByRole('button', { name: 'Styled Button' })
    expect(button).toHaveClass('custom-class')
  })

  it('handles onClick event', async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()
    render(<Button onClick={handleClick}>Click me</Button>)
    const button = screen.getByRole('button', { name: 'Click me' })
    await user.click(button)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('can be disabled', () => {
    render(<Button disabled>Disabled Button</Button>)
    const button = screen.getByRole('button', { name: 'Disabled Button' })
    expect(button).toBeDisabled()
  })

  it('supports type attribute', () => {
    render(<Button type="submit">Submit</Button>)
    const button = screen.getByRole('button', { name: 'Submit' })
    expect(button).toHaveAttribute('type', 'submit')
  })

  it('renders as child when asChild is true', () => {
    render(
      <Button asChild>
        <a href="/test">Link Button</a>
      </Button>
    )
    const link = screen.getByRole('link', { name: 'Link Button' })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/test')
  })

  it('supports all variant options', () => {
    const variants = ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'] as const
    variants.forEach((variant) => {
      const { unmount } = render(<Button variant={variant}>{variant}</Button>)
      expect(screen.getByRole('button', { name: variant })).toBeInTheDocument()
      unmount()
    })
  })

  it('supports all size options', () => {
    const sizes = ['default', 'sm', 'lg', 'icon'] as const
    sizes.forEach((size) => {
      const { unmount } = render(<Button size={size}>{size}</Button>)
      expect(screen.getByRole('button', { name: size })).toBeInTheDocument()
      unmount()
    })
  })
})
