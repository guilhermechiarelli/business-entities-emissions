import 'dotenv/config'
import express from 'express'
import 'express-async-errors'
import { Postgres } from '../database/postgres/connection'
import { routes } from './routes'
import { rateLimiter } from './middlewares/rateLimiter'
import errorMiddleware from './middlewares/errors'

const PORT = 3333
const server = express()            

server.use(express.json())
server.use(rateLimiter, routes) 
server.use(errorMiddleware)

Postgres.connect({
  user: process.env.DATABASE_USER as string,
  password: process.env.DATABASE_PASSWORD as string,
  database: process.env.DATABASE_NAME as string
})
   
server.listen(PORT, () => {
  console.log(`ENV: ${process.env.NODE_ENV}`)
  console.log(`Server started on port: ${PORT}`)  
})
