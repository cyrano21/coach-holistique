"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { FaSyncAlt, FaVolumeUp, FaVolumeMute, FaSpa } from "react-icons/fa";
import styles from "./MantraDuJour.module.css";
import { mantraThemes, backgroundImages, relaxingSounds } from "../data/mantras";

const getRandom = <T,>(arr: T[]): T =>
  arr[Math.floor(Math.random() * arr.length)];

const MantraDuJour = () => {
  const [theme, setTheme] = useState("tous");
  const [mantra, setMantra] = useState("");
  const [backgroundClass, setBackgroundClass] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPlayingSound, setIsPlayingSound] = useState(false);
  const [soundIndex, setSoundIndex] = useState(0);
  const [autoZen, setAutoZen] = useState(false);
  const [breathVisible, setBreathVisible] = useState(false);
  const [breathPhase, setBreathPhase] = useState<"inspire" | "expire">(
    "inspire"
  );
  const [countdown, setCountdown] = useState<number | null>(null);
  const [useVoice, setUseVoice] = useState(true);
  const [rhythm, setRhythm] = useState("4-6");

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const countdownRef = useRef<NodeJS.Timeout | null>(null);

  const getMantras = useCallback(
    () => mantraThemes[theme] || mantraThemes["tous"],
    [theme]
  );

  const speakMantra = useCallback(
    (text = mantra) => {
      if (!utteranceRef.current) {
        utteranceRef.current = new SpeechSynthesisUtterance();
      }
      const utterance = utteranceRef.current;
      utterance.text = text;
      utterance.lang = "fr-FR";

      const voices = speechSynthesis.getVoices();
      const voice =
        voices.find((v) => v.name.includes("Google Français")) ||
        voices.find((v) => v.lang === "fr-FR");

      if (voice) utterance.voice = voice;

      utterance.onend = () => setIsSpeaking(false);
      speechSynthesis.cancel();
      speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    },
    [mantra]
  );

  const stopSpeaking = () => {
    speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const toggleSound = () => {
    if (!audioRef.current) {
      const audio = new Audio(relaxingSounds[soundIndex].path);
      audio.loop = true;
      audioRef.current = audio;
    }

    if (isPlayingSound) {
      audioRef.current.pause();
    } else {
      audioRef.current
        .play()
        .catch((err) => console.error("Erreur audio:", err));
    }

    setIsPlayingSound(!isPlayingSound);
  };

  const handleNewMantra = () => {
    stopSpeaking();
    const newMantra = getRandom(getMantras());
    setMantra(newMantra);
  };

  const handleSoundChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newIndex = parseInt(e.target.value);
    setSoundIndex(newIndex);
    if (isPlayingSound && audioRef.current) {
      audioRef.current.src = relaxingSounds[newIndex].path;
      audioRef.current.play();
    }
  };

  useEffect(() => {
    // Générer un mantra aléatoire et un arrière-plan au chargement
    const randomMantra = getRandom(getMantras());
    setMantra(randomMantra);
    
    const randomBackground = getRandom(backgroundImages);
    
    // Extraire le nom de fichier sans extension et sans chemin
    const backgroundName = randomBackground.split('/').pop()?.split('.')[0] || '';
    setBackgroundClass(`background${backgroundName.charAt(0).toUpperCase() + backgroundName.slice(1)}`);
    
    // Initialisation d'AOS pour les animations
    // AOS.init();
  }, [getMantras]);

  useEffect(() => {
    speechSynthesis.onvoiceschanged = () => {};
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  useEffect(() => {
    if (!breathVisible) return;

    const getDurations = () => {
      switch (rhythm) {
        case "5-5":
          return { inspire: 5000, expire: 5000 };
        case "6-6":
          return { inspire: 6000, expire: 6000 };
        default:
          return { inspire: 4000, expire: 6000 };
      }
    };

    const { inspire, expire } = getDurations();

    const speak = (text: string) => {
      if (!useVoice) return;
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = "fr-FR";
      const voice = speechSynthesis.getVoices().find((v) => v.lang === "fr-FR");
      if (voice) utter.voice = voice;
      speechSynthesis.speak(utter);
    };

    let phaseTimeout: NodeJS.Timeout;

    const startBreathing = () => {
      setBreathPhase("inspire");
      speak("Inspire...");
      let count = 3;
      setCountdown(count);
      countdownRef.current = setInterval(() => {
        count--;
        setCountdown(count);
        if (count <= 0 && countdownRef.current) {
          clearInterval(countdownRef.current);
          setCountdown(null);
        }
      }, 1000);

      phaseTimeout = setTimeout(() => {
        setBreathPhase("expire");
        speak("Expire...");
        phaseTimeout = setTimeout(startBreathing, expire);
      }, inspire);
    };

    startBreathing();

    return () => {
      clearInterval(countdownRef.current!);
      clearTimeout(phaseTimeout);
    };
  }, [breathVisible, rhythm, useVoice]);

  useEffect(() => {
    if (!autoZen) return;

    const interval = setInterval(() => {
      const newMantra = getRandom(getMantras());
      setMantra(newMantra);
      
      const newBackground = getRandom(backgroundImages);
      
      // Mettre à jour la classe d'arrière-plan
      const backgroundName = newBackground.split('/').pop()?.split('.')[0] || '';
      setBackgroundClass(`background${backgroundName.charAt(0).toUpperCase() + backgroundName.slice(1)}`);
      
      stopSpeaking();
      speakMantra(newMantra);
    }, 8000); // Réduit à 8000ms pour des transitions plus rapides

    return () => clearInterval(interval);
  }, [autoZen, speakMantra, theme, getMantras]);

  return (
    <div
      className={`${styles.backgroundContainer} ${styles[backgroundClass]}`}
    >
      <div className={styles.overlay} />
      <div className={`${styles["stars-animation"]} absolute inset-0`} />

      <div className={styles.content}>
        <h2 className={styles.title}>✨ Mantra du Jour</h2>

        <select
          value={theme}
          title="Sélectionner un thème de mantra"
          onChange={(e) => {
            const newTheme = e.target.value;
            setTheme(newTheme);
            const list = mantraThemes[newTheme];
            setMantra(getRandom(list));
          }}
          className={`${styles.selectDropdown} ${styles.themeSelect}`}
        >
          {Object.keys(mantraThemes).map((key) => (
            <option key={key} value={key}>
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </option>
          ))}
        </select>

        <select
          value={soundIndex}
          title="Sélectionner un son relaxant"
          onChange={handleSoundChange}
          className={`${styles.selectDropdown} ${styles.soundSelect}`}
        >
          {relaxingSounds.map((sound, index) => (
            <option key={index} value={index}>
              🎵 {sound.label}
            </option>
          ))}
        </select>

        <select
          value={rhythm}
          title="Sélectionner un rythme de respiration"
          onChange={(e) => setRhythm(e.target.value)}
          className={`${styles.selectDropdown} ${styles.rhythmSelect}`}
        >
          <option value="4-6">🌬 4s / 6s</option>
          <option value="5-5">🌬 5s / 5s</option>
          <option value="6-6">🌬 6s / 6s</option>
        </select>

        <motion.blockquote
          key={mantra}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className={`${styles.mantraQuote} ${
            isSpeaking ? styles.animatePulse : ""
          }`}
        >
          <span className={styles.quoteMark}>“</span>
          {mantra}
          <span className={styles.quoteMark}>”</span>
        </motion.blockquote>

        <div className={styles.buttonContainer}>
          <button
            onClick={() => navigator.clipboard.writeText(mantra)}
            className={`${styles.button} ${styles.copyButton}`}
          >
            📋 Copier
          </button>
          <button
            onClick={isSpeaking ? stopSpeaking : () => speakMantra()}
            className={`${styles.button} ${styles.listenButton}`}
          >
            {isSpeaking ? (
              <>
                <FaVolumeMute /> Arrêter
              </>
            ) : (
              <>
                <FaVolumeUp /> Écouter
              </>
            )}
          </button>
          <button
            onClick={handleNewMantra}
            className={`${styles.button} ${styles.newButton}`}
          >
            <FaSyncAlt /> Nouveau mantra
          </button>
          <button
            onClick={toggleSound}
            className={`${styles.button} ${styles.soundButton}`}
          >
            <FaSpa /> {isPlayingSound ? "Stop musique" : "Sons relaxants"}
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mt-6">
          <select
            value={soundIndex}
            title="Sélectionner un son relaxant"
            onChange={handleSoundChange}
            className={styles.selectDropdown}
          >
            {relaxingSounds.map((sound, index) => (
              <option key={index} value={index}>
                🎵 {sound.label}
              </option>
            ))}
          </select>

          <select
            value={rhythm}
            title="Sélectionner un rythme de respiration"
            onChange={(e) => setRhythm(e.target.value)}
            className={styles.selectDropdown}
          >
            <option value="4-6">🌬 4s / 6s</option>
            <option value="5-5">🌬 5s / 5s</option>
            <option value="6-6">🌬 6s / 6s</option>
          </select>

          <label className="flex items-center gap-2 text-white">
            <input
              type="checkbox"
              checked={useVoice}
              onChange={() => setUseVoice(!useVoice)}
            />
            🔊 Voix guidée
          </label>

          <button
            onClick={() => setAutoZen(!autoZen)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-4 py-2 rounded-lg transition"
          >
            🌿 {autoZen ? "Stop Auto Zen" : "Activer Auto Zen"}
          </button>
          <button
            onClick={() => setBreathVisible(!breathVisible)}
            className="bg-cyan-600 hover:bg-cyan-700 text-white font-medium px-4 py-2 rounded-lg transition"
          >
            🧘 Respiration
          </button>
        </div>

        {breathVisible && (
          <div className={styles.breathContainer}>
            <div className={styles.breathText}>
              {breathPhase === "inspire" ? "🌬 Inspire..." : "💨 Expire..."}
            </div>
            <div className={styles.breathCount}>
              {countdown !== null ? `⏳ ${countdown}` : ""}
            </div>
            <div className={styles.breathCircleWrapper}>
              <div className={styles.breathCircle}></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MantraDuJour;
