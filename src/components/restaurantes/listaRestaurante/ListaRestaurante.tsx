import { Link, useNavigate } from "react-router-dom";
import CardRestaurantes from "../cardrestaurantes/CardRestaurantes"
import { useContext, useEffect, useState } from "react";
import Restaurante from "../../../models/Restaurante";
import { AuthContext } from "../../../contexts/AuthContext";
import { RotatingLines } from "react-loader-spinner";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import { buscar } from "../../../services/Service";

function ListaRestaurantes() {

    const navigate = useNavigate();

    const [restaurantes, setRestaurantes] = useState<Restaurante[]>([])
    const [loading, setLoading] = useState(true)

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    async function buscarRestaurantes() {
        try {
            setLoading(true)
            await buscar('/restaurantes', setRestaurantes, {
                headers: { Authorization: token }
            })
            
            // Debug: Log para verificar os dados recebidos
            console.log('Dados recebidos:', restaurantes);
            
        } catch (error: any) {
            console.error('Erro ao buscar restaurantes:', error);
            ToastAlerta("Erro ao carregar restaurantes!", "erro")
            
            if (error.toString().includes('403')) {
                handleLogout()
            }
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (token === '') {
            ToastAlerta("Você precisa estar logado!", "aviso")
            navigate('/')
        }
    }, [token])

    // CORREÇÃO: Remover o loop infinito
    useEffect(() => {
        if (token !== '') {
            buscarRestaurantes()    
        }
    }, [token]) // Apenas quando o token mudar

    return (
        <>
            {/* <button>
                <Link to='/cadastrarrestaurante' className='hover:underline'>Cadastrar Restaurante</Link>       
            </button> */}

            {loading && (
                <div className="flex justify-center items-center min-h-[200px]">
                    <RotatingLines
                        strokeColor="white"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="24"
                        visible={true}
                    />
                </div>
            )}

            <div className="flex justify-center w-full my-5 m-5">
                <div className="w-full max-w-7x mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
                <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-3 gap-6 justify-center">
                       {/* CORREÇÃO: Verificação defensiva antes do .map() */}
                       {restaurantes && Array.isArray(restaurantes) && restaurantes.length > 0 ? (
                           restaurantes.map((restaurante) => (
                               <CardRestaurantes key={restaurante.id} restaurante={restaurante} />
                           ))
                       ) : (
                           !loading && <div className="col-span-full text-center">Nenhum restaurante encontrado</div>
                       )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ListaRestaurantes;