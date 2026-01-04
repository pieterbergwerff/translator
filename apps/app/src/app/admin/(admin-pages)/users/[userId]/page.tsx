// import components
import AdminUsersEditPage from '@packages/components/pages/admin/users/Edit'

export default async ({ params }: { params: Promise<{ userId: string }> }) => (
  <AdminUsersEditPage userId={Number((await params).userId)} />
)
