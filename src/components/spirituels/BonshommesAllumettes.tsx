"use client";

import React, { useState, useRef } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import type { ReactSketchCanvasRef } from "react-sketch-canvas";
import { motion } from "framer-motion";

import Image from "next/image";

const stepImages = [
  "/images/bonshommes/etape-1-moi.png",
  "/images/bonshommes/etape-2-autre.webp",
  "/images/bonshommes/etape-3-cercle-separe.webp",
  "/images/bonshommes/etape-4-cercle-ensemble.png",
  "/images/bonshommes/etape-5-chakras.webp",
  "/images/bonshommes/etape-6-ciseaux.webp",
  "/images/bonshommes/etape-7-liberation.png"
];

type Props = {
  isEmbedded?: boolean;
};

export default function BonshommesAllumettes({ isEmbedded = false }: Props) {
  const [step, setStep] = useState(0);
  const canvasRef = useRef<ReactSketchCanvasRef>(null);
  const [completed, setCompleted] = useState(false);

  const instructions = [
    "Étape 1 : Dessinez un bonhomme représentant VOUS à gauche de la feuille. Écrivez votre prénom au-dessous.",
    "Étape 2 : Dessinez un bonhomme représentant L'AUTRE PERSONNE ou SITUATION à droite de la feuille. Écrivez son prénom en dessous.",
    "Étape 3 : Entourez chaque bonhomme dans un cercle de lumière, séparément.",
    "Étape 4 : Entourez les deux bonshommes ensemble dans un grand cercle de lumière.",
    "Étape 5 : Reliez les chakras des deux bonshommes par 7 lignes (de haut en bas : Couronne, Troisième œil, Gorge, Cœur, Plexus solaire, Sacré, Racine).",
    "Étape 6 : Dessinez des ciseaux symboliques qui coupent les 7 liens. Respirez profondément.",
    "Étape 7 : Ressentez l’énergie de libération, de lumière et de paix intérieure."
  ];

  const next = () => {
    if (step < instructions.length - 1) setStep(step + 1);
    else setCompleted(true);
  };

  const previous = () => {
    if (step > 0) setStep(step - 1);
  };

  const resetCanvas = () => {
    canvasRef.current?.clearCanvas();
    setStep(0);
    setCompleted(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-4 bg-gradient-to-br from-purple-300 via-pink-200 to-yellow-100">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-xl p-6 space-y-6">
        {!isEmbedded && (
          <h2 className="text-2xl md:text-3xl font-extrabold text-center text-purple-800">
            ✨ Technique des petits bonshommes allumettes ✨
          </h2>
        )}

        {!completed ? (
          <>
            <motion.p
              key={step}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-lg font-medium text-gray-800 text-center"
            >
              {instructions[step]}
            </motion.p>

            <div className="flex justify-center">
              <Image
                src={stepImages[step]}
                alt={`Illustration ${step + 1}`}
                width={300}
                height={200}
                className="rounded-lg border shadow-md"
              />
            </div>

            <div className="border rounded-lg overflow-hidden w-full h-[400px] md:h-[500px]">
              <ReactSketchCanvas
                ref={canvasRef}
                strokeWidth={4}
                strokeColor="#000"
                canvasColor="#fff"
                style={{ width: "100%", height: "100%" }}
              />
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <button
                onClick={previous}
                disabled={step === 0}
                className={`w-full md:w-auto px-6 py-3 rounded-lg text-white font-semibold transition-all duration-200 ${step === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-500 hover:bg-indigo-600"}`}
              >
                ⬅️ Précédent
              </button>
              <button
                onClick={next}
                className="w-full md:w-auto px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold"
              >
                {step === instructions.length - 1 ? "🎉 Terminer" : "➡️ Suivant"}
              </button>
            </div>

            <div className="text-center">
              <button
                onClick={resetCanvas}
                className="mt-4 text-sm underline text-blue-600 hover:text-blue-800"
              >
                Réinitialiser le dessin ✏️
              </button>
            </div>
          </>
        ) : (
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold text-green-700">
              🎉 Séance terminée !
            </h3>
            <p className="text-gray-700">
              Bravo pour avoir complété chaque étape de libération ✨
            </p>
            <p className="text-md text-gray-600">
              Pour renforcer votre engagement, refaites maintenant la méthode sur une feuille de papier réelle en suivant chaque étape 📝
            </p>
            <button
              onClick={resetCanvas}
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold"
            >
              Refaire une séance
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
