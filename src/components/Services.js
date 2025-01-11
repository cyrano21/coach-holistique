import React from "react";
import { motion } from 'framer-motion';

// Color palette for professional design
const COLOR_VARIANTS = [
  {
    name: 'blue',
    gradient: 'from-blue-500 to-blue-700',
    background: 'bg-gradient-to-br from-blue-50 to-blue-100',
    text: 'text-blue-900',
    accent: 'text-blue-600',
    button: 'bg-gradient-to-r from-blue-600 to-blue-800'
  },
  {
    name: 'purple',
    gradient: 'from-purple-500 to-purple-700',
    background: 'bg-gradient-to-br from-purple-50 to-purple-100',
    text: 'text-purple-900',
    accent: 'text-purple-600',
    button: 'bg-gradient-to-r from-purple-600 to-purple-800'
  },
  {
    name: 'teal',
    gradient: 'from-teal-500 to-teal-700',
    background: 'bg-gradient-to-br from-teal-50 to-teal-100',
    text: 'text-teal-900',
    accent: 'text-teal-600',
    button: 'bg-gradient-to-r from-teal-600 to-teal-800'
  }
];

// Icons as SVG components for better customization
const ServiceIcons = {
  Personal: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
    </svg>
  ),
  Holistic: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ),
  Spiritual: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  )
};

function Services() {
  const services = [
    {
      title: "Coaching Personnel",
      description: "Développez votre potentiel et atteignez vos objectifs personnels avec un accompagnement sur mesure.",
      icon: ServiceIcons.Personal,
      features: ["Séances individuelles", "Plan d'action personnalisé", "Suivi régulier"]
    },
    {
      title: "Bien-être Holistique",
      description: "Retrouvez l'harmonie entre corps, esprit et âme pour une vie plus équilibrée et épanouie.",
      icon: ServiceIcons.Holistic,
      features: ["Méditation guidée", "Techniques de respiration", "Gestion du stress"]
    },
    {
      title: "Développement Spirituel",
      description: "Explorez votre dimension spirituelle et trouvez votre chemin vers une vie plus consciente.",
      icon: ServiceIcons.Spiritual,
      features: ["Exploration personnelle", "Pratiques énergétiques", "Connexion intérieure"]
    }
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-extrabold text-center mb-4 text-gray-900 tracking-tight"
        >
          Nos Services
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-lg text-gray-700 text-center mb-12 max-w-2xl mx-auto leading-relaxed font-medium tracking-tight"
        >
          Découvrez nos programmes conçus pour vous accompagner vers une transformation positive et durable.
        </motion.p>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const colorScheme = COLOR_VARIANTS[index % COLOR_VARIANTS.length];
            const ServiceIcon = service.icon;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.2 
                }}
                className={`
                  ${colorScheme.background}
                  rounded-xl 
                  p-8 
                  shadow-lg 
                  hover:shadow-2xl 
                  transition-all 
                  duration-300 
                  transform 
                  hover:-translate-y-2
                  border
                  border-opacity-20
                  ${colorScheme.border}
                  hover:shadow-purple-200/50 
                  relative
                  overflow-hidden
                  before:absolute
                  before:inset-0
                  before:bg-gradient-to-br
                  before:from-white/10
                  before:to-transparent
                  before:opacity-0
                  hover:before:opacity-20
                  before:transition-opacity
                  before:duration-300
                `}
              >
                <div className={`
                  mb-6 
                  w-16 h-16 
                  rounded-full 
                  flex items-center justify-center
                  bg-gradient-to-br ${colorScheme.gradient}
                  text-white
                  shadow-md
                `}>
                  <ServiceIcon />
                </div>
                <h3 className={`
                  text-2xl 
                  font-bold 
                  mb-4 
                  ${colorScheme.text}
                `}>
                  {service.title}
                </h3>
                <p className={`
                  mb-6 
                  text-gray-800 
                  leading-relaxed 
                  font-medium 
                  opacity-90
                `}>
                  {service.description}
                </p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, i) => (
                    <li 
                      key={i} 
                      className="flex items-center text-gray-600"
                    >
                      <span className={`mr-2 ${colorScheme.accent}`}>•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button 
                  className={`
                    w-full 
                    ${colorScheme.button}
                    text-white 
                    py-3 
                    px-4 
                    rounded-lg 
                    hover:shadow-xl 
                    transition-all 
                    duration-300
                    font-semibold
                    tracking-wide
                  `}
                >
                  En savoir plus
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Services;
