// import actions
import getUserAction from '@packages/actions/user/get-user.action.ts'

// import types
import type { FC } from 'react'
import type { User } from '@packages/validators/user.validator.ts'

export const AdminUsersEditPage: FC<Pick<User, 'userId'>> = async ({ userId }) => {
  const user = await getUserAction(Number(userId))

  return <pre>{JSON.stringify(user, null, 2)}</pre>
}

export default AdminUsersEditPage
