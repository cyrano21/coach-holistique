"use client";

import React, { useState, useEffect, useRef } from 'react';
import { FaComments, FaTimes } from 'react-icons/fa';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = async (userInput: string) => {
    const lowerInput = userInput.toLowerCase();

    // Rendez-vous et réservations
    if (lowerInput.includes('rendez-vous') || lowerInput.includes('rdv') || lowerInput.includes('réserver')) {
      return `Pour prendre rendez-vous, vous avez deux options :

1. Utilisez notre formulaire de réservation en ligne en cliquant sur "Réserver" dans le menu ou en visitant directement la page Réservation.

2. Contactez-nous via le formulaire de contact dans la section Contact.

Je peux vous rediriger vers l'une de ces pages. Que préférez-vous ?`;
    }

    // Présentation du chatbot
    if (lowerInput.includes('qui es') || lowerInput.includes('qui êtes') || lowerInput.includes('présente toi')) {
      return "Je suis l'assistant virtuel spécialisé en coaching holistique. Je peux vous aider à :
- Prendre rendez-vous
- Découvrir nos approches thérapeutiques
- En savoir plus sur nos services
- Répondre à vos questions

Comment puis-je vous aider aujourd'hui ?";
    }

    // Questions sur les approches thérapeutiques
    if (lowerInput.includes('eft') || lowerInput.includes('emotional freedom')) {
      return "L'EFT (Emotional Freedom Techniques) est une approche qui combine la stimulation de points d'acupuncture et le travail émotionnel. Cette technique aide à libérer les blocages émotionnels et réduire le stress. Souhaitez-vous prendre rendez-vous pour une séance ?";
    }

    // Réponse par défaut
    return "Je peux vous aider à prendre rendez-vous, découvrir nos approches thérapeutiques ou répondre à vos questions. Que souhaitez-vous savoir ?";peutiques'.";
    }

    if (lowerInput.includes('méditation') || lowerInput.includes('meditation')) {
      return "Nous proposons différentes techniques de méditation pour développer la pleine conscience et réduire le stress. Vous pouvez découvrir nos vidéos de méditation guidée dans la section 'Vidéos' de la page d'accueil ou explorer nos programmes de méditation dans 'Outils de Développement'.";
    }

    return "Je peux vous renseigner sur nos approches thérapeutiques (EFT, analyse transactionnelle, méditation...), vous guider vers les différentes sections du site ou répondre à vos questions spécifiques. Que souhaitez-vous savoir ?";
  };

  const handleSubmit = async () => {
    if (!input.trim()) return;

    setMessages(prev => [...prev, { text: input, sender: 'user' }]);

    const response = await getBotResponse(input);
    setInput('');

    setTimeout(() => {
      setMessages(prev => [...prev, { text: response, sender: 'bot' }]);
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="fixed bottom-0 right-0 m-4" style={{ zIndex: 9999 }}>
      {isOpen ? (
        <div className="bg-white rounded-lg shadow-2xl w-96">
          <div className="bg-purple-600 text-white p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold">Assistant virtuel</h3>
            <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200">
              <FaTimes />
            </button>
          </div>

          <div className="h-96 overflow-y-auto p-4 bg-gray-50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`mb-4 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                <div className={`inline-block p-3 rounded-lg ${msg.sender === 'user' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-800'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Tapez votre message..."
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
              <button
                onClick={handleSubmit}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
              >
                Envoyer
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-purple-600 text-white p-4 rounded-full shadow-2xl hover:bg-purple-700 transition-all duration-300 animate-bounce"
          style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 9999 }}
        >
          <FaComments size={24} />
        </button>
      )}
    </div>
  );
};

export default ChatBot;