"use client";

import React, { useState, useEffect } from 'react';
import AIGameDialog from './AIGameDialog';
import AIChat from './AIChat';
import { FaLeaf, FaMountain, FaHandHoldingHeart, FaYinYang } from 'react-icons/fa';
import { HfInference } from '@huggingface/inference';

const hf = new HfInference(process.env.NEXT_PUBLIC_HF_TOKEN);

type Question = {
  question: string;
  options: string[];
  correctAnswer: number;
};

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


const generateQuizQuestions = async (theme: string) => {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: `Génère 4 questions différentes sur le thème ${theme} avec leurs réponses. 
        Format: question|option1,option2,option3,option4|indexReponseCorrecte`
      })
    });

    const data = await response.json();
    return data.response
      .split('\n')
      .filter((q: string) => q.trim())
      .map((q: string) => {
        const [question, options, correctAnswer] = q.split('|');
        return {
          question,
          options: options.split(','),
          correctAnswer: parseInt(correctAnswer)
        };
      });
  } catch (error) {
    console.error('Erreur lors de la génération des questions:', error);
    return [];
  }
};

const useQuizQuestions = (theme: string) => {
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const newQuestions = await generateQuizQuestions(theme);
      setQuestions(newQuestions);
    };
    fetchQuestions();
  }, [theme]);

  return questions;
};

const emotionalQuestions = [
  "Comment vous sentez-vous aujourd'hui ?",
  "Quelle est votre plus grande source de joie ?",
  "Qu'est-ce qui vous préoccupe le plus ?"
];

const chakras = [
  { name: "Racine", color: "red" },
  { name: "Sacral", color: "orange" },
  { name: "Plexus solaire", color: "yellow" },
  { name: "Cœur", color: "green" },
  { name: "Gorge", color: "blue" },
  { name: "Troisième œil", color: "indigo" },
  { name: "Couronne", color: "purple" }
];

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
      component: () => <SpiritualQuiz theme="comparatives" />
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
      component: () => <SpiritualQuiz theme="meditation" />
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
      component: () => <SpiritualQuiz theme="connexion" />
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
      component: () => <SpiritualQuiz theme="energetique" />
    }
  }
];

const SpiritualQuiz = ({ theme }: { theme: string }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());
  const [availableQuestions, setAvailableQuestions] = useState<number[]>([]);
  const questions = useQuizQuestions(theme);


  useEffect(() => {
    // Mélanger les questions disponibles de manière aléatoire
    if (questions.length > 0) {
      const shuffledQuestions = [...Array(questions.length).keys()];
      for (let i = shuffledQuestions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledQuestions[i], shuffledQuestions[j]] = [shuffledQuestions[j], shuffledQuestions[i]];
      }
      setAvailableQuestions(shuffledQuestions);
      setCurrentQuestion(shuffledQuestions[0]);
    }
  }, [questions]);

  const getNextQuestion = () => {
    const remainingQuestions = availableQuestions.filter(q => !answeredQuestions.has(q));
    if (remainingQuestions.length === 0) {
      setShowScore(true);
      return;
    }
    const randomIndex = Math.floor(Math.random() * remainingQuestions.length);
    return remainingQuestions[randomIndex];
  };

  const handleAnswerClick = (selectedAnswer: number) => {
    if (questions.length > 0) {
      const isCorrect = selectedAnswer === questions[currentQuestion].correctAnswer;
      if (isCorrect) {
        setScore(score + 1);
        setAnsweredQuestions(prev => new Set(prev).add(currentQuestion));
      }

      const nextQuestion = getNextQuestion();
      if (nextQuestion !== undefined) {
        setCurrentQuestion(nextQuestion);
      } else {
        setShowScore(true);
      }
    }
  };

  const resetQuiz = async () => {
    try {
      const newQuestions = await generateQuizQuestions(theme);
      setAvailableQuestions([...Array(newQuestions.length).keys()]);
      setQuestions(newQuestions);
      setShowScore(false);
      setScore(0);
      setAnsweredQuestions(new Set());
      setCurrentQuestion(0);
    } catch (error) {
      console.error('Erreur lors de la génération des nouvelles questions:', error);
    }
  };

  return (
    <div className="space-y-6">
      {!showScore ? (
        <>
          {questions.length > 0 && (
            <>
              <h3 className="text-xl font-semibold mb-4">
                Question {currentQuestion + 1}/{questions.length}
              </h3>
              <p className="mb-4">{questions[currentQuestion].question}</p>
              <div className="space-y-2">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerClick(index)}
                    className="w-full p-3 text-left rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </>
          )}
        </>
      ) : (
        <div className="text-center space-y-4">
          <h3 className="text-2xl font-bold mb-4">Quiz terminé !</h3>
          <p className="text-xl">
            Votre score : {score}/{questions.length}
          </p>
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Réponses correctes :</h4>
            {questions.map((q, idx) => (
              <div key={idx} className="bg-white/10 p-4 rounded-lg">
                <p className="font-medium">{q.question}</p>
                <p className="text-green-400">Réponse correcte : {q.options[q.correctAnswer]}</p>
              </div>
            ))}
          </div>
          <button
            onClick={resetQuiz}
            className="mt-6 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Recommencer le quiz
          </button>
        </div>
      )}
    </div>
  );
};

