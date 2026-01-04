// import components
import AdminDashboard from '@packages/components/organisms/AdminDashboard'
import Box from '@packages/components/atoms/Box'

// import types
import type { FC } from 'react'

export const AdminDashboardPage: FC = () => (
  <Box className="flex min-h-screen items-center justify-center">
    <AdminDashboard />
  </Box>
)

export default AdminDashboardPage
