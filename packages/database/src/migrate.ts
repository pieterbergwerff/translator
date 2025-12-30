import db from './knex.js'

export async function runMigrations() {
  try {
    console.log('Running database migrations...')
    await db.migrate.latest()
    console.log('Migrations completed successfully')
  } catch (error) {
    console.error('Migration failed:', error)
    throw error
  }
}

export async function rollbackMigrations() {
  try {
    console.log('Rolling back database migrations...')
    await db.migrate.rollback()
    console.log('Rollback completed successfully')
  } catch (error) {
    console.error('Rollback failed:', error)
    throw error
  }
}

export async function seedDatabase() {
  try {
    console.log('Running database seeds...')
    await db.seed.run()
    console.log('Seeds completed successfully')
  } catch (error) {
    console.error('Seeding failed:', error)
    throw error
  }
}

// CLI runner if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const command = process.argv[2]

  switch (command) {
    case 'migrate':
      await runMigrations()
      break
    case 'rollback':
      await rollbackMigrations()
      break
    case 'seed':
      await seedDatabase()
      break
    default:
      console.log('Available commands: migrate, rollback, seed')
  }

  await db.destroy()
}
