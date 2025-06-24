import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import Produto from "../../models/Produto";
import Restaurante from "../../models/Restaurante";
import UsuarioLogin from "../../models/UsuarioLogin";

export default function EditarProduto() {
  const [produto, setProduto] = useState<Produto>({
    id: null,
    nomeProduto: "",
    foto: "",
    porcao: 1,
    preco: 0,
    quantidadeVendida: 0,
    restaurante: {
      id: null,
      razaoSocial: "",
      cpf: "",
      endereco: "",
      status: "",

    },
  });

  const [restaurantes, setRestaurantes] = useState<Restaurante[]>([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const usuarioLogado: UsuarioLogin = JSON.parse(localStorage.getItem("usuarioLogado") || "{}");

  useEffect(() => {
    if (!usuarioLogado.token) {
      navigate("/login");
    }

    if (id) {
      buscarProdutoPorId(Number(id));
    }

    buscarRestaurantes();
  }, [id]);

  async function buscarProdutoPorId(id: number) {
    try {
      const resposta = await api.get(`/produtos/${id}`, {
        headers: { Authorization: usuarioLogado.token }
      });
      setProduto(resposta.data);
    } catch (error) {
      console.error("Erro ao carregar produto:", error);
    }
  }

  async function buscarRestaurantes() {
    try {
      const resposta = await api.get("/restaurantes", {
        headers: { Authorization: usuarioLogado.token }
      });
      setRestaurantes(resposta.data);
    } catch (error) {
      console.error("Erro ao carregar restaurantes:", error);
    }
  }

  function atualizarEstado(e: React.ChangeEvent<HTMLInputElement>) {
    setProduto({
      ...produto,
      [e.target.name]: e.target.value,
    });
  }

  function selecionarRestaurante(e: React.ChangeEvent<HTMLSelectElement>) {
    const restauranteSelecionado = restaurantes.find(
      (rest) => rest.id === parseInt(e.target.value)
    );

    if (restauranteSelecionado) {
      setProduto({
        ...produto,
        restaurante: restauranteSelecionado,
      });
    }
  }

  async function atualizarProduto(e: React.FormEvent) {
    e.preventDefault();
    try {
      await api.put("/produtos", produto, {
        headers: { Authorization: usuarioLogado.token }
      });
      alert("Produto atualizado com sucesso!");
      navigate("/produtos");
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
      alert("Erro ao atualizar produto");
    }
  }

  return (
    
    <section className="min-h-screen bg-yellow-50 p-8 pt-20">
  <div className="text-center mb-8">
    <h1 className="text-4xl font-bold text-red-700">Editar Produtos</h1>
  </div>

  <div className="flex items-center justify-center">
      <form onSubmit={atualizarProduto} className="bg-white p-8 rounded shadow-md w-full max-w-xl">
        
        

        <input
          type="text"
          name="nomeProduto"
          placeholder="Nome do produto"
          value={produto.nomeProduto}
          onChange={atualizarEstado}
          className="w-full p-2 border mb-4"
        />

        <input
          type="text"
          name="foto"
          placeholder="URL da imagem"
          value={produto.foto}
          onChange={atualizarEstado}
          className="w-full p-2 border mb-4"
        />

        <input
          type="number"
          name="porcao"
          placeholder="Porção"
          value={produto.porcao}
          onChange={atualizarEstado}
          className="w-full p-2 border mb-4"
        />

        <input
          type="number"
          name="preco"
          placeholder="Preço"
          value={produto.preco}
          onChange={atualizarEstado}
          className="w-full p-2 border mb-4"
        />

        <select
          name="restaurante"
          value={produto.restaurante?.id || ""}
          onChange={selecionarRestaurante}
          className="w-full p-2 border mb-6"
        >
          <option value="">Selecione um restaurante</option>
          {restaurantes.map((rest) => (
            <option key={rest.id} value={produto.restaurante?.id ?? ""}>
              {rest.razaoSocial}
            </option>
          ))}
        </select>
        <div className='flex gap-10'>



          <span className="rounded text-slate-100 bg-red-800 
                               hover:bg-red-400 w-1/2 py-2 mx-auto flex justify-center mt-5 "
            onClick={() => navigate("/produtos")}>
            Voltar
          </span>
          <button
            type="submit"
            className="rounded text-slate-100 bg-red-800 
                               hover:bg-red-400 w-1/2 py-2 mx-auto flex justify-center mt-5"
          >
            Atualizar
          </button>
        </div>
      </form>
      </div>
    </section>
  );
}

