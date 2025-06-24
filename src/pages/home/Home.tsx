import { useNavigate } from "react-router-dom";
import { FaUtensils, FaMotorcycle, FaPercent } from "react-icons/fa";
import Footer from "../../components/footer/Footer";

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      {/* Hero Section */}
      <section className="min-h-screen bg-red-600 text-white flex flex-col justify-center items-center px-4 text-center py-24">
        <h1 className="text-4xl md:text-5xl font-light mb-8 leading-snug">
          Se tem <span className="font-bold">Caseirinho+</span>, tem comida de verdade!
        </h1>

        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <button
            onClick={() => navigate("/login")}
            className="px-8 py-3 bg-yellow-300 text-red-800 font-semibold text-lg rounded-full shadow hover:bg-yellow-400 transition"
          >
            Entrar
          </button>

          <button
            onClick={() => navigate("/cadastrar")}
            className="px-8 py-3 bg-white text-red-700 font-semibold text-lg rounded-full shadow border-2 border-yellow-300 hover:bg-yellow-100 transition"
          >
            Cadastrar-se
          </button>
        </div>
      </section>

      {/* Informações */}
      <section className="bg-white py-16 px-4 text-center">
        <h2 className="text-3xl font-bold text-red-700 mb-12">
          O que você vai encontrar:
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto text-red-600">
          <div className="flex flex-col items-center">
            <FaUtensils size={50} className="mb-4" />
            <h3 className="text-xl font-semibold mb-2">Pratos caseiros e variados</h3>
            <p className="text-gray-600 max-w-xs">
              Comida feita com carinho e sabor de casa, para todos os gostos.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <FaMotorcycle size={50} className="mb-4" />
            <h3 className="text-xl font-semibold mb-2">Entrega rápida</h3>
            <p className="text-gray-600 max-w-xs">
              Receba seu prato preferido quentinho e sem demora.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <FaPercent size={50} className="mb-4" />
            <h3 className="text-xl font-semibold mb-2">Promoções diárias</h3>
            <p className="text-gray-600 max-w-xs">
              Descontos exclusivos para economizar com qualidade.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}


