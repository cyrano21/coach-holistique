
"use client";

import React, { useState } from 'react';
import { HfInference } from '@huggingface/inference';
import { motion } from 'framer-motion';

const hf = new HfInference(process.env.NEXT_PUBLIC_HF_TOKEN);

interface GameStep {
  title: string;
  description: string;
  completed: boolean;
}

const AIGameDialog = () => {
  const [userInput, setUserInput] = useState('');
  const [gameSteps, setGameSteps] = useState<GameStep[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [gameTitle, setGameTitle] = useState('');
  const [currentStep, setCurrentStep] = useState(0);

  const generateResponse = async () => {
    try {
      setIsLoading(true);
      
      const prompt = `Génère un jeu spirituel méditatif structuré basé sur: ${userInput}.
Format:
1. Un titre clair
2. Une brève introduction
3. 3-5 étapes simples et logiques
4. Une conclusion méditative

Exemple de structure:
Titre: Méditation des 4 Éléments
Introduction: Connectez-vous aux énergies naturelles
Étapes:
1. Asseyez-vous confortablement et respirez profondément
2. Visualisez chaque élément tour à tour
3. Ressentez leur énergie
Conclusion: Intégrez les énergies des éléments

La réponse doit être claire, logique et facile à suivre.`;

      const result = await hf.textGeneration({
        model: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
        inputs: prompt,
        parameters: {
          max_new_tokens: 400,
          temperature: 0.7,
          top_p: 0.9,
        }
      });

      const steps = result.generated_text
        .split('\n')
        .filter(line => line.trim().length > 0)
        .map(line => ({
          title: line.includes(':') ? line.split(':')[0].trim() : 'Étape',
          description: line.includes(':') ? line.split(':')[1].trim() : line.trim(),
          completed: false
        }));

      setGameTitle(steps[0]?.title || userInput);
      setGameSteps(steps.slice(1)); // Skip title
    } catch (error) {
      console.error('Error:', error);
      setGameSteps([{
        title: "Erreur",
        description: "Désolé, je n'ai pas pu générer le jeu. Veuillez réessayer.",
        completed: false
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const completeStep = (index: number) => {
    setGameSteps(prev => {
      const newSteps = [...prev];
      newSteps[index].completed = true;
      return newSteps;
    });
    setCurrentStep(prev => Math.min(prev + 1, gameSteps.length - 1));
  };

  return (
    <div className="p-6 bg-gradient-to-br from-purple-900 to-indigo-900 rounded-xl shadow-xl">
      <h2 className="text-2xl font-bold text-white mb-4">Guide Spirituel Interactif</h2>
      
      {!gameSteps.length ? (
        <div className="space-y-4">
          <textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Décrivez le type d'expérience spirituelle que vous souhaitez (ex: méditation, visualisation, exercice énergétique)..."
            className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-gray-300"
            rows={4}
          />
          <button
            onClick={generateResponse}
            disabled={isLoading}
            className="w-full py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg font-medium
                     hover:from-purple-600 hover:to-indigo-600 transition-all duration-200"
          >
            {isLoading ? 'Création en cours...' : 'Créer une Expérience'}
          </button>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="space-y-6"
        >
          <h3 className="text-xl text-white font-semibold mb-4">{gameTitle}</h3>
          
          {gameSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.2 }}
              className={`p-4 rounded-lg ${
                step.completed 
                  ? 'bg-green-500/20 border border-green-500/30' 
                  : index === currentStep
                  ? 'bg-white/20 border border-white/30'
                  : 'bg-white/10'
              }`}
            >
              <h4 className="text-lg font-medium text-white mb-2">{step.title}</h4>
              <p className="text-gray-300 mb-3">{step.description}</p>
              {index === currentStep && !step.completed && (
                <button
                  onClick={() => completeStep(index)}
                  className="px-4 py-2 bg-white/20 rounded-md text-white hover:bg-white/30 transition-colors"
                >
                  Terminer cette étape
                </button>
              )}
            </motion.div>
          ))}

          {currentStep === gameSteps.length && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-white p-4 bg-green-500/20 rounded-lg"
            >
              Félicitations ! Vous avez complété cette expérience spirituelle.
            </motion.div>
          )}

          <button
            onClick={() => {
              setGameSteps([]);
              setCurrentStep(0);
              setGameTitle('');
              setUserInput('');
            }}
            className="w-full py-3 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors"
          >
            Nouvelle Expérience
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default AIGameDialog;
