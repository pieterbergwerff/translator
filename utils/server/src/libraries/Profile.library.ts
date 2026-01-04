// import extends
import Library from '@utils/server/extends/Library.extends.ts'

// import validators
import { ProfileSchema } from '@packages/validators/profile.validator.ts'

// import types
import type { Profile } from '@packages/validators/profile.validator.ts'
import type { DatabaseAll } from '@packages/validators/database.validator.ts'

export class ProfileLibrary extends Library<Profile> {
  constructor() {
    super()
    this.tableName = 'profiles'
    this.primaryKey = 'profileId'
  }

  public async getAll(props: DatabaseAll<Profile> = {}) {
    return this._all(props)
  }

  public async countAll(props: DatabaseAll<Profile> = {}) {
    return this._countAll(props)
  }

  public async getById(profileId: Profile['profileId']) {
    return this._getById(profileId)
  }

  public async create(
    profileName: Profile['profileName'],
    profileStatus: Profile['profileStatus'] = 'inactive'
  ) {
    if (
      !profileName?.trim() ||
      !profileStatus?.trim() ||
      !['active', 'inactive', 'banned'].includes(profileStatus)
    ) {
      throw new Error('Name is required to create a profile')
    }

    const existingProfile = await this.db('profiles').where({ profileName }).first()

    if (existingProfile) {
      throw new Error('Profile with this name already exists')
    }

    const { success, data } = ProfileSchema.pick({
      profileName: true,
      profileStatus: true,
    }).safeParse({
      profileName,
      profileStatus,
    })

    if (!success) {
      throw new Error('Invalid profile data')
    }

    const [newProfile] = await this.db('profiles').insert(data).returning('*')

    return newProfile
  }
}

export default ProfileLibrary
