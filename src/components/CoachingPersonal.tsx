"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { FaLightbulb, FaHandshake, FaChartLine, FaHeart, FaComments, FaPuzzlePiece } from "react-icons/fa";

const CoachingPersonal = () => {
  const staggerContainer = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section avec parallax et texte flottant */}
      <motion.section 
        className="relative min-h-[90vh] flex items-center justify-center bg-[url('/images/outils/meditation.jpg')] bg-cover bg-fixed bg-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.h1 
            className="text-5xl md:text-7xl font-extralight text-white mb-8"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Coaching Personnalisé
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-gray-200 leading-relaxed font-light"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            Un accompagnement sur mesure pour révéler votre potentiel et transformer votre vie
          </motion.p>
        </div>
      </motion.section>

      {/* Section Présentation du Coaching */}
      <section className="py-20 bg-gradient-to-b from-purple-900 to-indigo-900 text-white relative">
        <div className="absolute inset-0 bg-black/30" />
        <motion.div 
          className="max-w-6xl mx-auto px-4 relative z-10"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-5xl md:text-6xl font-thin italic text-center mb-16 text-purple-100"
            variants={fadeInUp}
          >
            Qu&apos;est-ce que le Coaching Personnalisé ?
          </motion.h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div 
              className="space-y-8 bg-gradient-to-br from-purple-900/50 to-indigo-900/50 p-8 rounded-xl backdrop-blur-sm shadow-xl"
              variants={fadeInUp}
            >
              <p className="text-base md:text-lg font-serif italic text-purple-100 leading-8">
                Le coaching personnalisé est un voyage transformateur conçu spécifiquement pour vous. C&apos;est un espace sécurisé où vous pouvez explorer vos défis, définir vos objectifs et développer votre plein potentiel.
              </p>
              <p className="text-base md:text-lg font-serif italic text-purple-100 leading-8">
                Mon approche holistique prend en compte tous les aspects de votre vie - émotionnel, mental, physique et spirituel - pour créer un changement profond et durable.
              </p>
            </motion.div>
            <motion.div
              className="relative h-80 rounded-lg overflow-hidden group perspective-1000"
              variants={fadeInUp}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-indigo-500/30 backdrop-blur-sm rounded-lg transform rotate-3 scale-105 z-10 group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-indigo-500/30 backdrop-blur-sm rounded-lg transform -rotate-3 scale-105 z-10 group-hover:scale-110 transition-transform duration-500" />
              
              <motion.div
                className="absolute inset-0 transform transition-all duration-700 ease-out"
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="absolute w-2/3 h-2/3 top-4 left-4 z-20 transform transition-all duration-500 group-hover:-translate-y-2 group-hover:-translate-x-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <Image
                    src="/images/coaching/coaching1.jpg"
                    alt="Coaching personnel"
                    width={500}
                    height={300}
                    className="w-full h-full object-cover rounded-lg shadow-2xl ring-4 ring-purple-500/20 transform -rotate-6 hover:rotate-0 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent rounded-lg" />
                </motion.div>

                <motion.div
                  className="absolute w-2/3 h-2/3 bottom-4 right-4 z-30 transform transition-all duration-500 group-hover:translate-y-2 group-hover:translate-x-2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <Image
                    src="/images/coaching/coaching2.jpg"
                    alt="Séance de coaching"
                    width={500}
                    height={300}
                    className="w-full h-full object-cover rounded-lg shadow-2xl ring-4 ring-indigo-500/20 transform rotate-6 hover:rotate-0 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/50 to-transparent rounded-lg" />
                </motion.div>
              </motion.div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 via-purple-900/20 to-transparent z-40 group-hover:opacity-50 transition-opacity duration-500" />
              
              <motion.div 
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ y: 20 }}
                whileHover={{ y: 0 }}
              >
                <span className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white text-sm font-light tracking-wider">
                  Découvrir le coaching
                </span>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Section Déroulement */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2 
            className="text-4xl font-light text-center mb-16 text-gray-800"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Comment se déroule le coaching ?
          </motion.h2>

          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {[
              {
                icon: <FaHandshake className="w-8 h-8" />,
                title: "Premier Contact",
                description: "Une séance découverte gratuite pour comprendre vos besoins et définir nos objectifs communs."
              },
              {
                icon: <FaPuzzlePiece className="w-8 h-8" />,
                title: "Programme Sur Mesure",
                description: "Élaboration d'un plan d'action personnalisé adapté à vos objectifs spécifiques."
              },
              {
                icon: <FaChartLine className="w-8 h-8" />,
                title: "Suivi Régulier",
                description: "Séances régulières pour maintenir votre progression et ajuster le programme si nécessaire."
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300"
                variants={fadeInUp}
                whileHover={{ y: -10 }}
              >
                <div className="text-purple-600 mb-6">{step.icon}</div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Section Avantages avec parallax */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-purple-900 relative overflow-hidden">
        <motion.div 
          className="max-w-6xl mx-auto px-4 relative z-10"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-4xl font-light text-center mb-16 text-white"
            variants={fadeInUp}
          >
            Les Avantages du Coaching Personnel
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: <FaLightbulb className="w-6 h-6" />,
                title: "Clarté et Direction",
                description: "Définissez vos objectifs avec précision et créez un plan d'action clair"
              },
              {
                icon: <FaHeart className="w-6 h-6" />,
                title: "Développement Personnel",
                description: "Renforcez votre confiance et découvrez votre plein potentiel"
              },
              {
                icon: <FaChartLine className="w-6 h-6" />,
                title: "Résultats Concrets",
                description: "Atteignez vos objectifs avec un accompagnement structuré et efficace"
              },
              {
                icon: <FaComments className="w-6 h-6" />,
                title: "Accompagnement Personnalisé",
                description: "Bénéficiez d'un soutien sur mesure adapté à vos besoins spécifiques"
              }
            ].map((advantage, index) => (
              <motion.div
                key={index}
                className="bg-white/10 backdrop-blur-md p-6 rounded-lg"
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-start space-x-4">
                  <div className="text-purple-300">
                    {advantage.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-white">{advantage.title}</h3>
                    <p className="text-gray-300">{advantage.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Section Contact/CTA */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <motion.div 
          className="max-w-4xl mx-auto px-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-light mb-8 text-white">Prêt à Commencer Votre Transformation ?</h2>
          <p className="text-xl text-gray-300 mb-12 leading-relaxed">
            Réservez votre séance découverte gratuite et commencez votre voyage vers une vie plus épanouie.
          </p>
          <Link href="/reservation">
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full text-lg font-medium hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Réserver Ma Séance Découverte
            </motion.button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default CoachingPersonal;
