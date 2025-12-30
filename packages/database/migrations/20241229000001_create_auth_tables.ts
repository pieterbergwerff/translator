import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  // Users table
  await knex.schema.createTable('users', (table) => {
    table.string('id').primary()
    table.string('name')
    table.string('email').unique()
    table.timestamp('emailVerified')
    table.string('image')
    table.timestamps(true, true)
  })

  // Accounts table
  await knex.schema.createTable('accounts', (table) => {
    table.string('id').primary()
    table.string('userId').references('id').inTable('users').onDelete('CASCADE')
    table.string('type')
    table.string('provider')
    table.string('providerAccountId')
    table.text('refresh_token')
    table.text('access_token')
    table.integer('expires_at')
    table.string('token_type')
    table.string('scope')
    table.text('id_token')
    table.string('session_state')
    table.timestamps(true, true)

    table.unique(['provider', 'providerAccountId'])
  })

  // Sessions table
  await knex.schema.createTable('sessions', (table) => {
    table.string('id').primary()
    table.string('sessionToken').unique()
    table.string('userId').references('id').inTable('users').onDelete('CASCADE')
    table.timestamp('expires')
    table.timestamps(true, true)
  })

  // Verification tokens table
  await knex.schema.createTable('verificationTokens', (table) => {
    table.string('identifier')
    table.string('token').unique()
    table.timestamp('expires')
    table.timestamps(true, true)

    table.unique(['identifier', 'token'])
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('verificationTokens')
  await knex.schema.dropTableIfExists('sessions')
  await knex.schema.dropTableIfExists('accounts')
  await knex.schema.dropTableIfExists('users')
}
