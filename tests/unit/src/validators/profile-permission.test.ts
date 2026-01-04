// import utils
import { describe, it, expect } from 'vitest'

// import validators
import ProfileSchema from '@packages/validators/profile.validator.ts'
import PermissionSchema from '@packages/validators/permission.validator.ts'
import UserProfileSchema from '@packages/validators/userProfile.validator.ts'
import ProfilePermissionSchema from '@packages/validators/profilePermission.validator.ts'

describe('Profile Validator', () => {
  it('should validate a valid profile', () => {
    const validProfile = {
      profileId: 1,
      profileName: 'admin',
      profileStatus: 'active' as const,
      created_at: new Date(),
      updated_at: new Date(),
    }

    expect(() => ProfileSchema.parse(validProfile)).not.toThrow()
  })

  it('should reject invalid profile status', () => {
    const invalidProfile = {
      profileId: 1,
      profileName: 'admin',
      profileStatus: 'invalid',
      created_at: new Date(),
      updated_at: new Date(),
    }

    expect(() => ProfileSchema.parse(invalidProfile)).toThrow()
  })

  it('should reject profile name that is too short', () => {
    const invalidProfile = {
      profileId: 1,
      profileName: 'a',
      profileStatus: 'active' as const,
      created_at: new Date(),
      updated_at: new Date(),
    }

    expect(() => ProfileSchema.parse(invalidProfile)).toThrow()
  })
})

describe('Permission Validator', () => {
  it('should validate a valid permission', () => {
    const validPermission = {
      permissionId: 1,
      permissionProfileId: 2,
      permissionRight: 'read' as const,
      created_at: new Date(),
      updated_at: new Date(),
    }

    expect(() => PermissionSchema.parse(validPermission)).not.toThrow()
  })

  it('should reject invalid permission right', () => {
    const invalidPermission = {
      permissionId: 1,
      permissionProfileId: 2,
      permissionRight: 'execute',
      created_at: new Date(),
      updated_at: new Date(),
    }

    expect(() => PermissionSchema.parse(invalidPermission)).toThrow()
  })

  it('should validate all permission rights', () => {
    const rights = ['read', 'write', 'update', 'delete'] as const

    rights.forEach((right) => {
      const permission = {
        permissionId: 1,
        permissionProfileId: 2,
        permissionRight: right,
        created_at: new Date(),
        updated_at: new Date(),
      }

      expect(() => PermissionSchema.parse(permission)).not.toThrow()
    })
  })
})

describe('UserProfile Validator', () => {
  it('should validate a valid user profile', () => {
    const validUserProfile = {
      upId: 1,
      upUserId: 2,
      upProfileId: 3,
      created_at: new Date(),
      updated_at: new Date(),
    }

    expect(() => UserProfileSchema.parse(validUserProfile)).not.toThrow()
  })

  it('should reject invalid number', () => {
    const invalidUserProfile = {
      upId: 'not-a-number',
      upUserId: 2,
      upProfileId: 3,
      created_at: new Date(),
      updated_at: new Date(),
    }

    expect(() => UserProfileSchema.parse(invalidUserProfile)).toThrow()
  })
})

describe('ProfilePermission Validator', () => {
  it('should validate a valid profile permission', () => {
    const validProfilePermission = {
      ppId: 1,
      ppProfileId: 2,
      ppPermissionId: 3,
      created_at: new Date(),
      updated_at: new Date(),
    }

    expect(() => ProfilePermissionSchema.parse(validProfilePermission)).not.toThrow()
  })

  it('should reject missing required fields', () => {
    const invalidProfilePermission = {
      ppId: 1,
      ppProfileId: 2,
      created_at: new Date(),
      updated_at: new Date(),
    }

    expect(() => ProfilePermissionSchema.parse(invalidProfilePermission)).toThrow()
  })
})
