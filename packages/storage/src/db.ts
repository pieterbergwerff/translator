import Dexie from 'dexie'

export const db = new Dexie('translator')

db.version(1).stores({})

export default db
