// import actions
import getUserAction from '@packages/actions/user/get-user.action.ts'

// import types
import type { FC } from 'react'

const AdminUserPage: FC<{ params: Promise<{ userId: string }> }> = async ({ params }) => {
  const { userId } = await params
  const user = await getUserAction(Number(userId))

  return <pre>{JSON.stringify(user, null, 2)}</pre>
}

export default AdminUserPage
