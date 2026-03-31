import { createPool } from "mysql2/promise";
import env from "../env.js";




const pool = createPool({
    host: env.host,
    user: env.user,
    port: env.port,    
    password: env.password,
    database: env.database,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})


export default pool

