import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  // Profiles table
  await knex.schema.createTable('profiles', (table) => {
    table.increments('profileId').primary()
    table.string('profileName').notNullable()
    table.enum('profileStatus', ['active', 'inactive', 'banned']).notNullable().defaultTo('active')
    table.timestamps(true, true)
  })

  // Permissions table
  await knex.schema.createTable('permissions', (table) => {
    table.increments('permissionId').primary()
    table
      .integer('permissionProfileId')
      .unsigned()
      .references('profileId')
      .inTable('profiles')
      .onDelete('CASCADE')
    table.enum('permissionRight', ['read', 'write', 'update', 'delete']).notNullable()
    table.timestamps(true, true)
  })

  // UserProfile junction table
  await knex.schema.createTable('userProfiles', (table) => {
    table.increments('upId').primary()
    table.integer('upUserId').unsigned().references('userId').inTable('users').onDelete('CASCADE')
    table
      .integer('upProfileId')
      .unsigned()
      .references('profileId')
      .inTable('profiles')
      .onDelete('CASCADE')
    table.timestamps(true, true)

    table.unique(['upUserId', 'upProfileId'])
  })

  // ProfilePermission junction table
  await knex.schema.createTable('profilePermissions', (table) => {
    table.increments('ppId').primary()
    table
      .integer('ppProfileId')
      .unsigned()
      .references('profileId')
      .inTable('profiles')
      .onDelete('CASCADE')
    table
      .integer('ppPermissionId')
      .unsigned()
      .references('permissionId')
      .inTable('permissions')
      .onDelete('CASCADE')
    table.timestamps(true, true)

    table.unique(['ppProfileId', 'ppPermissionId'])
  })

  // Create root profile with all permissions
  const [rootProfileIdResult] = await knex('profiles')
    .insert({
      profileName: 'root',
      profileStatus: 'active',
    })
    .returning('profileId')

  // Extract the actual ID (handle both SQLite object format and direct value)
  const rootProfileId =
    typeof rootProfileIdResult === 'object' &&
    rootProfileIdResult !== null &&
    'profileId' in rootProfileIdResult
      ? rootProfileIdResult.profileId
      : rootProfileIdResult

  // Create all permissions for root profile
  const permissionRights = ['read', 'write', 'update', 'delete'] as const
  const permissionIds: number[] = []

  for (const right of permissionRights) {
    const [permissionIdResult] = await knex('permissions')
      .insert({
        permissionProfileId: rootProfileId,
        permissionRight: right,
      })
      .returning('permissionId')

    // Extract the actual ID
    const permissionId =
      typeof permissionIdResult === 'object' &&
      permissionIdResult !== null &&
      'permissionId' in permissionIdResult
        ? permissionIdResult.permissionId
        : permissionIdResult

    permissionIds.push(permissionId)
  }

  // Link all permissions to root profile
  for (const permissionId of permissionIds) {
    await knex('profilePermissions').insert({
      ppProfileId: rootProfileId,
      ppPermissionId: permissionId,
    })
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('profilePermissions')
  await knex.schema.dropTableIfExists('userProfiles')
  await knex.schema.dropTableIfExists('permissions')
  await knex.schema.dropTableIfExists('profiles')
}
