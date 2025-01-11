import React from "react";
import { motion } from 'framer-motion';

// Utility function to extract initials
function getInitials(name) {
  return name.split(' ').map(word => word[0].toUpperCase()).join('');
}

// Configuration for color variants
const COLOR_VARIANTS = [
  {
    name: 'blue',
    initial: 'bg-gradient-to-br from-blue-600 to-blue-800 text-white',
    card: 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200',
    text: 'text-blue-900',
    hover: 'hover:bg-blue-100'
  },
  {
    name: 'purple',
    initial: 'bg-gradient-to-br from-purple-600 to-purple-800 text-white',
    card: 'bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200',
    text: 'text-purple-900',
    hover: 'hover:bg-purple-100'
  },
  {
    name: 'teal',
    initial: 'bg-gradient-to-br from-teal-600 to-teal-800 text-white',
    card: 'bg-gradient-to-br from-teal-50 to-teal-100 border-teal-200',
    text: 'text-teal-900',
    hover: 'hover:bg-teal-100'
  }
];

// Testimonial data with consistent structure


// Reusable component for testimonial card
const TestimonialCard = ({ testimonial, colorScheme }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ 
      duration: 0.5, 
      delay: 0.2 
    }}
    className={`
      bg-white 
      rounded-xl 
      p-8 
      shadow-lg 
      hover:shadow-2xl 
      transition-all 
      duration-300 
      transform 
      hover:-translate-y-2
      border 
      border-gray-100
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
      ${colorScheme.card}
    `}
  >
    <div className="flex items-center mb-6">
      <div 
        className={`
          w-12 h-12 rounded-full 
          flex items-center justify-center 
          font-bold text-lg mr-4
          ${colorScheme.initial}
          shadow-md
        `}
      >
        {testimonial.initials}
      </div>
      <div>
        <h3 className={`font-semibold ${colorScheme.text}`}>
          {testimonial.name}
        </h3>
        <p className="text-gray-500 text-sm">
          {testimonial.role}
        </p>
      </div>
    </div>
    <p 
      className={`
        ${colorScheme.text} 
        opacity-80 
        italic 
        text-base 
        leading-relaxed
      `}
    >
      &ldquo;{testimonial.quote}&rdquo;
    </p>
  </motion.div>
);

function Testimonials() {
  const testimonials = [
    {
      name: "Marie L.",
      role: "Entrepreneure",
      quote: "Le coaching holistique a transformé ma vie. Je me sens plus équilibré(e) et en harmonie avec moi-même.",
      initials: "ML",
      text: "Le coaching holistique a transformé ma vie. Je me sens plus équilibré(e) et en harmonie avec moi-même.",
      author: "Marie L.",
      rating: 5
    },
    {
      name: "Pierre M.",
      role: "Cadre supérieur",
      quote: "Une expérience extraordinaire qui m'a permis de découvrir mon véritable potentiel.",
      initials: "PM",
      text: "Une expérience extraordinaire qui m'a permis de découvrir mon véritable potentiel.",
      author: "Pierre M.",
      rating: 5
    },
    {
      name: "Sophie D.",
      role: "Artiste",
      quote: "Un accompagnement personnalisé qui a dépassé mes attentes.",
      initials: "SD",
      text: "Un accompagnement personnalisé qui a dépassé mes attentes.",
      author: "Sophie D.",
      rating: 5
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
          Témoignages Inspirants
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          Découvrez comment nos clients ont transformé leur vie grâce à notre accompagnement.
        </motion.p>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard 
              key={index} 
              testimonial={{
                ...testimonial,
                initials: testimonial.initials || getInitials(testimonial.name)
              }}
              colorScheme={COLOR_VARIANTS[index % COLOR_VARIANTS.length]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
