// import libraries
import AuthLibrary from '@utils/server/libraries/Auth.library.ts'

// import components
import AdminMenu from '@packages/components/molecules/AdminMenu'
import Box from '@packages/components/atoms/Box'

// import types
import type { FC, PropsWithChildren } from 'react'

export const AppTemplate: FC<PropsWithChildren> = async ({ children }) => {
  const authLibrary = new AuthLibrary()
  const isRoot = await authLibrary.isRootUser()

  if (!isRoot) {
    // redirect
    return null
  }

  return (
    <>
      <Box className="fixed inset-x-0 top-0 bg-background z-50">
        <Box className="flex w-full justify-center px-20 md:px-24">
          <Box className="w-full max-w-[1000px] pt-6">
            <AdminMenu />
          </Box>
        </Box>
      </Box>
      <Box className="flex min-h-screen w-full justify-center px-20 mt-10 py-4 md:px-24 md:py-8">
        <Box className="w-full max-w-[1000px] rounded-lg bg-muted p-4">{children}</Box>
      </Box>
    </>
  )
}

export default AppTemplate
