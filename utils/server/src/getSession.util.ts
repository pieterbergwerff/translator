// import auth
import { getServerSession } from 'next-auth'
import { authOptions } from '@utils/server/auth.ts'

export const getSessionUtil = async () => {
  const session = await getServerSession(authOptions)
  return session
}

export default getSessionUtil
