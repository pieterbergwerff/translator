import { describe, it, expect } from 'vitest'
import cn from '@utils/common/cn'

describe('cn utility', () => {
  it('merges class names correctly', () => {
    const result = cn('foo', 'bar')
    expect(result).toBe('foo bar')
  })

  it('handles conditional classes', () => {
    const shouldInclude = false
    const result = cn('foo', shouldInclude && 'bar', 'baz')
    expect(result).toBe('foo baz')
  })

  it('handles Tailwind conflicting classes', () => {
    const result = cn('px-2', 'px-4')
    expect(result).toBe('px-4')
  })

  it('merges arrays of classes', () => {
    const result = cn(['foo', 'bar'], 'baz')
    expect(result).toBe('foo bar baz')
  })

  it('handles objects with conditional classes', () => {
    const result = cn({ foo: true, bar: false, baz: true })
    expect(result).toBe('foo baz')
  })

  it('handles undefined and null values', () => {
    const result = cn('foo', undefined, null, 'bar')
    expect(result).toBe('foo bar')
  })

  it('keeps duplicate non-Tailwind classes', () => {
    // cn uses twMerge which only deduplicates Tailwind conflicts, not generic duplicates
    const result = cn('foo', 'foo', 'bar')
    expect(result).toBe('foo foo bar')
  })
})
