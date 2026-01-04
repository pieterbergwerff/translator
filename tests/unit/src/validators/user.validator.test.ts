import { describe, it, expect } from 'vitest'
import UserValidator from '@packages/validators/user.validator'

describe('UserValidator', () => {
  it('validates a valid user object', () => {
    const validUser = {
      userId: 1,
      userName: 'John Doe',
      userEmail: 'john@example.com',
      userEmailVerified: new Date(),
      userImage: 'https://example.com/avatar.jpg',
      created_at: new Date(),
      updated_at: new Date(),
    }

    const result = UserValidator.safeParse(validUser)
    expect(result.success).toBe(true)
  })

  it('validates user with null optional fields', () => {
    const validUser = {
      userId: 1,
      userName: 'John Doe',
      userEmail: 'john@example.com',
      created_at: new Date(),
      updated_at: new Date(),
      userEmailVerified: null,
      userImage: null,
    }

    const result = UserValidator.safeParse(validUser)
    expect(result.success).toBe(true)
  })

  it('rejects user with invalid user ID format', () => {
    const invalidUser = {
      userId: 'invalid-number',
      userName: 'John Doe',
      userEmail: 'john@example.com',
    }

    const result = UserValidator.safeParse(invalidUser)
    expect(result.success).toBe(false)
  })

  it('rejects user with invalid email', () => {
    const invalidUser = {
      userId: 1,
      userName: 'John Doe',
      userEmail: 'invalid-email',
    }

    const result = UserValidator.safeParse(invalidUser)
    expect(result.success).toBe(false)
  })

  it('rejects user with empty userName', () => {
    const invalidUser = {
      userId: 1,
      userName: '',
      userEmail: 'john@example.com',
    }

    const result = UserValidator.safeParse(invalidUser)
    expect(result.success).toBe(false)
  })

  it('rejects user with missing required fields', () => {
    const invalidUser = {
      userId: 1,
    }

    const result = UserValidator.safeParse(invalidUser)
    expect(result.success).toBe(false)
  })
})
