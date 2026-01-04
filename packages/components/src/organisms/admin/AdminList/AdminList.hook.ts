'use client'

// import hooks
import useSWR from 'swr'
import { useState } from 'react'
import useDelayedValue from '@packages/hooks/useDelayedValue.hook.ts'

// import types
import type { DatabaseAll } from '@packages/validators/database.validator.ts'
import type { AdminListPropTypes } from './AdminList.organism.tsx'

export const useAdminList = <TData>({ type, getData, fields }: AdminListPropTypes<TData>) => {
  const [limit, setLimit] = useState<DatabaseAll<TData>['limit']>(100)
  const [page, setPage] = useState<DatabaseAll<TData>['page']>(1)
  const [search, setSearch] = useState<DatabaseAll<TData>['search']>('')
  const [isAsc, setIsAsc] = useState<boolean>(true)
  const [orderBy, setOrderBy] = useState<keyof TData | null>(fields?.order?.[0] || null)
  const delayedSearchValue = useDelayedValue(search, 300)

  const order: DatabaseAll<TData>['order'] = fields.order?.includes(orderBy as keyof TData)
    ? ({ [orderBy as keyof TData]: isAsc ? ('asc' as const) : ('desc' as const) } as Record<
        keyof TData,
        'asc' | 'desc'
      >)
    : undefined

  const params = { limit, page, search: delayedSearchValue, order }
  const { data, error, isLoading } = useSWR([`admin-list-${type}`, params], () => getData(params))

  return {
    limit,
    setLimit,
    page,
    setPage,
    search,
    setSearch,
    isAsc,
    setIsAsc,
    orderBy,
    setOrderBy,
    data,
    error,
    isLoading,
  }
}

export default useAdminList
