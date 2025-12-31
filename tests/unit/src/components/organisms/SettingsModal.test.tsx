import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import '@testing-library/jest-dom/vitest'

// import components
import SettingsModal from '@packages/components/organisms/SettingsModal'

// Mock the useSettingsShortcut hook
vi.mock('@packages/hooks/useSettingsShortcut.hook.ts', () => ({
  default: vi.fn(),
}))

// Mock next-auth to provide SessionProvider
vi.mock('next-auth/react', () => ({
  useSession: () => ({ data: null, status: 'unauthenticated' }),
  SessionProvider: ({ children }: { children: React.ReactNode }) => children,
}))

describe('SettingsModal Organism Component', () => {
  beforeEach(() => {
    // Clear any existing event listeners
    window.removeEventListener('app:open-settings', () => {})
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('renders settings modal when opened via event', async () => {
    const { SessionProvider } = await import('next-auth/react')
    render(
      <SessionProvider session={null}>
        <SettingsModal />
      </SessionProvider>
    )

    // Modal should not be visible initially
    expect(screen.queryByText('Settings')).not.toBeInTheDocument()

    // Dispatch event to open modal
    fireEvent(window, new Event('app:open-settings'))

    // Wait for modal to appear
    await waitFor(() => {
      expect(screen.getByText('Settings')).toBeInTheDocument()
    })
  })

  it('renders theme mode switch when open', async () => {
    const { SessionProvider } = await import('next-auth/react')
    render(
      <SessionProvider session={null}>
        <SettingsModal />
      </SessionProvider>
    )

    // Open modal
    fireEvent(window, new Event('app:open-settings'))

    await waitFor(() => {
      expect(screen.getByText('Theme Mode')).toBeInTheDocument()
    })
  })

  it('displays settings description', async () => {
    const { SessionProvider } = await import('next-auth/react')
    render(
      <SessionProvider session={null}>
        <SettingsModal />
      </SessionProvider>
    )

    fireEvent(window, new Event('app:open-settings'))

    await waitFor(() => {
      expect(screen.getByText(/adjust your application settings/i)).toBeInTheDocument()
    })
  })
})
