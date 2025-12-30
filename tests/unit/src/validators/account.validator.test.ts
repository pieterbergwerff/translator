import { describe, it, expect } from 'vitest'
import AccountValidator from '@packages/validators/account.validator'

describe('AccountValidator', () => {
  it('validates a valid account object', () => {
    const validAccount = {
      accountId: '550e8400-e29b-41d4-a716-446655440000',
      accountUserId: '550e8400-e29b-41d4-a716-446655440001',
      accountType: 'oauth',
      accountProvider: 'google',
      accountProviderAccountId: 'google-user-123',
      accountRefreshToken: 'refresh-token-abc',
      accountAccessToken: 'access-token-xyz',
      accountExpiresAt: Math.floor(Date.now() / 1000) + 3600,
      accountTokenType: 'Bearer',
      accountScope: 'email profile',
      accountIdToken: 'id-token-123',
      accountSessionState: 'session-state-abc',
      created_at: new Date(),
      updated_at: new Date(),
    }

    const result = AccountValidator.safeParse(validAccount)
    expect(result.success).toBe(true)
  })

  it('validates account with null optional fields', () => {
    const validAccount = {
      accountId: '550e8400-e29b-41d4-a716-446655440000',
      accountUserId: '550e8400-e29b-41d4-a716-446655440001',
      accountType: 'credentials',
      accountProvider: 'credentials',
      accountProviderAccountId: 'user-email@example.com',
      accountRefreshToken: null,
      accountAccessToken: null,
      accountExpiresAt: null,
      accountTokenType: null,
      accountScope: null,
      accountIdToken: null,
      accountSessionState: null,
      created_at: new Date(),
      updated_at: new Date(),
    }

    const result = AccountValidator.safeParse(validAccount)
    expect(result.success).toBe(true)
  })

  it('rejects account with invalid accountId', () => {
    const invalidAccount = {
      accountId: 'not-a-uuid',
      accountUserId: '550e8400-e29b-41d4-a716-446655440001',
      accountType: 'oauth',
      accountProvider: 'google',
      accountProviderAccountId: 'google-user-123',
    }

    const result = AccountValidator.safeParse(invalidAccount)
    expect(result.success).toBe(false)
  })

  it('rejects account with empty accountType', () => {
    const invalidAccount = {
      accountId: '550e8400-e29b-41d4-a716-446655440000',
      accountUserId: '550e8400-e29b-41d4-a716-446655440001',
      accountType: '',
      accountProvider: 'google',
      accountProviderAccountId: 'google-user-123',
    }

    const result = AccountValidator.safeParse(invalidAccount)
    expect(result.success).toBe(false)
  })

  it('rejects account with missing required fields', () => {
    const invalidAccount = {
      accountId: '550e8400-e29b-41d4-a716-446655440000',
      accountUserId: '550e8400-e29b-41d4-a716-446655440001',
    }

    const result = AccountValidator.safeParse(invalidAccount)
    expect(result.success).toBe(false)
  })
})
