import { Link, useParams } from "react-router"
import DashBoard from "../../pages/DashBoard"
import { useEffect } from "react"
import axios from "axios"
import { useState } from "react"
import { valorFormatado } from "../../services/valorFormatado"
import { RiCloseFill } from "react-icons/ri";
import { useNavigate } from "react-router"
import { toast } from "react-toastify"



const Product = () => {

    const navigate = useNavigate()


    const { id } = useParams()

    const [product, setProduct] = useState({})

    useEffect(() => {
        const fecthProduct = async () => {

            try {
                const response = await axios.get(`http://localhost:3000/produto/buscar/${id}`)
                const productsData = response.data

                setProduct(productsData.data)

            } catch (error) {

                console.log("Erro ao obter dados dos produtos", error);


            }
        }

        fecthProduct()

    }, [])


    const deletar = async (id) => {

        if (!id) {
            toast.error("Erro ao conseguir indentificar o produto", {
                autoClose: 2000,
                hideProgressBar: true
            })
            navigate(-1)


        }

        try {


            const response = await axios.delete(`http://localhost:3000/produto/deletar/${id}`)

            setProduct({})

             toast.success("Produto deletado com sucesso", {
                autoClose: 2000,
                hideProgressBar: true
            })
            navigate(-1)


        } catch (error) {

            const erroMessage = error.response.data.mensagem || "Erro ao deletar"

            toast.error(erroMessage, {
                autoClose: 2000,
                hideProgressBar: true
            })
            console.log(error.response)
            console.log("Erro ao deletar", error);


        }
    }



    return (


        <section>
            <DashBoard />

            <div
                className="flex fixed inset-0 z-50  items-center justify-center bg-cyan-950/50 ">
                <div className=" w-md h-[50%] flex flex-col items-center bg-emerald-50 rounded-lg" >
                    <div className="w-full flex justify-end p-2">
                        <Link to={'/dashboard'}>
                            <RiCloseFill size={20} />
                        </Link>
                    </div>
                    <div className="flex w-full h-full p-4">

                        <div>
                            <img src="https://placehold.co/200x200" alt="" />

                        </div>

                        <div className="flex flex-col items-center gap-3 p-2 pt-5 justify-between" >
                            <h1>{product.nome}</h1>

                            <h2>Valor do Produto: {valorFormatado(product.valor)}</h2>

                            <h2>Quantidade em Estoque: {product.quantidade} </h2>

                            <div className="flex flex-col gap-3">



                                <button
                                    onClick={() => navigate(`/compra/${product.id}`)}
                                    className='bg-cyan-700 p-2 px-15 w-full rounded-lg text-white font-bold  hover:bg-cyan-800 transition-colors cursor-pointer justify-self-end'
                                >
                                    Comprar
                                </button>
                                <button
                                    onClick={() => { deletar(product.id) }}
                                    className='bg-gray-400 p-2 px-15 w-full rounded-lg text-white font-bold  hover:bg-red-400 transition-colors cursor-pointer justify-self-end'
                                >
                                    Deletar
                                </button>
                            </div>


                        </div>

                    </div>

                </div>


            </div>


        </section>
    )
}

export default Product