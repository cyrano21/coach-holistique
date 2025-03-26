"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import ParticleBackground from "@/components/ParticleBackground";
import AIGameDialog from "./AIGameDialog";
import AIChat from "./AIChat";
import {
  FaMountain,
  FaHandHoldingHeart,
  FaYinYang,
  FaBrain,
} from "react-icons/fa";
import MantraDuJour from "./MantraDuJour";
import EFT from "@/components/EFT";
import BonshommesAllumettes from "@/components/spirituels/BonshommesAllumettes";

// Define Question type
type Question = {
  question: string;
  options: string[];
  correctAnswer: number;
};

type GameType = {
  title: string;
  description: string;
  component: () => React.ReactNode;
  color?: {
    background: string;
    titleText: string;
    paragraphText: string;
    buttonBg: string;
  };
};

const getEmotionalQuestions = async (): Promise<string[]> => {
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt:
          "Génère 3 questions introspectives sur les émotions et le développement personnel. Format: une question par ligne sans numérotation.",
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();

      if (
        response.status === 429 &&
        errorData.error === "CREDIT_LIMIT_EXCEEDED"
      ) {
        return [
          "Comment vos émotions influencent-elles vos décisions quotidiennes ?",
          "Quelle est la dernière situation où vous avez ressenti une émotion forte et comment l'avez-vous gérée ?",
          "Quelles pratiques vous aident à maintenir votre équilibre émotionnel ?",
        ];
      }

      throw new Error(errorData.message || "Erreur lors de l'appel à l'API");
    }

    const data = await response.json();
    return data.response.split("\n").filter((q: string) => q.trim());
  } catch (error) {
    console.error("Erreur lors de la génération des questions:", error);
    // Questions de secours en cas d'erreur
    return [
      "Comment vos émotions influencent-elles vos décisions quotidiennes ?",
      "Quelle est la dernière situation où vous avez ressenti une émotion forte et comment l'avez-vous gérée ?",
      "Quelles pratiques vous aident à maintenir votre équilibre émotionnel ?",
    ];
  }
};

const getChakraQuestions = async (currentPath?: string): Promise<string> => {
  // Fallback questions for different paths
  const fallbackQuestions = {
    "Approches Comparatives":
      "Comment l'étude comparative enrichit-elle votre compréhension spirituelle?|Élargit les perspectives,Développe l'empathie,Approfondit la sagesse,Transcende les frontières|2",
    "Méditation Profonde":
      "Qu'est-ce qui définit une pratique méditative authentique?|Présence totale,Lâcher-prise,Conscience de soi,Paix intérieure|0",
    "Connexion Intérieure":
      "Comment cultiver une connexion plus profonde avec soi-même?|Méditation,Introspection,Écoute intérieure,Acceptation|1",
    "Énergétique Spirituelle":
      "Quel est le rôle fondamental de l'énergie spirituelle?|Guérison,Transformation,Expansion de conscience,Alignement|2",
    "Quiz des Traditions Spirituelles":
      "Quel est le but ultime de votre exploration spirituelle?|Connaissance,Amour,Paix,Harmonie|3",
    "Analyse des Systèmes de Croyances":
      "Comment définissez-vous un système de croyances universel?|Valeurs communes,Pratiques identiques,Principes fondamentaux,Expérience personnelle|2",
  };

  // Si un chemin est fourni et qu'il existe dans les questions de secours, utiliser directement la question de secours
  if (
    currentPath &&
    fallbackQuestions[currentPath as keyof typeof fallbackQuestions]
  ) {
    console.log("Using fallback question for path:", currentPath);
    return fallbackQuestions[currentPath as keyof typeof fallbackQuestions];
  }

  // Sinon, essayer de générer une nouvelle question avec l'IA
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: `Génère une question spirituelle profonde pour le thème "${
          currentPath || "Spiritualité"
        }".
                Format requis: "Question|Option1,Option2,Option3,Option4|IndexRéponseCorrecte(0-3)"
                Example: "Quelle est l'essence de la spiritualité?|Méditation,Amour,Sagesse,Harmonie|2"`,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();

      if (
        response.status === 429 &&
        errorData.error === "CREDIT_LIMIT_EXCEEDED"
      ) {
        console.log("API credit limit exceeded, using fallback question");
        // Utiliser une question de secours générique si le chemin n'est pas reconnu
        return fallbackQuestions["Quiz des Traditions Spirituelles"];
      }

      throw new Error(errorData.message || "Erreur lors de l'appel à l'API");
    }

    const data = await response.json();

    if (!data.response) {
      throw new Error("Réponse vide de l'API");
    }

    // Vérifier si la réponse est au bon format
    const formattedResponse = data.response.trim();
    if (
      !formattedResponse.includes("|") ||
      formattedResponse.split("|").length !== 3
    ) {
      console.error("Format de réponse incorrect:", formattedResponse);
      throw new Error("Format de réponse incorrect");
    }

    return formattedResponse;
  } catch (error) {
    console.error("Erreur lors de la génération de question:", error);
    // Utiliser une question de secours en fonction du chemin ou une question générique
    if (
      currentPath &&
      fallbackQuestions[currentPath as keyof typeof fallbackQuestions]
    ) {
      return fallbackQuestions[currentPath as keyof typeof fallbackQuestions];
    }

    // Question de secours générique si aucun chemin n'est reconnu
    return fallbackQuestions["Quiz des Traditions Spirituelles"];
  }
};

