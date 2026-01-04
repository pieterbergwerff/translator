// import components
import Box from '@packages/components/atoms/Box'

// import types
import type { FC } from 'react'

export const HomePageComponent: FC = () => (
  <Box className="flex min-h-screen items-center justify-center">
    <Box component="h1" className="text-4xl font-bold">
      Welcome!
    </Box>
  </Box>
)

export default HomePageComponent
