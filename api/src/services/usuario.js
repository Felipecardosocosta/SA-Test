import { pool } from "../config/db.js"

class UsuarioService {
    async getAll() {
        const res = await pool.query("SELECT * from usuario")
        console.log(res)
        return res.rows
    }

    async login(email, senha) {
        const res = await pool.query("SELECT * from usuario where email=$1 AND senha=$2", [email, senha])

        if (res.rows.length > 0) {
            console.log(res)
            return { mensagem: "usuario logado", data: [res.rows[0]], status: true }
        }

        return { mensagem: "email ou senha incorretos", data: [], status: false }



    }


    async createUser({ nome, email, senha }) {
        const newUser = await pool.query("INSERT INTO usuario(nome,email,senha) VALUES($1,$2,$3) RETURNING *", [nome, email, senha])

        if (newUser.rowCount === 1) {
            console.log(newUser.rows[0]);
            return { mensagem: "usuario criado", data: [newUser.rows[0]], status: true }
        }

        return { mensagem: "erro ao criar usuario", data: [], status: false }
    }

    async put({ nome, email, senha, id }) {

        const userModify = await pool.query("UPDATE usuario SET nome = $1, email= $2, senha=$3 where id=$4 RETURNING *", [nome, email, senha, id])

        if (userModify.rowCount === 1) {

            return { mensagem: "usuario modificado", data: [userModify.rows], status: true }

        }

        return { mensagem: "erro ao modificar usuario", data: [userModify], status: false }

    }

    async delete(id) {

        const userDeletado = await pool.query("DELETE FROM usuario WHERE id = $1", [id])

        console.log(userDeletado)
        if (userDeletado.rowCount === 1) {

            return { mensagem: "usuario deletado", data: [], status: true }

        }



        return { mensagem: "usuario nao foi deletado", data: [userDeletado], status: false }


    }

}

export const usuarioService = new UsuarioService()