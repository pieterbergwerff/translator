'use client'

// import hooks
import useAdminList from './AdminList.hook'
import { useRouter } from 'next/navigation'

// import components
import Box from '@packages/components/atoms/Box'
import Input from '@packages/components/atoms/Input'
import Skeleton from '@packages/components/atoms/Skeleton'
import Select, {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@packages/components/molecules/Select'

// import types
import type { FC } from 'react'
import type { DatabaseAll } from '@packages/validators/database.validator.ts'

export type AdminListPropTypes<TData> = {
  type: string
  getData: (props: DatabaseAll<TData>) => Promise<TData[] | null>
  getCount?: (props: DatabaseAll<TData>) => Promise<number | null>
  createForm?: FC<{ onSubmit: (item: Partial<TData>) => Promise<void>; onCancel?: () => void }>
  fields: {
    id: keyof TData
    title: keyof TData
    description?: keyof TData
    order?: (keyof TData)[]
  }
}

export const AdminListOrganismComponent = <TData,>({
  type,
  getData,
  getCount,
  createForm,
  fields,
}: AdminListPropTypes<TData>) => {
  const router = useRouter()

  const {
    data,
    error,
    isLoading,
    search,
    setSearch,
    limit = 0,
    setLimit,
    isAsc,
    setIsAsc,
    orderBy,
    setOrderBy,
    page,
    setPage,
    count,
  } = useAdminList<TData>({
    type,
    getData,
    getCount,
    fields,
  })

  const CreateForm = createForm || null

  if (error) return <div>Failed to load</div>

  return (
    <>
      {CreateForm ? (
        <CreateForm
          onSubmit={async () => router.push(`/admin/${type}`)}
          onCancel={async () => router.push(`/admin/${type}`)}
        />
      ) : null}
      <hr className="py-4" />
      <Box className="flex items-center gap-4 mb-4">
        <Input
          placeholder={`Search ${type}...`}
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          autoFocus
        />
        {fields?.order?.length ? (
          <>
            <Select
              value={isAsc ? 'asc' : 'desc'}
              onValueChange={(value) => setIsAsc(value === 'asc')}
            >
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Order" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asc">asc</SelectItem>
                <SelectItem value="desc">desc</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={orderBy ? String(orderBy) : ''}
              onValueChange={(value) => setOrderBy(value as keyof TData)}
            >
              <SelectTrigger className="w-[270px]">
                <SelectValue placeholder="By" />
              </SelectTrigger>
              <SelectContent>
                {fields.order.map((field) => (
                  <SelectItem key={String(field)} value={String(field)}>
                    {String(field)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </>
        ) : null}
        {limit > 25 ? (
          <Select value={String(limit ?? 100)} onValueChange={(value) => setLimit(Number(value))}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Limit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
              <SelectItem value="250">250</SelectItem>
            </SelectContent>
          </Select>
        ) : null}
        {count && limit && count > limit ? (
          <Select value={String(page ?? 1)} onValueChange={(value) => setPage(Number(value))}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Page" />
            </SelectTrigger>
            <SelectContent>
              {Array.from(
                { length: Math.ceil((count || 0) / (limit || 100)) || 1 },
                (_, i) => i + 1
              ).map((pageNumber) => (
                <SelectItem key={pageNumber} value={String(pageNumber)}>
                  {pageNumber}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : null}
      </Box>
      {data?.length
        ? data.map((item) => (
            <div
              key={String(item[fields['id']])}
              className="p-4 border-b hover:bg-gray-900 hover:rounded-sm cursor-pointer"
              onClick={() => router.push(`/admin/${type}/${String(item[fields['id']])}`)}
            >
              <h3 className="font-semibold text-lg">
                {fields['title'] ? String(item[fields['title']]) : 'No Title'}
              </h3>
              {fields['description'] && (
                <p className="text-sm text-gray-600">{String(item[fields['description']])}</p>
              )}
            </div>
          ))
        : null}
      {isLoading ? (
        <>
          <Skeleton className="h-10 w-full mt-4 mb-2 bg-gray-600" />
        </>
      ) : null}
    </>
  )
}

export default AdminListOrganismComponent