const MeditationTimer = () => {
  const [time, setTime] = useState(300); // 5 minutes
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, time]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTime(300);
  };

  return (
    <div className="text-center space-y-6">
      <div className="text-4xl font-bold">
        {Math.floor(time / 60)}:{(time % 60).toString().padStart(2, '0')}
      </div>
      <div className="space-x-4">
        <button
          onClick={toggleTimer}
          className="px-6 py-2 rounded-lg bg-white/10 hover:bg-white/20"
        >
          {isActive ? 'Pause' : 'Démarrer'}
        </button>
        <button
          onClick={resetTimer}
          className="px-6 py-2 rounded-lg bg-white/10 hover:bg-white/20"
        >
          Réinitialiser
        </button>
      </div>
    </div>
  );
};

const EmotionalExploration = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [answer, setAnswer] = useState('');

  const handleSubmit = () => {
    if (answer.trim()) {
      setAnswers([...answers, answer]);
      setAnswer('');
      if (currentQuestion < emotionalQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      }
    }
  };

  return (
    <div className="space-y-6">
      {currentQuestion < emotionalQuestions.length ? (
        <>
          <h3 className="text-xl font-semibold mb-4">
            {emotionalQuestions[currentQuestion]}
          </h3>
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="w-full p-3 rounded-lg bg-white/10 text-white"
            rows={4}
          />
          <button
            onClick={handleSubmit}
            className="px-6 py-2 rounded-lg bg-white/10 hover:bg-white/20"
          >
            Suivant
          </button>
        </>
      ) : (
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">Merci pour vos réponses</h3>
          <p className="text-lg">Vos réflexions ont été enregistrées.</p>
        </div>
      )}
    </div>
  );
};

