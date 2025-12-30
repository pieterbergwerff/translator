import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import LoginModal from '@packages/components/organisms/LoginModal'

// Mock the Auth provider
vi.mock('@packages/components/providers/Auth', () => ({
  useAuthContext: () => ({
    loginModalOpen: true,
    setLoginModalOpen: vi.fn(),
  }),
}))

// Mock next-auth
vi.mock('next-auth/react', () => ({
  signIn: vi.fn(),
}))

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    refresh: vi.fn(),
  }),
}))

describe('LoginModal Component', () => {
  it('renders dialog when loginModalOpen is true', () => {
    render(<LoginModal />)
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
  })

  it('renders LoginForm inside dialog', () => {
    render(<LoginModal />)
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()
  })
})
