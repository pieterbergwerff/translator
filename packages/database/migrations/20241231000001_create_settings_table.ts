import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  // Settings table
  await knex.schema.createTable('settings', (table) => {
    table.uuid('settingsId').primary()
    table.string('settingsName').notNullable()
    table.json('settingsValue').notNullable()
    table.timestamps(true, true)
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('settings')
}
