import { auth, signOut } from '@/lib/auth'
import Link from 'next/link'

export async function UserNav() {
  const session = await auth()

  if (!session?.user) {
    return (
      <Link
        href="/auth/signin"
        className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
      >
        Sign In
      </Link>
    )
  }

  return (
    <div className="flex items-center gap-4">
      <span className="text-sm text-gray-700">
        Hello, {session.user.name || session.user.email}
      </span>
      <form
        action={async () => {
          'use server'
          await signOut()
        }}
      >
        <button
          type="submit"
          className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Sign Out
        </button>
      </form>
    </div>
  )
}
