import React, { useState } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import Image from 'next/image';

interface Video {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
}

interface VideoCarouselProps {
  videos: Video[];
  onVideoSelect: (video: Video) => void;
}

export const VideoCarousel: React.FC<VideoCarouselProps> = ({ videos, onVideoSelect }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === videos.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? videos.length - 1 : prevIndex - 1
    );
  };

  // Determine which videos to show (current and adjacent)
  const visibleVideos = [
    videos[(currentIndex - 1 + videos.length) % videos.length],
    videos[currentIndex],
    videos[(currentIndex + 1) % videos.length]
  ];

  return (
    <div style={{ 
      position: 'relative', 
      width: '100%', 
      maxWidth: '1200px', 
      margin: '0 auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 0'
    }}>
      {/* Previous Button */}
      <button 
        onClick={handlePrev}
        style={{
          background: 'none',
          border: 'none',
          fontSize: '2rem',
          cursor: 'pointer',
          color: 'white',
          zIndex: 10
        }}
      >
        ←
      </button>

      {/* Carousel Container */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        gap: '2rem',
        width: '100%'
      }}>
        {visibleVideos.map((video, index) => {
          const isCenter = index === 1;
          
          const motionProps: HTMLMotionProps<'div'> & { onClick?: () => void } = {
            initial: { 
              opacity: isCenter ? 1 : 0.5, 
              scale: isCenter ? 1 : 0.8 
            },
            animate: { 
              opacity: isCenter ? 1 : 0.5, 
              scale: isCenter ? 1 : 0.8 
            },
            transition: { duration: 0.3 },
            style: {
              width: isCenter ? '400px' : '300px',
              cursor: 'pointer',
              borderRadius: '1rem',
              overflow: 'hidden',
              boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
              transform: isCenter ? 'scale(1)' : 'scale(0.9)'
            },
            whileTap: isCenter ? { scale: 0.95 } : {},
            onClick: () => onVideoSelect(video)
          };
          
          return (
            <motion.div 
              key={`video-${video.id}-${index}`}
              {...motionProps}
            >
              <Image
                key={`image-${video.id}-${index}`}
                src={video.thumbnailUrl}
                alt={video.title}
                width={400}
                height={225}
                priority={isCenter}
                quality={80}
                style={{
                  width: '100%',
                  height: '225px',
                  objectFit: 'cover'
                }}
              />
              <div style={{
                padding: '1rem',
                background: 'white',
                textAlign: 'center'
              }}>
                <h3 style={{ 
                  fontSize: '1.25rem', 
                  fontWeight: 'bold',
                  marginBottom: '0.5rem'
                }}>
                  {video.title}
                </h3>
                <p
                  style={{
                    color: '#4A4E69', // Deep muted purple
                    fontSize: '0.9rem',
                    fontWeight: '400',
                    lineHeight: '1.5',
                    textAlign: 'center',
                    marginTop: '0.5rem',
                    padding: '0.5rem',
                    backgroundColor: 'rgba(255,255,255,0.8)', // Soft white background
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)', // Subtle shadow
                    maxWidth: '100%',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical'
                  }}
                >
                  {video.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Next Button */}
      <button 
        onClick={handleNext}
        style={{
          background: 'none',
          border: 'none',
          fontSize: '2rem',
          cursor: 'pointer',
          color: 'white',
          zIndex: 10
        }}
      >
        →
      </button>
    </div>
  );
};
