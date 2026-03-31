import 'dotenv/config.js'


const env = {
    host: process.env.HOST,
    port: process.env.PORT,    
    password: process.env.SENHA_BD,
    database: process.env.DATABASE,
    user: process.env.USER
}

console.log(env);



export default env
