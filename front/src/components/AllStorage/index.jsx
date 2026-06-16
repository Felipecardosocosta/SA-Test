import axios from 'axios'

import React, { useEffect, useState } from 'react'
import { GrStorage } from 'react-icons/gr'

const AllStorage = () => {

 const [storageCounter, setStorageCounter] = useState(0)

    useEffect(() => {
        const fetchStorage = async () => {
            try {
                const response = await axios.get('http://localhost:3000/produto/buscar')

                
                
                let quantidade =0
                
                response.data.data.map(product=> quantidade =  Number(product.quantidade) + quantidade)

                setStorageCounter(quantidade)

                return

            } catch (error) {
                console.error("Erro ao obter produto ", error)

            }
        }
        fetchStorage()
    }, [])

    return (
        <div className='bg-white shadow rounded-lg p-6 flex flex-col items-center w-60'>
            <h2 className='text-xl font-bold flex items-center gap-2'>
                {storageCounter}
                <GrStorage className='text-blue-600' />

            </h2>
            <p>Estoque</p>

        </div>
    )
}


export default AllStorage