type CardProps = {
  foto: string;
  nome: string;
  resumo: string;
};

export function CardProfissional({ foto, nome, resumo }: CardProps) {
  return (
    <div className="bg-yellow-100 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col items-center text-center h-full">
      <img
        src={foto}
        alt={`Foto de ${nome}`}
        className="w-28 h-28 object-cover rounded-full mb-4 border-4 border-white shadow"
      />
      <h3 className="text-xl font-semibold text-red-700 mb-2">{nome}</h3>
      <p className="text-gray-700 text-sm leading-relaxed">{resumo}</p>
    </div>
  );
}
