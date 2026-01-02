import '@testing-library/jest-dom/vitest'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import dispatchSettingsEventUtil from '@utils/client/dispatchSettingsEvent.util.ts'

describe('dispatchSettingsEventUtil', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('dispatches custom event app:open-settings', () => {
    const dispatchEventSpy = vi.spyOn(window, 'dispatchEvent')

    dispatchSettingsEventUtil()

    expect(dispatchEventSpy).toHaveBeenCalledTimes(1)
    expect(dispatchEventSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'app:open-settings',
      })
    )
  })

  it('dispatches CustomEvent instance', () => {
    const dispatchEventSpy = vi.spyOn(window, 'dispatchEvent')

    dispatchSettingsEventUtil()

    const calledEvent = dispatchEventSpy.mock.calls[0][0]
    expect(calledEvent).toBeInstanceOf(CustomEvent)
  })
})
