import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { atualizar, buscar, cadastrar } from '../../../services/Service';
import { useNavigate, useParams } from 'react-router-dom';
import Restaurante from '../../../models/Restaurante';
import { AuthContext } from '../../../contexts/AuthContext';
import { RotatingLines } from 'react-loader-spinner';
import { ToastAlerta } from '../../../utils/ToastAlerta';
import { formatarHorarioCompleto } from '../../../utils/FormatarHorario';


function FormRestaurante() {
    const navigate = useNavigate();
    const [restaurante, setRestaurante] = useState<Restaurante>({
        id: null,
        razaoSocial: '',
        cpf: '',
        endereco: '',
        horarioAbertura: '',
        horarioFechamento: ''
    });

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;
    const { id } = useParams<{ id: string }>();

    async function buscarPorId(id: string) {
        try {
            await buscar(`/restaurantes/${id}`, (dados: Restaurante) => {
                const restauranteConvertido: Restaurante = {
                    ...dados,
                    horarioAbertura: (dados.horarioAbertura || '').substring(0, 5),
                    horarioFechamento: (dados.horarioFechamento || '').substring(0, 5)
                };
                setRestaurante(restauranteConvertido);
            }, {
                headers: { Authorization: token }
            });
        } catch (error: any) {
            if (error.toString().includes('403')) {
                handleLogout();
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            ToastAlerta("Você precisa estar logado!", "aviso");
            navigate('/');
        }
    }, [token]);

    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id);
        }
    }, [id]);

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setRestaurante({
            ...restaurante,
            [name]: value,
        });
    }

    function retornar() {
        navigate("/restaurantes");
    }

    function validarCPF(cpf: string): boolean {
        const cpfLimpo = cpf.replace(/\D/g, '');
        return cpfLimpo.length === 11;
    }

    function validarHorario(horario: string): boolean {
        const regex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
        return regex.test(horario);
    }

    function formatarCPFVisual(cpf: string): string {
        const numeros = cpf.replace(/\D/g, '');
        if (numeros.length <= 11) {
            return numeros.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
        }
        return numeros.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    }

    function handleCPFChange(e: ChangeEvent<HTMLInputElement>) {
        const valor = e.target.value;
        const apenasNumeros = valor.replace(/\D/g, '');
        const limitado = apenasNumeros.slice(0, 14);
        setRestaurante({
            ...restaurante,
            cpf: limitado
        });
    }

    async function gerarNovoRestaurante(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!restaurante.razaoSocial?.trim()) {
            ToastAlerta("Nome do restaurante é obrigatório!", "aviso");
            return;
        }

        if (!restaurante.cpf?.trim()) {
            ToastAlerta("CPF/CNPJ é obrigatório!", "aviso");
            return;
        }

        if (!restaurante.endereco?.trim()) {
            ToastAlerta("Endereço é obrigatório!", "aviso");
            return;
        }

        if (!restaurante.horarioAbertura?.trim()) {
            ToastAlerta("Horário de abertura é obrigatório!", "aviso");
            return;
        }

        if (!restaurante.horarioFechamento?.trim()) {
            ToastAlerta("Horário de fechamento é obrigatório!", "aviso");
            return;
        }

        if (!validarCPF(restaurante.cpf)) {
            ToastAlerta("CPF deve ter 11 dígitos!", "aviso");
            return;
        }

        if (!validarHorario(restaurante.horarioAbertura)) {
            ToastAlerta("Horário de abertura deve estar no formato HH:MM!", "aviso");
            return;
        }

        if (!validarHorario(restaurante.horarioFechamento)) {
            ToastAlerta("Horário de fechamento deve estar no formato HH:MM!", "aviso");
            return;
        }

        setIsLoading(true);

        const dadosParaEnvio = {
            razaoSocial: restaurante.razaoSocial.trim(),
            cpf: restaurante.cpf.replace(/\D/g, ''),
            endereco: restaurante.endereco.trim(),
            horarioAbertura: formatarHorarioCompleto(restaurante.horarioAbertura),
            horarioFechamento: formatarHorarioCompleto(restaurante.horarioFechamento)
        };

        try {
            if (id !== undefined) {
                await atualizar(`/restaurantes`, { ...dadosParaEnvio, id: parseInt(id) }, setRestaurante, {
                    headers: { 'Authorization': token }
                });
                ToastAlerta("O Restaurante foi atualizado com sucesso!", "sucesso");
            } else {
                await cadastrar(`/restaurantes`, dadosParaEnvio, setRestaurante, {
                    headers: { 'Authorization': token }
                });
                ToastAlerta("O Restaurante foi cadastrado com sucesso!", "sucesso");
            }

            retornar();
        } catch (error: any) {
            if (error.toString().includes('403')) {
                handleLogout();
            } else {
                let mensagemErro = "Erro ao salvar restaurante!";
                if (error.response?.data) {
                    const data = error.response.data;
                    mensagemErro = data.message || data.error || data.details || mensagemErro;
                } else if (error.message) {
                    mensagemErro = error.message;
                }
                ToastAlerta(mensagemErro, "erro");
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="pb-12 pt-2 bg-yellow-50 flex flex-col items-center justify-center mx-auto">
            <h1 className="text-4xl text-center my-8 font-bold text-red-700 mb-4">
                {id === undefined ? 'Cadastrar Restaurante' : 'Editar Restaurante'}
            </h1>

            <form className="bg-white p-8 rounded shadow-md w-full max-w-xl" onSubmit={gerarNovoRestaurante}>
                <div className="flex flex-col gap-2 mb-4">
                    <label htmlFor="razaoSocial">Nome do Restaurante *</label>
                    <input
                        type="text"
                        placeholder="Nome do restaurante"
                        name='razaoSocial'
                        className="border-2 border-slate-700 rounded p-2"
                        value={restaurante.razaoSocial || ''}
                        onChange={atualizarEstado}
                        required
                        maxLength={100}
                    />
                </div>

                <div className="flex flex-col gap-2 mb-4">
                    <label htmlFor="cpf">CPF/CNPJ *</label>
                    <input
                        type="text"
                        placeholder="000.000.000-00 ou 00.000.000/0000-00"
                        name='cpf'
                        className="border-2 border-slate-700 rounded p-2"
                        value={formatarCPFVisual(restaurante.cpf || '')}
                        onChange={handleCPFChange}
                        required
                        maxLength={18}
                    />
                    <small className="text-gray-600">
                        Digite apenas números. A formatação será feita automaticamente.
                    </small>
                </div>

                <div className="flex flex-col gap-2 mb-4">
                    <label htmlFor="endereco">Endereço do Restaurante *</label>
                    <input
                        type="text"
                        placeholder="Rua, número, bairro, cidade"
                        name='endereco'
                        className="border-2 border-slate-700 rounded p-2"
                        value={restaurante.endereco || ''}
                        onChange={atualizarEstado}
                        required
                        maxLength={200}
                    />
                </div>

                <div className="flex flex-col gap-2 mb-4">
                    <label htmlFor="horarioAbertura">Horário de Abertura *</label>
                    <input
                        type="time"
                        name="horarioAbertura"
                        className="border-2 border-slate-700 rounded p-2"
                        value={restaurante.horarioAbertura || ""}
                        onChange={atualizarEstado}
                        required
                    />
                </div>

                <div className="flex flex-col gap-2 mb-4">
                    <label htmlFor="horarioFechamento">Horário de Fechamento *</label>
                    <input
                        type="time"
                        name="horarioFechamento"
                        className="border-2 border-slate-700 rounded p-2"
                        value={restaurante.horarioFechamento || ""}
                        onChange={atualizarEstado}
                        required
                    />
                </div>

                <div className='flex gap-4 mt-6'>
                    <button
                        type="button"
                        className="rounded text-slate-100 bg-gray-600 hover:bg-gray-400 w-1/2 py-2 flex justify-center"
                        onClick={retornar}>
                        Voltar
                    </button>

                    <button
                        className="rounded text-slate-100 bg-red-800 hover:bg-red-400 w-1/2 py-2 flex justify-center"
                        type="submit"
                        disabled={isLoading}>
                        {isLoading ?
                            <RotatingLines strokeColor="white" strokeWidth="5" animationDuration="0.75" width="24" visible={true} />
                            :
                            <span>{id === undefined ? 'Cadastrar' : 'Atualizar'}</span>
                        }
                    </button>
                </div>
            </form>
        </div>
    );
}

export default FormRestaurante;
