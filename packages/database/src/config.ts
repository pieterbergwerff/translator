import type { Knex } from 'knex'

// Environment variables for database configuration
export interface DatabaseConfig {
  client: 'sqlite3' | 'pg' | 'mysql2'
  connection:
    | string
    | {
        host?: string
        port?: number
        user?: string
        password?: string
        database?: string
        filename?: string
      }
  migrations?: {
    directory?: string
    tableName?: string
  }
  seeds?: {
    directory?: string
  }
}

// Default configuration based on environment variables
export const getDatabaseConfig = (): Knex.Config => {
  const config: DatabaseConfig = {
    client: (process.env.DB_CLIENT as 'sqlite3' | 'pg' | 'mysql2') || 'sqlite3',
    connection: process.env.DB_CONNECTION || {
      filename: process.env.DB_FILENAME || './dev.sqlite3',
    },
    migrations: {
      directory: process.env.DB_MIGRATIONS_DIR || './migrations',
      tableName: process.env.DB_MIGRATIONS_TABLE || 'knex_migrations',
    },
    seeds: {
      directory: process.env.DB_SEEDS_DIR || './seeds',
    },
  }

  // Parse connection string for PostgreSQL/MySQL
  if (typeof config.connection === 'string') {
    return {
      client: config.client,
      connection: config.connection,
      migrations: config.migrations,
      seeds: config.seeds,
      useNullAsDefault: config.client === 'sqlite3',
    }
  }

  // Handle object-based configuration
  const knexConfig: Knex.Config = {
    client: config.client,
    connection: config.connection,
    migrations: config.migrations,
    seeds: config.seeds,
    useNullAsDefault: config.client === 'sqlite3',
  }

  // SQLite3 specific options
  if (config.client === 'sqlite3') {
    knexConfig.useNullAsDefault = true
  }

  // PostgreSQL specific options
  if (config.client === 'pg') {
    knexConfig.pool = {
      min: parseInt(process.env.DB_POOL_MIN || '2'),
      max: parseInt(process.env.DB_POOL_MAX || '10'),
    }
  }

  // MySQL specific options
  if (config.client === 'mysql2') {
    knexConfig.pool = {
      min: parseInt(process.env.DB_POOL_MIN || '2'),
      max: parseInt(process.env.DB_POOL_MAX || '10'),
    }
  }

  return knexConfig
}

export default getDatabaseConfig
