import axios from 'axios';

import React, { useEffect, useState } from 'react'
import { FaMoneyCheckAlt } from "react-icons/fa";
import { valorFormatado } from '../../services/valorFormatado';

const AllValuesStorage = () => {

    const [valueStorageCounter, setValueStorageCounter] = useState(0)

    useEffect(() => {
        const fetchValueStorage = async () => {

            try {
                const response = await axios.get('http://localhost:3000/products')



                console.log(response);

                let value = 0

                response.data.map(product => value = Number(product.quantidade) * Number(product.valor) + value)


                
               

                setValueStorageCounter(valorFormatado(value))

                return

            } catch (error) {
                console.error("Erro ao obter produto ", error)

            }
        }
        fetchValueStorage()
    }, [])

    return (
        <div className='bg-white shadow rounded-lg p-6 flex flex-col items-center w-60'>
            <h2 className='text-xl font-bold flex items-center gap-2'>
                {valueStorageCounter}
                <FaMoneyCheckAlt className='text-blue-600' />

            </h2>
            <p>Valor Estoque</p>

        </div>
    )
}

export default AllValuesStorage