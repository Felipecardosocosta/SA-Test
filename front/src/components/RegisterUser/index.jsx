import React, { useState } from 'react'
import { LabelInput } from '../LabelInput/LabelInput'
import { toast } from 'react-toastify'
import axios from 'axios'

const RegisterUser = ({onClose}) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [nome, setNome] = useState("")

    const [confirmPassword, setconfirmPassword] = useState("")





    const [isPasswordMatch, setIsPasswordMatch] = useState(true)

    const [isSaving, setIsSaving] = useState(false)

    const isPasswordValid = () => password.length >= 8 && password === confirmPassword

    const resetForm = () => {
        setEmail("")
        setPassword("")
        setconfirmPassword("")
        setNome("")
        setIsPasswordMatch(true)
    }


    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!isPasswordValid()) {
            setIsPasswordMatch(false)

            return

        }

        setIsSaving(true)

        try {
            await axios.post('http://localhost:3000/usuario/cadastro', {
                nome,email,senha:password
            })

            setIsSaving(false)
            resetForm()
            onClose()

            toast.success("Usuario Criado com Sucesso", {
                autoClose: 2000,
                hideProgressBar: true
            })

        } catch (error) {
            console.log(error?.response.data.error.code)

            if (error?.response.data.error.code == "23505") {
                 toast.error("Email ja esta sendo utilizado", {
                autoClose: 2000,
                hideProgressBar: true
            })
            setIsSaving(false)
                
            return
            }
         
            toast.error("Erro ao criar usuario! ", {
                autoClose: 2000,
                hideProgressBar: true
            })
            setIsSaving(false)
        }

    }


    return (


        <div
            className='w-full max-w-md p-6 bg-white rounded-xl '

        >
            <h2
                className='text-2xl font-bold mb-6 text-center'
            >
                Criar Usuário

            </h2>

            <form onSubmit={handleSubmit}>
                <fieldset>
                    <LabelInput
                        id={"register-email"}
                        type={"email"}
                        name={"Email"}
                        text={"Email"}
                        value={email}
                        setValue={setEmail}

                        required

                    />
                </fieldset>
                <fieldset>
                    <LabelInput
                        id={"register-nome"}
                        type={"text"}
                        name={"nome"}
                        text={"Nome"}
                        value={nome}
                        setValue={setNome}

                        required

                    />
                </fieldset>

                <fieldset>
                    <LabelInput
                        id={"register-password"}
                        type={'password'}
                        name={'senha'}
                        text={"Senha"}
                        value={password}
                        setValue={setPassword}
                        minLength={8}
                        required
                    />
                </fieldset>
                <fieldset>
                    <LabelInput
                        id={"register-confirmPassword"}
                        type={'password'}
                        name={'senha'}
                        text={"Confirme Senha"}
                        value={confirmPassword}
                        setValue={setconfirmPassword}
                        minLength={8}
                        required
                    />
                    {!isPasswordMatch && (
                        <p className='text-red-500 text-sm mt-1' >As senhas não correspondem</p>
                    )}
                </fieldset>

                <div>

                    <button
                        type='submit'
                        disabled={isSaving}
                        className={`w-full p-2 rounded-lg text-white mt-4 ${isSaving ?
                            'bg-gray-400 cursor-not-allowed' :
                            "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                            } transition-colors`}

                    >
                        {isSaving ? "Salvando ...." : "Criar Usuario"}

                    </button>

                </div>


            </form>






        </div>
    )
}

export default RegisterUser