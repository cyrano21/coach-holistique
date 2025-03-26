/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
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
  const [reconnectionAttempts, setReconnectionAttempts] = useState(0);
  const [hasNetworkIssues, setHasNetworkIssues] = useState(false);
  const maxReconnectionAttempts = 3;

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognition = useRef<SpeechRecognitionInstance | null>(null);
  const utterance = useRef<SpeechSynthesisUtterance | null>(null);
  const reconnectionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const toggleChatBot = () => setIsOpen(!isOpen);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // Effet pour gérer le scroll automatique vers le bas
  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Effet pour gérer la fin de la reconnaissance vocale
  useEffect(() => {
    // Nettoyage de la reconnaissance vocale lorsque le composant est démonté
    return () => {
      if (recognition.current) {
        try {
          if (isListening) {
            recognition.current.stop();
          }
        } catch (error) {
          console.log("[INFO] Erreur lors du nettoyage de la reconnaissance vocale:", error);
        }
      }
      
      // Nettoyer les timeouts de reconnexion
      if (reconnectionTimeoutRef.current) {
        clearTimeout(reconnectionTimeoutRef.current);
      }
    };
  }, [isListening]); // Dépendance stable qui ne change pas de taille

  // Effet séparé pour gérer les tentatives de reconnexion
  useEffect(() => {
    // Cet effet ne fait rien directement, il est juste là pour réagir aux changements
    // du compteur de tentatives de reconnexion
    console.log(`État des tentatives de reconnexion: ${reconnectionAttempts}/${maxReconnectionAttempts}`);
    
    // Pas de fonction de nettoyage nécessaire ici
  }, [reconnectionAttempts, maxReconnectionAttempts]);

  useEffect(() => {
    // Vérifier si la reconnaissance vocale est disponible dans le navigateur
    if (typeof window !== "undefined") {
      try {
        // Tentative d'accès à l'API de reconnaissance vocale
        const SpeechRecognition = (window as any).SpeechRecognition || 
                                 (window as any).webkitSpeechRecognition as SpeechRecognitionConstructor;
        
        if (!SpeechRecognition) {
          console.warn("La reconnaissance vocale n&apos;est pas supportée par ce navigateur");
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
          recognition.current.onerror = (event: any) => {
            // Utiliser des logs personnalisés au lieu de console.error
            if (event.error === 'network') {
              // Désactiver temporairement les erreurs de console pour éviter l'overlay d'erreur de Next.js
              const originalConsoleError = console.error;
              console.error = () => {}; // Fonction vide pour supprimer les erreurs
              
              // Journaliser l'erreur réseau de manière sécurisée
              console.log("[INFO] Problème de connexion réseau détecté:", event.error, event.message || "Pas de message d'erreur");
              
              // Restaurer la fonction console.error après un court délai
              setTimeout(() => {
                console.error = originalConsoleError;
              }, 100);
            } else {
              // Pour les autres types d'erreurs, utiliser un log warn
              console.warn("[WARN] Erreur de reconnaissance vocale:", event.error, event.message || "Pas de message d'erreur");
            }
            
            // Afficher un message à l'utilisateur
            let errorMessage = "Désolé, la reconnaissance vocale a rencontré un problème. Veuillez réessayer.";
            const shouldShowMessage = true;
            
            if (event.error === 'not-allowed') {
              errorMessage = "Veuillez autoriser l&apos;accès au microphone pour utiliser la reconnaissance vocale.";
            } else if (event.error === 'network') {
              // Enregistrer les détails complets de l'erreur pour le débogage
              console.log("Détails de l'erreur réseau:", event);
              
              // Gestion spécifique de l'erreur réseau
              if (reconnectionAttempts < maxReconnectionAttempts) {
                // Incrémenter le compteur de tentatives
                setReconnectionAttempts(prev => prev + 1);
                
                // Message adapté au nombre de tentatives
                errorMessage = `Problème de connexion réseau (tentative ${reconnectionAttempts + 1}/${maxReconnectionAttempts}). Reconnexion en cours...`;
                
                // Nettoyer tout timeout existant
                if (reconnectionTimeoutRef.current) {
                  clearTimeout(reconnectionTimeoutRef.current);
                }
                
                // Tentative de récupération automatique après une erreur réseau
                reconnectionTimeoutRef.current = setTimeout(() => {
                  if (recognition.current && isListening) {
                    try {
                      console.log(`Tentative de reconnexion après erreur réseau (${reconnectionAttempts + 1}/${maxReconnectionAttempts})...`);
                      recognition.current.start();
                    } catch (error) {
                      console.log("[INFO] Échec de la tentative de reconnexion après erreur réseau:", error);
                      setIsListening(false);
                      setReconnectionAttempts(0); // Réinitialiser le compteur après échec
                    }
                  }
                }, 1500 + reconnectionAttempts * 500); // Délai progressif entre les tentatives
                
                // Ne pas modifier l'état isListening pendant les tentatives de reconnexion
                return;
              } else {
                // Après plusieurs tentatives, abandonner et afficher un message d'erreur final
                errorMessage = "Problème persistant de connexion réseau. Veuillez vérifier votre connexion internet et réessayer plus tard.";
                setReconnectionAttempts(0); // Réinitialiser le compteur
              }
            } else if (event.error === 'no-speech') {
              errorMessage = "Aucune parole détectée. Veuillez parler plus fort ou vérifier votre microphone.";
            } else if (event.error === 'aborted') {
              errorMessage = "La reconnaissance vocale a été interrompue. Veuillez réessayer.";
            } else if (event.error === 'audio-capture') {
              errorMessage = "Impossible de capturer l&apos;audio. Veuillez vérifier que votre microphone est connecté et fonctionne correctement.";
            } else if (event.error === 'service-not-allowed') {
              errorMessage = "Le service de reconnaissance vocale n&apos;est pas autorisé. Veuillez utiliser un navigateur compatible comme Chrome ou Edge.";
            }
            
            // Mettre à jour l'état d'écoute
            setIsListening(false);
            
            // Ajouter le message d'erreur si nécessaire
            if (shouldShowMessage) {
              setMessages(prev => [...prev, { 
                text: errorMessage, 
                sender: "bot" 
              }]);
            }
          };

          recognition.current.onend = function(this: SpeechRecognitionInstance) {
            console.log("Reconnaissance vocale terminée");
            setIsListening(false);
          };
        }
      } catch (error) {
        console.log("[INFO] Erreur lors de l'initialisation de la reconnaissance vocale:", error);
        setRecognitionSupported(false);
      }
    }
  }, [maxReconnectionAttempts, reconnectionAttempts, isListening]);

  useEffect(() => {
    const handleOnline = () => {
      console.log("Connexion réseau rétablie");
      setHasNetworkIssues(false);
      // Réinitialiser le compteur de tentatives quand la connexion est rétablie
      setReconnectionAttempts(0);
    };
    
    const handleOffline = () => {
      console.log("Connexion réseau perdue");
      setHasNetworkIssues(true);
      // Arrêter la reconnaissance vocale si elle est en cours
      if (isListening && recognition.current) {
        try {
          recognition.current.stop();
        } catch (error) {
          console.log("[INFO] Erreur lors de l'arrêt de la reconnaissance vocale:", error);
        }
        setIsListening(false);
      }
    };
    
    // Ajouter les écouteurs d'événements
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    // Vérifier l'état initial de la connexion
    setHasNetworkIssues(!navigator.onLine);
    
    // Nettoyer les écouteurs d'événements
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [isListening]);

  const toggleListening = () => {
    if (!recognitionSupported) {
      setMessages(prev => [...prev, { 
        text: "Désolé, la reconnaissance vocale n&apos;est pas disponible dans votre navigateur. Essayez Chrome ou Edge.", 
        sender: "bot" 
      }]);
      return;
    }

    if (!recognition.current) {
      console.log("[INFO] La reconnaissance vocale n'est pas initialisée");
      return;
    }

    try {
      // Réinitialiser le compteur de tentatives à chaque nouvelle demande d'écoute
      setReconnectionAttempts(0);
      
      // Nettoyer tout timeout existant
      if (reconnectionTimeoutRef.current) {
        clearTimeout(reconnectionTimeoutRef.current);
        reconnectionTimeoutRef.current = null;
      }
      
      if (isListening && recognition.current) {
        console.log("Arrêt de l'écoute");
        recognition.current.stop();
      } else if (recognition.current) {
        console.log("Démarrage de l'écoute");
        
        // Vérifier la connexion réseau avant de démarrer la reconnaissance vocale
        if (!navigator.onLine) {
          setMessages(prev => [...prev, { 
            text: "Vous semblez être hors ligne. Veuillez vérifier votre connexion internet avant d&apos;utiliser la reconnaissance vocale.", 
            sender: "bot" 
          }]);
          return;
        }
        
        // Vérifier si des problèmes réseau persistants ont été détectés
        if (hasNetworkIssues) {
          setMessages(prev => [...prev, { 
            text: "Des problèmes de connexion réseau ont été détectés. La reconnaissance vocale pourrait ne pas fonctionner correctement. Souhaitez-vous quand même essayer?", 
            sender: "bot" 
          }]);
          // Réinitialiser l'état pour la prochaine tentative
          setHasNetworkIssues(false);
        }
        
        // Configuration des gestionnaires d'événements à chaque nouvelle écoute
        // pour éviter les problèmes de références obsolètes
        if (recognition.current) {
          // Réinitialiser les erreurs précédentes
          recognition.current.onresult = (event: any) => {
            try {
              const transcript = event.results[0][0].transcript;
              console.log("Transcription détectée:", transcript);
              setInput(transcript);
            } catch (error) {
              console.log("[INFO] Erreur lors du traitement du résultat:", error);
            } finally {
              setIsListening(false);
            }
          };
          
          // Configurer un gestionnaire d'événements spécifique pour la fin de reconnaissance
          recognition.current.onend = function(this: SpeechRecognitionInstance) {
            console.log("Reconnaissance vocale terminée");
            // Ne pas réinitialiser isListening si une tentative de reconnexion est en cours
            // après une erreur réseau
            if (reconnectionAttempts > 0 && reconnectionAttempts < maxReconnectionAttempts) {
              // Tentative de redémarrage automatique après un délai
              try {
                reconnectionTimeoutRef.current = setTimeout(() => {
                  if (recognition.current) {
                    try {
                      recognition.current.start();
                    } catch (error) {
                      console.log("[INFO] Échec de la tentative de reconnexion après onend:", error);
                      setIsListening(false);
                    }
                  }
                }, 1000);
              } catch (error) {
                console.log("[INFO] Échec de la tentative de reconnexion après onend:", error);
                setIsListening(false);
              }
            } else {
              setIsListening(false);
            }
          };
          
          recognition.current.start();
        }
        
        // Ajouter un timeout pour éviter que l'écoute reste bloquée
        setTimeout(() => {
          if (isListening && recognition.current) {
            try {
              recognition.current.stop();
              setIsListening(false);
            } catch (error) {
              console.log("[INFO] Erreur lors de l'arrêt forcé de la reconnaissance:", error);
            }
          }
        }, 10000); // 10 secondes maximum d'écoute
      }
      setIsListening(!isListening);
    } catch (error) {
      console.log("[INFO] Erreur lors de la gestion de la reconnaissance vocale:", error);
      setIsListening(false);
      setMessages(prev => [...prev, { 
        text: "Désolé, une erreur s&apos;est produite avec la reconnaissance vocale. Veuillez réessayer.", 
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
      console.log("[INFO] Erreur chat:", error);
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
