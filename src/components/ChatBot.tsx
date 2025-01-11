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
  const [isListening, setIsListening] = useState(false); // Added state for voice input
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognition = useRef<webkitSpeechRecognition | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false); // Added state for speech synthesis
  const utterance = useRef<SpeechSynthesisUtterance | null>(null);


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
    if (!recognition.current) {
      recognition.current = new (window as any).webkitSpeechRecognition(); // Type assertion needed
      recognition.current.continuous = false;
      recognition.current.interimResults = false;
      recognition.current.lang = 'fr-FR'; // Set language to French

      recognition.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };
    }
  }, []);

  const toggleListening = () => {
    setIsListening(!isListening);
    if (isListening) {
      recognition.current?.stop();
    } else {
      recognition.current?.start();
    }
  };

  const speakText = (text: string) => {
    if (!utterance.current) {
      utterance.current = new SpeechSynthesisUtterance();
    }
    utterance.current.text = text;
    utterance.current.lang = 'fr-FR';
    speechSynthesis.speak(utterance.current);
    setIsSpeaking(true);
  };

  const stopSpeaking = () => {
    speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const getBotResponse = async (userInput: string) => {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: `Tu es Sophie, une coach holistique passionnée par la médecine alternative et le bien-être. Tu utilises tes connaissances en naturopathie, réflexologie et coaching de vie pour aider les autres à atteindre un état de bien-être optimal. Réponds de manière concise, claire et bienveillante en 2-3 phrases maximum à cette question : ${userInput}`
        }),
      });

      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error('Erreur chat:', error);
      return "Désolé, je rencontre des difficultés techniques. Pouvez-vous reformuler votre question ?";
    }
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
                  {msg.sender === 'bot' && (
                    <button
                      onClick={() => isSpeaking ? stopSpeaking() : speakText(msg.text)}
                      className="ml-2 text-sm"
                      title={isSpeaking ? "Arrêter" : "Écouter"}
                    >
                      {isSpeaking ? '🔇' : '🔊'}
                    </button>
                  )}
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
                onClick={toggleListening}
                className={`p-2 rounded-lg ${isListening ? 'bg-red-500' : 'bg-blue-500'} text-white`}
                title={isListening ? 'Arrêter' : 'Parler'}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </button>
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