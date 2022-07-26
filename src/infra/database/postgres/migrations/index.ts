import 'dotenv/config'
import { Client } from 'pg'
import path from 'path'
import { migrate } from 'postgres-migrations'

const client = new Client({
  user: process.env.DATABASE_USER as string,
  password: process.env.DATABASE_PASSWORD as string,
  database: process.env.DATABASE_NAME as string
})

async function runMigrations(): Promise<void> {
  await client.connect()

  try {
    await migrate({ client }, path.resolve(__dirname, 'sql'))
  } catch (error) {
    console.error('Migration failed: ', error)
  } finally {
    await client.end()
  }
}

runMigrations()