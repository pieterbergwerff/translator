// import utils
import { db } from '@packages/database/knex'
import { createDatabaseAllSchema } from '@packages/validators/database.validator.ts'

// import types
import type { DatabaseAll } from '@packages/validators/database.validator.ts'

export class LibraryExtends<TData = unknown> {
  protected db = db
  protected tableName: string = ''
  protected primaryKey: string = ''

  protected async _all(props: DatabaseAll<TData> = {}) {
    const schema = createDatabaseAllSchema()
    const validated = schema.parse(props)

    const { limit = 100, page = 1, search = '', where, order } = validated

    let query = this.db(this.tableName).select('*')

    // Apply where conditions
    if (where) {
      query = query.where(where)
    }

    // Apply search across all fields (case-insensitive)
    if (search) {
      const columns = await this.db(this.tableName).columnInfo()
      query = query.where((builder) => {
        Object.keys(columns).forEach((column, index) => {
          if (index === 0) {
            builder.whereRaw(`LOWER(CAST(?? AS TEXT)) LIKE ?`, [
              column,
              `%${search.toLowerCase()}%`,
            ])
          } else {
            builder.orWhereRaw(`LOWER(CAST(?? AS TEXT)) LIKE ?`, [
              column,
              `%${search.toLowerCase()}%`,
            ])
          }
        })
      })
    }

    // Apply ordering
    if (order) {
      Object.entries(order).forEach(([column, direction]) => {
        query = query.orderBy(column, direction)
      })
    }

    // Apply pagination
    query = query.limit(limit ?? 100).offset(((page ?? 1) - 1) * (limit ?? 100))

    const users = await query
    return users
  }

  protected async _countAll(props: DatabaseAll<TData> = {}) {
    const schema = createDatabaseAllSchema()
    const validated = schema.parse(props)

    const { search = '', where } = validated

    let query = this.db(this.tableName).count<{ count: number }[]>('* as count')

    // Apply where conditions
    if (where) {
      query = query.where(where)
    }

    if (search) {
      const columns = await this.db(this.tableName).columnInfo()
      query = query.where((builder) => {
        Object.keys(columns).forEach((column, index) => {
          if (index === 0) {
            builder.whereRaw(`LOWER(CAST(?? AS TEXT)) LIKE ?`, [
              column,
              `%${search.toLowerCase()}%`,
            ])
          } else {
            builder.orWhereRaw(`LOWER(CAST(?? AS TEXT)) LIKE ?`, [
              column,
              `%${search.toLowerCase()}%`,
            ])
          }
        })
      })
    }

    const result = await query.first()
    return result ? Number(result.count) : 0
  }

  protected async _getById(id: TData[keyof TData]) {
    const record = await this.db(this.tableName)
      .where({ [this.primaryKey]: id })
      .first()
    return record || null
  }
}

export default LibraryExtends
