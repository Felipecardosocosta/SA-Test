import { Router } from "express";





const routesProduto = Router()



routesProduto.post('/cadastro',async(req,res)=>{
    const {nome,email,senha} = req.body
    try {
        const cadastro = await usuarioService.createUser({nome,email,senha})

        if (cadastro.status) {
            return res.status(201).json(cadastro)
        }

        return res.status(400).json(cadastro)


    } catch (error) {

        console.log(error);
        
        return res.status(500).json({mensagem:'Erro no servidor',status:false,error})
        
    }

} )
routesProduto.post('/login',async(req,res)=>{
    const {email,senha} = req.body
    try {
        const login = await usuarioService.login({email,senha})

        if (login.status) {
            return res.status(201).json(login)
        }

        return res.status(400).json(login)


    } catch (error) {

        console.log(error);
        
        return res.status(500).json({mensagem:'Erro no servidor',status:false, error})
        
    }

} )

routesProduto.delete('/deletar/:id',async(req,res)=>{
    const {id} = req.params
    try {
        const cadastro = await usuarioService.delete(id)

        if (cadastro.status) {
            return res.status(201).json(cadastro)
        }

        return res.status(400).json(cadastro)


    } catch (error) {

        console.log(error);
        
        return res.status(500).json({mensagem:'Erro no servidor',status:false,error})
        
    }

})

routesProduto.put('/modificar/:id',async(req,res)=>{
    const {nome,email,senha} = req.body

    const id = req.params
    try {
        const cadastro = await usuarioService.put({nome,email,senha,id})

        if (cadastro.status) {
            return res.status(201).json(cadastro)
        }

        return res.status(400).json(cadastro)


    } catch (error) {

        console.log(error);
        
        return res.status(500).json({mensagem:'Erro no servidor',status:false,error})
        
    }



})

export default routesProduto