const spiritualPaths = [
  {
    id: 1,
    title: "Quiz des Traditions Spirituelles",
    icon: FaYinYang,
    color: "from-purple-600 to-indigo-600",
    description:
      "Explorez la richesse et la diversité des traditions spirituelles",
    details: [
      "Analyse comparative des traditions",
      "Compréhension des systèmes de croyances",
      "Recherche de points communs universels",
    ],
    game: {
      title: "Quiz des Traditions Spirituelles",
      description:
        "Explorez et testez vos connaissances sur les traditions spirituelles",
      component: () => (
        <SpiritualQuiz
          theme="spiritual"
          path="Quiz des Traditions Spirituelles"
        />
      ),
      color: {
        background: "from-purple-600 to-indigo-600",
        titleText: "text-white",
        paragraphText: "text-white/80",
        buttonBg: "bg-purple-600 hover:bg-purple-500",
      },
    },
  },
  {
    id: 2,
    title: "Analyse des Systèmes de Croyances",
    icon: FaBrain,
    color: "from-green-600 to-teal-600",
    description:
      "Approfondissez votre compréhension des différents systèmes spirituels",
    details: [
      "Étude comparative des philosophies",
      "Exploration des paradigmes spirituels",
      "Découverte des principes fondamentaux",
    ],
    game: {
      title: "Analyse des Systèmes de Croyances",
      description: "Explorez les différents systèmes de croyances spirituelles",
      component: () => (
        <SpiritualQuiz
          theme="spiritual"
          path="Analyse des Systèmes de Croyances"
        />
      ),
      color: {
        background: "from-green-600 to-teal-600",
        titleText: "text-white",
        paragraphText: "text-white/80",
        buttonBg: "bg-green-600 hover:bg-green-500",
      },
    },
  },
  {
    id: 3,
    title: "Méditation Profonde",
    description:
      "Techniques de méditation avancées pour la transformation intérieure",
    icon: FaMountain,
    color: "from-blue-600 to-indigo-700",
    details: [
      "Pratiques méditatives profondes",
      "Techniques de pleine conscience",
      "Exploration de l'état de conscience",
    ],
    game: {
      title: "Méditation Profonde",
      description: "Approfondissez votre pratique méditative",
      component: () => <MeditationTimer />,
      color: {
        background: "from-blue-600 to-indigo-700",
        titleText: "text-white",
        paragraphText: "text-white/80",
        buttonBg: "bg-blue-600 hover:bg-blue-500",
      },
    },
  },
  {
    id: 4,
    title: "Connexion Intérieure",
    description: "Développement de l'intelligence émotionnelle et spirituelle",
    icon: FaHandHoldingHeart,
    color: "from-pink-600 to-rose-700",
    details: [
      "Exploration émotionnelle",
      "Développement personnel",
      "Alignement intérieur",
    ],
    game: {
      title: "Connexion Intérieure",
      description: "Explorez et développez votre intelligence émotionnelle",
      component: () => <EmotionalExploration onResponse={() => {}} />,
      color: {
        background: "from-pink-600 to-rose-700",
        titleText: "text-white",
        paragraphText: "text-white/80",
        buttonBg: "bg-pink-600 hover:bg-pink-500",
      },
    },
  },
  {
    id: 5,
    title: "Énergétique Spirituelle",
    description: "Exploration des énergies subtiles et des chakras",
    icon: FaYinYang,
    color: "from-orange-600 to-amber-700",
    details: [
      "Compréhension des chakras",
      "Circulation énergétique",
      "Harmonisation des énergies",
    ],
    game: {
      title: "Énergétique Spirituelle",
      description: "Découvrez et équilibrez vos chakras",
      component: () => <ChakraBalance onAnswer={() => {}} />,
      color: {
        background: "from-orange-600 to-amber-700",
        titleText: "text-white",
        paragraphText: "text-white/80",
        buttonBg: "bg-orange-600 hover:bg-orange-500",
      },
    },
  },
  {
    id: 6,
    title: "EFT - Libération Émotionnelle",
    icon: FaHandHoldingHeart,
    color: "from-yellow-600 to-orange-600",
    description: "Guérison émotionnelle par le tapotement guidé (EFT)",
    details: [
      "Visualisation des points de tapotement",
      "Phrases de libération émotionnelle",
      "Voix et audio guidés",
    ],
    game: {
      title: "EFT",
      description: "Suivez une séance de libération émotionnelle guidée",
      component: () => <EFT />,
      color: {
        background: "from-yellow-600 to-orange-600",
        titleText: "text-white",
        paragraphText: "text-white/80",
        buttonBg: "bg-yellow-600 hover:bg-orange-500",
      },
    },
  },
];

