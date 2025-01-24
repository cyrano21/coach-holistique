"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import AnimatePresence from './AnimatePresence';

import {
  FaPlay,
  FaPause,
  FaVideo,
  FaBookOpen,
  FaChalkboardTeacher,
  FaClock,
} from "react-icons/fa";

interface Video {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  duration?: string;
  category?: "personal" | "professional" | "spiritual";
}

interface VideoSectionProps {
  videos?: Video[];
}

function VideoSection({ videos = [] }: VideoSectionProps) {
  const [backgroundLoaded, setBackgroundLoaded] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [windowWidth, setWindowWidth] = useState(1200); // valeur par défaut
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const img = new Image();
    img.src = "/images/home/backgrounds/video-background.jpg";
    img.onload = () => setBackgroundLoaded(true);
    img.onerror = () => {
      console.error("Video section background image failed to load");
      setBackgroundLoaded(true);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Set initial width
    setWindowWidth(window.innerWidth);

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const categoryConfig = {
    personal: {
      icon: FaBookOpen,
      color: "text-rose-500",
      gradient: "from-rose-400 to-rose-600",
      description: "Explorations personnelles",
      label: "Personnel",
    },
    professional: {
      icon: FaChalkboardTeacher,
      color: "text-sky-500",
      gradient: "from-sky-400 to-sky-600",
      description: "Stratégies professionnelles",
      label: "Professionnel",
    },
    spiritual: {
      icon: FaVideo,
      color: "text-purple-500",
      gradient: "from-purple-400 to-purple-600",
      description: "Voyages intérieurs",
      label: "Spirituel",
    },
  };

  const handleVideoChange = (index: number) => {
    setCurrentVideoIndex(index);
    setIsPlaying(false);

    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const currentVideo = videos[currentVideoIndex] || {
    id: "default",
    title: "Aucune vidéo disponible",
    description: "Restez à l'écoute pour de nouveaux contenus.",
    thumbnailUrl: "",
    videoUrl: "",
    duration: "00:00",
    category: "spiritual" as const,
  };

  const safeCategory = currentVideo.category || "spiritual";
  const CategoryIcon = categoryConfig[safeCategory].icon;

  return (
    <section
      className={`py-24 relative transition-opacity duration-1000 ${
        backgroundLoaded ? "opacity-100" : "opacity-0"
      }`}
      style={{
        backgroundImage: `url('/images/home/backgrounds/video-background.jpg')`,
        backgroundColor: "rgba(12, 36, 20, 0.8)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: "multiply",
        transition: "opacity 0.5s ease-in-out",
      }}
    >
      <div className="w-full relative z-10 px-4">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold text-center mb-8 text-white"
        >
          Bibliothèque Vidéo
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-lg md:text-xl text-center mb-12 max-w-2xl mx-auto leading-relaxed text-gray-200
            bg-black/20 rounded-xl p-4 md:p-6 shadow-lg backdrop-blur-sm"
        >
          Des ressources vidéo pour éclairer votre parcours de transformation.
        </motion.p>

        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          <div className="w-full md:w-2/3 bg-black/30 rounded-2xl overflow-hidden shadow-2xl">
            <div className="relative aspect-video">
              {currentVideo.videoUrl ? (
                <video
                  ref={videoRef}
                  src={currentVideo.videoUrl}
                  poster={currentVideo.thumbnailUrl}
                  className="w-full h-full object-cover"
                  onClick={togglePlayPause}
                />
              ) : (
                <div className="w-full h-full bg-gray-800 opacity-50" />
              )}

              {currentVideo.videoUrl && (
                <button
                  onClick={togglePlayPause}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                    bg-white/30 hover:bg-white/50 rounded-full p-3 md:p-4 backdrop-blur-sm transition-all"
                >
                  {isPlaying ? (
                    <FaPause className="text-2xl md:text-3xl text-white" />
                  ) : (
                    <FaPlay className="text-2xl md:text-3xl text-white" />
                  )}
                </button>
              )}

              <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm p-3 md:p-4">
                <motion.h3
                  className="text-base md:text-xl font-semibold text-white mb-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {currentVideo.title}
                </motion.h3>

                <div className="flex items-center space-x-2 mb-2 text-sm md:text-base text-gray-300">
                  <CategoryIcon className="w-4 h-4 md:w-5 md:h-5" />
                  <span>{categoryConfig[safeCategory].label}</span>
                </div>

                <div className={`inline-block px-2 py-1 rounded-full text-xs uppercase ${categoryConfig[safeCategory].color} bg-white/10`}>
                  {categoryConfig[safeCategory].description}
                </div>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/3 relative h-[400px] md:h-[500px] bg-black/20 rounded-2xl">
            <div className="w-full h-full flex items-center justify-center p-4">
              <div className="relative w-full h-full">
                <AnimatePresence mode="wait" initial={false}>
                  {videos.map((video, index) => (
                    <motion.div
                      key={video.id}
                      className="absolute w-[250px] md:w-[300px] cursor-pointer bg-gradient-to-br from-black/60 to-purple-900/40 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-white/10"
                      style={{
                        left: '50%',
                        top: '50%',
                        transformOrigin: 'center center',
                      }}
                      initial={{
                        rotate:
                          (((index - currentVideoIndex) * (2 * Math.PI)) /
                            videos.length) *
                          (180 / Math.PI),
                        x:
                          (Math.min(windowWidth * 0.3, 400) / 3) *
                          Math.cos(
                            ((index - currentVideoIndex) * (2 * Math.PI)) /
                              videos.length
                          ) - 125,
                        y:
                          (Math.min(windowWidth * 0.4, 500) / 3) *
                          Math.sin(
                            ((index - currentVideoIndex) * (2 * Math.PI)) /
                              videos.length
                          ) - 125,
                        scale: index === currentVideoIndex ? 1 : 0.7,
                        opacity: index === currentVideoIndex ? 1 : 0.7,
                      }}
                      animate={{
                        rotate:
                          (((index - currentVideoIndex) * (2 * Math.PI)) /
                            videos.length) *
                          (180 / Math.PI),
                        x:
                          (Math.min(windowWidth * 0.3, 400) / 3) *
                          Math.cos(
                            ((index - currentVideoIndex) * (2 * Math.PI)) /
                              videos.length
                          ) - 125,
                        y:
                          (Math.min(windowWidth * 0.4, 500) / 3) *
                          Math.sin(
                            ((index - currentVideoIndex) * (2 * Math.PI)) /
                              videos.length
                          ) - 125,
                        scale: index === currentVideoIndex ? 1 : 0.7,
                        opacity: index === currentVideoIndex ? 1 : 0.7,
                      }}
                      exit={{
                        scale: 0,
                        opacity: 0,
                      }}
                      onClick={() => setCurrentVideoIndex(index)}
                      whileHover={{
                        scale: index === currentVideoIndex ? 1.05 : 0.75,
                        transition: { duration: 0.2 }
                      }}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`
                          w-16 h-16 md:w-20 md:h-20
                          flex-shrink-0
                          rounded-xl
                          flex 
                          items-center 
                          justify-center 
                          bg-gradient-to-br 
                          shadow-lg
                          ${
                            categoryConfig[video.category || "spiritual"].gradient
                          }
                          ${index === currentVideoIndex ? 'ring-2 ring-purple-400 ring-offset-2 ring-offset-black/50' : ''}
                        `}
                        >
                          <CategoryIcon className="text-2xl md:text-3xl text-white" />
                        </div>

                        <div className="flex-grow">
                          <h4 className="text-sm md:text-base font-bold text-white mb-2">
                            {video.title}
                          </h4>
                          <div className="flex items-center gap-2 text-xs md:text-sm text-gray-300">
                            <FaClock className="text-purple-400 flex-shrink-0" />
                            <span>{video.duration || "00:00"}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default VideoSection;
