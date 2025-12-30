// @ts-nocheck - React 19 type conflicts with @testing-library
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AuthClick from '@packages/components/molecules/AuthClick'

// Mock next-auth
const mockSignOut = vi.fn()
const mockUseSession = vi.fn()

vi.mock('next-auth/react', () => ({
  useSession: () => mockUseSession(),
  signOut: () => mockSignOut(),
}))

// Mock Auth provider
const mockSetLoginModalOpen = vi.fn()

vi.mock('@packages/components/providers/Auth', () => ({
  useAuthContext: () => ({
    loginModalOpen: false,
    setLoginModalOpen: mockSetLoginModalOpen,
  }),
}))

describe('AuthClick Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns null when session is loading', () => {
    mockUseSession.mockReturnValue({
      status: 'loading',
      data: null,
    })
    const { container } = render(<AuthClick />)
    expect(container.firstChild).toBeNull()
  })

  it('shows login text when unauthenticated', () => {
    mockUseSession.mockReturnValue({
      status: 'unauthenticated',
      data: null,
    })
    render(<AuthClick />)
    expect(screen.getByText('login')).toBeInTheDocument()
  })

  it('shows logout text with username when authenticated', () => {
    mockUseSession.mockReturnValue({
      status: 'authenticated',
      data: {
        user: {
          name: 'John Doe',
          email: 'john@example.com',
        },
      },
    })
    render(<AuthClick />)
    expect(screen.getByText('John Doe: logout')).toBeInTheDocument()
  })

  it('opens login modal when clicked while unauthenticated', async () => {
    mockUseSession.mockReturnValue({
      status: 'unauthenticated',
      data: null,
    })
    const user = userEvent.setup()
    render(<AuthClick />)
    const loginText = screen.getByText('login')
    await user.click(loginText)
    expect(mockSetLoginModalOpen).toHaveBeenCalledWith(true)
  })

  it('calls signOut when clicked while authenticated', async () => {
    mockUseSession.mockReturnValue({
      status: 'authenticated',
      data: {
        user: {
          name: 'John Doe',
          email: 'john@example.com',
        },
      },
    })
    const user = userEvent.setup()
    render(<AuthClick />)
    const logoutText = screen.getByText('John Doe: logout')
    await user.click(logoutText)
    expect(mockSignOut).toHaveBeenCalled()
  })

  it('renders as a span element', () => {
    mockUseSession.mockReturnValue({
      status: 'unauthenticated',
      data: null,
    })
    render(<AuthClick />)
    const element = screen.getByText('login')
    expect(element.tagName).toBe('SPAN')
  })

  it('has cursor-pointer class', () => {
    mockUseSession.mockReturnValue({
      status: 'unauthenticated',
      data: null,
    })
    render(<AuthClick />)
    const element = screen.getByText('login')
    expect(element).toHaveClass('cursor-pointer')
  })
})
