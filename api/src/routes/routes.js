import { Router } from "express";
import cadastrar from "../controllers/cadastrar.js";



const routes = Router()



routes.post('/cadastro',cadastrar )



export default routes