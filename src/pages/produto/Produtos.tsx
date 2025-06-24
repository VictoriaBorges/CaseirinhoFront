import { useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate, Link } from 'react-router-dom';
import Produto from "../../models/Produto";
import UsuarioLogin from "../../models/UsuarioLogin";
import { usuarioEstaLogado } from "../../utils/usuarioLogado";

import Navbar from "../../components/navbar/Navbar"; 
import { consultar } from "../../services/UsuarioService";
import { deletar } from "../../services/Service";
import Footer from "../../components/footer/Footer";

// Componente de Loading Skeleton
const ProductSkeleton = () => (
  <div className="bg-white shadow-md rounded-lg p-4 animate-pulse">
    <div className="h-40 w-full bg-gray-200 rounded mb-4"></div>
    <div className="h-6 bg-gray-200 rounded mb-2"></div>
    <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
    <div className="h-5 bg-gray-200 rounded mb-3 w-1/2"></div>
    <div className="flex justify-around mt-3 gap-2">
      <div className="h-8 bg-gray-200 rounded w-full"></div>
      <div className="h-8 bg-gray-200 rounded w-full"></div>
    </div>
  </div>
);

// Componente de Card de Produto melhorado
const ProductCard = ({ produto }: { produto: Produto }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => setImageLoaded(true);
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setImageError(true);
    e.currentTarget.src = "/default-food.jpg";
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
      {/* Container da imagem com loading state */}
      <div className="relative mb-4 overflow-hidden rounded-lg">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg"></div>
        )}
        <img
          src={produto.foto}
          alt={produto.nomeProduto}
          onLoad={handleImageLoad}
          onError={handleImageError}
          className={`h-48 w-full object-cover rounded-lg transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
        {/* Badge de categoria ou promoção - opcional */}
        <div className="absolute top-2 right-2 bg-red-700 text-white px-2 py-1 rounded-full text-xs font-semibold">
          Novo
        </div>
      </div>

      {/* Informações do produto */}
      <div className="space-y-2">
        <h3 className="text-xl font-bold text-red-700 line-clamp-2 min-h-[3rem]">
          {produto.nomeProduto}
        </h3>
        
        <div className="flex items-center justify-center text-gray-600 text-sm">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 11-2 0V5H5v10h4a1 1 0 110 2H4a1 1 0 01-1-1V4z"/>
            <path d="M15 8a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
          <span>Porção: {produto.porcao}</span>
        </div>

        <div className="flex items-center justify-center">
          <span className="text-2xl font-bold text-green-600">
            R$ {produto.preco.toLocaleString('pt-BR', { 
              minimumFractionDigits: 2, 
              maximumFractionDigits: 2 
            })}
          </span>
        </div>
      </div>

      {/* Botões de ação */}
      <div className="flex gap-2 mt-4">
        <Link to={`/editar-produto/${produto.id}`} className="flex-1">
          <button className="w-full px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors duration-200 flex items-center justify-center gap-2 font-medium">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Editar
          </button>
        </Link>
        
        <Link to={`/deletar-produto/${produto.id}`} className="flex-1">
          <button className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 flex items-center justify-center gap-2 font-medium">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Deletar
          </button>
        </Link>
      </div>
    </div>
  );
};

// Componente principal melhorado
export default function Produtos() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  // Memoizar o usuário logado para evitar parsing desnecessário
  const usuarioLogado: UsuarioLogin = useMemo(() => 
    JSON.parse(localStorage.getItem("usuarioLogado") || "{}"), 
    []
  );

  // Função para buscar produtos com melhor tratamento de erro
  const buscarProdutos = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      
      await consultar('/produtos', setProdutos, {
        headers: {
          Authorization: usuarioLogado.token
        }
      });
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      setError("Erro ao carregar produtos. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }, [usuarioLogado.token]);

  useEffect(() => {
    if (!usuarioEstaLogado()) {
      navigate("/login");
    } else {
      buscarProdutos();
    }
  }, [navigate, buscarProdutos]);

  const handleCadastrarProduto = () => {
    navigate("/produtos/cadastrar");
  };

  const handleRetry = () => {
    buscarProdutos();
  };

  return (
    <>
      <Navbar />
      <section className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 p-8 pt-20">
        <div className="max-w-7xl mx-auto">
          {/* Header melhorado */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-red-700 mb-2">
                Nossos Produtos
              </h2>
              <p className="text-gray-600">
                {loading ? "Carregando..." : `${produtos.length} produtos encontrados`}
              </p>
            </div>
            
            <button
              title="Cadastrar novo produto"
              className="bg-red-700 hover:bg-red-800 text-white rounded-full w-14 h-14 flex items-center justify-center text-2xl font-bold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              onClick={handleCadastrarProduto}
            >
              +
            </button>
          </div>

          {/* Estados de loading, erro e conteúdo */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, index) => (
                <ProductSkeleton key={index} />
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
                <div className="text-red-600 mb-4">
                  <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-red-800 mb-2">Ops! Algo deu errado</h3>
                <p className="text-red-600 mb-4">{error}</p>
                <button
                  onClick={handleRetry}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Tentar novamente
                </button>
              </div>
            </div>
          ) : produtos.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Nenhum produto encontrado</h3>
              <p className="text-gray-500 mb-4">Que tal cadastrar o primeiro produto?</p>
              <button
                onClick={handleCadastrarProduto}
                className="bg-red-700 hover:bg-red-800 text-white px-6 py-3 rounded-lg transition-colors font-medium"
              >
                Cadastrar Produto
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {produtos.map((produto) => (
                <ProductCard key={produto.id} produto={produto} />
              ))}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}

