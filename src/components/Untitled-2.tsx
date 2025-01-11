"use client";

import React from "react";
import { motion } from "framer-motion";
import "animate.css";
import "bootstrap/dist/css/bootstrap.min.css"; // [Pour carousel Bootstrap]
import {
  FaChartPie,
  FaCalculator,
  FaTree,
  FaCommentDots,
} from "react-icons/fa";
import Image from "next/image";

// [Ton import conservé : HeaderWrapper]
import HeaderWrapper from "./HeaderWrapper";

// ---------------------------------------------------
// [Lieu de modification] On reprend tes variables inchangées
// ---------------------------------------------------
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 },
  },
};

export default function OutilsDeveloppement() {
  // ---------------------------------------------------
  // [Lieu de modification] On reprend ton tableau outils
  // ---------------------------------------------------
  const outils = [
    {
      id: 1,
      icon: <FaChartPie className="w-12 h-12 mb-4 text-purple-600" />,
      title: "Ennéagramme",
      description:
        "Un modèle de la personnalité humaine basé sur neuf types interconnectés",
    },
    {
      id: 2,
      icon: <FaCalculator className="w-12 h-12 mb-4 text-blue-600" />,
      title: "Numérologie",
      description: "Étude des nombres et de leur influence sur notre vie",
    },
    {
      id: 3,
      icon: <FaTree className="w-12 h-12 mb-4 text-green-600" />,
      title: "Psychogénéalogie",
      description: "Analyse des liens transgénérationnels et de leur impact",
    },
    {
      id: 4,
      icon: <FaCommentDots className="w-12 h-12 mb-4 text-pink-600" />,
      title: "Affirmations positives",
      description:
        "Technique de reprogrammation mentale par des phrases constructives",
    },
  ];

  return (
    <>
      {/* ----------------------------------------
         HEADER : design issu de l'exemple HTML
      ---------------------------------------- */}
      <header
        className="header fixed top-0 w-full z-50"
        style={{
          background: "linear-gradient(to right, #7a288a, #4c0027)",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <div className="container mx-auto flex justify-between items-center py-4 px-6 animate__animated animate__fadeInDown">
          <div className="flex items-center">
            <img
              src="/images/logo.avif"
              alt="Logo"
              width={50}
              height={50}
              className="rounded-full animate__animated animate__pulse animate__delay-1s"
            />
            <h1 className="text-2xl font-bold ml-3 text-center text-white animate__animated animate__fadeInLeft animate__delay-1s">
              Les Soins Holistiques
            </h1>
          </div>
          <nav className="hidden md:flex space-x-6 animate__animated animate__fadeInDown animate__delay-1s">
            <a
              href="#"
              className="nav-link hover:text-purple-300 text-white text-center"
            >
              Accueil
            </a>
            <a
              href="#la-porte-est"
              className="nav-link hover:text-purple-300 text-white text-center"
            >
              La Porte de l'Est
            </a>
            <a
              href="#la-porte-sud"
              className="nav-link hover:text-purple-300 text-white text-center"
            >
              La Porte du Sud
            </a>
            <a
              href="#contact"
              className="nav-link hover:text-purple-300 text-white text-center"
            >
              Contact
            </a>
          </nav>
          <button className="bg-white text-purple-600 px-4 py-2 rounded-full shadow-lg hover:bg-purple-100 animate__animated animate__zoomIn animate__delay-1s">
            Réserver un soin
          </button>
        </div>
      </header>

      {/* ----------------------------------------
         SECTION PARALLAX 1
      ---------------------------------------- */}
      <section
        className="relative parallax bg-cover bg-center h-screen text-center"
        style={{
          backgroundAttachment: "fixed",
          backgroundImage: "url('https://via.placeholder.com/1920x1080')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-purple-800 to-transparent animate__animated animate__fadeIn animate__delay-2s"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white animate__animated animate__fadeInUp animate__delay-2s">
          <h1 className="text-4xl md:text-6xl font-bold text-center animate__animated animate__zoomIn animate__delay-2s">
            Les Soins Holistiques
          </h1>
          <p className="mt-4 text-lg md:text-xl text-center animate__animated animate__fadeInLeft animate__delay-3s">
            Sur Pierre-Châtel en Isère
          </p>
          <button className="mt-6 bg-white text-purple-600 px-6 py-3 rounded-full font-bold hover:bg-purple-100 animate__animated animate__pulse animate__delay-3s">
            Réserver un soin
          </button>
        </div>
      </section>

      {/* ----------------------------------------
         CAROUSEL
      ---------------------------------------- */}
      <section
        id="carousel"
        className="bg-purple-800 text-white py-16 animate__animated animate__fadeIn animate__delay-3s"
      >
        <div className="container mx-auto text-center">
          {/* Carousel Bootstrap */}
          <div
            id="carouselExampleCaptions"
            className="carousel slide carousel-fade"
            data-bs-ride="carousel"
          >
            <div className="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to="0"
                className="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to="2"
                aria-label="Slide 3"
              ></button>
            </div>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  src="https://via.placeholder.com/1920x1080"
                  className="d-block w-100"
                  alt="..."
                />
                <div className="carousel-caption d-none d-md-block">
                  <h5 className="animate__animated animate__zoomIn text-center">
                    La Porte de l'Est
                  </h5>
                  <p className="animate__animated animate__fadeInLeft text-center">
                    Découvrez les avantages liés au travail introspectif avec la
                    porte de l'Est.
                  </p>
                </div>
              </div>
              <div className="carousel-item">
                <img
                  src="https://via.placeholder.com/1920x1080"
                  className="d-block w-100"
                  alt="..."
                />
                <div className="carousel-caption d-none d-md-block">
                  <h5 className="animate__animated animate__zoomIn text-center">
                    La Porte du Sud
                  </h5>
                  <p className="animate__animated animate__fadeInLeft text-center">
                    Découvrez les avantages liés au travail énergétique avec la
                    porte du Sud.
                  </p>
                </div>
              </div>
              <div className="carousel-item">
                <img
                  src="https://via.placeholder.com/1920x1080"
                  className="d-block w-100"
                  alt="..."
                />
                <div className="carousel-caption d-none d-md-block">
                  <h5 className="animate__animated animate__zoomIn text-center">
                    La Porte de l'Ouest
                  </h5>
                  <p className="animate__animated animate__fadeInLeft text-center">
                    Découvrez les avantages liés au travail émotionnel avec la
                    porte de l'Ouest.
                  </p>
                </div>
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </section>

      {/* ----------------------------------------
         SECTION PARALLAX 2
      ---------------------------------------- */}
      <section
        className="parallax bg-cover bg-center h-screen"
        style={{
          backgroundAttachment: "fixed",
          backgroundImage: "url('https://via.placeholder.com/1920x1080')",
        }}
        id="la-porte-est"
      >
        <div className="container mx-auto text-center py-16">
          <h2 className="text-2xl font-bold text-white animate__animated animate__zoomIn">
            La Porte de l'Est
          </h2>
          <p className="text-lg text-white animate__animated animate__fadeInLeft">
            Découvrez les avantages liés au travail introspectif avec la porte
            de l'Est. La porte de l'Est est associée à la réflexion et à la
            méditation.
          </p>
          <button className="bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-800 animate__animated animate__pulse animate__delay-3s">
            En savoir plus
          </button>
        </div>
      </section>

      {/* ----------------------------------------------
         [Début OutilsDeveloppement existant] 
         => Ton code AVEC le Hero interne, 
         => HeaderWrapper, 
         => motion.div, 
         => Méthodes Thérapeutiques, etc.
      ---------------------------------------------- */}
      <div className="bg-gray-50 min-h-screen">
        {/* ---------- SECTION HERO interne à OutilsDeveloppement ---------- */}
        <section
          className="relative h-[60vh] bg-cover bg-center"
          style={{ backgroundImage: "url('/images/outils/hero.jpg')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-purple-800 to-transparent animate__animated animate__fadeIn animate__delay-2s"></div>
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center">
            <h1 className="text-4xl md:text-6xl font-bold animate__animated animate__zoomIn animate__delay-2s">
              Outils de Développement
            </h1>
            <p className="mt-4 text-lg md:text-xl animate__animated animate__fadeInLeft animate__delay-3s">
              Découvrez nos méthodes pour votre épanouissement
            </p>
            <button className="mt-8 bg-white text-purple-600 px-8 py-3 rounded-full font-bold hover:bg-purple-100 animate__animated animate__pulse animate__delay-3s">
              Découvrir les outils
            </button>
          </div>
        </section>

        {/* ---------- Ton HeaderWrapper (inchangé) ---------- */}
        <HeaderWrapper />

        {/* ---------- Outils + Méthodes Thérapeutiques ---------- */}
        <div className="container mx-auto px-4 py-16">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Outils de Développement Personnel
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Découvrez nos outils puissants pour votre épanouissement personnel
              et votre croissance spirituelle
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {outils.map((outil) => (
              <motion.div
                key={outil.id}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-center">
                  {outil.icon}
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    {outil.title}
                  </h3>
                  <p className="text-gray-600">{outil.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Section Méthodes Thérapeutiques */}
          <div className="mt-20">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Méthodes Thérapeutiques
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Un parcours en plusieurs étapes pour prendre soin de vous, selon
                vos besoins et vos objectifs
              </p>
            </motion.div>

            <div className="space-y-12 max-w-4xl mx-auto">
              {/* Méditation Guidée */}
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative h-64 rounded-lg overflow-hidden">
                  <Image
                    src="/public/images/approches/méditation_01d6fe26-81d5-4ce4-8fd8-af5e4bb5f9a9.jpg"
                    alt="Méditation Guidée"
                    width={400}
                    height={300}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    Méditation Guidée
                  </h3>
                  <p className="text-gray-600">
                    Une expérience de pleine conscience accompagnée par un(e)
                    guide ou un support audio. Idéale pour calmer le mental,
                    améliorer le sommeil et cultiver la sérénité au quotidien.
                  </p>
                </div>
              </motion.div>

              {/* EFT */}
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="md:order-2">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    EFT (Techniques de Libération Émotionnelle)
                  </h3>
                  <p className="text-gray-600">
                    Combine la psychologie énergétique et la stimulation de
                    points d&#39;acupuncture (tapping) pour soulager stress,
                    anxiété et phobies.
                  </p>
                </div>
                <div className="relative h-64 rounded-lg overflow-hidden md:order-1">
                  <Image
                    src="/public/images/approches/eft_emotional_freedom_techniques_0c1d4509-6bdd-4d47-bc2f-fc5e7b653ee1.jpg"
                    alt="EFT"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>

              {/* PNL */}
              <motion.div
                className="bg-white p-8 rounded-xl shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  PNL (Programmation Neuro-Linguistique)
                </h3>
                <p className="text-gray-600">
                  Des techniques pour reprogrammer vos schémas de pensée,
                  renforcer votre confiance et mieux communiquer avec votre
                  entourage.
                </p>
              </motion.div>

              {/* TCC */}
              <motion.div
                className="bg-white p-8 rounded-xl shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  Thérapie Cognitivo-Comportementale (TCC)
                </h3>
                <p className="text-gray-600">
                  Approche centrée sur la compréhension de vos pensées et
                  comportements afin de les modifier de manière concrète et
                  durable (gestion du stress, phobies, etc.).
                </p>
              </motion.div>

              {/* Sophrologie */}
              <motion.div
                className="bg-white p-8 rounded-xl shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  Sophrologie
                </h3>
                <p className="text-gray-600">
                  Méthode psychocorporelle mêlant respiration, détente
                  musculaire et visualisation positive, pour se reconnecter à
                  soi et renforcer son bien-être.
                </p>
              </motion.div>

              {/* Visualisation Créatrice */}
              <motion.div
                className="bg-white p-8 rounded-xl shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  Visualisation Créatrice
                </h3>
                <p className="text-gray-600">
                  Déployez la puissance de votre imagination pour concrétiser
                  vos aspirations et stimuler votre motivation.
                </p>
              </motion.div>

              {/* Méditation Profonde */}
              <motion.div
                className="bg-white p-8 rounded-xl shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  Méditation Profonde
                </h3>
                <p className="text-gray-600">
                  Pratique avancée de méditation pour atteindre des états de
                  conscience modifiés et une relaxation profonde.
                </p>
              </motion.div>

              {/* Sophrologie Avancée */}
              <motion.div
                className="bg-white p-8 rounded-xl shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  Sophrologie Avancée
                </h3>
                <p className="text-gray-600">
                  Techniques sophrologiques approfondies pour gérer le stress,
                  améliorer la concentration et développer la confiance en soi.
                </p>
              </motion.div>

              {/* Respiration Consciente */}
              <motion.div
                className="bg-white p-8 rounded-xl shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  Respiration Consciente
                </h3>
                <p className="text-gray-600">
                  Méthodes de respiration pour réguler les émotions, augmenter
                  l&apos;énergie et améliorer la clarté mentale.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      {/* ----------------------------------------------
         [Fin OutilsDeveloppement existant]
      ---------------------------------------------- */}

      {/* ----------------------------------------
         SECTION PARALLAX 3
      ---------------------------------------- */}
      <section
        className="parallax bg-cover bg-center h-screen"
        style={{
          backgroundAttachment: "fixed",
          backgroundImage: "url('https://via.placeholder.com/1920x1080')",
        }}
        id="la-porte-sud"
      >
        <div className="container mx-auto text-center py-16">
          <h2 className="text-2xl font-bold text-white animate__animated animate__zoomIn">
            La Porte du Sud
          </h2>
          <p className="text-lg text-white animate__animated animate__fadeInLeft">
            Découvrez les avantages liés au travail énergétique avec la porte du
            Sud. La porte du Sud est associée à la créativité et à
            l&#39;inspiration. l&apos;inspiration.
          </p>
          <button className="bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-800 animate__animated animate__pulse animate__delay-3s">
            En savoir plus
          </button>
        </div>
      </section>

      {/* ----------------------------------------
         SECTION CONTACT
      ---------------------------------------- */}
      <section
        className="parallax bg-cover bg-center h-screen"
        style={{
          backgroundAttachment: "fixed",
          backgroundImage: "url('https://via.placeholder.com/1920x1080')",
        }}
        id="contact"
      >
        <div className="container mx-auto text-center py-16">
          <h2 className="text-2xl font-bold text-white animate__animated animate__zoomIn">
            Contact
          </h2>
          <p className="text-lg text-white animate__animated animate__fadeInLeft">
            N&apos;hésitez pas à nous contacter pour en savoir plus sur nos
            soins holistiques.
          </p>
          <button className="bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-800 animate__animated animate__pulse animate__delay-3s">
            Contactez-nous
          </button>
        </div>
      </section>

      {/* ----------------------------------------
         SCRIPTS Bootstrap (si besoin du carousel)
         (Normalement Next.js gère en React, 
          mais pour un carousel Bootstrap, 
          on peut charger Popper + bootstrap.js)
      ---------------------------------------- */}
      <script
        src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.10.2/dist/umd/popper.min.js"
        integrity="sha384-7+zCNj/IqJ95wo16oMtfsKbZ9ccEh31eOz1HGyDuCQ6wgnyJNSYdrPa03rtR1zdB"
        crossOrigin="anonymous"
      ></script>
      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js"
        integrity="sha384-QJHtvGhmr9XOIpI6YVutG+2QOK9T+ZnN4kzFN1RtK3zEFEIsxhlmWl5/YESvpZ13"
        crossOrigin="anonymous"
      ></script>
    </>
  );
}
