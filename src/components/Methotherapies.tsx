'use client';

import React from 'react';
import { motion, Variants, HTMLMotionProps } from 'framer-motion';
import { MethodesItem, methodesData } from '../data/methodesData';

interface ExtendedMotionProps extends HTMLMotionProps<'div'> {
  className?: string;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100 }
  }
};

const Methotherapies = () => {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <ParallaxHeader />
      <TimelineSection />
      <ParallaxFooter />
    </div>
  );
};

const ParallaxHeader = () => {
  const motionProps: HTMLMotionProps<'section'> = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    transition: { duration: 1 },
    viewport: { once: true }
  };

  return (
    <motion.section
      className="relative h-[500px] flex items-center justify-center bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('/images/methodes/hero.jpg')" }}
      {...motionProps}
    >
      <div className="absolute inset-0 bg-black/50" />
      <motion.h1 
        className="relative z-10 text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center px-4"
        initial={{ y: -50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        M&eacute;thodes Th&eacute;rapeutiques
      </motion.h1>
    </motion.section>
  );
};

const TimelineSection = () => {
  const motionProps: HTMLMotionProps<'section'> = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    transition: { duration: 0.8 },
    viewport: { once: true }
  };

  return (
    <motion.section 
      className="py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-br from-blue-900/90 via-indigo-800/90 to-purple-900/90 text-white"
      id="nos-methodes"
      {...motionProps}
    >
      <div className="max-w-7xl mx-auto">
        <motion.p 
          className="text-lg md:text-xl text-gray-100 mb-16 text-center max-w-2xl mx-auto leading-relaxed tracking-wide font-light"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-500 font-semibold">
            Un parcours personnalisé
          </span>{" "}
          en plusieurs étapes pour prendre soin de vous, selon vos besoins et vos objectifs. Découvrez ci-dessous nos différentes méthodes, expliquées sous forme d'itinéraire.
        </motion.p>

        <motion.div 
          className="relative bg-white/10 rounded-xl p-6 shadow-2xl border border-white/20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Ligne verticale principale */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500 dark:from-blue-600 dark:to-purple-600 rounded-full" />

          <div className="space-y-8">
            {methodesData.map((item, index) => (
              <TimelineItem key={index} item={item} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

interface TimelineItemProps {
  item: MethodesItem;
  index: number;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ item, index }) => {
  const isEven = index % 2 === 0;
  const motionProps: ExtendedMotionProps = {
    variants: itemVariants,
    className: `flex items-center w-full relative ${isEven ? 'flex-row-reverse' : ''}`
  };

  return (
    <motion.div 
      {...motionProps}
    >
      {/* Branche horizontale */}
      <div 
        className={`absolute top-1/2 transform -translate-y-1/2 w-1/2 h-1 
                    bg-gradient-to-r from-blue-500 to-purple-500 
                    dark:from-blue-600 dark:to-purple-600 
                    ${isEven ? 'right-1/2' : 'left-1/2'}`} 
      />

      <div className={`w-1/2 ${isEven ? 'pl-8' : 'pr-8'}`}>
        <motion.div 
          className={`
            bg-white dark:bg-gray-800 
            shadow-lg rounded-xl p-6 
            border border-gray-100 dark:border-gray-700 
            hover:shadow-2xl 
            transition-all duration-300 ease-in-out 
            transform hover:-translate-y-2
            ${index % 2 === 0 
              ? 'bg-gradient-to-br from-blue-50 to-blue-100' 
              : 'bg-gradient-to-br from-purple-50 to-purple-100'}
          `}
          initial={{ opacity: 0, x: isEven ? 50 : -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 * index }}
        >
          <motion.h3 
            className="text-2xl font-extrabold mb-3 
                       bg-gradient-to-r from-blue-600 to-purple-600 
                       bg-clip-text text-transparent 
                       animate-pulse"
          >
            {item.title}
          </motion.h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
            {item.description}
          </p>
        </motion.div>
      </div>
      <div className="w-1/2 flex justify-center relative">
        <div className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 border-4 border-blue-500 dark:border-blue-600 flex items-center justify-center z-10">
          <span className="text-blue-500 dark:text-blue-400 font-bold">{index + 1}</span>
        </div>
      </div>
    </motion.div>
  );
};

const ParallaxFooter = () => {
  const motionProps: HTMLMotionProps<'section'> = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    transition: { duration: 1 },
    viewport: { once: true }
  };

  return (
    <motion.section
      className="relative h-[400px] flex items-center justify-center bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('/images/methodes/footer.jpg')" }}
      {...motionProps}
    >
      <div className="absolute inset-0 bg-black/50" />
      <motion.div 
        className="relative z-10 text-center px-4"
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Commencez votre transformation dès aujourd&apos;hui
        </h2>
        <p className="text-lg text-gray-200">
          Chaque méthode est conçue pour vous aider à atteindre un bien-être
          durable.
        </p>
      </motion.div>
    </motion.section>
  );
};

export default Methotherapies;