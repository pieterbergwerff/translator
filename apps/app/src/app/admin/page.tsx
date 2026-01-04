// import components
import AdminDashboard from '@packages/components/organisms/AdminDashboard'

// import types
import type { FC } from 'react'

const AdminPage: FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <AdminDashboard />
    </div>
  )
}

export default AdminPage
