"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaHeart, FaStar, FaCompass, FaLeaf, FaMoon, FaSun } from "react-icons/fa";

const CoachingPersonal = () => {
  const tools = [
    {
      icon: <FaLeaf className="w-12 h-12" />,
      title: "Nature & Bien-être",
      description: "Reconnexion à soi par des pratiques naturelles",
      practices: ["Méditation en pleine nature", "Exercices de respiration", "Marche consciente"]
    },
    {
      icon: <FaMoon className="w-12 h-12" />,
      title: "Énergétique",
      description: "Équilibrage des énergies et harmonisation",
      practices: ["Soins énergétiques", "Chakras", "Méditation guidée"]
    },
    {
      icon: <FaSun className="w-12 h-12" />,
      title: "Développement Personnel",
      description: "Transformation et évolution personnelle",
      practices: ["Coaching individuel", "Ateliers collectifs", "Suivi personnalisé"]
    }
  ];

  return (
    <div className="min-h-screen">
      <div className="relative min-h-[60vh] flex items-center justify-center bg-[url('/images/outils/meditation.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
        <div className="relative z-10 text-center px-4 py-20">
          <motion.h1 
            className="text-5xl md:text-6xl font-light text-white mb-6"
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
        </div>
      </div>

      <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12">
            {tools.map((tool, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="text-purple-500 dark:text-purple-400 mb-6 flex justify-center">
                  {tool.icon}
                </div>
                <h3 className="text-2xl font-light text-center mb-4 dark:text-white">
                  {tool.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
                  {tool.description}
                </p>
                <ul className="space-y-3">
                  {tool.practices.map((practice, idx) => (
                    <li 
                      key={idx}
                      className="text-gray-700 dark:text-gray-300 flex items-center text-sm"
                    >
                      <div className="w-2 h-2 bg-purple-400 rounded-full mr-3" />
                      {practice}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-purple-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-light mb-12 dark:text-white"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Votre Parcours de Transformation
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div 
              className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-light mb-4 dark:text-white">Séance Découverte</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Offerte - 30 minutes
              </p>
              <button className="mt-6 px-6 py-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-colors">
                Réserver
              </button>
            </motion.div>
            <motion.div 
              className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-light mb-4 dark:text-white">Accompagnement</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Sur mesure - 1h
              </p>
              <button className="mt-6 px-6 py-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-colors">
                En savoir plus
              </button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CoachingPersonal;