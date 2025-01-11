
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
    
    // Navigation et pages
    if (lowerInput.includes('accueil') || lowerInput.includes('home')) {
      return "La page d'accueil présente une vue d'ensemble de nos services de coaching holistique, avec des sections sur la méditation guidée, la respiration consciente et le développement personnel. Vous pouvez y accéder en cliquant sur le logo ou 'Accueil' dans le menu.";
    }

    if (lowerInput.includes('approches') || lowerInput.includes('thérapeutiques')) {
      return "La page 'Approches Thérapeutiques' détaille nos différentes méthodes comme l'EFT, l'analyse transactionnelle, la PNL, etc. Vous pouvez y accéder via le menu principal. Quelle approche vous intéresse particulièrement ?";
    }

    if (lowerInput.includes('méthodes') || lowerInput.includes('methodes')) {
      return "La page 'Méthodes' présente nos différentes approches de coaching. Vous y trouverez des informations sur nos techniques et pratiques. Elle est accessible depuis le menu principal.";
    }

    if (lowerInput.includes('coaching') || lowerInput.includes('personnel')) {
      return "La section 'Coaching Personnalisé' vous permet de découvrir notre accompagnement sur mesure. Vous pouvez y accéder via le menu principal pour en savoir plus sur nos programmes individualisés.";
    }

    if (lowerInput.includes('parcours') || lowerInput.includes('spirituel')) {
      return "Les 'Parcours Spirituels' offrent une exploration des différentes traditions et pratiques spirituelles. Cette page est accessible depuis le menu principal.";
    }

    if (lowerInput.includes('outils') || lowerInput.includes('développement')) {
      return "La page 'Outils de Développement' présente les différentes techniques et ressources disponibles pour votre développement personnel. Vous y trouverez des informations sur la méditation, l'EFT, et d'autres pratiques.";
    }

    if (lowerInput.includes('contact') || lowerInput.includes('joindre')) {
      return "Vous pouvez nous contacter via la page 'Contact' accessible depuis le menu principal. Vous y trouverez un formulaire pour nous envoyer un message.";
    }

    // Approches spécifiques
    if (lowerInput.includes('eft') || lowerInput.includes('emotional freedom')) {
      return "L'EFT (Emotional Freedom Techniques) est une approche qui combine stimulation de points d'acupuncture et travail émotionnel. Vous trouverez plus d'informations dans la section 'Approches Thérapeutiques'.";
    }

    if (lowerInput.includes('méditation') || lowerInput.includes('meditation')) {
      return "Nous proposons des séances de méditation guidée pour développer la pleine conscience. Vous pouvez découvrir nos vidéos de méditation sur la page d'accueil ou en savoir plus dans la section 'Outils de Développement'.";
    }

    if (lowerInput.includes('pnl') || lowerInput.includes('programmation neuro')) {
      return "La PNL (Programmation Neuro-Linguistique) est une approche permettant d'améliorer la communication et le développement personnel. Plus de détails dans la section 'Approches Thérapeutiques'.";
    }

    // Salutations et présentations
    if (lowerInput.includes('bonjour') || lowerInput.includes('salut')) {
      return "Bonjour ! Je suis l'assistant virtuel du site, je peux vous guider vers les différentes sections et vous informer sur nos approches thérapeutiques. Que souhaitez-vous découvrir ?";
    }

    if (lowerInput.includes('qui es') || lowerInput.includes('que fais')) {
      return "Je suis l'assistant virtuel spécialisé en coaching holistique. Je peux vous guider à travers notre site, vous présenter nos différentes approches thérapeutiques et vous orienter vers les ressources qui vous intéressent.";
    }

    // Réponse par défaut
    return "Je peux vous renseigner sur toutes nos approches thérapeutiques, nos méthodes de coaching, et vous guider vers les différentes sections du site. Quelle information recherchez-vous ?";
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
