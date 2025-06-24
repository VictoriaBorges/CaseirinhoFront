// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import Restaurantes from './pages/restaurante/Restaurantes';
import Produtos from './pages/produto/Produtos';
import EditarProduto from './pages/produto/EditarProduto';
import CadastrarProduto from './pages/produto/CadastrarProduto';
import CadastroUsuario from './pages/cadastro/CadastroUsuario';
import FormRestaurante from './components/restaurantes/formrestaurante/FormRestaurante';
import DeletarRestaurante from './components/restaurantes/deletarrestaurante/DeletarRestaurante';
import Sobre from './components/sobre/sobre';
import DeletarProduto from './pages/produto/DeletarProduto';
import Contato from './components/contato/contato';
import { ToastContainer } from 'react-toastify';
import Chatbot from './components/chatbot/Chatbot';




function App() {
  return (
    <AuthProvider>
      <ToastContainer/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/produtos/cadastrar" element={<CadastrarProduto />} />
          <Route path="/editar-produto/:id" element={<EditarProduto />} />
          <Route path="/deletar-produto/:id" element={<DeletarProduto />} />
          <Route path="/cadastrar" element={<CadastroUsuario />}/>

          {/* link restaurantes */}
          <Route path="/restaurantes" element={<Restaurantes />} /> 
          <Route path="/cadastrarrestaurante" element={<FormRestaurante />} />
          <Route path="/deletarrestaurante/:id" element={<DeletarRestaurante />} />
          <Route path="/editarrestaurante/:id" element={<FormRestaurante />} />
          {/* link restaurantes */}

          <Route path="/sobre" element={<Sobre/>} />
          <Route path="/contato" element={<Contato/>} />

       


        </Routes>
        <Chatbot />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;