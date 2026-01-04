// import components
import AdminProfilesEditPage from '@packages/components/pages/admin/profiles/Edit'

export default async ({ params }: { params: Promise<{ profileId: string }> }) => (
  <AdminProfilesEditPage profileId={Number((await params).profileId)} />
)
