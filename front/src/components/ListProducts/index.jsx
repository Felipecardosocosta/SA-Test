import axios from 'axios'
import { useEffect, useState } from 'react'

import { PiBoneBold } from "react-icons/pi";
import { Link } from 'react-router'
import { valorFormatado } from '../../services/valorFormatado'

const ListProducts = () => {

    const [products, setProducts] = useState([])
    const [searchTerm, setSearchTerm] = useState('')


    useEffect(() => {

        const fecthProducts = async () => {
            try {
                const response = await axios.get("http://localhost:3000/products")
                const productsData = response.data
            
               
                setProducts(productsData)


            } catch (error) {
                console.log("Erro ao obter dados dos produtos", error);


            }
        }
        fecthProducts()
    }, [])


    const handleSearchChange = (e) => {

        setSearchTerm(e.target.value)
    }

    const filteredProducts = products.filter((product) => [product.nome, product.valor, product.quantidade].join(" ").toLowerCase().includes(searchTerm.toLowerCase()))


    return (
        <div className='bg-white shadow rounded-2xl p-6 mt-8'>
            <h2 className='text-xl font-semibold text-cyan-800 mb-4 '>
                Informações dos produtos
            </h2>

            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3'> 


            <label htmlFor="search" className='text-gray-700 font-medium'>
                Buscar Produtos:
            </label>
            <input
                type="text"
                id='search'
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder='Digite o nome, valor ou quantidade'
                className='border rounded-lg py-2 w-full sm:w-80 focus:ring-2 focus:ring-cyan-600 outline-none'
                />

            </div>
            <div>
                {
                    filteredProducts.length > 0 ? (
                        <ul className='divide-y divide-gray-200'>
                            {
                                filteredProducts.map((product) => (
                                    <li
                                        key={product.id}

                                        className='flex flex-col sm:flex-row sm:items-center justify-between py-4'
                                    >
                                        <div
                                            className='flex items-center gap-4'
                                        >
                                            <div
                                                className='bg-cyan-100 text-cyan-700 rounded-full'
                                            >
                                                <PiBoneBold size={40} />

                                            </div>

                                            <div>
                                                <p className='font-semibold text-gray-800'>{product.nome}</p>
                                                <p className='text-sm text-gray-600'>Valor: {valorFormatado( product.valor)}</p>
                                                <p className='text-sm text-gray-600'>Quantidade: {product.quantidade}</p>
                                            </div>
                                        </div>

                                        <div className='text-sm text-gray-600 mt-2 sm:mt-0 text-right'>
                                            <Link
                                                to={`/products/${product.id}`}
                                                className='text-cyan-700'
                                            >
                                                Ver detalhes
                                            </Link>

                                        </div>

                                    </li>
                                )
                                )

                            }
                        </ul>
                    ) : (<p className='text-gray-500 text-center py-6' >Nenum paciente encontrado</p>)

                }

            </div>

        </div>
    )
}

export default ListProducts