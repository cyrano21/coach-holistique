import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

function Testimonials() {
  const [backgroundLoaded, setBackgroundLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    // Utiliser un IntersectionObserver pour charger l'image d'arrière-plan uniquement lorsque la section est proche d'être visible
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          // Charger l'image d'arrière-plan avec une taille réduite et une qualité optimisée
          // Utiliser le constructeur Image global du navigateur et non celui de Next.js
          const img = new window.Image();
          img.src = "/images/home/backgrounds/testimonials-background.jpg?quality=75&size=1200";
          img.onload = () => setBackgroundLoaded(true);
          img.onerror = () => {
            console.info("Testimonials background image failed to load");
            setBackgroundLoaded(true);
          };
          
          // Définir isVisible à true après le chargement pour déclencher les animations
          const timer = setTimeout(() => {
            setIsVisible(true);
          }, 300);
          
          // Arrêter d'observer une fois que l'image est chargée
          observer.disconnect();
          
          return () => clearTimeout(timer);
        }
      },
      { threshold: 0.1 } // Déclencher lorsque 10% de la section est visible
    );
    
    // Stocker la référence actuelle pour éviter les problèmes de cleanup
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

  const testimonials = [
    {
      name: "Marie L.",
      quote: "Le coaching holistique a transformé ma vie. J&apos;ai découvert une nouvelle perspective et une profonde connexion avec moi-même.",
      role: "Entrepreneure",
      stars: 5,
      image: "/images/testimonials/testimonial-1.jpg"
    },
    {
      name: "Thomas B.",
      quote: "Les séances de méditation guidée m&apos;ont permis de gérer mon stress et d&apos;améliorer ma concentration au quotidien.",
      role: "Cadre en entreprise",
      stars: 5,
      image: "/images/testimonials/testimonial-2.jpg"
    },
    {
      name: "Sophie M.",
      quote: "Un accompagnement bienveillant et professionnel qui m&apos;a aidée à surmonter des blocages personnels que je portais depuis des années.",
      role: "Thérapeute",
      stars: 5,
      image: "/images/testimonials/testimonial-3.jpg"
    }
  ];

  // Variantes d'animation pour les conteneurs
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

  // Variantes d'animation pour les éléments
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
        backgroundColor: "#0c2414", // Couleur de fond de secours pendant le chargement
      }}
      id="temoignages"
    >
      {/* Fond avec effet de dégradé pour améliorer les performances */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-purple-900/60 to-black/70 z-0"
        style={{
          backgroundImage: backgroundLoaded ? `url('/images/home/backgrounds/testimonials-background.jpg?quality=75&size=1200')` : 'none',
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
            className="inline-block px-4 py-1 bg-purple-900/80 backdrop-blur-sm rounded-full text-emerald-300 text-sm font-medium mb-4 shadow-lg"
          >
            Témoignages
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-4xl md:text-5xl font-extrabold text-center mb-6 text-white text-shadow-dark"
            style={{ textShadow: "0 2px 4px rgba(0,0,0,0.8), 0 4px 12px rgba(0,0,0,0.5)" }}
          >
            Ils ont vécu l&apos;expérience
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg md:text-xl text-center mb-12 max-w-2xl mx-auto leading-relaxed text-gray-200
              bg-black/50 rounded-xl p-4 md:p-6 shadow-lg backdrop-blur-sm"
          >
            Découvrez comment le coaching holistique a transformé la vie de mes clients.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10 hover:border-white/20 transition-all duration-300 relative overflow-hidden"
              variants={itemVariants}
              whileHover={{ 
                y: -5,
                transition: { duration: 0.3 }
              }}
            >
              <div className="absolute top-6 right-6 text-amber-400">
                <FaQuoteLeft className="text-3xl opacity-20" />
              </div>
              
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 rounded-full overflow-hidden mr-4 border-2 border-amber-400">
                  {testimonial.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="w-full h-full object-cover"
                      loading="lazy" // Utiliser le chargement paresseux pour les images
                      decoding="async" // Décodage asynchrone pour améliorer les performances
                      onError={(e) => {
                        // Fallback en cas d'erreur de chargement
                        e.target.onerror = null;
                        e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23f59e0b'/%3E%3Ctext x='50' y='50' font-family='Arial' font-size='50' text-anchor='middle' dominant-baseline='middle' fill='white'%3E" + testimonial.name.charAt(0) + "%3C/text%3E%3C/svg%3E";
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white text-xl font-bold">
                      {testimonial.name.charAt(0)}
                    </div>
                  )}
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-white">
                    {testimonial.name}
                  </h3>
                  <p className="text-amber-300 text-sm">
                    {testimonial.role}
                  </p>
                </div>
              </div>
              
              <p className="text-gray-300 mb-6 italic">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <FaStar 
                    key={i} 
                    className={`${i < testimonial.stars ? 'text-amber-400' : 'text-gray-600'} mr-1`} 
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Testimonials;
