"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import AnimatePresence from "./AnimatePresence";
import needsData from "@/data/needs.json";
import Image from "next/image";
import { Need } from "@/types/need";
import styles from "./EFT.module.css";

const allNeeds = (needsData as unknown as { needs: Need[] }).needs;

export default function EFT() {
  const [selected, setSelected] = useState<Need | null>(null);
  const [step, setStep] = useState(0);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [mode, setMode] = useState<"visualisation" | "phrases" | "audio">("visualisation");
  const [imageError, setImageError] = useState(false);

  const speak = (text: string) => {
    const synth = window.speechSynthesis;
    if (!synth) return;
    synth.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "fr-FR";
    utter.rate = 1;
    synth.speak(utter);
  };

  const handleSelect = (id: string) => {
    const found = allNeeds.find((n) => n.id === id);
    setSelected(found || null);
    setStep(0);
    setMode("visualisation");
    setImageError(false);

    if (found?.points?.[0]) {
      const point = found.points[0];
      
      if (mode === "audio") {
        try {
          const sound = new Audio(point.audio);
          // Ajouter un gestionnaire d'erreur pour l'audio
          sound.onerror = () => {
            console.log("Erreur de chargement audio:", point.audio);
            // Utiliser la synthèse vocale comme fallback
            speak(point.phrase);
          };
          
          sound.play().catch(err => {
            console.log("Erreur de lecture audio:", err);
            // Utiliser la synthèse vocale comme fallback
            speak(point.phrase);
          });
          
          setAudio(sound);
        } catch (err) {
          console.log("Erreur lors de la création de l'audio:", err);
          speak(point.phrase);
        }
      }
    }
  };

  const handleNext = () => {
    if (!selected || !selected.points?.length) return;
    const nextStep = (step + 1) % selected.points.length;
    setStep(nextStep);
    setImageError(false);

    const nextPoint = selected.points[nextStep];
    if (nextPoint) {
      if (mode === "audio") {
        try {
          audio?.pause();
          const newAudio = new Audio(nextPoint.audio);
          
          // Ajouter un gestionnaire d'erreur pour l'audio
          newAudio.onerror = () => {
            console.log("Erreur de chargement audio:", nextPoint.audio);
            // Utiliser la synthèse vocale comme fallback
            speak(nextPoint.phrase);
          };
          
          newAudio.play().catch(err => {
            console.log("Erreur de lecture audio:", err);
            // Utiliser la synthèse vocale comme fallback
            speak(nextPoint.phrase);
          });
          
          setAudio(newAudio);
        } catch (err) {
          console.log("Erreur lors de la création de l'audio:", err);
          speak(nextPoint.phrase);
        }
      }
    }
  };

  const handleModeChange = (newMode: "visualisation" | "phrases" | "audio") => {
    setMode(newMode);
    
    if (selected && selected.points && selected.points.length > 0) {
      const currentPoint = selected.points[step];
      
      if (newMode === "audio" && currentPoint) {
        try {
          audio?.pause();
          const newAudio = new Audio(currentPoint.audio);
          
          // Ajouter un gestionnaire d'erreur pour l'audio
          newAudio.onerror = () => {
            console.log("Erreur de chargement audio:", currentPoint.audio);
            // Utiliser la synthèse vocale comme fallback
            speak(currentPoint.phrase);
          };
          
          newAudio.play().catch(err => {
            console.log("Erreur de lecture audio:", err);
            // Utiliser la synthèse vocale comme fallback
            speak(currentPoint.phrase);
          });
          
          setAudio(newAudio);
        } catch (err) {
          console.log("Erreur lors de la création de l'audio:", err);
          speak(currentPoint.phrase);
        }
      } else {
        audio?.pause();
        window.speechSynthesis.cancel();
      }
    }
  };

  // Nettoyage des ressources audio lors du démontage du composant
  useEffect(() => {
    return () => {
      audio?.pause();
      window.speechSynthesis.cancel();
    };
  }, [audio]);

  if (!selected) {
    return (
      <div className="p-6 bg-white/10 rounded-lg shadow-xl text-white">
      <h2 className="text-3xl font-extrabold mb-4 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg tracking-tight">
  Choisissez ce que vous souhaitez libérer
</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {allNeeds.map((need) => (
            <button
              key={need.id}
              onClick={() => handleSelect(need.id)}
              className="p-4 rounded-lg bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold hover:scale-105 transition"
            >
              {need.title}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (!selected.points?.length) {
    return <div className="text-white p-6">Aucun point à afficher.</div>;
  }

  const point = selected.points[step];

  return (
    <div className="relative overflow-hidden text-center mt-8 bg-white/10 p-6 rounded-xl shadow-2xl">
      <div className="absolute inset-0 z-[-1]">
        <div className="absolute w-96 h-96 bg-gradient-to-br from-purple-500 via-blue-500 to-pink-500 rounded-full blur-3xl animate-pulse left-1/2 top-0 transform -translate-x-1/2 opacity-30" />
      </div>

      <h2 className="text-2xl font-bold text-yellow-300 mb-6">
        {selected.title}
      </h2>

      {/* Mode selector */}
      <div className="flex justify-center mb-6 space-x-2">
        <button
          onClick={() => handleModeChange("visualisation")}
          className={`px-4 py-2 rounded-full transition ${
            mode === "visualisation"
              ? "bg-yellow-600 text-white"
              : "bg-white/20 text-white/80 hover:bg-white/30"
          }`}
        >
          Visualisation
        </button>
        <button
          onClick={() => handleModeChange("phrases")}
          className={`px-4 py-2 rounded-full transition ${
            mode === "phrases"
              ? "bg-yellow-600 text-white"
              : "bg-white/20 text-white/80 hover:bg-white/30"
          }`}
        >
          Phrases
        </button>
        <button
          onClick={() => handleModeChange("audio")}
          className={`px-4 py-2 rounded-full transition ${
            mode === "audio"
              ? "bg-yellow-600 text-white"
              : "bg-white/20 text-white/80 hover:bg-white/30"
          }`}
        >
          Audio guidé
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${point.name}-${mode}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="space-y-6"
        >
          {mode === "visualisation" && (
            <div className="flex flex-col items-center">
              {!imageError ? (
                <div className="relative w-[250px] h-[250px] flex items-center justify-center">
                  <Image
                    src={point.image}
                    alt={`Point de tapotement: ${point.name}`}
                    width={250}
                    height={250}
                    style={{ inlineSize: "auto", blockSize: "auto", maxInlineSize: "100%", maxBlockSize: "100%" }}
                    className="animate-pulse-circle object-contain"
                    onError={() => setImageError(true)}
                  />
                </div>
              ) : (
                <div className="w-[250px] h-[250px] bg-white/10 rounded-full flex items-center justify-center animate-pulse-circle">
                  <span className="text-white text-xl">{point.name}</span>
                </div>
              )}
              <h3 className="text-xl text-white mt-4">{point.name}</h3>
              <p className="text-white/80 mt-2">
                Tapotez doucement sur ce point pendant 5-7 secondes
              </p>
            </div>
          )}

          {mode === "phrases" && (
            <div className="flex flex-col items-center">
              <div className="bg-white/10 p-6 rounded-lg max-w-md">
                <p className="text-xl text-white font-medium italic">&ldquo;{point.phrase}&rdquo;</p>
                <p className="text-white/80 mt-4">
                  Répétez cette phrase 3 fois tout en tapotant le point {point.name}
                </p>
              </div>
              {!imageError ? (
                <div className="relative w-[200px] h-[200px] flex items-center justify-center">
                  <Image
                    src={point.image}
                    alt={`Point de tapotement: ${point.name}`}
                    width={200}
                    height={200}
                    style={{ inlineSize: "auto", blockSize: "auto", maxInlineSize: "100%", maxBlockSize: "100%" }}
                    className="animate-pulse-circle object-contain"
                    onError={() => setImageError(true)}
                  />
                </div>
              ) : (
                <div className="w-[200px] h-[200px] bg-white/10 rounded-full flex items-center justify-center animate-pulse-circle">
                  <span className="text-white text-xl">{point.name}</span>
                </div>
              )}
            </div>
          )}

          {mode === "audio" && (
            <div className="flex flex-col items-center">
              {!imageError ? (
                <div className="relative w-[200px] h-[200px] flex items-center justify-center">
                  <Image
                    src={point.image}
                    alt={point.name}
                    width={200}
                    height={200}
                    style={{ inlineSize: "auto", blockSize: "auto", maxInlineSize: "100%", maxBlockSize: "100%" }}
                    className="animate-pulse-circle object-contain"
                    onError={() => setImageError(true)}
                  />
                </div>
              ) : (
                <div className="w-[200px] h-[200px] bg-white/10 rounded-full flex items-center justify-center animate-pulse-circle">
                  <span className="text-white text-xl">{point.name}</span>
                </div>
              )}
              <p className="text-xl text-white mt-4">{point.phrase}</p>
              <div className="mt-4 flex items-center justify-center space-x-4">
                <button
                  onClick={() => {
                    try {
                      audio?.pause();
                      const newAudio = new Audio(point.audio);
                      
                      // Ajouter un gestionnaire d'erreur pour l'audio
                      newAudio.onerror = () => {
                        console.log("Erreur de chargement audio:", point.audio);
                        // Utiliser la synthèse vocale comme fallback
                        speak(point.phrase);
                      };
                      
                      newAudio.oncanplaythrough = () => {
                        newAudio.play();
                        setAudio(newAudio);
                      };
                    } catch (error) {
                      console.error("Erreur de lecture audio:", error);
                      // Utiliser la synthèse vocale comme fallback
                      speak(point.phrase);
                    }
                  }}
                  className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition"
                  aria-label="Lire l'audio"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  >
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                </button>
                <button
                  onClick={() => {
                    audio?.pause();
                    setAudio(null);
                    window.speechSynthesis.cancel();
                  }}
                  className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition"
                  aria-label="Arrêter l'audio"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  >
                    <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
                  </svg>
                </button>
              </div>
            </div>
          )}

          <div className="text-white">
            Point {step + 1} / {selected.points.length}: {point.name}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className={styles.progressBar}>
        <div
          className={`${styles.progressFill} ${styles[`progress-${Math.round(((step + 1) / selected.points.length) * 100 / 10) * 10}`]}`}
        />
      </div>

      <div className="mt-8 flex flex-col md:flex-row justify-center gap-4">
        <button
          onClick={handleNext}
          className="px-6 py-3 bg-yellow-600 text-white rounded-full hover:bg-yellow-500 transition"
        >
          Point suivant
        </button>

        <button
          onClick={() => {
            setSelected(null);
            setStep(0);
            setMode("visualisation");
            audio?.pause();
            setAudio(null);
            window.speechSynthesis.cancel();
          }}
          className="px-6 py-3 bg-red-600 text-white rounded-full hover:bg-red-500 transition"
        >
          Recommencer
        </button>
      </div>
    </div>
  );
}
