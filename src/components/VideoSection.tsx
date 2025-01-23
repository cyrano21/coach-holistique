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
    // Rotation circulaire des vidéos
    const newIndex = index === currentVideoIndex ? currentVideoIndex : index;

    setCurrentVideoIndex(newIndex);
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
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-extrabold text-center mb-12 text-white"
        >
          Bibliothèque Vidéo
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-xl text-center mb-16 max-w-3xl mx-auto leading-relaxed text-gray-200
            bg-black/20 rounded-xl p-6 shadow-lg backdrop-blur-sm"
        >
          Des ressources vidéo pour éclairer votre parcours de transformation.
        </motion.p>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 bg-black/30 rounded-2xl overflow-hidden shadow-2xl">
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
                <div className="w-full h-full object-cover opacity-50" />
              )}

              {currentVideo.videoUrl && (
                <button
                  onClick={togglePlayPause}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                    bg-white/30 hover:bg-white/50 rounded-full p-4 backdrop-blur-sm transition-all"
                >
                  {isPlaying ? (
                    <FaPause className="text-3xl text-white" />
                  ) : (
                    <FaPlay className="text-3xl text-white" />
                  )}
                </button>
              )}

              <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-4 text-white">
                <motion.h3
                  className="text-2xl font-semibold text-white mb-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {currentVideo.title}
                </motion.h3>

                <div className="flex items-center space-x-2 mb-4 text-gray-300">
                  <CategoryIcon className="w-6 h-6 mr-2" />
                  <span>{categoryConfig[safeCategory].label}</span>
                </div>

                <div
                  className={`px-3 py-1 rounded-full text-xs uppercase ${categoryConfig[safeCategory].color} bg-white/10`}
                >
                  {categoryConfig[safeCategory].description}
                </div>
              </div>
            </div>
          </div>

           <div className="md:col-span-1 relative h-[500px] overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <AnimatePresence mode="wait" initial={false}>
              {videos.map((video, index) => (
                <motion.div
                  key={video.id}
                    initial={{
                      rotate:
                        (((index - currentVideoIndex) * (2 * Math.PI)) /
                          videos.length) *
                        (180 / Math.PI),
                      x:
                        200 *
                        Math.cos(
                          ((index - currentVideoIndex) * (2 * Math.PI)) /
                            videos.length
                        ),
                      y:
                        200 *
                        Math.sin(
                          ((index - currentVideoIndex) * (2 * Math.PI)) /
                            videos.length
                        ),
                      scale: index === currentVideoIndex ? 1.3 : 1,
                      opacity: 1,
                    }}
                    animate={{
                      rotate:
                        (((index - currentVideoIndex) * (2 * Math.PI)) /
                          videos.length) *
                        (180 / Math.PI),
                      x:
                        200 *
                        Math.cos(
                          ((index - currentVideoIndex) * (2 * Math.PI)) /
                            videos.length
                        ),
                      y:
                        200 *
                        Math.sin(
                          ((index - currentVideoIndex) * (2 * Math.PI)) /
                            videos.length
                        ),
                      scale: index === currentVideoIndex ? 1.3 : 1,
                      opacity: 1,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.5,
                      transition: { duration: 0.2 },
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                    }}
                    onClick={() => handleVideoChange(index)}
                    className={`
                      absolute 
                      cursor-pointer 
                      p-3 
                      rounded-lg 
                      transition-all 
                      duration-300 
                      w-full 
                      max-w-xs
                      ${
                        index === currentVideoIndex
                          ? "bg-purple-600/50 border-2 border-purple-400 z-10"
                          : "bg-white/10 hover:bg-white/20 z-0"
                      }
                    `}
                    style={{
                      transformOrigin: "center center",
                      boxShadow:
                        index === currentVideoIndex
                          ? "0 0 20px rgba(147, 51, 234, 0.5)"
                          : "none",
                    }}
                  >
                    <div className="flex items-center">
                      <div
                        className={`
                        w-12 h-12 
                        rounded-full 
                        flex 
                        items-center 
                        justify-center 
                        mr-4 
                        bg-gradient-to-br 
                        ${
                          categoryConfig[video.category || "spiritual"].gradient
                        }
                      `}
                      >
                        <CategoryIcon className="text-2xl text-white" />
                      </div>

                      <div className="flex-grow">
                        <h4 className="text-sm font-semibold text-white">
                          {video.title}
                        </h4>
                        <p className="text-xs text-gray-300">
                          {video.duration || "00:00"}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default VideoSection;
