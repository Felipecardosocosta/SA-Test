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
           const res = await pool.query("SELECT * from produtos where id=$1",[id])
        
        if (res.rows.length>0) {

            
            return {mensagem:"Produto encontrado", data:res.rows[0],status:true}
        }
        return {mensagem:"Produto não cadastrado", data:[],status:false}
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

        const estoque = await this.getById(id)

        if (!estoque.status) {

            return {...estoque}
            
        }

        if (estoque.data?.quantidade > quantidade) {
              

            const productrModify = await pool.query("UPDATE produtos SET quantidade = quantidade-$1 where id=$2 RETURNING *", [quantidade,id])
    
            if(productrModify.rowCount===1){
    
                return{mensagem:"Compra efetuada", data:[productrModify.rows],status:true}
    
            }
        }

        
        return {mensagem:"erro ao comprar",  data:[productrModify],status:false}
        
    }

    async delete(id) {

        const produtoDeletado = await pool.query("DELETE FROM produtos WHERE id = $1",[id])

        console.log(produtoDeletado)
        if(produtoDeletado.rowCount===1){
            return{mensagem:"Produto deletado", data:[],status:true}
        }
        
        return  {mensagem:"Produto nao foi deletado", data:[produtoDeletado],status:false}


    }

}
export const produtoService = new ProdutoService()