const ChakraBalance = () => {
  const [selectedChakra, setSelectedChakra] = useState<number | null>(null);
  const [isBalancing, setIsBalancing] = useState(false);

  const handleChakraClick = (index: number) => {
    setSelectedChakra(index);
    setIsBalancing(true);
    setTimeout(() => {
      setIsBalancing(false);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4">
        {chakras.map((chakra, index) => (
          <div
            key={index}
            onClick={() => handleChakraClick(index)}
            className={`
              p-4 rounded-lg cursor-pointer transition-all duration-300
              ${isBalancing && selectedChakra === index ? 'animate-pulse' : ''}
            `}
            style={{ backgroundColor: chakra.color + '40' }}
          >
            <h3 className="text-lg font-semibold">{chakra.name}</h3>
          </div>
        ))}
      </div>
      {selectedChakra !== null && (
        <div className="text-center">
          <p>
            {isBalancing
              ? `Harmonisation du chakra ${chakras[selectedChakra].name} en cours...`
              : `Le chakra ${chakras[selectedChakra].name} est harmonisé`}
          </p>
        </div>
      )}
    </div>
  );
};

const NumerologyCalculator: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [birthDate, setBirthDate] = useState<string>('');
  const [result, setResult] = useState<string | null>(null);

  const calculateLifePath = (date: string) => {
    const numbers = date.split('-').join('').split('').map(Number);
    const sum = numbers.reduce((a, b) => a + b, 0);
    if (sum <= 9) return sum;
    return parseInt(sum.toString().split('').reduce((a, b) => (parseInt(a) + parseInt(b)).toString()));
  };

  const generateNumerologyReading = async () => {
    if (!name || !birthDate) return;

    const lifePathNumber = calculateLifePath(birthDate);

    try {
      const prompt = `Génère une interprétation numérologique détaillée et personnalisée pour:
Nom: ${name}
Chemin de vie: ${lifePathNumber}

Format souhaité avec balises de couleur:
[purple]1. Signification du nombre chemin de vie[/purple]
[blue]2. Forces et défis[/blue]
[green]3. Conseils spirituels[/green]

Note: Utilise ces balises de couleur pour chaque section.`;

      const response = await hf.textGeneration({
        model: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
        inputs: prompt,
        parameters: {
          max_new_tokens: 500,
          temperature: 0.7,
          top_p: 0.9,
        }
      });

      setResult(response.generated_text);
    } catch (error) {
      console.error('Error:', error);
      setResult("Une erreur est survenue lors de la génération de l'interprétation.");
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-2xl">
      <h3 className="text-2xl font-bold text-white mb-6">Calcul Numérologique</h3>

      <div className="space-y-4">
        <div>
          <label className="block text-white mb-2">Votre nom complet</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-gray-300"
            placeholder="Ex: Jean Dupont"
          />
        </div>

        <div>
          <label className="block text-white mb-2">Date de naissance</label>
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-gray-300"
          />
        </div>

        <div className="space-y-4">
          <button
            onClick={generateNumerologyReading}
            className="w-full py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg font-medium
                     hover:from-purple-600 hover:to-indigo-600 transition-all duration-200"
          >
            Calculer mon profil numérologique
          </button>

          {result && (
            <button
              onClick={() => {
                setResult(null);
                setName('');
                setBirthDate('');
              }}
              className="w-full py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg font-medium
                       hover:from-red-600 hover:to-pink-600 transition-all duration-200"
            >
              Réinitialiser
            </button>
          )}
        </div>

        {result && (
          <div className="mt-6 p-6 bg-white/10 rounded-lg">
            <div className="prose prose-invert">
              {result.split('\n').map((line, i) => {
                  if (line.includes('[purple]')) {
                    return <p key={i} className="text-purple-400 font-bold text-xl">{line.replace('[purple]', '').replace('[/purple]', '')}</p>
                  } else if (line.includes('[blue]')) {
                    return <p key={i} className="text-blue-400 font-bold text-xl">{line.replace('[blue]', '').replace('[/blue]', '')}</p>
                  } else if (line.includes('[green]')) {
                    return <p key={i} className="text-green-400 font-bold text-xl">{line.replace('[green]', '').replace('[/green]', '')}</p>
                  }
                  return <p key={i} className="text-white">{line}</p>
                })
              }
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const EnneagramCalculator: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [fears, setFears] = useState<string[]>(['']);
  const [questions, setQuestions] = useState<string[]>([]);

  useEffect(() => {
    const generateQuestions = async () => {
      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt: "Génère 5 questions différentes pour un test d'ennéagramme qui aide à découvrir son type de personnalité. Les questions doivent être introspectives et varier à chaque fois."
          })
        });

        const data = await response.json();
        const generatedQuestions = data.response
          .split('\n')
          .filter((q: string) => q.trim().length > 0)
          .slice(0, 5);

        setQuestions(generatedQuestions);
      } catch (error) {
        console.error('Erreur lors de la génération des questions:', error);
        // Questions de secours en cas d'erreur
        setQuestions([
          "Comment réagissez-vous face aux défis ?",
          "Quelle est votre plus grande motivation ?",
          "Comment gérez-vous vos émotions ?",
          "Que recherchez-vous dans vos relations ?",
          "Comment prenez-vous vos décisions ?"
        ]);
      }
    };

    generateQuestions();
  }, []);

  const enneagramTypes = {
    1: {
      title: "Le Perfectionniste",
      description: "Rationnel, idéaliste, moral, perfectionniste et organisé."
    },
    2: {
      title: "L'Aidant",
      description: "Bienveillant, généreux, possessif et altruiste."
    },
    3: {
      title: "Le Battant",
      description: "Adaptable, ambitieux, orienté image et succès."
    },
    4: {
      title: "L'Individualiste",
      description: "Créatif, sensible, dramatique et introspectif."
    },
    5: {
      title: "L'Observateur",
      description: "Perspicace, innovant, isolé et analytique."
    },
    6: {
      title: "Le Loyaliste",
      description: "Engagé, orienté sécurité, anxieux et vigilant."
    },
    7: {
      title: "L'Enthousiaste",
      description: "Spontané, versatile, distrait et optimiste."
    },
    8: {
      title: "Le Chef",
      description: "Puissant, dominateur, confiant et décisif."
    },
    9: {
      title: "Le Médiateur",
      description: "Réceptif, rassurant, complaisant et apaisant."
    }
  };

  const handleAnswer = (score: number) => {
    const newAnswers = [...answers, score];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const maxScore = Math.max(...newAnswers);
      const type = newAnswers.indexOf(maxScore) + 1;
      setResult(JSON.stringify(enneagramTypes[type as keyof typeof enneagramTypes]));
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setResult(null);
  };

  return (
    <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-2xl">
      <h3 className="text-2xl font-bold text-white mb-6">Test d'Ennéagramme</h3>

      {!result ? (
        <div className="space-y-6">
          <p className="text-white mb-4">Question {currentQuestion + 1}/{questions.length}</p>
          <p className="text-white text-lg mb-6">{questions[currentQuestion]}</p>

          <div className="grid grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5].map((score) => (
              <button
                key={score}
                onClick={() => handleAnswer(score)}
                className="py-3 px-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg
                         hover:from-purple-600 hover:to-indigo-600 transition-all duration-200"
              >
                {score}
              </button>
            ))}
          </div>
          <p className="text-white text-sm text-center mt-4">
            1 = Pas du tout d'accord, 5 = Totalement d'accord
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {result && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 rounded-lg">
                <h4 className="text-2xl font-bold text-white mb-4 text-center">
                  {JSON.parse(result).title}
                </h4>
                <p className="text-white text-lg">{JSON.parse(result).description}</p>
              </div>

              <div className="bg-gradient-to-r from-green-500 to-teal-500 p-6 rounded-lg">
                <h5 className="text-xl font-semibold text-white mb-3">Conseils de développement :</h5>
                <ul className="text-white space-y-2">
                  <li>• Prenez conscience de vos points forts et acceptez vos zones d'amélioration</li>
                  <li>• Pratiquez l'auto-observation sans jugement</li>
                  <li>• Explorez différentes perspectives pour enrichir votre compréhension</li>
                  <li>• Cultivez la patience dans votre processus de croissance personnelle</li>
                </ul>
              </div>
            </div>
          )}
          <button
            onClick={resetQuiz}
            className="w-full py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg font-medium
                     hover:from-red-600 hover:to-pink-600 transition-all duration-200"
          >
            Recommencer le test
          </button>
        </div>
      )}
    </div>
  );
};

