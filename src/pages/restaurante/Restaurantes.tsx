import { useLocation, useNavigate } from "react-router-dom";

import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import ListaRestaurantes from "../../components/restaurantes/listaRestaurante/ListaRestaurante";

export default function Restaurantes() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const cidade = params.get("local");

  const navigate = useNavigate();

  function handleCadastrarRestaurante() {
    navigate("/cadastrarrestaurante");
  }

  return (
    <>
      <Navbar />
      <section className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 p-8 pt-20">
        <div className="max-w-7xl mx-auto">
          {/* Header melhorado */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-red-700 mb-2">
                Nossos Restaurantes
              </h2>
              <div className="text-gray-600">
                {cidade ? (
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span>
                      Restaurantes em: <strong className="text-red-700">{cidade}</strong>
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Exibindo todos os restaurantes</span>
                  </div>
                )}
              </div>
            </div>

            <button
              title="Cadastrar novo restaurante"
              className="bg-red-700 hover:bg-red-800 text-white rounded-full w-14 h-14 flex items-center justify-center text-2xl font-bold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              onClick={handleCadastrarRestaurante}
            >
              +
            </button>
          </div>

          {/* Filtro de localização melhorado */}
          {cidade && (
            <div className="mb-6">
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 inline-flex items-center gap-3">
                <div className="bg-red-100 p-2 rounded-full">
                  <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Filtrado por localização:</span>
                  <div className="font-semibold text-red-700">{cidade}</div>
                </div>
                <button
                  onClick={() => navigate('/restaurantes')}
                  className="ml-4 text-gray-400 hover:text-gray-600 transition-colors"
                  title="Remover filtro"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* Lista de Restaurantes */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <ListaRestaurantes />
          </div>

          {/* Seção de ações rápidas removida */}
          {/* <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"> ... </div> */}
        </div>
      </section>
      <Footer />
    </>
  );
}
