// import utils
import { createContext } from 'react'

export const AuthClientContext = createContext<{
  loginModalOpen: boolean
  setLoginModalOpen: (open: boolean) => void
} | null>(null)

export default AuthClientContext
