"use client";

import React, { useState } from 'react';
import { FaLeaf, FaMountain, FaHandHoldingHeart, FaYinYang } from 'react-icons/fa';


type GameType = {
  title: string;
  description: string;
  component: () => React.ReactNode;
  color: {
    background: string;
    titleText: string;
    paragraphText: string;
    buttonBg: string;
  };
};

const spiritualPaths = [
  {
    id: 1,
    title: "Approches Comparatives",
    description: "Exploration des différentes traditions spirituelles et philosophiques",
    icon: FaLeaf,
    color: "from-green-500 to-emerald-700",
    details: [
      "Analyse comparative des traditions",
      "Compréhension des systèmes de croyances",
      "Recherche de points communs universels"
    ],
    game: {
      title: "Quiz des Traditions Spirituelles",
      description: "Testez vos connaissances sur les différentes traditions spirituelles du monde.",
      color: {
        background: "from-green-800 to-green-600",
        titleText: "text-white",
        paragraphText: "text-white/80",
        buttonBg: "bg-green-600 hover:bg-green-500"
      },
      component: () => (
        <div className={`bg-gradient-to-br ${spiritualPaths[0].game.color.background} p-8 rounded-xl`}>
          <h2 className={`text-3xl font-bold mb-4 ${spiritualPaths[0].game.color.titleText}`}>
            {spiritualPaths[0].game.title}
          </h2>
          <p className={`mb-6 ${spiritualPaths[0].game.color.paragraphText}`}>
            {spiritualPaths[0].game.description}
          </p>
          <button 
            className={`
              px-6 py-3 rounded-lg transition-colors duration-300 
              ${spiritualPaths[0].game.color.buttonBg} 
              text-white hover:opacity-90
            `}
          >
            Commencer le Quiz
          </button>
        </div>
      )
    }
  },
  {
    id: 2,
    title: "Méditation Profonde",
    description: "Techniques de méditation avancées pour la transformation intérieure",
    icon: FaMountain,
    color: "from-blue-500 to-indigo-700",
    details: [
      "Pleine conscience",
      "Méditation transcendantale",
      "Pratiques de mindfulness"
    ],
    game: {
      title: "Atelier de Méditation Guidée",
      description: "Expérimentez différentes techniques de méditation.",
      color: {
        background: "from-blue-800 to-blue-600",
        titleText: "text-white",
        paragraphText: "text-white/80",
        buttonBg: "bg-blue-600 hover:bg-blue-500"
      },
      component: () => (
        <div className={`bg-gradient-to-br ${spiritualPaths[1].game.color.background} p-8 rounded-xl`}>
          <h2 className={`text-3xl font-bold mb-4 ${spiritualPaths[1].game.color.titleText}`}>
            {spiritualPaths[1].game.title}
          </h2>
          <p className={`mb-6 ${spiritualPaths[1].game.color.paragraphText}`}>
            {spiritualPaths[1].game.description}
          </p>
          <button 
            className={`
              px-6 py-3 rounded-lg transition-colors duration-300 
              ${spiritualPaths[1].game.color.buttonBg} 
              text-white hover:opacity-90
            `}
          >
            Commencer la Séance
          </button>
        </div>
      )
    }
  },
  {
    id: 3,
    title: "Connexion Intérieure",
    description: "Développement de l'intelligence émotionnelle et spirituelle",
    icon: FaHandHoldingHeart,
    color: "from-purple-500 to-pink-700",
    details: [
      "Travail sur l'ego",
      "Développement de l'empathie",
      "Alignement personnel"
    ],
    game: {
      title: "Exploration de l'Intelligence Émotionnelle",
      description: "Un jeu pour développer votre intelligence émotionnelle.",
      color: {
        background: "from-purple-800 to-purple-600",
        titleText: "text-white",
        paragraphText: "text-white/80",
        buttonBg: "bg-purple-600 hover:bg-purple-500"
      },
      component: () => (
        <div className={`bg-gradient-to-br ${spiritualPaths[2].game.color.background} p-8 rounded-xl`}>
          <h2 className={`text-3xl font-bold mb-4 ${spiritualPaths[2].game.color.titleText}`}>
            {spiritualPaths[2].game.title}
          </h2>
          <p className={`mb-6 ${spiritualPaths[2].game.color.paragraphText}`}>
            {spiritualPaths[2].game.description}
          </p>
          <button 
            className={`
              px-6 py-3 rounded-lg transition-colors duration-300 
              ${spiritualPaths[2].game.color.buttonBg} 
              text-white hover:opacity-90
            `}
          >
            Démarrer l&lsquo;Exploration
          </button>
        </div>
      )
    }
  },
  {
    id: 4,
    title: "Énergétique Spirituelle",
    description: "Exploration des énergies subtiles et des chakras",
    icon: FaYinYang,
    color: "from-orange-500 to-red-700",
    details: [
      "Équilibrage énergétique",
      "Travail sur les blocages",
      "Harmonisation des centres énergétiques"
    ],
    game: {
      title: "Harmonisation des Chakras",
      description: "Un jeu pour comprendre et équilibrer vos centres énergétiques.",
      color: {
        background: "from-orange-800 to-red-600",
        titleText: "text-white",
        paragraphText: "text-white/80",
        buttonBg: "bg-red-600 hover:bg-red-500"
      },
      component: () => (
        <div className={`bg-gradient-to-br ${spiritualPaths[3].game.color.background} p-8 rounded-xl`}>
          <h2 className={`text-3xl font-bold mb-4 ${spiritualPaths[3].game.color.titleText}`}>
            {spiritualPaths[3].game.title}
          </h2>
          <p className={`mb-6 ${spiritualPaths[3].game.color.paragraphText}`}>
            {spiritualPaths[3].game.description}
          </p>
          <button 
            className={`
              px-6 py-3 rounded-lg transition-colors duration-300 
              ${spiritualPaths[3].game.color.buttonBg} 
              text-white hover:opacity-90
            `}
          >
            Commencer l&lsquo;Harmonisation
          </button>
        </div>
      )
    }
  }
];

