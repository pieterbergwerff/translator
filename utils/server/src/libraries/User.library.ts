// import extends
import Library from '@utils/server/extends/Library.extends.ts'

// import utils
import bcrypt from 'bcryptjs'

// import validators
import { UserSchema } from '@packages/validators/user.validator.ts'

// import types
import type { User } from '@packages/validators/user.validator.ts'
import type { DatabaseAll } from '@packages/validators/database.validator.ts'

export class UserLibrary extends Library<User> {
  private rootUserEmail: User['userEmail'] | null

  constructor(
    { rootUserEmail }: { rootUserEmail?: User['userEmail'] | null } = { rootUserEmail: null }
  ) {
    super()
    this.tableName = 'users'
    this.primaryKey = 'userId'
    this.rootUserEmail = rootUserEmail || null
  }

  public async getAll(props: DatabaseAll<User> = {}) {
    return this._all(props)
  }

  public async countAll(props: DatabaseAll<User> = {}) {
    return this._countAll(props)
  }

  public async getById(userId: User['userId']) {
    return this._getById(userId)
  }

  public async create(userEmail: User['userEmail'], userPassword: User['userPassword']) {
    if (!userEmail?.trim() || !userPassword?.trim()) {
      throw new Error('Email and password are required to create a user')
    }

    const existingUser = await this.db('users').where({ userEmail }).first()

    if (existingUser) {
      throw new Error('User with this email already exists')
    }

    const hashedPassword = await bcrypt.hash(userPassword ?? '', 10)

    const { success, data } = UserSchema.pick({
      userEmail: true,
      userPassword: true,
      userName: true,
    }).safeParse({
      userEmail,
      userPassword: hashedPassword,
      userName: userEmail.split('@')[0],
    })

    if (!success) {
      throw new Error('Invalid user data')
    }

    const [newUser] = await this.db('users').insert(data).returning('*')

    return newUser
  }

  public async update(
    userId: User['userId'],
    updates: Partial<Pick<User, 'userName' | 'userPassword'>>
  ) {
    const updateData: Partial<User> = { ...updates }

    if (updates.userPassword) {
      updateData.userPassword = await bcrypt.hash(updates.userPassword, 10)
    }

    const { success } = UserSchema.pick({
      userName: true,
      userPassword: true,
    }).safeParse(updateData)

    if (!success) {
      throw new Error('Invalid user data')
    }

    const [updatedUser] = await this.db('users').where({ userId }).update(updateData).returning('*')

    return updatedUser
  }

  public async isRootUser(userId: User['userId'] | undefined): Promise<boolean> {
    if (!userId) return false

    const currentUser = await this.getById(userId)
    if (!currentUser) return false

    if (!this.rootUserEmail) {
      this.rootUserEmail = process.env.ROOT_USER || null
    }

    if (!this.rootUserEmail) return false

    return currentUser.userEmail?.toLowerCase() === this.rootUserEmail.toLowerCase()
  }
}

export default UserLibrary