// Define quiz questions for different spiritual paths
const spiritualPathQuizzes: Record<string, Question[]> = {
  "Quiz des Traditions Spirituelles": [
    {
      question: "Quel est le but ultime de votre exploration spirituelle?",
      options: ["Connaissance", "Amour", "Paix", "Harmonie"],
      correctAnswer: 3,
    },
    {
      question:
        "Comment percevez-vous la connexion entre différentes traditions spirituelles?",
      options: [
        "Complémentarité",
        "Contradiction",
        "Indifférence",
        "Universalité",
      ],
      correctAnswer: 0,
    },
    {
      question:
        "Quelle approche vous attire le plus dans la compréhension spirituelle?",
      options: ["Analytique", "Intuitive", "Émotionnelle", "Expérimentale"],
      correctAnswer: 1,
    },
    {
      question: "Quel aspect des traditions spirituelles vous fascine le plus?",
      options: [
        "Rituels",
        "Philosophie",
        "Pratiques méditatives",
        "Mythologie",
      ],
      correctAnswer: 2,
    },
  ],
  "Analyse des Systèmes de Croyances": [
    {
      question: "Comment définissez-vous un système de croyances universel?",
      options: [
        "Valeurs communes",
        "Pratiques identiques",
        "Principes fondamentaux",
        "Expérience personnelle",
      ],
      correctAnswer: 2,
    },
    {
      question:
        "Quelle est votre approche principale pour comprendre différentes traditions?",
      options: [
        "Comparaison",
        "Immersion",
        "Analyse critique",
        "Respect mutuel",
      ],
      correctAnswer: 3,
    },
    {
      question:
        "Quel élément recherchez-vous principalement dans l'étude des traditions?",
      options: [
        "Points communs",
        "Différences",
        "Origines historiques",
        "Pratiques spirituelles",
      ],
      correctAnswer: 0,
    },
    {
      question: "Comment percevez-vous la diversité des systèmes de croyances?",
      options: ["Enrichissement", "Confusion", "Conflit", "Relativité"],
      correctAnswer: 0,
    },
  ],
};

const SpiritualQuiz = ({ theme, path }: { theme: string; path?: string }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Parse a question string into a Question object
  const parseChakraQuestion = useCallback(
    (questionString: string): Question => {
      const parts = questionString.split("|");
      if (parts.length !== 3) {
        console.warn("Invalid question format:", questionString);
        return {
          question: "Question par défaut",
          options: ["Option 1", "Option 2", "Option 3", "Option 4"],
          correctAnswer: 0,
        };
      }

      return {
        question: parts[0],
        options: parts[1].split(","),
        correctAnswer: parseInt(parts[2], 10),
      };
    },
    []
  );

  // Generate initial questions based on the current path
  const generateInitialQuestions = useCallback(async () => {
    try {
      // First, try to use predefined path-specific questions
      if (path && spiritualPathQuizzes[path]) {
        setQuestions(spiritualPathQuizzes[path]);
        setCurrentQuestionIndex(0);
        return;
      }

      // If no predefined questions, use getChakraQuestions
      const initialQuestionString = await getChakraQuestions(path);
      const parsedQuestion = parseChakraQuestion(initialQuestionString);
      setQuestions([parsedQuestion]);
      setCurrentQuestionIndex(0);
    } catch (error) {
      console.error("Error generating initial questions:", error);
      // Fallback to a default question
      const defaultQuestion: Question = {
        question: "Quelle est votre approche spirituelle principale?",
        options: ["Méditation", "Étude", "Pratique", "Contemplation"],
        correctAnswer: 0,
      };
      setQuestions([defaultQuestion]);
    }
  }, [path, parseChakraQuestion]);

  // Use path-specific questions or default to general spiritual quiz
  useEffect(() => {
    generateInitialQuestions();
  }, [path, generateInitialQuestions]);

  // Handle answer selection
  const handleAnswerSelect = useCallback(
    (answer: string) => {
      if (quizCompleted) return;

      setSelectedAnswer(answer);

      // Check if the answer is correct
      const currentQuestion = questions[currentQuestionIndex];
      const correctOptionIndex = currentQuestion.correctAnswer;
      const isCorrect = currentQuestion.options[correctOptionIndex] === answer;

      // Update score
      if (isCorrect) {
        setScore((prevScore) => prevScore + 1);
      }

      // Move to next question or complete quiz
      setTimeout(() => {
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex((prev) => prev + 1);
          setSelectedAnswer(null);
        } else {
          setQuizCompleted(true);
        }
      }, 1000);
    },
    [currentQuestionIndex, questions, quizCompleted]
  );

  // Quiz theme configuration
  const quizTheme = {
    spiritual: {
      bgColor: "bg-purple-600",
      textColor: "text-white",
      buttonColor: "bg-purple-500 hover:bg-purple-600",
    },
    // Add more themes if needed
  };

  // Render quiz content
  return (
    <div
      className={`p-8 rounded-xl ${
        quizTheme[theme as keyof typeof quizTheme].bgColor
      } text-white`}
    >
      {!quizCompleted ? (
        <div>
          {questions.length > 0 && (
            <div>
              <h3 className="text-2xl font-bold mb-6 text-yellow-400 drop-shadow-lg tracking-wide animate-pulse">
                {questions[currentQuestionIndex].question}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {questions[currentQuestionIndex].options.map(
                  (option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(option)}
                      className={`
                      p-4 rounded-lg text-left transition-all duration-300
                      ${
                        selectedAnswer === option
                          ? option ===
                            questions[currentQuestionIndex].options[
                              questions[currentQuestionIndex].correctAnswer
                            ]
                            ? "bg-green-500"
                            : "bg-red-500"
                          : "bg-white/20 hover:bg-white/30"
                      }
                    `}
                    >
                      {option}
                    </button>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-6">Quiz Terminé</h3>
          <p className="text-xl mb-4">
            Votre score : {score} / {questions.length}
          </p>
          <p className="text-lg">
            {score === questions.length
              ? "Félicitations ! Résultat parfait !"
              : "Continuez à explorer et à apprendre"}
          </p>
        </div>
      )}
    </div>
  );
};

/**
 * Composant de minuterie pour les séances de méditation
 * Prévu pour être intégré dans les parcours de méditation via spiritualPaths
 */
interface TimerProps {
  onComplete?: () => void;
  onProgress?: (time: number) => void;
}

const MeditationTimer = ({ onComplete, onProgress }: TimerProps) => {
  const [time, setTime] = useState(300); // 5 minutes
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
    }
    if (time === 0) {
      onComplete?.();
    }
    onProgress?.(time);
    return () => clearInterval(interval);
  }, [isActive, time, onComplete, onProgress]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTime(300);
  };

  return (
    <div className="text-center space-y-6">
      <div className="text-4xl font-bold text-yellow-500">
        {Math.floor(time / 60)}:{(time % 60).toString().padStart(2, "0")}
      </div>
      <div className="space-x-4">
        <button
          onClick={toggleTimer}
          className="px-6 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white"
        >
          {isActive ? "Pause" : "Démarrer"}
        </button>
        <button
          onClick={resetTimer}
          className="px-6 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white"
        >
          Réinitialiser
        </button>
      </div>
    </div>
  );
};

