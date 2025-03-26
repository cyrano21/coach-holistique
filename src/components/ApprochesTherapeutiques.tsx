"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaLeaf, FaHeart, FaBrain, FaHandHoldingHeart } from "react-icons/fa";
import styles from "./approches-therapeutiques.module.css";
import {
  approchesFirstRow,
  approchesSecondRow,
  approchesData
} from "../data/approchesData";
import VideoSection from "./VideoSection";

const ApprochesTherapeutiques = () => {
  const parallaxMethodesRef = useRef<HTMLElement | null>(null);

  // Préchargement des images d'arrière-plan
  useEffect(() => {
    // Fonction pour précharger une image
    const preloadImage = (url: string) => {
      try {
        const img = new window.Image();
        img.src = url;
      } catch (error) {
        console.error("Erreur lors du préchargement de l'image:", error);
      }
    };

    // Précharger les images d'arrière-plan
    preloadImage('/images/approches/meditation.jpg');
    preloadImage('/images/outils/meditation.jpg');
    
    // Précharger les images des méthodes et approches
    approchesFirstRow.forEach(item => preloadImage(item.image));
    approchesSecondRow.forEach(item => preloadImage(item.image));

    // Utiliser IntersectionObserver pour charger l'image d'arrière-plan de parallax-methodes uniquement lorsqu'elle est visible
    if (parallaxMethodesRef.current) {
      const currentElement = parallaxMethodesRef.current;
      const observer = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          if (entry.isIntersecting) {
            // Appliquer l'image d'arrière-plan uniquement lorsque la section est visible
            entry.target.classList.add(styles['parallax-methodes-visible']);
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );

      observer.observe(currentElement);

      return () => {
        observer.unobserve(currentElement);
      };
    }
  }, []);

  // Variantes d'animation pour Framer Motion
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  // Fonction pour obtenir l'icône correspondante à la méthode
  const getMethodeIcon = (index: number) => {
    const icons = [FaLeaf, FaHeart, FaBrain, FaHandHoldingHeart];
    const IconComponent = icons[index % icons.length];
    return <IconComponent className="text-2xl text-purple-400 mb-2" />;
  };

  return (
    <div className={styles.container}>
      {/* Section Hero */}
      <motion.section 
        className={styles.parallax} 
        id="approches"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="text-center px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <motion.h1 
            className="gradient-title texth1 mb-4"
          >
            Approches Thérapeutiques
          </motion.h1>
          <motion.p
            className="text-white text-lg max-w-2xl mx-auto opacity-90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Découvrez nos méthodes holistiques pour votre bien-être physique, mental et spirituel
          </motion.p>
        </motion.div>
      </motion.section>

      {/* Section Vidéo */}
      <section className={styles["video-section"]} id="videos">
        <div className="relative z-10 w-full max-w-full mx-auto">
          <motion.h2 
            className={`gradient-title texth2 text-center ${styles["section-title"]}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Découvrez nos approches en vidéo
          </motion.h2>
          <div className="w-full overflow-hidden rounded-xl shadow-2xl">
            <VideoSection videos={approchesData.videos} />
          </div>
        </div>
      </section>

      {/* Section Méthodes */}
      <section className={styles["parallax-methodes"]} ref={parallaxMethodesRef} id="methodes">
        <div className={styles["parallax-methodes-content"]}>
          <motion.h2 
            className={`text-center gradient-title texth2 ${styles["section-title"]}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Nos Approches Thérapeutiques
          </motion.h2>
          
          <motion.div 
            className={styles["methodes-grid"]}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {approchesFirstRow.map((methode, index) => (
              <motion.div 
                key={`methode-${index}`}
                className={styles["methode-card"]}
                id={`methode-${index}`}
                variants={fadeInUp}
              >
                <h3>
                  <span className="inline-block mr-2">{getMethodeIcon(index)}</span>
                  {methode.title}
                </h3>
                <div className={styles["methode-content"]}>
                  <div className={styles["methode-image"]}>
                    <Image 
                      src={methode.image} 
                      alt={methode.title}
                      width={500}
                      height={350}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className={styles["methode-description"]}>
                    <p>{methode.description}</p>
                    <motion.button
                      className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      En savoir plus
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Section Approches Détaillées */}
      <section className={styles["approches-container"]} id="approches-details">
        <div className="max-w-full mx-auto">
          <motion.h2 
            className={`text-center gradient-title texth2 ${styles["section-title"]}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Accompagnement Holistique
          </motion.h2>
          
          <motion.div 
            className={styles["approches-grid"]}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {approchesSecondRow.map((approche, index) => (
              <motion.div 
                key={`approche-${index}`}
                className={styles["approche-item"]}
                id={`approche-${index}`}
                variants={fadeInUp}
              >
                <div className={styles["approche-image-container"]}>
                  <Image 
                    src={approche.image} 
                    alt={approche.title}
                    width={400}
                    height={250}
                    className={styles["approche-image"]}
                    loading="lazy"
                  
                    decoding="async"
                  />
                </div>
                <h3>{approche.title}</h3>
                <p>{approche.description}</p>
                <motion.button
                  className="mt-auto mb-4 mx-auto block px-4 py-2 bg-transparent border border-purple-400 text-purple-100 rounded-lg text-sm font-medium hover:bg-purple-800 hover:border-purple-300 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Découvrir
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ApprochesTherapeutiques;
