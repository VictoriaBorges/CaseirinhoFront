import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { usuarioEstaLogado } from "../../utils/usuarioLogado";

export default function Navbar() {
  const [menuAberto, setMenuAberto] = useState(false);
  const navigate = useNavigate();

  // Só exibe a navbar se estiver logado
  if (!usuarioEstaLogado()) {
    return null;
  }

  // Recupera o nome do usuário, se quiser mostrar
  const usuario = JSON.parse(localStorage.getItem("usuarioLogado") || "{}");

  return (
    <>
      {/* Barra superior */}
      <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          {/* Esquerda: botão ☰ + logo */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMenuAberto(!menuAberto)}
              className="text-red-600 text-2xl focus:outline-none"
            >
              ☰
            </button>

            <Link to="/produtos" className="text-xl font-extrabold text-red-600 tracking-wide">
              Caseirinho+
            </Link>
          </div>

          {/* Direita: botão Sair */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-red-600 font-medium">
              Olá, {usuario.nome || "usuário"}!
            </span>
            <button
              onClick={() => {
                localStorage.clear();
                navigate("/login");
              }}
              className="text-red-600 font-semibold hover:text-yellow-500 transition-colors"
            >
              Sair
            </button>
          </div>
        </nav>
      </header>

      {/* Menu lateral com animação */}
      <AnimatePresence>
        {menuAberto && (
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 left-0 w-64 h-full bg-white shadow-lg p-6 z-40"
          >
            <button
              onClick={() => setMenuAberto(false)}
              className="text-red-600 text-xl mb-6"
            >
              ✕ Fechar
            </button>

            <nav className="flex flex-col space-y-4 text-red-700 font-semibold">
              <Link to="/produtos" onClick={() => setMenuAberto(false)}>🍛 Produtos</Link>
              <Link to="/restaurantes" onClick={() => setMenuAberto(false)}>🍽️ Restaurantes</Link>
              <Link to="/sobre" onClick={() => setMenuAberto(false)}>📖 Saiba Mais</Link>
              <Link to="/contato" onClick={() => setMenuAberto(false)}>📞 Contato</Link>
           
              
              <button
                onClick={() => {
                  localStorage.clear();
                  navigate("/login");
                }}
                className="text-left text-red-600 hover:text-yellow-500 mt-6"
              >
                🚪 Sair
              </button>
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
