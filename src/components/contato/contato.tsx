import { useState } from 'react';
import { Mail, User, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react';

// Importe seu navbar e footer
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';

export default function ContatoCorrigido() {
  const [formData, setFormData] = useState({ nome: '', email: '', mensagem: '' });
  const [enviado, setEnviado] = useState(false);
  const [erro, setErro] = useState('');
  const [enviando, setEnviando] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (enviado) setEnviado(false);
    if (erro) setErro('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnviando(true);
    setEnviado(false);
    setErro('');

    try {
      const response = await fetch('https://formsubmit.co/ajax/eb1d113f713f37bb23673a2d01515b5f', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          nome: formData.nome,
          email: formData.email,
          mensagem: formData.mensagem,
          _captcha: false,
          _autoresponse: 'Recebemos sua mensagem! Em breve retornaremos. 🍲',
        }),
      });

      const data = await response.json();
      
      if (response.ok && data.success !== false) {
        setEnviado(true);
        setFormData({ nome: '', email: '', mensagem: '' });
      } else {
        throw new Error(data.message || 'Erro ao enviar mensagem');
      }
    } catch (error) {
      console.error('Erro ao enviar:', error);
      setErro('Erro ao enviar mensagem. Tente novamente.');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 flex flex-col">
      <Navbar />

  <main className="flex-grow pt-32 px-6 pb-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <section className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-800 mb-4">
              Entre em <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">Contato</span>
            </h1>
            <p className="text-xl text-gray-600">
              Estamos aqui para ajudar! Envie sua mensagem e responderemos o mais breve possível.
            </p>
          </section>

          {/* Form Container */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-white/20">
            <div className="grid md:grid-cols-2">
              {/* Left Side */}
              <div className="bg-gradient-to-br from-red-600 to-red-800 p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">Vamos conversar!</h3>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <Mail className="w-6 h-6 text-red-200" />
                    <div>
                      <p className="font-semibold">Email</p>
                      <p className="text-red-200">caseirinho.suporte3@gmail.com</p>
                    </div>
                  </div>
                  <div className="mt-8">
                    <p className="text-red-200 text-sm">
                      Responderemos sua mensagem em até 24 horas!
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Side - Form */}
              <div className="p-8">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="relative">
                    <User className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                    <input
                      className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:outline-none transition-colors"
                      type="text"
                      name="nome"
                      placeholder="Seu nome completo"
                      value={formData.nome}
                      onChange={handleChange}
                      required
                      disabled={enviando}
                    />
                  </div>

                  <div className="relative">
                    <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                    <input
                      className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:outline-none transition-colors"
                      type="email"
                      name="email"
                      placeholder="seu@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      disabled={enviando}
                    />
                  </div>

                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                    <textarea
                      className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:outline-none transition-colors resize-none"
                      name="mensagem"
                      rows={5}
                      placeholder="Sua mensagem..."
                      value={formData.mensagem}
                      onChange={handleChange}
                      required
                      disabled={enviando}
                    />
                  </div>

                  {/* Success Message */}
                  {enviado && (
                    <div className="flex items-center space-x-2 text-green-600 bg-green-50 p-3 rounded-xl border border-green-200">
                      <CheckCircle className="w-5 h-5" />
                      <span>Mensagem enviada com sucesso!</span>
                    </div>
                  )}

                  {/* Error Message */}
                  {erro && (
                    <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-xl border border-red-200">
                      <AlertCircle className="w-5 h-5" />
                      <span>{erro}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={enviando || !formData.nome || !formData.email || !formData.mensagem}
                    className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white font-bold py-4 px-6 rounded-xl hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {enviando ? 'Enviando...' : 'Enviar Mensagem'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}


