import { Link } from 'react-router-dom';
import Restaurante from '../../../models/Restaurante';
import { DateTime } from 'luxon';

interface CardRestaurantesProps {
    restaurante: Restaurante;
}

// Função auxiliar para verificar se o restaurante está aberto (com base na hora de Brasília)
function verificarSeAberto(horarioAbertura: string, horarioFechamento: string): boolean {
    if (!horarioAbertura || !horarioFechamento) return false;

    const agora = DateTime.now().setZone('America/Sao_Paulo');
    const horaAtual = agora.toFormat('HH:mm');

    const abertura = DateTime.fromFormat(horarioAbertura.substring(0, 5), 'HH:mm', { zone: 'America/Sao_Paulo' });
    const fechamento = DateTime.fromFormat(horarioFechamento.substring(0, 5), 'HH:mm', { zone: 'America/Sao_Paulo' });

    // Caso o fechamento seja no dia seguinte (ex: 22:00 até 02:00)
    if (fechamento < abertura) {
        return agora >= abertura || agora <= fechamento;
    }

    return agora >= abertura && agora <= fechamento;
}

function CardRestaurantes({ restaurante }: CardRestaurantesProps) {
    const estaAberto = verificarSeAberto(restaurante.horarioAbertura, restaurante.horarioFechamento);

    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
            <header className="py-3 px-6 bg-red-800 text-white font-bold text-xl text-center">
                Restaurante
            </header>

            <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                    {restaurante.razaoSocial}
                </h2>

                <div className="flex justify-between items-start mb-6 gap-4">
                    <div className="flex-1">
                        <p className="text-gray-600 mb-2 text-sm font-medium">Endereço:</p>
                        <p className="text-gray-800 mb-3">{restaurante.endereco}</p>

                        <p className="text-sm font-medium text-gray-600 mb-1">Status:</p>
                        <p className={`font-bold text-sm ${estaAberto ? "text-green-600" : "text-red-600"}`}>
                            {estaAberto ? "Aberto" : "Fechado"}
                        </p>
                    </div>

                    <div className="text-right">
                        <p className="text-sm font-medium text-gray-600 mb-2">Horário:</p>
                        <div className="text-gray-800 text-sm">
                            <p>Abertura: {restaurante.horarioAbertura?.substring(0, 5) || "N/A"}</p>
                            <p>Fechamento: {restaurante.horarioFechamento?.substring(0, 5) || "N/A"}</p>
                        </div>
                    </div>
                </div>

                <div className="flex gap-3">
                    <Link to={`/editarrestaurante/${restaurante.id}`} className="flex-1">
                        <button className="w-full py-2 px-4 bg-amber-500 text-white font-medium rounded-md hover:bg-amber-600 transition-colors duration-200">
                            Editar
                        </button>
                    </Link>

                    <Link to={`/deletarrestaurante/${restaurante.id}`} className="flex-1">
                        <button className="w-full py-2 px-4 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition-colors duration-200">
                            Deletar
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default CardRestaurantes;
