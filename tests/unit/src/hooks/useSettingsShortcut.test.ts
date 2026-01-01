import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import '@testing-library/jest-dom/vitest'
import { renderHook } from '@testing-library/react'
import useSettingsShortcutHook from '@packages/hooks/useSettingsShortcut.hook.ts'

describe('useSettingsShortcut hook', () => {
  let mockTarget: {
    addEventListener: ReturnType<typeof vi.fn>
    removeEventListener: ReturnType<typeof vi.fn>
    dispatchEvent: ReturnType<typeof vi.fn>
  }

  beforeEach(() => {
    mockTarget = {
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('attaches keydown listener to target when enabled', () => {
    renderHook(() => useSettingsShortcutHook({ target: mockTarget as never }))

    expect(mockTarget.addEventListener).toHaveBeenCalledWith('keydown', expect.any(Function), {
      capture: true,
    })
  })

  it('does not attach listener when disabled', () => {
    renderHook(() => useSettingsShortcutHook({ enabled: false, target: mockTarget as never }))

    expect(mockTarget.addEventListener).not.toHaveBeenCalled()
  })

  it('removes listener on unmount', () => {
    const { unmount } = renderHook(() => useSettingsShortcutHook({ target: mockTarget as never }))

    unmount()

    expect(mockTarget.removeEventListener).toHaveBeenCalledWith('keydown', expect.any(Function), {
      capture: true,
    })
  })

  it('dispatches custom event on Ctrl/Meta + Comma', () => {
    renderHook(() => useSettingsShortcutHook({ target: mockTarget as never }))

    const handler = mockTarget.addEventListener.mock.calls[0][1] as (e: KeyboardEvent) => void
    const event = new KeyboardEvent('keydown', {
      key: ',',
      code: 'Comma',
      ctrlKey: true,
      cancelable: true,
    })

    handler(event)

    expect(mockTarget.dispatchEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'app:open-settings',
      })
    )
  })

  it('does not dispatch event without Ctrl/Meta key', () => {
    renderHook(() => useSettingsShortcutHook({ target: mockTarget as never }))

    const handler = mockTarget.addEventListener.mock.calls[0][1] as (e: KeyboardEvent) => void
    const event = new KeyboardEvent('keydown', {
      key: ',',
      code: 'Comma',
      ctrlKey: false,
      metaKey: false,
    })

    handler(event)

    expect(mockTarget.dispatchEvent).not.toHaveBeenCalled()
  })

  it('does not dispatch event with Shift key when requireNoExtraModifiers is true', () => {
    renderHook(() =>
      useSettingsShortcutHook({ target: mockTarget as never, requireNoExtraModifiers: true })
    )

    const handler = mockTarget.addEventListener.mock.calls[0][1] as (e: KeyboardEvent) => void
    const event = new KeyboardEvent('keydown', {
      key: ',',
      code: 'Comma',
      ctrlKey: true,
      shiftKey: true,
    })

    handler(event)

    expect(mockTarget.dispatchEvent).not.toHaveBeenCalled()
  })

  it('dispatches event with Shift key when requireNoExtraModifiers is false', () => {
    renderHook(() =>
      useSettingsShortcutHook({ target: mockTarget as never, requireNoExtraModifiers: false })
    )

    const handler = mockTarget.addEventListener.mock.calls[0][1] as (e: KeyboardEvent) => void
    const event = new KeyboardEvent('keydown', {
      key: ',',
      code: 'Comma',
      ctrlKey: true,
      shiftKey: true,
      cancelable: true,
    })

    handler(event)

    expect(mockTarget.dispatchEvent).toHaveBeenCalled()
  })

  it('uses custom event name when provided', () => {
    renderHook(() =>
      useSettingsShortcutHook({ target: mockTarget as never, eventName: 'custom-event' })
    )

    const handler = mockTarget.addEventListener.mock.calls[0][1] as (e: KeyboardEvent) => void
    const event = new KeyboardEvent('keydown', {
      key: ',',
      code: 'Comma',
      ctrlKey: true,
      cancelable: true,
    })

    handler(event)

    expect(mockTarget.dispatchEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'custom-event',
      })
    )
  })
})
