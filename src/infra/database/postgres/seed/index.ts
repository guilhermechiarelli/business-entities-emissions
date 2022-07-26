import 'dotenv/config'
import { Client } from 'pg'
import fs from 'fs'
import csv from 'csv-parser'
import path from 'path'
import format from 'pg-format'

const data: any = []

const client = new Client({
  user: process.env.DATABASE_USER as string,
  password: process.env.DATABASE_PASSWORD as string,
  database: process.env.DATABASE_NAME as string
})

async function runSeed(): Promise<void> {
  fs.createReadStream(path.resolve(__dirname, 'data', 'data.csv'))
    .pipe(csv())
    .on('data', row => {
      const id = Number(row.id)
      const name = row.name
      const path = `{${row.path}}`
      const emissions = JSON.parse(row.emissions)
      data.push([id, name, path, emissions])
    })
    .on('end', async () => {
      await client.connect()
      const query = format('INSERT INTO business_entities (id, name, path, emissions) VALUES %L', data)
      await client.query(query)
      await client.query(`SELECT setval('business_entities_id_seq', (SELECT MAX(id) from "business_entities"))`)
      await client.end()
      console.log(`${data.length} rows inserted successfully!`)
    })
}

runSeed()


