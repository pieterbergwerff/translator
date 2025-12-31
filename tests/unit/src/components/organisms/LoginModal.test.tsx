// @ts-nocheck - React 19 type conflicts with @testing-library
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import LoginModal from '@packages/components/organisms/LoginModal'
import { AuthClientProvider } from '@packages/components/providers/AuthClient'

// Mock next-auth
vi.mock('next-auth/react', () => ({
  signIn: vi.fn(),
  useSession: () => ({
    data: null,
    status: 'unauthenticated',
  }),
  SessionProvider: ({ children }) => children,
}))

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    refresh: vi.fn(),
  }),
}))

describe('LoginModal Component', () => {
  const renderWithProvider = (initialLoginModalOpen = true) => {
    return render(
      <AuthClientProvider initialLoginModalOpen={initialLoginModalOpen}>
        <LoginModal />
      </AuthClientProvider>
    )
  }

  it('renders dialog when loginModalOpen is true', () => {
    renderWithProvider(true)
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
  })

  it('renders LoginForm inside dialog', () => {
    renderWithProvider(true)
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()
  })
})
