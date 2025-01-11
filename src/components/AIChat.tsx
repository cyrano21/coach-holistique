
"use client";

import React, { useState } from 'react';

interface Message {
  text: string;
  sender: 'user' | 'ai';
}

const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');

  const getAIResponse = (userMessage: string) => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('qui es tu') || lowerMessage.includes('qui êtes vous')) {
      return "Je suis un guide spirituel virtuel conçu pour vous accompagner dans votre cheminement spirituel. Je peux vous aider à explorer différentes pratiques de méditation, de développement personnel et de croissance spirituelle.";
    }
    
    if (lowerMessage.includes('grandir') && lowerMessage.includes('spirituel')) {
      return "La croissance spirituelle est un voyage personnel qui peut inclure plusieurs pratiques : la méditation quotidienne, la pratique de la gratitude, l'étude des textes sacrés, la connexion avec la nature, et le développement de la compassion. Par quelle pratique souhaitez-vous commencer ?";
    }

    if (lowerMessage.includes('méditation') || lowerMessage.includes('mediter')) {
      return "La méditation est une excellente base pour la croissance spirituelle. Je vous suggère de commencer par une simple pratique de respiration consciente pendant 5-10 minutes par jour. Souhaitez-vous que je vous guide dans un exercice ?";
    }

    return "Je suis là pour vous accompagner dans votre voyage spirituel. Quelle aspect de votre développement personnel souhaitez-vous explorer ?";
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { text: inputText, sender: 'user' }]);

    // Get AI response
    const aiResponse = getAIResponse(inputText);

    setTimeout(() => {
      setMessages(prev => [...prev, { text: aiResponse, sender: 'ai' }]);
    }, 500);

    setInputText('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white/10 backdrop-blur-md rounded-xl shadow-xl">
      <h3 className="text-xl font-semibold text-white mb-4">Guide Spirituel</h3>

      <div className="h-96 overflow-y-auto mb-4 p-4 bg-black/20 rounded-lg">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 ${
              message.sender === 'user' ? 'text-right' : 'text-left'
            }`}
          >
            <div
              className={`inline-block p-3 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-700 text-white'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 p-3 rounded-lg bg-white/10 text-white placeholder-gray-300 resize-none"
          placeholder="Posez votre question..."
          rows={1}
        />
        <button
          onClick={handleSendMessage}
          className="px-6 py-3 rounded-lg bg-purple-500 text-white hover:bg-purple-600 transition-colors"
        >
          Envoyer
        </button>
      </div>
    </div>
  );
};

export default AIChat;