interface EmotionalExplorationProps {
  onResponse: (answer: string) => void;
}

const EmotionalExploration = ({ onResponse }: EmotionalExplorationProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [answer, setAnswer] = useState("");
  const [questions, setQuestions] = useState<string[]>([]);

  useEffect(() => {
    const loadQuestions = async () => {
      const emotionalQuestions = await getEmotionalQuestions();
      setQuestions(emotionalQuestions);
    };
    loadQuestions();
  }, []);

  const handleSubmit = () => {
    if (answer.trim()) {
      setAnswers([...answers, answer]);
      onResponse(answer); // Informer le parent de la réponse
      setAnswer("");
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      }
    }
  };

  return (
    <div className="space-y-6">
      {questions.length > 0 && currentQuestion < questions.length ? (
        <>
          <h3 className="text-xl font-semibold mb-4 text-white">
            {questions[currentQuestion]}
          </h3>
          <div className="form-group">
            <label htmlFor="emotional-answer" className="sr-only">
              Votre réponse à la question
            </label>
            <textarea
              id="emotional-answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-200 border border-white/30"
              rows={4}
              placeholder="Écrivez votre réponse ici..."
              aria-label="Réponse à la question émotionnelle"
            />
          </div>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 rounded-lg bg-white/20 hover:bg-white/30 text-white font-medium"
          >
            Suivant
          </button>
        </>
      ) : (
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4 text-white">Merci pour vos réponses</h3>
          <p className="text-lg text-white">Vos réflexions ont été enregistrées.</p>
        </div>
      )}
    </div>
  );
};

interface ChakraBalanceProps {
  onAnswer: (answer: string, isCorrect: boolean) => void;
}

