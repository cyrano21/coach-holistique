import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaLeaf, FaHeart, FaLightbulb, FaArrowRight } from "react-icons/fa";

function Services() {
  const [backgroundLoaded, setBackgroundLoaded] = useState(false);
  const [hoveredService, setHoveredService] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          // Utiliser le constructeur Image global du navigateur et non celui de Next.js
          const img = new window.Image();
          img.src = "/images/home/backgrounds/services-background.jpg?quality=75&size=1200";
          img.onload = () => setBackgroundLoaded(true);
          img.onerror = () => {
            console.info("Services background image failed to load");
            setBackgroundLoaded(true);
          };
          
          const timer = setTimeout(() => {
            setIsVisible(true);
          }, 300);
          
          observer.disconnect();
          
          return () => clearTimeout(timer);
        }
      },
      { threshold: 0.1 } 
    );
    
    const currentSectionRef = sectionRef.current;
    
    if (currentSectionRef) {
      observer.observe(currentSectionRef);
    }
    
    return () => {
      if (currentSectionRef) {
        observer.unobserve(currentSectionRef);
      }
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
      bgGradient: "from-amber-900/20 to-amber-700/10",
      layout: "col-span-2 md:col-span-1",
      features: [
        "Clarification des objectifs personnels",
        "Stratégies de développement personnel",
        "Accompagnement sur-mesure",
      ],
      link: "/coaching-personnel",
    },
    {
      title: "Développement Spirituel",
      description:
        "Un chemin de conscience qui transcende les limites conventionnelles et ouvre de nouveaux horizons de compréhension.",
      icon: FaLeaf,
      color: "text-indigo-500",
      gradient: "from-indigo-400 to-indigo-600",
      bgGradient: "from-indigo-900/20 to-indigo-700/10",
      layout: "col-span-2 md:col-span-1",
      features: [
        "Méditation guidée",
        "Exploration de la conscience",
        "Pratiques énergétiques",
      ],
      link: "/developpement-spirituel",
    },
    {
      title: "Bien-être Holistique",
      description:
        "Une approche intégrative qui harmonise corps, âme et esprit pour une santé optimale et une vie épanouie.",
      icon: FaHeart,
      color: "text-rose-500",
      gradient: "from-rose-400 to-rose-600",
      bgGradient: "from-rose-900/20 to-rose-700/10",
      layout: "col-span-2",
      features: [
        "Équilibre émotionnel",
        "Gestion du stress",
        "Techniques de respiration",
        "Alimentation consciente",
      ],
      link: "/bien-etre-holistique",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      className={`py-24 relative transition-opacity duration-1000 ${
        backgroundLoaded ? "opacity-100" : "opacity-0"
      }`}
      style={{
        backgroundColor: "#0c2414", 
      }}
      id="services"
    >
      <div 
        className="absolute inset-0 bg-gradient-to-b from-emerald-900/30 to-black/50 z-0"
        style={{
          backgroundImage: backgroundLoaded ? `url('/images/home/backgrounds/services-background.jpg?quality=75&size=1200')` : 'none',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlendMode: "multiply",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1 bg-white/10 backdrop-blur-sm rounded-full text-emerald-300 text-sm font-medium mb-4"
          >
            Mes Services
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-4xl md:text-5xl font-extrabold text-center mb-6 text-white"
          >
            Accompagnement Holistique
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg md:text-xl text-center mb-12 max-w-2xl mx-auto leading-relaxed text-gray-200
              bg-black/20 rounded-xl p-4 md:p-6 shadow-lg backdrop-blur-sm"
          >
            Des approches complémentaires pour votre développement personnel, professionnel et spirituel.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              className={`${service.layout} bg-black/30 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10 hover:border-white/20 transition-all duration-300 relative overflow-hidden group`}
              variants={itemVariants}
              onMouseEnter={() => setHoveredService(index)}
              onMouseLeave={() => setHoveredService(null)}
              whileHover={{ 
                y: -5,
                transition: { duration: 0.3 }
              }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${service.bgGradient} opacity-30 group-hover:opacity-50 transition-opacity duration-300`}></div>
              
              <div className="relative z-10">
                <div className={`w-16 h-16 rounded-2xl mb-6 flex items-center justify-center bg-gradient-to-br ${service.gradient} shadow-lg`}>
                  <service.icon className="text-white text-2xl" />
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  {service.title}
                </h3>
                
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {service.description}
                </p>
                
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, idx) => (
                    <motion.li 
                      key={idx} 
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ 
                        opacity: hoveredService === index ? 1 : 0.7, 
                        x: 0 
                      }}
                      transition={{ delay: idx * 0.1, duration: 0.3 }}
                    >
                      <span className={`${service.color} mt-1`}>
                        <FaLeaf />
                      </span>
                      <span className="text-gray-200">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
                
                <motion.a
                  href={service.link}
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r ${service.gradient} text-white font-medium hover:shadow-lg transition-all duration-300`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  En savoir plus
                  <FaArrowRight />
                </motion.a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Services;
