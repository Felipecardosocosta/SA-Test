import { pool } from "../config/db.js"

class ProdutoService {
    async getAll() {
        const res = await pool.query("SELECT * from produtos")
        
        if (res.rows.length>0) {

            
            return {mensagem:"todos os produtos", data:res.rows,status:true}
        }
        return {mensagem:"Sem produtos cadastrados", data:[],status:false}
    }

    async getById(id) {
           const res = await pool.query("SELECT * from produtos where=$1",[id])
        
        if (res.rows.length>0) {

            
            return {mensagem:"produto encontrado", data:res.rows[0],status:true}
        }
        return {mensagem:"Produtos não cadastrado", data:[],status:false}
    }



    async createProduto({nome,valor,quantidade}) {
        const newProduto = await pool.query("INSERT INTO produtos(nome,valor,quantidade) VALUES($1,$2,$3) RETURNING *", [nome,valor,quantidade])
        console.log(newStudent.rows[0]);

        if (newProduto.rowCount===1) {

            return {mensagem:"Produto criado",  data:[newProduto.rows[0]],status:true}
            
        }

        return {mensagem:"erro ao criar produto",  data:[newProduto],status:false}
    }

    async comprar(id,quantidade) {


        const userModify = await pool.query("UPDATE usuario SET nome = $1, email= $2, senha=$3 where=$4 RETURNING *", [nome,email,senha,id])

        if(userModify.rowCount===1){

            return{mensagem:"usuario modificado", data:[userModify.rows],status:true}

        }
        
        return {mensagem:"erro ao modificar usuario",  data:[userModify],status:false}
        
    }

    async delete(id) {

        const userDeletado = await pool.query("DELETE FROM usuario WHERE id = $1",[id])

        console.log(userDeletado)
        if(userDeletado.rowCount===1){

            return{mensagem:"usuario deletado", data:[],status:true}

        }
        
      

        return  {mensagem:"usuario nao foi deletado", data:[userDeletado],status:false}


    }

}

export const usuarioService = new ProdutoService()