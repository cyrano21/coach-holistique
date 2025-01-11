
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaUserCheck, FaChartLine, FaLightbulb, FaClock, FaHeart, FaStar, FaComments } from "react-icons/fa";

const CoachingPersonal = () => {
  const [activeTab, setActiveTab] = useState(0);

  const programs = [
    {
      title: "Programme Découverte",
      duration: "4 semaines",
      price: "400€",
      features: ["4 séances individuelles", "Suivi personnalisé", "Exercices pratiques"]
    },
    {
      title: "Programme Transformation",
      duration: "12 semaines",
      price: "1000€",
      features: ["12 séances individuelles", "Suivi hebdomadaire", "Outils exclusifs", "Support illimité"]
    },
    {
      title: "Programme Elite",
      duration: "6 mois",
      price: "2000€",
      features: ["24 séances individuelles", "Suivi quotidien", "Accès VIP", "Ateliers privés", "Retraite bien-être"]
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section avec Parallax */}
      <div className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <motion.div 
          className="absolute inset-0 z-0"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: "url('/images/home/backgrounds/hero-background.jpg')",
              filter: "brightness(0.7)"
            }}
          />
        </motion.div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <motion.h1 
            className="text-5xl md:text-7xl font-bold text-white mb-6 font-serif"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Coaching Personnalisé
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-gray-200 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Révélez votre potentiel et transformez votre vie avec un accompagnement sur mesure
          </motion.p>
          <motion.button
            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Commencer Mon Voyage
          </motion.button>
        </div>
      </div>

      {/* Section Bénéfices avec Grid Animée */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-purple-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2 
            className="text-4xl font-bold text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Pourquoi Choisir Notre Coaching ?
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <FaClock className="w-8 h-8" />,
                title: "Flexibilité Totale",
                description: "Des séances adaptées à votre emploi du temps"
              },
              {
                icon: <FaHeart className="w-8 h-8" />,
                title: "Approche Holistique",
                description: "Un accompagnement qui prend en compte tous les aspects de votre vie"
              },
              {
                icon: <FaStar className="w-8 h-8" />,
                title: "Expertise Reconnue",
                description: "Des coachs certifiés avec plus de 10 ans d'expérience"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-white/10 backdrop-blur-lg rounded-xl p-8 text-center hover:bg-white/20 transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="text-purple-400 mb-4 flex justify-center">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                <p className="text-gray-300">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Programmes */}
      <section className="py-20 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2 
            className="text-4xl font-bold text-center mb-16 dark:text-white"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Nos Programmes
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-700 rounded-2xl shadow-xl overflow-hidden transform hover:-translate-y-2 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">{program.title}</h3>
                  <p className="text-purple-200">{program.duration}</p>
                </div>
                <div className="p-6">
                  <p className="text-3xl font-bold mb-6 dark:text-white">{program.price}</p>
                  <ul className="space-y-4">
                    {program.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-700 dark:text-gray-300">
                        <FaCheck className="w-5 h-5 mr-3 text-purple-600" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button className="w-full mt-8 bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
                    Choisir ce Programme
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Témoignages */}
      <section className="py-20 bg-gradient-to-b from-purple-900 to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2 
            className="text-4xl font-bold text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Ils Nous Font Confiance
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                name: "Sophie M.",
                role: "Entrepreneure",
                text: "Le coaching m'a permis de dépasser mes blocages et de développer mon entreprise."
              },
              {
                name: "Marc D.",
                role: "Cadre",
                text: "Une expérience transformatrice qui a changé ma vision de la vie."
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white/10 backdrop-blur-lg p-8 rounded-xl"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <FaComments className="w-8 h-8 text-purple-400 mb-4" />
                <p className="text-lg mb-4">{testimonial.text}</p>
                <div className="font-semibold">{testimonial.name}</div>
                <div className="text-purple-400">{testimonial.role}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-indigo-600">
        <motion.div 
          className="max-w-4xl mx-auto text-center px-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-white mb-8">
            Prêt à Transformer Votre Vie ?
          </h2>
          <p className="text-xl text-gray-200 mb-12">
            Réservez votre séance de découverte gratuite et commencez votre voyage vers le changement
          </p>
          <motion.button
            className="bg-white text-purple-600 px-10 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Réserver Ma Séance
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
};

export default CoachingPersonal;
