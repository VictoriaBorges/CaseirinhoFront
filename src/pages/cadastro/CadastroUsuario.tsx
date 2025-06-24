import { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { cadastrarUsuario } from '../../services/UsuarioService';
import Usuario from '../../models/Usuario';
import { ToastAlerta } from '../../utils/ToastAlerta';

export default function CadastroUsuario() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState<Usuario>({
    nome: '',
    usuario: '',
    senha: '',
    foto: ''
  });

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    });
  }

  async function cadastrar(e: FormEvent) {
    e.preventDefault();
    try {
      await cadastrarUsuario('/usuarios/cadastrar', usuario, () => {});
      ToastAlerta('Usuário cadastrado com sucesso!', 'sucesso');
      navigate('/login');
    } catch (err) {
      ToastAlerta('Erro ao cadastrar usuário!', 'erro');
    }
  }

  return (
    <section className="flex justify-center items-center min-h-screen bg-yellow-50 px-4">
      <form onSubmit={cadastrar} className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-red-600 mb-6 text-center">Cadastre-se no Caseirinho+</h2>

        <label className="text-sm text-gray-600">Nome completo</label>
        <input type="text" name="nome" placeholder="Seu nome" onChange={atualizarEstado} className="border border-gray-300 p-2 w-full mb-4 rounded-md shadow-sm" />

        <label className="text-sm text-gray-600">Usuário (e-mail)</label>
        <input type="text" name="usuario" placeholder="seu@email.com" onChange={atualizarEstado} className="border border-gray-300 p-2 w-full mb-4 rounded-md shadow-sm" />

        <label className="text-sm text-gray-600">Senha</label>
        <input type="password" name="senha" placeholder="********" onChange={atualizarEstado} className="border border-gray-300 p-2 w-full mb-4 rounded-md shadow-sm" />

        <label className="text-sm text-gray-600">Foto (opcional)</label>
        <input type="text" name="foto" placeholder="URL da imagem" onChange={atualizarEstado} className="border border-gray-300 p-2 w-full mb-6 rounded-md shadow-sm" />

        <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded-md transition duration-300">
          Cadastrar
        </button>

        <p className="mt-4 text-sm text-center text-gray-600">
          Já tem conta? <a href="/login" className="text-red-500 hover:underline">Entrar</a>
        </p>
      </form>
    </section>
  );
}
