'use client'

// import hooks
import { useRouter } from 'next/navigation'

// import components
import Dashboard from '@packages/components/molecules/Dashboard'
import { Users, Settings, BarChart3 } from 'lucide-react'

// import types
import type { FC } from 'react'

export const AdminDashboardOrganismComponent: FC = () => {
  const router = useRouter()

  return (
    <Dashboard
      data={[
        {
          title: 'Users',
          description: 'Manage user accounts',
          icon: <Users />,
          onClick: () => router.push('/admin/users'),
        },
        { title: 'Settings', description: 'Configure system settings', icon: <Settings /> },
        { title: 'Reports', description: 'View reports and analytics', icon: <BarChart3 /> },
      ]}
    />
  )
}

export default AdminDashboardOrganismComponent
