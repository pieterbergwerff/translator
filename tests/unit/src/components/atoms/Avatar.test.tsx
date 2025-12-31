import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import '@testing-library/jest-dom/vitest'

// import components
import Avatar, { AvatarImage, AvatarFallback } from '@packages/components/atoms/Avatar'

describe('Avatar Atom Component', () => {
  it('renders with fallback text', () => {
    render(
      <Avatar>
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
    )
    expect(screen.getByText('AB')).toBeInTheDocument()
  })

  it('renders with image', () => {
    const { container } = render(
      <Avatar>
        <AvatarImage src="https://example.com/avatar.jpg" alt="User avatar" />
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
    )
    // Check that the avatar component is rendered
    expect(container.firstChild).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(
      <Avatar className="custom-avatar">
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
    )
    expect(container.firstChild).toHaveClass('custom-avatar')
  })

  it('renders multiple avatars', () => {
    render(
      <>
        <Avatar>
          <AvatarFallback>AB</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>CD</AvatarFallback>
        </Avatar>
      </>
    )
    expect(screen.getByText('AB')).toBeInTheDocument()
    expect(screen.getByText('CD')).toBeInTheDocument()
  })

  it('handles missing image with fallback', () => {
    render(
      <Avatar>
        <AvatarImage src="invalid-url" alt="Broken image" />
        <AvatarFallback>FB</AvatarFallback>
      </Avatar>
    )
    // Fallback should still be in document even if image fails to load
    expect(screen.getByText('FB')).toBeInTheDocument()
  })
})
