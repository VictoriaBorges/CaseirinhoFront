// src/pages/Login.tsx
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import UsuarioLogin from "../../models/UsuarioLogin";

export default function Login() {
  const navigate = useNavigate();
  const { handleLogin } = useContext(AuthContext);

  const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>({
    id: null,
    nome: "",
    usuario: "",
    senha: "",
    foto: "",
    token: "",
  });

  function atualizarEstado(e: React.ChangeEvent<HTMLInputElement>) {
    setUsuarioLogin({
      ...usuarioLogin,
      [e.target.name]: e.target.value,
    });
  }

  async function enviarFormulario(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await handleLogin(usuarioLogin);
    navigate("/produtos");
  }

  return (
    <section className="bg-yellow-50 min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={enviarFormulario}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-bold text-red-700 mb-6 text-center">Entrar no Caseirinho+</h1>

        <input
          type="text"
          name="usuario"
          placeholder="Usuário"
          value={usuarioLogin.usuario}
          onChange={atualizarEstado}
          className="w-full p-3 mb-4 border border-gray-300 rounded"
          required
        />

        <input
          type="password"
          name="senha"
          placeholder="Senha"
          value={usuarioLogin.senha}
          onChange={atualizarEstado}
          className="w-full p-3 mb-4 border border-gray-300 rounded"
          required
        />

        <button
          type="submit"
          className="bg-red-600 text-white w-full py-3 rounded hover:bg-red-700 transition"
        >
          Entrar
        </button>

        <p className="text-sm mt-4 text-center text-gray-600">
          Ainda não tem conta?{" "}
          <a href="/cadastrar" className="text-red-600 font-bold hover:underline">
            Cadastre-se
          </a>
        </p>
      </form>
    </section>
  );
}

