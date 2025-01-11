"use client";

import React, { useState, useEffect, useRef } from 'react';
import { FaComments, FaTimes } from 'react-icons/fa';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

const ChatBot = () => {
  console.log("ChatBot component loaded");
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
    
    // Questions sur l'identité
    if (lowerInput.includes('qui es tu') || lowerInput.includes('qui êtes vous') || lowerInput.includes('qui es-tu')) {
      return "Je suis l'assistant virtuel spécialisé en coaching holistique. Je peux vous informer sur les différentes approches thérapeutiques comme l'EFT, l'analyse transactionnelle, la méditation, et répondre à vos questions sur ces pratiques.";
    }

    // Capacités et connaissances
    if (lowerInput.includes('que sais tu') || lowerInput.includes('que peux tu') || lowerInput.includes('capabilities')) {
      return "Je connais en détail les approches thérapeutiques proposées : EFT, analyse transactionnelle, méditation, thérapie humaniste. Je peux vous expliquer chaque approche, ses bénéfices et comment elle pourrait vous aider. Quelle approche vous intéresse ?";
    }

    // Questions sur les approches thérapeutiques
    if (lowerInput.includes('eft') || lowerInput.includes('emotional freedom')) {
      return "L'EFT (Emotional Freedom Techniques) est une approche qui combine stimulation de points d'acupuncture et exposition émotionnelle. Elle aide à réduire le stress, l'anxiété et les blocages émotionnels. Voulez-vous en savoir plus sur son fonctionnement ?";
    }

    if (lowerInput.includes('analyse transactionnelle') || lowerInput.includes('at')) {
      return "L'analyse transactionnelle est une théorie de la personnalité qui permet de comprendre nos comportements relationnels. Elle analyse les 'transactions' entre les personnes et identifie différents états du moi. Souhaitez-vous que je vous explique ces états ?";
    }

    if (lowerInput.includes('meditation') || lowerInput.includes('méditer')) {
      return "La méditation est une pratique de pleine conscience qui aide à apaiser l'esprit et réduire le stress. Nous proposons différentes techniques de méditation adaptées à chacun. Voulez-vous découvrir une technique particulière ?";
    }

    // Questions sur le coaching
    if (lowerInput.includes('coach') || lowerInput.includes('séance')) {
      return "Le coaching holistique est une approche globale qui prend en compte toutes les dimensions de votre être. Nous travaillons sur le mental, l'émotionnel et l'énergétique. Quel aspect vous intéresse particulièrement ?";
    }

    // Salutations
    if (lowerInput.includes('bonjour') || lowerInput.includes('salut')) {
      return "Bonjour ! Je suis là pour vous guider dans la découverte de nos approches thérapeutiques. Quelle pratique souhaitez-vous explorer ?";
    }

    // Réponse par défaut plus informative
    return "Je peux vous renseigner sur nos différentes approches thérapeutiques (EFT, analyse transactionnelle, méditation), le coaching holistique, ou répondre à vos questions spécifiques sur ces pratiques. Quel aspect vous intéresse ?";
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