// src/components/contexts/AuthContext.tsx
import { createContext, ReactNode, useState } from "react";
import UsuarioLogin from "../models/UsuarioLogin";
import {  login } from "../services/UsuarioService";
import { ToastAlerta } from "../utils/ToastAlerta";

interface AuthContextProps {
  usuario: UsuarioLogin;
  handleLogin: (dados: UsuarioLogin) => Promise<void>;
  handleLogout: () => void;
  isLoading: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: AuthProviderProps) {
  const [usuario, setUsuario] = useState<UsuarioLogin>(() => {
    const storage = localStorage.getItem("usuarioLogado");
    return storage
      ? JSON.parse(storage)
      : { id: null, nome: "", usuario: "", senha: "", foto: "", token: "" };
  });

  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin(dadosLogin: UsuarioLogin) {
    setIsLoading(true);
    try {
      await login("/usuarios/logar", dadosLogin, (resposta: UsuarioLogin) => {
        setUsuario(resposta);
        localStorage.setItem("usuarioLogado", JSON.stringify(resposta));
        ToastAlerta("Login realizado com sucesso!", "sucesso");
      });
    } catch (error) {
      ToastAlerta("Usuário ou senha inválidos", "erro");
    }
    setIsLoading(false);
  }

  function handleLogout() {
    setUsuario({ id: null, nome: "", usuario: "", senha: "", foto: "", token: "" });
    localStorage.removeItem("usuarioLogado");
  }

  return (
    <AuthContext.Provider value={{ usuario, handleLogin, handleLogout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
