import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { AuthContext } from '../../contexts/AuthContext'
import { RotatingLines } from 'react-loader-spinner'
import { ToastAlerta } from '../../utils/ToastAlerta'
import { buscar, deletar } from '../../services/Service'
import Produto from '../../models/Produto'

function DeletarProduto() {
    const navigate = useNavigate()

    const [produto, setProduto] = useState<Produto>({} as Produto)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    const { id } = useParams<{ id: string }>()

    async function buscarPorId(id: string) {
        try {
            
            await buscar(`/produtos/${id}`, setProduto, {
                headers: {
                    'Authorization': token
                }
            })
        } catch (error: any) {
            if (error.toString().includes('403')) {
                handleLogout()
            }
        }
    }

    useEffect(() => {
       
        if (token === '') {
            ToastAlerta("Você precisa estar logado!", "aviso")
           navigate('/')
        }
    }, [token])

    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id)
        }
    }, [id])

    async function deletarProduto() {
        setIsLoading(true)

        try {
            await deletar(`/produtos/${id}`, {
                headers: {
                    'Authorization': token
                }
            })

            ToastAlerta("Produto apagado com sucesso !", "sucesso")

        } catch (error: any) {
            if (error.toString().includes('403')) {
                handleLogout()
            } else {
                ToastAlerta("Erro ao deletar o Produto!", "erro")
            }
        }

        setIsLoading(false)
       retornar()
    }

    function retornar() {
        navigate("/produtos")
    }

    return (
        <div className='h-[100vh] py-10 bg-yellow-50 '>
        <div className='container w-1/3 mx-auto'>
            {/* <h1 className='text-4xl text-center my-4'>Deletar restaurante</h1> */}
            <h2 className="text-4xl font-bold text-center text-red-700 my-4 align-middle">Deletar </h2>
            <p className='text-center font-semibold mb-4'>
                Você tem certeza de que deseja apagar o produto a seguir?</p>
            <div className="bg-white shadow-md rounded-lg p-4 text-center mt-10">
                <header className=' py-2 px-6 bg-red-800 text-white font-bold text-2xl  rounded'>
                    Produto
                </header>
                <p className='p-5 text-3xl h-full text-center text-red-800'>{produto.nomeProduto}</p>
                <div className='flex justify-center'>

                    <img
                        src={produto.foto}
                        alt={produto.nomeProduto}
                        onError={(e) => (e.currentTarget.src = "/default-food.jpg")}
                        className="h-50 w-50 object-cover rounded mb-4"
                    />

                </div>


                <div className="flex gap-5">
                    <button
                        className="px-3  rounded w-[80%]  h-[2rem] bg-amber-500 text-white  hover:bg-amber-400  "
                        onClick={retornar}>
                        Não
                    </button>
                    <button
                        className="px-3 rounded w-[80%] h-[2rem] bg-red-700 text-white hover:bg-red-500 "
                        onClick={deletarProduto}>
                        {isLoading ?
                            <RotatingLines
                                strokeColor="white"
                                strokeWidth="5"
                                animationDuration="0.75"
                                width="24"
                                visible={true}
                            /> :
                            <span>Sim</span>
                        }
                    </button>
                </div>
            </div>
        </div>
        </div>
    )
}

export default DeletarProduto