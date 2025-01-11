
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaHeart, FaStar, FaCompass, FaLeaf, FaMoon, FaSun, FaQuoteLeft, FaArrowRight, FaCheck } from "react-icons/fa";

const CoachingPersonal = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const tools = [
    {
      icon: <FaLeaf className="w-12 h-12" />,
      title: "Nature & Bien-être",
      description: "Reconnexion à soi par des pratiques naturelles",
      practices: ["Méditation en pleine nature", "Exercices de respiration", "Marche consciente"],
      color: "from-green-400 to-green-600"
    },
    {
      icon: <FaMoon className="w-12 h-12" />,
      title: "Énergétique",
      description: "Équilibrage des énergies et harmonisation",
      practices: ["Soins énergétiques", "Chakras", "Méditation guidée"],
      color: "from-purple-400 to-purple-600"
    },
    {
      icon: <FaSun className="w-12 h-12" />,
      title: "Développement Personnel",
      description: "Transformation et évolution personnelle",
      practices: ["Coaching individuel", "Ateliers collectifs", "Suivi personnalisé"],
      color: "from-orange-400 to-orange-600"
    }
  ];

  const testimonials = [
    {
      name: "Sophie L.",
      text: "Une expérience transformatrice qui a changé ma vision de la vie.",
      role: "Entrepreneure"
    },
    {
      name: "Marc D.",
      text: "Le coaching holistique m'a permis de retrouver mon équilibre.",
      role: "Cadre"
    },
    {
      name: "Julie M.",
      text: "Une approche complète et personnalisée qui donne des résultats.",
      role: "Thérapeute"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section with Parallax */}
      <div className="relative min-h-[80vh] flex items-center justify-center bg-[url('/images/outils/meditation.jpg')] bg-cover bg-fixed bg-center">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
        <div className="relative z-10 text-center px-4 py-20">
          <motion.h1 
            className="text-6xl md:text-7xl font-light text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Coaching Holistique
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Une approche globale pour votre épanouissement
          </motion.p>
          <motion.button
            className="mt-8 px-8 py-3 bg-white/20 backdrop-blur-md text-white border-2 border-white rounded-full hover:bg-white hover:text-gray-900 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Découvrir Notre Approche
          </motion.button>
        </div>
      </div>

      {/* Floating Cards Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-light mb-4 dark:text-white">Nos Outils</h2>
            <p className="text-gray-600 dark:text-gray-300">Découvrez nos approches personnalisées</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12">
            {tools.map((tool, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -10 }}
              >
                <motion.div 
                  className={`text-white mb-6 p-4 rounded-full w-20 h-20 mx-auto flex items-center justify-center bg-gradient-to-r ${tool.color}`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  {tool.icon}
                </motion.div>
                <h3 className="text-2xl font-light text-center mb-4 dark:text-white">
                  {tool.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
                  {tool.description}
                </p>
                <ul className="space-y-3">
                  {tool.practices.map((practice, idx) => (
                    <motion.li 
                      key={idx}
                      className="text-gray-700 dark:text-gray-300 flex items-center text-sm"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <FaCheck className="w-4 h-4 mr-3 text-green-500" />
                      {practice}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="py-20 bg-gradient-to-r from-purple-900 to-blue-900 text-white">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-light mb-4">Témoignages</h2>
            <div className="w-20 h-1 bg-white/30 mx-auto rounded-full"></div>
          </motion.div>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-center px-8"
              >
                <FaQuoteLeft className="w-8 h-8 mx-auto mb-6 text-purple-300" />
                <p className="text-xl mb-6">{testimonials[activeIndex].text}</p>
                <p className="font-semibold">{testimonials[activeIndex].name}</p>
                <p className="text-sm text-purple-200">{testimonials[activeIndex].role}</p>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`w-3 h-3 rounded-full ${
                    idx === activeIndex ? "bg-white" : "bg-white/30"
                  } transition-all duration-300`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-light mb-6">Commencez Votre Voyage</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Transformez votre vie avec notre approche holistique personnalisée
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center mt-8">
              <motion.button 
                className="px-8 py-3 bg-purple-600 rounded-full hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Réserver une séance</span>
                <FaArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </motion.button>
              <motion.button 
                className="px-8 py-3 border-2 border-white/50 rounded-full hover:bg-white/10 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                En savoir plus
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CoachingPersonal;
