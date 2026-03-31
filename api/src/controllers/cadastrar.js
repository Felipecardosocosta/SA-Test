import pool from "../config/db.js"



const cadastrar = async (req,res)=>{


const usuario = req.body

console.log(usuario);


try {
    const query = await pool.query('INSERT INTO usuario (nome,senha,email,tipo) VALUES(?,?,?,?)',[usuario.nome,usuario.senha,usuario.email,"ADMIN"])

    console.log(query);
    
    if (query.affectedRows ) {
        return res.status(200).json({
            data:query,
            message:"Usuario cadastrado"
        })
        
    }
    return res.status(200).json({
            data:query,
            message:'Usuario nao cadastrado'
    })



} catch (error) {


    if(error?.sqlMessage) res.status(400).json({message:error.sqlMessage})
    console.log(error);
    
    
}



}



export default cadastrar