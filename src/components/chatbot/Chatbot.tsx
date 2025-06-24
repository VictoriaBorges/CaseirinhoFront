import { useState } from "react";
import { MessageCircle, HelpCircle, ArrowLeft } from "lucide-react";

export default function AppSupportChatbot() {
  const initialMenu = [
    { 
      from: "bot", 
      text: 
        "Olá! Sou o assistente do App Caseirinho! 🚀\n\n" +
        "Posso te ajudar com:\n" +
        "• Como cadastrar dados\n" +
        "• Como alterar informações\n" +
        "• Como deletar registros\n" +
        "• Navegação no app\n" +
        "• Resolução de problemas\n\n" +
        "Como posso te ajudar hoje?"
    },
  ];

  const [open, setOpen] = useState(false);
  const [showBackButton, setShowBackButton] = useState(false);
  const [messages, setMessages] = useState(initialMenu);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Base de conhecimento simplificada (exemplo)
  const appKnowledge = {
    cadastrar: {
      keywords: ['cadastrar', 'criar', 'adicionar', 'novo', 'registrar', 'incluir', 'inserir'],
      responses: [
        "📝 **Como CADASTRAR no App:**\n\n1. Vá na tela correspondente\n2. Clique em 'Novo'\n3. Preencha os dados\n4. Salve as informações"
      ]
    },
    deletar: {
      keywords: ['deletar', 'excluir', 'remover', 'apagar', 'eliminar'],
      responses: [
        "🗑️ **Como DELETAR no App:**\n\n1. Selecione o item\n2. Clique em 'Excluir'\n3. Confirme a exclusão"
      ]
    },
    alterar: {
      keywords: ['alterar', 'editar', 'modificar', 'mudar', 'atualizar', 'corrigir'],
      responses: [
        "✏️ **Como ALTERAR no App:**\n\n1. Selecione o item\n2. Clique em 'Editar'\n3. Faça as alterações\n4. Salve as modificações"
      ]
    },
    navegacao: {
      keywords: ['navegar', 'encontrar', 'onde', 'localizar', 'menu', 'tela', 'página'],
      responses: [
        "🧭 **Navegação no App:**\n\nUse o menu principal para acessar todas as funcionalidades, como Cardápio, Clientes, Pedidos e Configurações."
      ]
    },
    problemas: {
      keywords: ['problema', 'erro', 'bug', 'não funciona', 'travou', 'lento', 'ajuda'],
      responses: [
        "🔧 **Soluções para Problemas:**\n\nTente reiniciar o app e verificar sua conexão de internet. Se o problema persistir, entre em contato com o suporte."
      ]
    },
  };

  // Sugestões rápidas para o usuário
  const quickReplies = [
    "Como cadastrar? 📝",
    "Como deletar? 🗑️", 
    "Como alterar? ✏️",
    "Onde encontrar? 🔍",
    "Tenho um problema 🆘"
  ];

  // Função que busca a melhor resposta no conhecimento do app
  const findBestResponse = (userInput) => {
    const input = userInput.toLowerCase();

    // Cumprimentos básicos
    if (input.match(/oi|olá|bom dia|boa tarde|boa noite/)) {
      return "Olá! Bem-vindo ao suporte do App Caseirinho! 👋\n\nComo posso te ajudar hoje?";
    }

    // Agradecimentos
    if (input.match(/obrigad|valeu|thanks/)) {
      return "De nada! Fico feliz em ajudar! 😊 Se precisar de algo mais, estou aqui!";
    }

    // Despedidas
    if (input.match(/tchau|até|bye/)) {
      return "Até logo! 👋 Volte sempre que precisar de ajuda!";
    }

    // Busca no conhecimento por palavras-chave
    for (const [category, data] of Object.entries(appKnowledge)) {
      if (data.keywords.some(keyword => input.includes(keyword))) {
        // Retorna uma resposta aleatória daquela categoria
        return data.responses[Math.floor(Math.random() * data.responses.length)];
      }
    }

    // Resposta padrão se não entender
    return "🤔 Não entendi bem. Posso ajudar com:\n" +
      quickReplies.join("\n");
  };

  // Enviar mensagem do usuário
  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = input.trim();

    // Adiciona mensagem do usuário
    const newMessages = [...messages, { from: "user", text: userMessage }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    setShowBackButton(true);

    // Simula resposta do bot
    setTimeout(() => {
      const botReply = findBestResponse(userMessage);
      setMessages([...newMessages, { from: "bot", text: botReply }]);
      setLoading(false);
    }, 800);
  };

  // Resposta rápida clicável
  const handleQuickReply = (reply) => {
    setMessages((prev) => [...prev, { from: "user", text: reply }]);
    setLoading(true);
    setShowBackButton(true);

    setTimeout(() => {
      const botReply = findBestResponse(reply);
      setMessages((prev) => [...prev, { from: "bot", text: botReply }]);
      setLoading(false);
    }, 800);
  };

  // Botão Voltar: volta para o menu inicial
  const handleGoBack = () => {
    setMessages(initialMenu);
    setShowBackButton(false);
    setInput("");
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {open ? (
        <div className="w-96 bg-white dark:bg-gray-800 shadow-2xl rounded-xl overflow-hidden flex flex-col max-h-[600px]">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 font-bold flex justify-between items-center">
            <div className="flex items-center gap-2">
              <HelpCircle size={22} />
              <span>Suporte App Caseirinho</span>
            </div>

            <div className="flex items-center gap-2">
              {showBackButton && (
                <button 
                  onClick={handleGoBack}
                  className="hover:bg-white/20 rounded-full p-1 transition-colors mr-2"
                  title="Voltar ao menu inicial"
                >
                  <ArrowLeft size={20} />
                </button>
              )}

              <button 
                onClick={() => setOpen(false)}
                className="hover:bg-white/20 rounded-full p-1 transition-colors"
                title="Fechar"
              >
                ✖️
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="h-80 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900 flex-grow">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`p-3 rounded-lg text-base max-w-[85%] whitespace-pre-line ${
                    msg.from === "bot"
                      ? "bg-white dark:bg-gray-700 shadow-sm border border-gray-200 dark:border-gray-600"
                      : "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-sm"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-gray-700 p-3 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">Analisando sua dúvida...</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Replies */}
          {messages.length === 1 && (
            <div className="p-4 border-t bg-blue-50 dark:bg-gray-800 border-blue-100 dark:border-gray-700">
              <div className="text-xs text-blue-600 dark:text-blue-400 mb-3 font-medium">💡 Dúvidas mais comuns:</div>
              <div className="flex flex-wrap gap-2">
                {quickReplies.map((reply, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuickReply(reply)}
                    className="bg-white hover:bg-blue-50 dark:bg-blue-900 dark:hover:bg-blue-800 text-blue-700 dark:text-blue-200 px-3 py-2 rounded-full text-sm transition-colors border border-blue-200 dark:border-blue-700 shadow-sm"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="flex p-4 border-t bg-white dark:bg-gray-800 gap-3">
            <input
              className="flex-1 p-3 text-base border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              placeholder="Descreva sua dúvida aqui..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !loading && handleSend()}
              disabled={loading}
            />
            <button
              onClick={handleSend}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-5 py-3 rounded-lg hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-lg shadow-sm"
              disabled={loading || !input.trim()}
            >
              🚀
            </button>
          </div>
        </div>
      ) : (
        <button
          className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-full shadow-lg text-white hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 group"
          onClick={() => setOpen(true)}
          aria-label="Abrir suporte do app"
        >
          <div className="relative">
            <HelpCircle size={24} className="group-hover:rotate-12 transition-transform" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          </div>
        </button>
      )}
    </div>
  );
}
