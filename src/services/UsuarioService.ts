import axios from "axios";
import UsuarioLogin from "../models/UsuarioLogin";

// Criação da instância com baseURL do .env
const api = axios.create({
  baseURL: "https://delivery-r4py.onrender.com"
});

// ✅ Cadastro de novo usuário (sem autenticação)
export const cadastrarUsuario = async <T>(
  url: string,
  dados: T,
  setDados: (resposta: T) => void
): Promise<void> => {
  const resposta = await api.post(url, dados);
  setDados(resposta.data);
};

// ✅ Login (com retorno do token no body)
export const login = async (
  url: string,
  dados: UsuarioLogin,
  setDados: (resposta: UsuarioLogin) => void
): Promise<void> => {
  const resposta = await api.post(url, dados);
  setDados(resposta.data);
};

// ✅ GET autenticado
export const consultar = async <T>(
  url: string,
  setDados: (resposta: T) => void,
  header: object
): Promise<void> => {
  const resposta = await api.get(url, header);
  setDados(resposta.data);
};

// ✅ POST autenticado
export const cadastrar = async <T>(
  url: string,
  dados: T,
  setDados: (resposta: T) => void,
  header: object
): Promise<void> => {
  const resposta = await api.post(url, dados, header);
  setDados(resposta.data);
};

// ✅ PUT autenticado
export const atualizar = async <T>(
  url: string,
  dados: T,
  setDados: (resposta: T) => void,
  header: object
): Promise<void> => {
  const resposta = await api.put(url, dados, header);
  setDados(resposta.data);
};

// ✅ DELETE autenticado
export const deletar = async (
  url: string,
  header: object
): Promise<void> => {
  await api.delete(url, header);
};
