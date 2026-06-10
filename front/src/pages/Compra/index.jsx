import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { LabelInput } from '../../components/LabelInput/LabelInput'
import { valorFormatado } from '../../services/valorFormatado'
import { PiBoneBold } from "react-icons/pi"
import { useParams } from 'react-router'

const Compra = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    // Estados do formulário
    const [formData, setFormData] = useState({
        produtoId: '',
        quantidade: ''
    })

    useEffect(() => {
        fetchProducts()
    }, [])
    const { id } = useParams()

    const fetchProducts = async () => {

        try {
            setLoading(true)


            const response = await axios.get('http://localhost:3000/products')


            console.log(response)
            setProducts(response.data.filter(p => p.quantidade > 0))

            if (id) {

                handleInputChange('produtoId', id)

            }

        } catch (error) {
            console.error("Erro ao obter produtos", error)
            setError("Erro ao carregar produtos")
        } finally {
            setLoading(false)
        }
    }

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }))
    }

    const handleCompra = async (e) => {
        e.preventDefault()

        // Validação
        if (!formData.produtoId || !formData.quantidade) {
            setError('Selecione um produto e informe a quantidade')
            return
        }

        const quantidade = Number(formData.quantidade)
        if (quantidade <= 0) {
            setError('A quantidade deve ser maior que zero')
            return
        }

        const produtoSelecionado = products.find(p => p.id === formData.produtoId)
        if (!produtoSelecionado || produtoSelecionado.quantidade < quantidade) {
            setError('Quantidade insuficiente em estoque')
            return
        }

        try {
            setLoading(true)
            setError('')

            const response = await axios.put(
                `http://localhost:3000/produtos/comprar/${formData.produtoId}/${quantidade}`
            )

            if (response.data.status) {
                setSuccess(`Compra realizada com sucesso! Produto: ${produtoSelecionado.nome}`)
                setFormData({
                    produtoId: '',
                    quantidade: ''
                })
                await fetchProducts()
                setTimeout(() => setSuccess(''), 3000)
            } else {
                setError(response.data.mensagem || 'Erro ao realizar compra')
            }
        } catch (error) {
            console.error("Erro ao realizar compra", error)
            setError("Erro ao realizar compra. Tente novamente.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='w-full max-w-2xl mx-auto'>
            <h1 className='text-2xl font-bold text-cyan-800 mb-8'>Comprar Produtos</h1>

            <div className='bg-white shadow rounded-2xl p-8'>
                {error && (
                    <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4'>
                        {error}
                    </div>
                )}

                {success && (
                    <div className='bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4'>
                        {success}
                    </div>
                )}

                <form onSubmit={handleCompra} className='space-y-6'>
                    <fieldset className='flex flex-col gap-3'>
                        <label className='text-gray-700 font-medium'>Selecione um Produto:</label>

                        {loading && products.length === 0 ? (
                            <p className='text-gray-500'>Carregando produtos...</p>
                        ) : products.length > 0 ? (
                            <div className='space-y-2 border rounded-lg p-4 max-h-64 overflow-y-auto'>
                                {products.map((product) => (
                                    <label key={product.id} className='flex items-center gap-3 p-3 border rounded cursor-pointer hover:bg-cyan-50'>
                                        <input
                                            type="radio"
                                            name="produtoId"
                                            value={product.id}
                                            checked={formData.produtoId === product.id.toString()}
                                            onChange={(e) => handleInputChange('produtoId', e.target.value)}
                                            className='w-4 h-4'
                                            required
                                        />
                                        <div className='bg-cyan-100 text-cyan-700 rounded-full p-2'>
                                            <PiBoneBold size={20} />
                                        </div>
                                        <div className='flex-1'>
                                            <p className='font-semibold text-gray-800'>{product.nome}</p>
                                            <p className='text-sm text-gray-600'>Valor: {valorFormatado(product.valor)} - Estoque: {product.quantidade}</p>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        ) : (
                            <p className='text-gray-500'>Nenhum produto disponível</p>
                        )}
                    </fieldset>

                    {formData.produtoId && (
                        <div className='bg-cyan-50 p-4 rounded-lg'>
                            <p className='text-sm text-gray-600'>
                                Produto: <span className='font-semibold'>{products.find(p => p.id === formData.produtoId).nome}</span>
                            </p>
                            <p className='text-sm text-gray-600'>
                                Preço: <span className='font-semibold'>{valorFormatado(products.find(p => p.id === formData.produtoId).valor)}</span>
                            </p>
                        </div>
                    )}

                    <LabelInput
                        type="number"
                        id="quantidade"
                        text="Quantidade a Comprar"
                        name="quantidade"
                        value={formData.quantidade}
                        setValue={(value) => handleInputChange('quantidade', value)}
                        placeholder="Ex: 2"
                        min="1"
                        required
                    />

                    {formData.produtoId && formData.quantidade && (
                        <div className='bg-cyan-100 p-4 rounded-lg text-center'>
                            <p className='text-sm text-cyan-800'>
                                Total: {valorFormatado(
                                    (products.find(p => p.id === formData.produtoId)?.valor || 0) * formData.quantidade
                                )}
                            </p>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading || products.length === 0}
                        className='w-full bg-cyan-700 text-white font-semibold py-3 rounded-lg hover:bg-cyan-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed mt-8'
                    >
                        {loading ? 'Processando...' : 'Realizar Compra'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Compra
