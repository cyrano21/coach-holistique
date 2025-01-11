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

    if (lowerInput.includes('bonjour') || lowerInput.includes('salut')) {
      return "Bonjour! Je suis l'assistant virtuel du site. Comment puis-je vous aider aujourd'hui?";
    }

    if (lowerInput.includes('qui es tu') || lowerInput.includes('qui êtes vous')) {
      return "Je suis l'assistant virtuel de ce site de coaching holistique. Je suis programmé pour vous guider à travers nos différents services et répondre à vos questions sur nos approches thérapeutiques.";
    }

    if (lowerInput.includes('auteur') || lowerInput.includes('créateur')) {
      return "Ce site a été créé par une coach holistique professionnelle qui propose des approches thérapeutiques variées comme l'EFT, la méditation, et l'analyse transactionnelle. Souhaitez-vous en savoir plus sur une approche particulière ?";
    }

    if (lowerInput.includes('que sais tu') || lowerInput.includes('capabilities')) {
      return "Je peux vous renseigner sur nos différentes approches thérapeutiques, les séances de coaching, les outils de développement personnel, et vous aider à prendre rendez-vous. Quel sujet vous intéresse ?";
    }

    if (lowerInput.includes('therapie') || lowerInput.includes('thérapie')) {
      return "Nous proposons plusieurs approches thérapeutiques comme l'EFT, l'analyse transactionnelle, et la thérapie humaniste. Quelle approche souhaitez-vous explorer ?";
    }

    if (lowerInput.includes('rendez-vous') || lowerInput.includes('rdv') || lowerInput.includes('reservation')) {
      return "Pour prendre rendez-vous, vous pouvez cliquer sur le bouton 'Réserver' dans le menu ou visiter directement la page de réservation. Vous pourrez y choisir le créneau qui vous convient le mieux. Souhaitez-vous que je vous guide vers la page de réservation ?";
    }

    return "Je suis l'assistant virtuel de ce site, spécialisé dans le coaching holistique. Je peux vous renseigner sur nos services, nos approches thérapeutiques, ou vous aider à prendre rendez-vous. Comment puis-je vous aider ?";
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