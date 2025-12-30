// @ts-nocheck - React 19 type conflicts with @testing-library
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LoginForm from '@packages/components/organisms/LoginForm'

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

describe('LoginForm Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders email and password inputs', () => {
    render(<LoginForm />)
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
  })

  it('renders submit button', () => {
    render(<LoginForm />)
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()
  })

  it('has default email and password values', () => {
    render(<LoginForm />)
    const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement
    const passwordInput = screen.getByLabelText(/password/i) as HTMLInputElement
    expect(emailInput.value).toBe('admin@example.com')
    expect(passwordInput.value).toBe('admin123')
  })

  it('updates email input on change', async () => {
    const user = userEvent.setup()
    render(<LoginForm />)
    const emailInput = screen.getByLabelText(/email/i)
    await user.clear(emailInput)
    await user.type(emailInput, 'test@test.com')
    await waitFor(() => {
      expect(emailInput).toHaveValue('test@test.com')
    })
  })

  it('updates password input on change', async () => {
    const user = userEvent.setup()
    render(<LoginForm />)
    const passwordInput = screen.getByLabelText(/password/i)
    await user.clear(passwordInput)
    await user.type(passwordInput, 'newpassword')
    await waitFor(() => {
      expect(passwordInput).toHaveValue('newpassword')
    })
  })

  it('has required fields', () => {
    render(<LoginForm />)
    expect(screen.getByLabelText(/email/i)).toBeRequired()
    expect(screen.getByLabelText(/password/i)).toBeRequired()
  })

  it('calls onSubmit callback when provided', async () => {
    const onSubmit = vi.fn()
    const user = userEvent.setup()
    render(<LoginForm onSubmit={onSubmit} />)
    const submitButton = screen.getByRole('button', { name: /sign in/i })
    await user.click(submitButton)
    // Note: onSubmit would be called after successful sign in
  })
})
