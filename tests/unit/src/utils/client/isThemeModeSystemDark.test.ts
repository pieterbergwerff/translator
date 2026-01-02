import '@testing-library/jest-dom/vitest'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import isThemeModeSystemDarkUtil from '@utils/client/isThemeModeSystemDark.util.ts'

describe('isThemeModeSystemDarkUtil', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns true when system prefers dark color scheme', () => {
    const matchMediaMock = vi.fn().mockReturnValue({
      matches: true,
      media: '(prefers-color-scheme: dark)',
    })
    vi.stubGlobal('matchMedia', matchMediaMock)

    const result = isThemeModeSystemDarkUtil()

    expect(result).toBe(true)
    expect(matchMediaMock).toHaveBeenCalledWith('(prefers-color-scheme: dark)')
  })

  it('returns false when system prefers light color scheme', () => {
    const matchMediaMock = vi.fn().mockReturnValue({
      matches: false,
      media: '(prefers-color-scheme: dark)',
    })
    vi.stubGlobal('matchMedia', matchMediaMock)

    const result = isThemeModeSystemDarkUtil()

    expect(result).toBe(false)
  })

  it('returns false when window is undefined', () => {
    const originalWindow = global.window
    // @ts-expect-error Testing window undefined
    delete global.window

    const result = isThemeModeSystemDarkUtil()

    expect(result).toBe(false)

    global.window = originalWindow
  })

  it('returns false when matchMedia is undefined', () => {
    const originalMatchMedia = window.matchMedia
    // @ts-expect-error Testing matchMedia undefined
    delete window.matchMedia

    const result = isThemeModeSystemDarkUtil()

    expect(result).toBe(false)

    window.matchMedia = originalMatchMedia
  })
})
