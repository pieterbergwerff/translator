import { describe, it, expect, vi, beforeEach } from 'vitest'
import '@testing-library/jest-dom/vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { SWRConfig } from 'swr'
import useIsRootHook from '@packages/hooks/useIsRoot.hook.ts'
import isRootUserAction from '@packages/actions/user/is-root-user.action.ts'
import useLogged from '@packages/hooks/useLogged.hook.ts'
import type { ReactNode } from 'react'

vi.mock('@packages/actions/user/is-root-user.action.ts', () => ({
  default: vi.fn(),
}))

vi.mock('@packages/hooks/useLogged.hook.ts', () => ({
  default: vi.fn(),
}))

// Wrapper to disable SWR cache for tests
const wrapper = ({ children }: { children: ReactNode }) => (
  <SWRConfig value={{ provider: () => new Map() }}>{children}</SWRConfig>
)

describe('useIsRoot hook', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns false when user is not logged in', () => {
    vi.mocked(useLogged).mockReturnValue({ user: null, update: vi.fn() })

    const { result } = renderHook(() => useIsRootHook(), { wrapper })

    expect(result.current.isRoot).toBe(false)
    expect(result.current.isLoading).toBe(false)
  })

  it('returns true when user is root', async () => {
    const mockUser = { id: 123, name: 'Admin', email: 'admin@example.com' }
    vi.mocked(useLogged).mockReturnValue({ user: mockUser, update: vi.fn() })
    vi.mocked(isRootUserAction).mockResolvedValue(true)

    const { result } = renderHook(() => useIsRootHook(), { wrapper })

    await waitFor(() => {
      expect(result.current.isRoot).toBe(true)
      expect(result.current.isLoading).toBe(false)
    })
  })

  it('returns false when user is not root', async () => {
    const mockUser = { id: 456, name: 'Regular User', email: 'user@example.com' }
    vi.mocked(useLogged).mockReturnValue({ user: mockUser, update: vi.fn() })
    vi.mocked(isRootUserAction).mockResolvedValue(false)

    const { result } = renderHook(() => useIsRootHook(), { wrapper })

    await waitFor(() => {
      expect(result.current.isRoot).toBe(false)
      expect(result.current.isLoading).toBe(false)
    })
  })

  it('calls isRootUserAction with correct user id', async () => {
    const mockUser = { id: 789, name: 'Test User', email: 'test@example.com' }
    vi.mocked(useLogged).mockReturnValue({ user: mockUser, update: vi.fn() })
    vi.mocked(isRootUserAction).mockResolvedValue(false)

    renderHook(() => useIsRootHook(), { wrapper })

    await waitFor(() => {
      expect(isRootUserAction).toHaveBeenCalledWith(789)
    })
  })
})
