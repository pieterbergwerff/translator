import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  // Users table
  await knex.schema.createTable('users', (table) => {
    table.string('userId').primary()
    table.string('userName')
    table.string('userEmail').unique()
    table.timestamp('userEmailVerified')
    table.string('userImage')
    table.timestamps(true, true)
  })

  // Accounts table
  await knex.schema.createTable('accounts', (table) => {
    table.string('accountId').primary()
    table.string('accountUserId').references('userId').inTable('users').onDelete('CASCADE')
    table.string('accountType')
    table.string('accountProvider')
    table.string('accountProviderAccountId')
    table.text('accountRefreshToken')
    table.text('accountAccessToken')
    table.integer('accountExpiresAt')
    table.string('accountTokenType')
    table.string('accountScope')
    table.text('accountIdToken')
    table.string('accountSessionState')
    table.timestamps(true, true)

    table.unique(['accountProvider', 'accountProviderAccountId'])
  })

  // Sessions table
  await knex.schema.createTable('sessions', (table) => {
    table.string('sessionId').primary()
    table.string('sessionToken').unique()
    table.string('sessionUserId').references('userId').inTable('users').onDelete('CASCADE')
    table.timestamp('sessionExpires')
    table.timestamps(true, true)
  })

  // Verification tokens table
  await knex.schema.createTable('verificationTokens', (table) => {
    table.string('verificationTokenIdentifier')
    table.string('verificationTokenToken').unique()
    table.timestamp('verificationTokenExpires')
    table.timestamps(true, true)

    table.unique(['verificationTokenIdentifier', 'verificationTokenToken'])
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('verificationTokens')
  await knex.schema.dropTableIfExists('sessions')
  await knex.schema.dropTableIfExists('accounts')
  await knex.schema.dropTableIfExists('users')
}
