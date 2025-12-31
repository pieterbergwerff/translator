// import hooks
import { useState } from 'react'

export const useAuthClient = () => {
  const [loginModalOpen, setLoginModalOpen] = useState(false)

  return { loginModalOpen, setLoginModalOpen }
}

export default useAuthClient
