import 'dotenv/config.js'


const env = {
    host: process.env.HOST|| "localhost",
    port: process.env.PORT|| "5432",    
    password: process.env.SENHA_BD||"senai",
    database: process.env.DATABASE|| "pet_shop",
    user: process.env.USER|| "postgres"
}

console.log(env);



export default env

