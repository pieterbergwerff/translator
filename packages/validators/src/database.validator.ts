// import utils
import { z } from 'zod'

export const createDatabaseAllSchema = <TData extends z.ZodTypeAny>(whereSchema?: TData) =>
  z.object({
    limit: z.number().positive().optional().default(100),
    page: z.number().positive().optional().default(1),
    search: z.string().optional().default(''),
    where: whereSchema ? whereSchema.optional() : z.unknown().optional().default(undefined),
    order: z.record(z.enum(['asc', 'desc'])).optional(),
  })

export const DatabaseAllSchema = createDatabaseAllSchema()

export type DatabaseAll<TData = unknown> = {
  limit?: number
  page?: number
  search?: string
  where?: TData
  order?: Record<string, 'asc' | 'desc'>
}

export default DatabaseAllSchema
