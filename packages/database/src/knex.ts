import knex from 'knex'
import { getDatabaseConfig } from './config'

// Create and export the Knex instance
export const db = knex(getDatabaseConfig())

export default db
