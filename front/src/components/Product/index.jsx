import { useParams } from "react-router"
import DashBoard from "../../pages/DashBoard"
import { useEffect } from "react"
import axios from "axios"
import { useState } from "react"
import { valorFormatado } from "../../services/valorFormatado"



const Product = () => {


    const { id } = useParams()

    const [product, setProduct] = useState({})

    useEffect(() => {
        const fecthProduct = async () => {

            try {
                const response = await axios.get(`http://localhost:3000/products/${id}`)
                const productsData = response.data


                setProduct(productsData)


            } catch (error) {

                console.log("Erro ao obter dados dos produtos", error);


            }
        }

        fecthProduct()

    }, [])


    return (


        <section>
            <DashBoard />

            <div className="flex fixed inset-0 z-50  items-center justify-center bg-cyan-950/50 ">
                <div className="border-2 w-md h-[50%] flex flex-col items-center " >

                    <h1>{product.nome}</h1>

                    <h2>Valor do Produto: {valorFormatado(product.valor)}</h2>

                    <h2>Quantidade em Estoque: {product.quantidade} </h2>

                </div>


            </div>


        </section>
    )
}

export default Product