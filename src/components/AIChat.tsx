
"use client";

import React, { useState, useRef, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

interface Message {
  text: string;
  sender: 'user' | 'ai';
}

const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState('');
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      
      mediaRecorderRef.current.ondataavailable = (e) => {
        chunksRef.current.push(e.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/wav' });
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        chunksRef.current = [];
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      console.error('Error accessing microphone:', err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim() && !transcript) return;

    const messageText = transcript || inputText;
    setMessages(prev => [...prev, { text: messageText, sender: 'user' }]);
    
    try {
      // Here you would typically make an API call to your AI service
      const aiResponse = `Response to: ${messageText}`;
      setMessages(prev => [...prev, { text: aiResponse, sender: 'ai' }]);
    } catch (error) {
      console.error('Error sending message:', error);
    }

    setInputText('');
    resetTranscript();
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white/10 backdrop-blur-md rounded-xl shadow-xl">
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

      <div className="flex items-center gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="flex-1 p-3 rounded-lg bg-white/10 text-white placeholder-gray-300"
          placeholder="Type your message..."
        />
        
        {browserSupportsSpeechRecognition && (
          <button
            onClick={listening ? SpeechRecognition.stopListening : SpeechRecognition.startListening}
            className={`p-3 rounded-lg ${
              listening ? 'bg-red-500' : 'bg-blue-500'
            } text-white`}
          >
            {listening ? 'Stop' : 'Start'} Voice
          </button>
        )}
        
        <button
          onClick={handleSendMessage}
          className="p-3 rounded-lg bg-purple-500 text-white"
        >
          Send
        </button>
      </div>

      {transcript && (
        <div className="mt-2 text-gray-300">
          <p>Transcript: {transcript}</p>
        </div>
      )}
    </div>
  );
};

export default AIChat;
