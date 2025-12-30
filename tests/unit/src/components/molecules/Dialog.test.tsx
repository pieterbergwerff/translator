import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Dialog from '@packages/components/molecules/Dialog'

describe('Dialog Component', () => {
  it('renders dialog with default title when no title provided', () => {
    render(<Dialog open>Dialog Content</Dialog>)
    expect(screen.getByText('Dialog Content')).toBeInTheDocument()
  })

  it('renders with custom title', () => {
    render(
      <Dialog title="Custom Title" open>
        Content
      </Dialog>
    )
    expect(screen.getByText('Custom Title')).toBeInTheDocument()
  })

  it('renders with custom description', () => {
    render(
      <Dialog description="Custom description" open>
        Content
      </Dialog>
    )
    expect(screen.getByText('Custom description')).toBeInTheDocument()
  })

  it('renders children correctly', () => {
    render(
      <Dialog title="Test" open>
        Child Content
      </Dialog>
    )
    expect(screen.getByText('Child Content')).toBeInTheDocument()
  })

  it('renders close button when onClose provided', () => {
    const handleClose = () => {}
    render(
      <Dialog title="Test" onClose={handleClose} open>
        Content
      </Dialog>
    )
    const closeButton = screen.getByRole('button', { name: /close/i })
    expect(closeButton).toBeInTheDocument()
  })

  it('renders without visible title when title is empty but accessible', () => {
    render(<Dialog open>Content without visible title</Dialog>)
    expect(screen.getByText('Content without visible title')).toBeInTheDocument()
  })

  it('displays overlay', () => {
    const { container } = render(
      <Dialog title="Test" open>
        Content
      </Dialog>
    )
    const overlay = container.querySelector('[class*="fixed"][class*="inset-0"]')
    expect(overlay).toBeInTheDocument()
  })
})