const ParcoursSpirituels = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [selectedGame, setSelectedGame] = useState<GameType | null>(null);
  const [fears, setFears] = useState<string[]>(['']);
  const [name, setName] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-16 px-4 md:px-8 lg:px-16">
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-12 animate__animated animate__fadeInDown">
          Parcours Spirituels
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {spiritualPaths.map((path) => (
            <div 
              key={path.id}
              className={`
                relative group transform transition-all duration-500 
                ${activeCard === path.id ? 'scale-105 rotate-3 z-50' : 'hover:scale-105 hover:rotate-3'}
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

                <ul className="space-y-2 text-sm md:opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500">
                  {path.details.map((detail, index) => (
                    <li 
                      key={index} 
                      className="flex items-center text-white/90 hover:text-yellow-300 transition-colors duration-300"
                      onClick={() => setSelectedGame(path.game)}
                    >
                      <span className="mr-2">•</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gray-800 rounded-xl p-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4 text-gray-100">
              Sélectionnez un parcours
            </h3>
            <p className="text-gray-200">
              Cliquez sur un détail pour découvrir un jeu ou une activité interactive.
            </p>
          </div>
          {selectedGame && selectedGame.component()}
        </div>

        {/* Section AI Chat */}
        <div className="mt-12 max-w-3xl mx-auto">
          <AIChat />
        </div>

        {/* Section AI Dialog */}
        <div className="mt-12 max-w-3xl mxauto">
          <AIGameDialog />
        </div>


        {/* Section Numérologie */}
        <div className="mt-12 max-w-3xl mx-auto">
          <NumerologyCalculator />
        </div>

        {/* Section Ennéagramme */}
        <div className="mt-12 max-w-3xl mx-auto">
          <EnneagramCalculator />
        </div>

        {/* Section Transformation des Peurs */}
        <div className="mt-12 bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-2xl">
          <h3 className="text-2xl font-bold text-white mb-6">Transformation des Peurs</h3>

          <div className="mb-6">
            <input
              type="text"
              placeholder="Entrez votre prénom"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-gray-300 mb-4"
            />
          </div>

          <div className="grid gridcols-2 gap-6">
            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-white mb-4">Mes Peurs</h4>
              {fears.map((fear, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={fear}
                    onChange={(e) => {
                      const newFears = [...fears];
                      newFears[index] = e.target.value;
                      setFears(newFears);
                    }}
                    placeholder="Entrez une peur"
                    className="flex-1 p-3 rounded-lg bg-white/10 text-white placeholder-gray-300"
                  />
                  <button
                    onClick={() => {
                      if (fear.trim()) {
                        const newFears = [...fears];
                        if (index === fears.length - 1) {
                          newFears.push('');
                        }
                        newFears[index] = fear.trim();
                        setFears(newFears);
                      }
                    }}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                  >
                    OK
                  </button>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-white mb-4">Mes Affirmations Positives</h4>
              <div className="space-y-2">
                {fears.map((fear, index) => (
                  fear.trim() && (
                    <div key={index} className="p-4 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20">
                      <p className="text-white">
                        Moi {name ? name : ""}, {generatePositiveAffirmation(fear)}
                      </p>
                    </div>
                  )
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const generatePositiveAffirmation = (fear: string): string => {
  const fearLower = fear.toLowerCase();
  if (fearLower.includes('mort')) {
    return "je célèbre chaque instant de la vie avec gratitude et sérénité";
  }
  if (fearLower.includes('chat')) {
    return "je ressens une profonde paix et harmonie en présence des félins";
  }
  if (fearLower.includes('chien')) {
    return "j'apprécie la loyauté et l'amour inconditionnel des canidés";
  }
  if (fearLower.includes('hauteur')) {
    return "je savoure la liberté et la beauté des points de vue élevés";
  }
  if (fearLower.includes('noir') || fearLower.includes('obscurité')) {
    return "je trouve le calme et la paix dans le silence de la nuit";
  }
  if (fearLower.includes('échec')) {
    return "je transforme chaque défi en opportunité de croissance";
  }
  if (fearLower.includes('rejet')) {
    return "je rayonne de confiance et d'authenticité dans mes relations";
  }
  if (fearLower.includes('solitude')) {
    return "je cultive une relation enrichissante avec moi-même";
  }
  if (fearLower.includes('avenir')) {
    return "j'avance avec confiance sur mon chemin de vie";
  }
  return "je m'épanouis pleinement dans ma force intérieure";
};

export default ParcoursSpirituels;