"use client";

import React from "react";
import { motion, Variants, MotionProps } from "framer-motion";
import { MethodesItem, methodesData } from "../data/methodesData";

interface ExtendedMotionProps extends Omit<MotionProps, 'variants'> {
  className?: string;
  variants?: Variants;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 },
  },
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
  const motionProps: MotionProps = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    transition: { duration: 1 },
    viewport: { once: true },
  };

  return (
    <motion.section
      className="relative h-[500px] flex items-center justify-center bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('/images/methodes/hero.jpg')" }}
      {...motionProps} // ...motionProps will be applied here
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
  const motionProps: MotionProps = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    transition: { duration: 0.8 },
    viewport: { once: true },
  };

  return (
    <motion.section
      className="py-12 md:py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-br from-blue-900/90 via-indigo-800/90 to-purple-900/90 text-white"
      id="nos-methodes"
      {...motionProps}
    >
      <div className="max-w-7xl mx-auto">
        <motion.p
          className="text-base md:text-lg lg:text-xl text-gray-100 mb-8 md:mb-16 text-center max-w-2xl mx-auto leading-relaxed tracking-wide font-light"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-500 font-semibold">
            Un parcours personnalisé
          </span>{" "}
          en plusieurs étapes pour prendre soin de vous, selon vos besoins et
          vos objectifs. Découvrez ci-dessous nos différentes méthodes,
          expliquées sous forme d&apos;itinéraire.
        </motion.p>

        <motion.div
          className="relative bg-white/10 rounded-xl p-4 md:p-6 shadow-2xl border border-white/20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Ligne verticale principale - visible uniquement sur desktop */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500 dark:from-blue-600 dark:to-purple-600 rounded-full" />

          <div className="space-y-12 md:space-y-8">
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
    className: `flex flex-col md:flex-row items-center w-full relative ${isEven ? "md:flex-row-reverse" : ""}`,
  };

  return (
    <motion.div {...motionProps}>
      {/* Branche horizontale - visible uniquement sur desktop */}
      <div
        className={`hidden md:block absolute top-1/2 transform -translate-y-1/2 w-1/2 h-1 
                    bg-gradient-to-r from-blue-500 to-purple-500 
                    dark:from-blue-600 dark:to-purple-600 
                    ${isEven ? "right-1/2" : "left-1/2"}`}
      />

      {/* Point central avec ligne verticale sur mobile */}
      <div className="md:hidden flex flex-col items-center w-full">
        <div className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 border-4 border-blue-500 dark:border-blue-600 flex items-center justify-center z-10">
          <span className="text-blue-500 dark:text-blue-400 font-bold text-sm">
            {index + 1}
          </span>
        </div>
        {/* Ligne verticale qui ne s'étend que jusqu'au prochain élément */}
        {index < methodesData.length - 1 && (
          <div className="w-1 h-12 bg-gradient-to-b from-blue-500 to-purple-500 dark:from-blue-600 dark:to-purple-600 my-2" />
        )}
      </div>

      {/* Contenu */}
      <div className={`w-full md:w-1/2 px-4 md:px-8 ${isEven ? "md:pl-8" : "md:pr-8"}`}>
        <motion.div
          className={`
            bg-white dark:bg-gray-800 
            shadow-lg rounded-xl p-4 md:p-6
            border border-gray-100 dark:border-gray-700 
            hover:shadow-2xl 
            transition-all duration-300 ease-in-out 
            transform hover:-translate-y-2
            ${
              index % 2 === 0
                ? "bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/50 dark:to-blue-800/50"
                : "bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/50 dark:to-purple-800/50"
            }
          `}
          initial={{ opacity: 0, y: 20, x: 0 }}
          whileInView={{ opacity: 1, y: 0, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 * index }}
        >
          <motion.h3
            className="text-xl md:text-2xl font-extrabold mb-3 
                       bg-gradient-to-r from-blue-600 to-purple-600 
                       bg-clip-text text-transparent"
          >
            {item.title}
          </motion.h3>
          <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
            {item.description}
          </p>
        </motion.div>
      </div>

      {/* Point central sur desktop */}
      <div className="hidden md:flex w-1/2 justify-center relative">
        <div className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 border-4 border-blue-500 dark:border-blue-600 flex items-center justify-center z-10">
          <span className="text-blue-500 dark:text-blue-400 font-bold">
            {index + 1}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

const ParallaxFooter = () => {
  const motionProps: MotionProps = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    transition: { duration: 1 },
    viewport: { once: true },
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
