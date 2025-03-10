/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect, useRef } from "react";
import { FaComments, FaTimes } from "react-icons/fa";
import "../styles/ChatBot.css";
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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognition = useRef<any>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const utterance = useRef<SpeechSynthesisUtterance | null>(null);

  const toggleChatBot = () => {
    setIsOpen(!isOpen);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition;
      recognition.current = new SpeechRecognition();
      recognition.current.continuous = false;
      recognition.current.lang = "fr-FR";

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognition.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };

      recognition.current.onend = () => {
        setIsListening(false);
      };
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

  const speakText = (text: string) => {
    if (!utterance.current) {
      utterance.current = new SpeechSynthesisUtterance();
    }
    utterance.current.text = text;
    utterance.current.lang = "fr-FR";
    speechSynthesis.speak(utterance.current);
    setIsSpeaking(true);
  };

  const stopSpeaking = () => {
    speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const getBotResponse = async (userInput: string) => {
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: `Tu es Sophie, une coach holistique passionnée par la médecine alternative et le bien-être. Tu utilises tes connaissances en naturopathie, réflexologie et coaching de vie pour aider les autres à atteindre un état de bien-être optimal. Réponds de manière concise, claire et bienveillante en 2-3 phrases maximum à cette question : ${userInput}`,
        }),
      });

      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error("Erreur chat:", error);
      return "Désolé, je rencontre des difficultés techniques. Pouvez-vous reformuler votre question ?";
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
    <div className="chat-bot-container">
      <Button
        className="chat-toggle-button"
        onClick={toggleChatBot}
        aria-label={isOpen ? "Close Chat" : "Open Chat"}
        title={isOpen ? "Close Chat" : "Open Chat"}
      >
        {isOpen ? <FaTimes /> : <FaComments />}
      </Button>

      {isOpen && (
        <div className="chat-window">
          <div className="bg-white rounded-lg shadow-2xl w-96">
            <div className="bg-purple-600 text-white p-4 rounded-t-lg flex justify-between items-center">
              <h3 className="font-semibold">Assistant virtuel</h3>
              <Button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200"
                aria-label="Close Chat"
                title="Close Chat"
              >
                <FaTimes />
              </Button>
            </div>

            <div className="h-96 overflow-y-auto p-4 bg-gray-50">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`mb-4 ${
                    msg.sender === "user" ? "text-right" : "text-left"
                  }`}
                >
                  <div
                    className={`inline-block p-3 rounded-lg ${
                      msg.sender === "user"
                        ? "bg-purple-600 text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {msg.text}
                    {msg.sender === "bot" && (
                      <Button
                        onClick={() =>
                          isSpeaking ? stopSpeaking() : speakText(msg.text)
                        }
                        className="ml-2 text-sm"
                        title={isSpeaking ? "Arrêter" : "Écouter"}
                        aria-label={isSpeaking ? "Stop Speaking" : "Speak"}
                      >
                        {isSpeaking ? "🔇" : "🔊"}
                      </Button>
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
                  aria-label="Type your message"
                />
                <Button
                  onClick={toggleListening}
                  className={`p-2 rounded-lg ${
                    isListening ? "bg-red-500" : "bg-blue-500"
                  } text-white`}
                  title={isListening ? "Arrêter" : "Parler"}
                  aria-label={
                    isListening ? "Stop Listening" : "Start Listening"
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                    />
                  </svg>
                </Button>
                <Button
                  onClick={handleSubmit}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
                  aria-label="Send Message"
                >
                  Envoyer
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
