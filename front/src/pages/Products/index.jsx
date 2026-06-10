import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { LabelInput } from '../../components/LabelInput/LabelInput'



const Products = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    // Estados do formulário
    const [formData, setFormData] = useState({
        nome: '',
        valor: '',
        quantidade: ''
    })

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }))
    }

 

    const handleAddProduct = async (e) => {
        e.preventDefault()

        // Validação básica
        if (!formData.nome.trim() || !formData.valor || !formData.quantidade) {
            setError('Todos os campos são obrigatórios')
            return
        }

        try {
            setLoading(true)
            setError('')
            setSuccess('')

            const response = await axios.post('http://localhost:3000/produtos/cadastro', {
                nome: formData.nome.trim(),
                valor: parseFloat(formData.valor),
                quantidade: parseInt(formData.quantidade)
            })

            if (response.data.status) {
                setSuccess('Produto adicionado com sucesso!')
                setFormData({
                    nome: '',
                    valor: '',
                    quantidade: ''
                })
                setTimeout(() => setSuccess(''), 3000)
            } else {
                setError(response.data.mensagem || 'Erro ao adicionar produto')
            }
        } catch (error) {
            console.error("Erro ao adicionar produto", error)
            setError("Erro ao adicionar produto. Tente novamente.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='w-full max-w-2xl mx-auto'>
            <h1 className='text-2xl font-bold text-cyan-800 mb-8'>Cadastrar Novo Produto</h1>

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

                <form onSubmit={handleAddProduct} className='space-y-6'>
                    <LabelInput
                        type="text"
                        id="nome"
                        text="Nome do Produto"
                        name="nome"
                        value={formData.nome}
                        setValue={(value) => handleInputChange('nome', value)}
                        placeholder="Ex: Ração para cão"
                        required
                    />

                    <LabelInput
                        type="number"
                        id="valor"
                        text="Valor (R$)"
                        name="valor"
                        value={formData.valor}
                        setValue={(value) => handleInputChange('valor', value)}
                        placeholder="Ex: 50.00"
                        step="0.01"
                        min="0"
                        required
                    />

                    <LabelInput
                        type="number"
                        id="quantidade"
                        text="Quantidade"
                        name="quantidade"
                        value={formData.quantidade}
                        setValue={(value) => handleInputChange('quantidade', value)}
                        placeholder="Ex: 10"
                        min="0"
                        required
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className='w-full bg-cyan-700 text-white font-semibold py-3 rounded-lg hover:bg-cyan-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed mt-8'
                    >
                        {loading ? 'Adicionando...' : 'Adicionar Produto'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Products
