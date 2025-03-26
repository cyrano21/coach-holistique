/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect, useRef } from "react";
import { FaComments, FaTimes } from "react-icons/fa";
import { Button } from "react-bootstrap";

interface Message {
  text: string;
  sender: "user" | "bot";
}

interface SpeechRecognitionEvent {
  results: {
    [index: number]: {
      [index: number]: {
        transcript: string;
        confidence: number;
      };
    };
  };
  resultIndex: number;
}

interface SpeechRecognitionError {
  error: string;
  message: string;
}

interface SpeechRecognitionInstance extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  maxAlternatives: number;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionError) => void) | null;
  onend: (() => void) | null;
}

interface SpeechRecognitionConstructor {
  new (): SpeechRecognitionInstance;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [recognitionSupported, setRecognitionSupported] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognition = useRef<SpeechRecognitionInstance | null>(null);
  const utterance = useRef<SpeechSynthesisUtterance | null>(null);

  const toggleChatBot = () => setIsOpen(!isOpen);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => scrollToBottom(), [messages]);

  useEffect(() => {
    // Vérifier si la reconnaissance vocale est disponible dans le navigateur
    if (typeof window !== "undefined") {
      try {
        // Tentative d'accès à l'API de reconnaissance vocale
        const SpeechRecognition = (window as any).SpeechRecognition || 
                                 (window as any).webkitSpeechRecognition as SpeechRecognitionConstructor;
        
        if (!SpeechRecognition) {
          console.warn("La reconnaissance vocale n'est pas supportée par ce navigateur");
          setRecognitionSupported(false);
          return;
        }
        
        // Initialisation de l'instance de reconnaissance vocale
        recognition.current = new SpeechRecognition();
        if (recognition.current) {
          recognition.current.continuous = false;
          recognition.current.interimResults = false;
          recognition.current.lang = "fr-FR";
          recognition.current.maxAlternatives = 1;

          // Configuration des gestionnaires d'événements
          recognition.current.onresult = (event: any) => {
            try {
              const transcript = event.results[0][0].transcript;
              console.log("Transcription détectée:", transcript);
              setInput(transcript);
            } catch (error) {
              console.error("Erreur lors du traitement du résultat de la reconnaissance vocale:", error);
            } finally {
              setIsListening(false);
            }
          };

          recognition.current.onerror = (event: any) => {
            console.error("Erreur de reconnaissance vocale:", event.error, event.message);
            setIsListening(false);
            
            // Afficher un message à l'utilisateur
            let errorMessage = "Désolé, la reconnaissance vocale a rencontré un problème. Veuillez réessayer.";
            
            if (event.error === 'not-allowed') {
              errorMessage = "Veuillez autoriser l'accès au microphone pour utiliser la reconnaissance vocale.";
            } else if (event.error === 'network') {
              errorMessage = "Problème de connexion réseau. Veuillez vérifier votre connexion internet.";
            } else if (event.error === 'no-speech') {
              errorMessage = "Aucune parole détectée. Veuillez parler plus fort ou vérifier votre microphone.";
            }
            
            setMessages(prev => [...prev, { 
              text: errorMessage, 
              sender: "bot" 
            }]);
          };

          recognition.current.onend = () => {
            console.log("Reconnaissance vocale terminée");
            setIsListening(false);
          };
        }
      } catch (error) {
        console.error("Erreur lors de l'initialisation de la reconnaissance vocale:", error);
        setRecognitionSupported(false);
      }
    }
    
    // Nettoyage
    return () => {
      if (recognition.current && isListening) {
        try {
          recognition.current.stop();
        } catch (error) {
          console.error("Erreur lors de l'arrêt de la reconnaissance vocale:", error);
        }
      }
    };
  }, [isListening]);

  const toggleListening = () => {
    if (!recognitionSupported) {
      setMessages(prev => [...prev, { 
        text: "Désolé, la reconnaissance vocale n'est pas disponible dans votre navigateur. Essayez Chrome ou Edge.", 
        sender: "bot" 
      }]);
      return;
    }

    if (!recognition.current) {
      console.error("La reconnaissance vocale n'est pas initialisée");
      return;
    }

    try {
      if (isListening && recognition.current) {
        console.log("Arrêt de l'écoute");
        recognition.current.stop();
      } else if (recognition.current) {
        console.log("Démarrage de l'écoute");
        // Réinitialiser les erreurs précédentes
        recognition.current.onresult = (event: any) => {
          try {
            const transcript = event.results[0][0].transcript;
            console.log("Transcription détectée:", transcript);
            setInput(transcript);
          } catch (error) {
            console.error("Erreur lors du traitement du résultat:", error);
          } finally {
            setIsListening(false);
          }
        };
        
        recognition.current.start();
        
        // Ajouter un timeout pour éviter que l'écoute reste bloquée
        setTimeout(() => {
          if (isListening && recognition.current) {
            try {
              recognition.current.stop();
              setIsListening(false);
            } catch (error) {
              console.error("Erreur lors de l'arrêt forcé de la reconnaissance:", error);
            }
          }
        }, 10000); // 10 secondes maximum d'écoute
      }
      setIsListening(!isListening);
    } catch (error) {
      console.error("Erreur lors de la gestion de la reconnaissance vocale:", error);
      setIsListening(false);
      setMessages(prev => [...prev, { 
        text: "Désolé, une erreur s'est produite avec la reconnaissance vocale. Veuillez réessayer.", 
        sender: "bot" 
      }]);
    }
  };

  const getPreferredVoice = () => {
    const voices = speechSynthesis.getVoices();
    return (
      voices.find((v) => v.name.includes("Google Français")) ||
      voices.find((v) => v.lang === "fr-FR") ||
      null
    );
  };

  const speakText = (text: string) => {
    if (!utterance.current) {
      utterance.current = new SpeechSynthesisUtterance();
    }

    utterance.current.text = text;
    utterance.current.lang = "fr-FR";

    const voice = getPreferredVoice();
    if (voice) utterance.current.voice = voice;

    speechSynthesis.speak(utterance.current);
    setIsSpeaking(true);
  };

  const stopSpeaking = () => {
    speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      speechSynthesis.onvoiceschanged !== undefined
    ) {
      speechSynthesis.onvoiceschanged = () => getPreferredVoice();
    }
  }, []);

  const getBotResponse = async (userInput: string) => {
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `Tu es Sophie, une coach holistique bienveillante. Réponds à cette question de manière concise, claire, chaleureuse et naturelle : "${userInput}". Ne reformule pas la question. Ne réponds que si c’est pertinent.`,
          role: "coach",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        
        if (response.status === 429 && errorData.error === 'CREDIT_LIMIT_EXCEEDED') {
          return "Le service de chat est temporairement indisponible. Veuillez réessayer plus tard ou me contacter directement par email.";
        }
        
        throw new Error(errorData.message || "Erreur lors de l'appel à l'API");
      }

      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error("Erreur chat:", error);
      return error instanceof Error 
        ? `Désolé, je rencontre un souci technique : ${error.message}. Essaie plus tard 🙏` 
        : "Désolé, je rencontre un souci technique. Essaie plus tard 🙏";
    }
  };

  const handleSubmit = async () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { text: input, sender: "user" }]);
    const response = await getBotResponse(input);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [...prev, { text: response, sender: "bot" }]);
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 transition-all duration-500 ease-in-out">
      <Button
        onClick={toggleChatBot}
        aria-label="Toggle Chat"
        title={isOpen ? "Fermer le chat" : "Ouvrir le chat"}
        className="rounded-full shadow-md bg-purple-600 text-white p-3"
      >
        {isOpen ? <FaTimes /> : <FaComments />}
      </Button>
      {isOpen && (
        <div className="animate-fade-in mt-3 w-[90vw] sm:w-[350px] md:w-[400px] max-w-[95%] h-[70vh] sm:h-[85vh] rounded-xl shadow-2xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-all flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-purple-600 text-white p-3 sm:p-4 flex justify-between items-center">
            <h3 className="text-base sm:text-lg font-semibold">
              Sophie – Coach Holistique 🌿
            </h3>
            <Button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200"
            >
              <FaTimes />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 bg-gray-50 dark:bg-gray-800">
            {messages.length === 0 && (
              <div className="text-center text-gray-500 dark:text-gray-400 py-4">
                <p>Bonjour ! Je suis Sophie, votre coach holistique.</p>
                <p className="mt-2">Comment puis-je vous aider aujourd&apos;hui ?</p>
              </div>
            )}
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`mb-3 sm:mb-4 ${
                  msg.sender === "user" ? "text-right" : "text-left"
                }`}
              >
                <div
                  className={`inline-block p-2 sm:p-3 rounded-lg max-w-[85%] transform transition-all duration-300 animate-slide-up ${
                    msg.sender === "user"
                      ? "bg-purple-600 text-white"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
                  }`}
                >
                  {msg.text}
                  {msg.sender === "bot" && (
                    <Button
                      onClick={() =>
                        isSpeaking ? stopSpeaking() : speakText(msg.text)
                      }
                      className="ml-2 text-xs"
                      title={isSpeaking ? "Arrêter" : "Écouter"}
                    >
                      {isSpeaking ? "🔇" : "🔊"}
                    </Button>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-2 sm:p-3 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 flex items-center">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Posez votre question..."
              className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
              style={{ minHeight: "50px", maxHeight: "120px" }}
            />
            <div className="flex flex-col ml-2">
              <Button
                onClick={toggleListening}
                className={`mb-1 p-2 rounded-full ${
                  isListening
                    ? "bg-red-500 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
                }`}
                title={isListening ? "Arrêter l&apos;écoute" : "Parler"}
                disabled={!recognitionSupported}
              >
                {isListening ? "🛑" : "🎤"}
              </Button>
              <Button
                onClick={handleSubmit}
                className="p-2 rounded-full bg-purple-600 text-white"
                title="Envoyer"
              >
                ➤
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
