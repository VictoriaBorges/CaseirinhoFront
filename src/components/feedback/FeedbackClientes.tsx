import { Quote } from "lucide-react";

export default function FeedbackClientes() {
  const depoimentos = [
    {
      nome: "Carlos Silva",
      restaurante: "Sabor de Casa",
      comentario:
        "O Caseirinho+ ajudou meu restaurante a alcançar novos clientes! A plataforma é simples e eficiente.",
      nota: 5,
    },
    {
      nome: "Ana Souza",
      restaurante: "Delícias da Vó",
      comentario:
        "Simplesmente sensacional! Aumentei meu faturamento e conquistei clientes fiéis.",
      nota: 5,
    },
    {
      nome: "Marcos Lima",
      restaurante: "Comida de Verdade",
      comentario:
        "Parceria que deu certo! O suporte da equipe Caseirinho+ faz toda a diferença no dia a dia.",
      nota: 4,
    },
  ];

  return (
    <section className="bg-yellow-50 py-20 px-4 mt-12">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-red-700 mb-12">
          O que estão falando sobre o Caseirinho+
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {depoimentos.map((dep, index) => (
            <div
              key={index}
              className="bg-white border-2 border-yellow-300 p-8 rounded-3xl shadow-md hover:shadow-xl transition-transform duration-300 transform hover:-translate-y-2 flex flex-col items-center text-center h-full"
            >
              <div className="flex mb-3">
                {Array.from({ length: dep.nota }).map((_, idx) => (
                  <span key={idx} className="text-yellow-400 text-xl" aria-label="Estrela">
                    ★
                  </span>
                ))}
              </div>

              <Quote className="text-red-200 w-10 h-10 mb-4" aria-hidden="true" />

              <p className="text-gray-700 mb-6 italic text-base leading-relaxed">
                "{dep.comentario}"
              </p>

              <div className="mt-auto">
                <p className="font-bold text-red-700 text-lg">{dep.nome}</p>
                <p className="text-sm text-gray-500">{dep.restaurante}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
