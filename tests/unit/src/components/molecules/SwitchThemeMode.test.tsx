// @ts-nocheck - React 19 type conflicts with @testing-library
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SwitchThemeMode from '@packages/components/molecules/SwitchThemeMode'

// Mock the useSettings hook
vi.mock('@packages/hooks/useSettings.hook.ts', () => ({
  default: vi.fn(),
}))

import useSettings from '@packages/hooks/useSettings.hook.ts'

describe('SwitchThemeMode Component', () => {
  const mockSetValue = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    // Default mock implementation
    vi.mocked(useSettings).mockReturnValue({
      isLoading: false,
      value: 'system',
      setValue: mockSetValue,
    })
  })

  it('renders theme mode toggle group', () => {
    render(<SwitchThemeMode />)
    expect(screen.getByText('System')).toBeInTheDocument()
    expect(screen.getByText('Light')).toBeInTheDocument()
    expect(screen.getByText('Dark')).toBeInTheDocument()
  })

  it('displays current theme mode selection', () => {
    vi.mocked(useSettings).mockReturnValue({
      isLoading: false,
      value: 'light',
      setValue: mockSetValue,
    })
    render(<SwitchThemeMode />)
    const lightButton = screen.getByText('Light')
    expect(lightButton).toHaveAttribute('data-state', 'on')
  })

  it('handles theme mode change to light', async () => {
    const user = userEvent.setup()
    render(<SwitchThemeMode />)
    await user.click(screen.getByText('Light'))
    expect(mockSetValue).toHaveBeenCalledWith('light')
  })

  it('handles theme mode change to dark', async () => {
    const user = userEvent.setup()
    render(<SwitchThemeMode />)
    await user.click(screen.getByText('Dark'))
    expect(mockSetValue).toHaveBeenCalledWith('dark')
  })

  it('handles theme mode change to system', async () => {
    vi.mocked(useSettings).mockReturnValue({
      isLoading: false,
      value: 'dark',
      setValue: mockSetValue,
    })
    const user = userEvent.setup()
    render(<SwitchThemeMode />)
    await user.click(screen.getByText('System'))
    expect(mockSetValue).toHaveBeenCalledWith('system')
  })

  it('defaults to system when value is null', () => {
    vi.mocked(useSettings).mockReturnValue({
      isLoading: false,
      value: null,
      setValue: mockSetValue,
    })
    render(<SwitchThemeMode />)
    const systemButton = screen.getByText('System')
    expect(systemButton).toHaveAttribute('data-state', 'on')
  })

  it('is disabled when loading', () => {
    vi.mocked(useSettings).mockReturnValue({
      isLoading: true,
      value: 'system',
      setValue: mockSetValue,
    })
    const { container } = render(<SwitchThemeMode />)
    // When loading, component returns null - so nothing should be rendered
    expect(container).toBeEmptyDOMElement()
  })

  it('handles empty value change gracefully', async () => {
    const user = userEvent.setup()
    render(<SwitchThemeMode />)
    // Click on the already selected button to deselect (though the component will default to 'system')
    const systemButton = screen.getByText('System')
    await user.click(systemButton)
    // The component should ensure we always have a value (defaults to 'system')
    expect(mockSetValue).toHaveBeenCalled()
  })
})