const ChakraBalance = ({ onAnswer }: ChakraBalanceProps) => {
  interface ChakraQuestion {
    question: string;
    options: string[];
    correctAnswer: number;
  }

  const [loading, setLoading] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<ChakraQuestion | null>(
    null
  );
  const [answer, setAnswer] = useState("");
  const [currentPath, setCurrentPath] = useState<string>(
    "Approches Comparatives"
  );

  // Mettre à jour le chemin actuel en fonction du contexte
  useEffect(() => {
    const selectedPath = spiritualPaths.find(
      (path) =>
        path.title === "Approches Comparatives" ||
        path.title === "Méditation Profonde" ||
        path.title === "Connexion Intérieure" ||
        path.title === "Énergétique Spirituelle"
    );

    if (selectedPath) {
      setCurrentPath(selectedPath.title);
    }
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const parseChakraQuestion = (question: string): ChakraQuestion | null => {
    try {
      const parts: string[] = question.split("|").map((part) => part.trim());

      const [questionText, options, correctAnswer] = parts;

      return {
        question: questionText,
        options: options.split(",").map((opt) => opt.trim()),
        correctAnswer: parseInt(correctAnswer, 10) || 0,
      };
    } catch (error) {
      console.error("Erreur lors du parsing de la question chakra:", error);
      return null;
    }
  };

  const loadNewQuestion = useCallback(async () => {
    if (loading) return; // évite les appels multiples

    setLoading(true);

    try {
      const question = await getChakraQuestions(currentPath);
      const parsedQuestion = question ? parseChakraQuestion(question) : null;

      // Compare l'ancienne et la nouvelle question pour éviter les updates infinis
      if (
        parsedQuestion &&
        JSON.stringify(parsedQuestion) !== JSON.stringify(currentQuestion)
      ) {
        setCurrentQuestion(parsedQuestion);
      }
    } catch (error) {
      console.error("Erreur lors du chargement de la question chakra:", error);
    } finally {
      setLoading(false);
    }
  }, [currentPath, currentQuestion, parseChakraQuestion, loading]);

  useEffect(() => {
    if (!currentQuestion) {
      loadNewQuestion();
    }
  }, [loadNewQuestion, currentQuestion]);

  useEffect(() => {
    loadNewQuestion();
  }, [loadNewQuestion]);

  const handleSubmit = () => {
    if (!currentQuestion) return;

    const selectedOptionIndex = currentQuestion.options.findIndex(
      (opt) => opt.trim() === answer.trim()
    );

    const isCorrect = selectedOptionIndex === currentQuestion.correctAnswer;

    onAnswer(answer, isCorrect);

    // Charger une nouvelle question après la soumission
    loadNewQuestion();

    // Réinitialiser la réponse
    setAnswer("");
  };

  if (loading || !currentQuestion) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-purple-900 to-indigo-900 text-white p-8 rounded-xl shadow-2xl">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-yellow-500 mb-4 text-center">
          {currentQuestion.question}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => setAnswer(option)}
              className={`p-4 rounded-lg text-left transition-all duration-300 
                ${
                  answer === option
                    ? "bg-purple-600 text-white"
                    : "bg-white/10 hover:bg-white/20"
                }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-6">
        <button
          onClick={handleSubmit}
          disabled={!answer}
          className={`px-8 py-3 rounded-full text-lg font-bold transition-all duration-300 
            ${
              answer
                ? "bg-purple-600 hover:bg-purple-700 text-white"
                : "bg-gray-400 cursor-not-allowed"
            }`}
        >
          Soumettre la réponse
        </button>
      </div>
    </div>
  );
};

const NumerologyCalculator: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [birthDate, setBirthDate] = useState<string>("");
  const [result, setResult] = useState<string | null>(null);

  const calculateLifePath = (date: string) => {
    const numbers = date.split("-").join("").split("").map(Number);
    const sum = numbers.reduce((a, b) => a + b, 0);
    if (sum <= 9) return sum;
    return parseInt(
      sum
        .toString()
        .split("")
        .reduce((a, b) => (parseInt(a) + parseInt(b)).toString())
    );
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

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();

        if (
          response.status === 429 &&
          errorData.error === "CREDIT_LIMIT_EXCEEDED"
        ) {
          setResult(
            "Le service d'interprétation numérique est temporairement indisponible. " +
              "Votre nombre de vie " +
              lifePathNumber +
              " représente votre essence et votre mission de vie. " +
              "Pour une interprétation complète, veuillez réessayer plus tard ou consulter un spécialiste en numérologie."
          );
          return;
        }

        throw new Error(errorData.message || "Erreur lors de l'appel à l'API");
      }

      const data = await response.json();
      setResult(data.response);
    } catch (error) {
      console.error("Error:", error);
      setResult(
        "Une erreur est survenue lors de la génération de l'interprétation. " +
          "Votre nombre de vie " +
          lifePathNumber +
          " est néanmoins un indicateur important de votre chemin spirituel."
      );
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-2xl">
      <h3 className="text-2xl font-bold text-white mb-6">
        Calcul Numérologique
      </h3>

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
          <div className="form-group">
            <label htmlFor="birth-date-input" className="block text-white mb-2">
              Date de naissance
            </label>
            <input
              id="birth-date-input"
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-gray-300"
              aria-label="Sélectionner votre date de naissance"
            />
          </div>
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
                setName("");
                setBirthDate("");
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
              {result.split("\n").map((line, i) => {
                if (line.includes("[purple]")) {
                  return (
                    <p key={i} className="text-purple-400 font-bold text-xl">
                      {line.replace("[purple]", "").replace("[/purple]", "")}
                    </p>
                  );
                } else if (line.includes("[blue]")) {
                  return (
                    <p key={i} className="text-blue-400 font-bold text-xl">
                      {line.replace("[blue]", "").replace("[/blue]", "")}
                    </p>
                  );
                } else if (line.includes("[green]")) {
                  return (
                    <p key={i} className="text-green-400 font-bold text-xl">
                      {line.replace("[green]", "").replace("[/green]", "")}
                    </p>
                  );
                }
                return (
                  <p key={i} className="text-white">
                    {line}
                  </p>
                );
              })}
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
  const [questions, setQuestions] = useState<string[]>([]);

  // Questions par défaut pour l'ennéagramme - mémorisées pour éviter les recréations
  const defaultQuestions = useMemo(() => [
    "Quel est votre plus grand désir intérieur ?",
    "Comment gérez-vous vos relations dans les moments difficiles ?",
    "Quelles sont les peurs qui influencent vos décisions ?",
    "Comment réagissez-vous face à l'échec ?",
    "Qu'est-ce qui vous motive vraiment chaque jour ?",
  ], []);

  useEffect(() => {
    const generateQuestions = async () => {
      try {
        // Ajout d'un contrôleur d'abandon pour le timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => {
          controller.abort('Timeout de la requête après 10 secondes');
        }, 10000); // Augmentation du timeout à 10 secondes
        
        try {
          const response = await fetch("/api/chat", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              prompt:
                "Génère 5 questions différentes pour un test d&apos;ennéagramme qui aide à découvrir son type de personnalité. Les questions doivent être introspectives et varier à chaque fois. Réponds uniquement avec les questions, une par ligne.",
            }),
            signal: controller.signal,
          });
          
          // Nettoyage du timeout seulement si la requête a réussi
          clearTimeout(timeoutId);

          if (!response.ok) {
            // Utiliser les questions par défaut en cas d'erreur HTTP
            console.info(`Réponse HTTP non valide: ${response.status} - Utilisation des questions par défaut`);
            setQuestions(defaultQuestions);
            return;
          }

          let data;
          try {
            data = await response.json();
          } catch {
            console.info("Erreur lors du parsing de la réponse JSON - Utilisation des questions par défaut");
            setQuestions(defaultQuestions);
            return;
          }

          if (!data || typeof data.response !== "string") {
            console.info("Format de réponse invalide - Utilisation des questions par défaut");
            setQuestions(defaultQuestions);
            return;
          }

          // Traiter la réponse pour extraire les questions
          let questions = data.response
            .split("\n")
            .filter((q: string) => q.trim().length > 0)
            .map((q: string) => q.replace(/^\d+[\.\)]\s*/, "").trim()) // Supprimer les numéros au début (1., 2., etc.)
            .filter((q: string) => q.endsWith("?") || q.length > 20); // Garder seulement les questions valides

          // S'assurer d'avoir au moins 5 questions
          if (questions.length < 5) {
            // Compléter avec des questions par défaut si nécessaire
            const questionsManquantes = 5 - questions.length;
            if (questions.length > 0) {
              console.info(`Nombre insuffisant de questions générées (${questions.length}/5) - Complément avec des questions par défaut`);
              // Ajouter uniquement le nombre de questions manquantes
              questions = [
                ...questions,
                ...defaultQuestions.slice(0, questionsManquantes)
              ];
            } else {
              console.info("Aucune question valide générée - Utilisation des questions par défaut");
              questions = defaultQuestions;
            }
          }

          // Limiter à 5 questions maximum
          questions = questions.slice(0, 5);
          
          setQuestions(questions);
        } catch (error) {
          // Vérifier si l'erreur est due à un timeout ou à une annulation
          if (error && 
              typeof error === 'object' && 
              'name' in error && 
              error.name === 'AbortError') {
            console.info("La requête a été interrompue (timeout) - Utilisation des questions par défaut");
          } else {
            console.info("Erreur lors de la génération des questions - Utilisation des questions par défaut");
          }
          // Utilisation d'un ensemble fixe de questions en cas d'erreur
          setQuestions(defaultQuestions);
        }
      } catch {
        console.info("Erreur inattendue - Utilisation des questions par défaut");
        setQuestions(defaultQuestions);
      }
    };

    generateQuestions();
  }, [defaultQuestions]);

  const enneagramTypes = {
    1: {
      title: "Le Perfectionniste",
      description: "Rationnel, idéaliste, moral, perfectionniste et organisé.",
    },
    2: {
      title: "L'Aidant",
      description: "Bienveillant, généreux, possessif et altruiste.",
    },
    3: {
      title: "Le Battant",
      description: "Adaptable, ambitieux, orienté image et succès.",
    },
    4: {
      title: "L'Individualiste",
      description: "Créatif, sensible, dramatique et introspectif.",
    },
    5: {
      title: "L'Observateur",
      description: "Perspicace, innovant, isolé et analytique.",
    },
    6: {
      title: "Le Loyaliste",
      description: "Engagé, orienté sécurité, anxieux et vigilant.",
    },
    7: {
      title: "L'Enthousiaste",
      description: "Spontané, versatile, distrait et optimiste.",
    },
    8: {
      title: "Le Chef",
      description: "Puissant, dominateur, confiant et décisif.",
    },
    9: {
      title: "Le Médiateur",
      description: "Réceptif, rassurant, complaisant et apaisant.",
    },
  };

  const handleAnswer = (score: number) => {
    const newAnswers = [...answers, score];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const maxScore = Math.max(...newAnswers);
      const type = newAnswers.indexOf(maxScore) + 1;
      setResult(
        JSON.stringify(enneagramTypes[type as keyof typeof enneagramTypes])
      );
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setResult(null);
  };

  return (
    <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-2xl">
      <h3 className="text-2xl font-bold text-white mb-6">
        Test d&apos;Ennéagramme
      </h3>

      {!result ? (
        <div className="space-y-6">
          <p className="text-white mb-4">
            Question {currentQuestion + 1}/{questions.length}
          </p>
          <p className="text-white text-lg mb-6">
            {questions[currentQuestion]}
          </p>

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
            1 = Pas du tout d&apos;accord, 5 = Totalement d&apos;accord
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
                <p className="text-white text-lg">
                  {JSON.parse(result).description}
                </p>
              </div>

              <div className="bg-gradient-to-r from-green-500 to-teal-500 p-6 rounded-lg">
                <h5 className="text-xl font-semibold text-white mb-3">
                  Conseils de développement :
                </h5>
                <ul className="text-white space-y-2">
                  <li>
                    • Prenez conscience de vos points forts et acceptez vos
                    zones d&apos;amélioration
                  </li>
                  <li>• Pratiquez l&apos;auto-observation sans jugement</li>
                  <li>
                    • Explorez différentes perspectives pour enrichir votre
                    compréhension
                  </li>
                  <li>
                    • Cultivez la patience dans votre processus de croissance
                    personnelle
                  </li>
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
  const [fears, setFears] = useState<string[]>([""]);
  const [name, setName] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<string | null>(null);

  const hideInitialText = () => {
    const selectPathText = document.querySelector(
      ".select-path-text"
    ) as HTMLElement;
    const clickDetailText = document.querySelector(
      ".click-detail-text"
    ) as HTMLElement;

    if (selectPathText) {
      selectPathText.style.display = "none";
    }

    if (clickDetailText) {
      clickDetailText.style.display = "none";
    }
  };

  // Écouter les événements des composants enfants
  useEffect(() => {
    const handleMeditationComplete = (e: CustomEvent) => {
      const duration = e.detail.duration;
      setAnswers((prev) => [...prev, duration]);
      setResult(`Session de méditation de ${duration} secondes complétée`);
    };

    const handleEmotionalResponse = (e: CustomEvent) => {
      setAnswers((prev) => [...prev, e.detail.answer]);
      setCurrentQuestion((prev) => prev + 1);
    };

    const handleChakraAnswer = (e: CustomEvent) => {
      const { answer, isCorrect } = e.detail;
      setAnswers((prev) => [...prev, answer]);
      setResult(isCorrect ? "Bonne réponse !" : "Continuez d'essayer");
    };

    window.addEventListener(
      "meditation_complete",
      handleMeditationComplete as EventListener
    );
    window.addEventListener(
      "emotional_response",
      handleEmotionalResponse as EventListener
    );
    window.addEventListener(
      "chakra_answer",
      handleChakraAnswer as EventListener
    );

    return () => {
      window.removeEventListener(
        "meditation_complete",
        handleMeditationComplete as EventListener
      );
      window.removeEventListener(
        "emotional_response",
        handleEmotionalResponse as EventListener
      );
      window.removeEventListener(
        "chakra_answer",
        handleChakraAnswer as EventListener
      );
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 py-16 px-4 md:px-8 lg:px-16 overflow-hidden">
      {/* Arrière-plan animé toujours visible */}
      <div className="absolute inset-0 z-[-1]">
        <ParticleBackground />
      </div>

      {/* Animation ou décor flottant */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-10 left-10 w-96 h-96 bg-purple-700 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-700 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      <div className="container mx-auto mt-20">
        <div className="initial-text-container text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 animate-text-glow">
            Parcours Spirituels
          </h2>
          <div className="m-12 mx-auto">
            <MantraDuJour />
          </div>
          <p className="select-path-text text-xl font-medium mb-6 text-transparent bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-500 bg-clip-text animate-fade-in">
            Sélectionnez un parcours pour commencer votre voyage intérieur
          </p>
        </div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-12">
          {spiritualPaths.map((path, index) => {
            const isActive = activeCard === path.id;

            return (
              <motion.div
                key={path.id}
                onClick={() => {
                  setSelectedGame(path.game);
                  hideInitialText();
                }}
                onMouseEnter={() => setActiveCard(path.id)}
                onMouseLeave={() => setActiveCard(null)}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`
          relative group cursor-pointer rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-500 ring-1 ring-white/10
          ${
            isActive
              ? "scale-105 rotate-3 z-50"
              : "hover:scale-105 hover:rotate-3"
          }
          bg-gradient-to-br ${path.color}
        `}
              >
                {/* Overlay sombre */}
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-opacity duration-300 backdrop-blur-sm" />

                <div className="relative p-6 flex flex-col h-full z-10 text-white drop-shadow">
                  {/* Icône et titre */}
                  <div className="flex items-center mb-4">
                    <path.icon className="w-12 h-12 mr-4 text-white/90 group-hover:text-white transition-colors drop-shadow" />
                    <h3 className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent drop-shadow-lg">
                      {path.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-sm mb-6 leading-relaxed text-white drop-shadow-sm">
                    {path.description}
                  </p>

                  {/* Liste des détails */}
                  <ul className="mt-auto space-y-2 text-sm opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500">
                    {path.details.map((detail, index) => (
                      <li
                        key={index}
                        onClick={() => setSelectedGame(path.game)}
                        className="flex items-center text-white hover:text-yellow-300 transition-colors duration-300"
                      >
                        <span className="mr-2">•</span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-12 bg-gray-800 rounded-xl">
          <div className="text-center"></div>
          {selectedGame && (
            <div>
              {selectedGame.title !== "Quiz des Traditions Spirituelles" &&
                selectedGame.component()}
              {selectedGame.title === "Quiz des Traditions Spirituelles" && (
                <SpiritualQuiz
                  theme="spiritual"
                  path="Quiz des Traditions Spirituelles"
                />
              )}
            </div>
          )}

          {/* Affichage du suivi de progression */}
          {result && (
            <div className="mt-8 p-6 bg-white/10 rounded-lg text-white">
              <h4 className="text-xl font-bold mb-4">Progression</h4>
              <div className="space-y-4">
                <p className="text-lg">{result}</p>
                {answers.length > 0 && (
                  <div className="space-y-2">
                    <h5 className="font-semibold">Historique des réponses :</h5>
                    <ul className="list-disc pl-5">
                      {answers.map((answer, index) => (
                        <li key={index} className="text-gray-300">
                          {answer}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="mt-4">
                  <p className="text-sm text-gray-400">
                    Question actuelle : {currentQuestion + 1}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Section AI Chat */}
        <div className="mt-12 max-w-3xl mx-auto">
          <AIChat />
        </div>

        {/* Section AI Dialog */}
        <div className="mt-12 max-w-3xl mx-auto">
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
          <h3 className="text-2xl font-bold text-white mb-6">
            Transformation des Peurs
          </h3>

          <div className="mb-6">
            <input
              type="text"
              placeholder="Entrez votre prénom"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-gray-300 mb-4"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-white mb-4">
                Mes Peurs
              </h4>
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
                          newFears.push("");
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
              <h4 className="text-xl font-semibold text-white mb-4">
                Mes Affirmations Positives
              </h4>
              <div className="space-y-2">
                {fears.map(
                  (fear, index) =>
                    fear.trim() && (
                      <div
                        key={index}
                        className="p-4 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20"
                      >
                        <p className="text-white">
                          Moi {name ? name : ""},{" "}
                          {generatePositiveAffirmation(fear)}
                        </p>
                      </div>
                    )
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <BonshommesAllumettes isEmbedded={true} />
        </div>

        {/* Section Analyse Numérologique */}
        <div className="mt-32 mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h3 className="text-3xl font-semibold text-purple-300 mb-6">
              Approfondissez Votre Voyage Spirituel
            </h3>
            <a
              href="https://analyse-num-rologique-lime.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg shadow-lg hover:from-purple-700 hover:to-pink-700 transform hover:-translate-y-1 transition-all duration-300"
            >
              Explorer Encore Plus ?
            </a>
          </motion.div>
        </div>
      </div>
      <audio
        autoPlay
        loop
        ref={(audio) => {
          if (audio) {
            audio.volume = 0.2;
          }
        }}
      >
        <source src="/audio/ambient-spirit.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
};

const generatePositiveAffirmation = (fear: string): string => {
  const fearLower = fear.toLowerCase();
  if (fearLower.includes("mort")) {
    return "je célèbre chaque instant de la vie avec gratitude et sérénité";
  }
  if (fearLower.includes("chat")) {
    return "je ressens une profonde paix et harmonie en présence des félins";
  }
  if (fearLower.includes("chien")) {
    return "j'apprécie la loyauté et l'amour inconditionnel des canidés";
  }
  if (fearLower.includes("hauteur")) {
    return "je savoure la liberté et la beauté des points de vue élevés";
  }
  if (fearLower.includes("échec")) {
    return "je transforme chaque défi en opportunité de croissance";
  }
  if (fearLower.includes("rejet")) {
    return "je rayonne de confiance et d'authenticité dans mes relations";
  }
  if (fearLower.includes("solitude")) {
    return "je cultive une relation enrichissante avec moi-même";
  }
  if (fearLower.includes("avenir")) {
    return "j'avance avec confiance sur mon chemin de vie";
  }
  return "je m'épanouis pleinement dans ma force intérieure";
};

export default ParcoursSpirituels;
