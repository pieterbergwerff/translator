// import actions
import isRootUserAction from '@packages/actions/user/is-root-user.action.ts'

// import hooks
import useSwr from 'swr'
import useLogged from '@packages/hooks/useLogged.hook.ts'

export const useIsRootHook = (): { isRoot: boolean; isLoading: boolean } => {
  const { user } = useLogged()

  const { data: isRoot, isLoading } = useSwr(user?.id ? ['is-root-user', user.id] : null, () =>
    user?.id ? isRootUserAction(user.id) : false
  )

  return {
    isRoot: isRoot ?? false,
    isLoading,
  }
}

export default useIsRootHook
