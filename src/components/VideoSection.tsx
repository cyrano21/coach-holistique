"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  FaYoutube,
  FaExternalLinkAlt,
  FaVideo,
  FaBookOpen,
  FaChalkboardTeacher,
  FaVolumeUp,
  FaVolumeMute,
  FaChevronLeft,
  FaChevronRight,
  FaPlay
} from "react-icons/fa";

interface Video {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl?: string;
  youtubeId?: string;
  externalLink?: string;
  duration?: string;
  category?: "personal" | "professional" | "spiritual";
}

interface VideoSectionProps {
  videos?: Video[];
}

function VideoSection({ videos = [] }: VideoSectionProps) {
  const [backgroundLoaded, setBackgroundLoaded] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(1200);
  const [muted, setMuted] = useState(false); // Son activé par défaut
  const [showNotification, setShowNotification] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const img = new Image();
    img.src = "/images/home/backgrounds/video-background.jpg";
    img.onload = () => setBackgroundLoaded(true);
    img.onerror = () => {
      console.info("Image d&apos;arrière-plan non chargée");
      setBackgroundLoaded(true);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Jingle sonore à l'arrivée sur la section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && audioRef.current) {
          // Jouer le jingle seulement si le son n'est pas coupé
          if (!muted) {
            // Réinitialiser le jingle pour pouvoir le rejouer
            audioRef.current.currentTime = 0;
            audioRef.current.play().catch(() => {
              console.info("Lecture du jingle impossible - interaction utilisateur requise");
            });
            setShowNotification(true);
          }
        }
      },
      { threshold: 0.3 }
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
  }, [muted]);

  // Masquer la notification après 5 secondes
  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showNotification]);

  // Vidéos de démonstration avec des liens YouTube (plus fiables que les fichiers vidéo directs)
  const demoVideos: Video[] = [
    {
      id: "demo1",
      title: "Méditation guidée pour débutants",
      description: "Une séance de méditation pour apaiser l'esprit et se recentrer",
      thumbnailUrl: "https://img.youtube.com/vi/inpok4MKVLM/maxresdefault.jpg",
      youtubeId: "inpok4MKVLM",
      duration: "5:31",
      category: "spiritual"
    },
    {
      id: "demo2",
      title: "Développement personnel - Confiance en soi",
      description: "Techniques pour améliorer votre confiance au quotidien",
      thumbnailUrl: "https://img.youtube.com/vi/KFwaEUAWBYY/maxresdefault.jpg",
      youtubeId: "KFwaEUAWBYY",
      duration: "8:12",
      category: "personal"
    },
    {
      id: "demo3",
      title: "Leadership et communication",
      description: "Stratégies pour améliorer votre impact professionnel",
      thumbnailUrl: "https://img.youtube.com/vi/HAnw168huqA/maxresdefault.jpg",
      youtubeId: "HAnw168huqA",
      duration: "7:45",
      category: "professional"
    },
    {
      id: "demo4",
      title: "Méditation pleine conscience",
      description: "Pratique de la pleine conscience au quotidien",
      thumbnailUrl: "https://img.youtube.com/vi/O-6f5wQXSu8/maxresdefault.jpg",
      youtubeId: "O-6f5wQXSu8",
      duration: "10:15",
      category: "spiritual"
    },
    {
      id: "demo5",
      title: "Gestion du stress",
      description: "Techniques efficaces pour gérer le stress",
      thumbnailUrl: "https://img.youtube.com/vi/ztTexqGQ0VI/maxresdefault.jpg",
      youtubeId: "ztTexqGQ0VI",
      duration: "6:20",
      category: "personal"
    }
  ];

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
  };

  const toggleMute = () => {
    setMuted(!muted);
    if (audioRef.current) {
      audioRef.current.muted = !muted;
      // Si on active le son, on joue le jingle
      if (muted && audioRef.current) {
        // Réinitialiser le jingle pour pouvoir le rejouer
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {
          console.info("Lecture du jingle impossible - interaction utilisateur requise");
        });
        setShowNotification(true);
      }
    }
  };

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 300; // Ajuster selon besoin
      const currentScroll = carouselRef.current.scrollLeft;
      
      carouselRef.current.scrollTo({
        left: direction === 'left' 
          ? currentScroll - scrollAmount 
          : currentScroll + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Utiliser les vidéos de démonstration si aucune n'est fournie
  const videosToUse = videos.length > 0 ? videos : demoVideos;
  const currentVideo = videosToUse[currentVideoIndex] || demoVideos[0];
  const safeCategory = currentVideo.category || "spiritual";
  const CategoryIcon = categoryConfig[safeCategory].icon;

  // Fonction pour ouvrir la vidéo YouTube ou le lien externe
  const openVideoLink = () => {
    let url = "";
    
    if (currentVideo.youtubeId) {
      url = `https://www.youtube.com/watch?v=${currentVideo.youtubeId}`;
    } else if (currentVideo.externalLink) {
      url = currentVideo.externalLink;
    } else if (currentVideo.videoUrl) {
      // Si c'est une URL vidéo locale, on ne fait rien (la vidéo est déjà affichée)
      return;
    }
    
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section
      ref={sectionRef}
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
      {/* Jingle audio */}
      <audio 
        ref={audioRef} 
        src="/sounds/jingle-soft.mp3" 
        preload="auto" 
        muted={muted}
      />

      {/* Bouton de volume */}
      <div className="absolute top-6 right-6 z-50 flex gap-2">
        <button 
          onClick={() => {
            if (audioRef.current) {
              audioRef.current.currentTime = 0;
              audioRef.current.play().catch(() => {
                console.info("Lecture du jingle impossible - interaction utilisateur requise");
              });
              setShowNotification(true);
            }
          }}
          className="bg-indigo-600 hover:bg-indigo-700 p-4 rounded-full transition-all duration-300 shadow-lg"
          aria-label="Rejouer le jingle"
          title="Rejouer le jingle"
        >
          <FaPlay className="text-white text-xl" />
        </button>
        <button 
          onClick={toggleMute}
          className="bg-purple-600 hover:bg-purple-700 p-4 rounded-full transition-all duration-300 shadow-lg"
          aria-label={muted ? "Activer le son" : "Désactiver le son"}
          title={muted ? "Activer le son" : "Désactiver le son"}
        >
          {muted ? (
            <FaVolumeMute className="text-white text-2xl" />
          ) : (
            <FaVolumeUp className="text-white text-2xl" />
          )}
        </button>
      </div>

      {/* Notification temporaire */}
      {showNotification && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 bg-purple-600 px-6 py-3 rounded-lg shadow-lg flex items-center gap-3"
        >
          <FaVolumeUp className="text-white text-xl" />
          <p className="text-white text-sm md:text-base font-medium">Jingle sonore activé - Cliquez sur <FaVolumeUp className="inline text-white mx-1" /> pour désactiver</p>
        </motion.div>
      )}

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

        {/* Carrousel horizontal pour les vidéos d'intro */}
        <div className="relative mb-12">
          <div 
            ref={carouselRef}
            className="flex overflow-x-auto pb-6 gap-4 hide-scrollbar snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {videosToUse.map((video, index) => (
              <div 
                key={`carousel-${video.id}`} 
                className={`flex-shrink-0 w-72 md:w-80 snap-center ${index === currentVideoIndex ? 'ring-4 ring-purple-500' : ''}`}
                onClick={() => handleVideoChange(index)}
              >
                <div className="relative overflow-hidden rounded-lg group cursor-pointer">
                  <div 
                    className="w-full h-44 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url('${video.thumbnailUrl}')` }}
                  >
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300"></div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-black/60 backdrop-blur-sm">
                    <h4 className="text-white font-medium text-sm truncate">{video.title}</h4>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-gray-300">{video.duration}</span>
                      <span className={`text-xs px-2 py-0.5 rounded ${categoryConfig[video.category || "spiritual"].color} bg-white/10`}>
                        {categoryConfig[video.category || "spiritual"].label}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Boutons de navigation du carrousel */}
          <button 
            onClick={() => scrollCarousel('left')}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 bg-black/50 hover:bg-black/70 text-white p-3 rounded-r-lg shadow-lg transition-all duration-300"
            aria-label="Vidéos précédentes"
          >
            <FaChevronLeft />
          </button>
          <button 
            onClick={() => scrollCarousel('right')}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1 bg-black/50 hover:bg-black/70 text-white p-3 rounded-l-lg shadow-lg transition-all duration-300"
            aria-label="Vidéos suivantes"
          >
            <FaChevronRight />
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          <div className="w-full md:w-2/3 bg-black/30 rounded-2xl overflow-hidden shadow-2xl">
            <div className="relative aspect-video group">
              {/* Afficher la miniature avec un bouton de lecture */}
              <div 
                className="w-full h-full bg-cover bg-center cursor-pointer transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url('${currentVideo.thumbnailUrl}')` }}
                onClick={openVideoLink}
              >
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all duration-300"></div>
                
                {/* Bouton de lecture YouTube ou lien externe */}
                {(currentVideo.youtubeId || currentVideo.externalLink) && (
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <button 
                      className="bg-red-600 hover:bg-red-700 text-white rounded-full w-20 h-20 md:w-24 md:h-24 flex items-center justify-center transition-all duration-300 group-hover:scale-125 shadow-xl border-4 border-white/30"
                      aria-label="Regarder la vidéo"
                    >
                      {currentVideo.youtubeId ? (
                        <FaYoutube className="text-3xl md:text-4xl" />
                      ) : (
                        <FaExternalLinkAlt className="text-2xl md:text-3xl" />
                      )}
                    </button>
                  </div>
                )}
              </div>

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

          <div className="w-full md:w-1/3 relative h-[400px] md:h-[500px] bg-black/20 rounded-2xl overflow-hidden">
            <div className="w-full h-full flex items-center justify-center p-4">
              <div className="relative w-full h-full flex items-center justify-center">
                {videosToUse.map((video, index) => {
                  const VideoIcon = categoryConfig[video.category || "spiritual"].icon;
                  return (
                    <motion.div
                      key={video.id}
                      className="absolute w-[230px] md:w-[280px] cursor-pointer bg-gradient-to-br from-black/60 to-purple-900/40 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-white/10"
                      style={{
                        transformOrigin: 'center center',
                        rotate:
                          (((index - currentVideoIndex) * (2 * Math.PI)) /
                            videosToUse.length) *
                          (180 / Math.PI),
                        x:
                          (Math.min(windowWidth * 0.2, 300) / 3) *
                          Math.cos(
                            ((index - currentVideoIndex) * (2 * Math.PI)) /
                              videosToUse.length
                          ),
                        y:
                          (Math.min(windowWidth * 0.25, 350) / 3) *
                          Math.sin(
                            ((index - currentVideoIndex) * (2 * Math.PI)) /
                              videosToUse.length
                          ),
                        scale: index === currentVideoIndex ? 1 : 0.7,
                        opacity: index === currentVideoIndex ? 1 : 0.7,
                      }}
                      animate={{
                        rotate:
                          (((index - currentVideoIndex) * (2 * Math.PI)) /
                            videosToUse.length) *
                          (180 / Math.PI),
                        x:
                          (Math.min(windowWidth * 0.2, 300) / 3) *
                          Math.cos(
                            ((index - currentVideoIndex) * (2 * Math.PI)) /
                              videosToUse.length
                          ),
                        y:
                          (Math.min(windowWidth * 0.25, 350) / 3) *
                          Math.sin(
                            ((index - currentVideoIndex) * (2 * Math.PI)) /
                              videosToUse.length
                          ),
                        scale: index === currentVideoIndex ? 1 : 0.7,
                        opacity: index === currentVideoIndex ? 1 : 0.7,
                      }}
                      onClick={() => handleVideoChange(index)}
                      whileHover={{
                        scale: index === currentVideoIndex ? 1.1 : 0.8,
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
                          <VideoIcon className="text-2xl md:text-3xl text-white" />
                        </div>

                        <div className="flex-grow">
                          <h4 className="text-sm md:text-base font-bold text-white mb-2">
                            {video.title}
                          </h4>
                          <div className="flex items-center gap-2 text-xs md:text-sm text-gray-300">
                            <span className="bg-white/20 px-2 py-0.5 rounded text-white">
                              {video.duration || "00:00"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Boutons de navigation stylisés */}
        <div className="flex justify-center mt-8 gap-4">
          <button
            onClick={() => handleVideoChange((currentVideoIndex - 1 + videosToUse.length) % videosToUse.length)}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 py-3 rounded-full flex items-center gap-2 transform transition-transform duration-300 hover:scale-105 shadow-lg"
          >
            <FaChevronLeft />
            <span>Précédent</span>
          </button>
          <button
            onClick={() => handleVideoChange((currentVideoIndex + 1) % videosToUse.length)}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-full flex items-center gap-2 transform transition-transform duration-300 hover:scale-105 shadow-lg"
          >
            <span>Suivant</span>
            <FaChevronRight />
          </button>
        </div>
      </div>

      {/* Styles CSS pour masquer la scrollbar tout en gardant la fonctionnalité */}
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}

export default VideoSection;
