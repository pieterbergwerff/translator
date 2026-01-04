import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/vitest'

import ButtonLink from '@packages/components/atoms/ButtonLink'

// Mock Next.js router
const mockPush = vi.fn()
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}))

describe('ButtonLink Atom', () => {
  beforeEach(() => {
    mockPush.mockClear()
  })

  it('renders button with text', () => {
    render(<ButtonLink>Click me</ButtonLink>)
    expect(screen.getByRole('button')).toHaveTextContent('Click me')
  })

  it('calls router.push when href is provided and button is clicked', async () => {
    const user = userEvent.setup()
    render(<ButtonLink href="/test-page">Navigate</ButtonLink>)

    await user.click(screen.getByRole('button'))
    expect(mockPush).toHaveBeenCalledWith('/test-page')
  })

  it('uses custom onClick when no href is provided', async () => {
    const customOnClick = vi.fn()
    const user = userEvent.setup()
    render(<ButtonLink onClick={customOnClick}>Custom Click</ButtonLink>)

    await user.click(screen.getByRole('button'))
    expect(customOnClick).toHaveBeenCalledTimes(1)
    expect(mockPush).not.toHaveBeenCalled()
  })

  it('ignores empty href and uses onClick instead', async () => {
    const customOnClick = vi.fn()
    const user = userEvent.setup()
    render(
      <ButtonLink href="   " onClick={customOnClick}>
        Empty Href
      </ButtonLink>
    )

    await user.click(screen.getByRole('button'))
    expect(customOnClick).toHaveBeenCalledTimes(1)
    expect(mockPush).not.toHaveBeenCalled()
  })

  it('renders with different button variants', () => {
    render(<ButtonLink variant="destructive">Destructive</ButtonLink>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('bg-destructive')
  })

  it('renders disabled state', () => {
    render(<ButtonLink disabled>Disabled</ButtonLink>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('passes through button props', () => {
    render(
      <ButtonLink size="lg" variant="outline">
        Large Button
      </ButtonLink>
    )
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
  })
})
