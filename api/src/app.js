import express from"express";
import  cors from "cors"
import { pool } from "./config/db.js";
import routesUsuario from "./routes/usuario.js";


const app = express()

app.use(express.json())

app.use(cors())

pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err)
    process.exit(-1)
})

app.use('/',routesUsuario)






export default app
