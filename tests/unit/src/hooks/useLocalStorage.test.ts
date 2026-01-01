import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import useLocalStorage from '@packages/hooks/useLocalStorage'

describe('useLocalStorage hook', () => {
  const TEST_KEY = 'test-key'
  const TEST_VALUE = 'test-value'

  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear()
    // Clear all mocks
    vi.clearAllMocks()
  })

  afterEach(() => {
    localStorage.clear()
  })

  it('returns initial value when no value in localStorage', () => {
    const { result } = renderHook(() => useLocalStorage(TEST_KEY, TEST_VALUE))
    expect(result.current[0]).toBe(TEST_VALUE)
  })

  it('returns value from localStorage if it exists', () => {
    localStorage.setItem(TEST_KEY, JSON.stringify('stored-value'))
    const { result } = renderHook(() => useLocalStorage(TEST_KEY, TEST_VALUE))
    expect(result.current[0]).toBe('stored-value')
  })

  it('updates localStorage when setValue is called', () => {
    const { result } = renderHook(() => useLocalStorage(TEST_KEY, TEST_VALUE))

    act(() => {
      result.current[1]('new-value')
    })

    expect(result.current[0]).toBe('new-value')
    expect(localStorage.getItem(TEST_KEY)).toBe(JSON.stringify('new-value'))
  })

  it('handles function updater', () => {
    const { result } = renderHook(() => useLocalStorage(TEST_KEY, 'initial'))

    act(() => {
      result.current[1]((prev) => `${prev}-updated`)
    })

    expect(result.current[0]).toBe('initial-updated')
  })

  it('handles complex objects', () => {
    const complexObject = { id: 1, name: 'test', nested: { value: true } }
    const { result } = renderHook(() =>
      useLocalStorage<typeof complexObject>(TEST_KEY, complexObject)
    )

    act(() => {
      result.current[1]({ ...complexObject, name: 'updated' })
    })

    expect(result.current[0].name).toBe('updated')
    expect(result.current[0].nested.value).toBe(true)
  })

  it('handles invalid JSON in localStorage gracefully', () => {
    // Suppress console.warn for this test
    const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

    localStorage.setItem(TEST_KEY, 'invalid-json{')
    const { result } = renderHook(() => useLocalStorage(TEST_KEY, TEST_VALUE))
    expect(result.current[0]).toBe(TEST_VALUE)

    consoleWarnSpy.mockRestore()
  })

  it('stores undefined as JSON string in localStorage', () => {
    localStorage.setItem(TEST_KEY, JSON.stringify('stored-value'))
    const { result } = renderHook(() => useLocalStorage(TEST_KEY, TEST_VALUE))

    act(() => {
      result.current[1](undefined as unknown as string)
    })

    // Implementation JSON.stringifies all values - undefined becomes the string "undefined"
    expect(localStorage.getItem(TEST_KEY)).toBe('undefined')
  })
})
