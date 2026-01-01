import { describe, it, expect, vi, beforeEach } from 'vitest'
import '@testing-library/jest-dom/vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { SWRConfig } from 'swr'
import useSettings from '@packages/hooks/useSettings.hook.ts'
import getSettingsAction from '@packages/actions/settings/get-settings.action.ts'
import useLogged from '@packages/hooks/useLogged.hook.ts'
import type { ReactNode } from 'react'

vi.mock('@packages/actions/settings/get-settings.action.ts', () => ({
  default: vi.fn(),
}))

vi.mock('@packages/hooks/useLogged.hook.ts', () => ({
  default: vi.fn(),
}))

// Wrapper to disable SWR cache for tests
const wrapper = ({ children }: { children: ReactNode }) => (
  <SWRConfig value={{ provider: () => new Map() }}>{children}</SWRConfig>
)

describe('useSettings hook', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns undefined when user is not logged in', () => {
    vi.mocked(useLogged).mockReturnValue({ user: null, update: vi.fn() })

    const { result } = renderHook(() => useSettings('theme', 'light'), { wrapper })

    expect(result.current.data).toBeUndefined()
    // isLoading may vary based on SWR internal state
  })

  it('fetches and returns setting value when user is logged in', async () => {
    const mockUser = { id: 'user-123', name: 'Test', email: 'test@example.com' }
    vi.mocked(useLogged).mockReturnValue({ user: mockUser, update: vi.fn() })
    vi.mocked(getSettingsAction).mockResolvedValue({
      settingsId: '1',
      settingsUserId: 'user-123',
      settingsName: 'theme',
      settingsValue: 'dark',
      created_at: new Date(),
      updated_at: new Date(),
    })

    const { result } = renderHook(() => useSettings('theme', 'light'), { wrapper })

    await waitFor(() => {
      expect(result.current.data).toBe('dark')
      expect(result.current.isLoading).toBe(false)
    })
  })

  it('returns default value when setting does not exist', async () => {
    const mockUser = { id: 'user-123', name: 'Test', email: 'test@example.com' }
    vi.mocked(useLogged).mockReturnValue({ user: mockUser, update: vi.fn() })
    vi.mocked(getSettingsAction).mockResolvedValue(null)

    const { result } = renderHook(() => useSettings('theme', 'light'), { wrapper })

    await waitFor(() => {
      expect(result.current.data).toBe('light')
      expect(result.current.isLoading).toBe(false)
    })
  })

  it('returns default value when setting value is empty', async () => {
    const mockUser = { id: 'user-123', name: 'Test', email: 'test@example.com' }
    vi.mocked(useLogged).mockReturnValue({ user: mockUser, update: vi.fn() })
    vi.mocked(getSettingsAction).mockResolvedValue({
      settingsId: '1',
      settingsUserId: 'user-123',
      settingsName: 'theme',
      settingsValue: '',
      created_at: new Date(),
      updated_at: new Date(),
    })

    const { result } = renderHook(() => useSettings('theme', 'light'), { wrapper })

    await waitFor(() => {
      expect(result.current.data).toBe('light')
      expect(result.current.isLoading).toBe(false)
    })
  })
})
