"use client";

import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, Variants } from "framer-motion";

const HeroSection = dynamic(() => import("../components/HeroSection"), { 
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-[#1A1A2E] flex items-center justify-center">
      <div className="text-white text-2xl">Chargement...</div>
    </div>
  )
});

const Services = dynamic(() => import("../components/Services"), { 
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-[#1A1A2E] flex items-center justify-center">
      <div className="text-white text-2xl">Chargement...</div>
    </div>
  )
});

const VideoSection = dynamic(() => import("../components/VideoSection"), { 
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-[#1A1A2E] flex items-center justify-center">
      <div className="text-white text-2xl">Chargement...</div>
    </div>
  )
});

const Testimonials = dynamic(() => import("../components/Testimonials"), { 
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-[#1A1A2E] flex items-center justify-center">
      <div className="text-white text-2xl">Chargement...</div>
    </div>
  )
});

// Variantes d'animation pour les sections
const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

export default function HomePage() {
  // Fonction pour gérer le défilement fluide vers les sections
  useEffect(() => {
    // Fonction pour gérer le défilement fluide
    const handleSmoothScroll = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      
      if (anchor) {
        e.preventDefault();
        const targetId = anchor.getAttribute('href');
        if (targetId && targetId.startsWith('#')) {
          const targetElement = document.getElementById(targetId.substring(1));
          if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    };

    // Ajouter l'écouteur d'événement
    document.addEventListener('click', handleSmoothScroll);
    
    // Nettoyer l'écouteur d'événement
    return () => {
      document.removeEventListener('click', handleSmoothScroll);
    };
  }, []);

  return (
    <main className="bg-[#1A1A2E] min-h-screen w-screen max-w-[100vw] overflow-x-hidden">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        transition={{ delay: 0 }}
      >
        <HeroSection />
      </motion.div>
      
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
        transition={{ delay: 0.2 }}
      >
        <Services />
      </motion.div>
      
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
        transition={{ delay: 0.4 }}
      >
        <VideoSection />
      </motion.div>
      
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
        transition={{ delay: 0.6 }}
      >
        <Testimonials />
      </motion.div>
    </main>
  );
}
