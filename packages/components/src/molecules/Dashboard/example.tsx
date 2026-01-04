// Example usage of Dashboard component
import Dashboard from '@packages/components/molecules/Dashboard'

// Basic usage with data
function MyDashboard() {
  const dashboardData = [
    {
      title: 'Analytics',
      description: 'View detailed analytics and insights',
      icon: '📊',
      onClick: () => console.log('Analytics clicked'),
    },
    {
      title: 'Users',
      description: 'Manage user accounts and permissions',
      icon: '👥',
      onClick: () => console.log('Users clicked'),
    },
    {
      title: 'Settings',
      description: 'Configure system settings',
      icon: '⚙️',
      onClick: () => console.log('Settings clicked'),
    },
  ]

  return <Dashboard data={dashboardData} />
}

// With custom columns
function TwoColumnDashboard() {
  const data = [
    { title: 'Item 1', description: 'Description 1', icon: '1️⃣' },
    { title: 'Item 2', description: 'Description 2', icon: '2️⃣' },
  ]

  return <Dashboard data={data} columns={2} />
}

// With navigation
function NavigationDashboard() {
  const navigate = (path: string) => {
    // Your navigation logic
    console.log(`Navigating to ${path}`)
  }

  const data = [
    {
      title: 'Dashboard',
      description: 'View your main dashboard',
      icon: '🏠',
      onClick: () => navigate('/dashboard'),
    },
    {
      title: 'Projects',
      description: 'Manage your projects',
      icon: '📁',
      onClick: () => navigate('/projects'),
    },
  ]

  return <Dashboard data={data} columns={3} />
}

export { MyDashboard, TwoColumnDashboard, NavigationDashboard }
