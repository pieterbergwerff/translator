'use server'

// import libraries
import UserLibrary from '@utils/server/libraries/User.library.ts'

// import validators
import { UserSchema } from '@packages/validators/user.validator.ts'

// import types
import type { User } from '@packages/validators/user.validator.ts'

export const createUserAction = async ({
  userEmail,
  userPassword,
}: Pick<User, 'userEmail' | 'userPassword'>): Promise<User | null> => {
  const validate = () => {
    const result = UserSchema.pick({
      userEmail: true,
      userPassword: true,
      userName: true,
    }).safeParse({
      userEmail,
      userPassword,
      userName: userEmail.split('@')[0],
    })
    return result.success ? result.data : null
  }

  const validatedData = validate()

  if (!validatedData) return null

  const userLibrary = new UserLibrary()
  const newUser = await userLibrary.create(validatedData.userEmail, validatedData.userPassword)

  if (newUser) {
    console.log('User created successfully:', newUser)
    return newUser
  }

  return null
}

export default createUserAction
