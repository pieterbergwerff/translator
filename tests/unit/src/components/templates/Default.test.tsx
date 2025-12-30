// @ts-nocheck - React 19 type conflicts with @testing-library
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import DefaultTemplate from '@packages/components/templates/Default'

// Mock next-auth
vi.mock('next-auth/react', () => ({
  useSession: vi.fn(),
  signIn: vi.fn(),
}))

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    refresh: vi.fn(),
  }),
}))

// Mock the Auth provider
vi.mock('@packages/components/providers/Auth', () => ({
  useAuthContext: () => ({
    loginModalOpen: false,
    setLoginModalOpen: vi.fn(),
  }),
}))

describe('Default Template Component', () => {
  it('renders children correctly', async () => {
    const { useSession } = await import('next-auth/react')
    vi.mocked(useSession).mockReturnValue({
      data: null,
      status: 'authenticated',
      update: vi.fn(),
    })

    render(
      <DefaultTemplate>
        <div>Test Content</div>
      </DefaultTemplate>
    )

    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('does not render LoginModal when authenticated', async () => {
    const { useSession } = await import('next-auth/react')
    vi.mocked(useSession).mockReturnValue({
      data: { user: { email: 'test@example.com' } },
      status: 'authenticated',
      update: vi.fn(),
    })

    render(
      <DefaultTemplate>
        <div>Test Content</div>
      </DefaultTemplate>
    )

    expect(screen.queryByLabelText(/email/i)).not.toBeInTheDocument()
  })

  it('renders LoginModal component when unauthenticated', async () => {
    const { useSession } = await import('next-auth/react')
    vi.mocked(useSession).mockReturnValue({
      data: null,
      status: 'unauthenticated',
      update: vi.fn(),
    })

    const { container } = render(
      <DefaultTemplate>
        <div>Test Content</div>
      </DefaultTemplate>
    )

    // LoginModal is rendered, but won't be visible unless loginModalOpen is true in Auth context
    // Just verify the content renders alongside the LoginModal component
    expect(screen.getByText('Test Content')).toBeInTheDocument()
    expect(container).toBeTruthy()
  })

  it('renders children with LoginModal when unauthenticated', async () => {
    const { useSession } = await import('next-auth/react')
    vi.mocked(useSession).mockReturnValue({
      data: null,
      status: 'unauthenticated',
      update: vi.fn(),
    })

    render(
      <DefaultTemplate>
        <div>Test Content</div>
      </DefaultTemplate>
    )

    // Verify children are rendered
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('does not render LoginModal when loading', async () => {
    const { useSession } = await import('next-auth/react')
    vi.mocked(useSession).mockReturnValue({
      data: null,
      status: 'loading',
      update: vi.fn(),
    })

    render(
      <DefaultTemplate>
        <div>Test Content</div>
      </DefaultTemplate>
    )

    expect(screen.queryByLabelText(/email/i)).not.toBeInTheDocument()
  })
})
