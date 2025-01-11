"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

import { VideoCarousel } from "./VideoCarousel";

// Imports CSS
import dynamic from 'next/dynamic';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Image = dynamic(() => import('next/image'), {
  loading: () => <div>Loading...</div>
});


// Video interface definition
interface Video {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
}

// Props interface for VideoSection component
interface VideoSectionProps {
  videos?: Video[];
}

export default function VideoSection({ videos = [] }: VideoSectionProps) {
  // Debug: Log videos array
  console.log('Videos in VideoSection:', videos);
  console.log('Number of videos:', videos.length);

  // State for selected video
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  // Open video modal and set the selected video
  const openVideoModal = (video: Video) => {
    setSelectedVideo(video);
  };

  // Close video modal and reset selected video
  const closeVideoModal = () => {
    setSelectedVideo(null);
  };

  // Render when no videos are available
  if (videos.length === 0) {
    return (
      <section style={{ padding: "5rem 0" }}>
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 1rem",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontSize: "1.875rem",
              fontWeight: "bold",
              color: "#333",
            }}
          >
            Aucune vidéo disponible
          </h2>
        </div>
      </section>
    );
  }

  // Main render method
  return (
    <section style={{ padding: "5rem 0", backgroundColor: '#1A1A2E' }}>
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 1rem",
        }}
      >
        {/* Section title */}
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            fontSize: "3rem",
            fontWeight: "800",
            textAlign: "center",
            marginBottom: "1rem",
            color: "white",
            letterSpacing: "-0.025em",
          }}
        >
          Outils de Développement
        </motion.h2>

        {/* Section description */}
   <motion.p
     initial={{ opacity: 0 }}
     animate={{ opacity: 1 }}
     transition={{ delay: 0.3, duration: 0.6 }}
     style={{
       fontSize: "1.25rem", 
       color: "rgba(255,255,255,0.8)", 
       textAlign: "center",
       marginBottom: "3rem",
       maxWidth: "800px", 
       margin: "0 auto",
       lineHeight: "1.6", 
       fontWeight: "300", 
       letterSpacing: "0.5px", 
       textShadow: "0 2px 4px rgba(0,0,0,0.2)", 
       padding: "1rem", 
       backgroundColor: "rgba(26,26,46,0.7)", 
       borderRadius: "10px", 
       boxShadow: "0 4px 6px rgba(0,0,0,0.1)", 
     }}
   >
     Découvrez nos ressources et méthodes innovantes pour votre transformation
   </motion.p>

        {/* Video Carousel */}
        <VideoCarousel 
          videos={videos} 
          onVideoSelect={openVideoModal} 
        />

        {/* Video Modal */}
        {selectedVideo && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              zIndex: 50,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={closeVideoModal}
          >
            <div
              style={{
                maxWidth: "1024px",
                width: "100%",
                padding: "2rem",
                backgroundColor: "white",
                borderRadius: "0.75rem",
                margin: "2rem",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Video iframe */}
              <div style={{ aspectRatio: "16/9" }}>
                <iframe
                  src={selectedVideo.videoUrl}
                  title={selectedVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{
                    width: "100%",
                    height: "100%",
                    border: "none",
                  }}
                ></iframe>
              </div>

              {/* Video details */}
              <div
                style={{
                  marginTop: "1rem",
                  textAlign: "center",
                }}
              >
                <h3
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    color: "#333",
                  }}
                >
                  {selectedVideo.title}
                </h3>

                <p
                  style={{
                    color: "#666",
                    fontSize: "0.875rem",
                    marginTop: "0.5rem",
                  }}
                >
                  {selectedVideo.description}
                </p>

                <button
                  onClick={closeVideoModal}
                  style={{
                    marginTop: "1rem",
                    padding: "0.75rem 1.5rem",
                    backgroundColor: "#7A0BC0",
                    color: "white",
                    borderRadius: "0.5rem",
                    cursor: "pointer",
                  }}
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}