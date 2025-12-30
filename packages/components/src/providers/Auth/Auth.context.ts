// import utils
import { createContext } from 'react'

export const AuthContext = createContext<{
  loginModalOpen: boolean
  setLoginModalOpen: (open: boolean) => void
} | null>(null)

export default AuthContext
