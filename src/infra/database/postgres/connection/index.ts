import { Client } from 'pg'

interface IDatabaseAuth {
  user: string
  password: string
  database: string
}

export const Postgres = {
  client: {} as Client,

  async connect({ user, password, database }: IDatabaseAuth): Promise<void> {
    this.client = new Client({ user, password, database })

    await this.client.connect()

    const res = await this.client.query('SELECT $1::text as message', ['Connect to database'])

    console.log(res.rows[0].message)
  },

  async disconnect(): Promise<void> {
    await this.client.end()
    
    this.client = {} as Client
  },
}

