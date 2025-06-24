import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import Restaurante from "../../models/Restaurante";
import UsuarioLogin from "../../models/UsuarioLogin";
import Produto from "../../models/Produto";

function CadastrarProduto() {
  const [produto, setProduto] = useState<Produto>({
    id: null,
    nomeProduto: "",
    foto: "",
    porcao: 1,
    preco: 0,
    quantidadeVendida: 0,
    restaurante: {} as Restaurante,
  });

  const [restaurantes, setRestaurantes] = useState<Restaurante[]>([]);
  const navigate = useNavigate();

  const usuarioLogado: UsuarioLogin = JSON.parse(
    localStorage.getItem("usuarioLogado") || "{}"
  );

  useEffect(() => {
    buscarRestaurantes();
  }, []);

  async function buscarRestaurantes() {
    try {
      const resposta = await api.get("/restaurantes", {
        headers: { Authorization: usuarioLogado.token },
      });
      setRestaurantes(resposta.data);
    } catch (error) {
      console.error("Erro ao buscar restaurantes:", error);
    }
  }

  function atualizarEstado(e: React.ChangeEvent<HTMLInputElement>) {
    setProduto({
      ...produto,
      [e.target.name]: e.target.type === "number" ? Number(e.target.value) : e.target.value,
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

  async function cadastrarProduto(e: React.FormEvent) {
    e.preventDefault();
    try {
      await api.post("/produtos", produto, {
        headers: { Authorization: usuarioLogado.token },
      });
      alert("Produto cadastrado com sucesso!");
      navigate("/produtos");
    } catch (error) {
      console.error("Erro ao cadastrar produto:", error);
      alert("Erro ao cadastrar produto");
    }
  }

  return (
    <section className="min-h-screen bg-yellow-50 p-8 pt-20">
      <h2 className="text-2xl font-bold text-red-700 mb-6 text-center">
        Cadastrar Novo Produto
      </h2>

      <form
        onSubmit={cadastrarProduto}
        className="bg-white rounded shadow-md p-6 max-w-xl mx-auto"
      >
        <input
          type="text"
          name="nomeProduto"
          placeholder="Nome do produto"
          value={produto.nomeProduto}
          onChange={atualizarEstado}
          className="w-full p-2 border mb-4"
          required
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
          required
        />

        <input
          type="number"
          name="preco"
          placeholder="Preço"
          value={produto.preco}
          onChange={atualizarEstado}
          className="w-full p-2 border mb-4"
          step="0.01"
          required
        />

        <select
          name="restaurante"
          value={produto.restaurante?.id ?? ""}
          onChange={selecionarRestaurante}
          className="w-full p-2 border mb-6"
          required
        >
          <option value="">Selecione um restaurante</option>
          {restaurantes.map((rest) => (
            <option key={rest.id} value={rest.id}>
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
            Cadastrar
          </button>
        </div>
      </form>
    </section>
  );
}

export default CadastrarProduto;

