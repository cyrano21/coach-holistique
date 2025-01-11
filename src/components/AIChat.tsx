"use client";

import React, { useState } from 'react';

interface Message {
  text: string;
  sender: 'user' | 'ai';
}

const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { text: inputText, sender: 'user' }]);

    // Simple AI response
    const aiResponse = `Je vous comprends. ${inputText.length > 20 ? 
      "Pouvez-vous m'en dire plus ?" : 
      "Comment puis-je vous aider davantage ?"}`;

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
      <h3 className="text-xl font-semibold text-white mb-4">Chat Spirituel</h3>

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
          placeholder="Tapez votre message..."
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