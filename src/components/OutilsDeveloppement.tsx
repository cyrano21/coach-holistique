"use client";

import React, { useEffect, useRef, useState } from "react";
import HeaderWrapper from "./HeaderWrapper";
import "animate.css";
import {
  FaChartPie,
  FaCalculator,
  FaTree,
  FaCommentDots,
} from "react-icons/fa";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import styles from './OutilsDeveloppement.module.css';

const OutilsDeveloppement = () => {
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

  const methods = [
    {
      id: 1,
      title: "Méditation Guidée",
      description:
        "Une expérience de pleine conscience accompagnée par un(e) guide ou un support audio. Idéale pour calmer le mental, améliorer le sommeil et cultiver la sérénité au quotidien.",
      image: "/images/outils/meditation.jpg",
      bgColor: "rgb(229,226,210)",
      textColor: "text-purple-200",
      bulletColor: "text-green-200",
      advantages: [
        "Calme le mental",
        "Améliore le sommeil",
        "Cultive la sérénité",
      ],
    },
    {
      id: 2,
      title: "EFT (Techniques de Libération Émotionnelle)",
      description:
        "Combine la psychologie énergétique et la stimulation de points d'acupuncture (tapping) pour soulager stress, anxiété et phobies.",
      image: "/images/outils/eft.jpg",
      bgColor: "rgb(75,64,104)",
      textColor: "text-yellow-200",
      bulletColor: "text-yellow-200",
      advantages: [
        "Soulage le stress",
        "Réduit l'anxiété",
        "Traite les phobies",
      ],
    },
    {
      id: 3,
      title: "PNL (Programmation Neuro-Linguistique)",
      description:
        "Des techniques pour reprogrammer vos schémas de pensée, renforcer votre confiance et mieux communiquer avec votre entourage.",
      image: "/images/outils/pnl.jpg",
      bgColor: "rgb(245,245,245)",
      textColor: "text-blue-200",
      bulletColor: "text-blue-200",
      advantages: [
        "Reprogramme les schémas de pensée",
        "Renforce la confiance",
        "Améliore la communication",
      ],
    },
    {
      id: 4,
      title: "Thérapie Cognitivo-Comportementale (TCC)",
      description:
        "Approche centrée sur la compréhension de vos pensées et comportements afin de les modifier de manière concrète et durable.",
      image: "/images/outils/tcc.jpg",
      bgColor: "rgb(233,239,248)",
      textColor: "text-indigo-200",
      bulletColor: "text-indigo-200",
      advantages: [
        "Compréhension des pensées et comportements",
        "Modification concrète des comportements",
        "Résultats durables",
      ],
    },
    {
      id: 5,
      title: "Sophrologie",
      description:
        "Méthode psychocorporelle mêlant respiration, détente musculaire et visualisation positive, pour se reconnecter à soi et renforcer son bien-être.",
      image: "/images/outils/sophrologie.jpg",
      bgColor: "rgb(200,230,201)",
      textColor: "text-teal-200",
      bulletColor: "text-teal-200",
       advantages: [
        "Reconnecte à soi",
        "Renforce le bien-être",
        "Améliore la détente",
      ],
    },
  ];

    const colors = [
        'linear-gradient(to right, #3498db, #9b59b6)',
        'linear-gradient(to right, #2ecc71, #3498db)',
        'linear-gradient(to right, #e74c3c, #f39c12)',
        'linear-gradient(to right, #9b59b6, #e74c3c)',
    ];

  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<HTMLDivElement[]>([]);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.classList.add("visible");
    }

    itemRefs.current.forEach((item) => {
      if (item) {
        item.classList.add("visible");
      }
    });
    AOS.init();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Section Hero, inchangée, seulement classes conservées */}
      <section
        className={`relative h-[60vh] bg-cover bg-center ${styles.heroBackground}`}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-purple-800 to-transparent animate__animated animate__fadeIn animate__delay-2s"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center">
          <h1 className={`text-4xl md:text-6xl font-bold animate__animated animate__zoomIn animate__delay-1s text-white ${styles.heroTitle}`}>
            Outils de Développement Personnel
          </h1>
          <p className={`mt-4 text-lg md:text-xl animate__animated animate__fadeInLeft animate__delay-3s text-white ${styles.heroDescription}`}>
            Découvrez nos méthodes pour votre épanouissement
          </p>
          <button className="mt-8 bg-white text-purple-600 px-8 py-3 rounded-full font-bold hover:bg-purple-100 animate__animated animate__pulse animate__delay-3s">
            Découvrir les outils
          </button>
        </div>
      </section>

      <HeaderWrapper />

      <div className="w-full overflow-hidden bg-transparent" data-aos="fade-up" data-aos-duration="1000" data-aos-easing="ease-in-out">
        <div 
          className="flex animate-carousel-slide"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {outils.concat(outils).map((outil, index) => (
            <div
              key={`${outil.id}-${index}`}
              className={`flex-shrink-0 w-72 bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl shadow-2xl border border-gray-700 p-6 text-center mr-6 ${
                isHovered ? 'animate-pause' : ''
              }`}
            >
              <div className="text-center">
                {outil.icon}
                <h3 
                  className="text-xl font-bold tracking-tight text-white bg-gradient-to-r from-blue-600 to-blue-800 px-4 py-2 rounded-lg shadow-md border-b-2 border-blue-500 mb-3"
                >
                  {outil.title}
                </h3>
                <p 
                  className="text-lg leading-relaxed font-medium text-gray-200 tracking-wide mt-4 opacity-90"
                >
                  {outil.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section Méthodes Thérapeutiques */}
      {methods.map((method, index) => (
        <div
          key={method.id}
          className={`w-full py-12 bg-cover bg-center bg-no-repeat ${styles.methodBackground}`}
          style={{
            backgroundImage: `url(${method.image})`
          }}
          data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
          data-aos-duration="1200"
          data-aos-easing="ease-in-out"
        >
          <div
            className={`porte w-[100%] mx-auto p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-black/30`}
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out"
          >
            {/* Alternance des positions */}
            {index % 2 === 0 ? (
              <>
                {/* Texte à gauche */}
                <div
                  className="text-content flex flex-col justify-center space-y-6 bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-white/20"
                  data-aos="fade-right"
                  data-aos-duration="1200"
                  data-aos-easing="ease-in-out"
                >
                  <h3
                    className={`text-3xl font-bold tracking-tight ${method.textColor} border-b-2 border-opacity-50 pb-2 ${styles[`coloredBorder${index % colors.length}`]}`}
                  >
                    {method.title}
                  </h3>
                  <p 
                    className={`text-lg leading-relaxed font-medium text-white tracking-wide ${styles.textShadowMedium}`}
                    data-aos="fade-left"
                    data-aos-duration="800"
                    data-aos-delay="400"
                  >
                    {method.description}
                  </p>
                  <ul
                    className={`list-disc list-inside space-y-3 ${method.bulletColor} bg-white/20 backdrop-blur-sm p-4 rounded-lg ${styles.textShadowLight}`}
                    data-aos="fade-up"
                    data-aos-duration="800"
                    data-aos-delay="600"
                  >
                    {method.advantages.map((advantage, index) => (
                      <li key={index}>{advantage}</li>
                    ))}
                  </ul>
                  <a
                    href="/fr/page/contact"
                    className={`mt-4 bg-yellow-300 text-${method.textColor} px-6 py-2 rounded-full font-bold hover:bg-yellow-400 transition duration-300 ease-in-out transform hover:scale-105`}
                    title="En savoir plus"
                    data-aos="zoom-in"
                    data-aos-duration="800"
                    data-aos-delay="800"
                  >
                    En savoir plus
                  </a>
                </div>

                {/* Image à droite */}
                <div
                  className="portesNord"
                  data-aos="fade-left"
                  data-aos-duration="1200"
                  data-aos-easing="ease-in-out"
                >
                  <Image
                    src={method.image}
                    alt={method.title}
                    className="rounded-[30px] shadow-md w-full h-auto object-cover"
                    width={600}
                    height={400}
                  />
                </div>
              </>
            ) : (
              <>
                {/* Image à gauche */}
                <div
                  className="portesNord"
                  data-aos="fade-right"
                  data-aos-duration="1200"
                  data-aos-easing="ease-in-out"
                >
                  <Image
                    src={method.image}
                    alt={method.title}
                    className="rounded-[30px] shadow-md w-full h-auto object-cover"
                    width={600}
                    height={400}
                  />
                </div>

                {/* Texte à droite */}
                <div
                  className="text-content flex flex-col justify-center space-y-6 bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-white/20"
                  data-aos="fade-left"
                  data-aos-duration="1200"
                  data-aos-easing="ease-in-out"
                >
                  <h3
                    className={`text-3xl font-bold tracking-tight ${method.textColor} border-b-2 border-opacity-50 pb-2 ${styles[`coloredBorder${index % colors.length}`]}`}
                  >
                    {method.title}
                  </h3>
                  <p 
                    className={`text-lg leading-relaxed font-medium text-white tracking-wide ${styles.textShadowMedium}`}
                    data-aos="fade-left"
                    data-aos-duration="800"
                    data-aos-delay="400"
                  >
                    {method.description}
                  </p>
                  <ul
                    className={`list-disc list-inside space-y-3 ${method.bulletColor} bg-white/20 backdrop-blur-sm p-4 rounded-lg ${styles.textShadowLight}`}
                    data-aos="fade-up"
                    data-aos-duration="800"
                    data-aos-delay="600"
                  >
                    {method.advantages.map((advantage, index) => (
                      <li key={index}>{advantage}</li>
                    ))}
                  </ul>
                  <a
                    href="/fr/page/contact"
                    className={`mt-4 bg-yellow-300 text-${method.textColor} px-6 py-2 rounded-full font-bold hover:bg-yellow-400 transition duration-300 ease-in-out transform hover:scale-105`}
                    title="En savoir plus"
                    data-aos="zoom-in"
                    data-aos-duration="800"
                    data-aos-delay="800"
                  >
                    En savoir plus
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      ))}
      <div />
    </div>
  );
};

export default OutilsDeveloppement;
