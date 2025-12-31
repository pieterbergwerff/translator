// import hooks
import { useState } from 'react'

export const useAuthClient = (initialLoginModalOpen = false) => {
  const [loginModalOpen, setLoginModalOpen] = useState(initialLoginModalOpen)

  return { loginModalOpen, setLoginModalOpen }
}

export default useAuthClient
