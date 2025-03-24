import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaLeaf, FaHeart, FaLightbulb } from "react-icons/fa";

function Services() {
  const [backgroundLoaded, setBackgroundLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = "/images/home/backgrounds/services-background.jpg";
    img.onload = () => setBackgroundLoaded(true);
    img.onerror = () => {
      console.error("Services background image failed to load");
      setBackgroundLoaded(true);
    };
  }, []);

  const services = [
    {
      title: "Coaching Personnel",
      description:
        "Un voyage introspectif pour révéler votre potentiel caché et aligner vos actions avec vos valeurs profondes.",
      icon: FaLightbulb,
      color: "text-amber-500",
      gradient: "from-amber-400 to-amber-600",
      layout: "col-span-2 md:col-span-1",
      features: [
        "Clarification des objectifs personnels",
        "Stratégies de développement personnel",
        "Accompagnement sur-mesure",
      ],
    },
    {
      title: "Bien-être Holistique",
      description:
        "Une approche globale qui harmonise votre corps, votre esprit et votre âme pour une transformation complète.",
      icon: FaHeart,
      color: "text-emerald-500",
      gradient: "from-emerald-400 to-emerald-600",
      layout: "col-span-2",
      features: [
        "Techniques de méditation avancées",
        "Gestion émotionnelle et stress",
        "Équilibre énergétique",
      ],
    },
    {
      title: "Développement Spirituel",
      description:
        "Un chemin de conscience qui transcende les limites conventionnelles et ouvre de nouveaux horizons de compréhension.",
      icon: FaLeaf,
      color: "text-indigo-500",
      gradient: "from-indigo-400 to-indigo-600",
      layout: "col-span-2 md:col-span-1",
      features: [
        "Exploration de la conscience",
        "Pratiques de transformation",
        "Connexion avec soi",
      ],
    },
  ];

  return (
    <section
      className={`py-24 relative transition-opacity duration-1000 ${
        backgroundLoaded ? "opacity-100" : "opacity-0"
      }`}
      style={{
        backgroundImage: `url('/images/home/backgrounds/services-background.jpg')`,
        backgroundColor: "rgba(30, 20, 50, 0.8)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: "multiply",
        transition: "opacity 0.5s ease-in-out",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="
    text-4xl
    sm:text-5xl
    md:text-6xl
    font-extrabold
    text-center
    mb-8
    text-white
    bg-clip-text
    text-transparent
    bg-gradient-to-r
    from-white
    via-white/90
    to-white/70
    drop-shadow-[0_3px_3px_rgba(0,0,0,0.4)]
  "
        >
          Chemins de Transformation
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-xl text-center mb-16 max-w-3xl mx-auto leading-relaxed text-gray-200
            bg-black/20 rounded-xl p-6 shadow-lg backdrop-blur-sm"
        >
          Trois approches complémentaires pour une évolution profonde et
          authentique.
        </motion.p>

        <div className="grid md:grid-cols-3 gap-10">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.2,
                }}
                className={`bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 
                  transform transition-all duration-300 hover:scale-105 hover:shadow-2xl ${service.layout}`}
              >
                <div
                  className={`mb-6 flex items-center justify-center w-20 h-20 rounded-full 
                  bg-gradient-to-br ${service.gradient} mx-auto shadow-lg`}
                >
                  <Icon className={`text-4xl ${service.color}`} />
                </div>

                <h3 className="text-3xl font-bold mb-4 text-center text-white">
                  {service.title}
                </h3>

                <p className="text-center text-gray-300 mb-6 italic">
                  {service.description}
                </p>

                <ul className="space-y-3 text-center">
                  {service.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className={`text-sm ${service.color} font-semibold`}
                    >
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Services;
