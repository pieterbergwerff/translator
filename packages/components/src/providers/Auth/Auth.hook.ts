// import hooks
import { useState } from 'react'

export const useAuth = () => {
  const [loginModalOpen, setLoginModalOpen] = useState(false)

  return { loginModalOpen, setLoginModalOpen }
}

export default useAuth
