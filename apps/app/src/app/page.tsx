// import components
import DefaultTemplate from '@packages/components/templates/Default'

export default async function Home() {
  return (
    <DefaultTemplate>
      <div className="flex min-h-screen items-center justify-center">
        <h1 className="text-4xl font-bold">Welcome</h1>
      </div>
    </DefaultTemplate>
  )
}
