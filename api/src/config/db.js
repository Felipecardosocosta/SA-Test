import { Pool } from 'pg'
import dotenv from 'dotenv'
import env from '../env.js'

dotenv.config()

export const pool = new Pool({
    host: env.host,
    user: env.user,
    database: env.database,
    password: env.password,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
    maxLifetimeSeconds: 60,
})