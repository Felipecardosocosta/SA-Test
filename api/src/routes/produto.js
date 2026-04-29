import { Router } from "express";
import { produtoService } from "../services/produto";





const routesProduto = Router()



routesProduto.get('/buscar', async (req, res) => {

    try {
        const busca = await produtoService.getAll()

        if (busca.status) {
            res.status(200).json(busca)
        }

        res.status(400).json(busca)


    } catch (error) {

        console.error(error);

        res.status(500).json(error)

    }

})

routesProduto.get("/buscar/:id", async (req, res) => {
    const id = body.params

    try {
        const busca = await produtoService.getById(id)

        if (busca.status) {

            res.status(200).json(busca)
        }

        res.status(400).json(busca)

    } catch (error) {
        console.error(error);

        res.status(500).json(error)
    }

}
)



routesProduto.post('/cadastro', async (req, res) => {
    const { nome, valor, quantidade } = req.body
    try {
        const cadastro = await produtoService.createProduto({ nome, valor, quantidade })

        if (cadastro.status) {
            return res.status(201).json(cadastro)
        }

        return res.status(400).json(cadastro)


    } catch (error) {

        console.log(error);

        return res.status(500).json({ mensagem: 'Erro no servidor', status: false, error })

    }

})


routesProduto.delete('/deletar/:id', async (req, res) => {
    const { id } = req.params
    try {
        const deletado = await produtoService.delete(id)

        if (deletado.status) {
            return res.status(201).json(deletado)
        }

        return res.status(400).json(deletado)


    } catch (error) {

        console.log(error);

        return res.status(500).json({ mensagem: 'Erro no servidor', status: false, error })

    }

})

routesProduto.put('/comprar/:id/:quantidade', async (req, res) => {
    const { id, quantidade } = req.params


    try {
        const modificado = await produtoService.comprar(id, quantidade)

        if (modificado.status) {
            return res.status(201).json(modificado)
        }

        return res.status(400).json(modificado)


    } catch (error) {

        console.log(error);

        return res.status(500).json({ mensagem: 'Erro no servidor', status: false, error })

    }



})

export default routesProduto