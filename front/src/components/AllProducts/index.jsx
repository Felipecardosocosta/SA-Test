import axios from 'axios'
import React, { useEffect, useState } from 'react'

import { LiaClipboardListSolid } from "react-icons/lia";

const AllProducts = () => {

    const [productCounter, setProductCounter] = useState(0)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3000/produto/buscar')

              


                setProductCounter(response.data.data.length)

                return

            } catch (error) {
                console.error("Erro ao obter produto ", error)

            }
        }
        fetchProducts()
    }, [])

    return (
        <div className='bg-white shadow rounded-lg p-6 flex flex-col items-center w-60'>
            <h2 className='text-xl font-bold flex items-center gap-2'>
                {productCounter}
                <LiaClipboardListSolid className='text-blue-600' />

            </h2>
            <p>Produtos</p>

        </div>
    )
}

export default AllProducts