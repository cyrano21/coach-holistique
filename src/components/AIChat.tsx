"use client";

import React, { useState } from 'react';

interface Message {
  text: string;
  sender: 'user' | 'ai';
}

const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    // Ajoute le message de l'utilisateur
    setMessages(prev => [...prev, { text: inputText, sender: 'user' }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: inputText,
          role: 'guide' // 🧠 On spécifie que c'est pour le guide spirituel
        }),
      });
      

      const data = await response.json();
      const aiResponse = data.response || data.error || "Erreur : pas de réponse de l'API.";

      setMessages(prev => [...prev, { text: aiResponse, sender: 'ai' }]);
    } catch (error) {
      console.error("Erreur lors de l'appel à l'API :", error);
      setMessages(prev => [
        ...prev,
        { text: "Erreur lors de l'appel à l'API", sender: 'ai' }
      ]);
    } finally {
      setIsLoading(false);
      setInputText('');
    }
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
            className={`mb-4 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}
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
        {isLoading && <div className="text-left text-white">Chargement...</div>}
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
