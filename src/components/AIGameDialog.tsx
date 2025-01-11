
"use client";

import React, { useState } from 'react';
import { HfInference } from '@huggingface/inference';

const hf = new HfInference(process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY);

const AIGameDialog = () => {
  const [userInput, setUserInput] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const generateResponse = async () => {
    try {
      setIsLoading(true);
      const result = await hf.textGeneration({
        model: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
        inputs: `Génère un mini-jeu spirituel basé sur: ${userInput}. 
                Format: Titre, Description, Questions/Actions`,
        parameters: {
          max_new_tokens: 250,
          temperature: 0.7,
        }
      });
      setAiResponse(result.generated_text);
    } catch (error) {
      console.error('Error:', error);
      setAiResponse("Désolé, une erreur s'est produite.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-purple-900 to-indigo-900 rounded-xl shadow-xl">
      <h2 className="text-2xl font-bold text-white mb-4">Assistant Spirituel IA</h2>
      <div className="space-y-4">
        <textarea
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Décrivez le type de jeu spirituel que vous souhaitez..."
          className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-gray-300"
          rows={4}
        />
        <button
          onClick={generateResponse}
          disabled={isLoading}
          className="w-full py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg font-medium
                   hover:from-purple-600 hover:to-indigo-600 transition-all duration-200"
        >
          {isLoading ? 'Génération...' : 'Générer un Jeu'}
        </button>
        {aiResponse && (
          <div className="mt-6 p-4 bg-white/10 rounded-lg">
            <pre className="whitespace-pre-wrap text-white">
              {aiResponse}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIGameDialog;
