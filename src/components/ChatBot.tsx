
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
    
    // Réponses prédéfinies pour les questions courantes
    if (lowerInput.includes('bonjour') || lowerInput.includes('salut')) {
      return "Bonjour! Comment puis-je vous aider aujourd'hui?";
    }
    
    if (lowerInput.includes('therapie') || lowerInput.includes('thérapie')) {
      return "Nous proposons différentes approches thérapeutiques comme l'analyse transactionnelle, l'EFT, et la thérapie humaniste. Quelle approche vous intéresse ?";
    }
    
    if (lowerInput.includes('prix') || lowerInput.includes('tarif')) {
      return "Les tarifs varient selon le type de séance et l'approche choisie. Je vous invite à consulter la page de réservation pour plus de détails.";
    }

    if (lowerInput.includes('rendez-vous') || lowerInput.includes('reservation')) {
      return "Vous pouvez prendre rendez-vous directement depuis notre page de réservation. Souhaitez-vous que je vous y dirige ?";
    }

    return "Je suis là pour vous aider. N'hésitez pas à me poser des questions sur nos approches thérapeutiques, les séances, ou la prise de rendez-vous.";
  };

  const handleSubmit = async () => {
    if (!input.trim()) return;

    // Ajouter le message de l'utilisateur
    setMessages(prev => [...prev, { text: input, sender: 'user' }]);
    
    // Obtenir la réponse du bot
    const response = await getBotResponse(input);
    
    // Ajouter la réponse du bot
    setTimeout(() => {
      setMessages(prev => [...prev, { text: response, sender: 'bot' }]);
    }, 500);

    setInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="bg-white rounded-lg shadow-xl w-80 h-96 flex flex-col">
          <div className="bg-purple-600 text-white p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold">Assistant virtuel</h3>
            <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200">
              <FaTimes />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`mb-4 ${
                  msg.sender === 'user' ? 'text-right' : 'text-left'
                }`}
              >
                <div
                  className={`inline-block p-3 rounded-lg ${
                    msg.sender === 'user'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-200 text-gray-800'
                  }`}
                >
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
          className="bg-purple-600 text-white p-4 rounded-full shadow-lg hover:bg-purple-700 transition-colors"
        >
          <FaComments size={24} />
        </button>
      )}
    </div>
  );
};

export default ChatBot;
