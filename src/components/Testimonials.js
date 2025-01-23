import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaQuoteLeft, 
  FaUserTie, 
  FaPaintBrush, 
  FaLightbulb,
  FaArrowRight,
  FaArrowLeft
} from 'react-icons/fa';

function Testimonials() {
  const [backgroundLoaded, setBackgroundLoaded] = useState(false);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  useEffect(() => {
    const img = new Image();
    img.src = '/images/home/backgrounds/testimonials-background.jpg';
    img.onload = () => setBackgroundLoaded(true);
    img.onerror = () => {
      console.error('Testimonials background image failed to load');
      setBackgroundLoaded(true);
    };
  }, []);

  const testimonials = [
    {
      name: "Marie L.",
      role: "Entrepreneure",
      quote: "Le coaching holistique a transformé ma vie. Je me sens plus équilibré(e) et en harmonie avec moi-même.",
      icon: FaLightbulb,
      color: "text-amber-500",
      gradient: "from-amber-400 to-amber-600",
      layout: "col-span-2 md:col-span-1"
    },
    {
      name: "Pierre M.",
      role: "Cadre supérieur",
      quote: "Une expérience extraordinaire qui m'a permis de découvrir mon véritable potentiel.",
      icon: FaUserTie,
      color: "text-sky-500",
      gradient: "from-sky-400 to-sky-600",
      layout: "col-span-2 md:col-span-1"
    },
    {
      name: "Sophie D.",
      role: "Artiste",
      quote: "Un accompagnement personnalisé qui a dépassé mes attentes.",
      icon: FaPaintBrush,
      color: "text-emerald-500",
      gradient: "from-emerald-400 to-emerald-600",
      layout: "col-span-2"
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonialIndex((prev) => 
      (prev + 1) % testimonials.length
    );
  };

  const prevTestimonial = () => {
    setCurrentTestimonialIndex((prev) => 
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const currentTestimonial = testimonials[currentTestimonialIndex];
  const TestimonialIcon = currentTestimonial.icon;

  return (
    <section 
      className={`py-24 relative transition-opacity duration-1000 ${
        backgroundLoaded ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        backgroundImage: `url('/images/home/backgrounds/testimonials-background.jpg')`,
        backgroundColor: 'rgba(50, 20, 30, 0.8)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'multiply',
        transition: 'opacity 0.5s ease-in-out'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-extrabold text-center mb-12 text-white"
        >
          Voix de la Transformation
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-xl text-center mb-16 max-w-3xl mx-auto leading-relaxed text-gray-200
            bg-black/20 rounded-xl p-6 shadow-lg backdrop-blur-sm"
        >
          Des histoires authentiques qui célèbrent le pouvoir du changement personnel.
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-lg text-center mb-16 max-w-3xl mx-auto leading-relaxed text-gray-200
            bg-black/20 rounded-xl p-6 shadow-lg backdrop-blur-sm"
        >
          Découvrez les expériences de nos clients qui ont trouvé la transformation qu&apos;ils cherchaient.
        </motion.p>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 bg-black/30 rounded-2xl overflow-hidden shadow-2xl relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial.name}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="p-12 flex flex-col justify-between h-full"
              >
                <FaQuoteLeft className="text-5xl opacity-20 text-white mb-6" />
                
                <p className="text-2xl italic text-white mb-8">
                &apos;{currentTestimonial.quote}&apos;
                </p>
                
                <div className="flex items-center">
                  <div className={`
                    w-24 h-24 
                    rounded-full 
                    flex 
                    items-center 
                    justify-center 
                    mr-6 
                    bg-gradient-to-br 
                    ${currentTestimonial.gradient}
                  `}>
                    <TestimonialIcon className="text-5xl text-white" />
                  </div>
                  
                  <div>
                    <h3 className="text-3xl font-bold text-white">
                      {currentTestimonial.name}
                    </h3>
                    <p className={`text-sm uppercase tracking-wider ${currentTestimonial.color}`}>
                      {currentTestimonial.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            
            <div className="absolute bottom-4 right-4 flex space-x-2">
              <button 
                onClick={prevTestimonial}
                className="bg-white/20 hover:bg-white/30 rounded-full p-3 transition-all"
              >
                <FaArrowLeft className="text-white" />
              </button>
              <button 
                onClick={nextTestimonial}
                className="bg-white/20 hover:bg-white/30 rounded-full p-3 transition-all"
              >
                <FaArrowRight className="text-white" />
              </button>
            </div>
          </div>
          
          <div className="md:col-span-1 space-y-4">
            {testimonials.map((testimonial, index) => {
              const TestimonialPreviewIcon = testimonial.icon;
              
              return (
                <motion.div
                  key={testimonial.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  onClick={() => setCurrentTestimonialIndex(index)}
                  className={`
                    cursor-pointer 
                    p-4 
                    rounded-xl 
                    flex 
                    items-center 
                    transition-all 
                    ${index === currentTestimonialIndex 
                      ? 'bg-white/20 border border-white/30' 
                      : 'bg-white/10 hover:bg-white/20'}
                  `}
                >
                  <div className={`
                    w-16 h-16 
                    rounded-full 
                    flex 
                    items-center 
                    justify-center 
                    mr-4 
                    bg-gradient-to-br 
                    ${testimonial.gradient}
                  `}>
                    <TestimonialPreviewIcon className="text-2xl text-white" />
                  </div>
                  
                  <div className="flex-grow">
                    <h4 className="text-lg font-semibold text-white">{testimonial.name}</h4>
                    <p className={`text-xs uppercase tracking-wider ${testimonial.color}`}>
                      {testimonial.role}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
