import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { IconType } from "react-icons";
import {
  FaYoutube,
  FaExternalLinkAlt,
  FaVolumeMute,
  FaVolumeUp,
  FaChevronLeft,
  FaChevronRight,
  FaPlay,
  FaInfoCircle
} from "react-icons/fa";

interface Video {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  youtubeId?: string;
  externalLink?: string;
  videoUrl?: string;
  duration?: string;
  category: string;
}

interface VideoSectionProps {
  videos?: Video[];
}

function VideoSection({ videos = [] }: VideoSectionProps) {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [category, setCategory] = useState("coaching");
  const [isVisible, setIsVisible] = useState(false);
  const [muted, setMuted] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  // Définition des vidéos de démonstration
  const demoVideos: Video[] = [
    {
      id: "demo1",
      title: "Découvrez le coaching holistique",
      description: "Une approche complète pour harmoniser corps, esprit et âme. Le coaching holistique vous accompagne dans un voyage de transformation personnelle.",
      thumbnailUrl: "/images/videos/coaching-thumbnail.jpg",
      youtubeId: "dQw4w9WgXcQ", // Exemple d'ID YouTube
      duration: "12:34",
      category: "coaching"
    },
    {
      id: "demo2",
      title: "Méditation guidée pour débutants",
      description: "Une séance de méditation douce pour vous initier à la pleine conscience et à la relaxation profonde.",
      thumbnailUrl: "/images/videos/meditation-thumbnail.jpg",
      externalLink: "https://example.com/meditation-video",
      duration: "8:15",
      category: "meditation"
    },
    {
      id: "demo3",
      title: "Atelier sur les chakras",
      description: "Découvrez les sept centres d'énergie du corps et comment les équilibrer pour améliorer votre bien-être général.",
      thumbnailUrl: "/images/videos/chakras-thumbnail.jpg",
      duration: "15:42",
      category: "spiritualite"
    },
    {
      id: "demo4",
      title: "Techniques de respiration pour la gestion du stress",
      description: "Apprenez des techniques de respiration efficaces pour réduire l'anxiété et améliorer votre concentration au quotidien.",
      thumbnailUrl: "/images/videos/respiration-thumbnail.jpg",
      youtubeId: "xvzSXcVmEFU",
      duration: "10:28",
      category: "coaching"
    },
    {
      id: "demo5",
      title: "Yoga pour l'équilibre émotionnel",
      description: "Une séance de yoga douce conçue pour harmoniser vos émotions et cultiver la paix intérieure.",
      thumbnailUrl: "/images/videos/yoga-thumbnail.jpg",
      duration: "22:15",
      category: "meditation"
    },
    {
      id: "demo6",
      title: "Introduction aux bonshommes allumettes",
      description: "Découvrez cette technique puissante pour libérer les blocages émotionnels et transformer votre relation avec votre passé.",
      thumbnailUrl: "/images/videos/bonshommes-thumbnail.jpg",
      duration: "18:30",
      category: "spiritualite"
    }
  ];

  // Définition des catégories avec type sécurisé
  type CategoryKey = 'coaching' | 'meditation' | 'spiritualite';
  
  const categoryConfig: Record<CategoryKey, { label: string; icon: IconType }> = {
    coaching: {
      label: "Coaching Holistique",
      icon: FaPlay
    },
    meditation: {
      label: "Méditation",
      icon: FaPlay
    },
    spiritualite: {
      label: "Parcours Spirituels",
      icon: FaPlay
    }
  };

  // Utiliser les vidéos externes si elles sont fournies, sinon utiliser les démos
  const videosToUse = videos.length > 0 ? videos : demoVideos;
  
  // Filtrer les vidéos par catégorie
  const filteredVideos = videosToUse.filter(video => video.category === category);
  
  // Définir la vidéo actuelle
  const currentVideo = filteredVideos[currentVideoIndex] || videosToUse[0];
  
  // Définir l'icône de catégorie en utilisant une assertion de type pour garantir la sécurité
  const safeCategory = (category in categoryConfig ? category : 'coaching') as CategoryKey;
  const CategoryIcon = categoryConfig[safeCategory].icon;

  useEffect(() => {
    // Vérifier si la vidéo actuelle a des liens valides et afficher des informations de débogage
    if (currentVideo) {
      console.info("Données de la vidéo actuelle:", {
        title: currentVideo.title,
        youtubeId: currentVideo.youtubeId || "Non défini",
        externalLink: currentVideo.externalLink || "Non défini",
        videoUrl: currentVideo.videoUrl || "Non défini"
      });
    }
  }, [currentVideo]);

  useEffect(() => {
    // Réinitialiser l'index de la vidéo lors du changement de catégorie
    setCurrentVideoIndex(0);
  }, [category]);

  useEffect(() => {
    // Utiliser un IntersectionObserver pour détecter quand la section est visible
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
          
          // Jouer le son d'ambiance si le son n'est pas coupé
          if (!muted && audioRef.current) {
            audioRef.current.play().catch(error => {
              console.error("Erreur lors de la lecture audio:", error);
            });
          }
          
          observer.disconnect();
        }
      },
      { threshold: 0.2 } // Déclencher lorsque 20% de la section est visible
    );
    
    // Stocker la référence actuelle dans une variable locale
    const currentSectionRef = sectionRef.current;
    
    if (currentSectionRef) {
      observer.observe(currentSectionRef);
    }
    
    return () => {
      // Utiliser la variable locale dans la fonction de nettoyage
      if (currentSectionRef) {
        observer.unobserve(currentSectionRef);
      }
    };
  }, [muted]);

  useEffect(() => {
    // Masquer la notification après 3 secondes
    if (showNotification) {
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [showNotification]);

  useEffect(() => {
    // Précharger les images des miniatures pour une meilleure expérience utilisateur
    if (isVisible && filteredVideos.length > 0) {
      filteredVideos.forEach(video => {
        if (video.thumbnailUrl) {
          // Utiliser window.Image pour éviter les conflits avec Next.js
          const img = new window.Image();
          img.src = video.thumbnailUrl;
          img.decoding = 'async';
          
          img.onload = () => {
            console.info(`Image préchargée: ${video.thumbnailUrl}`);
          };
          
          img.onerror = () => {
            console.warn(`Erreur lors du préchargement de l'image: ${video.thumbnailUrl}`);
          };
        }
      });
    }
  }, [isVisible, filteredVideos]);

  const openVideoLink = () => {
    let url = "";
    let notificationMessage = "";
    
    if (currentVideo.youtubeId) {
      url = `https://www.youtube.com/watch?v=${currentVideo.youtubeId}`;
      console.info("Ouverture du lien YouTube:", url);
    } else if (currentVideo.externalLink) {
      url = currentVideo.externalLink;
      console.info("Ouverture du lien externe:", url);
    } else if (currentVideo.videoUrl) {
      // Si l'URL commence par 'http', c'est un lien externe
      if (currentVideo.videoUrl.startsWith('http')) {
        url = currentVideo.videoUrl;
        console.info("Ouverture de l'URL vidéo:", url);
      } else {
        // C'est une vidéo locale
        notificationMessage = "Cette vidéo est disponible uniquement en local";
        console.info("Vidéo locale détectée:", currentVideo.videoUrl);
      }
    } else {
      // Aucun lien disponible
      notificationMessage = "Aucun lien externe disponible pour cette vidéo";
      console.warn("Aucun lien disponible pour cette vidéo");
    }
    
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      // Utiliser le message de notification spécifique
      setShowNotification(true);
      // Stocker le message dans un état pour l'afficher dans le composant de notification
      setNotificationMessage(notificationMessage);
      setTimeout(() => setShowNotification(false), 3000);
    }
  };

  const toggleMute = () => {
    setMuted(!muted);
    if (audioRef.current) {
      audioRef.current.muted = !muted;
      if (muted && audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(error => {
          console.error("Erreur lors de la lecture audio:", error);
        });
      }
    }
    
    setNotificationMessage(muted ? "Son activé" : "Son désactivé");
    setShowNotification(true);
  };

  const nextVideo = () => {
    setCurrentVideoIndex((prev) => 
      prev === filteredVideos.length - 1 ? 0 : prev + 1
    );
  };

  const prevVideo = () => {
    setCurrentVideoIndex((prev) => 
      prev === 0 ? filteredVideos.length - 1 : prev - 1
    );
  };

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
      className="py-24 relative bg-gradient-to-b from-black to-purple-900"
      id="videos"
    >
      <audio
        ref={audioRef}
        src="/audio/ambient-background.mp3"
        loop
        muted={muted}
        preload="none"
      />
      
      <motion.div
        className="absolute top-6 right-6 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <motion.button
          onClick={toggleMute}
          className="bg-purple-600/80 hover:bg-purple-700/80 p-3 rounded-full backdrop-blur-sm"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {muted ? (
            <FaVolumeMute className="text-white text-2xl" />
          ) : (
            <FaVolumeUp className="text-white text-2xl" />
          )}
        </motion.button>
      </motion.div>

      {showNotification && (
        <motion.div 
          key="notification"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 bg-purple-600 px-6 py-3 rounded-lg shadow-lg flex items-center gap-3"
        >
          <FaInfoCircle className="text-white text-xl" />
          <p className="text-white text-sm md:text-base font-medium">
            {muted 
              ? "Son désactivé - Cliquez sur l'icône pour activer" 
              : notificationMessage || "Aucun lien externe disponible pour cette vidéo"}
          </p>
        </motion.div>
      )}

      <div className="w-full relative z-10 px-4 max-w-7xl mx-auto">
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
            className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-emerald-300 text-sm font-medium mb-4"
          >
            Vidéos & Ressources
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-4xl md:text-5xl font-extrabold text-center mb-6 text-white"
          >
            Explorez nos contenus
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg md:text-xl text-center mb-12 max-w-2xl mx-auto leading-relaxed text-gray-200"
          >
            Découvrez nos vidéos, méditations guidées et ressources pour approfondir votre pratique et enrichir votre parcours.
          </motion.p>
          
          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            {Object.entries(categoryConfig).map(([key, value]) => (
              <motion.button
                key={key}
                onClick={() => setCategory(key)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  category === key 
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30' 
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {value.label}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 gap-8 items-center bg-black/30 rounded-2xl p-6 md:p-8 backdrop-blur-sm border border-white/10"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <div className="relative overflow-hidden rounded-xl group">
            <div 
              className="w-full aspect-video bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
              style={{ backgroundImage: `url('${currentVideo.thumbnailUrl}')` }}
            >
              {/* Fallback en cas d'échec de chargement de l'image */}
              <noscript>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={currentVideo.thumbnailUrl} 
                  alt={currentVideo.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </noscript>
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                <motion.button
                  onClick={openVideoLink}
                  className="bg-purple-600/90 hover:bg-purple-700 p-5 rounded-full transition-all duration-300 transform group-hover:scale-110"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {currentVideo.youtubeId ? (
                    <FaYoutube className="text-white text-4xl" />
                  ) : (
                    <FaExternalLinkAlt className="text-white text-3xl" />
                  )}
                </motion.button>
              </div>
            </div>
            
            <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-600/90 to-indigo-600/90 backdrop-blur-sm flex items-center gap-2">
              <CategoryIcon className="text-white text-sm" />
              <span className="text-white text-xs font-medium">
                {categoryConfig[safeCategory].label}
              </span>
            </div>
            
            {currentVideo.duration && (
              <div className="absolute bottom-4 right-4 px-2 py-1 rounded-md bg-black/70 backdrop-blur-sm">
                <span className="text-white text-xs font-medium">
                  {currentVideo.duration}
                </span>
              </div>
            )}
          </div>
          
          <div className="flex flex-col h-full justify-center">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
            >
              <motion.h3 
                className="text-2xl md:text-3xl font-bold text-white mb-4"
                variants={itemVariants}
              >
                {currentVideo.title}
              </motion.h3>
              
              <motion.p 
                className="text-gray-300 mb-6 leading-relaxed"
                variants={itemVariants}
              >
                {currentVideo.description}
              </motion.p>
              
              <motion.div 
                className="flex items-center gap-4"
                variants={itemVariants}
              >
                <motion.button
                  onClick={openVideoLink}
                  className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg flex items-center gap-2 transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {currentVideo.youtubeId ? "Voir sur YouTube" : "Voir la vidéo"}
                  <FaExternalLinkAlt className="text-white text-sm" />
                </motion.button>
                
                <div className="flex items-center gap-2">
                  <motion.button
                    onClick={prevVideo}
                    className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    disabled={filteredVideos.length <= 1}
                  >
                    <FaChevronLeft className="text-white text-sm" />
                  </motion.button>
                  
                  <motion.button
                    onClick={nextVideo}
                    className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    disabled={filteredVideos.length <= 1}
                  >
                    <FaChevronRight className="text-white text-sm" />
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default VideoSection;
