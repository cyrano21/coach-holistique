/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect, useRef } from "react";
import { FaComments, FaTimes } from "react-icons/fa";
import { Button } from "react-bootstrap";

interface Message {
  text: string;
  sender: "user" | "bot";
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognition = useRef<any>(null);
  const utterance = useRef<SpeechSynthesisUtterance | null>(null);

  const toggleChatBot = () => setIsOpen(!isOpen);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => scrollToBottom(), [messages]);

  useEffect(() => {
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition;
      recognition.current = new SpeechRecognition();
      recognition.current.continuous = false;
      recognition.current.lang = "fr-FR";

      recognition.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };

      recognition.current.onend = () => setIsListening(false);
    }
  }, []);

  const toggleListening = () => {
    if (!recognition.current) return;

    if (isListening) {
      recognition.current.stop();
    } else {
      recognition.current.start();
    }
    setIsListening(!isListening);
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

      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error("Erreur chat:", error);
      return "Désolé, je rencontre un souci technique. Essaie plus tard 🙏";
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
        <div className="animate-fade-in mt-3 w-[95vw] max-w-md h-[85vh] rounded-xl shadow-2xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-all flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-purple-600 text-white p-4 flex justify-between items-center">
            <h3 className="text-lg font-semibold">
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
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-800">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`mb-4 ${
                  msg.sender === "user" ? "text-right" : "text-left"
                }`}
              >
                <div
                  className={`inline-block p-3 rounded-lg max-w-[80%] transform transition-all duration-300 animate-slide-up ${
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
          <div className="p-4 border-t bg-white dark:bg-gray-900">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Tape ton message..."
                className="flex-1 p-2 border rounded-lg bg-white dark:bg-gray-800 dark:text-white border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
              <Button
                onClick={toggleListening}
                className={`p-2 rounded-lg ${
                  isListening ? "bg-red-500" : "bg-blue-500"
                } text-white`}
              >
                🎙
              </Button>
              <Button
                onClick={handleSubmit}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
              >
                Envoyer
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
