import { describe, it, expect, vi, beforeEach } from 'vitest'
import '@testing-library/jest-dom/vitest'
import { renderHook } from '@testing-library/react'
import { useSession } from 'next-auth/react'
import useLogged from '@packages/hooks/useLogged.hook.ts'

vi.mock('next-auth/react', () => ({
  useSession: vi.fn(),
}))

describe('useLogged hook', () => {
  const mockUpdate = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns null user when session is not authenticated', () => {
    vi.mocked(useSession).mockReturnValue({
      data: null,
      status: 'unauthenticated',
      update: mockUpdate,
    } as never)

    const { result } = renderHook(() => useLogged())

    expect(result.current.user).toBeNull()
    expect(result.current.update).toBeDefined()
  })

  it('returns user when session is authenticated', () => {
    const mockUser = {
      id: 'user-123',
      name: 'Test User',
      email: 'test@example.com',
    }

    vi.mocked(useSession).mockReturnValue({
      data: { user: mockUser },
      status: 'authenticated',
      update: mockUpdate,
    } as never)

    const { result } = renderHook(() => useLogged())

    expect(result.current.user).toEqual(mockUser)
    expect(result.current.update).toBeDefined()
  })

  it('returns null user when authenticated but user has no id', () => {
    vi.mocked(useSession).mockReturnValue({
      data: { user: { name: 'No ID User' } },
      status: 'authenticated',
      update: mockUpdate,
    } as never)

    const { result } = renderHook(() => useLogged())

    expect(result.current.user).toBeNull()
  })

  it('returns null user when session is loading', () => {
    vi.mocked(useSession).mockReturnValue({
      data: null,
      status: 'loading',
      update: mockUpdate,
    } as never)

    const { result } = renderHook(() => useLogged())

    expect(result.current.user).toBeNull()
  })

  it('provides update function that calls session.update', async () => {
    vi.mocked(useSession).mockReturnValue({
      data: null,
      status: 'unauthenticated',
      update: mockUpdate,
    } as never)

    const { result } = renderHook(() => useLogged())

    await result.current.update()

    expect(mockUpdate).toHaveBeenCalledTimes(1)
  })
})