const ParcoursSpirituels = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [selectedGame, setSelectedGame] = useState<GameType | null>(null);

  const handleDetailClick = (game: GameType) => {
    setSelectedGame(game);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-16 px-4 md:px-8 lg:px-16">
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-12 animate__animated animate__fadeInDown">
          Parcours Spirituels
        </h2>

        {/* Section Cartes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {spiritualPaths.map((path) => (
            <div 
              key={path.id}
              className={`
                relative group transform transition-all duration-500 
                ${activeCard === path.id 
                  ? 'scale-105 rotate-3 z-50' 
                  : 'hover:scale-105 hover:rotate-3'}
                bg-gradient-to-br ${path.color} 
                rounded-2xl shadow-2xl overflow-hidden
                cursor-pointer
              `}
              onMouseEnter={() => setActiveCard(path.id)}
              onMouseLeave={() => setActiveCard(null)}
            >
              <div className="absolute inset-0 bg-black opacity-30 group-hover:opacity-20 transition-opacity"></div>
              
              <div className="relative p-6 text-white">
                <div className="flex items-center mb-4">
                  <path.icon className="w-12 h-12 mr-4 text-white/80 group-hover:text-white transition-colors" />
                  <h3 className="text-2xl font-bold">{path.title}</h3>
                </div>
                
                <p className="text-sm text-white/80 mb-4">{path.description}</p>
                
                <ul className="space-y-2 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-twinkle group-hover:animate-none">
                  {path.details.map((detail, index) => (
                    <li 
                      key={index} 
                      className="flex items-center text-white/90 group-hover:text-yellow-300 group-hover:bg-yellow-900/20 transition-colors duration-300 bg-white/10 px-2 py-1 rounded-md cursor-pointer"
                      onClick={() => handleDetailClick(path.game)}
                    >
                      <span className="mr-2 text-white/70">•</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Section Jeu */}
        <div className="mt-12 bg-gray-800 rounded-xl p-8 min-h-[400px]">
          {selectedGame ? (
            <div className={`bg-gradient-to-br ${selectedGame.color.background} p-8 rounded-xl`}>
              <h2 className={`text-3xl font-bold mb-4 ${selectedGame.color.titleText}`}>
                {selectedGame.title}
              </h2>
              <p className={`mb-6 ${selectedGame.color.paragraphText}`}>
                {selectedGame.description}
              </p>
              <button 
                className={`
                  px-6 py-3 rounded-lg transition-colors duration-300 
                  ${selectedGame.color.buttonBg} 
                  text-white hover:opacity-90
                `}
              >
                {selectedGame.title === "Quiz des Traditions Spirituelles" ? "Commencer le Quiz" : 
                 selectedGame.title === "Atelier de Méditation Guidée" ? "Commencer la Séance" : 
                 selectedGame.title === "Exploration de l'Intelligence Émotionnelle" ? "Démarrer l'Exploration" : 
                 "Commencer l'Harmonisation"}
              </button>
            </div>
          ) : (
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4 text-gray-100">Sélectionnez un parcours</h3>
              <p className="text-gray-200">Cliquez sur un détail pour découvrir un jeu ou une activité interactive.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ParcoursSpirituels;
