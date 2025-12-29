import { test, expect } from 'vitest'
import isString from '@utils/common/string/isString'

test('isString returns true for strings', () => {
  expect(isString('hello')).toBe(true)
  expect(isString('')).toBe(true)
  expect(isString('123')).toBe(true)
})

test('isString returns false for non-strings', () => {
  expect(isString(123)).toBe(false)
  expect(isString(null)).toBe(false)
  expect(isString(undefined)).toBe(false)
  expect(isString({})).toBe(false)
  expect(isString([])).toBe(false)
  expect(isString(true)).toBe(false)
})
