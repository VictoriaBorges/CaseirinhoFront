import { useEffect, useState } from "react";
import EquipeCarrossel from "../equipe/EquipeCarrossel";
import FeedbackClientes from "../feedback/FeedbackClientes";
import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";
import { Award, ChefHat, Clock, Users } from "lucide-react";

export default function SobreRestaurante() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  const stats = [
    { icon: Users, value: "1000+", label: "Clientes Satisfeitos" },
    { icon: Clock, value: "30min", label: "Entrega Média" },
    { icon: Award, value: "4.8★", label: "Avaliação Média" },
    { icon: ChefHat, value: "50+", label: "Pratos Únicos" },
  ];

  return (
    <div className="bg-yellow-50 min-h-screen flex flex-col overflow-x-hidden">
      <Navbar />

      <main className="flex-1 p-6 pt-24 flex flex-col items-center max-w-7xl mx-auto w-full">
        {/* BLOCO PRINCIPAL */}
        <section
          className={`bg-white border-2 border-yellow-300 rounded-3xl shadow-lg p-10 max-w-5xl w-full text-center transform transition-all duration-1000 ease-in-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-4xl sm:text-5xl font-extrabold text-red-600 mb-8 tracking-tight">
            Sobre o Caseirinho+
          </h2>

          <p className="text-gray-700 mb-6 text-lg leading-relaxed transition-opacity duration-1000 delay-100">
            O <span className="text-red-700 font-semibold">Caseirinho+</span> nasceu da vontade de
            aproximar pessoas da verdadeira comida caseira, feita com carinho e tradição.{" "}
            <span role="img" aria-label="comida e brilho">
              🍽️✨
            </span>
          </p>

          <p className="text-gray-700 mb-6 text-lg leading-relaxed transition-opacity duration-1000 delay-200">
            No dia a dia corrido, é difícil encontrar refeições com aquele verdadeiro{" "}
            <span className="font-semibold">sabor de casa</span>. Nosso objetivo é resolver isso!
          </p>

          <div className="bg-yellow-100 rounded-2xl p-6 my-8 transition-opacity duration-1000 delay-300">
            <ul className="list-disc list-inside text-left text-gray-800 text-lg leading-relaxed space-y-3">
              <li>
                <strong>Pratos caseiros e variados</strong>, pensados para todos os gostos;
              </li>
              <li>
                <strong>Entrega rápida</strong>, para receber sua refeição ainda quentinha;
              </li>
              <li>
                <strong>Promoções diárias</strong>, para economizar sem abrir mão da qualidade.
              </li>
            </ul>
          </div>

          <p className="text-gray-700 text-lg leading-relaxed transition-opacity duration-1000 delay-400">
            Queremos apoiar pequenos e médios restaurantes, fortalecendo a gastronomia local e
            proporcionando uma experiência acolhedora para quem sente saudade do tempero especial.
          </p>
        </section>

        {/* BLOCO DE ESTATÍSTICAS */}
        <section
          className={`mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-5xl transform transition-all duration-1000 ease-in-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`bg-white border border-yellow-300 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:scale-105 p-6 flex flex-col items-center text-center delay-${index * 100}`}
              style={{
                transitionDelay: `${200 + index * 100}ms`,
              }}
            >
              <stat.icon className="h-10 w-10 text-red-600 mb-2" />
              <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </div>
          ))}
        </section>
      </main>

      <EquipeCarrossel />
      <FeedbackClientes />
      <Footer />
    </div>
  );
}
