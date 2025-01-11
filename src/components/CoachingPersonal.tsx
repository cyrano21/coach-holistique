
"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaUserCheck, FaChartLine, FaLightbulb, FaClipboardCheck } from "react-icons/fa";

const CoachingPersonal = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <motion.section 
        className="relative h-[60vh] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/images/home/backgrounds/hero-background.jpg')" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center px-4">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold text-white mb-6"
            {...fadeIn}
          >
            Coaching Personnalisé
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-200 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Un accompagnement sur mesure pour révéler votre potentiel et atteindre vos objectifs
          </motion.p>
        </div>
      </motion.section>

      {/* Process Section */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Notre Approche
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Un processus structuré en trois étapes pour garantir votre transformation
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <FaUserCheck className="w-8 h-8" />,
              title: "Questionnaire Initial",
              description: "Évaluation approfondie de vos besoins, objectifs et aspirations pour créer un plan personnalisé."
            },
            {
              icon: <FaChartLine className="w-8 h-8" />,
              title: "Suivi Dynamique",
              description: "Accompagnement continu avec des ajustements en temps réel selon vos progrès."
            },
            {
              icon: <FaLightbulb className="w-8 h-8" />,
              title: "Solutions Adaptées",
              description: "Recommandations personnalisées basées sur votre évolution et vos objectifs."
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <div className="text-purple-600 dark:text-purple-400 mb-4">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-indigo-600">
        <motion.div 
          className="max-w-4xl mx-auto text-center px-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Prêt à Commencer Votre Transformation ?
          </h2>
          <p className="text-gray-200 mb-8">
            Réservez votre séance de découverte gratuite dès maintenant
          </p>
          <button className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300 shadow-lg">
            Réserver Ma Séance
          </button>
        </motion.div>
      </section>
    </div>
  );
};

export default CoachingPersonal;
